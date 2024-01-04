export default class Route {
  constructor({ root, type }) {
    this._ = (select) => {
      const result = document.querySelectorAll(select);
      return result.length > 1 ? result : result[0];
    };

    this.history = "history";

    this.element = this._(root);
    this.type = type;

    this.proxy();

    window.$query = (select, parent = ".enter") => {
      const enterNode =
        this.element.querySelector(parent) ||
        document.body.querySelector(parent);

      const result = enterNode.querySelectorAll(select);

      return result.length > 1 ? result : result[0];
    };

    this.pool = [];
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
      },
    });

    console.log(this);
  }

  init() {
    this.route();
    this.elementEvent();

    this.type === this.history
      ? window.addEventListener("popstate", this.route.bind(this))
      : window.addEventListener("hashchange", this.route.bind(this));
  }

  routeGo(pathName, param = {}) {
    if (this.prev_key === pathName) return;

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

    let name =
      this.type === this.history
        ? pathName === "/"
          ? defaultKey
          : pathName.replace("/", "")
        : hashName == "/" || hashName == ""
        ? defaultKey
        : hashName;

    let components = this.routerMap[name];

    this.pool.push(name);

    // 404
    if (!components) {
      components = this.page404();
    }

    const index = this.key_list.findIndex((item) => name === item);
    const prev_index = this.key_list.findIndex(
      (item) => this.prev_key === item
    );
    this.value_list[index].classList.add("active");
    if (this.prev_element) {
      this.prev_element.classList.remove("active");
    }
    this.prev_element = this.value_list[index];
    this.prev_key = name;

    // 展示界

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
    }, 3000);

    this.routeCallBack(name);
  }

  elementEvent() {
    this.body = this._("body");

    const _event = (e) => {
      let target = e.target;

      while (target != this.body) {
        if (!target.parentNode) return;

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

  routeCallBack() {}
}
