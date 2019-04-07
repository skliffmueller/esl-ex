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
  leaguesActions: ILeaguesActions;
  leaguesState: ILeagueStateModel;
}

export class LeaguesContainer extends React.Component<ILeaguesContainerProps> {
  state = {
    order: "ascending",
  }

  componentWillMount() {
    const {
      getLeague,
      getLeagueResults,
      getLeagueContestants,
    } = this.props.leaguesActions;

    getLeague(177161);
    getLeagueResults(177161);
    getLeagueContestants(177161);
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
    } = this.props.leaguesState;
    const {
      order,
    } = this.state;

    const title = league ? league.name.full : "";
    const date = league ? moment(league.timeline.inProgress.begin).format("wo MMMM YYYY") : "";

    const resultsTemplate = results
      .sort((a, b) => {
        if (order === "descending") {
          return (a.id - b.id);
        }
        return (b.id - a.id);
      })
      .sort((a, b) => {
        if (order === "descending") {
          return (a.beginAt.valueOf() - b.beginAt.valueOf());
        }
        return (b.beginAt.valueOf() - a.beginAt.valueOf());
      })
      .map((r) => {
        const time = moment(r.beginAt).format("HH:mm");
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
      });

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
