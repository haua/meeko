/* istanbul ignore next */
'use strict'
const Pack = require('./package.json')

/**
 * 返回控制台颜色包裹体
 * 背景色:                          前景色:
 * 40: 黑                          30: 黑
 * 41: 红                          31: 红
 * 42: 绿                          32: 绿
 * 43: 黄                          33: 黄
 * 44: 蓝                          34: 蓝
 * 45: 紫                          35: 紫
 * 46: 深绿                        36: 深绿
 * 47: 白色                        37: 白色
 * @param {int} [fc] 前景色 frontColor， 可选 30-37
 * @param {enum} [dimNum] 设为1高亮度（其实是加粗），设为2或0则无高亮
 * @param {int} [bc] 背景色 backgroundColor，可选 40-47
 * @param {boolean} [isUnderline] 是否有下横线
 * @return {string}
 * */
const cFn = function (fc, dimNum, bc, isUnderline) {
  return `\x1b[0;${isUnderline ? '4;' : ''}${dimNum ? dimNum + ';' : ''}${bc ? bc + ';' : ''}${fc || ''}m`
}

/**
 * @description 控制台控制以及颜色输出
 * @prop {string} [cls] 把光标位置设到0,0，并清屏
 * @prop {function} [xy] 设置光标位置 $.c.xy(0,0)
 * @prop {string} [none] 包裹体结尾符
 * @prop {string} [black] 黑
 * @prop {string} [red] 亮红
 * @prop {string} [green] 亮绿
 * @prop {string} [yellow] 亮黄
 * @prop {string} [blue] 亮蓝
 * @prop {string} [magenta] 亮紫
 * @prop {string} [cyan] 亮深绿
 * @prop {string} [white] 亮白色
 * @prop {string} [dimred] 红
 * @prop {string} [dimgreen] 绿
 * @prop {string} [dimyellow] 黄
 * @prop {string} [dimblue] 蓝
 * @prop {string} [dimmagenta] 紫
 * @prop {string} [dimcyan] 深绿
 * @prop {string} [dimwhite] 白色
 * @prop {function} [r(string,backgroundColor,underLine)] 亮红(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [g(string,backgroundColor,underLine)] 亮绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [y(string,backgroundColor,underLine)] 亮黄(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [b(string,backgroundColor,underLine)] 亮蓝(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [m(string,backgroundColor,underLine)] 亮紫(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [c(string,backgroundColor,underLine)] 亮深绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [w(string,backgroundColor,underLine)] 亮白色(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimr(string,backgroundColor,underLine)] 红(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimg(string,backgroundColor,underLine)] 绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimy(string,backgroundColor,underLine)] 黄(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimb(string,backgroundColor,underLine)] 蓝(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimm(string,backgroundColor,underLine)] 紫(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimc(string,backgroundColor,underLine)] 深绿(字符串，背景色[40-47]，下横线(bool))
 * @prop {function} [dimw(string,backgroundColor,underLine)] 白色(字符串，背景色[40-47]，下横线(bool))
 */
