# Responsive Design

The Jackanory design system follows a mobile-first approach to responsive design, ensuring optimal experiences across all device sizes.

## Breakpoint System

### Standard Breakpoints

```scss
$extra-small: 321px;      // Small phones
$small: 420px;            // Large phones
$medium-small: 550px;     // Small tablets
$medium: 900px;           // Tablets / small laptops
$medium-large: 1024px;    // Large tablets / laptops
$large: 1280px;           // Desktop
$extra-large: 1600px;     // Large desktop
$extra-extra-large: 1920px; // Extra large desktop
```

### Breakpoint Usage

Access breakpoints through the `bp` namespace:

```scss
@include util.mq(bp.$small) {
  // Styles for small screens and up
}

@include util.mq(bp.$medium) {
  // Styles for medium screens and up
}
```

## Media Query Mixin

### Basic Usage

```scss
@mixin mq($size) {
  @media only screen and (min-width: $size) {
    @content;
  }
}
```

### Examples

```scss
.responsive-component {
  // Mobile-first base styles
  padding: spacing(2);
  font-size: 1.4rem;
  
  // Small screens and up
  @include util.mq(bp.$small) {
    padding: spacing(3);
    font-size: 1.6rem;
  }
  
  // Medium screens and up
  @include util.mq(bp.$medium) {
    padding: spacing(4);
    font-size: 1.8rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
  
  // Large screens and up
  @include util.mq(bp.$large) {
    padding: spacing(5);
    grid-template-columns: 1fr 1fr 1fr;
  }
}
```

### Custom Breakpoints

You can also use custom pixel values:

```scss
.custom-breakpoint {
  @include util.mq(768px) {
    // Custom breakpoint styles
  }
}
```

## Mobile-First Approach

### Principles

1. **Start with mobile styles** as the base
2. **Progressive enhancement** for larger screens
3. **Content-first** design decisions
4. **Touch-friendly** interface elements

### Example Implementation

```scss
.navigation {
  // Mobile: vertical stack
  display: flex;
  flex-direction: column;
  gap: spacing(1);
  
  // Tablet: horizontal layout
  @include util.mq(bp.$medium) {
    flex-direction: row;
    gap: spacing(2);
  }
  
  // Desktop: enhanced spacing
  @include util.mq(bp.$large) {
    gap: spacing(3);
    padding: spacing(2);
  }
}
```

## Responsive Typography

### Automatic Scaling

Typography mixins include responsive scaling:

```scss
@mixin heading-large {
  font-weight: 800;
  letter-spacing: 0;
  // Mobile: smaller size
  font-size: calc($heading-large-size / 1.5);

  // Desktop: full size
  @include util.mq(bp.$medium) {
    font-size: $heading-large-size;
  }
}
```

### Custom Responsive Typography

```scss
.hero-title {
  // Mobile
  font-size: 2rem;
  line-height: 1.2;
  
  // Small tablets
  @include util.mq(bp.$medium-small) {
    font-size: 2.5rem;
  }
  
  // Tablets and up
  @include util.mq(bp.$medium) {
    font-size: 3rem;
    line-height: 1.1;
  }
  
  // Desktop
  @include util.mq(bp.$large) {
    font-size: 4rem;
  }
}
```

## Responsive Layout Patterns

### Grid Layouts

```scss
.responsive-grid {
  display: grid;
  gap: spacing(2);
  
  // Mobile: single column
  grid-template-columns: 1fr;
  
  // Small tablets: two columns
  @include util.mq(bp.$medium-small) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  // Tablets: three columns
  @include util.mq(bp.$medium) {
    grid-template-columns: repeat(3, 1fr);
    gap: spacing(3);
  }
  
  // Desktop: four columns
  @include util.mq(bp.$large) {
    grid-template-columns: repeat(4, 1fr);
    gap: spacing(4);
  }
}
```

### Flexbox Layouts

```scss
.responsive-flex {
  display: flex;
  gap: spacing(2);
  
  // Mobile: stack vertically
  flex-direction: column;
  
  // Tablets: horizontal layout
  @include util.mq(bp.$medium) {
    flex-direction: row;
    align-items: center;
  }
  
  // Desktop: enhanced spacing
  @include util.mq(bp.$large) {
    gap: spacing(4);
  }
}
```

### Container Queries (Future)

Prepare for container queries with component-based responsive design:

```scss
.card {
  // Base styles
  padding: spacing(2);
  
  // When container is wider than 400px
  @container (min-width: 400px) {
    padding: spacing(3);
    display: grid;
    grid-template-columns: auto 1fr;
  }
}
```

## Responsive Images

### Next.js Image Component

```tsx
import Image from 'next/image';

<Image
  src="/hero-image.jpg"
  alt="Hero image"
  width={800}
  height={400}
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  priority
/>
```

