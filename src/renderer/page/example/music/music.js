const lrcDisplay = function () {
  //歌词展示   //执行lyc解析
  const lrcUpdate = function (res) {
    let result = parseLyric(res),
      lrcFather = _(".lrc"),
      createul = document.createElement("ul"),
      lineNo = 0, //歌词行数
      MusicListWrapper;

    for (let i = 0; i < result.length; i++) {
      let createli = document.createElement("li");
      createli.innerHTML = result[i].content;
      createul.appendChild(createli);
      createul.className = "createMusicList";
    }
    lrcFather.innerHTML = "";
    lrcFather.append(createul);
    MusicListWrapper = _(".createMusicList");

    // 滚动播放 歌词高亮  增加类名active
    function highLight() {
      let musicList = _$(".createMusicList li");
      let musicListActive;
      for (let i = 0; i < musicList.length; i++) {
        if (i == lineNo) {
          musicList[i].classList.add("active");
          musicListActive = musicList[i];
        } else {
          musicList[i].classList.remove("active");
        }
      }
      let actTop = musicListActive.offsetTop,
        acth = musicListActive.offsetHeight,
        transTop,
        wrapperh = MusicListWrapper.offsetHeight;
      function draw() {
        transTop = -actTop - acth / 2 + wrapperh / 2;
        MusicListWrapper.style.transform =
          `translate3d(0,` + transTop + `px,0)`;
        requestAnimationFrame(draw);
      }
      requestAnimationFrame(draw);
    }
    highLight();

    audio.addEventListener("timeupdate", function () {
      if (lineNo == result.length) {
        lineNo--;
        return;
      }
      lineNo = getLineNo(audio.currentTime);
      highLight();
      lineNo++;
      MusicListWrapper.style.transition = ".3s";
      MusicListWrapper.style.transitionTimingFunction = " ease-in-out";
    });

    function getLineNo(currentTime) {
      // 当快进或者倒退的时候，找到最近的后面那个result[i].time
      if (currentTime >= parseFloat(result[lineNo].time)) {
        // 快进
        for (let i = result.length - 1; i >= lineNo; i--) {
          if (currentTime >= parseFloat(result[i].time)) {
            return i;
          }
        }
      } else {
        // 后退
        for (let i = 0; i <= lineNo; i++) {
          if (currentTime < parseFloat(result[i].time)) {
            return i - 1;
          }
        }
      }
    }

    audio.addEventListener("ended", function () {
      //播放结束重置
      lineNo = 0;
      highLight();
      audio.play();
      MusicListWrapper.style.transition = "0s";
      MusicListWrapper.style.transform = `translate3d(0,0,0)`;
    });
  };
  httpGet("music/music.lrc", function (res) {
    if (res) {
      lrcUpdate(res);
    }
  });
};
