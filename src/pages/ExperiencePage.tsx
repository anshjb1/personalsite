import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, ExternalLink, Briefcase } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const ExperiencePage = () => {
  const { data, loading } = useResumeData();
  const { experiences } = data;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-miami-green-600 to-miami-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4">
            <Briefcase size={48} />
            Experience
          </h1>
          <p className="mt-4 text-xl text-green-100">
            Professional journey and career highlights
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse bg-white p-8 rounded-xl shadow-sm">
                <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
                <div className="h-6 bg-gray-200 rounded w-1/4 mb-6"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : experiences && experiences.length > 0 ? (
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id || index}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <div className="flex items-start gap-6">
                    {exp.logo_url && (
                      <div className="flex-shrink-0">
                        <img
                          src={exp.logo_url}
                          alt={`${exp.company} logo`}
                          className="w-20 h-20 rounded-lg object-cover shadow-md"
                        />
                      </div>
                    )}

                    <div className="flex-grow">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h2 className="text-2xl font-bold text-gray-900 mb-2">
                            {exp.title}
                          </h2>
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="text-xl text-miami-green-600 font-semibold">
                              {exp.company}
                            </h3>
                            {exp.website_url && (
                              <a
                                href={exp.website_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-miami-green-600 hover:text-miami-green-700 transition-colors"
                              >
                                <ExternalLink size={18} />
                              </a>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                        {exp.location && (
                          <div className="flex items-center gap-1">
                            <MapPin size={16} />
                            <span>{exp.location}</span>
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>
                            {formatDate(exp.start_date)} - {exp.is_current ? 'Present' : formatDate(exp.end_date)}
                          </span>
                        </div>
                      </div>

                      {exp.description && (
                        <p className="text-gray-700 mb-6 leading-relaxed">
                          {exp.description}
                        </p>
                      )}

                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="mb-6">
                          <h4 className="font-semibold text-gray-900 mb-3">Key Achievements</h4>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-start gap-2">
                                <span className="text-miami-green-600 mt-1">•</span>
                                <span className="text-gray-700">{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {exp.role_changes && Array.isArray(exp.role_changes) && exp.role_changes.length > 0 && (
                        <div className="mb-6 bg-green-50 p-4 rounded-lg">
                          <h4 className="font-semibold text-gray-900 mb-3">Role Progression</h4>
                          <div className="space-y-3">
                            {exp.role_changes.map((change: any, i: number) => (
                              <div key={i} className="border-l-2 border-miami-green-600 pl-4">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-gray-900">{change.title}</span>
                                  <span className="text-sm text-gray-600">
                                    {change.date && formatDate(change.date)}
                                  </span>
                                </div>
                                {change.description && (
                                  <p className="text-sm text-gray-700">{change.description}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {exp.skills_used && exp.skills_used.length > 0 && (
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Skills Used</h4>
                          <div className="flex flex-wrap gap-2">
                            {exp.skills_used.map((skill, i) => (
                              <span
                                key={i}
                                className="px-3 py-1 bg-miami-green-100 text-miami-green-700 rounded-full text-sm font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No experience data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperiencePage;
