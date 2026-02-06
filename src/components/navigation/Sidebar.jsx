import React, { useState, useEffect } from 'react';
import Icon from '../ui/Icon';
import ThemeToggle from '../ThemeToggle';
import { useAppContext } from '../../contexts/AppContext';

const Sidebar = ({ currentPage, onPageChange }) => {
  const [isOpen, setIsOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth > 767;
    }
    return true;
  });
  
  const [expandedSections, setExpandedSections] = useState(() => {
    if (typeof window !== 'undefined') {
      const isMobile = window.innerWidth <= 767;
      return isMobile ? {} : { tech: true };
    }
    return { tech: true };
  });

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;
    
    const handleResize = () => {
      const shouldBeOpen = window.innerWidth > 767;
      setIsOpen(shouldBeOpen);
      if (!shouldBeOpen) {
        document.body.style.overflow = '';
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isClient]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
    if (typeof window !== 'undefined' && window.innerWidth <= 767) {
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    }
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleNavClick = (pageType, e) => {
    e.preventDefault();
    if (onPageChange) {
      onPageChange(pageType);
    } else {
      window.location.hash = `#${pageType}`;
    }
    
    if (typeof window !== 'undefined' && window.innerWidth <= 767) {
      setIsOpen(false);
      document.body.style.overflow = '';
    }
  };

  const navItems = {
    tech: [
      { page: 'tech-blog', text: 'Articles', icon: 'pen-tool' },
      { page: 'tech-projects', text: 'Projects', icon: 'rocket' },
      { page: 'tech-playbooks', text: 'Playbooks', icon: 'book-open' }
    ],
    analytics: [
      { page: 'portfolio', text: 'Portfolio Analysis', icon: 'briefcase', badge: 'PRO' },
      { page: 'watchlist', text: 'Watchlist', icon: 'star' },
      { page: 'screener', text: 'Stock Screener', icon: 'filter', badge: 'NEW' },
      { page: 'patterns', text: 'Chart Patterns', icon: 'activity' },
      { page: 'candlestick-patterns', text: 'Candlestick Patterns', icon: 'candlestick-chart' },
      { page: 'etf', text: 'ETF Analysis', icon: 'bar-chart-3' }
    ],
    markets: [
      { page: 'us-stocks', text: 'US Stocks', icon: 'trending-up' },
      { page: 'crypto', text: 'Cryptocurrency', icon: 'coins', badge: 'BETA' }
    ]
  };

  const isPageInSection = (section) => {
    return navItems[section].some(item => item.page === currentPage);
  };

  useEffect(() => {
    if (!isClient) return;
    
    // Auto-expand section containing current page
    Object.keys(navItems).forEach(section => {
      if (isPageInSection(section)) {
        setExpandedSections(prev => ({ ...prev, [section]: true }));
      }
    });
    
    // Reinitialize Lucide icons when sidebar state changes
    if (typeof window !== 'undefined' && window.lucide) {
      setTimeout(() => window.lucide.createIcons(), 100);
    }
  }, [currentPage, isOpen, isClient]);

  const renderNavSection = (sectionKey, title, icon, items) => {
    const isExpanded = expandedSections[sectionKey];
    const hasActiveChild = items.some(item => item.page === currentPage);

    return (
      <div key={sectionKey} className="nav-section mb-6">
        <button
          className={`nav-parent flex items-center justify-between w-full px-5 py-3 text-left font-semibold text-text hover:bg-bg-secondary transition-all duration-normal rounded-lg mx-3 relative transform translateZ-0 ${hasActiveChild ? 'has-active-child' : ''} ${isExpanded ? '' : 'collapsed'}`}
          onClick={() => toggleSection(sectionKey)}
          aria-expanded={isExpanded}
        >
          <div className="flex items-center">
            <div className="nav-icon-wrapper mr-3">
              <Icon iconName={icon} className="w-4 h-4" />
            </div>
            <span className="nav-text">{title}</span>
          </div>
          <div className="nav-arrow">
            <Icon iconName={isExpanded ? 'chevron-down' : 'chevron-right'} className="w-4 h-4" />
          </div>
        </button>
        <div className={`nav-children ${isExpanded ? '' : 'collapsed'} ${isExpanded ? 'block' : 'hidden'} mt-2`} aria-hidden={!isExpanded}>
          {items.map(item => (
            <a
              key={item.page}
              id={`nav-${item.page}`}
              href={`#${item.page}`}
              data-page={item.page}
              className={`nav-link flex items-center px-5 py-2 text-sm text-text-light hover:bg-bg-secondary hover:text-text transition-all duration-normal mx-3 rounded-lg ${currentPage === item.page ? 'active bg-blue-50 text-primary font-medium' : ''}`}
              onClick={(e) => handleNavClick(item.page, e)}
            >
              <div className="nav-icon-wrapper mr-3">
                <Icon iconName={item.icon} className="w-4 h-4" />
              </div>
              <span className="nav-text">{item.text}</span>
              {item.badge && (
                <span className={`nav-badge ml-auto text-xs px-2 py-1 rounded-full font-medium ${
                  item.badge === 'PRO' ? 'bg-yellow-100 text-yellow-800' :
                  item.badge === 'NEW' ? 'bg-green-100 text-green-800' :
                  'bg-blue-100 text-blue-800'
                }`} aria-label={`${item.badge} feature`}>
                  {item.badge}
                </span>
              )}
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        id="mobileMenuBtn"
        className="mobile-menu-btn fixed top-4 left-4 z-50 md:hidden p-2 bg-card-bg border border-border rounded-lg shadow-lg"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <Icon iconName={isClient && isOpen && typeof window !== 'undefined' && window.innerWidth <= 767 ? 'x' : 'menu'} className="w-6 h-6 text-text" />
      </button>

      {/* Mobile Overlay */}
      {isClient && isOpen && typeof window !== 'undefined' && window.innerWidth <= 767 && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={toggleMenu}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`sidebar fixed left-0 top-0 h-full w-[280px] bg-card-bg border-r border border-border z-40 transform transition-all duration-300 ease-in-out ${
          isClient && isOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 md:block shadow-lg`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="sidebar-header p-6 border-b border-border">
            <a 
              href="#tech-blog" 
              className="logo-container flex items-center space-x-4" 
              data-page="tech-blog" 
              onClick={(e) => handleNavClick('tech-blog', e)}
              aria-label="BeaconOfTech Home - Tech insights and innovation platform"
            >
              <div className="logo-wrapper relative">
                <div className="w-10 h-10 bg-gradient-accent rounded-lg flex items-center justify-center shadow-md">
                  <Icon iconName="cpu" className="w-5 h-5 text-white" />
                </div>
                <div className="logo-pulse absolute top-1/2 left-1/2 w-12 h-12 bg-gradient-accent rounded-full opacity-10 animate-pulse-slow transform -translate-x-1/2 -translate-y-1/2"></div>
              </div>
              <div className="brand-container">
                <span className="brand-text block text-base font-bold font-display text-text tracking-tight">BeaconOfTech</span>
              </div>
            </a>
          </div>

          {/* Navigation */}
          <nav className="sidebar-nav flex-1 overflow-y-auto py-4" role="menubar" aria-orientation="vertical">
            {renderNavSection('tech', 'Tech Insights', 'cpu', navItems.tech)}
            {renderNavSection('analytics', 'Analytics', 'trending-up', navItems.analytics)}
            {renderNavSection('markets', 'Markets', 'globe', navItems.markets)}
            
            {/* About Section - direct link */}
            <a
              id="nav-author"
              href="#author"
              data-page="author"
              className={`nav-link flex items-center px-4 py-3 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-colors ${currentPage === 'author' ? 'active bg-blue-50 dark:bg-blue-900 text-blue-600 dark:text-blue-400' : ''}`}
              onClick={(e) => handleNavClick('author', e)}
              role="menuitem"
            >
              <div className="nav-icon-wrapper mr-3">
                <Icon iconName="user" className="w-4 h-4" />
              </div>
              <span className="nav-text">About</span>
            </a>
          </nav>

          {/* Sidebar Footer */}
          <div className="sidebar-footer p-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="status-indicator" style={{ display: 'none' }}>
                <div className="status-dot online w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                <span className="status-text text-xs text-text-tertiary">Markets Open</span>
              </div>
              <ThemeToggle />
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
