import { Box, InputLabel, Stack, TextField } from '@mui/material';
import { useSteamStore } from '@src/store/steam.store';
import { type ChangeEventHandler, useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
import type { OnValueChange } from 'react-number-format/types/types';

function FilterPrices() {
  const minPrice = useSteamStore(({ minPrice }) => minPrice);
  const setMinPrice = useSteamStore(({ setMinPrice }) => setMinPrice);
  const maxPrice = useSteamStore(({ maxPrice }) => maxPrice);
  const setMaxPrice = useSteamStore(({ setMaxPrice }) => setMaxPrice);

  const onValueMinPrice = useCallback<OnValueChange>(
    ({ value }) => {
      setMinPrice(Number.parseFloat(value));
    },
    [setMinPrice]
  );

  const blurValueMinPrice = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const formatValue = value.replace('$', '').replaceAll(',', '');
      const tempValue = Number.parseFloat(formatValue);
      // Установим минимальное значение в 0
      let clampedValue = Math.max(tempValue, 0);

      // Если есть максимальное значение, ограничим им
      clampedValue = Math.min(clampedValue, maxPrice);

      // Ограничим максимальным значением 100 000
      clampedValue = Math.min(clampedValue, 100_000);

      setMinPrice(clampedValue);
    },
    [maxPrice, setMinPrice]
  );

  const onValueMaxPrice = useCallback<OnValueChange>(
    ({ value }) => {
      setMaxPrice(Number.parseFloat(value));
    },
    [setMaxPrice]
  );

  const blurValueMaxPrice = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const formatValue = value.replace('$', '').replaceAll(',', '');
      const tempValue = Number.parseFloat(formatValue);
      // Установим максимальное значение в 100_000
      let clampedValue = Math.min(tempValue, 100_000);

      // Если есть минимальное значение, ограничим им
      clampedValue = Math.max(minPrice, clampedValue);

      // Ограничим максимальным значением 100 000
      clampedValue = Math.min(clampedValue, 100_000);

      setMaxPrice(clampedValue);
    },
    [minPrice, setMaxPrice]
  );

  return (
    <Box>
      <InputLabel htmlFor="formatted-text-mask-input">Цена</InputLabel>
      <Stack direction="row" spacing={1}>
        <NumericFormat
          fixedDecimalScale
          thousandSeparator
          allowNegative={false}
          customInput={TextField}
          decimalScale={2}
          id="input-min-price"
          prefix="$"
          sx={{ width: 140 }}
          value={minPrice}
          variant="standard"
          onBlur={blurValueMinPrice}
          onValueChange={onValueMinPrice}
        />
        <NumericFormat
          fixedDecimalScale
          thousandSeparator
          allowNegative={false}
          customInput={TextField}
          decimalScale={2}
          id="input-max-price"
          prefix="$"
          sx={{ width: 140 }}
          value={maxPrice}
          variant="standard"
          onBlur={blurValueMaxPrice}
          onValueChange={onValueMaxPrice}
        />
      </Stack>
    </Box>
  );
}

export default FilterPrices;
