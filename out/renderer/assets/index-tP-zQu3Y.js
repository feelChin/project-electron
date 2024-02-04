import { r as reactExports, R as React } from "./index-n8_yRRwO.js";
import { I as Index$1 } from "./index-1q_ssJMQ.js";
const avatar$1 = "" + new URL("0-_kTINhb-.jpg", import.meta.url).href;
const musicLrc = `[ti:童年]
[ar:罗大佑]
[al:童年]
[by:]
[offset:0]
[00:00.00]童年 - 罗大佑
[00:04.97]词：罗大佑
[00:09.94]曲：罗大佑
[00:15.90]池塘边的榕树上
[00:18.66]知了在声声叫着夏天
[00:24.04]操场边的秋千上
[00:27.08]只有蝴蝶停在上面
[00:31.78]黑板上老师的粉笔
[00:34.69]还在拼命叽叽喳喳写个不停
[00:40.01]等待着下课等待着放学
[00:44.19]等待游戏的童年
[00:50.86]福利社里面什么都有
[00:54.00]就是口袋里没有半毛钱
[00:59.10]诸葛四郎和魔鬼党
[01:02.27]到底谁抢到那支宝剑
[01:06.85]隔壁班的那个女孩
[01:09.61]怎么还没经过我的窗前
[01:15.08]嘴里的零食手里的漫画
[01:19.24]心里初恋的童年
[01:23.84]总是要等到睡觉前
[01:26.66]才知道功课只做了一点点
[01:32.09]总是要等到考试以后
[01:34.91]才知道该念的书都没有念
[01:39.86]一寸光阴一寸金
[01:42.33]老师说过寸金难买寸光阴
[01:48.16]一天又一天一年又一年
[01:52.23]迷迷糊糊的童年
[02:34.03]没有人知道为什么
[02:36.87]太阳总下到山的那一边
[02:42.27]没有人能够告诉我
[02:45.11]山里面有没有住着神仙
[02:50.03]多少的日子里总是
[02:52.86]一个人面对着天空发呆
[02:58.36]就这么好奇就这么幻想
[03:02.43]这么孤单的童年
[03:09.07]阳光下蜻蜓飞过来
[03:11.92]一片片绿油油的稻田
[03:17.34]水彩蜡笔和万花筒
[03:20.19]画不出天边那一条彩虹
[03:25.09]什么时候才能像高年级的同学
[03:28.70]有张成熟与长大的脸
[03:33.26]盼望着假期盼望着明天
[03:37.40]盼望长大的童年
[03:41.60]一天又一天一年又一年
[03:45.69]盼望长大的童年`;
const musicSrc = "" + new URL("music-KdvkGsS7.mp3", import.meta.url).href;
const music = "_music_ftz2o_1";
const avatar = "_avatar_ftz2o_9";
const control = "_control_ftz2o_24";
const menu = "_menu_ftz2o_34";
const play = "_play_ftz2o_41";
const pause = "_pause_ftz2o_50";
const line = "_line_ftz2o_64";
const lrcWrapper = "_lrcWrapper_ftz2o_80";
const lrc = "_lrc_ftz2o_80";
const active = "_active_ftz2o_96";
const item = "_item_ftz2o_100";
const style = {
  music,
  avatar,
  control,
  menu,
  play,
  pause,
  line,
  lrcWrapper,
  lrc,
  active,
  item
};
function Index() {
  const [menuState, setMenuState] = reactExports.useState(true);
  const [time, setTime] = reactExports.useState({
    line: 0
  });
  const [lyric, setLyric] = reactExports.useState({
    result: parseLyric(musicLrc),
    row: 0,
    height: 30
  });
  const audioRef = reactExports.useRef();
  const lrcRef = reactExports.useRef();
  const throttleTime = Index$1(updateTime, 10);
  function render_time(time2) {
    if (time2 < 60) {
      return time2 = "00:" + time2.toString().padStart(2, "0");
    }
    const minutes = Math.floor(time2 / 60).toString().padStart(2, "0");
    const second = Math.floor(time2 % 60).toString().padStart(2, "0");
    return time2 = minutes + ":" + second;
  }
  function updateTime() {
    const currentTime = Math.floor(audioRef.current.currentTime);
    const line2 = currentTime / audioRef.current.duration * 100;
    setTime({
      ...time,
      now: render_time(currentTime),
      line: line2
    });
    const {
      row,
      result
    } = lyric;
    if (row == result.length) {
      row--;
      return;
    }
    setLyric({
      ...lyric,
      row: getRow(currentTime)
    });
    highLight();
  }
  function parseLyric(text) {
    let lyricArr = text.split("\n");
    let result = [];
    for (let i = 0; i < lyricArr.length; i++) {
      let playTimeArr = lyricArr[i].match(/\[\d{2}:\d{2}((\.|\:)\d{2})\]/g);
      let lineLyric = "";
      if (lyricArr[i].split(playTimeArr).length > 0) {
        lineLyric = lyricArr[i].split(playTimeArr);
      }
      if (playTimeArr != null) {
        for (let j = 0; j < playTimeArr.length; j++) {
          let time2 = playTimeArr[j].substring(1, playTimeArr[j].indexOf("]")).split(":");
          if (String(lineLyric).substr(1) !== "") {
            result.push({
              time: (parseInt(time2[0]) * 60 + parseFloat(time2[1])).toFixed(4),
              content: String(lineLyric).substr(1)
            });
          }
        }
      }
    }
    return result;
  }
  function render_lrc() {
    return lyric.result.map(({
      time: time2,
      content
    }, index) => /* @__PURE__ */ React.createElement("div", {
      className: `${style.item} ${index === lyric.row ? style.active : ""}`,
      style: {
        height: lyric.height
      },
      key: time2
    }, content));
  }
  function highLight() {
    const {
      row,
      height
    } = lyric;
    const activeRowHeight = row * height;
    const h = lrcRef.current.offsetHeight;
    function draw() {
      lrcRef.current.style.transform = `translate3d(0,` + (-activeRowHeight + h / 2) + `px,0)`;
    }
    requestAnimationFrame(draw);
    if (!lrcRef.current.classList.contains(style.active)) {
      lrcRef.current.classList.add(style.active);
    }
  }
  function getRow(currentTime) {
    const {
      result,
      row
    } = lyric;
    if (currentTime >= parseFloat(result[row].time)) {
      for (let i = result.length - 1; i >= row; i--) {
        if (currentTime >= parseFloat(result[i].time)) {
          return i;
        }
      }
    } else {
      for (let i = 0; i <= row; i++) {
        if (currentTime < parseFloat(result[i].time)) {
          return i - 1;
        }
      }
    }
  }
  reactExports.useEffect(() => {
    audioRef.current.load();
    audioRef.current.addEventListener("canplay", function() {
      if (!time.end) {
        setTime({
          ...time,
          end: render_time(audioRef.current.duration)
        });
      }
    });
    audioRef.current.addEventListener("timeupdate", throttleTime);
    audioRef.current.addEventListener("ended", function() {
      setLyric({
        ...lyric,
        row: 0
      });
      highLight();
      audioRef.current.play();
      lrcRef.current.classList.remove(style.active);
    });
  }, []);
  reactExports.useEffect(() => {
    !menuState ? audioRef.current.play() : audioRef.current.pause();
  }, [menuState]);
  return /* @__PURE__ */ React.createElement("section", {
    className: style.music
  }, /* @__PURE__ */ React.createElement("audio", {
    ref: audioRef,
    src: musicSrc
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.avatar
  }, /* @__PURE__ */ React.createElement("img", {
    src: avatar$1,
    alt: ""
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.control
  }, /* @__PURE__ */ React.createElement("div", {
    className: `${style.menu} ${menuState ? style.play : style.pause}`,
    onClick: () => {
      setMenuState(!menuState);
    }
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.start_tiem
  }, time.now || "00:00"), /* @__PURE__ */ React.createElement("div", {
    onClick: (e) => {
      let w = e.target.offsetWidth;
      let rect = e.target.getBoundingClientRect();
      let x = (e.clientX - rect.left) / w;
      audioRef.current.currentTime = x * audioRef.current.duration;
      setTime({
        ...time,
        now: render_time(Math.floor(x * audioRef.current.duration)),
        line: x * 100
      });
      if (menuState) {
        setMenuState(false);
      }
    },
    className: style.line,
    style: {
      "--line": time.line
    }
  }), /* @__PURE__ */ React.createElement("div", {
    className: style.end_tiem
  }, time.end || "00:00"))), /* @__PURE__ */ React.createElement("div", {
    className: style.lrcWrapper
  }, /* @__PURE__ */ React.createElement("div", {
    className: style.lrc,
    ref: lrcRef
  }, render_lrc())));
}
export {
  Index as default
};
