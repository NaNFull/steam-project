import { TextField } from '@mui/material';
import LabelTooltip from '@src/ui/mui/LabelTooltip';
import { NumericFormat } from 'react-number-format';

import { usePresent } from './hooks/usePresent';

function FilterProfit() {
  const { blurInputProfit, onValueProfit, profitPercent, textTooltip } = usePresent();

  return (
    <NumericFormat
      fixedDecimalScale
      allowNegative={false}
      customInput={TextField}
      id="input-profit"
      label={<LabelTooltip text="Профит" textTooltip={textTooltip} />}
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
