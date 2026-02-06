import React from 'react';

const Section = ({ id = null, title = null, subtitle = null, content = null, variant = 'default', padding = 'lg', background = 'default', className = '', centered = false }) => {
  const getSectionClasses = (variant, padding, background, centered, customClasses) => {
    const classes = ['section'];

    // Variant
    classes.push(`section-${variant}`);

    // Padding
    if (padding !== 'none') classes.push(`section-padding-${padding}`);

    // Background
    if (background !== 'default') classes.push(`section-bg-${background}`);

    // Centered
    if (centered) classes.push('section-centered');

    // Custom classes
    if (customClasses) classes.push(...customClasses.split(' ').filter(c => c));

    return classes.join(' ');
  };

  const sectionClasses = getSectionClasses(variant, padding, background, centered, className);

  return (
    <section id={id} className={sectionClasses}>
      {(title || subtitle) && (
        <div className="section-header">
          {title && <h2 className="section-title">{title}</h2>}
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>
      )}

      {content && (
        <div className="section-content">
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            content
          )}
        </div>
      )}
    </section>
  );
};

export default Section;
