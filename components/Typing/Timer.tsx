import React, { useState, useEffect } from "react";

interface Props {
  isInit: boolean;
  setTime: any;
}
const Timer = ({ isInit, setTime }: Props) => {
  const [seconds, setSeconds] = useState(0); // Initial time: 3 minutes

  useEffect(() => {
    if (!isInit) return;
    const countdown = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(countdown);
  }, [isInit]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
  };

  useEffect(() => {
    setTime(formatTime(seconds));
  });
  return <div>{formatTime(seconds)}</div>;
};

export default Timer;
