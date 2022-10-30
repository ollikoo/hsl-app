import { useEffect } from "react";
import "./styles.scss";
import Header from "../Header";
import Container from "../Container";
import TimeTable from "../TimeTable";
import { useParams } from "react-router-dom";
import { useBusStopQuery } from "../../generated/graphql";

const Stop = () => {
  const { stopId } = useParams();
  const { data, error, loading, startPolling, stopPolling } = useBusStopQuery({
    variables: { stopId: stopId ?? "" },
  });

  useEffect(() => {
    if (data?.stop?.name) {
      document.title = `Stop - ${data.stop.name}`;
    }
  }, [data]);

  useEffect(() => {
    startPolling(10000);
    return () => {
      stopPolling();
    };
  }, [startPolling, stopPolling]);

  console.log("data:", data, error, loading);

  return (
    <div className="bus-stop">
      <Header />
      <Container>
        <>
          {data?.stop && (
            <>
              <h1>Buses arriving to</h1>
              {data.stop.name && <h2>{data.stop.name}</h2>}
              <TimeTable data={data} />
            </>
          )}
          {loading && <h2>Loading...</h2>}
          {!loading && !data?.stop && <h2>Data not found</h2>}
          {error && <h2>Error</h2>}
        </>
      </Container>
    </div>
  );
};

export default Stop;
