import React, { useRef, cloneElement, useEffect } from "react";
import style from "./index.module.scss";

function Index({
  children,
  height = "100%",
  onScroll,
  barHeight = 20,
  beforeUpdate,
  animation = {
    transition: "0.1s",
    transitionTimingFunction: "ease-in-out",
  },
  reload,
}) {
  const myScrollRef = useRef(null); // 容器
  const childRef = useRef(null); // children容器
  const barRef = useRef(null); // scrollBar 容器

  const wheelConfigRef = useRef({
    count: 0, // 滚动距离
    myScrollHeight: 0, // 容器高度
    childHeight: 0, // children容器高度
    drag: false, // 是否拖拽
  });

  const clonedChildren = cloneElement(children, {
    ref: childRef,
    style: {
      ...children.props.style,
      ...animation,
    },
  });

  async function draw() {
    const { count, myScrollHeight, childHeight, barScrollPoint } =
      wheelConfigRef.current;

    const threshold = myScrollHeight * (count / childHeight);

    const result_point = Math.max(
      (count / childHeight - barScrollPoint) * 100,
      0
    );
    const result_scroll = Math.max(count - threshold, 0);
    const result = {
      scrollTop: result_scroll,
      count: count,
      point: result_point,
    };

    beforeUpdate &&
      (await new Promise((resolve) => {
        beforeUpdate(result);
        setTimeout(() => {
          resolve();
        }, 0);
      }));

    onScroll && onScroll(result);

    barRef.current.style.setProperty("--scroll", result_point);
    childRef.current.style.transform = `translate3d(0,-${result_scroll}px,0)`;
  }

  function handleWheel(e) {
    let { count, childHeight } = wheelConfigRef.current;

    count += e.deltaY;

    if (count >= childHeight) {
      count = childHeight;
    }

    if (count <= 0) {
      count = 0;
    }

    wheelConfigRef.current.count = count;

    requestAnimationFrame(draw);
  }

  function handlePointerDown() {
    wheelConfigRef.current.drag = true;
  }

  function handlePointerMove(e) {
    if (wheelConfigRef.current.drag) {
      barRef.current.style.transition = "0s";

      const { myScrollHeight, childHeight } = wheelConfigRef.current;

      const { top } = barRef.current.parentNode.getBoundingClientRect();

      const pageTop = e.clientY - top - barHeight;

      const drag_scrollPoint = Math.max(
        Math.min(pageTop / myScrollHeight, 1),
        0
      );

      wheelConfigRef.current.count = drag_scrollPoint * childHeight;

      requestAnimationFrame(draw);
    }
  }

  function handlePointerUp() {
    if (wheelConfigRef.current.drag) {
      barRef.current.style.transition = ".1s";
    }
    wheelConfigRef.current.drag = false;
  }

  useEffect(() => {
    wheelConfigRef.current = {
      ...wheelConfigRef.current,
      myScrollHeight: myScrollRef.current.offsetHeight,
      childHeight: childRef.current.offsetHeight,
      barScrollPoint: barHeight / myScrollRef.current.offsetHeight,
    };

    document.body.addEventListener("pointermove", handlePointerMove);
    document.body.addEventListener("pointerup", handlePointerUp);

    return () => {
      document.body.removeEventListener("pointermove", handlePointerMove);
      document.body.removeEventListener("pointerup", handlePointerUp);
    };
  }, [reload]);

  return (
    <div
      className={style.myScroll}
      ref={myScrollRef}
      style={{
        height,
      }}
      onWheel={handleWheel}
    >
      {clonedChildren}
      <div className={style.scrollBar}>
        <span
          ref={barRef}
          style={{
            "--scroll": 0,
            "--height": barHeight,
          }}
          onPointerDown={handlePointerDown}
        ></span>
      </div>
    </div>
  );
}

export default React.memo(Index);