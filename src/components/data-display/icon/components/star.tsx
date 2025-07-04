import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Star = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 13.3 12.7"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M6.7,10.2l4.1,2.5-1.1-4.7,3.6-3.2-4.8-.4L6.7,0l-1.9,4.4-4.8.4,3.6,3.2-1.1,4.7,4.1-2.5h.1Z" />
      </svg>
    );
  }
);

Star.displayName = 'Star';

export default Star;
