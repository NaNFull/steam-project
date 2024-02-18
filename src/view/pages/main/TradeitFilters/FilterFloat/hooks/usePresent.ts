import { useTradeitStore } from '@src/store/tradeit.store';
import { type FocusEventHandler, useCallback } from 'react';
import type { OnValueChange } from 'react-number-format/types/types';

export const usePresent = () => {
  const minFloat = useTradeitStore(({ minFloat }) => minFloat);
  const setMinFloat = useTradeitStore(({ setMinFloat }) => setMinFloat);
  const maxFloat = useTradeitStore(({ maxFloat }) => maxFloat);
  const setMaxFloat = useTradeitStore(({ setMaxFloat }) => setMaxFloat);

  const onValueMinFloat = useCallback<OnValueChange>(
    ({ value }) => {
      setMinFloat(Number.parseFloat(value));
    },
    [setMinFloat]
  );

  const blurValueMinFloat = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const tempValue = value ? Number.parseFloat(value) : 0;
      // Установим минимальное значение в 0
      let clampedValue = Math.max(tempValue, 0);

      // Если есть максимальное значение, ограничим им
      clampedValue = Math.min(clampedValue, maxFloat);

      // Ограничим максимальным значением 100 000
      clampedValue = Math.min(clampedValue, 1);

      setMinFloat(clampedValue);
    },
    [maxFloat, setMinFloat]
  );

  const onValueMaxFloat = useCallback<OnValueChange>(
    ({ value }) => {
      setMaxFloat(Number.parseFloat(value));
    },
    [setMaxFloat]
  );

  const blurValueMaxFloat = useCallback<FocusEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const tempValue = value ? Number.parseFloat(value) : 0;
      // Установим максимальное значение в 100_000
      let clampedValue = Math.min(tempValue, 1);

      // Если есть минимальное значение, ограничим им
      clampedValue = Math.max(minFloat, clampedValue);

      // Ограничим максимальным значением 100 000
      clampedValue = Math.min(clampedValue, 1);

      setMaxFloat(clampedValue);
    },
    [minFloat, setMaxFloat]
  );
  return {
    blurValueMaxFloat,
    blurValueMinFloat,
    maxFloat,
    minFloat,
    onValueMaxFloat,
    onValueMinFloat
  };
};
