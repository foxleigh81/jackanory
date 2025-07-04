import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Pin = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 16 20"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M8,19.6c-2.6-2.2-4.5-4.2-5.8-6.1-1.3-1.9-1.9-3.6-1.9-5.2C.3,5.9,1.1,4,2.6,2.5,4.2,1.1,6,.4,8,.4s3.8.7,5.4,2.1c1.5,1.4,2.3,3.3,2.3,5.7s-.6,3.3-1.9,5.2c-1.3,1.9-3.2,3.9-5.8,6.1Z" />
      </svg>
    );
  }
);

Pin.displayName = 'Pin';

export default Pin;
