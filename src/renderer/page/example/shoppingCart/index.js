import React from "react";
import ShoppingCart from "./shoppingCart";
import style from "./index.module.scss";

function Index() {
  return (
    <section className={style.shoppingCart}>
      <ShoppingCart />
    </section>
  );
}

export default Index;
