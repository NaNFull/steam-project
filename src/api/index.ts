export default class API {
  readonly #origin = new URL('http://localhost:3002');
  readonly #api: URL;

  public constructor() {
    this.#api = new URL('api', this.#origin);
  }

  public getOriginURL = () => this.#origin;

  public getAPI = () => this.#api;
}
