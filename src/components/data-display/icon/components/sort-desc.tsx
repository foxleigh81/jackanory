import { SVGAttributes, forwardRef } from 'react';

export type Props = SVGAttributes<SVGElement>;

export const SortDesc = forwardRef<SVGSVGElement, Props>(
  ({ fill = 'currentColor', ...props }, ref) => {
    return (
      <svg
        width="24"
        height="22"
        viewBox="0 0 24 22"
        xmlns="http://www.w3.org/2000/svg"
        fill={fill}
        {...props}
        ref={ref}
      >
        <path d="M23.7517 16.4103L19.9597 21.0744C19.8077 21.261 19.6077 21.3636 19.3997 21.3636H19.3757C19.1677 21.3636 18.9757 21.2796 18.8237 21.1117L14.6157 16.4476L15.7197 15.095L18.3997 18.0707V7.63245H19.9997V18.3132L22.5917 15.1323L23.7517 16.4103Z" />
        <path d="M24 0.636353H0V2.50199H24V0.636353Z" />
        <path d="M12.8 9.03125H0V10.8969H12.8V9.03125Z" />
        <path d="M9.6 17.4261H0V19.2918H9.6V17.4261Z" />
      </svg>
    );
  }
);

SortDesc.displayName = 'SortDesc';

export default SortDesc;
