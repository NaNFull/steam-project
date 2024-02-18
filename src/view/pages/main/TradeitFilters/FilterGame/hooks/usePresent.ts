import { useTradeitStore } from '@src/store/tradeit.store';
import { selectedGame } from '@src/view/pages/main/BaseFilters/FilterGame/gameTemplate';
import { type ChangeEventHandler, useCallback } from 'react';

export const usePresent = () => {
  const gameId = useTradeitStore(({ gameId }) => gameId);
  const setGameId = useTradeitStore(({ setGameId }) => setGameId);
  const games = selectedGame.slice(1);

  const onSetGameId = useCallback<ChangeEventHandler<HTMLInputElement>>(
    ({ target: { value } }) => {
      const tempValue = Number.parseInt(value, 10);

      switch (tempValue) {
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
    data: games,
    defaultValue: games[0].gameId,
    gameId,
    onSetGameId,
  };
};
