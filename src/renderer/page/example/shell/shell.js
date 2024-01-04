class Color {
  constructor(option) {
    this.startColor = option[0];
    this.endColor = option[1];
  }
  init() {
    return this.gradientColors(this.startColor, this.endColor, 100)[
      this.calculateDanage(0, 99)
    ];
  }

  parseColor(hexStr) {
    return hexStr.length === 4
      ? hexStr
          .substr(1)
          .split("")
          .map(function (s) {
            return 0x11 * parseInt(s, 16);
          })
      : [hexStr.substr(1, 2), hexStr.substr(3, 2), hexStr.substr(5, 2)].map(
          function (s) {
            return parseInt(s, 16);
          }
        );
  }

  pad(s) {
    return s.length === 1 ? "0" + s : s;
  }

  gradientColors(start, end, steps, gamma) {
    let i,
      j,
      ms,
      me,
      output = [],
      so = [];
    gamma = gamma || 1;
    let normalize = function (channel) {
      return Math.pow(channel / 255, gamma);
    };
    start = this.parseColor(start).map(normalize);
    end = this.parseColor(end).map(normalize);
    for (let i = 0; i < steps; i++) {
      ms = i / (steps - 1);
      me = 1 - ms;
      for (let j = 0; j < 3; j++) {
        so[j] = this.pad(
          Math.round(
            Math.pow(start[j] * me + end[j] * ms, 1 / gamma) * 255
          ).toString(16)
        );
      }
      output.push("#" + so.join(""));
    }
    return output;
  }

  calculateDanage(min, max) {
    return Math.max(Math.floor(Math.random() * max) + 1, min);
  }
}

export default class Shell {
  constructor(data = ["#333", "#f3f3f3"]) {
    this.data = data;
    this.element = document.querySelectorAll("[shell]");
    this.config = {
      rootMargin: "0px",
      threshold: 0,
    };

    this.init();
  }

  init() {
    if (!!window.ActiveXObject || "ActiveXObject" in window) {
      this.element.forEach((el) => {
        el.classList.add("isIe");
      });
      return;
    }

    const color = this.data;

    this.observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const target = entry.target;

          target.style.setProperty("--bg", new Color(color).init());
          target.classList.add("active");

          const elReset = () => {
            target.classList.add("reset");
            target.removeEventListener("transitionend", elReset);
          };

          target.addEventListener("transitionend", elReset);

          this.unobserve(target);
        }
      });
    }, this.config);

    this.element.forEach((el) => {
      this.observer.observe(el);
    });
  }
}
