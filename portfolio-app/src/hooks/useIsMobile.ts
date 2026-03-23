import { useState, useEffect } from 'react';

/** Returns true when viewport width is below `breakpoint` (default 768 px). */
export function useIsMobile(breakpoint = 768): boolean {
  const [is, setIs] = useState<boolean>(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false,
  );
  useEffect(() => {
    const h = () => setIs(window.innerWidth < breakpoint);
    window.addEventListener('resize', h, { passive: true });
    return () => window.removeEventListener('resize', h);
  }, [breakpoint]);
  return is;
}

