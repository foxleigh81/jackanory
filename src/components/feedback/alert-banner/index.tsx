import React from 'react';
import { Icon } from '../../data-display/icon';

/* Types */
export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The message to display to the user
   */
  children: React.ReactNode;
  /**
   * The title of the message to display to the user
   */
  title?: string;
  /**
   * The type of message to display should be 'info' | 'danger' | 'warning' | 'success'
   * Any other string will default to 'info'
   */
  type: 'information' | 'danger' | 'warning' | 'success';
}

/* Import Stylesheet */
import styles from './styles.module.scss';

const displayIcon = (type: string) => {
  if (type === 'success') return <Icon use="success" />;
  if (type === 'warning') return <Icon use="warning" />;
  if (type === 'danger') return <Icon use="error" />;
  return <Icon use="help" />;
};

const displayTitle = (type: string) => {
  if (type === 'success') return 'Success';
  if (type === 'warning') return 'Warning';
  if (type === 'danger') return 'Error';
  return 'Information';
};

/**
 * The 'Alert Banner' component displays an alert to the user, it can be one of 'Error' (aka 'Danger'), 'Warning', 'Success' or 'Information'.
 */
export const AlertBanner: React.FC<Props> = ({
  children,
  type,
  title,
  className,
  ...props
}: Props) => (
  <div
    className={[
      styles[`alert-banner-${displayTitle(type).toLowerCase()}`],
      className || ''
    ]
      .filter(Boolean)
      .join(' ')}
    role="status"
    {...props}
  >
    <div className={styles['icon']}>{displayIcon(type)}</div>
    <div className={styles['message']}>
      <h2>{title || displayTitle(type)}</h2>
      <span>{children}</span>
    </div>
  </div>
);

export default AlertBanner;
