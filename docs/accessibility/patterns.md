# Accessible Design Patterns

Common accessibility patterns and examples for implementing accessible components in the Jackanory Design System.

## 🎛️ Interactive Components

### Modal Dialog Pattern

```typescript
import { useFocusTrap } from '@/libs/hooks';
import { ScreenReaderOnly } from '@/components/utilities';
import { useLiveRegion } from '@/components/utilities/live-region';

const AccessibleModal = ({
  isOpen,
  onClose,
  title,
  children,
  size = 'medium'
}) => {
  const focusTrapRef = useFocusTrap({ isActive: isOpen });
  const { announce } = useLiveRegion();

  useEffect(() => {
    if (isOpen) {
      announce(`${title} dialog opened`);
    }
  }, [isOpen, title, announce]);

  const handleClose = () => {
    announce(`${title} dialog closed`);
    onClose();
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-overlay"
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div
        ref={focusTrapRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        className={`modal-content modal-content--${size}`}
        onKeyDown={handleKeyDown}
      >
        <ScreenReaderOnly id="modal-description">
          Dialog window. Press Escape to close.
        </ScreenReaderOnly>

        <header className="modal-header">
          <h2 id="modal-title">{title}</h2>
          <button
            onClick={handleClose}
            aria-label={`Close ${title} dialog`}
            className="modal-close"
          >
            ×
          </button>
        </header>

        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};
```

### Dropdown Menu Pattern

```typescript
import { useKeyboardNavigation } from '@/libs/hooks';
import { ScreenReaderOnly } from '@/components/utilities';

const DropdownMenu = ({ trigger, items, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { containerRef } = useKeyboardNavigation({
    isEnabled: isOpen,
    orientation: 'vertical',
    onNavigate: (index, element) => {
      // Optional: handle navigation feedback
    }
  });

  const handleKeyDown = (event) => {
    switch (event.key) {
      case 'Escape':
        setIsOpen(false);
        triggerRef.current?.focus();
        break;
      case 'Enter':
      case ' ':
        if (!isOpen) {
          event.preventDefault();
          setIsOpen(true);
        }
        break;
    }
  };

  return (
    <div className="dropdown">
      <button
        ref={triggerRef}
        onClick={() => setIsOpen(!isOpen)}
        onKeyDown={handleKeyDown}
        aria-expanded={isOpen}
        aria-haspopup="menu"
        aria-controls="dropdown-menu"
      >
        {trigger}
        <ScreenReaderOnly>
          {isOpen ? 'Menu expanded' : 'Menu collapsed'}
        </ScreenReaderOnly>
      </button>

      {isOpen && (
        <ul
          id="dropdown-menu"
          ref={containerRef}
          role="menu"
          className="dropdown-menu"
        >
          {items.map((item, index) => (
            <li key={item.id} role="none">
              <button
                role="menuitem"
                tabIndex={index === 0 ? 0 : -1}
                onClick={() => {
                  onSelect(item);
                  setIsOpen(false);
                }}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
```

### Accordion Pattern

```typescript
const AccessibleAccordion = ({ items }) => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (id) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(id)) {
      newOpenItems.delete(id);
    } else {
      newOpenItems.add(id);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div className="accordion">
      {items.map((item, index) => {
        const isOpen = openItems.has(item.id);
        const headingLevel = `h${Math.min(6, 2 + index)}`;

        return (
          <div key={item.id} className="accordion-item">
            <div className="accordion-header" role="heading" aria-level={headingLevel}>
              <button
                onClick={() => toggleItem(item.id)}
                aria-expanded={isOpen}
                aria-controls={`panel-${item.id}`}
                id={`header-${item.id}`}
                className="accordion-trigger"
              >
                {item.title}
                <span aria-hidden="true" className="accordion-icon">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </div>

            <div
              id={`panel-${item.id}`}
              role="region"
              aria-labelledby={`header-${item.id}`}
              className={`accordion-panel ${isOpen ? 'open' : 'closed'}`}
              hidden={!isOpen}
            >
              <div className="accordion-content">
                {item.content}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
```

## 📝 Form Patterns

### Accessible Form with Validation

