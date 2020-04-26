import moment from "moment";
import { create_activities } from "./Activities";

const activities = create_activities({
  "10:00": "️🧩",
  "12:00": "️🛏️",
});

it("returns current activity details", () => {
  const activity = activities.current(moment("10:05", "HH:mm"));
  expect(activity.start).toEqual(moment("10:00", "HH:mm"));
  expect(activity.duration).toEqual(120 * 60 * 1000); // 2 hours in ms
  expect(activity.symbol).toEqual("️🧩");
});
