import { r as reactExports } from "./index-n8_yRRwO.js";
function Index(fn, delay = 300, props) {
  const ref = reactExports.useRef({
    fn,
    timer: null,
    lastTime: 0
  });
  reactExports.useEffect(() => {
    ref.current.fn = fn;
  }, [fn]);
  let myThrottle = function() {
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
export {
  Index as I
};
