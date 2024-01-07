import { TradeitAPI } from '@src/api/api.ts';
import type { IDataItem, IResponseData } from '@src/pages/tradeit/types';
import type { ICurrenciesCodes } from '@src/utils/helpers/helperTradeit.ts';

export const fetchInventoryData = async () => {
  try {
    const tradeitAPI = new TradeitAPI();
    const url = new URL(tradeitAPI.getPathData());

    url.searchParams.set('gameId', '252490');
    url.searchParams.set('offset', '0');
    url.searchParams.set('sortType', 'Popularity');
    // url.searchParams.set('searchValue', '');
    url.searchParams.set('minPrice', '0');
    url.searchParams.set('maxPrice', '100000');
    url.searchParams.set('fresh', 'true');
    url.searchParams.set('limit', '500');
    url.searchParams.set('isForStore', '0');

    const response = await fetch('http://localhost:3002/api/tradeit/data');

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return (await response.json()) as IResponseData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};

export const formatterData = (
  data: IResponseData,
  rate = 1,
  profit = 0.7,
  currency: ICurrenciesCodes,
  remainder: number
): IDataItem[] =>
  data.items.map(({ groupId, id, imgURL, name, price, steamAppId }) => {
    // Разбиваем URL по символу "/"
    const parts = imgURL.split('/');
    const imageId = parts.at(-1)?.replace(/\.[^./]+$/, '');
    const tempPriceUSD = price / 100;
    const tempPriceInCurrency = (rate * price) / 100;
    const tempPriceTM = tempPriceInCurrency * profit;

    return {
      count: data.counts[groupId],
      currency,
      id,
      imageId,
      key: id,
      name,
      priceInCurrency: tempPriceInCurrency,
      priceTM: tempPriceTM,
      priceUSD: tempPriceUSD,
      remainder,
      steamAppId: steamAppId
    };
  });
