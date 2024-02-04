import React from "react";
import CustonScrollTheme from "./custonScrollTheme";

function Index() {
  return (
    <div
      style={{
        width: "80%",
        fontSize: 0,
        background: "var(--white6)",
      }}
    >
      <CustonScrollTheme height={160} barHeight={50}>
        <div
          style={{
            lineHeight: 6,
            color: "var(--black)",
          }}
        >
          <div>君不见，黄河之水天上来，奔流到海不复回。</div>
          <div>君不见，高堂明镜悲白发，朝如青丝暮成雪。</div>
          <div>
            人生得意须尽欢，莫使金樽空对月。 天生我材必有用，千金散尽还复来。
          </div>
          <div>
            烹羊宰牛且为乐，会须一饮三百杯。 岑夫子，丹丘生，将进酒，杯莫停。
          </div>
          <div>
            与君歌一曲，请君为我倾耳听。 钟鼓馔玉不足贵，但愿长醉不愿醒。
          </div>
          <div>
            古来圣贤皆寂寞，惟有饮者留其名。 陈王昔时宴平乐，斗酒十千恣欢谑。
          </div>
          <div> 主人何为言少钱，径须沽取对君酌。</div>
          <div>五花马，千金裘，呼儿将出换美酒，与尔同销万古愁。</div>
        </div>
      </CustonScrollTheme>
    </div>
  );
}

export default Index;
