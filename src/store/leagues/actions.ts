import { Dispatch } from "redux";

import {
  GET_LEAGUE,
  GET_LEAGUE_RESULTS,
  GET_LEAGUE_CONTESTANTS,
  LeagueActionFunction,
} from "./types";

export function getLeague(dispatch: Dispatch): LeagueActionFunction {
  return (leagueId: number): void => {
    dispatch({
      type: GET_LEAGUE,
      payload: {
        request: {
          method: "get",
          url: `/v1/leagues/${leagueId}`,
        },
      },
    });
  };
}


export interface IGetLeagueResultsOptions {
  round?: number;
}

interface IGetLeagueResultsParams {
  round?: number;
}

export function getLeagueResults(dispatch: Dispatch): LeagueActionFunction {
  return (leagueId: number, options?: IGetLeagueResultsOptions): void => {
    const params: IGetLeagueResultsParams = {};
    if (options) {
      params.round = options.round;
    }
    dispatch({
      type: GET_LEAGUE_RESULTS,
      payload: {
        request: {
          method: "get",
          url: `/v1/leagues/${leagueId}/results`,
          params,
        },
      },
    });
  };
}

export interface IGetLeagueContestantsOptions {
  states?: string[];
}

interface IGetLeagueContestantsParams {
  states?: string;
}

export function getLeagueContestants(dispatch: Dispatch): LeagueActionFunction {
  return (leagueId: number, options?: IGetLeagueContestantsOptions): void => {
    const params: IGetLeagueContestantsParams = {};
    if (options) {
      params.states = options.states.join(",");
    }
    dispatch({
      type: GET_LEAGUE_CONTESTANTS,
      payload: {
        request: {
          method: "get",
          url: `/v1/leagues/${leagueId}/contestants`,
          params,
        },
      },
    });
  };
}
