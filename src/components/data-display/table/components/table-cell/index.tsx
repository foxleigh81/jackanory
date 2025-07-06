import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props extends React.ComponentProps<'td'> {
  /**
   * Forces the cell to output a 'th' instead of a 'td'
   */
  th?: boolean;
  /**
   * Scope for header cells (col, row, colgroup, rowgroup)
   */
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
  /**
   * Headers attribute for associating data cells with header cells
   */
  headers?: string;
}

/**
 * The 'TableCell' component is a component that is used to display a cell in a table.
 */
export const TableCell: React.FC<Props> = ({
  className,
  children,
  th,
  scope,
  headers,
  ...props
}: Props) => {
  const TagChooser = th ? 'th' : 'td';

  return (
    <TagChooser
      className={[styles['table-cell'], th && styles['th'], className]
        .filter(Boolean)
        .join(' ')}
      scope={th ? scope : undefined}
      headers={!th ? headers : undefined}
      {...props}
    >
      {children}
    </TagChooser>
  );
};

TableCell.displayName = 'TableCell';

export default TableCell;
