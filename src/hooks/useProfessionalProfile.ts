import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const STORAGE_KEY = 'useProfessionalProfile';

const readFlag = () => {
  if (typeof window === 'undefined') return false;
  return sessionStorage.getItem(STORAGE_KEY) === 'true';
};

export default function useProfessionalProfile() {
  const location = useLocation();
  const [professionalOnly, setProfessionalOnly] = useState<boolean>(() => readFlag());

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(location.search);
    if (params.has('professionalProfile')) {
      sessionStorage.setItem(STORAGE_KEY, 'true');
      setProfessionalOnly(true);
      return;
    }
    setProfessionalOnly(readFlag());
  }, [location.search]);

  return professionalOnly;
}
