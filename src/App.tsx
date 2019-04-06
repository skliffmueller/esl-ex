import * as React from "react";
import { Dispatch } from "redux";
import { connect } from 'react-redux'

import { AppState } from "./store";
import {
  testDecrease,
  testIncrease,
} from "./store/test/actions";
import {
  ITestState,
} from "./store/test/types";

import { Test } from "./components/Test";

interface AppProps {
  increaseState: typeof testIncrease;
  decreaseState: typeof testDecrease;
  test: ITestState;
}

export class AppComponent extends React.Component<AppProps> {
  onIncreaseClick = () => (this.props.increaseState(1));
  onDecreaseClick = () => (this.props.decreaseState(1));
  render() {
    return (
      <>
        <button onClick={this.onIncreaseClick}>Increase</button>
        <button onClick={this.onDecreaseClick}>Decrease</button>
        <Test message="Hello World!" counter={this.props.test.counter} />
      </>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    test: state.test,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    increaseState: (id: number) => {
      dispatch(testIncrease(id));
    },
    decreaseState: (id: number) => {
      dispatch(testDecrease(id));
    },
  };
};

export const App = connect(
  mapStateToProps,
  mapDispatchToProps,
)(AppComponent);

export default App;
