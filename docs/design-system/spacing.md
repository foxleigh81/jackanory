# Spacing System

The Jackanory spacing system provides consistent spacing throughout the design system using a mathematical scale based on a root spacing unit.

## Base Spacing Unit

```scss
$root-spacing: 1rem; // 16px at default browser settings
```

All spacing in the system is derived from this base unit, ensuring mathematical consistency and visual harmony.

## Spacing Variables

### Core Spacing Variables

```scss
$padding: $root-spacing; // 1rem
$margin: $root-spacing; // 1rem
$paragraph-spacing: $margin * 1.5; // 1.5rem
$segment-padding: $padding * 4; // 4rem
$gutters: $root-spacing * 1.5; // 1.5rem
$component-spacing: $gutters; // 1.5rem
```

### Usage Example

```scss
.content-section {
  padding: $segment-padding; // 4rem
  margin-bottom: $component-spacing; // 1.5rem

  p {
    margin-bottom: $paragraph-spacing; // 1.5rem
  }
}
```

## Spacing Functions

The spacing system provides functions for mathematical spacing calculations:

### Core Functions

```scss
// Spacing function - multiplies root spacing
@function spacing($multiplier: 1) {
  @return $root-spacing * $multiplier;
}

// Margin function - multiplies margin base
@function margin($multiplier: 1) {
  @return $margin * $multiplier;
}

// Padding function - multiplies padding base
@function padding($multiplier: 1) {
  @return $padding * $multiplier;
}
```

### Function Usage Examples

```scss
.card {
  padding: padding(2); // 2rem
  margin-bottom: margin(3); // 3rem

  .card-header {
    padding: padding(1.5); // 1.5rem
    margin-bottom: spacing(1); // 1rem
  }

  .card-content {
    padding: padding(2); // 2rem
  }

  .card-footer {
    padding: padding(1); // 1rem
    margin-top: spacing(2); // 2rem
  }
}
```

## Spacing Scale

### Recommended Scale

```scss
// Extra small spacing
spacing(0.25)  // 0.25rem (4px)
spacing(0.5)   // 0.5rem (8px)

// Small spacing
spacing(1)     // 1rem (16px)
spacing(1.5)   // 1.5rem (24px)

// Medium spacing
spacing(2)     // 2rem (32px)
spacing(3)     // 3rem (48px)

// Large spacing
spacing(4)     // 4rem (64px)
spacing(5)     // 5rem (80px)

// Extra large spacing
spacing(6)     // 6rem (96px)
spacing(8)     // 8rem (128px)
```

### Scale Usage Guidelines

- **0.25-0.5**: Fine adjustments, borders, small gaps
- **1-1.5**: Standard component spacing, small margins
- **2-3**: Section spacing, card padding, medium gaps
- **4-5**: Large section spacing, page margins
- **6-8**: Hero sections, major layout spacing

## Utility Classes

### Margin Utilities

```scss
// All sides
.m-0 {
  margin: 0;
}
.m-1 {
  margin: 0.25rem;
}
.m-2 {
  margin: 0.5rem;
}
.m-3 {
  margin: 1rem;
}
.m-4 {
  margin: 1.5rem;
}
.m-5 {
  margin: 3rem;
}

// Top margin
.mt-0 {
  margin-top: 0;
}
.mt-1 {
  margin-top: 0.25rem;
}
.mt-2 {
  margin-top: 0.5rem;
}
.mt-3 {
  margin-top: 1rem;
}
.mt-4 {
  margin-top: 1.5rem;
}
.mt-5 {
  margin-top: 3rem;
}

// Bottom margin
.mb-0 {
  margin-bottom: 0;
}
.mb-1 {
  margin-bottom: 0.25rem;
}
.mb-2 {
  margin-bottom: 0.5rem;
}
.mb-3 {
  margin-bottom: 1rem;
}
.mb-4 {
  margin-bottom: 1.5rem;
}
.mb-5 {
  margin-bottom: 3rem;
}

// Left and right margins follow the same pattern
.ml-0,
.mr-0 {
  /* ... */
}
.ml-1,
.mr-1 {
  /* ... */
}
// ... etc
```

