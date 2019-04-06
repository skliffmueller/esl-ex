import { AxiosResponse, AxiosError, AxiosRequestConfig } from "axios";
import { IPayloadObject } from "axios-redux-types";
import { AnyAction } from "redux";

import { suffixTypes } from "../../middlewares/axios";

export const GET_LEAGUE = "GET_LEAGUE";
export const GET_LEAGUE_SUCCESS = `${GET_LEAGUE}${suffixTypes.successSuffix}`;
export const GET_LEAGUE_ERROR = `${GET_LEAGUE}${suffixTypes.errorSuffix}`;

export const GET_LEAGUE_RESULTS = "GET_LEAGUE_RESULTS";
export const GET_LEAGUE_RESULTS_SUCCESS = `${GET_LEAGUE_RESULTS}${suffixTypes.successSuffix}`;
export const GET_LEAGUE_RESULTS_ERROR = `${GET_LEAGUE_RESULTS}${suffixTypes.errorSuffix}`;

export const GET_LEAGUE_CONTESTANTS = "GET_LEAGUE_CONTESTANTS";
export const GET_LEAGUE_CONTESTANTS_SUCCESS = `${GET_LEAGUE_CONTESTANTS}${suffixTypes.successSuffix}`;
export const GET_LEAGUE_CONTESTANTS_ERROR = `${GET_LEAGUE_CONTESTANTS}${suffixTypes.errorSuffix}`;

export type LeagueActionRequestTypes = typeof GET_LEAGUE |
                                        typeof GET_LEAGUE_RESULTS |
                                        typeof GET_LEAGUE_CONTESTANTS;

export type LeagueActionSuccessTypes = typeof GET_LEAGUE_SUCCESS |
                                        typeof GET_LEAGUE_RESULTS_SUCCESS |
                                        typeof GET_LEAGUE_CONTESTANTS_SUCCESS;

export type LeagueActionErrorTypes = typeof GET_LEAGUE_ERROR |
                                      typeof GET_LEAGUE_RESULTS_ERROR |
                                      typeof GET_LEAGUE_CONTESTANTS_ERROR;

export interface ILeagueActionRequest extends AnyAction {
  type: LeagueActionRequestTypes;
  payload: {
    request: AxiosRequestConfig;
  };
}

export interface ILeagueActionSuccessResponse extends AnyAction {
  type: LeagueActionSuccessTypes;
  payload: AxiosResponse;
  meta: {
    previousAction: AnyAction;
  };
}

export interface ILeagueActionErrorResponse extends AnyAction {
  type: LeagueActionErrorTypes;
  error: AxiosError;
  meta: {
    previousAction: AnyAction;
  };
}

export type LeagueActions = ILeagueActionRequest | ILeagueActionSuccessResponse | ILeagueActionErrorResponse;

export type LeagueActionFunction = (leagueId: number, options?: any) => LeagueActions | void;

export interface ILeagueState {
  getLeague: IPayloadObject;
  getLeagueResults: IPayloadObject;
  getLeagueContestants: IPayloadObject;
}
