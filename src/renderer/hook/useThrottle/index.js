import { useEffect, useRef } from "react";

function Index(fn, delay = 300, props) {
  const ref = useRef({ fn, timer: null, lastTime: 0 });

  useEffect(() => {
    ref.current.fn = fn;
  }, [fn]);

  let myThrottle = function () {
    const args = [...arguments, props];

    const nowTime = Date.now();

    if (nowTime - ref.current.lastTime > delay) {
      ref.current.fn.apply(this, args);
      ref.current.lastTime = nowTime;
    } else {
      ref.current.timer && clearTimeout(ref.current.timer);
      ref.current.timer = setTimeout(() => {
        ref.current.fn.apply(this, args);
        ref.current.lastTime = nowTime;
      }, delay);
    }
  };

  myThrottle.cancel = () => {
    clearTimeout(ref.current.timer);
    ref.current.timer = null;
  };

  return myThrottle;
}

export default Index;
