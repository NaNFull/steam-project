import { useSteamStore } from '@src/store/steam.store';
import constant from 'lodash-es/constant';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';
import { MRT_Localization_RU } from 'material-react-table/locales/ru';

import { columns } from './settings';

function MainContent() {
  const data = useSteamStore(({ data }) => data);
  const density = useSteamStore(({ density }) => density);
  const setDensity = useSteamStore(({ setDensity }) => setDensity);

  const table = useMaterialReactTable({
    columns,
    data: data,
    isMultiSortEvent: constant(true),
    localization: MRT_Localization_RU,
    maxMultiSortColCount: 3,
    onDensityChange: setDensity,
    state: {
      density
    }
  });

  return <MaterialReactTable table={table} />;
}

export default MainContent;
