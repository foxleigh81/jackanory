import React from 'react';

import type { ToastProps } from '../index';

import styles from '../styles.module.scss';

export interface ProgressBarProps
  extends Pick<ToastProps, 'type' | 'isVisible' | 'closeToast'> {
  /**
   * The animation delay which determine when to close the toast
   */
  delay: number;
  /**
   * Whether or not the animation is running or paused
   */
  isRunning: boolean;
}

export function ProgressBar({
  delay,
  isRunning,
  isVisible,
  closeToast,
  type = 'default'
}: ProgressBarProps) {
  const style: React.CSSProperties = {
    animationDuration: `${delay}ms`,
    animationPlayState: isRunning ? 'running' : 'paused'
  };

  const animationEvent = {
    onAnimationEnd: () => {
      if (isVisible) {
        closeToast();
      }
    }
  };

  return (
    <div
      role="progressbar"
      aria-label="notification timer"
      className={[styles['progress-bar'], styles[type]]
        .filter(Boolean)
        .join(' ')}
      style={style}
      {...animationEvent}
    />
  );
}
