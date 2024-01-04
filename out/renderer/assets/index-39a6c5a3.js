import { R as React, r as reactExports } from "./index-861f41a7.js";
const intersectionObserverScrollList = "_intersectionObserverScrollList_18v0l_1";
const item = "_item_18v0l_10";
const loading = "_loading_18v0l_16";
const style = {
  intersectionObserverScrollList,
  item,
  loading
};
function Index$1({
  hasMore,
  page,
  list,
  setParams,
  maxPage
}) {
  const loadingRef = reactExports.useRef(null);
  const ob = reactExports.useRef(null);
  const number = reactExports.useRef(page);
  reactExports.useEffect(() => {
    if (loadingRef.current) {
      ob.current = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (number.current > maxPage - 1)
            ob.current.disconnect();
          number.current += 1;
          setParams(number.current);
        }
      });
      ob.current.observe(loadingRef.current);
    }
    return () => {
      ob.current && ob.current.disconnect();
    };
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, list(), /* @__PURE__ */ React.createElement("div", {
    className: style.loading
  }, hasMore ? /* @__PURE__ */ React.createElement("div", {
    ref: loadingRef
  }, "加载中...") : /* @__PURE__ */ React.createElement("div", null, "没有数据了...")));
}
const IntersectionObserverScroll = React.memo(Index$1);
const arrList = [];
const arr = Array.from({
  length: 100
}, (v, k) => k + 1);
for (let i = 0; i < arr.length; i += 10) {
  arrList.push(arr.slice(i, i + 10));
}
function Index() {
  const [result, setResult] = reactExports.useState([]);
  const [params, setParams] = reactExports.useState({
    page: 0
  });
  const [hasMore, setHasMore] = reactExports.useState(true);
  const option = {
    page: params.page,
    maxPage: 9,
    hasMore,
    list: () => {
      return result.map((item2, index) => /* @__PURE__ */ React.createElement("div", {
        key: index,
        className: style.item
      }, "列表 ", item2));
    },
    setParams: (dataIndex) => {
      setParams({
        ...params,
        page: dataIndex
      });
    }
  };
  reactExports.useEffect(() => {
    if (params.page > 9) {
      setHasMore(false);
      return;
    }
    let newArray = [];
    const data = [...arrList[params.page]];
    result.length > 0 ? newArray = [...result, ...data] : newArray = data;
    setTimeout(() => {
      setResult(newArray);
    }, 1e3);
  }, [params]);
  return /* @__PURE__ */ React.createElement("section", {
    className: style.intersectionObserverScrollList
  }, /* @__PURE__ */ React.createElement("section", {
    className: style.wrapper
  }, result.length > 0 && /* @__PURE__ */ React.createElement(IntersectionObserverScroll, option)));
}
export {
  Index as default
};
