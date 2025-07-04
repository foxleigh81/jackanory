import React from 'react';

// Import Stylesheet
import styles from './styles.module.scss';

// Prop Types
export interface Props extends React.InputHTMLAttributes<HTMLLabelElement> {
  /**
   * The id of the input this label is for (if the label is simulated, this is not required)
   */
  id?: string;
  /**
   * The Text to display in the label
   */
  text: string;
  /**
   * Is the input required?
   */
  required?: boolean;
  /**
   * Is this a simulated label?
   */
  simulated?: boolean;
  /**
   * Is the label a parent of the input?
   * If so, the htmlFor will not be set
   * (Note: You only need to use this if you are having issues with the htmlFor attribute, otherwise it is not required)
   * @default false
   */
  parent?: boolean;
  /**
   * If the label should look like a legend, set this to true
   */
  larger?: boolean;
  /**
   * The position of the label relative to the input
   * can be 'above', 'before' or 'after'
   * (only applicable if the input is a child of the label)
   * @default 'above'
   */
  position?: 'above' | 'before' | 'after';
}

/**
 * The Label component is used to label an input.
 */
export const Label: React.FC<Props> = ({
  id,
  text,
  required,
  simulated,
  parent = false,
  larger,
  className,
  position = 'above',
  children,
  ...props
}: Props) => {
  if (!simulated && !id) throw new Error('Input labels must have an id prop');

  const classList = [
    styles['label'],
    larger ? styles['large'] : '',
    position ? styles[`pos-${position}`] : '',
    children ? styles['has-child'] : '',
    required ? styles['required'] : '',
    className || ''
  ]
    .filter(Boolean)
    .join(' ');

  const RequiredFlag = (
    <span
      className={styles['asterisk']}
      title="This field is required"
      aria-hidden="true"
    >
      *
    </span>
  );

  const renderLabel = () => (
    <>
      {text}
      {required ? RequiredFlag : null}
    </>
  );

  // If simulated the label should render as a span otherwise it should render as a label
  if (simulated) {
    return (
      <span className={classList}>
        {position !== 'after' && renderLabel()}
        {children}
        {position === 'after' && renderLabel()}
      </span>
    );
  }

  return (
    <label
      data-testid={`${id}-label`}
      className={classList}
      htmlFor={!parent ? id : undefined}
      {...props}
    >
      {position !== 'after' && renderLabel()}
      {children}
      {position === 'after' && renderLabel()}
    </label>
  );
};

Label.displayName = 'Label';

export default Label;
