import {
  useState,
  useEffect,
  useRef,
  useCallback,
  RefObject,
  ComponentPropsWithoutRef,
  FocusEvent,
  useMemo
} from 'react';
import { createPortal } from 'react-dom';

import Button from '../../data-input/button';

/* Import Stylesheet */
import styles from './styles.module.scss';

export interface Props extends ComponentPropsWithoutRef<'section'> {
  /**
   * Is the modal open?
   * @default false
   */
  isOpen?: boolean;
  /**
   * Is the modal an alert?
   * @default false
   */
  isAlert?: boolean;
  /**
   * The onDismiss function to call when the modal is closed
   */
  onDismiss?: () => void;
  /**
   * Modal name for accessibility
   */
  modalName: string;
  /**
   * The optional size of the modal.
   * @default 'md'
   */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /**
   * The optional element to return focus to.
   */
  returnFocusElementRef?: RefObject<HTMLElement | null>;
}

// https://github.com/focus-trap/tabbable used as reference for focusable elements
const focusableElements = [
  'button:not([disabled])',
  '[href]',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  /* Block any tabindex value above 0 as it will break our focus trap
   * and tabindex values greater than 0 are considered bad for accessibility (see: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/tabindex)
   */
  '[tabindex="0"]',
  'audio[controls]',
  'video[controls]',
  '[contenteditable]:not([contenteditable="false"])'
].join(',');

/**
 * The 'Modal' component displays content over the top of the app and blocks other actions.
 */
const Modal = ({
  isOpen,
  isAlert = false,
  onDismiss,
  className,
  modalName,
  size = 'md',
  returnFocusElementRef,
  children
}: Props) => {
  const [open, setOpen] = useState(false);

  const dialogRole = useMemo(
    () => (isAlert ? 'alertdialog' : 'dialog'),
    [isAlert]
  );
  const modalStyle = useMemo(
    () =>
      [styles['modal'], styles[`size-${size}`], className]
        .filter(Boolean)
        .join(' '),
    [size, className]
  );

  const modalRef = useRef<HTMLDivElement>(null);
  const lastFocusedElementBeforeModal = useRef<HTMLElement | null>(null);
  const firstFocusableElementRef = useRef<HTMLElement>(null);
  const lastFocusableElementRef = useRef<HTMLElement>(null);

  const getFocusableElementsInModal = useCallback((): HTMLElement[] => {
    // Ignore the focus guards, we are not counting them as focusable elements
    return Array.from(
      modalRef.current?.querySelectorAll<HTMLElement>(focusableElements)
    ).filter((el) => !el.hasAttribute('data-focus-guard'));
  }, []);

  /**
   * 💂 When a guard gets focus it redirects it to an element inside the modal, trapping focus.
   * If no focusable elements exists, focus remains on the modal
   */
  const handleFocusGuard = useCallback(
    (event: FocusEvent<HTMLElement>) => {
      const guardPosition = event.target.getAttribute('data-focus-guard');

      if (guardPosition === 'top') {
        if (lastFocusableElementRef.current) {
          lastFocusableElementRef.current.focus();
        } else if (modalRef.current) {
          modalRef.current.focus();
        }
      }

      if (guardPosition === 'bottom') {
        if (firstFocusableElementRef.current) {
          firstFocusableElementRef.current.focus();
        } else if (modalRef.current) {
          modalRef.current.focus();
        }
      }
    },
    [lastFocusableElementRef, firstFocusableElementRef, modalRef]
  );

  const onDismissHandler = useCallback(() => {
    setOpen(false);
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);

  const restoreFocus = useCallback(() => {
    if (returnFocusElementRef?.current) {
      returnFocusElementRef.current.focus();
    } else {
      lastFocusedElementBeforeModal.current?.focus();
    }
  }, [returnFocusElementRef]);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      switch (event.key) {
        case 'Escape':
        case 'Esc':
          event.preventDefault();
          onDismissHandler();
          break;
        default:
          return;
      }
    },
    [onDismissHandler]
  );

  useEffect(() => {
    setOpen(isOpen || false);
  }, [isOpen]);

  useEffect(() => {
    if (open) {
      const activeElement = document.activeElement;
      lastFocusedElementBeforeModal.current =
        activeElement instanceof HTMLElement ? activeElement : null;

      document.addEventListener('keydown', handleKeyDown);

      const focusableElementsInModal = getFocusableElementsInModal();
      if (focusableElementsInModal.length) {
        // Store the first focusable element, the bottom guard will pass focus to this
        const firstFocusableElement = focusableElementsInModal[0];
        firstFocusableElementRef.current = firstFocusableElement;
        firstFocusableElement.focus();

        // Store the last focusable element, the top guard will pass focus to this
        const lastFocusableElement =
          focusableElementsInModal[focusableElementsInModal.length - 1];
        lastFocusableElementRef.current = lastFocusableElement;
      } else if (modalRef.current) {
        modalRef.current.focus();
      }
    } else {
      document.removeEventListener('keydown', handleKeyDown);
      restoreFocus();
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      restoreFocus();
    };
  }, [
    open,
    handleKeyDown,
    restoreFocus,
    getFocusableElementsInModal,
    modalRef
  ]);

  const ModalContent = (
    <div data-testid="modal" className={modalStyle}>
      <Button
        className={styles['close']}
        onClick={onDismissHandler}
        icon="close"
        circular
        small
        hideLabel
        label="Close"
      />
      {/* aria-hidden on these focusable elements is acceptable here: the focus guards are purely 
            functional for focus trapping, never intended for user interaction,
            and immediately redirect focus programmatically when activated */}
      <div
        tabIndex={0}
        data-focus-guard="top"
        aria-hidden="true"
        onFocus={handleFocusGuard}
      />
      <div
        className={styles['content']}
        aria-modal="true"
        role={dialogRole}
        aria-label={modalName}
        tabIndex={-1}
        ref={modalRef}
      >
        {children}
      </div>
      <div
        tabIndex={0}
        data-focus-guard="bottom"
        aria-hidden="true"
        onFocus={handleFocusGuard}
      />
    </div>
  );

  return open ? createPortal(ModalContent, document.body) : null;
};

Modal.displayName = 'Modal';

export default Modal;
