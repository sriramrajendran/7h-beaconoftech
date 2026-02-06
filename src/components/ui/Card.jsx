import React from 'react';

const Card = ({ title = null, subtitle = null, content = null, image = null, actions = [], variant = 'default', padding = 'md', hover = true, className = '', onClick = null }) => {
  const getCardClasses = (variant, padding, hover, customClasses) => {
    const classes = ['card'];

    // Variant
    classes.push(`card-${variant}`);

    // Padding
    classes.push(`card-padding-${padding}`);

    // Hover effect
    if (hover) classes.push('card-hover');

    // Custom classes
    if (customClasses) classes.push(...customClasses.split(' ').filter(c => c));

    return classes.join(' ');
  };

  const cardClasses = getCardClasses(variant, padding, hover, className);

  return (
    <div className={cardClasses} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      {(title || subtitle) && (
        <div className="card-header">
          {title && <h3 className="card-title">{title}</h3>}
          {subtitle && <p className="card-subtitle">{subtitle}</p>}
        </div>
      )}

      {image && (
        <div className="card-image">
          {typeof image === 'string' ? (
            <img src={image} alt={title || 'Card image'} />
          ) : (
            image
          )}
        </div>
      )}

      {content && (
        <div className="card-content">
          {typeof content === 'string' ? (
            <div dangerouslySetInnerHTML={{ __html: content }} />
          ) : (
            content
          )}
        </div>
      )}

      {actions && actions.length > 0 && (
        <div className="card-actions">
          {actions.map((action, index) => (
            typeof action === 'string' ? (
              <div key={index} dangerouslySetInnerHTML={{ __html: action }} />
            ) : (
              React.cloneElement(action, { key: index })
            )
          ))}
        </div>
      )}
    </div>
  );
};

export default Card;
