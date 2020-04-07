"use strict";

class ActivityDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "☕️",
      activities: {
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
      },
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({});
  }

  render() {
    return <div style={{ fontSize: "50vmin" }}>{this.state.activity}</div>;
  }
}
