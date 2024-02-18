import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box, Stack } from '@mui/material';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import { formatterValue } from '@src/utils/baseUtils';
import dayjs from 'dayjs';
import { memo } from 'react';

import { usePresent } from './hooks/usePresent';
import type { Props } from './types';

function PriceColumn(props: Props) {
  const {
    anchorEl,
    currency,
    data,
    handlePopoverClose,
    handlePopoverOpen,
    memoPrice,
    memoPriceUSD,
    open,
    popoverID,
    remainder,
    type,
  } = usePresent(props);

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
          vertical: 'bottom',
        }}
        onClose={handlePopoverClose}
      >
        <Typography fontWeight="bold" sx={{ p: 1 }} variant="subtitle2">
          История:
        </Typography>
        {data.map(({ date, id, prices }) => (
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
