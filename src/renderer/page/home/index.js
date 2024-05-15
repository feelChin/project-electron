import React from "react";
import style from "./index.module.scss";

function Index() {
	return (
		<>
			<div className={style.home}>
				<section className={style.search}>
					<input
						type="text"
						onKeyDown={(e) => {
							const value = e.target.value;

							if (value && e.keyCode === 13) {
								window.electron.openBrowser(value);
							}
						}}
						placeholder="搜索网页"
					/>
				</section>
			</div>
		</>
	);
}

export default Index;
