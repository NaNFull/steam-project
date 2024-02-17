import '@src/assets/scss/style.scss';

import MainPage from '@src/pages/MainPage';
import { SnackbarProvider } from 'notistack';
import * as ReactDOM from 'react-dom/client';

const element = document.querySelector('#root')!;

ReactDOM.createRoot(element).render(
  <SnackbarProvider maxSnack={3}>
    <MainPage />
  </SnackbarProvider>
);
