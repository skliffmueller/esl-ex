export const TEST_DESCREASE = "TEST_DESCREASE";
export const TEST_INCREASE = "TEST_INCREASE";

interface ITestDecreaseByAction {
  type: typeof TEST_DESCREASE;
  payload: number;
}

interface ITestIncreaseByAction {
  type: typeof TEST_INCREASE;
  payload: number;
}

export type ITestActionTypes = ITestDecreaseByAction | ITestIncreaseByAction;

export interface ITestState { counter: number; }
