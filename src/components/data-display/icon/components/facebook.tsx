import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Facebook = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 23 23"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M11.5.7C5.4.7.5,5.7.5,11.8s4.1,10.1,9.4,10.9v-8h-2.7v-2.9h2.7v-1.9c0-3.2,1.6-4.6,4.2-4.6s1.9,0,2.3.1v2.5h-1.8c-1.1,0-1.5,1.1-1.5,2.3v1.6h3.3l-.4,2.9h-2.8v8c5.4-.7,9.5-5.3,9.5-10.9S17.6.7,11.5.7Z" />
      </svg>
    );
  }
);

Facebook.displayName = 'Facebook';

export default Facebook;
