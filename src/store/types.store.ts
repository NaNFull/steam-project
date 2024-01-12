import type { ICurrencies, ICurrenciesCodes } from '@src/model/tradeitModel.types';
import type { OnChangeFn } from '@tanstack/react-table';
import type { MRT_DensityState } from 'material-react-table';
import type { Dispatch, DispatchWithoutAction } from 'react';

export interface IDataItemInventory {
  key: number;
  id: number;
  name: string;
  counts: number;
  steamAppId: number;
  priceUSD: [number, number][];
  priceInCurrency: [number, number][];
  priceTM: [number, number][];
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

export interface ISteamState {
  data: IDataItemInventory[];
  density: MRT_DensityState;
  profitPercent: number;
  currency: ICurrenciesCodes;
  remainder: number;
  currencies?: ICurrencies;
}

export interface ISteamStore extends ISteamState {
  getTradeitData: DispatchWithoutAction;
  setDensity: OnChangeFn<MRT_DensityState>;
  setProfitPercent: Dispatch<number>;
  setCurrency: Dispatch<ICurrenciesCodes>;
  setRemainder: Dispatch<number>;
  getCurrencies: DispatchWithoutAction;
}
