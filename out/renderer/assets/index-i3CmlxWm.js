import { r as reactExports, R as React } from "./index-n8_yRRwO.js";
import { C as CustonScrollTheme } from "./custonScrollTheme-hthOQE0i.js";
const virtual = "_virtual_102r5_1";
const virtualList = "_virtualList_102r5_10";
const item = "_item_102r5_17";
const style = {
  virtual,
  virtualList,
  item
};
function Index$1({
  result,
  height = 50,
  row: Row,
  handleScroll
}) {
  const virtualRef = reactExports.useRef(null);
  const config = reactExports.useRef({
    top: result.map((_, index) => {
      return index * height;
    }),
    total_row: result.length,
    total_height: result.length * height,
    init: true
  });
  const [filterResult, setFilterResult] = reactExports.useState({});
  const [reloadUpdate, setReloadUpdate] = reactExports.useState(0);
  function renderItem() {
    return filterResult.list?.map((item2, index) => /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: style.item,
      style: {
        height,
        top: filterResult.top[index]
      }
    }, /* @__PURE__ */ React.createElement(Row, item2)));
  }
  function renderList(start, end) {
    setFilterResult({
      list: result.slice(start, end),
      top: config.current.top.slice(start, end)
    });
  }
  function getEndIndex(start) {
    const {
      total_row
    } = config.current;
    const viewCount = Math.ceil(virtualRef.current.clientHeight / height);
    return Math.min(start + viewCount + 4, total_row);
  }
  reactExports.useEffect(() => {
    config.current.top = result.map((_, index) => {
      return index * height;
    });
    config.current.total_row = result.length;
    config.current.total_height = result.length * height;
    if (config.current.init) {
      renderList(0, getEndIndex(0));
      config.current.init = false;
    }
    setReloadUpdate((count) => count + 1);
  }, [result]);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.virtual,
    ref: virtualRef
  }, /* @__PURE__ */ React.createElement(CustonScrollTheme, {
    beforeUpdate: (e) => {
      const startIndex = Math.max(Math.floor(e.scrollTop / height) - 2, 0);
      renderList(startIndex, getEndIndex(startIndex));
      handleScroll(e);
    },
    animation: {
      transition: "0s"
    },
    barHeight: 100,
    showbar: false,
    reload: reloadUpdate
  }, /* @__PURE__ */ React.createElement("div", {
    style: {
      height: config.current.total_height
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.virtualList
  }, renderItem()))));
}
function Index() {
  function render({
    name
  }) {
    return /* @__PURE__ */ React.createElement("div", null, "第", name, "条");
  }
  return /* @__PURE__ */ React.createElement(Index$1, {
    height: 50,
    result: Array.from({
      length: 1e5
    }, (_, index) => {
      return {
        name: index + 1
      };
    }),
    row: (props) => render(props),
    handleScroll: () => {
    }
  });
}
export {
  Index as default
};
