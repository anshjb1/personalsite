import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Award, CheckCircle, Trophy, Star } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const CertificationsPage = () => {
  const { data, loading } = useResumeData();
  const { certifications } = data;

  const awards = certifications.filter(cert =>
    cert.name.includes('Finalist') ||
    cert.name.includes('Semifinalist') ||
    cert.name.includes('Scholar') ||
    cert.name.includes('Cum Laude') ||
    cert.name.includes('Deans List')
  );

  const professionalCerts = certifications.filter(cert =>
    !awards.some(award => award.id === cert.id)
  );

  const getIconForCert = (name: string) => {
    if (name.includes('Finalist') || name.includes('Semifinalist')) {
      return <Trophy className="text-amber-600" size={32} />;
    }
    if (name.includes('Scholar') || name.includes('Cum Laude') || name.includes('Deans')) {
      return <Star className="text-yellow-500" size={32} />;
    }
    if (name.includes('Leadership') || name.includes('Challenge')) {
      return <Award className="text-green-600" size={32} />;
    }
    return <CheckCircle className="text-blue-600" size={32} />;
  };

  const CertificationCard = ({ cert, index }: { cert: any; index: number }) => (
    <div
      className="glass-card rounded-xl shadow-lg hover:shadow-2xl transition-all duration-500 p-6 animate-fade-in-up hover:-translate-y-1"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start gap-4">
        <div className="p-3 bg-gradient-to-br from-miami-green-50 to-miami-orange-50 rounded-lg flex-shrink-0">
          {getIconForCert(cert.name)}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2">{cert.name}</h3>
          {cert.issuing_organization && (
            <p className="text-gray-600 mb-2 font-medium">{cert.issuing_organization}</p>
          )}
          {cert.issue_date && (
            <p className="text-gray-500 text-sm">
              Issued: {new Date(cert.issue_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
          )}
          {cert.expiration_date && (
            <p className="text-gray-500 text-sm">
              Expires: {new Date(cert.expiration_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long'
              })}
            </p>
          )}
          {cert.credential_url && (
            <a
              href={cert.credential_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-3 text-miami-green-600 hover:text-miami-green-700 font-medium text-sm transition-colors"
            >
              View Credential →
            </a>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-green-50/20 to-gray-50">
      <div className="relative bg-gradient-to-br from-miami-green-700 via-miami-green-600 to-emerald-700 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="gradient-wave wave-1"></div>
          <div className="gradient-wave wave-3"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-green-100 hover:text-white mb-8 transition-all duration-300 hover:gap-3 gap-2 group animate-fade-in"
          >
            <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
            Back to Home
          </Link>
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-6xl font-display font-bold flex items-center gap-4 mb-4 drop-shadow-lg">
              <Award size={56} className="animate-scale-in" />
              Certifications & Awards
            </h1>
            <p className="mt-4 text-xl text-green-50 font-medium max-w-2xl">
              Professional certifications and academic honors
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="space-y-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="glass-card rounded-xl shadow-lg p-6 animate-pulse">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0"></div>
                  <div className="flex-1">
                    <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : certifications.length > 0 ? (
          <div className="space-y-12">
            {awards.length > 0 && (
              <section>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Trophy className="text-amber-600" size={32} />
                  Honors & Awards
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {awards.map((cert, index) => (
                    <CertificationCard key={cert.id} cert={cert} index={index} />
                  ))}
                </div>
              </section>
            )}

            {professionalCerts.length > 0 && (
              <section>
                <h2 className="text-3xl font-display font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <CheckCircle className="text-blue-600" size={32} />
                  Professional Certifications
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {professionalCerts.map((cert, index) => (
                    <CertificationCard key={cert.id} cert={cert} index={index} />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <Award className="mx-auto text-gray-300 mb-4" size={64} />
            <p className="text-gray-500 text-lg">No certifications or awards available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CertificationsPage;
