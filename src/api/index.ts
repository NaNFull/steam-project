import { pathJoin } from '@src/utils/paths';

export default class API {
  readonly #origin = 'http://localhost:3002';
  readonly #api: string;

  public constructor() {
    this.#api = pathJoin(this.#origin, 'api');
  }

  public getPathOrigin = () => this.#origin;

  public getPathAPI = () => this.#api;
}
