import TradeitAPI from '@src/api/tradeitAPI';
import type {
  ICurrenciesResponse,
  IResponseData,
  ITradeitFilters,
  ITradeitFiltersCS2,
  ITradeitFiltersRUST
} from '@src/model/tradeitModel.types';
import isNil from 'lodash-es/isNil';

export default class TradeitModel extends TradeitAPI {
  readonly #rustCategory = ['Clothing', 'Weapons', 'Deployable', 'Decorations', 'Misc'];

  public constructor() {
    super();
  }

  public getRustId = (category: string) => this.#rustCategory.indexOf(category);

  public getData = async (filters: ITradeitFilters) => {
    const {
      fresh = true,
      gameId = 252_490,
      isForStore = 0,
      limit = 500,
      maxPrice = 100_000,
      minPrice = 0,
      offset = 0,
      searchValue,
      sortType = 'Popularity'
    } = filters;
    const url = new URL(this.getPathData());

    url.searchParams.set('gameId', gameId.toString());
    url.searchParams.set('offset', offset.toString());
    url.searchParams.set('sortType', sortType);
    url.searchParams.set('searchValue', searchValue ?? '');
    url.searchParams.set('minPrice', minPrice.toString());
    url.searchParams.set('maxPrice', maxPrice.toString());
    url.searchParams.set('fresh', fresh.toString());
    url.searchParams.set('limit', limit.toString());
    url.searchParams.set('isForStore', isForStore.toString());

    switch (filters.gameId) {
      case 730: {
        this.onChangeDataCS2(filters, url);
        break;
      }
      case 252_490: {
        this.onChangeDataRUST(filters, url);
        break;
      }
    }

    try {
      const response = await fetch(url.href);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return (await response.json()) as IResponseData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  // TODO: Доработка
  public getCurrencies = async () => {
    try {
      const response = await fetch(this.getPathCurrencies());

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return (await response.json()) as ICurrenciesResponse;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  public onChangeDataCS2 = (
    {
      collection,
      colors,
      exterior,
      maxFloat = 1,
      minFloat = 0,
      rarity,
      showTradeLock = true,
      showUserListing,
      statTrak,
      type
    }: ITradeitFiltersCS2,
    url: URL
  ) => {
    url.searchParams.set('maxFloat', maxFloat < 1 ? maxFloat.toFixed(5) : '1');
    url.searchParams.set('minFloat', minFloat > 0 ? minFloat.toFixed(5) : '0');

    // Number/Boolean types
    if (!isNil(rarity)) {
      url.searchParams.set('rarity', rarity.toString());
    }
    if (!isNil(type)) {
      url.searchParams.set('type', type.toString());
    }
    if (!isNil(collection)) {
      url.searchParams.set('collection', collection.toString());
    }
    if (!isNil(showTradeLock)) {
      url.searchParams.set('showTradeLock', showTradeLock.toString());
    }
    if (!isNil(showUserListing)) {
      url.searchParams.set('showUserListing', showUserListing.toString());
    }

    // String types
    if (colors) {
      url.searchParams.set('colors', colors);
    }
    if (exterior) {
      url.searchParams.set('exterior', exterior);
    }
    if (statTrak) {
      url.searchParams.set('showUserListing', statTrak);
    }
  };

  public onChangeDataRUST = ({ rustCategory }: ITradeitFiltersRUST, url: URL) => {
    if (rustCategory) {
      url.searchParams.set('rustCategory', this.getRustId(rustCategory).toString());
    }
  };
}
