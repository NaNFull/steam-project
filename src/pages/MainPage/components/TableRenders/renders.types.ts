import type { IDataItemInventory, IPriceHistory } from '@src/store/types.store';

export interface PriceColumnProps extends IDataItemInventory {
  price: number;
  type: keyof IPriceHistory;
}
