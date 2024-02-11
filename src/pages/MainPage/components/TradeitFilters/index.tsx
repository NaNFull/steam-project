import { Button, Card, CardActions, CardContent, Collapse, Stack } from '@mui/material';
import type { ITradeitGameIds } from '@src/model/tradeitModel.types';
import { selectedGame } from '@src/pages/MainPage/components/BaseFilters/FilterGame/gameTemplate';
import CardHeaderFilters from '@src/pages/MainPage/components/TradeitFilters/CardHeaderFilters';
import FilterFloat from '@src/pages/MainPage/components/TradeitFilters/FilterFloat';
import FilterGame from '@src/pages/MainPage/components/TradeitFilters/FilterGame';
import FilterOffset from '@src/pages/MainPage/components/TradeitFilters/FilterOffset';
import FilterPrices from '@src/pages/MainPage/components/TradeitFilters/FilterPrices';
import { useTradeitStore } from '@src/store/tradeit.store';
import { useBoolean, useLocalStorage } from 'usehooks-ts';

function TradeitFilters() {
  const [gameId] = useLocalStorage<ITradeitGameIds>('filterGameIdTradeit', selectedGame[1].gameId);
  const { toggle: toggleExpanded, value: expanded } = useBoolean(true);
  const getTradeitData = useTradeitStore(({ getTradeitData }) => getTradeitData);

  return (
    <Card aria-label="Взаимодействие с сайтом Tradeit">
      <CardHeaderFilters toggle={toggleExpanded} value={expanded} />
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