const c = {
  /*
  http://stanislavs.org/helppc/ansi_codes.html
  */
  cls: '\x1b[0;0;H\x1b[0J',
  xy (x, y) {
    return `\x1b[${y};${x};H`
  },
  none: cFn(),
  black: cFn(30, 1),
  red: cFn(31, 1),
  green: cFn(32, 1),
  yellow: cFn(33, 1),
  blue: cFn(34, 1),
  magenta: cFn(35, 1),
  cyan: cFn(36, 1),
  white: cFn(37, 1),
  dimred: cFn(31, 2),
  dimgreen: cFn(32, 2),
  dimyellow: cFn(33, 2),
  dimblue: cFn(34, 2),
  dimmagenta: cFn(35, 2),
  dimcyan: cFn(36, 2),
  dimwhite: cFn(37, 2),
  r (s, bc, u) { return cFn(31, 1, bc, u) + s + cFn() },
  g (s, bc, u) { return cFn(32, 1, bc, u) + s + cFn() },
  y (s, bc, u) { return cFn(33, 1, bc, u) + s + cFn() },
  b (s, bc, u) { return cFn(34, 1, bc, u) + s + cFn() },
  m (s, bc, u) { return cFn(35, 1, bc, u) + s + cFn() },
  c (s, bc, u) { return cFn(36, 1, bc, u) + s + cFn() },
  w (s, bc, u) { return cFn(37, 1, bc, u) + s + cFn() },
  dimr (s, bc, u) { return cFn(31, 2, bc, u) + s + cFn() },
  dimg (s, bc, u) { return cFn(32, 2, bc, u) + s + cFn() },
  dimy (s, bc, u) { return cFn(33, 2, bc, u) + s + cFn() },
  dimb (s, bc, u) { return cFn(34, 2, bc, u) + s + cFn() },
  dimm (s, bc, u) { return cFn(35, 2, bc, u) + s + cFn() },
  dimc (s, bc, u) { return cFn(36, 2, bc, u) + s + cFn() },
  dimw (s, bc, u) { return cFn(37, 2, bc, u) + s + cFn() }
}
/**
 * @description 合并两个对象，与 Object.assign 类似，但只能合并两个
 * @param {object} a a对象，将b对象的可枚举属性复制到此对象，如果a对象已有相同属性，将被覆盖
 * @param {object} b b对象，不会修改此对象
 * @return {object} a对象，此方法并不会生成新对象
 * */
function ext (a, b) {
  if (a && b) {
    for (let item in b) {
      if (!a.hasOwnProperty(item)) {
        a[item] = b[item]
      } else {
        console.log(c.g(item.toUpperCase()), 'ES2015-2020 new method')
      }
    }
    return a
  }
  return null
}
const _s = require('./lib/string')
ext(String.prototype, _s)
const _n = require('./lib/number')
ext(Number.prototype, _n)
const _d = require('./lib/date')
ext(Date.prototype, _d)
const _a = require('./lib/array')
ext(Array.prototype, _a)
let option = {
  logTime: true
}
let _proto_ = {
  a: _a,
  d: _d,
  n: _n,
  s: _s
}
/**
 * @memberof Date_prototype#
 * @param {string} str - 填充字符
 * @param {number} len - 总长度
 * @param {number} pos - 1右面，-1左面
 * @description 给日期前后补充字符串
 * @function fillStr
 * @return {string}
 * @example
 * new Date().fillStr('a', 50)
 * // Tue Dec 29 2015 01:11:01 GMT+0800 (中国标准时间)aa
 */
Date.prototype.fillStr = String.prototype.fillStr  //eslint-disable-line

/**
 * @namespace Buffer_prototype
 * */
/**
 * @memberof Buffer_prototype#
 * @description 合并两个Buffer
 * @function contact
 * @param {Buffer} b 另一Buffer
 * @return {Buffer}
 * @example
 * Buffer.from('123').contact(Buffer.from('456')).toString()
 * // "123456"
 * */
Buffer.prototype.contact = function (b) {
  /*
  utf8 有bom头
  EF BB BF [239 187 191]
  */
  let buf = Buffer.alloc(this.length + b.length)
  this.copy(buf, 0, 0, this.length)
  b.copy(buf, this.length, 0, b.length)
  return buf
}

/**
 * 获取错误堆栈跟踪数据
 * @return string
 * */
const getStackTrace = function () {
  let obj = {}
  Error.captureStackTrace(obj, getStackTrace)
  return obj.stack
}
let os = process.platform
const re = os.includes('win32') ? /\\(.+)\.js:(\d+:\d+)/g : /\/(.+)\.js:(\d+:\d+)/g
const trace = console

/**
 * @param {...mixed[]} args 要打印的参数
 * */
const log = function (...args) {
  getStackTrace().split('\n')[2].match(re)
  let s = c.none + ' [' + c.dimgreen + RegExp.$1 + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']'
  let str = ''
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      str = str + JSON.stringify(args[i]) + ' '
    } else {
      str = str + args[i] + ' '
    }
  }
  trace.log(str + (option.logTime ? s : ''))
  return 1
}
/**
 * @param {...mixed[]} args 要打印的参数
 * */
