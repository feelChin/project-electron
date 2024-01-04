import React, { useEffect, useRef, useState } from "react";

function fixedZero(value) {
  return value < 10 ? `0${value}` : value;
}

const initTime = (value, now) => {
  let targetTime;

  if (Object.prototype.toString.call(value) === "[object Date]") {
    targetTime = value.getTime();
  } else {
    targetTime = new Date(value).getTime();
  }

  const count = targetTime - now;

  return count > 0 ? count : 0;
};

function TimeCountDown(props) {
  const timer = useRef();
  const interval = 1000;

  const { time, onEnd, type, nowTime = new Date() } = props;

  const [lastTime, setLasttime] = useState(initTime(time, nowTime.getTime()));

  useEffect(() => {
    setLasttime(initTime(time, nowTime.getTime()));
  }, [time]);

  function defaultFormat(time) {
    const hours = 60 * 60 * 1000;
    const minutes = 60 * 1000;

    const h = Math.floor(time / hours);
    const m = Math.floor((time - h * hours) / minutes);
    const s = Math.floor((time - h * hours - m * minutes) / 1000);
    return (
      <>
        {type === "simple" ? (
          <>
            <span>{fixedZero(h)}</span>
            <small>时</small>
            <span>{fixedZero(m)}</span>
            <small>分</small>
            <span>{fixedZero(s)}</span>
            <small>秒</small>
          </>
        ) : (
          <span>
            {fixedZero(h)}:{fixedZero(m)}:{fixedZero(s)}
          </span>
        )}
      </>
    );
  }

  useEffect(() => {
    if (lastTime < interval) {
      setLasttime(0);
      onEnd && onEnd();
      return;
    }

    timer.current = setTimeout(() => {
      setLasttime(lastTime - interval);
    }, interval);

    return () => {
      clearTimeout(timer.current);
    };
  }, [lastTime, onEnd]);

  return (
    <section className="timeCountDown">
      {lastTime ? defaultFormat(lastTime) : ""}
    </section>
  );
}

export default React.memo(TimeCountDown);
