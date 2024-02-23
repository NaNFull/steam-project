import TradeitModel from '@src/model/tradeitModel';
import type { ITradeitState, ITradeitStore } from '@src/store/types.store';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

const InitialState: ITradeitState = {
  gameId: 730,
  isFetching: false,
  maxFloat: 1,
  maxPrice: 100_000,
  minFloat: 0,
  minPrice: 0,
  offset: 500,
};

export const useTradeitStore = create<ITradeitStore>()(
  persist(
    devtools(
      (set, get) => ({
        ...InitialState,
        getTradeitData: async () => {
          const { gameId, maxFloat, maxPrice, minFloat, minPrice, offset } = get();

          set({ isFetching: true });

          const model = new TradeitModel();
          const response = await model.getData({
            gameId,
            limit: 500,
            maxFloat,
            maxPrice,
            minFloat,
            minPrice,
            offset: offset,
          });

          if (response) {
            set({ isFetching: false });
          }
        },
        setGameId: (value) => set({ gameId: value }),
        setMaxFloat: (value) => set({ maxFloat: value }),
        setMaxPrice: (value) => set({ maxPrice: value }),
        setMinFloat: (value) => set({ minFloat: value }),
        setMinPrice: (value) => set({ minPrice: value }),
        setOffset: (value) => set({ offset: value }),
      }),
      { name: 'Tradeit' },
    ),
    {
      name: 'tradeit-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
