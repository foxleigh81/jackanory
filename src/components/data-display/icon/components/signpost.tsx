import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Signpost = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 370 440.84"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M296.51,121.24,370,70.83,296.51,27.31l-103.84-1C191-9.76,150-7.76,148.38,26.31l-69.89,1v93.93h69.89v61.83H78.49L0,226.6,78.49,277h69.89V440.84h44.29V277H296.51V183.07H192.67V121.24Z" />
      </svg>
    );
  }
);

Signpost.displayName = 'Signpost';

export default Signpost;
