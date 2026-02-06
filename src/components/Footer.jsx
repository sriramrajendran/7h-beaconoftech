import React from 'react';
import Icon from './ui/Icon';

const Footer = () => {
  return (
    <footer className="premium-footer bg-card-bg border border-border rounded-2xl shadow-lg p-8 mt-8" role="contentinfo">
      <div className="footer-content">
        <div className="footer-brand flex items-center mb-6">
          <div className="footer-logo-container">
            <div className="w-8 h-8 bg-gradient-accent rounded-lg flex items-center justify-center">
              <Icon iconName="cpu" className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
        <div className="footer-legal">
          <p className="text-sm text-text-light mb-4">© 2026 BeaconOfTech | Sriram Rajendran | @rajen.sriram</p>
          <div className="disclaimer-container">
            <div className="disclaimer text-xs text-text-tertiary">
              <p className="mb-2">Educational platform for technology insights and innovation analysis.</p>
              <p className="mb-2">Not financial advice. For educational purposes only.</p>
              <p>Market data provided for demonstration purposes.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
