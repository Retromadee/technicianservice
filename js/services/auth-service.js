/* Auth Service — Backend Connected */
const AuthService = (() => {
    const API_BASE = 'http://localhost:8081/api/auth';

    async function login(email, password) {
        const response = await fetch(`${API_BASE}/signin`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Invalid email or password');
        }

        const data = await response.json();
        const user = {
            id: data.id,
            email: data.email,
            firstName: data.username.split('@')[0], // Simplified name from email for now
            roles: data.roles,
            token: data.token
        };

        // Persist token
        localStorage.setItem('hv_token', data.token);
        localStorage.setItem('hv_user', JSON.stringify(user));

        App.setUser(user);
        return user;
    }

    async function register(userData) {
        const response = await fetch(`${API_BASE}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                password: userData.password,
                role: [userData.role === 'technician' ? 'tech' : 'user']
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Registration failed');
        }

        const data = await response.json();
        // After registration, typical flow is to log the user in or redirect to login
        // For simplicity, we'll ask the user to log in
        return data;
    }

    async function logout() {
        localStorage.removeItem('hv_token');
        localStorage.removeItem('hv_user');
        App.setUser(null);
    }

    return { login, register, logout };
})();
