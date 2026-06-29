/* Auth Service — Backend & Firebase Role Resolution */
const AuthService = (() => {
    const API_BASE = window.AppConfig ? AppConfig.getAuthBase() : 'http://localhost:8081/api/auth';

    // ── Get Role from Firebase ───────────────────────────────────────────────
    async function resolveUserRole(uid, fallbackRole = 'user') {
        if (typeof firebase === 'undefined' || !firebase.database) return { role: fallbackRole };
        try {
            const snap = await firebase.database().ref(`roles/${uid}`).once('value');
            if (snap.exists()) {
                return snap.val(); // Returns { role: 'technician', techId: 1 } etc.
            }
        } catch (e) {
            console.warn('[AuthService] Role lookup failed, using fallback:', e);
        }
        return { role: fallbackRole };
    }

    async function login(email, password) {
        let fbUser = null;

        // 1. Firebase Auth Login
        if (typeof firebase !== 'undefined' && firebase.auth) {
            try {
                const cred = await firebase.auth().signInWithEmailAndPassword(email, password);
                fbUser = cred.user;
            } catch (err) {
                console.error("Firebase Auth Error:", err);
                throw new Error(err.message || 'Invalid email or password');
            }
        }

        // 2. Spring Boot Auth Login
        let springUser = null;
        try {
            const response = await fetch(`${API_BASE}/signin`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                springUser = await response.json();
            }
        } catch (e) {
            console.warn("[AuthService] Spring Boot auth failed/offline, continuing with Firebase identity");
        }

        // 3. Resolve role and merge profile details
        let roleInfo = { role: 'user' };
        if (fbUser) {
            roleInfo = await resolveUserRole(fbUser.uid, springUser && springUser.roles && springUser.roles.includes('ROLE_TECH') ? 'technician' : 'user');
        }

        const user = {
            id: fbUser ? fbUser.uid : (springUser ? springUser.id : 'temp_user'),
            email: email,
            firstName: fbUser && fbUser.displayName ? fbUser.displayName.split(' ')[0] : email.split('@')[0],
            displayName: fbUser && fbUser.displayName ? fbUser.displayName : email.split('@')[0],
            role: roleInfo.role || 'user',
            techId: roleInfo.techId || null,
            token: springUser ? springUser.token : null,
            photo: fbUser ? fbUser.photoURL : null
        };

        // Persist token and user
        if (user.token) localStorage.setItem('hv_token', user.token);
        localStorage.setItem('hv_user', JSON.stringify(user));

        App.setUser(user);
        return user;
    }

    async function register(userData) {
        let fbUser = null;

        // 1. Firebase Auth Registration
        if (typeof firebase !== 'undefined' && firebase.auth) {
            try {
                const fbCred = await firebase.auth().createUserWithEmailAndPassword(userData.email, userData.password);
                fbUser = fbCred.user;
                if (fbUser) {
                    await fbUser.updateProfile({
                        displayName: `${userData.firstName} ${userData.lastName}`
                    });
                }

                // Write role to Firebase Realtime DB
                const db = FirebaseConfig.getDb();
                const techId = userData.role === 'technician' ? Date.now() : null;
                await db.ref(`roles/${fbUser.uid}`).set({
                    role: userData.role,
                    techId: techId,
                    email: userData.email
                });

                if (userData.role === 'technician') {
                    // Create a technician profile card entry in /technicians
                    await db.ref(`technicians/${techId}`).set({
                        id: techId,
                        uid: fbUser.uid,
                        title: userData.specialization || 'Master Plumber',
                        company: `${userData.firstName}'s Pro Services`,
                        rate: '₺800/visit',
                        rateNum: 800,
                        logo: userData.firstName.slice(0,2).toUpperCase(),
                        loc: 'Nicosia (Lefkoşa)',
                        rating: 5.0,
                        desc: userData.bio || 'Professional home technician in Cyprus.',
                        tags: [userData.specialization || 'Plumbing'],
                        hires: 0,
                        yearsInBusiness: userData.experience || 1,
                        isTopPro: false,
                        email: userData.email
                    });
                }
            } catch (err) {
                console.error("Firebase Registration Error:", err);
                throw new Error(err.message || 'Registration failed');
            }
        }

        // 2. Spring Boot Auth Registration
        try {
            await fetch(`${API_BASE}/signup`, {
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
        } catch (e) {
            console.warn("[AuthService] Spring Boot signup skipped/offline");
        }

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

    return { login, register, logout, resolveUserRole };
})();
