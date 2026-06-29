/* Production Configuration */
const Config = {
    // Check if running on local network/localhost to determine API base
    isLocalHost: () => {
        const hostname = window.location.hostname;
        return hostname === 'localhost' || 
               hostname === '127.0.0.1' || 
               hostname.startsWith('192.168.') || 
               hostname.startsWith('10.') || 
               hostname.startsWith('172.') || 
               hostname.endsWith('.local');
    },

    getApiBase: () => {
        const isLocal = Config.isLocalHost();
        return isLocal ? `http://${window.location.hostname}:8081/api` : 'https://technicianservice.onrender.com/api'; 
    },
    
    // Auth Base
    getAuthBase: () => {
        const isLocal = Config.isLocalHost();
        return isLocal ? `http://${window.location.hostname}:8081/api/auth` : 'https://technicianservice.onrender.com/api/auth';
    },

    // Python FastAPI Base
    getPythonApiBase: () => {
        const isLocal = Config.isLocalHost();
        return isLocal ? `http://${window.location.hostname}:8000/api` : '/api';
    }
};

window.AppConfig = Config;
