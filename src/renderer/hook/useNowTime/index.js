import React, { useEffect, useState, useRef } from "react";

function Index() {
  const timer = useRef();
  const [nowTime, setNowTime] = useState();

  function renderNowTime() {
    const now = new Date();

    setNowTime(
      <>
        {now.getHours() >= 10 ? now.getHours() : "0" + now.getHours()}
        <span
          style={{
            margin: "0 1px",
          }}
        >
          :
        </span>
        {now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()}
      </>
    );
  }

  useEffect(() => {
    timer.current = setInterval(() => {
      renderNowTime();
    }, 1000);

    return () => {
      clearInterval(timer.current);
    };
  }, []);

  return nowTime;
}

export default Index;
