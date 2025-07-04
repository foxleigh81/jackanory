# Component Patterns

This guide covers best practices for styling components in the Jackanory design system using SCSS Modules and established patterns.

## SCSS Module Structure

### Basic Component Structure

```scss
// component.module.scss
.component {
  // Base styles
  background: col.$bg;
  border: 1px solid col.$border;
  border-radius: 8px;
  padding: padding(2);

  // Typography
  @include type.body-text;
  color: col.$body-text;

  // Responsive behavior
  @include util.mq(bp.$medium) {
    padding: padding(3);
  }
}

.componentTitle {
  @include type.heading-small;
  color: col.$primary;
  margin-bottom: spacing(1);
}

.componentContent {
  @include type.body-text;
  color: col.$grey-600;

  p + p {
    margin-top: spacing(1.5);
  }
}
```

### Component with Variants

```scss
.button {
  // Base button styles
  @include type.button;
  padding: padding(1) padding(2);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;

  // Default variant
  background: col.$primary;
  color: col.$light;

  &:hover {
    background: col.$primary-button-hover;
  }

  &:focus-visible {
    outline: 2px solid col.$keyboard-focus;
    outline-offset: 2px;
  }

  // Variant modifiers
  &.secondary {
    background: col.$secondary;
    color: col.$light;

    &:hover {
      background: col.$secondary-button-hover;
    }
  }

  &.outline {
    background: transparent;
    color: col.$primary;
    border: 1px solid col.$primary;

    &:hover {
      background: col.$primary;
      color: col.$light;
    }
  }

  // Size modifiers
  &.small {
    padding: padding(0.5) padding(1);
    font-size: 0.9em;
  }

  &.large {
    padding: padding(1.5) padding(3);
    font-size: 1.1em;
  }

  // State modifiers
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;
  }

  &.loading {
    position: relative;
    color: transparent;

    &::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 16px;
      height: 16px;
      border: 2px solid currentColor;
      border-top-color: transparent;
      border-radius: 50%;
      animation: spin 1s linear infinite;
    }
  }
}

@keyframes spin {
  to {
    transform: translate(-50%, -50%) rotate(360deg);
  }
}
```

## Component Architecture Patterns

### Container-Content Pattern

```scss
.card {
  // Container styles
  background: col.$bg;
  border: 1px solid col.$border;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.cardHeader {
  padding: padding(2);
  border-bottom: 1px solid col.$border;
  background: col.$grey-100;
}

.cardContent {
  padding: padding(2);
}

.cardFooter {
  padding: padding(2);
  border-top: 1px solid col.$border;
  background: col.$grey-50;

  .actions {
    display: flex;
    gap: spacing(1);
    justify-content: flex-end;
  }
}
```

### Layout Component Pattern

```scss
.layout {
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    'header'
    'main'
    'footer';
}

.layoutHeader {
  grid-area: header;
  background: col.$bg;
  border-bottom: 1px solid col.$border;
  padding: padding(2);
}

.layoutMain {
  grid-area: main;
  padding: padding(3);

  @include util.mq(bp.$medium) {
    padding: padding(4);
  }
}

.layoutFooter {
  grid-area: footer;
  background: col.$grey-100;
  border-top: 1px solid col.$border;
  padding: padding(2);
  text-align: center;
}

.layoutSidebar {
  // Two-column layout variant
  .layout.withSidebar & {
    grid-template-columns: 250px 1fr;
    grid-template-areas:
      'header header'
      'sidebar main'
      'footer footer';
  }

  grid-area: sidebar;
  background: col.$alt-panel-bg;
  border-right: 1px solid col.$border;
  padding: padding(2);
}
```

## State Management in Styles

### Interactive States

```scss
.interactive {
  transition: all 0.2s ease;

  // Hover (only on devices that support hover)
  @media (hover: hover) {
    &:hover {
      background: col.$grey-100;
      transform: translateY(-1px);
    }
  }

  // Focus (all devices)
  &:focus-visible {
    outline: 2px solid col.$keyboard-focus;
    outline-offset: 2px;
  }

  // Active state
  &:active {
    transform: translateY(0);
  }

  // Disabled state
  &:disabled,
  &.disabled {
    opacity: 0.6;
    cursor: not-allowed;
    pointer-events: none;

    &:hover {
      transform: none;
    }
  }
}
```

### Loading States

```scss
.loadingContainer {
  position: relative;

  &.loading {
    pointer-events: none;

    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}

.spinner {
  width: 24px;
  height: 24px;
  border: 2px solid col.$grey-300;
  border-top-color: col.$primary;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
```

### Error States

```scss
.formField {
  .input {
    border: 1px solid col.$input-border;

    &:focus {
      border-color: col.$input-border-focus;
    }

    &.error {
      border-color: col.$danger;

      &:focus {
        border-color: col.$danger;
        box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.25);
      }
    }

    &.success {
      border-color: col.$success;
    }
  }

  .errorMessage {
    @include type.form-metadata;
    color: col.$danger;
    margin-top: spacing(0.5);
  }

  .successMessage {
    @include type.form-metadata;
    color: col.$success;
    margin-top: spacing(0.5);
  }
}
```

## Naming Conventions

### BEM-Inspired Naming

```scss
// Block
.navigation {
}

// Elements
.navigationList {
}
.navigationItem {
}
.navigationLink {
}

// Modifiers
.navigation.vertical {
}
.navigationItem.active {
}
.navigationLink.disabled {
}
```

### Component-Scoped Naming

```scss
// Component root
.dropdown {
}

// Component parts
.dropdownTrigger {
}
.dropdownMenu {
}
.dropdownItem {
}

// Component states
.dropdown.open {
}
.dropdownItem.selected {
}
.dropdownItem.disabled {
}
```

