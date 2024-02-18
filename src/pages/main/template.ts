import type { MRT_DensityState } from 'material-react-table';

interface IInputProps<T = number> {
  max: T;
  min: T;
}

export interface MainPageSettings {
  density: MRT_DensityState;
  profitPercentSettings: IInputProps;
  remainderSettings: IInputProps;
}

export const Template: MainPageSettings = {
  density: 'compact',
  profitPercentSettings: {
    max: 90,
    min: 30,
  },
  remainderSettings: {
    max: 15,
    min: 0,
  },
};
