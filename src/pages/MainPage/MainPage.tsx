import './MainPage.scss';

import { Stack } from '@mui/material';
import MainContent from '@src/pages/MainPage/components/MainContent';
import MainFilters from '@src/pages/MainPage/components/MainFilters';
import { useSteamStore } from '@src/store/steam.store';
import { clsx } from 'clsx';
import { useEffectOnce } from 'usehooks-ts';

function MainPage() {
  const density = useSteamStore(({ density }) => density);
  const getData = useSteamStore(({ getData }) => getData);

  useEffectOnce(() => {
    getData().catch((error) => console.log('Error useEffectOnce', error));
  });

  return (
    <Stack className={clsx('main_page', density)} rowGap={3}>
      <MainFilters />
      <MainContent />
    </Stack>
  );
}

export default MainPage;
