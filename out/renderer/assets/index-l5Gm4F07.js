import { r as reactExports, R as React, u as useNavigate, a as useLocation, b as routes, c as useOutlet, m as mainRouter, O as Outlet } from "./index-n8_yRRwO.js";
import { U as UserContext, G as Gt } from "./useContext-B3YaHIJR.js";
function Index$3() {
  const timer = reactExports.useRef();
  const [nowTime, setNowTime] = reactExports.useState();
  function renderNowTime() {
    const now = /* @__PURE__ */ new Date();
    setNowTime(/* @__PURE__ */ React.createElement(React.Fragment, null, now.getHours() >= 10 ? now.getHours() : "0" + now.getHours(), /* @__PURE__ */ React.createElement("span", {
      style: {
        margin: "0 1px"
      }
    }, ":"), now.getMinutes() >= 10 ? now.getMinutes() : "0" + now.getMinutes()));
  }
  reactExports.useEffect(() => {
    timer.current = setInterval(() => {
      renderNowTime();
    }, 1e3);
    return () => {
      clearInterval(timer.current);
    };
  }, []);
  return nowTime;
}
const user = "_user_1m0gd_1";
const font = "_font_1m0gd_15";
const text = "_text_1m0gd_18";
const dot$1 = "_dot_1m0gd_22";
const style$2 = {
  user,
  font,
  text,
  dot: dot$1
};
function Index$2() {
  const {
    userInfo
  } = UserContext();
  const time = Index$3();
  return /* @__PURE__ */ React.createElement("section", {
    className: style$2.user
  }, /* @__PURE__ */ React.createElement("img", {
    src: userInfo?.user?.url || "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1aF85T.img?w=768&h=512&m=6",
    alt: ""
  }), /* @__PURE__ */ React.createElement("div", {
    className: style$2.font
  }, /* @__PURE__ */ React.createElement("h5", null, "你好"), /* @__PURE__ */ React.createElement("div", {
    className: style$2.text
  }, /* @__PURE__ */ React.createElement("div", {
    className: style$2.dot
  }), /* @__PURE__ */ React.createElement("p", null, time))));
}
const User = React.memo(Index$2);
function useDebounce(fn, delay = 300, immediate, props) {
  const ref = reactExports.useRef({
    fn,
    timer: null
  });
  reactExports.useEffect(() => {
    ref.current.fn = fn;
  }, [fn]);
  let myDebounce = function() {
    const args = [arguments, props];
    ref.current.timer && clearTimeout(ref.current.timer);
    if (immediate) {
      !ref.current.timer && ref.current.fn.apply(this, args);
      ref.current.timer = setTimeout(() => {
        ref.current.timer = null;
      }, delay);
    } else {
      ref.current.timer = setTimeout(() => {
        ref.current.fn.apply(this, args);
      }, delay);
    }
  };
  myDebounce.cancel = () => {
    clearTimeout(ref.current.timer);
    ref.current.timer = null;
  };
  return myDebounce;
}
const nav = "_nav_12wg4_1";
const item$1 = "_item_12wg4_23";
const active = "_active_12wg4_35";
const theme = "_theme_12wg4_53";
const dot = "_dot_12wg4_65";
const menuWrapper = "_menuWrapper_12wg4_92";
const menu = "_menu_12wg4_92";
const minimize = "_minimize_12wg4_108";
const minimizeLine = "_minimizeLine_12wg4_113";
const maximize = "_maximize_12wg4_132";
const topMaximizeLine = "_topMaximizeLine_12wg4_137";
const rightMaximizeLine = "_rightMaximizeLine_12wg4_144";
const bottomMaximizeLine = "_bottomMaximizeLine_12wg4_151";
const leftMaximizeLine = "_leftMaximizeLine_12wg4_158";
const beforeMaximizeLine = "_beforeMaximizeLine_12wg4_165";
const afterMaximizeLine = "_afterMaximizeLine_12wg4_166";
const close = "_close_12wg4_170";
const beforeCloseLine = "_beforeCloseLine_12wg4_170";
const afterCloseLine = "_afterCloseLine_12wg4_171";
const style$1 = {
  nav,
  item: item$1,
  active,
  theme,
  dot,
  menuWrapper,
  menu,
  minimize,
  minimizeLine,
  maximize,
  topMaximizeLine,
  rightMaximizeLine,
  bottomMaximizeLine,
  leftMaximizeLine,
  beforeMaximizeLine,
  afterMaximizeLine,
  close,
  beforeCloseLine,
  afterCloseLine
};
function Index$1() {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    userInfo,
    setUserInfo
  } = UserContext();
  const debounceHandleTheme = useDebounce(handleTheme, 500, true);
  function startViewTransition(callback) {
    if (!document.startViewTransition) {
      callback();
      return;
    }
    document.startViewTransition(callback);
  }
  function renderNav() {
    return routes[0].children.map(({
      name,
      path
    }) => /* @__PURE__ */ React.createElement("div", {
      className: `${style$1.item} ${location.pathname == path ? style$1.active : ""}`,
      key: path,
      onClick: (e) => {
        e.target.classList.add(style$1.active);
        startViewTransition(() => {
          navigate(path);
        });
      }
    }, name));
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
    const endRadius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const isDark = !userInfo.theme;
    const transition = document.startViewTransition(() => {
      setUserInfo({
        ...userInfo,
        theme: isDark
      });
    });
    transition.ready.then(() => {
      const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];
      document.documentElement.animate({
        clipPath: isDark ? [...clipPath].reverse() : clipPath
      }, {
        duration: 1e3,
        easing: "ease-in-out",
        pseudoElement: isDark ? "::view-transition-old(root)" : "::view-transition-new(root)"
      });
    });
  }
  return /* @__PURE__ */ React.createElement("section", {
    className: style$1.nav
  }, /* @__PURE__ */ React.createElement("div", {
    className: style$1.drag
  }, /* @__PURE__ */ React.createElement(User, null), /* @__PURE__ */ React.createElement("nav", null, renderNav()), /* @__PURE__ */ React.createElement("div", {
    className: `${style$1.theme} ${!userInfo.theme ? style$1.active : ""}`,
    onClick: debounceHandleTheme
  }, /* @__PURE__ */ React.createElement("div", {
    className: style$1.dot
  })), /* @__PURE__ */ React.createElement("div", {
    className: style$1.menuWrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style$1.minimize} ${style$1.menu}`,
    onClick: (e) => {
      sendIpc(e.target, "windowMin");
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: style$1.minimizeLine
  })), /* @__PURE__ */ React.createElement("div", {
    className: `${style$1.close} ${style$1.menu}`,
    onClick: (e) => {
      sendIpc(e.target, "windowClose");
    }
  }, /* @__PURE__ */ React.createElement("div", {
    className: style$1.beforeCloseLine
  }), /* @__PURE__ */ React.createElement("div", {
    className: style$1.afterCloseLine
  })))));
}
const wrapper = "_wrapper_vaj9w_1";
const item = "_item_vaj9w_7";
const style = {
  wrapper,
  item
};
function Index() {
  const map = reactExports.useRef({});
  const prevPath = reactExports.useRef("/");
  const location = useLocation();
  const outlet = useOutlet();
  map.current[location.pathname] = outlet;
  const nowPathLevel = mainRouter.findIndex((item2) => item2.path === location.pathname);
  const prevPathLevel = mainRouter.findIndex((item2) => item2.path === prevPath.current);
  prevPath.current = location.pathname;
  Gt(location.pathname, {
    from: {
      opacity: 0,
      transform: nowPathLevel > prevPathLevel ? "translateX(100%)" : "translateX(-100%)"
    },
    enter: {
      opacity: 1,
      transform: "translateX(0%)"
    },
    leave: {
      opacity: 1,
      transform: nowPathLevel > prevPathLevel ? "translatex(-100%)" : "translatex(100%)"
    },
    config: {
      duration: 400
    }
  });
  reactExports.useEffect(() => {
    window.electron?.openMain();
  }, []);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(Index$1, null), /* @__PURE__ */ React.createElement("div", {
    className: `${style.wrapper} main`
  }, /* @__PURE__ */ React.createElement(Outlet, null)));
}
export {
  Index as default
};
