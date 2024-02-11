/* eslint-disable react-hooks/exhaustive-deps */
import type { ITradeitFilters } from '@src/model/tradeitModel.types';
import { selectedGame } from '@src/pages/MainPage/components/TradeitFilters/FilterGame/gameTemplate';
import { useTradeitStore } from '@src/store/tradeit.store';
import { useEffect } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export const TempLocals = () => {
  const [minPrice] = useLocalStorage<number>('minPriceTradeit', 0);
  const [maxPrice] = useLocalStorage<number>('maxPriceTradeit', 100_000);
  const [minFloat] = useLocalStorage<number>('minFloatTradeit', 0);
  const [maxFloat] = useLocalStorage<number>('maxFloatTradeit', 1);
  const [gameId] = useLocalStorage<ITradeitFilters['gameId']>('filterGameIdTradeit', selectedGame[2].gameId);
  const [offset] = useLocalStorage<number>('offsetTradeit', 500);
  const setMinPrice = useTradeitStore(({ setMinPrice }) => setMinPrice);
  const setMaxPrice = useTradeitStore(({ setMaxPrice }) => setMaxPrice);
  const setMinFloat = useTradeitStore(({ setMinFloat }) => setMinFloat);
  const setMaxFloat = useTradeitStore(({ setMaxFloat }) => setMaxFloat);
  const setGameId = useTradeitStore(({ setGameId }) => setGameId);
  const setOffset = useTradeitStore(({ setOffset }) => setOffset);

  useEffect(() => {
    setMinPrice(minPrice);
  }, [minPrice]);
  useEffect(() => {
    setMaxPrice(maxPrice);
  }, [maxPrice]);
  useEffect(() => {
    setMinFloat(minFloat);
  }, [minFloat]);
  useEffect(() => {
    setMaxFloat(maxFloat);
  }, [maxFloat]);
  useEffect(() => {
    setGameId(gameId);
  }, [gameId]);
  useEffect(() => {
    setOffset(offset);
  }, [offset]);

  return <></>;
};
