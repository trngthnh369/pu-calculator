import { useEffect, useState } from 'react';

export default function useViewportHeight() {
  const [isVeryShort, setIsVeryShort] = useState(false); // < 520
  const [isShort, setIsShort] = useState(false); // < 760

  useEffect(() => {
    function update() {
      if (typeof window === 'undefined') return;
      const h = window.innerHeight;
      setIsVeryShort(h < 520);
      setIsShort(h < 760);
    }
    update();
    window.addEventListener('resize', update);
    window.addEventListener('orientationchange', update);
    return () => {
      window.removeEventListener('resize', update);
      window.removeEventListener('orientationchange', update);
    };
  }, []);

  return { isShort, isVeryShort };
}
