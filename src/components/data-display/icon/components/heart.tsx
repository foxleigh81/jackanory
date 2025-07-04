import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Heart = forwardRef<SVGSVGElement, Props>(
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
          d="M12,21.33l-1.82-1.6c-3.12-2.74-5.59-4.92-7.37-7.02C.87,10.4,0,8.46,0,6.39,0,2.81,2.9,0,6.6,0c2.04,0,4.06.91,5.4,2.43h0c1.34-1.52,3.36-2.43,5.4-2.43,3.7,0,6.6,2.81,6.6,6.39,0,2.06-.87,4.01-2.81,6.31-1.79,2.12-4.28,4.32-7.45,7.1l-1.74,1.52ZM11.66,18.37l.35.3.42-.36c3.1-2.73,5.55-4.88,7.24-6.89,1.62-1.92,2.34-3.47,2.34-5.03,0-2.46-2.02-4.39-4.6-4.39-1.48,0-2.93.65-3.9,1.75l-1.5,1.71-1.5-1.71c-.96-1.1-2.42-1.75-3.9-1.75-2.58,0-4.6,1.93-4.6,4.39,0,1.56.72,3.11,2.34,5.02,1.69,2.01,4.14,4.16,7.24,6.88l.08.07Z"
          strokeWidth="0"
        />
      </svg>
    );
  }
);

Heart.displayName = 'Heart';

export default Heart;
