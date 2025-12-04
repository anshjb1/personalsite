import React from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Code, Mail, ArrowRight } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const HomePage = () => {
  const { data, loading } = useResumeData();
  const { profile, experiences, education, projects } = data;

  return (
    <div className="min-h-screen bg-white">
      <div className="relative min-h-[60vh] flex items-center justify-center bg-gradient-to-br from-miami-green-600 via-miami-green-700 to-miami-green-800 overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width=%2260%22%20height=%2260%22%20viewBox=%220%200%2060%2060%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg%20fill=%22none%22%20fill-rule=%22evenodd%22%3E%3Cg%20fill=%22%23ffffff%22%20fill-opacity=%220.05%22%3E%3Ccircle%20cx=%2230%22%20cy=%2230%22%20r=%223%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-4">
              {loading ? (
                <div className="animate-pulse bg-white/20 h-20 w-96 mx-auto rounded"></div>
              ) : (
                profile?.full_name || 'Ansh Bhatt'
              )}
            </h1>

            <p className="text-2xl md:text-3xl text-green-100 mb-12">
              {loading ? (
                <div className="animate-pulse bg-white/20 h-10 w-[500px] mx-auto rounded"></div>
              ) : (
                profile?.title || 'MD/MBA Candidate | Healthcare Consultant'
              )}
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 gap-8">
          <Link
            to="/experience"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-miami-green-50 to-green-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <Briefcase className="text-miami-green-600" size={40} />
              <ArrowRight className="text-miami-green-600 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>

            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-green-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-green-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {experiences?.slice(0, 3).map((exp, index) => (
                  <div key={index} className="border-l-4 border-miami-green-600 pl-4">
                    <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                    <p className="text-gray-700">{exp.company}</p>
                  </div>
                ))}
                {experiences && experiences.length > 3 && (
                  <p className="text-miami-green-600 font-medium">+{experiences.length - 3} more</p>
                )}
              </div>
            )}
          </Link>

          <Link
            to="/education"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-miami-orange-50 to-orange-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <GraduationCap className="text-miami-orange-600" size={40} />
              <ArrowRight className="text-miami-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>

            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-orange-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-orange-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {education?.slice(0, 2).map((edu, index) => (
                  <div key={index} className="border-l-4 border-miami-orange-600 pl-4">
                    <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                    <p className="text-gray-700">{edu.institution}</p>
                  </div>
                ))}
              </div>
            )}
          </Link>

          <Link
            to="/projects"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-miami-green-50 to-green-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <Code className="text-miami-green-600" size={40} />
              <ArrowRight className="text-miami-green-600 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Projects</h2>

            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-green-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-green-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {projects?.slice(0, 3).map((project, index) => (
                  <div key={index} className="border-l-4 border-miami-green-600 pl-4">
                    <h3 className="font-semibold text-gray-900">{project.title}</h3>
                  </div>
                ))}
                {projects && projects.length > 3 && (
                  <p className="text-miami-green-600 font-medium">+{projects.length - 3} more</p>
                )}
              </div>
            )}
          </Link>

          <Link
            to="/contact"
            className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-miami-orange-50 to-orange-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-6">
              <Mail className="text-miami-orange-600" size={40} />
              <ArrowRight className="text-miami-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" size={24} />
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>

            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-orange-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-orange-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-2">
                {profile?.email && (
                  <p className="text-gray-700">{profile.email}</p>
                )}
                {profile?.phone && (
                  <p className="text-gray-700">{profile.phone}</p>
                )}
                {profile?.location && (
                  <p className="text-gray-700">{profile.location}</p>
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
