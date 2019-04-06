import { suffixTypes } from "../../middlewares/axios";

import {
  ILeagueState,
  GET_LEAGUE_BY_ID,
  GET_LEAGUE_RESULTS_BY_ID,
  GET_LEAGUE_CONTESTANTS_BY_ID,
  ILeagueActionResponse,
} from "./types";

const initialState: ILeagueState = {
  getLeagueById: {
    loading: false,
    success: false,
    failure: false,
  },
  getLeagueResultsById: {
    loading: false,
    success: false,
    failure: false,
  },
  getLeagueContestantsById: {
    loading: false,
    success: false,
    failure: false,
  },
};

export function leaguesReducer(
  state = initialState,
  action: ILeagueActionResponse,
): ILeagueState {
  switch (action.type) {
    case GET_LEAGUE_BY_ID:
      return {
        ...state,
        getLeagueById: {
          loading: true,
          success: false,
          failure: false,
        },
      };
    case `${GET_LEAGUE_BY_ID}${suffixTypes.successSuffix}`:
      return {
        ...state,
        getLeagueById: {
          loading: false,
          success: action.payload,
          failure: false,
        },
      };
    case `${GET_LEAGUE_BY_ID}${suffixTypes.errorSuffix}`:
      return {
        ...state,
        getLeagueById: {
          loading: false,
          success: false,
          failure: action.error,
        },
      };

    case GET_LEAGUE_RESULTS_BY_ID:
      return {
        ...state,
        getLeagueResultsById: {
          loading: true,
          success: false,
          failure: false,
        },
      };
    case `${GET_LEAGUE_RESULTS_BY_ID}${suffixTypes.successSuffix}`:
      return {
        ...state,
        getLeagueResultsById: {
          loading: false,
          success: action.payload,
          failure: false,
        },
      };
    case `${GET_LEAGUE_RESULTS_BY_ID}${suffixTypes.errorSuffix}`:
      return {
        ...state,
        getLeagueResultsById: {
          loading: false,
          success: false,
          failure: action.error,
        },
      };

    case GET_LEAGUE_CONTESTANTS_BY_ID:
      return {
        ...state,
        getLeagueContestantsById: {
          loading: true,
          success: false,
          failure: false,
        },
      };
    case `${GET_LEAGUE_CONTESTANTS_BY_ID}${suffixTypes.successSuffix}`:
      return {
        ...state,
        getLeagueContestantsById: {
          loading: false,
          success: action.payload,
          failure: false,
        },
      };
    case `${GET_LEAGUE_CONTESTANTS_BY_ID}${suffixTypes.errorSuffix}`:
      return {
        ...state,
        getLeagueContestantsById: {
          loading: false,
          success: false,
          failure: action.error,
        },
      };
  }

  return state;
}
