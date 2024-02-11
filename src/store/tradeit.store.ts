import TradeitModel from '@src/model/tradeitModel';
import type { ITradeitState, ITradeitStore } from '@src/store/types.store';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const InitialState: ITradeitState = {
  gameId: 730,
  maxFloat: 1,
  maxPrice: 100_000,
  minFloat: 0,
  minPrice: 0,
  offset: 500
};

export const useTradeitStore = create<ITradeitStore>()(
  devtools(
    (set, get) => ({
      ...InitialState,
      getTradeitData: () => {
        const { gameId, maxFloat, maxPrice, minFloat, minPrice, offset } = get();
        let tempOffset = 0;
        const model = new TradeitModel();

        setInterval(async () => {
          const response = await model.getData({
            gameId,
            limit: 500,
            maxFloat,
            maxPrice,
            minFloat,
            minPrice,
            offset: tempOffset
          });

          if (response && response.items.length === 500 && tempOffset < offset) {
            tempOffset += 500;
          }
        }, 1000);
      },
      setGameId: (value) => set({ gameId: value }),
      setMaxFloat: (value) => set({ maxFloat: value }),
      setMaxPrice: (value) => set({ maxPrice: value }),
      setMinFloat: (value) => set({ minFloat: value }),
      setMinPrice: (value) => set({ minPrice: value }),
      setOffset: (value) => set({ offset: value })
    }),
    { name: 'Tradeit' }
  )
);
