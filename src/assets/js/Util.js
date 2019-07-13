Number.prototype.addPreZero = function() {
  return (this < 10 ? "0" : "") + this;
};

String.prototype.addPreZero = function() {
  return (this < 10 ? "0" : "") + this;
};
const Util = {
  ht: location.host.split(".")[1]
};
function secondToDate(s) {
  var h = Math.floor(s / 3600).addPreZero(),
    m = Math.floor((s / 60) % 60).addPreZero();
  return h + ":" + m;
}
function getCookie(name) {
  var arr = [],
    reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
  if (arr == document.cookie.match(reg)) {
    return unescape(arr[2]);
  } else {
    return null;
  }
}
function setCookie(name, value, day) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + day);
  document.cookie =
    name +
    "=" +
    escape(value) +
    (day == null ? "" : ";expires=" + exdate.toGMTString()) +
    ";path=/;domain=." +
    Util.ht +
    ".com";
}
function delCookie(name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
function getLessonTtTime(course_time, tt_id) {
  var tt_time = null;
  tt_time = course_time + (tt_id - 1) * 1800;
  return tt_time;
}
function getDate(time) {
  var Y = new Date(time).getFullYear().addPreZero(),
    M = new Date(time).getMonth().addPreZero(),
    d = new Date(time).getDate().addPreZero(),
    H = new Date(time).getHours().addPreZero(),
    m = new Date(time).getMinutes().addPreZero(),
    s = new Date(time).getSeconds().addPreZero(),
    D = new Date(time).getDay().addPreZero();
  return { Y, M, d, H, m, s, D };
}
function htmlspecialchars(str) {
  var s = "";
  if (str.length == 0) return "";
  for (var i = 0; i < str.length; i++) {
    switch (str.substr(i, 1)) {
      case "<":
        s += "&lt;";
        break;
      case ">":
        s += "&gt;";
        break;
      case "&":
        s += "&amp;";
        break;
      case " ":
        if (str.substr(i + 1, 1) == " ") {
          s += " &nbsp;";
          i++;
        } else s += " ";
        break;
      case '"':
        s += "&quot;";
        break;
      case "\n":
        s += "<br>";
        break;
      default:
        s += str.substr(i, 1);
        break;
    }
  }
  return s;
}
function htmlspecialchars_decode(str) {
  str = str.replace(/&amp;/g, "&");
  str = str.replace(/&lt;/g, "<");
  str = str.replace(/&gt;/g, ">");
  str = str.replace(/&quot;/g, "");
  str = str.replace(/&#039;/g, "'");
  return str;
}
// element：dom元素
// to：滚动到哪个位置
// duration: 动画时长
// window
function scrollToTop(element, to, duration) {
  if (duration <= 0) return;
  const diff = to - element.scrollY;
  let winScrollTop = element.scrollY;
  let total = 0;
  const perTick = (diff / duration) * 10;
  scroll(perTick);
  function scroll(perTick) {
    winScrollTop += perTick;
    total += perTick;
    element.scrollTo(0, winScrollTop);
    if (total >= diff) {
      clearTimeout(timer);
      return;
    } 
    let timer = setTimeout(function(){scroll(perTick)}, 3);
  }
}
// 防抖
function debounce(fn, wait) {    
  var timeout = null;    
  return function() {        
      if(timeout !== null)   clearTimeout(timeout);        
      timeout = setTimeout(fn, wait);    
  }
}
// 节流throttle代码（时间戳+定时器）：
var throttle = function (func, delay) {
  var timer = null;     
  var startTime = Date.now();     
  return function() {             
      var curTime = Date.now();             
      var remaining = delay - (curTime - startTime);             
      var context = this;             
      var args = arguments;             
      clearTimeout(timer); 
      if (remaining <= 0) {                    
          func.apply(context, args);                    
          startTime = Date.now();              
      } else {                    
          timer = setTimeout(func, remaining);              
      }      
  }
}
export {
  debounce,
  throttle,
  Util,
  secondToDate,
  getCookie,
  setCookie,
  delCookie,
  getLessonTtTime,
  getDate,
  htmlspecialchars,
  htmlspecialchars_decode,
  scrollToTop,
  
};
