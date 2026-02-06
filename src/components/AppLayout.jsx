import React from 'react';
import Sidebar from './navigation/Sidebar';
import Header from './Header';
import Welcome from './Welcome';
import Footer from './Footer';
import { useAppContext } from '../contexts/AppContext';

const AppLayout = ({ children }) => {
  const { currentPage, handlePageChange } = useAppContext();
  
  return (
    <div className="app-layout flex min-h-screen">
      <Sidebar currentPage={currentPage} onPageChange={handlePageChange} />
      <div className="main-content flex-1 md:ml-[280px]" role="main">
        <div className="container mx-auto max-w-7xl p-8 bg-gradient-hero min-h-screen">
          <Header />
          <Welcome />
          {children}
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
