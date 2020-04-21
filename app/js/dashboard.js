"use strict";

class Dashboard extends React.Component {
  constructor(props) {
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

ReactDOM.render(<Dashboard />, document.getElementById("dashboard_container"));