const err = function (...args) {
  getStackTrace().split('\n')[2].match(re)
  let s = c.none + ' [' + c.dimred + RegExp.$1 + ':' + RegExp.$2 + ' ' + new Date().date2Str().replaceAll('-', '') + c.none + ']'
  let str = ''
  for (let i = 0; i < args.length; i++) {
    if (typeof args[i] === 'object') {
      str = str + JSON.stringify(args[i]) + ' '
    } else {
      str = str + args[i] + ' '
    }
  }
  trace.error(str + (option.logTime ? s : ''))
  return 1
}

function strColor (k, v) {
  if (typeof v === 'function') {
    return (`[function ${k}]`)
  }
  if (Object.prototype.toString.call(v) === '[object RegExp]') {
    return ('#cyan#' + v + '#none#')
  }
  return v
}

/**
 * dir json着色函数.
 * @param {...array<mixed>} args 任何参数
 */
const dir = function (...args) {
  for (let i = 0; i < args.length; i++) {
    let ss = JSON.stringify(args[i], strColor, 4)
    ss = ss.replaceAll('"#cyan#', c.cyan)
      .replaceAll('#none#"', c.none)
      .replace(/"(.+)": /g, c.g('$1') + ': ')
      .replace(/(true)(,|'')\n/g, c.r('$1$2\n'))
      .replace(/(false)(,|'')\n/g, c.r('$1$2\n'))
      .replace(/"(.+)",\n/g, '"' + c.m('$1') + '",\n')
      .replace(/"(.+)"\n/g, '"' + c.m('$1') + '"\n')
      .replace(/([0-9.]+),\n/g, c.y('$1') + ',\n')
      .replace(/([0-9.]+)\n/g, c.y('$1') + '\n')
      .replace(/,\n/g, c.y(',\n'))
      .replace(/("|{|}|[|])/g, c.y('$1'))
    trace.log(ss)
  }
}

/**
 * 返回一个sort函数，用于给对象数组根据某字段排序，类似sql中的order by
 * @param {string} k 排序根据的k
 * @param {enum} dir 可选 desc|asc
 * @return function
 * @example
 * [{ 'name': 'a', lev: 1 }, { name: 'b', lev: 2 }].sort($.compare('lev', 'desc'))
 * // [{ name: 'b', lev: 2 }, { 'name': 'a', lev: 1 }]
 * */
function compare (k, order) {
  return function (a, b) {
    return (order === 'desc') ? (b[k] - a[k]) : (a[k] - b[k]) // ~~(a[k] < b[k]) : ~~(a[k] > b[k])
  }
}

/**
 * setTimeout的promise版
 * @param {int} t 毫秒
 * @return Promise
 * @example
 * await $.wait(5000)
 * */
const wait = function (t) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, t)
  })
}

const math = require('./lib/math')
const tools = require('./lib/tools')
const fake = require('./lib/fake')
const reg = require('./lib/reg')
const tpl = require('./lib/tpl')
const requireAll = require('./lib/requireDir')
let Snowflake = require('./lib/Snowflake.js')
let Spinner = require('./lib/Spinner.js')
let Mock = require('./lib/Mock.js')

/**
 * 把数组里的函数挨个执行，并且把前面函数的返回值传给下一个函数
 * @param {...function[]} [funcs]
 * @return mixed
 * @example
 * $.pipe(arg=>{return arg.push(1)},arg=>{return arg.push(2))([0])
 * // [0,1,2]
 * */
const pipe = (...funcs) => arg => funcs.reduce((p, fn) => fn(p), arg)

/**
 * @description 处理JSON
 * @prop {function} parse 把JSON字符串解析为js对象
 * @prop {function} stringify JSON.stringify的别名
 * */
const json = {
  parse: function (s) { return (Function('return ' + s))() }, // 为了解决key没有双引号
  stringify: JSON.stringify
}

/**
 * new Date 的别名，禁止输入参数
 * @return Date 当前时间
 * */
const now = () => new Date()

