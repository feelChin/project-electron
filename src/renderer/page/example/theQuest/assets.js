import wyvern from "./images/wyvern.png";
import fishbone from "./images/fishbone.png";
import wheat from "./images/wheat.png";
import winged from "./images/winged-sword.png";
import mermaid from "./images/mermaid.png";
import fairy from "./images/fairy.png";
import ghost from "./images/ghost.png";

const data = [
  {
    id: 1,
    url: wyvern,
  },
  {
    id: 2,
    url: fishbone,
  },
  {
    id: 3,
    url: wheat,
  },
  {
    id: 4,
    url: winged,
  },
  {
    id: 5,
    url: mermaid,
  },
  {
    id: 6,
    url: fairy,
  },
  {
    id: 7,
    url: ghost,
  },
];

const renderAssetsFill = (num) => {
  const loop = new Array(num * 3).fill("");
  const arr = [];
  for (let item in data) {
    loop.forEach(() => {
      arr.push(data[item]);
    });
  }

  function* draw(cards) {
    const c = [...cards];

    for (let i = c.length; i > 0; i--) {
      const pIdx = Math.floor(Math.random() * i);
      [c[pIdx], c[i - 1]] = [c[i - 1], c[pIdx]];
      yield c[i - 1];
    }
  }

  const result = [...draw(arr)];

  const otherLeft = result.slice(0, 8);
  const otherRight = result.slice(8, 16);

  result.splice(0, 16);

  return {
    data,
    result,
    otherLeft,
    otherRight,
  };
};

export default renderAssetsFill;
