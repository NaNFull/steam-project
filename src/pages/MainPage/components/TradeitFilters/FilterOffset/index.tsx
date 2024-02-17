import HelpIcon from '@mui/icons-material/Help';
import { TextField, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { NumericFormat } from 'react-number-format';

import { usePresent } from './hooks/usePresent';

function FilterOffset() {
  const { offset, onValueOffset } = usePresent();
  return (
    <NumericFormat
      fixedDecimalScale
      thousandSeparator
      allowNegative={false}
      customInput={TextField}
      decimalScale={0}
      id="input-offset"
      sx={{ '& .MuiInput-root': { marginTop: '23px' }, width: 140 }}
      value={offset}
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
