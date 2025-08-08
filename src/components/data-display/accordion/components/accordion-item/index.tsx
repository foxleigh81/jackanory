import React, { useState, useEffect } from 'react';
import Icon from '../../../../data-display/icon';
import { useLiveRegion } from '../../../../utilities/live-region';
import ScreenReaderOnly from '../../../../utilities/screen-reader-only';

/* Import Stylesheet */
import styles from './styles.module.scss';

export interface Props {
  /**
   * The contents of the item body
   */
  children: React.ReactNode | string;
  /**
   * The title contents
   */
  header: string;
  /**
   * The header level (h2, h3, etc) for the accordion item header (H1 is reserved for the page title and cannot be used)
   * @default h3
   */
  headerLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * The ID of the item (useful if you are using headers that are not unique)
   * @default header
   */
  id?: string;
  /**
   * If the panel is open or closed
   * @default false
   */
  isOpen?: boolean;
  /**
   * Adds a click handler to the header of the accordion item
   * with the event as the optional first argument
   */
  onClick?: (e?: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  /**
   * Adds a keyboard handler to the header of the accordion item
   * with the event as the optional first argument
   */
  onKeyDown?: (e?: React.KeyboardEvent<HTMLElement>) => void;
}

/**
 * AccordionItem is a single item in the Accordion component
 */
export const AccordionItem: React.FC<Props> = ({
  header,
  headerLevel = 'h3',
  isOpen = false,
  id,
  onClick,
  onKeyDown,
  children
}: Props) => {
  const [open, setOpen] = useState(isOpen);
  const { announce } = useLiveRegion();

  const itemId =
    id ||
    header
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  const uniqueItemId = itemId;

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleToggle = () => {
    const newOpenState = !open;
    setOpen(newOpenState);

    // Announce state change to screen readers
    const stateText = newOpenState ? 'expanded' : 'collapsed';
    announce(`${header} ${stateText}`, { politeness: 'polite' });
  };

  const handleClick = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    handleToggle();
    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e?: React.KeyboardEvent<HTMLElement>) => {
    // Handle Space and Enter key activation
    if (e?.key === ' ' || e?.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
    if (onKeyDown) {
      onKeyDown(e);
    }
  };

  const Header = headerLevel;

  return (
    <div className={styles['accordion-item']}>
      <Header id={`${uniqueItemId}-header`} className={styles['header']}>
        <button
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          aria-controls={`${uniqueItemId}-body`}
          aria-expanded={open}
          data-testid={`${uniqueItemId}-header`}
          className={styles['accordion-button']}
        >
          {header}
          <ScreenReaderOnly>
            {open ? ', expanded' : ', collapsed'}
          </ScreenReaderOnly>
          <Icon
            use="chevron"
            className={[
              styles['arrow'],
              styles[`is-${open ? 'open' : 'closed'}`]
            ]
              .filter(Boolean)
              .join(' ')}
            aria-hidden="true"
          />
        </button>
      </Header>
      <section
        id={`${uniqueItemId}-body`}
        role="region"
        data-testid={`${uniqueItemId}-body`}
        aria-labelledby={`${uniqueItemId}-header`}
        hidden={!open}
        className={[styles['body'], styles[`is-${open ? 'open' : 'closed'}`]]
          .filter(Boolean)
          .join(' ')}
      >
        {children}
      </section>
    </div>
  );
};

AccordionItem.displayName = 'AccordionItem';

export default AccordionItem;
