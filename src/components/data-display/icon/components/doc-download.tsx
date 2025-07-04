import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const DocDownload = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 21.3 26.7"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M2.7,26.7c-.7,0-1.4-.3-1.9-.8-.5-.5-.8-1.1-.8-1.9V2.7c0-.7.3-1.4.8-1.9s1.2-.8,1.9-.8h10.7l8,8v16c0,.7-.3,1.4-.8,1.9-.5.5-1.2.8-1.9.8H2.7ZM12,9.3V2.7H2.7v21.3h16v-14.7h-6.7Z" />
        <path d="M9.3,12h2.7v5.6l2.1-2.1,1.9,1.9-5.3,5.3-5.3-5.3,1.9-1.9,2.1,2.1v-5.6Z" />
      </svg>
    );
  }
);

DocDownload.displayName = 'DocDownload';

export default DocDownload;
