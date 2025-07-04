import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Download = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 16 16"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M8,12L3,7l1.4-1.4,2.6,2.6V0h2v8.1l2.6-2.6,1.4,1.4-5,5ZM2,16c-.5,0-1-.2-1.4-.6-.4-.4-.6-.9-.6-1.4v-3h2v3h12v-3h2v3c0,.6-.2,1-.6,1.4-.4.4-.9.6-1.4.6H2Z" />
      </svg>
    );
  }
);

Download.displayName = 'Download';

export default Download;
