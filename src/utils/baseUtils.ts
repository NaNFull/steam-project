// Create our number formatter.
import type { ICurrenciesCodes } from './typesUtils';

export const currenciesLocale = {
  AUD: 'en-AU',
  BRL: 'pt-BR',
  EUR: 'en-EU',
  GBP: 'en-GB',
  HKD: 'zh-HK',
  ILS: 'he-IL',
  JPY: 'ja-JP',
  MXN: 'es-MX',
  PHP: 'en-PH',
  RUB: 'ru-RU',
  THB: 'th-TH',
  TRY: 'tr-TR',
  USD: 'en-EU'
};

export const formatterValue = (value: number, currency: ICurrenciesCodes, fractionDigits = 2) =>
  new Intl.NumberFormat(currenciesLocale[currency], {
    currency: currency,
    // These options are needed to round to whole numbers if that's what you want.
    minimumFractionDigits: fractionDigits, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
    // maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    style: 'currency'
  }).format(value);
