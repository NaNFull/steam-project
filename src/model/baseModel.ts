export default class BaseModel {
  public fetch = async <T = any>(url: string) => {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Network GET response was not ok: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('There was a problem with the GET fetch operation:', error);
    }
  };
  public post = async <T = any>(url: string, params = '') => {
    try {
      const requestOptions: RequestInit = {
        body: params,
        headers: [
          ['Accept', 'application/json'],
          ['Content-Type', 'application/json']
        ],
        method: 'POST'
      };
      const response = await fetch(url, requestOptions);

      if (!response.ok) {
        throw new Error(`Network POST response was not ok: ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      console.error('There was a problem with the POST fetch operation:', error);
    }
  };
}
