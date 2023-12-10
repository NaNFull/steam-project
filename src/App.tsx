import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './ui/footer/Footer';
import Header from './ui/header/Header';

function App({ children }: PropsWithChildren) {
  return (
    <>
      <Header />
      {children ?? <Outlet />}
      <Footer />
    </>
  );
}

export default App;
