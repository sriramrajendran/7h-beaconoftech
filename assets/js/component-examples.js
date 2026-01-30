// Component System Examples and Utilities
// This file demonstrates how to use the new component system

class ComponentExamples {
    constructor() {
        this.init();
    }

    init() {
        console.log('ComponentExamples initialized');
        this.createExampleComponents();
    }

    // Example: Create a button with all options
    createExampleButton() {
        return ComponentSystem.createButton({
            text: 'Example Button',
            variant: 'primary',
            size: 'lg',
            icon: 'star',
            iconPosition: 'left',
            onClick: () => console.log('Button clicked!'),
            className: 'custom-class',
            ariaLabel: 'Example button for demonstration'
        });
    }

    // Example: Create a card with all options
    createExampleCard() {
        return ComponentSystem.createCard({
            title: 'Example Card',
            subtitle: 'This is a subtitle',
            content: '<p>This is the card content with <strong>HTML formatting</strong>.</p>',
            variant: 'elevated',
            padding: 'lg',
            hover: true,
            actions: [
                ComponentSystem.createButton({
                    text: 'Primary Action',
                    variant: 'primary',
                    size: 'sm'
                }),
                ComponentSystem.createButton({
                    text: 'Secondary Action',
                    variant: 'outline',
                    size: 'sm'
                })
            ]
        });
    }

    // Example: Create a section with all options
    createExampleSection() {
        const card = this.createExampleCard();
        
        return ComponentSystem.createSection({
            id: 'example-section',
            title: 'Example Section',
            subtitle: 'This is an example section using the component system',
            content: card,
            variant: 'featured',
            padding: 'lg',
            background: 'muted',
            centered: true
        });
    }

    // Example: Create navigation items
    createExampleNavigation() {
        const navContainer = document.createElement('nav');
        navContainer.className = 'example-nav';

        const items = [
            {
                text: 'Dashboard',
                icon: 'home',
                active: true,
                onClick: () => console.log('Dashboard clicked')
            },
            {
                text: 'Analytics',
                icon: 'trending-up',
                badge: { type: 'new', text: 'NEW' },
                onClick: () => console.log('Analytics clicked')
            },
            {
                text: 'Settings',
                icon: 'settings',
                onClick: () => console.log('Settings clicked')
            }
        ];

        items.forEach(item => {
            navContainer.appendChild(
                ComponentSystem.createNavItem(item)
            );
        });

        return navContainer;
    }

    // Create example components and add them to a demo container
    createExampleComponents() {
        // Only create examples if we're on a demo page or in development
        if (document.getElementById('component-demo')) {
            const demoContainer = document.getElementById('component-demo');
            
            // Add examples
            demoContainer.appendChild(this.createExampleButton());
            demoContainer.appendChild(document.createElement('br'));
            demoContainer.appendChild(this.createExampleCard());
            demoContainer.appendChild(this.createExampleSection());
            demoContainer.appendChild(this.createExampleNavigation());
            
            // Initialize icons
            ComponentSystem.initializeIcons(demoContainer);
        }
    }

    // Utility method to replace existing buttons with component buttons
    static upgradeExistingButtons() {
        const oldButtons = document.querySelectorAll('.btn:not(.btn-upgraded)');
        
        oldButtons.forEach(oldButton => {
            // Extract properties from existing button
            const text = oldButton.textContent.trim();
            const icon = oldButton.querySelector('i[data-lucide]');
            const iconName = icon ? icon.getAttribute('data-lucide') : null;
            
            // Determine variant from existing classes
            let variant = 'primary';
            if (oldButton.classList.contains('btn-secondary')) variant = 'secondary';
            if (oldButton.classList.contains('btn-outline')) variant = 'outline';
            if (oldButton.classList.contains('btn-danger')) variant = 'danger';
            if (oldButton.classList.contains('btn-ghost')) variant = 'ghost';
            
            // Determine size from existing classes
            let size = 'md';
            if (oldButton.classList.contains('btn-sm')) size = 'sm';
            if (oldButton.classList.contains('btn-lg')) size = 'lg';
            if (oldButton.classList.contains('btn-xl')) size = 'xl';
            
            // Preserve click handler
            const onClick = oldButton.onclick;
            
            // Create new component button
            const newButton = ComponentSystem.createButton({
                text: text,
                variant: variant,
                size: size,
                icon: iconName,
                onClick: onClick,
                className: oldButton.className.replace('btn', '').trim()
            });
            
            // Replace old button
            oldButton.parentNode.replaceChild(newButton, oldButton);
        });
        
        // Reinitialize icons
        ComponentSystem.initializeIcons();
    }

    // Utility method to upgrade existing cards
    static upgradeExistingCards() {
        const oldCards = document.querySelectorAll('.category-card, .pattern-stock-card');
        
        oldCards.forEach(oldCard => {
            const title = oldCard.querySelector('h3, h4');
            const content = oldCard.querySelector('p');
            const onClick = oldCard.onclick;
            
            const newCard = ComponentSystem.createCard({
                title: title ? title.textContent : null,
                content: content ? content.outerHTML : null,
                variant: 'default',
                padding: 'lg',
                hover: true,
                onClick: onClick
            });
            
            // Copy any additional classes
            newCard.className = `card card-default card-padding-lg card-hover ${oldCard.className}`;
            
            // Replace old card
            oldCard.parentNode.replaceChild(newCard, oldCard);
        });
    }
}

// Auto-upgrade existing components when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Uncomment to auto-upgrade existing components
    // ComponentExamples.upgradeExistingButtons();
    // ComponentExamples.upgradeExistingCards();
    
    // Initialize examples if in development mode
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
        new ComponentExamples();
    }
});

// Export for use in other modules
window.ComponentExamples = ComponentExamples;
