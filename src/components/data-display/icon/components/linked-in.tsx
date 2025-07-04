import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const LinkedIn = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 23 23"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M19.5.7H2.8C1.3.7.2,1.9.2,3.4v16.8c0,1.4,1.2,2.6,2.6,2.6h16.8c1.4,0,2.6-1.2,2.6-2.6V3.4c0-1.4-1.2-2.6-2.6-2.6ZM7,9.1v10h-3.1v-10h3.1ZM3.8,6.2c0-.7.6-1.3,1.6-1.3s1.5.6,1.6,1.3c0,.7-.6,1.3-1.6,1.3s-1.6-.6-1.6-1.3ZM18.5,19.1h-3.1v-5.2c0-1-.5-2.1-1.8-2.1h0c-1.3,0-1.8,1.1-1.8,2.1v5.2h-3.1v-10h3.1v1.3s1-1.3,3-1.3,3.8,1.4,3.8,4.3v5.6Z" />
      </svg>
    );
  }
);

LinkedIn.displayName = 'LinkedIn';

export default LinkedIn;
