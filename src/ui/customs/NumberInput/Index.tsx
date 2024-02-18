import { forwardRef, useCallback } from 'react';
import type { NumericFormatProps } from 'react-number-format';
import { NumericFormat } from 'react-number-format';
import type { OnValueChange } from 'react-number-format/types/types';

interface CustomProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

const NumberInput = forwardRef<NumericFormatProps, CustomProps>(function NumericFormatCustom(props, ref) {
  const { onChange, ...other } = props;
  const { name } = props;

  const onValueChange = useCallback<OnValueChange>(
    ({ value }) => {
      onChange({
        target: {
          name: name,
          value: value
        }
      });
    },
    [name, onChange]
  );

  return (
    <NumericFormat
      {...other}
      thousandSeparator
      valueIsNumericString
      getInputRef={ref}
      prefix="$"
      onValueChange={onValueChange}
    />
  );
});

export default NumberInput;
