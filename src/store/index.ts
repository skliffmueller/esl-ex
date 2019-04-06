import { combineReducers } from "redux";

import { testReducer } from "./test/reducers";

export const rootReducer = combineReducers({
  test: testReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
