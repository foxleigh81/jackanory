import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Filter = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 19 18"
        enableBackground="new 0 0 19 18"
        xmlSpace="preserve"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path
          d="M8.5,18v-6h2v2h8v2h-8v2H8.5z M0.5,16v-2h6v2H0.5z M4.5,12v-2h-4V8h4V6h2v6H4.5z M8.5,10V8h10v2H8.5z M12.5,6V0h2v2h4v2h-4
	v2H12.5z M0.5,4V2h10v2H0.5z"
        />
      </svg>
    );
  }
);

Filter.displayName = 'Filter';

export default Filter;
