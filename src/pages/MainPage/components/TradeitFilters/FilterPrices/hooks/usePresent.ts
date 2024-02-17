import { useTradeitStore } from '@src/store/tradeit.store';
import { type FocusEventHandler, useCallback } from 'react';
import type { OnValueChange } from 'react-number-format/types/types';

export const usePresent = () => {
  const minPrice = useTradeitStore(({ minPrice }) => minPrice);
  const setMinPrice = useTradeitStore(({ setMinPrice }) => setMinPrice);
  const maxPrice = useTradeitStore(({ maxPrice }) => maxPrice);
  const setMaxPrice = useTradeitStore(({ setMaxPrice }) => setMaxPrice);

  const onValueMinPrice = useCallback<OnValueChange>(
    ({ value }) => {
      const tempValue = Number.parseFloat(value);

      setMinPrice(tempValue);
    },
    [setMinPrice]
  );

  const blurValueMinPrice = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const formatValue = value.replace('$', '').replaceAll(',', '');
      const tempValue = Number.parseFloat(formatValue);
      // Установим минимальное значение в 0
      let clampedValue = Math.max(tempValue, 0);

      // Если есть максимальное значение, ограничим им
      clampedValue = Math.min(clampedValue, maxPrice);

      // Ограничим максимальным значением 100 000
      clampedValue = Math.min(clampedValue, 100_000);

      setMinPrice(clampedValue);
    },
    [maxPrice, setMinPrice]
  );

  const onValueMaxPrice = useCallback<OnValueChange>(
    ({ value }) => {
      const tempValue = Number.parseFloat(value);

      setMaxPrice(tempValue);
    },
    [setMaxPrice]
  );

  const blurValueMaxPrice = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const formatValue = value.replace('$', '').replaceAll(',', '');
      const tempValue = Number.parseFloat(formatValue);
      // Установим максимальное значение в 100_000
      let clampedValue = Math.min(tempValue, 100_000);

      // Если есть минимальное значение, ограничим им
      clampedValue = Math.max(minPrice, clampedValue);

      // Ограничим максимальным значением 100 000
      clampedValue = Math.min(clampedValue, 100_000);

      setMaxPrice(clampedValue);
    },
    [minPrice, setMaxPrice]
  );

  return {
    blurValueMaxPrice,
    blurValueMinPrice,
    maxPrice,
    minPrice,
    onValueMaxPrice,
    onValueMinPrice
  };
};
