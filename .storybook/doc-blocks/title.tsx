import React from 'react';
import { useOf } from '@storybook/addon-docs/blocks';

import styles from './styles.module.css';

type StatusType = 'alpha' | 'beta' | 'stable' | 'deprecated' | 'superceded';

// Render component
export const Title: React.FC = () => {
  const metaOf = useOf('meta') as any;
  const meta = metaOf.csfFile.meta;
  const { parameters } = meta;
  const type = parameters.status || 'stable';
  const getColor = (type: StatusType) => {
    switch (type.toLowerCase()) {
      case 'alpha':
        return '#6699cc';
      case 'beta':
        return '#cc66ff';
      case 'deprecated':
        return '#ff0000';
      case 'stable':
        return '#008542';
      case 'legacy':
        return '#555555';
      default:
        throw new Error(`Unknown status type: ${type}`);
    }
  };

  return (
    <>
      <div className={styles.title}>
        <h1>{meta.component.displayName}</h1>
        {type && (
          <span
            className={`${styles.badge} ${styles['tip-badge']}`}
            style={{ backgroundColor: getColor(type) }}
          >
            {type.toUpperCase()}
          </span>
        )}
      </div>
      {type === 'legacy' && (
        <p className={styles['notice-legacy']}>
          NOTE: '{meta.component.displayName}' has been archived and should no
          longer be used. Please see below for more information.
        </p>
      )}
      {type === 'deprecated' && (
        <p className={styles['notice-deprecated']}>
          WARNING: '{meta.component.displayName}' has been deprecated and will
          be removed in the next major release. Please see below for more
          information.
        </p>
      )}
    </>
  );
};

export default Title;
