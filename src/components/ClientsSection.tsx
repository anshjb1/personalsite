import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

interface Client {
  id: string;
  name: string;
  logo_url: string;
  description: string;
  industry: string;
  website_url: string;
  is_featured: boolean;
}

export default function ClientsSection() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('is_published', true)
        .order('display_order');

      if (error) throw error;
      setClients(data || []);
    } catch (error) {
      console.error('Error fetching clients:', error);
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
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Trusted By</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Working with industry leaders to drive operational excellence and sustainable growth
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {clients.map((client) => (
            <div
              key={client.id}
              className="group relative bg-gray-50 rounded-2xl p-8 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-6 rounded-xl overflow-hidden bg-white shadow-md">
                  <img
                    src={client.logo_url}
                    alt={client.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">{client.name}</h3>
                <p className="text-sm text-blue-600 font-medium mb-4">{client.industry}</p>
                <p className="text-gray-600 leading-relaxed">{client.description}</p>
              </div>

              <div className="absolute inset-0 border-2 border-transparent group-hover:border-blue-500 rounded-2xl transition-colors duration-300 pointer-events-none"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
