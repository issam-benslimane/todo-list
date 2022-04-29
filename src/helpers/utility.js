export function createElement(type, options = {}) {
  const el = document.createElement(type);
  for (const [key, value] of Object.entries(options)) {
    if (key === "text") el.textContent = value;
    else el.setAttribute(key, value);
  }
  return el;
}

export function randomId() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export function transitionEnded(el) {
  return new Promise((res) => {
    el.addEventListener("transitionend", res);
  });
}
