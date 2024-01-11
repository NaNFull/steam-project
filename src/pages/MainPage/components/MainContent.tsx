import { useSteamStore } from '@src/store/steam.store.ts';
import constant from 'lodash-es/constant';
import { MaterialReactTable, useMaterialReactTable } from 'material-react-table';

import { columns } from './settings.tsx';

function MainContent() {
  const data = useSteamStore(({ data }) => data);
  const density = useSteamStore(({ density }) => density);
  const setDensity = useSteamStore(({ setDensity }) => setDensity);

  const table = useMaterialReactTable({
    columns,
    data: data,
    isMultiSortEvent: constant(true),
    maxMultiSortColCount: 3,
    onDensityChange: setDensity,
    state: {
      density
    }
  });

  return <MaterialReactTable table={table} />;
}

export default MainContent;
