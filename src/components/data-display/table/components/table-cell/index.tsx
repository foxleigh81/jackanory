import React from 'react';
import Icon from '../../../icon';
import ScreenReaderOnly from '../../../../utilities/screen-reader-only';
import { useLiveRegion } from '../../../../utilities/live-region';

/* Import Stylesheet */
import styles from './styles.module.scss';

/* Prop Types */
export interface Props extends React.ComponentProps<'td'> {
  /**
   * Forces the cell to output a 'th' instead of a 'td'
   */
  th?: boolean;
  /**
   * Scope for header cells (col, row, colgroup, rowgroup)
   */
  scope?: 'col' | 'row' | 'colgroup' | 'rowgroup';
  /**
   * Headers attribute for associating data cells with header cells
   */
  headers?: string;
  /**
   * Aria-sort attribute for sortable column headers (none, ascending, descending)
   */
  'aria-sort'?: 'none' | 'ascending' | 'descending';
  /**
   * Makes the header cell sortable with keyboard support
   */
  sortable?: boolean;
  /**
   * Click handler for sortable column headers
   */
  onSort?: (
    event:
      | React.MouseEvent<HTMLButtonElement>
      | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  /**
   * Column name for accessibility announcements
   */
  columnName?: string;
}

/**
 * The 'TableCell' component is a component that is used to display a cell in a table.
 */
export const TableCell: React.FC<Props> = ({
  className,
  children,
  th,
  scope,
  headers,
  'aria-sort': ariaSort,
  sortable,
  onSort,
  columnName,
  ...props
}: Props) => {
  const TagChooser = th ? 'th' : 'td';
  const { announce } = useLiveRegion();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (sortable && onSort) {
      onSort(event);
      announceSort();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (sortable && onSort && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onSort(event);
      announceSort();
    }
  };

  const announceSort = () => {
    const columnText =
      columnName || (typeof children === 'string' ? children : 'Column');
    const sortText =
      ariaSort === 'ascending'
        ? 'sorted ascending'
        : ariaSort === 'descending'
          ? 'sorted descending'
          : 'sort removed';
    announce(`${columnText} ${sortText}`, { politeness: 'assertive' });
  };

  const getSortIcon = () => {
    if (!sortable || !th) return null;

    if (ariaSort === 'ascending') {
      return (
        <Icon
          use="chevron"
          className={[styles['sort-icon'], styles['sort-ascending']].join(' ')}
          aria-hidden="true"
        />
      );
    } else if (ariaSort === 'descending') {
      return (
        <Icon
          use="chevron"
          className={[styles['sort-icon'], styles['sort-descending']].join(' ')}
          aria-hidden="true"
        />
      );
    } else {
      return (
        <Icon
          use="chevron"
          className={[styles['sort-icon'], styles['sort-icon-neutral']].join(
            ' '
          )}
          aria-hidden="true"
        />
      );
    }
  };

  const cellClasses = [
    styles['table-cell'],
    th && styles['th'],
    sortable && th && styles['sortable'],
    className
  ]
    .filter(Boolean)
    .join(' ');

  const cellProps = {
    className: cellClasses,
    scope: th ? scope || 'col' : undefined,
    headers: !th ? headers : undefined,
    'aria-sort': th && ariaSort ? ariaSort : undefined,
    role: th ? 'columnheader' : undefined,
    ...props
  };

  return (
    <TagChooser {...cellProps}>
      {sortable && th ? (
        <button
          className={styles['sort-button']}
          tabIndex={0}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-label={`Sort by ${columnName || (typeof children === 'string' ? children : 'column')} (${
            ariaSort === 'ascending' ? 'desc' : 'asc'
          })`}
        >
          {children}
          <ScreenReaderOnly>
            {ariaSort === 'none'
              ? ', sortable'
              : ariaSort === 'ascending'
                ? ', sorted ascending'
                : ariaSort === 'descending'
                  ? ', sorted descending'
                  : ''}
          </ScreenReaderOnly>
          {getSortIcon()}
        </button>
      ) : (
        children
      )}
    </TagChooser>
  );
};

TableCell.displayName = 'TableCell';

export default TableCell;
