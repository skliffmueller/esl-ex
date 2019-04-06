import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "./store";
import {
  getLeague,
  getLeagueResults,
  getLeagueContestants,
} from "./store/leagues/actions";
import {
  ILeagueState,
  LeagueActionFunction,
} from "./store/leagues/types";

import { Test } from "./components/Test";

interface IAppProps {
  getLeague: LeagueActionFunction;
  getLeagueResults: LeagueActionFunction;
  getLeagueContestants: LeagueActionFunction;
  leaguesState: ILeagueState;
}

export class AppComponent extends React.Component<IAppProps> {
  componentWillMount() {
    const {
      getLeague,
      getLeagueResults,
      getLeagueContestants,
    } = this.props;

    getLeague(177161);
    getLeagueResults(177161);
    getLeagueContestants(177161);
  }
  render() {
    return (
      <>
        <Test message="Hello World!" />
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
    getLeague: getLeague(dispatch),
    getLeagueResults: getLeagueResults(dispatch),
    getLeagueContestants: getLeagueContestants(dispatch),
  };
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

export default App;
