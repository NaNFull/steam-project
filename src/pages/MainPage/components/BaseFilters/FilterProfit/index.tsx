import HelpIcon from '@mui/icons-material/Help';
import { TextField, Tooltip } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { MainPageTemplate } from '@src/pages/MainPage/MainPageTemplate';
import { useSteamStore } from '@src/store/steam.store';
import type { FocusEventHandler } from 'react';
import { useCallback, useMemo } from 'react';
import { NumericFormat } from 'react-number-format';
import type { OnValueChange } from 'react-number-format/types/types';

const { max: profitMax, min: profitMin } = MainPageTemplate.profitPercentSettings;

const LabelTooltip = () => {
  const tooltip = useMemo(() => `Ограничение профита от ${profitMin} % до ${profitMax} %`, []);
  return (
    <Typography alignItems="center" display="flex">
      Профит
      <Tooltip title={tooltip}>
        <IconButton>
          <HelpIcon sx={{ height: 20, width: 20 }} />
        </IconButton>
      </Tooltip>
    </Typography>
  );
};
function FilterProfit() {
  const profitPercent = useSteamStore(({ profitPercent }) => profitPercent);
  const setProfitPercent = useSteamStore(({ setProfitPercent }) => setProfitPercent);

  const blurInputProfit = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const { max, min } = MainPageTemplate.profitPercentSettings;
      const formatValue = value.replace(' %', '');
      let clampedValue = formatValue ? Number.parseInt(value, 10) : 0;

      clampedValue = Math.max(min, clampedValue);
      clampedValue = Math.min(clampedValue, max);

      setProfitPercent(clampedValue);
    },
    [setProfitPercent]
  );
  const onValueProfit = useCallback<OnValueChange>(
    ({ value }) => {
      const tempValue = value ? Number.parseInt(value, 10) : 0;

      setProfitPercent(tempValue);
    },
    [setProfitPercent]
  );

  return (
    <NumericFormat
      fixedDecimalScale
      allowNegative={false}
      customInput={TextField}
      id="input-profit"
      label={<LabelTooltip />}
      suffix=" %"
      sx={{ width: 140 }}
      value={profitPercent}
      variant="standard"
      onBlur={blurInputProfit}
      onValueChange={onValueProfit}
    />
  );
}

export default FilterProfit;
