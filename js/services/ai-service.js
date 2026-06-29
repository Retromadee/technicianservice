/* 
   AI Service — Multimodal Home Diagnosis
   Service: Google Gemini 2.0 Flash (Free Tier)
   How to use: Get a free key at https://aistudio.google.com/ and set AIService.setKey('YOUR_KEY')
*/
const AIService = (() => {
    let apiKey = null;

    function setKey(key) { apiKey = key; }

    async function analyze(problemData) {
        if (!apiKey) {
            console.warn("AI Service: No API Key set, attempting backend diagnosis...");
            try {
                const apiBase = window.AppConfig ? AppConfig.getApiBase() : '/api';
                const controller = new AbortController();
                const timeoutId = setTimeout(() => controller.abort(), 8000);
                const response = await fetch(`${apiBase}/jobs/diagnose`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(problemData),
                    signal: controller.signal
                });
                clearTimeout(timeoutId);
                if (response.ok) {
                    const data = await response.json();
                    return {
                        ...data,
                        advice: data.description,
                        difficulty: data.severity.toUpperCase(),
                        quickFixes: data.steps || ["Contact a professional for safety info."],
                        analyzedAt: new Date().toISOString(),
                        userDescription: problemData.description
                    };
                }
            } catch (err) {
                console.warn("Backend fail, falling back to local heuristic.");
            }
            return heuristicMock(problemData);
        }

        try {
            // Real Gemini 2.0 Flash Integration (Multimodal)
            const prompt = `You are a home repair AI assistant. A user has described a household issue.
Your task is to analyze it and respond ONLY with a valid JSON object (no markdown, no explanation outside JSON).

Required JSON format:
{
  "problem": "Short title of the issue",
  "advice": "Clear, practical 2-3 sentence advice for the homeowner",
  "difficulty": "LOW | MEDIUM | HIGH",
  "confidence": 85,
  "quickFixes": ["Step 1", "Step 2", "Step 3"],
  "category": "plumbing | electrical | hvac | appliance | painting | cleaning | carpentry | general",
  "riskFactors": ["Risk 1", "Risk 2"],
  "estimatedTime": "e.g. 30 minutes",
  "recommendation": "diy | professional"
}

User's issue: "${problemData.description}"`;

            const parts = [{ text: prompt }];
            if (problemData.images && problemData.images.length > 0) {
                problemData.images.forEach(img => {
                    parts.push({ inline_data: { mime_type: "image/jpeg", data: img.split(',')[1] } });
                });
            }

            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ contents: [{ parts }] })
                }
            );

            if (!response.ok) {
                const errData = await response.json();
                console.error("Gemini API error:", errData);
                throw new Error(`Gemini API error: ${response.status}`);
            }

            const result = await response.json();
            const rawText = result.candidates?.[0]?.content?.parts?.[0]?.text || '';
            
            // Extract JSON — handles both raw JSON and ```json ... ``` wrapped responses
            const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/) || [null, rawText];
            const cleanJson = (jsonMatch[1] || rawText).trim();
            const parsed = JSON.parse(cleanJson);

            return {
                ...parsed,
                advice: parsed.advice || parsed.description,
                description: parsed.description || parsed.advice,
                severity: (parsed.difficulty || 'MEDIUM').toLowerCase(),
                analyzedAt: new Date().toISOString(),
                userDescription: problemData.description
            };
        } catch (e) {
            console.error("Gemini failed, falling back to heuristic:", e.message);
            return heuristicMock(problemData);
        }
    }

    function heuristicMock(data) {
        const query = (data.description || "").toLowerCase();
        
        let category = "appliance";
        
        if (query.match(/leak|pipe|water|sink|toilet|drain|plumb/)) category = "plumbing";
        else if (query.match(/light|spark|socket|power|breaker|wire|electrical|tv/)) category = "electrical";
        else if (query.match(/ac|hvac|heat|cool|air/)) category = "hvac";
        else if (query.match(/paint|wall|drywall/)) category = "painting";
        else if (query.match(/clean|dust|mop|sweep/)) category = "cleaning";

        const isHigh = category === 'electrical' || query.includes('leak') || query.includes('fire') || query.includes('smoke');

        return new Promise(res => setTimeout(() => {
            const result = {
                problem: `${category.charAt(0).toUpperCase() + category.slice(1)} Issue Detected`,
                advice: `Our analysis suggests a ${category} issue. ${isHigh ? 'WARNING: High risk detected — contact a professional immediately.' : 'Please review the troubleshooting steps below.'}`,
                description: `We analyzed: "${data.description}". This appears to be a ${category} problem requiring ${isHigh ? 'urgent professional attention' : 'standard maintenance'}.`,
                difficulty: isHigh ? 'HIGH' : 'MEDIUM',
                severity: isHigh ? 'high' : 'medium',
                confidence: 72,
                quickFixes: isHigh ? 
                    ["Turn off power/water source immediately.", "Do not touch exposed wiring or standing water.", "Call a licensed professional."] :
                    ["Check the obvious connections first.", "Consult your appliance manual.", "If unsure, call a certified technician."],
                category: category,
                riskFactors: isHigh ? ["Fire hazard", "Structural damage", "Shock risk"] : ["Minor failure", "Temporary inconvenience"],
                estimatedTime: isHigh ? "2-4 hours" : "1 hour",
                tools: isHigh ? ["Professional tools required", "Insulated safety gear"] : ["Basic toolkit", "Flashlight"],
                recommendation: isHigh ? 'professional' : 'diy',
                analyzedAt: new Date().toISOString(),
                userDescription: data.description
            };
            res(result);
        }, 1200));
    }

    return { analyze, setKey };
})();

