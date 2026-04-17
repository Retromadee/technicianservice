/* Firebase Data Service — Realtime Sync */
const FirestoreService = (() => {
    const getDb = () => FirebaseConfig.getDb();

    async function getJobs(filter = {}) {
        const snapshot = await getDb().ref('jobs').once('value');
        const data = snapshot.val();
        if (!data) return [];
        
        let jobs = Object.keys(data).map(key => ({ id: key, ...data[key] }));
        if (filter.category) {
            jobs = jobs.filter(j => j.category === filter.category);
        }
        return jobs;
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
