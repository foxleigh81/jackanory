import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Minus = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path
          fillRule="evenodd"
          d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z"
          clipRule="evenodd"
        />
      </svg>
    );
  }
);

Minus.displayName = 'Minus';

export default Minus;
