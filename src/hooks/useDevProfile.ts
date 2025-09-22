import { useLocation } from 'react-router-dom';

const PROFESSIONAL_PROFILE_PATH = '/professionalProfile';
const FROM_PARAM = 'from';
const FROM_PROFESSIONAL = 'professionalProfile';
const DEV_PROFILE_PARAM = 'devProfile';

export default function useDevProfile() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const devProfileParam = params.has(DEV_PROFILE_PARAM);
  const fromParam = params.get(FROM_PARAM);
  const devOnly =
    location.pathname === PROFESSIONAL_PROFILE_PATH || devProfileParam || fromParam === FROM_PROFESSIONAL;
  const returnTo = devOnly || fromParam === FROM_PROFESSIONAL ? PROFESSIONAL_PROFILE_PATH : '/';

  return { devOnly, returnTo };
}
