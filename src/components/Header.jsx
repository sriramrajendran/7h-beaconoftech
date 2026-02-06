import React from 'react';
import Icon from './ui/Icon';
import { useAppContext } from '../contexts/AppContext';

const Header = () => {
  const { currentPage } = useAppContext();

  return (
    <header className="premium-header bg-white rounded-xl p-8 mb-8 shadow-sm border border-gray-200" role="banner">
      <div className="header-content flex items-center justify-between gap-6">
        <a 
          href="#tech-blog" 
          className="header-brand flex items-center gap-4 no-underline text-inherit"
          data-page="tech-blog"
        >
          <div className="header-logo-wrapper">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-green-500 rounded-lg flex items-center justify-center shadow-md">
              <Icon iconName="cpu" className="w-6 h-6 text-white" />
            </div>
          </div>
          <div className="header-text">
            <h1 className="text-2xl font-bold font-space-grotesk text-gray-900 mb-1">
              BeaconOfTech
            </h1>
            <p className="subtitle text-sm text-gray-600 font-medium">
              Illuminating Tech Insights | Analytics | Gen AI
            </p>
          </div>
        </a>
        
        <div className="header-actions flex items-center gap-4">
          {/* Add any header actions here if needed */}
        </div>
      </div>
    </header>
  );
};

export default Header;
