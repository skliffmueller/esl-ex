import {
  ITestActionTypes,
  TEST_DESCREASE,
  TEST_INCREASE,
} from "./types";

export function testIncrease(counter: number): ITestActionTypes {
  return {
    type: TEST_INCREASE,
    payload: counter,
  };
}

export function testDecrease(counter: number): ITestActionTypes {
  return {
    type: TEST_DESCREASE,
    payload: counter,
  };
}
