import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
class Clip {
  constructor({
    el,
    url: url2,
    watch = () => {
    }
  }) {
    this.app = document.querySelector(el);
    this.url = url2;
    this.cb = watch;
    this.locationConfig = {
      "top,left": {
        key: 1,
        info: "左上",
        transform: [-1, -1]
      },
      "top,right": {
        key: 2,
        info: "右上",
        transform: [1, -1]
      },
      "bottom,left": {
        key: 3,
        info: "左下",
        transform: [-1, 1]
      },
      "bottom,right": {
        key: 4,
        info: "右下",
        transform: [1, 1]
      }
    };
    this.render();
  }
  // 渲染
  render() {
    if (window.CLIPRENDERFLAG) {
      window.CLIPRENDERFLAG.kill();
    }
    window.CLIPRENDERFLAG = this;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    const image = new Image();
    image.src = this.url;
    this.app.appendChild(image);
    image.onload = () => {
      try {
        const {
          width,
          height
        } = getComputedStyle(image);
        this.app_w = parseFloat(width).toFixed(2) / 1;
        this.app_h = parseFloat(height).toFixed(2) / 1;
        this.canvas.width = this.app_w;
        this.canvas.height = this.app_h;
        this.app.appendChild(this.canvas);
        this.ctx.drawImage(image, 0, 0, this.app_w, this.app_h);
        this.init();
      } catch (err) {
        console.log(err);
      }
    };
  }
  // 初始化事件
  init() {
    this.mouseStartFn = this.mouseStart.bind(this);
    this.mouseMoveFn = this.mouseMove.bind(this);
    this.mouseEndFn = this.mouseEnd.bind(this);
    this.mouseLeaveFn = this.mouseLeave.bind(this);
    this.frameMouseStartFn = this.frame_mouseStart.bind(this);
    this.frameMouseMoveFn = this.frame_mouseMove.bind(this);
    this.frameMouseEndFn = this.frame_mouseEnd.bind(this);
    this.app.addEventListener("mousedown", this.mouseStartFn);
    this.app.addEventListener("mousemove", this.mouseMoveFn);
    this.app.addEventListener("mouseup", this.mouseEndFn);
    this.app.addEventListener("mouseleave", this.mouseLeaveFn);
  }
  // 创建裁剪范围
  createElement() {
    if (this.frame)
      return;
    const section = document.createElement("section");
    section.className = "frame";
    section.innerHTML = this.renderPoint();
    this.frame = section;
    this.app.appendChild(section);
    this.point = [...this.app.querySelectorAll(".point")];
    this.point.forEach((item) => {
      item.addEventListener("mousedown", this.point_mouseStart.bind(this));
      item.addEventListener("mouseup", this.point_mouseEnd.bind(this));
    });
  }
  //小点 鼠标点击
  point_mouseStart(e) {
    const target = e.target;
    const key = target.getAttribute("key") / 1;
    const {
      width,
      height
    } = getComputedStyle(target.parentNode);
    let {
      x,
      y
    } = this.offset;
    const add_x = x + parseFloat(width);
    const add_y = y + parseFloat(height);
    if (key === 1) {
      x = add_x;
      y = add_y;
    }
    if (key === 2) {
      y = add_y;
    }
    if (key === 3) {
      x = add_x;
    }
    this.lock = true;
    this.offset = {
      x,
      y
    };
    this.frame.classList.contains("active") && this.frame.classList.remove("active");
    this.app.addEventListener("mousemove", this.mouseMoveFn);
  }
  //小点 离开鼠标
  point_mouseEnd() {
    this.lock = false;
    this.app.removeEventListener("mousemove", this.mouseMoveFn);
    this.onWatch();
  }
  // 鼠标开始点击
  mouseStart(e) {
    this.lock = true;
    const {
      offsetX,
      offsetY
    } = e;
    this.offset = {
      x: offsetX,
      y: offsetY
    };
  }
  // 移动鼠标
  mouseMove(e) {
    if (e.target.className.indexOf("app") === -1)
      return;
    if (this.lock) {
      this.createElement();
      const {
        x,
        y
      } = this.offset;
      const {
        app_w,
        app_h
      } = this;
      const {
        offsetX,
        offsetY
      } = e;
      const {
        position,
        str,
        key
      } = this.judgePostion(this.offset, e);
      if (this.prev_position !== str) {
        position.forEach((item) => {
          switch (item) {
            case "left":
              this.frame.style.left = "auto";
              this.frame.style.right = app_w - x + "px";
              break;
            case "right":
              this.frame.style.left = x + "px";
              break;
            case "top":
              this.frame.style.top = "auto";
              this.frame.style.bottom = app_h - y + "px";
              break;
            case "bottom":
              this.frame.style.top = y + "px";
              break;
          }
        });
        this.prev_position = str;
      }
      const w = Math.abs(offsetX - x);
      const h = Math.abs(offsetY - y);
      const diagonal = Math.sqrt(Math.pow(w, 2) + Math.pow(h, 2));
      const angleInDegrees = Math.atan(h / w) * (180 / Math.PI);
      cancelAnimationFrame(this.rafId);
      this.rafId = requestAnimationFrame(() => {
        this.frame.style.width = w + "px";
        this.frame.style.height = h + "px";
        if (!this.edit) {
          this.app.style.setProperty("--line_width", diagonal.toFixed(2) + "px");
          this.app.style.setProperty("--line_deg", angleInDegrees.toFixed(2) * ([1, 4].includes(key) ? 1 : -1) + "deg");
          this.app.style.setProperty("--line_top", [1, 4].includes(key) ? 0 : "100%");
          this.judgePointShow(key);
        }
      });
    }
  }
  // 离开鼠标
  mouseEnd() {
    if (this.lock) {
      this.lock = false;
      console.log(this);
      if (!this.point)
        return;
      this.edit = true;
      this.point.forEach((item) => {
        item.classList.add("active");
        item.style.display = "block";
      });
      this.app.classList.add("active");
      this.onWatch();
      this.app.removeEventListener("mousedown", this.mouseStartFn);
      this.app.removeEventListener("mousemove", this.mouseMoveFn);
      this.app.removeEventListener("mouseup", this.mouseEndFn);
      this.frame.addEventListener("mousedown", this.frameMouseStartFn);
    }
  }
  // 离开边界
  mouseLeave() {
    if (this.lock) {
      this.mouseEnd();
    }
  }
  // 框点击事件
  frame_mouseStart(e) {
    console.log(e);
    if (e.target.className.indexOf("frame") === -1)
      return;
    this.frameLock = true;
    const {
      offsetTop,
      offsetLeft
    } = this.frame;
    const {
      offsetX,
      offsetY
    } = e;
    this.frame.style.left = offsetLeft + "px";
    this.frame.style.top = offsetTop + "px";
    this.frameOffset = {
      x: offsetX + offsetLeft,
      y: offsetY + offsetTop,
      offsetLeft,
      offsetTop
    };
    this.point.forEach((item) => {
      item.classList.add("none");
    });
    this.frame.classList.remove("active");
    this.app.addEventListener("mousemove", this.frameMouseMoveFn);
    this.app.addEventListener("mouseup", this.frameMouseEndFn);
    this.app.addEventListener("mouseleave", this.frameMouseEndFn);
  }
  // 框鼠标移动
  frame_mouseMove(e) {
    if (this.frameLock) {
      const {
        offsetX,
        offsetY
      } = e;
      const {
        app_w,
        app_h
      } = this;
      const {
        w: frame_w,
        h: frame_h
      } = this.offset;
      const {
        x,
        y,
        offsetLeft,
        offsetTop
      } = this.frameOffset;
      const diff_x = Math.abs(offsetX - x);
      const diff_y = Math.abs(offsetY - y);
      let move_x, move_y = 0;
      const diff_w = Math.ceil(app_w - frame_w);
      const diff_h = Math.ceil(app_h - frame_h);
      const {
        position
      } = this.judgePostion(this.frameOffset, e);
      position.forEach((item) => {
        switch (item) {
          case "left":
            move_x = offsetLeft - diff_x;
            break;
          case "right":
            move_x = offsetLeft + diff_x;
            break;
          case "top":
            move_y = offsetTop - diff_y;
            break;
          case "bottom":
            move_y = offsetTop + diff_y;
            break;
        }
      });
      const end_x = move_x >= diff_w ? diff_w : move_x <= 0 ? 0 : move_x;
      const end_y = move_y >= diff_h ? diff_h : move_y <= 0 ? 0 : move_y;
      cancelAnimationFrame(this.rafId);
      this.rafId = requestAnimationFrame(() => {
        this.frame.style.left = end_x + "px";
        this.frame.style.top = end_y + "px";
      });
    }
  }
  // 框鼠标取消
  frame_mouseEnd() {
    if (this.frameLock) {
      this.frameLock = false;
      this.point.forEach((item) => {
        item.classList.remove("none");
      });
      this.app.removeEventListener("mousemove", this.frameMouseMoveFn);
      this.app.removeEventListener("mouseup", this.frameMouseEndFn);
      this.app.removeEventListener("mouseleave", this.frameMouseEndFn);
      this.onWatch();
    }
  }
  // 渲染小点
  renderPoint(result2 = "") {
    Object.keys(this.locationConfig).forEach((item) => {
      const [pos_x, pos_y] = item.split(",");
      const {
        key,
        transform
      } = this.locationConfig[item];
      const [trs_x, trs_y] = transform;
      result2 += `<div class="point" key="${key}" style="${pos_x}:0;${pos_y}:0;transform:translate(calc(${trs_x} * var(--point) / 2), calc(${trs_y} * var(--point) / 2))"></div>`;
    });
    return result2;
  }
  // 判断裁剪方向
  judgePostion(originOffset, nowOffset, result2 = []) {
    const {
      x,
      y
    } = originOffset;
    const {
      offsetX,
      offsetY
    } = nowOffset;
    result2[0] = offsetY > y ? "bottom" : "top";
    result2[1] = offsetX > x ? "right" : "left";
    const str = result2.join(",");
    const {
      info,
      key
    } = this.locationConfig[str];
    return {
      position: result2,
      str,
      info,
      key
    };
  }
  // 根据方向 判断小点显示
  judgePointShow(key) {
    let defaultKey = [2, 3].includes(key) ? [2, 3] : [1, 4];
    this.point.forEach((item) => {
      const index = item.getAttribute("key");
      item.style.display = defaultKey.includes(index / 1) ? "block" : "none";
    });
  }
  //base64图片转 blob对象
  base64ToBlob(base64) {
    const MIMEAndCode = base64.split(";base64,");
    const contentType = MIMEAndCode[0].split(":")[1];
    const rawCode = window.atob(MIMEAndCode[1]);
    const rawCodeLength = rawCode.length;
    const uInt8Array = new Uint8Array(rawCodeLength);
    for (let i = 0; i < rawCodeLength; i++) {
      uInt8Array[i] = rawCode.charCodeAt(i);
    }
    const blob = new Blob([uInt8Array], {
      type: contentType
    });
    return URL.createObjectURL(blob);
  }
  // 监听回调
  onWatch() {
    this.prev_position = null;
    const {
      offsetTop,
      offsetLeft
    } = this.frame;
    const {
      width,
      height
    } = getComputedStyle(this.frame);
    this.frame.classList.add("active");
    const w = parseFloat(width).toFixed(2) / 1;
    const h = parseFloat(height).toFixed(2) / 1;
    const imageData = this.ctx.getImageData(offsetLeft, offsetTop, w, h);
    if (!this.copyCanvas) {
      this.copyCanvas = document.createElement("canvas");
      this.copyCtx = this.copyCanvas.getContext("2d");
    }
    this.copyCanvas.width = w;
    this.copyCanvas.height = h;
    this.copyCtx.putImageData(imageData, 0, 0);
    this.offset = {
      w,
      h,
      x: offsetLeft,
      y: offsetTop
    };
    this.cb({
      ...this.offset,
      result: this.base64ToBlob(this.copyCanvas.toDataURL("image/jpeg"))
    });
  }
  //重置
  reset(run) {
    cancelAnimationFrame(this.rafId);
    this.app.removeEventListener("mousedown", this.mouseStartFn);
    this.app.removeEventListener("mousemove", this.mouseMoveFn);
    this.app.removeEventListener("mouseup", this.mouseEndFn);
    this.app.removeEventListener("mouseleave", this.mouseLeaveFn);
    this.frame.removeEventListener("mousedown", this.frameMouseStartFn);
    this.point?.forEach((item) => {
      item.removeEventListener("mousedown", this.point_mouseStart.bind(this));
      item.removeEventListener("mouseup", this.point_mouseEnd.bind(this));
      item.remove();
    });
    this.frame?.remove();
    this.frame = null;
    this.point = null;
    if (this.app.classList.contains("active")) {
      this.app.classList.remove("active");
    }
    this.offset = null;
    this.edit = null;
    this.lock = null;
    if (!run) {
      this.init();
    } else {
      this.canvas = null;
      this.app.innerHTML = "";
      window.CLIPRENDERFLAG = null;
    }
  }
  // 销毁 以防内存溢出
  kill() {
    this.reset(true);
  }
}
const flex = "_flex_1n4hz_1";
const app = "_app_1n4hz_11";
const result = "_result_1n4hz_87";
const wrapper = "_wrapper_1n4hz_98";
const style = {
  flex,
  app,
  result,
  wrapper
};
const url = "" + new URL("0-1h3APTNd.jpg", import.meta.url).href;
function Index() {
  const myClip = reactExports.useRef(null);
  const [theResult, setResult] = reactExports.useState({});
  reactExports.useEffect(() => {
    myClip.current = new Clip({
      el: "." + style.app,
      url,
      watch: (data) => {
        console.log(data);
        setResult({
          ...data
        });
      }
    });
  }, []);
  return /* @__PURE__ */ React.createElement("section", {
    className: style.flex
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.app
  }), /* @__PURE__ */ React.createElement("section", {
    className: style.result
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.wrapper
  }, /* @__PURE__ */ React.createElement("img", {
    src: theResult.result
  }), /* @__PURE__ */ React.createElement("p", null, "尺寸：", theResult.w, " x ", theResult.h)), /* @__PURE__ */ React.createElement("footer", null, /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      if (!theResult.result)
        return;
      let a = document.createElement("a");
      a.href = theResult.result;
      a.download = "裁剪的.png";
      a.click();
      a = null;
    }
  }, "保存"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      myClip.current.reset();
    }
  }, "重置"))));
}
export {
  Index as default
};
