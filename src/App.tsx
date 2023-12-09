import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './ui/footer/Footer.tsx';
import Header from './ui/header/Header.tsx';

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
