import type { IDataItemInventory } from '@src/store/types.store';
import type { MRT_ColumnDef } from 'material-react-table';

import NameColumn from './TableRenders/NameColumn';
import PriceColumn from './TableRenders/PriceColumn';

export const columns: MRT_ColumnDef<IDataItemInventory>[] = [
  {
    Cell: ({ row: { original } }) => <NameColumn {...original} />,
    accessorKey: 'name',
    header: 'Название предмета',
    sortingFn: (rowA, rowB) => rowB.original.counts - rowA.original.counts
  },
  {
    Cell: ({
      row: {
        original: { priceInCurrency },
        original
      }
    }) => <PriceColumn {...original} price={priceInCurrency[0][1]} />,
    accessorKey: 'priceInCurrency',
    filterFn: 'between',
    filterVariant: 'range',
    header: 'Цена на Tradeit',
    size: 150,
    sortDescFirst: false
  },
  {
    Cell: ({
      row: {
        original: { priceTM },
        original
      }
    }) => <PriceColumn {...original} price={priceTM[0][1]} />,
    accessorKey: 'priceTM',
    filterFn: 'between',
    filterVariant: 'range',
    header: 'Продажа на ТМ',
    size: 150,
    sortDescFirst: false
  }
];
