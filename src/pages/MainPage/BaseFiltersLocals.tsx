/* eslint-disable react-hooks/exhaustive-deps */
import type { ITradeitGameIds } from '@src/model/tradeitModel.types';
import { selectedGame } from '@src/pages/MainPage/components/TradeitFilters/FilterGame/gameTemplate';
import { useSteamStore } from '@src/store/steam.store';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const BaseFiltersLocals = () => {
  const [gameId] = useLocalStorage<ITradeitGameIds>('filterGameIdBase', selectedGame[0].gameId);
  const setGameId = useSteamStore(({ setGameId }) => setGameId);

  useEffect(() => {
    setGameId(gameId);
  }, [gameId]);

  return <></>;
};
