import React from 'react';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props extends React.ComponentProps<'thead'> {
  /**
   * Use a solid colour for the table head
   */
  solid?: boolean;
}

/**
 * The TableHead component is used to group the body content in a table.
 * It is a wrapper component for the `thead` HTML element with an extra prop to make the header solid.
 */
export const TableHead: React.FC<Props> = ({
  className,
  children,
  solid
}: Props) => (
  <thead
    className={[styles['thead'], solid && styles['solid'], className].join(' ')}
  >
    {children}
  </thead>
);

TableHead.displayName = 'TableHead';

export default TableHead;
