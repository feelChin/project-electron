import React from "react";
import VirtualList from "./virtualList.js";

function Index() {
  function render({ name }) {
    return <div>第{name}条</div>;
  }

  return (
    <VirtualList
      height={50}
      result={Array.from({ length: 100000 }, (_, index) => {
        return { name: index + 1 };
      })}
      row={(props) => render(props)}
      handleScroll={() => {}}
    />
  );
}

export default Index;
