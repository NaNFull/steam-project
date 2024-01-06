import * as path from 'node:path';

export class API {
  #api = 'http://localhost:3000/api';

  public getAPI() {
    return this.#api;
  }
}

export class TradeitAPI extends API {
  #api: string;
  #pathData: string;
  #pathMyData: string;
  #pathCurrencies: string;
  #pathImages: string;

  public constructor() {
    super();
    this.#api = path.join(this.getAPI(), 'tradeit');
    this.#pathData = path.join(this.#api, 'data');
    this.#pathMyData = path.join(this.#api, 'my-data');
    this.#pathCurrencies = path.join(this.#api, 'exchange-rate');
    this.#pathImages = path.join(this.#api, 'images');
  }

  public getTradeitAPI(): string {
    return this.#api;
  }

  public getPathData(): string {
    return this.#pathData;
  }

  public getPathMyData(): string {
    return this.#pathMyData;
  }

  public getPathCurrencies(): string {
    return this.#pathCurrencies;
  }

  public getPathImages(): string {
    return this.#pathImages;
  }
}
