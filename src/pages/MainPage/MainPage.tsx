import './MainPage.scss';

import { Stack } from '@mui/material';
import { BaseFiltersLocals } from '@src/pages/MainPage/BaseFiltersLocals';
import MainContent from '@src/pages/MainPage/components/MainContent';
import MainFilters from '@src/pages/MainPage/components/MainFilters';
import { TradeitFiltersLocals } from '@src/pages/MainPage/TradeitFiltersLocals';
import { useSteamStore } from '@src/store/steam.store';
import { clsx } from 'clsx';
import { useEffect } from 'react';

function MainPage() {
  const density = useSteamStore(({ density }) => density);
  const getData = useSteamStore(({ getData }) => getData);

  useEffect(() => {
    getData().catch((error) => console.log('Error useEffectOnce', error));
  }, [getData]);

  return (
    <Stack className={clsx('main_page', density)} rowGap={3}>
      <MainFilters />
      <MainContent />
      <TradeitFiltersLocals />
      <BaseFiltersLocals />
    </Stack>
  );
}

export default MainPage;
