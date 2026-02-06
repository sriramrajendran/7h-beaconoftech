import React from 'react';
import Icon from './ui/Icon';
import { AppProvider } from '../contexts/AppContext';

const AppInitializer = ({ children }) => {
  return (
    <AppProvider>
      {children}
    </AppProvider>
  );
};

export default AppInitializer;
