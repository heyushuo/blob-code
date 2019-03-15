'use strict';
/*
 * @types: 获取元素类型
 * @params: Boolean | Number | String | Function | Array | Date | RegExp | Undefined | Null | Object | Arguments | Error | Window | HTMLDocument | Map | Set | WeakMap
 */
Object.prototype.types = function () {
  var toString = Object.prototype.toString;
  var map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Symbol]': 'symbol',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
    '[object Arguments]': 'arguments',
    '[object Error]': 'error',
    '[object Window]': 'window',
    '[object HTMLDocument]': 'document',
    '[object Map]': 'map',
    '[object Set]': 'set',
    '[object WeakMap]': 'weakMap'
  };
  console.log(this);
  var el = this instanceof Element ? 'element' : map[toString.call(this)];
  return el;
};

/*
 * @aFn: ES5数组API简单封装
 * @params: Array, String, Function
 */
var aFn = function (array, type, fn) {
  return !fn ? array : Array.prototype[type]['call'](array, fn);
};

/*
 * @css: 获取CSS的值
 * @params: {attr: String, value: String}
 */
Object.prototype.css = function (attr, value) {
  var GROUP = function () {
    for (var prop in attr) {
      if (attr.hasOwnProperty(prop)) {
        if (this.length > 1) {
          aFn(this, 'forEach', function (e, i, a) {
            e.style[prop] = attr[prop]
          })
        } else {
          this.style[prop] = attr[prop]
        }
      }
    }
  }.bind(this);
  if (this.length > 1) {
    if (value) {
      aFn(this, 'forEach', function (e, i, a) {
        e.style[attr] = value
      })
    }
  } else {
    this.style[attr] = value
  };
  if (attr.types() === 'object') {
    GROUP();
  };
  if (attr.types() === 'string') {
    if (this.length > 1) {
      aFn(this, 'map', function (e, i, a) {
        return getComputedStyle(e, false)[attr];
      })
    } else {
      getComputedStyle(this, false)[attr]
    };
  };
  if (!value) {
    return getComputedStyle(this, false)[attr];
  } else {
    return this;
  };
};

/*
 * @siblings: 获取兄弟节点
 * @param: Function
 */
Object.prototype.siblings = function (fn) {
  var DomArr = [];
  var __self = this
  var MATCHED = aFn(this.parentNode.childNodes, 'filter', function (e, i, a) {
    return (e !== __self) && (e.nodeType === 1) && (e.nodeName !== 'SCRIPT');
  })
  fn && aFn(MATCHED, 'forEach', fn)
  return MATCHED;
};

/*
 * @offset: 获取dom节点偏移距离
 */
Object.prototype.getOffset = function () {
  var scrollTop = this.getBoundingClientRect().top + document.body.scrollTop + document.documentElement.scrollTop;
  var scrollLeft = this.getBoundingClientRect().left + document.body.scrollLeft + document.documentElement.scrollLeft;
  return {
    top: scrollTop,
    left: scrollLeft
  };
};

/*
 * @hasClass: 判断是否有类名
 * @params: String
 */
Object.prototype.hasClass = function (cls) {
  if (this.types() === 'array' || this.length > 0) {
    return aFn(this, 'map', function (e, i, a) {
      return e.classList ? e.classList.contains(cls) : new RegExp('(^| )' + cls + '( |$)', 'gi').test(e.className);
    });
  } else {
    return this.classList ? this.classList.contains(cls) : new RegExp('(^| )' + cls + '( |$)', 'gi').test(this.className);
  };
};

/*
 * @addClass: 添加类名
 * @params: String
 */
Object.prototype.addClass = function (cls) {
  if (this.types() === 'array' || this.length > 0) {
    aFn(this, 'forEach', function (e, i, a) {
      e.classList ? e.classList.add(cls) : e.className += ' ' + cls;
    });
  } else {
    this.classList ? this.classList.add(cls) : this.className += ' ' + cls;
  };
  return this;
};

/*
 * @removeClass: 添加类名
 * @params: String
 */
