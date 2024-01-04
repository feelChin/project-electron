import { r as reactExports, R as React } from "./index-861f41a7.js";
import { I as Index$1 } from "./index-f8e865cd.js";
const FakeReducer = (reducer, initialState = {}) => {
  const [state, setState] = reactExports.useState(initialState);
  const dispatch = (action) => {
    setState(reducer(state, action));
  };
  return [state, dispatch];
};
const ShoppingCartReducer = (state, action) => {
  const newdata = JSON.parse(JSON.stringify(state));
  const id = action.payload;
  const index = state.products.findIndex((item) => {
    return item.id === id;
  });
  switch (action.type) {
    case "ADD":
      newdata.products[index].num++;
      break;
    case "DECREASE":
      if (state.products[index].num <= 1) {
        newdata.products.splice(index, 1);
      } else {
        newdata.products[index].num--;
      }
      break;
    default:
      return state;
  }
  newdata.total = newdata.products.reduce((total, product) => {
    return total + product.num * product.price;
  }, 0);
  return newdata;
};
const shoppingCartDot = "_shoppingCartDot_722kk_1";
const shoppingCart = "_shoppingCart_722kk_1";
const img = "_img_722kk_34";
const priceNumber = "_priceNumber_722kk_39";
const flexButton = "_flexButton_722kk_49";
const productsNumber = "_productsNumber_722kk_67";
const style = {
  shoppingCartDot,
  shoppingCart,
  img,
  priceNumber,
  flexButton,
  productsNumber
};
const initState = {
  products: [{
    id: 1,
    name: "福建绾溪柚子",
    num: 1,
    price: 15
  }, {
    id: 2,
    name: "四川高山李子",
    num: 1,
    price: 5
  }, {
    id: 3,
    name: "巨峰葡萄",
    num: 1,
    price: 6
  }, {
    id: 4,
    name: "海南香蕉",
    num: 1,
    price: 4
  }],
  total: 30
};
function ShoppingCart() {
  const pricerRef = reactExports.useRef();
  const [state, dispatch] = FakeReducer(ShoppingCartReducer, initState);
  const runHandleClick = Index$1(handleClick, 400);
  function handleClick(element, id) {
    dispatch({
      type: "ADD",
      payload: id
    });
    createDot(element);
  }
  function createDot(target) {
    const div = document.createElement("div");
    div.className = style.shoppingCartDot;
    const {
      left,
      top
    } = target.getBoundingClientRect();
    const width = target.offsetWidth / 2;
    div.style.left = left + width + "px";
    div.style.top = top + width + "px";
    document.body.appendChild(div);
  }
  reactExports.useEffect(() => {
    const element = document.querySelectorAll("." + style.shoppingCartDot);
    const current = pricerRef.current;
    const elementOnly = element[element.length - 1];
    if (element.length) {
      let removeNode = function() {
        element.forEach((item) => {
          item.remove();
        });
      };
      const {
        left,
        top
      } = current.getBoundingClientRect();
      const width = current.offsetHeight / 2;
      element.forEach((item) => {
        item.style.left = left + width + "px";
        item.style.top = top + width + "px";
      });
      elementOnly.addEventListener("transitionend", removeNode);
      return () => {
        elementOnly.removeEventListener("transitionend", removeNode);
      };
    }
  }, [state]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("ul", null, state.products && state.products.map((item, index) => {
    return /* @__PURE__ */ React.createElement("li", {
      key: item.id
    }, /* @__PURE__ */ React.createElement("div", {
      className: style.img
    }), /* @__PURE__ */ React.createElement("h5", null, item.name, " "), /* @__PURE__ */ React.createElement("div", {
      className: style.priceNumber
    }, /* @__PURE__ */ React.createElement("span", null, "价格 ", /* @__PURE__ */ React.createElement("small", null, item.price)), /* @__PURE__ */ React.createElement("span", null, "数量 ", item.num, " ")), /* @__PURE__ */ React.createElement("div", {
      className: style.flexButton
    }, /* @__PURE__ */ React.createElement("button", {
      onClick: (e) => {
        runHandleClick(e.target, item.id);
        runHandleClick.cancel();
      }
    }, "+"), /* @__PURE__ */ React.createElement("button", {
      onClick: () => {
        dispatch({
          type: "DECREASE",
          payload: item.id
        });
      }
    }, "-")));
  })), /* @__PURE__ */ React.createElement("div", {
    className: style.productsNumber
  }, /* @__PURE__ */ React.createElement("p", null, "合计金额："), /* @__PURE__ */ React.createElement("p", {
    ref: pricerRef
  }, state.total)));
}
function Index() {
  return /* @__PURE__ */ React.createElement("section", {
    className: style.shoppingCart
  }, /* @__PURE__ */ React.createElement(ShoppingCart, null));
}
export {
  Index as default
};
