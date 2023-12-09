import AppLayout from '@src/App';
import Fallback from '@src/ui/others/Fallback.tsx';
import { createBrowserRouter } from 'react-router-dom';

import ErrorPage from './errors/ErrorPage';

const AppRouter = createBrowserRouter([
  {
    Component: AppLayout,
    ErrorBoundary: ErrorPage.withLayout(AppLayout),
    children: [
      {
        Component: Fallback,
        index: true
      },
      {
        Component: Fallback,
        path: 'about'
      }
    ],
    path: '/'
  }
]);

export default AppRouter;
