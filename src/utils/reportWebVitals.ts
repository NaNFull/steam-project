import type { ReportHandler } from 'web-vitals';

// TODO: Отключить для приложения Electron, добавить в поддержку браузерной версии
export default (onPerfEntry?: ReportHandler) => {
  if (onPerfEntry && onPerfEntry instanceof Function) {
    import('web-vitals')
      .then(({ getCLS, getFCP, getFID, getLCP, getTTFB }) => {
        getCLS(onPerfEntry);
        getFID(onPerfEntry);
        getFCP(onPerfEntry);
        getLCP(onPerfEntry);
        getTTFB(onPerfEntry);
      })
      .catch((error) => console.log('Error web-vitals', error));
  }
};
