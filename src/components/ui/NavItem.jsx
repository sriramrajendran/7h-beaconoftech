import React from 'react';
import Icon from './Icon';

const NavItem = ({ text = 'Nav Item', icon = null, badge = null, href = '#', active = false, onClick = null, className = '' }) => {
  const getNavItemClasses = (active, customClasses) => {
    const classes = ['nav-link'];

    if (active) classes.push('active');

    if (customClasses) classes.push(...customClasses.split(' ').filter(c => c));

    return classes.join(' ');
  };

  const navItemClasses = getNavItemClasses(active, className);

  return (
    <a href={href} className={navItemClasses} onClick={onClick}>
      {icon && (
        <div className="nav-icon-wrapper">
          <Icon iconName={icon} />
        </div>
      )}
      <span className="nav-text">{text}</span>
      {badge && (
        <span className={`nav-badge nav-badge-${badge.type}`}>
          {badge.text}
        </span>
      )}
    </a>
  );
};

export default NavItem;
