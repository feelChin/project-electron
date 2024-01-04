import React, { useState, useEffect } from "react";
import ScrollpageActive from "./scrollpageActive";
import style from "./index.module.scss";

const data = {
  第一章: {
    第一章一: 1.1,
    第一章二: 1.2,
  },
  第二章: 2,
  第三章: 3,
  第四章: 4,
  第五章: {
    第五章一: 5.1,
    第五章二: 5.2,
    第五章三: 5.3,
    第五章四: {
      第五章四一: 5.4_1,
      第五章四二: 5.4_2,
    },
  },
  第六章: 6,
  第七章: 7,
};

function Index() {
  function renderPageFixed(defaultData) {
    let num = -1;

    function deep(list, index, result = "") {
      Object.entries(list).forEach(([key, value]) => {
        result += `<div class="${style.navItem}" id="${
          Object.prototype.toString.call(value) === "[object Object]"
            ? ""
            : (num += 1)
        }" style="margin-left: ${index * 10}px">
              <div class="${style.head}">${key}</div>
              ${
                Object.prototype.toString.call(value) === "[object Object]"
                  ? `${deep(value, index + 1)}`
                  : ""
              }
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

    return result.map((item, index) => (
      <div className={style.pageItem} key={item} id={index}>
        {item}
      </div>
    ));
  }

  useEffect(() => {
    new ScrollpageActive({
      title: style.navItem,
      page: style.pageItem,
    });
  }, []);

  return (
    <>
      <div className={style.page}>{renderPage(data)}</div>
      <div
        className={style.pageFixed}
        dangerouslySetInnerHTML={{ __html: renderPageFixed(data) }}
      ></div>
    </>
  );
}

export default Index;
