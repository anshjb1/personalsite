import React from 'react';
import { ArrowDown, Stethoscope, TrendingUp } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const DynamicHero = () => {
  const { data, loading } = useResumeData();

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const { profile } = data;

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in-up">
          <div className="flex justify-center mb-6">
            {profile?.profile_photo_url ? (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/20 shadow-xl">
                <img
                  src={profile.profile_photo_url}
                  alt={profile.full_name}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="flex space-x-4">
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                  <Stethoscope size={32} className="text-white" />
                </div>
                <div className="p-3 bg-white/10 rounded-full backdrop-blur-sm">
                  <TrendingUp size={32} className="text-white" />
                </div>
              </div>
            )}
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            {loading ? (
              <div className="animate-pulse bg-white/20 h-16 w-96 mx-auto rounded"></div>
            ) : (
              profile?.full_name || 'Ansh Bhatt'
            )}
          </h1>
          
          <p className="text-xl md:text-2xl text-blue-100 mb-8 max-w-3xl mx-auto">
            {loading ? (
              <div className="animate-pulse bg-white/20 h-8 w-80 mx-auto rounded"></div>
            ) : (
              profile?.title || 'MD/MBA Candidate at University of Miami'
            )}
          </p>
          
          <p className="text-lg text-blue-200 mb-12 max-w-2xl mx-auto">
            {loading ? (
              <div className="animate-pulse bg-white/20 h-6 w-96 mx-auto rounded"></div>
            ) : (
              profile?.bio?.split('\n')[0] || 'Bridging healthcare and technology to create scalable, human-centered solutions'
            )}
          </p>
          
          <button
            onClick={scrollToAbout}
            className="inline-flex items-center px-8 py-4 bg-white text-blue-700 font-semibold rounded-full hover:bg-blue-50 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Learn More
            <ArrowDown size={20} className="ml-2 animate-bounce" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default DynamicHero;