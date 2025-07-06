import {
  useState,
  useEffect,
  useCallback,
  RefObject,
  ComponentPropsWithoutRef,
  useMemo
} from 'react';
import { createPortal } from 'react-dom';

import Button from '../../data-input/button';
import { useFocusTrap } from '@/libs/hooks/use-focus-trap';
import { useFocusRestoration } from '@/libs/hooks/use-focus-restoration';

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
   * Optional modal description for accessibility
   */
  modalDescription?: string;
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

/**
 * The 'Modal' component displays content over the top of the app and blocks other actions.
 */
const Modal = ({
  isOpen,
  isAlert = false,
  onDismiss,
  className,
  modalName,
  modalDescription,
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

  // Use the new focus management hooks
  const focusTrapRef = useFocusTrap({
    isActive: open,
    returnFocusElement: returnFocusElementRef?.current,
    focusFirstElement: true
  });

  useFocusRestoration({
    isActive: open,
    restoreElement: returnFocusElementRef?.current,
    restoreOnUnmount: true
  });

  const onDismissHandler = useCallback(() => {
    setOpen(false);
    if (onDismiss) {
      onDismiss();
    }
  }, [onDismiss]);

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
      document.addEventListener('keydown', handleKeyDown);
    } else {
      document.removeEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open, handleKeyDown]);

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
      <div
        className={styles['content']}
        aria-modal="true"
        role={dialogRole}
        aria-label={modalName}
        aria-describedby={modalDescription ? 'modal-description' : undefined}
        tabIndex={-1}
        ref={focusTrapRef as React.RefObject<HTMLDivElement>}
      >
        {modalDescription && (
          <div id="modal-description" className={styles['sr-only']}>
            {modalDescription}
          </div>
        )}
        {children}
      </div>
    </div>
  );

  return open ? createPortal(ModalContent, document.body) : null;
};

Modal.displayName = 'Modal';

export default Modal;
