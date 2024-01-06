import type { ICurrenciesCodes } from '@src/utils/helpers/helperTradeit.ts';

export interface IDataItem {
  key: number;
  id: number;
  name: string;
  count: number;
  steamAppId: number;
  priceUSD: number;
  priceInCurrency: number;
  priceTM: number;
  currency: ICurrenciesCodes;
  remainder: number;
  imageId?: string;
  // bots: number[]; // botIndexes
}

export interface IResponseData {
  items: Item[];
  counts: Record<string, number>;
  badBots: number[];
  activeBots: string[];
  bestAvailableBotsMax: number;
}

export interface Item {
  assetLength: number;
  price: number;
  priceForTrade: number;
  metaMappings: MetaMappings;
  imgURL: string;
  name: string;
  phase: null;
  score: number;
  steamAppId: number;
  steamTags: string[];
  createdAt: Date;
  tradedAt: Date;
  groupId: number;
  classId: string;
  assetId: string;
  steamId: string;
  sitePrice: number;
  id: number;
  hasStickers: boolean;
  hasStattrak: boolean;
  floatValues: number[];
  botIndex: number;
  botIndexes: number[];
  colors: any[];
  stickers: any[];
  tradeLockDay: any[];
  _id: string;
}

export interface MetaMappings {
  // rarity: number;
  // type: number;
  // agent: boolean;
  category: number;
  item: number;
  rarity: string; // Add missing properties
  type: string;
  agent: string;
}

export type IExchangeRate = Record<string, number>;
