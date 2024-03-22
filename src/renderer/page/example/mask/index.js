import React, { useEffect } from "react";
import style from "./index.module.scss";

function Index() {
	return (
		<div className={style.box}>
			<div className={style.item}>
				<div className={style.menu}></div>
				<div className={style.menu}></div>
				<p>按钮1</p>
			</div>
			<div className={style.item}>
				<div className={style.menu}></div>
				<div className={style.menu}></div>
				<p>按钮2</p>
			</div>
			<div className={style.item}>
				<div className={style.menu}></div>
				<div className={style.menu}></div>
				<p>按钮3</p>
			</div>
			<div className={style.item}>
				<div className={style.menu}></div>
				<div className={style.menu}></div>
				<p>按钮4</p>
			</div>
		</div>
	);
}

export default Index;
