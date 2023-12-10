import NameColumn from '@src/pages/tradeit/TableRenders/NameColumn.tsx';
import PriceColumn from '@src/pages/tradeit/TableRenders/PriceColumn.tsx';
import type { IDataItem } from '@src/pages/tradeit/types.ts';
import type { MRT_ColumnDef } from 'material-react-table';

export const columns: MRT_ColumnDef<IDataItem>[] = [
  {
    Cell: ({ row: { original } }) => <NameColumn {...original} />,
    accessorKey: 'name',
    header: 'Название скина',
    sortingFn: (rowA, rowB) => rowB.original.count - rowA.original.count
  },
  {
    Cell: ({
      row: {
        original: { priceInCurrency },
        original
      }
    }) => <PriceColumn {...original} price={priceInCurrency} />,
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
    }) => <PriceColumn {...original} price={priceTM} />,
    accessorKey: 'priceTM',
    filterFn: 'between',
    filterVariant: 'range',
    header: 'Продажа на ТМ',
    size: 150,
    sortDescFirst: false
  }
];
