export default class ImgToVideo {
  constructor(imagesLength, imgModule, element, scrollElement) {
    this.imagesLength = imagesLength;
    this.imgModule = imgModule.sort(
      (a, b) => a.match(/\d+/)[0] - b.match(/\d+/)[0]
    );
    this.element = element;
    this.scrollElement = scrollElement;

    this.canvas = element.querySelector("canvas");
    this.context = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;

    this.imagesManager = [];
    this.scrollIndex = 0; // 当前滚动进度待显示的图片索引值
    this.scrolled = 0; // 当前滚动进度待显示的图片百分比
    this.currentIndex = 0; // 当前显示的图片索引值

    this.init();
  }

  init() {
    this.scrollElement.addEventListener("scroll", this.handleScroll.bind(this));
    this.loadImages();
  }

  async loadImages() {
    let _promise = (url) => {
      return new Promise((resolve) => {
        const img = new Image();

        img.src = url;

        img.onload = () => {
          this.imagesManager.push(img);
          resolve(img);
        };
      });
    };

    const promise = this.imgModule.map((i) => _promise(i));

    await Promise.all(promise);

    this.draw();
  }

  handleScroll() {
    const clientHeight = document.body.clientHeight;
    const scrollHeight = this.element.scrollHeight;

    const { top } = this.element.getBoundingClientRect();
    // 根据滚动距离，等比例算出应该滚动到第几张图
    this.scrollIndex = Math.round((-top * 42) / (scrollHeight - clientHeight));
    this.scrolled = Math.min(
      Math.max(-top / (scrollHeight - clientHeight), 0),
      1
    );

    if (this.scrollIndex >= 42) {
      this.scrollIndex = 42;
    }

    if (this.scrollIndex <= 0) {
      this.scrollIndex = 0;
    }

    this.run();
  }

  run() {
    this.raf = requestAnimationFrame(this.draw.bind(this));
  }

  draw() {
    if (this.currentIndex <= this.scrollIndex) {
      this.drawImages(this.imagesManager[this.currentIndex]);
      this.currentIndex + 1 < this.scrollIndex && this.currentIndex++;
    } else if (this.currentIndex >= this.scrollIndex) {
      this.drawImages(this.imagesManager[this.currentIndex]);
      this.currentIndex - 1 > this.scrollIndex && this.currentIndex--;
    }
  }

  drawImages(img) {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.context.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
  }
}
