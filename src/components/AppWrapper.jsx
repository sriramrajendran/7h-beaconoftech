import React from 'react';
import { AppProvider } from '../contexts/AppContext';
import AppLayout from './AppLayout';
import PageManager from './PageManager';

const AppWrapper = () => {
  return (
    <AppProvider>
      <AppLayout>
        <PageManager />
      </AppLayout>
    </AppProvider>
  );
};

export default AppWrapper;

// Also export as a named export for Astro
export { AppWrapper };
