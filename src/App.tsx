import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import BackgroundAnimation from "./components/BackgroundAnimation";
import Stop from "./components/Stop";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate replace to="/stop/HSL:1201110" />} />
        <Route path="/stop/:stopId" element={<Stop />} />
      </Routes>
      <BackgroundAnimation />
    </div>
  );
};

export default App;
