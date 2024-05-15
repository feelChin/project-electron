import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
const MyScroll = class MyCustomScroll {
  constructor({
    element,
    barHeight = 20,
    onScroll = () => {
    },
    beforeUpdate = () => {
    },
    showbar = true,
    showbarDelay = 2e3,
    speed = 1
  }) {
    this.root = document.querySelector(element);
    this.barHeight = barHeight;
    this.showbar = showbar;
    this.showbarDelay = showbarDelay;
    this.onScroll = (value) => {
      onScroll(value);
    };
    this.beforeUpdate = (value) => {
      beforeUpdate(value);
    };
    this.wheelConfig = {
      speed,
      //滚动速度
      count: 0,
      // 滚动距离
      myScrollHeight: this.root.parentNode.offsetHeight,
      // 容器高度
      childHeight: this.root.offsetHeight,
      // children容器高度
      barScrollPoint: 100 - barHeight / this.root.parentNode.offsetHeight * 100,
      drag: false,
      // 是否拖拽
      showbarTimer: null
    };
    this.createCssText();
    this.createBarElement();
    requestAnimationFrame(this.draw.bind(this));
  }
  update() {
    this.wheelConfig = {
      ...this.wheelConfig,
      myScrollHeight: this.root.parentNode.offsetHeight,
      childHeight: this.root.offsetHeight,
      barScrollPoint: 100 - this.barHeight / this.root.parentNode.offsetHeight * 100
    };
    requestAnimationFrame(this.draw.bind(this));
  }
  createBarElement() {
    const section = document.createElement("section");
    section.className = "scrollBar";
    const span = document.createElement("span");
    section.appendChild(span);
    this.root.classList.add("myScroll");
    this.root.parentNode.appendChild(section);
    this.el = section;
    this.el_bar = span;
    this.root.addEventListener("pointerdown", this.disableOnPointerDown.bind(this));
    this.root.addEventListener("wheel", this.handleWheel.bind(this));
    this.el.addEventListener("pointerdown", this.handlePointerDown.bind(this));
    document.body.addEventListener("pointermove", this.handlePointerMove.bind(this));
    document.body.addEventListener("pointerup", this.handlePointerUp.bind(this));
  }
  createCssText() {
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
    .myScroll{
        position: relative;
        overflow: hidden;
        transition: 0.1s;
        transition-timing-function: ease-in-out;
    }
    
    .scrollBar{
        position: absolute;
        right: 5px;
        top: 50%;
        transform: translateY(-50%);
        width: 6px;
        height: 100%;
    }

    .scrollBar.none{
       opacity:0
    }

    .scrollBar span{
        position: absolute;
        top: calc(var(--scroll) * 1%);
        height: ${this.barHeight}px;
        width: 100%;
        border-radius: 6px;
        background: black;
        transition: .4s;
    }

    .scrollBar span.none{
        opacity:0
    }
    
    `;
    document.head.appendChild(styleSheet);
  }
  async draw() {
    const {
      count,
      myScrollHeight,
      childHeight,
      barScrollPoint
    } = this.wheelConfig;
    if (childHeight < myScrollHeight) {
      !this.el.classList.contains("none") && this.el.classList.add("none");
    } else {
      this.el.classList.contains("none") && this.el.classList.remove("none");
    }
    const threshold = myScrollHeight * (count / childHeight);
    const result_point = Math.max(count / childHeight * barScrollPoint, 0);
    const result_scroll = Math.max(count - threshold, 0);
    const result = {
      scrollTop: result_scroll,
      count,
      point: result_point,
      progress: count / childHeight * 100
    };
    this.beforeUpdate && await new Promise((resolve) => {
      this.beforeUpdate(result);
      resolve();
    });
    this.onScroll && this.onScroll(result);
    this.el.style.setProperty("--scroll", result_point);
    this.root.style.transform = `translate3d(0,-${result_scroll}px,0)`;
    if (!this.showbar) {
      if (this.wheelConfig.showbarTimer) {
        clearTimeout(this.wheelConfig.showbarTimer);
      }
      if (this.el_bar.classList.contains("none")) {
        this.el_bar.classList.remove("none");
      }
      this.wheelConfig.showbarTimer = setTimeout(() => {
        this.el_bar.classList.add("none");
      }, this.showbarDelay);
    }
  }
  handleWheel(e) {
    let {
      count,
      childHeight,
      speed
    } = this.wheelConfig;
    if (this.root.classList.contains("none"))
      return;
    count += e.deltaY * speed;
    if (count >= childHeight) {
      count = childHeight;
    }
    if (count <= 0) {
      count = 0;
    }
    this.wheelConfig.count = count;
    requestAnimationFrame(this.draw.bind(this));
    e.preventDefault();
  }
  handlePointerDown(e) {
    this.wheelConfig.drag = true;
    this.root.style.userSelect = "none";
    const {
      count,
      childHeight
    } = this.wheelConfig;
    this.startPoint = e.clientY;
    this.startPointScroll = count / childHeight;
  }
  handlePointerMove(e) {
    if (this.wheelConfig.drag) {
      this.el_bar.style.transition = "0s";
      const {
        myScrollHeight,
        barScrollPoint,
        childHeight
      } = this.wheelConfig;
      const allScroll = barScrollPoint * myScrollHeight / 100;
      const point = (e.clientY - this.startPoint) / allScroll + this.startPointScroll;
      this.wheelConfig.count = Math.min(Math.max(point, 0), 1) * childHeight;
      requestAnimationFrame(this.draw.bind(this));
    }
  }
  handlePointerUp() {
    if (this.wheelConfig.drag) {
      this.el_bar.style.transition = ".1s";
      this.root.style.userSelect = "auto";
      this.wheelConfig.drag = false;
    }
  }
  disableOnPointerDown(e) {
    if (e.button === 1) {
      e.preventDefault();
    }
  }
};
class MyVirtualList {
  constructor({
    element,
    result = [],
    height = 50,
    barHeight,
    handScroll = () => {
    },
    showbar,
    showbarDelay,
    render = () => {
    }
  }) {
    this.root = document.querySelector(element);
    this.result = result;
    this.height = height;
    this.barHeight = barHeight;
    this.showbar = showbar;
    this.showbarDelay = showbarDelay;
    this.config = {
      top: result.map((_, index) => {
        return index * height;
      }),
      total_row: result.length,
      total_height: result.length * height
    };
    this.render = (value) => render(value);
    const debounceScroll = this.debounce(handScroll);
    this.handScroll = (value) => {
      debounceScroll(value);
    };
    this.filterResult = {};
    this.createCssText();
    this.createBarElement();
    this.renderList(0, this.getEndIndex(0));
  }
  update(arr, isReload = false) {
    this.result = [...arr];
    this.config = {
      top: arr.map((_, index) => {
        return index * this.height;
      }),
      total_row: arr.length,
      total_height: arr.length * this.height
    };
    this.el_div.style.height = this.config.total_height + "px";
    this.myCustomScroll.update();
    if (isReload) {
      this.renderList(0, this.getEndIndex(0));
    }
  }
  // 防抖函数
  debounce(fn, delay = 300, immediate = false, props) {
    let timer = null;
    let myDebounce = function() {
      const args = [...arguments, props];
      timer && clearTimeout(timer);
      if (immediate) {
        !timer && fn.apply(this, args);
        timer = setTimeout(() => {
          timer = null;
        }, delay);
      } else {
        timer = setTimeout(() => {
          fn.apply(this, args);
        }, delay);
      }
    };
    myDebounce.cancel = () => {
      clearTimeout(timer);
      timer = null;
    };
    return myDebounce;
  }
  createBarElement() {
    const section = document.createElement("section");
    section.className = "virtual";
    const div = document.createElement("div");
    div.style.height = this.config.total_height + "px";
    const virtualList = document.createElement("div");
    virtualList.className = "virtualList";
    div.appendChild(virtualList);
    section.appendChild(div);
    this.root.appendChild(section);
    this.el = virtualList;
    this.el_div = div;
    this.myCustomScroll = new MyScroll({
      element: ".virtual",
      barHeight: this.barHeight,
      showbar: this.showbar,
      showbarDelay: this.showbarDelay,
      beforeUpdate: (v) => {
        const {
          scrollTop
        } = v;
        if (this.prevScrollTop === scrollTop)
          return;
        const startIndex = Math.max(Math.floor(scrollTop / this.height) - 2, 0);
        this.renderList(startIndex, this.getEndIndex(startIndex));
        this.prevScrollTop = scrollTop;
        this.handScroll(v);
      }
    });
  }
  createCssText() {
    const styleSheet = document.createElement("style");
    styleSheet.innerHTML = `
    .virtual{
        position: relative;
        overflow: hidden;
    }
    
    .virtualList{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .virtualList .item{
        position: absolute;
        width: 100%;
    }
    `;
    document.head.appendChild(styleSheet);
  }
  renderItem(html = "") {
    this.filterResult.list?.forEach((item, index) => {
      html += `<div
          id="${index}"
          class="item"
          style="
            height:${this.height}px;
            top: ${this.filterResult.top[index]}px"
        >
          ${this.render(item)}
        </div>`;
    });
    this.el.innerHTML = html;
  }
  renderList(start, end) {
    this.filterResult = {
      list: this.result.slice(start, end),
      top: this.config.top.slice(start, end)
    };
    this.renderItem();
  }
  getEndIndex(start) {
    const {
      total_row
    } = this.config;
    const viewCount = Math.ceil(this.root.offsetHeight / this.height);
    return Math.min(start + viewCount + 4, total_row);
  }
}
const box = "_box_1wwa3_1";
const wrapper = "_wrapper_1wwa3_8";
const virtualLoop = "_virtualLoop_1wwa3_14";
const style = {
  box,
  wrapper,
  virtualLoop
};
function Index() {
  reactExports.useEffect(() => {
    new MyVirtualList({
      element: "." + style.virtualLoop,
      result: Array.from({
        length: 1e5
      }, (_, index) => {
        return {
          name: index + 1
        };
      }),
      barHeight: 80,
      showbar: false,
      render: (value) => {
        const {
          name
        } = value;
        return `<div>${name}</div>`;
      },
      handScroll: ({
        progress
      }) => {
      }
    });
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.wrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.virtualLoop
  })));
}
export {
  Index as default
};
