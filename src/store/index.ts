import { combineReducers } from "redux";

import { leaguesReducer } from "./leagues/reducers";

export const rootReducer = combineReducers({
  leagues: leaguesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