Object.prototype.removeClass = function (cls) {
  if (this.types() === 'array' || this.length > 0) {
    aFn(this, 'forEach', function (e, i, a) {
      e.classList ? e.classList.remove(cls) : className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
    });
  } else {
    this.classList ? this.classList.remove(cls) : className.replace(new RegExp('(^|\\b)' + cls.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
  };
  return this;
};

/*
 * @log: 打印JS信息
 * @params: 所有类型
 */
var log = console.log.bind(console);

/*
 * @dom: 获取dom节点
 * @param: String
 */
var dom = function (el) {
  var __dom;
  var types = {
    'document': function () {
      return el;
    },
    'window': function () {
      return el;
    },
    'element': function () {
      return el;
    },
    'string': function () {
      var ISROOT = (el === 'body' || el === 'html')
      var ISTAG = document.getElementsByTagName(el).length > 0;
      var ISARR = document.querySelectorAll(el).length > 1;
      return ISROOT ? document.getElementsByTagName(el)[0] : (ISTAG ? document.getElementsByTagName(el) : (ISARR ? document.querySelectorAll(el) : document.querySelector(el)));
    }
  };
  return types[el.types()]();
};


/*
 * @RAF: 如果浏览器支持requestAnimFrame则使用requestAnimFrame否则使用setTimeout
 * param: Function
 */
var RAF = (function () {
  return window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    function (cb) {
      window.setTimeout(cb, 1000 / 60);
    };
})();


const IS_NUMBER = /^[+]{0,1}(\d+)$|^[+]{0,1}(\d+\.\d+)$/; //是否是数字
const isInteger = /^\+?[1-9][0-9]*$/; //是否是正整数
const isInteger = /^-?\\d+$/; //是否是整数
const isChinese = /^[\u4e00-\u9fa5]+(·[\u4e00-\u9fa5]+)*$/; //是否是汉字
const IS_PHONE = /^$|^1[3456789]\d{9}$/; //手机号
const IS_IDCARD = /^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/; //身份证
const isiOS = navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
const isAndroid = navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
const isWX = navigator.userAgent.indexOf('MicroMessenger') > -1;


export function scrollTop(el, from = 0, to, duration = 500, endCallback) {
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      window.msRequestAnimationFrame ||
      function (callback) {
        return window.setTimeout(callback, 1000 / 60);
      }
    );
  }
  //需用滚动的距离
  const difference = Math.abs(from - to);
  //速度
  const step = Math.ceil(difference / duration * 50);

  function scroll(start, end, step) {
    if (start === end) {
      endCallback && endCallback();
      return;
    }
    //移动的距离
    let d = (start + step > end) ? end : start + step;
    //开始
    if (start > end) {
      d = (start - step < end) ? end : start - step;
    }

    if (el === window) {
      window.scrollTo(d, d);
    } else {
      el.scrollTop = d;
    }
    window.requestAnimationFrame(() => scroll(d, end, step));
  }
  scroll(from, to, step);
}

//总共剩余2000秒
//毫秒倒计时
var sys_second=60000;
var str="";
function setHeight(){
	if(sys_second>=0){
		var day = Math.floor((sys_second / 3600000) / 24);
		var hour = Math.floor((sys_second / 3600000) % 24);
		var minute = Math.floor((sys_second / 60000) % 60);
		var second = Math.floor((sys_second /1000)%60);
		
		hour=day*24+hour;
		if(hour==0){
			hour="0";
		}
		if(minute<10){
			minute="0"+minute;
		}
		if(second<10){
			second="0"+second;
		}
		 str=hour+"小时"+minute+"分钟"+second+"秒";
		 console.log(sys_second)
		$("#box").html(str);
		sys_second=sys_second-1000;
	}
}
setHeight()
setInterval('setHeight()',1000);




//秒倒计时
var  second11=50;
function add(){
if(second11>=0){
		var day = Math.floor((second11 / 3600) / 24);
		var hour = Math.floor((second11 / 3600) % 24);
		var minute = Math.floor((second11 / 60) % 60);
		var second = Math.floor(second11 % 60);
		hour=day*24+hour;
		if(hour==0){
			hour="0";
		}
		if(minute<10){
			minute="0"+minute;
		}
		if(second<10){
			second="0"+second;
		}
		var str=hour+"小时"+minute+"分钟"+second+"秒";
		$("#box1").html(str)
		second11=second11-1;
	}
}