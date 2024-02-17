import { Button, Card, CardActions, CardContent, Collapse, Stack } from '@mui/material';
import FilterFloat from '@src/pages/MainPage/components/TradeitFilters/FilterFloat';
import FilterGame from '@src/pages/MainPage/components/TradeitFilters/FilterGame';
import FilterOffset from '@src/pages/MainPage/components/TradeitFilters/FilterOffset';
import FilterPrices from '@src/pages/MainPage/components/TradeitFilters/FilterPrices';
import Header from '@src/pages/MainPage/components/TradeitFilters/Header';

import { usePresent } from './hooks/usePresent';
function TradeitFilters() {
  const { expanded, gameId, getTradeitData, toggleExpanded } = usePresent();

  return (
    <Card aria-label="Взаимодействие с сайтом Tradeit">
      <Header toggle={toggleExpanded} value={expanded} />
      <Collapse unmountOnExit in={expanded} timeout="auto">
        <CardContent>
          <Stack direction="row" spacing={1}>
            <FilterGame />
            <FilterPrices />
            {gameId === 730 && <FilterFloat />}
            <FilterOffset />
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end' }}>
          <Button variant="contained" onClick={getTradeitData}>
            Загрузить данные с Tradeit
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default TradeitFilters;
