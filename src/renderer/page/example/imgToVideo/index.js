import React, { useState, useEffect } from "react";
import ImgToVideo from "./imgToVideo";
import style from "./index.module.scss";

function Index() {
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    if (imgSrc.length)
      new ImgToVideo(
        42,
        imgSrc,
        document.querySelector("." + style.wrapper),
        document.querySelector("." + style.scroll)
      );
  }, [imgSrc]);

  useEffect(() => {
    const loadImage = async () => {
      const importModule = await import.meta.glob("./img/*.png");

      const allImg = Object.keys(importModule).map((item) => {
        return importModule[item]();
      });

      const _pormise = await Promise.all(allImg);

      setImgSrc(_pormise.map((item) => item.default));
    };
    loadImage();
  }, []);

  return (
    <section className={style.scroll}>
      <div className={style.wrapper}>
        <div className={style.fixed}>
          <canvas></canvas>
          <div className={style.text}>滚动</div>
        </div>
      </div>
      <div className={style.title}>结束</div>
    </section>
  );
}

export default Index;
