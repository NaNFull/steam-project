import { MenuItem, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import { formatterValue } from '@src/utils/baseUtils';
import type { ICurrenciesCodes } from '@src/utils/typesUtils';

import { usePresent } from './hooks/usePresent';
function FilterCurrency() {
  const { currency, data, onSetCurrency } = usePresent();

  return (
    <TextField
      select
      defaultValue="RUB"
      helperText="Выберете вашу валюту"
      id="standard-select-currency"
      label="Валюта"
      sx={{ width: 200 }}
      value={currency}
      variant="standard"
      onChange={onSetCurrency}
    >
      {data.map(([rate, value]) => (
        <MenuItem key={rate} sx={{ justifyContent: 'end' }} value={rate}>
          <Typography style={{ fontFamily: 'Roboto Mono, monospace' }}>
            {`${formatterValue(value, rate as ICurrenciesCodes, 5)} | ${rate}`}
          </Typography>
        </MenuItem>
      ))}
    </TextField>
  );
}

export default FilterCurrency;
