/* Auth Module */
const AuthModule = (() => {
    App.on('appReady', () => {
        // ── Recover any in-flight redirect result (handles cases where
        //    a previous signInWithRedirect actually completed but the app
        //    reloaded before the result was read).
        if (typeof firebase !== 'undefined' && firebase.auth) {
            firebase.auth().getRedirectResult()
                .then(result => {
                    if (result && result.user) {
                        _handleGoogleUser(result.user);
                    }
                })
                .catch(err => {
                    // Only warn — don't surface this as a user-visible error
                    // (fires on every cold start when no redirect was pending)
                    if (err.code !== 'auth/no-auth-event') {
                        console.warn('getRedirectResult error:', err.code, err.message);
                    }
                });
        }

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

    // ── Internal: shared handler after any Google sign-in succeeds ──────────
    function _handleGoogleUser(user) {
        const userData = {
            id: user.uid,
            email: user.email,
            firstName: user.displayName ? user.displayName.split(' ')[0] : 'User',
            lastName: user.displayName ? (user.displayName.split(' ').slice(1).join(' ') || '') : '',
            photo: user.photoURL,
            role: 'user' // Default role for Google login
        };
        App.setUser(userData);
        localStorage.setItem('hv_user', JSON.stringify(userData));
        App.hideLoading();
        App.showToast(`Welcome, ${userData.firstName}! 👋`, 'success');
        if (typeof closeModal === 'function') closeModal('loginModal');
        App.navigate('dashboard');
    }

    // ── Google Sign-In: always use popup ────────────────────────────────────
    //
    //  WHY POPUP EVERYWHERE (not signInWithRedirect):
    //  • Capacitor WKWebView / Android WebView clear sessionStorage during the
    //    OAuth redirect bounce, destroying Firebase's stored nonce/state and
    //    triggering "Unable to process request due to missing initial state".
    //  • signInWithPopup opens a *separate* window; the host page's storage
    //    is never touched, so the response always reaches the Promise handler.
    //  • This is the officially recommended approach for Capacitor / Cordova apps.
    //
    async function signInWithGoogle() {
        if (typeof firebase === 'undefined' || !firebase.auth) {
            App.showToast('Google sign-in is not available', 'error');
            return;
        }

        const provider = new firebase.auth.GoogleAuthProvider();
        provider.addScope('email');
        provider.addScope('profile');

        try {
            App.showLoading('Connecting to Google...');
            const result = await firebase.auth().signInWithPopup(provider);
            _handleGoogleUser(result.user);
        } catch (error) {
            App.hideLoading();
            console.error('Google Auth Error:', error.code, error.message);

            // Surface a friendly message for the most common errors
            const friendlyMessages = {
                'auth/popup-blocked':
                    'Popup was blocked. Please allow popups for this site and try again.',
                'auth/popup-closed-by-user':
                    'Sign-in was cancelled. Please try again.',
                'auth/cancelled-popup-request':
                    'Only one sign-in popup can be open at a time.',
                'auth/network-request-failed':
                    'Network error. Check your connection and try again.',
                'auth/internal-error':
                    'Google sign-in failed. Please try again.'
            };
            App.showToast(
                friendlyMessages[error.code] || error.message,
                'error'
            );
        }
    }

    return { signInWithGoogle };
})();
