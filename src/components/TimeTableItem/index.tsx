import { memo } from "react";
import "./styles.scss";
import { Stoptime } from "../TimeTable";

import { ReactComponent as IconBus } from "../../assets/icon-bus.svg";
import { DateTime, Interval } from "luxon";

type TimeTableItemProps = {
  stoptime: Stoptime;
  currentTime: DateTime | undefined;
};

const TimeTableItem = ({ stoptime, currentTime }: TimeTableItemProps) => {
  if (
    currentTime &&
    stoptime?.realtimeDeparture &&
    stoptime?.scheduledDeparture &&
    stoptime?.serviceDay &&
    stoptime?.trip?.routeShortName
  ) {
    const secondsLate =
      stoptime.realtimeDeparture - stoptime.scheduledDeparture;
    const minutesLate = Math.round(secondsLate / 60);

    const departureTime = DateTime.fromSeconds(
      stoptime.serviceDay + stoptime.realtimeDeparture
    );

    const departureHour = `${departureTime.hour < 10 ? "0" : ""}${
      departureTime.hour
    }`;

    const departureMinute = `${departureTime.minute < 10 ? "0" : ""}${
      departureTime.minute
    }`;

    const untilDeparture = Math.round(
      Interval.fromDateTimes(currentTime, departureTime).length("minutes")
    );

    return (
      <div className="time-table-item">
        <div
          className={`time-table-item__indicator time-table-item__indicator--${
            secondsLate <= 0 ? "success" : "alert"
          }`}
        />
        <div className="time-table-item__icon">
          <IconBus />
        </div>
        <div className="time-table-item__content-wrap">
          <p>
            {stoptime.trip.routeShortName}
            {secondsLate > 0
              ? ` (${minutesLate > 0 ? minutesLate : `Less than`} minute${
                  minutesLate > 1 ? "s" : ""
                } late)`
              : ""}
          </p>
          <p className="light">{`In ${untilDeparture} Minute${
            untilDeparture > 1 || untilDeparture === 0 ? "s" : ""
          } / ${departureHour}:${departureMinute}`}</p>
        </div>
      </div>
    );
  } else return null;
};
export default memo(TimeTableItem);
