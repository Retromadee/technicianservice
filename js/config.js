/* Production Configuration */
const Config = {
    // Check if running on localhost to determine API base
    getApiBase: () => {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        return isLocal ? 'http://localhost:8081/api' : 'https://technicianservice.onrender.com/api'; 
    },
    
    // Auth Base
    getAuthBase: () => {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        return isLocal ? 'http://localhost:8081/api/auth' : 'https://technicianservice.onrender.com/api/auth';
    },

    // Python FastAPI Base
    getPythonApiBase: () => {
        const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
        return isLocal ? 'http://localhost:8000/api' : '/api';
    }
};

window.AppConfig = Config;
