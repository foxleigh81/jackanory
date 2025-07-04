import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Barcode = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 22 14"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M0,14V0h2v14H0ZM3,14V0h2v14h-2ZM6,14V0h1v14h-1ZM9,14V0h2v14h-2ZM12,14V0h3v14h-3ZM16,14V0h1v14h-1ZM19,14V0h3v14h-3Z" />
      </svg>
    );
  }
);

Barcode.displayName = 'Barcode';

export default Barcode;
