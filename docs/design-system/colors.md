# Color System

The Jackanory design system provides a comprehensive color palette designed for accessibility, consistency, and brand alignment.

## Brand Colors

### Primary Brand Colors

```scss
$primary: hsl(327, 100%, 38%);    // Magenta - Main brand color
$secondary: hsl(273, 100%, 35%);  // Purple - Secondary brand color
$tertiary: hsl(198, 100%, 95%);   // Light blue - Accent color
```

### Base Colors

```scss
$dark: hsl(0, 0%, 7%);    // True dark
$light: hsl(0, 0%, 100%); // Pure white
```

### Usage Example

```scss
.brand-button {
  background: col.$primary;
  color: col.$light;
  
  &:hover {
    background: col.$secondary;
  }
}
```

## Background Colors

### Light Theme

```scss
$bg: hsl(0, 0%, 100%);           // Main background (white)
$main-panel-bg: $bg;             // Panel background
$alt-panel-bg: hsl(0, 0%, 98%);  // Alternative panel background
```

### Dark Theme

```scss
$bg-dark: hsl(0, 0%, 9%);        // Dark mode background
```

### Usage Example

```scss
.panel {
  background: col.$main-panel-bg;
  
  &.alternative {
    background: col.$alt-panel-bg;
  }
  
  @media (prefers-color-scheme: dark) {
    background: col.$bg-dark;
  }
}
```

## Grey Scale System

A comprehensive 9-step grey scale for consistent neutral colors:

```scss
$grey-100: hsl(0, 0%, 98%);  // Lightest grey - subtle backgrounds
$grey-200: hsl(0, 0%, 94%);  // Light grey - borders, dividers
$grey-300: hsl(0, 0%, 90%);  // Light grey - disabled states
$grey-400: hsl(0, 0%, 77%);  // Medium-light grey - placeholders
$grey-500: hsl(0, 0%, 60%);  // Medium grey - secondary text
$grey-600: hsl(0, 0%, 40%);  // Medium-dark grey - body text
$grey-700: hsl(0, 0%, 20%);  // Dark grey - headings
$grey-800: hsl(0, 0%, 13%);  // Darker grey - high contrast
$grey-900: hsl(0, 0%, 7%);   // Darkest grey - maximum contrast
```

### Usage Guidelines

- **100-300**: Backgrounds, subtle borders, disabled states
- **400-500**: Placeholders, secondary text, form borders
- **600-700**: Primary text, headings, important content
- **800-900**: High contrast text, dark mode backgrounds

### Usage Example

```scss
.text-hierarchy {
  .primary-text {
    color: col.$grey-900;
  }
  
  .secondary-text {
    color: col.$grey-600;
  }
  
  .muted-text {
    color: col.$grey-500;
  }
  
  .border {
    border: 1px solid col.$grey-200;
  }
}
```

## Typography Colors

```scss
$body-text: hsl(180, 4%, 2%);        // Primary text color
$body-text-inverse: hsl(0, 0%, 90%); // Text on dark backgrounds
```

### Usage Example

```scss
.article {
  color: col.$body-text;
  
  .dark-section {
    background: col.$dark;
    color: col.$body-text-inverse;
  }
}
```

## Status Colors

Semantic colors for communicating state and feedback:

```scss
$success: hsl(150, 100%, 26%);   // Green - success states
$warning: hsl(33, 88%, 36%);     // Orange - warning states
$danger: hsl(8, 73%, 49%);       // Red - error/danger states
$info: hsl(214, 60%, 48%);       // Blue - informational states
$error: $danger;                 // Alias for danger
```

### Usage Example

```scss
.alert {
  padding: padding(2);
  border-radius: 4px;
  
  &.success {
    background: color.adjust(col.$success, $lightness: 45%);
    border: 1px solid col.$success;
    color: col.$success;
  }
  
  &.warning {
    background: color.adjust(col.$warning, $lightness: 35%);
    border: 1px solid col.$warning;
    color: col.$warning;
  }
  
  &.danger {
    background: color.adjust(col.$danger, $lightness: 40%);
    border: 1px solid col.$danger;
    color: col.$danger;
  }
  
  &.info {
    background: color.adjust(col.$info, $lightness: 40%);
    border: 1px solid col.$info;
    color: col.$info;
  }
}
```

## RAG Colors

Special colors for Red, Amber, Green status indicators commonly used in data visualization:

```scss
$rag-green: hsl(107, 54%, 44%);  // RAG Green
$rag-amber: hsl(42, 96%, 54%);   // RAG Amber
$rag-red: hsl(359, 89%, 48%);    // RAG Red
$rag-grey: hsl(200, 1%, 55%);    // RAG Grey (neutral/unknown)
$rag-blue: hsl(214, 60%, 48%);   // RAG Blue (informational)
```

