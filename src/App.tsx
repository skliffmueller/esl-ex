import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import "./App.scss";

import { AppState } from "./store";
import {
  getLeague,
  getLeagueResults,
  getLeagueContestants,
} from "./store/leagues/actions";
import {
  ILeaguesActions,
} from "./store/leagues/types";
import {
  ILeagueStateModel,
} from "./store/leagues/schemas";


import { LeaguesContainer } from "./containers/Leagues";

interface IAppProps {
  leaguesActions: ILeaguesActions;
  leaguesState: ILeagueStateModel;
}

export class AppComponent extends React.Component<IAppProps> {
  render() {
    return (
      <>
        <LeaguesContainer {...this.props} />
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    leaguesState: state.leagues,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    leaguesActions: {
      getLeague: getLeague(dispatch),
      getLeagueResults: getLeagueResults(dispatch),
      getLeagueContestants: getLeagueContestants(dispatch),
    },
  };
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

export default App;
