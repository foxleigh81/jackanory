import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Map = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 19 18"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M12.5,18l-6-2.1-4.6,1.8c-.3.1-.6,0-.9-.1-.3-.2-.4-.5-.4-.8V2.8c0-.2,0-.4.2-.6.1-.2.3-.3.5-.4L6.5,0l6,2.1,4.6-1.8c.3-.1.6,0,.9.1.3.2.4.5.4.8v14c0,.2,0,.4-.2.6-.1.2-.3.3-.5.4l-5.3,1.8ZM11.5,15.6V3.8l-4-1.4v11.7l4,1.4ZM13.5,15.6l3-1V2.7l-3,1.1v11.7ZM2.5,15.3l3-1.2V2.5l-3,1v11.9Z" />
      </svg>
    );
  }
);

Map.displayName = 'Map';

export default Map;
