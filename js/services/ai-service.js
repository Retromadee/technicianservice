/* AI Service — Backend Connected */
const AIService = (() => {
    const API_BASE = 'http://localhost:8081/api/jobs/diagnose';

    async function analyze(problemData) {
        // Convert images to base64 for simplicity in this demo, 
        // though a real app would use Multipart/FormData
        const imageBase64 = await Promise.all((problemData.images || []).map(file => {
            return new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(file);
            });
        }));

        const response = await fetch(API_BASE, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('hv_token')}`
            },
            body: JSON.stringify({
                description: problemData.description,
                category: problemData.category,
                images: imageBase64
            })
        });

        if (!response.ok) {
            throw new Error('AI diagnosis failed');
        }

        const data = await response.json();
        return {
            ...data,
            userDescription: problemData.description,
            uploadedImages: imageBase64,
            analyzedAt: new Date().toISOString()
        };
    }

    return { analyze };
})();
