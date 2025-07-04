import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Chevron = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 10 6"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M9.7,5.7c-.4.4-1,.4-1.4,0l-3.3-3.3-3.3,3.3c-.4.4-1,.4-1.4,0-.4-.4-.4-1,0-1.4L4.3.3c.4-.4,1-.4,1.4,0l4,4c.4.4.4,1,0,1.4Z" />
      </svg>
    );
  }
);

Chevron.displayName = 'Chevron';

export default Chevron;
