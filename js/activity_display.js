"use strict";

class ActivityDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentActivity: "☕️",
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

  tick() {
    this.setState({});
  }

  currentActivity() {
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

    const keys = Object.keys(activities);
    const current_key =
      keys.findIndex((k) => moment(k, "HH:mm") > moment()) - 1;

    return activities[keys[current_key]];
  }

  render() {
    return (
      <div style={{ fontSize: "50vmin" }}>{this.state.currentActivity}</div>
    );
  }
}
