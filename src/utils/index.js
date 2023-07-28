export function formatTime(timestamp, format = "Y-M-D H:m:s") {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");

  let formattedTime = format.replace(/Y+/, year);
  formattedTime = formattedTime.replace(/M+/, month);
  formattedTime = formattedTime.replace(/D+/, day);
  formattedTime = formattedTime.replace(/H+/, hours);
  formattedTime = formattedTime.replace(/m+/, minutes);
  formattedTime = formattedTime.replace(/s+/, seconds);

  return formattedTime;
}

export function friendlyDate(time) {
  if (time instanceof Date) {
    return getFriendlyDate(time.getTime());
  }
  time = new Date(time);
  if (isNaN(time.getTime())) {
    return "";
  }
  return getFriendlyDate(time.getTime());
}

function getFriendlyDate(timestamp) {
  var formats = {
    year: "%n% 年前",
    month: "%n% 个月前",
    day: "%n% 天前",
    hour: "%n% 小时前",
    minute: "%n% 分钟前",
    second: "%n% 秒前",
  };

  var now = Date.now();
  var seconds = Math.floor((now - timestamp) / 1000);
  var minutes = Math.floor(seconds / 60);
  var hours = Math.floor(minutes / 60);
  var days = Math.floor(hours / 24);
  var months = Math.floor(days / 30);
  var years = Math.floor(months / 12);

  var diffType = "";
  var diffValue = 0;
  if (years > 0) {
    diffType = "year";
    diffValue = years;
  } else {
    if (months > 0) {
      diffType = "month";
      diffValue = months;
    } else {
      if (days > 0) {
        diffType = "day";
        diffValue = days;
      } else {
        if (hours > 0) {
          diffType = "hour";
          diffValue = hours;
        } else {
          if (minutes > 0) {
            diffType = "minute";
            diffValue = minutes;
          } else {
            diffType = "second";
            // 可能是负数
            diffValue = seconds <= 0 ? (seconds = 1) : seconds;
          }
        }
      }
    }
  }
  return formats[diffType].replace("%n%", diffValue);
}

// 防抖
export function debounce(fn, duration = 500) {
  let timeId;
  return function (...args) {
    clearTimeout(timeId);
    timeId = setTimeout(() => {
      fn.apply(this, args);
    }, duration);
  };
}

// 节流
// 定时器方式
export function throttle(fn, duration = 500) {
  let timeId;
  return function (...args) {
    if (!timeId) {
      timeId = setTimeout(() => {
        timeId = null;
        fn.apply(this, args);
      }, duration);
    }
  };
}
