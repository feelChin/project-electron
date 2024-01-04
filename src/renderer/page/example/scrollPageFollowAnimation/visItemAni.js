export default class VisItemAni {
  constructor({ content }) {
    const clientHeight = document.documentElement.clientHeight;

    this.theScrollWrapper = document.querySelector(content) || window;

    const state = {
      clientHeight,
      observer: null,
      current: document.querySelectorAll("[visitem]"),
      config: {
        rootMargin: clientHeight + "px",
        threshold: 0,
      },
    };

    for (let key in state) {
      this[key] = state[key];
    }

    this.init();
    this.handleScroll = this.handleScroll.bind(this);

    this.theScrollWrapper.addEventListener("resize", () => {
      const newClientHeight = document.documentElement.clientHeight;
      this.clientHeight = newClientHeight;
      this.config.rootMargin = newClientHeight + "px";
    });
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
          const handleScroll = () => {
            this.handleScroll(option);
          };

          this.theScrollWrapper.addEventListener("resize", handleScroll);
          this.theScrollWrapper.addEventListener("scroll", handleScroll);
          handleScroll();
        }
      });
    }, this.config);

    this.current.forEach((el) => {
      this.observer.observe(el);
    });
  }

  setValue(option) {
    const { top, height, scrollTop, speed, clientHeight } = option;

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

  setScrolled(option) {
    option.target.style.setProperty(`--scrolled`, `${this.setValue(option)}`);
  }

  handleScroll(option) {
    option.top = option.target.getBoundingClientRect().top;
    requestAnimationFrame(() => {
      this.setScrolled(option);
    });
  }
}
