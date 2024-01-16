import API from '@src/api';
import { pathJoin } from '@src/utils/paths';

export default class SteamAPI extends API {
  readonly #api: string;
  readonly #pathData: string;

  public constructor() {
    super();
    this.#api = pathJoin(this.getPathAPI(), 'inventory');
    this.#pathData = pathJoin(this.#api, 'data');
  }

  public getPathSteamAPI = (): string => this.#api;

  public getPathData = (): string => this.#pathData;
}
