"use strict";

class TimeDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div style={{ fontSize: "10vmin", color: "#001D47" }}>
        {this.state.date.toLocaleTimeString()}
      </div>
    );
  }
}

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

class Dashboard extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <ActivityDisplay />
        <TimeDisplay />
      </div>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById("dashboard_container"));
