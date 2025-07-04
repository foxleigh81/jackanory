import React from 'react';

import styles from './styles.module.scss';

export type Props = React.ComponentProps<'article'>;

/**
 * The Rich Text component displays a variety of HTML elements in a single
 * component all styled to match the design system.
 */
const RichText: React.FC<Props> = ({
  className,
  children,
  ...props
}: Props) => (
  <article
    className={[styles['rich-text'], className || ''].filter(Boolean).join(' ')}
    {...props}
  >
    {children}
  </article>
);

export default RichText;
