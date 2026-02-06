import React from 'react';
import Icon from './ui/Icon';
import { useAppContext } from '../contexts/AppContext';

const ThemeToggle = () => {
  const { theme, toggleTheme } = useAppContext();

  return (
    <button
      id="themeToggle"
      className="fixed top-4 right-4 z-50 p-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <Icon iconName={theme === 'dark' ? 'sun' : 'moon'} className="w-6 h-6" />
    </button>
  );
};

export default ThemeToggle;
