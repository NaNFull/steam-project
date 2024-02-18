import type { IDataResponse as ITradeitDataResponse, ITradeitGameIds } from '@src/model/tradeitModel.types';
import type { ICurrencies, ICurrenciesCodes } from '@src/utils/typesUtils';

export type IDataResponse = ITradeitDataResponse;

export interface IMainFilters {
  gameId: ITradeitGameIds;
  currency: ICurrenciesCodes;
  currencies: ICurrencies;
  profitPercent: number;
  remainder: number;
  maxPrice: number;
  minPrice: number;
  cacheTradeit: boolean;
}
