import { useMainStore } from '@src/store/main.store';
import constant from 'lodash-es/constant';
import { useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import { useColumns } from './useColumns';

export const usePresent = () => {
  const data = useMainStore(({ data }) => data);
  const density = useMainStore(({ density }) => density);
  const setDensity = useMainStore(({ setDensity }) => setDensity);

  const { columns } = useColumns();

  const table = useMaterialReactTable({
    columns,
    data: data,
    isMultiSortEvent: constant(true),
    localization: MRT_Localization_RU,
    maxMultiSortColCount: 3,
    onDensityChange: setDensity,
    state: {
      density,
    },
  });
  return {
    table,
  };
};
