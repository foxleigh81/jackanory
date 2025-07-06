import React, { useState, useEffect, useId } from 'react';
import Icon from '../../../../data-display/icon';
import { changeCase } from '@/libs/helpers/change-case';

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
  children
}: Props) => {
  const [open, setOpen] = useState(isOpen);

  const itemId = changeCase(id || header, 'kebab');
  const uniqueItemId = `${itemId}-${useId()}`;

  useEffect(() => {
    setOpen(isOpen);
  }, [isOpen]);

  const handleClick = (e?: React.MouseEvent<HTMLElement, MouseEvent>) => {
    setOpen(!open);
    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleClick();
        break;
      default:
        break;
    }
  };

  const Header = headerLevel;

  return (
    <div className={styles['accordion-item']}>
      <Header
        id={`${uniqueItemId}-header`}
        data-testid={`${itemId}-header`}
        className={styles['header']}
      >
        <button
          onClick={handleClick}
          onKeyDown={handleKeyDown}
          role="button"
          aria-controls={`${uniqueItemId}-body`}
          aria-expanded={open}
        >
          {header}
          <Icon
            use="chevron"
            className={[
              styles['arrow'],
              styles[`is-${open ? 'open' : 'closed'}`]
            ]
              .filter(Boolean)
              .join(' ')}
          />
        </button>
      </Header>
      <section
        id={`${uniqueItemId}-body`}
        role="region"
        data-testid={`${itemId}-body`}
        aria-labelledby={`${uniqueItemId}-header`}
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
