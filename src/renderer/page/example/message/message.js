import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom/client";
import "./message.scss";

let add,
  element,
  reactFiber,
  maxCount = 5,
  timeout = 3000;

const _seed = () => {
  const time = Date.now();
  return time + (Math.random() * time).toFixed();
};

const _init = () => {
  return new Promise((resolve) => {
    if (!element) {
      element = document.createElement("div");
      element.className = "customMessage";
      element.style.setProperty("--time", timeout / 1000 - 0.5 + "s");
      document.body.appendChild(element);
      reactFiber = ReactDOM.createRoot(element);

      reactFiber.render(<RenderMessage resolve={resolve} />);
    } else {
      resolve();
    }
  });
};

function RenderMessage(props) {
  const { resolve } = props;

  const [notices, setNotices] = useState([]);

  function remove(notice) {
    const { key } = notice;

    setNotices((prevNotices) =>
      prevNotices.filter(({ key: itemKey }) => key !== itemKey)
    );
  }

  add = (notice) => {
    setNotices((prevNotices) => [...prevNotices, notice]);

    setTimeout(() => {
      remove(notice);
    }, timeout);
  };

  useEffect(() => {
    resolve();

    if (notices.length > maxCount) {
      const [firstNotice] = notices;

      remove(firstNotice);
    }
  }, [notices]);

  return (
    <>
      {notices.map((item) => (
        <MessageChild {...item} />
      ))}
    </>
  );
}

function MessageChild(props) {
  const { text, type } = props;

  return (
    <div className="message">
      <div className={`icon ${type}`}></div>
      <div className="text">{text}</div>
    </div>
  );
}

export default {
  success: async (text) => {
    await _init();

    add({
      text,
      key: _seed(),
      type: "success",
    });
  },
  error: async (text) => {
    await _init();

    add({
      text,
      key: _seed(),
      type: "error",
    });
  },
};
