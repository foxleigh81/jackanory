import React from 'react';

// Import Components
import { Button } from '../button';

/* Import Stylesheet */
import styles from './styles.module.scss';

// Prop Types
export interface Props extends React.ComponentProps<'div'> {
  /**
   * Do you want to collapse the spacing between the buttons?
   * @default false
   */
  collapseSpacing?: boolean;
  /**
   * Should the button group display vertically or horizontally.
   * @default 'horizontal'
   */
  orientation?: 'horizontal' | 'vertical';
}

/**
 * The ButtonGroup component groups a collection of Button components together with various display options.
 */
export const ButtonGroup: React.FC<Props> = ({
  collapseSpacing = false,
  orientation = 'horizontal',
  className,
  children,
  ...props
}: Props) => (
  <div
    className={[
      styles['button-group'],
      styles[orientation],
      collapseSpacing ? styles['collapsed'] : '',
      className || ''
    ]
      .filter(Boolean)
      .join(' ')}
    {...props}
  >
    {React.Children.map(children, (child) => {
      if (
        React.isValidElement<React.ComponentProps<typeof Button>>(child) &&
        child.type === Button
      ) {
        return React.cloneElement(child, {
          className: [child.props.className || '', styles['grouped-button']]
            .filter(Boolean)
            .join(' ')
        } as React.ComponentProps<typeof Button>);
      }
      throw new Error(
        'ButtonGroup children must be instances of the Button component.'
      );
    })}
  </div>
);

ButtonGroup.displayName = 'ButtonGroup';

export default ButtonGroup;
