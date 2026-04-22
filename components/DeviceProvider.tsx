'use client';

import { ReactNode, useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const DeviceProvider = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname();
  const isMobileRoute = pathname === '/m' || pathname.startsWith('/m/');

  useEffect(() => {
    document.body.classList.remove('device-mobile', 'device-desktop');
    document.body.classList.add(isMobileRoute ? 'device-mobile' : 'device-desktop');
  }, [isMobileRoute]);

  return <>{children}</>;
};
