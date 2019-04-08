import { combineReducers } from "redux";

import { leaguesReducer } from "./leagues/reducers";

// It's just combineReducers, nothing more to see here
// The magic happens in the ./leagues folder
export const rootReducer = combineReducers({
  leagues: leaguesReducer,
});

export type AppState = ReturnType<typeof rootReducer>;
