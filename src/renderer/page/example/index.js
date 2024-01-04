import React, { useEffect, useState } from "react";
import { Suspense } from "react";
import { _fetchApi, _fetchExample } from "@http";
import { useSpring, animated } from "@react-spring/web";
import exampleList from "./exampleList.js";
import useContext from "@util/useRootContext/useContext";

import style from "./index.module.scss";

function Index() {
  const [props, api] = useSpring(
    () => ({
      from: { opacity: 0, x: "100%" },
    }),
    []
  );

  const { userInfo } = useContext();

  const [exampleModal, setExampleModal] = useState({});

  const [list] = useState(userInfo?.example?.data);

  function renderExample() {
    return list.map(({ name, text, url, type }) => (
      <div
        key={url}
        className={`${style.item} ${style[type]}`}
        onClick={() => {
          setExampleModal({
            name,
            url,
          });

          api.start({
            from: {
              x: "100%",
              opacity: 0,
            },
            to: {
              x: "0",
              opacity: 1,
            },
          });
        }}
      >
        <div className={style.title}>
          <h5>{name} .</h5>
          <span
            style={{
              background: `var(--${type})`,
            }}
          >
            {type}
          </span>
        </div>
        <div className={style.text}>{text}</div>
      </div>
    ));
  }

  const LazyElement = exampleList[exampleModal.url];

  return (
    <div className={style.example}>
      <div className={style.exampleList}>
        <div className={style.exampleListWrapper}>{renderExample()}</div>
      </div>

      <animated.div style={props} className={style.exampleModal}>
        {exampleModal.url && (
          <div className={style.exampleModalWrapper}>
            <div className={style.title}>
              <div
                className="iconArrow"
                onClick={() => {
                  api.start({
                    from: { x: "0", opacity: 1 },
                    to: {
                      x: "100%",
                      opacity: 0,
                    },
                  });
                }}
              ></div>
              <h5>{exampleModal.name}</h5>
            </div>
            <div className={style.content}>
              <Suspense fallback="渲染中">
                <LazyElement />
              </Suspense>
            </div>
          </div>
        )}
      </animated.div>
    </div>
  );
}

export default Index;
