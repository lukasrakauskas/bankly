import { render, screen } from "@testing-library/react";
import App from "./app";
import { createWrapper } from "./tests/wrapper";

it("App renders without crashing", () => {
  render(<App />, { wrapper: createWrapper() });

  expect(screen.getByText("Your accounts")).toBeInTheDocument();
});
