# Color System

The Jackanory design system provides a comprehensive color palette designed for accessibility, consistency, and brand alignment.

## Brand Colors

<!-- COLORPALETTE:BRAND
{
  "Primary": "hsl(327, 100%, 38%)",
  "Secondary": "hsl(273, 100%, 35%)",
  "Tertiary": "hsl(198, 100%, 95%)",
  "Dark": "hsl(0, 0%, 7%)",
  "Light": "hsl(0, 0%, 100%)"
}
-->

### Primary Brand Colors

- **Primary**: `hsl(327, 100%, 38%)` - Magenta - Main brand color
- **Secondary**: `hsl(273, 100%, 35%)` - Purple - Secondary brand color
- **Tertiary**: `hsl(198, 100%, 95%)` - Light blue - Accent color

### Base Colors

- **Dark**: `hsl(0, 0%, 7%)` - True dark
- **Light**: `hsl(0, 0%, 100%)` - Pure white

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

<!-- COLORPALETTE:BACKGROUNDS
{
  "Main Background": "hsl(0, 0%, 100%)",
  "Panel Background": "hsl(0, 0%, 100%)",
  "Alternative Panel": "hsl(0, 0%, 98%)",
  "Dark Background": "hsl(0, 0%, 9%)"
}
-->

### Light Theme

- **Main Background**: `hsl(0, 0%, 100%)` - Main background (white)
- **Panel Background**: `hsl(0, 0%, 100%)` - Panel background
- **Alternative Panel**: `hsl(0, 0%, 98%)` - Alternative panel background

### Dark Theme

- **Dark Background**: `hsl(0, 0%, 9%)` - Dark mode background

### Background Usage Example

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

<!-- COLORPALETTE:GREYS
{
  "Grey 100": "hsl(0, 0%, 98%)",
  "Grey 200": "hsl(0, 0%, 94%)",
  "Grey 300": "hsl(0, 0%, 90%)",
  "Grey 400": "hsl(0, 0%, 77%)",
  "Grey 500": "hsl(0, 0%, 60%)",
  "Grey 600": "hsl(0, 0%, 40%)",
  "Grey 700": "hsl(0, 0%, 20%)",
  "Grey 800": "hsl(0, 0%, 13%)",
  "Grey 900": "hsl(0, 0%, 7%)"
}
-->

A comprehensive 9-step grey scale for consistent neutral colors:

- **Grey 100**: `hsl(0, 0%, 98%)` - Lightest grey - subtle backgrounds
- **Grey 200**: `hsl(0, 0%, 94%)` - Light grey - borders, dividers
- **Grey 300**: `hsl(0, 0%, 90%)` - Light grey - disabled states
- **Grey 400**: `hsl(0, 0%, 77%)` - Medium-light grey - placeholders
- **Grey 500**: `hsl(0, 0%, 60%)` - Medium grey - secondary text
- **Grey 600**: `hsl(0, 0%, 40%)` - Medium-dark grey - body text
- **Grey 700**: `hsl(0, 0%, 20%)` - Dark grey - headings
- **Grey 800**: `hsl(0, 0%, 13%)` - Darker grey - high contrast
- **Grey 900**: `hsl(0, 0%, 7%)` - Darkest grey - maximum contrast

### Usage Guidelines

- **100-300**: Backgrounds, subtle borders, disabled states
- **400-500**: Placeholders, secondary text, form borders
- **600-700**: Primary text, headings, important content
- **800-900**: High contrast text, dark mode backgrounds

### Grey Scale Usage Example

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

<!-- COLORPALETTE:TYPOGRAPHY
{
  "Body Text": "hsl(180, 4%, 2%)",
  "Body Text Inverse": "hsl(0, 0%, 90%)"
}
-->

- **Body Text**: `hsl(180, 4%, 2%)` - Primary text color
- **Body Text Inverse**: `hsl(0, 0%, 90%)` - Text on dark backgrounds

### Typography Usage Example

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

<!-- COLORPALETTE:STATUS
{
  "Success": "hsl(150, 100%, 26%)",
  "Warning": "hsl(33, 88%, 36%)",
  "Danger": "hsl(8, 73%, 49%)",
  "Info": "hsl(214, 60%, 48%)"
}
-->

