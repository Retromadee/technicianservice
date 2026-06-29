/**
 * Firebase Seeding Utility — Cyprus Edition
 * Populates Firebase Realtime DB with Cyprus-localised data.
 * Also creates the Master Plumber technician account in Firebase Auth.
 */
const SeedService = (() => {
    // ── MASTER PLUMBER LOGIN CREDENTIALS ──────────────────────────────────
    // Email: masterplumber@homefix.cy
    // Password: Plumber@1234
    // ──────────────────────────────────────────────────────────────────────

    const technicians = [
        { id: 1,  title: 'Master Plumber',        company: 'ExpertFlow Cyprus',    rate: '₺1,200/visit', rateNum: 1200, logo: 'EF', color: 'logo-blue',   loc: 'Nicosia (Lefkoşa)',       rating: 4.9, tags: ['Plumbing','Pipeline','Bathroom','Leak'],         hires: 84,  yearsInBusiness: 12, isTopPro: true,  desc: 'Licensed Master Plumber with 15 years experience. Specialises in leak detection, emergency pipe repairs and smart bathroom installations across Northern Cyprus.', reviews: 124, pricing: { diagnostic: 300, standard: 1200, emergency: 2000 }, responseTime: '< 2 hrs',  loginEmail: 'masterplumber@homefix.cy' },
        { id: 2,  title: 'Drain Specialist',       company: 'ClearPipe Cyprus',     rate: '₺900/visit',  rateNum: 900,  logo: 'CP', color: 'logo-green',  loc: 'Kyrenia (Girne)',         rating: 4.7, tags: ['Plumbing','Drain','Sewer','Clog'],               hires: 62,  yearsInBusiness: 9,  isTopPro: false, desc: 'Expert drain unclogging and sewer line repair. Advanced camera inspection technology available.', reviews: 87,  pricing: { diagnostic: 250, standard: 900,  emergency: 1500 }, responseTime: '< 3 hrs' },
        { id: 3,  title: 'Gas & Water Fitter',     company: 'AquaSafe Cyprus',      rate: '₺1,500/visit',rateNum: 1500, logo: 'AS', color: 'logo-orange', loc: 'Larnaca (Larnaka)',       rating: 4.8, tags: ['Plumbing','Gas','Water Heater','Boiler'],       hires: 105, yearsInBusiness: 14, isTopPro: true,  desc: 'Licensed gas engineer. Specialising in boiler installation, water heater repair, and gas line work.', reviews: 156, pricing: { diagnostic: 400, standard: 1500, emergency: 2500 }, responseTime: '< 1 hr'  },
        { id: 4,  title: 'Senior Electrician',     company: 'VoltGuard Cyprus',     rate: '₺1,100/visit',rateNum: 1100, logo: 'VG', color: 'logo-orange', loc: 'Limassol (Limasol)',      rating: 4.8, tags: ['Electrical','Wiring','Safety','Panel'],         hires: 142, yearsInBusiness: 8,  isTopPro: true,  desc: 'Industrial and residential wiring specialist. Expert in panel upgrades and smart home safety audits.', reviews: 89,  pricing: { diagnostic: 350, standard: 1100, emergency: 1800 }, responseTime: '< 2 hrs' },
        { id: 5,  title: 'EV Charger Installer',   company: 'GreenVolt Cyprus',     rate: '₺1,800/visit',rateNum: 1800, logo: 'GV', color: 'logo-green',  loc: 'Nicosia (Lefkoşa)',       rating: 4.9, tags: ['Electrical','EV','Charger','Solar'],            hires: 38,  yearsInBusiness: 5,  isTopPro: true,  desc: 'Certified EV charger and solar panel installer. Level 2 & DC fast charging for all brands.', reviews: 64,  pricing: { diagnostic: 0,   standard: 1800, emergency: 2800 }, responseTime: '< 4 hrs' },
        { id: 6,  title: 'Lighting Designer',      company: 'LuxWire Cyprus',       rate: '₺950/visit',  rateNum: 950,  logo: 'LW', color: 'logo-pink',   loc: 'Paphos (Baf)',            rating: 4.6, tags: ['Electrical','Lighting','LED','Design'],         hires: 76,  yearsInBusiness: 7,  isTopPro: false, desc: 'Architectural lighting design and installation. Recessed, track, and smart RGB systems for premium villas.', reviews: 52, pricing: { diagnostic: 250, standard: 950,  emergency: 1500 }, responseTime: '< 3 hrs' },
        { id: 7,  title: 'HVAC Specialist',        company: 'AirPure Cyprus',       rate: '₺1,300/visit',rateNum: 1300, logo: 'AP', color: 'logo-pink',   loc: 'Famagusta (Gazimağusa)',  rating: 4.7, tags: ['HVAC','AC','Ventilation','Heat Pump'],          hires: 95,  yearsInBusiness: 6,  isTopPro: false, desc: 'Precision maintenance and urgent repair for split AC systems and central ventilation.', reviews: 56,  pricing: { diagnostic: 350, standard: 1300, emergency: 2200 }, responseTime: '< 2 hrs' },
        { id: 8,  title: 'AC Technician',          company: 'CoolBreeze Cyprus',    rate: '₺900/visit',  rateNum: 900,  logo: 'CB', color: 'logo-blue',   loc: 'Kyrenia (Girne)',         rating: 4.5, tags: ['HVAC','AC','Air Conditioning','Refrigerant'],   hires: 130, yearsInBusiness: 10, isTopPro: false, desc: 'Fast AC diagnostics and refrigerant recharge. Serving residential and commercial split systems.', reviews: 98,  pricing: { diagnostic: 300, standard: 900,  emergency: 1500 }, responseTime: '< 3 hrs' },
        { id: 9,  title: 'Heating Engineer',       company: 'WarmCore Cyprus',      rate: '₺1,600/visit',rateNum: 1600, logo: 'WC', color: 'logo-orange', loc: 'Nicosia (Lefkoşa)',       rating: 4.9, tags: ['HVAC','Heating','Radiator','Underfloor'],       hires: 44,  yearsInBusiness: 16, isTopPro: true,  desc: 'Underfloor heating and radiator expert. Full system design, installation, and annual maintenance.', reviews: 71,  pricing: { diagnostic: 400, standard: 1600, emergency: 2600 }, responseTime: '< 1 hr'  },
        { id: 10, title: 'Appliance Repair',        company: 'HomeFix Cyprus',       rate: '₺800/visit',  rateNum: 800,  logo: 'HF', color: 'logo-green',  loc: 'Limassol (Limasol)',      rating: 4.9, tags: ['Appliance','Repair','Washing Machine','Fridge'],hires: 310, yearsInBusiness: 15, isTopPro: true,  desc: 'Certified expert for all household brands. Rapid fix for refrigerators, dishwashers, and ovens.', reviews: 210, pricing: { diagnostic: 200, standard: 800,  emergency: 1300 }, responseTime: '< 2 hrs' },
        { id: 11, title: 'Kitchen Tech',            company: 'ApplianceMD Cyprus',   rate: '₺750/visit',  rateNum: 750,  logo: 'AM', color: 'logo-blue',   loc: 'Larnaca (Larnaka)',       rating: 4.6, tags: ['Appliance','Kitchen','Oven','Dishwasher'],      hires: 88,  yearsInBusiness: 7,  isTopPro: false, desc: 'Specialising in kitchen appliance repair — ovens, microwaves, dishwashers, and range hoods.', reviews: 63,  pricing: { diagnostic: 200, standard: 750,  emergency: 1200 }, responseTime: '< 4 hrs' },
        { id: 12, title: 'Carpentry Pro',           company: 'WoodCraft Cyprus',     rate: '₺1,400/day',  rateNum: 1400, logo: 'WS', color: 'logo-blue',   loc: 'Paphos (Baf)',            rating: 5.0, tags: ['Carpentry','Custom','Renovation','Cabinet'],    hires: 28,  yearsInBusiness: 20, isTopPro: true,  desc: 'Bespoke cabinetry and structural carpentry. Specialising in high-end restoration and modern furniture.', reviews: 42,  pricing: { diagnostic: 0,   standard: 1400, emergency: 2200 }, responseTime: '< 6 hrs' },
        { id: 13, title: 'General Contractor',      company: 'BuildRight Cyprus',    rate: '₺1,200/day',  rateNum: 1200, logo: 'BR', color: 'logo-orange', loc: 'Nicosia (Lefkoşa)',       rating: 4.8, tags: ['Carpentry','Renovation','Drywall','Flooring'],  hires: 156, yearsInBusiness: 12, isTopPro: true,  desc: 'Full-service renovation contractor. Drywall, flooring, painting, and structural modifications.', reviews: 134, pricing: { diagnostic: 300, standard: 1200, emergency: 1900 }, responseTime: '< 3 hrs' },
        { id: 14, title: 'Smart Home Tech',         company: 'SecureIoT Cyprus',     rate: '₺1,800/job',  rateNum: 1800, logo: 'SI', color: 'logo-green',  loc: 'Limassol (Limasol)',      rating: 4.6, tags: ['IoT','Security','Automation','Smart Home'],     hires: 52,  yearsInBusiness: 4,  isTopPro: false, desc: 'Designing and installing complex IoT ecosystems, smart lighting, and 4K security networks.', reviews: 78,  pricing: { diagnostic: 400, standard: 1800, emergency: 2800 }, responseTime: '< 4 hrs' },
        { id: 15, title: 'Security Installer',      company: 'GuardTech Cyprus',     rate: '₺1,100/job',  rateNum: 1100, logo: 'GT', color: 'logo-pink',   loc: 'Kyrenia (Girne)',         rating: 4.7, tags: ['Security','CCTV','Alarm','Smart Home'],         hires: 91,  yearsInBusiness: 9,  isTopPro: false, desc: 'CCTV systems, alarm installation, smart locks, and full perimeter security for homes and offices.', reviews: 103, pricing: { diagnostic: 300, standard: 1100, emergency: 1800 }, responseTime: '< 2 hrs' },
        { id: 16, title: 'Deep Clean Expert',       company: 'SparkleHome Cyprus',   rate: '₺700/day',    rateNum: 700,  logo: 'SP', color: 'logo-pink',   loc: 'Famagusta (Gazimağusa)',  rating: 4.8, tags: ['Cleaning','Deep Clean','Sanitization'],         hires: 240, yearsInBusiness: 6,  isTopPro: true,  desc: 'Professional deep cleaning, move-in/out cleaning, and sanitization. Eco-friendly products.', reviews: 189, pricing: { diagnostic: 0,   standard: 700,  emergency: 1100 }, responseTime: '< 1 hr'  },
        { id: 17, title: 'Roof & Gutter Pro',       company: 'TopShield Cyprus',     rate: '₺1,300/job',  rateNum: 1300, logo: 'TS', color: 'logo-orange', loc: 'Larnaca (Larnaka)',       rating: 4.7, tags: ['Roofing','Gutter','Leak','Exterior'],           hires: 67,  yearsInBusiness: 11, isTopPro: false, desc: 'Roof inspection, leak repair, tile replacement, and gutter cleaning. Storm damage specialists.', reviews: 81,  pricing: { diagnostic: 350, standard: 1300, emergency: 2100 }, responseTime: '< 3 hrs' },
        { id: 18, title: 'Painting Specialist',     company: 'ColorEdge Cyprus',     rate: '₺950/day',    rateNum: 950,  logo: 'CE', color: 'logo-green',  loc: 'Paphos (Baf)',            rating: 4.9, tags: ['Painting','Interior','Exterior','Wallpaper'],   hires: 115, yearsInBusiness: 8,  isTopPro: true,  desc: 'Interior and exterior painting, accent walls, wallpaper installation, and colour consultation.', reviews: 147, pricing: { diagnostic: 0,   standard: 950,  emergency: 1500 }, responseTime: '< 4 hrs' }
    ];

    async function seedTechnicians() {
        const db = FirebaseConfig.getDb();
        console.log('🚀 Starting Cyprus seeding process...');

        try {
            // Seed Technicians
            const techRef = db.ref('technicians');
            await techRef.set({});
            for (const tech of technicians) {
                await techRef.child(tech.id).set(tech);
                console.log(`✅ Seeded Tech: ${tech.company}`);
            }

            // Seed demo users
            const usersRef = db.ref('users');
            const demoUsers = {
                'demo_user': { name: 'Kemal Yıldız', email: 'user@homefix.cy', role: 'user', lastLogin: new Date().toISOString() },
                'demo_pro':  { name: 'Ahmet Kaya (Master Plumber)', email: 'masterplumber@homefix.cy', role: 'technician', techId: 1, lastLogin: new Date().toISOString() }
            };
            await usersRef.update(demoUsers);
            console.log('✅ Seeded demo users');

            console.log('✨ Cyprus seeding complete!');
            return true;
        } catch (error) {
            console.error('❌ Seeding failed:', error);
            return false;
        }
    }

    /**
     * Creates the Master Plumber Firebase Auth account and sets their role.
     * Call once from the admin panel or browser console:
     *   await SeedService.createMasterPlumberAccount()
     */
    async function createMasterPlumberAccount() {
        if (typeof firebase === 'undefined' || !firebase.auth) {
            console.error('Firebase not initialised');
            return false;
        }
        const email    = 'masterplumber@homefix.cy';
        const password = 'Plumber@1234';

        try {
            // Create Firebase Auth user
            const cred = await firebase.auth().createUserWithEmailAndPassword(email, password);
            const uid  = cred.user.uid;

            // Update display name
            await cred.user.updateProfile({ displayName: 'Ahmet Kaya — Master Plumber' });

            // Write role to database
            const db = FirebaseConfig.getDb();
            await db.ref(`roles/${uid}`).set({ role: 'technician', techId: 1, email });
            await db.ref(`users/${uid}`).set({
                name: 'Ahmet Kaya',
                email,
                role: 'technician',
                techId: 1,
                photo: `https://ui-avatars.com/api/?name=Ahmet+Kaya&background=3b82f6&color=fff&bold=true`,
                createdAt: new Date().toISOString()
            });

            // Update tech record with uid for chat linking
            await db.ref('technicians/1').update({ uid, email });

            console.log(`✅ Master Plumber account created! UID: ${uid}`);
            console.log(`   Email: ${email}`);
            console.log(`   Password: ${password}`);
            return uid;
        } catch (err) {
            if (err.code === 'auth/email-already-in-use') {
                console.warn('ℹ️  Master Plumber account already exists.');
                return 'already-exists';
            }
            console.error('❌ Failed to create Master Plumber:', err);
            return false;
        }
    }

    return { seedTechnicians, createMasterPlumberAccount };
})();
