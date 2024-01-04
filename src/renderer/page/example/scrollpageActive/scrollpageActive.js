export default class ScrollpageActive {
  constructor({ title, page }) {
    this.title = [...document.querySelectorAll("." + title)].filter((item) =>
      item.getAttribute("id")
    );
    this.page = document.querySelectorAll("." + page);

    this.config = {
      rootMargin: "0px",
      threshold: 0.2,
    };

    this.observer();

    document
      .querySelector("." + title)
      .parentNode.addEventListener("click", (e) => {
        let target = e.target;

        while (target != document.body) {
          if (!target.parentNode) return;

          if (target.classList.contains(title)) {
            let index = target.getAttribute("id");

            if (!index) {
              index = target.children[1].getAttribute("id");
            }

            this.page[index].scrollIntoView({
              behavior: "smooth",
            });
            break;
          }

          target = target.parentNode;
        }
      });
  }

  setClass(key) {
    this.title.forEach((el) => {
      el.classList.remove("active");
    });
    this.title[key].classList.add("active");
  }

  observer() {
    let result = [];

    this.ob = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          result.push(entry.target);
        } else {
          result = result.filter((item) => item !== entry.target);
        }
      });

      const item = result[0];
      const key = item.getAttribute("id");
      this.setClass(key);
    }, this.config);

    this.page.forEach((el) => {
      this.ob.observe(el);
    });
  }
}
