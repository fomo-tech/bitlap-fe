

export function isDesktop() {
  return window.innerWidth > 1024;
}
export function betCondition(transaction: any) {
  if (transaction.bet_condition === "up") {
    return "Mua";
  }
  if (transaction.bet_condition === "down") {
    return "Bán";
  }
}
export function formatTime(minutes: number, seconds: number) {
  minutes = Math.max(0, Math.floor(minutes));
  seconds = Math.max(0, Math.floor(seconds));

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(seconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

export function formatDecimalNotRound(
  t: any,
  e: string = "",
  n: number = 6,
  a: boolean = true
) {
  const value = parseFloat(t.toString().replace(",", "") || 0).toFixed(8);
  const parts = value.split(".");

  if (parts.length === 1) {
    if (a) {
      let zeros = "";
      for (let i = 0; i < n; i++) {
        zeros += "0";
      }
      return parts[0] ? parts[0] + "." + zeros : Number(parts[0]);
    }
    return Number(parts[0]);
  }

  if (a) {
    let decimalPart = parts[1];
    if (decimalPart.length < n) {
      const zerosToAdd = n - decimalPart.length;
      for (let i = 0; i < zerosToAdd; i++) {
        decimalPart += "0";
      }
      return parts[0] + "." + decimalPart.substr(0, n);
    }
    return parts[0] + "." + decimalPart.substr(0, n);
  }

  return Number(parts[0] + "." + parts[1].substr(0, n));
}

export function getDeviceInfo() {
  return {
    deviceHeight: window.innerHeight,
    deviceWidth: window.innerWidth,
    deviceVersion: getDeviceVersion(),
  };
}

export function getDeviceVersion() {
  return window.innerWidth > 1024
    ? "pc"
    : window.innerWidth <= 1024 && window.innerWidth >= 576
    ? window.innerHeight < 576
      ? "mobile-landscape"
      : "tablet"
    : 90 === window.orientation
    ? "mobile-landscape"
    : "mobile";
}
export function isMobile() {
  return !isDesktop();
}
export function setClassNameCondition(
  ifTrue: any,
  classTrue: any,
  classFalse: any,
  initClass = ""
) {
  return initClass + " " + (ifTrue ? classTrue : classFalse);
}

