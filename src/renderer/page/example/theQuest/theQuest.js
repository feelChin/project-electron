import React, { useCallback, useEffect, useState } from "react";
import style from "./index.module.scss";
import fill from "./assets";

function Index() {
  const level = {
    level: 1,
    max: 4,
  };

  const [state] = useState(fill(3));
  const [spaceList, setSpaceList] = useState([]);

  const [settlementType, setSettlementType] = useState("click");
  const [settlement, setSettlement] = useState([]);

  const listenerNode = useCallback(() => {
    const element = document.querySelectorAll(".questItem");

    const elementArray = [];
    element.forEach((item) => {
      const { left, top, width } = item.getBoundingClientRect();
      elementArray.push({
        left,
        top,
        width,
        zIndex: Number(item.style.zIndex),
      });
    });

    elementArray.forEach((item, index) => {
      let zIndex = item.zIndex;
      element[index].classList.remove("show");
      elementArray.forEach((itemChild) => {
        if (itemChild.zIndex <= zIndex) {
          return;
        }

        let minleft = itemChild.left - itemChild.width / 2;
        let minright = itemChild.left + itemChild.width;
        let mintop = itemChild.top - itemChild.width;
        let minbottom = itemChild.top + itemChild.width;
        if (
          item.left >= minleft &&
          item.left <= minright &&
          item.top >= mintop &&
          item.top <= minbottom
        ) {
          element[index].classList.add("show");
        }
      });
    });
  }, []);

  function handleResult(target, id) {
    const { left, top } = target.getBoundingClientRect();

    const dom = document.createElement("div");
    dom.style.left = left + "px";
    dom.style.top = top + "px";
    dom.style.position = "absolute";
    dom.innerHTML = target.innerHTML;
    dom.className = "itemAni itemFace";

    document.querySelector("." + style.theQuest).appendChild(dom);

    const result = state.data.filter((item) => {
      return item.id === id;
    });

    setSettlement([...settlement, ...result]);
    setSettlementType("click");
  }

  function renderSpace() {
    const width = 500;
    const height = 300;

    return spaceList.map((item) => {
      let topLevel = 0;
      return item.list.map((el, index) => {
        const wrapperWidth = 1 - (item.max * 10) / 100;
        const itemWidth = width * 0.1;
        const num = index % item.max;

        if (num == 0) {
          topLevel += 1;
        }

        const left = (wrapperWidth * width) / 2 + num * itemWidth;
        const top = (wrapperWidth * height) / 2 + topLevel * itemWidth;

        return (
          <div
            key={index}
            className={`${style.item} questItem itemFace`}
            style={{
              transform: `transLate(0%,-${item.level * 3}px)`,
              left,
              top,
              zIndex: item.level,
            }}
            onClick={(e) => {
              handleResult(e.target.parentNode, el.id);
              e.target.parentNode.remove();
              listenerNode();
            }}
          >
            <img src={el.url} />
          </div>
        );
      });
    });
  }

  function renderItem(data, type) {
    const width = document.body.offsetWidth * 0.05;
    return data.map((item, index) => (
      <div
        key={index}
        className={`${style.item} itemFace`}
        style={{
          transform:
            type === "right"
              ? `transLateX(-${index * 3 + width}px)`
              : `transLateX(${index * 3}px)`,
        }}
        onClick={(e) => {
          handleResult(e.target, item.id);
          e.target.remove();
        }}
      >
        <img src={item.url} />
      </div>
    ));
  }

  function renderResult() {
    return settlement.map((item, index) => (
      <div key={index} className={`${style.item} resultItem itemFace`}>
        <img src={item.url} />
      </div>
    ));
  }

  useEffect(() => {
    function deepRender(data) {
      let deepNum = 0;
      const level = data;
      const arr = [];
      const levelArray = state.result;
      let len = levelArray.length;
      function deep() {
        if (len > 0) {
          const lev = {
            level: level.level + deepNum,
            max: level.max + deepNum,
            len: (level.max + deepNum) * (level.max + deepNum),
            list: [],
          };

          levelArray.forEach((item, index) => {
            if (index < lev.len) {
              lev.list.push(item);
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

  useEffect(() => {
    listenerNode();
  }, [spaceList]);

  useEffect(() => {
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
        const { left, top } = element.getBoundingClientRect();
        itemAniAll[index].style.left = left + "px";
        itemAniAll[index].style.top = top + "px";
      });
      return;
    }

    const item = resultItemAll[resultItemAll.length - 1];
    const itemAni = itemAniAll[itemAniAll.length - 1];

    const { left, top } = item.getBoundingClientRect();
    itemAni.style.left = left + "px";
    itemAni.style.top = top + "px";
    itemAni.setAttribute("id", settlement[settlement.length - 1].id);

    function settlementUnique() {
      const data = [];

      function uniqueResult() {
        let result = [];
        settlement.forEach((item) => {
          let count = 0;
          settlement.forEach((element) => {
            if (item.id === element.id) {
              count++;
            }
          });
          result.push({
            ...item,
            count,
          });
        });
        return result;
      }

      const findRepeat = uniqueResult().find((item) => {
        return item.count === 3;
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

      uniqueResult().forEach((item) => {
        if (item.count !== 3) {
          data.push(item);
        }
      });

      if (settlement.toString() !== data.toString()) {
        setSettlement(data);
        setSettlementType("update");
      }
    }

    itemAni.addEventListener("transitionend", settlementUnique);
    return () => {
      itemAni.removeEventListener("transitionend", settlementUnique);
    };
  }, [settlement]);

  return (
    <section className={style.theQuest}>
      <div className={style.quest}>
        <div className={style.questWrapper}>{renderSpace()}</div>
      </div>
      <div className={style.questRandomList}>
        <div className={style.questRandomItem}>
          {renderItem(state.otherLeft, "")}
        </div>
        <div className={style.questRandomItem}>
          {renderItem(state.otherRight, "right")}
        </div>
      </div>
      <div className={style.questResultList}>{renderResult()}</div>
    </section>
  );
}

export default Index;
