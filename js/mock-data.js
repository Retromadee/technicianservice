/**
 * HomeFix Pro — Mock Data Seeding
 * This script populates the app with realistic technicians and sample data.
 */

const MockData = {
    technicians: [
        {
            id: 'tech1',
            name: 'Robert "Fix-It" Miller',
            specialties: ['Plumbing', 'HVAC'],
            rating: 4.9,
            reviews: 124,
            base_rate: '$65',
            avatar: 'https://ui-avatars.com/api/?name=Robert+Miller&background=3b82f6&color=fff',
            description: 'Licensed Master Plumber with 15 years experience in NYC.',
            location: 'Brooklyn, NY'
        },
        {
            id: 'tech2',
            name: 'Sarah Zhang',
            specialties: ['Electrical', 'Smart Home'],
            rating: 5.0,
            reviews: 89,
            base_rate: '$80',
            avatar: 'https://ui-avatars.com/api/?name=Sarah+Zhang&background=7c3aed&color=fff',
            description: 'Electrical Engineer specializing in residential wiring and panel upgrades.',
            location: 'Queens, NY'
        },
        {
            id: 'tech3',
            name: 'Mike O\'Connell',
            specialties: ['Appliances', 'Carpentry'],
            rating: 4.7,
            reviews: 56,
            base_rate: '$55',
            avatar: 'https://ui-avatars.com/api/?name=Mike+OConnell&background=10b981&color=fff',
            description: 'General contractor. "I fix what others can\'t."',
            location: 'Manhattan, NY'
        },
        {
            id: 'tech4',
            name: 'Rapid Repair Co.',
            specialties: ['Plumbing'],
            rating: 4.8,
            reviews: 430,
            base_rate: '$120',
            avatar: 'https://ui-avatars.com/api/?name=Rapid+Repair&background=ef4444&color=fff',
            description: 'Emergency plumbing services available 24/7.',
            location: 'New York, NY'
        }
    ],

    diagnoses: {
        plumbing: {
            cause: "Corroded gasket or loose valve compression nut.",
            fix: "1. Turn off the water supply under the sink. 2. Unscrew the handle. 3. Replace the rubber O-ring or tighten the nut with a wrench.",
            difficulty: "Easy",
            est_parts: "$5 - $15"
        },
        electrical: {
            cause: "Short circuit or overloaded circuit breaker.",
            fix: "1. Locate your main panel. 2. Find the tripped breaker (it will be halfway between ON and OFF). 3. Switch it fully OFF, then back to ON. 4. Unplug high-draw appliances.",
            difficulty: "Medium",
            est_parts: "$0 (Reset only)"
        },
        hvac: {
            cause: "Clogged air filter causing airflow restriction.",
            fix: "1. Switch off the unit. 2. Remove the access panel. 3. Pull out the dirty filter. 4. Slide in a fresh MERV 8 or higher filter. 5. Restart the system.",
            difficulty: "Very Easy",
            est_parts: "$20"
        }
    }
};

window.MockData = MockData;
