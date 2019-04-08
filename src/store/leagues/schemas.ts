/*
 * This defines the structure we'd like the redux states to be
 * This file also provides functions to transform/reduce the Axios response data into the provided structures
 */
import { ILeagueState } from "./types";
import { AxiosResponse } from "axios";

export interface ILeagueSchema {
  id: number;
  name: {
    full: string;
    normal: string;
    short: string;
  };
  timeline: {
    inProgress: {
      begin: Date;
      end: Date;
    };
  };
}

export interface ILeagueContestantSchema {
  id: number;
  seed: number;
  status: string;
  alias: string;
  name: string;
  region: string;
}

interface ILeagueParticipantSchema {
  id: number;
  place: number;
  points: number[];
}

export interface ILeagueResultSchema {
  id: number;
  state: string;
  bracket: number;
  round: number;
  position: number;
  beginAt: Date;
  participants: ILeagueParticipantSchema[];
}

export interface ILeagueStateModel extends ILeagueState {
  league: ILeagueSchema | null;
  contestants: ILeagueContestantSchema[];
  results: ILeagueResultSchema[];
}

export function mapLeague(response: AxiosResponse): ILeagueSchema {
  const { data } = response;
  const begin = data.timeline && data.timeline.inProgress && data.timeline.inProgress.begin;
  const end = data.timeline && data.timeline.inProgress && data.timeline.inProgress.end;
  return {
    id: data.id,
    name: {
      full: data.name.full,
      normal: data.name.normal,
      short: data.name.short,
    },
    timeline: {
      inProgress: {
        begin: begin ? new Date(begin) : null,
        end: end ? new Date(end) : null,
      },
    },
  };
}

export function mapLeagueResults(response: AxiosResponse): ILeagueResultSchema[] {
  const { data } = response;
  return data.map(
    (d: any) => ({
      id: d.id,
      state: d.state,
      bracket: d.bracket,
      round: d.round,
      position: d.position,
      beginAt: new Date(d.beginAt),
      participants: d.participants,
    }),
  );
}

export function mapLeagueContestants(response: AxiosResponse): ILeagueContestantSchema[] {
  const { data } = response;
  return data.map(
    (d: any) => ({
      id: d.id,
      seed: d.seed,
      status: d.status,
      alias: d.alias,
      name: d.name,
      region: d.region,
    }),
  );
}
