import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

export interface Props extends React.HTMLAttributes<HTMLLIElement> {
  /**
   * If the item is active.
   */
  isActive?: boolean;
  /**
   * The event handler for the click event.
   */
  onClick?: React.MouseEventHandler<HTMLElement>;
  /**
   * What type of list is this item in?
   * @default 'none'
   */
  type?: 'ordered' | 'unordered' | 'none';
  /**
   * Is this item loading?
   * @default false
   */
  isLoading?: boolean;
}

/**
 * ListItem is a single item in the List component it accepts any ReactNode as children to allow for complex content.
 */
export const ListItem = React.forwardRef<HTMLLIElement, Props>(
  (
    { onClick, isActive, type = 'none', isLoading, children, ...props }: Props,
    ref
  ) => {
    return (
      <li
        className={[
          styles['list-item'],
          isActive ? styles['is-active'] : '',
          onClick ? styles['is-clickable'] : '',
          type !== 'none' ? styles[`in-${type}-list`] : '',
          isLoading ? styles['is-loading'] : ''
        ]
          .filter(Boolean)
          .join(' ')}
        role="listitem"
        ref={ref}
        aria-busy={isLoading}
        {...props}
      >
        {onClick ? (
          <button className={styles['inner']} onClick={onClick}>
            {children}
          </button>
        ) : (
          <span className={styles['inner']}>{children}</span>
        )}
      </li>
    );
  }
);

ListItem.displayName = 'ListItem';

export default ListItem;
