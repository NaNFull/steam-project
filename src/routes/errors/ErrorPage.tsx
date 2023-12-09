import type { ComponentType, PropsWithChildren } from 'react';
import { useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError() as any;

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error}</i>
      </p>
    </div>
  );
}

ErrorPage.withLayout = function withLayout(Layout: ComponentType<PropsWithChildren>) {
  return function ErrorPageWithLayout() {
    return (
      <Layout>
        <ErrorPage />
      </Layout>
    );
  };
};
