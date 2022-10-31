import { render } from "@testing-library/react";
import TimeTableItem from ".";
import { DateTime } from "luxon";
import { Stoptime } from "../TimeTable";

const time = DateTime.now().setZone("Europe/Helsinki");

const stopOnTime: Stoptime = {
  scheduledDeparture: time.plus({ seconds: 3600 }).toSeconds(),
  realtimeDeparture: time.plus({ seconds: 3600 }).toSeconds(),
  realtime: false,
  realtimeState: "SCHEDULED",
  serviceDay: time.toSeconds(),
  trip: {
    __typename: "Trip",
    routeShortName: "15",
  },
};

const stopDelayedForMinute: Stoptime = {
  scheduledDeparture: time.plus({ seconds: 3600 }).toSeconds(),
  realtimeDeparture: time.plus({ seconds: 3660 }).toSeconds(),
  realtime: true,
  realtimeState: "SCHEDULED",
  serviceDay: time.toSeconds(),
  trip: {
    __typename: "Trip",
    routeShortName: "15",
  },
};

const stopDelayedForTwoMinutes: Stoptime = {
  scheduledDeparture: time.plus({ seconds: 3600 }).toSeconds(),
  realtimeDeparture: time.plus({ seconds: 3720 }).toSeconds(),
  realtime: true,
  realtimeState: "SCHEDULED",
  serviceDay: time.toSeconds(),
  trip: {
    __typename: "Trip",
    routeShortName: "15",
  },
};

const stopDelayedForSecond: Stoptime = {
  scheduledDeparture: time.plus({ seconds: 3600 }).toSeconds(),
  realtimeDeparture: time.plus({ seconds: 3601 }).toSeconds(),
  realtime: true,
  realtimeState: "SCHEDULED",
  serviceDay: time.toSeconds(),
  trip: {
    __typename: "Trip",
    routeShortName: "15",
  },
};

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
  const { container } = render(
    <TimeTableItem currentTime={time} stoptime={stopDelayedForSecond} />
  );

  expect(container.firstChild?.childNodes[2]?.firstChild).toHaveTextContent(
    "15 (Less than minute late)"
  );
});

test("renders more than minute delayed message", () => {
  const { container } = render(
    <TimeTableItem currentTime={time} stoptime={stopDelayedForTwoMinutes} />
  );

  expect(container.firstChild?.childNodes[2]?.firstChild).toHaveTextContent(
    "15 (2 minutes late)"
  );
});
