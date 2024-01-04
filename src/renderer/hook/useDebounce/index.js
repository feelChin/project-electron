import { useEffect, useRef } from "react";

function useDebounce(fn, delay = 300, immediate, props) {
  const ref = useRef({
    fn,
    timer: null,
  });

  useEffect(() => {
    ref.current.fn = fn;
  }, [fn]);

  let myDebounce = function () {
    const args = [arguments, props];
    ref.current.timer && clearTimeout(ref.current.timer);

    if (immediate) {
      !ref.current.timer && ref.current.fn.apply(this, args);
      ref.current.timer = setTimeout(() => {
        ref.current.timer = null;
      }, delay);
    } else {
      ref.current.timer = setTimeout(() => {
        ref.current.fn.apply(this, args);
      }, delay);
    }
  };

  myDebounce.cancel = () => {
    clearTimeout(ref.current.timer);
    ref.current.timer = null;
  };

  return myDebounce;
}

export default useDebounce;
