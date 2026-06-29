/* Auth Module */
const AuthModule = (() => {
    App.on('appReady', () => {
        // Login form
        document.getElementById('loginForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('loginEmail').value;
            const password = document.getElementById('loginPassword').value;
            try {
                App.showLoading('Signing in...');
                await AuthService.login(email, password);
                App.hideLoading();
                App.showToast('Welcome back! 👋', 'success');
                if (typeof closeModal === 'function') closeModal('loginModal');
                App.navigate('dashboard');
            } catch (err) {
                App.hideLoading();
                App.showToast(err.message, 'error');
            }
        });

        // Register form
        document.getElementById('registerForm')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const role = document.querySelector('input[name="userRole"]:checked').value;
            const userData = {
                firstName: document.getElementById('regFirstName').value,
                lastName: document.getElementById('regLastName').value,
                email: document.getElementById('regEmail').value,
                phone: document.getElementById('regPhone')?.value || '',
                password: document.getElementById('regPassword').value,
                role
            };
            if (role === 'technician') {
                userData.specialization = document.getElementById('regSpecialization')?.value || '';
                userData.experience = document.getElementById('regExperience')?.value || '';
                userData.bio = document.getElementById('regBio')?.value || '';
            }
            try {
                App.showLoading('Creating account...');
                await AuthService.register(userData);
                App.hideLoading();
                App.showToast('Account created! Welcome! 🎉', 'success');
                if (typeof closeModal === 'function') closeModal('loginModal');
                App.navigate('dashboard');
            } catch (err) {
                App.hideLoading();
                App.showToast(err.message, 'error');
            }
        });

        // Toggle technician fields
        document.querySelectorAll('input[name="userRole"]').forEach(radio => {
            radio.addEventListener('change', () => {
                const techFields = document.getElementById('technicianFields');
                if (techFields) techFields.style.display = radio.value === 'technician' ? 'block' : 'none';
                
        // Update UI active state
                document.querySelectorAll('.role-label').forEach(lbl => lbl.classList.remove('active'));
                radio.closest('.role-label').classList.add('active');
            });
        });
    });

    async function signInWithGoogle() {
        if (typeof firebase === 'undefined' || !firebase.auth) {
            App.showToast('Firebase not initialized', 'error');
            return;
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        try {
            App.showLoading('Connecting to Google...');
            
            // Check if running on mobile device or as PWA (standalone mode)
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            const isPWA = window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
            
            if (isMobile || isPWA) {
                // Use redirect for mobile/PWA (popups are blocked or fail to load in PWA standalone mode)
                await firebase.auth().signInWithRedirect(provider);
            } else {
                // Use popup for desktop
                const result = await firebase.auth().signInWithPopup(provider);
                const user = result.user;
                
                const userData = {
                    id: user.uid,
                    email: user.email,
                    firstName: user.displayName ? user.displayName.split(' ')[0] : 'User',
                    lastName: user.displayName ? (user.displayName.split(' ').slice(1).join(' ') || '') : '',
                    photo: user.photoURL,
                    role: 'user' // Default role for Google login
                };

                // Store in our app state
                App.setUser(userData);
                localStorage.setItem('hv_user', JSON.stringify(userData));
                
                App.hideLoading();
                App.showToast(`Welcome, ${userData.firstName}! 👋`, 'success');
                if (typeof closeModal === 'function') closeModal('loginModal');
                App.navigate('dashboard');
            }
        } catch (error) {
            App.hideLoading();
            console.error("Google Auth Error:", error);
            App.showToast(error.message, 'error');
        }
    }

    return { signInWithGoogle };
})();
