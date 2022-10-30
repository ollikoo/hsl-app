import { gql } from "@apollo/client";

export const QUERY_BUS_STOP = gql`
  query BusStop($stopId: String!) {
    stop(id: $stopId) {
      name
      stoptimesWithoutPatterns(startTime: 0) {
        scheduledDeparture
        realtimeDeparture
        realtime
        realtimeState
        serviceDay
        trip {
          routeShortName
        }
      }
    }
  }
`;
