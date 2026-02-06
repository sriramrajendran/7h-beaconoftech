import React from 'react';
import Icon from './ui/Icon';
import { AppProvider } from '../contexts/AppContext';

const AppInitializer = ({ children }) => {
  const [theme, setTheme] = React.useState('light');
  const [currentPage, setCurrentPage] = React.useState(null);
  const [isClient, setIsClient] = React.useState(false);

  React.useEffect(() => {
    setIsClient(true);
    // Initialize theme from localStorage after mount
    const stored = localStorage.getItem('theme');
    if (stored) {
      setTheme(stored);
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setTheme(prefersDark ? 'dark' : 'light');
    }
  }, []);

  React.useEffect(() => {
    if (!isClient) return; // Skip on server
    const body = document.body;
    if (theme === 'dark') {
      body.classList.add('dark-theme');
      localStorage.setItem('theme', 'dark');
    } else {
      body.classList.remove('dark-theme');
      localStorage.setItem('theme', 'light');
    }
  }, [theme, isClient]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  // Micro interactions
  React.useEffect(() => {
    if (!isClient) return; // Skip on server
    
    // Setup button ripples
    const handleClick = (e) => {
      const button = e.target.closest('.btn');
      if (!button) return;

      const ripple = document.createElement('span');
      ripple.classList.add('ripple');
      
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      
      button.style.position = 'relative';
      button.style.overflow = 'hidden';
      button.appendChild(ripple);
      
      setTimeout(() => ripple.remove(), 600);
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, [isClient]);

  React.useEffect(() => {
    if (!isClient) return; // Skip on server
    
    // Setup hover effects
    const cards = document.querySelectorAll('.card-hover');
    const navLinks = document.querySelectorAll('.nav-link');

    const cardHandlers = Array.from(cards).map(card => {
      const enter = () => card.style.transform = 'translateY(-4px) translateZ(0)';
      const leave = () => card.style.transform = 'translateY(0) translateZ(0)';
      card.addEventListener('mouseenter', enter);
      card.addEventListener('mouseleave', leave);
      return { card, enter, leave };
    });

    const linkHandlers = Array.from(navLinks).map(link => {
      const icon = link.querySelector('.nav-icon');
      const enter = () => {
        if (icon) icon.style.transform = 'scale(1.1) rotate(5deg)';
      };
      const leave = () => {
        if (icon) icon.style.transform = 'scale(1) rotate(0deg)';
      };
      link.addEventListener('mouseenter', enter);
      link.addEventListener('mouseleave', leave);
      return { link, enter, leave };
    });

    return () => {
      cardHandlers.forEach(({ card, enter, leave }) => {
        card.removeEventListener('mouseenter', enter);
        card.removeEventListener('mouseleave', leave);
      });
      linkHandlers.forEach(({ link, enter, leave }) => {
        link.removeEventListener('mouseenter', enter);
        link.removeEventListener('mouseleave', leave);
      });
    };
  }, [isClient]);

  const handlePageChange = (pageType) => {
    setCurrentPage(pageType);
    // Update URL hash
    if (typeof window !== 'undefined') {
      window.isUpdatingHash = true;
      window.location.hash = `#${pageType}`;
      setTimeout(() => {
        window.isUpdatingHash = false;
      }, 100);
    }
  };

  React.useEffect(() => {
    // Initialize Lucide icons
    if (typeof window !== 'undefined' && window.lucide) {
      window.lucide.createIcons();
    }
  }, []);

  React.useEffect(() => {
    // Reinitialize icons when theme changes
    if (typeof window !== 'undefined' && window.lucide) {
      setTimeout(() => window.lucide.createIcons(), 100);
    }
  }, [theme]);

  // Handle hash changes from browser navigation
  React.useEffect(() => {
    const handleHashChange = () => {
      if (!window.isUpdatingHash) {
        const hash = window.location.hash.replace('#', '');
        if (hash && hash !== currentPage) {
          setCurrentPage(hash);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('hashchange', handleHashChange);
      
      // Set initial page from hash
      const hash = window.location.hash.replace('#', '');
      if (hash) {
        setCurrentPage(hash);
      } else {
        setCurrentPage('tech-blog'); // Default page
      }

      return () => window.removeEventListener('hashchange', handleHashChange);
    }
  }, [currentPage]);

  return (
    <AppProvider>
      {/* Theme Toggle Button */}
      <button
        id="themeToggle"
        className="fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
        onClick={toggleTheme}
        aria-label="Toggle theme"
      >
        <Icon iconName={theme === 'dark' ? 'sun' : 'moon'} className="w-6 h-6" />
      </button>
      {children}
    </AppProvider>
  );
};

export default AppInitializer;
