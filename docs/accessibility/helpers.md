# Accessibility Helper Functions

Utility functions to make accessibility implementation easier and more consistent across the design system.

## 🎨 Color Contrast Utilities

### `getContrastRatio(color1, color2)`

Calculates the contrast ratio between two colors according to WCAG guidelines.

```typescript
import { getContrastRatio } from '@/libs/helpers/color-contrast';

const ratio = getContrastRatio('#000000', '#ffffff'); // Returns 21
const ratio2 = getContrastRatio('#333333', '#cccccc'); // Returns ~7.4
```

**Parameters:**

- `color1: string` - First color (hex, rgb, or hsl)
- `color2: string` - Second color (hex, rgb, or hsl)

**Returns:** `number` - Contrast ratio (1-21)

**Supported Formats:**

- Hex: `#ffffff`, `#fff`
- RGB: `rgb(255, 255, 255)`
- HSL: `hsl(0, 0%, 100%)`

---

### `meetsWCAGAA(foreground, background, isLargeText?)`

Checks if a color combination meets WCAG AA standards.

```typescript
import { meetsWCAGAA } from '@/libs/helpers/color-contrast';

const isCompliant = meetsWCAGAA('#333333', '#ffffff'); // true
const isCompliantLarge = meetsWCAGAA('#666666', '#ffffff', true); // true for large text
```

**Parameters:**

- `foreground: string` - Foreground color
- `background: string` - Background color
- `isLargeText?: boolean` - Whether text is large (18pt+ or 14pt+ bold)

**Returns:** `boolean` - True if meets WCAG AA (4.5:1 normal, 3:1 large text)

---

### `meetsWCAGAAA(foreground, background, isLargeText?)`

Checks if a color combination meets WCAG AAA standards.

```typescript
import { meetsWCAGAAA } from '@/libs/helpers/color-contrast';

const isCompliant = meetsWCAGAAA('#000000', '#ffffff'); // true
const isCompliantLarge = meetsWCAGAAA('#333333', '#ffffff', true); // true for large text
```

**Parameters:**

- `foreground: string` - Foreground color
- `background: string` - Background color
- `isLargeText?: boolean` - Whether text is large

**Returns:** `boolean` - True if meets WCAG AAA (7:1 normal, 4.5:1 large text)

---

### `getWCAGLevel(foreground, background, isLargeText?)`

Gets the WCAG compliance level for a color combination.

```typescript
import { getWCAGLevel } from '@/libs/helpers/color-contrast';

const level = getWCAGLevel('#000000', '#ffffff'); // 'AAA'
const level2 = getWCAGLevel('#666666', '#ffffff'); // 'AA'
const level3 = getWCAGLevel('#999999', '#ffffff'); // 'FAIL'
```

**Returns:** `'AAA' | 'AA' | 'FAIL'`

## 🔧 General Accessibility Utilities

### `generateA11yId(prefix?)`

Generates unique IDs for accessibility purposes.

```typescript
import { generateA11yId } from '@/libs/helpers/accessibility';

const labelId = generateA11yId('label'); // 'label-abc123def'
const descriptionId = generateA11yId('desc'); // 'desc-xyz789ghi'
```

**Parameters:**

- `prefix?: string` - ID prefix (default: 'a11y')

**Returns:** `string` - Unique ID

---

### `combineAriaDescribedBy(...ids)`

Combines multiple description IDs into a single aria-describedby string.

```typescript
import { combineAriaDescribedBy } from '@/libs/helpers/accessibility';

const helpId = 'help-123';
const errorId = hasError ? 'error-456' : undefined;
const warningId = hasWarning ? 'warning-789' : undefined;

const describedBy = combineAriaDescribedBy(helpId, errorId, warningId);
// Returns: 'help-123 error-456' (undefined values filtered out)
```

**Parameters:**

- `...ids: (string | undefined)[]` - Array of ID strings

**Returns:** `string | undefined` - Combined IDs or undefined if no valid IDs

---

### `announceToScreenReader(message, priority?)`

Announces messages to screen readers using live regions.

```typescript
import { announceToScreenReader } from '@/libs/helpers/accessibility';

// Polite announcement (default)
announceToScreenReader('Form saved successfully');

// Assertive announcement for errors
announceToScreenReader('Error: Please fix the required fields', 'assertive');
```

**Parameters:**

- `message: string` - Message to announce
- `priority?: 'polite' | 'assertive'` - Announcement priority (default: 'polite')

**Returns:** `void`

---

### `getAccessibleName(element)`

Gets the accessible name of an element following the accessibility tree calculation.

```typescript
import { getAccessibleName } from '@/libs/helpers/accessibility';

const button = document.querySelector('button');
const name = getAccessibleName(button); // Returns the accessible name
```

