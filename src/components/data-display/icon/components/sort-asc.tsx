import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const SortAsc = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        width="24"
        height="22"
        viewBox="0 0 24 22"
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M0.248277 5.58971L4.04028 0.925609C4.19228 0.739045 4.39228 0.636435 4.60028 0.636435L4.62428 0.636435C4.83228 0.636435 5.02428 0.720388 5.17628 0.888296L9.38428 5.5524L8.28028 6.90499L5.60028 3.92929L5.60028 14.3676L4.00028 14.3676L4.00028 3.68676L1.40828 6.86768L0.248277 5.58971Z" />
        <path d="M0 21.3636L24 21.3636L24 19.498L1.631e-07 19.498L0 21.3636Z" />
        <path d="M11.2 12.9687L24 12.9688L24 11.1031L11.2 11.1031L11.2 12.9687Z" />
        <path d="M14.4 4.57385L24 4.57385L24 2.70821L14.4 2.70821L14.4 4.57385Z" />
      </svg>
    );
  }
);

SortAsc.displayName = 'SortAsc';

export default SortAsc;
