import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Stack,
} from '@mui/material';
import FilterCurrency from '@src/view/pages/main/BaseFilters/FilterCurrency';
import FilterGame from '@src/view/pages/main/BaseFilters/FilterGame';
import FilterPrices from '@src/view/pages/main/BaseFilters/FilterPrices';
import FilterProfit from '@src/view/pages/main/BaseFilters/FilterProfit';
import FilterRemainder from '@src/view/pages/main/BaseFilters/FilterRemainder';
import Header from '@src/view/pages/main/BaseFilters/Header';

import { usePresent } from './hooks/usePresent';

function BaseFilters() {
  const { cacheTradeit, expanded, getClearCache, handleCacheTradeit, postData, toggleExpanded } = usePresent();

  return (
    <Card aria-label="Взаимодействие с таблицей">
      <Header toggle={toggleExpanded} value={expanded} />
      <Collapse unmountOnExit in={expanded} timeout="auto">
        <CardContent>
          <Stack direction="row" spacing={1}>
            <FilterCurrency />
            <FilterRemainder />
            <FilterProfit />
          </Stack>
          <Stack direction="row" mt={1} spacing={1}>
            <FilterGame />
            <FilterPrices />
          </Stack>
          <Stack alignItems="center" direction="row" justifyContent="flex-start" mt={1} spacing={2}>
            <FormGroup>
              <FormControlLabel
                checked={cacheTradeit}
                control={<Checkbox />}
                label="Последний cache Tradeit"
                onChange={handleCacheTradeit}
              />
            </FormGroup>
            <Button size="small" variant="contained" onClick={getClearCache}>
              Очистить cache
            </Button>
          </Stack>
        </CardContent>
        <CardActions sx={{ justifyContent: 'end' }}>
          <Button variant="contained" onClick={postData}>
            Обновить таблицу
          </Button>
        </CardActions>
      </Collapse>
    </Card>
  );
}

export default BaseFilters;
