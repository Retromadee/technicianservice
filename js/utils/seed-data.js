/**
 * Firebase Seeding Utility
 * Run this to populate the Realtime Database with initial mock data.
 */
const SeedService = (() => {
    const technicians = [
        { id: 1,  title: 'Master Plumber',       company: 'ExpertFlow Team',     rate: '$45/hr', rateNum: 45, logo: 'EF', color: 'logo-blue',   loc: 'London, England',   rating: 4.9, tags: ['Plumbing','Pipeline','Bathroom','Leak'],       hires: 84,  yearsInBusiness: 12, isTopPro: true,  desc: 'Highly experienced in leak detection, emergency pipe repairs, and premium smart bathroom installations.', reviews: 124, pricing: { diagnostic: 30, standard: 85,  emergency: 150 }, responseTime: '< 2 hrs' },
        { id: 2,  title: 'Drain Specialist',     company: 'ClearPipe Co.',        rate: '$38/hr', rateNum: 38, logo: 'CP', color: 'logo-green',  loc: 'Manchester, UK',    rating: 4.7, tags: ['Plumbing','Drain','Sewer','Clog'],             hires: 62,  yearsInBusiness: 9,  isTopPro: false, desc: 'Expert drain unclogging and sewer line repair. Advanced camera inspection technology available.', reviews: 87,  pricing: { diagnostic: 25, standard: 70,  emergency: 130 }, responseTime: '< 3 hrs' },
        { id: 3,  title: 'Gas & Water Fitter',   company: 'AquaSafe Ltd.',        rate: '$55/hr', rateNum: 55, logo: 'AS', color: 'logo-orange', loc: 'Dublin, Ireland',   rating: 4.8, tags: ['Plumbing','Gas','Water Heater','Boiler'],     hires: 105, yearsInBusiness: 14, isTopPro: true,  desc: 'Licensed gas-safe engineer. Specializing in boiler installation, water heater repair, and gas line work.', reviews: 156, pricing: { diagnostic: 40, standard: 110, emergency: 180 }, responseTime: '< 1 hr'  },
        { id: 4,  title: 'Senior Electrician',   company: 'VoltGuard Studios',    rate: '$60/hr', rateNum: 60, logo: 'VG', color: 'logo-orange', loc: 'Berlin, Germany',   rating: 4.8, tags: ['Electrical','Wiring','Safety','Industrial'],  hires: 142, yearsInBusiness: 8,  isTopPro: true,  desc: 'Industrial and residential wiring specialist. Expert in panel upgrades and smart home safety audits.', reviews: 89,  pricing: { diagnostic: 35, standard: 95,  emergency: 165 }, responseTime: '< 2 hrs' },
        { id: 5,  title: 'EV Charger Installer', company: 'GreenVolt Energy',     rate: '$70/hr', rateNum: 70, logo: 'GV', color: 'logo-green',  loc: 'Amsterdam, NL',     rating: 4.9, tags: ['Electrical','EV','Charger','Solar'],          hires: 38,  yearsInBusiness: 5,  isTopPro: true,  desc: 'Certified EV charger and solar panel installer. Level 2 & DC fast charging for Tesla, BMW, and all brands.', reviews: 64,  pricing: { diagnostic: 0,  standard: 120, emergency: 200 }, responseTime: '< 4 hrs' },
        { id: 6,  title: 'Lighting Designer',    company: 'LuxWire Studio',       rate: '$50/hr', rateNum: 50, logo: 'LW', color: 'logo-pink',   loc: 'Milan, Italy',      rating: 4.6, tags: ['Electrical','Lighting','LED','Design'],       hires: 76,  yearsInBusiness: 7,  isTopPro: false, desc: 'Architectural lighting design and installation. Recessed, track, and smart RGB systems for premium homes.', reviews: 52,  pricing: { diagnostic: 25, standard: 80,  emergency: 140 }, responseTime: '< 3 hrs' },
        { id: 7,  title: 'HVAC Specialist',      company: 'AirPure Ltd.',         rate: '$55/hr', rateNum: 55, logo: 'AP', color: 'logo-pink',   loc: 'Paris, France',     rating: 4.7, tags: ['HVAC','AC','Ventilation','Heat Pump'],        hires: 95,  yearsInBusiness: 6,  isTopPro: false, desc: 'Precision maintenance and urgent repair for complex central ventilation systems and heat pumps.', reviews: 56,  pricing: { diagnostic: 35, standard: 100, emergency: 175 }, responseTime: '< 2 hrs' },
        { id: 8,  title: 'AC Technician',        company: 'CoolBreeze Pro',       rate: '$48/hr', rateNum: 48, logo: 'CB', color: 'logo-blue',   loc: 'Barcelona, Spain',  rating: 4.5, tags: ['HVAC','AC','Air Conditioning','Refrigerant'], hires: 130, yearsInBusiness: 10, isTopPro: false, desc: 'Fast AC diagnostics and refrigerant recharge. Serving residential and commercial split systems.', reviews: 98,  pricing: { diagnostic: 30, standard: 85,  emergency: 145 }, responseTime: '< 3 hrs' },
        { id: 9,  title: 'Heating Engineer',     company: 'WarmCore Systems',     rate: '$62/hr', rateNum: 62, logo: 'WC', color: 'logo-orange', loc: 'Stockholm, Sweden', rating: 4.9, tags: ['HVAC','Heating','Radiator','Underfloor'],     hires: 44,  yearsInBusiness: 16, isTopPro: true,  desc: 'Underfloor heating and radiator expert. Full system design, installation, and annual maintenance contracts.', reviews: 71,  pricing: { diagnostic: 40, standard: 115, emergency: 190 }, responseTime: '< 1 hr'  },
        { id: 10, title: 'Appliance Repair',     company: 'HomeFix Crew',         rate: '$40/hr', rateNum: 40, logo: 'HF', color: 'logo-green',  loc: 'Madrid, Spain',     rating: 4.9, tags: ['Appliance','Repair','Washing Machine','Fridge'], hires: 310, yearsInBusiness: 15, isTopPro: true, desc: 'Certified expert for all household brands. Rapid fix for refrigerators, dishwashers, and ovens.', reviews: 210, pricing: { diagnostic: 20, standard: 75,  emergency: 130 }, responseTime: '< 2 hrs' },
        { id: 11, title: 'Kitchen Tech',         company: 'ApplianceMD',          rate: '$42/hr', rateNum: 42, logo: 'AM', color: 'logo-blue',   loc: 'Vienna, Austria',   rating: 4.6, tags: ['Appliance','Kitchen','Oven','Dishwasher'],     hires: 88,  yearsInBusiness: 7,  isTopPro: false, desc: 'Specializing in kitchen appliance repair — ovens, microwaves, dishwashers, and range hoods.', reviews: 63,  pricing: { diagnostic: 20, standard: 70,  emergency: 125 }, responseTime: '< 4 hrs' },
        { id: 12, title: 'Carpentry Pro',        company: 'WoodCraft Studios',    rate: '$65/hr', rateNum: 65, logo: 'WS', color: 'logo-blue',   loc: 'NYC, USA',          rating: 5.0, tags: ['Carpentry','Custom','Renovation','Cabinet'],  hires: 28,  yearsInBusiness: 20, isTopPro: true,  desc: 'Bespoke cabinetry and structural carpentry. Specializing in high-end restoration and modern furniture.', reviews: 42,  pricing: { diagnostic: 0,  standard: 120, emergency: 200 }, responseTime: '< 6 hrs' },
        { id: 13, title: 'General Contractor',   company: 'BuildRight Group',     rate: '$58/hr', rateNum: 58, logo: 'BR', color: 'logo-orange', loc: 'Toronto, Canada',   rating: 4.8, tags: ['Carpentry','Renovation','Drywall','Flooring'],hires: 156, yearsInBusiness: 12, isTopPro: true,  desc: 'Full-service renovation contractor. Drywall, flooring, painting, and structural modifications.', reviews: 134, pricing: { diagnostic: 30, standard: 95,  emergency: 160 }, responseTime: '< 3 hrs' },
        { id: 14, title: 'Smart Home Tech',      company: 'SecureIoT Team',       rate: '$75/hr', rateNum: 75, logo: 'SI', color: 'logo-green',  loc: 'Tokyo, Japan',      rating: 4.6, tags: ['IoT','Security','Automation','Smart Home'],   hires: 52,  yearsInBusiness: 4,  isTopPro: false, desc: 'Designing and installing complex IoT ecosystems, smart lighting, and 4K security networks.', reviews: 78,  pricing: { diagnostic: 40, standard: 130, emergency: 220 }, responseTime: '< 4 hrs' },
        { id: 15, title: 'Security Installer',   company: 'GuardTech Solutions',  rate: '$55/hr', rateNum: 55, logo: 'GT', color: 'logo-pink',   loc: 'Sydney, Australia', rating: 4.7, tags: ['Security','CCTV','Alarm','Smart Home'],       hires: 91,  yearsInBusiness: 9,  isTopPro: false, desc: 'CCTV systems, alarm installation, smart locks, and full perimeter security for homes and offices.', reviews: 103, pricing: { diagnostic: 30, standard: 95,  emergency: 160 }, responseTime: '< 2 hrs' },
        { id: 16, title: 'Deep Clean Expert',    company: 'SparkleHome Pro',      rate: '$35/hr', rateNum: 35, logo: 'SP', color: 'logo-pink',   loc: 'Lisbon, Portugal',  rating: 4.8, tags: ['Cleaning','Deep Clean','Sanitization'],       hires: 240, yearsInBusiness: 6,  isTopPro: true,  desc: 'Professional deep cleaning, move-in/out cleaning, and biohazard sanitization. Eco-friendly products.', reviews: 189, pricing: { diagnostic: 0,  standard: 60,  emergency: 100 }, responseTime: '< 1 hr'  },
        { id: 17, title: 'Roof & Gutter Pro',    company: 'TopShield Roofing',    rate: '$50/hr', rateNum: 50, logo: 'TS', color: 'logo-orange', loc: 'Chicago, USA',      rating: 4.7, tags: ['Roofing','Gutter','Leak','Exterior'],         hires: 67,  yearsInBusiness: 11, isTopPro: false, desc: 'Roof inspection, leak repair, shingle replacement, and gutter cleaning. Storm damage specialists.', reviews: 81,  pricing: { diagnostic: 35, standard: 90,  emergency: 155 }, responseTime: '< 3 hrs' },
        { id: 18, title: 'Painting Specialist',  company: 'ColorEdge Studios',    rate: '$40/hr', rateNum: 40, logo: 'CE', color: 'logo-green',  loc: 'LA, USA',           rating: 4.9, tags: ['Painting','Interior','Exterior','Wallpaper'],  hires: 115, yearsInBusiness: 8,  isTopPro: true,  desc: 'Interior and exterior painting, accent walls, wallpaper installation, and color consultation services.', reviews: 147, pricing: { diagnostic: 0,  standard: 70,  emergency: 120 }, responseTime: '< 4 hrs' }
    ];

    async function seedTechnicians() {
        const db = FirebaseConfig.getDb();
        console.log("🚀 Starting seeding process...");
        
        try {
            // Seed Technicians
            const techRef = db.ref('technicians');
            await techRef.set({}); // Clear existing
            
            for (const tech of technicians) {
                await techRef.child(tech.id).set(tech);
                console.log(`✅ Seeded Tech: ${tech.company}`);
            }

            // Seed a few demo users
            const usersRef = db.ref('users');
            const demoUsers = {
                'demo_user': { name: 'John Doe', email: 'user@homefix.pro', role: 'user', lastLogin: new Date().toISOString() },
                'demo_pro': { name: 'Expert Fixer', email: 'pro@homefix.pro', role: 'technician', lastLogin: new Date().toISOString() }
            };
            await usersRef.update(demoUsers);
            console.log("✅ Seeded demo users");

            console.log("✨ Seeding complete!");
            return true;
        } catch (error) {
            console.error("❌ Seeding failed:", error);
            return false;
        }
    }

    return { seedTechnicians };
})();
