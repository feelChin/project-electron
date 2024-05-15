import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
const tableAddAndRemove = "_tableAddAndRemove_1psm8_1";
const tableAddAndRemoveWrapper = "_tableAddAndRemoveWrapper_1psm8_4";
const rowItem = "_rowItem_1psm8_8";
const item = "_item_1psm8_12";
const remove = "_remove_1psm8_15";
const flex = "_flex_1psm8_49";
const add = "_add_1psm8_54";
const style = {
  tableAddAndRemove,
  tableAddAndRemoveWrapper,
  rowItem,
  item,
  remove,
  flex,
  add
};
let data = [];
const column = /* @__PURE__ */ new Map([["text", (data2, index, cIndex) => {
  const option = {
    data: data2,
    index,
    cIndex
  };
  return /* @__PURE__ */ React.createElement(InputMap, option);
}], ["number", (data2, index, cIndex) => {
  const option = {
    data: data2,
    index,
    cIndex
  };
  return /* @__PURE__ */ React.createElement(InputNumberMap, option);
}]]);
const columnType = ["text", "number"];
function InputMap(props) {
  const {
    data: data2,
    index,
    cIndex
  } = props;
  const inputRef = reactExports.useRef(null);
  const initValue = data2[index][cIndex];
  reactExports.useEffect(() => {
    console.log(data2);
    if (inputRef.current) {
      inputRef.current.value = initValue;
    }
  }, [data2]);
  return /* @__PURE__ */ React.createElement("input", {
    ref: inputRef,
    type: "text",
    onChange: (e) => {
      const value = e.target.value;
      data2[index][cIndex] = value;
    }
  });
}
function InputNumberMap(props) {
  const {
    data: data2,
    index,
    cIndex
  } = props;
  const inputRef = reactExports.useRef(null);
  const initValue = data2[index][cIndex];
  reactExports.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.value = initValue;
    }
  }, [data2]);
  return /* @__PURE__ */ React.createElement("input", {
    ref: inputRef,
    type: "number",
    onChange: (e) => {
      const value = e.target.value;
      data2[index][cIndex] = value;
    }
  });
}
function TableAddAndRemove() {
  const [init, setInit] = reactExports.useState(true);
  const [row, setRow] = reactExports.useState(1);
  function removeRow(index) {
    setRow((row2) => row2 - 1);
    data.splice(index, 1);
  }
  function addRow() {
    setRow((row2) => row2 + 1);
  }
  function renderTable() {
    const array = new Array(row).fill([]);
    const dataArray = [];
    array.forEach((item2, index) => {
      const dataItem = data[index];
      if (dataItem) {
        dataArray.push(dataItem);
      } else {
        dataArray.push([]);
      }
      columnType.forEach((cItem, cIndex) => {
        if (dataItem && dataItem[cIndex]) {
          dataArray[index][cIndex] = dataItem[cIndex];
        } else {
          dataArray[index].push([]);
        }
      });
    });
    data = dataArray;
    return array.map(({}, index) => /* @__PURE__ */ React.createElement("section", {
      className: style.rowItem,
      key: index
    }, columnType.map((cItem, cIndex) => /* @__PURE__ */ React.createElement("div", {
      key: cIndex,
      className: style.item
    }, column.get(cItem)(data, index, cIndex))), row > 1 && /* @__PURE__ */ React.createElement("button", {
      onClick: () => {
        removeRow(index);
      },
      className: style.remove
    }, "-")));
  }
  reactExports.useEffect(() => {
    if (init) {
      data = [];
      setInit(false);
    }
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("section", {
    className: style.tableAddAndRemoveWrapper
  }, /* @__PURE__ */ React.createElement("section", {
    className: style.rowItem
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "姓名"), /* @__PURE__ */ React.createElement("div", {
    className: style.item
  }, "年龄")), renderTable()), /* @__PURE__ */ React.createElement("div", {
    className: style.flex
  }, /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      addRow();
    },
    className: style.add
  }, "增加"), /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      let text = "";
      data.forEach((item2) => {
        text += `姓名： ${item2[0]}   年龄： ${item2[1]} 
`;
      });
      alert(text);
    },
    className: style.add
  }, "打印")));
}
function Index() {
  return /* @__PURE__ */ React.createElement("section", {
    className: style.tableAddAndRemove
  }, /* @__PURE__ */ React.createElement(TableAddAndRemove, null));
}
export {
  Index as default
};
