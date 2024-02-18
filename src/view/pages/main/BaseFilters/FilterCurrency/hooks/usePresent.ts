import { useMainStore } from '@src/store/main.store';
import type { ICurrenciesCodes } from '@src/utils/typesUtils';
import { currenciesToKeep } from '@src/utils/typesUtils';
import { type ChangeEventHandler, useCallback } from 'react';

export const usePresent = () => {
  const currency = useMainStore(({ currency }) => currency);
  const setCurrency = useMainStore(({ setCurrency }) => setCurrency);
  const currencies = useMainStore(({ currencies }) => currencies);

  const onSetCurrency = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => setCurrency(value as ICurrenciesCodes),
    [setCurrency],
  );
  const data = Object.entries(currencies ?? { RUB: 100 }).filter(([currency]) =>
    currenciesToKeep.includes(currency as ICurrenciesCodes),
  );

  return {
    currency,
    data,
    onSetCurrency,
  };
};
