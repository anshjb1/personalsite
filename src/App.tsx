import React from 'react';
import Header from './components/Header';
import DynamicHero from './components/DynamicHero';
import DynamicAbout from './components/DynamicAbout';
import DynamicExperience from './components/DynamicExperience';
import DynamicProjects from './components/DynamicProjects';
import DynamicContact from './components/DynamicContact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <DynamicHero />
      <DynamicAbout />
      <DynamicExperience />
      <DynamicProjects />
      <DynamicContact />
      <Footer />
    </div>
  );
}

export default App;