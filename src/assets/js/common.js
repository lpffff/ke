window.Util = {
  ht: location.host.split(".")[1],
  // user: (function () {
  //     var user = "";
  //     $.ajax({
  //         url: '/do.php?act=user&method=info',
  //         async: false,
  //         success: function (d) {
  //             user = d;
  //             //授权验证
  //             var auths = [
  //                 '/user/',
  //                 '/user/clip.html',
  //                 '/user/coupon.html',
  //                 '/user/course.html',
  //                 '/user/curriculum.html',
  //                 '/user/feedback.html',
  //                 '/user/index.html',
  //                 '/user/order.html',
  //                 '/user/profile.html',
  //                 //'/user/recommond.html',
  //                 '/user/wallet.html',
  //                 '/user/free-class.html',
  //                 '/user/recommond-menbers.html'
  //             ];
  //             if (auths.indexOf(location.pathname) > -1 && d.status != 0) {
  //                 location.href = '/login.html';
  //             }
  //         }
  //     });
  //     return user;
  // })(),
  isWX: /MicroMessenger/i.test(navigator.userAgent),
  wxShare: function(opt) {
    opt = {
      title: "",
      desc: "",
      link: "",
      imgUrl: ""
    };
    //TODO share.js
  },
  getCookie: function(name) {
    var arr,
      reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if ((arr = document.cookie.match(reg))) return unescape(arr[2]);
    else return null;
  },
  setCookie: function(name, value, day) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + day);
    document.cookie =
      name +
      "=" +
      escape(value) +
      (day == null ? "" : ";expires=" + exdate.toGMTString()) +
      ";path=/;domain=." +
      this.ht +
      ".com";
  },
  delCookie: function(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = this.getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  getPar: function(par) {
    return this.getQueryStringByName(document.location.href, par);
    /* 对parse_type截取有bug，暂时注释
        //获取当前URL
        var local_url = document.location.href;
        //获取要取得的get参数位置
        var get = local_url.indexOf(par +"=");
        if(get == -1){
            return false;
        }
        //截取字符串
        var get_par = local_url.slice(par.length + get + 1);
        //判断截取后的字符串是否还有其他get参数
        var nextPar = get_par.indexOf("&");
        var nextjin = get_par.indexOf("#");

        if(nextPar != -1){
            get_par = get_par.slice(0, nextPar);
        }else if(nextjin != -1){
            get_par = get_par.slice(0, nextjin);
        }
        return get_par;
        */
  },
  getQueryStringByName: function(url, name) {
    url = url.replace(/&amp;/gi, "&");
    var result = url.match(new RegExp("[?&]" + name + "=([^&]+)", "i"));
    if (result == null || result.length < 1) {
      return "";
    }
    return result[1];
  },
  checkmail: function(m) {
    //检查邮箱
    return /^\w+\@[\.A-Za-z0-9]+\.[A-Za-z0-9]+$/.test(m);
  },
  districtArray: function(array) {
    //数组 去重
    var result = [];
    for (var i in array) {
      if (result.indexOf(array[i]) == -1 && array[i] != "") {
        result[i] = array[i];
      }
    }
    return result;
  },
  extractDomain: function(url) {
    var domain;
    //find & remove protocol (http, ftp, etc.) and get domain
    if (url.indexOf("://") > -1) {
      domain = url.split("/")[2];
    } else {
      domain = url.split("/")[0];
    }
    //find & remove port number
    domain = domain.split(":")[0];
    return domain;
  },
  isCrossDomin: function(d1, d2) {
    return d1 != this.extractDomain(d2);
  },
  dataFmt: function(date, fmt) {
    var o = {
      "M+": date.getMonth() + 1, //月份
      "d+": date.getDate(), //日
      "h+": date.getHours(), //小时
      "m+": date.getMinutes(), //分
      "s+": date.getSeconds(), //秒
      "q+": Math.floor((date.getMonth() + 3) / 3), //季度
      S: date.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (date.getFullYear() + "").substr(4 - RegExp.$1.length)
      );
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt))
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ("00" + o[k]).substr(("" + o[k]).length)
        );
    return fmt;
  },
  alertInfo: function(msg, url) {
    alert(msg);
    location.href = url;
  },
};
window.Util.isApp = (function() {
  return (
    Util.getPar("devicetype") == 1 ||
    Util.getPar("devicetype") == 2 ||
    (typeof JS != "undefined" && typeof JS.isAPP != "undefined")
  );
})();
window.shSDK = {
  conf: {
    //host: 'http://www.' + Util.ht + '.com/',//宿主
    host: "/", //宿主
    api: "api.php",
    action: "do.php"
  },
  cache: {}, //ajax缓存
  request: function(fix, act, method, callback, reqData, ajaxOpts) {
    var ajaxSettings = {
      ...ajaxOpts,
      isCross: false,
      isCache: false, //是否ajax缓存（默认不缓存）*这个跟ajax配置中chace参数不是一回事儿
      async: true, //是否异步（默认异步）
      type: "GET" //请求方式（默认GET方式）*jsonp就是get方式（设置为post无效），而且是异步请求数据
    },
    dataType = "json",
    isCross = ajaxSettings.isCross;
    key = act + "-" + method; //ajax缓存键值：act + method + hash
    if (ajaxSettings.isCache) {
      if (ajaxSettings.hash) {
        key += "-" + ajaxSettings.hash;
      }
    } else {
      key += "-" + +new Date();
    }
    if (!this.cache[key]) {
      if (isCross && ajaxSettings.type.toLocaleUpperCase() == "GET") {
        dataType = "jsonp";
      }
      var ajaxOpt = {
        url: this.conf.host + fix + "?act=" + act + "&method=" + method,
        data: reqData,
        dataType: dataType
      };
      if (ajaxSettings.type.toLocaleUpperCase() == "POST") {
        ajaxOpt.type = "POST";
        if (isCross) {
          ajaxOpt.xhrFields = { withCredentials: true };
        }
      }

      if (!ajaxSettings.async) {
        ajaxOpt.async = false;
      }
      this.cache[key] = $.ajax(ajaxOpt);
    }
    this.cache[key].done(callback).fail(function(xhr, errorType, error) {
      console.log(
        xhr.status + "|" + xhr.readyState + "|" + errorType + "|" + error
      );
    });
  },
  api: function(act, method, callback, reqData, ajaxOpts) {
    this.request(this.conf.api, act, method, callback, reqData, ajaxOpts);
  },
  action: function(act, method, callback, reqData, ajaxOpts) {
    this.request(this.conf.action, act, method, callback, reqData, ajaxOpts);
  }
};
// $.fn.serializeObject = function () {
//     var obj = {};
//     $.each(this.serializeArray(), function (index, param) {
//         if (!(param.name in obj)) {
//             obj[param.name] = param.value;
//         }
//     });
//     return obj;
// };
