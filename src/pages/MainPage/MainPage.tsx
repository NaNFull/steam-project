import './MainPage.scss';

import { Stack } from '@mui/material';
import MainContent from '@src/pages/MainPage/components/MainContent.tsx';
import MainFilters from '@src/pages/MainPage/components/MainFilter.tsx';
import { useSteamStore } from '@src/store/steam.store.ts';
import { clsx } from 'clsx';

function MainPage() {
  const density = useSteamStore(({ density }) => density);

  return (
    <Stack className={clsx('main_page', density)} rowGap={3}>
      <MainFilters />
      <MainContent />
    </Stack>
  );
}

export default MainPage;