### Padding Utilities

```scss
// All sides
.p-0 {
  padding: 0;
}
.p-1 {
  padding: 0.25rem;
}
.p-2 {
  padding: 0.5rem;
}
.p-3 {
  padding: 1rem;
}
.p-4 {
  padding: 1.5rem;
}
.p-5 {
  padding: 3rem;
}

// Directional padding follows the same pattern
.pt-0,
.pb-0,
.pl-0,
.pr-0 {
  /* ... */
}
.pt-1,
.pb-1,
.pl-1,
.pr-1 {
  /* ... */
}
// ... etc
```

### Utility Class Usage

```tsx
// In React components
<div className="p-3 mb-4">
  <h2 className="mb-2">Section Title</h2>
  <p className="mb-3">Paragraph content with bottom margin.</p>
  <button className="mt-2">Action Button</button>
</div>
```

## Layout Spacing Patterns

### Card Components

```scss
.card {
  padding: padding(3); // 3rem internal spacing
  margin-bottom: spacing(2); // 2rem between cards
  border-radius: 8px;

  .card-header {
    margin-bottom: spacing(2); // 2rem below header
    padding-bottom: spacing(1); // 1rem internal padding
    border-bottom: 1px solid col.$border;
  }

  .card-content {
    margin-bottom: spacing(2); // 2rem below content

    p + p {
      margin-top: spacing(1.5); // 1.5rem between paragraphs
    }
  }

  .card-actions {
    padding-top: spacing(1); // 1rem above actions
    border-top: 1px solid col.$border;

    .button + .button {
      margin-left: spacing(1); // 1rem between buttons
    }
  }
}
```

### Grid Layouts

```scss
.grid-layout {
  display: grid;
  gap: spacing(2); // 2rem gap between grid items
  padding: padding(3); // 3rem container padding

  @include util.mq(bp.$medium) {
    gap: spacing(3); // 3rem gap on larger screens
    padding: padding(4); // 4rem container padding
  }
}
```

### Form Layouts

```scss
.form {
  .form-group {
    margin-bottom: spacing(3); // 3rem between form groups

    .label {
      margin-bottom: spacing(0.5); // 0.5rem below labels
    }

    .input {
      padding: padding(1); // 1rem input padding
    }

    .help-text {
      margin-top: spacing(0.5); // 0.5rem above help text
    }
  }

  .form-actions {
    margin-top: spacing(4); // 4rem above form actions
    padding-top: spacing(2); // 2rem internal padding
    border-top: 1px solid col.$border;

    .button + .button {
      margin-left: spacing(1); // 1rem between buttons
    }
  }
}
```

## Responsive Spacing

### Adaptive Spacing

```scss
.responsive-spacing {
  // Mobile: smaller spacing
  padding: padding(2);
  margin-bottom: spacing(2);

  // Tablet: medium spacing
  @include util.mq(bp.$medium) {
    padding: padding(3);
    margin-bottom: spacing(3);
  }

  // Desktop: larger spacing
  @include util.mq(bp.$large) {
    padding: padding(4);
    margin-bottom: spacing(4);
  }
}
```

### Responsive Utility Classes

```scss
// Create responsive variants
.p-responsive {
  padding: padding(2);

  @include util.mq(bp.$medium) {
    padding: padding(3);
  }

  @include util.mq(bp.$large) {
    padding: padding(4);
  }
}
```

## Flexbox and Grid Spacing

### Flexbox Gap

```scss
.flex-container {
  display: flex;
  gap: spacing(2); // 2rem gap between flex items

  &.small-gap {
    gap: spacing(1); // 1rem gap
  }

  &.large-gap {
    gap: spacing(3); // 3rem gap
  }
}
```

### Grid Gap

```scss
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: spacing(2); // 2rem gap between grid items

  @include util.mq(bp.$medium) {
    gap: spacing(3); // 3rem gap on larger screens
  }
}
```

