'use client';

import React from 'react';
import styles from './styles.module.scss';

import { SITE_NAME } from '@/app.config';

/**
 * Props for the Footer component.
 */
interface FooterProps {
  /** The application version number. */
  version: string;
}

/**
 * A standard footer component displaying copyright information,
 * the last updated timestamp, version number, and credits.
 */
export const Footer: React.FC<FooterProps> = ({ version }) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <span>
          © {SITE_NAME} {currentYear}. All rights reserved.
        </span>
      </div>
      <div className={styles.right}>
        <span className={styles.version}>Version {version}</span>
      </div>
    </footer>
  );
};

Footer.displayName = 'Footer';

export default Footer;
