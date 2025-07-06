# Accessibility Documentation

The Jackanory Design System is built with accessibility as a core principle, following WCAG 2.1 AA standards to ensure our components are usable by everyone, including people with disabilities.

## 📚 Documentation Structure

### Core Concepts

- [**Accessibility Statement**](./accessibility-statement.md) - Our commitment to accessibility
- [**WCAG Compliance**](./wcag-compliance.md) - Standards we follow and how we meet them
- [**Accessibility Guidelines**](./guidelines.md) - Best practices for using our components

### Implementation Guides

- [**Hooks Reference**](./hooks.md) - Accessibility-focused React hooks
- [**Helper Functions**](./helpers.md) - Utility functions for accessibility
- [**SCSS Utilities**](./scss-utilities.md) - Styling utilities for accessible design
- [**Component Utilities**](./component-utilities.md) - Reusable accessibility components

### Testing & Quality Assurance

- [**Testing Guide**](./testing.md) - How to test for accessibility using Storybook and browser tools

### Resources

- [**Common Patterns**](./patterns.md) - Accessible design patterns and examples
- [**Troubleshooting**](./troubleshooting.md) - Common issues and solutions
- [**External Resources**](./resources.md) - Links to accessibility tools and references

## 🎯 Quick Start

### For Developers

1. **Use our accessibility hooks** for focus management and keyboard navigation
2. **Apply SCSS utilities** for high contrast and reduced motion support
3. **Test components** in Storybook with the a11y addon
4. **Follow our guidelines** for keyboard navigation and screen reader support

### For Designers

1. **Check color contrast** using our contrast utilities
2. **Design for keyboard navigation** with clear focus indicators
3. **Consider motion sensitivity** with reduced motion alternatives
4. **Test with assistive technology** using our testing guides

### For Content Creators

1. **Write descriptive alt text** for images
2. **Use proper heading hierarchy** (h1, h2, h3...)
3. **Provide clear labels** for form inputs
4. **Test content** with screen readers

## 🔧 Key Features

### ✅ **ARIA Support**

- Comprehensive ARIA attributes on all interactive components
- Live regions for dynamic content announcements
- Proper labeling and descriptions

### ✅ **Focus Management**

- Focus trapping in modals and dialogs
- Keyboard navigation with arrow keys
- Skip links for efficient navigation
- Visible focus indicators

### ✅ **Color & Contrast**

- WCAG AA compliant color combinations
- High contrast mode support
- Color-blind friendly alternatives

### ✅ **Motion & Animation**

- Respects `prefers-reduced-motion` setting
- Safe animation utilities
- Alternative static presentations

### ✅ **Screen Reader Support**

- Semantic HTML structure
- Descriptive alternative text
- Proper form associations
- Status announcements

### ✅ **Keyboard Navigation**

- All interactive elements keyboard accessible
- Logical tab order
- Arrow key navigation where appropriate
- Keyboard shortcuts for complex components

## 🚀 Getting Started

```typescript
// Import accessibility hooks
import { useFocusTrap, useKeyboardNavigation } from '@/libs/hooks';

// Import helper functions
import { getContrastRatio, announceToScreenReader } from '@/libs/helpers';

// Import utility components
import { ScreenReaderOnly, SkipLink, LiveRegion } from '@/components/utilities';
```

## 📊 Compliance Status

| WCAG 2.1 Level | Status      | Coverage |
| -------------- | ----------- | -------- |
| Level A        | ✅ Complete | 100%     |
| Level AA       | ✅ Complete | 100%     |
| Level AAA      | 🔄 Partial  | 85%      |

## 🤝 Contributing

When contributing to the design system, please:

1. **Test accessibility** using Storybook a11y addon and browser tools
2. **Follow our guidelines** for accessible component development
3. **Update documentation** when adding new accessibility features
4. **Consider all users** in your design and implementation decisions

## 📞 Support

If you need help with accessibility implementation or have questions about our accessibility features:

- Check our [Troubleshooting Guide](./troubleshooting.md)
- Review our [Common Patterns](./patterns.md)
- Consult our [Testing Guide](./testing.md)
