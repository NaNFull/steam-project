import { useTradeitStore } from '@src/store/tradeit.store';
import { useCallback } from 'react';
import type { OnValueChange } from 'react-number-format/types/types';

export const usePresent = () => {
  const offset = useTradeitStore(({ offset }) => offset);
  const setOffset = useTradeitStore(({ setOffset }) => setOffset);

  const onValueOffset = useCallback<OnValueChange>(
    ({ value }) => {
      const tempValue = Number.parseFloat(value);

      setOffset(tempValue);
    },
    [setOffset],
  );

  return {
    offset,
    onValueOffset,
  };
};
