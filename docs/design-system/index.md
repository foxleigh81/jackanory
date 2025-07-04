# Design System Documentation

Welcome to the Jackanory Design System documentation. This comprehensive guide covers all aspects of styling, theming, and component development within the Jackanory ecosystem.

## Overview

The Jackanory design system uses SCSS Modules for component styling, providing:

- **Scoped styles** that prevent CSS conflicts
- **Comprehensive theme system** with design tokens
- **Utility classes** for common patterns
- **Responsive design** utilities
- **Automatic theme imports** in all SCSS files

## Documentation Structure

### 🎨 [Colors](./colors.md)

Complete color system documentation including:

- Brand colors (primary, secondary, tertiary)
- Background and surface colors
- Grey scale system
- Status and semantic colors
- RAG (Red, Amber, Green) colors for data visualization
- Usage examples and best practices

### 📝 [Typography](./typography.md)

Typography system covering:

- Typography mixins and variables
- Responsive text scaling
- Heading hierarchy
- Form and input typography
- Usage patterns and examples

### 📱 [Responsive Design](./responsive.md)

Responsive design guidelines including:

- Breakpoint system
- Media query utilities
- Mobile-first approach
- Responsive typography patterns

### 📏 [Spacing](./spacing.md)

Spacing and layout system:

- Spacing functions and variables
- Margin and padding utilities
- Layout patterns
- Grid and flexbox utilities

### 🛠️ [Utility Classes](./utility-classes.md)

Comprehensive utility class reference:

- Layout utilities
- Spacing utilities
- Typography utilities
- Size and display utilities

### 🏗️ [Component Patterns](./component-patterns.md)

Component styling patterns and best practices:

- SCSS Module structure
- Component architecture
- State management in styles
- Naming conventions
- Accessibility considerations

## Quick Start

### Basic Component Styling

```scss
// component.module.scss
.component {
  background: col.$bg;
  color: col.$body-text;
  padding: padding(2);
  border-radius: 8px;

  @include util.mq(bp.$medium) {
    padding: padding(3);
  }
}

.componentTitle {
  @include type.heading-medium;
  color: col.$primary;
  margin-bottom: spacing(1);
}
```

### Automatic Theme Access

Every SCSS file outside of `src/theme/` automatically has access to:

```scss
@use '@/theme/vars' as *;
@use '@/theme/breakpoints' as bp;
@use '@/theme/typography' as type;
@use '@/theme/colours' as col;
@use '@/theme/utilities' as util;
@use '@/theme/animations' as animate;
```

This is configured in `next.config.ts` via the `additionalData` option.

## Theme System Architecture

The theme system is organized in `src/theme/` with the following structure:

```
src/theme/
├── index.scss              # Main theme entry point
├── colours.scss            # Color variables
├── typography.scss         # Typography mixins
├── _breakpoints.scss       # Responsive breakpoints
├── utility-classes.scss    # Utility class definitions
├── vars/                   # Design token variables
│   ├── _spacing.scss       # Spacing system
│   ├── _elevation.scss     # Shadow and elevation
│   ├── _borders.scss       # Border styles
│   └── _shadows.scss       # Shadow definitions
├── utilities/              # Utility mixins and functions
│   ├── responsive.scss     # Media query utilities
│   ├── buttons.scss        # Button utilities
│   └── ...                 # Other utility modules
└── animations/             # Animation definitions
    ├── index.scss          # Animation exports
    └── ...                 # Individual animations
```

## Best Practices

### 1. Use Theme Variables

Always use theme variables instead of hardcoded values:

```scss
// ✅ Good
.button {
  background: col.$primary;
  color: col.$light;
}

// ❌ Bad
.button {
  background: #c20065;
  color: white;
}
```

### 2. Leverage Typography Mixins

Use typography mixins for consistent text styling:

```scss
// ✅ Good
.heading {
  @include type.heading-medium;
}

// ❌ Bad
.heading {
  font-size: 2.4rem;
  font-weight: 800;
}
```

### 3. Follow Responsive Patterns

Use the responsive utilities for consistent breakpoint handling:

```scss
.component {
  padding: padding(2);

  @include util.mq(bp.$medium) {
    padding: padding(3);
  }
}
```

### 4. Maintain Accessibility

Ensure all components meet accessibility standards:

```scss
.interactive {
  &:focus-visible {
    outline: 2px solid col.$keyboard-focus;
    outline-offset: 2px;
  }
}
```

## TypeScript Integration

Colors and other design tokens are exported to TypeScript for use in JavaScript:

```typescript
// src/theme/exports/colors.ts
export const colors = {
  primary: 'hsl(327, 100%, 38%)',
  secondary: 'hsl(273, 100%, 35%)'
  // ... other colors
} as const;
```

When updating SCSS color variables, remember to update the corresponding TypeScript exports.

## Additional Resources

- [Next.js SCSS Documentation](https://nextjs.org/docs/app/building-your-application/styling/sass)
- [SCSS Documentation](https://sass-lang.com/documentation)
- [CSS Modules Documentation](https://github.com/css-modules/css-modules)
- [Architectural Decision Record: Styling Approach](../architectural-descisions/adr-004-styling-approach.md)
