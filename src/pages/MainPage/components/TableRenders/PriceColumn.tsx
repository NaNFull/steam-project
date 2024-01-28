import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Stack } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import type { IPriceHistory } from '@src/store/types.store';
import { formatterValue } from '@src/utils/baseUtils';
import dayjs from 'dayjs';
import type { MouseEventHandler } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';

import type { PriceColumnProps } from './renders.types';

export interface ITransformedPrice {
  id: number;
  date: number;
  prices: IPriceHistory[];
}

// TODO: Разделить на компоненты
function PriceColumn({ currency, price, priceUSD, prices, remainder, type }: PriceColumnProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const popoverID = open ? 'simple-popover' : undefined;

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
      memoPrices: transformedData.slice(0, 5)
    };
  }, [currency, price, priceUSD, prices, remainder]);
  const handlePopoverOpen = useCallback<MouseEventHandler<HTMLElement>>(({ currentTarget }) => {
    setAnchorEl(currentTarget);
  }, []);
  const handlePopoverClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <>
      <Stack
        alignItems="center"
        aria-describedby={popoverID}
        columnGap={1}
        direction="row"
        sx={{ cursor: 'pointer' }}
        onClick={handlePopoverOpen}
      >
        <Typography flexDirection="inherit" variant="body1">
          <Typography component="span" variant="body2">
            {memoPrice}
          </Typography>
          <Typography component="span" ml={0.5} variant="body2">
            ({memoPriceUSD})
          </Typography>
        </Typography>
        <ArrowDropDownIcon transform={`rotate(${open ? 180 : 0})`} />
      </Stack>
      <Popover
        anchorEl={anchorEl}
        id={popoverID}
        open={open}
        anchorOrigin={{
          horizontal: 'left',
          vertical: 'bottom'
        }}
        onClose={handlePopoverClose}
      >
        <Typography fontWeight="bold" sx={{ p: 1 }} variant="subtitle2">
          История:
        </Typography>
        {memoPrices.map(({ date, id, prices }) => (
          <Box key={id} rowGap={1} sx={{ p: 1 }}>
            <Typography component="strong">{dayjs(date).format('DD.MM.YY')}</Typography>
            {prices.map((item) => {
              const { id, priceUSDTM } = item;
              const priceUSD = type === 'priceTM' ? priceUSDTM : item.priceUSD;
              const tempPrice = formatterValue(item[type], currency, remainder);
              const tempPriceUSD = formatterValue(priceUSD, 'USD');

              return (
                <Typography key={id} variant="body1">
                  <Typography component="span" variant="body2">
                    {dayjs(item.date).format('HH:mm')} &mdash; {tempPrice}
                  </Typography>
                  <Typography component="span" ml={0.5} variant="body2">
                    ({tempPriceUSD})
                  </Typography>
                </Typography>
              );
            })}
          </Box>
        ))}
      </Popover>
    </>
  );
}

export default memo(PriceColumn);
