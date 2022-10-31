import { render, screen } from "@testing-library/react";
import Header from ".";
import { BrowserRouter } from "react-router-dom";
import { DateTime } from "luxon";

test("renders clock element", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const clockElement = screen.getByRole("heading", { level: 3 });
  expect(clockElement).toBeInTheDocument();
});

test("is correct time", () => {
  render(
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  const clockElement = screen.getByRole("heading", { level: 3 });
  const time = DateTime.now().setZone("Europe/Helsinki");
  // prettier-ignore
  const timeString = `${time.hour < 10 ? "0" : ""}${time.hour}:${time.minute < 10 ? "0" : ""}${time.minute}`;
  expect(clockElement).toHaveTextContent(timeString);
});
