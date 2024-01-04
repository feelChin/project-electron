import React from "react";
import TheQuest from "./theQuest";
import style from "./index.module.scss";

function Index() {
  return (
    <section className={style.theQuest}>
      <TheQuest />
    </section>
  );
}

export default Index;
