import React from "react";
import moment from "moment";

import Activities from "./Activities";
import ActivityDisplay from "./ActivityDisplay";
import NextActivityDisplay from "./NextActivityDisplay";
import TimeDisplay from "./TimeDisplay";

interface Props {
  activities: Activities;
}

interface State {
  time: moment.Moment;
}

class App extends React.Component<Props, State> {
  timerID: NodeJS.Timeout;
  activities: Activities;

  constructor(props: Props) {
    super(props);
    this.timerID = setTimeout(function () {}, 0);
    this.activities = props.activities;
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
    const activity = this.activities.current(this.state.time);
    const next_activity = this.activities.next(this.state.time);
    const elapsed = this.state.time.diff(activity.start);
    const progress = elapsed / activity.duration;

    return (
      <div
        style={{
          display: "flex",
          flex: 1,
          minHeight: "100vh",
        }}
      >
        <ActivityDisplay activity={activity.symbol} progress={progress} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "flex-end",
            padding: "15px",
          }}
        >
          <TimeDisplay time={this.state.time} />
          <NextActivityDisplay activity={next_activity.symbol} />
        </div>
      </div>
    );
  }
}

export default App;
