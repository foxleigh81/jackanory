import { forwardRef } from 'react';
import { Icon } from '../icon';

import styles from './styles.module.scss';

/* Types */
export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  /**
   * Text displayed on chip
   */
  text: string;
  /**
   * Custom classname to apply to the chip
   **/
  className?: string;
  /**
   * Set a colour based on status
   * @default 'default'
   */
  status?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /**
   * Delete method called on pressing x
   * Note: if this is not provided, the x will not be displayed
   */
  onDelete?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

/**
 * The Chip component displays a small piece of information with an optional delete button
 */
export const Chip: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
  ({ className, text, status = 'default', onDelete, ...props }: Props, ref) => {
    return (
      <div
        className={[styles['chip'], styles[`status-${status}`], className].join(
          ' '
        )}
        ref={ref}
      >
        <span>{text}</span>
        {onDelete && (
          <button
            type="button"
            className={styles['chip-delete']}
            onClick={onDelete}
            aria-label={`Delete ${text}`}
            {...props}
          >
            <Icon use="close" aria-hidden />
          </button>
        )}
      </div>
    );
  }
);

Chip.displayName = 'Chip';

export default Chip;
