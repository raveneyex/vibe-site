import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'useDevProfile';

const readFlag = () => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEY) === 'true';
};

export default function useDevProfile() {
  const location = useLocation();
  const [devOnly, setDevOnly] = useState<boolean>(() => readFlag());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(location.search);
    if (params.has('devProfile')) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setDevOnly(true);
      return;
    }
    setDevOnly(readFlag());
  }, [location.search]);

  return devOnly;
}