## Responsive Component Patterns

### Mobile-First Components

```scss
.responsiveCard {
  // Mobile: stack vertically
  display: flex;
  flex-direction: column;
  gap: spacing(2);
  padding: padding(2);

  // Tablet: side-by-side layout
  @include util.mq(bp.$medium) {
    flex-direction: row;
    align-items: center;
    padding: padding(3);
    gap: spacing(3);
  }

  // Desktop: enhanced spacing
  @include util.mq(bp.$large) {
    padding: padding(4);
    gap: spacing(4);
  }
}

.responsiveCardImage {
  // Mobile: full width
  width: 100%;
  height: 200px;
  object-fit: cover;

  // Tablet: fixed width
  @include util.mq(bp.$medium) {
    width: 150px;
    height: 150px;
    flex-shrink: 0;
  }

  // Desktop: larger size
  @include util.mq(bp.$large) {
    width: 200px;
    height: 200px;
  }
}
```

### Container Query Preparation

```scss
.adaptiveComponent {
  // Base styles
  padding: padding(2);

  // Prepare for container queries
  container-type: inline-size;

  .componentContent {
    // Default: single column
    display: block;

    // When component is wide enough
    @container (min-width: 400px) {
      display: grid;
      grid-template-columns: auto 1fr;
      gap: spacing(2);
    }
  }
}
```

## Accessibility Patterns

### Focus Management

```scss
.focusable {
  &:focus-visible {
    outline: 2px solid col.$keyboard-focus;
    outline-offset: 2px;
  }

  // Remove default focus styles
  &:focus {
    outline: none;
  }
}

.skipLink {
  position: absolute;
  top: -40px;
  left: 6px;
  background: col.$primary;
  color: col.$light;
  padding: padding(1);
  text-decoration: none;
  border-radius: 4px;

  &:focus {
    top: 6px;
  }
}
```

### Screen Reader Support

```scss
.srOnly {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.statusMessage {
  // Announce changes to screen readers
  &[aria-live='polite'] {
    @include type.form-metadata;
    color: col.$info;
  }

  &[aria-live='assertive'] {
    @include type.form-metadata;
    color: col.$danger;
    font-weight: 600;
  }
}
```

### High Contrast Support

```scss
.component {
  // Ensure borders are visible in high contrast mode
  border: 1px solid col.$border;

  @media (prefers-contrast: high) {
    border-color: ButtonText;
  }

  @media (prefers-color-scheme: dark) {
    background: col.$bg-dark;
    color: col.$body-text-inverse;
    border-color: col.$border-dark;
  }
}
```

## Performance Patterns

### Efficient Animations

```scss
.animatedComponent {
  // Use transform and opacity for smooth animations
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;

  &.hidden {
    opacity: 0;
    transform: translateY(-10px);
  }

  &.visible {
    opacity: 1;
    transform: translateY(0);
  }

  // Respect reduced motion preferences
  @media (prefers-reduced-motion: reduce) {
    transition: none;

    &.hidden {
      display: none;
    }
  }
}
```

### Optimized Layouts

```scss
.efficientGrid {
  // Use CSS Grid for complex layouts
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: spacing(2);

  // Avoid layout thrashing
  .gridItem {
    contain: layout style;
  }
}
```

## Component Usage Examples

### React Component Integration

```tsx
// Button.tsx
import styles from './Button.module.scss';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

export default function Button({
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  children,
  onClick
}: ButtonProps) {
  const className = [
    styles.button,
    styles[variant],
    styles[size],
    disabled && styles.disabled,
    loading && styles.loading
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button
      className={className}
      disabled={disabled || loading}
      onClick={onClick}
      aria-busy={loading}
    >
      {children}
    </button>
  );
}
```

### Card Component Example

```tsx
// Card.tsx
import styles from './Card.module.scss';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
  variant?: 'default' | 'elevated';
}

export default function Card({
  title,
  children,
  actions,
  variant = 'default'
}: CardProps) {
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      {title && (
        <div className={styles.cardHeader}>
          <h3 className={styles.cardTitle}>{title}</h3>
        </div>
      )}

      <div className={styles.cardContent}>{children}</div>

      {actions && (
        <div className={styles.cardFooter}>
          <div className={styles.actions}>{actions}</div>
        </div>
      )}
    </div>
  );
}
```

## Best Practices Summary

### 1. Use Semantic Class Names

```scss
// ✅ Good - semantic meaning
.submitButton {
}
.errorMessage {
}
.navigationMenu {
}

// ❌ Bad - presentation-based
.redButton {
}
.boldText {
}
.leftMenu {
}
```

### 2. Follow Component Hierarchy

```scss
// ✅ Good - clear hierarchy
.card {
}
.cardHeader {
}
.cardTitle {
}
.cardContent {
}

// ❌ Bad - flat structure
.card {
}
.header {
}
.title {
}
.content {
}
```

### 3. Use Theme Variables

```scss
// ✅ Good - uses theme
.component {
  background: col.$bg;
  color: col.$body-text;
  padding: padding(2);
}

// ❌ Bad - hardcoded values
.component {
  background: white;
  color: #333;
  padding: 2rem;
}
```

### 4. Plan for States

```scss
// ✅ Good - considers all states
.button {
  // Default state
  background: col.$primary;

  // Interactive states
  &:hover {
  }
  &:focus-visible {
  }
  &:active {
  }
  &:disabled {
  }

  // Loading state
  &.loading {
  }
}
```

### 5. Maintain Accessibility

```scss
// ✅ Good - accessible patterns
.interactive {
  &:focus-visible {
    outline: 2px solid col.$keyboard-focus;
  }

  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
}
```
