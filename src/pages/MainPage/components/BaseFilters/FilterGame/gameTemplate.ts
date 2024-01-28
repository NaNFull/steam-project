import ALLIcon from '@src/pages/MainPage/components/BaseFilters/FilterGame/GameIcons/ALLIcon';
import CS2Icon from '@src/pages/MainPage/components/BaseFilters/FilterGame/GameIcons/CS2Icon';
import RUSTIcon from '@src/pages/MainPage/components/BaseFilters/FilterGame/GameIcons/RUSTIcon';
import STEAMIcon from '@src/pages/MainPage/components/BaseFilters/FilterGame/GameIcons/STEAMIcon';
import TF2Icon from '@src/pages/MainPage/components/BaseFilters/FilterGame/GameIcons/TF2Icon';
import type { ITradeitGameIds } from '@src/model/tradeitModel.types';
import type { FC } from 'react';

export interface SelectedGame {
  id: number;
  gameId: ITradeitGameIds;
  name: string;
  ComponentIcon: FC;
}

export const selectedGame: SelectedGame[] = [
  {
    ComponentIcon: ALLIcon,
    gameId: 'ALL',
    id: 0,
    name: 'ALL'
  },
  {
    ComponentIcon: CS2Icon,
    gameId: 730,
    id: 0,
    name: 'CS2'
  },
  {
    ComponentIcon: RUSTIcon,
    gameId: 252_490,
    id: 1,
    name: 'RUST'
  },
  {
    ComponentIcon: TF2Icon,
    gameId: 440,
    id: 2,
    name: 'TF2'
  },
  {
    ComponentIcon: STEAMIcon,
    gameId: 753,
    id: 3,
    name: 'STEAM'
  }
];
