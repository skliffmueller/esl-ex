import * as React from "react";

import { Test } from "./components/Test";

export class App extends React.Component<{}> {
  render() {
    return <Test message="Hello World!" />;
  }
}
