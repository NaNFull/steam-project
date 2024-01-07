import { pathJoin } from '@src/utils/paths.ts';

export class API {
  readonly #api = 'http://localhost:3002/api';

  public getAPI = () => this.#api;
}

export class TradeitAPI extends API {
  readonly #api: string;
  readonly #pathData: string;
  readonly #pathMyData: string;
  readonly #pathCurrencies: string;
  readonly #pathImages: string;

  public constructor() {
    super();
    this.#api = pathJoin(this.getAPI(), 'tradeit');
    this.#pathData = pathJoin(this.#api, 'data');
    this.#pathMyData = pathJoin(this.#api, 'my-data');
    this.#pathCurrencies = pathJoin(this.#api, 'exchange-rate');
    this.#pathImages = pathJoin(this.#api, 'images');
  }

  public getTradeitAPI = (): string => this.#api;

  public getPathData = (): string => this.#pathData;

  public getPathMyData = (): string => this.#pathMyData;

  public getPathCurrencies = (): string => this.#pathCurrencies;

  public getPathImages = (): string => this.#pathImages;
}
