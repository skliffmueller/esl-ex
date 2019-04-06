import { Dispatch } from "redux";

import {
  GET_LEAGUE_BY_ID,
  GET_LEAGUE_RESULTS_BY_ID,
  GET_LEAGUE_CONTESTANTS_BY_ID,
} from "./types";

export function getLeagueById(dispatch: Dispatch) {
  return (leagueId: number): void => {
    dispatch({
      type: GET_LEAGUE_BY_ID,
      payload: {
        request: {
          method: "get",
          url: `/v1/leagues/${leagueId}`,
        },
      },
    });
  };
}


export function getLeagueResultsById(dispatch: Dispatch) {
  return (leagueId: number): void => {
    dispatch({
      type: GET_LEAGUE_RESULTS_BY_ID,
      payload: {
        request: {
          method: "get",
          url: `/v1/leagues/${leagueId}/results`,
        },
      },
    });
  };
}

export function getLeagueContestantsById(dispatch: Dispatch) {
  return (leagueId: number): void => {
    dispatch({
      type: GET_LEAGUE_CONTESTANTS_BY_ID,
      payload: {
        request: {
          method: "get",
          url: `/v1/leagues/${leagueId}/contestants`,
        },
      },
    });
  };
}
