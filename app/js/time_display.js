"use strict";

function TimeDisplay(props) {
  return (
    <div style={{ fontSize: "10vmin", color: "#edf3ff", textAlign: "center" }}>
      {props.time.format("HH:mm")}
    </div>
  );
}
