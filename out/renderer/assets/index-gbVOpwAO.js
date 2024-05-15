import { r as reactExports, R as React } from "./index-D_CyF5zi.js";
const plateKeyboardWrapper = "_plateKeyboardWrapper_7lrhy_1";
const plateKeyboardWrapperOnclick = "_plateKeyboardWrapperOnclick_7lrhy_5";
const plateKeyboardWrapperBox = "_plateKeyboardWrapperBox_7lrhy_12";
const active = "_active_7lrhy_27";
const keyInputListWrapper = "_keyInputListWrapper_7lrhy_31";
const keyInputList = "_keyInputList_7lrhy_31";
const name = "_name_7lrhy_40";
const keyBoard = "_keyBoard_7lrhy_64";
const keyBoardList = "_keyBoardList_7lrhy_75";
const item = "_item_7lrhy_80";
const special = "_special_7lrhy_97";
const style = {
  plateKeyboardWrapper,
  plateKeyboardWrapperOnclick,
  plateKeyboardWrapperBox,
  active,
  keyInputListWrapper,
  keyInputList,
  name,
  keyBoard,
  keyBoardList,
  item,
  special
};
const chineseList = [{
  name: "京",
  id: 1
}, {
  name: "津",
  id: 2
}, {
  name: "冀",
  id: 3
}, {
  name: "晋",
  id: 4
}, {
  name: "蒙",
  id: 5
}, {
  name: "辽",
  id: 6
}, {
  name: "吉",
  id: 7
}, {
  name: "黑",
  id: 8
}, {
  name: "沪",
  id: 9
}, {
  name: "苏",
  id: 10
}, {
  name: "浙",
  id: 11
}, {
  name: "皖",
  id: 12
}, {
  name: "闽",
  id: 13
}, {
  name: "赣",
  id: 14
}, {
  name: "鲁",
  id: 15
}, {
  name: "豫",
  id: 16
}, {
  name: "鄂",
  id: 17
}, {
  name: "湘",
  id: 18
}, {
  name: "粤",
  id: 19
}, {
  name: "桂",
  id: 20
}, {
  name: "琼",
  id: 21
}, {
  name: "渝",
  id: 22
}, {
  name: "川",
  id: 23
}, {
  name: "贵",
  id: 24
}, {
  name: "云",
  id: 25
}, {
  name: "藏",
  id: 26
}, {
  name: "陕",
  id: 27
}, {
  name: "甘",
  id: 28
}, {
  name: "青",
  id: 29
}, {
  name: "宁",
  id: 30
}, {
  name: "新",
  id: 31
}, {
  name: "←",
  id: 99
}];
const englishList = [{
  name: "1",
  id: 28
}, {
  name: "2",
  id: 29
}, {
  name: "3",
  id: 30
}, {
  name: "4",
  id: 31
}, {
  name: "5",
  id: 32
}, {
  name: "6",
  id: 33
}, {
  name: "7",
  id: 34
}, {
  name: "8",
  id: 35
}, {
  name: "9",
  id: 36
}, {
  name: "0",
  id: 37
}, {
  name: "Q",
  id: 38
}, {
  name: "W",
  id: 39
}, {
  name: "E",
  id: 40
}, {
  name: "R",
  id: 41
}, {
  name: "T",
  id: 42
}, {
  name: "Y",
  id: 43
}, {
  name: "U",
  id: 44
}, {
  name: "I",
  id: 45
}, {
  name: "O",
  id: 46
}, {
  name: "P",
  id: 47
}, {
  name: "A",
  id: 48
}, {
  name: "S",
  id: 49
}, {
  name: "D",
  id: 50
}, {
  name: "F",
  id: 51
}, {
  name: "G",
  id: 52
}, {
  name: "H",
  id: 53
}, {
  name: "J",
  id: 54
}, {
  name: "K",
  id: 55
}, {
  name: "L",
  id: 56
}, {
  name: "Z",
  id: 57
}, {
  name: "X",
  id: 58
}, {
  name: "C",
  id: 59
}, {
  name: "V",
  id: 60
}, {
  name: "B",
  id: 61
}, {
  name: "N",
  id: 62
}, {
  name: "M",
  id: 63
}, {
  name: "←",
  id: 99
}];
function Index$1() {
  const [step, setStep] = reactExports.useState(0);
  const [keyInputList2, setkeyInputList] = reactExports.useState([{
    type: "name",
    context: ""
  }, {
    type: "name",
    context: ""
  }, {
    type: "text",
    context: ""
  }, {
    type: "text",
    context: ""
  }, {
    type: "text",
    context: ""
  }, {
    type: "text",
    context: ""
  }, {
    type: "text",
    context: ""
  }, {
    type: "text",
    context: "new"
  }]);
  const [visable, setVisable] = reactExports.useState({
    show: false,
    type: "chinese"
  });
  reactExports.useEffect(() => {
    if (step === 0) {
      setVisable({
        ...visable,
        type: "chinese"
      });
    }
  }, [step]);
  function renderkeyInputList() {
    return keyInputList2.map((item2, index) => /* @__PURE__ */ React.createElement("li", {
      key: index,
      onClick: () => {
        setVisable({
          ...visable,
          show: true
        });
      },
      className: item2.type === "name" ? style.name : ""
    }, item2.context === "new" ? /* @__PURE__ */ React.createElement("span", null, "新") : item2.context));
  }
  function renderkeyBoardList(data, special2 = "") {
    return data.map((item2) => /* @__PURE__ */ React.createElement("div", {
      className: `${style.item} ${special2}`,
      onClick: () => {
        const {
          id
        } = item2;
        const arr = keyInputList2;
        if (id === 99) {
          let stepNumber = step;
          const number = stepNumber - 1 <= 0 ? 0 : stepNumber - 1;
          if (stepNumber === 7 && arr[stepNumber].context !== "new") {
            arr[stepNumber].context = "new";
          } else {
            arr[number].context = "";
            setStep(number);
          }
          setkeyInputList([...arr]);
        } else {
          arr[step].context = item2.name;
          if (step === 0) {
            setVisable({
              ...visable,
              type: "english"
            });
          }
          setkeyInputList([...arr]);
          setStep((step2) => step2 + 1 > 7 ? 7 : step2 + 1);
        }
      },
      key: item2.id
    }, item2.name));
  }
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
    className: style.plateKeyboardWrapperOnclick,
    onClick: (e) => {
      setVisable({
        ...visable,
        show: false
      });
    }
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.plateKeyboardWrapperBox
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.keyInputListWrapper
  }, /* @__PURE__ */ React.createElement("ul", {
    className: style.keyInputList
  }, renderkeyInputList())), /* @__PURE__ */ React.createElement("button", {
    className: step > 6 ? style.active : "",
    onClick: () => {
      if (step > 6) {
        const arr = keyInputList2;
        const newArray = [];
        arr.forEach((item2) => {
          newArray.push(item2.context === "new" ? "" : item2.context);
        });
        alert("您的车牌号是         " + newArray.join(""));
      }
    }
  }, "提交")), visable.show && /* @__PURE__ */ React.createElement("div", {
    className: style.keyBoard
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.keyBoardList
  }, visable.type === "chinese" ? renderkeyBoardList(chineseList) : renderkeyBoardList(englishList, style.special))));
}
function Index() {
  return /* @__PURE__ */ React.createElement("section", {
    className: style.plateKeyboardWrapper
  }, /* @__PURE__ */ React.createElement(Index$1, null));
}
export {
  Index as default
};
