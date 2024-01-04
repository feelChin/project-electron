import React, { useEffect, useRef, useState } from "react";
// import PlateKeyboard from "./music";
import avatar from "./0.jpg";
import useThrottle from "@hook/useThrottle";
import musicLrc from "./musiclrc";
import musicSrc from "./music.mp3";
import style from "./index.module.scss";

function Index() {
  const [menuState, setMenuState] = useState(true);
  const [time, setTime] = useState({
    line: 0,
  });
  const [lyric, setLyric] = useState({
    result: parseLyric(musicLrc),
    row: 0,
    height: 30,
  });

  const audioRef = useRef();
  const lrcRef = useRef();

  const throttleTime = useThrottle(updateTime, 10);

  // 渲染时间
  function render_time(time) {
    // 歌曲时间计算
    if (time < 60) {
      return (time = "00" + ":" + time.toString().padStart(2, "0"));
    }
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const second = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return (time = minutes + ":" + second);
  }

  // 更新时间
  function updateTime() {
    const currentTime = Math.floor(audioRef.current.currentTime);
    const line = (currentTime / audioRef.current.duration) * 100;

    setTime({
      ...time,
      now: render_time(currentTime),
      line,
    });

    // 更新歌词行为
    const { row, result } = lyric;

    if (row == result.length) {
      row--;
      return;
    }
    setLyric({
      ...lyric,
      row: getRow(currentTime),
    });

    highLight();
  }

  //解析歌词
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
          let time = playTimeArr[j]
            .substring(1, playTimeArr[j].indexOf("]"))
            .split(":");
          if (String(lineLyric).substr(1) !== "") {
            result.push({
              time: (parseInt(time[0]) * 60 + parseFloat(time[1])).toFixed(4),
              content: String(lineLyric).substr(1),
            });
          }
        }
      }
    }
    return result;
  }

  //渲染歌词
  function render_lrc() {
    return lyric.result.map(({ time, content }, index) => (
      <div
        className={`${style.item} ${index === lyric.row ? style.active : ""}`}
        style={{ height: lyric.height }}
        key={time}
      >
        {content}
      </div>
    ));
  }

  function highLight() {
    const { row, height } = lyric;

    const activeRowHeight = row * height;
    const h = lrcRef.current.offsetHeight;

    function draw() {
      lrcRef.current.style.transform =
        `translate3d(0,` + (-activeRowHeight + h / 2) + `px,0)`;
    }
    requestAnimationFrame(draw);

    if (!lrcRef.current.classList.contains(style.active)) {
      lrcRef.current.classList.add(style.active);
    }
  }

  // 获得歌词进度行
  function getRow(currentTime) {
    const { result, row } = lyric;

    // 当快进或者倒退的时候，找到最近的后面那个
    if (currentTime >= parseFloat(result[row].time)) {
      // 快进
      for (let i = result.length - 1; i >= row; i--) {
        if (currentTime >= parseFloat(result[i].time)) {
          return i;
        }
      }
    } else {
      // 后退
      for (let i = 0; i <= row; i++) {
        if (currentTime < parseFloat(result[i].time)) {
          return i - 1;
        }
      }
    }
  }

  useEffect(() => {
    audioRef.current.load();
    audioRef.current.addEventListener("canplay", function () {
      // 音乐可以播放时
      if (!time.end) {
        setTime({
          ...time,
          end: render_time(audioRef.current.duration),
        });
      }
    });

    //音乐播放时
    audioRef.current.addEventListener("timeupdate", throttleTime);

    //播放结束重置
    audioRef.current.addEventListener("ended", function () {
      setLyric({
        ...lyric,
        row: 0,
      });
      highLight();
      audioRef.current.play();
      lrcRef.current.classList.remove(style.active);
    });
  }, []);

  useEffect(() => {
    !menuState ? audioRef.current.play() : audioRef.current.pause();
  }, [menuState]);

  return (
    <section className={style.music}>
      <audio ref={audioRef} src={musicSrc} />
      <div className={style.avatar}>
        <img src={avatar} alt="" />
        <div className={style.control}>
          <div
            className={`${style.menu} ${menuState ? style.play : style.pause}`}
            onClick={() => {
              setMenuState(!menuState);
            }}
          ></div>
          <div className={style.start_tiem}>{time.now || "00:00"}</div>
          <div
            onClick={(e) => {
              let w = e.target.offsetWidth;
              let rect = e.target.getBoundingClientRect();

              let x = (e.clientX - rect.left) / w;

              audioRef.current.currentTime = x * audioRef.current.duration;

              setTime({
                ...time,
                now: render_time(Math.floor(x * audioRef.current.duration)),
                line: x * 100,
              });

              if (menuState) {
                setMenuState(false);
              }
            }}
            className={style.line}
            style={{
              "--line": time.line,
            }}
          ></div>
          <div className={style.end_tiem}>{time.end || "00:00"}</div>
        </div>
      </div>
      <div className={style.lrcWrapper}>
        <div className={style.lrc} ref={lrcRef}>
          {render_lrc()}
        </div>
      </div>
    </section>
  );
}

export default Index;
