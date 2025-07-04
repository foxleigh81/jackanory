import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Phone = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 18 18"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M17,18c-2.1,0-4.1-.5-6.2-1.4-2-.9-3.9-2.2-5.5-3.9-1.7-1.7-3-3.5-3.9-5.5C.5,5.2,0,3.1,0,1S.1.5.3.3c.2-.2.4-.3.7-.3h4c.2,0,.4,0,.6.2.2.2.3.3.3.6l.6,3.5c0,.3,0,.5,0,.7,0,.2-.1.3-.3.5l-2.4,2.5c.3.6.7,1.2,1.2,1.8.5.6,1,1.1,1.5,1.7.5.5,1.1,1,1.6,1.4.6.4,1.2.8,1.8,1.2l2.3-2.4c.2-.1.3-.3.6-.3.2,0,.5,0,.7,0l3.5.7c.2,0,.4.2.6.4s.2.4.2.6v4.1c0,.3-.1.5-.3.8-.2.2-.5.3-.8.3ZM3,6l1.7-1.7-.4-2.3h-2.2c0,.7.2,1.4.3,2,.2.7.4,1.3.7,2ZM12,14.9c.6.3,1.3.5,2,.7.7.2,1.4.3,2,.3v-2.2l-2.4-.5-1.7,1.7Z" />
      </svg>
    );
  }
);

Phone.displayName = 'Phone';

export default Phone;
