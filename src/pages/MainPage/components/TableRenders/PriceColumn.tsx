import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Stack } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { currenciesSymbol } from '@src/model/tradeitModel.types';
import type { IPriceHistory } from '@src/store/types.store';
import dayjs from 'dayjs';
import type { MouseEventHandler } from 'react';
import { memo, useCallback, useMemo, useState } from 'react';

import type { PriceColumnProps } from './renders.types';

export interface ITransformedPrice {
  id: number;
  date: number;
  prices: IPriceHistory[];
}

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
      memoPrice: `${price.toFixed(remainder)} ${currenciesSymbol[currency]}`,
      memoPriceUSD: `(${priceUSD.toFixed(2)} $)`,
      memoPrices: transformedData
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
      <Stack alignItems="center" aria-describedby={popoverID} columnGap={1} direction="row" onClick={handlePopoverOpen}>
        <Typography variant="body1">
          {memoPrice}
          <Typography component="span" ml={0.5} variant="body2">
            {memoPriceUSD}
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
        <Typography fontSize="medium" sx={{ p: 1 }} variant="subtitle2">
          История:
        </Typography>
        {memoPrices.map(({ date, id, prices }) => (
          <Box key={id} rowGap={1} sx={{ p: 1 }}>
            <Typography component="strong">{dayjs(date).format('DD.MM.YY')}</Typography>
            {prices.map((item) => {
              const { id, priceUSD } = item;
              const tempPrice = `${item[type].toFixed(remainder)} ${currenciesSymbol[currency]}`;
              const tempPriceUSD = `(${priceUSD.toFixed(2)} $)`;

              return (
                <Typography key={id} variant="body1">
                  <Typography component="span" variant="body2">
                    {dayjs(item.date).format('HH:mm')} &mdash; {tempPrice}
                  </Typography>
                  <Typography component="span" ml={0.5} variant="body2">
                    {tempPriceUSD}
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
