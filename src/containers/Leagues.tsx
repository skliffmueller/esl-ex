/*
 * This container is responsible for interacting with redux and providing the information to the functional components
 * This is where the actions are dispatched based off the provided route params
 * This is also where we build/sort the data and render the functional components
 */
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
  // We use a state object here for sorting instead of a redux state,
  // as this is the only component that uses this field
  state = {
    order: "ascending",
  };

  componentWillMount() {
    // When the component first mounts we must dispatch the actions
    this.updateLeagueData(this.props.leagueId);
  }

  componentWillUpdate(nextProps: ILeaguesContainerProps) {
    // When you change the leagueId parameter in the route, the component does not unmount and remount
    // So we must check to see if the ID has changed, and then dispatch the action again
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

    // We sort by the id, then by the date, so the ascending and descending orders are consistent
    // Sometimes matches that have the same start time, will not sort correctly when you only rely on the time
    // Note: if a participant id is 0, I am assuming it's a "Buy" round and is removed from the listing
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
