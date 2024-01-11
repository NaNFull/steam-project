import type { IDataItemInventory } from '@src/store/types.store.ts';

export interface PriceColumnProps extends IDataItemInventory {
  price: number;
}
