import React from 'react';
import { Brain, Heart, Code, Users } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const DynamicAbout = () => {
  const { data, loading, error } = useResumeData();

  if (loading) {
    return (
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
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
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">
            Error loading profile data: {error}
          </div>
        </div>
      </section>
    );
  }

  const { profile, skills } = data;

  // Group skills by category for display
  const skillsByCategory = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, typeof skills>);

  const getIconForCategory = (category: string) => {
    switch (category.toLowerCase()) {
      case 'healthcare':
      case 'clinical':
        return <Heart size={24} />;
      case 'technical':
      case 'programming':
        return <Code size={24} />;
      case 'business':
      case 'management':
        return <Users size={24} />;
      default:
        return <Brain size={24} />;
    }
  };

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            About Me
          </h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            {profile?.bio ? (
              <div className="text-lg text-gray-700 leading-relaxed">
                {profile.bio.split('\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            ) : (
              <p className="text-lg text-gray-700 leading-relaxed">
                I'm an MD/MBA candidate at the University of Miami with a deep interest in the intersection of healthcare, technology, and systems design. My background spans clinical operations, product development, research, and health tech—rooted in real-world experience across startups, academic institutions, and national healthcare organizations.
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(skillsByCategory).slice(0, 4).map(([category, categorySkills]) => (
              <div
                key={category}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 group"
              >
                <div className="text-blue-600 mb-4 group-hover:text-blue-700 transition-colors duration-300">
                  {getIconForCategory(category)}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2 capitalize">
                  {category}
                </h3>
                <div className="space-y-1">
                  {categorySkills.slice(0, 3).map((skill) => (
                    <div key={skill.id} className="text-sm text-gray-600">
                      {skill.name}
                    </div>
                  ))}
                  {categorySkills.length > 3 && (
                    <div className="text-xs text-gray-500">
                      +{categorySkills.length - 3} more
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DynamicAbout;