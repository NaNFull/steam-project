import MainAPI from '@src/api/mainAPI';
import BaseModel from '@src/model/baseModel';
import type { IDataResponse, IMainFilters } from '@src/model/mainModel.types';

export default class MainModel extends MainAPI {
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

    return model.fetch<IMainFilters>(url.href);
  };
}
