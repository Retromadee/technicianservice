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
        currentBookingStep: 1,
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
        const grid = document.getElementById('serviceHistoryGrid');
        if (!grid) return;
        
        if (state.myRequests.length === 0) {
            grid.innerHTML = '<div style="grid-column:1/-1; padding:40px; text-align:center; background:white; border-radius:20px; color:#888; font-weight:700;">No active requests yet. Explore services below!</div>';
            return;
        }

        grid.innerHTML = state.myRequests.map(req => `
            <div class="job-card animate-in">
                <div class="card-header">
                    <div class="company-info">
                        <div class="company-name">${req.tech.company}</div>
                        <h4>${req.tech.title}</h4>
                    </div>
                    <div class="company-logo ${req.tech.color}">${req.tech.logo}</div>
                </div>
                <div style="margin-bottom:15px; font-size:13px; color:#666;">
                    <strong>Problem:</strong> ${req.problem.substring(0, 50)}...
                </div>
                <div class="card-footer">
                    <div class="badge-tag" style="background:#E0F2FE; color:#0369A1;">PENDING QUOTE</div>
                    <div class="location">London, UK</div>
                </div>
            </div>
        `).join('');
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
                <div style="background:#F8F9FD; padding:20px; border-radius:15px; text-align:center;">
                    <div style="font-weight:900; font-size:20px;">${tech.rating} ⭐</div>
                    <div style="font-size:12px; color:#888; font-weight:600;">${tech.reviews} Reviews</div>
                </div>
                <div style="background:#F8F9FD; padding:20px; border-radius:15px; text-align:center;">
                    <div style="font-weight:900; font-size:20px;">${tech.hires}</div>
                    <div style="font-size:12px; color:#888; font-weight:600;">Hires on site</div>
                </div>
            </div>
            
            <div style="margin-bottom:30px;">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:15px;">
                    <button style="width:40px; height:40px; border-radius:50%; background:#E8F5E9; border:none; color:#2E7D32;"><i class="fas fa-check"></i></button>
                    <span style="font-weight:700; font-size:15px;">Background checked</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px;">
                    <button style="width:40px; height:40px; border-radius:50%; background:#FFF8E1; border:none; color:#F97316;"><i class="fas fa-medal"></i></button>
                    <span style="font-weight:700; font-size:15px;">Top Pro — ${tech.yearsInBusiness} years in business</span>
                </div>
            </div>

            <div style="margin-bottom:40px;">
                <h4 style="font-weight:800; margin-bottom:15px;">Work Gallery</h4>
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
                    <div style="aspect-ratio:1; background:#EEE; border-radius:12px; overflow:hidden;"><img src="https://picsum.photos/seed/${tech.id}1/200" style="width:100%; height:100%; object-fit:cover;"></div>
                    <div style="aspect-ratio:1; background:#EEE; border-radius:12px; overflow:hidden;"><img src="https://picsum.photos/seed/${tech.id}2/200" style="width:100%; height:100%; object-fit:cover;"></div>
                    <div style="aspect-ratio:1; background:#EEE; border-radius:12px; overflow:hidden;"><img src="https://picsum.photos/seed/${tech.id}3/200" style="width:100%; height:100%; object-fit:cover;"></div>
                </div>
            </div>

            <div style="margin-bottom:40px;">
                <h4 style="font-weight:800; margin-bottom:15px;">Recent Reviews</h4>
                <div style="display:flex; flex-direction:column; gap:20px;">
                    <div style="border-bottom:1px solid #EEE; padding-bottom:15px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span style="font-weight:700; font-size:14px;">Jane D.</span>
                            <span style="color:#F59E0B;">⭐⭐⭐⭐⭐</span>
                        </div>
                        <p style="color:#666; font-size:13px; line-height:1.5;">"Absolutely amazing service! Fixed my leak in 20 minutes. Very professional."</p>
                    </div>
                    <div style="border-bottom:1px solid #EEE; padding-bottom:15px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span style="font-weight:700; font-size:14px;">Robert M.</span>
                            <span style="color:#F59E0B;">⭐⭐⭐⭐⭐</span>
                        </div>
                        <p style="color:#666; font-size:13px; line-height:1.5;">"Great communication and fair pricing. Highly recommend for any emergency."</p>
                    </div>
                </div>
                <a href="#" style="color:var(--jobie-purple); font-weight:800; font-size:13px; display:block; margin-top:15px; text-decoration:none;">Read all ${tech.reviews} reviews <i class="fas fa-chevron-right" style="font-size:10px;"></i></a>
            </div>

            <button onclick="App.openBooking()" style="width:100%; background:var(--jobie-purple); color:white; border:none; padding:22px; border-radius:20px; font-weight:800; cursor:pointer; font-size:16px; box-shadow: 0 10px 30px rgba(76, 57, 172, 0.3);">CHECK AVAILABILITY</button>
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
        
        state.currentBookingStep = 1;
        updateBookingStepUI();
        document.getElementById('bookingModal').style.display = 'flex';
    }

    function updateBookingStepUI() {
        document.querySelectorAll('.booking-step').forEach(s => s.style.display = 'none');
        document.getElementById(`step${state.currentBookingStep}`).style.display = 'block';
        
        const progress = document.getElementById('bookingProgress');
        progress.style.width = `${(state.currentBookingStep / 3) * 100}%`;
        
        document.getElementById('btnBookingBack').style.display = state.currentBookingStep > 1 ? 'block' : 'none';
        document.getElementById('btnBookingNext').style.display = state.currentBookingStep < 3 ? 'block' : 'none';
        document.getElementById('btnBookingSubmit').style.display = state.currentBookingStep === 3 ? 'block' : 'none';
    }

    function nextStep() {
        state.currentBookingStep++;
        updateBookingStepUI();
    }

    function prevStep() {
        state.currentBookingStep--;
        updateBookingStepUI();
    }

    // ---- Functionality ----
    function submitBooking(e) {
        e.preventDefault();
        const request = {
            tech: state.selectedTech,
            problem: document.getElementById('bProblem').value,
            urgency: document.querySelector('input[name="urgency"]:checked')?.parentElement.textContent.trim() || 'Standard'
        };

        state.myRequests.push(request);
        closeModal('bookingModal');
        closeDrawer();
        
        // Show Success Toast
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
        const zipInput = document.querySelector('.location-picker input');
        
        const filterFn = () => {
            const query = mainInput ? mainInput.value.toLowerCase() : '';
            const zip = zipInput ? zipInput.value.toLowerCase() : '';
            
            const filtered = state.technicians.filter(t => {
                const matchesQuery = !query || 
                    t.title.toLowerCase().includes(query) || 
                    t.company.toLowerCase().includes(query) || 
                    t.desc.toLowerCase().includes(query);
                const matchesZip = !zip || t.loc.toLowerCase().includes(zip);
                return matchesQuery && matchesZip;
            });
            renderTechnicians(filtered);
        };

        if (mainInput) mainInput.addEventListener('input', filterFn);
        if (zipInput) zipInput.addEventListener('input', filterFn);
    }

    // ---- AI Multimodal Diagnosis ----
    function handleAIImage(input) {
        if (input.files && input.files[0]) {
            const chat = document.getElementById('aiChatWindow');
            chat.innerHTML += `
                <div style="display:flex; gap:15px; margin-bottom:20px; justify-content:flex-end;">
                    <div style="background:white; border:1px solid #EEE; padding:5px; border-radius:15px; max-width:150px;">
                        <img src="${URL.createObjectURL(input.files[0])}" style="width:100%; border-radius:10px;">
                    </div>
                </div>
            `;
            // Trigger analysis automatically
            runAIDiagnosis(true);
        }
    }

    function toggleVoiceInput() {
        const btn = document.getElementById('btnVoiceAI');
        btn.classList.toggle('active');
        if (btn.classList.contains('active')) {
            btn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i>';
            btn.style.color = '#EF4444';
            // Simulate voice to text
            setTimeout(() => {
                document.getElementById('aiQueryInput').value = "My kitchen light is flickering and the socket smells burnt.";
                toggleVoiceInput();
            }, 3000);
        } else {
            btn.innerHTML = '<i class="fas fa-microphone"></i>';
            btn.style.color = '#666';
        }
    }

    function runAIDiagnosis(isImage = false) {
        const inputField = document.getElementById('aiQueryInput');
        const query = inputField.value.trim().toLowerCase();
        if (!query && !isImage) return;

        const btn = document.getElementById('btnRunAI');
        const chat = document.getElementById('aiChatWindow');
        const resArea = document.getElementById('aiResultArea');
        const list = document.getElementById('aiQuickFixList');
        
        btn.disabled = true;
        btn.innerHTML = isImage ? '<i class="fas fa-eye fa-spin"></i> ANALYZING PHOTO...' : '<i class="fas fa-spinner fa-spin"></i> ANALYZING...';
        
        if (query && !isImage) {
            chat.innerHTML += `
                <div style="display:flex; gap:15px; margin-bottom:20px; justify-content:flex-end;">
                    <div style="background:var(--jobie-purple); color:white; padding:15px 20px; border-radius:20px 0 20px 20px; font-size:15px; line-height:1.6; max-width:80%;">
                        ${inputField.value}
                    </div>
                    <div style="width:40px; height:40px; border-radius:12px; background:#EEE; color:#666; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fas fa-user"></i></div>
                </div>
            `;
            inputField.value = '';
        }

        setTimeout(() => {
            let category = 'plumbing';
            let advice = "Based on our analysis, this looks like a plumbing system issue. We recommend checking for visible corrosion on joints.";
            let quickFixes = [
                "Locate and close the main water supply valve if leaking persists.",
                "Place a bucket under the joint to prevent floor damage.",
                "Check if any debris is clogging the drain screen."
            ];
            
            if (query.includes('electric') || query.includes('spark') || query.includes('light') || query.includes('socket')) {
                category = 'electrical';
                advice = "WARNING: Electrical hazard detected. This requires immediate attention from a certified pro.";
                quickFixes = [
                    "Turn off the breaker for the affected area immediately.",
                    "Do not touch any exposed wires or charred sockets.",
                    "Unplug all expensive electronics in the same circuit."
                ];
            } else if (query.includes('ac') || query.includes('hvac') || query.includes('cool')) {
                category = 'hvac';
                advice = "Your HVAC system may be experiencing a coolant leak or compressor failure.";
                quickFixes = [
                    "Turn off the thermostat to prevent compressor burnout.",
                    "Check the external unit for ice buildup.",
                    "Ensure secondary drain pans aren't overflowing."
                ];
            }

            // Update UI
            document.getElementById('aiResultText').textContent = advice;
            document.getElementById('aiDifficultyTag').textContent = `DIFFICULTY: ${category === 'electrical' ? 'HIGH' : 'MEDIUM'}`;
            list.innerHTML = quickFixes.map(f => `<li>${f}</li>`).join('');
            
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
                    <div style="display:flex; gap:10px; margin-bottom:10px; font-size:12px; font-weight:700;">
                        <span>⭐ ${tech.rating}</span>
                        <span style="color:#10B981;">98% System Match</span>
                    </div>
                    <div class="card-footer">
                        <div class="badge-tag" style="background:#E8F5E9; color:#2E7D32;">AVAILABLE TODAY</div>
                        <div class="location"><i class="fas fa-map-marker-alt"></i> ${tech.loc}</div>
                    </div>
                </div>
            `).join('');

            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-magic"></i> ANALYZE';
        }, 2000);
    }

    // ---- Role Logic ----
    function toggleRole() {
        if (state.role === 'guest' || state.role === 'user') state.role = 'technician';
        else if (state.role === 'technician') state.role = 'admin';
        else state.role = 'user';

        const roleBtn = document.getElementById('topRole');
        const adminMenu = document.getElementById('menu-admin');
        const searchSpan = document.querySelector('.menu-item[data-page="marketplace"] span');
        
        if (searchSpan) searchSpan.textContent = "Search Technicians";
        
        if (state.role === 'admin') {
            roleBtn.textContent = 'Switch to User';
            roleBtn.style.background = 'rgba(76, 57, 172, 0.1)';
            adminMenu.style.display = 'flex';
        } else if (state.role === 'technician') {
            roleBtn.textContent = 'Switch to Admin';
            roleBtn.style.background = 'rgba(16, 185, 129, 0.1)';
            adminMenu.style.display = 'none';
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

    return { navigate, renderTechnicians, selectTech, openBooking, closeDrawer, runAIDiagnosis, toggleRole, bidOnLead, nextStep, prevStep, state };
})();



