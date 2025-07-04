import React, { forwardRef } from 'react';

/** Import custom types */

export interface Props extends React.ComponentProps<'form'> {
  /**
   * The name of the form
   * @default 'form'
   */
  name?: string;
  /**
   * The id of the form
   * @default 'form'
   */
  id?: string;
}

/**
 * The `Form` component is a simple wrapper around the HTML `<form>`.
 */
export const Form = forwardRef<HTMLFormElement, Props>(
  ({ name = 'form', id = 'form', children, ...props }, ref) => {
    return (
      <form ref={ref} name={name} id={id} {...props}>
        {children}
      </form>
    );
  }
);
Form.displayName = 'Form';

export default Form;
