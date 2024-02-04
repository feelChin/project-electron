import { r as reactExports, R as React } from "./index-n8_yRRwO.js";
const theQuest = "_theQuest_1kann_1";
const quest = "_quest_1kann_9";
const questWrapper = "_questWrapper_1kann_14";
const itemWrapper = "_itemWrapper_1kann_25";
const itemList = "_itemList_1kann_29";
const item = "_item_1kann_1";
const questRandomList = "_questRandomList_1kann_54";
const questRandomItem = "_questRandomItem_1kann_63";
const questResultList = "_questResultList_1kann_92";
const style = {
  theQuest,
  quest,
  questWrapper,
  itemWrapper,
  itemList,
  item,
  questRandomList,
  questRandomItem,
  questResultList
};
const wyvern = "" + new URL("wyvern-xQHXAVaS.png", import.meta.url).href;
const fishbone = "" + new URL("fishbone-SZYn5anG.png", import.meta.url).href;
const wheat = "" + new URL("wheat-BTD2H8Ls.png", import.meta.url).href;
const winged = "" + new URL("winged-sword-jx2QT2LM.png", import.meta.url).href;
const mermaid = "" + new URL("mermaid-tuSw_6Ey.png", import.meta.url).href;
const fairy = "" + new URL("fairy-0zR7NVAB.png", import.meta.url).href;
const ghost = "" + new URL("ghost-pKuGEg_r.png", import.meta.url).href;
const data = [{
  id: 1,
  url: wyvern
}, {
  id: 2,
  url: fishbone
}, {
  id: 3,
  url: wheat
}, {
  id: 4,
  url: winged
}, {
  id: 5,
  url: mermaid
}, {
  id: 6,
  url: fairy
}, {
  id: 7,
  url: ghost
}];
const renderAssetsFill = (num) => {
  const loop = new Array(num * 3).fill("");
  const arr = [];
  for (let item2 in data) {
    loop.forEach(() => {
      arr.push(data[item2]);
    });
  }
  function* draw(cards) {
    const c = [...cards];
    for (let i = c.length; i > 0; i--) {
      const pIdx = Math.floor(Math.random() * i);
      [c[pIdx], c[i - 1]] = [c[i - 1], c[pIdx]];
      yield c[i - 1];
    }
  }
  const result = [...draw(arr)];
  const otherLeft = result.slice(0, 8);
  const otherRight = result.slice(8, 16);
  result.splice(0, 16);
  return {
    data,
    result,
    otherLeft,
    otherRight
  };
};
function Index$1() {
  const level = {
    level: 1,
    max: 4
  };
  const [state] = reactExports.useState(renderAssetsFill(3));
  const [spaceList, setSpaceList] = reactExports.useState([]);
  const [settlementType, setSettlementType] = reactExports.useState("click");
  const [settlement, setSettlement] = reactExports.useState([]);
  const listenerNode = reactExports.useCallback(() => {
    const element = document.querySelectorAll(".questItem");
    const elementArray = [];
    element.forEach((item2) => {
      const {
        left,
        top,
        width
      } = item2.getBoundingClientRect();
      elementArray.push({
        left,
        top,
        width,
        zIndex: Number(item2.style.zIndex)
      });
    });
    elementArray.forEach((item2, index) => {
      let zIndex = item2.zIndex;
      element[index].classList.remove("show");
      elementArray.forEach((itemChild) => {
        if (itemChild.zIndex <= zIndex) {
          return;
        }
        let minleft = itemChild.left - itemChild.width / 2;
        let minright = itemChild.left + itemChild.width;
        let mintop = itemChild.top - itemChild.width;
        let minbottom = itemChild.top + itemChild.width;
        if (item2.left >= minleft && item2.left <= minright && item2.top >= mintop && item2.top <= minbottom) {
          element[index].classList.add("show");
        }
      });
    });
  }, []);
  function handleResult(target, id) {
    const {
      left,
      top
    } = target.getBoundingClientRect();
    const dom = document.createElement("div");
    dom.style.left = left + "px";
    dom.style.top = top + "px";
    dom.style.position = "absolute";
    dom.innerHTML = target.innerHTML;
    dom.className = "itemAni itemFace";
    document.querySelector("." + style.theQuest).appendChild(dom);
    const result = state.data.filter((item2) => {
      return item2.id === id;
    });
    setSettlement([...settlement, ...result]);
    setSettlementType("click");
  }
  function renderSpace() {
    const width = 500;
    const height = 300;
    return spaceList.map((item2) => {
      let topLevel = 0;
      return item2.list.map((el, index) => {
        const wrapperWidth = 1 - item2.max * 10 / 100;
        const itemWidth = width * 0.1;
        const num = index % item2.max;
        if (num == 0) {
          topLevel += 1;
        }
        const left = wrapperWidth * width / 2 + num * itemWidth;
        const top = wrapperWidth * height / 2 + topLevel * itemWidth;
        return /* @__PURE__ */ React.createElement("div", {
          key: index,
          className: `${style.item} questItem itemFace`,
          style: {
            transform: `transLate(0%,-${item2.level * 3}px)`,
            left,
            top,
            zIndex: item2.level
          },
          onClick: (e) => {
            handleResult(e.target.parentNode, el.id);
            e.target.parentNode.remove();
            listenerNode();
          }
        }, /* @__PURE__ */ React.createElement("img", {
          src: el.url
        }));
      });
    });
  }
  function renderItem(data2, type) {
    const width = document.body.offsetWidth * 0.05;
    return data2.map((item2, index) => /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: `${style.item} itemFace`,
      style: {
        transform: type === "right" ? `transLateX(-${index * 3 + width}px)` : `transLateX(${index * 3}px)`
      },
      onClick: (e) => {
        handleResult(e.target, item2.id);
        e.target.remove();
      }
    }, /* @__PURE__ */ React.createElement("img", {
      src: item2.url
    })));
  }
  function renderResult() {
    return settlement.map((item2, index) => /* @__PURE__ */ React.createElement("div", {
      key: index,
      className: `${style.item} resultItem itemFace`
    }, /* @__PURE__ */ React.createElement("img", {
      src: item2.url
    })));
  }
  reactExports.useEffect(() => {
    function deepRender(data2) {
      let deepNum = 0;
      const level2 = data2;
      const arr = [];
      const levelArray = state.result;
      let len = levelArray.length;
      function deep() {
        if (len > 0) {
          const lev = {
            level: level2.level + deepNum,
            max: level2.max + deepNum,
            len: (level2.max + deepNum) * (level2.max + deepNum),
            list: []
          };
          levelArray.forEach((item2, index) => {
            if (index < lev.len) {
              lev.list.push(item2);
            }
          });
          levelArray.splice(0, lev.len);
          len -= lev.len;
          arr.push(lev);
          deepNum += 1;
          deep();
        }
        return arr;
      }
      return deep();
    }
    setSpaceList(deepRender(level));
  }, []);
  reactExports.useEffect(() => {
    listenerNode();
  }, [spaceList]);
  reactExports.useEffect(() => {
    if (!settlement.length) {
      const element = document.querySelectorAll(".questItem");
      if (settlementType === "update" && element.length <= 0) {
        alert("成功啦");
      }
      return;
    }
    const itemAniAll = document.querySelectorAll(".itemAni");
    const resultItemAll = document.querySelectorAll(".resultItem");
    if (settlementType === "update") {
      resultItemAll.forEach((element, index) => {
        const {
          left: left2,
          top: top2
        } = element.getBoundingClientRect();
        itemAniAll[index].style.left = left2 + "px";
        itemAniAll[index].style.top = top2 + "px";
      });
      return;
    }
    const item2 = resultItemAll[resultItemAll.length - 1];
    const itemAni = itemAniAll[itemAniAll.length - 1];
    const {
      left,
      top
    } = item2.getBoundingClientRect();
    itemAni.style.left = left + "px";
    itemAni.style.top = top + "px";
    itemAni.setAttribute("id", settlement[settlement.length - 1].id);
    function settlementUnique() {
      const data2 = [];
      function uniqueResult() {
        let result = [];
        settlement.forEach((item3) => {
          let count = 0;
          settlement.forEach((element) => {
            if (item3.id === element.id) {
              count++;
            }
          });
          result.push({
            ...item3,
            count
          });
        });
        return result;
      }
      const findRepeat = uniqueResult().find((item3) => {
        return item3.count === 3;
      });
      if (findRepeat) {
        itemAniAll.forEach((element) => {
          const id = element.getAttribute("id");
          if (id == findRepeat.id) {
            element.remove();
          }
        });
      } else {
        if (settlement.length > 7) {
          alert("失败啦");
        }
      }
      uniqueResult().forEach((item3) => {
        if (item3.count !== 3) {
          data2.push(item3);
        }
      });
      if (settlement.toString() !== data2.toString()) {
        setSettlement(data2);
        setSettlementType("update");
      }
    }
    itemAni.addEventListener("transitionend", settlementUnique);
    return () => {
      itemAni.removeEventListener("transitionend", settlementUnique);
    };
  }, [settlement]);
  return /* @__PURE__ */ React.createElement("section", {
    className: style.theQuest
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.quest
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.questWrapper
  }, renderSpace())), /* @__PURE__ */ React.createElement("div", {
    className: style.questRandomList
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.questRandomItem
  }, renderItem(state.otherLeft, "")), /* @__PURE__ */ React.createElement("div", {
    className: style.questRandomItem
  }, renderItem(state.otherRight, "right"))), /* @__PURE__ */ React.createElement("div", {
    className: style.questResultList
  }, renderResult()));
}
function Index() {
  return /* @__PURE__ */ React.createElement("section", {
    className: style.theQuest
  }, /* @__PURE__ */ React.createElement(Index$1, null));
}
export {
  Index as default
};
