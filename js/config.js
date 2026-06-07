/* Production Configuration */
const Config = {
    // Check if running on localhost to determine API base
    getApiBase: () => {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        return isLocal ? 'http://localhost:8081/api' : '/api'; // Use relative path for production (proxy or same-domain)
    },
    
    // Auth Base
    getAuthBase: () => {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        return isLocal ? 'http://localhost:8081/api/auth' : '/api/auth';
    },

    // Python FastAPI Base
    getPythonApiBase: () => {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        return isLocal ? 'http://localhost:8000/api' : '/api';
    }
};

window.AppConfig = Config;
