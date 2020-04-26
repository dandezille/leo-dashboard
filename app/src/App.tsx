import React from "react";
import moment from "moment";

import ActivityDisplay from "./ActivityDisplay";
import TimeDisplay from "./TimeDisplay";
import Activities from "./Activities";

interface Props {}

interface State {
  time: moment.Moment;
}

class App extends React.Component<Props, State> {
  timerID: NodeJS.Timeout = setTimeout(function () {}, 0);
  activities: Activities = new Activities();

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
    const activity = this.activities.current(this.state.time);
    const elapsed = this.state.time.diff(activity.start);
    const progress = elapsed / activity.duration;

    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ActivityDisplay
          current_activity={activity.symbol}
          progress={progress}
        />
        <TimeDisplay time={this.state.time} />
      </div>
    );
  }
}

export default App;
