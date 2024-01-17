import type { ICurrenciesCodes } from '@src/utils/typesUtils';
import type { MRT_DensityState } from 'material-react-table';

interface IInputProps<T = number> {
  max: T;
  min: T;
  value: T;
}

interface MainPageSettings {
  currency: ICurrenciesCodes;
  density: MRT_DensityState;
  profitPercentSettings: IInputProps;
  remainderSettings: IInputProps;
}

export const MainPageTemplate: MainPageSettings = {
  currency: 'RUB',
  density: 'compact',
  profitPercentSettings: {
    max: 90,
    min: 30,
    value: 70 // Рекомендуемое 70 %
  },
  remainderSettings: {
    max: 20,
    min: 0,
    value: 2
  }
};
