/* ============================================
   HOMEFIX PRO — Main Application Controller
   SPA Router, Search, Mock Leads & Pros
   ============================================ */

const App = (() => {
    // ---- State ----
    const state = {
        currentPage: 'marketplace',
        user: null,
        role: 'guest',
        selectedTech: null,
        myRequests: [],
        technicians: [
            { id: 1, title: 'Master Plumber', company: 'ExpertFlow Team', rate: '$45', logo: 'P', color: 'logo-blue', loc: 'London, England', rating: 4.9, tags: ['Pipeline', 'Bathroom'], desc: 'Highly experienced in leak detection, emergency pipe repairs, and premium smart bathroom installations.', reviews: 124 },
            { id: 2, title: 'Senior Electrician', company: 'VoltGuard Studios', rate: '$60', logo: 'E', color: 'logo-orange', loc: 'Berlin, Germany', rating: 4.8, tags: ['Wiring', 'Safety', 'Industrial'], desc: 'Industrial and residential wiring specialist. Expert in panel upgrades and smart home safety audits.', reviews: 89 },
            { id: 3, title: 'HVAC Specialist', company: 'AirPure Ltd.', rate: '$55', logo: 'H', color: 'logo-pink', loc: 'Paris, France', rating: 4.7, tags: ['AC', 'Ventilation'], desc: 'Precision maintenance and urgent repair for complex central ventilation systems and heat pumps.', reviews: 56 },
            { id: 4, title: 'Appliance Repair', company: 'HomeFix Crew', rate: '$40', logo: 'A', color: 'logo-green', loc: 'Madrid, Spain', rating: 4.9, tags: ['Repair', 'Washing Machine'], desc: 'Certified expert for all household brands. Rapid fix for refrigerators, dishwashers, and ovens.', reviews: 210 },
            { id: 5, title: 'Carpentry Pro', company: 'WoodCraft Studios', rate: '$65', logo: 'C', color: 'logo-blue', loc: 'NYC, USA', rating: 5.0, tags: ['Custom', 'Renovation'], desc: 'Bespoke cabinetry and structural carpentry. Specializing in high-end restoration and modern furniture.', reviews: 42 },
            { id: 6, title: 'Smart Home Tech', company: 'SecureIoT Team', rate: '$75', logo: 'S', color: 'logo-green', loc: 'Tokyo, Japan', rating: 4.6, tags: ['IoT', 'Security', 'Automation'], desc: 'Designing and installing complex IoT ecosystems, smart lighting, and 4K security networks.', reviews: 78 }
        ]
    };

    // ---- UI Renderers ----
    function renderTechnicians(list = state.technicians) {
        const grid = document.getElementById('jobGrid');
        const countEl = document.getElementById('jobCount');
        if (!grid) return;
        
        if (countEl) countEl.textContent = list.length;
        
        grid.innerHTML = list.map(tech => `
            <div class="job-card animate-in" onclick="App.selectTech(${tech.id})">
                <div class="card-header">
                    <div class="company-info">
                        <div class="company-name">${tech.company}</div>
                        <h4>${tech.title}</h4>
                    </div>
                    <div class="company-logo ${tech.color}">${tech.logo}</div>
                </div>
                <div class="salary-range">${tech.rate}/hr</div>
                <p class="job-desc">${tech.desc}</p>
                <div class="card-footer">
                    <div class="badge-tag badge-remote">VERIFIED</div>
                    <div class="location"><i class="fas fa-map-marker-alt" style="margin-right:5px"></i>${tech.loc}</div>
                </div>
            </div>
        `).join('');
    }

    function renderDashboard() {
        const dash = document.getElementById('page-dashboard');
        if (!dash) return;
        
        if (state.myRequests.length === 0) {
            dash.innerHTML = `
                <div class="results-header"><h1>Dashboard Overview</h1></div>
                <div style="background: white; padding: 60px; border-radius: 30px; text-align: center; box-shadow: var(--shadow-subtle);">
                    <i class="fas fa-rocket" style="font-size: 80px; color: var(--jobie-purple); margin-bottom: 25px; opacity: 0.1;"></i>
                    <h2 style="font-weight: 800;">No Active Requests</h2>
                    <p style="color: #888; margin-bottom: 30px;">You haven't booked any technicians yet. Start by exploring the marketplace.</p>
                    <button onclick="App.navigate('marketplace')" style="background: var(--jobie-purple); color: white; border: none; padding: 15px 40px; border-radius: 12px; font-weight: 800; cursor: pointer;">Explore Marketplace</button>
                </div>
            `;
        } else {
            dash.innerHTML = `
                <div class="results-header"><h1>My Active Requests</h1></div>
                <div class="job-grid">
                    ${state.myRequests.map(req => `
                        <div class="job-card" style="border-left: 4px solid var(--jobie-purple);">
                            <div class="card-header" style="margin-bottom: 10px;">
                                <div class="company-info">
                                    <div class="company-name">Request ID: #${Math.floor(Math.random()*10000)}</div>
                                    <h4 style="color: var(--jobie-purple);">${req.tech.title}</h4>
                                </div>
                                <div class="badge-tag" style="background: #E8F5E9; color: #2E7D32;">PENDING</div>
                            </div>
                            <div style="font-size: 14px; font-weight: 700; margin-bottom: 15px;">Target: ${req.tech.company}</div>
                            <p class="job-desc" style="margin-bottom: 15px;"><strong>Your Issue:</strong> ${req.problem}</p>
                            <div class="card-footer" style="padding-top: 15px; border-top: 1px solid #EEE;">
                                <div class="location"><i class="fas fa-calendar-alt"></i> ${req.date || 'TBD'} at ${req.time || 'TBD'}</div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }
    }

    // ---- Drawer & Selection ----
    function selectTech(id) {
        const tech = state.technicians.find(t => t.id === id);
        if (!tech) return;
        
        state.selectedTech = tech;
        const body = document.getElementById('drawerBody');
        body.innerHTML = `
            <div style="text-align:center; margin-bottom:30px;">
                <div class="company-logo ${tech.color}" style="width:100px; height:100px; border-radius:30px; font-size:40px; margin:0 auto 20px;">${tech.logo}</div>
                <h2 style="font-weight:900; font-size:28px;">${tech.title}</h2>
                <div style="color:var(--jobie-purple); font-weight:800; font-size:18px; margin-top:5px;">${tech.rate}/hour</div>
                <div style="margin-top:10px; font-weight:700;">⭐ ${tech.rating} <span style="color:#AAA; font-weight:500;">(${tech.reviews} Reviews)</span></div>
            </div>
            
            <div style="margin-bottom:30px;">
                <h4 style="font-weight:800; margin-bottom:12px; font-size:16px;">About Professional</h4>
                <p style="color:#666; line-height:1.7; font-size:15px;">${tech.desc}</p>
            </div>

            <div style="display:flex; flex-wrap:wrap; gap:10px; margin-bottom:40px;">
                ${tech.tags.map(t => `<span class="tag" style="padding:8px 15px; font-size:12px;">#${t}</span>`).join('')}
            </div>

            <div style="display:grid; grid-template-columns: 1fr 1fr; gap:15px;">
                <button onclick="App.openBooking()" style="background:var(--jobie-purple); color:white; border:none; padding:18px; border-radius:15px; font-weight:800; cursor:pointer;">Hire Expert</button>
                <button style="background:#EEE; color:#333; border:none; padding:18px; border-radius:15px; font-weight:800; cursor:pointer;">Contact</button>
            </div>
        `;
        document.getElementById('techDetailDrawer').style.display = 'flex';
    }

    function closeDrawer() { 
        document.getElementById('techDetailDrawer').style.display = 'none'; 
    }

    function openBooking() {
        if (!state.user && state.role === 'guest') {
            closeDrawer();
            openModal('loginModal');
            return;
        }
        
        document.getElementById('bTechName').value = `${state.selectedTech.title} — ${state.selectedTech.company}`;
        document.getElementById('bookingModal').style.display = 'flex';
    }

    // ---- Functionality ----
    function submitBooking(e) {
        e.preventDefault();
        const request = {
            tech: state.selectedTech,
            service: document.getElementById('bServiceType').value,
            problem: document.getElementById('bProblem').value,
            date: document.querySelector('#bookingForm input[type="date"]').value,
            time: document.querySelector('#bookingForm input[type="time"]').value
        };

        state.myRequests.push(request);
        closeModal('bookingModal');
        closeDrawer();
        
        // Show Success Toast (Simulated)
        const toast = document.createElement('div');
        toast.className = 'animate-in';
        toast.style = "position:fixed; bottom:40px; left:50%; transform:translateX(-50%); background:#333; color:white; padding:15px 30px; border-radius:50px; font-weight:700; z-index:3000; box-shadow:0 10px 30px rgba(0,0,0,0.3);";
        toast.innerHTML = `<i class="fas fa-check-circle" style="color:#10B981; margin-right:10px;"></i> Request Sent to ${state.selectedTech.company}!`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);

        navigate('dashboard');
    }

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
        
        if (page === 'dashboard') renderDashboard();

        document.getElementById('pageTitle').textContent = menuItem ? menuItem.querySelector('span').textContent : 'Overview';
    }

    function initSearch() {
        const mainInput = document.querySelector('.main-search');
        const filterFn = (e) => {
            const query = e.target.value.toLowerCase();
            const filtered = state.technicians.filter(t => 
                t.title.toLowerCase().includes(query) || 
                t.company.toLowerCase().includes(query)
            );
            renderTechnicians(filtered);
        };
        if (mainInput) mainInput.addEventListener('input', filterFn);
    }

    function init() {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => navigate(item.dataset.page));
        });

        initSearch();
        renderTechnicians();

        document.getElementById('bookingForm')?.addEventListener('submit', submitBooking);

        if (typeof firebase !== 'undefined') {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    state.user = user;
                    state.role = 'user';
                }
            });
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return { navigate, renderTechnicians, selectTech, openBooking, closeDrawer, state };
})();

