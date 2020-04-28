import moment from "moment";
import { create_activities } from "./Activities";

const activities = create_activities({
  "10:00": "️a",
  "12:00": "️b️",
});

describe("#current", () => {
  it("returns current activity details", () => {
    const activity = activities.current(moment("10:05", "HH:mm"));
    expect(activity.start).toEqual(moment("10:00", "HH:mm"));
    expect(activity.duration).toEqual(2 * 60 * 60 * 1000); // 2 hours in ms
    expect(activity.symbol).toEqual("️a");
  });

  it("handles last activity of the day", () => {
    const activity = activities.current(moment("12:05", "HH:mm"));
    expect(activity.start).toEqual(moment("12:00", "HH:mm"));
    expect(activity.duration).toEqual(22 * 60 * 60 * 1000); // 22 hours in ms
    expect(activity.symbol).toEqual("️b️");
  });
});

describe("#next", () => {
  it("returns next activity details", () => {
    const activity = activities.next(moment("10:05", "HH:mm"));
    expect(activity.start).toEqual(moment("12:00", "HH:mm"));
    expect(activity.duration).toEqual(22 * 60 * 60 * 1000); // 22 hours in ms
    expect(activity.symbol).toEqual("b");
  });
});
