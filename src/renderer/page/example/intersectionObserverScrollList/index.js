import React, { useState, useEffect } from "react";
import IntersectionObserverScroll from "./intersectionObserverScroll";
import style from "./index.module.scss";

const arrList = [];
const arr = Array.from({ length: 100 }, (v, k) => k + 1);
for (let i = 0; i < arr.length; i += 10) {
  arrList.push(arr.slice(i, i + 10));
}

function Index() {
  const [result, setResult] = useState([]);
  const [params, setParams] = useState({
    page: 0,
  });
  const [hasMore, setHasMore] = useState(true);

  const option = {
    page: params.page,
    maxPage: 9,
    hasMore,
    list: () => {
      return result.map((item, index) => (
        <div key={index} className={style.item}>
          列表 {item}
        </div>
      ));
    },
    setParams: (dataIndex) => {
      setParams({
        ...params,
        page: dataIndex,
      });
    },
  };

  useEffect(() => {
    if (params.page > 9) {
      setHasMore(false);
      return;
    }

    let newArray = [];
    const data = [...arrList[params.page]];
    result.length > 0 ? (newArray = [...result, ...data]) : (newArray = data);

    setTimeout(() => {
      setResult(newArray);
    }, 1000);
  }, [params]);

  return (
    <section className={style.intersectionObserverScrollList}>
      <section className={style.wrapper}>
        {result.length > 0 && <IntersectionObserverScroll {...option} />}
      </section>
    </section>
  );
}

export default Index;
