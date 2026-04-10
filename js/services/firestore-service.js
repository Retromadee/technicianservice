/* Firestore Service — Backend Connected */
const FirestoreService = (() => {
    const API_BASE = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1' 
        ? 'http://localhost:8081/api' 
        : 'https://technician-service-production.up.railway.app/api'; // Assuming this is the Java backend URL

    async function getJobs(filter = {}) {
        let url = `${API_BASE}/jobs`;
        if (filter.category) url += `?category=${filter.category}`;
        
        const response = await fetch(url, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('hv_token')}` }
        });
        return response.ok ? await response.json() : [];
    }

    async function getJob(id) {
        const response = await fetch(`${API_BASE}/jobs/${id}`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('hv_token')}` }
        });
        return response.ok ? await response.json() : null;
    }

    async function getQuotesForJob(jobId) {
        const response = await fetch(`${API_BASE}/marketplace/jobs/${jobId}/quotes`, {
            headers: { 'Authorization': `Bearer ${localStorage.getItem('hv_token')}` }
        });
        return response.ok ? await response.json() : [];
    }

    async function createJob(jobData) {
        const response = await fetch(`${API_BASE}/jobs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('hv_token')}`
            },
            body: JSON.stringify(jobData)
        });
        
        if (!response.ok) throw new Error('Failed to post job');
        return await response.json();
    }

    // Technicians might still be mocked if we haven't implemented a Tech profile API yet
    async function getTechnicians() { return []; } 
    async function getTechnician(id) { return null; }

    return { getJobs, getJob, getQuotesForJob, getTechnician, getTechnicians, createJob };
})();
