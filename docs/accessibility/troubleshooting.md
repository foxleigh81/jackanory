# Accessibility Troubleshooting

Common accessibility issues and their solutions when working with the Jackanory Design System.

## 🎯 Focus Management Issues

### Problem: Focus Disappears or Goes to Wrong Element

**Symptoms:**

- Tab key doesn't move focus logically
- Focus jumps unexpectedly
- Focus gets lost when components update

**Solutions:**

```typescript
// ❌ Bad: Focus management not handled
const Modal = ({ isOpen, children }) => {
  if (!isOpen) return null;
  return <div>{children}</div>;
};

// ✅ Good: Proper focus management
import { useFocusTrap } from '@/libs/hooks';

const Modal = ({ isOpen, children }) => {
  const focusTrapRef = useFocusTrap({ isActive: isOpen });

  if (!isOpen) return null;

  return (
    <div ref={focusTrapRef} role="dialog" aria-modal="true">
      {children}
    </div>
  );
};
```

**Debugging Steps:**

1. Check if `useFocusTrap` is properly implemented
2. Verify the container ref is attached correctly
3. Ensure focusable elements exist within the container
4. Test tab order manually

### Problem: Focus Indicators Not Visible

**Symptoms:**

- No visible outline when tabbing through elements
- Focus indicators have poor contrast
- Focus indicators don't work in high contrast mode

**Solutions:**

```scss
// ❌ Bad: Removed focus indicators
.button {
  &:focus {
    outline: none; // Never do this without providing alternative
  }
}

// ✅ Good: Accessible focus indicators
@use '@/theme/utilities' as util;

.button {
  @include util.enhanced-focus(#007bff, 2px);
}
```

**Debugging Steps:**

1. Check if focus-visible utilities are applied
2. Test in high contrast mode
3. Verify contrast ratios meet WCAG standards
4. Test with keyboard navigation

### Problem: Keyboard Traps

**Symptoms:**

- Can't tab out of a component
- Focus gets stuck in a loop
- Escape key doesn't work

**Solutions:**

```typescript
// ❌ Bad: Improper focus trapping
const Modal = ({ isOpen }) => {
  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
          e.preventDefault(); // This creates a trap!
        }
      });
    }
  }, [isOpen]);
};

// ✅ Good: Proper focus trapping with escape
import { useFocusTrap } from '@/libs/hooks';

const Modal = ({ isOpen, onClose }) => {
  const focusTrapRef = useFocusTrap({ isActive: isOpen });

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);
};
```

## 🔊 Screen Reader Issues

### Problem: Content Not Announced

**Symptoms:**

- Screen reader skips over content
- Dynamic changes aren't announced
- Form errors aren't read

**Solutions:**

```typescript
// ❌ Bad: No screen reader support
const StatusMessage = ({ message }) => (
  <div className="status">{message}</div>
);

// ✅ Good: Proper screen reader support
import { LiveRegion } from '@/components/utilities';

const StatusMessage = ({ message, type = 'info' }) => (
  <div role={type === 'error' ? 'alert' : 'status'}>
    {message}
    <LiveRegion
      message={message}
      politeness={type === 'error' ? 'assertive' : 'polite'}
    />
  </div>
);
```

**Debugging Steps:**

1. Test with actual screen readers (NVDA, VoiceOver, JAWS)
2. Check ARIA attributes are correctly applied
3. Verify live regions are working
4. Ensure content has proper semantic structure

### Problem: Incorrect ARIA Usage

**Symptoms:**

- Screen reader announces wrong information
- ARIA attributes reference non-existent elements
- Redundant or conflicting ARIA

**Solutions:**

```typescript
// ❌ Bad: Incorrect ARIA usage
<div role="button" aria-labelledby="nonexistent-id">
  Click me
</div>

// ✅ Good: Proper ARIA usage
import { generateA11yId } from '@/libs/helpers/accessibility';

const Component = () => {
  const labelId = generateA11yId('button-label');

  return (
    <>
      <span id={labelId}>Save Document</span>
      <button aria-labelledby={labelId}>
        💾
      </button>
    </>
  );
};
```

**Debugging Steps:**

1. Use our `validateAriaAttributes` helper
2. Check that referenced IDs exist
3. Verify ARIA roles are appropriate
4. Test with accessibility testing tools

### Problem: Form Labels Not Associated

**Symptoms:**

- Screen reader doesn't announce field labels
- Form validation errors aren't connected
- Required fields not identified

**Solutions:**

```typescript
// ❌ Bad: No label association
<div>
  <span>Email</span>
  <input type="email" />
  <div>Please enter a valid email</div>
</div>

// ✅ Good: Proper label association
import { generateA11yId, combineAriaDescribedBy } from '@/libs/helpers/accessibility';

const FormField = ({ label, error, helperText, ...props }) => {
  const inputId = generateA11yId('input');
  const helpId = generateA11yId('help');
  const errorId = generateA11yId('error');

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        aria-describedby={combineAriaDescribedBy(
          helperText ? helpId : undefined,
          error ? errorId : undefined
        )}
        aria-invalid={!!error}
        {...props}
      />
      {helperText && <div id={helpId}>{helperText}</div>}
      {error && <div id={errorId} role="alert">{error}</div>}
    </div>
  );
};
```

## 🎨 Color and Contrast Issues

### Problem: Insufficient Color Contrast

**Symptoms:**

- Text is hard to read
- Focus indicators are barely visible
- Fails accessibility audits

**Solutions:**

