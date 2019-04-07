import * as React from "react";
import {BrowserRouter as Router, Route, Link, RouteComponentProps} from "react-router-dom";
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

function Index() {
  return <h1>Index</h1>;
}

export class AppComponent extends React.Component<IAppProps> {
  leaguesContainerRenderer = (props: RouteComponentProps<{leagueId: string}>) => {
    return <LeaguesContainer {...this.props} leagueId={Number(props.match.params.leagueId)} />;
  }

  render() {
    return (
      <Router>
        <div className="AppNav">
          <Link to="/leagues/177160">League 177160</Link>
          <Link to="/leagues/177161">League 177161</Link>
          <Link to="/leagues/185553">League 185553</Link>
        </div>
        <Route path="/leagues/:leagueId" render={this.leaguesContainerRenderer} />
      </Router>
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
