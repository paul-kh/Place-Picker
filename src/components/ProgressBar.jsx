// To optimize the performance of the app, we splitted ProgressBar component
// from DeleteConfirmation to avoid re-rendering DeleteConfirmation component
//  every 10 miliseconds when the setInterval codes get executed

import { useState, useEffect } from "react";

export default function ProgressBar({ timer }) {
  // Showing Progress Bar When Stored Place is going to be removed when timer runs out
  const [remainintTime, setRemainingTimer] = useState(timer);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("INTERVAL");
      setRemainingTimer((prevTime) => prevTime - 10);
    }, 10);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return <progress value={remainintTime} max={timer} />;
}
