import React, { useEffect, useRef } from 'react';

const Icon = ({ iconName, size = 'md', className = '' }) => {
  const iconRef = useRef(null);
  const [isClient, setIsClient] = React.useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient && iconRef.current && window.lucide) {
      window.lucide.createIcons();
    }
  }, [isClient, iconName]);

  // Return a placeholder div on server, render icon only on client
  return (
    <i 
      ref={iconRef}
      data-lucide={isClient ? iconName : undefined}
      className={`icon icon-${size} ${className}`.trim()} 
      aria-hidden="true"
    >
      {!isClient && <span style={{ opacity: 0 }}>•</span>}
    </i>
  );
};

export default Icon;
