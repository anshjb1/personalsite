import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.VITE_SUPABASE_URL!;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

async function seedDatabase() {
  try {
    console.log('Starting database seeding...');

    const profileData = {
      full_name: 'Ansh Bhatt',
      title: 'MD/MBA Candidate | Healthcare Consultant | AI Enthusiast',
      email: 'anshjb@consultant.com',
      location: 'Miami, Florida',
      linkedin_url: 'https://linkedin.com/in/anshbhatt',
      bio: `Bridging healthcare and technology to create scalable, human-centered solutions. Passionate about leveraging AI and data analytics to transform healthcare delivery and improve patient outcomes.

MD/MBA candidate with extensive experience in healthcare consulting, digital health strategy, and clinical operations. Proven track record of driving innovation at the intersection of medicine, business, and technology.`,
      profile_photo_url: null
    };

    const { data: profile, error: profileError } = await supabase
      .from('profile')
      .insert([profileData])
      .select()
      .single();

    if (profileError) {
      console.error('Profile error:', profileError);
    } else {
      console.log('Profile created successfully');
    }

    const educationData = [
      {
        institution: 'University of Miami',
        degree: 'MD/MBA',
        field_of_study: 'Medicine and Business Administration',
        location: 'Miami, Florida',
        start_date: '2021-08-01',
        end_date: null,
        is_current: true,
        description: 'Dual degree program combining medical education with business administration, focusing on healthcare innovation, strategy, and leadership.',
        display_order: 0,
        is_published: true
      }
    ];

    const { error: educationError } = await supabase
      .from('education')
      .insert(educationData);

    if (educationError) {
      console.error('Education error:', educationError);
    } else {
      console.log('Education added successfully');
    }

    const experienceData = [
      {
        title: 'Healthcare Strategy Consultant',
        company: 'Various Healthcare Organizations',
        location: 'Miami, Florida',
        start_date: '2022-01-01',
        end_date: null,
        is_current: true,
        description: 'Providing strategic consulting services to healthcare organizations, focusing on digital transformation, operational efficiency, and patient experience optimization.',
        achievements: [
          'Developed AI-powered solutions for clinical workflow optimization',
          'Led digital health strategy initiatives for multiple healthcare systems',
          'Implemented data analytics frameworks to improve patient outcomes',
          'Advised on telemedicine platform deployment and adoption'
        ],
        skills_used: ['Healthcare Strategy', 'AI/ML', 'Data Analytics', 'Digital Health', 'Process Improvement'],
        display_order: 0,
        is_published: true
      },
      {
        title: 'Clinical Research Assistant',
        company: 'University of Miami Miller School of Medicine',
        location: 'Miami, Florida',
        start_date: '2021-08-01',
        end_date: null,
        is_current: true,
        description: 'Contributing to clinical research projects focusing on innovative treatment approaches and healthcare delivery models.',
        achievements: [
          'Participated in multiple clinical trials and research studies',
          'Analyzed clinical data to identify trends and insights',
          'Collaborated with interdisciplinary teams on research publications'
        ],
        skills_used: ['Clinical Research', 'Data Analysis', 'Medical Writing', 'Study Design'],
        display_order: 1,
        is_published: true
      }
    ];

    const { error: experienceError } = await supabase
      .from('experiences')
      .insert(experienceData);

    if (experienceError) {
      console.error('Experience error:', experienceError);
    } else {
      console.log('Experiences added successfully');
    }

    const skillsData = [
      { name: 'Artificial Intelligence & Machine Learning', category: 'technical', proficiency_level: 4, is_featured: true, display_order: 0 },
      { name: 'Healthcare Strategy', category: 'business', proficiency_level: 5, is_featured: true, display_order: 1 },
      { name: 'Data Analytics', category: 'technical', proficiency_level: 4, is_featured: true, display_order: 2 },
      { name: 'Digital Health', category: 'clinical', proficiency_level: 5, is_featured: true, display_order: 3 },
      { name: 'Clinical Operations', category: 'clinical', proficiency_level: 4, is_featured: true, display_order: 4 },
      { name: 'Process Improvement', category: 'business', proficiency_level: 4, is_featured: false, display_order: 5 },
      { name: 'Python', category: 'technical', proficiency_level: 4, is_featured: false, display_order: 6 },
      { name: 'R', category: 'technical', proficiency_level: 3, is_featured: false, display_order: 7 },
      { name: 'SQL', category: 'technical', proficiency_level: 4, is_featured: false, display_order: 8 },
      { name: 'Healthcare Policy', category: 'business', proficiency_level: 4, is_featured: false, display_order: 9 },
      { name: 'Project Management', category: 'business', proficiency_level: 4, is_featured: false, display_order: 10 },
      { name: 'Electronic Health Records', category: 'clinical', proficiency_level: 4, is_featured: false, display_order: 11 }
    ];

    const { error: skillsError } = await supabase
      .from('skills')
      .insert(skillsData);

    if (skillsError) {
      console.error('Skills error:', skillsError);
    } else {
      console.log('Skills added successfully');
    }

    const projectsData = [
      {
        title: 'AI-Powered Clinical Decision Support System',
        description: 'Developed machine learning models to assist physicians in diagnosis and treatment planning',
        long_description: 'Created an AI-powered clinical decision support system that analyzes patient data and medical literature to provide evidence-based recommendations to healthcare providers. The system uses natural language processing and machine learning to improve diagnostic accuracy and treatment outcomes.',
        technologies: ['Python', 'TensorFlow', 'NLP', 'Healthcare APIs', 'React'],
        status: 'completed',
        category: 'research',
        is_featured: true,
        is_published: true,
        display_order: 0
      },
      {
        title: 'Healthcare Analytics Dashboard',
        description: 'Built comprehensive analytics platform for tracking clinical and operational metrics',
        long_description: 'Designed and implemented a data analytics dashboard that provides real-time insights into hospital operations, patient outcomes, and resource utilization. The platform integrates data from multiple sources and uses advanced visualization techniques to support data-driven decision making.',
        technologies: ['Python', 'SQL', 'Tableau', 'Power BI', 'ETL'],
        status: 'completed',
        category: 'web',
        is_featured: true,
        is_published: true,
        display_order: 1
      },
      {
        title: 'Telemedicine Platform Enhancement',
        description: 'Enhanced telehealth platform to improve patient engagement and care delivery',
        long_description: 'Led the enhancement of a telemedicine platform to improve virtual care delivery. Implemented features including appointment scheduling, virtual waiting rooms, secure messaging, and integration with electronic health records.',
        technologies: ['React', 'Node.js', 'WebRTC', 'HIPAA Compliance'],
        status: 'completed',
        category: 'web',
        is_featured: true,
        is_published: true,
        display_order: 2
      }
    ];

    const { error: projectsError } = await supabase
      .from('projects')
      .insert(projectsData);

    if (projectsError) {
      console.error('Projects error:', projectsError);
    } else {
      console.log('Projects added successfully');
    }

    console.log('Database seeding completed successfully!');
  } catch (error) {
    console.error('Seeding error:', error);
  }
}

seedDatabase();
