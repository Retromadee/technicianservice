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
        currentAIImages: [],
        technicians: [
            // — Plumbing —
            { id: 1,  title: 'Master Plumber',       company: 'ExpertFlow Team',     rate: '$45/hr', rateNum: 45, logo: 'EF', color: 'logo-blue',   loc: 'London, England',   rating: 4.9, tags: ['Plumbing','Pipeline','Bathroom','Leak'],       hires: 84,  yearsInBusiness: 12, isTopPro: true,  desc: 'Highly experienced in leak detection, emergency pipe repairs, and premium smart bathroom installations.', reviews: 124, pricing: { diagnostic: 30, standard: 85,  emergency: 150 }, responseTime: '< 2 hrs' },
            { id: 2,  title: 'Drain Specialist',     company: 'ClearPipe Co.',        rate: '$38/hr', rateNum: 38, logo: 'CP', color: 'logo-green',  loc: 'Manchester, UK',    rating: 4.7, tags: ['Plumbing','Drain','Sewer','Clog'],             hires: 62,  yearsInBusiness: 9,  isTopPro: false, desc: 'Expert drain unclogging and sewer line repair. Advanced camera inspection technology available.', reviews: 87,  pricing: { diagnostic: 25, standard: 70,  emergency: 130 }, responseTime: '< 3 hrs' },
            { id: 3,  title: 'Gas & Water Fitter',   company: 'AquaSafe Ltd.',        rate: '$55/hr', rateNum: 55, logo: 'AS', color: 'logo-orange', loc: 'Dublin, Ireland',   rating: 4.8, tags: ['Plumbing','Gas','Water Heater','Boiler'],     hires: 105, yearsInBusiness: 14, isTopPro: true,  desc: 'Licensed gas-safe engineer. Specializing in boiler installation, water heater repair, and gas line work.', reviews: 156, pricing: { diagnostic: 40, standard: 110, emergency: 180 }, responseTime: '< 1 hr'  },
            // — Electrical —
            { id: 4,  title: 'Senior Electrician',   company: 'VoltGuard Studios',    rate: '$60/hr', rateNum: 60, logo: 'VG', color: 'logo-orange', loc: 'Berlin, Germany',   rating: 4.8, tags: ['Electrical','Wiring','Safety','Industrial'],  hires: 142, yearsInBusiness: 8,  isTopPro: true,  desc: 'Industrial and residential wiring specialist. Expert in panel upgrades and smart home safety audits.', reviews: 89,  pricing: { diagnostic: 35, standard: 95,  emergency: 165 }, responseTime: '< 2 hrs' },
            { id: 5,  title: 'EV Charger Installer', company: 'GreenVolt Energy',     rate: '$70/hr', rateNum: 70, logo: 'GV', color: 'logo-green',  loc: 'Amsterdam, NL',     rating: 4.9, tags: ['Electrical','EV','Charger','Solar'],          hires: 38,  yearsInBusiness: 5,  isTopPro: true,  desc: 'Certified EV charger and solar panel installer. Level 2 & DC fast charging for Tesla, BMW, and all brands.', reviews: 64,  pricing: { diagnostic: 0,  standard: 120, emergency: 200 }, responseTime: '< 4 hrs' },
            { id: 6,  title: 'Lighting Designer',    company: 'LuxWire Studio',       rate: '$50/hr', rateNum: 50, logo: 'LW', color: 'logo-pink',   loc: 'Milan, Italy',      rating: 4.6, tags: ['Electrical','Lighting','LED','Design'],       hires: 76,  yearsInBusiness: 7,  isTopPro: false, desc: 'Architectural lighting design and installation. Recessed, track, and smart RGB systems for premium homes.', reviews: 52,  pricing: { diagnostic: 25, standard: 80,  emergency: 140 }, responseTime: '< 3 hrs' },
            // — HVAC —
            { id: 7,  title: 'HVAC Specialist',      company: 'AirPure Ltd.',         rate: '$55/hr', rateNum: 55, logo: 'AP', color: 'logo-pink',   loc: 'Paris, France',     rating: 4.7, tags: ['HVAC','AC','Ventilation','Heat Pump'],        hires: 95,  yearsInBusiness: 6,  isTopPro: false, desc: 'Precision maintenance and urgent repair for complex central ventilation systems and heat pumps.', reviews: 56,  pricing: { diagnostic: 35, standard: 100, emergency: 175 }, responseTime: '< 2 hrs' },
            { id: 8,  title: 'AC Technician',        company: 'CoolBreeze Pro',       rate: '$48/hr', rateNum: 48, logo: 'CB', color: 'logo-blue',   loc: 'Barcelona, Spain',  rating: 4.5, tags: ['HVAC','AC','Air Conditioning','Refrigerant'], hires: 130, yearsInBusiness: 10, isTopPro: false, desc: 'Fast AC diagnostics and refrigerant recharge. Serving residential and commercial split systems.', reviews: 98,  pricing: { diagnostic: 30, standard: 85,  emergency: 145 }, responseTime: '< 3 hrs' },
            { id: 9,  title: 'Heating Engineer',     company: 'WarmCore Systems',     rate: '$62/hr', rateNum: 62, logo: 'WC', color: 'logo-orange', loc: 'Stockholm, Sweden', rating: 4.9, tags: ['HVAC','Heating','Radiator','Underfloor'],     hires: 44,  yearsInBusiness: 16, isTopPro: true,  desc: 'Underfloor heating and radiator expert. Full system design, installation, and annual maintenance contracts.', reviews: 71,  pricing: { diagnostic: 40, standard: 115, emergency: 190 }, responseTime: '< 1 hr'  },
            // — Appliance Repair —
            { id: 10, title: 'Appliance Repair',     company: 'HomeFix Crew',         rate: '$40/hr', rateNum: 40, logo: 'HF', color: 'logo-green',  loc: 'Madrid, Spain',     rating: 4.9, tags: ['Appliance','Repair','Washing Machine','Fridge'], hires: 310, yearsInBusiness: 15, isTopPro: true, desc: 'Certified expert for all household brands. Rapid fix for refrigerators, dishwashers, and ovens.', reviews: 210, pricing: { diagnostic: 20, standard: 75,  emergency: 130 }, responseTime: '< 2 hrs' },
            { id: 11, title: 'Kitchen Tech',         company: 'ApplianceMD',          rate: '$42/hr', rateNum: 42, logo: 'AM', color: 'logo-blue',   loc: 'Vienna, Austria',   rating: 4.6, tags: ['Appliance','Kitchen','Oven','Dishwasher'],     hires: 88,  yearsInBusiness: 7,  isTopPro: false, desc: 'Specializing in kitchen appliance repair — ovens, microwaves, dishwashers, and range hoods.', reviews: 63,  pricing: { diagnostic: 20, standard: 70,  emergency: 125 }, responseTime: '< 4 hrs' },
            // — Carpentry & Renovation —
            { id: 12, title: 'Carpentry Pro',        company: 'WoodCraft Studios',    rate: '$65/hr', rateNum: 65, logo: 'WS', color: 'logo-blue',   loc: 'NYC, USA',          rating: 5.0, tags: ['Carpentry','Custom','Renovation','Cabinet'],  hires: 28,  yearsInBusiness: 20, isTopPro: true,  desc: 'Bespoke cabinetry and structural carpentry. Specializing in high-end restoration and modern furniture.', reviews: 42,  pricing: { diagnostic: 0,  standard: 120, emergency: 200 }, responseTime: '< 6 hrs' },
            { id: 13, title: 'General Contractor',   company: 'BuildRight Group',     rate: '$58/hr', rateNum: 58, logo: 'BR', color: 'logo-orange', loc: 'Toronto, Canada',   rating: 4.8, tags: ['Carpentry','Renovation','Drywall','Flooring'],hires: 156, yearsInBusiness: 12, isTopPro: true,  desc: 'Full-service renovation contractor. Drywall, flooring, painting, and structural modifications.', reviews: 134, pricing: { diagnostic: 30, standard: 95,  emergency: 160 }, responseTime: '< 3 hrs' },
            // — Smart Home & Security —
            { id: 14, title: 'Smart Home Tech',      company: 'SecureIoT Team',       rate: '$75/hr', rateNum: 75, logo: 'SI', color: 'logo-green',  loc: 'Tokyo, Japan',      rating: 4.6, tags: ['IoT','Security','Automation','Smart Home'],   hires: 52,  yearsInBusiness: 4,  isTopPro: false, desc: 'Designing and installing complex IoT ecosystems, smart lighting, and 4K security networks.', reviews: 78,  pricing: { diagnostic: 40, standard: 130, emergency: 220 }, responseTime: '< 4 hrs' },
            { id: 15, title: 'Security Installer',   company: 'GuardTech Solutions',  rate: '$55/hr', rateNum: 55, logo: 'GT', color: 'logo-pink',   loc: 'Sydney, Australia', rating: 4.7, tags: ['Security','CCTV','Alarm','Smart Home'],       hires: 91,  yearsInBusiness: 9,  isTopPro: false, desc: 'CCTV systems, alarm installation, smart locks, and full perimeter security for homes and offices.', reviews: 103, pricing: { diagnostic: 30, standard: 95,  emergency: 160 }, responseTime: '< 2 hrs' },
            // — Cleaning & Maintenance —
            { id: 16, title: 'Deep Clean Expert',    company: 'SparkleHome Pro',      rate: '$35/hr', rateNum: 35, logo: 'SP', color: 'logo-pink',   loc: 'Lisbon, Portugal',  rating: 4.8, tags: ['Cleaning','Deep Clean','Sanitization'],       hires: 240, yearsInBusiness: 6,  isTopPro: true,  desc: 'Professional deep cleaning, move-in/out cleaning, and biohazard sanitization. Eco-friendly products.', reviews: 189, pricing: { diagnostic: 0,  standard: 60,  emergency: 100 }, responseTime: '< 1 hr'  },
            { id: 17, title: 'Roof & Gutter Pro',    company: 'TopShield Roofing',    rate: '$50/hr', rateNum: 50, logo: 'TS', color: 'logo-orange', loc: 'Chicago, USA',      rating: 4.7, tags: ['Roofing','Gutter','Leak','Exterior'],         hires: 67,  yearsInBusiness: 11, isTopPro: false, desc: 'Roof inspection, leak repair, shingle replacement, and gutter cleaning. Storm damage specialists.', reviews: 81,  pricing: { diagnostic: 35, standard: 90,  emergency: 155 }, responseTime: '< 3 hrs' },
            { id: 18, title: 'Painting Specialist',  company: 'ColorEdge Studios',    rate: '$40/hr', rateNum: 40, logo: 'CE', color: 'logo-green',  loc: 'LA, USA',           rating: 4.9, tags: ['Painting','Interior','Exterior','Wallpaper'],  hires: 115, yearsInBusiness: 8,  isTopPro: true,  desc: 'Interior and exterior painting, accent walls, wallpaper installation, and color consultation services.', reviews: 147, pricing: { diagnostic: 0,  standard: 70,  emergency: 120 }, responseTime: '< 4 hrs' }
        ],
        events: {}
    };

    // ---- Event System ----
    function on(event, callback) {
        if (!state.events[event]) state.events[event] = [];
        state.events[event].push(callback);
    }

    function emit(event, data) {
        if (state.events[event]) {
            state.events[event].forEach(cb => cb(data));
        }
    }

    // ---- UI Helpers ----
    function showToast(message, type = 'info') {
        const toast = document.createElement('div');
        toast.className = `animate-in status-badge ${type === 'error' ? 'danger' : type === 'success' ? 'completed' : 'pending'}`;
        toast.style = "position:fixed; bottom:40px; left:50%; transform:translateX(-50%); padding:15px 30px; border-radius:50px; font-weight:700; z-index:3000; box-shadow:0 10px 30px rgba(0,0,0,0.3); border:none;";
        toast.innerHTML = `<i class="fas fa-${type === 'error' ? 'exclamation-circle' : 'check-circle'}" style="margin-right:10px;"></i> ${message}`;
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 4000);
    }

    function showLoading(text = 'Loading...') {
        let loader = document.getElementById('globalLoader');
        if (!loader) {
            loader = document.createElement('div');
            loader.id = 'globalLoader';
            loader.style = "position:fixed; inset:0; background:rgba(255,255,255,0.8); backdrop-filter:blur(5px); z-index:4000; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:20px;";
            loader.innerHTML = `
                <div class="company-logo logo-blue shadow-lg" style="width:80px; height:80px; font-size:40px; animation: bounce 1s infinite alternate;">H</div>
                <div style="font-weight:800; font-size:18px; color:var(--jobie-purple)">${text}</div>
                <div class="confidence-meter" style="width:200px;"><div class="confidence-fill" style="width:100%; animation: pulse 1s infinite;"></div></div>
            `;
            document.body.appendChild(loader);
        }
    }

    function hideLoading() {
        const loader = document.getElementById('globalLoader');
        if (loader) loader.remove();
    }

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
                <div style="display:flex; gap:12px; margin-bottom:10px; font-size:12px; font-weight:700; flex-wrap:wrap; align-items:center;">
                    <span>⭐ ${tech.rating} (${tech.reviews})</span>
                    <span style="color:#10B981;"><i class="fas fa-clock" style="font-size:10px;"></i> ${tech.responseTime || '< 2 hrs'}</span>
                    <span style="color:var(--jobie-purple); font-weight:900;">${tech.rate}</span>
                </div>
                <p class="job-desc">${tech.desc}</p>
                <div style="display:flex; gap:6px; flex-wrap:wrap; margin-bottom:12px;">
                    ${tech.tags.slice(0,3).map(tag => `<span style="background:#F0F0FF; color:var(--jobie-purple); padding:3px 10px; border-radius:6px; font-size:10px; font-weight:700;">${tag}</span>`).join('')}
                </div>
                <div class="card-footer">
                    <div class="badge-tag" style="background:${tech.pricing && tech.pricing.diagnostic === 0 ? '#E8F5E9; color:#2E7D32' : '#F0F0FF; color:var(--jobie-purple)'}; font-size:10px;">${tech.pricing && tech.pricing.diagnostic === 0 ? 'FREE DIAGNOSTIC' : 'From $' + (tech.pricing ? tech.pricing.standard : '85')}</div>
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
                <div class="card-footer" style="justify-content:space-between;">
                    <div class="badge-tag" style="background:#E0F2FE; color:#0369A1;">PENDING QUOTE</div>
                    <button onclick="App.completeJobSim(${state.myRequests.indexOf(req)})" style="background:#E8F5E9; color:#2E7D32; border:none; padding:5px 12px; border-radius:8px; font-weight:700; cursor:pointer; font-size:11px;">COMPLETE (TEST)</button>
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

        // Find similar technicians for price comparison
        // Try primary tag first, then any overlapping tag, then nearest-priced
        const primaryTag = tech.tags[0];
        let similar = state.technicians.filter(t => t.id !== tech.id && t.tags.some(tag => tag === primaryTag)).slice(0, 3);
        if (similar.length < 2) {
            // Broaden: match any shared tag
            similar = state.technicians.filter(t => t.id !== tech.id && t.tags.some(tag => tech.tags.includes(tag))).slice(0, 3);
        }
        if (similar.length < 2) {
            // Fallback: nearest priced techs
            similar = state.technicians
                .filter(t => t.id !== tech.id)
                .sort((a, b) => Math.abs((a.rateNum || 50) - (tech.rateNum || 50)) - Math.abs((b.rateNum || 50) - (tech.rateNum || 50)))
                .slice(0, 3);
        }
        const allCompare = [tech, ...similar];
        const maxRate = Math.max(...allCompare.map(t => t.rateNum || parseInt(t.rate) || 50));

        // Pricing table
        const p = tech.pricing || { diagnostic: 30, standard: 85, emergency: 150 };

        // Value score: rating * reviews / rate
        const valueScore = ((tech.rating * tech.reviews) / (tech.rateNum || 50)).toFixed(1);

        body.innerHTML = `
            <div style="display:flex; gap:20px; align-items:flex-start; margin-bottom:25px;">
                <div class="company-logo ${tech.color}" style="width:70px; height:70px; border-radius:18px; font-size:22px; flex-shrink:0;">${tech.logo}</div>
                <div>
                    <h2 style="font-weight:900; font-size:22px; margin-bottom:2px;">${tech.company}</h2>
                    <h4 style="color:#666; font-weight:600; font-size:15px;">${tech.title}</h4>
                    <div style="display:flex; gap:8px; margin-top:8px; flex-wrap:wrap;">
                        ${tech.isTopPro ? '<span style="background:#FFF3E0; color:#F97316; padding:4px 10px; border-radius:8px; font-size:11px; font-weight:800;"><i class="fas fa-trophy"></i> TOP PRO</span>' : ''}
                        <span style="background:#E8F5E9; color:#2E7D32; padding:4px 10px; border-radius:8px; font-size:11px; font-weight:800;"><i class="fas fa-clock"></i> ${tech.responseTime || '< 2 hrs'}</span>
                    </div>
                </div>
            </div>

            <!-- Stats Row -->
            <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px; margin-bottom:25px;">
                <div style="background:#F8F9FD; padding:15px; border-radius:14px; text-align:center;">
                    <div style="font-weight:900; font-size:18px;">${tech.rating} ⭐</div>
                    <div style="font-size:11px; color:#888; font-weight:600;">${tech.reviews} Reviews</div>
                </div>
                <div style="background:#F8F9FD; padding:15px; border-radius:14px; text-align:center;">
                    <div style="font-weight:900; font-size:18px;">${tech.hires}</div>
                    <div style="font-size:11px; color:#888; font-weight:600;">Total Hires</div>
                </div>
                <div style="background:linear-gradient(135deg, #F0F0FF, #E8E0FF); padding:15px; border-radius:14px; text-align:center;">
                    <div style="font-weight:900; font-size:18px; color:var(--jobie-purple);">${valueScore}</div>
                    <div style="font-size:11px; color:#888; font-weight:600;">Value Score</div>
                </div>
            </div>

            <!-- Pricing Tiers -->
            <div style="margin-bottom:25px;">
                <h4 style="font-weight:800; margin-bottom:12px; font-size:16px;"><i class="fas fa-tags" style="color:var(--jobie-purple); margin-right:8px;"></i>Pricing</h4>
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:10px;">
                    <div style="background:white; border:1px solid #EEE; padding:18px 12px; border-radius:14px; text-align:center;">
                        <div style="font-size:10px; font-weight:800; color:#888; text-transform:uppercase; margin-bottom:6px;">Diagnostic</div>
                        <div style="font-size:22px; font-weight:900; color:#333;">${p.diagnostic > 0 ? '$'+p.diagnostic : 'FREE'}</div>
                        <div style="font-size:10px; color:#888; margin-top:4px;">Inspection</div>
                    </div>
                    <div style="background:var(--jobie-purple); color:white; padding:18px 12px; border-radius:14px; text-align:center; position:relative;">
                        <div style="position:absolute; top:-8px; left:50%; transform:translateX(-50%); background:#10B981; color:white; padding:2px 8px; border-radius:6px; font-size:9px; font-weight:800;">POPULAR</div>
                        <div style="font-size:10px; font-weight:800; opacity:0.8; text-transform:uppercase; margin-bottom:6px;">Standard</div>
                        <div style="font-size:22px; font-weight:900;">$${p.standard}</div>
                        <div style="font-size:10px; opacity:0.7; margin-top:4px;">Full Service</div>
                    </div>
                    <div style="background:white; border:1px solid #EEE; padding:18px 12px; border-radius:14px; text-align:center;">
                        <div style="font-size:10px; font-weight:800; color:#EF4444; text-transform:uppercase; margin-bottom:6px;">Emergency</div>
                        <div style="font-size:22px; font-weight:900; color:#333;">$${p.emergency}</div>
                        <div style="font-size:10px; color:#888; margin-top:4px;">24/7 Rush</div>
                    </div>
                </div>
            </div>

            <!-- Price Comparison -->
            <div style="margin-bottom:25px;">
                <h4 style="font-weight:800; margin-bottom:12px; font-size:16px;"><i class="fas fa-chart-bar" style="color:var(--jobie-purple); margin-right:8px;"></i>Price Comparison</h4>
                <div style="background:#F8F9FD; padding:20px; border-radius:16px;">
                    ${allCompare.map(t => {
                        const pct = ((t.rateNum || parseInt(t.rate) || 50) / maxRate * 100).toFixed(0);
                        const isThis = t.id === tech.id;
                        return `
                        <div style="display:flex; align-items:center; gap:12px; margin-bottom:${isThis ? '12' : '10'}px; ${isThis ? 'background:white; margin:-5px -8px; padding:10px 12px; border-radius:12px; box-shadow:0 2px 8px rgba(0,0,0,0.06);' : ''}">
                            <div style="width:30px; height:30px; border-radius:8px; background:${isThis ? 'var(--jobie-purple)' : '#DDD'}; color:${isThis ? 'white' : '#666'}; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:800; flex-shrink:0;">${t.logo}</div>
                            <div style="flex:1; min-width:0;">
                                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                                    <span style="font-size:12px; font-weight:${isThis ? '800' : '600'}; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">${t.company}${isThis ? ' ✓' : ''}</span>
                                    <span style="font-size:12px; font-weight:800; color:${isThis ? 'var(--jobie-purple)' : '#333'}; flex-shrink:0; margin-left:8px;">${t.rate}</span>
                                </div>
                                <div style="height:6px; background:#EEE; border-radius:3px; overflow:hidden;">
                                    <div style="height:100%; width:${pct}%; background:${isThis ? 'var(--jobie-purple)' : '#CCC'}; border-radius:3px; transition:width 0.6s;"></div>
                                </div>
                            </div>
                        </div>`;
                    }).join('')}
                    <div style="text-align:center; margin-top:8px; font-size:11px; color:#888; font-weight:600;">
                        ${similar.length === 0 ? '📊 Only pro in this specialty' : (tech.rateNum <= Math.min(...similar.map(s => s.rateNum || 50)) ? '🏆 Best value in this category!' : `💡 ${similar.filter(s => (s.rateNum || 50) < (tech.rateNum || 50)).length > 0 ? similar.filter(s => (s.rateNum||50) < (tech.rateNum||50)).length + ' cheaper option(s) available' : 'Competitive pricing'}`)}
                    </div>
                </div>
            </div>

            <!-- Badges -->
            <div style="margin-bottom:25px;">
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                    <div style="width:36px; height:36px; border-radius:50%; background:#E8F5E9; display:flex; align-items:center; justify-content:center; color:#2E7D32;"><i class="fas fa-check"></i></div>
                    <span style="font-weight:700; font-size:14px;">Background Checked</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px; margin-bottom:12px;">
                    <div style="width:36px; height:36px; border-radius:50%; background:#FFF8E1; display:flex; align-items:center; justify-content:center; color:#F97316;"><i class="fas fa-medal"></i></div>
                    <span style="font-weight:700; font-size:14px;">${tech.yearsInBusiness} years in business</span>
                </div>
                <div style="display:flex; align-items:center; gap:12px;">
                    <div style="width:36px; height:36px; border-radius:50%; background:#E0F2FE; display:flex; align-items:center; justify-content:center; color:#0369A1;"><i class="fas fa-shield-halved"></i></div>
                    <span style="font-weight:700; font-size:14px;">Satisfaction Guaranteed</span>
                </div>
            </div>

            <!-- Gallery -->
            <div style="margin-bottom:25px;">
                <h4 style="font-weight:800; margin-bottom:12px; font-size:16px;">Work Gallery</h4>
                <div style="display:grid; grid-template-columns:1fr 1fr 1fr; gap:8px;">
                    <div style="aspect-ratio:1; background:#EEE; border-radius:12px; overflow:hidden;"><img src="https://picsum.photos/seed/${tech.id}a/200" style="width:100%; height:100%; object-fit:cover;"></div>
                    <div style="aspect-ratio:1; background:#EEE; border-radius:12px; overflow:hidden;"><img src="https://picsum.photos/seed/${tech.id}b/200" style="width:100%; height:100%; object-fit:cover;"></div>
                    <div style="aspect-ratio:1; background:#EEE; border-radius:12px; overflow:hidden;"><img src="https://picsum.photos/seed/${tech.id}c/200" style="width:100%; height:100%; object-fit:cover;"></div>
                </div>
            </div>

            <!-- Reviews -->
            <div style="margin-bottom:30px;">
                <h4 style="font-weight:800; margin-bottom:12px; font-size:16px;">Recent Reviews</h4>
                <div style="border-bottom:1px solid #EEE; padding-bottom:12px; margin-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span style="font-weight:700; font-size:13px;">Jane D.</span><span style="color:#F59E0B; font-size:12px;">⭐⭐⭐⭐⭐</span></div>
                    <p style="color:#666; font-size:12px; line-height:1.5; margin:0;">"Absolutely amazing service! Fixed the issue fast. Very professional."</p>
                </div>
                <div style="padding-bottom:12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:6px;"><span style="font-weight:700; font-size:13px;">Robert M.</span><span style="color:#F59E0B; font-size:12px;">⭐⭐⭐⭐⭐</span></div>
                    <p style="color:#666; font-size:12px; line-height:1.5; margin:0;">"Great communication and fair pricing. Highly recommend."</p>
                </div>
                <a href="#" onclick="event.preventDefault()" style="color:var(--jobie-purple); font-weight:800; font-size:12px; text-decoration:none;">Read all ${tech.reviews} reviews →</a>
            </div>

            <!-- CTA Buttons -->
            <div style="display:flex; gap:10px;">
                <button onclick="App.openChatForTech(${tech.id})" style="flex:1; background:#F8F9FD; color:var(--jobie-purple); border:none; padding:18px; border-radius:16px; font-weight:800; cursor:pointer; font-size:15px;"><i class="fas fa-comment-dots" style="margin-right:8px;"></i>MESSAGE</button>
                <button onclick="App.openBooking()" style="flex:2; background:var(--jobie-purple); color:white; border:none; padding:18px; border-radius:16px; font-weight:800; cursor:pointer; font-size:15px; box-shadow: 0 8px 25px rgba(76, 57, 172, 0.3);">CHECK AVAILABILITY</button>
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
        
        // Trigger Email Notification
        const userEmail = state.user ? state.user.email : "customer@example.com";
        NotificationService.send('JOB_PENDING', userEmail, { title: request.tech.title });

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

    function completeJobSim(index) {
        const req = state.myRequests[index];
        const userEmail = state.user ? state.user.email : "customer@example.com";
        NotificationService.send('JOB_DONE', userEmail, { title: req.tech.title });
        alert(`Verification email for Job Completion sent to ${userEmail}!`);
    }

    function navigate(page) {
        state.currentPage = page;
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

        const titleEl = document.getElementById('pageTitle');
        if (titleEl) {
            const span = menuItem ? menuItem.querySelector('span') : null;
            titleEl.textContent = span ? span.textContent : page.charAt(0).toUpperCase() + page.slice(1).replace('-', ' ');
        }

        // Notify modules
        emit('navigate', { page });
    }

    function initSearch() {
        const mainInput = document.querySelector('.main-search');
        const zipInput = document.querySelector('.location-picker input');
        const searchBtn = document.querySelector('.btn-find');
        
        const filterFn = () => {
            const query = mainInput ? mainInput.value.toLowerCase() : '';
            const zip = zipInput ? zipInput.value.toLowerCase() : '';
            
            const filtered = state.technicians.filter(t => {
                const matchesQuery = !query || 
                    t.title.toLowerCase().includes(query) || 
                    t.company.toLowerCase().includes(query) || 
                    t.desc.toLowerCase().includes(query) ||
                    t.tags.some(tag => tag.toLowerCase().includes(query));
                const matchesZip = !zip || t.loc.toLowerCase().includes(zip);
                return matchesQuery && matchesZip;
            });
            renderTechnicians(filtered);
        };

        if (mainInput) mainInput.addEventListener('input', filterFn);
        if (zipInput) zipInput.addEventListener('input', filterFn);
        if (searchBtn) searchBtn.addEventListener('click', filterFn);
    }
    
    function exploreService(category) {
        navigate('marketplace');
        const searchBox = document.querySelector('.main-search');
        if (searchBox) {
            searchBox.value = category;
            searchBox.dispatchEvent(new Event('input'));
        }
    }

    function handleAIImage(input) {
        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target.result;
                state.currentAIImages.push(base64);
                
                const chat = document.getElementById('aiChatWindow');
                chat.innerHTML += `
                    <div style="display:flex; gap:15px; margin-bottom:20px; justify-content:flex-end;">
                        <div style="background:white; border:1px solid #EEE; padding:5px; border-radius:15px; max-width:150px;">
                            <img src="${base64}" style="width:100%; border-radius:10px;">
                        </div>
                    </div>
                `;
                runAIDiagnosis(true);
            };
            reader.readAsDataURL(input.files[0]);
        }
    }

    function toggleVoiceInput() {
        const btn = document.getElementById('btnVoiceAI');
        const input = document.getElementById('aiQueryInput');
        
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition not supported in this browser.");
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.lang = 'en-US';
        recognition.interimResults = false;

        recognition.onstart = () => {
            btn.style.color = '#EF4444';
            btn.innerHTML = '<i class="fas fa-microphone fa-pulse"></i>';
        };

        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
            runAIDiagnosis();
        };

        recognition.onend = () => {
            btn.style.color = '#666';
            btn.innerHTML = '<i class="fas fa-microphone"></i>';
        };

        recognition.start();
    }

    async function runAIDiagnosis(isImage = false) {
        const inputField = document.getElementById('aiQueryInput');
        const query = inputField.value.trim();
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
                        ${query}
                    </div>
                    <div style="width:40px; height:40px; border-radius:12px; background:#EEE; color:#666; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fas fa-user"></i></div>
                </div>
            `;
            inputField.value = '';
        }

        try {
            const result = await AIService.analyze({
                description: query,
                images: state.currentAIImages
            });

            // Add AI response to chat window
            chat.innerHTML += `
                <div style="display:flex; gap:15px; margin-bottom:20px;">
                    <div style="width:40px; height:40px; border-radius:12px; background:var(--jobie-purple); color:white; display:flex; align-items:center; justify-content:center; flex-shrink:0;"><i class="fas fa-robot"></i></div>
                    <div style="background:#F0F0FF; padding:15px 20px; border-radius:15px; font-size:15px; line-height:1.6; max-width:80%;">
                        ${result.advice || result.description || 'Analysis complete. See details below.'}
                    </div>
                </div>
            `;

            // Update result panel
            const resultText = document.getElementById('aiResultText');
            const diffTag = document.getElementById('aiDifficultyTag');
            const quickFixSection = document.getElementById('aiQuickFix');
            const quickFixList = document.getElementById('aiQuickFixList');

            if (resultText) resultText.textContent = result.advice || result.description;
            if (diffTag) diffTag.textContent = `DIFFICULTY: ${result.difficulty || result.severity || 'MEDIUM'}`.toUpperCase();
            
            const fixes = result.quickFixes || result.steps || [];
            if (quickFixList) quickFixList.innerHTML = fixes.map(f => `<li>${f}</li>`).join('');
            if (quickFixSection) quickFixSection.style.display = fixes.length > 0 ? 'block' : 'none';
            
            resArea.style.display = 'block';
            resArea.scrollIntoView({ behavior: 'smooth' });

            // Match Techs
            const category = result.category || 'plumbing';
            const matched = state.technicians.filter(t => t.tags.some(tag => tag.toLowerCase().includes(category)) || t.title.toLowerCase().includes(category));
            const grid = document.getElementById('aiTechGrid');
            if (grid) {
                grid.innerHTML = matched.length > 0 ? matched.map(tech => `
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
                `).join('') : '<p style="color:#888; grid-column:1/-1; text-align:center;">No exact matches — browse the Marketplace for more pros.</p>';
            }

        } catch (error) {
            console.error('AI Diagnosis Error:', error);
            showToast('AI analysis encountered an issue. Showing fallback results.', 'error');
        } finally {
            btn.disabled = false;
            btn.innerHTML = '<i class="fas fa-magic"></i> ANALYZE';
            state.currentAIImages = []; // Clear for next run
        }
    }

    // ---- Voice Input ----
    let isRecordingVoice = false;
    function toggleVoiceInput() {
        const btn = document.getElementById('btnVoiceAI');
        const input = document.getElementById('aiQueryInput');
        
        if (!('webkitSpeechRecognition' in window)) {
            showToast('Voice recognition is not supported in this browser.', 'error');
            return;
        }

        if (isRecordingVoice) {
            // SpeechRecognition is handled fully asynchronously, just UI state here.
            isRecordingVoice = false;
            btn.style.color = '';
            btn.style.animation = '';
            return;
        }

        const recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        
        recognition.onstart = () => {
            isRecordingVoice = true;
            btn.style.color = '#EF4444';
            btn.style.animation = 'pulse 1s infinite';
            input.placeholder = "Listening...";
        };
        
        recognition.onresult = (event) => {
            const transcript = event.results[0][0].transcript;
            input.value = transcript;
            isRecordingVoice = false;
            btn.style.color = '';
            btn.style.animation = '';
            input.placeholder = "Describe your issue...";
        };
        
        recognition.onerror = () => {
            isRecordingVoice = false;
            btn.style.color = '';
            btn.style.animation = '';
            input.placeholder = "Describe your issue...";
            showToast('Voice recognition failed.', 'error');
        };
        
        recognition.start();
    }

    // ---- Role Logic ----
    function toggleRole() {
        if (state.role === 'guest' || state.role === 'user') state.role = 'technician';
        else if (state.role === 'technician') state.role = 'admin';
        else state.role = 'user';

        const roleBtn = document.getElementById('topRole');
        const adminMenu = document.getElementById('menu-admin');
        const searchItem = document.querySelector('.menu-item[data-page="marketplace"]');
        const statsItem = document.querySelector('.menu-item[data-page="statistics"]');
        
        const searchSpan = searchItem ? searchItem.querySelector('span') : null;
        const statsSpan = statsItem ? statsItem.querySelector('span') : null;
        
        if (state.role === 'admin') {
            roleBtn.textContent = 'Switch to User';
            roleBtn.style.background = 'rgba(76, 57, 172, 0.1)';
            if (adminMenu) adminMenu.style.display = 'flex';
        } else if (state.role === 'technician') {
            roleBtn.textContent = 'Switch to Admin';
            roleBtn.style.background = 'rgba(16, 185, 129, 0.1)';
            if (adminMenu) adminMenu.style.display = 'none';
            if (searchSpan) searchSpan.textContent = "Pro Panel";
        } else {
            roleBtn.textContent = 'Switch to Pro';
            roleBtn.style.background = 'rgba(76, 57, 172, 0.1)';
            roleBtn.style.color = 'var(--jobie-purple)';
            if (adminMenu) adminMenu.style.display = 'none';
            if (searchSpan) searchSpan.textContent = 'Search Job';
            if (statsSpan) statsSpan.textContent = 'Statistics';
            navigate('marketplace');
        }
        
        // Render role-specific data
        if (state.role === 'technician') renderLeads();
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

    function openChatForTech(techId) {
        const tech = state.technicians.find(t => t.id == techId);
        if (!tech) return showToast("Technician not found.", "error");

        const conv = ChatService.getOrCreateConversationForTech(tech);
        closeDrawer();
        navigate('chat');

        setTimeout(() => {
            const targetChat = document.querySelector(`.chat-list-item[data-conv-id="${conv.id}"]`);
            if (targetChat) {
                targetChat.click();
            } else {
                showToast("Chat thread unexpectedly unavailable.", "error");
            }
        }, 100);
    }

    function setUser(user) {
        state.user = user;
        if (user) {
            state.role = user.role || 'user';
        } else {
            state.role = 'guest';
        }
        updateUI();
    }

    function updateUI() {
        const topName = document.getElementById('userName');
        const topAvatar = document.getElementById('userAvatar');
        const topRole = document.getElementById('userRole');

        if (state.user) {
            if (topName) topName.textContent = state.user.displayName || state.user.name || state.user.firstName || state.user.email;
            if (topAvatar) topAvatar.src = state.user.photoURL || `https://ui-avatars.com/api/?name=${state.user.name || 'User'}&background=4b39ac&color=fff`;
            if (topRole) topRole.textContent = `Role: ${state.role.toUpperCase()}`;
        } else {
            if (topName) topName.textContent = 'Guest User';
            if (topAvatar) topAvatar.src = "https://ui-avatars.com/api/?name=Guest&background=4b39ac&color=fff";
            if (topRole) topRole.textContent = 'Switch to Pro';
        }

        // Refresh dynamic content
        if (state.currentPage === 'dashboard') renderDashboard();
        if (state.role === 'technician') renderLeads();
    }

    function init() {
        document.querySelectorAll('.menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const page = item.dataset.page;
                state.currentPage = page;
                if (state.role === 'technician' && page === 'marketplace') {
                    navigate('leads');
                } else {
                    navigate(page);
                }
            });
        });

        initSearch();
        renderTechnicians();

        document.getElementById('bookingForm')?.addEventListener('submit', submitBooking);

        // Enter key for AI input
        document.getElementById('aiQueryInput')?.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') { e.preventDefault(); runAIDiagnosis(); }
        });

        // Top-bar action icons (messages, etc.)
        document.querySelectorAll('.action-icon[data-page]').forEach(icon => {
            icon.style.cursor = 'pointer';
            icon.addEventListener('click', () => navigate(icon.dataset.page));
        });

        // Suggestion tags
        document.querySelectorAll('.suggestions .tag').forEach(tag => {
            tag.addEventListener('click', () => {
                const query = tag.textContent === 'All Pros' ? '' : tag.textContent;
                const input = document.querySelector('.main-search');
                if (input) { input.value = query; input.dispatchEvent(new Event('input')); }
                document.querySelectorAll('.suggestions .tag').forEach(t => t.classList.remove('active'));
                tag.classList.add('active');
            });
        });

        // Preload user from storage
        const storedUser = localStorage.getItem('hv_user');
        if (storedUser) setUser(JSON.parse(storedUser));

        // Geolocation Logic
        fetchGeolocation();

        if (typeof firebase !== 'undefined') {
            firebase.auth().onAuthStateChanged(user => {
                if (user) setUser(user);
            });
        }
    }

    function fetchGeolocation() {
        const bdg = document.getElementById('liveLocationBadge');
        if (!bdg) return;
        
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (pos) => {
                    // For mockup, assume Cyprus based application
                    setTimeout(() => { bdg.innerHTML = '<i class="fas fa-map-marker-alt" style="color:#10B981"></i> Nicosia, Cyprus (Live)'; }, 1000);
                },
                (err) => {
                    bdg.innerHTML = '<i class="fas fa-map-marker-alt"></i> Cyprus (Default)';
                }
            );
        } else {
            bdg.innerHTML = '<i class="fas fa-map-marker-alt"></i> Cyprus';
        }
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();

    return { navigate, exploreService, openChatForTech, renderTechnicians, selectTech, openBooking, closeDrawer, runAIDiagnosis, handleAIImage, toggleVoiceInput, toggleRole, bidOnLead, nextStep, prevStep, completeJobSim, setUser, state, showToast, on, emit };
})();



