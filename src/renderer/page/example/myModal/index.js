import React, { useState } from "react";
import Modal from "./modal";
import style from "./index.module.scss";

function Index() {
  const [visible, setVisible] = useState(false);
  const [visible_, setVisible_] = useState(false);

  const option = {
    width: 300,
    height: 200,
    visible,
    close: () => {
      setVisible(false);
    },
    children: (
      <div className={style.modal}>
        <button
          className={style.menu}
          onClick={() => {
            option.close();
          }}
        >
          关闭
        </button>
        <button
          className={style.menu}
          onClick={() => {
            setVisible(false);
            setTimeout(() => {
              setVisible_(true);
            }, 300);
          }}
        >
          打开第二个
        </button>
      </div>
    ),
  };

  return (
    <div>
      <button
        className={style.menu}
        onClick={() => {
          setVisible(true);
        }}
      >
        Modal
      </button>
      <button
        className={style.menu}
        onClick={async () => {
          await Modal.create({
            content: (
              <div className={style.modal}>
                <div
                  className={style.menu}
                  onClick={() => {
                    Modal.cancel();
                  }}
                >
                  关闭
                </div>
                <div
                  className={style.menu}
                  onClick={() => {
                    Modal.next();
                  }}
                >
                  下一个
                </div>
              </div>
            ),
          });
          await Modal.create({
            width: 300,
            height: 300,
            content: (
              <div className={style.modal}>
                <div
                  className={style.menu}
                  onClick={() => {
                    Modal.next();
                  }}
                >
                  继续下一个
                </div>
                <div
                  className={style.menu}
                  onClick={() => {
                    Modal.cancel();
                  }}
                >
                  关闭
                </div>
              </div>
            ),
          });
          await Modal.create({
            width: 400,
            height: 400,
            content: (
              <div className={style.modal}>
                <div
                  className={style.menu}
                  onClick={() => {
                    Modal.cancel();
                  }}
                >
                  没有了
                </div>
              </div>
            ),
          });
        }}
      >
        Modal.create
      </button>
      <Modal {...option} />
      <OtherModal
        visible_={visible_}
        setVisible_={(bool) => {
          setVisible_(bool);
        }}
      />
    </div>
  );
}

function OtherModal({ visible_, setVisible_ }) {
  const option = {
    width: 300,
    height: 200,
    visible: visible_,
    close: () => {
      setVisible_(false);
    },
    children: (
      <div className={style.modal}>
        <button
          className={style.menu}
          onClick={() => {
            option.close();
          }}
        >
          关闭
        </button>
      </div>
    ),
  };

  return <Modal {...option} />;
}

export default Index;
