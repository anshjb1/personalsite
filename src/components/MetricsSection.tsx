import { useEffect, useState } from 'react';
import { TrendingUp, Users, Building2, DollarSign, BarChart3 } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Metric {
  id: string;
  label: string;
  value: string;
  description: string;
  icon: string;
  display_order: number;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'trending-up': TrendingUp,
  'users': Users,
  'building': Building2,
  'dollar-sign': DollarSign,
  'bar-chart': BarChart3,
};

export default function MetricsSection() {
  const [metrics, setMetrics] = useState<Metric[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMetrics();
  }, []);

  const fetchMetrics = async () => {
    try {
      const { data, error } = await supabase
        .from('metrics')
        .select('*')
        .eq('is_published', true)
        .order('display_order');

      if (error) throw error;
      setMetrics(data || []);
    } catch (error) {
      console.error('Error fetching metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">By The Numbers</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Proven track record of driving results and scaling businesses
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
          {metrics.map((metric) => {
            const IconComponent = iconMap[metric.icon] || TrendingUp;

            return (
              <div
                key={metric.id}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex flex-col items-center text-center">
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4 shadow-lg">
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{metric.value}</div>
                  <div className="text-sm font-semibold text-blue-600 mb-2">{metric.label}</div>
                  <p className="text-xs text-gray-600 leading-relaxed">{metric.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
