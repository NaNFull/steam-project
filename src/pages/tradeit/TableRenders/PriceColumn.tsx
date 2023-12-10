import Typography from '@mui/material/Typography';
import type { PriceColumnProps } from '@src/pages/tradeit/TableRenders/renders.types.ts';
import { currenciesBase } from '@src/utils/helperTradeit.ts';

function PriceColumn({ currency, price, priceUSD, remainder }: PriceColumnProps) {
  return (
    <Typography variant="body1">
      {`${price.toFixed(remainder)} ${currenciesBase[currency]}`}
      <Typography component="span" ml={0.5} variant="body2">
        {`(${priceUSD.toFixed(2)} $)`}
      </Typography>
    </Typography>
  );
}

export default PriceColumn;
