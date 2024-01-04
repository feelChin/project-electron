import React, { useState } from "react";
import { WebSocketInit, WebSocketSend, WebSocketClose } from "./websocket";
import style from "./index.module.scss";

function Index() {
  const [msgData, setMasData] = useState([]);

  function sockenStart() {
    WebSocketInit("121.40.165.18:8800", (result) => {
      if (result.type === "close") {
        setMasData([
          ...msgData,
          `${new Date().toLocaleTimeString()} <br> websocket连接已关闭`,
        ]);
      } else {
        const dataArray = msgData;
        dataArray.push(result.data);
        setMasData([...dataArray]);
      }
    });
  }

  function renderItem() {
    return (
      msgData.length > 0 &&
      msgData.map((item, index) => (
        <div
          key={index}
          className={style.item}
          dangerouslySetInnerHTML={{ __html: item }}
        ></div>
      ))
    );
  }
  return (
    <section className={style.websocket}>
      <section className={style.websocketWrapper}>{renderItem()}</section>
      <section className={style.buttonFlex}>
        <button
          onClick={() => {
            sockenStart();
          }}
        >
          开启连接
        </button>
        <button
          onClick={() => {
            WebSocketSend();
          }}
        >
          推送现在时间
        </button>
        <button
          onClick={() => {
            WebSocketClose();
          }}
        >
          关闭连接
        </button>
      </section>
    </section>
  );
}

export default Index;
