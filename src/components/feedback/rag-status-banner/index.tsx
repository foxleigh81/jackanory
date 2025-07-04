import React from 'react';
/* Import Stylesheet */
import styles from './styles.module.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The RAG status type - determines the colour scheme of the banner
   */
  status: 'red' | 'amber' | 'green' | 'grey' | 'blue';
  /**
   * The title text to display in bold
   */
  title: string;
  /**
   * The body content to display in regular text
   */
  body: string | React.ReactNode;
}

/**
 * A banner component that displays status information using RAG (Red, Amber, Green) colour coding.
 */
const RagStatusBanner: React.FC<Props> = ({
  status,
  title,
  body,
  className,
  ...props
}: Props) => {
  return (
    <div
      className={[styles['rag-banner'], styles[status], className || '']
        .filter(Boolean)
        .join(' ')}
      {...props}
    >
      <div className={styles['title']}>{title}</div>
      <div className={styles['body']}>{body}</div>
    </div>
  );
};

RagStatusBanner.displayName = 'RAG Status Banner';

export default RagStatusBanner;
