import "./styles.scss";
import Header from "../../components/Header";
import Container from "../../components/Container";

const BusStop = () => {
  return (
    <main className="bus-stop">
      <Header />
      <Container>
        <h1>Buses arriving to</h1>
      </Container>
    </main>
  );
};

export default BusStop;
