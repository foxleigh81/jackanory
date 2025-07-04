import React, { useState } from 'react';

import Accordion from '../../data-display/accordion';
import { changeCase } from '@/libs/helpers/change-case';

/*  Types */
export interface Props extends React.ComponentProps<'div'> {
  /**
   * Allow multiple items to be open at once
   * @default false
   */
  allowMultiple?: boolean;
  /**
   * The header level (h2, h3, etc) for the accordion item headers (H1 is reserved for the page title and cannot be used)
   * @default h3
   */
  headerLevel?: 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  /**
   * The items to display in the accordion
   */
  items: {
    /**
     * The header of the accordion item
     */
    header: string;
    /**
     * The content of the accordion item
     */
    body: React.ReactNode;
    /**
     * Whether the accordion item is open
     */
    isOpen?: boolean;
    /**
     * The callback function to call when the accordion item is clicked
     */
    onClick?: () => void;
  }[];
}

/**
 * The 'AccordionFactory' component automatically generates an accordion from a list of items.
 */
export const AccordionFactory: React.FC<Props> = ({
  allowMultiple,
  headerLevel = 'h3',
  items,
  ...props
}: Props) => {
  const [openItem, setOpenItem] = useState<number | null>(null);

  const accordionItems = items.map(
    ({ header, body, isOpen, onClick }, index) => (
      <Accordion.Item
        key={changeCase(header, 'kebab')}
        header={header}
        headerLevel={headerLevel}
        isOpen={isOpen || openItem === index}
        onClick={() => {
          if (!allowMultiple) {
            setOpenItem(index);
          }
          if (onClick) onClick();
        }}
      >
        {body}
      </Accordion.Item>
    )
  );

  return (
    <Accordion data-testId="accordion-factory" {...props}>
      {accordionItems}
    </Accordion>
  );
};

export default AccordionFactory;
