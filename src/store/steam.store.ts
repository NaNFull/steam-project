import SteamModel from '@src/model/steamModel';
import TradeitModel from '@src/model/tradeitModel';
import { MainPageTemplate } from '@src/pages/MainPage/MainPageTemplate';
import type { ISteamState, ISteamStore } from '@src/store/types.store';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const InitialState: ISteamState = {
  currencies: undefined,
  currency: MainPageTemplate.currency,
  data: [],
  density: MainPageTemplate.density,
  profitPercent: MainPageTemplate.profitPercentSettings.value,
  remainder: MainPageTemplate.remainderSettings.value
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
      postData: async () => {
        const { currency, profitPercent, remainder } = get();
        const model = new SteamModel();
        const params = JSON.stringify({
          currency,
          profitPercent: profitPercent / 100,
          remainder
        });
        const response = await model.postData(params);

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