/**
 * 画字符串表格，结果会直接打印在控制台
 * @private
 * @param {number[]} colWidth [5,1,3]
 * @example $.drawLine([5,1,3])
 * // +-----+-+---+
 * */
function drawLine (colWidth) {
  let s = ''
  for (let i = 0; i < colWidth.length; i++) {
    s += '+'
    for (let j = 0; j < colWidth[i]; j++) {
      s += '-'
    }
  }
  console.log(s + '+')
}

/**
 * 在控制台绘制表格
 * @param {array} data
 * @param {array} colWidth
 * @param {object} option
 * @example
 * let colWidth = [5, 10, 6]
 * let data = [{ id: 1, b: 'aaa', c: 'cccc1' }, { id: 2, b: true, c: 'cccc2' }, { id: 3, b: 'ccc', c: 'cccc3' }]
 * $.drawTable(data, colWidth)
 * $.drawTable(data, colWidth, { color: 1 })
 * //
 * +-----+----------+------+
 * |ID   |B         |C     |
 * +-----+----------+------+
 * |1    |aaa       |cccc1 |
 * |2    |true      |cccc2 |
 * |3    |ccc       |cccc3 |
 * +-----+----------+------+
 * */
function drawTable (data, colWidth = [], opt = { color: 0 }) {
  let len = data.length
  let s = ''
  let keys = Object.keys(data[0])
  let keysLen = keys.length
  for (let i = 0; i < keysLen; i++) {
    colWidth[i] = colWidth[i] || 15 // 默认的列宽为15
    if (opt.color) {
      s += c.dimg(keys[i].fillStr(' ', colWidth[i]).toUpperCase()) + '|'
    } else {
      s += keys[i].fillStr(' ', colWidth[i]).toUpperCase() + '|'
    }
  }
  drawLine(colWidth)
  console.log('|' + s)
  drawLine(colWidth)
  for (let i = 0; i < len; i++) {
    s = ''
    for (let k = 0; k < keysLen; k++) {
      let v = data[i][keys[k]]
      let valueType = typeof v
      v = v + ''
      if (opt.color) {
        switch (valueType) {
          case 'number':
            s += c.dimy(v.fillStr(' ', colWidth[k])) + '|'
            break
          case 'boolean':
            s += c.dimr(v.fillStr(' ', colWidth[k])) + '|'
            break
          default:
            s += c.dimm(v.fillStr(' ', colWidth[k])) + '|'
        }
      } else {
        s += v.fillStr(' ', colWidth[k]) + '|'
      }
    }
    console.log('|' + s)
  }
  drawLine(colWidth)
}

/**
 * benchmark，性能测试函数.
 * @param {function} fn - 被执行的函数.
 * @param {number} n - 执行次数.
 * @return {string} 返回 [函数名] [执行时间] 毫秒 [每毫秒运行次数]/ms [执行次数] 次.
 * @example
 * let prime = function () { return (641).isPrime() }
 * $.benchmark(prime)
 * // prime     41 毫秒  24390.2439/ms 1e+6 次
 */
let benchmark = function (fn = (function () {}), msg = '', n = 1000000) {
  let t = Date.now()
  for (let i = 0; i < n; i++) {
    fn()
  }
  let diffTime = Date.now() - t
  let spendTime = diffTime + ' ms'
  let perSec = ((n / diffTime * 10000) / 10000 | 0) + ' / ms'
  console.log(c.y((fn.name || '').fillStr(' ', 15)), spendTime.fillStr(' ', 8), perSec.fillStr(' ', 10), n.toExponential() + ' 次', msg)
}
console.log(c.g('✔'), `Meeko (${c.y(Pack.version)}) ${'\x1b[2;4;32m' + 'https://github.com/kongnet/meeko.git' + cFn()}`)
let exportObj = {
  benchmark,
  c,
  compare,
  dir,
  drawTable,
  err,
  ext,
  fake,
  json,
  log,
  math,
  Mock,
  now,
  option,
  pipe,
  reg,
  requireAll,
  Snowflake,
  Spinner,
  tools,
  tpl,
  wait,
  getStackTrace,
  _proto_
}
module.exports = exportObj
