import { RouterProvider } from 'react-router-dom';

import AppRouter from './app.router';

// TODO: Добавить поддержку роутера
function Router() {
  return <RouterProvider router={AppRouter} />;
}

export default Router;
