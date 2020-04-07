"use strict";

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
