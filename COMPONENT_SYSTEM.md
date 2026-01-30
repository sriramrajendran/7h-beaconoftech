# BeaconOfTech Component System

This document describes the reusable component system implemented for the BeaconOfTech platform to ensure consistency across the site.

## Overview

The component system provides clean, reusable UI components for:
- **Buttons** - Consistent button styles and behaviors
- **Cards** - Flexible content containers
- **Sections** - Structured page sections
- **Navigation** - Standardized navigation items

## File Structure

```
assets/
├── css/
│   └── components.css          # Component system styles
├── js/
│   ├── components.js           # Core component system
│   └── component-examples.js   # Usage examples and utilities
```

## Button Components

### Usage

```javascript
// Basic button
const button = ComponentSystem.createButton({
    text: 'Click Me',
    variant: 'primary',
    size: 'md'
});

// Button with icon
const buttonWithIcon = ComponentSystem.createButton({
    text: 'Save',
    variant: 'primary',
    size: 'lg',
    icon: 'save',
    iconPosition: 'left',
    onClick: () => console.log('Saved!')
});
```

### Variants

- `primary` - Main action button with gradient background
- `secondary` - Secondary action with border
- `outline` - Transparent background with colored border
- `ghost` - Minimal button, visible on hover
- `danger` - Red button for destructive actions

### Sizes

- `sm` - Small (32px height)
- `md` - Medium (40px height) - default
- `lg` - Large (48px height)
- `xl` - Extra large (56px height)

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | string | 'Button' | Button text |
| `variant` | string | 'primary' | Button style variant |
| `size` | string | 'md' | Button size |
| `icon` | string | null | Lucide icon name |
| `iconPosition` | string | 'left' | Icon position ('left' or 'right') |
| `onClick` | function | null | Click handler |
| `className` | string | '' | Additional CSS classes |
| `disabled` | boolean | false | Disable button |
| `fullWidth` | boolean | false | Full width button |
| `ariaLabel` | string | null | Accessibility label |

## Card Components

### Usage

```javascript
// Basic card
const card = ComponentSystem.createCard({
    title: 'Card Title',
    content: '<p>Card content goes here</p>',
    variant: 'default',
    padding: 'lg'
});

// Card with actions
const cardWithActions = ComponentSystem.createCard({
    title: 'Article Title',
    subtitle: 'Published on Jan 1, 2026',
    content: '<p>Article excerpt...</p>',
    actions: [
        ComponentSystem.createButton({
            text: 'Read More',
            variant: 'primary',
            size: 'sm'
        })
    ]
});
```

### Variants

- `default` - Standard card with border and shadow
- `elevated` - Card with enhanced shadow
- `bordered` - Card with thick border
- `minimal` - Card without border or shadow

### Padding

- `sm` - Small padding (16px)
- `md` - Medium padding (24px) - default
- `lg` - Large padding (32px)
- `xl` - Extra large padding (40px)

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `title` | string | null | Card title |
| `subtitle` | string | null | Card subtitle |
| `content` | string/element | null | Card content |
| `image` | string/element | null | Card image |
| `actions` | array | [] | Action buttons |
| `variant` | string | 'default' | Card style variant |
| `padding` | string | 'md' | Card padding |
| `hover` | boolean | true | Hover effect |
| `className` | string | '' | Additional CSS classes |
| `onClick` | function | null | Click handler |

## Section Components

### Usage

```javascript
// Basic section
const section = ComponentSystem.createSection({
    title: 'Section Title',
    subtitle: 'Section description',
    content: '<p>Section content...</p>',
    variant: 'default',
    padding: 'lg'
});

// Featured section
const featuredSection = ComponentSystem.createSection({
    id: 'featured',
    title: 'Featured Content',
    background: 'gradient',
    centered: true,
    content: cardElement
});
```

### Variants

- `default` - Standard section
- `hero` - Hero section with gradient background
- `featured` - Featured section with border
- `minimal` - Minimal section without background

### Backgrounds

- `default` - Standard background
- `primary` - Primary gradient background
- `secondary` - Secondary solid background
- `gradient` - Accent gradient background
- `muted` - Muted background

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `id` | string | null | Section ID |
| `title` | string | null | Section title |
| `subtitle` | string | null | Section subtitle |
| `content` | string/element | null | Section content |
| `variant` | string | 'default' | Section style variant |
| `padding` | string | 'lg' | Section padding |
| `background` | string | 'default' | Background style |
| `className` | string | '' | Additional CSS classes |
| `centered` | boolean | false | Center content |

## Navigation Components

### Usage

