import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Code, ExternalLink, Github } from 'lucide-react';
import { useResumeData } from '../hooks/useResumeData';

const ProjectsPage = () => {
  const { data, loading } = useResumeData();
  const { projects } = data;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-miami-green-600 to-miami-green-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/"
            className="inline-flex items-center text-green-100 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold flex items-center gap-4">
            <Code size={48} />
            Projects
          </h1>
          <p className="mt-4 text-xl text-green-100">
            Portfolio of work and technical achievements
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse bg-white p-8 rounded-xl shadow-sm">
                <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : projects && projects.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <div
                key={project.id || index}
                className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
              >
                {project.image_url && (
                  <div className="h-48 overflow-hidden">
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-2xl font-bold text-gray-900">
                      {project.title}
                    </h2>
                    <div className="flex gap-2">
                      {project.project_url && (
                        <a
                          href={project.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-miami-green-600 hover:text-miami-green-700 transition-colors"
                          title="View Project"
                        >
                          <ExternalLink size={20} />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-miami-green-600 hover:text-miami-green-700 transition-colors"
                          title="View Source"
                        >
                          <Github size={20} />
                        </a>
                      )}
                    </div>
                  </div>

                  {project.category && (
                    <span className="inline-block px-3 py-1 bg-miami-green-100 text-miami-green-700 rounded-full text-sm font-medium mb-4">
                      {project.category}
                    </span>
                  )}

                  <p className="text-gray-700 mb-4 leading-relaxed">
                    {project.long_description || project.description}
                  </p>

                  {project.technologies && project.technologies.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, i) => (
                          <span
                            key={i}
                            className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {project.status && (
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <span className={`text-sm font-medium ${
                        project.status === 'completed' ? 'text-miami-green-600' :
                        project.status === 'in_progress' ? 'text-miami-orange-600' :
                        'text-gray-600'
                      }`}>
                        Status: {project.status.replace('_', ' ').toUpperCase()}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No projects available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;