Semantic colors for communicating state and feedback:

- **Success**: `hsl(150, 100%, 26%)` - Green - success states
- **Warning**: `hsl(33, 88%, 36%)` - Orange - warning states
- **Danger**: `hsl(8, 73%, 49%)` - Red - error/danger states
- **Info**: `hsl(214, 60%, 48%)` - Blue - informational states

### Status Colors Usage Example

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

<!-- COLORPALETTE:RAG
{
  "RAG Green": "hsl(107, 54%, 44%)",
  "RAG Amber": "hsl(42, 96%, 54%)",
  "RAG Red": "hsl(359, 89%, 48%)",
  "RAG Grey": "hsl(200, 1%, 55%)",
  "RAG Blue": "hsl(214, 60%, 48%)"
}
-->

Special colors for Red, Amber, Green status indicators commonly used in data visualization:

- **RAG Green**: `hsl(107, 54%, 44%)` - RAG Green
- **RAG Amber**: `hsl(42, 96%, 54%)` - RAG Amber
- **RAG Red**: `hsl(359, 89%, 48%)` - RAG Red
- **RAG Grey**: `hsl(200, 1%, 55%)` - RAG Grey (neutral/unknown)
- **RAG Blue**: `hsl(214, 60%, 48%)` - RAG Blue (informational)

### RAG Colors Usage Example

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

<!-- COLORPALETTE:BUTTONS
{
  "Primary Button": "hsl(327, 100%, 38%)",
  "Primary Button Hover": "hsl(327, 100%, 32%)",
  "Secondary Button": "hsl(273, 100%, 35%)",
  "Secondary Button Hover": "hsl(273, 100%, 37%)"
}
-->

<!-- COLORPALETTE:LINKS
{
  "Link": "hsl(220, 73%, 34%)",
  "Link Hover": "hsl(220, 73%, 14%)",
  "Link Disabled": "hsl(0, 5%, 46%)"
}
-->

### Buttons

- **Primary Button**: `hsl(327, 100%, 38%)` - Primary button background
- **Primary Button Hover**: `hsl(327, 100%, 32%)` - Primary button hover state
- **Secondary Button**: `hsl(273, 100%, 35%)` - Secondary button background
- **Secondary Button Hover**: `hsl(273, 100%, 37%)` - Secondary button hover state

### Links

- **Link**: `hsl(220, 73%, 34%)` - Link color
- **Link Hover**: `hsl(220, 73%, 14%)` - Link hover state
- **Link Disabled**: `hsl(0, 5%, 46%)` - Disabled link

### Form Inputs

```scss
$input-bg: $bg; // Input background
$input-focus-bg: color.adjust($primary, $lightness: 59%); // Focus background
$input-border: $grey-500; // Input border
$input-border-focus: $primary; // Focus border
$label-text: $body-text; // Label text
$input-text: $body-text; // Input text
$disabled-input-text: hsl(0, 5%, 30%); // Disabled input text
```

### Actions

```scss
$action: $link; // Default action color
$action-destroy: $danger; // Destructive action
$action-create: $success; // Create action
$action-disabled: hsl(0, 0%, 60%); // Disabled action

// Hover states
$action-hover: color.adjust($action, $lightness: 15%);
$action-destroy-hover: color.adjust($action-destroy, $lightness: 10%);
$action-create-hover: color.adjust($action-create, $lightness: 10%);

// Focus backgrounds
$action-focus-bg: color.adjust($primary, $lightness: 20%);
$action-destroy-focus-bg: color.adjust($action-destroy, $lightness: 20%);
$action-create-focus-bg: color.adjust($action-create, $lightness: 20%);

$action-text: hsl(0, 0%, 100%); // Action text color
```

## Borders and Shadows

```scss
$shadow: hsl(0, 0%, 0%); // Shadow color
$border: hsl(30, 3%, 87%); // Default border
$border-dark: hsl(0, 0%, 44%); // Dark border
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
  ragRed: 'hsl(359, 89%, 48%)'
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
