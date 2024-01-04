export default class Aninum {
  constructor({ start, end, delay, element }) {
    this.pool = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    this.start = start;
    this.end = end;
    this.delay = delay;

    this.element = document.querySelector(element);
    this.element.innerHTML = this.start > this.end ? this.start : this.end;

    const { width, height } = getComputedStyle(this.element);

    this.element_width = width;
    this.element.style.width = width;
    this.element_height = height;
    this.element.style.height = height;

    this.init();
    this.compute();
    this.animationEnd();
  }

  init() {
    let space_key = String(this.start).length - String(this.end).length;
    let zero = "0".repeat(Math.abs(space_key));

    if (space_key !== 0 && space_key > 0) {
      this.end = zero + this.end;
    } else {
      this.start = zero + this.start;
    }

    this.start_arr = String(this.start).split("");
    this.end_arr = String(this.end).split("");
  }

  compute() {
    let result = "";

    this.start_arr.forEach((start_key, index) => {
      const end_key = Number(this.end_arr[index]);

      let html = "";
      let render_arr = "";

      if (end_key > start_key) {
        render_arr = this.pool.slice(start_key, end_key + 1);
      }
      if (end_key < start_key) {
        render_arr = this.pool
          .slice(start_key)
          .concat(this.pool.slice(0, end_key + 1));
      }
      if (end_key == start_key) {
        render_arr = [end_key];
      }

      render_arr.forEach((item) => {
        html += `<i>${item}</i>`;
      });

      result += `<div class="num_ani_item" style="width:${
        100 / this.start_arr.length
      }%;"><div class="num_ani_item_wrapper" style="--num:${
        render_arr.length - 1
      };--h:${this.element_height};--delay:${
        this.delay * index + 1
      }">${html}</div ></div >`;
    });

    this.element.innerHTML = result;
  }

  animationEnd() {
    this.aniEndKey = 0;

    this.fn = () => {
      this.aniEndKey++;
      if (this.aniEndKey == this.end_arr.length) {
        this.element.removeAttribute("style");
        this.element.innerHTML = Number(this.end);
        this.element.removeEventListener("animationend", this.fn);
      }
    };

    this.element.addEventListener("animationend", this.fn);
  }

  unload() {
    this.element.removeAttribute("style");
    this.element.innerHTML = Number(this.end);
    this.element.removeEventListener("animationend", this.fn);
  }
}
