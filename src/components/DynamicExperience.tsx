import React from 'react';
import { GraduationCap, Briefcase, Award } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const DynamicExperience = () => {
  const { data, loading, error } = useResumeData();

  if (loading) {
    return (
      <section id="experience" className="py-20 bg-white">
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
      <section id="experience" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Error loading experience data: {error}
          </div>
        </div>
      </section>
    );
  }

  const { experiences, education, certifications } = data;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short' 
    });
  };

  const experienceCategories = [
    {
      category: 'Education',
      icon: <GraduationCap size={24} />,
      items: education.map(edu => ({
        title: `${edu.degree}${edu.field_of_study ? ` in ${edu.field_of_study}` : ''}`,
        organization: edu.institution,
        location: edu.location,
        period: edu.is_current 
          ? `${edu.start_date ? formatDate(edu.start_date) : ''} - Current`
          : `${edu.start_date ? formatDate(edu.start_date) : ''} - ${edu.end_date ? formatDate(edu.end_date) : ''}`,
        description: edu.description || `${edu.degree} program${edu.field_of_study ? ` focusing on ${edu.field_of_study}` : ''}.`,
        achievements: edu.honors,
        gpa: edu.gpa
      }))
    },
    {
      category: 'Experience',
      icon: <Briefcase size={24} />,
      items: experiences.map(exp => ({
        title: exp.title,
        organization: exp.company,
        location: exp.location,
        period: exp.is_current 
          ? `${formatDate(exp.start_date)} - Current`
          : `${formatDate(exp.start_date)} - ${exp.end_date ? formatDate(exp.end_date) : ''}`,
        description: exp.description,
        achievements: exp.achievements,
        skills: exp.skills_used
      }))
    },
    {
      category: 'Certifications',
      icon: <Award size={24} />,
      items: certifications.map(cert => ({
        title: cert.name,
        organization: cert.issuing_organization,
        period: cert.issue_date ? formatDate(cert.issue_date) : 'Current',
        description: cert.description || `Professional certification from ${cert.issuing_organization}.`,
        credentialId: cert.credential_id,
        credentialUrl: cert.credential_url,
        expirationDate: cert.expiration_date
      }))
    }
  ].filter(category => category.items.length > 0);

  return (
    <section id="experience" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Experience
          </h2>
          <div className="w-20 h-1 bg-miami-orange-500 mx-auto rounded-full"></div>
        </div>

        <div className="space-y-12">
          {experienceCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="relative">
              <div className="flex items-center mb-8">
                <div className="p-3 bg-miami-green-100 rounded-full text-miami-green-700 mr-4">
                  {category.icon}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{category.category}</h3>
              </div>

              <div className="space-y-6">
                {category.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className="bg-gray-50 p-6 rounded-xl hover:bg-gray-100 transition-all duration-300 transform hover:scale-[1.02] shadow-sm hover:shadow-md"
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                      <div className="flex-1">
                        <h4 className="text-xl font-semibold text-gray-900 mb-1">
                          {item.title}
                        </h4>
                        <p className="text-miami-green-700 font-medium">
                          {item.organization}
                          {item.location && (
                            <span className="text-gray-500 ml-2">• {item.location}</span>
                          )}
                        </p>
                        {item.gpa && (
                          <p className="text-sm text-gray-600 mt-1">GPA: {item.gpa}</p>
                        )}
                      </div>
                      <span className="text-sm text-gray-500 bg-white px-3 py-1 rounded-full mt-2 md:mt-0 whitespace-nowrap">
                        {item.period}
                      </span>
                    </div>
                    
                    <p className="text-gray-700 leading-relaxed mb-3">{item.description}</p>
                    
                    {item.achievements && item.achievements.length > 0 && (
                      <div className="mb-3">
                        <h5 className="text-sm font-semibold text-gray-800 mb-2">
                          {category.category === 'Education' ? 'Honors & Awards:' : 'Key Achievements:'}
                        </h5>
                        <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                          {item.achievements.map((achievement, idx) => (
                            <li key={idx}>{achievement}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    
                    {item.skills && item.skills.length > 0 && (
                      <div className="mb-3">
                        <h5 className="text-sm font-semibold text-gray-800 mb-2">Technologies Used:</h5>
                        <div className="flex flex-wrap gap-2">
                          {item.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="text-xs bg-miami-orange-100 text-miami-orange-800 px-2 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    {item.credentialId && (
                      <div className="text-sm text-gray-600">
                        <span className="font-medium">Credential ID:</span> {item.credentialId}
                        {item.credentialUrl && (
                          <a
                            href={item.credentialUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="ml-2 text-miami-orange-600 hover:text-miami-orange-800"
                          >
                            Verify
                          </a>
                        )}
                      </div>
                    )}
                    
                    {item.expirationDate && (
                      <div className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Expires:</span> {formatDate(item.expirationDate)}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicExperience;