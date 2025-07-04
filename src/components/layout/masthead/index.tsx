'use client';

import React, { useState } from 'react';
import SiteNav from '@/components/navigation/site-nav';
import styles from './styles.module.scss';
import { usePathname } from 'next/navigation';

/**
 * Defines the props for the Masthead component.
 */
interface MastheadProps {
  /**
   * An array of link objects for the site navigation.
   */
  navLinks: Array<{
    href: string;
    label: string;
  }>;
}

/**
 * Displays the site header, including the logo, navigation, and action buttons.
 * Features a responsive design with a slide-in mobile menu triggered by an animated burger icon.
 */
const Masthead: React.FC<MastheadProps> = ({ navLinks }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const currentRoute = usePathname();

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);

  return (
    <header className={styles.masthead} data-testid="masthead">
      {/* Render container directly - styled by CSS media queries */}
      <div
        id="navAndActionsContainer"
        className={`${styles.navAndActionsContainer} ${isMobileMenuOpen ? styles.isOpen : ''}`}
      >
        {/* Navigation is placed inside the container */}
        <SiteNav links={navLinks} currentLink={currentRoute} />
      </div>

      {/* Single Menu Toggle Button remains here */}
      <button
        className={`${styles.menuToggleButton} ${isMobileMenuOpen ? styles.isOpen : ''}`}
        onClick={toggleMobileMenu}
        aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMobileMenuOpen}
        aria-controls="navAndActionsContainer"
      >
        {/* Icon elements (lines) will be created and animated via CSS */}
        <span className={styles.iconLine}></span>
        <span className={styles.iconLine}></span>
        <span className={styles.iconLine}></span>
      </button>
    </header>
  );
};

Masthead.displayName = 'Masthead';

export default Masthead;
