import React from 'react';
import Icon from './ui/Icon';

const Welcome = () => {
  return (
    <section className="premium-welcome mb-8" role="banner">
      <div className="welcome-card bg-white rounded-xl p-8 shadow-sm border border-gray-200">
        <div className="welcome-content grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-center">
          <div className="welcome-text">
            <h1 className="text-5xl font-black font-space-grotesk text-gray-900 mb-4 leading-tight">
              Welcome to BeaconOfTech
            </h1>
            <p className="welcome-description text-lg text-gray-600 mb-4 leading-relaxed">
              Your gateway to cutting-edge technology insights, analytics, and AI innovation. 
              Explore practical solutions, industry trends, and expert analysis in modern software development, 
              data science, and artificial intelligence.
            </p>
            <div className="welcome-actions flex flex-wrap gap-4">
              <a 
                href="#tech-blog" 
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold rounded-lg hover:from-blue-600 hover:to-green-600 transition-all duration-200 shadow-md hover:shadow-lg"
                data-page="tech-blog"
              >
                <Icon iconName="pen-tool" className="w-4 h-4 mr-2" />
                Explore Articles
              </a>
              <a 
                href="#tech-projects" 
                className="inline-flex items-center px-6 py-3 bg-white text-gray-700 font-semibold rounded-lg border border-gray-300 hover:bg-gray-50 transition-all duration-200"
                data-page="tech-projects"
              >
                <Icon iconName="rocket" className="w-4 h-4 mr-2" />
                View Projects
              </a>
            </div>
          </div>
          
          <div className="welcome-visual hidden lg:block">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-100 to-green-100 rounded-2xl flex items-center justify-center">
              <Icon iconName="cpu" className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Welcome;
