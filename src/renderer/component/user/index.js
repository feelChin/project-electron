import React from "react";
import useContext from "@util/useRootContext/useContext";
import useNowTime from "@hook/useNowTime";
import style from "./index.module.scss";

function Index() {
  const { userInfo } = useContext();

  const time = useNowTime();

  return (
    <section className={style.user}>
      <img
        src={
          userInfo?.user?.url ||
          "https://img-s-msn-com.akamaized.net/tenant/amp/entityid/AA1aF85T.img?w=768&h=512&m=6"
        }
        alt=""
      />
      <div className={style.font}>
        <h5>你好</h5>
        <div className={style.text}>
          <div className={style.dot}></div>
          <p>{time}</p>
        </div>
      </div>
    </section>
  );
}

export default React.memo(Index);
