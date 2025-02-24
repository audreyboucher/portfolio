import { useState, useEffect, useRef } from 'react';

const useIsVisible = (initialVisibility: boolean) => {
  const [isVisible, setIsVisible] = useState(initialVisibility);
  const ref = useRef<null | HTMLElement>(null);

  const handleClickOutside = ({ target }: MouseEvent) => {
    if (!ref.current?.contains(target as Node)) setIsVisible(false);
  };

  useEffect(() => {
    document.addEventListener('click', handleClickOutside, true);
    return () => { document.removeEventListener('click', handleClickOutside, true); };
  }, []);

  return { ref, isVisible, setIsVisible };
};

export default useIsVisible;
