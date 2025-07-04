import React, { useState } from 'react';

import { List } from '../../data-display/list';

/*  Types */
export interface Props extends React.HTMLAttributes<HTMLElement> {
  /**
   * The data used to render the List
   */
  items: {
    /**
     * The contents of the item
     */
    content: React.ReactNode;
    /**
     * Is the item active?
     * @default false
     */
    isActive?: boolean;
    /**
     * Is the item loading?
     */
    isLoading?: boolean;
    /**
     * The event handler for the click event.
     */
    onClick?: React.MouseEventHandler<HTMLElement>;
  }[];
  /**
   * The list type to render
   * @default 'none'
   */
  type?: 'ordered' | 'unordered' | 'none';
  /**
   * Which item is active initially? (zero-based index)
   */
  activeItem?: number;
  /**
   * The event handler for the click event (applies to all items and overrides any onClick handlers on individual items).
   */
  onItemClick?: React.MouseEventHandler<HTMLElement>;
}

/**
 * The 'ListFactory' component automatically generates an accordion from a list of items.
 */
export const ListFactory: React.FC<Props> = ({
  items,
  activeItem = undefined,
  type = 'none',
  onItemClick,
  ...props
}: Props) => {
  const [active, setActive] = useState(activeItem);

  const handleClick =
    (index: number, onClick?: React.MouseEventHandler<HTMLElement>) =>
    (event: React.MouseEvent<HTMLElement>) => {
      setActive(index);
      if (onClick) {
        onClick(event);
      }
    };

  return (
    <List type={type} {...props}>
      {items.map(({ content, isActive, isLoading, onClick }, index) => (
        <List.Item
          key={index}
          isActive={active === index || isActive}
          isLoading={isLoading}
          onClick={
            onItemClick || onClick
              ? (e) => {
                  const clickHandler = onItemClick || onClick;
                  handleClick(index, clickHandler)(e);
                }
              : undefined
          }
          type={type}
        >
          {content}
        </List.Item>
      ))}
    </List>
  );
};

export default ListFactory;
