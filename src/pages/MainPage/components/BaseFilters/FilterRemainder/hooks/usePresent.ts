import { MainPageTemplate } from '@src/pages/MainPage/MainPageTemplate';
import { useMainStore } from '@src/store/main.store';
import isNil from 'lodash-es/isNil';
import { type FocusEventHandler, useCallback, useMemo } from 'react';
import type { OnValueChange } from 'react-number-format/types/types';

const { max: remainderMax, min: remainderMin } = MainPageTemplate.remainderSettings;

export const usePresent = () => {
  const remainder = useMainStore(({ remainder }) => remainder);
  const setRemainder = useMainStore(({ setRemainder }) => setRemainder);

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

  return {
    blurInputRemainder,
    onValueRemainder,
    remainder,
    suffix,
    textTooltip: `Ограничение дробной части от ${remainderMin} до ${remainderMax}`
  };
};
