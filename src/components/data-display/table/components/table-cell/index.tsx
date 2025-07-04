import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props extends React.ComponentProps<'td'> {
  /**
   * Forces the cell to output a 'th' instead of a 'td'
   */
  th?: boolean;
}

/**
 * The 'TableCell' component is a component that is used to display a cell in a table.
 */
export const TableCell: React.FC<Props> = ({
  className,
  children,
  th,
  ...props
}: Props) => {
  const TagChooser = th ? 'th' : 'td';

  return (
    <TagChooser
      className={[styles['table-cell'], th && styles['th'], className]
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      {children}
    </TagChooser>
  );
};

TableCell.displayName = 'TableCell';

export default TableCell;
