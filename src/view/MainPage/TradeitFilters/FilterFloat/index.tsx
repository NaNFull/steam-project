import { Box, InputLabel, Stack, TextField } from '@mui/material';
import { NumericFormat } from 'react-number-format';

import { usePresent } from './hooks/usePresent';

function FilterFloat() {
  const { blurValueMaxFloat, blurValueMinFloat, maxFloat, minFloat, onValueMaxFloat, onValueMinFloat } = usePresent();

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
