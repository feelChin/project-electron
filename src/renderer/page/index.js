import React, { useEffect, useRef } from "react";
import { useOutlet, useLocation } from "react-router-dom";
import { useTransition, animated } from "@react-spring/web";
import { mainRouter } from "@router/router";
import Nav from "./nav";
import style from "./index.module.scss";

function Index() {
  const map = useRef({});
  const prevPath = useRef("/");

  const location = useLocation();
  const outlet = useOutlet();

  map.current[location.pathname] = outlet;

  const nowPathLevel = mainRouter.findIndex(
    (item) => item.path === location.pathname
  );
  const prevPathLevel = mainRouter.findIndex(
    (item) => item.path === prevPath.current
  );

  prevPath.current = location.pathname;

  const transitions = useTransition(location.pathname, {
    from: {
      opacity: 0,
      transform:
        nowPathLevel > prevPathLevel ? "translateX(100%)" : "translateX(-100%)",
    },
    enter: { opacity: 1, transform: "translateX(0%)" },
    leave: {
      opacity: 1,
      transform:
        nowPathLevel > prevPathLevel ? "translatex(-100%)" : "translatex(100%)",
    },
    config: {
      duration: 400,
    },
  });

  useEffect(() => {
    window.electron?.openMain();
  }, []);

  return (
    <>
      <Nav />
      <div className={style.wrapper}>
        <div className={style.item}>
          {Object.keys(map.current).length > 1 ? (
            <>
              {transitions((style, pathname) => (
                <animated.div key={pathname} style={style}>
                  {map.current[pathname]}
                </animated.div>
              ))}
            </>
          ) : (
            <>{map.current[location.pathname]}</>
          )}
        </div>
      </div>
    </>
  );
}

export default Index;
