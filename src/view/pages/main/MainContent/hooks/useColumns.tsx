/* eslint-disable react/prop-types */
import type { IDataItemInventory } from '@src/store/types.store';
import type { MRT_ColumnDef } from 'material-react-table';
import { useMemo } from 'react';

import NameColumn from '../TableRenders/NameColumn';
import PriceColumn from '../TableRenders/PriceColumn';

export const useColumns = () => {
  const columns = useMemo<MRT_ColumnDef<IDataItemInventory>[]>(
    () => [
      {
        Cell: ({ row: { original } }) => <NameColumn {...original} />,
        accessorKey: 'name',
        header: 'Название предмета',
        sortingFn: (rowA, rowB) => rowB.original.counts - rowA.original.counts
      },
      {
        Cell: ({
          row: {
            original,
            original: { priceInCurrency }
          }
        }) => <PriceColumn {...original} price={priceInCurrency} type="priceInCurrency" />,
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
            original,
            original: { priceTM, priceUSDTM }
          }
        }) => <PriceColumn {...original} price={priceTM} priceUSD={priceUSDTM} type="priceTM" />,
        accessorKey: 'priceTM',
        filterFn: 'between',
        filterVariant: 'range',
        header: 'Продажа на ТМ',
        size: 150,
        sortDescFirst: false
      }
    ],
    []
  );

  return { columns };
};
