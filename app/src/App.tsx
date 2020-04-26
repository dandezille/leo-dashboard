import React from "react";
import moment from "moment";

import ActivityDisplay from "./ActivityDisplay";
import TimeDisplay from "./TimeDisplay";

interface Props {}

interface State {
  time: moment.Moment;
}

class App extends React.Component<Props, State> {
  timerID: NodeJS.Timeout = setTimeout(function () {}, 0);

  constructor(props: Props) {
    super(props);
    this.state = {
      time: moment(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        time: moment(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ActivityDisplay time={this.state.time} />
        <TimeDisplay time={this.state.time} />
      </div>
    );
  }
}

export default App;
