import { TextField } from '@mui/material';
import { usePresent } from '@src/pages/MainPage/components/BaseFilters/FilterRemainder/hooks/usePresent';
import LabelTooltip from '@src/ui/mui/LabelTooltip';
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
