import { useMainStore } from '@src/store/main.store';
import { selectedGame } from '@src/view/pages/main/BaseFilters/FilterGame/gameTemplate';
import { type ChangeEventHandler, useCallback } from 'react';

export const usePresent = () => {
  const gameId = useMainStore(({ gameId }) => gameId);
  const setGameId = useMainStore(({ setGameId }) => setGameId);

  const onSetGameId = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const tempValue = value && value !== 'ALL' ? Number.parseInt(value, 10) : 'ALL';

      switch (tempValue) {
        case 'ALL':
        case 730:
        case 252_490:
        case 440:
        case 753: {
          setGameId(tempValue);
        }
      }
    },
    [setGameId],
  );
  return {
    data: selectedGame,
    defaultValue: selectedGame[0].gameId,
    gameId,
    onSetGameId,
  };
};
