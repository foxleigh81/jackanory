import React from 'react';

/* Prop Types */
export type Props = React.ComponentProps<'tbody'>;

/**
 * The TableBody component is used to group the body content in a table.
 * It is a wrapper component for the `tbody` HTML element.
 */
export const TableBody: React.FC<Props> = ({ children, ...props }: Props) => (
  <tbody {...props}>{children}</tbody>
);

TableBody.displayName = 'TableBody';

export default TableBody;
