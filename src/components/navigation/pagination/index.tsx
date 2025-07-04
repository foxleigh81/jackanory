import React from 'react';

import styles from './styles.module.scss';

const range = (start: number, end: number) => {
  const length = end - start + 1;
  return Array.from({ length }, (_, i) => start + i);
};

const boundaryCount = 1;
const siblingCount = 1;

const getStartEllipsis = (siblingsStart: number, count: number) => {
  if (siblingsStart > boundaryCount + 2) {
    return ['ellipsis'];
  } else if (boundaryCount + 1 < count - boundaryCount) {
    return [boundaryCount + 1];
  } else {
    return [];
  }
};

const getEndEllipsis = (siblingsEnd: number, count: number) => {
  if (siblingsEnd < count - boundaryCount - 1) {
    return ['ellipsis'];
  } else if (count - boundaryCount > boundaryCount) {
    return [count - boundaryCount];
  } else {
    return [];
  }
};

const getPages = (
  count: number,
  currentPage: number,
  handleClick: (page: number | null) => void
) => {
  const startPages = range(1, Math.min(boundaryCount, count));
  const endPages = range(
    Math.max(count - boundaryCount + 1, boundaryCount + 1),
    count
  );

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      currentPage - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1
    ),
    // Greater than startPages
    boundaryCount + 2
  );

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      currentPage + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1
  );

  const itemList = [
    'previous',
    ...startPages,
    ...getStartEllipsis(siblingsStart, count),
    ...range(siblingsStart, siblingsEnd),
    ...getEndEllipsis(siblingsEnd, count),
    ...endPages,
    'next'
  ];

  // Map the button type to its page number
  const buttonPage = (type: string) => {
    switch (type) {
      case 'first':
        return 1;
      case 'previous':
        return currentPage - 1;
      case 'next':
        return currentPage + 1;
      case 'last':
        return count;
      default:
        return null;
    }
  };

  // Convert the basic item list to PaginationItem props objects
  return itemList.map((item) => {
    if (typeof item === 'number') {
      const isCurrentPage = item === currentPage;
      const ariaCurrent = isCurrentPage ? ('page' as const) : undefined;
      return {
        onClick: () => handleClick(item),
        type: 'page' as const,
        page: item,
        selected: isCurrentPage,
        'aria-current': ariaCurrent
      };
    } else {
      return {
        onClick: () => handleClick(buttonPage(item)),
        type: item,
        page: buttonPage(item),
        selected: false,
        disabled:
          item.indexOf('ellipsis') !== -1 ||
          (item === 'previous' && currentPage <= 1) ||
          (item === 'next' && currentPage >= count)
      };
    }
  });
};

const ChevronLeft = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <title>A left pointing chevron</title>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
  </svg>
);

const ChevronRight = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <title>A right pointing chevron</title>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
  </svg>
);

type PaginationItemProps = {
  /**
   * The type of item.
   */
  type: string;
  /**
   * The page number of the item.
   */
  page: number | null;
  /**
   * Whether the item is selected.
   */
  selected: boolean;
  /**
   * Click handler for the pagination item.
   */
  onClick?: () => void;
  /**
   * Whether the item is disabled.
   */
  disabled?: boolean;
  /**
   * Aria-current attribute for accessibility.
   */
  'aria-current'?:
    | boolean
    | 'time'
    | 'page'
    | 'false'
    | 'true'
    | 'step'
    | 'location'
    | 'date';
};
/**
 * The 'Pagination' component is used to navigate through pages of content.
 */
const PaginationItem: React.FC<PaginationItemProps> = ({
  type,
  page,
  selected,
  'aria-current': ariaCurrent,
  ...props
}) => {
  let content: React.ReactNode;
  let ariaLabel: string | undefined;
  switch (type) {
    case 'previous':
      content = ChevronLeft;
      ariaLabel = 'Go to previous page';
      break;
    case 'next':
      content = ChevronRight;
      ariaLabel = 'Go to next page';
      break;
    case 'ellipsis':
      content = '…';
      ariaLabel = 'Show more pages';
      break;
    default:
      content = page;
      ariaLabel = `Go to page ${page}`;
  }

  let className = styles['pagination-item'];
  if (selected) {
    className += ` ${styles['selected']}`;
  }

  const buttonProps = {
    ...props,
    className,
    'aria-label': ariaLabel,
    ...(ariaCurrent ? { 'aria-current': ariaCurrent } : {})
  };

  return <button {...buttonProps}>{content}</button>;
};

export interface Props {
  /**
   * The total number of pages.
   */
  count: number;
  /**
   * The current page.
   */
  page: number;
  /**
   * When the page is changed.
   */
  onChange?: (page: number) => void;
  /**
   * Add a custom class name.
   */
  className?: string;
}
/**
 * The 'Pagination' component is used to navigate through pages of content.
 */
const Pagination: React.FC<Props> = ({
  count,
  page,
  onChange,
  className
}: Props) => {
  const handlePageSelected = (newPage: number | null) => {
    if (onChange && newPage) onChange(newPage);
  };

  const renderButtons = () => {
    const items = getPages(count, page, handlePageSelected);
    return items.map((item, i) => {
      return <PaginationItem {...item} key={i} />;
    });
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className={[styles['pagination-container'], className || '']
        .filter(Boolean)
        .join(' ')}
    >
      {renderButtons()}
    </nav>
  );
};

export default Pagination;
