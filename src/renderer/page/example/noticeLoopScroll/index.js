import React, { useEffect, useRef, useState } from "react";
import { Radio, Row } from "antd";
import NoticeLoopScroll from "./noticeLoopScroll";
import style from "./index.module.scss";

function Index() {
  const wrapperRef = useRef();

  const [params, setParams] = useState({ direction: "vertical", state: 1 });

  useEffect(() => {
    const arr = ["项目1", "项目2", "项目3", "秋水共长天一色", "落霞与孤鹜齐飞"];

    new NoticeLoopScroll({
      ...params,
      element: wrapperRef.current,
      name: "myAnimation",
      result: arr,
    });
  }, [params]);

  return (
    <section>
      <Row>
        方向：
        <Radio.Group
          onChange={(e) => {
            setParams({
              ...params,
              direction: e.target.value ? "vertical" : "horizontal",
            });
          }}
          defaultValue={1}
        >
          <Radio value={0}>横向</Radio>
          <Radio value={1}>垂直</Radio>
        </Radio.Group>
      </Row>
      <Row>
        状态：
        <Radio.Group
          onChange={(e) => {
            setParams({
              ...params,
              state: e.target.value,
            });
          }}
          defaultValue={1}
        >
          <Radio value={0}>连续</Radio>
          <Radio value={1}>停留</Radio>
        </Radio.Group>
      </Row>
      <div style={{ height: 30 }}></div>
      <section className={style.wrapperRef}>
        <div className={style.content}>
          <div ref={wrapperRef} id={style.list}></div>
        </div>
      </section>
    </section>
  );
}

export default Index;
