import React from 'react';
import Icon from './Icon';

const Button = ({ text = 'Button', variant = 'primary', size = 'md', icon = null, iconPosition = 'left', onClick = null, className = '', disabled = false, fullWidth = false, ariaLabel = null }) => {
  const getButtonClasses = (variant, size, fullWidth, customClasses) => {
    const classes = ['btn'];

    // Variant
    classes.push(`btn-${variant}`);

    // Size
    classes.push(`btn-${size}`);

    // Full width
    if (fullWidth) classes.push('btn-full-width');

    // Custom classes
    if (customClasses) classes.push(...customClasses.split(' ').filter(c => c));

    return classes.join(' ');
  };

  const buttonClasses = getButtonClasses(variant, size, fullWidth, className);

  return (
    <button className={buttonClasses} disabled={disabled} aria-label={ariaLabel} onClick={onClick}>
      <span className="btn-content">
        {icon && iconPosition === 'left' && <Icon iconName={icon} className="btn-icon" />}
        <span className="btn-text">{text}</span>
        {icon && iconPosition === 'right' && <Icon iconName={icon} className="btn-icon" />}
      </span>
    </button>
  );
};

export default Button;