### Usage Example

```scss
.status-indicator {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  
  &.green {
    background: col.$rag-green;
  }
  
  &.amber {
    background: col.$rag-amber;
  }
  
  &.red {
    background: col.$rag-red;
  }
  
  &.grey {
    background: col.$rag-grey;
  }
  
  &.blue {
    background: col.$rag-blue;
  }
}
```

## Interactive Element Colors

### Buttons

```scss
// Primary button
$primary-button: $primary;
$primary-button-hover: color.adjust($primary-button, $lightness: -6%);
$primary-button-text: hsl(0, 0%, 100%);

// Secondary button
$secondary-button: $secondary;
$secondary-button-hover: color.adjust($secondary-button, $lightness: 2%);
$secondary-button-text: $light;
```

### Links

```scss
$link: hsl(220, 73%, 34%);           // Link color
$link-hover: color.adjust($link, $lightness: -20%); // Link hover
$link-disabled: hsl(0, 5%, 46%);     // Disabled link
```

### Form Inputs

```scss
$input-bg: $bg;                                    // Input background
$input-focus-bg: color.adjust($primary, $lightness: 59%); // Focus background
$input-border: $grey-500;                          // Input border
$input-border-focus: $primary;                     // Focus border
$label-text: $body-text;                          // Label text
$input-text: $body-text;                          // Input text
$disabled-input-text: hsl(0, 5%, 30%);           // Disabled input text
```

### Actions

```scss
$action: $link;                    // Default action color
$action-destroy: $danger;          // Destructive action
$action-create: $success;          // Create action
$action-disabled: hsl(0, 0%, 60%); // Disabled action

// Hover states
$action-hover: color.adjust($action, $lightness: 15%);
$action-destroy-hover: color.adjust($action-destroy, $lightness: 10%);
$action-create-hover: color.adjust($action-create, $lightness: 10%);

// Focus backgrounds
$action-focus-bg: color.adjust($primary, $lightness: 20%);
$action-destroy-focus-bg: color.adjust($action-destroy, $lightness: 20%);
$action-create-focus-bg: color.adjust($action-create, $lightness: 20%);

$action-text: hsl(0, 0%, 100%);   // Action text color
```

## Borders and Shadows

```scss
$shadow: hsl(0, 0%, 0%);          // Shadow color
$border: hsl(30, 3%, 87%);        // Default border
$border-dark: hsl(0, 0%, 44%);    // Dark border
```

## Accessibility

```scss
$keyboard-focus: hsl(47, 100%, 51%); // High-contrast focus indicator
```

### Focus States

```scss
.focusable-element {
  &:focus-visible {
    outline: 2px solid col.$keyboard-focus;
    outline-offset: 2px;
  }
}
```

## Gradients

```scss
$gradient-primary: linear-gradient(90deg, $primary, $secondary);
```

### Usage Example

```scss
.gradient-background {
  background: col.$gradient-primary;
  color: col.$light;
}

.gradient-text {
  background: col.$gradient-primary;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
```

## Color Manipulation

Use SCSS color functions for consistent color variations:

```scss
@use 'sass:color';

.button {
  background: col.$primary;
  
  &:hover {
    background: color.adjust(col.$primary, $lightness: -10%);
  }
  
  &:active {
    background: color.adjust(col.$primary, $lightness: -15%);
  }
  
  &.light {
    background: color.adjust(col.$primary, $lightness: 40%);
    color: col.$primary;
  }
}
```

## TypeScript Integration

Colors are exported to TypeScript for use in JavaScript components:

```typescript
// src/theme/exports/colors.ts
export const colors = {
  primary: 'hsl(327, 100%, 38%)',
  secondary: 'hsl(273, 100%, 35%)',
  ragGreen: 'hsl(107, 54%, 44%)',
  ragAmber: 'hsl(42, 96%, 54%)',
  ragRed: 'hsl(359, 89%, 48%)',
  // ... other colors
} as const;
```

**Note**: When updating colors in `colours.scss`, remember to update the corresponding TypeScript exports in `exports/colors.ts`.

## Best Practices

### 1. Use Semantic Names
```scss
// ✅ Good - semantic meaning
.error-message {
  color: col.$danger;
}

// ❌ Bad - color-based naming
.red-text {
  color: col.$danger;
}
```

### 2. Maintain Contrast Ratios
Ensure sufficient contrast for accessibility (WCAG AA: 4.5:1 for normal text, 3:1 for large text).

### 3. Use Color Functions
Leverage SCSS color functions for consistent variations rather than hardcoding similar colors.

### 4. Test in Dark Mode
Consider how colors will appear in dark mode and provide appropriate alternatives.
