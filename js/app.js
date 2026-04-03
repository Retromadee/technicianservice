/* ============================================
   HOMEFIX PRO — Main Application Controller
   SPA Router, State Management, Initialization
   ============================================ */

const App = (() => {
    // ---- State ----
    const state = {
        currentPage: 'dashboard',
        user: null,
        isLoggedIn: false,
        listeners: {}
    };

    // ---- Event System ----
    function on(event, callback) {
        if (!state.listeners[event]) state.listeners[event] = [];
        state.listeners[event].push(callback);
    }

    function emit(event, data) {
        (state.listeners[event] || []).forEach(cb => cb(data));
    }

    // ---- SPA Router ----
    function navigate(page, data = null) {
        const previousPage = state.currentPage;
        state.currentPage = page;

        // Hide all pages
        document.querySelectorAll('.page-content').forEach(s => {
            s.style.display = 'none';
            s.classList.remove('active');
        });

        // Show target page
        const target = document.getElementById(`page-${page}`);
        if (target) {
            target.style.display = 'block';
            target.classList.add('active');
        }

        // Update sidebar menu active state
        document.querySelectorAll('.menu-item').forEach(link => {
            link.classList.toggle('active', link.dataset.page === page);
        });

        emit('navigate', { page, previousPage, data });
        history.pushState({ page }, '', `#${page}`);
    }

    // ---- Link handler ----
    function initLinks() {
        document.addEventListener('click', (e) => {
            const link = e.target.closest('[data-page]');
            if (link) {
                e.preventDefault();
                navigate(link.dataset.page);
            }
        });

        window.addEventListener('popstate', (e) => {
            const page = e.state?.page || location.hash.replace('#', '') || 'dashboard';
            navigate(page);
        });
    }

    // ---- Auth State ----
    function updateAuthUI() {
        const userNameEl = document.getElementById('userName');
        const userEmailEl = document.getElementById('userEmail');
        const userAvatarEl = document.getElementById('userAvatar');

        if (state.isLoggedIn && state.user) {
            const name = state.user.name || state.user.firstName || 'User';
            if (userNameEl) userNameEl.textContent = name;
            if (userEmailEl) userEmailEl.textContent = state.user.email;
            if (userAvatarEl) userAvatarEl.src = state.user.photoURL || `https://ui-avatars.com/api/?name=${name}&background=7c4dff&color=fff`;
        }
    }

    function setUser(user) {
        state.user = user;
        state.isLoggedIn = !!user;
        updateAuthUI();
        emit('authChange', user);
    }

    // ---- Helper UI Functions ----
    function showLoading() { console.log('Loading...'); }
    function hideLoading() { console.log('Loaded.'); }
    function showToast(msg) { alert(msg); } // Basic alert for now

    // ---- Initialize ----
    function init() {
        initLinks();

        // Check for persisted user
        const savedUser = localStorage.getItem('hv_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem('hv_user');
            }
        }

        const initialPage = location.hash.replace('#', '') || 'dashboard';
        navigate(initialPage);

        console.log('🔧 HomeFix Pro Dash initialized');
    }

    // Boot
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        navigate, on, emit, state,
        setUser, showLoading, hideLoading, showToast,
        getState: () => ({ ...state })
    };
})();