**Parameters:**

- `element: HTMLElement` - Element to get name for

**Returns:** `string` - Accessible name

**Name Calculation Order:**

1. `aria-label` attribute
2. `aria-labelledby` referenced element text
3. Associated `<label>` element text
4. Element text content

---

### `isVisibleToScreenReaders(element)`

Checks if an element is visible to screen readers.

```typescript
import { isVisibleToScreenReaders } from '@/libs/helpers/accessibility';

const element = document.querySelector('.hidden-element');
const isVisible = isVisibleToScreenReaders(element); // false if aria-hidden="true"
```

**Parameters:**

- `element: HTMLElement` - Element to check

**Returns:** `boolean` - True if visible to screen readers

---

### `validateAriaAttributes(element)`

Validates ARIA attributes for common issues.

```typescript
import { validateAriaAttributes } from '@/libs/helpers/accessibility';

const element = document.querySelector('[aria-labelledby]');
const issues = validateAriaAttributes(element);
// Returns array of validation issues
```

**Parameters:**

- `element: HTMLElement` - Element to validate

**Returns:** `string[]` - Array of validation issues

**Checks:**

- `aria-labelledby` references existing elements
- `aria-describedby` references existing elements
- Interactive elements have accessible names

---

### `validateHeadingHierarchy()`

Validates the heading hierarchy on the current page.

```typescript
import { validateHeadingHierarchy } from '@/libs/helpers/accessibility';

const issues = validateHeadingHierarchy();
// Returns array of heading hierarchy issues
```

**Returns:** `string[]` - Array of heading hierarchy issues

**Checks:**

- Page starts with h1
- No heading levels are skipped
- Logical heading progression

## 📋 Usage Examples

### Form Field with Complete Accessibility

```typescript
import {
  generateA11yId,
  combineAriaDescribedBy,
  announceToScreenReader
} from '@/libs/helpers/accessibility';

const AccessibleInput = ({ label, helperText, error, value, onChange }) => {
  const inputId = generateA11yId('input');
  const helpId = generateA11yId('help');
  const errorId = generateA11yId('error');

  const describedBy = combineAriaDescribedBy(
    helperText ? helpId : undefined,
    error ? errorId : undefined
  );

  const handleChange = (e) => {
    onChange(e.target.value);

    // Announce validation results
    if (error) {
      announceToScreenReader(`Error: ${error}`, 'assertive');
    }
  };

  return (
    <div>
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        value={value}
        onChange={handleChange}
        aria-describedby={describedBy}
        aria-invalid={!!error}
      />
      {helperText && <div id={helpId}>{helperText}</div>}
      {error && <div id={errorId} role="alert">{error}</div>}
    </div>
  );
};
```

### Color Contrast Validation

```typescript
import {
  getContrastRatio,
  meetsWCAGAA,
  getWCAGLevel
} from '@/libs/helpers/color-contrast';

const validateColorScheme = (textColor, backgroundColor) => {
  const ratio = getContrastRatio(textColor, backgroundColor);
  const level = getWCAGLevel(textColor, backgroundColor);
  const isCompliant = meetsWCAGAA(textColor, backgroundColor);

  return {
    ratio: ratio.toFixed(2),
    level,
    isCompliant,
    recommendation: isCompliant
      ? 'Color combination is accessible'
      : 'Consider using higher contrast colors'
  };
};

// Usage
const result = validateColorScheme('#666666', '#ffffff');
console.log(result);
// {
//   ratio: '5.74',
//   level: 'AA',
//   isCompliant: true,
//   recommendation: 'Color combination is accessible'
// }
```

## 🔧 Best Practices

1. **Use unique IDs** - Always use `generateA11yId()` for accessibility IDs
2. **Combine descriptions properly** - Use `combineAriaDescribedBy()` for multiple descriptions
3. **Test color contrast** - Validate all color combinations with contrast utilities
4. **Announce important changes** - Use `announceToScreenReader()` for dynamic updates
5. **Validate regularly** - Use validation functions during development

## 🐛 Troubleshooting

### Color Contrast Issues

- Ensure colors are in supported formats (hex, rgb, hsl)
- Test with actual rendered colors, not just design tokens
- Consider different states (hover, focus, disabled)

### ARIA Reference Issues

- Use `validateAriaAttributes()` to catch broken references
- Ensure referenced elements exist in the DOM
- Check that IDs are unique across the page

### Screen Reader Announcements

- Test announcements with actual screen readers
- Use 'assertive' sparingly - only for critical updates
- Avoid announcing too frequently

---

_For more accessibility resources, see our [main accessibility documentation](./index.md)._
