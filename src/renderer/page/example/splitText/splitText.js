export default class SplitText {
  constructor() {
    this.element = document.querySelectorAll("[splitText]");

    this.config = {
      rootMargin: "0px",
      threshold: 0,
    };

    this.setText();
    this.init();
  }

  init() {
    this.observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          item.classList.add("active");

          this.unobserve(item);
        }
      });
    }, this.config);

    this.element.forEach((el) => {
      this.observer.observe(el);
    });
  }

  setText() {
    this.element.forEach((item) => {
      let flag = false,
        delay = parseInt(item.getAttribute("delay")) || 200,
        delayGap = parseInt(item.getAttribute("delayGap")) || 50,
        bool = item.getAttribute("random") || false,
        arr = item.innerHTML
          .replace(/<br>/g, "\n")
          .replace(/<i>/g, "\\")
          .replace(/<\/i>/g, "\t")
          .replace(/&amp;/g, "&")
          .split("");
      item.innerHTML = "";

      arr.forEach((letter, i) => {
        let span = document.createElement("span"),
          random = 1;

        if (letter.indexOf("\n") >= 0) {
          let br = document.createElement("br"),
            fragment = document.createDocumentFragment();
          fragment.appendChild(br);
          item.appendChild(fragment);
          return;
        }
        if (letter.indexOf("\\") >= 0) {
          flag = true;
          return;
        }
        if (letter.indexOf("\t") >= 0) {
          flag = false;
          return;
        }
        if (flag) {
          span.className = "letters";
        }
        if (bool) {
          random = Math.random();
        }
        delay += delayGap;
        span.style.animationDelay = delay * random + "ms";
        span.innerHTML = letter;

        let fragments = document.createDocumentFragment();
        fragments.appendChild(span);
        item.appendChild(fragments);
      });
    });
  }
}
