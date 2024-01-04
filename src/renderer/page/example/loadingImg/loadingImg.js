export default class LoadingImg {
  constructor() {
    this.config = {
      rootMargin: "0px",
      threshold: 0,
    };

    this.init();
  }
  init() {
    this.observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;

          img.src = img.dataset.src;
          img.removeAttribute("data-src");

          this.unobserve(img);
        }
      });
    }, this.config);

    document.querySelectorAll("[data-src]").forEach((el) => {
      this.observer.observe(el);
    });
  }
}
