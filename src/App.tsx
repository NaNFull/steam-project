import type { PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

import Footer from './view/footer';
import Header from './view/header';

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
