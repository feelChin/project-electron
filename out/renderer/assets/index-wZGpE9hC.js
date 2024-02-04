import { r as reactExports, R as React } from "./index-n8_yRRwO.js";
import { R as Row, a as Radio } from "./row-0EWaLWEO.js";
import "./pickAttrs-4HLBMSpu.js";
class Route {
  constructor({
    root,
    type
  }) {
    this._ = (select) => {
      const result = document.querySelectorAll(select);
      return result.length > 1 ? result : result[0];
    };
    this.history = "history";
    this.element = this._(root);
    this.type = type;
    this.proxy();
    window.$query = (select, parent = ".enter") => {
      const enterNode = this.element.querySelector(parent) || document.body.querySelector(parent);
      const result = enterNode.querySelectorAll(select);
      return result.length > 1 ? result : result[0];
    };
    this.pool = [];
    this.poolRoute = {};
  }
  proxy() {
    let proxy = "";
    Object.defineProperty(this, "routerMap", {
      set: (v) => {
        proxy = v;
        this.key_list = Object.keys(v);
        const linkPath = this._("[link]");
        this.value_list = this.key_list.map((item) => {
          let result;
          try {
            linkPath.forEach((el, index) => {
              if (el.getAttribute("link") === item) {
                result = el;
                linkPath.splice(index, 1);
              }
            });
          } catch {
            return result;
          }
        });
        this.init();
      },
      get: () => {
        return proxy;
      }
    });
  }
  init() {
    this.route();
    this.elementEvent();
    this.type === this.history ? window.addEventListener("popstate", this.route.bind(this)) : window.addEventListener("hashchange", this.route.bind(this));
  }
  routeGo(pathName, param = {}) {
    if (this.prev_key === pathName)
      return;
    if (this.type === this.history) {
      window.history.pushState(null, `page ${pathName}`, pathName);
      this.route();
    } else {
      window.location.href = "#" + pathName;
    }
    this.param = param;
  }
  route() {
    const pathName = window.location.pathname;
    const hashName = window.location.hash.substr(1);
    const defaultKey = Object.keys(this.routerMap)[0];
    let name = this.type === this.history ? pathName === "/" ? defaultKey : pathName.replace("/", "") : hashName == "/" || hashName == "" ? defaultKey : hashName;
    if (!this.poolRoute[name]) {
      this.poolRoute[name] = this.routerMap[name]();
    }
    let components = this.poolRoute[name] || this.page404();
    this.pool.push(name);
    if (this.pool.length > 3) {
      this.pool.shift();
    }
    if (!components) {
      components = this.page404();
    }
    const index = this.key_list.findIndex((item) => name === item);
    const prev_index = this.key_list.findIndex((item) => this.prev_key === item);
    this.value_list[index].classList.add("active");
    if (this.prev_element) {
      this.prev_element.classList.remove("active");
    }
    this.prev_element = this.value_list[index];
    this.prev_key = name;
    this.element.style.setProperty("--level", prev_index > index ? -1 : 1);
    let leave_div;
    let enter_div;
    clearTimeout(this.timer);
    if (this.element.children[0]) {
      if (this.element.children.length > 1) {
        leave_div = this.element.children[1];
        this.element.removeChild(this.element.children[0]);
      } else {
        leave_div = this.element.children[0];
      }
    } else {
      leave_div = document.createElement("div");
      leave_div.innerHTML = "";
    }
    enter_div = document.createElement("div");
    enter_div.className = "enter";
    leave_div.className = "leave";
    enter_div.innerHTML = components;
    if (this.pool.length <= 1) {
      enter_div.className = "enter init";
    }
    if (!this.element.children[0]) {
      this.element.appendChild(leave_div);
    }
    this.element.appendChild(enter_div);
    this.timer = setTimeout(() => {
      this.element.removeChild(leave_div);
    }, 3e3);
    this.routeCallBack(name);
  }
  elementEvent() {
    this.body = this._("body");
    const _event = (e) => {
      let target = e.target;
      while (target != this.body) {
        if (!target.parentNode)
          return;
        const entrust = target.getAttribute("entrust");
        const link = target.getAttribute("link");
        if (entrust && entrust === "route" && link) {
          this.routeGo(link);
          break;
        }
        target = target.parentNode;
      }
    };
    this.body.addEventListener("click", _event);
  }
  page404() {
    return `<div class="element">
        404
    </div>`;
  }
  routeCallBack() {
  }
}
const wrapper = "_wrapper_1qeoz_1";
const render = "_render_1qeoz_11";
const enter = "_enter_1qeoz_42";
const leave = "_leave_1qeoz_45";
const style = {
  wrapper,
  render,
  enter,
  leave
};
class MyPageEffect extends Route {
  constructor(param) {
    super(param);
    this.routerMap = {
      home: this.homePage,
      learn: this.learnPage,
      list: this.listPage,
      me: this.minePage
    };
  }
  homePage() {
    return `<div class="element element1">
        这是首页
    </div>`;
  }
  learnPage() {
    return `<div class="element element2">
        这是学习
    </div>`;
  }
  listPage() {
    return `<div class="element element3">
        这是列表
    </div>`;
  }
  minePage() {
    return `<div class="element element4">
        这是我
    </div>`;
  }
}
function Index() {
  const app = reactExports.useRef(null);
  const [state, setState] = reactExports.useState(1);
  reactExports.useEffect(() => {
    app.current = new MyPageEffect({
      root: "." + style.render,
      type: !state || "history"
    });
  }, [state]);
  return /* @__PURE__ */ React.createElement("section", {
    className: style.wrapper
  }, /* @__PURE__ */ React.createElement(Row, null, "方向：", /* @__PURE__ */ React.createElement(Radio.Group, {
    onChange: (e) => {
      setState(e.target.value);
    },
    defaultValue: state
  }, /* @__PURE__ */ React.createElement(Radio, {
    value: 0,
    disabled: true
  }, "哈希路由"), /* @__PURE__ */ React.createElement(Radio, {
    value: 1
  }, "history路由"))), /* @__PURE__ */ React.createElement("div", {
    style: {
      height: 30
    }
  }), /* @__PURE__ */ React.createElement("p", null, "全局是哈希路由 内部更改哈希会改变全局"), /* @__PURE__ */ React.createElement("div", {
    style: {
      height: 30
    }
  }), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      app.current.routeGo("list");
    }
  }, "跳转到 列表"), /* @__PURE__ */ React.createElement("div", {
    style: {
      height: 30
    }
  }), /* @__PURE__ */ React.createElement("nav", null, /* @__PURE__ */ React.createElement("div", {
    entrust: "route",
    link: "home"
  }, "首页"), /* @__PURE__ */ React.createElement("div", {
    entrust: "route",
    link: "learn"
  }, "学习"), /* @__PURE__ */ React.createElement("div", {
    entrust: "route",
    link: "list"
  }, "列表"), /* @__PURE__ */ React.createElement("div", {
    entrust: "route",
    link: "me"
  }, "我")), /* @__PURE__ */ React.createElement("div", {
    className: style.render
  }));
}
export {
  Index as default
};
