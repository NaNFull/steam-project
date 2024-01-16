import BaseModel from '@src/model/baseModel';
import SteamAPI from '@src/api/steamAPI';

export default class SteamModel extends SteamAPI {
  public constructor() {
    super();
  }

  public getData = async () => {
    const model = new BaseModel();
    const url = this.getPathData();

    return model.fetch<any>(url);
  };

  public postData = async () => {
    const model = new BaseModel();
    const url = this.getPathData();

    return model.fetch<any>(url);
  };
}
