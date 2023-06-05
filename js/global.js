const $ = (x) => document.querySelectorAll(x);
const $$ = (x) => document.querySelectorAll(x);

$.add = (el) => {
  document.body.appendChild(el);
};
$.remove = (el) => {
  el.remove();
};

HTMLElement.prototype.hide = function () {
  this.style.visibility = "hidden";
};
HTMLElement.prototype.show = function () {
  this.style.display = "";
  this.style.visibility = "visible";
};
HTMLElement.prototype.none = function () {
  this.style.display = "none";
};
HTMLElement.prototype.in = function () {
  this.style.display = "unset";
};

$.Width = window.innerHeight;
HTMLElement.prototype.fadeIn = function (node) {
  this.style.animation = "opr 1s";
};
HTMLElement.prototype.fadeOut = function (node) {
  this.style.animation = "op 1s";
};

HTMLElement.prototype.clone = function () {
  return this.cloneNode(true);
};

HTMLElement.prototype.on = function (x, y) {
  this.addEventListener(x, y, false);
};

function Copy(x) {
  var a = document.createElement("textarea");
  a.value = x;
  a.style.border = "none";
  a.style.opacity = "0.0";
  a.style.position = "absolute";
  a.style.width = "0.1px";
  a.style.height = "0.1px";
  a.style.fontSize = "0.1px";
  a.id = "textarea";
  $.add(a);
  a.select();
  a.setSelectionRange(0, 99999);
  document.execCommand("copy");
  a.blur();
  a.remove();
}
function deepClone(obj) {
  let clone = {};
  for (let i in obj) {
    if (obj[i] != null && typeof obj[i] == "object") clone[i] = clone(obj[i]);
    else clone[i] = obj[i];
  }
  return clone;
}
function isLight(color) {
  const hex = color.replace("#", "");
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  return brightness > 155;
}
function className(def = "", ...args) {
  return def + " " + args.join(" ");
}
function hexLighter(color, amount) {
  amount = isLight(color) ? -amount : amount + 5;
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)
        ).substr(-2)
      )
  );
}

function loadFont({ name, file }) {
  return new FontFace(name, `url(${file})`).load();
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const totalMinutes = Math.floor(totalSeconds / 60);
  const totalHours = Math.floor(totalMinutes / 60);
  const totalDays = Math.floor(totalHours / 24);
  const totalMonths = Math.floor(totalDays / 30);
  const totalYears = Math.floor(totalMonths / 12);

  if (totalYears > 0) {
    const remainderMonths = totalMonths % 12;
    return `${totalYears} year${
      totalYears !== 1 ? "s" : ""
    }, ${remainderMonths} month${remainderMonths !== 1 ? "s" : ""}`;
  }
  if (totalMonths > 0) {
    const remainderDays = totalDays % 30;
    return `${totalMonths} month${
      totalMonths !== 1 ? "s" : ""
    }, ${remainderDays} day${remainderDays !== 1 ? "s" : ""}`;
  }
  if (totalDays > 0) {
    const remainderHours = totalHours % 24;
    return `${totalDays} day${
      totalDays !== 1 ? "s" : ""
    }, ${remainderHours} hour${remainderHours !== 1 ? "s" : ""}`;
  }
  if (totalHours > 0) {
    const remainderMinutes = totalMinutes % 60;
    return `${totalHours} hour${
      totalHours !== 1 ? "s" : ""
    }, ${remainderMinutes} minute${remainderMinutes !== 1 ? "s" : ""}`;
  }
  const remainderSeconds = totalSeconds % 60;
  return `${totalMinutes} minute${
    totalMinutes !== 1 ? "s" : ""
  }, ${remainderSeconds} second${remainderSeconds !== 1 ? "s" : ""}`;
}
function objectToQueryString(url, obj) {
  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(obj)) {
    params.append(key, value);
  }
  const queryString = params.toString();
  if (queryString) {
    return url.includes("?")
      ? `${url}&${queryString}`
      : `${url}?${queryString}`;
  } else {
    return url;
  }
}
function textToTime(text) {
  let timestamp = text.split(":");
  let seconds = 0;
  if (timestamp.length == 3) {
    seconds =
      Number(timestamp[0]) * 3600 +
      Number(timestamp[1]) * 60 +
      Number(timestamp[2]);
  } else {
    seconds = Number(timestamp[0]) * 60 + Number(timestamp[1]);
  }
  return seconds;
}
function moveTo(elm,url) {
  const currentUrl = new URL(url);
  const searchParams = new URLSearchParams(currentUrl.search);
  searchParams.append("t", textToTime(elm.innerText));
  currentUrl.search = searchParams;
  window.open(currentUrl);
}
