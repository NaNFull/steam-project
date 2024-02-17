import type { ITradeitGameIds } from '@src/model/tradeitModel.types';
import type { FC } from 'react';

export interface SelectedGame {
  id: number;
  gameId: ITradeitGameIds;
  name: string;
  ComponentIcon: FC;
}
