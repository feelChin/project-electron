import React from "react";
import routes from "@router/router";
import { NavLink } from "react-router-dom";
import User from "@component/user";
import useContext from "@util/useRootContext/useContext";
import useDebounce from "@hook/useDebounce";
import style from "./index.module.scss";

function Index() {
  const { userInfo, setUserInfo } = useContext();

  const debounceHandleTheme = useDebounce(handleTheme, 500, true);

  function renderNav() {
    return routes[0].children.map(({ name, path }) => (
      <NavLink
        key={path}
        to={path}
        className={({ isActive }) =>
          isActive ? `${style.item} ${style.active}` : `${style.item}`
        }
      >
        {name}
      </NavLink>
    ));
  }

  function sendIpc(element, type) {
    element.style.pointerEvents = "none";
    setTimeout(() => {
      element.style.pointerEvents = "auto";
    }, 0);

    window.electron[type]();
  }

  let isDark = "light";

  function handleTheme(event) {
    // setUserInfo({
    //   ...userInfo,
    //   theme: !userInfo.theme,
    // });
    const x = event[0].clientX;
    const y = event[0].clientY;
    const endRadius = Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y)
    );

    let isDark;

    // @ts-ignore
    const transition = document.startViewTransition(() => {
      const root = document.documentElement;
      isDark = root.classList.contains("dark");
      root.classList.remove(isDark ? "dark" : "light");
      root.classList.add(isDark ? "light" : "dark");
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
          easing: "ease-in",
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
