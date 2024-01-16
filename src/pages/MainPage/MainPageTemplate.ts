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
  density: 'spacious',
  profitPercentSettings: {
    max: 0.9,
    min: 0.3,
    value: 0.7 // Рекомендуемое 0.7
  },
  remainderSettings: {
    max: 20,
    min: 0,
    value: 2
  }
};
