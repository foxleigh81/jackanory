import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const Image = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        viewBox="0 0 136.4 109.1"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path
          d="M136.4,97.7c0,6.2-5.1,11.4-11.4,11.4H11.4c-6.2,0-11.4-5.1-11.4-11.4V11.4C0,5.1,5.1,0,11.4,0h113.6c6.2,0,11.4,5.1,11.4,11.4v86.4ZM11.4,9.1c-1.2,0-2.3,1.1-2.3,2.3v86.4c0,1.2,1.1,2.3,2.3,2.3h113.6c1.2,0,2.3-1.1,2.3-2.3V11.4c0-1.2-1.1-2.3-2.3-2.3,0,0-113.6,0-113.6,0ZM31.8,45.5c-7.5,0-13.6-6.1-13.6-13.6s6.1-13.6,13.6-13.6,13.6,6.1,13.6,13.6-6.1,13.6-13.6,13.6ZM118.2,90.9H18.2v-13.6l22.7-22.7,11.4,11.4,36.4-36.4,29.5,29.5s0,31.8,0,31.8Z"
          strokeWidth="0"
        />
      </svg>
    );
  }
);

Image.displayName = 'Image';

export default Image;
