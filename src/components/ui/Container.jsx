import React from 'react';

const Container = ({ maxWidth = 'container', padding = 'md', className = '' }) => {
  return (
    <div className={`${maxWidth} container-padding-${padding} ${className}`.trim()}>
      {/* Children will be rendered here */}
    </div>
  );
};

export default Container;
