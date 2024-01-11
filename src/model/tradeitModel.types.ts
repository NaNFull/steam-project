import type { IDataItemInventory } from '@src/store/types.store.ts';

export interface IResponseData {
  items: IDataItemInventory[];
}

export const currenciesSymbol = {
  AUD: '$',
  BRL: 'R$',
  EUR: '€',
  GBP: '£',
  HKD: 'HK$',
  ILS: '₪',
  JPY: '¥',
  MXN: '$',
  PHP: '₱',
  RUB: '₽',
  THB: '฿',
  TRY: '₺'
};

export type ICurrenciesCodes = keyof typeof currenciesSymbol;

export interface ICurrenciesResponse {
  rates: ICurrencies;
}

export type ICurrencies = Record<ICurrenciesCodes, number>;

export const currenciesToKeep = Object.keys(currenciesSymbol) as ICurrenciesCodes[];
