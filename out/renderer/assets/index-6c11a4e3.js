import { r as reactExports, R as React } from "./index-861f41a7.js";
function cursorDot(element, easingnum) {
  let diameter = 50, borderWidth = 1, borderColor = "#E62129", easing = easingnum, background = "transparent", index = 999, inited = false, alt = {
    x: 0,
    y: 0,
    o: 1,
    d: diameter
  }, cur = {
    x: 0,
    y: 0,
    o: 0,
    d: diameter
  }, dot = document.createElement("div"), tim = easing / 10;
  dot.className = "cursordot";
  dot.style.width = diameter + "px";
  dot.style.height = diameter + "px";
  dot.style.background = background;
  dot.style.borderWidth = borderWidth + "px";
  dot.style.borderColor = borderColor;
  dot.style.zIndex = index;
  dot.style.transition = tim;
  element[0].parentNode.addEventListener("mousemove", function(e) {
    alt.x = e.clientX;
    alt.y = e.clientY;
    dot.style.opacity = 0;
    if (!inited) {
      document.body.appendChild(dot);
      cur.x = alt.x;
      cur.y = alt.y;
      inited = true;
      draw();
    }
  });
  const draw = function() {
    let dX = alt.x - cur.x;
    let dY = alt.y - cur.y;
    cur.x += dX / easing;
    cur.y += dY / easing;
    let t3d = "translate3d(" + (cur.x - cur.d / 2) + "px," + (cur.y - cur.d / 2) + "px,0)";
    dot.style.webkitTransform = t3d;
    dot.style.transform = t3d;
    const dO = alt.o - cur.o;
    cur.o += dO / easing;
    dot.style.opacity = cur.o;
    const dD = alt.d - cur.d;
    cur.d += dD / easing;
    dot.style.height = cur.d + "px";
    dot.style.width = cur.d + "px";
    try {
      requestAnimationFrame(draw);
    } catch (_) {
      setImmediate(draw);
    }
  };
  element.forEach((el) => {
    el.addEventListener("mouseover", function() {
      alt.d = diameter * 1.3;
    });
    el.addEventListener("mouseout", function() {
      alt.d = diameter;
    });
  });
}
const wrapper = "_wrapper_mxcif_1";
const item = "_item_mxcif_9";
const style = {
  wrapper,
  item
};
function Index() {
  reactExports.useEffect(() => {
    cursorDot(document.querySelectorAll("." + style.item), 4);
    return () => {
      const element = document.querySelector(".cursordot");
      if (element)
        document.body.removeChild(element);
    };
  }, []);
  return /* @__PURE__ */ React.createElement("section", {
    className: style.wrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }));
}
export {
  Index as default
};
