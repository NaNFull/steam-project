import TradeitAPI from '@src/api/tradeitAPI';
import BaseModel from '@src/model/baseModel';
import type { ITradeitFilters, ITradeitFiltersCS2, ITradeitFiltersRUST } from '@src/model/tradeitModel.types';
import type { ICurrenciesResponse } from '@src/utils/typesUtils';
import isNil from 'lodash-es/isNil';

export default class TradeitModel extends TradeitAPI {
  readonly #rustCategory = ['Clothing', 'Weapons', 'Deployable', 'Decorations', 'Misc'];

  public constructor() {
    super();
  }

  public getRustId = (category: string) => this.#rustCategory.indexOf(category);

  public getData = async (filters: ITradeitFilters) => {
    const model = new BaseModel();
    const url = this.onChangeDataBase(filters);

    return model.fetch<boolean>(url);
  };

  public getCurrencies = async () => {
    const model = new BaseModel();
    const url = this.getURLCurrencies().href;

    return model.fetch<ICurrenciesResponse>(url);
  };

  public onChangeDataBase = (filters: ITradeitFilters) => {
    const url = this.getURLData();
    const {
      fresh = false,
      gameId = 252_490,
      isForStore = 0,
      limit = 500,
      maxPrice = 100_000,
      minPrice = 0,
      offset = 0,
      searchValue,
      sortType = 'Popularity',
    } = filters;

    url.searchParams.set('gameId', gameId.toString());
    url.searchParams.set('offset', offset.toString());
    url.searchParams.set('sortType', sortType);

    if (searchValue) {
      url.searchParams.set('searchValue', searchValue);
    }

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

    return url.href;
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
      type,
    }: ITradeitFiltersCS2,
    url: URL,
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

  public getClearCache = () => {
    const model = new BaseModel();
    const url = this.getURLClearCache().href;

    return model.fetch<boolean>(url);
  };
}
