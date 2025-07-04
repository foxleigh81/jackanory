import React, { Fragment } from 'react';
import Link from 'next/link';

/* Import Stylesheet */
import styles from './styles.module.scss';

import type LinkObject from '@/libs/types/link-object';

export interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * The breadcrumbs to render.
   */
  breadcrumbs: LinkObject[];
}

/**
 * The breadcrumbs component provides a list of links to help users navigate through a tree structure.
 */
const Breadcrumbs: React.FC<Props> = ({
  breadcrumbs,
  className,
  ...props
}: Props) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={[styles['breadcrumbs'], className].filter(Boolean).join(' ')}
      {...props}
    >
      <ol data-testid="breadcrumb-list">
        {breadcrumbs.map((breadcrumb, index) => {
          return (
            <Fragment key={breadcrumb.label}>
              <li>
                {breadcrumb.current ? (
                  <a aria-current="page" className={styles['current-page']}>
                    {breadcrumb.label}
                  </a>
                ) : (
                  <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
                )}
              </li>
              {index < breadcrumbs.length - 1 && (
                <li className={styles['seperator']}>
                  <svg focusable="false" viewBox="0 0 23 23" aria-hidden="true">
                    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
                  </svg>
                </li>
              )}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
