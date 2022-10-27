import "./styles.scss";
import Header from "../Header";
import Container from "../Container";
import TimeTable from "../TimeTable";
import { useParams } from "react-router-dom";
import { Route, Stoptime, useBusStopQuery } from "../../generated/graphql";

const BusStop = () => {
  const { stopId } = useParams();
  const { data, error, loading } = useBusStopQuery({
    variables: { stopId: stopId ?? "" },
  });

  const stopTimes: any[] = [];

  const routes = data?.stop?.routes;
  if (routes) {
    for (let i = 0; i < routes.length; i++) {
      const route = routes[i];
      const line = route.shortName;
      const trips = route.trips;
      if (trips) {
        for (let i = 0; i < trips.length; i++) {
          const trip = trips[i];
          const stoptimes = trip?.stoptimes;
          if (stoptimes) {
            for (let i = 0; i < stoptimes.length; i++) {
              const stoptime = stoptimes[i];
              stopTimes.push({ line, ...stoptime });
            }
          }
        }
      }
    }
  }

  console.log("stopTimes:", stopTimes);

  console.log("data:", data, error, loading);

  return (
    <main className="bus-stop">
      <Header />
      <Container>
        <>
          <h1>Buses arriving to</h1>
          {stopTimes?.length > 0 && (
            <>
              <h2>Energia-aukio</h2>
              <TimeTable />
            </>
          )}
          {loading && <h2>loading...</h2>}
          {error && <h2>Error</h2>}
        </>
      </Container>
    </main>
  );
};

export default BusStop;
