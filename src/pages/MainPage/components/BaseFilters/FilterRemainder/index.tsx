import HelpIcon from '@mui/icons-material/Help';
import { TextField, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { MainPageTemplate } from '@src/pages/MainPage/MainPageTemplate';
import { useSteamStore } from '@src/store/steam.store';
import isNil from 'lodash-es/isNil';
import type { FocusEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
import { NumericFormat } from 'react-number-format';
import type { OnValueChange } from 'react-number-format/types/types';

const { max: remainderMax, min: remainderMin } = MainPageTemplate.remainderSettings;

const LabelTooltip = () => {
  const tooltip = useMemo(() => `Ограничение дробной части от ${remainderMin} до ${remainderMax}`, []);
  return (
    <Typography alignItems="center" display="flex">
      Дробная часть
      <Tooltip title={tooltip}>
        <IconButton>
          <HelpIcon sx={{ height: 20, width: 20 }} />
        </IconButton>
      </Tooltip>
    </Typography>
  );
};

function FilterRemainder() {
  const remainder = useSteamStore(({ remainder }) => remainder);
  const setRemainder = useSteamStore(({ setRemainder }) => setRemainder);

  const suffix = useMemo(() => {
    if (isNil(remainder) || remainder < 1) return ' /.';

    return remainder <= 3 ? ` /.${'0'.repeat(remainder)}` : ` /.00x${remainder}`;
  }, [remainder]);

  const onValueRemainder = useCallback<OnValueChange>(
    ({ value }) => {
      const tempValue = value ? Number.parseInt(value, 10) : 0;

      setRemainder(tempValue);
    },
    [setRemainder]
  );

  const blurInputRemainder = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      let clampedValue = value ? Number.parseInt(value, 10) : 0;

      clampedValue = Math.max(remainderMin, clampedValue);
      clampedValue = Math.min(clampedValue, remainderMax);

      setRemainder(clampedValue);
    },
    [setRemainder]
  );

  return (
    <NumericFormat
      fixedDecimalScale
      allowNegative={false}
      customInput={TextField}
      id="input-remainder"
      label={<LabelTooltip />}
      suffix={suffix}
      sx={{ width: 140 }}
      value={remainder}
      variant="standard"
      onBlur={blurInputRemainder}
      onValueChange={onValueRemainder}
    />
  );
}

export default FilterRemainder;
