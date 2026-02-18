import React, { useEffect, useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Competency {
  id: string;
  title: string;
  category: string;
  items: string[];
  display_order: number;
}

export default function CompetenciesSection() {
  const [competencies, setCompetencies] = useState<Competency[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCompetencies();
  }, []);

  const fetchCompetencies = async () => {
    try {
      const { data, error } = await supabase
        .from('competencies')
        .select('*')
        .eq('is_published', true)
        .order('display_order');

      if (error) throw error;
      setCompetencies(data || []);
    } catch (error) {
      console.error('Error fetching competencies:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Core Competencies</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Specialized expertise across strategy, operations, and public sector engagement
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {competencies.map((competency) => (
            <div
              key={competency.id}
              className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="mb-6">
                <div className="inline-block px-4 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-4">
                  {competency.category}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{competency.title}</h3>
              </div>

              <div className="space-y-4">
                {competency.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-gray-700 leading-relaxed text-sm">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
