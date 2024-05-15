import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
class ScrollpageActive {
  constructor({
    title,
    page: page2
  }) {
    this.title = [...document.querySelectorAll("." + title)].filter((item) => item.getAttribute("id"));
    this.page = document.querySelectorAll("." + page2);
    this.config = {
      rootMargin: "0px",
      threshold: 0.2
    };
    this.observer();
    document.querySelector("." + title).parentNode.addEventListener("click", (e) => {
      let target = e.target;
      while (target != document.body) {
        if (!target.parentNode)
          return;
        if (target.classList.contains(title)) {
          let index = target.getAttribute("id");
          if (!index) {
            index = target.children[1].getAttribute("id");
          }
          this.page[index].scrollIntoView({
            behavior: "smooth"
          });
          break;
        }
        target = target.parentNode;
      }
    });
  }
  setClass(key) {
    this.title.forEach((el) => {
      el.classList.remove("active");
    });
    this.title[key].classList.add("active");
  }
  observer() {
    let result = [];
    this.ob = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          result.push(entry.target);
        } else {
          result = result.filter((item2) => item2 !== entry.target);
        }
      });
      const item = result[0];
      const key = item.getAttribute("id");
      this.setClass(key);
    }, this.config);
    this.page.forEach((el) => {
      this.ob.observe(el);
    });
  }
}
const pageFixed = "_pageFixed_13q06_1";
const navItem = "_navItem_13q06_14";
const head = "_head_13q06_20";
const page = "_page_13q06_1";
const pageItem = "_pageItem_13q06_32";
const style = {
  pageFixed,
  navItem,
  head,
  page,
  pageItem
};
const data = {
  第一章: {
    第一章一: 1.1,
    第一章二: 1.2
  },
  第二章: 2,
  第三章: 3,
  第四章: 4,
  第五章: {
    第五章一: 5.1,
    第五章二: 5.2,
    第五章三: 5.3,
    第五章四: {
      第五章四一: 5.41,
      第五章四二: 5.42
    }
  },
  第六章: 6,
  第七章: 7
};
function Index() {
  function renderPageFixed(defaultData) {
    let num = -1;
    function deep(list, index, result = "") {
      Object.entries(list).forEach(([key, value]) => {
        result += `<div class="${style.navItem}" id="${Object.prototype.toString.call(value) === "[object Object]" ? "" : num += 1}" style="margin-left: ${index * 10}px">
              <div class="${style.head}">${key}</div>
              ${Object.prototype.toString.call(value) === "[object Object]" ? `${deep(value, index + 1)}` : ""}
            </div>`;
      });
      return result;
    }
    return deep(defaultData, 0);
  }
  function renderPage(defaultData, result = []) {
    function deep(list) {
      Object.values(list).forEach((item) => {
        if (Object.prototype.toString.call(item) === "[object Object]") {
          deep(item);
        } else {
          result.push(item);
        }
      });
    }
    deep(defaultData);
    return result.map((item, index) => /* @__PURE__ */ React.createElement("div", {
      className: style.pageItem,
      key: item,
      id: index
    }, item));
  }
  reactExports.useEffect(() => {
    new ScrollpageActive({
      title: style.navItem,
      page: style.pageItem
    });
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: style.page
  }, renderPage(data)), /* @__PURE__ */ React.createElement("div", {
    className: style.pageFixed,
    dangerouslySetInnerHTML: {
      __html: renderPageFixed(data)
    }
  }));
}
export {
  Index as default
};
