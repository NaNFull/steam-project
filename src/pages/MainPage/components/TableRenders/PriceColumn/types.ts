import type { IDataItemInventory, IPriceHistory } from '@src/store/types.store';

export interface Props extends IDataItemInventory {
  price: number;
  type: keyof IPriceHistory;
}

export interface ITransformedPrice {
  id: number;
  date: number;
  prices: IPriceHistory[];
}
