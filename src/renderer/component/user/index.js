import React from "react";
import useContext from "@util/useRootContext/useContext";
import useNowTime from "@hook/useNowTime";
import avatar from "@img/avatar.png";
import style from "./index.module.scss";

function Index() {
	const { userInfo } = useContext();

	const time = useNowTime();

	return (
		<section className={style.user}>
			<img src={userInfo?.user?.url || avatar} alt="" />
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
