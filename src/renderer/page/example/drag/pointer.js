export default function pointer({ element, target }) {
  const app = document.querySelectorAll(element);
  const targets = document.querySelectorAll(target);

  let defaultTop = 52 || 0;

  let pool = [];

  const targetInfo = [...targets].map((item) => {
    const { left, top, width, height } = item.getBoundingClientRect();

    return {
      _left: left,
      _top: top - defaultTop,
      _leftMax: left + width,
      _topMax: top + height - defaultTop,
    };
  });

  app.forEach((item) => {
    const { left, top } = item.getBoundingClientRect();
    pool.push({
      origin_left: left,
      origin_top: top - defaultTop,
    });
  });

  app.forEach((item, index) => {
    const { origin_left, origin_top } = pool[index];

    let isPointerDown = false;

    item.style.position = "absolute";
    item.style.left = origin_left + "px";
    item.style.top = origin_top + "px";

    item.addEventListener("pointerdown", function (e) {
      isPointerDown = true;
      item.style.transition = "0s";

      if (item.classList.contains("check")) {
        isPointerDown = false;

        item.style.transition = ".4s";
        item.style.left = origin_left + "px";
        item.style.top = origin_top + "px";

        function transitionEnd() {
          item.classList.remove("check");

          item.removeEventListener("transitionend", transitionEnd);
        }
        item.addEventListener("transitionend", transitionEnd);
      }
    });

    item.addEventListener("pointermove", function (e) {
      //捕获
      item.setPointerCapture(e.pointerId);

      if (isPointerDown) {
        let newLeft = e.clientX - origin_left;
        let newTop = e.clientY - origin_top;

        item.style.zIndex = 3;
        item.style.left = newLeft + origin_left - item.offsetWidth / 2 + "px";
        item.style.top =
          newTop + origin_top - item.offsetHeight / 2 - defaultTop + "px";
      }
    });

    item.addEventListener("pointerup", function () {
      isPointerDown = false;
      item.style.transition = ".4s";

      const { left, top, width, height } = item.getBoundingClientRect();

      const myLeft = left + width / 2;
      const myTop = top + height / 2 - defaultTop;

      try {
        targetInfo.forEach((element) => {
          const { _left, _top, _leftMax, _topMax } = element;
          if (
            myLeft > _left &&
            myLeft < _leftMax &&
            myTop > _top &&
            myTop < _topMax
          ) {
            app.forEach((checkItem, checkIndex) => {
              if (checkItem.classList.contains("check")) {
                const { left: checkItemLeft } =
                  checkItem.getBoundingClientRect();

                if (checkItemLeft === _left) {
                  const {
                    origin_left: check_origin_left,
                    origin_top: check_origin_top,
                  } = pool[checkIndex];

                  checkItem.style.left = check_origin_left + "px";
                  checkItem.style.top = check_origin_top + "px";

                  function transitionEnd() {
                    checkItem.classList.remove("check");

                    checkItem.removeEventListener(
                      "transitionend",
                      transitionEnd
                    );
                  }
                  checkItem.addEventListener("transitionend", transitionEnd);
                }
              }
            });

            item.classList.add("check");
            item.style.left = _left + "px";
            item.style.top = _top + "px";
            item.style.zIndex = 0;

            throw "结束循环";
          }
        });
      } catch {}

      if (!item.classList.contains("check")) {
        item.style.top = origin_top + "px";
        item.style.left = origin_left + "px";

        function transitionEnd() {
          item.style.zIndex = 0;

          item.removeEventListener("transitionend", transitionEnd);
        }
        item.addEventListener("transitionend", transitionEnd);
      }
    });
  });
}
