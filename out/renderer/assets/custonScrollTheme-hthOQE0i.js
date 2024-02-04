import { R as React, r as reactExports } from "./index-n8_yRRwO.js";
const myScroll = "_myScroll_dfphn_1";
const scrollBar = "_scrollBar_dfphn_9";
const style = {
  myScroll,
  scrollBar
};
function Index({
  children,
  height = "100%",
  onScroll,
  beforeUpdate,
  barHeight = 20,
  animation = {
    transition: "0.1s",
    transitionTimingFunction: "ease-in-out"
  },
  reload,
  speed = 1,
  showbar = false,
  showbarDelay = 2e3
}) {
  const myScrollRef = reactExports.useRef(null);
  const childRef = reactExports.useRef(null);
  const barRef = reactExports.useRef(null);
  const timer = reactExports.useRef(null);
  const pointCache = reactExports.useRef({});
  const wheelConfigRef = reactExports.useRef({
    speed,
    //滚动速度
    count: 0,
    // 滚动距离
    myScrollHeight: 0,
    // 容器高度
    childHeight: 0,
    // children容器高度
    drag: false
    // 是否拖拽
  });
  const clonedChildren = reactExports.cloneElement(children, {
    ref: childRef,
    style: {
      ...children.props.style,
      ...animation
    }
  });
  async function draw() {
    const {
      count,
      myScrollHeight,
      childHeight,
      barScrollPoint
    } = wheelConfigRef.current;
    const threshold = myScrollHeight * (count / childHeight);
    const result_point = Math.max(count / childHeight * barScrollPoint, 0);
    const result_scroll = Math.max(count - threshold, 0);
    const result = {
      scrollTop: result_scroll,
      count,
      point: result_point,
      progress: count / childHeight * 100
    };
    beforeUpdate && await new Promise((resolve) => {
      beforeUpdate(result);
      setTimeout(() => {
        resolve();
      }, 0);
    });
    onScroll && onScroll(result);
    barRef.current.style.setProperty("--scroll", result_point);
    childRef.current.style.transform = `translate3d(0,-${result_scroll}px,0)`;
    if (!showbar) {
      if (timer.current) {
        clearTimeout(timer.current);
      }
      if (barRef.current.classList.contains("opacity")) {
        barRef.current.classList.remove("opacity");
      }
      timer.current = setTimeout(() => {
        barRef.current.classList.add("opacity");
      }, showbarDelay);
    }
  }
  function handleWheel(e) {
    let {
      count,
      childHeight,
      speed: speed2
    } = wheelConfigRef.current;
    count += e.deltaY * speed2;
    if (count >= childHeight) {
      count = childHeight;
    }
    if (count <= 0) {
      count = 0;
    }
    wheelConfigRef.current.count = count;
    requestAnimationFrame(draw);
  }
  function handlePointerDown(e) {
    wheelConfigRef.current.drag = true;
    myScrollRef.current.style.userSelect = "none";
    const {
      count,
      childHeight
    } = wheelConfigRef.current;
    pointCache.current.startPoint = e.clientY;
    pointCache.current.startPointScroll = count / childHeight;
  }
  function handlePointerMove(e) {
    if (wheelConfigRef.current.drag) {
      barRef.current.style.transition = "0s";
      const {
        myScrollHeight,
        barScrollPoint,
        childHeight
      } = wheelConfigRef.current;
      const allScroll = barScrollPoint * myScrollHeight / 100;
      const point = (e.clientY - pointCache.current.startPoint) / allScroll + pointCache.current.startPointScroll;
      wheelConfigRef.current.count = Math.min(Math.max(point, 0), 1) * childHeight;
      requestAnimationFrame(draw);
    }
  }
  function handlePointerUp() {
    if (wheelConfigRef.current.drag) {
      barRef.current.style.transition = ".1s";
      myScrollRef.current.style.userSelect = "auto";
      wheelConfigRef.current.drag = false;
    }
  }
  reactExports.useEffect(() => {
    wheelConfigRef.current = {
      ...wheelConfigRef.current,
      myScrollHeight: myScrollRef.current.offsetHeight,
      childHeight: childRef.current.offsetHeight,
      barScrollPoint: 100 - barHeight / myScrollRef.current.offsetHeight * 100
    };
    if (wheelConfigRef.current.childHeight < wheelConfigRef.current.myScrollHeight) {
      barRef.current.classList.add("none");
    } else {
      barRef.current.classList.contains("none") && barRef.current.classList.remove("none");
    }
    document.body.addEventListener("pointermove", handlePointerMove);
    document.body.addEventListener("pointerup", handlePointerUp);
    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
      document.body.removeEventListener("pointerup", handlePointerUp);
    };
  }, [reload]);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.myScroll,
    ref: myScrollRef,
    style: {
      height
    },
    onWheel: handleWheel
  }, clonedChildren, /* @__PURE__ */ React.createElement("div", {
    className: style.scrollBar
  }, /* @__PURE__ */ React.createElement("span", {
    ref: barRef,
    style: {
      "--scroll": 0,
      "--height": barHeight
    },
    onPointerDown: handlePointerDown
  })));
}
const CustonScrollTheme = React.memo(Index);
export {
  CustonScrollTheme as C
};
