/*
 * This is a pretty standard setup of a redux reducer
 * The only thing outside of a typical structure is the map functions
 * These map functions reduce the axios response data into a structure that is easier to manage
 */
import { AnyAction } from "redux";

import {
  LeagueActions,
  GET_LEAGUE,
  GET_LEAGUE_SUCCESS,
  GET_LEAGUE_ERROR,
  GET_LEAGUE_RESULTS,
  GET_LEAGUE_RESULTS_SUCCESS,
  GET_LEAGUE_RESULTS_ERROR,
  GET_LEAGUE_CONTESTANTS,
  GET_LEAGUE_CONTESTANTS_SUCCESS,
  GET_LEAGUE_CONTESTANTS_ERROR,
} from "./types";

import {
  mapLeague,
  mapLeagueResults,
  mapLeagueContestants,
  ILeagueStateModel,
} from "./schemas";

const initialState: ILeagueStateModel = {
  league: null,
  contestants: [],
  results: [],
  getLeague: {
    loading: false,
    success: false,
    error: false,
  },
  getLeagueResults: {
    loading: false,
    success: false,
    error: false,
  },
  getLeagueContestants: {
    loading: false,
    success: false,
    error: false,
  },
};

export function leaguesReducer(
  state = initialState,
  action: LeagueActions | AnyAction,
): ILeagueStateModel {
  switch (action.type) {
    case GET_LEAGUE:
      return {
        ...state,
        league: null,
        getLeague: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case GET_LEAGUE_SUCCESS:
      return {
        ...state,
        league: mapLeague(action.payload),
        getLeague: {
          loading: false,
          success: action.payload,
          error: false,
        },
      };
    case GET_LEAGUE_ERROR:
      return {
        ...state,
        getLeague: {
          loading: false,
          success: false,
          error: action.error,
        },
      };

    case GET_LEAGUE_RESULTS:
      return {
        ...state,
        results: [],
        getLeagueResults: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case GET_LEAGUE_RESULTS_SUCCESS:
      return {
        ...state,
        results: mapLeagueResults(action.payload),
        getLeagueResults: {
          loading: false,
          success: action.payload,
          error: false,
        },
      };
    case GET_LEAGUE_RESULTS_ERROR:
      return {
        ...state,
        getLeagueResults: {
          loading: false,
          success: false,
          error: action.error,
        },
      };

    case GET_LEAGUE_CONTESTANTS:
      return {
        ...state,
        contestants: [],
        getLeagueContestants: {
          loading: true,
          success: false,
          error: false,
        },
      };
    case GET_LEAGUE_CONTESTANTS_SUCCESS:
      return {
        ...state,
        contestants: mapLeagueContestants(action.payload),
        getLeagueContestants: {
          loading: false,
          success: action.payload,
          error: false,
        },
      };
    case GET_LEAGUE_CONTESTANTS_ERROR:
      return {
        ...state,
        getLeagueContestants: {
          loading: false,
          success: false,
          error: action.error,
        },
      };
  }

  return state;
}
