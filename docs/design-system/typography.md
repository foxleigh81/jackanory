# Typography System

The Jackanory typography system provides consistent, accessible, and responsive text styling through SCSS mixins and utility classes.

## Typography Mixins

### Body Text

```scss
$body-text-size: 1.4rem;

@mixin body-text {
  font-size: $body-text-size;
  line-height: 2.1rem;
}
```

### Text Size Variations

```scss
// Small text
$small-text-size: 1.2rem;
@mixin small-text {
  font-size: $small-text-size;
}

// Large text
$large-text-size: 1.6rem;
@mixin large-text {
  font-size: $large-text-size;
}
```

### Usage Example

```scss
.article {
  @include type.body-text;
  
  .caption {
    @include type.small-text;
    color: col.$grey-600;
  }
  
  .lead {
    @include type.large-text;
    font-weight: 600;
  }
}
```

## Heading System

### Responsive Headings

All headings are responsive and scale appropriately across breakpoints.

#### Title (Largest Heading)

```scss
$title-size: 10rem;

@mixin title {
  font-weight: 800;
  letter-spacing: 0;
  font-size: 18vw;

  @include util.mq(620px) {
    font-size: calc($title-size / 1.2);
  }

  @include util.mq(bp.$medium) {
    font-size: $title-size;
    line-height: 1;
  }
}
```

#### Large Heading

```scss
$heading-large-size: 3.4rem;

@mixin heading-large {
  font-weight: 800;
  letter-spacing: 0;
  font-size: calc($heading-large-size / 1.5);

  @include util.mq(bp.$medium) {
    font-size: $heading-large-size;
  }
}
```

#### Medium Heading

```scss
$heading-medium-size: 2.4rem;

@mixin heading-medium {
  font-weight: 800;
  letter-spacing: 0;
  font-size: calc($heading-medium-size / 1.5);

  @include util.mq(bp.$medium) {
    font-size: $heading-medium-size;
  }
}
```

#### Small Heading

```scss
$heading-small-size: 2rem;

@mixin heading-small {
  font-weight: 600;
  font-size: calc($heading-small-size / 1.5);

  @include util.mq(bp.$medium) {
    font-size: $heading-small-size;
  }
}
```

### Heading Usage Example

```scss
.content {
  .page-title {
    @include type.title;
    color: col.$primary;
    margin-bottom: spacing(3);
  }
  
  .section-title {
    @include type.heading-large;
    color: col.$body-text;
    margin-bottom: spacing(2);
  }
  
  .subsection-title {
    @include type.heading-medium;
    color: col.$body-text;
    margin-bottom: spacing(1.5);
  }
  
  .component-title {
    @include type.heading-small;
    color: col.$grey-700;
    margin-bottom: spacing(1);
  }
}
```

## Form Typography

### Input Fields

```scss
$input-size: $body-text-size;

@mixin input {
  font-size: $input-size;
  line-height: 1rem;
}
```

### Input Labels

```scss
$input-label-size: $body-text-size;

@mixin input-label {
  font-size: $input-label-size;
  line-height: 1rem;
}
```

### Placeholder Text

```scss
$input-placeholder-size: $input-size;

@mixin input-placeholder {
  font-size: $input-placeholder-size;
  line-height: 1.8rem;
}
```

### Form Metadata

For help text, validation messages, and other form-related content:

```scss
$form-metadata-size: 1.2rem;

@mixin form-metadata {
  font-size: $form-metadata-size;
  line-height: 1.8rem;
}
```

### Form Typography Example

```scss
.form-field {
  .label {
    @include type.input-label;
    color: col.$label-text;
    font-weight: 600;
    margin-bottom: spacing(0.5);
  }
  
  .input {
    @include type.input;
    color: col.$input-text;
    
    &::placeholder {
      @include type.input-placeholder;
      color: col.$grey-400;
    }
  }
  
  .help-text {
    @include type.form-metadata;
    color: col.$grey-600;
    margin-top: spacing(0.5);
  }
  
  .error-message {
    @include type.form-metadata;
    color: col.$danger;
    margin-top: spacing(0.5);
  }
}
```

## Interactive Element Typography

### Buttons

```scss
$button-size: $input-size;

@mixin button {
  font-size: $button-size;
  line-height: 1;
}
```

### Links

```scss
$link-size: $body-text-size;

@mixin link {
  font-size: $link-size;
  line-height: 1;
}
```

### Interactive Typography Example

