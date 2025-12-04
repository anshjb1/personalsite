import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, MapPin, Globe, Linkedin, Github } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const ContactPage = () => {
  const { data, loading } = useResumeData();
  const { profile } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-miami-orange-600 to-miami-orange-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-orange-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4">
            <Mail size={48} />
            Contact
          </h1>
          <p className="mt-4 text-xl text-orange-100">
            Get in touch
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="bg-white rounded-xl shadow-sm p-8">
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
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h2>

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
              <div className="bg-white rounded-xl shadow-sm p-8">
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
              <div className="bg-white rounded-xl shadow-sm p-8">
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
