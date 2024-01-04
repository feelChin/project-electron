export default function entrust(element, callback) {
  const body = document.body;

  const _event = (e) => {
    let target = e.target;

    while (target != body) {
      if (!target.parentNode) return;

      const entrust = target.getAttribute("entrust");

      if (entrust === element) {
        callback(target);
        break;
      }

      target = target.parentNode;
    }
  };

  body.addEventListener("click", _event);
}
