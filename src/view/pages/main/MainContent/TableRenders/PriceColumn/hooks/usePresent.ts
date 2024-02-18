import { formatterValue } from '@src/utils/baseUtils';
import dayjs from 'dayjs';
import { type MouseEventHandler, useCallback, useMemo, useState } from 'react';

import type { ITransformedPrice } from '../../PriceColumn/types';
import type { Props } from './types';

export const usePresent = ({ currency, price, priceUSD, prices, remainder, ...pre }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const { memoPrice, memoPriceUSD, memoPrices } = useMemo(() => {
    const transformedData: ITransformedPrice[] = [];

    for (const item of prices) {
      const startOfDay = dayjs(item.date).millisecond(0).second(0).minute(0).hour(0).valueOf();

      const existingItem = transformedData.find(({ date }) => date === startOfDay);

      if (existingItem) {
        existingItem.prices.push(item);
      } else {
        transformedData.push({ date: startOfDay, id: startOfDay, prices: [item] });
      }
    }

    return {
      memoPrice: formatterValue(price, currency, remainder),
      memoPriceUSD: formatterValue(priceUSD, 'USD'),
      memoPrices: transformedData.slice(0, 5),
    };
  }, [currency, price, priceUSD, prices, remainder]);
  const handlePopoverOpen = useCallback<MouseEventHandler<HTMLElement>>(({ currentTarget }) => {
    setAnchorEl(currentTarget);
  }, []);
  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return {
    anchorEl,
    currency,
    data: memoPrices,
    handlePopoverClose,
    handlePopoverOpen,
    memoPrice,
    memoPriceUSD,
    open: Boolean(anchorEl),
    popoverID: anchorEl ? 'simple-popover' : undefined,
    remainder,
    ...pre,
  };
};