```javascript
// Navigation item
const navItem = ComponentSystem.createNavItem({
    text: 'Dashboard',
    icon: 'home',
    active: true,
    onClick: () => console.log('Navigated to dashboard')
});

// Navigation item with badge
const navItemWithBadge = ComponentSystem.createNavItem({
    text: 'Analytics',
    icon: 'trending-up',
    badge: { type: 'new', text: 'NEW' },
    onClick: () => console.log('Navigated to analytics')
});
```

### Badge Types

- `pro` - Gradient badge for pro features
- `new` - Green badge for new features
- `beta` - Yellow badge for beta features

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `text` | string | 'Nav Item' | Navigation text |
| `icon` | string | null | Lucide icon name |
| `badge` | object | null | Badge object with type and text |
| `href` | string | '#' | Navigation link |
| `active` | boolean | false | Active state |
| `onClick` | function | null | Click handler |
| `className` | string | '' | Additional CSS classes |

## Utility Methods

### Create Icon

```javascript
const icon = ComponentSystem.createIcon('star', {
    size: 'lg',
    className: 'custom-icon'
});
```

### Create Container

```javascript
const container = ComponentSystem.createContainer({
    maxWidth: 'container',
    padding: 'md',
    className: 'custom-container'
});
```

### Initialize Icons

```javascript
// Initialize all Lucide icons in a container
ComponentSystem.initializeIcons(document.body);

// Initialize icons in specific container
ComponentSystem.initializeIcons(specificElement);
```

## CSS Classes

### Button Classes

- `.btn` - Base button class
- `.btn-{variant}` - Variant class (e.g., `.btn-primary`)
- `.btn-{size}` - Size class (e.g., `.btn-lg`)
- `.btn-full-width` - Full width button
- `.btn-content` - Button content wrapper
- `.btn-icon` - Button icon
- `.btn-text` - Button text

### Card Classes

- `.card` - Base card class
- `.card-{variant}` - Variant class (e.g., `.card-elevated`)
- `.card-padding-{size}` - Padding class (e.g., `.card-padding-lg`)
- `.card-hover` - Hover effect
- `.card-header` - Card header
- `.card-title` - Card title
- `.card-subtitle` - Card subtitle
- `.card-content` - Card content
- `.card-actions` - Card actions container

### Section Classes

- `.section` - Base section class
- `.section-{variant}` - Variant class (e.g., `.section-hero`)
- `.section-padding-{size}` - Padding class (e.g., `.section-padding-lg`)
- `.section-bg-{background}` - Background class (e.g., `.section-bg-gradient`)
- `.section-centered` - Centered content
- `.section-header` - Section header
- `.section-title` - Section title
- `.section-subtitle` - Section subtitle
- `.section-content` - Section content

### Navigation Classes

- `.nav-link` - Base navigation class
- `.nav-icon-wrapper` - Icon container
- `.nav-text` - Navigation text
- `.nav-badge` - Badge base class
- `.nav-badge-{type}` - Badge type class (e.g., `.nav-badge-new`)

## Integration with Existing Code

### Blog Module Integration

The blog module has been updated to use the component system:

```javascript
// Blog post cards now use ComponentSystem.createCard()
// Categories section uses ComponentSystem.createSection()
// Read more buttons use ComponentSystem.createButton()
```

### Fallback Support

All components include fallback support - if the component system is not available, they fall back to the original HTML strings.

## Responsive Design

The component system includes responsive breakpoints:

- **Desktop (>768px)** - Full component styles
- **Tablet (≤768px)** - Adjusted sizes and spacing
- **Mobile (≤480px)** - Further adjustments for small screens

## Browser Support

The component system supports:
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Lucide icons for consistent iconography
- CSS custom properties for theming
- CSS Grid and Flexbox for layouts

## Best Practices

1. **Consistency**: Use component system for all new UI elements
2. **Accessibility**: Include proper ARIA labels and semantic HTML
3. **Performance**: Components are lightweight and optimized
4. **Maintainability**: Centralized styling and behavior
5. **Extensibility**: Easy to add new variants and options

## Migration Guide

To migrate existing elements to the component system:

1. Identify repeated patterns in the HTML
2. Replace with component calls
3. Update CSS to use component classes
4. Test functionality and appearance

### Example Migration

**Before:**
```html
<button class="btn btn-primary btn-lg">
    <i data-lucide="star" class="icon"></i>
    Click Me
</button>
```

**After:**
```javascript
const button = ComponentSystem.createButton({
    text: 'Click Me',
    variant: 'primary',
    size: 'lg',
    icon: 'star'
});
```

## Future Enhancements

Planned improvements to the component system:
- Form components (inputs, selects, textareas)
- Modal components
- Table components
- Loading states and spinners
- Toast notifications
- Tooltip components
