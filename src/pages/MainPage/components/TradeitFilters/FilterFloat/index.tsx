import { Box, InputLabel, Stack, TextField } from '@mui/material';
import type { FocusEventHandler } from 'react';
import { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
import type { OnValueChange } from 'react-number-format/types/types';
import { useLocalStorage } from 'usehooks-ts';

function FilterFloat() {
  const [minFloat, setMinFloat] = useLocalStorage<number>('minFloatTradeit', 0);
  const [maxFloat, setMaxFloat] = useLocalStorage<number>('maxFloatTradeit', 1);

  const onValueMinFloat = useCallback<OnValueChange>(
    ({ value }) => {
      setMinFloat(Number.parseFloat(value));
    },
    [setMinFloat]
  );

  const blurValueMinFloat = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const tempValue = value ? Number.parseFloat(value) : 0;
      // Установим минимальное значение в 0
      let clampedValue = Math.max(tempValue, 0);

      // Если есть максимальное значение, ограничим им
      clampedValue = Math.min(clampedValue, maxFloat);

      // Ограничим максимальным значением 100 000
      clampedValue = Math.min(clampedValue, 1);

      setMinFloat(clampedValue);
    },
    [maxFloat, setMinFloat]
  );

  const onValueMaxFloat = useCallback<OnValueChange>(
    ({ value }) => {
      setMaxFloat(Number.parseFloat(value));
    },
    [setMaxFloat]
  );

  const blurValueMaxFloat = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const tempValue = value ? Number.parseFloat(value) : 0;
      // Установим максимальное значение в 100_000
      let clampedValue = Math.min(tempValue, 1);

      // Если есть минимальное значение, ограничим им
      clampedValue = Math.max(minFloat, clampedValue);

      // Ограничим максимальным значением 100 000
      clampedValue = Math.min(clampedValue, 1);

      setMaxFloat(clampedValue);
    },
    [minFloat, setMaxFloat]
  );

  return (
    <Box>
      <InputLabel htmlFor="formatted-text-mask-input">Флоат</InputLabel>
      <Stack direction="row" spacing={1}>
        <NumericFormat
          fixedDecimalScale
          allowNegative={false}
          customInput={TextField}
          decimalScale={12}
          id="input-min-float"
          sx={{ width: 140 }}
          value={minFloat}
          variant="standard"
          onBlur={blurValueMinFloat}
          onValueChange={onValueMinFloat}
        />
        <NumericFormat
          fixedDecimalScale
          allowNegative={false}
          customInput={TextField}
          decimalScale={12}
          id="input-max-float"
          sx={{ width: 140 }}
          value={maxFloat}
          variant="standard"
          onBlur={blurValueMaxFloat}
          onValueChange={onValueMaxFloat}
        />
      </Stack>
    </Box>
  );
}

export default FilterFloat;
