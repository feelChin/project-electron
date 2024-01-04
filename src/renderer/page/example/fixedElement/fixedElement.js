export default function intersectionObserversNodeTransFixed(
  node,
  flag = "fixedElementChild"
) {
  const config = {
    rootMargin: "0px",
    threshold: 0,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((item) => {
      const el = item.target;
      const child = el.children[0];
      let { height } = el.getBoundingClientRect();

      if (item.isIntersecting) {
        el.style.height = height + "px";

        child.classList.add(flag);
        followArrow;
        window.addEventListener("resize", function () {
          el.style.height = "auto";
          child.classList.remove(flag);
          setTimeout(() => {
            nodeHeight = el.getBoundingClientRect().height;
            el.style.height = nodeHeight + "px";
          });
        });
      } else {
        el.style.height = "auto";
        child.classList.remove(flag);
      }
    });
  }, config);

  node.forEach((el) => {
    observer.observe(el);
  });
}
