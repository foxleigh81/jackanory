# Accessibility Hooks

React hooks designed to make accessibility implementation easier and more consistent across the design system.

## 🎯 Focus Management Hooks

### `useFocusTrap`

Traps focus within a container element, commonly used for modals and dialogs.

```typescript
import { useFocusTrap } from '@/libs/hooks/use-focus-trap';

const Modal = ({ isOpen, onClose }) => {
  const focusTrapRef = useFocusTrap({
    isActive: isOpen,
    returnFocusElement: triggerButtonRef.current,
    focusFirstElement: true
  });

  return (
    <div ref={focusTrapRef} role="dialog" aria-modal="true">
      {/* Modal content */}
    </div>
  );
};
```

**Options:**

- `isActive: boolean` - Whether the focus trap is active
- `returnFocusElement?: HTMLElement` - Element to return focus to when deactivated
- `focusFirstElement?: boolean` - Whether to focus the first element when activated (default: true)

**Returns:** `RefObject<HTMLElement>` - Ref to attach to the container element

---

### `useFocusRestoration`

Manages focus restoration when components are mounted/unmounted.

```typescript
import { useFocusRestoration } from '@/libs/hooks/use-focus-restoration';

const Dropdown = ({ isOpen }) => {
  const { restoreFocus, getRestoreElement } = useFocusRestoration({
    isActive: isOpen,
    restoreOnUnmount: true
  });

  const handleClose = () => {
    setIsOpen(false);
    restoreFocus(); // Manually restore focus
  };

  return (
    // Dropdown content
  );
};
```

**Options:**

- `isActive: boolean` - Whether focus restoration is active
- `restoreElement?: HTMLElement` - Specific element to restore focus to
- `restoreOnUnmount?: boolean` - Whether to restore focus on unmount (default: true)

**Returns:**

- `restoreFocus: () => void` - Manually restore focus
- `getRestoreElement: () => HTMLElement | null` - Get the element focus will be restored to

---

### `useKeyboardNavigation`

Provides arrow key navigation within a container.

```typescript
import { useKeyboardNavigation } from '@/libs/hooks/use-keyboard-navigation';

const TabList = ({ tabs }) => {
  const { containerRef, navigateToIndex, focusFirst } = useKeyboardNavigation({
    isEnabled: true,
    orientation: 'horizontal',
    useArrowKeys: true,
    useHomeEnd: true,
    wrap: true,
    onNavigate: (index, element) => {
      console.log(`Navigated to tab ${index}`);
    }
  });

  return (
    <div ref={containerRef} role="tablist">
      {tabs.map((tab, index) => (
        <button key={tab.id} role="tab" tabIndex={index === 0 ? 0 : -1}>
          {tab.label}
        </button>
      ))}
    </div>
  );
};
```

**Options:**

- `isEnabled: boolean` - Whether keyboard navigation is enabled
- `useArrowKeys?: boolean` - Enable arrow key navigation (default: true)
- `useHomeEnd?: boolean` - Enable Home/End key navigation (default: true)
- `wrap?: boolean` - Whether navigation wraps around (default: true)
- `orientation?: 'horizontal' | 'vertical' | 'both'` - Navigation direction (default: 'horizontal')
- `onNavigate?: (index: number, element: HTMLElement) => void` - Callback when navigation occurs
- `focusableSelector?: string` - Custom selector for focusable elements

**Returns:**

- `containerRef: RefObject<HTMLElement>` - Ref for the container
- `navigateToIndex: (index: number) => void` - Navigate to specific index
- `getCurrentIndex: () => number` - Get current focused element index
- `getFocusableElements: () => HTMLElement[]` - Get all focusable elements
- `focusFirst: () => void` - Focus the first element
- `focusLast: () => void` - Focus the last element

## 📋 Usage Examples

### Complete Modal with Accessibility

```typescript
import {
  useFocusTrap,
  useFocusRestoration
} from '@/libs/hooks';

const AccessibleModal = ({ isOpen, onClose, children }) => {
  const focusTrapRef = useFocusTrap({
    isActive: isOpen,
    focusFirstElement: true
  });

  const { restoreFocus } = useFocusRestoration({
    isActive: isOpen,
    restoreOnUnmount: true
  });

  const handleClose = () => {
    onClose();
    restoreFocus();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        className="modal-content"
      >
        <button onClick={handleClose} aria-label="Close modal">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
```

## 🔧 Best Practices

1. **Always provide fallbacks** for when hooks return null or undefined
2. **Test with keyboard navigation** to ensure hooks work as expected
3. **Combine hooks thoughtfully** - some hooks work better together
4. **Respect user preferences** - always honor reduced motion settings
5. **Test with screen readers** to verify focus management works correctly

## 🐛 Troubleshooting

### Focus Trap Not Working

- Ensure the container has focusable elements
- Check that `isActive` is properly controlled
- Verify the container ref is attached correctly

### Keyboard Navigation Issues

- Confirm focusable elements match the expected selector
- Check that `tabIndex` is properly managed
- Ensure event handlers don't interfere with navigation

### Reduced Motion Not Detected

- Test in browsers that support `prefers-reduced-motion`
- Check system settings for motion preferences
- Verify media query support in the target environment

---

_For more accessibility resources, see our [main accessibility documentation](./index.md)._
