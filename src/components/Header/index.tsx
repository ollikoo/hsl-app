import useCurrentTime from "../../hooks/useCurrentTime";
import "./styles.scss";
import { ReactComponent as Logo } from "../../assets/logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const time = useCurrentTime();

  return (
    <header className="header" role="navigation">
      <div className="header__logo">
        <Link to="/" aria-label="Link to homepage">
          <Logo />
        </Link>
      </div>
      <div className="header__time">
        {time && (
          <h3>
            {time.hour < 10 ? "0" : ""}
            {time.hour}:{time.minute < 10 ? "0" : ""}
            {time.minute}
          </h3>
        )}
      </div>
    </header>
  );
};

export default Header;
