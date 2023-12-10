import * as dayjs from 'dayjs';
import * as locateRu from 'dayjs/locale/ru';

dayjs.locale(locateRu);

export class Error {
  public hasError = false;

  public error = '';

  public constructor(error: string) {
    this.hasError = true;
    this.error = error;
  }
}

export default class BaseModel {
  public static dateFormatter(value: Date | string, format: string): string {
    return value ? dayjs(value).format(format) : '';
  }
}