### Gap Utility Classes

```scss
.gap-0 {
  gap: 0;
}
.gap-1 {
  gap: spacing(1);
} // 1rem
.gap-2 {
  gap: spacing(2);
} // 2rem
.gap-3 {
  gap: spacing(3);
} // 3rem
.gap-4 {
  gap: spacing(4);
} // 4rem
```

## Vertical Rhythm

### Consistent Vertical Spacing

```scss
.content {
  // Establish baseline rhythm
  line-height: 1.6;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: spacing(3);
    margin-bottom: spacing(1);

    &:first-child {
      margin-top: 0;
    }
  }

  p,
  ul,
  ol,
  blockquote {
    margin-bottom: spacing(1.5);

    &:last-child {
      margin-bottom: 0;
    }
  }

  ul,
  ol {
    padding-left: spacing(2);

    li + li {
      margin-top: spacing(0.5);
    }
  }

  blockquote {
    padding: padding(2);
    margin-left: spacing(2);
    border-left: 4px solid col.$primary;
  }
}
```

## Component Spacing Patterns

### Button Groups

```scss
.button-group {
  display: flex;
  gap: spacing(1); // 1rem between buttons

  &.vertical {
    flex-direction: column;
  }

  &.large-gap {
    gap: spacing(2); // 2rem between buttons
  }
}
```

### Navigation Spacing

```scss
.navigation {
  .nav-item {
    padding: padding(1) padding(1.5); // Vertical and horizontal padding

    + .nav-item {
      margin-left: spacing(0.5); // 0.5rem between nav items
    }
  }

  .nav-section + .nav-section {
    margin-top: spacing(2); // 2rem between nav sections
  }
}
```

### List Spacing

```scss
.list {
  .list-item {
    padding: padding(1.5); // 1.5rem item padding
    border-bottom: 1px solid col.$border;

    &:last-child {
      border-bottom: none;
    }
  }

  .list-item + .list-item {
    margin-top: 0; // No additional margin (padding handles spacing)
  }
}
```

## Best Practices

### 1. Use Functions Over Hardcoded Values

```scss
// ✅ Good - uses spacing functions
.component {
  padding: padding(2);
  margin-bottom: spacing(3);
}

// ❌ Bad - hardcoded values
.component {
  padding: 2rem;
  margin-bottom: 3rem;
}
```

### 2. Maintain Consistent Ratios

```scss
// ✅ Good - consistent mathematical relationships
.card {
  padding: padding(3); // 3rem

  .card-header {
    padding-bottom: padding(1); // 1rem (1/3 of card padding)
  }
}
```

### 3. Use Appropriate Scale Steps

```scss
// ✅ Good - uses scale steps
.section {
  margin-bottom: spacing(4); // Large section spacing

  .subsection {
    margin-bottom: spacing(2); // Medium subsection spacing
  }

  .component {
    margin-bottom: spacing(1); // Small component spacing
  }
}
```

### 4. Consider Touch Targets

```scss
.touch-target {
  // Minimum 44px touch target
  min-height: 44px;
  padding: padding(1) padding(1.5); // Adequate padding for touch
}
```

### 5. Reset Margins Appropriately

```scss
.content-container {
  // Reset margins on first and last children
  > *:first-child {
    margin-top: 0;
  }

  > *:last-child {
    margin-bottom: 0;
  }
}
```

## Debugging Spacing

### Visual Spacing Debug

```scss
// Development helper
.debug-spacing {
  * {
    outline: 1px solid rgba(255, 0, 0, 0.3);
  }

  *:hover {
    outline: 2px solid rgba(255, 0, 0, 0.8);
  }
}
```

### Spacing Measurement Tool

```scss
// Add to development builds
.spacing-ruler {
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 1px;
    background: repeating-linear-gradient(
      to right,
      red 0,
      red 1px,
      transparent 1px,
      transparent spacing(1)
    );
  }
}
```
