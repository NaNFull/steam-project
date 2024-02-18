import { Box, InputLabel, Stack, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';

import { usePresent } from './hooks/usePresent';

function FilterPrices() {
  const { blurValueMaxPrice, blurValueMinPrice, maxPrice, minPrice, onValueMaxPrice, onValueMinPrice } = usePresent();

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
