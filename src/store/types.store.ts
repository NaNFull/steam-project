import type { ITradeitFilters, ITradeitGameIds } from '@src/model/tradeitModel.types';
import type { ICurrencies, ICurrenciesCodes } from '@src/utils/typesUtils';
import type { OnChangeFn } from '@tanstack/react-table';
import type { MRT_DensityState } from 'material-react-table';
import type { Dispatch, DispatchWithoutAction } from 'react';

export interface IDataItemInventory {
  key: number;
  id: number;
  name: string;
  counts: number;
  steamAppId: ITradeitFilters;
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

export interface IMainState {
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

export interface IMainSetters {
  setGameId: Dispatch<ITradeitGameIds>;
  setMinPrice: Dispatch<number>;
  setMaxPrice: Dispatch<number>;
  setProfitPercent: Dispatch<number>;
  setRemainder: Dispatch<number>;
  setCurrency: Dispatch<ICurrenciesCodes>;
  setCacheTradeit: Dispatch<boolean>;
}

export interface IMainStore extends IMainState, IMainSetters {
  getFilters: () => Promise<void>;
  getData: () => Promise<void>;
  postData: () => Promise<void>;
  setDensity: OnChangeFn<MRT_DensityState>;
  getCurrencies: DispatchWithoutAction;
}

export interface ITradeitState {
  gameId: ITradeitFilters['gameId'];
  minPrice: number;
  maxPrice: number;
  minFloat: number;
  maxFloat: number;
  offset: number;
}

export interface ITradeitSetters {
  setGameId: Dispatch<ITradeitFilters['gameId']>;
  setMinPrice: Dispatch<number>;
  setMaxPrice: Dispatch<number>;
  setMinFloat: Dispatch<number>;
  setMaxFloat: Dispatch<number>;
  setOffset: Dispatch<number>;
}

export interface ITradeitStore extends ITradeitState, ITradeitSetters {
  getTradeitData: DispatchWithoutAction;
}
