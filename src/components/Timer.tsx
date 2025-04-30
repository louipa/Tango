import * as React from "react";
import {useEffect, useRef} from "react";

interface TimerProps {
  isPlaying: boolean;
  time: number;
  onTimeUpdate: (newTime: number) => void;
}

function Timer({ isPlaying, time, onTimeUpdate }: TimerProps): React.JSX.Element {
  const timerRef = useRef<number>();

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = window.setInterval(() => {
        onTimeUpdate(time + 1);
      }, 1000);
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [isPlaying, time, onTimeUpdate]);

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return <div>Time: {formatTime(time)}</div>;
}

export default Timer;
