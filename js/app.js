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
            { id: 1, title: 'Master Plumber', company: 'ExpertFlow Team', rate: '$45', logo: 'P', color: 'logo-blue', loc: 'London, England', rating: 4.9, tags: ['Pipeline', 'Bathroom'], hires: 84, yearsInBusiness: 12, isTopPro: true, desc: 'Highly experienced in leak detection, emergency pipe repairs, and premium smart bathroom installations.', reviews: 124 },
            { id: 2, title: 'Senior Electrician', company: 'VoltGuard Studios', rate: '$60', logo: 'E', color: 'logo-orange', loc: 'Berlin, Germany', rating: 4.8, tags: ['Wiring', 'Safety', 'Industrial'], hires: 142, yearsInBusiness: 8, isTopPro: true, desc: 'Industrial and residential wiring specialist. Expert in panel upgrades and smart home safety audits.', reviews: 89 },
            { id: 3, title: 'HVAC Specialist', company: 'AirPure Ltd.', rate: '$55', logo: 'H', color: 'logo-pink', loc: 'Paris, France', rating: 4.7, tags: ['AC', 'Ventilation'], hires: 95, yearsInBusiness: 6, isTopPro: false, desc: 'Precision maintenance and urgent repair for complex central ventilation systems and heat pumps.', reviews: 56 },
            { id: 4, title: 'Appliance Repair', company: 'HomeFix Crew', rate: '$40', logo: 'A', color: 'logo-green', loc: 'Madrid, Spain', rating: 4.9, tags: ['Repair', 'Washing Machine'], hires: 310, yearsInBusiness: 15, isTopPro: true, desc: 'Certified expert for all household brands. Rapid fix for refrigerators, dishwashers, and ovens.', reviews: 210 },
            { id: 5, title: 'Carpentry Pro', company: 'WoodCraft Studios', rate: '$65', logo: 'C', color: 'logo-blue', loc: 'NYC, USA', rating: 5.0, tags: ['Custom', 'Renovation'], hires: 28, yearsInBusiness: 20, isTopPro: true, desc: 'Bespoke cabinetry and structural carpentry. Specializing in high-end restoration and modern furniture.', reviews: 42 },
            { id: 6, title: 'Smart Home Tech', company: 'SecureIoT Team', rate: '$75', logo: 'S', color: 'logo-green', loc: 'Tokyo, Japan', rating: 4.6, tags: ['IoT', 'Security', 'Automation'], hires: 52, yearsInBusiness: 4, isTopPro: false, desc: 'Designing and installing complex IoT ecosystems, smart lighting, and 4K security networks.', reviews: 78 }
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
                        <div class="company-name">${tech.company} ${tech.isTopPro ? '<span style="color:#F97316; font-size:10px; margin-left:5px;"><i class="fas fa-trophy"></i> TOP PRO</span>' : ''}</div>
                        <h4>${tech.title}</h4>
                    </div>
                    <div class="company-logo ${tech.color}">${tech.logo}</div>
                </div>
                <div style="display:flex; gap:15px; margin-bottom:15px; font-size:13px; font-weight:700;">
                    <span>⭐ ${tech.rating} (${tech.reviews})</span>
                    <span style="color:#888;">${tech.hires} hires on HomeFix</span>
                </div>
                <p class="job-desc">${tech.desc}</p>
                <div class="card-footer">
                    <div class="badge-tag" style="background:#E8F5E9; color:#2E7D32; font-size:10px;">PROMOTED</div>
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
            <div style="display:flex; gap:20px; align-items:flex-start; margin-bottom:30px;">
                <div class="company-logo ${tech.color}" style="width:80px; height:80px; border-radius:20px; font-size:30px; flex-shrink:0;">${tech.logo}</div>
                <div>
                    <h2 style="font-weight:900; font-size:24px;">${tech.company}</h2>
                    <h4 style="color:#666; font-weight:600;">${tech.title}</h4>
                </div>
            </div>

            <div style="display:grid; grid-template-columns:1fr 1fr; gap:10px; margin-bottom:30px;">
                <div style="background:#F8F9FD; padding:15px; border-radius:15px; text-align:center;">
                    <div style="font-weight:900; font-size:18px;">${tech.rating} ⭐</div>
                    <div style="font-size:12px; color:#888; font-weight:600;">${tech.reviews} Reviews</div>
                </div>
                <div style="background:#F8F9FD; padding:15px; border-radius:15px; text-align:center;">
                    <div style="font-weight:900; font-size:18px;">${tech.hires}</div>
                    <div style="font-size:12px; color:#888; font-weight:600;">Hires on site</div>
                </div>
            </div>
            
            <div style="margin-bottom:30px;">
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                    <i class="fas fa-award" style="color:var(--jobie-purple)"></i>
                    <span style="font-weight:700; font-size:14px;">Top Pro with ${tech.yearsInBusiness} years in business</span>
                </div>
                <div style="display:flex; align-items:center; gap:10px; margin-bottom:15px;">
                    <i class="fas fa-user-shield" style="color:#10B981"></i>
                    <span style="font-weight:700; font-size:14px; color:#10B981;">Background checked</span>
                </div>
            </div>

            <div style="margin-bottom:30px;">
                <h4 style="font-weight:800; margin-bottom:10px;">About</h4>
                <p style="color:#666; line-height:1.6; font-size:14px;">${tech.desc}</p>
            </div>

            <button onclick="App.openBooking()" style="width:100%; background:var(--jobie-purple); color:white; border:none; padding:20px; border-radius:15px; font-weight:800; cursor:pointer; font-size:16px;">CHECK AVAILABILITY</button>
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

    // ---- AI Diagnosis ----
    function runAIDiagnosis() {
        const query = document.getElementById('aiQueryInput').value.trim().toLowerCase();
        if (!query) return;

        const btn = document.getElementById('btnRunAI');
        const chat = document.getElementById('aiChatWindow');
        const resArea = document.getElementById('aiResultArea');
        
        // Show Loading State
        btn.disabled = true;
        btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> ANALYZING...';
        
        // Add user message to chat
        chat.innerHTML += `
            <div style="display:flex; gap:15px; margin-bottom:20px; justify-content:flex-end;">
                <div style="background:var(--jobie-purple); color:white; padding:15px 20px; border-radius:20px 0 20px 20px; font-size:15px; line-height:1.6; max-width:80%;">
                    ${query}
                </div>
                <div style="width:40px; height:40px; border-radius:12px; background:#EEE; color:#666; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fas fa-user"></i></div>
            </div>
        `;

        setTimeout(() => {
            let category = 'plumbing';
            let advice = "Your issue suggests a plumbing related problem. Check for moisture around the pipes and ensure the main valve is accessible if a major leak occurs.";
            
            if (query.includes('electric') || query.includes('spark') || query.includes('outlet') || query.includes('wire')) {
                category = 'electrical';
                advice = "Sparking or non-functional outlets are high-priority electrical hazards. Avoid touching exposed wires and consult a professional immediately to prevent fire risk.";
            } else if (query.includes('ac') || query.includes('hvac') || query.includes('cool') || query.includes('heat') || query.includes('filter')) {
                category = 'hvac';
                advice = "HVAC efficiency issues often stem from clogged filters or coolant leaks. We recommend a full system pressure check and filter replacement.";
            }

            // Update UI
            document.getElementById('aiResultText').textContent = advice;
            document.getElementById('aiDifficultyTag').textContent = `DIFFICULTY: ${category === 'electrical' ? 'HIGH' : 'MEDIUM'}`;
            resArea.style.display = 'block';
            resArea.scrollIntoView({ behavior: 'smooth' });

            // Match Techs
            const matched = state.technicians.filter(t => t.tags.some(tag => tag.toLowerCase().includes(category)) || t.title.toLowerCase().includes(category));
            const grid = document.getElementById('aiTechGrid');
            grid.innerHTML = matched.map(tech => `
                <div class="job-card animate-in" onclick="App.selectTech(${tech.id})">
                    <div class="card-header">
                        <div class="company-info">
                            <div class="company-name">${tech.company}</div>
                            <h4>${tech.title}</h4>
                        </div>
                        <div class="company-logo ${tech.color}">${tech.logo}</div>
                    </div>
                    <div class="salary-range">${tech.rate}/hr</div>
                    <div class="card-footer">
                        <div class="badge-tag" style="background:var(--jobie-bg); color:var(--jobie-purple);">98% MATCH</div>
                        <div class="location"><i class="fas fa-map-marker-alt"></i> ${tech.loc}</div>
                    </div>
                </div>
            `).join('');

            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-magic"></i> ANALYZE';
        }, 1500);
    }

    // ---- Role Logic ----
    function toggleRole() {
        state.role = state.role === 'technician' ? 'user' : 'technician';
        const roleBtn = document.getElementById('topRole');
        const searchLabel = document.querySelector('.menu-item[data-page="marketplace"] span');
        const statsLabel = document.querySelector('.menu-item[data-page="statistics"] span');
        
        if (state.role === 'technician') {
            roleBtn.textContent = 'Switch to User';
            roleBtn.style.background = 'rgba(16, 185, 129, 0.1)';
            roleBtn.style.color = '#10B981';
            if (searchLabel) searchLabel.textContent = 'Open Leads';
            if (statsLabel) statsLabel.textContent = 'Earnings';
            navigate('leads');
            renderLeads();
        } else {
            roleBtn.textContent = 'Switch to Pro';
            roleBtn.style.background = 'rgba(76, 57, 172, 0.1)';
            roleBtn.style.color = 'var(--jobie-purple)';
            if (searchLabel) searchLabel.textContent = 'Search Job';
            if (statsLabel) statsLabel.textContent = 'Statistics';
            navigate('marketplace');
        }
    }

    function renderLeads() {
        const grid = document.getElementById('leadsGrid');
        if (!grid) return;
        
        // Mock global leads
        const mockLeads = [
            { id: 101, title: 'Kitchen Pipe Leak', client: 'Sarah Johnson', location: 'London', budget: '$150-$200', desc: 'Water dripping from under-sink joint. Urgent fix needed.' },
            { id: 102, title: 'EV Charger Install', client: 'Mike Ross', location: 'Manchester', budget: '$800', desc: 'Need a professional to install Level 2 charger in home garage.' },
            { id: 103, title: 'AC Filter Clean', client: 'Dave B.', location: 'London', budget: '$50-$80', desc: 'Seasonal maintenance for 2 units. Central area.' }
        ];

        grid.innerHTML = mockLeads.map(lead => `
            <div class="job-card animate-in">
                <div class="card-header">
                    <div class="company-info">
                        <div class="company-name">Posted by ${lead.client}</div>
                        <h4>${lead.title}</h4>
                    </div>
                    <div style="font-weight:900; color:var(--jobie-purple); font-size:18px;">${lead.budget}</div>
                </div>
                <p class="job-desc">${lead.desc}</p>
                <div class="card-footer" style="justify-content:space-between;">
                    <div class="location"><i class="fas fa-map-marker-alt"></i> ${lead.location}</div>
                    <button onclick="App.bidOnLead(${lead.id})" style="background:var(--jobie-purple); color:white; border:none; padding:10px 20px; border-radius:10px; font-weight:700; cursor:pointer;">BID NOW</button>
                </div>
            </div>
        `).join('');
    }

    function bidOnLead(id) {
        alert("Success! Your bid has been sent to the customer. You'll be notified if they accept.");
    }

    function init() {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                if (state.role === 'technician' && item.dataset.page === 'marketplace') {
                    navigate('leads');
                } else {
                    navigate(item.dataset.page);
                }
            });
        });

        initSearch();
        renderTechnicians();

        document.getElementById('bookingForm')?.addEventListener('submit', submitBooking);

        if (typeof firebase !== 'undefined') {
            firebase.auth().onAuthStateChanged(user => {
                if (user) {
                    state.user = user;
                    // Default to user role first
                    state.role = 'user';
                }
            });
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return { navigate, renderTechnicians, selectTech, openBooking, closeDrawer, runAIDiagnosis, toggleRole, bidOnLead, state };
})();



