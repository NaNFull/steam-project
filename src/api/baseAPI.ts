import API from '@src/api';
import { pathJoin } from '@src/utils/paths';

export default class BaseAPI extends API {
  readonly #api: string;
  readonly #pathData: string;

  public constructor() {
    super();
    this.#api = pathJoin(this.getAPI(), 'inventory');
    this.#pathData = pathJoin(this.#api, 'data');
  }

  public getDataAPI = (): string => this.#api;

  public getPathData = (): string => this.#pathData;
}
