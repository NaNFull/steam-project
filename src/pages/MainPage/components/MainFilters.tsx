import { Stack } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import BaseFilters from '@src/pages/MainPage/components/BaseFilters';
import TradeitFilters from '@src/pages/MainPage/components/TradeitFilters';

function MainFilters() {
  return (
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
  );
}

export default MainFilters;
