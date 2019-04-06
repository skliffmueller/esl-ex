import { AxiosResponse, AxiosError  } from "axios";
import { IPayloadObject } from "axios-redux-types";
import { AnyAction } from "redux";

export const GET_LEAGUE_BY_ID = "GET_LEAGUE_BY_ID";
export const GET_LEAGUE_RESULTS_BY_ID = "GET_LEAGUE_RESULTS_BY_ID";
export const GET_LEAGUE_CONTESTANTS_BY_ID = "GET_LEAGUE_CONTESTANTS_BY_ID";

export type LeagueActionTypes = typeof GET_LEAGUE_BY_ID |
                                  typeof GET_LEAGUE_RESULTS_BY_ID |
                                  typeof GET_LEAGUE_CONTESTANTS_BY_ID;

export interface ILeagueActionResponse {
  type: LeagueActionTypes;
  payload?: AxiosResponse;
  error?: AxiosError;
  meta: {
    previousAction: AnyAction;
  };
}

export type LeagueActionFunction = (leagueId: number) => AnyAction | void;

export interface ILeagueState {
  getLeagueById: IPayloadObject;
  getLeagueResultsById: IPayloadObject;
  getLeagueContestantsById: IPayloadObject;
}
