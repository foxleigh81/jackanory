# Accessibility Guidelines

Best practices and guidelines for creating accessible components and applications using the Jackanory Design System.

## 🎯 Core Principles

### 1. Perceivable

Information and UI components must be presentable to users in ways they can perceive.

- **Provide text alternatives** for non-text content
- **Ensure sufficient color contrast** (4.5:1 for normal text, 3:1 for large text)
- **Make content adaptable** to different presentations without losing meaning
- **Help users see and hear content** by separating foreground from background

### 2. Operable

UI components and navigation must be operable by all users.

- **Make all functionality keyboard accessible**
- **Give users enough time** to read and use content
- **Don't use content that causes seizures** or physical reactions
- **Help users navigate and find content**

### 3. Understandable

Information and UI operation must be understandable.

- **Make text readable and understandable**
- **Make content appear and operate predictably**
- **Help users avoid and correct mistakes**

### 4. Robust

Content must be robust enough for interpretation by assistive technologies.

- **Maximize compatibility** with current and future assistive technologies
- **Use valid, semantic HTML**
- **Ensure content works across different browsers and devices**

## 🏗️ Component Development Guidelines

### HTML Semantics

#### Use Semantic HTML Elements

```html
<!-- Good: Semantic HTML -->
<nav>
  <ul>
    <li><a href="/home">Home</a></li>
    <li><a href="/about">About</a></li>
  </ul>
</nav>

<main>
  <article>
    <h1>Article Title</h1>
    <p>Article content...</p>
  </article>
</main>

<!-- Bad: Non-semantic HTML -->
<div class="navigation">
  <div class="nav-item">Home</div>
  <div class="nav-item">About</div>
</div>

<div class="content">
  <div class="title">Article Title</div>
  <div class="text">Article content...</div>
</div>
```

#### Proper Heading Hierarchy

```html
<!-- Good: Logical heading hierarchy -->
<h1>Page Title</h1>
<h2>Section Title</h2>
<h3>Subsection Title</h3>
<h3>Another Subsection</h3>
<h2>Another Section</h2>

<!-- Bad: Skipped heading levels -->
<h1>Page Title</h1>
<h4>Section Title</h4>
<!-- Skips h2 and h3 -->
```

### ARIA Usage

#### When to Use ARIA

1. **When semantic HTML isn't enough** - Complex widgets like tabs, accordions
2. **To provide additional context** - Labels, descriptions, states
3. **For dynamic content** - Live regions, status updates
4. **To fix accessibility issues** - When you can't change the HTML structure

#### ARIA Best Practices

```typescript
// Good: Proper ARIA usage
<button
  aria-expanded={isOpen}
  aria-controls="menu-items"
  aria-haspopup="true"
>
  Menu
</button>
<ul id="menu-items" role="menu" hidden={!isOpen}>
  <li role="menuitem">Item 1</li>
  <li role="menuitem">Item 2</li>
</ul>

// Bad: Redundant ARIA
<button role="button" aria-label="Button">Button</button>
// The role="button" is redundant, and aria-label duplicates visible text
```

#### Common ARIA Patterns

```typescript
// Tab component
<div role="tablist">
  <button role="tab" aria-selected="true" aria-controls="panel1">Tab 1</button>
  <button role="tab" aria-selected="false" aria-controls="panel2">Tab 2</button>
</div>
<div id="panel1" role="tabpanel" aria-labelledby="tab1">Panel 1 content</div>

// Modal dialog
<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Dialog Title</h2>
  <p>Dialog content</p>
</div>

// Form with error
<label htmlFor="email">Email</label>
<input
  id="email"
  type="email"
  aria-describedby="email-error"
  aria-invalid={hasError}
/>
{hasError && <div id="email-error" role="alert">Please enter a valid email</div>}
```

### Focus Management

#### Focus Order

```typescript
// Good: Logical tab order
<form>
  <input type="text" /> {/* tabindex 0 (default) */}
  <input type="email" /> {/* tabindex 0 (default) */}
  <button type="submit">Submit</button> {/* tabindex 0 (default) */}
</form>

// Bad: Disrupted tab order
<form>
  <input type="text" tabIndex={3} />
  <input type="email" tabIndex={1} />
  <button type="submit" tabIndex={2}>Submit</button>
</form>
```

#### Focus Indicators

```scss
// Good: Visible focus indicators
.button {
  &:focus-visible {
    outline: 2px solid #007bff;
    outline-offset: 2px;
  }
}

// Bad: Removed focus indicators
.button {
  &:focus {
    outline: none; // Never do this without providing an alternative
  }
}
```

#### Focus Trapping

```typescript
// Use our focus trap hook for modals
import { useFocusTrap } from '@/libs/hooks';

const Modal = ({ isOpen }) => {
  const focusTrapRef = useFocusTrap({ isActive: isOpen });

  return (
    <div ref={focusTrapRef} role="dialog">
      {/* Modal content */}
    </div>
  );
};
```

### Color and Contrast

#### Color Contrast Requirements

- **Normal text**: 4.5:1 contrast ratio (WCAG AA)
- **Large text** (18pt+ or 14pt+ bold): 3:1 contrast ratio
- **Non-text elements**: 3:1 contrast ratio for UI components and graphics

