import React, { useEffect, useState } from "react";

function Timer({ setGameOver, questionNumber }) {
  const [seconds, setseconds] = useState(30);
  useEffect(() => {
    if (seconds === 0) {
      return setGameOver(true);
    }
    const interval = setInterval(() => setseconds((prev) => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [setGameOver, seconds]);

  useEffect(() => {
    setseconds(30);
  }, [questionNumber]);

  return <>{seconds}</>;
}

export default Timer;
