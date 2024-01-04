import React, { useEffect, useRef, useState } from "react";
import promiseLimit from "./promiseLimit";
import style from "./index.module.scss";

function Index() {
  const log = useRef(null);
  const [list, setList] = useState([]);

  function request(url, time = 1) {
    log.current.innerHTML += `<div>任务${url}执行</div>`;

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() > 0.5) {
          resolve(url + "任务成功!");
        } else {
          reject(url + "任务错误!");
        }
      }, time * 1300);
    });
  }

  useEffect(() => {
    promiseLimit(
      [
        () => request("1", 3),
        () => request("2", 2),
        () => request("3", 3),
        () => request("4", 1),
        () => request("5", 3),
        () => request("6", 2),
        () => request("7", 3),
        () => request("8", 1),
      ],
      3, //并发数
      (res) => {
        setList(res);
      }
    );
  }, []);

  return (
    <div className={style.box}>
      <div className={style.wrapper}>
        {list.map(({ status, result }, index) => {
          return (
            <div key={index} className={style.item}>
              <h5>任务{index + 1}</h5>
              <p>状态： {status ? "成功" : "失败"}</p>
              <p>结果： {result}</p>
            </div>
          );
        })}
      </div>
      <div className={style.log} ref={log}>
        <div>并行数：3</div>
      </div>
    </div>
  );
}

export default Index;
