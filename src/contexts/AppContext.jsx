import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext(null);

export const useAppContext = () => {
  const context = useContext(AppContext);
  
  // Always provide a fallback context during SSR/hydration to prevent errors
  if (!context) {
    if (typeof window === 'undefined') {
      // Server-side rendering fallback
      return {
        theme: 'light',
        currentPage: null,
        isClient: false,
        toggleTheme: () => {},
        handlePageChange: () => {},
        setCurrentPage: () => {}
      };
    }
    
    // Client-side but context not available - this shouldn't happen but provide fallback
    console.warn('useAppContext called outside AppProvider, using fallback values');
    return {
      theme: 'light',
      currentPage: null,
      isClient: true,
      toggleTheme: () => {},
      handlePageChange: () => {},
      setCurrentPage: () => {}
    };
  }
  
  return context;
};

export const AppProvider = ({ children }) => {
  const [theme, setTheme] = useState('light');
  const [currentPage, setCurrentPage] = useState(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
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

  useEffect(() => {
    if (!isClient) return;
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

  const handlePageChange = (page) => {
    setCurrentPage(page);
    // Update URL hash
    if (typeof window !== 'undefined') {
      window.isUpdatingHash = true;
      window.location.hash = `#${page}`;
      setTimeout(() => {
        window.isUpdatingHash = false;
      }, 100);
    }
  };

  // Handle hash changes from browser navigation
  useEffect(() => {
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

  const value = {
    theme,
    currentPage,
    isClient,
    toggleTheme,
    handlePageChange,
    setCurrentPage
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
