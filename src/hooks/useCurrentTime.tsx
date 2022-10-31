import { useState, useEffect, useCallback } from "react";
import { DateTime } from "luxon";

const useCurrentTime = () => {
  const [time, setTime] = useState<DateTime | undefined>();

  const getTime = useCallback(() => {
    const t = DateTime.now().setZone("Europe/Helsinki");

    if (t) {
      setTime(t);
    }
  }, []);

  useEffect(() => {
    getTime();
    const interval = setInterval(() => {
      getTime();
    }, 1000);
    return () => clearInterval(interval);
  }, [getTime]);

  return time;
};

export default useCurrentTime;