```typescript
import {
  generateA11yId,
  combineAriaDescribedBy,
  announceToScreenReader
} from '@/libs/helpers/accessibility';

const AccessibleForm = () => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fieldIds = {
    name: generateA11yId('name'),
    email: generateA11yId('email'),
    message: generateA11yId('message')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validationErrors = validateForm(formData);
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        announceToScreenReader(
          `Form has ${Object.keys(validationErrors).length} errors. Please review and correct.`,
          'assertive'
        );
        return;
      }

      await submitForm(formData);
      announceToScreenReader('Form submitted successfully');
      setErrors({});
    } catch (error) {
      announceToScreenReader('Form submission failed. Please try again.', 'assertive');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      <fieldset>
        <legend>Contact Information</legend>

        <ScreenReaderOnly>
          <p>
            This form has {Object.keys(errors).length} errors.
            Required fields are marked with an asterisk.
          </p>
        </ScreenReaderOnly>

        {/* Name Field */}
        <div className="form-field">
          <label htmlFor={fieldIds.name}>
            Full Name
            <span aria-hidden="true">*</span>
            <ScreenReaderOnly>(required)</ScreenReaderOnly>
          </label>
          <input
            id={fieldIds.name}
            type="text"
            required
            value={formData.name || ''}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            aria-describedby={errors.name ? `${fieldIds.name}-error` : undefined}
            aria-invalid={!!errors.name}
          />
          {errors.name && (
            <div id={`${fieldIds.name}-error`} role="alert" className="error">
              {errors.name}
            </div>
          )}
        </div>

        {/* Email Field */}
        <div className="form-field">
          <label htmlFor={fieldIds.email}>
            Email Address
            <span aria-hidden="true">*</span>
            <ScreenReaderOnly>(required)</ScreenReaderOnly>
          </label>
          <input
            id={fieldIds.email}
            type="email"
            required
            value={formData.email || ''}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            aria-describedby={combineAriaDescribedBy(
              `${fieldIds.email}-help`,
              errors.email ? `${fieldIds.email}-error` : undefined
            )}
            aria-invalid={!!errors.email}
          />
          <div id={`${fieldIds.email}-help`} className="help-text">
            We'll never share your email address
          </div>
          {errors.email && (
            <div id={`${fieldIds.email}-error`} role="alert" className="error">
              {errors.email}
            </div>
          )}
        </div>

        {/* Message Field */}
        <div className="form-field">
          <label htmlFor={fieldIds.message}>Message</label>
          <textarea
            id={fieldIds.message}
            value={formData.message || ''}
            onChange={(e) => setFormData({...formData, message: e.target.value})}
            aria-describedby={`${fieldIds.message}-help`}
            rows={4}
          />
          <div id={`${fieldIds.message}-help`} className="help-text">
            Optional: Tell us more about your inquiry
          </div>
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span aria-hidden="true">⏳</span>
              <ScreenReaderOnly>Submitting form, please wait</ScreenReaderOnly>
              Submitting...
            </>
          ) : (
            'Send Message'
          )}
        </button>
      </fieldset>
    </form>
  );
};
```

### Radio Group Pattern

```typescript
const AccessibleRadioGroup = ({
  name,
  legend,
  options,
  value,
  onChange,
  error
}) => {
  const groupId = generateA11yId('radio-group');
  const errorId = generateA11yId('error');

  return (
    <fieldset
      className="radio-group"
      aria-describedby={error ? errorId : undefined}
      aria-invalid={!!error}
    >
      <legend>{legend}</legend>

      {options.map((option, index) => {
        const optionId = `${groupId}-${option.value}`;

        return (
          <div key={option.value} className="radio-option">
            <input
              id={optionId}
              type="radio"
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={(e) => onChange(e.target.value)}
            />
            <label htmlFor={optionId}>
              {option.label}
              {option.description && (
                <span className="option-description">
                  {option.description}
                </span>
              )}
            </label>
          </div>
        );
      })}

      {error && (
        <div id={errorId} role="alert" className="error">
          {error}
        </div>
      )}
    </fieldset>
  );
};
```

## 📊 Data Display Patterns

### Accessible Data Table

