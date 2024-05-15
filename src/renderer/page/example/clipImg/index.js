import React, { useEffect, useRef, useState } from "react";
import Clip from "./clip";
import style from "./index.module.scss";
import url from "@img/0.jpg";

function Index() {
	const myClip = useRef(null);
	const [theResult, setResult] = useState({});

	useEffect(() => {
		myClip.current = new Clip({
			el: "." + style.app,
			url,
			watch: (data) => {
				console.log(data);

				setResult({ ...data });
			},
		});
	}, []);

	return (
		<section className={style.flex}>
			<div className={style.app}></div>
			<section className={style.result}>
				<div className={style.wrapper}>
					<img src={theResult.result} />
					<p>
						尺寸：{theResult.w} x {theResult.h}
					</p>
				</div>
				<footer>
					<button
						onClick={() => {
							if (!theResult.result) return;

							let a = document.createElement("a");
							a.href = theResult.result;
							a.download = "裁剪的.png";

							a.click();
							a = null;
						}}
					>
						保存
					</button>
					<button
						onClick={() => {
							myClip.current.reset();
						}}
					>
						重置
					</button>
				</footer>
			</section>
		</section>
	);
}

export default Index;
