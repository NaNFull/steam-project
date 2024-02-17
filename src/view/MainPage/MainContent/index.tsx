import { MaterialReactTable } from 'material-react-table';

import { usePresent } from './hooks/usePresent';

function MainContent() {
  const { table } = usePresent();

  return <MaterialReactTable table={table} />;
}

export default MainContent;