```typescript
// ❌ Bad: Poor contrast
const styles = {
  color: '#999999',
  backgroundColor: '#ffffff' // Contrast ratio: 2.85 (fails WCAG AA)
};

// ✅ Good: Sufficient contrast
import { meetsWCAGAA, getContrastRatio } from '@/libs/helpers/color-contrast';

const validateColors = (foreground, background) => {
  const ratio = getContrastRatio(foreground, background);
  const isCompliant = meetsWCAGAA(foreground, background);

  if (!isCompliant) {
    console.warn(`Color combination fails WCAG AA: ${ratio.toFixed(2)}:1`);
  }

  return isCompliant;
};

// Use design system colors that are pre-validated
const styles = {
  color: 'var(--color-text)', // Meets WCAG AA
  backgroundColor: 'var(--color-background)'
};
```

**Debugging Steps:**

1. Use our color contrast utilities to test combinations
2. Check colors in high contrast mode
3. Test with color blindness simulators
4. Use browser DevTools contrast checker

### Problem: Information Conveyed by Color Alone

**Symptoms:**

- Status only indicated by color
- Required fields only marked with red
- Charts rely solely on color coding

**Solutions:**

```typescript
// ❌ Bad: Color only
const StatusIndicator = ({ status }) => (
  <div style={{ color: status === 'error' ? 'red' : 'green' }}>
    {status}
  </div>
);

// ✅ Good: Multiple indicators
const StatusIndicator = ({ status }) => (
  <div className={`status status--${status}`}>
    <span aria-hidden="true">
      {status === 'error' ? '❌' : '✅'}
    </span>
    <span>{status === 'error' ? 'Error' : 'Success'}</span>
  </div>
);
```

## 🎬 Motion and Animation Issues

### Problem: Animations Don't Respect Reduced Motion

**Symptoms:**

- Animations play even when user prefers reduced motion
- Motion causes discomfort or vestibular disorders
- No alternative static presentation

**Solutions:**

```scss
// ❌ Bad: Ignores motion preferences
.animated-element {
  animation: slideIn 0.5s ease;
  transition: all 0.3s ease;
}

// ✅ Good: Respects motion preferences
@use '@/theme/utilities' as util;

.animated-element {
  @include util.safe-animation(slideIn 0.5s ease, none);
  @include util.safe-transition(all 0.3s ease, none);
}
```

**Debugging Steps:**

1. Test with system motion settings disabled
2. Use our reduced motion SCSS utilities (`@include util.safe-animation`)
3. Provide static alternatives for essential animations
4. Test with users who have vestibular disorders

## 📱 Mobile Accessibility Issues

### Problem: Touch Targets Too Small

**Symptoms:**

- Buttons are hard to tap accurately
- Links are too close together
- Users accidentally tap wrong elements

**Solutions:**

```scss
// ❌ Bad: Small touch targets
.button {
  padding: 4px 8px; // Results in targets smaller than 44px
}

// ✅ Good: Adequate touch targets
.button {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
  margin: 4px; // Provides spacing between targets
}
```

**Debugging Steps:**

1. Test on actual mobile devices
2. Use browser DevTools mobile simulation
3. Verify minimum 44x44 pixel touch targets
4. Check spacing between interactive elements

## 🔧 Testing and Debugging Tools

### Using Browser Testing Tools

```javascript
// Check focus order in browser console
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    console.log('Focused element:', document.activeElement);
  }
});

// Check ARIA attributes in browser console
const element = document.querySelector('[aria-labelledby]');
const labelId = element.getAttribute('aria-labelledby');
const labelElement = document.getElementById(labelId);
console.log('Label text:', labelElement?.textContent);

// Use axe-core in browser console (if loaded)
if (window.axe) {
  axe.run().then((results) => {
    console.log('Accessibility violations:', results.violations);
  });
}
```

### Screen Reader Testing Commands

**NVDA (Windows):**

- `NVDA + Space`: Toggle browse/focus mode
- `H`: Navigate by headings
- `F`: Navigate by form fields
- `B`: Navigate by buttons

**VoiceOver (macOS):**

- `VO + A`: Read all
- `VO + Right Arrow`: Navigate forward
- `VO + U`: Open rotor (navigation menu)

**JAWS (Windows):**

- `Insert + F7`: List of links
- `Insert + F5`: List of form fields
- `Insert + F6`: List of headings

## 📋 Common Testing Checklist

When troubleshooting accessibility issues:

1. **Automated Testing**
   - [ ] Run our accessibility testing utilities
   - [ ] Check with axe-core or similar tools
   - [ ] Validate HTML markup

2. **Keyboard Testing**
   - [ ] Tab through all interactive elements
   - [ ] Test arrow key navigation where applicable
   - [ ] Verify Escape key functionality
   - [ ] Check for keyboard traps

3. **Screen Reader Testing**
   - [ ] Test with at least one screen reader
   - [ ] Verify content is announced correctly
   - [ ] Check form label associations
   - [ ] Test dynamic content announcements

4. **Visual Testing**
   - [ ] Check color contrast ratios
   - [ ] Test in high contrast mode
   - [ ] Verify focus indicators are visible
   - [ ] Test at 200% zoom level

5. **Motion Testing**
   - [ ] Test with reduced motion enabled
   - [ ] Verify animations have alternatives
   - [ ] Check for seizure-inducing content

## 🆘 Getting Help

If you're still experiencing issues:

1. **Check our documentation** - Review relevant sections
2. **Use our testing utilities** - Run automated checks
3. **Test with real users** - Get feedback from people with disabilities
4. **Consult WCAG guidelines** - Reference official standards
5. **Ask for help** - Reach out to the accessibility team

---

_For more accessibility resources, see our [main accessibility documentation](./index.md)._
