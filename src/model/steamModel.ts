import SteamAPI from '@src/api/steamAPI';
import BaseModel from '@src/model/baseModel';
import type { IDataResponse, ISteamFilters } from '@src/model/steamModel.types';

export default class SteamModel extends SteamAPI {
  public constructor() {
    super();
  }

  public getData = async () => {
    const model = new BaseModel();
    const url = this.getUrlData();

    return model.fetch<IDataResponse>(url.href);
  };

  public postData = async (params = '') => {
    const model = new BaseModel();
    const url = this.getUrlData();

    return model.post<IDataResponse>(url.href, params);
  };

  public getFilters = async () => {
    const model = new BaseModel();
    const url = this.getUrlFilters();

    return model.fetch<ISteamFilters>(url.href);
  };
}
