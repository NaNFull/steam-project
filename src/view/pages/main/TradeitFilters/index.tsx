import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import { Card, CardActions, CardContent, Collapse, Stack } from '@mui/material';
import FilterFloat from '@src/view/pages/main/TradeitFilters/FilterFloat';
import FilterGame from '@src/view/pages/main/TradeitFilters/FilterGame';
import FilterOffset from '@src/view/pages/main/TradeitFilters/FilterOffset';
import FilterPrices from '@src/view/pages/main/TradeitFilters/FilterPrices';
import Header from '@src/view/pages/main/TradeitFilters/Header';

import { usePresent } from './hooks/usePresent';

function TradeitFilters() {
  const { expanded, gameId, getTradeitData, loading, toggleExpanded } = usePresent();

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
          <LoadingButton
            endIcon={<SendIcon />}
            loading={loading}
            loadingPosition="end"
            variant="contained"
            onClick={getTradeitData}
          >
            <span>Загрузить данные с Tradeit</span>
          </LoadingButton>
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default TradeitFilters;
