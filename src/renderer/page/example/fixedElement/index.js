import React, { useEffect } from "react";
import FixedElement from "./fixedElement";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new FixedElement(
      document.querySelectorAll("." + style.fixedElement),
      style.fixedElementChild
    );
  }, []);

  return (
    <div className={style.box}>
      <div className={style.boxWrapper}>
        <header></header>
        <div className={`${style.head} ${style.fixedElement}`}>
          <div className={style.img}>
            <a href="">百度</a>
            <img
              src="https://bing.com/th?id=OHR.WhistlerVillage_ZH-CN3451305723_800x480.jpg&qlt=20"
              alt=""
            />
          </div>
        </div>
        <div className={`${style.wrapper} ${style.site}`}>
          春节（Spring
          Festival），即中国农历新年，俗称“新春”“新岁”“岁旦”等，又称“过年”“过大年”，是集除旧布新、拜神祭祖、祈福辟邪、亲朋团圆、欢庆娱乐和饮食为一体的民俗大节。
          春节历史悠久，由上古时代岁首祈岁祭祀演变而来。万物本乎天、人本乎祖，祈岁祭祀、敬天法祖，报本反始也。春节的起源蕴含着深邃的文化内涵，在传承发展中承载了丰厚的历史文化底蕴。在春节期间，全国各地均有举行各种庆贺新春活动，带有浓郁的各地地方特色。
          在早期观象授时时代，依据斗转星移定岁时，“斗柄回寅”为岁首。“斗柄回寅”大地回春，终而复始，万象更新，新的轮回由此开启。在传统的农耕社会，立春岁首具有重要的意义，衍生了大量与之相关的岁首节俗文化。在历史发展中虽然使用历法不同而岁首节庆日期不同，但是其节庆框架以及许多民俗沿承了下来。在现代，人们把春节定于农历正月初一，但一般至少要到正月十五新年才算结束。
          百节年为首，春节是中华民族最隆重的传统佳节。受到中华文化的影响，世界上一些国家和地区也有庆贺新春的习俗。据不完全统计，已有近20个国家和地区把中国春节定为整体或者所辖部分城市的法定节假日。春节与清明节、端午节、中秋节并称为中国四大传统节日。
          春节民俗经国务院批准列入第一批国家级非物质文化遗产名录。
        </div>
        <div className={`${style.foot} ${style.fixedElement}`}>
          <div className={style.img}>
            <img
              src="https://bing.com/th?id=OHR.ChiesaBianca_ZH-CN4208333975_800x480.jpg&qlt=20"
              alt=""
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Index;
