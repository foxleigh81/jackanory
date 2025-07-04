import { DOMAttributes, useEffect, useRef, useState } from 'react';

import { ToastProps } from '@/components/feedback/toast';

export const useToast = (props: ToastProps) => {
  const [isRunning, setIsRunning] = useState(true);
  const toastRef = useRef<HTMLDivElement>(null);
  const syncProps = useRef(props);
  const {
    autoClose,
    pauseOnHover,
    closeOnClick,
    closeToast,
    pauseOnFocusLoss
  } = props;

  useEffect(() => {
    syncProps.current = props;
  });

  useEffect(() => {
    function bindFocusEvents() {
      if (!document.hasFocus()) pauseToast();

      window.addEventListener('focus', playToast);
      window.addEventListener('blur', pauseToast);
    }

    function unbindFocusEvents() {
      window.removeEventListener('focus', playToast);
      window.removeEventListener('blur', pauseToast);
    }

    if (pauseOnFocusLoss) bindFocusEvents();
    return () => {
      if (pauseOnFocusLoss) unbindFocusEvents();
    };
  }, [pauseOnFocusLoss]);

  function playToast() {
    setIsRunning(true);
  }

  function pauseToast() {
    setIsRunning(false);
  }

  const eventHandlers: DOMAttributes<HTMLElement> = {};

  if (autoClose && pauseOnHover) {
    eventHandlers.onMouseEnter = pauseToast;
    eventHandlers.onMouseLeave = playToast;
  }

  if (closeOnClick) {
    eventHandlers.onClick = () => {
      closeToast();
    };
  }

  return {
    playToast,
    pauseToast,
    isRunning,
    toastRef,
    eventHandlers
  };
};
