/* Auth Service — Backend Connected */
const AuthService = (() => {
    const API_BASE = window.AppConfig ? AppConfig.getAuthBase() : 'http://localhost:8081/api/auth';

    async function login(email, password) {
        // 1. Firebase Auth Login
        if (typeof firebase !== 'undefined' && firebase.auth) {
            try {
                await firebase.auth().signInWithEmailAndPassword(email, password);
            } catch (err) {
                console.error("Firebase Auth Error:", err);
                throw new Error(err.message || 'Invalid email or password');
            }
        }

        // 2. Spring Boot Auth Login
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
        // 1. Firebase Auth Registration
        if (typeof firebase !== 'undefined' && firebase.auth) {
            try {
                const fbCred = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password);
                if (fbCred.user) {
                    await fbCred.user.updateProfile({
                        displayName: `${userData.firstName} ${userData.lastName}`
                    });
                }
            } catch (err) {
                console.error("Firebase Registration Error:", err);
                throw new Error(err.message || 'Registration failed');
            }
        }

        // 2. Spring Boot Auth Registration
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
        
        // Auto-login after successful registration
        return await login(userData.email, userData.password);
    }

    async function logout() {
        if (typeof firebase !== 'undefined' && firebase.auth) {
            await firebase.auth().signOut().catch(console.error);
        }
        localStorage.removeItem('hv_token');
        localStorage.removeItem('hv_user');
        App.setUser(null);
    }

    return { login, register, logout };
})();
