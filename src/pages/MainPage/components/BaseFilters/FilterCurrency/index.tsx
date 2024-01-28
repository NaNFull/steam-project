import { MenuItem, TextField } from '@mui/material';
import { useSteamStore } from '@src/store/steam.store';
import type { ICurrenciesCodes } from '@src/utils/typesUtils';
import { currenciesToKeep } from '@src/utils/typesUtils';
import type { ChangeEventHandler } from 'react';
import { useCallback } from 'react';

function FilterCurrency() {
  const currency = useSteamStore(({ currency }) => currency);
  const setCurrency = useSteamStore(({ setCurrency }) => setCurrency);
  const currencies = useSteamStore(({ currencies }) => currencies);

  const onSetCurrency = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setCurrency(value as ICurrenciesCodes),
    [setCurrency]
  );

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
      {Object.entries(currencies ?? { RUB: 100 })
        .filter(([currency]) => currenciesToKeep.includes(currency as ICurrenciesCodes))
        .map(([value, rate]) => (
          <MenuItem key={value} sx={{ justifyContent: 'end' }} value={value}>
            {`${rate} ${value}`}
          </MenuItem>
        ))}
    </TextField>
  );
}

export default FilterCurrency;
