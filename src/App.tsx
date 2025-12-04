import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import SwipeWrapper from './components/SwipeWrapper';
import HomePage from './pages/HomePage';
import ExperiencePage from './pages/ExperiencePage';
import EducationPage from './pages/EducationPage';
import ProjectsPage from './pages/ProjectsPage';
import CertificationsPage from './pages/CertificationsPage';
import FeaturesPage from './pages/FeaturesPage';
import ContactPage from './pages/ContactPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Header />
        <SwipeWrapper>
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/experience" element={<ExperiencePage />} />
              <Route path="/education" element={<EducationPage />} />
              <Route path="/projects" element={<ProjectsPage />} />
              <Route path="/certifications" element={<CertificationsPage />} />
              <Route path="/features" element={<FeaturesPage />} />
              <Route path="/contact" element={<ContactPage />} />
            </Routes>
          </main>
        </SwipeWrapper>
        <Footer />
      </div>
    </Router>
  );
}

export default App;