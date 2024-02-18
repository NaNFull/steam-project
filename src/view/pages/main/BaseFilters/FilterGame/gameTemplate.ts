import ALLIcon from './GameIcons/ALLIcon';
import CS2Icon from './GameIcons/CS2Icon';
import RUSTIcon from './GameIcons/RUSTIcon';
import STEAMIcon from './GameIcons/STEAMIcon';
import TF2Icon from './GameIcons/TF2Icon';
import type { SelectedGame } from './types';

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
    id: 1,
    name: 'CS2'
  },
  {
    ComponentIcon: RUSTIcon,
    gameId: 252_490,
    id: 2,
    name: 'RUST'
  },
  {
    ComponentIcon: TF2Icon,
    gameId: 440,
    id: 3,
    name: 'TF2'
  },
  {
    ComponentIcon: STEAMIcon,
    gameId: 753,
    id: 4,
    name: 'STEAM'
  }
];
