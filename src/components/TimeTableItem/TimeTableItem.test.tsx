import { render, screen } from "@testing-library/react";
import TimeTableItem from ".";
import { DateTime, Interval } from "luxon";
import { Stoptime } from "../TimeTable";

const time = DateTime.now().setZone("Europe/Helsinki");
const midnight = DateTime.fromObject({
  year: time.year,
  month: time.month,
  day: time.day,
});
const interval = Interval.fromDateTimes(midnight, time).length("seconds");

const stopOnTime: Stoptime = {
  scheduledDeparture: interval,
  realtimeDeparture: interval,
  serviceDay: midnight.toSeconds(),
  trip: {
    routeShortName: "15",
  },
};

const stopDelayedForMinute: Stoptime = {
  scheduledDeparture: interval + 60,
  realtimeDeparture: interval + 120,
  serviceDay: midnight.toSeconds(),
  trip: {
    routeShortName: "15",
  },
};

const stopDelayedForTwoMinutes: Stoptime = {
  scheduledDeparture: interval + 120,
  realtimeDeparture: interval + 240,
  serviceDay: midnight.toSeconds(),
  trip: {
    routeShortName: "15",
  },
};

const stopDelayedForSecond: Stoptime = {
  scheduledDeparture: interval + 60,
  realtimeDeparture: interval + 61,
  serviceDay: midnight.toSeconds(),
  trip: {
    routeShortName: "15",
  },
};

test("renders stop departuring now", () => {
  render(<TimeTableItem currentTime={time} stoptime={stopOnTime} />);

  const regex = /In 0 Minutes/;
  const message = screen.getByText(regex);
  expect(message).toHaveTextContent(regex);
});

test("renders on time indicator", () => {
  const { container } = render(
    <TimeTableItem currentTime={time} stoptime={stopOnTime} />
  );

  expect(container.firstChild?.firstChild).toHaveClass(
    "time-table-item__indicator time-table-item__indicator--success"
  );
});

test("renders delayed stop indicator", () => {
  const { container } = render(
    <TimeTableItem currentTime={time} stoptime={stopDelayedForMinute} />
  );

  expect(container.firstChild?.firstChild).toHaveClass(
    "time-table-item__indicator time-table-item__indicator--alert"
  );
});

test("renders 1 second delayed stop indicator", () => {
  const { container } = render(
    <TimeTableItem currentTime={time} stoptime={stopDelayedForSecond} />
  );

  expect(container.firstChild?.firstChild).toHaveClass(
    "time-table-item__indicator time-table-item__indicator--alert"
  );
});

test("renders less than minute delayed message", () => {
  render(<TimeTableItem currentTime={time} stoptime={stopDelayedForSecond} />);
  const str = "15 (Less than minute late)";
  const message = screen.getByText(str);

  expect(message).toHaveTextContent(str);
});

test("renders more than minute delayed message", () => {
  render(
    <TimeTableItem currentTime={time} stoptime={stopDelayedForTwoMinutes} />
  );
  const str = "15 (2 minutes late)";
  const message = screen.getByText(str);

  expect(message).toHaveTextContent(str);
});
