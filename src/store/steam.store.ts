import SteamModel from '@src/model/steamModel';
import TradeitModel from '@src/model/tradeitModel';
import { MainPageTemplate } from '@src/pages/MainPage/MainPageTemplate';
import type { ISteamState, ISteamStore } from '@src/store/types.store';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const InitialState: ISteamState = {
  cacheTradeit: false,
  currencies: undefined,
  currency: 'RUB',
  data: [],
  density: MainPageTemplate.density,
  gameId: 'ALL',
  maxPrice: 100_000,
  minPrice: 0,
  profitPercent: 70,
  remainder: 2
};

export const useSteamStore = create<ISteamStore>()(
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
        const model = new SteamModel();
        const response = await model.getData();

        if (response) {
          set({ data: response.items });
        }
      },
      getFilters: async () => {
        const model = new SteamModel();
        const response = await model.getFilters();

        if (response) {
          console.log('response', response);
          set({ ...response });
        }
      },
      postData: async () => {
        const { cacheTradeit, currency, gameId, maxPrice, minPrice, profitPercent, remainder } = get();
        const model = new SteamModel();
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
    { name: 'Steam' }
  )
);
