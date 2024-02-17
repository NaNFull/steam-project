import './MainPage.scss';

import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BaseFilters from '@src/pages/MainPage/components/BaseFilters';
import MainContent from '@src/pages/MainPage/components/MainContent';
import TradeitFilters from '@src/pages/MainPage/components/TradeitFilters';
import { useMainStore } from '@src/store/main.store';
import { clsx } from 'clsx';
import { useEffect } from 'react';

function MainPage() {
  const density = useMainStore(({ density }) => density);
  const getData = useMainStore(({ getData }) => getData);

  useEffect(() => {
    getData().catch((error) => console.log('Error useEffectOnce', error));
  }, [getData]);

  return (
    <Stack className={clsx('main_page', density)} rowGap={3}>
      <Stack aria-label="Фильтры по таблице" pl={1} pr={1} pt={1}>
        <Grid container spacing={2}>
          <Grid xs={8}>
            <TradeitFilters />
          </Grid>
          <Grid xs={4}>
            <BaseFilters />
          </Grid>
        </Grid>
      </Stack>
      <MainContent />
    </Stack>
  );
}

export default MainPage;
