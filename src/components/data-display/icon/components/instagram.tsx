import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Instagram = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 23 22"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M7,0C3.4,0,.5,2.9.5,6.5v9c0,3.6,2.9,6.5,6.5,6.5h9c3.6,0,6.5-2.9,6.5-6.5V6.5C22.5,2.9,19.6,0,16,0H7ZM17.5,4c.5,0,1,.4,1,1s-.5,1-1,1-1-.5-1-1,.5-1,1-1ZM11.5,5.5c3,0,5.5,2.5,5.5,5.5s-2.5,5.5-5.5,5.5-5.5-2.5-5.5-5.5,2.5-5.5,5.5-5.5ZM11.5,6.5c-2.5,0-4.5,2-4.5,4.5s2,4.5,4.5,4.5,4.5-2,4.5-4.5-2-4.5-4.5-4.5Z" />
      </svg>
    );
  }
);

Instagram.displayName = 'Instagram';

export default Instagram;
