"use strict";

class Dashboard extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <ActivityDisplay />
        <TimeDisplay />
      </div>
    );
  }
}

ReactDOM.render(<Dashboard />, document.getElementById("dashboard_container"));
