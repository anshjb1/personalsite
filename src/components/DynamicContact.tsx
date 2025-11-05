import React from 'react';
import { Mail, MapPin, Phone, Linkedin, Github, Globe } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const DynamicContact = () => {
  const { data, loading, error } = useResumeData();

  if (loading) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-300 rounded w-48 mx-auto mb-4"></div>
              <div className="w-20 h-1 bg-gray-300 mx-auto rounded-full"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Error loading contact data: {error}
          </div>
        </div>
      </section>
    );
  }

  const { profile, skills } = data;

  const contactInfo = [
    {
      icon: <Mail size={20} />,
      label: 'Email',
      value: profile?.email || 'anshjb@consultant.com',
      link: `mailto:${profile?.email || 'anshjb@consultant.com'}`
    },
    {
      icon: <MapPin size={20} />,
      label: 'Location',
      value: profile?.location || 'Miami, FL',
      link: null
    },
    {
      icon: <Phone size={20} />,
      label: 'Phone',
      value: profile?.phone || '(813) 540-0555',
      link: profile?.phone ? `tel:${profile.phone}` : null
    }
  ];

  const socialLinks = [
    {
      icon: <Linkedin size={20} />,
      label: 'LinkedIn',
      href: profile?.linkedin_url || '#'
    },
    {
      icon: <Github size={20} />,
      label: 'GitHub',
      href: profile?.github_url || '#'
    },
    ...(profile?.website ? [{
      icon: <Globe size={20} />,
      label: 'Website',
      href: profile.website
    }] : [])
  ];

  // Group skills by category for areas of interest
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const areasOfInterest = Object.entries(skillsByCategory).slice(0, 4).map(([category, categorySkills]) => ({
    title: category.charAt(0).toUpperCase() + category.slice(1),
    description: categorySkills.slice(0, 3).map(skill => skill.name).join(', ')
  }));

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Get In Touch
          </h2>
          <div className="w-20 h-1 bg-miami-orange-500 mx-auto rounded-full"></div>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto">
            I'm always interested in connecting with fellow healthcare innovators, researchers, and technology enthusiasts. Let's discuss how we can work together to improve healthcare through technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Contact Information</h3>
            <div className="space-y-4">
              {contactInfo.map((info, index) => (
                <div key={index} className="flex items-center">
                  <div className="p-3 bg-miami-green-100 rounded-full text-miami-green-700 mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{info.label}</p>
                    {info.link ? (
                      <a
                        href={info.link}
                        className="text-gray-900 hover:text-miami-orange-600 transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-gray-900">{info.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Connect With Me</h4>
              <div className="flex space-x-4">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-100 rounded-full text-gray-600 hover:bg-miami-orange-500 hover:text-white transition-all duration-300 transform hover:scale-110"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-xl">
            <h3 className="text-xl font-semibold text-gray-900 mb-6">Areas of Interest</h3>
            <div className="space-y-4">
              {areasOfInterest.length > 0 ? (
                areasOfInterest.map((area, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-miami-green-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">{area.title}</h4>
                      <p className="text-sm text-gray-600">{area.description}</p>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-miami-green-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Healthcare Technology</h4>
                      <p className="text-sm text-gray-600">AI/ML applications, EMR systems, digital health tools</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-miami-green-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Systems Design</h4>
                      <p className="text-sm text-gray-600">Healthcare operations, workflow optimization</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-miami-green-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Product Development</h4>
                      <p className="text-sm text-gray-600">Full-stack development, healthcare applications</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-2 h-2 bg-miami-green-600 rounded-full mt-2 mr-3"></div>
                    <div>
                      <h4 className="font-medium text-gray-900">Research Collaboration</h4>
                      <p className="text-sm text-gray-600">Academic partnerships, clinical research</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicContact;