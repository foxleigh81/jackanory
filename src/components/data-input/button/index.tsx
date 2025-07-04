import React, { forwardRef, ReactNode } from 'react';

// Import components
import { Loader } from '../../feedback/loader';
import { Icon } from '../../data-display/icon';

import type { IconTypes } from '../../data-display/icon';

export const buttonVariants = [
  'primary',
  'secondary',
  'tertiary',
  'create',
  'destroy'
];

/* Import Types */
export interface Props extends React.ComponentProps<'button'> {
  /**
   * The button label. If the `hideLabel` prop is set (e.g. in an icon only button) you must provide the label prop accessibility purposes and should be a short, descriptive label of the button's purpose.
   * If the button has no children, this label will be used as the button's text content.
   */
  label?: string;
  /**
   * The if you want to include an icon, this specifies the side of the button the icon should appear on.
   * @default 'left'
   */
  alignIcon?: 'left' | 'right';
  /**
   * If the icon should be on it's own with no visible text, set this property to `true`.
   * Note: The label prop must still be provided for accessibility purposes.
   **/
  hideLabel?: boolean;
  /**
   * Is a small button?
   */
  small?: boolean;
  /**
   * Optional button variant.
   * @default 'primary'
   */
  variant?: (typeof buttonVariants)[number];
  /**
   * Make the background transparent and the text the background color.
   */
  transparent?: boolean;
  /**
   * Render the button to look like a link.
   */
  link?: boolean;
  /**
   * Include an icon from the icon library or a custom React node.
   * If passing a custom React node, the node will be rendered directly.
   */
  icon?: IconTypes | ReactNode;
  /**
   * Is the button rectangular or circular?
   * @default false (rectangular)
   */
  circular?: boolean;
  /**
   * Shows a loading indicator instead of text.
   * @default false
   */
  isLoading?: boolean;
  /**
   * The loading indicator to be read out for accessability.
   * @default "Loading"
   */
  loadingIndicator?: string;
  /**
   * The test ID for the button element.
   */
  dataTestId?: string;
}

/* Import Stylesheet */
import styles from './styles.module.scss';

/**
 * The Button component allows a user to place a button on the page.
 */
export const Button = forwardRef<HTMLButtonElement, Props>(
  (
    {
      label = '',
      alignIcon = 'left',
      hideLabel = false,
      small,
      icon,
      isLoading = false,
      loadingIndicator,
      children,
      className,
      disabled,
      variant = 'primary',
      transparent = false,
      link = false,
      circular = false,
      dataTestId,
      ...props
    }: Props,
    ref
  ) => {
    if (hideLabel && !label && !children) {
      throw new Error(
        'If the button has no children, you must provide a label for accessibility purposes.'
      );
    }

    if (!children && !label) {
      throw new Error(
        'You must provide either a label or children for the button.'
      );
    }

    const buildStyle = () => {
      let variantClass = `button-${variant}`;
      if (transparent) {
        variantClass = `button-${variant}-transparent`;
      }
      if (link) {
        variantClass = `button-${variant}-link`;
      }
      return variantClass;
    };

    const renderIcon = () => {
      if (!icon) return null;
      if (typeof icon === 'string') {
        return <Icon use={icon as IconTypes} />;
      }
      return icon;
    };

    return (
      <button
        ref={ref}
        aria-label={label || undefined}
        className={[
          styles['button'],
          styles[buildStyle()],
          (icon || isLoading) && styles[`icon-${alignIcon}`],
          icon && hideLabel && styles[`hide-label`],
          circular && styles['circular'],
          small && styles['small'],
          className
        ]
          .filter(Boolean)
          .join(' ')}
        tabIndex={disabled ? -1 : 0}
        disabled={disabled ?? isLoading}
        aria-disabled={disabled ?? isLoading}
        aria-busy={isLoading}
        data-testid={dataTestId}
        {...props}
      >
        {!isLoading && (
          <>
            {renderIcon()}
            {children}
            {!hideLabel && label}
          </>
        )}
        {isLoading && (
          <>
            <Loader helpText={loadingIndicator ?? 'Loading...'} />
            {!hideLabel && <span>{loadingIndicator ?? 'Loading...'}</span>}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;

export type ButtonProps = Props;
