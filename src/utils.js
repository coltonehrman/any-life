export function stripExtraSpace(string) {
  return string.replace(/^ +/gm, "");
}

export function stripExtraNewLines(string) {
  return string.replace(/^\n{2,}/gm, "\n");
}

export const html = (strings, ...values) =>
  String.raw({ raw: strings }, ...values);

export const css = (strings, ...values) =>
  String.raw({ raw: strings }, ...values);

export const escapeHtml = (unsafe) =>
  unsafe
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

export function removeCircularReferences(obj, seen = new WeakSet()) {
  if (obj && typeof obj === "object") {
    if (seen.has(obj)) {
      return undefined; // Circular reference found, remove it
    }
    seen.add(obj);

    if (Array.isArray(obj)) {
      return obj.map((item) => removeCircularReferences(item, seen));
    } else {
      const newObj = {};
      for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          newObj[key] = removeCircularReferences(obj[key], seen);
        }
      }
      return newObj;
    }
  }
  return obj;
}