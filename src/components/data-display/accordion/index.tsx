import React from 'react';
import AccordionItem from './components/accordion-item';

/*  Types */
export interface Props extends React.ComponentProps<'div'> {
  /**
   * The contents of the accordion
   */
  children?: React.ReactNode;
}

export interface ComponentProps extends React.FC<Props> {
  Item: typeof AccordionItem;
}

/**
 * The 'Accordion' component is a component that is used to display a list of items in a collapsible manner.
 */
const Accordion: ComponentProps = ({ children, ...props }: Props) => (
  <div data-testid="accordion" {...props}>
    {children}
  </div>
);

Accordion.displayName = 'Accordion';

Accordion.Item = AccordionItem;

export default Accordion;

export type AccordionProps = Props;
