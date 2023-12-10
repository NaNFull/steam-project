import './assets/scss/style.scss';

import MainPage from '@src/pages/MainPage.tsx';
import { SnackbarProvider } from 'notistack';
// import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

// import MainRouter from './routes/MainRouter';

const element = document.querySelector('#root')!;

ReactDOM.createRoot(element).render(
  <SnackbarProvider maxSnack={3}>
    <MainPage />
  </SnackbarProvider>
);
