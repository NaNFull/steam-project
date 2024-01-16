import { Box, Button, Grid, Input, MenuItem, Slider, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useSteamStore } from '@src/store/steam.store';
import type { ICurrenciesCodes } from '@src/utils/typesUtils';
import { currenciesToKeep } from '@src/utils/typesUtils';
import type { ChangeEventHandler } from 'react';
import { useCallback } from 'react';

function MainFilters() {
  const profitPercent = useSteamStore(({ profitPercent }) => profitPercent);
  const setProfitPercent = useSteamStore(({ setProfitPercent }) => setProfitPercent);
  const currency = useSteamStore(({ currency }) => currency);
  const setCurrency = useSteamStore(({ setCurrency }) => setCurrency);
  const remainder = useSteamStore(({ remainder }) => remainder);
  const setRemainder = useSteamStore(({ setRemainder }) => setRemainder);
  const getTradeitData = useSteamStore(({ getTradeitData }) => getTradeitData);
  const currencies = useSteamStore(({ currencies }) => currencies);
  const getCurrencies = useSteamStore(({ getCurrencies }) => getCurrencies);

  const onProfitPercent = useCallback(
    (_event: Event, value: number | number[]) => {
      setProfitPercent(value as number);
    },
    [setProfitPercent]
  );
  const onSetCurrency = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setCurrency(value as ICurrenciesCodes),
    [setCurrency]
  );
  const onRemainder = useCallback(
    (_event: Event, newValue: number | number[]) => {
      if (typeof newValue === 'number') {
        setRemainder(newValue);
      }
    },
    [setRemainder]
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
    <Stack aria-label="filters-table" ml={4} mr={4}>
      <Button variant="outlined" onClick={getTradeitData}>
        Загрузить данные с Tradeit
      </Button>
      <Button variant="outlined" onClick={getCurrencies}>
        Обновить валюты
      </Button>
      <Box ml="auto" sx={{ width: 300 }}>
        <TextField
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
        <Typography gutterBottom id="input-slider" mt={1}>
          Погрешность валюты
        </Typography>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Slider aria-labelledby="input-slider" max={20} min={0} value={remainder} onChange={onRemainder} />
          </Grid>
          <Grid item>
            <Input
              size="small"
              value={remainder}
              inputProps={{
                'aria-labelledby': 'input-slider',
                max: 20,
                min: 0,
                step: 2,
                type: 'number'
              }}
              onChange={handleInputRemainder}
            />
          </Grid>
        </Grid>
        <Typography gutterBottom id="input-slider" mt={1}>
          Профит от Tradeit:
        </Typography>
        <Grid container alignItems="center" spacing={2}>
          <Grid item xs>
            <Slider
              aria-label="Profit percent"
              max={1}
              min={0}
              step={0.01}
              value={profitPercent}
              onChange={onProfitPercent}
            />
          </Grid>
          <Grid item>
            <Input
              size="small"
              value={profitPercent}
              inputProps={{
                'aria-labelledby': 'input-slider',
                max: 1,
                min: 0,
                step: 0.05,
                type: 'number'
              }}
              onChange={handleInputProfit}
            />
          </Grid>
        </Grid>
      </Box>
    </Stack>
  );
}

export default MainFilters;