```scss
.button {
  @include type.button;
  font-weight: 600;
  text-decoration: none;
  
  &.large {
    font-size: calc(#{$button-size} * 1.2);
  }
  
  &.small {
    font-size: calc(#{$button-size} * 0.9);
  }
}

.link {
  @include type.link;
  color: col.$link;
  text-decoration: underline;
  
  &:hover {
    color: col.$link-hover;
  }
  
  &:focus-visible {
    outline: 2px solid col.$keyboard-focus;
    outline-offset: 2px;
  }
}
```

## Typography Utility Classes

Utility classes that mirror the typography mixins:

```scss
// Body text variations
.body-text { @include type.body-text; }
.small-text { @include type.small-text; }
.large-text { @include type.large-text; }

// Headings
.title { @include type.title; }
.heading-large { @include type.heading-large; }
.heading-medium { @include type.heading-medium; }
.heading-small { @include type.heading-small; }

// Form elements
.input { @include type.input; }
.input-label { @include type.input-label; }
.input-placeholder { @include type.input-placeholder; }
.form-metadata { @include type.form-metadata; }

// Interactive elements
.button { @include type.button; }
.link { @include type.link; }
```

### Utility Class Usage

```tsx
// In React components
<div className="article">
  <h1 className="title">Page Title</h1>
  <h2 className="heading-large">Section Title</h2>
  <p className="body-text">Regular paragraph text.</p>
  <p className="small-text">Caption or metadata text.</p>
</div>
```

## Responsive Typography Patterns

### Mobile-First Scaling

Typography automatically scales from mobile to desktop:

```scss
.responsive-heading {
  // Mobile: smaller size
  font-size: calc(#{$heading-large-size} / 1.5);
  
  // Desktop: full size
  @include util.mq(bp.$medium) {
    font-size: $heading-large-size;
  }
}
```

### Custom Responsive Typography

```scss
.custom-heading {
  font-size: 1.8rem;
  font-weight: 700;
  
  @include util.mq(bp.$small) {
    font-size: 2.2rem;
  }
  
  @include util.mq(bp.$medium) {
    font-size: 2.8rem;
  }
  
  @include util.mq(bp.$large) {
    font-size: 3.2rem;
  }
}
```

## Typography Best Practices

### 1. Use Mixins Over Utility Classes in Components

```scss
// ✅ Good - in SCSS modules
.component-title {
  @include type.heading-medium;
  color: col.$primary;
}

// ✅ Also good - utility classes in HTML
<h2 className="heading-medium">Title</h2>
```

### 2. Maintain Consistent Line Heights

```scss
.text-block {
  @include type.body-text; // Includes proper line-height
  
  // Don't override line-height unless necessary
}
```

### 3. Use Semantic HTML Elements

```tsx
// ✅ Good - semantic HTML with typography classes
<article className="article">
  <h1 className="heading-large">Article Title</h1>
  <p className="body-text">Article content...</p>
</article>

// ❌ Bad - non-semantic elements
<div className="heading-large">Article Title</div>
<div className="body-text">Article content...</div>
```

### 4. Consider Reading Experience

```scss
.readable-content {
  @include type.body-text;
  max-width: 65ch; // Optimal reading width
  line-height: 1.6; // Good readability
  
  p + p {
    margin-top: spacing(1.5); // Paragraph spacing
  }
}
```

### 5. Accessibility Considerations

```scss
.accessible-text {
  // Ensure sufficient color contrast
  color: col.$body-text; // High contrast
  
  // Respect user preferences
  @media (prefers-reduced-motion: reduce) {
    transition: none;
  }
  
  // Focus indicators for interactive text
  &:focus-visible {
    outline: 2px solid col.$keyboard-focus;
    outline-offset: 2px;
  }
}
```

## Font Loading and Performance

### Font Display Strategy

```scss
// In your font declarations
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/custom-font.woff2') format('woff2');
  font-display: swap; // Improves loading performance
}
```

### Font Weight Optimization

```scss
// Use specific font weights available in your font files
.heading {
  font-weight: 600; // Semi-bold
  // Avoid font-weight: bold (700) if not available
}
```

## Typography Variables Reference

### Size Variables

```scss
$body-text-size: 1.4rem;
$small-text-size: 1.2rem;
$large-text-size: 1.6rem;
$title-size: 10rem;
$heading-large-size: 3.4rem;
$heading-medium-size: 2.4rem;
$heading-small-size: 2rem;
$input-size: 1.4rem;
$input-label-size: 1.4rem;
$input-placeholder-size: 1.4rem;
$form-metadata-size: 1.2rem;
$button-size: 1.4rem;
$link-size: 1.4rem;
```

### Usage in Custom Components

```scss
.custom-component {
  // Use variables for consistency
  font-size: type.$body-text-size;
  
  .large-variant {
    font-size: type.$large-text-size;
  }
  
  .small-variant {
    font-size: type.$small-text-size;
  }
}
```