```typescript
// Use our contrast checking utilities
import { meetsWCAGAA, getContrastRatio } from '@/libs/helpers/color-contrast';

const isAccessible = meetsWCAGAA('#333333', '#ffffff'); // true
const ratio = getContrastRatio('#666666', '#ffffff'); // 5.74
```

#### Don't Rely on Color Alone

```html
<!-- Good: Multiple indicators -->
<div class="status success">
  <span class="icon">✓</span>
  <span class="text">Success</span>
</div>

<!-- Bad: Color only -->
<div class="status" style="color: green;">Success</div>
```

### Form Accessibility

#### Proper Labeling

```html
<!-- Good: Explicit labels -->
<label for="username">Username</label>
<input id="username" type="text" />

<!-- Good: Implicit labels -->
<label>
  Username
  <input type="text" />
</label>

<!-- Good: ARIA labeling when visual label isn't possible -->
<input type="search" aria-label="Search products" />
```

#### Form Validation

```typescript
const FormField = ({ label, error, helperText, ...props }) => {
  const inputId = useId();
  const helpId = useId();
  const errorId = useId();

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        aria-describedby={`${helperText ? helpId : ''} ${error ? errorId : ''}`.trim()}
        aria-invalid={!!error}
        {...props}
      />
      {helperText && <div id={helpId}>{helperText}</div>}
      {error && <div id={errorId} role="alert">{error}</div>}
    </div>
  );
};
```

### Motion and Animation

#### Respect Motion Preferences

```scss
// Use our reduced motion utilities
@use '@/theme/utilities' as util;

.animated-element {
  @include util.safe-animation(slideIn 0.3s ease, none);
}
```

```scss
// Use our reduced motion SCSS utilities
@use '@/theme/utilities' as util;

.component {
  @include util.safe-animation(slideIn 0.3s ease, none);
  @include util.safe-transition(all 0.3s ease, none);
}
```

## 📱 Mobile Accessibility

### Touch Targets

- **Minimum size**: 44x44 pixels
- **Adequate spacing**: At least 8px between targets
- **Consider thumb reach**: Place important actions within easy reach

```scss
.touch-target {
  min-height: 44px;
  min-width: 44px;
  margin: 4px; // Provides 8px spacing between targets
}
```

### Mobile Screen Readers

```html
<!-- Provide context for mobile users -->
<button aria-label="Add item to cart">
  <span aria-hidden="true">+</span>
</button>

<!-- Use headings for navigation -->
<h2>Product Details</h2>
<h3>Specifications</h3>
<h3>Reviews</h3>
```

## 🧪 Testing Guidelines

### Automated Testing

```typescript
// Include accessibility tests in your component tests
import { checkAccessibility } from '@/libs/helpers/accessibility-testing';

test('component should be accessible', () => {
  const { container } = render(<Component />);
  const issues = checkAccessibility(container);
  const errors = issues.filter(issue => issue.type === 'error');
  expect(errors).toHaveLength(0);
});
```

### Manual Testing Checklist

1. **Keyboard Navigation**
   - [ ] All functionality available via keyboard
   - [ ] Logical tab order
   - [ ] Visible focus indicators
   - [ ] No keyboard traps

2. **Screen Reader Testing**
   - [ ] Content is announced correctly
   - [ ] Proper heading structure
   - [ ] Form labels are associated
   - [ ] Status changes are announced

3. **Visual Testing**
   - [ ] Sufficient color contrast
   - [ ] Content works at 200% zoom
   - [ ] High contrast mode support
   - [ ] Information not conveyed by color alone

## 🚫 Common Mistakes to Avoid

### ARIA Misuse

```html
<!-- Bad: Incorrect ARIA usage -->
<div role="button" onclick="doSomething()">Click me</div>
<!-- Use actual button element instead -->

<!-- Bad: Redundant ARIA -->
<button role="button">Click me</button>
<!-- Button role is implicit -->

<!-- Bad: Incorrect ARIA relationships -->
<input aria-labelledby="nonexistent-id" />
<!-- Referenced element doesn't exist -->
```

### Focus Management Issues

```typescript
// Bad: Removing focus without alternative
const BadButton = () => (
  <button style={{ outline: 'none' }}>
    Click me
  </button>
);

// Bad: Positive tabindex
const BadTabOrder = () => (
  <div>
    <input tabIndex={3} />
    <input tabIndex={1} />
    <input tabIndex={2} />
  </div>
);
```

### Accessibility Overlays

```html
<!-- Bad: Don't rely on accessibility overlays -->
<script src="accessibility-overlay.js"></script>
<!-- These don't fix underlying accessibility issues -->
```

## 📚 Resources and References

### WCAG Guidelines

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [WebAIM WCAG Checklist](https://webaim.org/standards/wcag/checklist)

### ARIA Specifications

- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [ARIA in HTML](https://www.w3.org/TR/html-aria/)

### Testing Tools

- [axe-core](https://github.com/dequelabs/axe-core)
- [WAVE Web Accessibility Evaluator](https://wave.webaim.org/)
- [Lighthouse Accessibility Audit](https://developers.google.com/web/tools/lighthouse)

---

_For more accessibility resources, see our [main accessibility documentation](./index.md)._
