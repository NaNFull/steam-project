import BaseAPI from '@src/api/baseAPI';
import type { IResponseData } from '@src/model/tradeitModel.types';

export default class BaseModel extends BaseAPI {
  public postData = async (data: any) => {
    try {
      const requestOptions = {
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'POST'
      };
      const response = await fetch(this.getPathData(), requestOptions);

      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      return (await response.json()) as IResponseData;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };
}
