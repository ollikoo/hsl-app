import "./App.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import BackgroundAnimation from "./components/BackgroundAnimation";
import BusStop from "./pages/BusStop";

const App = () => {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Navigate replace to="/stop/HSL:1201110" />} />
        <Route path="/stop/:id" element={<BusStop />} />
      </Routes>
      <BackgroundAnimation />
    </div>
  );
};

export default App;
