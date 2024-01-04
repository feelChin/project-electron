import React from "react";
import PlateKeyboard from "./plateKeyboard";
import style from "./index.module.scss";

function Index() {
  return (
    <section className={style.plateKeyboardWrapper}>
      <PlateKeyboard />
    </section>
  );
}

export default Index;
