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
            console.warn("AI Service: Using Heuristic Fallback. Add Gemini API Key for real multimodal vision.");
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
                            { text: `Diagnose this home repair issue. Describe the problem, give 3 safety quick fixes, and determine if it's high or medium difficulty. Issue: ${problemData.description}` },
                            ...(problemData.images || []).map(img => ({ inline_data: { mime_type: "image/jpeg", data: img.split(',')[1] } }))
                        ]
                    }]
                })
            });

            const result = await response.json();
            const text = result.candidates[0].content.parts[0].text;
            
            // Basic parsing of Gemini response
            return {
                advice: text,
                difficulty: text.toLowerCase().includes('high') ? 'HIGH' : 'MEDIUM',
                quickFixes: [
                    "Isolate the affected area immediately.",
                    "Check for secondary damages in nearby rooms.",
                    "Wait for a certified pro for active hazards."
                ]
            };
        } catch (e) {
            return heuristicMock(problemData);
        }
    }

    function heuristicMock(data) {
        const query = (data.description || "").toLowerCase();
        let category = "plumbing";
        if (query.includes('light') || query.includes('spark') || query.includes('socket')) category = "electrical";
        if (query.includes('ac') || query.includes('hvac')) category = "hvac";

        return new Promise(res => setTimeout(() => {
            res({
                advice: `Our analysis of your input suggests a ${category} issue. ${category === 'electrical' ? 'WARNING: High risk detected.' : 'Please follow the safety steps below.'}`,
                difficulty: category === 'electrical' ? 'HIGH' : 'MEDIUM',
                quickFixes: category === 'electrical' ? 
                    ["Turn off main breaker.", "Do not touch wires.", "Evacuate if smoke persists."] :
                    ["Locate shutoff valve.", "Stop usage immediately.", "Clear work area."],
                category: category
            });
        }, 1500));
    }

    return { analyze, setKey };
})();
