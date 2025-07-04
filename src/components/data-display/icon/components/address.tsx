import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Address = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 34 34"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M7,20.3v-6.7h-3.3v16.7h26.7V13.7H13.7v-3.3h16.7c.9,0,1.7.3,2.4,1,.7.7,1,1.4,1,2.4v16.7c0,.9-.3,1.7-1,2.4-.7.7-1.4,1-2.4,1H3.7c-.9,0-1.7-.3-2.4-1-.7-.7-1-1.4-1-2.4V13.7c0-.9.3-1.7,1-2.4.7-.7,1.4-1,2.4-1h3.3V.3h13.3v6.7h-10v13.3h-3.3Z" />
      </svg>
    );
  }
);

Address.displayName = 'Address';

export default Address;
