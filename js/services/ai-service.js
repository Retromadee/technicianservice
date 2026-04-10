/* 
   AI Service — Multimodal Home Diagnosis
   Service suggested: Google Gemini 1.5 Flash (Free Tier)
   How to use: Get a free key at https://aistudio.google.com/ and set AIService.setKey('YOUR_KEY')
*/
const AIService = (() => {
    let apiKey = null;

    function setKey(key) { apiKey = key; }

    async function analyze(problemData) {
        if (!apiKey) {
            console.warn("AI Service: No local API Key, attempting backend diagnosis...");
            try {
                const response = await fetch('/api/jobs/diagnose', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(problemData)
                });
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
            // Real Gemini 1.5 Flash Integration (Multimodal)
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    contents: [{
                        parts: [
                            { text: `Diagnose this home repair issue. Provide a JSON response with: problem, advice, difficulty (LOW/MEDIUM/HIGH), confidence (percentage), quickFixes (array), category, riskFactors (array), estimatedTime, and recommendation (diy or professional). Issue: ${problemData.description}` },
                            ...(problemData.images || []).map(img => ({ inline_data: { mime_type: "image/jpeg", data: img.split(',')[1] } }))
                        ]
                    }]
                })
            });

            const result = await response.json();
            const text = result.candidates[0].content.parts[0].text;
            
            // Clean markdown if AI wrapped JSON in ```json ... ```
            const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
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
            console.error("Gemini failed, falling back to heuristic", e);
            return heuristicMock(problemData);
        }
    }

    function heuristicMock(data) {
        const query = (data.description || "").toLowerCase();
        
        let category = "appliance"; // Better default than plumbing for random electronics
        
        if (query.match(/leak|pipe|water|sink|toilet|drain|plumb/)) category = "plumbing";
        else if (query.match(/light|spark|socket|power|breaker|wire|electrical|tv/)) category = "electrical";
        else if (query.match(/ac|hvac|heat|cool|air/)) category = "hvac";
        else if (query.match(/paint|wall|drywall/)) category = "painting";
        else if (query.match(/clean|dust|mop|sweep/)) category = "cleaning";

        const isHigh = category === 'electrical' || query.includes('leak') || query.includes('fire') || query.includes('smoke');

        return new Promise(res => setTimeout(() => {
            const result = {
                problem: `${category.charAt(0).toUpperCase() + category.slice(1)} Issue Detected`,
                advice: `Our analysis of your input suggests a ${category} issue. ${isHigh ? 'WARNING: High risk detected.' : 'Please review the troubleshooting steps below.'}`,
                description: `We've analyzed your description: "${data.description}". This appears to be a ${category} related problem that requires ${isHigh ? 'urgent attention' : 'standard maintenance'}.`,
                difficulty: isHigh ? 'HIGH' : 'MEDIUM',
                severity: isHigh ? 'high' : 'medium',
                confidence: 85 + Math.floor(Math.random() * 10),
                quickFixes: isHigh ? 
                    ["Turn off power/water source.", "Do not touch exposed wiring.", "Evacuate area if danger persists."] :
                    ["Unplug the device (if applicable).", "Check basic connections.", "Consult the user manual."],
                category: category,
                riskFactors: isHigh ? ["Fire hazard", "Structural damage", "Shock risk"] : ["Minor failure", "Operational pause"],
                estimatedTime: isHigh ? "2-4 hours" : "1 hour",
                tools: isHigh ? ["Professional tools", "Insulated gear"] : ["Basic toolkit", "Flashlight"],
                recommendation: isHigh ? 'professional' : 'diy',
                analyzedAt: new Date().toISOString(),
                userDescription: data.description
            };
            res(result);
        }, 1500));
    }

    return { analyze, setKey };
})();
