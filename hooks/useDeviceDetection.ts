'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';

interface DeviceInfo {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export const useDeviceDetection = () => {
  const router = useRouter();
  const pathname = usePathname();

  const isMobileRoute = pathname === '/m' || pathname.startsWith('/m/');
  const currentView: 'mobile' | 'desktop' = isMobileRoute ? 'mobile' : 'desktop';

  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>({
    isMobile: false,
    isTablet: false,
    isDesktop: true,
  });

  useEffect(() => {
    const ua = navigator.userAgent;
    const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Mobile|mobile|CriOS/i.test(ua);
    const tablet = /iPad|Android(?!.*Mobile)|Tablet/i.test(ua);
    setDeviceInfo({
      isMobile: mobile && !tablet,
      isTablet: tablet,
      isDesktop: !mobile && !tablet,
    });
  }, []);

  const switchDevice = (device: 'mobile' | 'desktop') => {
    if (device === 'mobile') {
      const mobilePath = pathname === '/' ? '/m' : `/m${pathname}`;
      router.push(mobilePath);
    } else {
      const desktopPath = pathname === '/m' ? '/' : pathname.replace(/^\/m/, '');
      router.push(desktopPath);
    }
  };

  return { deviceInfo, currentView, switchDevice };
};
