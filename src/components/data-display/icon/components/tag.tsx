import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Tag = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 20 20"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M19.4,12.2l-7.1,7.1c-.2.2-.4.4-.7.5s-.5.1-.8.1-.5,0-.8-.1-.5-.2-.7-.5L.6,10.6c-.2-.2-.3-.4-.4-.6-.1-.2-.2-.5-.2-.8V2C0,1.5.2,1,.6.6c.4-.4.9-.6,1.4-.6h7.2c.3,0,.5,0,.8.2.2.1.5.3.7.4l8.8,8.8c.2.2.3.4.4.7s.1.5.1.8,0,.5-.1.7c0,.2-.2.5-.4.7ZM10.8,18l7.2-7.1L9.1,2H2v7.1l8.8,8.9ZM4.5,6c.4,0,.8-.1,1.1-.4s.4-.6.4-1.1-.1-.8-.4-1.1-.6-.4-1.1-.4-.8.1-1.1.4-.4.6-.4,1.1.1.8.4,1.1.6.4,1.1.4Z" />
      </svg>
    );
  }
);

Tag.displayName = 'Tag';

export default Tag;
