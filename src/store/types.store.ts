import type { ITradeitGameIds } from '@src/model/tradeitModel.types';
import type { ICurrencies, ICurrenciesCodes } from '@src/utils/typesUtils';
import type { OnChangeFn } from '@tanstack/react-table';
import type { MRT_DensityState } from 'material-react-table';
import type { Dispatch, DispatchWithoutAction } from 'react';

export interface IDataItemInventory {
  key: number;
  id: number;
  name: string;
  counts: number;
  steamAppId: number;
  prices: IPriceHistory[];
  priceUSD: number;
  priceUSDTM: number;
  priceInCurrency: number;
  priceTM: number;
  currency: ICurrenciesCodes;
  remainder: number;
  imgURL: string;
  // bots: number[]; // botIndexes

  // Others
  steamTags: string[];
  metaMappings: {
    category: number;
    item: number;
  };
  groupId: number;
  priceForTrade: number;
  sitePrice: number;
  wantedStock?: number;
  currentStock?: number;
}

export interface IPriceHistory {
  id: number;
  date: number;
  priceUSD: number;
  priceUSDTM: number;
  priceInCurrency: number;
  priceTM: number;
}

export interface ISteamState {
  gameId: ITradeitGameIds;
  data: IDataItemInventory[];
  density: MRT_DensityState;
  profitPercent: number;
  currency: ICurrenciesCodes;
  remainder: number;
  currencies?: ICurrencies;
  minPrice: number;
  maxPrice: number;
  cacheTradeit: boolean;
}

export interface ISteamSetters {
  setGameId: Dispatch<ITradeitGameIds>;
  setMinPrice: Dispatch<number>;
  setMaxPrice: Dispatch<number>;
  setProfitPercent: Dispatch<number>;
  setRemainder: Dispatch<number>;
  setCurrency: Dispatch<ICurrenciesCodes>;
  setCacheTradeit: Dispatch<boolean>;
}

export interface ISteamStore extends ISteamState, ISteamSetters {
  getTradeitData: () => Promise<void>;
  getFilters: () => Promise<void>;
  getData: () => Promise<void>;
  postData: () => Promise<void>;
  setDensity: OnChangeFn<MRT_DensityState>;
  getCurrencies: DispatchWithoutAction;
}

export interface ITradeitState {
  gameId: ITradeitGameIds;
  minPrice: number;
  maxPrice: number;
  minFloat: number;
  maxFloat: number;
}

export interface ITradeitSetters {
  setGameId: Dispatch<ITradeitGameIds>;
  setMinPrice: Dispatch<number>;
  setMaxPrice: Dispatch<number>;
  setMinFloat: Dispatch<number>;
  setMaxFloat: Dispatch<number>;
}

export interface ITradeitStore extends ITradeitState, ITradeitSetters {
  getTradeitData: () => Promise<void>;
}
