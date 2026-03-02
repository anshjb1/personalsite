import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Briefcase, GraduationCap, Code, Award, Mail, ArrowRight, BookOpen, Video, FileText } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';
import { supabase } from '../lib/supabase';
import ParticleField from '../components/ParticleField';
import Carousel from '../components/Carousel';

interface ContentItem {
  id: string;
  type: 'publication' | 'blog' | 'video' | 'other';
  title: string;
  content_description?: string;
  abstract?: string;
  year?: number;
}

const HomePage = () => {
  const { data, loading } = useResumeData();
  const { profile, experiences, education, projects, certifications } = data;
  const [features, setFeatures] = useState<ContentItem[]>([]);
  const [featuresLoading, setFeaturesLoading] = useState(true);

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const { data, error } = await supabase
          .from('publications')
          .select('id, type, title, content_description, abstract, year')
          .order('year', { ascending: false })
          .limit(6);

        if (error) throw error;
        setFeatures(data || []);
      } catch (error) {
        console.error('Error fetching features:', error);
      } finally {
        setFeaturesLoading(false);
      }
    };

    fetchFeatures();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="relative min-h-[70vh] md:min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 overflow-hidden">
        <ParticleField />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in-up">
            <div className="flex flex-col items-center mb-8">
              <div className="relative mb-8 animate-scale-in">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full blur-2xl opacity-40 animate-pulse"></div>
                <img
                  src="/uuid=eafe1d40-bed1-43ac-b003-2e85a7b19d33&library=1&type=1&mode=1&loc=true&cap=true.jpeg"
                  alt="Ansh Bhatt"
                  className="relative w-40 h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 rounded-full object-cover border-4 border-white/30 shadow-2xl backdrop-blur-sm"
                  style={{ boxShadow: '0 0 60px rgba(16, 185, 129, 0.4), 0 0 30px rgba(251, 146, 60, 0.3)' }}
                />
              </div>
            </div>

            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight" style={{ textShadow: '0 0 40px rgba(16, 185, 129, 0.5), 0 0 20px rgba(251, 146, 60, 0.3), 0 4px 6px rgba(0,0,0,0.5)' }}>
              {loading ? (
                <div className="animate-pulse bg-gray-700 h-16 md:h-24 w-72 sm:w-96 md:w-[500px] mx-auto rounded-2xl"></div>
              ) : (
                profile?.full_name || 'Ansh Bhatt'
              )}
            </h1>

            <p className="text-xl sm:text-2xl md:text-3xl text-emerald-100 mb-8 font-medium" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>
              {loading ? (
                <div className="animate-pulse bg-gray-700 h-8 md:h-10 w-64 sm:w-96 md:w-[500px] mx-auto rounded-xl"></div>
              ) : (
                profile?.title || 'MD/MBA Candidate | Healthcare Consultant'
              )}
            </p>

            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/experience"
                className="px-8 py-3 bg-gradient-to-r from-emerald-600 to-green-600 text-white rounded-full font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                View Experience
              </Link>
              <Link
                to="/contact"
                className="px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-full font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-gray-900 mb-4">Explore My Work</h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium">Discover my professional journey, projects, and accomplishments</p>
        </div>

        <div className="hidden md:grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <Link
            to="/experience"
            className="group relative overflow-hidden rounded-3xl glass-card p-6 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-emerald-200/50 hover:border-emerald-300 animate-fade-in-up"
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
            className="group relative overflow-hidden rounded-3xl glass-card p-6 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-teal-200/50 hover:border-teal-300 animate-fade-in-up"
            style={{ animationDelay: '100ms' }}
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
            className="group relative overflow-hidden rounded-3xl glass-card p-6 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-green-200/50 hover:border-green-300 animate-fade-in-up"
            style={{ animationDelay: '200ms' }}
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
            to="/certifications"
            className="group relative overflow-hidden rounded-3xl glass-card p-6 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-amber-200/50 hover:border-amber-300 animate-fade-in-up"
            style={{ animationDelay: '300ms' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-amber-100 rounded-2xl">
                <Award className="text-amber-600" size={32} />
              </div>
              <ArrowRight className="text-amber-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={24} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Certifications</h2>

            {loading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-amber-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-amber-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {certifications?.slice(0, 3).map((cert, index) => (
                  <div key={index} className="border-l-4 border-amber-600 pl-4">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base">{cert.name}</h3>
                  </div>
                ))}
                {certifications && certifications.length > 3 && (
                  <p className="text-amber-600 font-semibold text-sm">+{certifications.length - 3} more</p>
                )}
              </div>
            )}
          </Link>

          <Link
            to="/features"
            className="group relative overflow-hidden rounded-3xl glass-card p-6 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-blue-200/50 hover:border-blue-300 animate-fade-in-up"
            style={{ animationDelay: '400ms' }}
          >
            <div className="flex items-center justify-between mb-6">
              <div className="p-3 bg-blue-100 rounded-2xl">
                <BookOpen className="text-blue-600" size={32} />
              </div>
              <ArrowRight className="text-blue-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all" size={24} />
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Featured Content</h2>

            {featuresLoading ? (
              <div className="space-y-3">
                <div className="animate-pulse bg-blue-200 h-6 w-3/4 rounded"></div>
                <div className="animate-pulse bg-blue-200 h-5 w-1/2 rounded"></div>
              </div>
            ) : (
              <div className="space-y-4">
                {features?.slice(0, 3).map((item, index) => (
                  <div key={index} className="border-l-4 border-blue-600 pl-4">
                    <h3 className="font-semibold text-gray-900 text-sm md:text-base line-clamp-1">{item.title}</h3>
                    <p className="text-gray-600 text-xs">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                  </div>
                ))}
                {features && features.length > 3 && (
                  <p className="text-blue-600 font-semibold text-sm">+{features.length - 3} more items</p>
                )}
              </div>
            )}
          </Link>

          <Link
            to="/contact"
            className="group relative overflow-hidden rounded-3xl glass-card p-6 md:p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-[1.02] border border-emerald-200/50 hover:border-emerald-300 animate-fade-in-up"
            style={{ animationDelay: '500ms' }}
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

        <div className="md:hidden px-4">
          <Carousel autoPlay={false} showIndicators={true} showNavigation={true}>
            <Link
              to="/experience"
              className="group relative overflow-hidden rounded-3xl glass-card p-6 hover:shadow-2xl transition-all duration-500 border border-emerald-200/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-emerald-100 rounded-2xl">
                  <Briefcase className="text-emerald-600" size={32} />
                </div>
                <ArrowRight className="text-emerald-600" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Experience</h2>

              {loading ? (
                <div className="space-y-3">
                  <div className="animate-pulse bg-emerald-200 h-6 w-3/4 rounded"></div>
                  <div className="animate-pulse bg-emerald-200 h-5 w-1/2 rounded"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {experiences?.slice(0, 3).map((exp, index) => (
                    <div key={index} className="border-l-4 border-emerald-600 pl-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{exp.title}</h3>
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
              className="group relative overflow-hidden rounded-3xl glass-card p-6 hover:shadow-2xl transition-all duration-500 border border-teal-200/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-teal-100 rounded-2xl">
                  <GraduationCap className="text-teal-600" size={32} />
                </div>
                <ArrowRight className="text-teal-600" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Education</h2>

              {loading ? (
                <div className="space-y-3">
                  <div className="animate-pulse bg-teal-200 h-6 w-3/4 rounded"></div>
                  <div className="animate-pulse bg-teal-200 h-5 w-1/2 rounded"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {education?.slice(0, 2).map((edu, index) => (
                    <div key={index} className="border-l-4 border-teal-600 pl-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{edu.degree}</h3>
                      <p className="text-gray-600 text-sm">{edu.institution}</p>
                    </div>
                  ))}
                </div>
              )}
            </Link>

            <Link
              to="/projects"
              className="group relative overflow-hidden rounded-3xl glass-card p-6 hover:shadow-2xl transition-all duration-500 border border-green-200/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-green-100 rounded-2xl">
                  <Code className="text-green-600" size={32} />
                </div>
                <ArrowRight className="text-green-600" size={24} />
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
                    <div key={index} className="border-l-4 border-green-600 pl-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{project.title}</h3>
                    </div>
                  ))}
                  {projects && projects.length > 3 && (
                    <p className="text-green-600 font-semibold text-sm">+{projects.length - 3} more projects</p>
                  )}
                </div>
              )}
            </Link>

            <Link
              to="/certifications"
              className="group relative overflow-hidden rounded-3xl glass-card p-6 hover:shadow-2xl transition-all duration-500 border border-amber-200/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-amber-100 rounded-2xl">
                  <Award className="text-amber-600" size={32} />
                </div>
                <ArrowRight className="text-amber-600" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Certifications</h2>

              {loading ? (
                <div className="space-y-3">
                  <div className="animate-pulse bg-amber-200 h-6 w-3/4 rounded"></div>
                  <div className="animate-pulse bg-amber-200 h-5 w-1/2 rounded"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {certifications?.slice(0, 3).map((cert, index) => (
                    <div key={index} className="border-l-4 border-amber-600 pl-4">
                      <h3 className="font-semibold text-gray-900 text-sm">{cert.name}</h3>
                    </div>
                  ))}
                  {certifications && certifications.length > 3 && (
                    <p className="text-amber-600 font-semibold text-sm">+{certifications.length - 3} more</p>
                  )}
                </div>
              )}
            </Link>

            <Link
              to="/features"
              className="group relative overflow-hidden rounded-3xl glass-card p-6 hover:shadow-2xl transition-all duration-500 border border-blue-200/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-blue-100 rounded-2xl">
                  <BookOpen className="text-blue-600" size={32} />
                </div>
                <ArrowRight className="text-blue-600" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Featured Content</h2>

              {featuresLoading ? (
                <div className="space-y-3">
                  <div className="animate-pulse bg-blue-200 h-6 w-3/4 rounded"></div>
                  <div className="animate-pulse bg-blue-200 h-5 w-1/2 rounded"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {features?.slice(0, 3).map((item, index) => (
                    <div key={index} className="border-l-4 border-blue-600 pl-4">
                      <h3 className="font-semibold text-gray-900 text-sm line-clamp-1">{item.title}</h3>
                      <p className="text-gray-600 text-xs">{item.type.charAt(0).toUpperCase() + item.type.slice(1)}</p>
                    </div>
                  ))}
                  {features && features.length > 3 && (
                    <p className="text-blue-600 font-semibold text-sm">+{features.length - 3} more items</p>
                  )}
                </div>
              )}
            </Link>

            <Link
              to="/contact"
              className="group relative overflow-hidden rounded-3xl glass-card p-6 hover:shadow-2xl transition-all duration-500 border border-emerald-200/50"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-emerald-100 rounded-2xl">
                  <Mail className="text-emerald-600" size={32} />
                </div>
                <ArrowRight className="text-emerald-600" size={24} />
              </div>

              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact</h2>

              {loading ? (
                <div className="space-y-3">
                  <div className="animate-pulse bg-emerald-200 h-6 w-3/4 rounded"></div>
                  <div className="animate-pulse bg-emerald-200 h-5 w-1/2 rounded"></div>
                </div>
              ) : (
                <div className="space-y-3">
                  {profile?.email && (
                    <p className="text-gray-700 text-sm break-words">{profile.email}</p>
                  )}
                  {profile?.phone && (
                    <p className="text-gray-700 text-sm">{profile.phone}</p>
                  )}
                  {profile?.location && (
                    <p className="text-gray-700 text-sm">{profile.location}</p>
                  )}
                </div>
              )}
            </Link>
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
