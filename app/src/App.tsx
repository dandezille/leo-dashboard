import React from "react";
import moment from "moment";

import ActivityDisplay from "./ActivityDisplay";
import TimeDisplay from "./TimeDisplay";

class Activities {
  current(time: moment.Moment) {
    const activity_times = Object.keys(this.activities);
    const next_activity = this.nextTimeIndex(activity_times, time);
    const current_activity = this.activities[activity_times[next_activity - 1]];

    const current_activity_start = this.parseTime(
      activity_times[next_activity - 1]
    );
    const next_activity_start = this.parseTime(activity_times[next_activity]);

    const activity_duration = next_activity_start.diff(current_activity_start);

    return {
      start: current_activity_start,
      duration: activity_duration,
      symbol: current_activity,
    };
  }

  private activities: { [time: string]: string } = {
    "07:30": "🥐", // breakfast
    "08:15": "🦷", // Teeth and face wash
    "08:20": "📚", // French story and drawing
    "08:30": "🎨", // Craft (colouring, painting, drawing)
    "09:00": "🍳", // Baking
    "09:30": "️🚶‍♂️", // Walk
    "10:00": "️☕", // Coffee and listen
    "10:30": "️🧩", // Play
    "12:00": "️📺", // Cartoon
    "12:30": "️🍽️", // Lunch and listen
    "13:00": "️️️📺", // Cartoon
    "13:30": "️️️🧩️", // Play
    "13:50": "️️️📖️", // Story
    "14:00": "️️️️🛏️", // Nap
    "16:30": "️️️🧩️", // Play
    "17:00": "️🚶‍♂️", // Walk
    "17:30": "️️️📺", // Cartoon
    "18:00": "️🍽️", // Dinner and listen
    "18:30": "️️️📺", // Cartoon
    "19:00": "️️️🛀", // Bath or shower
    "19:30": "🦷", // Teeth and face wash
    "19:40": "️️️📖️", // Story
    "19:45": "🛏️", // Bed
  };

  private parseTime(time: string) {
    return moment(time, "HH:mm");
  }

  private nextTimeIndex(times: any[], current_time: moment.Moment) {
    const index = times.findIndex((k) => this.parseTime(k) > current_time);
    if (index !== -1) {
      return index;
    }

    return times.length; // Handle last activity
  }
}

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
