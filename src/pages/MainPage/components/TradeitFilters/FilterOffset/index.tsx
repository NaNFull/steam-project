import HelpIcon from '@mui/icons-material/Help';
import { TextField, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useCallback } from 'react';
import { NumericFormat } from 'react-number-format';
import type { OnValueChange } from 'react-number-format/types/types';
import { useLocalStorage } from 'usehooks-ts';

function FilterOffset() {
  const [offsetTradeit, setOffsetTradeit] = useLocalStorage<number>('offsetTradeit', 500);

  const onValueOffset = useCallback<OnValueChange>(
    ({ value }) => {
      const tempValue = Number.parseFloat(value);

      setOffsetTradeit(tempValue);
    },
    [setOffsetTradeit]
  );

  return (
    <NumericFormat
      fixedDecimalScale
      thousandSeparator
      allowNegative={false}
      customInput={TextField}
      decimalScale={0}
      id="input-offset"
      sx={{ '& .MuiInput-root': { marginTop: '23px' }, width: 140 }}
      value={offsetTradeit}
      variant="standard"
      label={
        <Typography alignItems="center" display="flex">
          Загрузить
          <Tooltip title="Загрузить максимальное кол-во предметов с запроса">
            <IconButton>
              <HelpIcon sx={{ height: 20, width: 20 }} />
            </IconButton>
          </Tooltip>
        </Typography>
      }
      onValueChange={onValueOffset}
    />
  );
}

export default FilterOffset;
