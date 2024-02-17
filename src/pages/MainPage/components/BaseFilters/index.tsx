import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Collapse,
  FormControlLabel,
  FormGroup,
  Stack
} from '@mui/material';
import FilterCurrency from '@src/pages/MainPage/components/BaseFilters/FilterCurrency';
import FilterGame from '@src/pages/MainPage/components/BaseFilters/FilterGame';
import FilterPrices from '@src/pages/MainPage/components/BaseFilters/FilterPrices';
import FilterProfit from '@src/pages/MainPage/components/BaseFilters/FilterProfit';
import FilterRemainder from '@src/pages/MainPage/components/BaseFilters/FilterRemainder';
import Header from '@src/pages/MainPage/components/BaseFilters/Header';

import { usePresent } from './hooks/usePresent';

function BaseFilters() {
  const { expanded, postData, toggleExpanded } = usePresent();

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
          <Stack direction="row" mt={1} spacing={1}>
            <FormGroup>
              <FormControlLabel control={<Checkbox />} label="Последний cache Tradeit" />
            </FormGroup>
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
