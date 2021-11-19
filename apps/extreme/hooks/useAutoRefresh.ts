import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/router';

export const useAutoRefresh = () => {
  const router = useRouter();

  const reloadPage = useMemo(() => {
    return () => router.replace(router.asPath);
  }, [router]);

  useEffect(() => {
    const interval = setInterval(() => {
      reloadPage();
    }, 4000);
    return () => {
      clearInterval(interval);
    };
  }, [reloadPage]);

  return { reloadPage };
};
