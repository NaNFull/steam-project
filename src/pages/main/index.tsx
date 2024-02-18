import './style.scss';

import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BaseFilters from '@src/view/pages/main/BaseFilters';
import MainContent from '@src/view/pages/main/MainContent';
import TradeitFilters from '@src/view/pages/main/TradeitFilters';
import { clsx } from 'clsx';

import { usePresent } from './hooks/usePresent';

function MainPage() {
  const { density } = usePresent();

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
