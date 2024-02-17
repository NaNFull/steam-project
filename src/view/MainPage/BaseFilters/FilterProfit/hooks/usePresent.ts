import { Template } from '@src/pages/MainPage/template';
import { useMainStore } from '@src/store/main.store';
import { type FocusEventHandler, useCallback } from 'react';
import type { OnValueChange } from 'react-number-format/types/types';

const { max: profitMax, min: profitMin } = Template.profitPercentSettings;

export const usePresent = () => {
  const profitPercent = useMainStore(({ profitPercent }) => profitPercent);
  const setProfitPercent = useMainStore(({ setProfitPercent }) => setProfitPercent);

  const blurInputProfit = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const { max, min } = Template.profitPercentSettings;
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
  return {
    blurInputProfit,
    onValueProfit,
    profitPercent,
    textTooltip: `Ограничение профита от ${profitMin} % до ${profitMax} %`
  };
};
