import React, { useEffect, useRef, useState } from "react";
import CustonScrollTheme from "../custonScrollTheme/custonScrollTheme";
import style from "./index.module.scss";

function Index({ result, height = 50, row: Row, handleScroll }) {
  const virtualRef = useRef(null);

  const config = useRef({
    top: result.map((_, index) => {
      return index * height;
    }),
    total_row: result.length,
    total_height: result.length * height,
    init: true,
  });

  const [filterResult, setFilterResult] = useState({});
  const [reloadUpdate, setReloadUpdate] = useState(0);

  function renderItem() {
    return filterResult.list?.map((item, index) => (
      <div
        key={index}
        className={style.item}
        style={{
          height,
          top: filterResult.top[index],
        }}
      >
        <Row {...item} />
      </div>
    ));
  }

  function renderList(start, end) {
    setFilterResult({
      list: result.slice(start, end),
      top: config.current.top.slice(start, end),
    });
  }

  function getEndIndex(start) {
    const { total_row } = config.current;

    const viewCount = Math.ceil(virtualRef.current.clientHeight / height);

    return Math.min(start + viewCount + 4, total_row);
  }

  useEffect(() => {
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

  return (
    <div className={style.virtual} ref={virtualRef}>
      <CustonScrollTheme
        beforeUpdate={(e) => {
          const startIndex = Math.max(Math.floor(e.scrollTop / height) - 2, 0);

          renderList(startIndex, getEndIndex(startIndex));

          handleScroll(e);
        }}
        animation={{
          transition: "0s",
        }}
        showbar={false}
        reload={reloadUpdate}
      >
        <div style={{ height: config.current.total_height }}>
          <div className={style.virtualList}>{renderItem()}</div>
        </div>
      </CustonScrollTheme>
    </div>
  );
}

export default Index;
