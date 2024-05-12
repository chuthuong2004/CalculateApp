import {useEffect, useRef, useState} from 'react';
import {Nullable} from '@/types/commons';

export function useTimer(duration: number) {
  // We need ref in this, because we are dealing
  // with JS setInterval to keep track of it and
  // stop it when needed
  const Ref = useRef<Nullable<NodeJS.Timer>>(null);

  // The state for our timer
  const [timer, setTimer] = useState('00:00:00');

  const getTimeRemaining = (e: Date) => {
    const total = Date.parse(e.toString()) - Date.parse(new Date().toString());
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / 1000 / 60 / 60) % 24);
    return {
      total,
      hours,
      minutes,
      seconds,
    };
  };

  const startTimer = (e: Date) => {
    let {total, hours, minutes, seconds} = getTimeRemaining(e);
    if (total >= 0) {
      setTimer(
        (hours > 9 ? hours : '0' + hours) +
          ':' +
          (minutes > 9 ? minutes : '0' + minutes) +
          ':' +
          (seconds > 9 ? seconds : '0' + seconds),
      );
    } else {
      if (Ref.current) {
        console.log('clearTimer');
        clearInterval(Ref.current);
      }
    }
  };

  const clearTimer = (e: Date) => {
    const id = setInterval(() => {
      startTimer(e);
    }, 1000);
    Ref.current = id;
  };

  const getDeadTime = () => {
    let deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + duration);
    return deadline;
  };
  useEffect(() => {
    clearTimer(getDeadTime());

    return () => {
      Ref.current && clearInterval(Ref.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return timer;
}
