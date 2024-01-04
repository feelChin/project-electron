import React, { useEffect } from "react";
import Accordion from "./accordionFn";
import style from "./index.module.scss";

function Index() {
  useEffect(() => {
    new Accordion({
      event: "click", //  click  || mouseover
      openMouseout: false, // mouseout
      element: "." + style.accordionHead,
      elementBrother: "." + style.accordionContent,
    });
  }, []);

  return (
    <section className={style.accordion}>
      <div className={style.item}>
        <div className={`${style.accordionHead} `}>苹果</div>
        <div className={style.accordionContent}>
          <div>
            苹果（Malus pumila
            Mill.），蔷薇科苹果属落叶乔木植物，茎干较高，小枝短而粗，呈圆柱形；叶片椭圆形，表面光滑，边缘有锯齿，叶柄粗壮；花朵较小呈伞状，淡粉色，表面有绒毛；果实较大，呈扁球形，果梗短粗；花期5月；果期7~10月
          </div>
        </div>
      </div>
      <div className={style.item}>
        <div className={style.accordionHead}>橘子</div>
        <div className={style.accordionContent}>
          <div>
            柑橘（Citrus reticulata
            Blanco）是芸香科柑橘属小乔木植物，分枝多，刺较少；叶片披针形，椭圆形或阔卵形；花单生或簇生，花柱细长；果实通常为扁圆形，果皮薄而光滑
          </div>
        </div>
      </div>
    </section>
  );
}

export default Index;
