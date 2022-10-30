import "./styles.scss";
import { BusStopQuery, RealtimeState } from "../../generated/graphql";
import useCurrentTime from "../../hooks/useCurrentTime";
import TimeTableItem from "../TimeTableItem";

export type Stoptime = {
  scheduledDeparture?: number | null;
  realtimeDeparture?: number | null;
  realtime?: boolean | null;
  realtimeState?: RealtimeState | null;
  serviceDay?: number | null;
  trip?: { __typename?: "Trip"; routeShortName?: string | null } | null;
} | null;

type TimeTableProps = {
  data: BusStopQuery;
};

const TimeTable = ({ data }: TimeTableProps) => {
  const time = useCurrentTime();

  return (
    <section className="time-table">
      {data?.stop?.stoptimesWithoutPatterns?.map((stoptime: Stoptime) => {
        const key = `${stoptime?.trip?.routeShortName}-${stoptime?.scheduledDeparture}`;
        return (
          <TimeTableItem key={key} stoptime={stoptime} currentTime={time} />
        );
      })}
    </section>
  );
};

export default TimeTable;
