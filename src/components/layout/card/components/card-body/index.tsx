import React from 'react';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export type Props = React.ComponentProps<'div'>;

// Render component
export const CardBody: React.FC<Props> = ({ className, children }: Props) => (
  <section
    className={[styles['body'], className || ''].filter(Boolean).join(' ')}
  >
    {children}
  </section>
);

CardBody.displayName = 'CardBody';

export default CardBody;
