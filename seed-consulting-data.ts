import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function seedConsultingData() {
  console.log('Starting consulting data seed...');

  const clients = [
    {
      name: 'Healthee',
      logo_url: 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Healthcare navigation platform helping employees understand and use their benefits',
      industry: 'HealthTech',
      website_url: 'https://healthee.com',
      is_featured: true,
      display_order: 1
    },
    {
      name: 'Google',
      logo_url: 'https://images.pexels.com/photos/270637/pexels-photo-270637.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Strategic consulting for enterprise solutions and market expansion',
      industry: 'Technology',
      website_url: 'https://google.com',
      is_featured: true,
      display_order: 2
    },
    {
      name: 'Glya',
      logo_url: 'https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg?auto=compress&cs=tinysrgb&w=200',
      description: 'Operational scaling and go-to-market strategy for innovative tech solutions',
      industry: 'Technology',
      website_url: 'https://glya.com',
      is_featured: true,
      display_order: 3
    }
  ];

  const metrics = [
    {
      label: 'Expert Network',
      value: '10+',
      description: 'Experts in Marketing, Law, Accounting, Software Development, and Design',
      icon: 'users',
      display_order: 1
    },
    {
      label: 'Capital Raised',
      value: '$130M+',
      description: 'Capital raised by clients I have advised',
      icon: 'trending-up',
      display_order: 2
    },
    {
      label: 'Startups Guided',
      value: '15+',
      description: 'Startups and private practices guided',
      icon: 'building',
      display_order: 3
    },
    {
      label: 'Personal Funding',
      value: '$180K',
      description: 'Secured in non-dilutive/SAFE funding in <4 months',
      icon: 'dollar-sign',
      display_order: 4
    },
    {
      label: 'Revenue Growth',
      value: '10x',
      description: "Scaled a client's monthly revenue to $20K–$30K/mo",
      icon: 'bar-chart',
      display_order: 5
    }
  ];

  const competencies = [
    {
      title: 'Corporate Strategy & Funding',
      category: 'Strategy',
      items: [
        'Valuation & Financial Modeling: Realistic, investor-ready financial projections',
        'Pitch Formation: Narrative crafting that secures capital (Pre-Seed to Series B)',
        'Business Plan & PMF: Identifying true Product-Market Fit before cash burn'
      ],
      display_order: 1
    },
    {
      title: 'Operational Infrastructure',
      category: 'Operations',
      items: [
        'Revenue Systems: End-to-end setup of CRM, Sales Pipelines, and Marketing Automation',
        'Generational Operational Efficiency: Systems designed to outlast the founder',
        'AI Workflow Architecture: Automating expensive human tasks with custom AI'
      ],
      display_order: 2
    },
    {
      title: 'GovTech & Public Sector Strategy',
      category: 'GovTech',
      items: [
        'RFAs & Grant Acquisition: Strategy for navigating complex Request for Applications',
        'Vendorization & Contractor Bids: Managing the vendorization process to secure government bids',
        'Public-Private Partnerships (PPP): Structuring scalable deals between private tech and public entities',
        'GovTech Invoicing: Setting up compliant billing workflows to ensure consistent cash flow from public contracts'
      ],
      display_order: 3
    }
  ];

  const services = [
    {
      name: 'Initial Strategic Audit & Roadmap',
      description: 'A 60-minute deep dive into your current bottleneck. You leave with a tangible action plan, a valuation assessment, or a bid strategy.',
      price: '$500',
      category: 'Consulting',
      deliverables: [
        'Comprehensive bottleneck analysis',
        'Actionable strategic roadmap',
        'Valuation assessment',
        'Bid strategy recommendations'
      ],
      display_order: 1
    },
    {
      name: 'Additional Services',
      description: 'Comprehensive support for structuring, marketing, sales, law, accounting, and permitting',
      price: 'Custom',
      category: 'Consulting',
      deliverables: [
        'Corporate structuring',
        'Marketing strategy',
        'Sales pipeline setup',
        'Legal compliance',
        'Accounting setup',
        'Permitting assistance'
      ],
      display_order: 2
    }
  ];

  try {
    console.log('Inserting clients...');
    const { error: clientsError } = await supabase
      .from('clients')
      .insert(clients);

    if (clientsError) throw clientsError;
    console.log('✓ Clients inserted');

    console.log('Inserting metrics...');
    const { error: metricsError } = await supabase
      .from('metrics')
      .insert(metrics);

    if (metricsError) throw metricsError;
    console.log('✓ Metrics inserted');

    console.log('Inserting competencies...');
    const { error: competenciesError } = await supabase
      .from('competencies')
      .insert(competencies);

    if (competenciesError) throw competenciesError;
    console.log('✓ Competencies inserted');

    console.log('Inserting services...');
    const { error: servicesError } = await supabase
      .from('services')
      .insert(services);

    if (servicesError) throw servicesError;
    console.log('✓ Services inserted');

    console.log('Updating profile...');
    const { error: profileError } = await supabase
      .from('profile')
      .update({
        full_name: 'Ansh Bhatt',
        title: 'OPERATIONS | SCALING | IDEATING | PRODUCT-MARKET FIT',
        email: 'anshjb@myself.com',
        phone: '(813) 540-0555',
        bio: 'I bridge the gap between "good idea" and "scalable revenue." From private practice optimization to securing government contracts, I help founders build operational backbones, secure funding, and deploy the right teams to automate growth.',
        location: 'Miami, FL'
      })
      .eq('id', (await supabase.from('profile').select('id').single()).data?.id);

    if (profileError) throw profileError;
    console.log('✓ Profile updated');

    console.log('\n✅ All consulting data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
    throw error;
  }
}

seedConsultingData();
