import SteamAPI from '@src/api/steamAPI';
import BaseModel from '@src/model/baseModel';
import type { IDataResponse, ISteamFilters } from '@src/model/steamModel.types';

export default class SteamModel extends SteamAPI {
  public constructor() {
    super();
  }

  public getData = async () => {
    const model = new BaseModel();
    const url = this.getPathData();

    return model.fetch<IDataResponse>(url);
  };

  public postData = async (params = '') => {
    const model = new BaseModel();
    const url = this.getPathData();

    return model.post<IDataResponse>(url, params);
  };

  public getFilters = async () => {
    const model = new BaseModel();
    const url = this.getPathFilters();

    return model.fetch<ISteamFilters>(url);
  };
}
