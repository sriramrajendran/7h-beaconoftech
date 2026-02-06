import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon';

const Projects = () => {
  const [projects, setProjects] = useState([
    {
      id: 1,
      title: "Real Time Market Analysis",
      category: "FinTech",
      status: "Active",
      description: "Real-time marker analysis on demand for portfolio and watchlist with US market analysis and crypto market analysis. Features chart pattern analysis, technical analysis based on indicators, and candlestick pattern analysis.",
      technologies: ["HTML", "CSS", "JavaScript", "GitHub Pages", "Chart.js", "Lucide Icons"],
      features: [
        "Real-time market analysis on demand",
        "Portfolio and watchlist analysis",
        "US market analysis and crypto market analysis",
        "Chart pattern analysis",
        "Technical analysis based on indicators",
        "Candlestick pattern analysis",
        "Code embedded in this app",
      ],
      githubUrl: "https://github.com/sriramrajendran/7h-beaconoftech",
      demoUrl: "https://sriramrajendran.github.io/7h-beaconoftech",
    },
    {
      id: 2,
      title: "Stock Analysis Engine",
      category: "FinTech",
      status: "Active",
      description: "Comprehensive analysis of the market, stocks, ETFs, crypto, and more. Features scheduled checks, alerting via push notifications, and enables users to set up alerts for specific stocks, ETFs, crypto, etc.",
      technologies: ["Python", "JavaScript", "API Integration", "Data Analysis", "Notification Systems"],
      features: [
        "Analysis of market, stocks, ETFs, crypto, etc.",
        "Scheduled checks and monitoring",
        "Alerting via push notifications",
        "Custom alerts for specific stocks, ETFs, crypto",
        "Automated market scanning",
      ],
      githubUrl: "https://github.com/sriramrajendran/7h-stock-analyzer",
      demoUrl: null,
    },
    {
      id: 3,
      title: "Gen AI based Educator",
      category: "AI/EdTech",
      status: "In Development",
      description: "Expert analysis on stocks, mortgages, real estate, and more with personified experience. Provides explanations in terms of a user's loan, mortgage, and financial situations.",
      technologies: ["Python", "FastAPI", "OpenAI", "ChromaDB", "Langgraph", "Docker", "GitHub Actions", "GitHub Pages", "React", "TailwindCSS", "NodeJS"],
      features: [
        "Expert analysis on stocks, mortgages, real estate",
        "Personified AI experience",
        "Explanations in terms of user's loan and mortgage",
        "Interactive learning modules",
        "Real-time financial education",
      ],
      githubUrl: "https://github.com/sriramrajendran/7h-stock-analyzer",
      demoUrl: null,
    },
    {
      id: 4,
      title: "Sensible Stories",
      category: "Web/Publishing",
      status: "Active",
      description: "A professional GitHub Pages site for hosting and reading PDF stories online. Features dynamic story loading, built-in PDF viewer with navigation controls, and mobile-responsive design.",
      technologies: ["HTML", "CSS", "JavaScript", "PDF.js", "GitHub Pages", "Google Fonts"],
      features: [
        "Dynamic story loading from stories directory",
        "Professional UI with gradient backgrounds",
        "Built-in PDF viewer with navigation controls",
        "Mobile responsive design",
        "Easy content updates via JSON configuration",
        "Automatic GitHub Pages deployment",
      ],
      githubUrl: "https://github.com/sriramrajendran/sensiblestories",
      demoUrl: "https://lavanyasriram7.github.io/sensiblestories/",
    },
  ]);

  const [selectedProject, setSelectedProject] = useState(null);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('all');
  const [activeStatusFilter, setActiveStatusFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projects);

  const getProjectStats = () => {
    const total = projects.length;
    const active = projects.filter((p) => p.status === 'Active').length;
    const completed = projects.filter((p) => p.status === 'Completed').length;
    return { total, active, completed };
  };

  const getCategories = () => {
    return [...new Set(projects.map((p) => p.category))];
  };

  const getStatuses = () => {
    return [...new Set(projects.map((p) => p.status))];
  };

  useEffect(() => {
    let filtered = projects;

    if (activeCategoryFilter !== 'all') {
      filtered = filtered.filter((p) => p.category === activeCategoryFilter);
    }

    if (activeStatusFilter !== 'all') {
      filtered = filtered.filter((p) => p.status === activeStatusFilter);
    }

    setFilteredProjects(filtered);
  }, [activeCategoryFilter, activeStatusFilter, projects]);

  const handleCategoryFilter = (category) => {
    setActiveCategoryFilter(category);
  };

  const handleStatusFilter = (status) => {
    setActiveStatusFilter(status);
  };

  const showProjectDetails = (projectId) => {
    const project = projects.find((p) => p.id === projectId);
    if (project) {
      setSelectedProject(project);
    }
  };

  const showProjectsList = () => {
    setSelectedProject(null);
  };

  const generateProjectCard = (project) => {
    const statusClass = project.status.toLowerCase().replace(/\s+/g, '-');
    const statusColorClass = statusClass === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
      statusClass === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';

    return (
      <article className="project-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
        <div className="card-header flex justify-between items-center mb-4">
          <span className="project-category text-blue-600 dark:text-blue-400 font-semibold text-sm">{project.category}</span>
          <span className={`project-status text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColorClass}`}>{project.status}</span>
        </div>

        <div className="card-content">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{project.title}</h3>
          <p className="project-description text-gray-700 dark:text-gray-300 mb-4">{project.description}</p>

          <div className="project-technologies mb-4">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Technologies</h4>
            <div className="tech-tags flex flex-wrap gap-2">
              {project.technologies.map((tech, idx) => (
                <span key={idx} className="tech-tag bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-xs px-2 py-1 rounded">{tech}</span>
              ))}
            </div>
          </div>

          <div className="project-features mb-4">
            <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-200 mb-2">Key Features</h4>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-sm space-y-1">
              {project.features.slice(0, 3).map((feature, idx) => (
                <li key={idx}>{feature}</li>
              ))}
              {project.features.length > 3 && (
                <li className="more-features text-gray-600 dark:text-gray-400">+{project.features.length - 3} more features</li>
              )}
            </ul>
          </div>

          <div className="project-actions flex flex-wrap gap-2">
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="action-btn primary px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition duration-200">
              📂 View Code
            </a>
            {project.demoUrl && (
              <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-lg hover:bg-green-700 transition duration-200">
                🚀 Live Demo
              </a>
            )}
            <button
              className="action-btn tertiary px-4 py-2 bg-gray-200 text-gray-800 text-sm font-medium rounded-lg hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 transition duration-200"
              onClick={() => showProjectDetails(project.id)}
            >
              📊 Details
            </button>
          </div>
        </div>
      </article>
    );
  };

  const generateProjectStats = () => {
    const stats = getProjectStats();
    return (
      <section className="project-stats mb-8">
        <div className="stats-grid grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{stats.total}</h3>
            <p className="text-gray-600 dark:text-gray-400">Total Projects</p>
          </div>
          <div className="stat-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">{stats.active}</h3>
            <p className="text-gray-600 dark:text-gray-400">Active Projects</p>
          </div>
          <div className="stat-card bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h3 className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">{stats.completed}</h3>
            <p className="text-gray-600 dark:text-gray-400">Completed</p>
          </div>
        </div>
      </section>
    );
  };

  const generateProjectFilters = () => {
    const categories = getCategories();
    const statuses = getStatuses();

    return (
      <section className="project-filters mb-8">
        <div className="filter-group mb-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Category</h4>
          <div className="filter-options flex flex-wrap gap-2">
            <button
              className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                activeCategoryFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleCategoryFilter('all')}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeCategoryFilter === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleCategoryFilter(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Status</h4>
          <div className="filter-options flex flex-wrap gap-2">
            <button
              className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                activeStatusFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
              }`}
              onClick={() => handleStatusFilter('all')}
            >
              All
            </button>
            {statuses.map((status) => (
              <button
                key={status}
                className={`filter-btn px-4 py-2 rounded-lg text-sm font-medium transition duration-200 ${
                  activeStatusFilter === status ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600'
                }`}
                onClick={() => handleStatusFilter(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </section>
    );
  };

  const generateDetailedProjectSections = (project) => {
    const statusClass = project.status.toLowerCase().replace(/\s+/g, '-');
    const statusColorClass = statusClass === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
      statusClass === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';

    return (
      <>
        <section className="project-section mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Technologies Used</h2>
          <div className="tech-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {project.technologies.map((tech, idx) => (
              <div key={idx} className="tech-card bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">{tech}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">Core technology component</p>
              </div>
            ))}
          </div>
        </section>

        <section className="project-section mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Features</h2>
          <div className="features-list space-y-2">
            {project.features.map((feature, idx) => (
              <div key={idx} className="feature-item flex items-center bg-white dark:bg-gray-800 p-3 rounded-lg shadow-sm">
                <span className="feature-icon mr-3">✅</span>
                <span className="feature-text text-gray-700 dark:text-gray-300">{feature}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="project-section">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Project Gallery</h2>
          <div className="project-gallery bg-gray-100 dark:bg-gray-700 p-8 rounded-lg text-center">
            <div className="gallery-placeholder">
              <p className="text-gray-600 dark:text-gray-400">📸 Project screenshots and media will be displayed here</p>
            </div>
          </div>
        </section>
      </>
    );
  };

  const generateProjectsContent = () => {
    if (selectedProject) {
      const statusClass = selectedProject.status.toLowerCase().replace(/\s+/g, '-');
      const statusColorClass = statusClass === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100' :
        statusClass === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' :
          'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100';

      return (
        <div className="project-details container mx-auto px-4 py-8">
          <button
            className="back-btn mb-6 px-4 py-2 bg-gray-200 text-gray-800 font-medium rounded-lg hover:bg-gray-300 transition duration-200"
            onClick={showProjectsList}
          >
            ← Back to Projects
          </button>

          <div className="project-header mb-8">
            <div className="project-info mb-6">
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">{selectedProject.title}</h1>
              <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">{selectedProject.description}</p>

              <div className="project-meta-header flex flex-wrap gap-4">
                <span className="project-category text-blue-600 dark:text-blue-400 font-semibold">{selectedProject.category}</span>
                <span className={`project-status text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColorClass}`}>{selectedProject.status}</span>
              </div>
            </div>

            <div className="project-actions-header flex flex-wrap gap-4">
              <a href={selectedProject.githubUrl} target="_blank" rel="noopener noreferrer" className="action-btn primary px-4 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200">
                📂 View Code
              </a>
              {selectedProject.demoUrl && (
                <a href={selectedProject.demoUrl} target="_blank" rel="noopener noreferrer" className="action-btn secondary px-4 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition duration-200">
                  🚀 Live Demo
                </a>
              )}
            </div>
          </div>

          <div className="project-content">
            {generateDetailedProjectSections(selectedProject)}
          </div>
        </div>
      );
    }

    return (
      <div className="projects-container container mx-auto px-4 py-8">
        <div className="page-header text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Projects</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">Explore the work - intended for educational purposes</p>
        </div>

        {generateProjectStats()}
        {generateProjectFilters()}

        <section className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <React.Fragment key={project.id}>{generateProjectCard(project)}</React.Fragment>
          ))}
        </section>
      </div>
    );
  };

  return generateProjectsContent();
};

export default Projects;
