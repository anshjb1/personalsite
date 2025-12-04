import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Code, Mail, ArrowRight } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';
import GradientWaves from '../components/GradientWaves';

const HomePage = () => {
  const { data, loading } = useResumeData();
  const { profile, experiences, education, projects } = data;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 overflow-hidden">
        <GradientWaves />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold bg-gradient-to-r from-emerald-600 via-green-600 to-teal-600 bg-clip-text text-transparent mb-6 leading-tight">
              {loading ? (
                <div className="animate-pulse bg-emerald-200 h-16 md:h-24 w-72 sm:w-96 md:w-[500px] mx-auto rounded-2xl"></div>
              ) : (
                profile?.full_name || 'Ansh Bhatt'
              )}
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-gray-700 mb-8 font-medium">
              {loading ? (
                <div className="animate-pulse bg-emerald-200 h-8 md:h-10 w-64 sm:w-96 md:w-[500px] mx-auto rounded-xl"></div>
              ) : (
                profile?.title || 'MD/MBA Candidate | Healthcare Consultant'
              )}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/experience"
                className="px-8 py-3 bg-emerald-600 text-white rounded-full font-semibold hover:bg-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View Experience
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-emerald-600 border-2 border-emerald-600 rounded-full font-semibold hover:bg-emerald-50 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">Explore My Work</h2>
          <p className="text-lg md:text-xl text-gray-600">Discover my professional journey, projects, and accomplishments</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8">
          <Link
            to="/experience"
            className="group relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-emerald-100 hover:border-emerald-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <Briefcase className="text-emerald-600" size={32} />
              </div>
              <ArrowRight className="text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={24} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Experience</h2>

            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-emerald-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-emerald-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences?.slice(0, 3).map((exp, index) => (
                  <div key={index} className="border-l-4 border-emerald-600 pl-4">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{exp.title}</h3>
                    <p className="text-gray-600 text-sm">{exp.company}</p>
                  </div>
                ))}
                {experiences && experiences.length > 3 && (
                  <p className="text-emerald-600 font-semibold text-sm">+{experiences.length - 3} more positions</p>
                )}
              </div>
            )}
          </Link>

          <Link
            to="/education"
            className="group relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-teal-100 hover:border-teal-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-teal-100 rounded-2xl">
                <GraduationCap className="text-teal-600" size={32} />
              </div>
              <ArrowRight className="text-teal-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={24} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Education</h2>

            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-teal-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-teal-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {education?.slice(0, 2).map((edu, index) => (
                  <div key={index} className="border-l-4 border-teal-600 pl-4">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{edu.degree}</h3>
                    <p className="text-gray-600 text-sm">{edu.institution}</p>
                  </div>
                ))}
              </div>
            )}
          </Link>

          <Link
            to="/projects"
            className="group relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-green-100 hover:border-green-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-green-100 rounded-2xl">
                <Code className="text-green-600" size={32} />
              </div>
              <ArrowRight className="text-green-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={24} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Projects</h2>

            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-green-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-green-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {projects?.slice(0, 3).map((project, index) => (
                  <div key={index} className="border-l-4 border-green-600 pl-4">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{project.title}</h3>
                  </div>
                ))}
                {projects && projects.length > 3 && (
                  <p className="text-green-600 font-semibold text-sm">+{projects.length - 3} more projects</p>
                )}
              </div>
            )}
          </Link>

          <Link
            to="/contact"
            className="group relative overflow-hidden rounded-3xl bg-white p-6 md:p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border-2 border-emerald-100 hover:border-emerald-300"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-emerald-100 rounded-2xl">
                <Mail className="text-emerald-600" size={32} />
              </div>
              <ArrowRight className="text-emerald-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={24} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Contact</h2>

            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-emerald-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-emerald-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-3">
                {profile?.email && (
                  <p className="text-gray-700 text-sm md:text-base break-words">{profile.email}</p>
                )}
                {profile?.phone && (
                  <p className="text-gray-700 text-sm md:text-base">{profile.phone}</p>
                )}
                {profile?.location && (
                  <p className="text-gray-700 text-sm md:text-base">{profile.location}</p>
                )}
              </div>
            )}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
