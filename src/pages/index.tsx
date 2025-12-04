import { useEffect } from 'react';
import { useHistory } from '@docusaurus/router';
import useBaseUrl from '@docusaurus/useBaseUrl';

export default function Home() {
  const history = useHistory();
  const welcomeUrl = useBaseUrl('/welcome');
  
  useEffect(() => {
    history.replace(welcomeUrl);
  }, [history, welcomeUrl]);
  
  return null;
}