/**
 * HomeFix Pro — Cyprus Edition Mock Data
 * All locations: Cyprus | Currency: Turkish Lira (₺)
 */

const MockData = {
    // ---- All Platform Services ----
    services: [
        { id: 'plumbing',    name: 'Plumbing',        icon: 'fa-faucet',      color: '#6366f1', desc: 'Leaks, burst pipes, drain clogs, water heater repairs, faucet installation and full bathroom renovations.', avgPrice: '₺800–₺1,500/visit' },
        { id: 'electrical',  name: 'Electrical',      icon: 'fa-bolt',        color: '#f59e0b', desc: 'Wiring, panel upgrades, outlet repairs, EV charger installation and smart home setups.', avgPrice: '₺900–₺1,800/visit' },
        { id: 'hvac',        name: 'HVAC',            icon: 'fa-snowflake',   color: '#3b82f6', desc: 'AC repair, furnace tune-ups, duct cleaning, thermostat installation and air quality assessments.', avgPrice: '₺1,000–₺2,000/visit' },
        { id: 'cleaning',    name: 'Cleaning',        icon: 'fa-broom',       color: '#10b981', desc: 'Deep cleaning, carpet shampooing, window washing, move-in/move-out and post-renovation cleanup.', avgPrice: '₺500–₺1,000/day' },
        { id: 'carpentry',   name: 'Carpentry',       icon: 'fa-hammer',      color: '#8b5cf6', desc: 'Custom shelving, deck building, door/window framing, cabinet repair and furniture restoration.', avgPrice: '₺700–₺1,400/day' },
        { id: 'painting',    name: 'Painting',        icon: 'fa-paint-roller',color: '#ec4899', desc: 'Interior & exterior painting, wallpaper removal, color consulting and drywall patching.', avgPrice: '₺600–₺1,200/day' },
        { id: 'roofing',     name: 'Roofing',         icon: 'fa-home',        color: '#ef4444', desc: 'Leak repair, tile replacement, gutter cleaning, insulation and full roof installations.', avgPrice: '₺1,200–₺3,000/job' },
        { id: 'appliance',   name: 'Appliance Repair',icon: 'fa-blender',     color: '#14b8a6', desc: 'Washer, dryer, dishwasher, refrigerator, oven and microwave diagnostics and repair.', avgPrice: '₺600–₺1,200/visit' },
        { id: 'landscaping', name: 'Landscaping',     icon: 'fa-leaf',        color: '#22c55e', desc: 'Lawn care, tree trimming, irrigation systems, garden design and hardscape installation.', avgPrice: '₺700–₺1,500/day' },
        { id: 'smart-home',  name: 'Smart Home',      icon: 'fa-wifi',        color: '#0ea5e9', desc: 'Smart locks, cameras, lighting automation, voice assistant setup and network wiring.', avgPrice: '₺900–₺2,000/job' },
        { id: 'pest-control',name: 'Pest Control',    icon: 'fa-bug',         color: '#a3e635', desc: 'Termite treatment, rodent removal, insect extermination and preventive maintenance.', avgPrice: '₺1,200–₺2,500/visit' },
        { id: 'locksmith',   name: 'Locksmith',       icon: 'fa-key',         color: '#f97316', desc: 'Lock replacement, key duplication, smart lock installation and emergency lockout service.', avgPrice: '₺400–₺1,000/call' }
    ],

    // ---- Technicians ----
    technicians: [
        { id: 'tech1', name: 'Ahmet Kaya',       specialties: ['Plumbing', 'HVAC'],          rating: 4.9, reviews: 124, jobs_completed: 312, base_rate: '₺850', avatar: 'https://ui-avatars.com/api/?name=Ahmet+Kaya&background=3b82f6&color=fff',     description: 'Licensed Master Plumber with 15 years experience in Nicosia and surroundings.', location: 'Nicosia (Lefkoşa)', verified: true, response_time: '< 1 hour' },
        { id: 'tech2', name: 'Elena Georgiou',   specialties: ['Electrical', 'Smart Home'],  rating: 5.0, reviews: 89,  jobs_completed: 198, base_rate: '₺950', avatar: 'https://ui-avatars.com/api/?name=Elena+Georgiou&background=7c3aed&color=fff', description: 'Certified electrical engineer specialising in residential wiring and smart home systems.', location: 'Limassol (Limasol)', verified: true, response_time: '< 2 hours' },
        { id: 'tech3', name: 'Mustafa Şahin',    specialties: ['Appliance Repair', 'Carpentry'], rating: 4.7, reviews: 56, jobs_completed: 145, base_rate: '₺700', avatar: 'https://ui-avatars.com/api/?name=Mustafa+Sahin&background=10b981&color=fff', description: 'General contractor serving Kyrenia and Famagusta. "I fix what others can\'t."', location: 'Kyrenia (Girne)', verified: true, response_time: '< 3 hours' },
        { id: 'tech4', name: 'Rapid Fix Cyprus', specialties: ['Plumbing'],                  rating: 4.8, reviews: 430, jobs_completed: 890, base_rate: '₺1,500', avatar: 'https://ui-avatars.com/api/?name=Rapid+Fix&background=ef4444&color=fff',    description: 'Emergency plumbing services available 24/7 across all Cyprus.', location: 'Larnaca (Larnaka)', verified: true, response_time: '< 30 min' },
        { id: 'tech5', name: 'Maria Papadopoulos',specialties: ['Painting', 'Cleaning'],    rating: 4.9, reviews: 212, jobs_completed: 410, base_rate: '₺650', avatar: 'https://ui-avatars.com/api/?name=Maria+Papa&background=ec4899&color=fff',    description: 'Interior design and painting specialist based in Paphos. Color consulting included.', location: 'Paphos (Baf)', verified: true, response_time: '< 2 hours' },
        { id: 'tech6', name: 'Hüseyin Öztürk',   specialties: ['HVAC', 'Electrical'],       rating: 4.6, reviews: 78,  jobs_completed: 167, base_rate: '₺1,100', avatar: 'https://ui-avatars.com/api/?name=Huseyin+Oz&background=0ea5e9&color=fff',   description: 'HVAC certified technician with 10 years experience across Northern Cyprus.', location: 'Famagusta (Gazimağusa)', verified: true, response_time: '< 1 hour' },
        { id: 'tech7', name: 'Cyprus Green Gardens',specialties: ['Landscaping'],           rating: 4.8, reviews: 165, jobs_completed: 520, base_rate: '₺800', avatar: 'https://ui-avatars.com/api/?name=Cyprus+Green&background=22c55e&color=fff',  description: 'Full-service landscaping and garden design for residential and villa properties.', location: 'Morphou (Güzelyurt)', verified: true, response_time: '< 4 hours' },
        { id: 'tech8', name: 'Yusuf Arslan',      specialties: ['Roofing', 'Carpentry'],    rating: 4.5, reviews: 93,  jobs_completed: 245, base_rate: '₺1,000', avatar: 'https://ui-avatars.com/api/?name=Yusuf+Arslan&background=f97316&color=fff',  description: 'Licensed roofer specialising in clay tile and flat roof repairs across Cyprus.', location: 'Nicosia (Lefkoşa)', verified: true, response_time: '< 2 hours' }
    ],

    // ---- Active Jobs (Marketplace) ----
    jobs: [
        { id: 'job1',  title: 'Kitchen Sink Leak — Water Damage Risk',  category: 'plumbing',    urgency: 'high',   description: 'Water leaking from under kitchen sink, causing damage to cabinet floor. Visible mold starting. Need immediate repair.', location: 'Nicosia, Kermia',   quotesCount: 3, status: 'active', createdAt: new Date(Date.now() - 3600000).toISOString(),   budget: '₺800–₺1,500',  images: 1 },
        { id: 'job2',  title: 'Outlet Sparking When Plugged In',         category: 'electrical',  urgency: 'high',   description: 'Living room outlet produces sparks when inserting plugs. Burning smell noticed. Breaker trips frequently.', location: 'Limassol, Agios Tychonas', quotesCount: 5, status: 'active', createdAt: new Date(Date.now() - 10800000).toISOString(), budget: '₺1,000–₺2,000', images: 2 },
        { id: 'job3',  title: 'AC Unit Not Cooling — Second Floor',      category: 'hvac',        urgency: 'medium', description: 'Central AC running but not cooling upstairs rooms. Filter replaced last month. Thermostat shows 35°C.', location: 'Kyrenia, Alsancak', quotesCount: 2, status: 'active', createdAt: new Date(Date.now() - 21600000).toISOString(),  budget: '₺1,200–₺2,500', images: 0 },
        { id: 'job4',  title: 'Exterior Villa Painting — 2 Story',       category: 'painting',    urgency: 'low',    description: 'Need full exterior repaint for a 2-story villa. Current paint is peeling. Prefer white or cream tones.', location: 'Paphos, Chloraka', quotesCount: 7, status: 'active', createdAt: new Date(Date.now() - 86400000).toISOString(),  budget: '₺8,000–₺18,000',images: 4 },
        { id: 'job5',  title: 'Dishwasher Not Draining',                 category: 'appliance',   urgency: 'medium', description: 'Bosch dishwasher fills with water but won\'t drain at end of cycle. Error code E24. 3 years old.', location: 'Larnaca, Mackenzie', quotesCount: 4, status: 'active', createdAt: new Date(Date.now() - 43200000).toISOString(),  budget: '₺600–₺1,200',  images: 1 },
        { id: 'job6',  title: 'Roof Leak During Heavy Rain',             category: 'roofing',     urgency: 'high',   description: 'Water dripping from ceiling in master bedroom during rainstorms. Stain growing larger each storm.', location: 'Nicosia, Lakatamia', quotesCount: 2, status: 'active', createdAt: new Date(Date.now() - 7200000).toISOString(),   budget: '₺2,000–₺6,000', images: 3 },
        { id: 'job7',  title: 'Custom Built-In Shelving',                category: 'carpentry',   urgency: 'low',    description: 'Looking for someone to build floor-to-ceiling built-in shelves in home office. Oak preferred.', location: 'Famagusta, Salamis', quotesCount: 6, status: 'active', createdAt: new Date(Date.now() - 172800000).toISOString(), budget: '₺5,000–₺10,000', images: 2 },
        { id: 'job8',  title: 'Smart Home Setup — Full Villa',           category: 'smart-home',  urgency: 'low',    description: 'Need complete smart home installation: Ring doorbell, Nest thermostat, Philips Hue lighting in a 4-bedroom villa.', location: 'Kyrenia, Esentepe', quotesCount: 3, status: 'active', createdAt: new Date(Date.now() - 259200000).toISOString(), budget: '₺6,000–₺14,000', images: 0 },
        { id: 'job9',  title: 'Deep Clean — 3BR Apartment',             category: 'cleaning',    urgency: 'medium', description: 'Move-out deep cleaning for a 3-bedroom apartment. Kitchen, bathrooms, windows and marble floors.', location: 'Limassol, Mesa Geitonia', quotesCount: 8, status: 'active', createdAt: new Date(Date.now() - 14400000).toISOString(),  budget: '₺1,500–₺2,500', images: 0 },
        { id: 'job10', title: 'Garden Redesign & Stone Patio',           category: 'landscaping', urgency: 'low',    description: 'Complete garden makeover: new stone patio, raised beds, olive trees, drip irrigation, LED pathway lighting.', location: 'Paphos, Tala', quotesCount: 4, status: 'active', createdAt: new Date(Date.now() - 345600000).toISOString(), budget: '₺12,000–₺30,000',images: 5 }
    ],

    // ---- Recent Reviews ----
    reviews: [
        { id: 'r1', techId: 'tech1', userName: 'Kemal B.',   rating: 5, text: 'Ahmet fixed our burst pipe in under an hour. Very professional and clean. Will definitely use again!', date: '2 days ago', jobCategory: 'Plumbing' },
        { id: 'r2', techId: 'tech2', userName: 'Nikos T.',   rating: 5, text: 'Elena rewired our entire kitchen and installed USB outlets. Explained everything clearly. Top-notch!', date: '1 week ago', jobCategory: 'Electrical' },
        { id: 'r3', techId: 'tech5', userName: 'Anna R.',    rating: 5, text: 'Maria transformed our living room with a beautiful colour scheme. Her attention to detail is amazing.', date: '3 days ago', jobCategory: 'Painting' },
        { id: 'r4', techId: 'tech4', userName: 'Selin M.',   rating: 4, text: 'Fast response for an emergency leak at 2am. A bit pricey but worth it for 24/7 availability.', date: '5 days ago', jobCategory: 'Plumbing' },
        { id: 'r5', techId: 'tech6', userName: 'Deniz S.',   rating: 5, text: 'Hüseyin diagnosed our AC issue in minutes — just needed a capacitor. Saved us a lot!', date: '1 week ago', jobCategory: 'HVAC' },
        { id: 'r6', techId: 'tech3', userName: 'Mehmet K.',  rating: 4, text: 'Mustafa repaired our dishwasher quickly. Good communication and fair pricing.', date: '4 days ago', jobCategory: 'Appliance Repair' }
    ],

    // ---- AI Diagnoses Map ----
    diagnoses: {
        plumbing:    { cause: "Corroded gasket or loose valve compression nut.", fix: "1. Turn off the water supply under the sink. 2. Unscrew the handle. 3. Replace the rubber O-ring or tighten the nut with a wrench.", difficulty: "Easy", est_parts: "₺50–₺150", est_time: "30 min" },
        electrical:  { cause: "Short circuit or overloaded circuit breaker.", fix: "1. Locate your main panel. 2. Find the tripped breaker (halfway between ON/OFF). 3. Switch fully OFF, then back ON. 4. Unplug high-draw appliances.", difficulty: "Medium", est_parts: "₺0 (Reset only)", est_time: "15 min" },
        hvac:        { cause: "Clogged air filter causing airflow restriction.", fix: "1. Switch off the unit. 2. Remove the access panel. 3. Pull out the dirty filter. 4. Slide in a fresh filter. 5. Restart.", difficulty: "Very Easy", est_parts: "₺150–₺300", est_time: "10 min" },
        appliance:   { cause: "Blocked drain hose or faulty pump.", fix: "1. Disconnect power. 2. Check the drain hose for kinks. 3. Clean the filter trap. 4. Run a rinse cycle with vinegar.", difficulty: "Easy", est_parts: "₺0–₺250", est_time: "20 min" },
        roofing:     { cause: "Damaged or missing tiles allowing water penetration.", fix: "1. Inspect the attic for daylight spots. 2. Apply roofing cement to small cracks. 3. For missing tiles, use emergency tarp until professional repair.", difficulty: "Hard — Professional Recommended", est_parts: "₺500–₺2,000", est_time: "1–3 hours" },
        painting:    { cause: "Moisture behind walls causing paint bubbles and peeling.", fix: "1. Scrape loose paint. 2. Sand the surface smooth. 3. Apply primer. 4. Repaint with moisture-resistant paint.", difficulty: "Easy", est_parts: "₺300–₺600", est_time: "2–4 hours" },
        carpentry:   { cause: "Wood swelling from humidity or foundation settling.", fix: "1. Check door/window frame alignment. 2. Sand or plane sticking edges. 3. Repaint/seal edges to prevent future swelling.", difficulty: "Medium", est_parts: "₺100–₺250", est_time: "1–2 hours" },
        'smart-home':{ cause: "Wi-Fi interference or outdated firmware.", fix: "1. Move the hub closer to router. 2. Update device firmware. 3. Check for channel congestion with a Wi-Fi analyzer app. 4. Reset and re-pair devices.", difficulty: "Easy", est_parts: "₺0", est_time: "30 min" },
        cleaning:    { cause: "Buildup of grime, hard water deposits, or mold.", fix: "1. Apply baking soda paste to surfaces. 2. Spray with white vinegar. 3. Scrub with a non-abrasive pad. 4. Rinse and dry.", difficulty: "Very Easy", est_parts: "₺50–₺100", est_time: "1–2 hours" },
        landscaping: { cause: "Compacted soil, poor drainage, or nutrient deficiency.", fix: "1. Aerate the lawn with a garden fork. 2. Apply balanced fertiliser. 3. Water deeply but infrequently. 4. Overseed bare patches.", difficulty: "Easy", est_parts: "₺200–₺400", est_time: "2–3 hours" }
    },

    // ---- Platform Stats ----
    platformStats: {
        totalUsers: 1248,
        totalTechnicians: 523,
        totalJobs: 4892,
        totalRevenue: '₺2.4M',
        avgRating: 4.8,
        avgResponseTime: '47 min',
        satisfactionRate: '94%',
        repeatCustomers: '68%'
    }
};

window.MockData = MockData;
