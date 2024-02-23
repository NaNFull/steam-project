import { useMainStore } from '@src/store/main.store';
import type { SyntheticEvent } from 'react';
import { useCallback, useEffect } from 'react';
import { useBoolean } from 'usehooks-ts';

export const usePresent = () => {
  const cacheTradeit = useMainStore(({ cacheTradeit }) => cacheTradeit);
  const setCacheTradeit = useMainStore(({ setCacheTradeit }) => setCacheTradeit);
  const getFilters = useMainStore(({ getFilters }) => getFilters);
  const postData = useMainStore(({ postData }) => postData);
  const getClearCache = useMainStore(({ getClearCache }) => getClearCache);

  const { toggle: toggleExpanded, value: expanded } = useBoolean(true);

  const handleCacheTradeit = useCallback(
    (_event: SyntheticEvent, checked: boolean) => {
      setCacheTradeit(checked);
    },
    [setCacheTradeit],
  );

  useEffect(() => {
    if (expanded) {
      getFilters().catch((error) => console.log('Error useEffectOnce', error));
    }
  }, [expanded, getFilters]);

  return {
    cacheTradeit,
    expanded,
    getClearCache,
    handleCacheTradeit,
    postData,
    toggleExpanded,
  };
};
