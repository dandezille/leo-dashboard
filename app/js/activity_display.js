"use strict";

const activities = {
  "07:30": "🥐",
  "08:30": "📖",
  "08:45": "🚗",
  "10:00": "☕️",
  "12:00": "🍽️",
  "13:30": "📖",
  "13:40": "️🛏️",
  "16:30": "🚗",
  "18:00": "🍽️",
  "19:30": "📖",
  "19:40": "😬",
  "19:50": "️🛏️",
};

class ActivityDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActivity: this.currentActivity(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({ currentActivity: this.currentActivity() });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  currentActivity() {
    const keys = Object.keys(activities);
    let current_key = keys.findIndex((k) => moment(k, "HH:mm") > moment()) - 1;

    if (current_key == -2) {
      current_key = keys.length - 1;
    }

    return activities[keys[current_key]];
  }

  render() {
    return (
      <div style={{ fontSize: "50vmin" }}>{this.state.currentActivity}</div>
    );
  }
}
