import { gql } from "@apollo/client";

export const QUERY_BUS_STOP = gql`
  query BusStop($stopId: String!) {
    stop(id: $stopId) {
      gtfsId
      name
      routes {
        gtfsId
        shortName
        mode
        trips {
          gtfsId
          tripShortName
          tripHeadsign
          routeShortName
          activeDates
          stoptimes {
            serviceDay
            scheduledArrival
            realtimeArrival
            arrivalDelay
            realtime
            realtimeState
          }
        }
      }
    }
  }
`;
