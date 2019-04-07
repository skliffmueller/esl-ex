import * as React from "react";
import classNames from "classnames";

import "./League.scss";

interface ILeagueHeaderProps {
  title: string;
  date: string;
}

export const LeagueHeader: React.FunctionComponent<ILeagueHeaderProps> = (props) => (
  <div className="LeagueHeader">
    <div className="LeagueHeader-wrapper">
      <h3 className="LeagueHeader-title">{props.title}</h3>
      <h5 className="LeagueHeader-date">{props.date}</h5>
    </div>
  </div>
);

interface ILeagueContentProps {
  tools: JSX.Element | JSX.Element[];
  content: JSX.Element | JSX.Element[];
}

export const LeagueContent: React.FunctionComponent<ILeagueContentProps> = (props) => {
  return (
    <div className="LeagueContent">
      <div className="LeagueContent-tools">{props.tools}</div>
      <div className="LeagueContent-results">{props.content}</div>
    </div>
  );
};

interface ILeagueButtonProps {
  onClick: React.MouseEventHandler<Element>;
  content: string;
  order: string;
}

export const LeagueButton: React.FunctionComponent<ILeagueButtonProps> = (props) => {
  const LeagueButtonClassName = classNames(
    "LeagueButton",
    {
      "LeagueButton--ascending": props.order === "ascending",
      "LeagueButton--descending": props.order === "descending",
    },
  );
  return (
    <button className={LeagueButtonClassName} onClick={props.onClick}>
      {props.content}
    </button>
  );
};

interface ILeagueParticipant {
  key: number;
  name: string;
  points: number[];
  winner: boolean;
  loser: boolean;
}

interface ILeagueResultsProps {
  key: number;
  time: string;
  participants: ILeagueParticipant[];
}

export const LeagueResults: React.FunctionComponent<ILeagueResultsProps> = (props) => {
  const participants = props.participants.map((p) => {
    const participantClassName =  classNames(
      "LeagueParticipant",
      {
        "LeagueParticipant--winner": p.winner,
        "LeagueParticipant--loser": p.loser,
      },
    );
    return (
      <div key={p.key} className={participantClassName}>
        <div className="LeagueResult-name">{p.name}</div>
        <div className="LeagueResult-score">{p.points}</div>
      </div>
    );
  });
  return (
    <div className="LeagueResult">
      <div className="LeagueResult-time">
        {props.time}
      </div>
      {participants}
    </div>
  );
};

