import React from 'react';
import { Building2, Heart, GraduationCap, Shield } from 'lucide-react';

const industries = [
  {
    name: 'GovTech / Public Sector',
    icon: Building2,
    color: 'from-blue-500 to-blue-600'
  },
  {
    name: 'MedTech / HealthTech / InsurTech',
    icon: Heart,
    color: 'from-red-500 to-pink-600'
  },
  {
    name: 'Private Medical Practices',
    icon: Shield,
    color: 'from-green-500 to-emerald-600'
  },
  {
    name: 'EduTech',
    icon: GraduationCap,
    color: 'from-purple-500 to-purple-600'
  }
];

export default function IndustrySpecialization() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Industry Specialization</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Deep domain expertise in high-growth, regulated industries
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {industries.map((industry) => {
            const IconComponent = industry.icon;

            return (
              <div
                key={industry.name}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 bg-gradient-to-br ${industry.color} rounded-2xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 leading-snug">{industry.name}</h3>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 max-w-4xl mx-auto bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">The Ecosystem & Talent</h3>
          <p className="text-gray-700 leading-relaxed mb-6 text-center">
            My clients gain access to my active network in the Miami Startup Ecosystem, providing turnkey solutions for problems I identify:
          </p>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-blue-600 font-semibold mb-2">Implementation Teams</div>
              <p className="text-sm text-gray-600">Access to vetted specialists for Sales, Marketing, and Design execution</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 font-semibold mb-2">Specialized Legal</div>
              <p className="text-sm text-gray-600">IP, Corporate, and Government Contract law connections</p>
            </div>
            <div className="text-center">
              <div className="text-blue-600 font-semibold mb-2">Lobbying & Policy</div>
              <p className="text-sm text-gray-600">Navigate regulatory hurdles with expert guidance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
