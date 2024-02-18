import MainModel from '@src/model/mainModel';
import TradeitModel from '@src/model/tradeitModel';
import { Template } from '@src/pages/main/template';
import type { IMainState, IMainStore } from '@src/store/types.store';
import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

const InitialState: IMainState = {
  cacheTradeit: false,
  currencies: undefined,
  currency: 'RUB',
  data: [],
  density: Template.density,
  gameId: 'ALL',
  maxPrice: 100_000,
  minPrice: 0,
  profitPercent: 70,
  remainder: 2
};

export const useMainStore = create<IMainStore>()(
  persist(
    devtools(
      (set, get) => ({
        ...InitialState,
        getCurrencies: async () => {
          const model = new TradeitModel();

          const response = await model.getCurrencies();

          if (response) {
            const { rates } = response;
            set({ currencies: rates });
          }
        },
        getData: async () => {
          const model = new MainModel();
          const response = await model.getData();

          if (response) {
            set({ data: response.items });
          }
        },
        getFilters: async () => {
          const model = new MainModel();
          const response = await model.getFilters();

          if (response) {
            console.log('response', response);
            set({ ...response });
          }
        },
        postData: async () => {
          const { cacheTradeit, currency, gameId, maxPrice, minPrice, profitPercent, remainder } = get();
          const model = new MainModel();
          const params = JSON.stringify({
            cacheTradeit,
            currency,
            gameId,
            maxPrice,
            minPrice,
            profitPercent,
            remainder
          });
          const response = await model.postData(params);

          if (response) {
            set({ data: response.items });
          }
        },
        setCacheTradeit: (value) => set({ cacheTradeit: value }),
        setCurrency: (value) => set({ currency: value }),
        setDensity: (value) => {
          if (typeof value === 'string') {
            set({ density: value });
          }

          return value;
        },
        setGameId: (value) => set({ gameId: value }),
        setMaxPrice: (value) => set({ maxPrice: value }),
        setMinPrice: (value) => set({ minPrice: value }),
        setProfitPercent: (value) => set({ profitPercent: value }),
        setRemainder: (value) => set({ remainder: value })
      }),
      { name: 'Main' }
    ),
    {
      name: 'main-store',
      partialize: ({ data, ...state }) => state,
      storage: createJSONStorage(() => localStorage)
    }
  )
);
