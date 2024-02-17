import { useMainStore } from '@src/store/main.store';
import { useEffect } from 'react';

export const usePresent = () => {
  const density = useMainStore(({ density }) => density);
  const getData = useMainStore(({ getData }) => getData);

  useEffect(() => {
    getData().catch((error) => console.log('Error useEffectOnce', error));
  }, [getData]);

  return { density };
};
