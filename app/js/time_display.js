"use strict";

function TimeDisplay(props) {
  return (
    <div
      style={{
        position: "absolute",
        left: "10px",
        bottom: "10px",
        fontSize: "10vmin",
        color: "#edf3ff",
        textAlign: "center",
      }}
    >
      {props.time.format("HH:mm")}
    </div>
  );
}
