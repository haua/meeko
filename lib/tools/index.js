'use strict'
// tools库扩展
let getType = Object.prototype.toString
let tools = {
  getType (o) {
    return getType.call(o).split(' ')[1].split(']')[0]
  },
  isObj (o) {
    return getType.call(o) === '[object Object]'
  },
  isObject (o) {
    return getType.call(o) === '[object Object]'
  },
  isString (o) {
    return getType.call(o) === '[object String]'
  },
  isNumber (o) {
    return getType.call(o) === '[object Number]'
  },
  isBigInt (o) {
    return getType.call(o) === '[object BigInt]'
  },
  isArray (o) {
    return getType.call(o) === '[object Array]'
  },
  isNull (o) {
    return getType.call(o) === '[object Null]'
  },
  isUndefined (o) {
    return getType.call(o) === '[object Undefined]'
  },
  isRegExp (o) {
    return getType.call(o) === '[object RegExp]'
  },
  isBoolean (o) {
    return getType.call(o) === '[object Boolean]'
  },
  isPInt (o) {
    var g = /^[1-9]*[1-9][0-9]*$/
    return g.test(o)
  },
  isNInt (o) {
    var g = /^-[1-9]*[1-9][0-9]*$/
    return g.test(o)
  },
  isInt (o) {
    var g = /^-?\d+$/
    return g.test(o)
  },
  isDecimal (o) {
    return !isNaN(o)
  },
  isBool (s) {
    let b = ['0', '1', 'true', 'false'].indexOf((s + '').toLow()) >= 0
    return this.isBoolean(s) || b
  },
  isDate (o) {
    let s = String(o)
    let b = s.indexOf('-') > 0 || s.indexOf('/') > 0
    return this.getType(o) === 'Date' || (b && !isNaN(Date.parse(o)))
  }
}
tools.ifObjEmpty = function (o, ex) { // 判断对象是否为空,ex是需要排除的数据数组
  ex = ex || []
  for (let i in o) {
    if (ex.includes(i)) {
      continue
    } else {
      return !1
    }
  }
  return !0
}
tools.jsonPack = function (obj, order) { // 数组相同属性的元素,属性合并成第一个数组元素
  let len = obj.length
  let a = []
  for (let prop in obj[0]) {
    a.push(prop)
  }
  if (order === 1) {
    a.sort()
  }
  let ret = []
  ret.push(a)
  let pLen = a.length
  for (let i = 0; i < len; i++) {
    let _arr = []
    for (let j = 0; j < pLen; j++) {
      let key = a[j]
      _arr.push(obj[i][key])
    }
    ret.push(_arr)
  }
  return ret
}
tools.copy = function (o) { // 复制对象
  return JSON.parse(JSON.stringify(o))
}
tools.uuid = function (len, radix) { // 返回多位随机字符
  let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('')
  let uuid = []
  let i
  radix = radix || chars.length
  if (len) {
    // Compact form
    for (i = 0; i < len; i++) {
      uuid[i] = chars[0 | Math.random() * radix]
    }
  } else {
    // rfc4122, version 4 form
    let r
    // rfc4122 requires these characters
    uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-'
    uuid[14] = '4'
    // Fill in random data.  At i==19 set the high bits of clock sequence as
    // per rfc4122, sec. 4.1.5
    for (i = 0; i < 36; i++) {
      if (!uuid[i]) {
        r = 0 | Math.random() * 16
        uuid[i] = chars[i === 19 ? r & 0x3 | 0x8 : r]
      }
    }
  }
  return uuid.join('')
}
tools.wait = function (t) { // promise停止n秒
  return function (cb) {
    setTimeout(cb, t)
  }
}
tools.rnd = function (a, b) { // 返回a,b之间的整数
  return Math.round(Math.random() * (b - a)) + a
}
tools.timeAgo = function (t1, t2) { // 两个时间差 中文显示函数
  let [ r, n, dt ] = [null, 0, new Date(t2) - new Date(t1)]
  const a = ['年', 60 * 60 * 24 * 365,
    '个月', 60 * 60 * 24 * 30,
    '天', 60 * 60 * 24,
    '小时', 60 * 60,
    '分钟', 60,
    '秒', 1] // ymdhms格式
  a.some((item, idx) => {
    n = Math.abs(dt) / a[idx * 2 + 1] / 1000
    if (n >= 1) {
      r = ~~n + a[idx * 2] + '前后'.split('')[dt > 0 ? 0 : 1]
      return 1
    }
  })
  return dt === 0 ? '刚刚' : r
}

