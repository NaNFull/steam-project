import Typography from '@mui/material/Typography';
import { currenciesSymbol } from '@src/model/tradeitModel.types.ts';

import type { PriceColumnProps } from './renders.types.ts';

function PriceColumn({ currency, price, priceUSD, remainder }: PriceColumnProps) {
  return (
    <Typography variant="body1">
      {`${price.toFixed(remainder)} ${currenciesSymbol[currency]}`}
      <Typography component="span" ml={0.5} variant="body2">
        {`(${priceUSD[0][1].toFixed(2)} $)`}
      </Typography>
    </Typography>
  );
}

export default PriceColumn;
