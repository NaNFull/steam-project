import { inventoryTradeit } from '@src/pages/tradeit/settings.ts';
import type { IResponseData } from '@src/pages/tradeit/types.ts';

export const fetchInventoryData = async () => {
  try {
    const url = new URL(inventoryTradeit);
    // const params = new URLSearchParams(url.search);

    url.searchParams.set('gameId', '252490');
    url.searchParams.set('offset', '0');
    url.searchParams.set('sortType', 'Popularity');
    // url.searchParams.set('searchValue', '');
    url.searchParams.set('minPrice', '0');
    url.searchParams.set('maxPrice', '100000');
    url.searchParams.set('fresh', 'true');
    url.searchParams.set('limit', '500');
    url.searchParams.set('isForStore', '0');

    const response = await fetch('http://localhost:3000/api');

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.status}`);
    }

    return (await response.json()) as IResponseData;
  } catch (error) {
    console.error('There was a problem with the fetch operation:', error);
  }
};
