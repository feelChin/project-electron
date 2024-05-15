import { r as reactExports, R as React, d as reactDomExports, h as createRoot } from "./index-D_CyF5zi.js";
let seed = 0;
const create_seed = () => {
  return seed += 1;
};
let portal_pool = [];
function Index$1({
  width,
  height,
  visible,
  children
}) {
  const myPortal = reactExports.useRef({
    element: document.createElement("section"),
    seed: create_seed()
  });
  reactExports.useEffect(() => {
    if (!visible) {
      myPortal.current.element.className = "portal leave";
      if (portal_pool.length > 3) {
        portal_pool.shift();
        const portalNode = document.querySelector(".portal");
        if (portalNode)
          document.body.removeChild(portalNode);
      }
      return;
    }
    myPortal.current.element.className = "portal";
    myPortal.current.element.setAttribute("seed", myPortal.current.seed);
    if (!portal_pool.includes(myPortal.current.seed)) {
      document.body.appendChild(myPortal.current.element);
      portal_pool.push(myPortal.current.seed);
    }
  }, [visible]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, reactDomExports.createPortal(/* @__PURE__ */ React.createElement("div", {
    className: "portalWrapper",
    style: {
      width,
      height
    }
  }, children), myPortal.current.element));
}
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
let remove;
let element;
function CreateModal(props) {
  const {
    width,
    height,
    content,
    resolve
  } = props;
  function removeFn(next) {
    document.body.removeChild(element);
    if (next) {
      resolve();
    }
  }
  reactExports.useEffect(() => {
    remove = (next) => {
      element.className = "portal leave";
      element.addEventListener("animationend", () => {
        removeFn(next);
      });
    };
    return () => {
      element.removeEventListener("animationend", () => {
        removeFn();
      });
    };
  }, []);
  return /* @__PURE__ */ React.createElement("div", {
    className: "portalWrapper",
    style: {
      width,
      height
    }
  }, content);
}
const modal_static = {
  create: (data) => {
    return new Promise((resolve) => {
      const seed2 = create_seed();
      const init = () => {
        element = document.createElement("section");
        element.className = "portal";
        element.setAttribute("seed", seed2);
        document.body.appendChild(element);
        return createRoot(element);
      };
      init().render(/* @__PURE__ */ React.createElement(CreateModal, _extends({
        resolve,
        seed: seed2
      }, data)));
    });
  },
  next: () => {
    remove(true);
  },
  cancel: () => {
    remove();
  }
};
function Modal(props) {
  return /* @__PURE__ */ React.createElement(Index$1, props);
}
for (let key in modal_static) {
  Modal[key] = modal_static[key];
}
const menu = "_menu_xi6uq_1";
const modal = "_modal_xi6uq_14";
const style = {
  menu,
  modal
};
function Index() {
  const [visible, setVisible] = reactExports.useState(false);
  const [visible_, setVisible_] = reactExports.useState(false);
  const option = {
    width: 300,
    height: 200,
    visible,
    close: () => {
      setVisible(false);
    },
    children: /* @__PURE__ */ React.createElement("div", {
      className: style.modal
    }, /* @__PURE__ */ React.createElement("button", {
      className: style.menu,
      onClick: () => {
        option.close();
      }
    }, "关闭"), /* @__PURE__ */ React.createElement("button", {
      className: style.menu,
      onClick: () => {
        setVisible(false);
        setTimeout(() => {
          setVisible_(true);
        }, 300);
      }
    }, "打开第二个"))
  };
  return /* @__PURE__ */ React.createElement("div", null, /* @__PURE__ */ React.createElement("button", {
    className: style.menu,
    onClick: () => {
      setVisible(true);
    }
  }, "Modal"), /* @__PURE__ */ React.createElement("button", {
    className: style.menu,
    onClick: async () => {
      await Modal.create({
        content: /* @__PURE__ */ React.createElement("div", {
          className: style.modal
        }, /* @__PURE__ */ React.createElement("div", {
          className: style.menu,
          onClick: () => {
            Modal.cancel();
          }
        }, "关闭"), /* @__PURE__ */ React.createElement("div", {
          className: style.menu,
          onClick: () => {
            Modal.next();
          }
        }, "下一个"))
      });
      await Modal.create({
        width: 300,
        height: 300,
        content: /* @__PURE__ */ React.createElement("div", {
          className: style.modal
        }, /* @__PURE__ */ React.createElement("div", {
          className: style.menu,
          onClick: () => {
            Modal.next();
          }
        }, "继续下一个"), /* @__PURE__ */ React.createElement("div", {
          className: style.menu,
          onClick: () => {
            Modal.cancel();
          }
        }, "关闭"))
      });
      await Modal.create({
        width: 400,
        height: 400,
        content: /* @__PURE__ */ React.createElement("div", {
          className: style.modal
        }, /* @__PURE__ */ React.createElement("div", {
          className: style.menu,
          onClick: () => {
            Modal.cancel();
          }
        }, "没有了"))
      });
    }
  }, "Modal.create"), /* @__PURE__ */ React.createElement(Modal, option), /* @__PURE__ */ React.createElement(OtherModal, {
    visible_,
    setVisible_: (bool) => {
      setVisible_(bool);
    }
  }));
}
function OtherModal({
  visible_,
  setVisible_
}) {
  const option = {
    width: 300,
    height: 200,
    visible: visible_,
    close: () => {
      setVisible_(false);
    },
    children: /* @__PURE__ */ React.createElement("div", {
      className: style.modal
    }, /* @__PURE__ */ React.createElement("button", {
      className: style.menu,
      onClick: () => {
        option.close();
      }
    }, "关闭"))
  };
  return /* @__PURE__ */ React.createElement(Modal, option);
}
export {
  Index as default
};
