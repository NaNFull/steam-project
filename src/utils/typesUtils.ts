import { currenciesLocale } from '@src/utils/baseUtils';

export type ICurrenciesCodes = keyof typeof currenciesLocale;

export interface ICurrenciesResponse {
  rates: ICurrencies;
}

export type ICurrencies = Record<ICurrenciesCodes, number>;

export const currenciesToKeep = Object.keys(currenciesLocale) as ICurrenciesCodes[];
