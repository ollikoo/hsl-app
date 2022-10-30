import { ReactComponent as Animation } from "../../assets/bg-animated.svg";
import "./styles.scss";

const BackgroundAnimation = () => {
  return (
    <div className="background-animation">
      <div className="background-animation__level-clouds">
        <Animation />
      </div>
    </div>
  );
};

export default BackgroundAnimation;
