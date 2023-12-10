export interface ITestState {
  test: boolean;
}
export type ITestStore = ITestState & {
  setTest: (value: boolean) => void;
};
