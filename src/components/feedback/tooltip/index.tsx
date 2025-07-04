import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import {
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useDismiss,
  offset,
  arrow,
  autoUpdate,
  FloatingArrow
} from '@floating-ui/react';

/* Import Stylesheet */
import styles from './styles.module.scss';

function setRef<T>(
  ref:
    | React.MutableRefObject<T | null>
    | ((instance: T | null) => void)
    | null
    | undefined,
  value: T | null
): void {
  if (typeof ref === 'function') {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}

function useForkRef<Instance>(
  ...refs: Array<React.Ref<Instance> | undefined>
): React.RefCallback<Instance> | null {
  /**
   * This will create a new function if the refs passed to this hook change and are all defined.
   * This means react will call the old forkRef with `null` and the new forkRef
   * with the ref. Cleanup naturally emerges from this behavior.
   */
  return React.useMemo(() => {
    if (refs.every((ref) => ref == null)) {
      return null;
    }

    return (instance) => {
      refs.forEach((ref) => {
        setRef(ref, instance);
      });
    };
  }, [refs]);
}

export interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'content'> {
  /**
   * The placement of the tooltip relative to the trigger
   * @default 'bottom'
   */
  placement?: 'top' | 'bottom' | 'left' | 'right';
  /**
   * Is the tooltip visible.
   * If undefined, the tooltip will be visible on hover/focus
   * If true/false, the tooltip will be visible/hidden regardless of hover/focus
   * @default undefined
   */
  isVisible?: boolean;
  /**
   * The content of the tooltip
   */
  content?: React.ReactNode | string;
}

/**
 * The 'Tooltip' component is used to display a small piece of information when the user hovers over or focuses on an element.
 */
export const Tooltip: React.FC<Props> = ({
  className,
  children,
  placement = 'bottom',
  isVisible,
  content,
  ...props
}: Props) => {
  if (React.Children.count(children) !== 1) {
    throw new Error('Tooltip: Must have exactly one child');
  }

  const [showTooltip, setShowTooltip] = useState(isVisible ?? false);
  const arrowRef = React.useRef<SVGSVGElement>(null);
  const [arrowOffset, setArrowOffset] = useState(0);

  const { refs, floatingStyles, context } = useFloating({
    open: showTooltip,
    onOpenChange: setShowTooltip,
    placement,
    middleware: [
      offset(8),
      arrow({
        element: arrowRef
      })
    ],
    whileElementsMounted: autoUpdate
  });

  useEffect(() => {
    const { reference, floating } = refs;
    // Set arrow offset relative to target element width
    // Don't offset for left & right placements
    if (
      reference.current &&
      floating.current &&
      ['bottom', 'top'].includes(placement)
    ) {
      const tooltipWidth = floating.current.getBoundingClientRect().width;
      const targetWidth = reference.current.getBoundingClientRect().width;
      let offsetPercent;

      /**
       * Center the arrow for small targets or
       * when the target width is less than 80% of the tooltip
       */
      if (targetWidth < 50 || targetWidth < tooltipWidth * 0.8) {
        offsetPercent = 0;
      } else {
        offsetPercent = 20;
      }
      setArrowOffset(offsetPercent);
    }
  }, [refs, showTooltip, placement]);

  const hover = useHover(context, {
    enabled: isVisible === undefined
  });
  const focus = useFocus(context, {
    enabled: isVisible === undefined
  });
  const dismiss = useDismiss(context);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss
  ]);

  useEffect(() => {
    if (isVisible === undefined) return;
    setShowTooltip(isVisible);
  }, [isVisible]);

  const childrenProps = {
    ...getReferenceProps(),
    ref: useForkRef(
      React.isValidElement(children) && 'ref' in children
        ? (children.ref as React.Ref<HTMLElement>)
        : undefined,
      refs.setReference
    )
  };

  return (
    <>
      {React.isValidElement(children) &&
        React.cloneElement(children, childrenProps)}
      {ReactDOM.createPortal(
        showTooltip && (
          <div
            data-testid="tooltip"
            ref={refs.setFloating}
            style={floatingStyles}
            className={[styles['tooltip'], className || '']
              .filter(Boolean)
              .join(' ')}
            role="tooltip"
            {...getFloatingProps()}
            {...props}
          >
            {content}
            <FloatingArrow
              ref={arrowRef}
              context={context}
              tipRadius={2}
              staticOffset={arrowOffset}
            />
          </div>
        ),
        document.body
      )}
    </>
  );
};

export default Tooltip;
