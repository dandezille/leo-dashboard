import React from "react";
import WeatherProvider from "./WeatherProvider";

interface Props {
  weather_provider: WeatherProvider;
  update_interval: number;
}

interface State {
  is_loaded: boolean;
  error: string;
  temp: number;
  feels_like: number;
}

export default class Weather extends React.Component<Props, State> {
  timerID: NodeJS.Timeout;

  constructor(props: Props) {
    super(props);
    this.timerID = setInterval(function () {}, 0);
    this.state = {
      is_loaded: false,
      error: "",
      temp: 0,
      feels_like: 0,
    };
  }

  update_weather() {
    this.props.weather_provider
      .fetch()
      .then((result) => {
        this.setState({
          temp: result.temp,
          feels_like: result.feels_like,
          error: "",
          is_loaded: true,
        });
      })
      .catch((error: Error) => {
        console.log(error);
        this.setState({
          error: error.message,
          is_loaded: true,
        });
      });
  }

  componentDidMount() {
    this.update_weather();
    this.timerID = setInterval(
      () => this.update_weather(),
      this.props.update_interval
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  render() {
    if (!this.state.is_loaded) {
      return <div style={{ color: "white" }}>Loading...</div>;
    }

    if (this.state.error) {
      return <div style={{ color: "white" }}>Error: {this.state.error}</div>;
    }

    return (
      <div
        style={{
          color: "white",
          fontSize: "8vmin",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-end",
        }}
      >
        <div>Temp: {this.state.temp.toFixed(0)} °C</div>
        <div>Feels: {this.state.feels_like.toFixed(0)} °C</div>
      </div>
    );
  }
}
