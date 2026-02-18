import React, { useEffect, useState } from 'react';
import { Sparkles, Target, Lightbulb } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Profile {
  full_name: string;
  title: string;
  bio: string;
}

export default function ValueProposition() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase
        .from('profile')
        .select('full_name, title, bio')
        .single();

      if (error) throw error;
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-white border-r-transparent"></div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:32px_32px]"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {profile?.full_name}
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 font-medium tracking-wide">
              {profile?.title}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20 shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-yellow-300" />
              <h2 className="text-3xl font-bold text-white">The Value Proposition</h2>
            </div>

            <p className="text-xl text-white leading-relaxed mb-8">
              {profile?.bio}
            </p>

            <div className="grid md:grid-cols-2 gap-6 mt-12">
              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                    <Target className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Why Me?</h3>
                </div>
                <p className="text-blue-50 leading-relaxed">
                  I have successfully bootstrapped two businesses to $200K–$300K scale (raising $180K in non-dilutive funding in just 4 months) and have guided over 20 clients through the minefield of early-stage growth.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-green-400 rounded-xl flex items-center justify-center">
                    <Lightbulb className="w-6 h-6 text-blue-900" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Miami Market</h3>
                </div>
                <p className="text-blue-50 leading-relaxed">
                  Deep expertise in the Miami startup ecosystem with established networks in legal, marketing, and government sectors to help you break into the market.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
