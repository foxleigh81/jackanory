import Link from 'next/link';
import { isExternalLink } from '@/libs/helpers/url-helpers';
import { changeCase } from '@/libs/helpers/change-case';

import styles from './styles.module.scss';

/**
 * Represents a single navigation link.
 */
export interface SiteNavLink {
  /** The URL the link points to. */
  href: string;
  /** The visible text label for the link. */
  label: string;
  /** Optional click handler for the link. */
  onClick?: () => void;
}

/**
 * Props for the SiteNav component.
 */
export interface SiteNavProps {
  /** An array of navigation links to display. */
  links: SiteNavLink[];
  /** Optional href of the currently active link. */
  activeHref?: string;
  /** Optional href of the current page link (makes it bold, underlined, and inactive). */
  currentLink?: string;
  /** Optional aria-label for the navigation element. Defaults to 'Site navigation'. */
  ariaLabel?: string;
}

/**
 * SiteNav component displays a list of navigation links.
 */
const SiteNav = ({
  links,
  activeHref,
  currentLink,
  ariaLabel = 'Site navigation'
}: SiteNavProps) => {
  if (!links || links.length === 0) {
    return null;
  }

  return (
    <nav
      className={styles.siteNav}
      aria-label={ariaLabel}
      data-testid="site-nav"
    >
      <ul>
        {links.map((link, index) => {
          const isActive = link.href === activeHref;
          const isCurrent = link.href === currentLink;
          const isExternal = isExternalLink(link.href);

          return (
            <li
              key={index}
              data-testid={`nav-link-${changeCase(link.label, 'kebab')}`}
            >
              {isCurrent ? (
                <span
                  className={`${styles.link} ${styles.current}`.trim()}
                  aria-current="page"
                >
                  {link.label}
                </span>
              ) : isExternal ? (
                <a
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`.trim()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={link.onClick}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.active : ''}`.trim()}
                  aria-current={isActive ? 'page' : undefined}
                  onClick={link.onClick}
                >
                  {link.label}
                </Link>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

SiteNav.displayName = 'Site Navigation';

export default SiteNav;
