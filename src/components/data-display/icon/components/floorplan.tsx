import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Floorplan = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 19 19"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M1.7,0h17.3v1.6H1.7v6.3h8.5v1.6H1.7v7.9h6.8v-1.6h1.7v1.6h7v-4.8h1.7v6.3h-8.7s-1.7,0-1.7,0h0s-6.8,0-6.8,0h0s-1.7,0-1.7,0h0V0h1.7ZM10.3,9.5h-1.7v3.2h1.7v-3.2ZM17.3,1.6h1.7v6.3h-.4l-3.4,2.8-1.2-1.2,3.2-2.6V1.6Z" />
      </svg>
    );
  }
);

Floorplan.displayName = 'Floorplan';

export default Floorplan;
