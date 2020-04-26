import React from "react";
import { render } from "@testing-library/react";
import ActivityDisplay from "./ActivityDisplay";

it("renders successfully", () => {
  const { getByText } = render(
    <ActivityDisplay current_activity="?" progress={0.5} />
  );
});
