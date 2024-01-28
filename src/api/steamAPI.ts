import API from '@src/api';
import { pathJoin } from '@src/utils/paths';

export default class SteamAPI extends API {
  readonly #api: string;
  readonly #pathData: string;
  readonly #pathFilters: string;

  public constructor() {
    super();
    this.#api = pathJoin(this.getPathAPI(), 'inventory');
    this.#pathData = pathJoin(this.#api, 'data');
    this.#pathFilters = pathJoin(this.#api, 'filters');
  }

  public getPathSteamAPI = (): string => this.#api;

  public getPathData = (): string => this.#pathData;

  public getPathFilters = (): string => this.#pathFilters;
}
