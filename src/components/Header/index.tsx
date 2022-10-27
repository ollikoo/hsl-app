import { useState, useEffect } from "react";
import "./styles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { NavLink } from "react-router-dom";

type Clock = {
  hours: number;
  minutes: number;
  seconds: number;
};

const Header = () => {
  const [clock, setClock] = useState<Clock>();

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();
      setClock({ hours, minutes, seconds });
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="header">
      <div className="header__logo">
        <NavLink to="/">
          <Logo />
        </NavLink>
      </div>
      <div className="header__time">
        {clock && (
          <h3>
            {clock.hours < 10 ? "0" : ""}
            {clock.hours}:{clock.minutes < 10 ? "0" : ""}
            {clock.minutes}
          </h3>
        )}
      </div>
    </div>
  );
};

export default Header;
