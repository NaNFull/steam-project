import BaseModel from '@src/model/baseModel';
import TradeitModel from '@src/model/tradeitModel';
import { templatyMainPageSettings } from '@src/pages/MainPage/templatyMainPage';
import type { ISteamState, ISteamStore } from '@src/store/types.store';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const InitialState: ISteamState = {
  currencies: undefined,
  currency: templatyMainPageSettings.currency,
  data: [],
  density: templatyMainPageSettings.density,
  profitPercent: 0.7,
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
        const { currency, profitPercent, remainder } = get();
        const model = new BaseModel();
        const response = await model.postData({
          currency,
          profitPercent,
          remainder
        });
        if (response) {
          console.log(response);
        }
      },
      getTradeitData: async () => {
        const model = new TradeitModel();
        const response = await model.getData({
          fresh: true,
          gameId: 252_490,
          limit: 50
        });

        if (response) {
          set({ data: response.items });
        }
      },
      setCurrency: (value) => set({ currency: value }),
      setDensity: (value) => {
        if (typeof value === 'string') {
          set({ density: value });
        }

        return value;
      },
      setProfitPercent: (value) => set({ profitPercent: value }),
      setRemainder: (value) => set({ remainder: value })
    }),
    { name: 'Test' }
  )
);
