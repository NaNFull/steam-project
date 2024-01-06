export const currenciesBase = {
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

export type ICurrenciesCodes = keyof typeof currenciesBase;

export const currenciesToKeep = Object.keys(currenciesBase) as ICurrenciesCodes[];
