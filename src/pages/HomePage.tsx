import React from 'react';
import { Link } from 'react-router-dom';
import ValueProposition from '../components/ValueProposition';
import ClientsSection from '../components/ClientsSection';
import MetricsSection from '../components/MetricsSection';
import CompetenciesSection from '../components/CompetenciesSection';
import IndustrySpecialization from '../components/IndustrySpecialization';
import ServicesSection from '../components/ServicesSection';
import DynamicExperience from '../components/DynamicExperience';
import DynamicProjects from '../components/DynamicProjects';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      <ValueProposition />
      <ClientsSection />
      <MetricsSection />
      <CompetenciesSection />
      <IndustrySpecialization />
      <DynamicExperience />
      <DynamicProjects />
      <ServicesSection />
    </div>
  );
};

export default HomePage;