tools.checkParam = function (a, b) { // 检查两个对象是否符合参数要求
  // NOTICE : 0的问题
  let c = {}
  let _n
  // 类型判断函数
  let typeCheck = function (i, valA, valB, addToC) {
    addToC = !(addToC === false) // 默认为true
    switch ((valB.type || 'string').toLow()) {
      case 'int':
        _n = valA === 0 ? 0 : (valA || valB.def)
        if (!tools.isInt(_n + '')) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为整型'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'positive':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isInt(_n + '') || _n <= 0) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为正数'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'negative':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isInt(_n + '') || _n >= 0) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为负数'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'string':
        _n = valA === '' ? '' : String(valA || '') || valB.def
        addToC && (c[i] = _n)
        if (valA && valB.size) {
          let len = valA.len()
          if (len < valB.size[0] || len > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 长度有误'
            }
          }
        }
        if (valA && valB.reg) {
          if (!(new RegExp(valB.reg).test(valA))) {
            return {
              code: 401,
              msg: valB.err || (valB.name || i) + ' 格式有误'
            }
          }
        }

        break
      case 'datetime':
        // TODO : ie 需要补一个 toISOString 函数
        _n = valA || valB.def
        if (!tools.isDate(_n + '')) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为日期型'
          }
        }
        addToC && (c[i] = _n)
        break
      case 'bool':
        if (tools.isBoolean(valA)) {
          addToC && (c[i] = valA)
          break
        }
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isBool(_n)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误，,应为布尔型 ' + _n
          }
        }
        addToC && (c[i] = _n)
        break
      case 'number':
        _n = valA === 0 ? 0 : valA || valB.def
        if (!tools.isDecimal(_n + '')) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为数值型'
          }
        }
        addToC && (c[i] = +_n)
        if (valA && valB.size) {
          if (c[i] < valB.size[0] || c[i] > valB.size[1]) {
            return {
              code: 401,
              msg: (valB.name || i) + ' 范围有误'
            }
          }
        }
        break
      case 'array': // 支持数组
        if (!(valA instanceof Array)) {
          return {
            code: 401,
            msg: (valB.name || i) + ' 类型错误,应为数组型'
          }
        }
        // 如果是数组，可以为它配置items的类型： arrayParam1:{type:'array',items:{type:'string'}}
        for (let j = 0; j < valA.length; j++) {
          const result = typeCheck(i, valA[j], valB.items || {}, false)
          if (result && result.code >= 400) {
            return result
          }
        }
        addToC && (c[i] = valA)
        break
      default:
        return {
          code: 500,
          msg: '参数类型定义错误'
        }
    }
  }
  for (let i in b) {
    if (b[i].req === 1) {
      if (!a[i]) {
        return {
          code: 401,
          msg: b[i].reqErr || ((b[i].name || i) + ' 必填')
        }
      } else {
        let r = typeCheck(i, a[i], b[i])
        if (r) return r
      }
    } else {
      if (a[i] === undefined) {
        c[i] = a[i] || b[i].def
        if (c[i] === null || c[i] === undefined) { delete c[i] }
      } else {
        let r = typeCheck(i, a[i], b[i])
        if (r) return r
      }
    }
  }
  return {
    code: 200,
    msg: '',
    data: c
  }
}

let utf8 = {
  encode (s) {
    var r = ''
    var len = s.length
    var fromCode = String.fromCharCode
    for (var n = 0; n < len; n++) {
      var c = s.charCodeAt(n)
      if (c < 128) {
        r += fromCode(c)
      } else if (c > 127 && c < 2048) {
        r += fromCode(c >> 6 | 192)
        r += fromCode(c & 63 | 128)
      } else {
        r += fromCode(c >> 12 | 224)
        r += fromCode(c >> 6 & 63 | 128)
        r += fromCode(c & 63 | 128)
      }
    }
    return r
  },
  decode (s) {
    var r = ''
    var i = 0
    var c1 = 0
    var c2 = 0
    var c3 = 0
    var fromCode = String.fromCharCode
    while (i < s.length) {
      c1 = s.charCodeAt(i)
      if (c1 < 128) {
        r += fromCode(c1)
        i++
      } else if (c1 > 191 && c1 < 224) {
        c2 = s.charCodeAt(i + 1)
        r += fromCode((c1 & 31) << 6 | c2 & 63)
        i += 2
      } else {
        c2 = s.charCodeAt(i + 1)
        c3 = s.charCodeAt(i + 2)
        r += fromCode((c1 & 15) << 12 | (c2 & 63) << 6 | c3 & 63)
        i += 3
      }
    }
    return r
  }
}
tools.utf8 = utf8
let lzw = {
  compress (str) {
    var fromCode = String.fromCharCode
    var rStr = ''
    rStr = utf8.encode(str)
    var size = 0
    var xstr = ''
    var chars = 256
    var dict = []
    for (let i = 0; i < chars; i++) {
      dict[String(i)] = i
    }
    var splitted = []
    splitted = rStr.split('')
    var buffer = []
    size = splitted.length
    var current = ''
    var r = ''
    for (let i = 0; i <= size; i++) {
      current = String(splitted[i])
      xstr = buffer.length === 0 ? String(current.charCodeAt(0)) : buffer.join('-') + '-' + String(current.charCodeAt(0))
      if (dict[xstr] !== undefined) {
        buffer.push(current.charCodeAt(0))
      } else {
        r += fromCode(dict[buffer.join('-')])
        dict[xstr] = chars
        chars++
        buffer = []
        buffer.push(current.charCodeAt(0))
      }
    }
    return r
  },
  uncompress (str) {
    var i
    var chars = 256
    var dict = []
    var fromCode = String.fromCharCode
    for (i = 0; i < chars; i++) {
      dict[i] = fromCode(i)
    }
    var original = String(str)
    var splitted = original.split('')
    var size = splitted.length
    var buffer = ''
    var chain = ''
    var r = ''
    for (i = 0; i < size; i++) {
      var code = original.charCodeAt(i)
      var current = dict[code]
      if (buffer === '') {
        buffer = current
        r += current
      } else {
        if (code <= 255) {
          r += current
          chain = buffer + current
          dict[chars] = chain
          chars++
          buffer = current
        } else {
          chain = dict[code]
          if (chain === null) {
            chain = buffer + buffer.slice(0, 1)
          }
          r += chain
          dict[chars] = buffer + chain.slice(0, 1)
          chars++
          buffer = chain
        }
      }
    }
    r = utf8.decode(r)
    return r
  }
}
tools.lzw = lzw

module.exports = tools
