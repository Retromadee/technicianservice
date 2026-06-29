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
        const snapshot = await getDb().ref(`jobs/${id}`).once('value');
        return snapshot.val();
    }

    async function getQuotesForJob(jobId) {
        const snapshot = await getDb().ref(`jobs/${jobId}/quotes`).once('value');
        const data = snapshot.val();
        if (!data) return [];
        return Object.keys(data).map(key => ({ id: key, ...data[key] }));
    }

    async function createJob(jobData) {
        const newJobRef = getDb().ref('jobs').push();
        const data = {
            ...jobData,
            createdAt: new Date().toISOString(),
            quotesCount: 0,
            status: 'active'
        };
        await newJobRef.set(data);
        return { id: newJobRef.key, ...data };
    }

    async function getTechnicians() {
        try {
            const snapshot = await getDb().ref('technicians').once('value');
            const data = snapshot.val();
            if (!data) return [];
            // Handle numeric keys returning as sparse array with nulls
            const list = Array.isArray(data) ? data : Object.values(data);
            return list.filter(t => t !== null);
        } catch (e) {
            console.error("Error fetching technicians:", e);
            return [];
        }
    }

    async function getTechnician(id) {
        const snapshot = await getDb().ref(`technicians/${id}`).once('value');
        return snapshot.val();
    }

    return { getJobs, getJob, getQuotesForJob, getTechnician, getTechnicians, createJob };
})();
