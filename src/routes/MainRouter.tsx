import { RouterProvider } from 'react-router-dom';

import AppRouter from './app.router.ts';

function Router() {
  return <RouterProvider router={AppRouter} />;
}

export default Router;
