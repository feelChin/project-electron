import React, { useEffect, useRef, useState } from "react";
import { Radio, Row } from "antd";
import PageEffect from "./customRoute";
import style from "./index.module.scss";

class MyPageEffect extends PageEffect {
  constructor(param) {
    super(param);

    this.routerMap = {
      home: this.homePage(),
      learn: this.learnPage(),
      list: this.listPage(),
      me: this.minePage(),
    };
  }

  homePage() {
    return `<div class="element element1">
        这是首页
    </div>`;
  }

  learnPage() {
    return `<div class="element element2">
        这是学习
    </div>`;
  }

  listPage() {
    return `<div class="element element3">
        这是列表
    </div>`;
  }

  minePage() {
    return `<div class="element element4">
        这是我
    </div>`;
  }
}

function Index() {
  const app = useRef(null);
  const [state, setState] = useState(1);

  useEffect(() => {
    app.current = new MyPageEffect({
      root: "." + style.render,
      type: !state || "history",
    });
  }, [state]);

  return (
    <section>
      <Row>
        方向：
        <Radio.Group
          onChange={(e) => {
            setState(e.target.value);
          }}
          defaultValue={state}
        >
          <Radio value={0} disabled>
            哈希路由
          </Radio>
          <Radio value={1}>history路由</Radio>
        </Radio.Group>
      </Row>
      <div style={{ height: 30 }}></div>
      <p>外部是哈希路由 内部更改哈希会改变全局</p>
      <div style={{ height: 30 }}></div>
      <button
        onClick={() => {
          app.current.routeGo("list");
        }}
      >
        跳转到 列表
      </button>
      <div style={{ height: 30 }}></div>
      <nav>
        <div entrust="route" link="home">
          首页
        </div>
        <div entrust="route" link="learn">
          学习
        </div>
        <div entrust="route" link="list">
          列表
        </div>
        <div entrust="route" link="me">
          我
        </div>
      </nav>
      <div className={style.render}></div>
    </section>
  );
}

export default Index;
