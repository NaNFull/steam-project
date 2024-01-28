import type { IDataItemInventory } from '@src/store/types.store';

export interface IDataResponse {
  items: IDataItemInventory[];
}

export interface ITradeitFilterBase {
  offset?: number;
  limit?: number;
  sortType?: string;
  searchValue?: string;
  minPrice?: number;
  maxPrice?: number;
  fresh?: boolean;
  isForStore?: number;
}

// TODO: Требуется загружать данные из категории + добавить типы
export interface ITradeitFiltersCS2 extends ITradeitFilterBase {
  gameId: 730;
  minFloat?: number;
  maxFloat?: number;
  showTradeLock?: boolean;
  colors?: string;
  showUserListing?: boolean;
  type?: number; // Максимум 17, Others = -1
  collection?: number; // Максимум 46
  rarity?: number; // Максимум 11
  statTrak?: 'Has StatTrak' | 'No StatTrak' | 'Has Stickers';
  exterior?: 'FN' | 'MW' | 'FT' | 'WW' | 'BS';
}
export interface ITradeitFiltersRUST extends ITradeitFilterBase {
  gameId: 252_490;
  rustCategory?: string;
}
export interface ITradeitFiltersTF2 extends ITradeitFilterBase {
  gameId: 440;
}
export interface ITradeitFiltersSTEAM extends ITradeitFilterBase {
  gameId: 753;
}

export type ITradeitFilters = ITradeitFiltersCS2 | ITradeitFiltersRUST | ITradeitFiltersTF2 | ITradeitFiltersSTEAM;

export type ITradeitGameIds = 'ALL' | ITradeitFilters['gameId'];
