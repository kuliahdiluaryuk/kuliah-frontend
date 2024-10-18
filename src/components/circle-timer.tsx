import React, { useEffect, useRef, useState } from 'react';

interface CircleTimerProps {
  duration: number;
  onFinish: () => void;
  isStarted: boolean;
}

const CircleTimer: React.FC<CircleTimerProps> = ({ duration, onFinish, isStarted }) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  const radius = 34; // Adjusted for 76px total size (76/2 - 5 for stroke width)
  const circumference = 2 * Math.PI * radius;
  const timerRef = useRef<SVGCircleElement>(null);
  const finishCalled = useRef(false);

  useEffect(() => {
    if (!isStarted) return;

    const timerInterval = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timerInterval);
          if (!finishCalled.current) {
            onFinish();
            finishCalled.current = true;
          }
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isStarted, onFinish]);

  useEffect(() => {
    const offset = (timeLeft / duration) * circumference;
    if (timerRef.current) {
      timerRef.current.style.strokeDashoffset = `${offset}`;
    }
  }, [timeLeft, circumference, duration]);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="relative flex items-center justify-center">
      <svg width="76" height="76">
        <circle
          cx="38"
          cy="38"
          r={radius}
          fill="transparent"
          stroke="#FFD013"
          strokeWidth="4"
        />
        <circle
          ref={timerRef}
          cx="38"
          cy="38"
          r={radius}
          fill="transparent"
          stroke="#e6e6e6"
          strokeWidth="4"
          strokeDasharray={circumference}
          strokeDashoffset={circumference}
          className="transition-all duration-1000 linear -rotate-90 transform origin-center"
        />
      </svg>
      <div className="absolute text-center font-bold">
        {formatTime(timeLeft)}
      </div>
    </div>
  );
};

export default CircleTimer;
