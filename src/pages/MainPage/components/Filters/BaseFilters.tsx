import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import type { IconButtonProps } from '@mui/material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  InputAdornment,
  MenuItem,
  styled,
  TextField
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { MainPageTemplate } from '@src/pages/MainPage/MainPageTemplate';
import { useSteamStore } from '@src/store/steam.store';
import type { ICurrenciesCodes } from '@src/utils/typesUtils';
import { currenciesToKeep } from '@src/utils/typesUtils';
import type { ChangeEventHandler } from 'react';
import { useCallback } from 'react';
import { useBoolean } from 'usehooks-ts';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ expand, theme }) => ({
  marginLeft: 'auto',
  transform: expand ? 'rotate(180deg)' : 'rotate(0deg)',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}));

function BaseFilters() {
  const { toggle: toggleExpanded, value: expanded } = useBoolean(false);
  const profitPercent = useSteamStore(({ profitPercent }) => profitPercent);
  const setProfitPercent = useSteamStore(({ setProfitPercent }) => setProfitPercent);
  const currency = useSteamStore(({ currency }) => currency);
  const setCurrency = useSteamStore(({ setCurrency }) => setCurrency);
  const remainder = useSteamStore(({ remainder }) => remainder);
  const setRemainder = useSteamStore(({ setRemainder }) => setRemainder);
  const currencies = useSteamStore(({ currencies }) => currencies);
  const postData = useSteamStore(({ postData }) => postData);

  const onSetCurrency = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setCurrency(value as ICurrenciesCodes),
    [setCurrency]
  );
  const handleInputRemainder = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      setRemainder(value === '' ? 0 : Number(value));
    },
    [setRemainder]
  );
  const handleInputProfit = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      setProfitPercent(value === '' ? 0 : Number(value));
    },
    [setProfitPercent]
  );

  return (
    <Card>
      <CardHeader
        title="Настройки данных таблицы"
        action={
          <ExpandMore aria-expanded={expanded} aria-label="show more" expand={expanded} onClick={toggleExpanded}>
            <ExpandMoreIcon />
          </ExpandMore>
        }
      />
      <Collapse unmountOnExit in={expanded} timeout="auto">
        <CardContent>
          <Grid container spacing={2}>
            <Grid xs={4}>
              <TextField
                fullWidth
                select
                defaultValue="RUB"
                helperText="Выберете вашу валюту"
                id="standard-select-currency"
                label="Валюта"
                value={currency}
                variant="standard"
                onChange={onSetCurrency}
              >
                {Object.entries(currencies ?? { RUB: 100 })
                  .filter(([currency]) => currenciesToKeep.includes(currency as ICurrenciesCodes))
                  .map(([value, rate]) => (
                    <MenuItem key={value} sx={{ justifyContent: 'end' }} value={value}>
                      {`${rate} ${value}`}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid xs={4}>
              <TextField
                fullWidth
                label="Дробная часть"
                size="small"
                value={remainder}
                variant="standard"
                inputProps={{
                  max: MainPageTemplate.remainderSettings.max,
                  min: MainPageTemplate.remainderSettings.min,
                  step: 2,
                  type: 'number'
                }}
                onChange={handleInputRemainder}
              />
            </Grid>
            <Grid xs={4}>
              <TextField
                fullWidth
                label="Профит"
                size="small"
                value={profitPercent}
                variant="standard"
                inputProps={{
                  max: MainPageTemplate.profitPercentSettings.max,
                  min: MainPageTemplate.profitPercentSettings.min,
                  step: 5,
                  type: 'number'
                }}
                InputProps={{
                  startAdornment: <InputAdornment position="start">%</InputAdornment>
                }}
                onChange={handleInputProfit}
              />
            </Grid>
          </Grid>
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
