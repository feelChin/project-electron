import React, { useState, useRef, useEffect } from "react";
import style from "./index.module.scss";

function Index() {
  const [codeArray, setCodeArray] = useState(new Array(6).fill(""));
  const [codeArrayIndex, setCodeArrayIndex] = useState(0);
  const [codeMsg, setCodeMsg] = useState("请输入验证码");
  const inputRef = useRef(null);

  // 输入框change
  const hanldeInputCodeChange = (e) => {
    if (codeArrayIndex === 6) return;
    const value = e.target.value;
    codeArray[codeArrayIndex] = value;
    setCodeArray([...codeArray]);
    setCodeArrayIndex(codeArrayIndex + 1);
  };

  useEffect(() => {
    if (codeArrayIndex === 6) {
      if (codeArray.join("") === "123456") {
        setCodeMsg("验证成功");
      } else {
        setCodeMsg("验证失败");
      }
      setCodeArray(new Array(6).fill(""));
      setCodeArrayIndex(0);
    }
    if (!codeArrayIndex) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 300);
    }
  }, [codeArrayIndex]);

  return (
    <div className={style.verificationCode}>
      <h5>{codeMsg}</h5>
      <p>验证码已发送至您的手机 123456</p>
      <div className={style.numberWrapper}>
        <div className={style.itemNumBox}>
          {codeArray.map((item, index) => {
            return (
              <section key={index}>
                <div className={`${style.item} ${item ? "active" : ""}`}>
                  {item}
                </div>
              </section>
            );
          })}
        </div>
        {codeArrayIndex < 6 && (
          <div
            className={style.itemPosition}
            style={{
              left: `${(codeArrayIndex / 6) * 100}%`,
            }}
          >
            <input
              type="text"
              value=""
              onChange={hanldeInputCodeChange}
              pattern="[0-9]*"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
              ref={inputRef}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;
