import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const HeartFilled = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 21.33"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path
          d="M12,21.33l-1.82-1.6c-3.12-2.74-5.59-4.92-7.37-7.02C.87,10.4,0,8.46,0,6.39,0,2.81,2.9,0,6.6,0c2.04,0,4.06.91,5.4,2.43h0c1.34-1.52,3.36-2.43,5.4-2.43,3.7,0,6.6,2.81,6.6,6.39,0,2.06-.87,4.01-2.81,6.31-1.79,2.12-4.28,4.32-7.45,7.1l-1.74,1.52h0Z"
          strokeWidth="0"
        />
      </svg>
    );
  }
);

HeartFilled.displayName = 'HeartFilled';

export default HeartFilled;
