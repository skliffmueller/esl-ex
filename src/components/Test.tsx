import * as React from "react";
import "./Test.scss";

export interface ITestProps { message: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export class Test extends React.Component<ITestProps, {}> {
  render() {
    return (
      <div className="content">
        <h1>{this.props.message}</h1>
      </div>
    );
  }
}
