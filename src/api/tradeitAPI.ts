import API from '@src/api';
import urlJoin from 'url-join';

export default class TradeitAPI extends API {
  readonly #origin = new URL('http://localhost:3002');
  readonly #api = new URL(this.#origin);
  readonly #dataURL = new URL(this.#origin);
  readonly #myDataURL = new URL(this.#origin);
  readonly #currenciesURL = new URL(this.#origin);
  readonly #clearCacheURL = new URL(this.#origin);

  public constructor() {
    super();
    this.#api.href = urlJoin(this.getAPI().href, 'tradeit');
    this.#dataURL.href = urlJoin(this.#api.href, 'data');
    this.#myDataURL.href = urlJoin(this.#api.href, 'my-data');
    this.#currenciesURL.href = urlJoin(this.#api.href, 'exchange-rate');
    this.#clearCacheURL.href = urlJoin(this.#api.href, 'clear-cache-data');
  }

  public getURLTradeitAPI = () => this.#api;

  public getURLData = () => this.#dataURL;

  public getURLMyData = () => this.#myDataURL;

  public getURLCurrencies = () => this.#currenciesURL;

  public getURLClearCache = () => this.#clearCacheURL;
}
