import { render, screen } from "@testing-library/react";
import App from "./app";

it("App renders without crashing", () => {
  render(<App />);

  expect(screen.getByText("Your accounts")).toBeInTheDocument();
});
