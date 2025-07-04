import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props extends React.HTMLAttributes<HTMLTableRowElement> {
  /**
   * True if the row is active; otherwise, false.
   */
  active?: boolean;
}

/**
 * The TableRow component is used to group the body content in a table.
 * It is a wrapper component for the `tr` HTML element.
 */
export const TableRow = React.forwardRef<HTMLTableRowElement, Props>(
  ({ children, active, onClick, ...props }: Props, ref) => (
    <tr
      ref={ref}
      className={[
        styles['table-row'],
        {
          [styles['active']]: active,
          [styles['selectable']]: onClick
        }
      ].join(' ')}
      aria-selected={active ? 'true' : undefined}
      onClick={onClick}
      {...props}
    >
      {children}
    </tr>
  )
);

TableRow.displayName = 'TableRow';

export default TableRow;
