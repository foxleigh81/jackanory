# Accessibility Testing Guide

Comprehensive guide for testing accessibility in the Jackanory Design System, covering both automated and manual testing approaches.

## 🤖 Automated Testing

### Storybook Accessibility Testing

Storybook provides excellent built-in accessibility testing through the a11y addon.

#### Setting Up Storybook a11y Addon

```bash
npm install --save-dev @storybook/addon-a11y
```

Add to your `.storybook/main.js`:

```javascript
module.exports = {
  addons: ['@storybook/addon-a11y']
};
```

#### Using in Stories

```typescript
export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    a11y: {
      // Configure axe-core rules
      config: {
        rules: {
          'color-contrast': { enabled: true },
          'keyboard-navigation': { enabled: true }
        }
      }
    }
  }
};

export const Default = {
  args: {
    children: 'Click me'
  }
};

export const WithAccessibilityIssue = {
  args: {
    children: 'Click me',
    style: { color: '#ccc', backgroundColor: '#ddd' } // Poor contrast
  },
  parameters: {
    a11y: {
      // This story intentionally has issues for demonstration
      disable: false
    }
  }
};
```

### Browser-Based Testing

#### axe DevTools Extension

Install the axe DevTools browser extension for manual testing:

- **Chrome**: [axe DevTools](https://chrome.google.com/webstore/detail/axe-devtools-web-accessib/lhdoppojpmngadmnindnejefpokejbdd)
- **Firefox**: [axe DevTools](https://addons.mozilla.org/en-US/firefox/addon/axe-devtools/)

#### Using axe DevTools

1. Open your component in Storybook
2. Open browser DevTools
3. Navigate to the "axe DevTools" tab
4. Click "Scan ALL of my page" to run accessibility tests
5. Review and fix any issues found

#### Lighthouse Accessibility Audit

Use Chrome DevTools Lighthouse for accessibility auditing:

1. Open DevTools (F12)
2. Go to "Lighthouse" tab
3. Select "Accessibility" category
4. Click "Generate report"
5. Review the accessibility score and recommendations

## 🖱️ Manual Testing

### Keyboard Navigation Testing

#### Basic Keyboard Tests

1. **Tab Navigation**
   - Press `Tab` to move forward through interactive elements
   - Press `Shift + Tab` to move backward
   - Verify logical tab order
   - Ensure all interactive elements are reachable

2. **Arrow Key Navigation**
   - Test arrow keys in components like tabs, menus, and lists
   - Verify `Home` and `End` keys work where appropriate
   - Check that arrow keys don't scroll the page unexpectedly

3. **Action Keys**
   - `Enter` and `Space` should activate buttons and links
   - `Escape` should close modals and dropdowns
   - Verify component-specific keyboard shortcuts

#### Keyboard Testing Checklist

```markdown
## Keyboard Navigation Checklist

### Tab Order

- [ ] Tab order is logical and intuitive
- [ ] All interactive elements are keyboard accessible
- [ ] No keyboard traps exist
- [ ] Skip links work correctly

### Focus Indicators

- [ ] Focus indicators are clearly visible
- [ ] Focus indicators have sufficient contrast (3:1 minimum)
- [ ] Focus indicators work in high contrast mode

### Keyboard Shortcuts

- [ ] Enter/Space activate buttons and links
- [ ] Escape closes modals and dropdowns
- [ ] Arrow keys work in appropriate components
- [ ] Home/End keys work where expected

### Component-Specific

- [ ] Modals trap focus correctly
- [ ] Dropdowns can be navigated with arrow keys
- [ ] Tabs can be navigated with arrow keys
- [ ] Forms can be completed entirely with keyboard
```

### Screen Reader Testing

#### Recommended Screen Readers

- **Windows**: NVDA (free), JAWS
- **macOS**: VoiceOver (built-in)
- **Linux**: Orca
- **Mobile**: TalkBack (Android), VoiceOver (iOS)

#### Screen Reader Testing Process

1. **Turn on screen reader**
2. **Navigate with screen reader commands** (not just Tab key)
3. **Listen to announcements** - don't look at the screen
4. **Test all functionality** using only audio feedback

#### Screen Reader Testing Checklist

```markdown
## Screen Reader Testing Checklist

### Content Structure

- [ ] Headings are announced with correct levels
- [ ] Lists are announced as lists with item counts
- [ ] Tables have proper headers and captions
- [ ] Landmarks (main, nav, aside) are identified

### Interactive Elements

- [ ] Buttons are announced as buttons with clear names
- [ ] Links are announced as links with descriptive text
- [ ] Form controls have clear labels and descriptions
- [ ] Current state is announced (selected, expanded, etc.)

### Dynamic Content

- [ ] Status changes are announced appropriately
- [ ] Error messages are announced immediately
- [ ] Loading states are communicated
- [ ] Live regions work correctly

### Navigation

- [ ] Page structure is clear and navigable
- [ ] Skip links are available and functional
- [ ] Breadcrumbs are clear and helpful
- [ ] Search functionality is accessible
```

### Visual Testing

#### High Contrast Mode Testing

**Windows High Contrast:**

1. Press `Left Alt + Left Shift + Print Screen`
2. Or go to Settings > Ease of Access > High contrast
3. Test all components in high contrast mode

**Browser Extensions:**

- High Contrast (Chrome)
- Dark Reader (various browsers)

#### Color and Contrast Testing

**Tools:**

- WebAIM Contrast Checker
- Colour Contrast Analyser
- Browser DevTools contrast checking

**Testing Process:**

1. Check all text/background combinations
2. Verify focus indicators have sufficient contrast
3. Test with different color vision simulations
4. Ensure information isn't conveyed by color alone

#### Zoom and Magnification Testing

1. **Test at 200% zoom** - content should remain functional
2. **Test at 400% zoom** - content should be readable
3. **Test with screen magnifiers** if available
4. **Verify responsive behavior** at different zoom levels

### Mobile Accessibility Testing

#### Touch Target Testing

- Minimum touch target size: 44x44 pixels
- Adequate spacing between touch targets
- Test with different finger sizes

#### Mobile Screen Reader Testing

**iOS VoiceOver:**

1. Settings > Accessibility > VoiceOver
2. Use swipe gestures to navigate
3. Double-tap to activate elements

**Android TalkBack:**

1. Settings > Accessibility > TalkBack
2. Use explore by touch
3. Double-tap to activate elements

## 🔧 Testing Tools and Setup

### Browser Extensions

- **axe DevTools** - Comprehensive accessibility testing
- **WAVE** - Web accessibility evaluation
- **Lighthouse** - Includes accessibility audit
- **Color Oracle** - Color blindness simulator

### Desktop Tools

- **Colour Contrast Analyser** - Color contrast testing
- **Screen Reader** - NVDA (Windows), VoiceOver (macOS)
- **Keyboard Navigation Tester** - Custom testing tools

### Online Tools

- **WebAIM WAVE** - Web accessibility evaluation
- **WebAIM Contrast Checker** - Color contrast testing
- **Accessible Colors** - Color palette accessibility
- **Hemingway Editor** - Readability testing

## 📋 Testing Workflows

### Development Workflow

1. **Write component** with accessibility in mind
2. **Test in Storybook** with a11y addon enabled
3. **Test with keyboard** navigation
4. **Check with screen reader** if possible
5. **Validate color contrast** using browser tools
6. **Test in high contrast mode**

### Pre-Release Workflow

1. **Storybook accessibility review** with a11y addon
2. **Manual keyboard testing** of all functionality
3. **Screen reader testing** with multiple screen readers
4. **High contrast mode testing**
5. **Mobile accessibility testing**
6. **User testing** with people with disabilities (when possible)

### Continuous Testing

1. **Storybook a11y checks** in development
2. **Regular manual testing** schedule
3. **Accessibility reviews** for new features
4. **User feedback** collection and response

## 🐛 Common Issues and Solutions

### Focus Management Issues

**Problem**: Focus disappears or goes to wrong element
**Solution**:

- Use `useFocusTrap` hook for modals
- Implement proper focus restoration
- Test tab order thoroughly

### Screen Reader Issues

**Problem**: Content not announced correctly
**Solution**:

- Add proper ARIA labels and descriptions
- Use semantic HTML elements
- Test with actual screen readers

### Color Contrast Issues

**Problem**: Text doesn't meet contrast requirements
**Solution**:

- Use our color contrast utilities
- Test with contrast checking tools
- Provide high contrast mode support

### Keyboard Navigation Issues

**Problem**: Elements not keyboard accessible
**Solution**:

- Ensure proper `tabindex` management
- Add keyboard event handlers
- Use our keyboard navigation hooks

---

_For more accessibility resources, see our [main accessibility documentation](./index.md)._
