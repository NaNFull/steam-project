import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

interface ITestState {
  test: boolean;
}
type ITestStore = ITestState & {
  setTest: (value: boolean) => void;
};

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
