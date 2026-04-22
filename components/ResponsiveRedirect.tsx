'use client';

import { useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

const MOBILE_BREAKPOINT = 768;

export const ResponsiveRedirect = () => {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const check = () => {
      const isMobileRoute = pathname === '/m' || pathname.startsWith('/m/');
      const isMobileWidth = window.innerWidth <= MOBILE_BREAKPOINT;

      if (isMobileWidth && !isMobileRoute) {
        const mobilePath = pathname === '/' ? '/m' : `/m${pathname}`;
        router.replace(mobilePath);
      } else if (!isMobileWidth && isMobileRoute) {
        const desktopPath = pathname === '/m' ? '/' : pathname.replace(/^\/m/, '');
        router.replace(desktopPath);
      }
    };

    check();

    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, [pathname, router]);

  return null;
};
