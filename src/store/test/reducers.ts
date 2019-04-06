import {
  ITestActionTypes,
  ITestState,
  TEST_DESCREASE,
  TEST_INCREASE,
} from "./types";

const initialState: ITestState = {
  counter: 0,
};

export function testReducer(
  state = initialState,
  action: ITestActionTypes,
): ITestState {
  switch (action.type) {
    case TEST_INCREASE:
      return {
        ...state,
        counter: (state.counter + action.payload),
      };
    case TEST_DESCREASE:
      return {
        ...state,
        counter: (state.counter - action.payload),
      };
  }

  return state;
}
