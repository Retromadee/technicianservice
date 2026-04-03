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
                phone: document.getElementById('regPhone').value,
                password: document.getElementById('regPassword').value,
                role
            };
            if (role === 'technician') {
                userData.specialization = document.getElementById('regSpecialization').value;
                userData.experience = document.getElementById('regExperience').value;
                userData.bio = document.getElementById('regBio').value;
            }
            try {
                App.showLoading('Creating account...');
                await AuthService.register(userData);
                App.hideLoading();
                App.showToast('Account created! Welcome! 🎉', 'success');
                App.navigate('dashboard');
            } catch (err) {
                App.hideLoading();
                App.showToast(err.message, 'error');
            }
        });

        // Toggle technician fields
        document.querySelectorAll('input[name="userRole"]').forEach(radio => {
            radio.addEventListener('change', () => {
                document.getElementById('technicianFields').style.display = radio.value === 'technician' ? 'block' : 'none';
            });
        });
    });

    return {};
})();
