import { Box, Grid, Input, MenuItem, Slider, Stack, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { columns } from '@src/pages/settings.tsx';
import { formatterData } from '@src/pages/tradeit/functions';
import * as responseData from '@src/pages/tradeit/temp.json';
import type { IResponseData } from '@src/pages/tradeit/types';
import type { ICurrenciesCodes } from '@src/utils/helpers/helperTradeit.ts';
import { currenciesToKeep } from '@src/utils/helpers/helperTradeit.ts';
import { clsx } from 'clsx';
import constant from 'lodash-es/constant';
import type { MRT_DensityState } from 'material-react-table';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import type { ChangeEventHandler, FocusEventHandler } from 'react';
import { useCallback, useMemo, useState } from 'react';

import currencies from './tradeit/tempExchangeRate';

function MainPage() {
  const [data] = useState<IResponseData>(responseData as any);
  const [density, setDensity] = useState<MRT_DensityState>('spacious');
  const [profitPercent, setProfitPercent] = useState(0.7);
  const [currency, setCurrency] = useState<ICurrenciesCodes>('RUB');
  const [remainder, setRemainder] = useState(2);

  const onProfitPercent = useCallback((_event: Event, value: number | number[]) => {
    setProfitPercent(value as number);
  }, []);
  const onSetCurrency = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setCurrency(value as ICurrenciesCodes),
    []
  );
  const onRemainder = useCallback((_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      setRemainder(newValue);
    }
  }, []);
  const handleInputRemainder = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    setRemainder(value === '' ? 0 : Number(value));
  }, []);
  const handleBlurRemainder = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (remainder < 0) {
      setRemainder(0);
    } else if (remainder > 100) {
      setRemainder(100);
    }
  }, [remainder]);
  const handleInputProfit = useCallback<ChangeEventHandler<HTMLInputElement>>(({ target: { value } }) => {
    setProfitPercent(value === '' ? 0 : Number(value));
  }, []);
  const handleBlurProfit = useCallback<FocusEventHandler<HTMLInputElement>>(() => {
    if (remainder < 0) {
      setProfitPercent(0);
    } else if (remainder > 1) {
      setProfitPercent(1);
    }
  }, [remainder]);

  const memoData = useMemo(
    () => formatterData(data, currencies[currency], profitPercent, currency, remainder),
    [currency, data, profitPercent, remainder]
  );
  const table = useMaterialReactTable({
    columns,
    data: memoData,
    isMultiSortEvent: constant(true),
    maxMultiSortColCount: 3,
    onDensityChange: setDensity,
    state: {
      density
    }
  });

  return (
    <Stack className={clsx('main_page', density)} rowGap={3}>
      <Stack aria-label="filters-table" ml={4} mr={4}>
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
            {Object.entries(currencies)
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
                onBlur={handleBlurRemainder}
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
                onBlur={handleBlurProfit}
                onChange={handleInputProfit}
              />
            </Grid>
          </Grid>
        </Box>
      </Stack>
      <MaterialReactTable table={table} />
    </Stack>
  );
}

export default MainPage;
