import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
function pointer({
  element,
  target
}) {
  const app = document.querySelectorAll(element);
  const targets = document.querySelectorAll(target);
  let defaultTop = 52;
  let pool = [];
  const targetInfo = [...targets].map((item2) => {
    const {
      left,
      top,
      width,
      height
    } = item2.getBoundingClientRect();
    return {
      _left: left,
      _top: top - defaultTop,
      _leftMax: left + width,
      _topMax: top + height - defaultTop
    };
  });
  app.forEach((item2) => {
    const {
      left,
      top
    } = item2.getBoundingClientRect();
    pool.push({
      origin_left: left,
      origin_top: top - defaultTop
    });
  });
  app.forEach((item2, index) => {
    const {
      origin_left,
      origin_top
    } = pool[index];
    let isPointerDown = false;
    item2.style.position = "absolute";
    item2.style.left = origin_left + "px";
    item2.style.top = origin_top + "px";
    item2.addEventListener("pointerdown", function(e) {
      isPointerDown = true;
      item2.style.transition = "0s";
      if (item2.classList.contains("check")) {
        let transitionEnd = function() {
          item2.classList.remove("check");
          item2.removeEventListener("transitionend", transitionEnd);
        };
        isPointerDown = false;
        item2.style.transition = ".4s";
        item2.style.left = origin_left + "px";
        item2.style.top = origin_top + "px";
        item2.addEventListener("transitionend", transitionEnd);
      }
    });
    item2.addEventListener("pointermove", function(e) {
      item2.setPointerCapture(e.pointerId);
      if (isPointerDown) {
        let newLeft = e.clientX - origin_left;
        let newTop = e.clientY - origin_top;
        item2.style.zIndex = 3;
        item2.style.left = newLeft + origin_left - item2.offsetWidth / 2 + "px";
        item2.style.top = newTop + origin_top - item2.offsetHeight / 2 - defaultTop + "px";
      }
    });
    item2.addEventListener("pointerup", function() {
      isPointerDown = false;
      item2.style.transition = ".4s";
      const {
        left,
        top,
        width,
        height
      } = item2.getBoundingClientRect();
      const myLeft = left + width / 2;
      const myTop = top + height / 2 - defaultTop;
      try {
        targetInfo.forEach((element2) => {
          const {
            _left,
            _top,
            _leftMax,
            _topMax
          } = element2;
          if (myLeft > _left && myLeft < _leftMax && myTop > _top && myTop < _topMax) {
            app.forEach((checkItem, checkIndex) => {
              if (checkItem.classList.contains("check")) {
                const {
                  left: checkItemLeft
                } = checkItem.getBoundingClientRect();
                if (checkItemLeft === _left) {
                  let transitionEnd = function() {
                    checkItem.classList.remove("check");
                    checkItem.removeEventListener("transitionend", transitionEnd);
                  };
                  const {
                    origin_left: check_origin_left,
                    origin_top: check_origin_top
                  } = pool[checkIndex];
                  checkItem.style.left = check_origin_left + "px";
                  checkItem.style.top = check_origin_top + "px";
                  checkItem.addEventListener("transitionend", transitionEnd);
                }
              }
            });
            item2.classList.add("check");
            item2.style.left = _left + "px";
            item2.style.top = _top + "px";
            item2.style.zIndex = 0;
            throw "结束循环";
          }
        });
      } catch {
      }
      if (!item2.classList.contains("check")) {
        let transitionEnd = function() {
          item2.style.zIndex = 0;
          item2.removeEventListener("transitionend", transitionEnd);
        };
        item2.style.top = origin_top + "px";
        item2.style.left = origin_left + "px";
        item2.addEventListener("transitionend", transitionEnd);
      }
    });
  });
}
const box = "_box_1pq7o_1";
const textWrapper = "_textWrapper_1pq7o_9";
const item = "_item_1pq7o_14";
const list = "_list_1pq7o_21";
const style = {
  box,
  textWrapper,
  item,
  list
};
function Index() {
  reactExports.useEffect(() => {
    setTimeout(() => {
      pointer({
        target: `.${style.textWrapper} .${style.item}`,
        element: `.${style.list} .${style.item}`
      });
    }, 1e3);
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.textWrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  })), /* @__PURE__ */ React.createElement("div", {
    className: style.list
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "此"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "情"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "天"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "待"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "道"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "追"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "在"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "可"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "筹"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "琴")));
}
export {
  Index as default
};