```typescript
const AccessibleDataTable = ({
  data,
  columns,
  caption,
  sortable = false,
  onSort
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (columnKey) => {
    if (!sortable) return;

    const direction =
      sortConfig.key === columnKey && sortConfig.direction === 'asc'
        ? 'desc'
        : 'asc';

    setSortConfig({ key: columnKey, direction });
    onSort?.(columnKey, direction);

    announceToScreenReader(
      `Table sorted by ${columnKey} in ${direction}ending order`
    );
  };

  return (
    <div className="table-container">
      <ScreenReaderOnly>
        <p>
          Data table with {data.length} rows and {columns.length} columns.
          {sortable && ' Column headers are sortable.'}
        </p>
      </ScreenReaderOnly>

      <table className="data-table">
        <caption>
          {caption}
          <ScreenReaderOnly>
            {sortable &&
              ' Use Enter or Space to sort columns. Current sort: ' +
              (sortConfig.key ? `${sortConfig.key} ${sortConfig.direction}ending` : 'none')
            }
          </ScreenReaderOnly>
        </caption>

        <thead>
          <tr>
            {columns.map((column) => (
              <th
                key={column.key}
                scope="col"
                className={sortable ? 'sortable' : ''}
                aria-sort={
                  sortConfig.key === column.key
                    ? sortConfig.direction === 'asc' ? 'ascending' : 'descending'
                    : 'none'
                }
              >
                {sortable ? (
                  <button
                    onClick={() => handleSort(column.key)}
                    className="sort-button"
                  >
                    {column.label}
                    <span aria-hidden="true" className="sort-indicator">
                      {sortConfig.key === column.key
                        ? (sortConfig.direction === 'asc' ? ' ↑' : ' ↓')
                        : ' ↕'
                      }
                    </span>
                  </button>
                ) : (
                  column.label
                )}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={row.id || rowIndex}>
              {columns.map((column) => (
                <td key={column.key}>
                  {column.render ? column.render(row[column.key], row) : row[column.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
```

## 🔄 Loading and Status Patterns

### Accessible Loading States

```typescript
const LoadingStates = () => {
  return (
    <div>
      {/* Button Loading State */}
      <button disabled={isLoading}>
        {isLoading ? (
          <>
            <span aria-hidden="true" className="spinner">⏳</span>
            <ScreenReaderOnly>Loading, please wait</ScreenReaderOnly>
            Loading...
          </>
        ) : (
          'Submit'
        )}
      </button>

      {/* Page Loading State */}
      {isLoading && (
        <div role="status" aria-live="polite" className="page-loading">
          <ScreenReaderOnly>Loading page content, please wait</ScreenReaderOnly>
          <div aria-hidden="true" className="loading-animation">
            Loading...
          </div>
        </div>
      )}

      {/* Progress Indicator */}
      <div role="progressbar" aria-valuenow={progress} aria-valuemin="0" aria-valuemax="100">
        <ScreenReaderOnly>{progress}% complete</ScreenReaderOnly>
        <div className="progress-bar" style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};
```

### Error and Success Messages

```typescript
import { useLiveRegion } from '@/components/utilities/live-region';

const StatusMessages = ({ type, message, onDismiss }) => {
  const { announce } = useLiveRegion();

  useEffect(() => {
    if (message) {
      announce(message, { politeness: type === 'error' ? 'assertive' : 'polite' });
    }
  }, [message, type, announce]);

  if (!message) return null;

  return (
    <div
      role={type === 'error' ? 'alert' : 'status'}
      className={`status-message status-message--${type}`}
    >
      <span aria-hidden="true" className="status-icon">
        {type === 'error' ? '❌' : type === 'success' ? '✅' : 'ℹ️'}
      </span>
      <span className="status-text">{message}</span>
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label={`Dismiss ${type} message`}
          className="dismiss-button"
        >
          ×
        </button>
      )}
    </div>
  );
};
```

## 🎯 Best Practices Summary

1. **Always provide context** - Use ScreenReaderOnly for additional information
2. **Manage focus properly** - Use focus traps and restoration
3. **Announce changes** - Use live regions for dynamic updates
4. **Use semantic HTML** - Start with proper HTML structure
5. **Test with real users** - Validate with actual assistive technology users

---

_For more accessibility resources, see our [main accessibility documentation](./index.md)._
