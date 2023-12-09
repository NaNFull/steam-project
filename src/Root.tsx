import './styles/style.scss';

import Tradeit from '@src/pages/tradeit/Tradeit.tsx';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';

// import MainRouter from './routes/MainRouter';
import reportWebVitals from './utils/reportWebVitals';

const element = document.querySelector('#root')!;

ReactDOM.createRoot(element).render(
  <React.StrictMode>
    {/* <MainRouter /> */}
    <Tradeit />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
