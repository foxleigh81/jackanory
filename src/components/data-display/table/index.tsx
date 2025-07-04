import React from 'react';

import TableHead from './components/table-head';
import TableBody from './components/table-body';
import TableRow from './components/table-row';
import TableCell from './components/table-cell';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props extends React.ComponentProps<'table'> {
  /**
   * Should the table be striped
   */
  striped?: boolean;
}

interface ComponentProps extends React.FC<Props> {
  Head: typeof TableHead;
  Body: typeof TableBody;
  Row: typeof TableRow;
  Cell: typeof TableCell;
}

/**
 * The 'Table' component is the most basic component in the 'Table' family. Using this component gives you the same level of control as using a HTML table tag as each child element needs to be added manually.
 */
export const Table: ComponentProps = ({
  className,
  striped,
  children,
  ...props
}: Props) => (
  <table
    className={[styles['table'], striped && styles['striped'], className].join(
      ' '
    )}
    {...props}
  >
    {children}
  </table>
);

Table.displayName = 'Table';

Table.Head = TableHead;
Table.Body = TableBody;
Table.Row = TableRow;
Table.Cell = TableCell;

export default Table;

export type TableProps = Props;
