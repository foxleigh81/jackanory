import React from 'react';

import { useToast } from './helpers/use-toast';
import { ProgressBar } from './components/progress-bar';
import { Icon, IconTypes } from '../../data-display/icon';
import { Button } from '../../data-input/button';

import styles from './styles.module.scss';

export interface ToastProps {
  /**
   * The id of the toast.
   */
  toastId: number | string;
  /**
   * If the toast is visible or not.
   * @default false
   */
  isVisible?: boolean;
  /**
   * Should the toast pause on focus loss.
   */
  pauseOnFocusLoss: boolean;
  /**
   * Should the toast pause on hover.
   */
  pauseOnHover: boolean;
  /**
   * Should the toast close on click.
   */
  closeOnClick: boolean;
  /**
   * The type of the toast.
   * @default 'default'
   */
  type?: 'success' | 'error' | 'warning' | 'info' | 'default';
  /**
   * The delay in milliseconds to auto close the toast.
   */
  autoClose: number | false;
  /**
   * The function to call when closing the toast.
   */
  closeToast: () => void;
}

export interface CloseButton {
  /**
   * The type of the toast.
   */
  type: ToastProps['type'];
  /**
   * The function to close the toast.
   */
  closeToast: () => void;
}

export interface Toast {
  content: React.ReactNode | ((props: ToastProps) => React.ReactNode);
  props: ToastProps;
}

interface Props extends ToastProps, React.PropsWithChildren<object> {}
/**
 * A toast unobtrusive window element used to briefly display information to the user.
 */
export const Toast: React.FC<Props> = (props: Props) => {
  const {
    children,
    isVisible = false,
    closeToast,
    autoClose,
    type = 'default',
    closeOnClick
  } = props;
  const { toastRef, isRunning, eventHandlers } = useToast(props);

  if (!isVisible) {
    return null;
  }

  return (
    <div
      ref={toastRef}
      className={[
        styles['toast'],
        styles[type],
        closeOnClick && styles['cursor-pointer']
      ]
        .filter(Boolean)
        .join(' ')}
      {...eventHandlers}
      role="alert"
      aria-live={type === 'success' ? 'polite' : 'assertive'}
    >
      <div className={styles['toast-container']}>
        {type !== 'default' && (
          <Icon use={type as IconTypes} className={styles['toast-icon']} />
        )}

        <div
          className={[styles['toast-content'], styles[type]]
            .filter(Boolean)
            .join(' ')}
        >
          {children}
        </div>
        {closeToast && (
          <Button
            className={styles['toast-close-button']}
            transparent
            icon="close"
            hideLabel
            onClick={closeToast}
            label="Close"
          />
        )}
      </div>
      {autoClose && (
        <ProgressBar
          delay={autoClose as number}
          isRunning={isRunning}
          isVisible={isVisible}
          closeToast={closeToast}
          type={type}
        />
      )}
    </div>
  );
};

Toast.displayName = 'Toast';

export default Toast;
