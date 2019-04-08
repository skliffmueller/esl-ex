import * as React from "react";
import * as moment from "moment";

import {
  ILeaguesActions,
} from "../store/leagues/types";

import {
  ILeagueStateModel,
} from "../store/leagues/schemas";

import {
  LeagueHeader,
  LeagueContent,
  LeagueButton,
  LeagueResults,
} from "../components/League";


interface ILeaguesContainerProps {
  leagueId: number;
  leaguesActions: ILeaguesActions;
  leaguesState: ILeagueStateModel;
}

export class LeaguesContainer extends React.Component<ILeaguesContainerProps> {
  state = {
    order: "ascending",
  };

  componentWillMount() {
    this.updateLeagueData(this.props.leagueId);
  }

  componentWillUpdate(nextProps: ILeaguesContainerProps) {
    if (this.props.leagueId !== nextProps.leagueId) {
      this.updateLeagueData(nextProps.leagueId);
    }
  }

  updateLeagueData = (leagueId: number) => {
    const {
      getLeague,
      getLeagueResults,
      getLeagueContestants,
    } = this.props.leaguesActions;

    getLeague(leagueId);
    getLeagueResults(leagueId);
    getLeagueContestants(leagueId);
  }

  lookupParticipantName = (participantId: number): string => {
    const { contestants } = this.props.leaguesState;
    const participant = contestants.find((c) => (c.id === participantId));
    return participant ? participant.name : "";
  }

  dateButtonOnClick = (event: React.MouseEvent<Element, MouseEvent>) => {
   this.setState({
     order: this.state.order === "ascending" ? "descending" : "ascending",
   });
  }

  render() {
    const {
      league,
      results,
      contestants,
      getLeague,
      getLeagueResults,
      getLeagueContestants,
    } = this.props.leaguesState;
    const {
      order,
    } = this.state;

    if (!league || !results.length || !contestants.length) {
      if (getLeague.success && getLeagueResults.success && getLeagueContestants.success) {
        return <h3>Something horrible has happen</h3>;
      }
      if (getLeague.error || getLeagueResults.error || getLeagueContestants.error) {
        return <h3>Something horrible has happen</h3>;
      }
      return <h1>Loading...</h1>;
    }

    const title = league ? league.name.full : "";
    const date = league ? moment(league.timeline.inProgress.begin).format("Do MMMM YYYY") : "";

    const resultsTemplate = results
      .sort((a, b) => {
        if (order === "descending") {
          return (b.id - a.id);
        }
        return (a.id - b.id);
      })
      .sort((a, b) => {
        if (order === "descending") {
          return (b.beginAt.valueOf() - a.beginAt.valueOf());
        }
        return (a.beginAt.valueOf() - b.beginAt.valueOf());
      })
      .map((r) => {
        const time = moment(r.beginAt).format("HH:mm");
        if (r.participants.find((p) => (p.id === 0))) {
          // If id is 0, assume Buy
          return null;
        }
        const participants = r.participants.map((p) => {
          return {
            key: p.id,
            name: this.lookupParticipantName(p.id),
            points: p.points,
            winner: p.place === 1,
            loser: p.place > 1,
          };
        });
        return <LeagueResults key={r.id} time={time} participants={participants} />;
      }).filter((r) => (r));

    const toolsTemplate = <LeagueButton onClick={this.dateButtonOnClick} content={"Date"} order={order} />;

    return (
      <div className="Leagues">
        <LeagueHeader title={title} date={date} />
        <LeagueContent tools={toolsTemplate} content={resultsTemplate} />
      </div>
    );
  }
}

export default LeaguesContainer;
