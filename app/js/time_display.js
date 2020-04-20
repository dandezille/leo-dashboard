"use strict";

class TimeDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => {
      this.setState({
        date: moment(),
      });
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div
        style={{ fontSize: "10vmin", color: "#edf3ff", textAlign: "center" }}
      >
        {this.state.date.format("HH:mm")}
      </div>
    );
  }
}
