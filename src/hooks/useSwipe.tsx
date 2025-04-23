import { TouchEvent, useState } from 'react';

interface SwipeInput {
  onSwipedLeft?: () => void
  onSwipedRight?: () => void
  onSwipedUp?: () => void
  onSwipedDown?: () => void
};

interface SwipeOutput {
  onTouchStart: (e: TouchEvent) => void
  onTouchMove: (e: TouchEvent) => void
  onTouchEnd: () => void
};

const useSwipe = ({ onSwipedLeft, onSwipedRight, onSwipedUp, onSwipedDown }: SwipeInput): SwipeOutput => {
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);
  const [touchVertStart, setTouchVertStart] = useState<number>(0);
  const [touchVertEnd, setTouchVertEnd] = useState<number>(0);

  const minSwipeDistance: number = 50;

  const onTouchStart = (e: TouchEvent) => {
    setTouchEnd(0);
    setTouchStart(e.targetTouches[0].clientX);

    setTouchVertEnd(0);
    setTouchVertStart(e.targetTouches[0].clientY);
  };

  const onTouchMove = (e: TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
    setTouchVertEnd(e.targetTouches[0].clientY);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    if (!touchVertStart || !touchVertEnd) return;

    const distance = touchStart - touchEnd;
    const distanceVert = touchVertStart - touchVertEnd;

    if (Math.abs(distance) > Math.abs(distanceVert)) {
      if (distance > minSwipeDistance) onSwipedLeft && onSwipedLeft();
      else onSwipedRight && onSwipedRight();
    } else {
      if (distanceVert > minSwipeDistance) onSwipedUp && onSwipedUp();
      else onSwipedDown && onSwipedDown();
    }
  };

  return {
    onTouchStart,
    onTouchMove,
    onTouchEnd
  };
}

export default useSwipe;
