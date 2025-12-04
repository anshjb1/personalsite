import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const ContactPage = () => {
  const { data, loading } = useResumeData();
  const { profile } = data;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-orange-50/30 to-gray-50">
      <div className="relative bg-gradient-to-br from-miami-orange-700 via-miami-orange-600 to-miami-orange-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-wave wave-2"></div>
          <div className="gradient-wave wave-4"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-orange-100 hover:text-white mb-8 transition-all duration-300 hover:gap-3 gap-2 group animate-fade-in"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold flex items-center gap-4 mb-4 drop-shadow-lg">
              <Mail size={56} className="animate-scale-in" />
              Contact
            </h1>
            <p className="mt-4 text-xl text-orange-50 font-medium max-w-2xl">
              Get in touch
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="glass-card rounded-2xl shadow-xl p-8">
            <div className="space-y-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="animate-pulse flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-full"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
                    <div className="h-6 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : profile ? (
          <div className="space-y-8">
            <div className="glass-card rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 animate-fade-in-up">
              <div className="flex flex-col md:flex-row md:items-start gap-8 mb-8 pb-8 border-b border-gray-200">
                <div className="flex-shrink-0 mx-auto md:mx-0">
                  <div className="relative animate-scale-in">
                    <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-miami-orange-500 rounded-full blur-xl opacity-30"></div>
                    <img
                      src="/uuid=eafe1d40-bed1-43ac-b003-2e85a7b19d33&library=1&type=1&mode=1&loc=true&cap=true.jpeg"
                      alt="Ansh Bhatt"
                      className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-white shadow-xl"
                    />
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-display font-bold text-gray-900 mb-2">{profile.full_name}</h2>
                  <p className="text-xl text-gray-600 mb-4">{profile.title}</p>
                  {profile.location && (
                    <p className="text-gray-500 flex items-center justify-center md:justify-start gap-2">
                      <MapPin size={18} />
                      {profile.location}
                    </p>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-6">Contact Information</h3>

              <div className="space-y-6">
                {profile.email && (
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-miami-orange-100 rounded-lg group-hover:bg-miami-orange-200 transition-colors">
                      <Mail className="text-miami-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Email
                      </h3>
                      <a
                        href={`mailto:${profile.email}`}
                        className="text-lg text-gray-900 hover:text-miami-orange-600 transition-colors"
                      >
                        {profile.email}
                      </a>
                    </div>
                  </div>
                )}

                {profile.phone && (
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-miami-orange-100 rounded-lg group-hover:bg-miami-orange-200 transition-colors">
                      <Phone className="text-miami-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Phone
                      </h3>
                      <a
                        href={`tel:${profile.phone}`}
                        className="text-lg text-gray-900 hover:text-miami-orange-600 transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}

                {profile.location && (
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-miami-orange-100 rounded-lg group-hover:bg-miami-orange-200 transition-colors">
                      <MapPin className="text-miami-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Location
                      </h3>
                      <p className="text-lg text-gray-900">{profile.location}</p>
                    </div>
                  </div>
                )}

                {profile.website && (
                  <div className="flex items-start gap-4 group">
                    <div className="p-3 bg-miami-orange-100 rounded-lg group-hover:bg-miami-orange-200 transition-colors">
                      <Globe className="text-miami-orange-600" size={24} />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-1">
                        Website
                      </h3>
                      <a
                        href={profile.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-lg text-gray-900 hover:text-miami-orange-600 transition-colors"
                      >
                        {profile.website}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {(profile.linkedin_url || profile.github_url) && (
              <div className="glass-card rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 animate-fade-in-up" style={{ animationDelay: '100ms' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-8">Connect Online</h2>

                <div className="flex gap-4">
                  {profile.linkedin_url && (
                    <a
                      href={profile.linkedin_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-4 bg-miami-green-600 text-white rounded-lg hover:bg-miami-green-700 transition-colors flex-1 justify-center"
                    >
                      <Linkedin size={24} />
                      <span className="font-semibold">LinkedIn</span>
                    </a>
                  )}

                  {profile.github_url && (
                    <a
                      href={profile.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-6 py-4 bg-miami-orange-600 text-white rounded-lg hover:bg-miami-orange-700 transition-colors flex-1 justify-center"
                    >
                      <Github size={24} />
                      <span className="font-semibold">GitHub</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {profile.bio && (
              <div className="glass-card rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 p-8 animate-fade-in-up" style={{ animationDelay: '200ms' }}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">About</h2>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {profile.bio}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No contact information available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactPage;
