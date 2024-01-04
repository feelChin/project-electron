import { r as reactExports, R as React } from "./index-861f41a7.js";
function sendRequest(requestList, limits, callback) {
  let arr = [];
  let arr_count = 0;
  let key = -1;
  const len = requestList.length;
  const concurrentNum = Math.min(limits, len);
  const init = () => {
    let i = 0;
    while (i < concurrentNum) {
      i++;
      runTask();
    }
  };
  const runTask = () => {
    const task = requestList.shift();
    if (arr_count == len) {
      callback(arr);
      return;
    }
    if (!task) {
      return;
    }
    key++;
    const request = async (key2) => {
      try {
        const res = await task();
        arr[key2] = {
          status: true,
          result: res
        };
      } catch (err) {
        arr[key2] = {
          status: false,
          result: err
        };
      } finally {
        arr_count++;
        runTask();
      }
    };
    request(key);
  };
  init();
}
const box = "_box_eypep_1";
const wrapper = "_wrapper_eypep_5";
const item = "_item_eypep_12";
const log = "_log_eypep_23";
const style = {
  box,
  wrapper,
  item,
  log
};
function Index() {
  const log2 = reactExports.useRef(null);
  const [list, setList] = reactExports.useState([]);
  function request(url, time = 1) {
    log2.current.innerHTML += `<div>任务${url}执行</div>`;
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(url + "任务成功!");
        } else {
          reject(url + "任务错误!");
        }
      }, time * 1300);
    });
  }
  reactExports.useEffect(() => {
    sendRequest(
      [() => request("1", 3), () => request("2", 2), () => request("3", 3), () => request("4", 1), () => request("5", 3), () => request("6", 2), () => request("7", 3), () => request("8", 1)],
      3,
      //并发数
      (res) => {
        setList(res);
      }
    );
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: style.box
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.wrapper
  }, list.map(({
    status,
    result
  }, index) => {
    return /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: style.item
    }, /* @__PURE__ */ React.createElement("h5", null, "任务", index + 1), /* @__PURE__ */ React.createElement("p", null, "状态： ", status ? "成功" : "失败"), /* @__PURE__ */ React.createElement("p", null, "结果： ", result));
  })), /* @__PURE__ */ React.createElement("div", {
    className: style.log,
    ref: log2
  }, /* @__PURE__ */ React.createElement("div", null, "并行数：3")));
}
export {
  Index as default
};