### CSS Responsive Images

```scss
.responsive-image {
  width: 100%;
  height: auto;
  
  // Maintain aspect ratio
  aspect-ratio: 16 / 9;
  object-fit: cover;
  
  @include util.mq(bp.$medium) {
    aspect-ratio: 4 / 3;
  }
}
```

## Responsive Spacing

### Adaptive Spacing

```scss
.adaptive-spacing {
  // Mobile: smaller spacing
  padding: spacing(2);
  margin-bottom: spacing(3);
  
  // Tablets: medium spacing
  @include util.mq(bp.$medium) {
    padding: spacing(3);
    margin-bottom: spacing(4);
  }
  
  // Desktop: larger spacing
  @include util.mq(bp.$large) {
    padding: spacing(4);
    margin-bottom: spacing(5);
  }
}
```

### Responsive Utility Classes

Create responsive variants of utility classes:

```scss
// Mobile-first padding utilities
.p-responsive {
  padding: spacing(2);
  
  @include util.mq(bp.$medium) {
    padding: spacing(3);
  }
  
  @include util.mq(bp.$large) {
    padding: spacing(4);
  }
}
```

## Touch and Interaction

### Touch-Friendly Sizing

```scss
.touch-target {
  // Minimum 44px touch target
  min-height: 44px;
  min-width: 44px;
  padding: spacing(1.5);
  
  // Larger targets on desktop
  @include util.mq(bp.$medium) {
    min-height: 40px;
    min-width: 40px;
    padding: spacing(1);
  }
}
```

### Hover States

```scss
.interactive-element {
  transition: background-color 0.2s ease;
  
  // Only apply hover on devices that support it
  @media (hover: hover) {
    &:hover {
      background-color: col.$grey-100;
    }
  }
  
  // Focus states for all devices
  &:focus-visible {
    outline: 2px solid col.$keyboard-focus;
  }
}
```

## Performance Considerations

### Efficient Media Queries

```scss
// ✅ Good - combine related styles
@include util.mq(bp.$medium) {
  .component {
    padding: spacing(3);
    font-size: 1.6rem;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

// ❌ Less efficient - separate media queries
.component {
  @include util.mq(bp.$medium) {
    padding: spacing(3);
  }
  
  @include util.mq(bp.$medium) {
    font-size: 1.6rem;
  }
}
```

### Critical CSS

Prioritize above-the-fold styles:

```scss
// Critical mobile styles
.hero {
  padding: spacing(2);
  text-align: center;
}

// Non-critical desktop enhancements
@include util.mq(bp.$large) {
  .hero {
    padding: spacing(5);
    text-align: left;
    background-image: url('/hero-bg.jpg');
  }
}
```

## Testing Responsive Design

### Browser DevTools

1. Use device simulation in browser DevTools
2. Test at common breakpoints: 320px, 768px, 1024px, 1440px
3. Test orientation changes on tablets

### Real Device Testing

```scss
// Debug helper for development
.debug-breakpoint {
  position: fixed;
  top: 0;
  right: 0;
  background: col.$danger;
  color: col.$light;
  padding: spacing(0.5);
  font-size: 0.8rem;
  z-index: 9999;
  
  &::before {
    content: 'XS';
    
    @include util.mq(bp.$small) {
      content: 'S';
    }
    
    @include util.mq(bp.$medium) {
      content: 'M';
    }
    
    @include util.mq(bp.$large) {
      content: 'L';
    }
    
    @include util.mq(bp.$extra-large) {
      content: 'XL';
    }
  }
}
```

## Best Practices

### 1. Mobile-First Development

```scss
// ✅ Good - mobile first
.component {
  padding: spacing(2); // Mobile base
  
  @include util.mq(bp.$medium) {
    padding: spacing(3); // Enhanced for larger screens
  }
}

// ❌ Bad - desktop first
.component {
  padding: spacing(3);
  
  @media (max-width: 899px) {
    padding: spacing(2);
  }
}
```

### 2. Content-Based Breakpoints

```scss
// ✅ Good - content determines breakpoint
.text-content {
  max-width: 65ch; // Optimal reading width
  
  @include util.mq(bp.$medium) {
    columns: 2;
    column-gap: spacing(3);
  }
}
```

### 3. Flexible Layouts

```scss
// ✅ Good - flexible grid
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: spacing(2);
}

// ❌ Less flexible - fixed columns
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
```

### 4. Progressive Enhancement

```scss
.enhanced-component {
  // Base functionality for all devices
  background: col.$bg;
  padding: spacing(2);
  
  // Enhanced features for capable devices
  @supports (backdrop-filter: blur(10px)) {
    backdrop-filter: blur(10px);
    background: rgba(255, 255, 255, 0.8);
  }
  
  @include util.mq(bp.$large) {
    // Desktop enhancements
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
}
```
