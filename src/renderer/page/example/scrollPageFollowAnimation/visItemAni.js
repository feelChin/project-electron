export default class VisItemAni {
  constructor(content) {
    const clientHeight = document.documentElement.clientHeight;

    this.window = content ? document.querySelector(content) : window;

    const state = {
      clientHeight,
      observer: null,
      current: document.querySelectorAll("[visitem]"),
      config: {
        rootMargin: clientHeight + "px",
        threshold: 0,
      },
      item: [],
    };

    for (let key in state) {
      this[key] = state[key];
    }

    this.init();

    this.window.addEventListener("resize", () => {
      const newClientHeight = document.documentElement.clientHeight;
      this.clientHeight = newClientHeight;
      this.config.rootMargin = newClientHeight + "px";
    });

    this.window.addEventListener(
      "scroll",
      this.throttle(this.handleScroll.bind(this), 10)
    );
  }

  init() {
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const target = entry.target;
        const speed = target.getAttribute("speed") || 2;
        const { top, height } = target.getBoundingClientRect();
        const scrollTop = target.scrollTop;

        const option = {
          target,
          top,
          height,
          scrollTop,
          speed,
          clientHeight: this.clientHeight,
        };

        if (entry.isIntersecting) {
          this.item.push(option);
          this.handleScroll();
        }
      });
    }, this.config);

    this.current.forEach((el) => {
      this.observer.observe(el);
    });
  }

  throttle(fn, delay = 300, props) {
    let lastTime = 0;
    let timer = null;

    let myThrottle = function () {
      const args = [arguments, props];

      const nowTime = Date.now();

      if (nowTime - lastTime > delay) {
        fn.apply(this, args);
        lastTime = nowTime;
      } else {
        timer && clearTimeout(timer);

        timer = setTimeout(() => {
          fn.apply(this, args);
          lastTime = nowTime;
        }, delay);
      }
    };

    return myThrottle;
  }

  setValue(el) {
    const { top, height, scrollTop, speed, clientHeight } = el;

    if (height > clientHeight) {
      return Math.min(
        Math.max((scrollTop - top) / (height - clientHeight), 0) * speed,
        1
      );
    } else {
      return Math.min(
        Math.max(
          ((scrollTop + clientHeight - top) / (clientHeight + height)) * speed,
          0
        ),
        1
      );
    }
  }

  setScrolled(el) {
    const v = this.setValue(el);

    el.target.style.setProperty(`--scrolled`, `${v}`);

    if (v === 1) {
      el.target.classList.add("active");
    }
  }

  handleScroll() {
    if (!this.item.length) {
      return;
    }

    this.item.forEach((el) => {
      el.top = el.target.getBoundingClientRect().top;
      requestAnimationFrame(() => {
        this.setScrolled(el);
      });
    });
  }
}
