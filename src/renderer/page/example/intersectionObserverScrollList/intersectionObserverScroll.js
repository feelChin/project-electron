import React, { useEffect, useRef } from "react";
import style from "./index.module.scss";

function Index({ hasMore, page, list, setParams, maxPage }) {
  const loadingRef = useRef(null);
  const ob = useRef(null);
  const number = useRef(page);

  useEffect(() => {
    if (loadingRef.current) {
      ob.current = new IntersectionObserver((entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          if (number.current > maxPage - 1) ob.current.disconnect();
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
  return (
    <>
      {list()}
      <div className={style.loading}>
        {hasMore ? (
          <div ref={loadingRef}>加载中...</div>
        ) : (
          <div>没有数据了...</div>
        )}
      </div>
    </>
  );
}

export default React.memo(Index);
