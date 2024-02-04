import React from "react";
import routes from "@router/router";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import User from "@component/user";
import useContext from "@util/useRootContext/useContext";
import useDebounce from "@hook/useDebounce";
import style from "./index.module.scss";

function Index() {
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo, setUserInfo } = useContext();

  const debounceHandleTheme = useDebounce(handleTheme, 500, true);

  function startViewTransition(callback) {
    if (!document.startViewTransition) {
      callback();
      return;
    }

    document.startViewTransition(callback);
  }

  function renderNav() {
    return routes[0].children.map(({ name, path }) => (
      <div
        className={`${style.item} ${
          location.pathname == path ? style.active : ""
        }`}
        key={path}
        onClick={(e) => {
          e.target.classList.add(style.active);
          startViewTransition(() => {
            navigate(path);
          });
        }}
      >
        {name}
      </div>
    ));
  }

  function sendIpc(element, type) {
    element.style.pointerEvents = "none";
    setTimeout(() => {
      element.style.pointerEvents = "auto";
    }, 0);

    window.electron[type]();
  }

  function handleTheme(event) {
    const x = event[0].clientX;
    const y = event[0].clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    const isDark = !userInfo.theme;

    const transition = document.startViewTransition(() => {
      setUserInfo({
        ...userInfo,
        theme: isDark,
      });
    });

    transition.ready.then(() => {
      const clipPath = [
        `circle(0px at ${x}px ${y}px)`,
        `circle(${endRadius}px at ${x}px ${y}px)`,
      ];
      document.documentElement.animate(
        {
          clipPath: isDark ? [...clipPath].reverse() : clipPath,
        },
        {
          duration: 1000,
          easing: "ease-in-out",
          pseudoElement: isDark
            ? "::view-transition-old(root)"
            : "::view-transition-new(root)",
        }
      );
    });
  }

  return (
    <section className={style.nav}>
      <div className={style.drag}>
        <User />
        <nav>{renderNav()}</nav>
        <div
          className={`${style.theme} ${!userInfo.theme ? style.active : ""}`}
          onClick={debounceHandleTheme}
        >
          <div className={style.dot}></div>
        </div>
        <div className={style.menuWrapper}>
          <div
            className={`${style.minimize} ${style.menu}`}
            onClick={(e) => {
              sendIpc(e.target, "windowMin");
            }}
          >
            <div className={style.minimizeLine}></div>
          </div>
          <div
            className={`${style.close} ${style.menu}`}
            onClick={(e) => {
              sendIpc(e.target, "windowClose");
            }}
          >
            <div className={style.beforeCloseLine}></div>
            <div className={style.afterCloseLine}></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
