"use strict";

class ActivityDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activity: "☕️",
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
