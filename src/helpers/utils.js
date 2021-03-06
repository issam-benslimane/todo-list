export function stripPrefix(reg, el) {
  return el.replace(reg, "");
}

export function uniqueId() {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
}

export function toUpper(str) {
  return str.toUpperCase();
}

export function toLower(str) {
  return str.toLowerCase();
}
