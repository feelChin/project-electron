import React, { useRef, useEffect } from "react";
import useThrottle from "@hook/useThrottle";
import { FakeReducer } from "./fakeReducer";
import { ShoppingCartReducer } from "./shoppingCareReducer";
import style from "./index.module.scss";

const initState = {
  products: [
    {
      id: 1,
      name: "福建绾溪柚子",
      num: 1,
      price: 15,
    },
    {
      id: 2,
      name: "四川高山李子",
      num: 1,
      price: 5,
    },
    {
      id: 3,
      name: "巨峰葡萄",
      num: 1,
      price: 6,
    },
    {
      id: 4,
      name: "海南香蕉",
      num: 1,
      price: 4,
    },
  ],
  total: 30,
};

function ShoppingCart() {
  const pricerRef = useRef();
  const [state, dispatch] = FakeReducer(ShoppingCartReducer, initState);
  const runHandleClick = useThrottle(handleClick, 400);

  function handleClick(element, id) {
    dispatch({ type: "ADD", payload: id });
    createDot(element);
  }

  function createDot(target) {
    const div = document.createElement("div");
    div.className = style.shoppingCartDot;

    const { left, top } = target.getBoundingClientRect();
    const width = target.offsetWidth / 2;

    div.style.left = left + width + "px";
    div.style.top = top + width + "px";

    document.body.appendChild(div);
  }

  useEffect(() => {
    const element = document.querySelectorAll("." + style.shoppingCartDot);
    const current = pricerRef.current;
    const elementOnly = element[element.length - 1];
    if (element.length) {
      const { left, top } = current.getBoundingClientRect();
      const width = current.offsetHeight / 2;

      element.forEach((item) => {
        item.style.left = left + width + "px";
        item.style.top = top + width + "px";
      });

      function removeNode() {
        element.forEach((item) => {
          item.remove();
        });
      }

      elementOnly.addEventListener("transitionend", removeNode);
      return () => {
        elementOnly.removeEventListener("transitionend", removeNode);
      };
    }
  }, [state]);

  return (
    <>
      <ul>
        {state.products &&
          state.products.map((item, index) => {
            return (
              <li key={item.id}>
                <div className={style.img}></div>
                <h5>{item.name} </h5>
                <div className={style.priceNumber}>
                  <span>
                    价格 <small>{item.price}</small>
                  </span>
                  <span>数量 {item.num} </span>
                </div>
                <div className={style.flexButton}>
                  <button
                    onClick={(e) => {
                      runHandleClick(e.target, item.id);
                      runHandleClick.cancel();
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      dispatch({ type: "DECREASE", payload: item.id });
                    }}
                  >
                    -
                  </button>
                </div>
              </li>
            );
          })}
      </ul>
      <div className={style.productsNumber}>
        <p>合计金额：</p>
        <p ref={pricerRef}>{state.total}</p>
      </div>
    </>
  );
}

export default ShoppingCart;
