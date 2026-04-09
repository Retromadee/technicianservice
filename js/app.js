/* ============================================
   JOBIE — Main Application Controller
   SPA Router, Search, Mock Leads & Pros
   ============================================ */

const App = (() => {
    // ---- State ----
    const state = {
        currentPage: 'marketplace',
        user: null,
        role: 'guest', // guest, customer, technician
        technicians: [
            { id: 1, title: 'Master Plumber', company: 'Maximoz Team', salary: '$1,400 - $2,500', logo: 'P', color: 'logo-blue', loc: 'London, England', rating: 4.9, tags: ['Pipeline', 'Bathroom'], desc: 'Highly experienced in leak detection and smart pipe installations.' },
            { id: 2, title: 'Senior Electrician', company: 'Colo Colo Studios', salary: '$3,400 - $5,000', logo: 'E', color: 'logo-orange', loc: 'Berlin, Germany', rating: 4.8, tags: ['Wiring', 'Safety'], desc: 'Industrial and residential wiring specialist with focus on smart home safety.' },
            { id: 3, title: 'HVAC Specialist', company: 'Kleanify Ltd.', salary: '$2,800 - $4,200', logo: 'H', color: 'logo-pink', loc: 'Paris, France', rating: 4.7, tags: ['AC', 'Ventilation'], desc: 'Maintenance and urgent repair for large scale central ventilation systems.' },
            { id: 4, title: 'Appliance Repair', company: 'Kitakita Crew', salary: '$1,200 - $1,800', logo: 'A', color: 'logo-green', loc: 'Madrid, Spain', rating: 4.9, tags: ['Repair', 'Tech'], desc: 'Expert fix for all household appliances, including refrigerators and stoves.' },
            { id: 5, title: 'Carpentry Pro', company: 'Madju Djaja Studios', salary: '$2,500 - $4,000', logo: 'C', color: 'logo-blue', loc: 'NYC, USA', rating: 5.0, tags: ['Custom', 'Wood'], desc: 'Handcrafted cabinetry and high-end furniture repair for premium homes.' },
            { id: 6, title: 'Smart Home Tech', company: 'Junaids Team', salary: '$3,000 - $4,800', logo: 'S', color: 'logo-green', loc: 'Tokyo, Japan', rating: 4.6, tags: ['IoT', 'Security'], desc: 'Installation of high-tech security, smart hubs, and automated systems.' }
        ]
    };

    // ---- UI Renderers ----
    function renderTechnicians(list = state.technicians) {
        const grid = document.getElementById('jobGrid');
        const countEl = document.getElementById('jobCount');
        if (!grid) return;
        
        if (countEl) countEl.textContent = list.length;
        
        grid.innerHTML = list.map(tech => `
            <div class="job-card animate-in">
                <div class="card-header">
                    <div class="company-info">
                        <div class="company-name">${tech.company}</div>
                        <h4>${tech.title}</h4>
                    </div>
                    <div class="company-logo ${tech.color}">${tech.logo}</div>
                </div>
                <div class="salary-range">${tech.salary}</div>
                <p class="job-desc">${tech.desc}</p>
                <div class="card-footer">
                    <div class="badge-tag badge-remote">REMOTE</div>
                    <div class="location"><i class="fas fa-map-marker-alt" style="margin-right:5px"></i>${tech.loc}</div>
                </div>
            </div>
        `).join('');
    }

    function updateAuthUI() {
        const topName = document.getElementById('topName');
        const topRole = document.getElementById('topRole');
        const topAvatar = document.getElementById('topAvatar');
        
        if (state.user) {
            if (topName) topName.textContent = state.user.displayName || state.user.email.split('@')[0];
            if (topRole) topRole.textContent = state.user.role || 'Verified Technician';
            if (topAvatar) topAvatar.src = state.user.photoURL || `https://ui-avatars.com/api/?name=${state.user.email}&background=4b39ac&color=fff`;
        }
    }

    // ---- Navigation ----
    function navigate(page) {
        document.querySelectorAll('.page-content').forEach(p => p.style.display = 'none');
        document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
        
        const target = document.getElementById(`page-${page}`);
        if (target) {
            target.style.display = 'block';
            target.classList.add('active');
        }
        
        const menuItem = document.querySelector(`.menu-item[data-page="${page}"]`);
        if (menuItem) menuItem.classList.add('active');
        
        const titleMap = {
            'dashboard': 'Dashboard Overview',
            'marketplace': 'Search Jobs',
            'my-repairs': 'My Applications',
            'chat': 'Messages'
        };
        const titleEl = document.getElementById('pageTitle');
        if (titleEl) {
            const label = menuItem ? menuItem.querySelector('span').textContent : (titleMap[page] || page);
            titleEl.textContent = label;
        }
    }

    // ---- Search Logic ----
    function initSearch() {
        const mainInput = document.querySelector('.main-search');
        const globalInput = document.getElementById('globalSearchInput');
        
        const filterFn = (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = state.technicians.filter(t => 
                t.title.toLowerCase().includes(query) || 
                t.company.toLowerCase().includes(query) ||
                t.desc.toLowerCase().includes(query)
            );
            renderTechnicians(filtered);
        };

        if (mainInput) mainInput.addEventListener('input', filterFn);
        if (globalInput) globalInput.addEventListener('input', filterFn);

        // Tag filters
        document.querySelectorAll('.tag').forEach(tag => {
            tag.addEventListener('click', () => {
                document.querySelectorAll('.tag').forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
                const category = tag.textContent.toLowerCase();
                
                if (category === 'your skill') {
                    renderTechnicians(state.technicians);
                } else {
                    const filtered = state.technicians.filter(t => 
                        t.title.toLowerCase().includes(category) || 
                        t.desc.toLowerCase().includes(category) ||
                        t.tags.some(tagStr => tagStr.toLowerCase().includes(category))
                    );
                    renderTechnicians(filtered);
                }
            });
        });
    }

    // ---- Initialization ----
    function init() {
        // Init SPA Links
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => navigate(item.dataset.page));
        });

        initSearch();
        renderTechnicians();

        // Check Firebase Auth (if connected)
        if (typeof firebase !== 'undefined') {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    state.user = user;
                    updateAuthUI();
                }
            });
        }

        console.log('🚀 Jobie — Powered by Antigravity');
    }

    // Boot
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return { navigate, renderTechnicians, state };
})();
