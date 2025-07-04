import React, { useEffect, useState } from 'react';

import styles from './styles.module.scss';

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * The first side of the container
   */
  front: React.ReactNode;
  /**
   * The second side of the container
   */
  back: React.ReactNode;
  /**
   * How should the flip be activated:
   * - 'click' - Clicking the card will flip it
   * - 'hover' - Hovering over the card will flip it
   * - 'controlled' - The flip is controlled externally via the isFlipped prop
   * @default 'click'
   */
  flipType?: 'click' | 'controlled' | 'hover';
  /**
   * Should the card be flipped (useful for setting initial state)
   * @default false
   */
  isFlipped?: boolean;
  /**
   * The function to call when the card is flipped
   */
  onFlip?: (face: 'front' | 'back') => void;
}
/**
 * The Flip container displays two elements, one of which is visible at a time. The user can choose to flip between the two elements.
 */
const FlipContainer: React.FC<Props> = ({
  isFlipped = false,
  front,
  back,
  className,
  flipType = 'click',
  onFlip,
  ...props
}) => {
  const [flipped, setFlipped] = useState<boolean>(isFlipped);

  useEffect(() => {
    setFlipped(isFlipped);
  }, [isFlipped]);

  const handleFlip = (flippedState: boolean) => {
    if (onFlip) {
      onFlip(flippedState ? 'back' : 'front');
    }
    setFlipped(flippedState);
  };

  return (
    <div
      data-testid="flip-container"
      className={[
        styles['flip-container'],
        flipped ? styles['flipped'] : '',
        className || ''
      ]
        .filter(Boolean)
        .join(' ')}
      onClick={() => flipType === 'click' && handleFlip(!flipped)}
      onMouseEnter={() => flipType === 'hover' && handleFlip(true)}
      onMouseLeave={() => flipType === 'hover' && handleFlip(false)}
      {...props}
    >
      <div className={styles['flip-inner']}>
        <div
          className={styles['front']}
          tabIndex={flipType !== 'controlled' ? 0 : undefined}
        >
          {front}
        </div>
        <div
          className={styles['back']}
          onFocusCapture={() => flipType !== 'controlled' && setFlipped(true)}
          onBlurCapture={() => flipType !== 'controlled' && setFlipped(false)}
          tabIndex={flipType !== 'controlled' ? 0 : undefined}
        >
          {back}
        </div>
      </div>
    </div>
  );
};

FlipContainer.displayName = 'FlipContainer';

export default FlipContainer;
