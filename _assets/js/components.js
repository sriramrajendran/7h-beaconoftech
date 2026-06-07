// Reusable UI Components System for BeaconOfTech
// Provides consistent, clean components across the site

class ComponentSystem {
    constructor() {
        this.init();
    }

    init() {
        console.log('ComponentSystem initialized');
    }

    // Button Component System
    static createButton(options = {}) {
        const {
            text = 'Button',
            variant = 'primary', // primary, secondary, outline, ghost, danger
            size = 'md', // sm, md, lg, xl
            icon = null,
            iconPosition = 'left', // left, right
            onClick = null,
            className = '',
            disabled = false,
            fullWidth = false,
            ariaLabel = null
        } = options;

        const button = document.createElement('button');
        button.className = this.getButtonClasses(variant, size, fullWidth, className);
        button.disabled = disabled;
        
        if (ariaLabel) button.setAttribute('aria-label', ariaLabel);
        if (onClick) button.addEventListener('click', onClick);

        // Create button content
        const content = document.createElement('span');
        content.className = 'btn-content';

        if (icon && iconPosition === 'left') {
            content.appendChild(this.createIcon(icon));
        }

        const textSpan = document.createElement('span');
        textSpan.className = 'btn-text';
        textSpan.textContent = text;
        content.appendChild(textSpan);

        if (icon && iconPosition === 'right') {
            content.appendChild(this.createIcon(icon));
        }

        button.appendChild(content);
        return button;
    }

    static getButtonClasses(variant, size, fullWidth, customClasses) {
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
    }

    static createIcon(iconName) {
        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', iconName);
        icon.className = 'btn-icon';
        return icon;
    }

    // Card Component System
    static createCard(options = {}) {
        const {
            title = null,
            subtitle = null,
            content = null,
            image = null,
            actions = [],
            variant = 'default', // default, elevated, bordered, minimal
            padding = 'md', // sm, md, lg, xl
            hover = true,
            className = '',
            onClick = null
        } = options;

        const card = document.createElement('div');
        card.className = this.getCardClasses(variant, padding, hover, className);
        
        if (onClick) {
            card.addEventListener('click', onClick);
            card.style.cursor = 'pointer';
        }

        // Card header (if title or subtitle)
        if (title || subtitle) {
            const header = document.createElement('div');
            header.className = 'card-header';
            
            if (title) {
                const titleEl = document.createElement('h3');
                titleEl.className = 'card-title';
                titleEl.textContent = title;
                header.appendChild(titleEl);
            }
            
            if (subtitle) {
                const subtitleEl = document.createElement('p');
                subtitleEl.className = 'card-subtitle';
                subtitleEl.textContent = subtitle;
                header.appendChild(subtitleEl);
            }
            
            card.appendChild(header);
        }

        // Card image (if provided)
        if (image) {
            const imageContainer = document.createElement('div');
            imageContainer.className = 'card-image';
            
            if (typeof image === 'string') {
                const img = document.createElement('img');
                img.src = image;
                img.alt = title || 'Card image';
                imageContainer.appendChild(img);
            } else {
                imageContainer.appendChild(image);
            }
            
            card.appendChild(imageContainer);
        }

        // Card content
        if (content) {
            const contentEl = document.createElement('div');
            contentEl.className = 'card-content';
            
            if (typeof content === 'string') {
                contentEl.innerHTML = content;
            } else {
                contentEl.appendChild(content);
            }
            
            card.appendChild(contentEl);
        }

        // Card actions (if provided)
        if (actions && actions.length > 0) {
            const actionsEl = document.createElement('div');
            actionsEl.className = 'card-actions';
            
            actions.forEach(action => {
                if (typeof action === 'string') {
                    actionsEl.innerHTML += action;
                } else {
                    actionsEl.appendChild(action);
                }
            });
            
            card.appendChild(actionsEl);
        }

        return card;
    }

    static getCardClasses(variant, padding, hover, customClasses) {
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
    }

    // Section Component System
    static createSection(options = {}) {
        const {
            id = null,
            title = null,
            subtitle = null,
            content = null,
            variant = 'default', // default, hero, featured, minimal
            padding = 'lg', // sm, md, lg, xl, none
            background = 'default', // default, primary, secondary, gradient, muted
            className = '',
            centered = false
        } = options;

        const section = document.createElement('section');
        section.className = this.getSectionClasses(variant, padding, background, centered, className);
        
        if (id) section.id = id;

        // Section header (if title or subtitle)
        if (title || subtitle) {
            const header = document.createElement('div');
            header.className = 'section-header';
            
            if (title) {
                const titleEl = document.createElement('h2');
                titleEl.className = 'section-title';
                titleEl.textContent = title;
                header.appendChild(titleEl);
            }
            
            if (subtitle) {
                const subtitleEl = document.createElement('p');
                subtitleEl.className = 'section-subtitle';
                subtitleEl.textContent = subtitle;
                header.appendChild(subtitleEl);
            }
            
            section.appendChild(header);
        }

        // Section content
        if (content) {
            const contentEl = document.createElement('div');
            contentEl.className = 'section-content';
            
            if (typeof content === 'string') {
                contentEl.innerHTML = content;
            } else {
                contentEl.appendChild(content);
            }
            
            section.appendChild(contentEl);
        }

        return section;
    }

    static getSectionClasses(variant, padding, background, centered, customClasses) {
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
    }

    // Navigation Component System
    static createNavItem(options = {}) {
        const {
            text = 'Nav Item',
            icon = null,
            badge = null,
            href = '#',
            active = false,
            onClick = null,
            className = ''
        } = options;

        const navItem = document.createElement('a');
        navItem.href = href;
        navItem.className = this.getNavItemClasses(active, className);
        
        if (onClick) navItem.addEventListener('click', onClick);

        // Icon wrapper
        if (icon) {
            const iconWrapper = document.createElement('div');
            iconWrapper.className = 'nav-icon-wrapper';
            iconWrapper.appendChild(this.createIcon(icon));
            navItem.appendChild(iconWrapper);
        }

        // Text
        const textSpan = document.createElement('span');
        textSpan.className = 'nav-text';
        textSpan.textContent = text;
        navItem.appendChild(textSpan);

        // Badge
        if (badge) {
            const badgeEl = document.createElement('span');
            badgeEl.className = `nav-badge nav-badge-${badge.type}`;
            badgeEl.textContent = badge.text;
            navItem.appendChild(badgeEl);
        }

        return navItem;
    }

    static getNavItemClasses(active, customClasses) {
        const classes = ['nav-link'];
        
        if (active) classes.push('active');
        
        if (customClasses) classes.push(...customClasses.split(' ').filter(c => c));
        
        return classes.join(' ');
    }

    // Utility method to create icon elements
    static createIcon(iconName, options = {}) {
        const {
            size = 'md',
            className = ''
        } = options;

        const icon = document.createElement('i');
        icon.setAttribute('data-lucide', iconName);
        icon.className = `icon icon-${size} ${className}`.trim();
        return icon;
    }

    // Utility method to create a container with proper spacing
    static createContainer(options = {}) {
        const {
            maxWidth = 'container',
            padding = 'md',
            className = ''
        } = options;

        const container = document.createElement('div');
        container.className = `${maxWidth} container-padding-${padding} ${className}`.trim();
        return container;
    }

    // Method to initialize all Lucide icons in a container
    static initializeIcons(container = document) {
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    }
}

// Export for use in modules
window.ComponentSystem = ComponentSystem;
