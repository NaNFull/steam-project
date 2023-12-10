import * as path from 'node:path';

export class API {
  #api = 'http://localhost:3000/api';

  public getAPI() {
    return this.#api;
  }
}

export class TradeitAPI extends API {
  #api: string;
  #pathInventory: string;
  #pathCurrencies: string;
  #pathImages: string;

  public constructor() {
    super();
    this.#api = path.join(this.getAPI(), 'Tradeit');
    this.#pathInventory = path.join(this.#api, 'inventory/data');
    this.#pathCurrencies = path.join(this.#api, 'exchange-rate');
    this.#pathImages = path.join(this.#api, 'Images');
  }

  public getTradeitAPI(): string {
    return this.#api;
  }

  public getPathInventory(): string {
    return this.#pathInventory;
  }

  public getPathCurrencies(): string {
    return this.#pathCurrencies;
  }

  public getPathImages(): string {
    return this.#pathImages;
  }
}
