import { useTradeitStore } from '@src/store/tradeit.store';
import { useBoolean } from 'usehooks-ts';

export const usePresent = () => {
  const gameId = useTradeitStore(({ gameId }) => gameId);
  const getTradeitData = useTradeitStore(({ getTradeitData }) => getTradeitData);

  const { toggle: toggleExpanded, value: expanded } = useBoolean(true);

  return {
    expanded,
    gameId,
    getTradeitData,
    toggleExpanded
  };
};
