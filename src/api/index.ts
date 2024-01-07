export default class API {
  readonly #api = 'http://localhost:3002/api';

  public getAPI = () => this.#api;
}
