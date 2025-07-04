import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Denied = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        x="0px"
        y="0px"
        viewBox="0 0 19.5 19.5"
        enableBackground="new 0 0 19.5 19.5"
        xmlSpace="preserve"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M4.5,3.4L16.1,15c2.9-3.5,2.4-8.7-1-11.6C12,0.9,7.5,0.9,4.5,3.4z M15,16.1
	L3.4,4.5C0.5,8,1,13.2,4.5,16.1C7.5,18.6,12,18.6,15,16.1z M2.9,2.9c3.8-3.8,10-3.8,13.8,0c3.8,3.8,3.8,10,0,13.8
	c-3.8,3.8-10,3.8-13.8,0C-1,12.8-1,6.7,2.9,2.9z"
        />
      </svg>
    );
  }
);

Denied.displayName = 'Denied';

export default Denied;
