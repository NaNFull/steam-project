import { TextField } from '@mui/material';
import LabelTooltip from '@src/ui/mui/LabelTooltip';
import { usePresent } from '@src/view/MainPage/BaseFilters/FilterRemainder/hooks/usePresent';
import { NumericFormat } from 'react-number-format';

function FilterRemainder() {
  const { blurInputRemainder, onValueRemainder, remainder, suffix, textTooltip } = usePresent();

  return (
    <NumericFormat
      fixedDecimalScale
      allowNegative={false}
      customInput={TextField}
      id="input-remainder"
      label={<LabelTooltip text="Дробная часть" textTooltip={textTooltip} />}
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
