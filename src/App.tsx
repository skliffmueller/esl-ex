import * as React from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";

import { AppState } from "./store";
import {
  getLeagueById,
  getLeagueResultsById,
  getLeagueContestantsById,
} from "./store/leagues/actions";
import {
  ILeagueState,
  LeagueActionFunction,
} from "./store/leagues/types";

import { Test } from "./components/Test";

interface IAppProps {
  getLeagueById?: LeagueActionFunction;
  getLeagueResultsById?: LeagueActionFunction;
  getLeagueContestantsById?: LeagueActionFunction;
  leagues?: ILeagueState;
}

export class AppComponent extends React.Component<IAppProps> {
  componentWillMount() {
    const {
      getLeagueById,
      getLeagueResultsById,
      getLeagueContestantsById,
    } = this.props;

    getLeagueById(177161);
    getLeagueResultsById(177161);
    getLeagueContestantsById(177161);
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
    leagues: state.leagues,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getLeagueById: getLeagueById(dispatch),
    getLeagueResultsById: getLeagueResultsById(dispatch),
    getLeagueContestantsById: getLeagueContestantsById(dispatch),
  };
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

export default App;
