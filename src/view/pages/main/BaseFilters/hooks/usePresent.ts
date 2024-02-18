import { useMainStore } from '@src/store/main.store';
import { useEffect } from 'react';
import { useBoolean } from 'usehooks-ts';

export const usePresent = () => {
  const getFilters = useMainStore(({ getFilters }) => getFilters);
  const postData = useMainStore(({ postData }) => postData);

  const { toggle: toggleExpanded, value: expanded } = useBoolean(true);

  useEffect(() => {
    if (expanded) {
      getFilters().catch((error) => console.log('Error useEffectOnce', error));
    }
  }, [expanded, getFilters]);

  return {
    expanded,
    postData,
    toggleExpanded,
  };
};
