import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Close = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 12 12"
        fill={fill}
        {...props}
        ref={ref}
      >
        <g>
          <g id="Layer_1">
            <path d="M.3.3C.7,0,1.3,0,1.7.3l4.3,4.3L10.3.3c.4-.4,1-.4,1.4,0,.4.4.4,1,0,1.4,0,0,0,0,0,0l-4.3,4.3,4.3,4.3c.4.4.4,1,0,1.4-.4.4-1,.4-1.4,0l-4.3-4.3L1.7,11.7c-.4.4-1,.4-1.4,0-.4-.4-.4-1,0-1.4l4.3-4.3L.3,1.7C0,1.3,0,.7.3.3Z" />
          </g>
        </g>
      </svg>
    );
  }
);

Close.displayName = 'Close';

export default Close;
