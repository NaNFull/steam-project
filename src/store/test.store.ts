import type { ITestState, ITestStore } from '@src/store/types.store.ts';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const InitialState: ITestState = {
  test: false
};

export const useAuthStore = create<ITestStore>()(
  devtools(
    (set, _get) => ({
      ...InitialState,
      setTest(value) {
        set({ test: value }, false, 'test:value');
      }
    }),
    { name: 'Test' }
  )
);
