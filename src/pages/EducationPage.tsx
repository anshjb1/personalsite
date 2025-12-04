import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, GraduationCap, Award } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const EducationPage = () => {
  const { data, loading } = useResumeData();
  const { education } = data;

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Present';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-purple-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4">
            <GraduationCap size={48} />
            Education
          </h1>
          <p className="mt-4 text-xl text-purple-100">
            Academic background and achievements
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="space-y-8">
            {[1, 2].map((i) => (
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
        ) : education && education.length > 0 ? (
          <div className="space-y-8">
            {education.map((edu, index) => (
              <div
                key={edu.id || index}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                <div className="p-8">
                  <div className="mb-4">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {edu.degree}
                      {edu.field_of_study && (
                        <span className="text-purple-600"> in {edu.field_of_study}</span>
                      )}
                    </h2>
                    <h3 className="text-xl text-purple-600 font-semibold mb-4">
                      {edu.institution}
                    </h3>
                  </div>

                  <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                    {edu.location && (
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        <span>{edu.location}</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1">
                      <Calendar size={16} />
                      <span>
                        {formatDate(edu.start_date)} - {edu.is_current ? 'Present' : formatDate(edu.end_date)}
                      </span>
                    </div>
                    {edu.gpa && (
                      <div className="flex items-center gap-1">
                        <Award size={16} />
                        <span>GPA: {edu.gpa}</span>
                      </div>
                    )}
                  </div>

                  {edu.description && (
                    <p className="text-gray-700 mb-6 leading-relaxed">
                      {edu.description}
                    </p>
                  )}

                  {edu.honors && edu.honors.length > 0 && (
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-900 mb-3">Honors & Awards</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.honors.map((honor, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                          >
                            {honor}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {edu.relevant_coursework && edu.relevant_coursework.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Relevant Coursework</h4>
                      <div className="flex flex-wrap gap-2">
                        {edu.relevant_coursework.map((course, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {course}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No education data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EducationPage;
