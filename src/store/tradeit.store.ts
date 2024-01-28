import TradeitModel from '@src/model/tradeitModel';
import type { ITradeitState, ITradeitStore } from '@src/store/types.store';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const InitialState: ITradeitState = {
  gameId: 'ALL',
  maxFloat: 1,
  maxPrice: 100_000,
  minFloat: 0,
  minPrice: 0
};

export const useSteamStore = create<ITradeitStore>()(
  devtools(
    (set, _get) => ({
      ...InitialState,
      getTradeitData: async () => {
        const model = new TradeitModel();
        const response = await model.getData({
          gameId: 252_490,
          limit: 500
        });

        if (response) {
          set({ data: response.items });
        }
      },
      setGameId: (value) => set({ gameId: value }),
      setMaxFloat: (value) => set({ maxFloat: value }),
      setMaxPrice: (value) => set({ maxPrice: value }),
      setMinFloat: (value) => set({ minFloat: value }),
      setMinPrice: (value) => set({ minPrice: value })
    }),
    { name: 'Test' }
  )
);
