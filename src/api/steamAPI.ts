import API from '@src/api';
import urlJoin from 'url-join';

export default class SteamAPI extends API {
  readonly #origin = new URL('http://localhost:3002');
  readonly #api = new URL(this.#origin);
  readonly #urlData = new URL(this.#origin);
  readonly #urlFilters = new URL(this.#origin);

  public constructor() {
    super();
    this.#api.href = urlJoin(this.getAPI().href, 'inventory');
    this.#urlData.href = urlJoin(this.#api.href, 'data');
    this.#urlFilters.href = urlJoin(this.#api.href, 'filters');
  }

  public getUrlSteamAPI = () => this.#api;

  public getUrlData = () => this.#urlData;

  public getUrlFilters = () => this.#urlFilters;
}
