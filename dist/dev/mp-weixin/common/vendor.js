"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a2, b2) => {
  for (var prop in b2 || (b2 = {}))
    if (__hasOwnProp.call(b2, prop))
      __defNormalProp(a2, prop, b2[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b2)) {
      if (__propIsEnum.call(b2, prop))
        __defNormalProp(a2, prop, b2[prop]);
    }
  return a2;
};
var __spreadProps = (a2, b2) => __defProps(a2, __getOwnPropDescs(b2));
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i2 = 0; i2 < list.length; i2++) {
    map[list[i2]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const isNoUnitNumericStyleProp = /* @__PURE__ */ makeMap(`animation-iteration-count,border-image-outset,border-image-slice,border-image-width,box-flex,box-flex-group,box-ordinal-group,column-count,columns,flex,flex-grow,flex-positive,flex-shrink,flex-negative,flex-order,grid-row,grid-row-end,grid-row-span,grid-row-start,grid-column,grid-column-end,grid-column-span,grid-column-start,font-weight,line-clamp,line-height,opacity,order,orphans,tab-size,widows,z-index,zoom,fill-opacity,flood-opacity,stop-opacity,stroke-dasharray,stroke-dashoffset,stroke-miterlimit,stroke-opacity,stroke-width`);
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i2 = 0; i2 < value.length; i2++) {
      const item = value[i2];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:(.+)/;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function stringifyStyle$1(styles) {
  let ret = "";
  if (!styles || isString(styles)) {
    return ret;
  }
  for (const key in styles) {
    const value = styles[key];
    const normalizedKey = key.startsWith(`--`) ? key : hyphenate(key);
    if (isString(value) || typeof value === "number" && isNoUnitNumericStyleProp(normalizedKey)) {
      ret += `${normalizedKey}:${value};`;
    }
  }
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      const normalized = normalizeClass(value[i2]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString$1 || !isFunction$1(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
const EMPTY_OBJ = Object.freeze({});
const EMPTY_ARR = Object.freeze([]);
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const extend = Object.assign;
const remove = (arr, el) => {
  const i2 = arr.indexOf(el);
  if (i2 > -1) {
    arr.splice(i2, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn$1 = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction$1 = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction$1(val.then) && isFunction$1(val.catch);
};
const objectToString$1 = Object.prototype.toString;
const toTypeString = (value) => objectToString$1.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted");
const isBuiltInDirective = /* @__PURE__ */ makeMap("bind,cloak,else-if,else,for,html,if,model,on,once,pre,show,slot,text,memo");
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_2, c2) => c2 ? c2.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction((str) => str.replace(hyphenateRE, "-$1").toLowerCase());
const capitalize = cacheStringFunction((str) => str.charAt(0).toUpperCase() + str.slice(1));
const toHandlerKey = cacheStringFunction((str) => str ? `on${capitalize(str)}` : ``);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns$1 = (fns, arg) => {
  for (let i2 = 0; i2 < fns.length; i2++) {
    fns[i2](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const toNumber = (val) => {
  const n2 = parseFloat(val);
  return isNaN(n2) ? val : n2;
};
let vueApp;
const createVueAppHooks = [];
function onCreateVueApp(hook) {
  if (vueApp) {
    return hook(vueApp);
  }
  createVueAppHooks.push(hook);
}
function invokeCreateVueAppHook(app) {
  vueApp = app;
  createVueAppHooks.forEach((hook) => hook(app));
}
function getBaseSystemInfo() {
  return wx.getSystemInfoSync();
}
const E$1 = function() {
};
E$1.prototype = {
  on: function(name, callback, ctx) {
    var e2 = this.e || (this.e = {});
    (e2[name] || (e2[name] = [])).push({
      fn: callback,
      ctx
    });
    return this;
  },
  once: function(name, callback, ctx) {
    var self = this;
    function listener() {
      self.off(name, listener);
      callback.apply(ctx, arguments);
    }
    listener._ = callback;
    return this.on(name, listener, ctx);
  },
  emit: function(name) {
    var data = [].slice.call(arguments, 1);
    var evtArr = ((this.e || (this.e = {}))[name] || []).slice();
    var i2 = 0;
    var len = evtArr.length;
    for (i2; i2 < len; i2++) {
      evtArr[i2].fn.apply(evtArr[i2].ctx, data);
    }
    return this;
  },
  off: function(name, callback) {
    var e2 = this.e || (this.e = {});
    var evts = e2[name];
    var liveEvents = [];
    if (evts && callback) {
      for (var i2 = 0, len = evts.length; i2 < len; i2++) {
        if (evts[i2].fn !== callback && evts[i2].fn._ !== callback)
          liveEvents.push(evts[i2]);
      }
    }
    liveEvents.length ? e2[name] = liveEvents : delete e2[name];
    return this;
  }
};
var E$1$1 = E$1;
function validateProtocolFail(name, msg) {
  console.warn(`${name}: ${msg}`);
}
function validateProtocol(name, data, protocol, onFail) {
  if (!onFail) {
    onFail = validateProtocolFail;
  }
  for (const key in protocol) {
    const errMsg = validateProp$1(key, data[key], protocol[key], !hasOwn$1(data, key));
    if (isString(errMsg)) {
      onFail(name, errMsg);
    }
  }
}
function validateProtocols(name, args, protocol, onFail) {
  if (!protocol) {
    return;
  }
  if (!isArray$1(protocol)) {
    return validateProtocol(name, args[0] || /* @__PURE__ */ Object.create(null), protocol, onFail);
  }
  const len = protocol.length;
  const argsLen = args.length;
  for (let i2 = 0; i2 < len; i2++) {
    const opts = protocol[i2];
    const data = /* @__PURE__ */ Object.create(null);
    if (argsLen > i2) {
      data[opts.name] = args[i2];
    }
    validateProtocol(name, data, { [opts.name]: opts }, onFail);
  }
}
function validateProp$1(name, value, prop, isAbsent) {
  if (!isPlainObject$1(prop)) {
    prop = { type: prop };
  }
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    return 'Missing required args: "' + name + '"';
  }
  if (value == null && !required) {
    return;
  }
  if (type != null) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType$1(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      return getInvalidTypeMessage$1(name, value, expectedTypes);
    }
  }
  if (validator) {
    return validator(value);
  }
}
const isSimpleType$1 = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol");
function assertType$1(value, type) {
  let valid;
  const expectedType = getType$2(type);
  if (isSimpleType$1(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else {
    {
      valid = value instanceof type;
    }
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage$1(name, value, expectedTypes) {
  let message = `Invalid args: type check failed for args "${name}". Expected ${expectedTypes.map(capitalize).join(", ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue$1(value, expectedType);
  const receivedValue = styleValue$1(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable$1(expectedType) && !isBoolean$1(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable$1(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function getType$2(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : "";
}
function styleValue$1(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable$1(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean$1(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function tryCatch(fn) {
  return function() {
    try {
      return fn.apply(fn, arguments);
    } catch (e2) {
      console.error(e2);
    }
  };
}
function getApiCallbacks(args) {
  const apiCallbacks = {};
  for (const name in args) {
    const fn = args[name];
    if (isFunction$1(fn)) {
      apiCallbacks[name] = tryCatch(fn);
      delete args[name];
    }
  }
  return apiCallbacks;
}
const HOOK_SUCCESS = "success";
const HOOK_FAIL = "fail";
const HOOK_COMPLETE = "complete";
const globalInterceptors = {};
const scopedInterceptors = {};
function wrapperHook(hook) {
  return function(data) {
    return hook(data) || data;
  };
}
function queue$1(hooks, data) {
  let promise = false;
  for (let i2 = 0; i2 < hooks.length; i2++) {
    const hook = hooks[i2];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      const res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then() {
          },
          catch() {
          }
        };
      }
    }
  }
  return promise || {
    then(callback) {
      return callback(data);
    },
    catch() {
    }
  };
}
function wrapperOptions(interceptors2, options = {}) {
  [HOOK_SUCCESS, HOOK_FAIL, HOOK_COMPLETE].forEach((name) => {
    const hooks = interceptors2[name];
    if (!isArray$1(hooks)) {
      return;
    }
    const oldCallback = options[name];
    options[name] = function callbackInterceptor(res) {
      queue$1(hooks, res).then((res2) => {
        return isFunction$1(oldCallback) && oldCallback(res2) || res2;
      });
    };
  });
  return options;
}
function wrapperReturnValue(method, returnValue) {
  const returnValueHooks = [];
  if (isArray$1(globalInterceptors.returnValue)) {
    returnValueHooks.push(...globalInterceptors.returnValue);
  }
  const interceptor = scopedInterceptors[method];
  if (interceptor && isArray$1(interceptor.returnValue)) {
    returnValueHooks.push(...interceptor.returnValue);
  }
  returnValueHooks.forEach((hook) => {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}
function getApiInterceptorHooks(method) {
  const interceptor = /* @__PURE__ */ Object.create(null);
  Object.keys(globalInterceptors).forEach((hook) => {
    if (hook !== "returnValue") {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  const scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach((hook) => {
      if (hook !== "returnValue") {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}
function invokeApi(method, api, options, params) {
  const interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (isArray$1(interceptor.invoke)) {
      const res = queue$1(interceptor.invoke, options);
      return res.then((options2) => {
        return api(wrapperOptions(interceptor, options2), ...params);
      });
    } else {
      return api(wrapperOptions(interceptor, options), ...params);
    }
  }
  return api(options, ...params);
}
function handlePromise(promise) {
  return promise;
}
function formatApiArgs(args, options) {
  const params = args[0];
  if (!options || !isPlainObject$1(options.formatArgs) && isPlainObject$1(params)) {
    return;
  }
  const formatArgs = options.formatArgs;
  const keys = Object.keys(formatArgs);
  for (let i2 = 0; i2 < keys.length; i2++) {
    const name = keys[i2];
    const formatterOrDefaultValue = formatArgs[name];
    if (isFunction$1(formatterOrDefaultValue)) {
      const errMsg = formatterOrDefaultValue(args[0][name], params);
      if (isString(errMsg)) {
        return errMsg;
      }
    } else {
      if (!hasOwn$1(params, name)) {
        params[name] = formatterOrDefaultValue;
      }
    }
  }
}
function beforeInvokeApi(name, args, protocol, options) {
  {
    validateProtocols(name, args, protocol);
  }
  if (options && options.beforeInvoke) {
    const errMsg2 = options.beforeInvoke(args);
    if (isString(errMsg2)) {
      return errMsg2;
    }
  }
  const errMsg = formatApiArgs(args, options);
  if (errMsg) {
    return errMsg;
  }
}
function wrapperSyncApi(name, fn, protocol, options) {
  return (...args) => {
    const errMsg = beforeInvokeApi(name, args, protocol, options);
    if (errMsg) {
      throw new Error(errMsg);
    }
    return fn.apply(null, args);
  };
}
function defineSyncApi(name, fn, protocol, options) {
  return wrapperSyncApi(name, fn, protocol, options);
}
const API_UPX2PX = "upx2px";
const Upx2pxProtocol = [
  {
    name: "upx",
    type: [Number, String],
    required: true
  }
];
const EPS = 1e-4;
const BASE_DEVICE_WIDTH = 750;
let isIOS = false;
let deviceWidth = 0;
let deviceDPR = 0;
function checkDeviceWidth() {
  const { platform, pixelRatio, windowWidth } = getBaseSystemInfo();
  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === "ios";
}
const upx2px = defineSyncApi(API_UPX2PX, (number, newDeviceWidth) => {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }
  number = Number(number);
  if (number === 0) {
    return 0;
  }
  let width = newDeviceWidth || deviceWidth;
  let result = number / BASE_DEVICE_WIDTH * width;
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}, Upx2pxProtocol);
const API_ADD_INTERCEPTOR = "addInterceptor";
const API_REMOVE_INTERCEPTOR = "removeInterceptor";
const AddInterceptorProtocol = [
  {
    name: "method",
    type: [String, Object],
    required: true
  }
];
const RemoveInterceptorProtocol = AddInterceptorProtocol;
function mergeInterceptorHook(interceptors2, interceptor) {
  Object.keys(interceptor).forEach((hook) => {
    if (isFunction$1(interceptor[hook])) {
      interceptors2[hook] = mergeHook(interceptors2[hook], interceptor[hook]);
    }
  });
}
function removeInterceptorHook(interceptors2, interceptor) {
  if (!interceptors2 || !interceptor) {
    return;
  }
  Object.keys(interceptor).forEach((name) => {
    const hooks = interceptors2[name];
    const hook = interceptor[name];
    if (isArray$1(hooks) && isFunction$1(hook)) {
      remove(hooks, hook);
    }
  });
}
function mergeHook(parentVal, childVal) {
  const res = childVal ? parentVal ? parentVal.concat(childVal) : isArray$1(childVal) ? childVal : [childVal] : parentVal;
  return res ? dedupeHooks(res) : res;
}
function dedupeHooks(hooks) {
  const res = [];
  for (let i2 = 0; i2 < hooks.length; i2++) {
    if (res.indexOf(hooks[i2]) === -1) {
      res.push(hooks[i2]);
    }
  }
  return res;
}
const addInterceptor = defineSyncApi(API_ADD_INTERCEPTOR, (method, interceptor) => {
  if (typeof method === "string" && isPlainObject$1(interceptor)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), interceptor);
  } else if (isPlainObject$1(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}, AddInterceptorProtocol);
const removeInterceptor = defineSyncApi(API_REMOVE_INTERCEPTOR, (method, interceptor) => {
  if (typeof method === "string") {
    if (isPlainObject$1(interceptor)) {
      removeInterceptorHook(scopedInterceptors[method], interceptor);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject$1(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}, RemoveInterceptorProtocol);
const interceptors = {};
const API_ON = "$on";
const OnProtocol = [
  {
    name: "event",
    type: String,
    required: true
  },
  {
    name: "callback",
    type: Function,
    required: true
  }
];
const API_ONCE = "$once";
const OnceProtocol = OnProtocol;
const API_OFF = "$off";
const OffProtocol = [
  {
    name: "event",
    type: [String, Array]
  },
  {
    name: "callback",
    type: Function
  }
];
const API_EMIT = "$emit";
const EmitProtocol = [
  {
    name: "event",
    type: String,
    required: true
  }
];
const emitter = new E$1$1();
const $on = defineSyncApi(API_ON, (name, callback) => {
  emitter.on(name, callback);
  return () => emitter.off(name, callback);
}, OnProtocol);
const $once = defineSyncApi(API_ONCE, (name, callback) => {
  emitter.once(name, callback);
  return () => emitter.off(name, callback);
}, OnceProtocol);
const $off = defineSyncApi(API_OFF, (name, callback) => {
  if (!name) {
    emitter.e = {};
    return;
  }
  if (!Array.isArray(name))
    name = [name];
  name.forEach((n2) => emitter.off(n2, callback));
}, OffProtocol);
const $emit = defineSyncApi(API_EMIT, (name, ...args) => {
  emitter.emit(name, ...args);
}, EmitProtocol);
let cid = "";
function invokePushCallback(args) {
  if (args.type === "clientId") {
    cid = args.cid;
    invokeGetPushCidCallbacks(cid);
  } else if (args.type === "pushMsg") {
    onPushMessageCallbacks.forEach((callback) => {
      callback({ data: args.message });
    });
  }
}
const getPushCidCallbacks = [];
function invokeGetPushCidCallbacks(cid2) {
  getPushCidCallbacks.forEach((callback) => {
    callback(cid2);
  });
  getPushCidCallbacks.length = 0;
}
function getPushCid(args) {
  if (!isPlainObject$1(args)) {
    args = {};
  }
  const { success, fail, complete } = getApiCallbacks(args);
  const hasSuccess = isFunction$1(success);
  const hasFail = isFunction$1(fail);
  const hasComplete = isFunction$1(complete);
  getPushCidCallbacks.push((cid2) => {
    let res;
    if (cid2) {
      res = { errMsg: "getPushCid:ok", cid: cid2 };
      hasSuccess && success(res);
    } else {
      res = { errMsg: "getPushCid:fail" };
      hasFail && fail(res);
    }
    hasComplete && complete(res);
  });
  if (cid) {
    Promise.resolve().then(() => invokeGetPushCidCallbacks(cid));
  }
}
const onPushMessageCallbacks = [];
const onPushMessage = (fn) => {
  if (onPushMessageCallbacks.indexOf(fn) === -1) {
    onPushMessageCallbacks.push(fn);
  }
};
const offPushMessage = (fn) => {
  if (!fn) {
    onPushMessageCallbacks.length = 0;
  } else {
    const index2 = onPushMessageCallbacks.indexOf(fn);
    if (index2 > -1) {
      onPushMessageCallbacks.splice(index2, 1);
    }
  }
};
const SYNC_API_RE = /^\$|getLocale|setLocale|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64/;
const CONTEXT_API_RE = /^create|Manager$/;
const CONTEXT_API_RE_EXC = ["createBLEConnection"];
const ASYNC_API = ["createBLEConnection"];
const CALLBACK_API_RE = /^on|^off/;
function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}
function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== "onPush";
}
function shouldPromise(name) {
  if (isContextApi(name) || isSyncApi(name) || isCallbackApi(name)) {
    return false;
  }
  return true;
}
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function(onfinally) {
    const promise = this.constructor;
    return this.then((value) => promise.resolve(onfinally && onfinally()).then(() => value), (reason) => promise.resolve(onfinally && onfinally()).then(() => {
      throw reason;
    }));
  };
}
function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  if (!isFunction$1(api)) {
    return api;
  }
  return function promiseApi(options = {}, ...rest) {
    if (isFunction$1(options.success) || isFunction$1(options.fail) || isFunction$1(options.complete)) {
      return wrapperReturnValue(name, invokeApi(name, api, options, rest));
    }
    return wrapperReturnValue(name, handlePromise(new Promise((resolve2, reject) => {
      invokeApi(name, api, extend({}, options, {
        success: resolve2,
        fail: reject
      }), rest);
    })));
  };
}
const CALLBACKS = ["success", "fail", "cancel", "complete"];
function initWrapper(protocols2) {
  function processCallback(methodName, method, returnValue) {
    return function(res) {
      return method(processReturnValue(methodName, res, returnValue));
    };
  }
  function processArgs(methodName, fromArgs, argsOption = {}, returnValue = {}, keepFromArgs = false) {
    if (isPlainObject$1(fromArgs)) {
      const toArgs = keepFromArgs === true ? fromArgs : {};
      if (isFunction$1(argsOption)) {
        argsOption = argsOption(fromArgs, toArgs) || {};
      }
      for (const key in fromArgs) {
        if (hasOwn$1(argsOption, key)) {
          let keyOption = argsOption[key];
          if (isFunction$1(keyOption)) {
            keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
          }
          if (!keyOption) {
            console.warn(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F ${methodName} \u6682\u4E0D\u652F\u6301 ${key}`);
          } else if (isString(keyOption)) {
            toArgs[keyOption] = fromArgs[key];
          } else if (isPlainObject$1(keyOption)) {
            toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
          }
        } else if (CALLBACKS.indexOf(key) !== -1) {
          const callback = fromArgs[key];
          if (isFunction$1(callback)) {
            toArgs[key] = processCallback(methodName, callback, returnValue);
          }
        } else {
          if (!keepFromArgs && !hasOwn$1(toArgs, key)) {
            toArgs[key] = fromArgs[key];
          }
        }
      }
      return toArgs;
    } else if (isFunction$1(fromArgs)) {
      fromArgs = processCallback(methodName, fromArgs, returnValue);
    }
    return fromArgs;
  }
  function processReturnValue(methodName, res, returnValue, keepReturnValue = false) {
    if (isFunction$1(protocols2.returnValue)) {
      res = protocols2.returnValue(methodName, res);
    }
    return processArgs(methodName, res, returnValue, {}, keepReturnValue);
  }
  return function wrapper(methodName, method) {
    if (!hasOwn$1(protocols2, methodName)) {
      return method;
    }
    const protocol = protocols2[methodName];
    if (!protocol) {
      return function() {
        console.error(`\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F \u6682\u4E0D\u652F\u6301${methodName}`);
      };
    }
    return function(arg1, arg2) {
      let options = protocol;
      if (isFunction$1(protocol)) {
        options = protocol(arg1);
      }
      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);
      const args = [arg1];
      if (typeof arg2 !== "undefined") {
        args.push(arg2);
      }
      const returnValue = wx[options.name || methodName].apply(wx, args);
      if (isSyncApi(methodName)) {
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  };
}
const getLocale = () => {
  const app = getApp({ allowDefault: true });
  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || "zh-Hans";
};
const setLocale = (locale) => {
  const app = getApp();
  if (!app) {
    return false;
  }
  const oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach((fn) => fn({ locale }));
    return true;
  }
  return false;
};
const onLocaleChangeCallbacks = [];
const onLocaleChange = (fn) => {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
};
if (typeof global !== "undefined") {
  global.getLocale = getLocale;
}
const baseApis = {
  $on,
  $off,
  $once,
  $emit,
  upx2px,
  interceptors,
  addInterceptor,
  removeInterceptor,
  onCreateVueApp,
  invokeCreateVueAppHook,
  getLocale,
  setLocale,
  onLocaleChange,
  getPushCid,
  onPushMessage,
  offPushMessage,
  invokePushCallback
};
function initUni(api, protocols2) {
  const wrapper = initWrapper(protocols2);
  const UniProxyHandlers = {
    get(target, key) {
      if (hasOwn$1(target, key)) {
        return target[key];
      }
      if (hasOwn$1(api, key)) {
        return promisify(key, api[key]);
      }
      if (hasOwn$1(baseApis, key)) {
        return promisify(key, baseApis[key]);
      }
      return promisify(key, wrapper(key, wx[key]));
    }
  };
  return new Proxy({}, UniProxyHandlers);
}
function initGetProvider(providers) {
  return function getProvider2({ service, success, fail, complete }) {
    let res;
    if (providers[service]) {
      res = {
        errMsg: "getProvider:ok",
        service,
        provider: providers[service]
      };
      isFunction$1(success) && success(res);
    } else {
      res = {
        errMsg: "getProvider:fail:\u670D\u52A1[" + service + "]\u4E0D\u5B58\u5728"
      };
      isFunction$1(fail) && fail(res);
    }
    isFunction$1(complete) && complete(res);
  };
}
function addSafeAreaInsets(fromRes, toRes) {
  if (fromRes.safeArea) {
    const safeArea = fromRes.safeArea;
    toRes.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: fromRes.windowWidth - safeArea.right,
      bottom: fromRes.windowHeight - safeArea.bottom
    };
  }
}
const UUID_KEY = "__DC_STAT_UUID";
let deviceId;
function useDeviceId(global2 = wx) {
  return function addDeviceId(_2, toRes) {
    deviceId = deviceId || global2.getStorageSync(UUID_KEY);
    if (!deviceId) {
      deviceId = Date.now() + "" + Math.floor(Math.random() * 1e7);
      wx.setStorage({
        key: UUID_KEY,
        data: deviceId
      });
    }
    toRes.deviceId = deviceId;
  };
}
const getSystemInfo = {
  returnValue: (fromRes, toRes) => {
    addSafeAreaInsets(fromRes, toRes);
    useDeviceId()(fromRes, toRes);
  }
};
const getSystemInfoSync = getSystemInfo;
const redirectTo = {};
const previewImage = {
  args(fromArgs, toArgs) {
    let currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    const urls = fromArgs.urls;
    if (!isArray$1(urls)) {
      return;
    }
    const len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      toArgs.current = urls[currentIndex];
      toArgs.urls = urls.filter((item, index2) => index2 < currentIndex ? item !== urls[currentIndex] : true);
    } else {
      toArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false
    };
  }
};
const mocks$1 = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
const getProvider = initGetProvider({
  oauth: ["weixin"],
  share: ["weixin"],
  payment: ["wxpay"],
  push: ["weixin"]
});
function initComponentMocks(component) {
  const res = /* @__PURE__ */ Object.create(null);
  mocks$1.forEach((name) => {
    res[name] = component[name];
  });
  return res;
}
function createSelectorQuery() {
  const query = wx.createSelectorQuery();
  const oldIn = query.in;
  query.in = function newIn(component) {
    return oldIn.call(this, initComponentMocks(component));
  };
  return query;
}
var shims = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  getProvider,
  createSelectorQuery
});
var protocols = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  redirectTo,
  previewImage,
  getSystemInfo,
  getSystemInfoSync
});
var index = initUni(shims, protocols);
const ON_SHOW$1 = "onShow";
const ON_HIDE$1 = "onHide";
const ON_LAUNCH$1 = "onLaunch";
const ON_ERROR$1 = "onError";
const ON_THEME_CHANGE$1 = "onThemeChange";
const ON_PAGE_NOT_FOUND$1 = "onPageNotFound";
const ON_UNHANDLE_REJECTION$1 = "onUnhandledRejection";
const ON_LOAD$1 = "onLoad";
const ON_READY$2 = "onReady";
const ON_UNLOAD$1 = "onUnload";
const ON_RESIZE$1 = "onResize";
const ON_BACK_PRESS = "onBackPress";
const ON_PAGE_SCROLL = "onPageScroll";
const ON_TAB_ITEM_TAP$1 = "onTabItemTap";
const ON_REACH_BOTTOM$1 = "onReachBottom";
const ON_PULL_DOWN_REFRESH$1 = "onPullDownRefresh";
const ON_SHARE_TIMELINE = "onShareTimeline";
const ON_ADD_TO_FAVORITES$1 = "onAddToFavorites";
const ON_SHARE_APP_MESSAGE = "onShareAppMessage";
const ON_NAVIGATION_BAR_BUTTON_TAP = "onNavigationBarButtonTap";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED = "onNavigationBarSearchInputClicked";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED = "onNavigationBarSearchInputChanged";
const ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED = "onNavigationBarSearchInputConfirmed";
const ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED = "onNavigationBarSearchInputFocusChanged";
function getValueByDataPath(obj, path) {
  if (!isString(path)) {
    return;
  }
  path = path.replace(/\[(\d+)\]/g, ".$1");
  const parts = path.split(".");
  let key = parts[0];
  if (!obj) {
    obj = {};
  }
  if (parts.length === 1) {
    return obj[key];
  }
  return getValueByDataPath(obj[key], parts.slice(1).join("."));
}
const PAGE_HOOKS = [
  ON_LOAD$1,
  ON_SHOW$1,
  ON_HIDE$1,
  ON_UNLOAD$1,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP$1,
  ON_REACH_BOTTOM$1,
  ON_PULL_DOWN_REFRESH$1,
  ON_SHARE_TIMELINE,
  ON_SHARE_APP_MESSAGE,
  ON_ADD_TO_FAVORITES$1,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function isRootHook(name) {
  return PAGE_HOOKS.indexOf(name) > -1;
}
const UniLifecycleHooks = [
  ON_SHOW$1,
  ON_HIDE$1,
  ON_LAUNCH$1,
  ON_ERROR$1,
  ON_THEME_CHANGE$1,
  ON_PAGE_NOT_FOUND$1,
  ON_UNHANDLE_REJECTION$1,
  ON_LOAD$1,
  ON_READY$2,
  ON_UNLOAD$1,
  ON_RESIZE$1,
  ON_BACK_PRESS,
  ON_PAGE_SCROLL,
  ON_TAB_ITEM_TAP$1,
  ON_REACH_BOTTOM$1,
  ON_PULL_DOWN_REFRESH$1,
  ON_SHARE_TIMELINE,
  ON_ADD_TO_FAVORITES$1,
  ON_SHARE_APP_MESSAGE,
  ON_NAVIGATION_BAR_BUTTON_TAP,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CLICKED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CHANGED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_CONFIRMED,
  ON_NAVIGATION_BAR_SEARCH_INPUT_FOCUS_CHANGED
];
function warn(msg, ...args) {
  console.warn(`[Vue warn] ${msg}`, ...args);
}
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.active = true;
    this.effects = [];
    this.cleanups = [];
    if (!detached && activeEffectScope) {
      this.parent = activeEffectScope;
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(this) - 1;
    }
  }
  run(fn) {
    if (this.active) {
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = this.parent;
      }
    } else {
      warn(`cannot run an inactive effect scope.`);
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this.active) {
      let i2, l2;
      for (i2 = 0, l2 = this.effects.length; i2 < l2; i2++) {
        this.effects[i2].stop();
      }
      for (i2 = 0, l2 = this.cleanups.length; i2 < l2; i2++) {
        this.cleanups[i2]();
      }
      if (this.scopes) {
        for (i2 = 0, l2 = this.scopes.length; i2 < l2; i2++) {
          this.scopes[i2].stop(true);
        }
      }
      if (this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.active = false;
    }
  }
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i2 = 0; i2 < deps.length; i2++) {
      const dep = deps[i2];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("iterate");
const MAP_KEY_ITERATE_KEY = Symbol("Map key iterate");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
    }
  }
  stop() {
    if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect) {
  const { deps } = effect;
  if (deps.length) {
    for (let i2 = 0; i2 < deps.length; i2++) {
      deps[i2].delete(effect);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target);
    if (!depsMap) {
      targetMap.set(target, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    const eventInfo = { effect: activeEffect, target, type, key };
    trackEffects(dep, eventInfo);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
    if (activeEffect.onTrack) {
      activeEffect.onTrack(Object.assign({
        effect: activeEffect
      }, debuggerEventExtraInfo));
    }
  }
}
function trigger(target, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target)) {
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newValue) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  const eventInfo = { target, type, key, newValue, oldValue, oldTarget };
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0], eventInfo);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects), eventInfo);
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  for (const effect of isArray$1(dep) ? dep : [...dep]) {
    if (effect !== activeEffect || effect.allowRecurse) {
      if (effect.onTrigger) {
        effect.onTrigger(extend({ effect }, debuggerEventExtraInfo));
      }
      if (effect.scheduler) {
        effect.scheduler();
      } else {
        effect.run();
      }
    }
  }
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(Object.getOwnPropertyNames(Symbol).map((key) => Symbol[key]).filter(isSymbol));
const get = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const shallowReadonlyGet = /* @__PURE__ */ createGetter(true, true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i2 = 0, l2 = this.length; i2 < l2; i2++) {
        track(arr, "get", i2 + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target)) {
      return target;
    }
    const targetIsArray = isArray$1(target);
    if (!isReadonly2 && targetIsArray && hasOwn$1(arrayInstrumentations, key)) {
      return Reflect.get(arrayInstrumentations, key, receiver);
    }
    const res = Reflect.get(target, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      const shouldUnwrap = !targetIsArray || !isIntegerKey(key);
      return shouldUnwrap ? res.value : res;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target, key, value, receiver) {
    let oldValue = target[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow && !isReadonly(value)) {
      if (!isShallow(value)) {
        value = toRaw(value);
        oldValue = toRaw(oldValue);
      }
      if (!isArray$1(target) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn$1(target, key);
    const result = Reflect.set(target, key, value, receiver);
    if (target === toRaw(receiver)) {
      if (!hadKey) {
        trigger(target, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger(target, "set", key, value, oldValue);
      }
    }
    return result;
  };
}
function deleteProperty(target, key) {
  const hadKey = hasOwn$1(target, key);
  const oldValue = target[key];
  const result = Reflect.deleteProperty(target, key);
  if (result && hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function has$1(target, key) {
  const result = Reflect.has(target, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target, "has", key);
  }
  return result;
}
function ownKeys(target) {
  track(target, "iterate", isArray$1(target) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target);
}
const mutableHandlers = {
  get,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target, key) {
    {
      console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  },
  deleteProperty(target, key) {
    {
      console.warn(`Delete operation on key "${String(key)}" failed: target is readonly.`, target);
    }
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend({}, mutableHandlers, {
  get: shallowGet,
  set: shallowSet
});
const shallowReadonlyHandlers = /* @__PURE__ */ extend({}, readonlyHandlers, {
  get: shallowReadonlyGet
});
const toShallow = (value) => value;
const getProto = (v2) => Reflect.getPrototypeOf(v2);
function get$1(target, key, isReadonly2 = false, isShallow2 = false) {
  target = target["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "get", key);
  }
  !isReadonly2 && track(rawTarget, "get", rawKey);
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target.get(rawKey));
  } else if (target !== rawTarget) {
    target.get(key);
  }
}
function has$1$1(key, isReadonly2 = false) {
  const target = this["__v_raw"];
  const rawTarget = toRaw(target);
  const rawKey = toRaw(key);
  if (key !== rawKey) {
    !isReadonly2 && track(rawTarget, "has", key);
  }
  !isReadonly2 && track(rawTarget, "has", rawKey);
  return key === rawKey ? target.has(key) : target.has(key) || target.has(rawKey);
}
function size(target, isReadonly2 = false) {
  target = target["__v_raw"];
  !isReadonly2 && track(toRaw(target), "iterate", ITERATE_KEY);
  return Reflect.get(target, "size", target);
}
function add(value) {
  value = toRaw(value);
  const target = toRaw(this);
  const proto = getProto(target);
  const hadKey = proto.has.call(target, value);
  if (!hadKey) {
    target.add(value);
    trigger(target, "add", value, value);
  }
  return this;
}
function set$1$1(key, value) {
  value = toRaw(value);
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2.call(target, key);
  target.set(key, value);
  if (!hadKey) {
    trigger(target, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger(target, "set", key, value, oldValue);
  }
  return this;
}
function deleteEntry(key) {
  const target = toRaw(this);
  const { has: has2, get: get2 } = getProto(target);
  let hadKey = has2.call(target, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target, key);
  } else {
    checkIdentityKeys(target, has2, key);
  }
  const oldValue = get2 ? get2.call(target, key) : void 0;
  const result = target.delete(key);
  if (hadKey) {
    trigger(target, "delete", key, void 0, oldValue);
  }
  return result;
}
function clear() {
  const target = toRaw(this);
  const hadItems = target.size !== 0;
  const oldTarget = isMap(target) ? new Map(target) : new Set(target);
  const result = target.clear();
  if (hadItems) {
    trigger(target, "clear", void 0, void 0, oldTarget);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target = observed["__v_raw"];
    const rawTarget = toRaw(target);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target = this["__v_raw"];
    const rawTarget = toRaw(target);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY);
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    {
      const key = args[0] ? `on key "${args[0]}" ` : ``;
      console.warn(`${capitalize(type)} operation ${key}failed: target is readonly.`, toRaw(this));
    }
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get$1(this, key);
    },
    get size() {
      return size(this);
    },
    has: has$1$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get$1(this, key, false, true);
    },
    get size() {
      return size(this);
    },
    has: has$1$1,
    add,
    set: set$1$1,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get$1(this, key, true, true);
    },
    get size() {
      return size(this, true);
    },
    has(key) {
      return has$1$1.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(method, false, false);
    readonlyInstrumentations2[method] = createIterableMethod(method, true, false);
    shallowInstrumentations2[method] = createIterableMethod(method, false, true);
    shallowReadonlyInstrumentations2[method] = createIterableMethod(method, true, true);
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [mutableInstrumentations, readonlyInstrumentations, shallowInstrumentations, shallowReadonlyInstrumentations] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target;
    }
    return Reflect.get(hasOwn$1(instrumentations, key) && key in target ? instrumentations : target, key, receiver);
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const shallowReadonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, true)
};
function checkIdentityKeys(target, has2, key) {
  const rawKey = toRaw(key);
  if (rawKey !== key && has2.call(target, rawKey)) {
    const type = toRawType(target);
    console.warn(`Reactive ${type} contains both the raw and reactive versions of the same object${type === `Map` ? ` as keys` : ``}, which can lead to inconsistencies. Avoid differentiating between the raw and reactive versions of an object and only use the reactive version if possible.`);
  }
}
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target) {
  if (isReadonly(target)) {
    return target;
  }
  return createReactiveObject(target, false, mutableHandlers, mutableCollectionHandlers, reactiveMap);
}
function shallowReactive(target) {
  return createReactiveObject(target, false, shallowReactiveHandlers, shallowCollectionHandlers, shallowReactiveMap);
}
function readonly(target) {
  return createReactiveObject(target, true, readonlyHandlers, readonlyCollectionHandlers, readonlyMap);
}
function shallowReadonly(target) {
  return createReactiveObject(target, true, shallowReadonlyHandlers, shallowReadonlyCollectionHandlers, shallowReadonlyMap);
}
function createReactiveObject(target, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target)) {
    {
      console.warn(`value cannot be made reactive: ${String(target)}`);
    }
    return target;
  }
  if (target["__v_raw"] && !(isReadonly2 && target["__v_isReactive"])) {
    return target;
  }
  const existingProxy = proxyMap.get(target);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target);
  if (targetType === 0) {
    return target;
  }
  const proxy = new Proxy(target, targetType === 2 ? collectionHandlers : baseHandlers);
  proxyMap.set(target, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()), {
        target: ref2,
        type: "get",
        key: "value"
      });
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  if (ref2.dep) {
    {
      triggerEffects(ref2.dep, {
        target: ref2,
        type: "set",
        key: "value",
        newValue: newVal
      });
    }
  }
}
function isRef(r2) {
  return !!(r2 && r2.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    newVal = this.__v_isShallow ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = this.__v_isShallow ? newVal : toReactive(newVal);
      triggerRefValue(this, newVal);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target, key, receiver) => unref(Reflect.get(target, key, receiver)),
  set: (target, key, value, receiver) => {
    const oldValue = target[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self = toRaw(this);
    trackRefValue(self);
    if (self._dirty || !self._cacheable) {
      self._dirty = false;
      self._value = self.effect.run();
    }
    return self._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction$1(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = () => {
      console.warn("Write operation failed: computed value is readonly");
    };
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  if (debugOptions && !isSSR) {
    cRef.effect.onTrack = debugOptions.onTrack;
    cRef.effect.onTrigger = debugOptions.onTrigger;
  }
  return cRef;
}
const stack = [];
function pushWarningContext(vnode) {
  stack.push(vnode);
}
function popWarningContext() {
  stack.pop();
}
function warn$1(msg, ...args) {
  pauseTracking();
  const instance = stack.length ? stack[stack.length - 1].component : null;
  const appWarnHandler = instance && instance.appContext.config.warnHandler;
  const trace = getComponentTrace();
  if (appWarnHandler) {
    callWithErrorHandling(appWarnHandler, instance, 11, [
      msg + args.join(""),
      instance && instance.proxy,
      trace.map(({ vnode }) => `at <${formatComponentName(instance, vnode.type)}>`).join("\n"),
      trace
    ]);
  } else {
    const warnArgs = [`[Vue warn]: ${msg}`, ...args];
    if (trace.length && true) {
      warnArgs.push(`
`, ...formatTrace(trace));
    }
    console.warn(...warnArgs);
  }
  resetTracking();
}
function getComponentTrace() {
  let currentVNode = stack[stack.length - 1];
  if (!currentVNode) {
    return [];
  }
  const normalizedStack = [];
  while (currentVNode) {
    const last = normalizedStack[0];
    if (last && last.vnode === currentVNode) {
      last.recurseCount++;
    } else {
      normalizedStack.push({
        vnode: currentVNode,
        recurseCount: 0
      });
    }
    const parentInstance = currentVNode.component && currentVNode.component.parent;
    currentVNode = parentInstance && parentInstance.vnode;
  }
  return normalizedStack;
}
function formatTrace(trace) {
  const logs = [];
  trace.forEach((entry, i2) => {
    logs.push(...i2 === 0 ? [] : [`
`], ...formatTraceEntry(entry));
  });
  return logs;
}
function formatTraceEntry({ vnode, recurseCount }) {
  const postfix = recurseCount > 0 ? `... (${recurseCount} recursive calls)` : ``;
  const isRoot = vnode.component ? vnode.component.parent == null : false;
  const open = ` at <${formatComponentName(vnode.component, vnode.type, isRoot)}`;
  const close = `>` + postfix;
  return vnode.props ? [open, ...formatProps(vnode.props), close] : [open + close];
}
function formatProps(props) {
  const res = [];
  const keys = Object.keys(props);
  keys.slice(0, 3).forEach((key) => {
    res.push(...formatProp(key, props[key]));
  });
  if (keys.length > 3) {
    res.push(` ...`);
  }
  return res;
}
function formatProp(key, value, raw) {
  if (isString(value)) {
    value = JSON.stringify(value);
    return raw ? value : [`${key}=${value}`];
  } else if (typeof value === "number" || typeof value === "boolean" || value == null) {
    return raw ? value : [`${key}=${value}`];
  } else if (isRef(value)) {
    value = formatProp(key, toRaw(value.value), true);
    return raw ? value : [`${key}=Ref<`, value, `>`];
  } else if (isFunction$1(value)) {
    return [`${key}=fn${value.name ? `<${value.name}>` : ``}`];
  } else {
    value = toRaw(value);
    return raw ? value : [`${key}=`, value];
  }
}
const ErrorTypeStrings = {
  ["sp"]: "serverPrefetch hook",
  ["bc"]: "beforeCreate hook",
  ["c"]: "created hook",
  ["bm"]: "beforeMount hook",
  ["m"]: "mounted hook",
  ["bu"]: "beforeUpdate hook",
  ["u"]: "updated",
  ["bum"]: "beforeUnmount hook",
  ["um"]: "unmounted hook",
  ["a"]: "activated hook",
  ["da"]: "deactivated hook",
  ["ec"]: "errorCaptured hook",
  ["rtc"]: "renderTracked hook",
  ["rtg"]: "renderTriggered hook",
  [0]: "setup function",
  [1]: "render function",
  [2]: "watcher getter",
  [3]: "watcher callback",
  [4]: "watcher cleanup function",
  [5]: "native event handler",
  [6]: "component event handler",
  [7]: "vnode hook",
  [8]: "directive hook",
  [9]: "transition hook",
  [10]: "app errorHandler",
  [11]: "app warnHandler",
  [12]: "ref function",
  [13]: "async component loader",
  [14]: "scheduler flush. This is likely a Vue internals bug. Please open an issue at https://new-issue.vuejs.org/?repo=vuejs/core"
};
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction$1(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i2 = 0; i2 < fn.length; i2++) {
    values.push(callWithAsyncErrorHandling(fn[i2], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = ErrorTypeStrings[type] || type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i2 = 0; i2 < errorCapturedHooks.length; i2++) {
          if (errorCapturedHooks[i2](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(appErrorHandler, null, 10, [err, exposedInstance, errorInfo]);
      return;
    }
  }
  logError(err, type, contextVNode, throwInDev);
}
function logError(err, type, contextVNode, throwInDev = true) {
  {
    const info = ErrorTypeStrings[type] || type;
    if (contextVNode) {
      pushWarningContext(contextVNode);
    }
    warn$1(`Unhandled error${info ? ` during execution of ${info}` : ``}`);
    if (contextVNode) {
      popWarningContext();
    }
    if (throwInDev) {
      console.error(err);
    } else {
      console.error(err);
    }
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue = [];
let flushIndex = 0;
const pendingPreFlushCbs = [];
let activePreFlushCbs = null;
let preFlushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = Promise.resolve();
let currentFlushPromise = null;
let currentPreFlushParentJob = null;
const RECURSION_LIMIT = 100;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start = flushIndex + 1;
  let end = queue.length;
  while (start < end) {
    const middle = start + end >>> 1;
    const middleJobId = getId(queue[middle]);
    middleJobId < id ? start = middle + 1 : end = middle;
  }
  return start;
}
function queueJob(job) {
  if ((!queue.length || !queue.includes(job, isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex)) && job !== currentPreFlushParentJob) {
    if (job.id == null) {
      queue.push(job);
    } else {
      queue.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i2 = queue.indexOf(job);
  if (i2 > flushIndex) {
    queue.splice(i2, 1);
  }
}
function queueCb(cb, activeQueue, pendingQueue, index2) {
  if (!isArray$1(cb)) {
    if (!activeQueue || !activeQueue.includes(cb, cb.allowRecurse ? index2 + 1 : index2)) {
      pendingQueue.push(cb);
    }
  } else {
    pendingQueue.push(...cb);
  }
  queueFlush();
}
function queuePreFlushCb(cb) {
  queueCb(cb, activePreFlushCbs, pendingPreFlushCbs, preFlushIndex);
}
function queuePostFlushCb(cb) {
  queueCb(cb, activePostFlushCbs, pendingPostFlushCbs, postFlushIndex);
}
function flushPreFlushCbs(seen, parentJob = null) {
  if (pendingPreFlushCbs.length) {
    currentPreFlushParentJob = parentJob;
    activePreFlushCbs = [...new Set(pendingPreFlushCbs)];
    pendingPreFlushCbs.length = 0;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    for (preFlushIndex = 0; preFlushIndex < activePreFlushCbs.length; preFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePreFlushCbs[preFlushIndex])) {
        continue;
      }
      activePreFlushCbs[preFlushIndex]();
    }
    activePreFlushCbs = null;
    preFlushIndex = 0;
    currentPreFlushParentJob = null;
    flushPreFlushCbs(seen, parentJob);
  }
}
function flushPostFlushCbs(seen) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    {
      seen = seen || /* @__PURE__ */ new Map();
    }
    activePostFlushCbs.sort((a2, b2) => getId(a2) - getId(b2));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      if (checkRecursiveUpdates(seen, activePostFlushCbs[postFlushIndex])) {
        continue;
      }
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
function flushJobs(seen) {
  isFlushPending = false;
  isFlushing = true;
  {
    seen = seen || /* @__PURE__ */ new Map();
  }
  flushPreFlushCbs(seen);
  queue.sort((a2, b2) => getId(a2) - getId(b2));
  const check = (job) => checkRecursiveUpdates(seen, job);
  try {
    for (flushIndex = 0; flushIndex < queue.length; flushIndex++) {
      const job = queue[flushIndex];
      if (job && job.active !== false) {
        if (check(job)) {
          continue;
        }
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue.length = 0;
    flushPostFlushCbs(seen);
    isFlushing = false;
    currentFlushPromise = null;
    if (queue.length || pendingPreFlushCbs.length || pendingPostFlushCbs.length) {
      flushJobs(seen);
    }
  }
}
function checkRecursiveUpdates(seen, fn) {
  if (!seen.has(fn)) {
    seen.set(fn, 1);
  } else {
    const count = seen.get(fn);
    if (count > RECURSION_LIMIT) {
      const instance = fn.ownerInstance;
      const componentName = instance && getComponentName(instance.type);
      warn$1(`Maximum recursive updates exceeded${componentName ? ` in component <${componentName}>` : ``}. This means you have a reactive effect that is mutating its own dependencies and thus recursively triggering itself. Possible sources include component template, render function, updated hook or watcher source function.`);
      return true;
    } else {
      seen.set(fn, count + 1);
    }
  }
}
function emit(event, ...args) {
}
function devtoolsComponentEmit(component, event, params) {
  emit("component:emit", component.appContext.app, component, event, params);
}
function emit$1(instance, event, ...rawArgs) {
  const props = instance.vnode.props || EMPTY_OBJ;
  {
    const { emitsOptions, propsOptions: [propsOptions] } = instance;
    if (emitsOptions) {
      if (!(event in emitsOptions) && true) {
        if (!propsOptions || !(toHandlerKey(event) in propsOptions)) {
          warn$1(`Component emitted event "${event}" but it is neither declared in the emits option nor as an "${toHandlerKey(event)}" prop.`);
        }
      } else {
        const validator = emitsOptions[event];
        if (isFunction$1(validator)) {
          const isValid = validator(...rawArgs);
          if (!isValid) {
            warn$1(`Invalid event arguments: event validation failed for event "${event}".`);
          }
        }
      }
    }
  }
  let args = rawArgs;
  const isModelListener = event.startsWith("update:");
  const modelArg = isModelListener && event.slice(7);
  if (modelArg && modelArg in props) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a2) => a2.trim());
    } else if (number) {
      args = rawArgs.map(toNumber);
    }
  }
  {
    devtoolsComponentEmit(instance, event, args);
  }
  {
    const lowerCaseEvent = event.toLowerCase();
    if (lowerCaseEvent !== event && props[toHandlerKey(lowerCaseEvent)]) {
      warn$1(`Event "${lowerCaseEvent}" is emitted in component ${formatComponentName(instance, instance.type)} but the handler is registered for "${event}". Note that HTML attributes are case-insensitive and you cannot use v-on to listen to camelCase events when using in-DOM templates. You should probably use "${hyphenate(event)}" instead of "${event}".`);
    }
  }
  let handlerName;
  let handler = props[handlerName = toHandlerKey(event)] || props[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener) {
    handler = props[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(handler, instance, 6, args);
  }
  const onceHandler = props[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(onceHandler, instance, 6, args);
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, null);
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  cache.set(comp, normalized);
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn$1(options, key[0].toLowerCase() + key.slice(1)) || hasOwn$1(options, hyphenate(key)) || hasOwn$1(options, key);
}
let currentRenderingInstance = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  instance && instance.type.__scopeId || null;
  return prev;
}
function provide(key, value) {
  if (!currentInstance) {
    {
      warn$1(`provide() can only be used inside setup().`);
    }
  } else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance) {
    const provides = instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction$1(defaultValue) ? defaultValue.call(instance.proxy) : defaultValue;
    } else {
      warn$1(`injection "${String(key)}" not found.`);
    }
  } else {
    warn$1(`inject() can only be used inside setup() or functional components.`);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  if (!isFunction$1(cb)) {
    warn$1(`\`watch(fn, options?)\` signature has been moved to a separate API. Use \`watchEffect(fn, options?)\` instead. \`watch\` now only supports \`watch(source, cb, options?) signature.`);
  }
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  if (!cb) {
    if (immediate !== void 0) {
      warn$1(`watch() "immediate" option is only respected when using the watch(source, callback, options?) signature.`);
    }
    if (deep !== void 0) {
      warn$1(`watch() "deep" option is only respected when using the watch(source, callback, options?) signature.`);
    }
  }
  const warnInvalidSource = (s2) => {
    warn$1(`Invalid watch source: `, s2, `A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types.`);
  };
  const instance = currentInstance;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some(isReactive);
    getter = () => source.map((s2) => {
      if (isRef(s2)) {
        return s2.value;
      } else if (isReactive(s2)) {
        return traverse$2(s2);
      } else if (isFunction$1(s2)) {
        return callWithErrorHandling(s2, instance, 2);
      } else {
        warnInvalidSource(s2);
      }
    });
  } else if (isFunction$1(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(source, instance, 3, [onCleanup]);
      };
    }
  } else {
    getter = NOOP;
    warnInvalidSource(source);
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse$2(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let oldValue = isMultiSource ? [] : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some((v2, i2) => hasChanged(v2, oldValue[i2])) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    scheduler = () => {
      if (!instance || instance.isMounted) {
        queuePreFlushCb(job);
      } else {
        job();
      }
    };
  }
  const effect = new ReactiveEffect(getter, scheduler);
  {
    effect.onTrack = onTrack;
    effect.onTrigger = onTrigger;
  }
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(effect.run.bind(effect), instance && instance.suspense);
  } else {
    effect.run();
  }
  return () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction$1(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i2 = 0; i2 < segments.length && cur; i2++) {
      cur = cur[segments[i2]];
    }
    return cur;
  };
}
function traverse$2(value, seen) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen = seen || /* @__PURE__ */ new Set();
  if (seen.has(value)) {
    return value;
  }
  seen.add(value);
  if (isRef(value)) {
    traverse$2(value.value, seen);
  } else if (isArray$1(value)) {
    for (let i2 = 0; i2 < value.length; i2++) {
      traverse$2(value[i2], seen);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v2) => {
      traverse$2(v2, seen);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse$2(value[key], seen);
    }
  }
  return value;
}
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target) {
  registerKeepAliveHook(hook, "a", target);
}
function onDeactivated(hook, target) {
  registerKeepAliveHook(hook, "da", target);
}
function registerKeepAliveHook(hook, type, target = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target);
  if (target) {
    let current = target.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target, keepAliveRoot) {
  const injected = injectHook(type, hook, keepAliveRoot, true);
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target);
}
function injectHook(type, hook, target = currentInstance, prepend = false) {
  if (target) {
    if (isRootHook(type)) {
      target = target.root;
    }
    const hooks = target[type] || (target[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target);
      const res = callWithAsyncErrorHandling(hook, target, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  } else {
    const apiName = toHandlerKey((ErrorTypeStrings[type] || type.replace(/^on/, "")).replace(/ hook$/, ""));
    warn$1(`${apiName} is called when there is no active component instance to be associated with. Lifecycle injection APIs can only be used during execution of setup().`);
  }
}
const createHook = (lifecycle) => (hook, target = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, hook, target);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook("rtg");
const onRenderTracked = createHook("rtc");
function onErrorCaptured(hook, target = currentInstance) {
  injectHook("ec", hook, target);
}
function createDuplicateChecker() {
  const cache = /* @__PURE__ */ Object.create(null);
  return (type, key) => {
    if (cache[key]) {
      warn$1(`${type} property "${key}" is already defined in ${cache[key]}.`);
    } else {
      cache[key] = type;
    }
  };
}
let shouldCacheAccess = true;
function applyOptions$1(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = createDuplicateChecker();
  {
    const [propsOptions] = instance.propsOptions;
    if (propsOptions) {
      for (const key in propsOptions) {
        checkDuplicateProperties("Props", key);
      }
    }
  }
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties, instance.appContext.config.unwrapInjectedRef);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction$1(methodHandler)) {
        {
          Object.defineProperty(ctx, key, {
            value: methodHandler.bind(publicThis),
            configurable: true,
            enumerable: true,
            writable: true
          });
        }
        {
          checkDuplicateProperties("Methods", key);
        }
      } else {
        warn$1(`Method "${key}" has type "${typeof methodHandler}" in the component definition. Did you reference the function correctly?`);
      }
    }
  }
  if (dataOptions) {
    if (!isFunction$1(dataOptions)) {
      warn$1(`The data option must be a function. Plain object usage is no longer supported.`);
    }
    const data = dataOptions.call(publicThis, publicThis);
    if (isPromise(data)) {
      warn$1(`data() returned a Promise - note data() cannot be async; If you intend to perform data fetching before component renders, use async setup() + <Suspense>.`);
    }
    if (!isObject$1(data)) {
      warn$1(`data() should return an object.`);
    } else {
      instance.data = reactive(data);
      {
        for (const key in data) {
          checkDuplicateProperties("Data", key);
          if (key[0] !== "$" && key[0] !== "_") {
            Object.defineProperty(ctx, key, {
              configurable: true,
              enumerable: true,
              get: () => data[key],
              set: NOOP
            });
          }
        }
      }
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction$1(opt) ? opt.bind(publicThis, publicThis) : isFunction$1(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      if (get2 === NOOP) {
        warn$1(`Computed property "${key}" has no getter.`);
      }
      const set2 = !isFunction$1(opt) && isFunction$1(opt.set) ? opt.set.bind(publicThis) : () => {
        warn$1(`Write operation failed: computed property "${key}" is readonly.`);
      };
      const c2 = computed$1({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c2.value,
        set: (v2) => c2.value = v2
      });
      {
        checkDuplicateProperties("Computed", key);
      }
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  {
    if (provideOptions) {
      const provides = isFunction$1(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
      Reflect.ownKeys(provides).forEach((key) => {
        provide(key, provides[key]);
      });
    }
  }
  {
    if (created) {
      callHook$1(created, instance, "c");
    }
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components)
    instance.components = components;
  if (directives)
    instance.directives = directives;
  if (instance.ctx.$onApplyOptions) {
    instance.ctx.$onApplyOptions(options, instance, publicThis);
  }
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP, unwrapRef = false) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(opt.from || key, opt.default, true);
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      if (unwrapRef) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          get: () => injected.value,
          set: (v2) => injected.value = v2
        });
      } else {
        {
          warn$1(`injected property "${key}" is a ref and will be auto-unwrapped and no longer needs \`.value\` in the next minor release. To opt-in to the new behavior now, set \`app.config.unwrapInjectedRef = true\` (this config is temporary and will not be needed in the future.)`);
        }
        ctx[key] = injected;
      }
    } else {
      ctx[key] = injected;
    }
    {
      checkDuplicateProperties("Inject", key);
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy), instance, type);
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction$1(handler)) {
      watch(getter, handler);
    } else {
      warn$1(`Invalid watch handler specified by key "${raw}"`, handler);
    }
  } else if (isFunction$1(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r2) => createWatcher(r2, ctx, publicThis, key));
    } else {
      const handler = isFunction$1(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction$1(handler)) {
        watch(getter, handler, raw);
      } else {
        warn$1(`Invalid watch handler specified by key "${raw.handler}"`, handler);
      }
    }
  } else {
    warn$1(`Invalid watch option: "${key}"`, raw);
  }
}
function resolveMergedOptions(instance) {
  const base = instance.type;
  const { mixins, extends: extendsOptions } = base;
  const { mixins: globalMixins, optionsCache: cache, config: { optionMergeStrategies } } = instance.appContext;
  const cached = cache.get(base);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach((m2) => mergeOptions(resolved, m2, optionMergeStrategies, true));
    }
    mergeOptions(resolved, base, optionMergeStrategies);
  }
  cache.set(base, resolved);
  return resolved;
}
function mergeOptions(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach((m2) => mergeOptions(to, m2, strats, true));
  }
  for (const key in from) {
    if (asMixin && key === "expose") {
      warn$1(`"expose" option is ignored when declared in mixins or extends. It should only be declared in the base component itself.`);
    } else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeObjectOptions,
  emits: mergeObjectOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray$1,
  created: mergeAsArray$1,
  beforeMount: mergeAsArray$1,
  mounted: mergeAsArray$1,
  beforeUpdate: mergeAsArray$1,
  updated: mergeAsArray$1,
  beforeDestroy: mergeAsArray$1,
  beforeUnmount: mergeAsArray$1,
  destroyed: mergeAsArray$1,
  unmounted: mergeAsArray$1,
  activated: mergeAsArray$1,
  deactivated: mergeAsArray$1,
  errorCaptured: mergeAsArray$1,
  serverPrefetch: mergeAsArray$1,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(isFunction$1(to) ? to.call(this, this) : to, isFunction$1(from) ? from.call(this, this) : from);
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i2 = 0; i2 < raw.length; i2++) {
      res[raw[i2]] = raw[i2];
    }
    return res;
  }
  return raw;
}
function mergeAsArray$1(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(extend(/* @__PURE__ */ Object.create(null), to), from) : from;
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray$1(to[key], from[key]);
  }
  return merged;
}
function initProps$1(instance, rawProps, isStateful, isSSR = false) {
  const props = {};
  const attrs = {};
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props)) {
      props[key] = void 0;
    }
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
  if (isStateful) {
    instance.props = isSSR ? props : shallowReactive(props);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const { props, attrs, vnode: { patchFlag } } = instance;
  const rawCurrentProps = toRaw(props);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if (!(instance.type.__hmrId || instance.parent && instance.parent.type.__hmrId) && (optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i2 = 0; i2 < propsToUpdate.length; i2++) {
        let key = propsToUpdate[i2];
        const value = rawProps[key];
        if (options) {
          if (hasOwn$1(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props[camelizedKey] = resolvePropValue(options, rawCurrentProps, camelizedKey, value, instance, false);
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn$1(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn$1(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props[key] = resolvePropValue(options, rawCurrentProps, key, void 0, instance, true);
          }
        } else {
          delete props[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn$1(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger(instance, "set", "$attrs");
  }
  {
    validateProps(rawProps || {}, props, instance);
  }
}
function setFullProps(instance, rawProps, props, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn$1(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i2 = 0; i2 < needCastKeys.length; i2++) {
      const key = needCastKeys[i2];
      props[key] = resolvePropValue(options, rawCurrentProps, key, castValues[key], instance, !hasOwn$1(castValues, key));
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn$1(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && isFunction$1(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(null, props);
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction$1(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    cache.set(comp, EMPTY_ARR);
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i2 = 0; i2 < raw.length; i2++) {
      if (!isString(raw[i2])) {
        warn$1(`props must be strings when using array syntax.`, raw[i2]);
      }
      const normalizedKey = camelize(raw[i2]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    if (!isObject$1(raw)) {
      warn$1(`invalid props options`, raw);
    }
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction$1(opt) ? { type: opt } : opt;
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn$1(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  cache.set(comp, res);
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  } else {
    warn$1(`Invalid prop name: "${key}" is a reserved property.`);
  }
  return false;
}
function getType$1(ctor) {
  const match = ctor && ctor.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ctor === null ? "null" : "";
}
function isSameType(a2, b2) {
  return getType$1(a2) === getType$1(b2);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t2) => isSameType(t2, type));
  } else if (isFunction$1(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
function validateProps(rawProps, props, instance) {
  const resolvedValues = toRaw(props);
  const options = instance.propsOptions[0];
  for (const key in options) {
    let opt = options[key];
    if (opt == null)
      continue;
    validateProp(key, resolvedValues[key], opt, !hasOwn$1(rawProps, key) && !hasOwn$1(rawProps, hyphenate(key)));
  }
}
function validateProp(name, value, prop, isAbsent) {
  const { type, required, validator } = prop;
  if (required && isAbsent) {
    warn$1('Missing required prop: "' + name + '"');
    return;
  }
  if (value == null && !prop.required) {
    return;
  }
  if (type != null && type !== true) {
    let isValid = false;
    const types = isArray$1(type) ? type : [type];
    const expectedTypes = [];
    for (let i2 = 0; i2 < types.length && !isValid; i2++) {
      const { valid, expectedType } = assertType(value, types[i2]);
      expectedTypes.push(expectedType || "");
      isValid = valid;
    }
    if (!isValid) {
      warn$1(getInvalidTypeMessage(name, value, expectedTypes));
      return;
    }
  }
  if (validator && !validator(value)) {
    warn$1('Invalid prop: custom validator check failed for prop "' + name + '".');
  }
}
const isSimpleType = /* @__PURE__ */ makeMap("String,Number,Boolean,Function,Symbol,BigInt");
function assertType(value, type) {
  let valid;
  const expectedType = getType$1(type);
  if (isSimpleType(expectedType)) {
    const t2 = typeof value;
    valid = t2 === expectedType.toLowerCase();
    if (!valid && t2 === "object") {
      valid = value instanceof type;
    }
  } else if (expectedType === "Object") {
    valid = isObject$1(value);
  } else if (expectedType === "Array") {
    valid = isArray$1(value);
  } else if (expectedType === "null") {
    valid = value === null;
  } else {
    valid = value instanceof type;
  }
  return {
    valid,
    expectedType
  };
}
function getInvalidTypeMessage(name, value, expectedTypes) {
  let message = `Invalid prop: type check failed for prop "${name}". Expected ${expectedTypes.map(capitalize).join(" | ")}`;
  const expectedType = expectedTypes[0];
  const receivedType = toRawType(value);
  const expectedValue = styleValue(value, expectedType);
  const receivedValue = styleValue(value, receivedType);
  if (expectedTypes.length === 1 && isExplicable(expectedType) && !isBoolean(expectedType, receivedType)) {
    message += ` with value ${expectedValue}`;
  }
  message += `, got ${receivedType} `;
  if (isExplicable(receivedType)) {
    message += `with value ${receivedValue}.`;
  }
  return message;
}
function styleValue(value, type) {
  if (type === "String") {
    return `"${value}"`;
  } else if (type === "Number") {
    return `${Number(value)}`;
  } else {
    return `${value}`;
  }
}
function isExplicable(type) {
  const explicitTypes = ["string", "number", "boolean"];
  return explicitTypes.some((elem) => type.toLowerCase() === elem);
}
function isBoolean(...args) {
  return args.some((elem) => elem.toLowerCase() === "boolean");
}
function validateDirectiveName(name) {
  if (isBuiltInDirective(name)) {
    warn$1("Do not use built-in directive ids as custom directive id: " + name);
  }
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (rootProps != null && !isObject$1(rootProps)) {
      warn$1(`root props passed to app.mount() must be an object.`);
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    const app = context.app = {
      _uid: uid++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v2) {
        {
          warn$1(`app.config cannot be replaced. Modify individual options instead.`);
        }
      },
      use(plugin2, ...options) {
        if (installedPlugins.has(plugin2)) {
          warn$1(`Plugin has already been applied to target app.`);
        } else if (plugin2 && isFunction$1(plugin2.install)) {
          installedPlugins.add(plugin2);
          plugin2.install(app, ...options);
        } else if (isFunction$1(plugin2)) {
          installedPlugins.add(plugin2);
          plugin2(app, ...options);
        } else {
          warn$1(`A plugin must either be a function or an object with an "install" function.`);
        }
        return app;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          } else {
            warn$1("Mixin has already been applied to target app" + (mixin.name ? `: ${mixin.name}` : ""));
          }
        }
        return app;
      },
      component(name, component) {
        {
          validateComponentName(name, context.config);
        }
        if (!component) {
          return context.components[name];
        }
        if (context.components[name]) {
          warn$1(`Component "${name}" has already been registered in target app.`);
        }
        context.components[name] = component;
        return app;
      },
      directive(name, directive2) {
        {
          validateDirectiveName(name);
        }
        if (!directive2) {
          return context.directives[name];
        }
        if (context.directives[name]) {
          warn$1(`Directive "${name}" has already been registered in target app.`);
        }
        context.directives[name] = directive2;
        return app;
      },
      mount() {
      },
      unmount() {
      },
      provide(key, value) {
        if (key in context.provides) {
          warn$1(`App already provides property with key "${String(key)}". It will be overwritten with the new value.`);
        }
        context.provides[key] = value;
        return app;
      }
    };
    return app;
  };
}
const queuePostRenderEffect = queuePostFlushCb;
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component2 = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(Component2);
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component2;
      }
    }
    const res = resolve(instance[type] || Component2[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component2;
    }
    if (warnMissing && !res) {
      const extra = type === COMPONENTS ? `
If this is a native custom element, make sure to exclude it from component resolution via compilerOptions.isCustomElement.` : ``;
      warn$1(`Failed to resolve ${type.slice(0, -1)}: ${name}${extra}`);
    }
    return res;
  } else {
    warn$1(`resolve${capitalize(type.slice(0, -1))} can only be used in render() or setup().`);
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
const InternalObjectKey = `__vInternal`;
function guardReactiveProps(props) {
  if (!props)
    return null;
  return isProxy(props) || InternalObjectKey in props ? extend({}, props) : props;
}
const getPublicInstance = (i2) => {
  if (!i2)
    return null;
  if (isStatefulComponent(i2))
    return getExposeProxy(i2) || i2.proxy;
  return getPublicInstance(i2.parent);
};
const publicPropertiesMap = extend(/* @__PURE__ */ Object.create(null), {
  $: (i2) => i2,
  $el: (i2) => i2.__$el || (i2.__$el = {}),
  $data: (i2) => i2.data,
  $props: (i2) => shallowReadonly(i2.props),
  $attrs: (i2) => shallowReadonly(i2.attrs),
  $slots: (i2) => shallowReadonly(i2.slots),
  $refs: (i2) => shallowReadonly(i2.refs),
  $parent: (i2) => getPublicInstance(i2.parent),
  $root: (i2) => getPublicInstance(i2.root),
  $emit: (i2) => i2.emit,
  $options: (i2) => resolveMergedOptions(i2),
  $forceUpdate: (i2) => () => queueJob(i2.update),
  $watch: (i2) => instanceWatch.bind(i2)
});
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props, accessCache, type, appContext } = instance;
    if (key === "__isVue") {
      return true;
    }
    if (setupState !== EMPTY_OBJ && setupState.__isScriptSetup && hasOwn$1(setupState, key)) {
      return setupState[key];
    }
    let normalizedProps;
    if (key[0] !== "$") {
      const n2 = accessCache[key];
      if (n2 !== void 0) {
        switch (n2) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props[key];
        }
      } else if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn$1(normalizedProps, key)) {
        accessCache[key] = 3;
        return props[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn$1(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn$1(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else if (currentRenderingInstance && (!isString(key) || key.indexOf("__v") !== 0)) {
      if (data !== EMPTY_OBJ && (key[0] === "$" || key[0] === "_") && hasOwn$1(data, key)) {
        warn$1(`Property ${JSON.stringify(key)} must be accessed via $data because it starts with a reserved character ("$" or "_") and is not proxied on the render context.`);
      } else if (instance === currentRenderingInstance) {
        warn$1(`Property ${JSON.stringify(key)} was accessed during render but is not defined on instance.`);
      }
    }
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (setupState !== EMPTY_OBJ && hasOwn$1(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn$1(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn$1(instance.props, key)) {
      warn$1(`Attempting to mutate prop "${key}". Props are readonly.`, instance);
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      warn$1(`Attempting to mutate public property "${key}". Properties starting with $ are reserved and readonly.`, instance);
      return false;
    } else {
      if (key in instance.appContext.config.globalProperties) {
        Object.defineProperty(ctx, key, {
          enumerable: true,
          configurable: true,
          value
        });
      } else {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({ _: { data, setupState, accessCache, ctx, appContext, propsOptions } }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn$1(data, key) || setupState !== EMPTY_OBJ && hasOwn$1(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn$1(normalizedProps, key) || hasOwn$1(ctx, key) || hasOwn$1(publicPropertiesMap, key) || hasOwn$1(appContext.config.globalProperties, key);
  },
  defineProperty(target, key, descriptor) {
    if (descriptor.get != null) {
      this.set(target, key, descriptor.get(), null);
    } else if (descriptor.value != null) {
      this.set(target, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target, key, descriptor);
  }
};
{
  PublicInstanceProxyHandlers.ownKeys = (target) => {
    warn$1(`Avoid app logic that relies on enumerating keys on a component instance. The keys will be empty in production mode to avoid performance overhead.`);
    return Reflect.ownKeys(target);
  };
}
function createDevRenderContext(instance) {
  const target = {};
  Object.defineProperty(target, `_`, {
    configurable: true,
    enumerable: false,
    get: () => instance
  });
  Object.keys(publicPropertiesMap).forEach((key) => {
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: false,
      get: () => publicPropertiesMap[key](instance),
      set: NOOP
    });
  });
  return target;
}
function exposePropsOnRenderContext(instance) {
  const { ctx, propsOptions: [propsOptions] } = instance;
  if (propsOptions) {
    Object.keys(propsOptions).forEach((key) => {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => instance.props[key],
        set: NOOP
      });
    });
  }
}
function exposeSetupStateOnRenderContext(instance) {
  const { ctx, setupState } = instance;
  Object.keys(toRaw(setupState)).forEach((key) => {
    if (!setupState.__isScriptSetup) {
      if (key[0] === "$" || key[0] === "_") {
        warn$1(`setup() return property ${JSON.stringify(key)} should not start with "$" or "_" which are reserved prefixes for Vue internals.`);
        return;
      }
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => setupState[key],
        set: NOOP
      });
    }
  });
}
const emptyAppContext = createAppContext();
let uid$1 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$1++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(true),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = createDevRenderContext(instance);
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit$1.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
const setCurrentInstance = (instance) => {
  currentInstance = instance;
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  currentInstance = null;
};
const isBuiltInTag = /* @__PURE__ */ makeMap("slot,component");
function validateComponentName(name, config) {
  const appIsNativeTag = config.isNativeTag || NO;
  if (isBuiltInTag(name) || appIsNativeTag(name)) {
    warn$1("Do not use built-in or reserved HTML elements as component id: " + name);
  }
}
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps$1(instance, props, isStateful, isSSR);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component2 = instance.type;
  {
    if (Component2.name) {
      validateComponentName(Component2.name, instance.appContext.config);
    }
    if (Component2.components) {
      const names = Object.keys(Component2.components);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateComponentName(names[i2], instance.appContext.config);
      }
    }
    if (Component2.directives) {
      const names = Object.keys(Component2.directives);
      for (let i2 = 0; i2 < names.length; i2++) {
        validateDirectiveName(names[i2]);
      }
    }
    if (Component2.compilerOptions && isRuntimeOnly()) {
      warn$1(`"compilerOptions" is only supported when using a build of Vue that includes the runtime compiler. Since you are using a runtime-only build, the options should be passed via your build tool config instead.`);
    }
  }
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  {
    exposePropsOnRenderContext(instance);
  }
  const { setup } = Component2;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(setup, instance, 0, [shallowReadonly(instance.props), setupContext]);
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      {
        warn$1(`setup() returned a Promise, but the version of Vue you are using does not support it yet.`);
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction$1(setupResult)) {
    {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    if (isVNode(setupResult)) {
      warn$1(`setup() should not return VNodes directly - return a render function instead.`);
    }
    {
      instance.devtoolsRawSetupState = setupResult;
    }
    instance.setupState = proxyRefs(setupResult);
    {
      exposeSetupStateOnRenderContext(instance);
    }
  } else if (setupResult !== void 0) {
    warn$1(`setup() should return an object. Received: ${setupResult === null ? "null" : typeof setupResult}`);
  }
  finishComponentSetup(instance, isSSR);
}
let compile$1;
const isRuntimeOnly = () => !compile$1;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component2 = instance.type;
  if (!instance.render) {
    instance.render = Component2.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions$1(instance);
    resetTracking();
    unsetCurrentInstance();
  }
  if (!Component2.render && instance.render === NOOP && !isSSR) {
    if (Component2.template) {
      warn$1(`Component provided template option but runtime compilation is not supported in this build of Vue. Configure your bundler to alias "vue" to "vue/dist/vue.esm-bundler.js".`);
    } else {
      warn$1(`Component is missing template or render function.`);
    }
  }
}
function createAttrsProxy(instance) {
  return new Proxy(instance.attrs, {
    get(target, key) {
      track(instance, "get", "$attrs");
      return target[key];
    },
    set() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    },
    deleteProperty() {
      warn$1(`setupContext.attrs is readonly.`);
      return false;
    }
  });
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    if (instance.exposed) {
      warn$1(`expose() should be called only once per setup().`);
    }
    instance.exposed = exposed || {};
  };
  let attrs;
  {
    return Object.freeze({
      get attrs() {
        return attrs || (attrs = createAttrsProxy(instance));
      },
      get slots() {
        return shallowReadonly(instance.slots);
      },
      get emit() {
        return (event, ...args) => instance.emit(event, ...args);
      },
      expose
    });
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target, key) {
        if (key in target) {
          return target[key];
        }
        return instance.proxy[key];
      }
    }));
  }
}
const classifyRE = /(?:^|[-_])(\w)/g;
const classify = (str) => str.replace(classifyRE, (c2) => c2.toUpperCase()).replace(/[-_]/g, "");
function getComponentName(Component2) {
  return isFunction$1(Component2) ? Component2.displayName || Component2.name : Component2.name;
}
function formatComponentName(instance, Component2, isRoot = false) {
  let name = getComponentName(Component2);
  if (!name && Component2.__file) {
    const match = Component2.__file.match(/([^/\\]+)\.\w+$/);
    if (match) {
      name = match[1];
    }
  }
  if (!name && instance && instance.parent) {
    const inferFromRegistry = (registry) => {
      for (const key in registry) {
        if (registry[key] === Component2) {
          return key;
        }
      }
    };
    name = inferFromRegistry(instance.components || instance.parent.type.components) || inferFromRegistry(instance.appContext.components);
  }
  return name ? classify(name) : isRoot ? `App` : `Anonymous`;
}
const computed$1 = (getterOrOptions, debugOptions) => {
  return computed(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
const version = "3.2.31";
function unwrapper(target) {
  return unref(target);
}
const ARRAYTYPE = "[object Array]";
const OBJECTTYPE = "[object Object]";
function diff(current, pre) {
  const result = {};
  syncKeys(current, pre);
  _diff(current, pre, "", result);
  return result;
}
function syncKeys(current, pre) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
    for (let key in pre) {
      const currentValue = current[key];
      if (currentValue === void 0) {
        current[key] = null;
      } else {
        syncKeys(currentValue, pre[key]);
      }
    }
  } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
    if (current.length >= pre.length) {
      pre.forEach((item, index2) => {
        syncKeys(current[index2], item);
      });
    }
  }
}
function _diff(current, pre, path, result) {
  current = unwrapper(current);
  if (current === pre)
    return;
  const rootCurrentType = toTypeString(current);
  const rootPreType = toTypeString(pre);
  if (rootCurrentType == OBJECTTYPE) {
    if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
      setResult(result, path, current);
    } else {
      for (let key in current) {
        const currentValue = unwrapper(current[key]);
        const preValue = pre[key];
        const currentType = toTypeString(currentValue);
        const preType = toTypeString(preValue);
        if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
          if (currentValue != preValue) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          }
        } else if (currentType == ARRAYTYPE) {
          if (preType != ARRAYTYPE) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            if (currentValue.length < preValue.length) {
              setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
            } else {
              currentValue.forEach((item, index2) => {
                _diff(item, preValue[index2], (path == "" ? "" : path + ".") + key + "[" + index2 + "]", result);
              });
            }
          }
        } else if (currentType == OBJECTTYPE) {
          if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
            setResult(result, (path == "" ? "" : path + ".") + key, currentValue);
          } else {
            for (let subKey in currentValue) {
              _diff(currentValue[subKey], preValue[subKey], (path == "" ? "" : path + ".") + key + "." + subKey, result);
            }
          }
        }
      }
    }
  } else if (rootCurrentType == ARRAYTYPE) {
    if (rootPreType != ARRAYTYPE) {
      setResult(result, path, current);
    } else {
      if (current.length < pre.length) {
        setResult(result, path, current);
      } else {
        current.forEach((item, index2) => {
          _diff(item, pre[index2], path + "[" + index2 + "]", result);
        });
      }
    }
  } else {
    setResult(result, path, current);
  }
}
function setResult(result, k2, v2) {
  result[k2] = v2;
}
function hasComponentEffect(instance) {
  return queue.includes(instance.update);
}
function flushCallbacks(instance) {
  const ctx = instance.ctx;
  const callbacks = ctx.__next_tick_callbacks;
  if (callbacks && callbacks.length) {
    if ({}.VUE_APP_DEBUG) {
      const mpInstance = ctx.$scope;
      console.log("[" + +new Date() + "][" + (mpInstance.is || mpInstance.route) + "][" + instance.uid + "]:flushCallbacks[" + callbacks.length + "]");
    }
    const copies = callbacks.slice(0);
    callbacks.length = 0;
    for (let i2 = 0; i2 < copies.length; i2++) {
      copies[i2]();
    }
  }
}
function nextTick$1(instance, fn) {
  const ctx = instance.ctx;
  if (!ctx.__next_tick_pending && !hasComponentEffect(instance)) {
    if ({}.VUE_APP_DEBUG) {
      const mpInstance = ctx.$scope;
      console.log("[" + +new Date() + "][" + (mpInstance.is || mpInstance.route) + "][" + instance.uid + "]:nextVueTick");
    }
    return nextTick(fn && fn.bind(instance.proxy));
  }
  if ({}.VUE_APP_DEBUG) {
    const mpInstance = ctx.$scope;
    console.log("[" + +new Date() + "][" + (mpInstance.is || mpInstance.route) + "][" + instance.uid + "]:nextMPTick");
  }
  let _resolve;
  if (!ctx.__next_tick_callbacks) {
    ctx.__next_tick_callbacks = [];
  }
  ctx.__next_tick_callbacks.push(() => {
    if (fn) {
      callWithErrorHandling(fn.bind(instance.proxy), instance, 14);
    } else if (_resolve) {
      _resolve(instance.proxy);
    }
  });
  return new Promise((resolve2) => {
    _resolve = resolve2;
  });
}
function clone$2(src, seen) {
  src = unwrapper(src);
  const type = typeof src;
  if (type === "object" && src !== null) {
    let copy = seen.get(src);
    if (typeof copy !== "undefined") {
      return copy;
    }
    if (isArray$1(src)) {
      const len = src.length;
      copy = new Array(len);
      seen.set(src, copy);
      for (let i2 = 0; i2 < len; i2++) {
        copy[i2] = clone$2(src[i2], seen);
      }
    } else {
      copy = {};
      seen.set(src, copy);
      for (const name in src) {
        if (hasOwn$1(src, name)) {
          copy[name] = clone$2(src[name], seen);
        }
      }
    }
    return copy;
  }
  if (type !== "symbol") {
    return src;
  }
}
function deepCopy(src) {
  return clone$2(src, typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : /* @__PURE__ */ new Map());
}
function getMPInstanceData(instance, keys) {
  const data = instance.data;
  const ret = /* @__PURE__ */ Object.create(null);
  keys.forEach((key) => {
    ret[key] = data[key];
  });
  return ret;
}
function patch(instance, data, oldData) {
  if (!data) {
    return;
  }
  data = deepCopy(data);
  const ctx = instance.ctx;
  const mpType = ctx.mpType;
  if (mpType === "page" || mpType === "component") {
    data.r0 = 1;
    const mpInstance = ctx.$scope;
    const keys = Object.keys(data);
    const diffData = diff(data, oldData || getMPInstanceData(mpInstance, keys));
    if (Object.keys(diffData).length) {
      ctx.__next_tick_pending = true;
      mpInstance.setData(diffData, () => {
        ctx.__next_tick_pending = false;
        flushCallbacks(instance);
      });
      flushPreFlushCbs(void 0, instance.update);
    } else {
      flushCallbacks(instance);
    }
  }
}
function initAppConfig(appConfig) {
  appConfig.globalProperties.$nextTick = function $nextTick(fn) {
    return nextTick$1(this.$, fn);
  };
}
function onApplyOptions(options, instance, publicThis) {
  instance.appContext.config.globalProperties.$applyOptions(options, instance, publicThis);
  const computedOptions = options.computed;
  if (computedOptions) {
    const keys = Object.keys(computedOptions);
    if (keys.length) {
      const ctx = instance.ctx;
      if (!ctx.$computedKeys) {
        ctx.$computedKeys = [];
      }
      ctx.$computedKeys.push(...keys);
    }
  }
  delete instance.ctx.$onApplyOptions;
}
function setRef$1(instance, isUnmount = false) {
  const { setupState, $templateRefs, ctx: { $scope, $mpPlatform } } = instance;
  if ($mpPlatform === "mp-alipay") {
    return;
  }
  if (!$templateRefs || !$scope) {
    return;
  }
  if (isUnmount) {
    return $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, null, setupState));
  }
  const doSet = () => {
    const mpComponents = $scope.selectAllComponents(".r").concat($scope.selectAllComponents(".r-i-f"));
    $templateRefs.forEach((templateRef) => setTemplateRef(templateRef, findComponentPublicInstance(mpComponents, templateRef.i), setupState));
  };
  if ($scope._$setRef) {
    $scope._$setRef(doSet);
  } else {
    nextTick$1(instance, doSet);
  }
}
function findComponentPublicInstance(mpComponents, id) {
  const mpInstance = mpComponents.find((com) => com && (com.properties || com.props).uI === id);
  if (mpInstance) {
    const vm = mpInstance.$vm;
    return getExposeProxy(vm.$) || vm;
  }
  return null;
}
function setTemplateRef({ r: r2, f: f2 }, refValue, setupState) {
  if (isFunction$1(r2)) {
    r2(refValue, {});
  } else {
    const _isString = isString(r2);
    const _isRef = isRef(r2);
    if (_isString || _isRef) {
      if (f2) {
        if (!_isRef) {
          return;
        }
        if (!isArray$1(r2.value)) {
          r2.value = [];
        }
        const existing = r2.value;
        if (existing.indexOf(refValue) === -1) {
          existing.push(refValue);
          if (!refValue) {
            return;
          }
          onBeforeUnmount(() => remove(existing, refValue), refValue.$);
        }
      } else if (_isString) {
        if (hasOwn$1(setupState, r2)) {
          setupState[r2] = refValue;
        }
      } else if (isRef(r2)) {
        r2.value = refValue;
      } else {
        warnRef(r2);
      }
    } else {
      warnRef(r2);
    }
  }
}
function warnRef(ref2) {
  warn$1("Invalid template ref type:", ref2, `(${typeof ref2})`);
}
var MPType;
(function(MPType2) {
  MPType2["APP"] = "app";
  MPType2["PAGE"] = "page";
  MPType2["COMPONENT"] = "component";
})(MPType || (MPType = {}));
const queuePostRenderEffect$1 = queuePostFlushCb;
function mountComponent(initialVNode, options) {
  const instance = initialVNode.component = createComponentInstance(initialVNode, options.parentComponent, null);
  {
    instance.ctx.$onApplyOptions = onApplyOptions;
    instance.ctx.$children = [];
  }
  if (options.mpType === "app") {
    instance.render = NOOP;
  }
  if (options.onBeforeSetup) {
    options.onBeforeSetup(instance, options);
  }
  {
    pushWarningContext(initialVNode);
  }
  setupComponent(instance);
  {
    if (options.parentComponent && instance.proxy) {
      options.parentComponent.ctx.$children.push(getExposeProxy(instance) || instance.proxy);
    }
  }
  setupRenderEffect(instance);
  {
    popWarningContext();
  }
  return instance.proxy;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
function renderComponentRoot(instance) {
  const { type: Component2, vnode, proxy, withProxy, props, slots, attrs, emit: emit2, render, renderCache, data, setupState, ctx, uid: uid2, appContext: { app: { config: { globalProperties: { pruneComponentPropsCache: pruneComponentPropsCache2 } } } } } = instance;
  instance.$templateRefs = [];
  instance.$ei = 0;
  pruneComponentPropsCache2(uid2);
  instance.__counter = instance.__counter === 0 ? 1 : 0;
  let result;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
    } else {
      const render2 = Component2;
      result = render2.length > 1 ? render2(props, { attrs, slots, emit: emit2 }) : render2(props, null) ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    handleError(err, instance, 1);
    result = false;
  }
  setRef$1(instance);
  setCurrentRenderingInstance(prev);
  return result;
}
const updateComponentPreRender = (instance) => {
  pauseTracking();
  flushPreFlushCbs(void 0, instance.update);
  resetTracking();
};
function componentUpdateScopedSlotsFn() {
  const scopedSlotsData = this.$scopedSlotsData;
  if (!scopedSlotsData || scopedSlotsData.length === 0) {
    return;
  }
  const mpInstance = this.ctx.$scope;
  const oldData = mpInstance.data;
  const diffData = /* @__PURE__ */ Object.create(null);
  scopedSlotsData.forEach(({ path, index: index2, data }) => {
    const oldScopedSlotData = getValueByDataPath(oldData, path);
    const diffPath = `${path}[${index2}]`;
    if (typeof oldScopedSlotData === "undefined" || typeof oldScopedSlotData[index2] === "undefined") {
      diffData[diffPath] = data;
    } else {
      const diffScopedSlotData = diff(data, oldScopedSlotData[index2]);
      Object.keys(diffScopedSlotData).forEach((name) => {
        diffData[diffPath + "." + name] = diffScopedSlotData[name];
      });
    }
  });
  scopedSlotsData.length = 0;
  if (Object.keys(diffData).length) {
    mpInstance.setData(diffData);
  }
}
function toggleRecurse({ effect, update }, allowed) {
  effect.allowRecurse = update.allowRecurse = allowed;
}
function setupRenderEffect(instance) {
  const updateScopedSlots = componentUpdateScopedSlotsFn.bind(instance);
  instance.$updateScopedSlots = () => nextTick(() => queueJob(updateScopedSlots));
  const componentUpdateFn = () => {
    if (!instance.isMounted) {
      onBeforeUnmount(() => {
        setRef$1(instance, true);
      }, instance);
      patch(instance, renderComponentRoot(instance));
    } else {
      const { bu, u: u2 } = instance;
      toggleRecurse(instance, false);
      updateComponentPreRender(instance);
      if (bu) {
        invokeArrayFns$1(bu);
      }
      toggleRecurse(instance, true);
      patch(instance, renderComponentRoot(instance));
      if (u2) {
        queuePostRenderEffect$1(u2);
      }
    }
  };
  const effect = instance.effect = new ReactiveEffect(componentUpdateFn, () => queueJob(instance.update), instance.scope);
  const update = instance.update = effect.run.bind(effect);
  update.id = instance.uid;
  toggleRecurse(instance, true);
  {
    effect.onTrack = instance.rtc ? (e2) => invokeArrayFns$1(instance.rtc, e2) : void 0;
    effect.onTrigger = instance.rtg ? (e2) => invokeArrayFns$1(instance.rtg, e2) : void 0;
    update.ownerInstance = instance;
  }
  update();
}
function unmountComponent(instance) {
  const { bum, scope, update, um } = instance;
  if (bum) {
    invokeArrayFns$1(bum);
  }
  scope.stop();
  if (update) {
    update.active = false;
  }
  if (um) {
    queuePostRenderEffect$1(um);
  }
  queuePostRenderEffect$1(() => {
    instance.isUnmounted = true;
  });
}
const oldCreateApp = createAppAPI();
function createVueApp(rootComponent, rootProps = null) {
  const app = oldCreateApp(rootComponent, rootProps);
  const appContext = app._context;
  initAppConfig(appContext.config);
  const createVNode = (initialVNode) => {
    initialVNode.appContext = appContext;
    initialVNode.shapeFlag = 6;
    return initialVNode;
  };
  const createComponent2 = function createComponent3(initialVNode, options) {
    return mountComponent(createVNode(initialVNode), options);
  };
  const destroyComponent = function destroyComponent2(component) {
    return component && unmountComponent(component.$);
  };
  app.mount = function mount() {
    rootComponent.render = NOOP;
    const instance = mountComponent(createVNode({ type: rootComponent }), {
      mpType: MPType.APP,
      mpInstance: null,
      parentComponent: null,
      slots: [],
      props: null
    });
    instance.$app = app;
    instance.$createComponent = createComponent2;
    instance.$destroyComponent = destroyComponent;
    appContext.$appInstance = instance;
    return instance;
  };
  app.unmount = function unmount() {
    warn$1(`Cannot unmount an app.`);
  };
  return app;
}
function injectLifecycleHook(name, hook, publicThis, instance) {
  if (isFunction$1(hook)) {
    injectHook(name, hook.bind(publicThis), instance);
  }
}
function initHooks$1(options, instance, publicThis) {
  const mpType = options.mpType || publicThis.$mpType;
  if (!mpType) {
    return;
  }
  Object.keys(options).forEach((name) => {
    if (name.indexOf("on") === 0) {
      const hooks = options[name];
      if (isArray$1(hooks)) {
        hooks.forEach((hook) => injectLifecycleHook(name, hook, publicThis, instance));
      } else {
        injectLifecycleHook(name, hooks, publicThis, instance);
      }
    }
  });
}
function applyOptions$2(options, instance, publicThis) {
  initHooks$1(options, instance, publicThis);
}
function set(target, key, val) {
  return target[key] = val;
}
function errorHandler(err, instance, info) {
  if (!instance) {
    throw err;
  }
  const app = getApp();
  if (!app || !app.$vm) {
    throw err;
  }
  {
    app.$vm.$callHook(ON_ERROR$1, err, info);
  }
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function initOptionMergeStrategies(optionMergeStrategies) {
  UniLifecycleHooks.forEach((name) => {
    optionMergeStrategies[name] = mergeAsArray;
  });
}
let realAtob;
const b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
const b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
if (typeof atob !== "function") {
  realAtob = function(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, "");
    if (!b64re.test(str)) {
      throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
    }
    str += "==".slice(2 - (str.length & 3));
    var bitmap;
    var result = "";
    var r1;
    var r2;
    var i2 = 0;
    for (; i2 < str.length; ) {
      bitmap = b64.indexOf(str.charAt(i2++)) << 18 | b64.indexOf(str.charAt(i2++)) << 12 | (r1 = b64.indexOf(str.charAt(i2++))) << 6 | (r2 = b64.indexOf(str.charAt(i2++)));
      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) : r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) : String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  realAtob = atob;
}
function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split("").map(function(c2) {
    return "%" + ("00" + c2.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}
function getCurrentUserInfo() {
  const token = index.getStorageSync("uni_id_token") || "";
  const tokenArr = token.split(".");
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0
    };
  }
  let userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1e3;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}
function uniIdMixin(globalProperties) {
  globalProperties.uniIDHasRole = function(roleId) {
    const { role } = getCurrentUserInfo();
    return role.indexOf(roleId) > -1;
  };
  globalProperties.uniIDHasPermission = function(permissionId) {
    const { permission } = getCurrentUserInfo();
    return this.uniIDHasRole("admin") || permission.indexOf(permissionId) > -1;
  };
  globalProperties.uniIDTokenValid = function() {
    const { tokenExpired } = getCurrentUserInfo();
    return tokenExpired > Date.now();
  };
}
function initApp(app) {
  const appConfig = app._context.config;
  if (isFunction$1(app._component.onError)) {
    appConfig.errorHandler = errorHandler;
  }
  initOptionMergeStrategies(appConfig.optionMergeStrategies);
  const globalProperties = appConfig.globalProperties;
  {
    uniIdMixin(globalProperties);
  }
  {
    globalProperties.$set = set;
    globalProperties.$applyOptions = applyOptions$2;
  }
  {
    index.invokeCreateVueAppHook(app);
  }
}
const propsCaches = /* @__PURE__ */ Object.create(null);
function renderProps(props) {
  const { uid: uid2, __counter } = getCurrentInstance();
  const propsId = (propsCaches[uid2] || (propsCaches[uid2] = [])).push(guardReactiveProps(props)) - 1;
  return uid2 + "," + propsId + "," + __counter;
}
function pruneComponentPropsCache(uid2) {
  delete propsCaches[uid2];
}
function findComponentPropsData(up) {
  if (!up) {
    return;
  }
  const [uid2, propsId] = up.split(",");
  if (!propsCaches[uid2]) {
    return;
  }
  return propsCaches[uid2][parseInt(propsId)];
}
var plugin = {
  install(app) {
    initApp(app);
    app.config.globalProperties.pruneComponentPropsCache = pruneComponentPropsCache;
    const oldMount = app.mount;
    app.mount = function mount(rootContainer) {
      const instance = oldMount.call(app, rootContainer);
      const createApp2 = getCreateApp();
      if (createApp2) {
        createApp2(instance);
      } else {
        if (typeof createMiniProgramApp !== "undefined") {
          createMiniProgramApp(instance);
        }
      }
      return instance;
    };
  }
};
function getCreateApp() {
  const method = {}.UNI_MP_PLUGIN ? "createPluginApp" : {}.UNI_SUBPACKAGE ? "createSubpackageApp" : "createApp";
  if (typeof global !== "undefined") {
    return global[method];
  } else if (typeof my !== "undefined") {
    return my[method];
  }
}
function vOn(value, key) {
  const instance = getCurrentInstance();
  const ctx = instance.ctx;
  const extraKey = typeof key !== "undefined" && (ctx.$mpPlatform === "mp-weixin" || ctx.$mpPlatform === "mp-qq") && (isString(key) || typeof key === "number") ? "_" + key : "";
  const name = "e" + instance.$ei++ + extraKey;
  const mpInstance = ctx.$scope;
  if (!value) {
    delete mpInstance[name];
    return name;
  }
  const existingInvoker = mpInstance[name];
  if (existingInvoker) {
    existingInvoker.value = value;
  } else {
    mpInstance[name] = createInvoker(value, instance);
  }
  return name;
}
function createInvoker(initialValue, instance) {
  const invoker = (e2) => {
    patchMPEvent(e2);
    let args = [e2];
    if (e2.detail && e2.detail.__args__) {
      args = e2.detail.__args__;
    }
    const eventValue = invoker.value;
    const invoke = () => {
      callWithAsyncErrorHandling(patchStopImmediatePropagation(e2, eventValue), instance, 5, args);
    };
    if (bubbles.includes(e2.type)) {
      setTimeout(invoke);
    } else {
      invoke();
    }
  };
  invoker.value = initialValue;
  return invoker;
}
const bubbles = [
  "touchstart",
  "touchmove",
  "touchcancel",
  "touchend",
  "tap",
  "longpress",
  "longtap",
  "transitionend",
  "animationstart",
  "animationiteration",
  "animationend",
  "touchforcechange"
];
function patchMPEvent(event) {
  if (event.type && event.target) {
    event.preventDefault = NOOP;
    event.stopPropagation = NOOP;
    event.stopImmediatePropagation = NOOP;
    if (!hasOwn$1(event, "detail")) {
      event.detail = {};
    }
    if (hasOwn$1(event, "markerId")) {
      event.detail = typeof event.detail === "object" ? event.detail : {};
      event.detail.markerId = event.markerId;
    }
    if (isPlainObject$1(event.detail) && hasOwn$1(event.detail, "checked") && !hasOwn$1(event.detail, "value")) {
      event.detail.value = event.detail.checked;
    }
    if (isPlainObject$1(event.detail)) {
      event.target = extend({}, event.target, event.detail);
    }
  }
}
function patchStopImmediatePropagation(e2, value) {
  if (isArray$1(value)) {
    const originalStop = e2.stopImmediatePropagation;
    e2.stopImmediatePropagation = () => {
      originalStop && originalStop.call(e2);
      e2._stopped = true;
    };
    return value.map((fn) => (e3) => !e3._stopped && fn(e3));
  } else {
    return value;
  }
}
function vFor(source, renderItem) {
  let ret;
  if (isArray$1(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i2 = 0, l2 = source.length; i2 < l2; i2++) {
      ret[i2] = renderItem(source[i2], i2, i2);
    }
  } else if (typeof source === "number") {
    if (!Number.isInteger(source)) {
      warn$1(`The v-for range expect an integer value but got ${source}.`);
      return [];
    }
    ret = new Array(source);
    for (let i2 = 0; i2 < source; i2++) {
      ret[i2] = renderItem(i2 + 1, i2, i2);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(source, (item, i2) => renderItem(item, i2, i2));
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i2 = 0, l2 = keys.length; i2 < l2; i2++) {
        const key = keys[i2];
        ret[i2] = renderItem(source[key], key, i2);
      }
    }
  } else {
    ret = [];
  }
  return ret;
}
function stringifyStyle(value) {
  if (isString(value)) {
    return value;
  }
  return stringifyStyle$1(normalizeStyle(value));
}
function setRef(ref2, id, opts = {}) {
  const { $templateRefs } = getCurrentInstance();
  $templateRefs.push({ i: id, r: ref2, k: opts.k, f: opts.f });
}
const o$1 = (value, key) => vOn(value, key);
const f$1 = (source, renderItem) => vFor(source, renderItem);
const s$1 = (value) => stringifyStyle(value);
const e = (target, ...sources) => extend(target, ...sources);
const n$1 = (value) => normalizeClass(value);
const t$1 = (val) => toDisplayString(val);
const p$1 = (props) => renderProps(props);
const sr = (ref2, id, opts) => setRef(ref2, id, opts);
function createApp$1(rootComponent, rootProps = null) {
  rootComponent && (rootComponent.mpType = "app");
  return createVueApp(rootComponent, rootProps).use(plugin);
}
const createSSRApp = createApp$1;
const SLOT_DEFAULT_NAME = "d";
const ON_SHOW = "onShow";
const ON_HIDE = "onHide";
const ON_LAUNCH = "onLaunch";
const ON_ERROR = "onError";
const ON_THEME_CHANGE = "onThemeChange";
const ON_PAGE_NOT_FOUND = "onPageNotFound";
const ON_UNHANDLE_REJECTION = "onUnhandledRejection";
const ON_LOAD = "onLoad";
const ON_READY$1 = "onReady";
const ON_UNLOAD = "onUnload";
const ON_RESIZE = "onResize";
const ON_TAB_ITEM_TAP = "onTabItemTap";
const ON_REACH_BOTTOM = "onReachBottom";
const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
const ON_ADD_TO_FAVORITES = "onAddToFavorites";
const customizeRE = /:/g;
function customizeEvent(str) {
  return camelize(str.replace(customizeRE, "-"));
}
function hasLeadingSlash(str) {
  return str.indexOf("/") === 0;
}
function addLeadingSlash(str) {
  return hasLeadingSlash(str) ? str : "/" + str;
}
const invokeArrayFns = (fns, arg) => {
  let ret;
  for (let i2 = 0; i2 < fns.length; i2++) {
    ret = fns[i2](arg);
  }
  return ret;
};
function once(fn, ctx = null) {
  let res;
  return (...args) => {
    if (fn) {
      res = fn.apply(ctx, args);
      fn = null;
    }
    return res;
  };
}
const encode = encodeURIComponent;
function stringifyQuery(obj, encodeStr = encode) {
  const res = obj ? Object.keys(obj).map((key) => {
    let val = obj[key];
    if (typeof val === void 0 || val === null) {
      val = "";
    } else if (isPlainObject$1(val)) {
      val = JSON.stringify(val);
    }
    return encodeStr(key) + "=" + encodeStr(val);
  }).filter((x2) => x2.length > 0).join("&") : null;
  return res ? `?${res}` : "";
}
const MINI_PROGRAM_PAGE_RUNTIME_HOOKS = /* @__PURE__ */ (() => {
  return {
    onPageScroll: 1,
    onShareAppMessage: 1 << 1,
    onShareTimeline: 1 << 2
  };
})();
const eventChannels = {};
const eventChannelStack = [];
function getEventChannel(id) {
  if (id) {
    const eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}
const MP_METHODS = [
  "createSelectorQuery",
  "createIntersectionObserver",
  "selectAllComponents",
  "selectComponent"
];
function createEmitFn(oldEmit, ctx) {
  return function emit2(event, ...args) {
    const scope = ctx.$scope;
    if (scope && event) {
      const detail = { __args__: args };
      {
        scope.triggerEvent(event, detail);
      }
    }
    return oldEmit.apply(this, [event, ...args]);
  };
}
function initBaseInstance(instance, options) {
  const ctx = instance.ctx;
  ctx.mpType = options.mpType;
  ctx.$mpType = options.mpType;
  ctx.$mpPlatform = "mp-weixin";
  ctx.$scope = options.mpInstance;
  ctx.$mp = {};
  {
    ctx._self = {};
  }
  instance.slots = {};
  if (isArray$1(options.slots) && options.slots.length) {
    options.slots.forEach((name) => {
      instance.slots[name] = true;
    });
    if (instance.slots[SLOT_DEFAULT_NAME]) {
      instance.slots.default = true;
    }
  }
  ctx.getOpenerEventChannel = function() {
    {
      return options.mpInstance.getOpenerEventChannel();
    }
  };
  ctx.$hasHook = hasHook;
  ctx.$callHook = callHook;
  instance.emit = createEmitFn(instance.emit, ctx);
}
function initComponentInstance(instance, options) {
  initBaseInstance(instance, options);
  const ctx = instance.ctx;
  MP_METHODS.forEach((method) => {
    ctx[method] = function(...args) {
      const mpInstance = ctx.$scope;
      if (mpInstance && mpInstance[method]) {
        return mpInstance[method].apply(mpInstance, args);
      }
    };
  });
}
function initMocks(instance, mpInstance, mocks2) {
  const ctx = instance.ctx;
  mocks2.forEach((mock) => {
    if (hasOwn$1(mpInstance, mock)) {
      instance[mock] = ctx[mock] = mpInstance[mock];
    }
  });
}
function hasHook(name) {
  const hooks = this.$[name];
  if (hooks && hooks.length) {
    return true;
  }
  return false;
}
function callHook(name, args) {
  if (name === "mounted") {
    callHook.call(this, "bm");
    this.$.isMounted = true;
    name = "m";
  } else if (name === "onLoad" && args && args.__id__) {
    this.__eventChannel__ = getEventChannel(args.__id__);
    delete args.__id__;
  }
  const hooks = this.$[name];
  return hooks && invokeArrayFns(hooks, args);
}
const PAGE_INIT_HOOKS = [
  ON_LOAD,
  ON_SHOW,
  ON_HIDE,
  ON_UNLOAD,
  ON_RESIZE,
  ON_TAB_ITEM_TAP,
  ON_REACH_BOTTOM,
  ON_PULL_DOWN_REFRESH,
  ON_ADD_TO_FAVORITES
];
function findHooks(vueOptions, hooks = /* @__PURE__ */ new Set()) {
  if (vueOptions) {
    Object.keys(vueOptions).forEach((name) => {
      if (name.indexOf("on") === 0 && isFunction$1(vueOptions[name])) {
        hooks.add(name);
      }
    });
    {
      const { extends: extendsOptions, mixins } = vueOptions;
      if (mixins) {
        mixins.forEach((mixin) => findHooks(mixin, hooks));
      }
      if (extendsOptions) {
        findHooks(extendsOptions, hooks);
      }
    }
  }
  return hooks;
}
function initHook$1(mpOptions, hook, excludes) {
  if (excludes.indexOf(hook) === -1 && !hasOwn$1(mpOptions, hook)) {
    mpOptions[hook] = function(args) {
      return this.$vm && this.$vm.$callHook(hook, args);
    };
  }
}
const EXCLUDE_HOOKS = [ON_READY$1];
function initHooks(mpOptions, hooks, excludes = EXCLUDE_HOOKS) {
  hooks.forEach((hook) => initHook$1(mpOptions, hook, excludes));
}
function initUnknownHooks(mpOptions, vueOptions, excludes = EXCLUDE_HOOKS) {
  findHooks(vueOptions).forEach((hook) => initHook$1(mpOptions, hook, excludes));
}
function initRuntimeHooks(mpOptions, runtimeHooks) {
  if (!runtimeHooks) {
    return;
  }
  const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
  hooks.forEach((hook) => {
    if (runtimeHooks & MINI_PROGRAM_PAGE_RUNTIME_HOOKS[hook]) {
      initHook$1(mpOptions, hook, []);
    }
  });
}
const findMixinRuntimeHooks = /* @__PURE__ */ once(() => {
  const runtimeHooks = [];
  const app = getApp({ allowDefault: true });
  if (app && app.$vm && app.$vm.$) {
    const mixins = app.$vm.$.appContext.mixins;
    if (isArray$1(mixins)) {
      const hooks = Object.keys(MINI_PROGRAM_PAGE_RUNTIME_HOOKS);
      mixins.forEach((mixin) => {
        hooks.forEach((hook) => {
          if (hasOwn$1(mixin, hook) && !runtimeHooks.includes(hook)) {
            runtimeHooks.push(hook);
          }
        });
      });
    }
  }
  return runtimeHooks;
});
function initMixinRuntimeHooks(mpOptions) {
  initHooks(mpOptions, findMixinRuntimeHooks());
}
const HOOKS = [
  ON_SHOW,
  ON_HIDE,
  ON_ERROR,
  ON_THEME_CHANGE,
  ON_PAGE_NOT_FOUND,
  ON_UNHANDLE_REJECTION
];
function parseApp(instance, parseAppOptions) {
  const internalInstance = instance.$;
  const appOptions = {
    globalData: instance.$options && instance.$options.globalData || {},
    $vm: instance,
    onLaunch(options) {
      const ctx = internalInstance.ctx;
      if (this.$vm && ctx.$scope) {
        return;
      }
      initBaseInstance(internalInstance, {
        mpType: "app",
        mpInstance: this,
        slots: []
      });
      ctx.globalData = this.globalData;
      instance.$callHook(ON_LAUNCH, options);
    }
  };
  initLocale(instance);
  const vueOptions = instance.$.type;
  initHooks(appOptions, HOOKS);
  initUnknownHooks(appOptions, vueOptions);
  {
    const methods = vueOptions.methods;
    methods && extend(appOptions, methods);
  }
  if (parseAppOptions) {
    parseAppOptions.parse(appOptions);
  }
  return appOptions;
}
function initCreateApp(parseAppOptions) {
  return function createApp2(vm) {
    return App(parseApp(vm, parseAppOptions));
  };
}
function initCreateSubpackageApp(parseAppOptions) {
  return function createApp2(vm) {
    const appOptions = parseApp(vm, parseAppOptions);
    const app = getApp({
      allowDefault: true
    });
    vm.$.ctx.$scope = app;
    const globalData = app.globalData;
    if (globalData) {
      Object.keys(appOptions.globalData).forEach((name) => {
        if (!hasOwn$1(globalData, name)) {
          globalData[name] = appOptions.globalData[name];
        }
      });
    }
    Object.keys(appOptions).forEach((name) => {
      if (!hasOwn$1(app, name)) {
        app[name] = appOptions[name];
      }
    });
    initAppLifecycle(appOptions, vm);
  };
}
function initAppLifecycle(appOptions, vm) {
  if (isFunction$1(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow((args) => {
      vm.$callHook("onShow", args);
    });
  }
  if (isFunction$1(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide((args) => {
      vm.$callHook("onHide", args);
    });
  }
  if (isFunction$1(appOptions.onLaunch)) {
    const args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.$callHook("onLaunch", args || {});
  }
}
function initLocale(appVm) {
  const locale = ref(wx.getSystemInfoSync().language || "zh-Hans");
  Object.defineProperty(appVm, "$locale", {
    get() {
      return locale.value;
    },
    set(v2) {
      locale.value = v2;
    }
  });
}
function initVueIds(vueIds, mpInstance) {
  if (!vueIds) {
    return;
  }
  const ids = vueIds.split(",");
  const len = ids.length;
  if (len === 1) {
    mpInstance._$vueId = ids[0];
  } else if (len === 2) {
    mpInstance._$vueId = ids[0];
    mpInstance._$vuePid = ids[1];
  }
}
const EXTRAS = ["externalClasses"];
function initExtraOptions(miniProgramComponentOptions, vueOptions) {
  EXTRAS.forEach((name) => {
    if (hasOwn$1(vueOptions, name)) {
      miniProgramComponentOptions[name] = vueOptions[name];
    }
  });
}
function initWxsCallMethods(methods, wxsCallMethods) {
  if (!isArray$1(wxsCallMethods)) {
    return;
  }
  wxsCallMethods.forEach((callMethod) => {
    methods[callMethod] = function(args) {
      return this.$vm[callMethod](args);
    };
  });
}
function selectAllComponents(mpInstance, selector, $refs) {
  const components = mpInstance.selectAllComponents(selector);
  components.forEach((component) => {
    const ref2 = component.properties.uR;
    $refs[ref2] = component.$vm || component;
  });
}
function initRefs(instance, mpInstance) {
  Object.defineProperty(instance, "refs", {
    get() {
      const $refs = {};
      selectAllComponents(mpInstance, ".r", $refs);
      const forComponents = mpInstance.selectAllComponents(".r-i-f");
      forComponents.forEach((component) => {
        const ref2 = component.properties.uR;
        if (!ref2) {
          return;
        }
        if (!$refs[ref2]) {
          $refs[ref2] = [];
        }
        $refs[ref2].push(component.$vm || component);
      });
      return $refs;
    }
  });
}
function findVmByVueId(instance, vuePid) {
  const $children = instance.$children;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    const childVm = $children[i2];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  let parentVm;
  for (let i2 = $children.length - 1; i2 >= 0; i2--) {
    parentVm = findVmByVueId($children[i2], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}
const builtInProps = [
  "eO",
  "uR",
  "uRIF",
  "uI",
  "uT",
  "uP",
  "uS"
];
function initDefaultProps(isBehavior = false) {
  const properties = {};
  if (!isBehavior) {
    builtInProps.forEach((name) => {
      properties[name] = {
        type: null,
        value: ""
      };
    });
    properties.uS = {
      type: null,
      value: [],
      observer: function(newVal) {
        const $slots = /* @__PURE__ */ Object.create(null);
        newVal && newVal.forEach((slotName) => {
          $slots[slotName] = true;
        });
        this.setData({
          $slots
        });
      }
    };
  }
  return properties;
}
function initProps(mpComponentOptions) {
  if (!mpComponentOptions.properties) {
    mpComponentOptions.properties = {};
  }
  extend(mpComponentOptions.properties, initDefaultProps());
}
const PROP_TYPES = [String, Number, Boolean, Object, Array, null];
function parsePropType(type, defaultValue) {
  if (isArray$1(type) && type.length === 1) {
    return type[0];
  }
  return type;
}
function normalizePropType(type, defaultValue) {
  const res = parsePropType(type);
  return PROP_TYPES.indexOf(res) !== -1 ? res : null;
}
function initPageProps({ properties }, rawProps) {
  if (isArray$1(rawProps)) {
    rawProps.forEach((key) => {
      properties[key] = {
        type: String,
        value: ""
      };
    });
  } else if (isPlainObject$1(rawProps)) {
    Object.keys(rawProps).forEach((key) => {
      const opts = rawProps[key];
      if (isPlainObject$1(opts)) {
        let value = opts.default;
        if (isFunction$1(value)) {
          value = value();
        }
        const type = opts.type;
        opts.type = normalizePropType(type);
        properties[key] = {
          type: opts.type,
          value
        };
      } else {
        properties[key] = {
          type: normalizePropType(opts)
        };
      }
    });
  }
}
function findPropsData(properties, isPage2) {
  return (isPage2 ? findPagePropsData(properties) : findComponentPropsData(properties.uP)) || {};
}
function findPagePropsData(properties) {
  const propsData = {};
  if (isPlainObject$1(properties)) {
    Object.keys(properties).forEach((name) => {
      if (builtInProps.indexOf(name) === -1) {
        propsData[name] = properties[name];
      }
    });
  }
  return propsData;
}
function initData(_2) {
  return {};
}
function initPropsObserver(componentOptions) {
  const observe = function observe2() {
    const up = this.properties.uP;
    if (!up) {
      return;
    }
    if (this.$vm) {
      updateComponentProps(up, this.$vm.$);
    } else if (this.properties.uT === "m") {
      updateMiniProgramComponentProperties(up, this);
    }
  };
  {
    if (!componentOptions.observers) {
      componentOptions.observers = {};
    }
    componentOptions.observers.uP = observe;
  }
}
function updateMiniProgramComponentProperties(up, mpInstance) {
  const prevProps = mpInstance.properties;
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps, false)) {
    mpInstance.setData(nextProps);
  }
}
function updateComponentProps(up, instance) {
  const prevProps = toRaw(instance.props);
  const nextProps = findComponentPropsData(up) || {};
  if (hasPropsChanged(prevProps, nextProps)) {
    updateProps(instance, nextProps, prevProps, false);
    invalidateJob(instance.update);
    instance.update();
  }
}
function hasPropsChanged(prevProps, nextProps, checkLen = true) {
  const nextKeys = Object.keys(nextProps);
  if (checkLen && nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i2 = 0; i2 < nextKeys.length; i2++) {
    const key = nextKeys[i2];
    if (nextProps[key] !== prevProps[key]) {
      return true;
    }
  }
  return false;
}
function initBehaviors(vueOptions) {
  const vueBehaviors = vueOptions.behaviors;
  let vueProps = vueOptions.props;
  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }
  const behaviors = [];
  if (isArray$1(vueBehaviors)) {
    vueBehaviors.forEach((behavior) => {
      behaviors.push(behavior.replace("uni://", "wx://"));
      if (behavior === "uni://form-field") {
        if (isArray$1(vueProps)) {
          vueProps.push("name");
          vueProps.push("value");
        } else {
          vueProps.name = {
            type: String,
            default: ""
          };
          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: ""
          };
        }
      }
    });
  }
  return behaviors;
}
function applyOptions(componentOptions, vueOptions) {
  componentOptions.data = initData();
  componentOptions.behaviors = initBehaviors(vueOptions);
}
function parseComponent(vueOptions, { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 }) {
  vueOptions = vueOptions.default || vueOptions;
  const options = {
    multipleSlots: true,
    addGlobalClass: true,
    pureDataPattern: /^uP$/
  };
  if (vueOptions.options) {
    extend(options, vueOptions.options);
  }
  const mpComponentOptions = {
    options,
    lifetimes: initLifetimes2({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }),
    pageLifetimes: {
      show() {
        this.$vm && this.$vm.$callHook("onPageShow");
      },
      hide() {
        this.$vm && this.$vm.$callHook("onPageHide");
      },
      resize(size2) {
        this.$vm && this.$vm.$callHook("onPageResize", size2);
      }
    },
    methods: {
      __l: handleLink2
    }
  };
  {
    applyOptions(mpComponentOptions, vueOptions);
  }
  initProps(mpComponentOptions);
  initPropsObserver(mpComponentOptions);
  initExtraOptions(mpComponentOptions, vueOptions);
  initWxsCallMethods(mpComponentOptions.methods, vueOptions.wxsCallMethods);
  if (parse2) {
    parse2(mpComponentOptions, { handleLink: handleLink2 });
  }
  return mpComponentOptions;
}
function initCreateComponent(parseOptions2) {
  return function createComponent2(vueComponentOptions) {
    return Component(parseComponent(vueComponentOptions, parseOptions2));
  };
}
let $createComponentFn;
let $destroyComponentFn;
function $createComponent(initialVNode, options) {
  if (!$createComponentFn) {
    $createComponentFn = getApp().$vm.$createComponent;
  }
  const proxy = $createComponentFn(initialVNode, options);
  return getExposeProxy(proxy.$) || proxy;
}
function $destroyComponent(instance) {
  if (!$destroyComponentFn) {
    $destroyComponentFn = getApp().$vm.$destroyComponent;
  }
  return $destroyComponentFn(instance);
}
function parsePage(vueOptions, parseOptions2) {
  const { parse: parse2, mocks: mocks2, isPage: isPage2, initRelation: initRelation2, handleLink: handleLink2, initLifetimes: initLifetimes2 } = parseOptions2;
  const miniProgramPageOptions = parseComponent(vueOptions, {
    mocks: mocks2,
    isPage: isPage2,
    initRelation: initRelation2,
    handleLink: handleLink2,
    initLifetimes: initLifetimes2
  });
  initPageProps(miniProgramPageOptions, (vueOptions.default || vueOptions).props);
  const methods = miniProgramPageOptions.methods;
  methods.onLoad = function(query) {
    this.options = query;
    this.$page = {
      fullPath: addLeadingSlash(this.route + stringifyQuery(query))
    };
    return this.$vm && this.$vm.$callHook(ON_LOAD, query);
  };
  initHooks(methods, PAGE_INIT_HOOKS);
  initUnknownHooks(methods, vueOptions);
  initRuntimeHooks(methods, vueOptions.__runtimeHooks);
  initMixinRuntimeHooks(methods);
  parse2 && parse2(miniProgramPageOptions, { handleLink: handleLink2 });
  return miniProgramPageOptions;
}
function initCreatePage(parseOptions2) {
  return function createPage2(vuePageOptions) {
    return Component(parsePage(vuePageOptions, parseOptions2));
  };
}
function initCreatePluginApp(parseAppOptions) {
  return function createApp2(vm) {
    initAppLifecycle(parseApp(vm, parseAppOptions), vm);
  };
}
const ON_READY = "onReady";
const MPPage = Page;
const MPComponent = Component;
function initTriggerEvent(mpInstance) {
  const oldTriggerEvent = mpInstance.triggerEvent;
  mpInstance.triggerEvent = function(event, ...args) {
    return oldTriggerEvent.apply(mpInstance, [customizeEvent(event), ...args]);
  };
}
function initHook(name, options, isComponent) {
  const oldHook = options[name];
  if (!oldHook) {
    options[name] = function() {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function(...args) {
      initTriggerEvent(this);
      return oldHook.apply(this, args);
    };
  }
}
Page = function(options) {
  initHook(ON_LOAD, options);
  return MPPage(options);
};
Component = function(options) {
  initHook("created", options);
  const isVueComponent = options.properties && options.properties.uP;
  if (!isVueComponent) {
    initProps(options);
    initPropsObserver(options);
  }
  return MPComponent(options);
};
function initLifetimes({ mocks: mocks2, isPage: isPage2, initRelation: initRelation2, vueOptions }) {
  return {
    attached() {
      const properties = this.properties;
      initVueIds(properties.uI, this);
      const relationOptions = {
        vuePid: this._$vuePid
      };
      initRelation2(this, relationOptions);
      const mpInstance = this;
      const isMiniProgramPage = isPage2(mpInstance);
      this.$vm = $createComponent({
        type: vueOptions,
        props: findPropsData(properties, isMiniProgramPage)
      }, {
        mpType: isMiniProgramPage ? "page" : "component",
        mpInstance,
        slots: properties.uS || {},
        parentComponent: relationOptions.parent && relationOptions.parent.$,
        onBeforeSetup(instance, options) {
          initRefs(instance, mpInstance);
          initMocks(instance, mpInstance, mocks2);
          initComponentInstance(instance, options);
        }
      });
    },
    ready() {
      if (this.$vm) {
        {
          this.$vm.$callHook("mounted");
          this.$vm.$callHook(ON_READY);
        }
      }
    },
    detached() {
      if (this.$vm) {
        pruneComponentPropsCache(this.$vm.$.uid);
        $destroyComponent(this.$vm);
      }
    }
  };
}
const mocks = ["__route__", "__wxExparserNodeId__", "__wxWebviewId__"];
function isPage(mpInstance) {
  return !!mpInstance.route;
}
function initRelation(mpInstance, detail) {
  mpInstance.triggerEvent("__l", detail);
}
function handleLink(event) {
  const detail = event.detail || event.value;
  const vuePid = detail.vuePid;
  let parentVm;
  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }
  if (!parentVm) {
    parentVm = this.$vm;
  }
  detail.parent = parentVm;
}
var parseOptions = /* @__PURE__ */ Object.freeze({
  __proto__: null,
  mocks,
  isPage,
  initRelation,
  handleLink,
  initLifetimes
});
const createApp = initCreateApp();
const createPage = initCreatePage(parseOptions);
const createComponent = initCreateComponent(parseOptions);
const createPluginApp = initCreatePluginApp();
const createSubpackageApp = initCreateSubpackageApp();
wx.createApp = global.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createPluginApp = createPluginApp;
wx.createSubpackageApp = createSubpackageApp;
const isArray = Array.isArray;
const isObject = (val) => val !== null && typeof val === "object";
const defaultDelimiters = ["{", "}"];
class BaseFormatter {
  constructor() {
    this._caches = /* @__PURE__ */ Object.create(null);
  }
  interpolate(message, values, delimiters = defaultDelimiters) {
    if (!values) {
      return [message];
    }
    let tokens = this._caches[message];
    if (!tokens) {
      tokens = parse(message, delimiters);
      this._caches[message] = tokens;
    }
    return compile(tokens, values);
  }
}
const RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
const RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, [startDelimiter, endDelimiter]) {
  const tokens = [];
  let position = 0;
  let text = "";
  while (position < format.length) {
    let char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: "text", value: text });
      }
      text = "";
      let sub = "";
      char = format[position++];
      while (char !== void 0 && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      const isClosed = char === endDelimiter;
      const type = RE_TOKEN_LIST_VALUE.test(sub) ? "list" : isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ? "named" : "unknown";
      tokens.push({ value: sub, type });
    } else {
      text += char;
    }
  }
  text && tokens.push({ type: "text", value: text });
  return tokens;
}
function compile(tokens, values) {
  const compiled = [];
  let index2 = 0;
  const mode = isArray(values) ? "list" : isObject(values) ? "named" : "unknown";
  if (mode === "unknown") {
    return compiled;
  }
  while (index2 < tokens.length) {
    const token = tokens[index2];
    switch (token.type) {
      case "text":
        compiled.push(token.value);
        break;
      case "list":
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case "named":
        if (mode === "named") {
          compiled.push(values[token.value]);
        } else {
          {
            console.warn(`Type of token '${token.type}' and format of value '${mode}' don't match!`);
          }
        }
        break;
      case "unknown":
        {
          console.warn(`Detect 'unknown' type of token!`);
        }
        break;
    }
    index2++;
  }
  return compiled;
}
const LOCALE_ZH_HANS = "zh-Hans";
const LOCALE_ZH_HANT = "zh-Hant";
const LOCALE_EN = "en";
const LOCALE_FR = "fr";
const LOCALE_ES = "es";
const hasOwnProperty = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty.call(val, key);
const defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find((part) => str.indexOf(part) !== -1);
}
function startsWith(str, parts) {
  return parts.find((part) => str.indexOf(part) === 0);
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, "-");
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale === "chinese") {
    return LOCALE_ZH_HANS;
  }
  if (locale.indexOf("zh") === 0) {
    if (locale.indexOf("-hans") > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf("-hant") > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ["-tw", "-hk", "-mo", "-cht"])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  const lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}
class I18n {
  constructor({ locale, fallbackLocale, messages, watcher, formater }) {
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }
  setLocale(locale) {
    const oldLocale = this.locale;
    this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
    if (!this.messages[this.locale]) {
      this.messages[this.locale] = {};
    }
    this.message = this.messages[this.locale];
    if (oldLocale !== this.locale) {
      this.watchers.forEach((watcher) => {
        watcher(this.locale, oldLocale);
      });
    }
  }
  getLocale() {
    return this.locale;
  }
  watchLocale(fn) {
    const index2 = this.watchers.push(fn) - 1;
    return () => {
      this.watchers.splice(index2, 1);
    };
  }
  add(locale, message, override = true) {
    const curMessages = this.messages[locale];
    if (curMessages) {
      if (override) {
        Object.assign(curMessages, message);
      } else {
        Object.keys(message).forEach((key) => {
          if (!hasOwn(curMessages, key)) {
            curMessages[key] = message[key];
          }
        });
      }
    } else {
      this.messages[locale] = message;
    }
  }
  f(message, values, delimiters) {
    return this.formater.interpolate(message, values, delimiters).join("");
  }
  t(key, locale, values) {
    let message = this.message;
    if (typeof locale === "string") {
      locale = normalizeLocale(locale, this.messages);
      locale && (message = this.messages[locale]);
    } else {
      values = locale;
    }
    if (!hasOwn(message, key)) {
      console.warn(`Cannot translate the value of keypath ${key}. Use the value of keypath as default.`);
      return key;
    }
    return this.formater.interpolate(message[key], values).join("");
  }
}
function watchAppLocale(appVm, i18n) {
  if (appVm.$watchLocale) {
    appVm.$watchLocale((newLocale) => {
      i18n.setLocale(newLocale);
    });
  } else {
    appVm.$watch(() => appVm.$locale, (newLocale) => {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof index !== "undefined" && index.getLocale) {
    return index.getLocale();
  }
  if (typeof global !== "undefined" && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale, messages = {}, fallbackLocale, watcher) {
  if (typeof locale !== "string") {
    [locale, messages] = [
      messages,
      locale
    ];
  }
  if (typeof locale !== "string") {
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== "string") {
    fallbackLocale = typeof __uniConfig !== "undefined" && __uniConfig.fallbackLocale || LOCALE_EN;
  }
  const i18n = new I18n({
    locale,
    fallbackLocale,
    messages,
    watcher
  });
  let t2 = (key, values) => {
    if (typeof getApp !== "function") {
      t2 = function(key2, values2) {
        return i18n.t(key2, values2);
      };
    } else {
      let isWatchedAppLocale = false;
      t2 = function(key2, values2) {
        const appVm = getApp().$vm;
        if (appVm) {
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key2, values2);
      };
    }
    return t2(key, values);
  };
  return {
    i18n,
    f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t(key, values) {
      return t2(key, values);
    },
    add(locale2, message, override = true) {
      return i18n.add(locale2, message, override);
    },
    watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale() {
      return i18n.getLocale();
    },
    setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    }
  };
}
function t(e2) {
  return e2 && e2.__esModule && Object.prototype.hasOwnProperty.call(e2, "default") ? e2.default : e2;
}
function n(e2, t2, n2) {
  return e2(n2 = { path: t2, exports: {}, require: function(e3, t3) {
    return function() {
      throw new Error("Dynamic requires are not currently supported by @rollup/plugin-commonjs");
    }(t3 == null && n2.path);
  } }, n2.exports), n2.exports;
}
var s = n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = n2 || function(e3, t3) {
    var n3 = Object.create || function() {
      function e4() {
      }
      return function(t4) {
        var n4;
        return e4.prototype = t4, n4 = new e4(), e4.prototype = null, n4;
      };
    }(), s2 = {}, r2 = s2.lib = {}, o2 = r2.Base = { extend: function(e4) {
      var t4 = n3(this);
      return e4 && t4.mixIn(e4), t4.hasOwnProperty("init") && this.init !== t4.init || (t4.init = function() {
        t4.$super.init.apply(this, arguments);
      }), t4.init.prototype = t4, t4.$super = this, t4;
    }, create: function() {
      var e4 = this.extend();
      return e4.init.apply(e4, arguments), e4;
    }, init: function() {
    }, mixIn: function(e4) {
      for (var t4 in e4)
        e4.hasOwnProperty(t4) && (this[t4] = e4[t4]);
      e4.hasOwnProperty("toString") && (this.toString = e4.toString);
    }, clone: function() {
      return this.init.prototype.extend(this);
    } }, i2 = r2.WordArray = o2.extend({ init: function(e4, n4) {
      e4 = this.words = e4 || [], this.sigBytes = n4 != t3 ? n4 : 4 * e4.length;
    }, toString: function(e4) {
      return (e4 || c2).stringify(this);
    }, concat: function(e4) {
      var t4 = this.words, n4 = e4.words, s3 = this.sigBytes, r3 = e4.sigBytes;
      if (this.clamp(), s3 % 4)
        for (var o3 = 0; o3 < r3; o3++) {
          var i3 = n4[o3 >>> 2] >>> 24 - o3 % 4 * 8 & 255;
          t4[s3 + o3 >>> 2] |= i3 << 24 - (s3 + o3) % 4 * 8;
        }
      else
        for (o3 = 0; o3 < r3; o3 += 4)
          t4[s3 + o3 >>> 2] = n4[o3 >>> 2];
      return this.sigBytes += r3, this;
    }, clamp: function() {
      var t4 = this.words, n4 = this.sigBytes;
      t4[n4 >>> 2] &= 4294967295 << 32 - n4 % 4 * 8, t4.length = e3.ceil(n4 / 4);
    }, clone: function() {
      var e4 = o2.clone.call(this);
      return e4.words = this.words.slice(0), e4;
    }, random: function(t4) {
      for (var n4, s3 = [], r3 = function(t5) {
        t5 = t5;
        var n5 = 987654321, s4 = 4294967295;
        return function() {
          var r4 = ((n5 = 36969 * (65535 & n5) + (n5 >> 16) & s4) << 16) + (t5 = 18e3 * (65535 & t5) + (t5 >> 16) & s4) & s4;
          return r4 /= 4294967296, (r4 += 0.5) * (e3.random() > 0.5 ? 1 : -1);
        };
      }, o3 = 0; o3 < t4; o3 += 4) {
        var a3 = r3(4294967296 * (n4 || e3.random()));
        n4 = 987654071 * a3(), s3.push(4294967296 * a3() | 0);
      }
      return new i2.init(s3, t4);
    } }), a2 = s2.enc = {}, c2 = a2.Hex = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var o3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push((o3 >>> 4).toString(16)), s3.push((15 & o3).toString(16));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3 += 2)
        n4[s3 >>> 3] |= parseInt(e4.substr(s3, 2), 16) << 24 - s3 % 8 * 4;
      return new i2.init(n4, t4 / 2);
    } }, u2 = a2.Latin1 = { stringify: function(e4) {
      for (var t4 = e4.words, n4 = e4.sigBytes, s3 = [], r3 = 0; r3 < n4; r3++) {
        var o3 = t4[r3 >>> 2] >>> 24 - r3 % 4 * 8 & 255;
        s3.push(String.fromCharCode(o3));
      }
      return s3.join("");
    }, parse: function(e4) {
      for (var t4 = e4.length, n4 = [], s3 = 0; s3 < t4; s3++)
        n4[s3 >>> 2] |= (255 & e4.charCodeAt(s3)) << 24 - s3 % 4 * 8;
      return new i2.init(n4, t4);
    } }, h2 = a2.Utf8 = { stringify: function(e4) {
      try {
        return decodeURIComponent(escape(u2.stringify(e4)));
      } catch (e5) {
        throw new Error("Malformed UTF-8 data");
      }
    }, parse: function(e4) {
      return u2.parse(unescape(encodeURIComponent(e4)));
    } }, l2 = r2.BufferedBlockAlgorithm = o2.extend({ reset: function() {
      this._data = new i2.init(), this._nDataBytes = 0;
    }, _append: function(e4) {
      typeof e4 == "string" && (e4 = h2.parse(e4)), this._data.concat(e4), this._nDataBytes += e4.sigBytes;
    }, _process: function(t4) {
      var n4 = this._data, s3 = n4.words, r3 = n4.sigBytes, o3 = this.blockSize, a3 = r3 / (4 * o3), c3 = (a3 = t4 ? e3.ceil(a3) : e3.max((0 | a3) - this._minBufferSize, 0)) * o3, u3 = e3.min(4 * c3, r3);
      if (c3) {
        for (var h3 = 0; h3 < c3; h3 += o3)
          this._doProcessBlock(s3, h3);
        var l3 = s3.splice(0, c3);
        n4.sigBytes -= u3;
      }
      return new i2.init(l3, u3);
    }, clone: function() {
      var e4 = o2.clone.call(this);
      return e4._data = this._data.clone(), e4;
    }, _minBufferSize: 0 });
    r2.Hasher = l2.extend({ cfg: o2.extend(), init: function(e4) {
      this.cfg = this.cfg.extend(e4), this.reset();
    }, reset: function() {
      l2.reset.call(this), this._doReset();
    }, update: function(e4) {
      return this._append(e4), this._process(), this;
    }, finalize: function(e4) {
      return e4 && this._append(e4), this._doFinalize();
    }, blockSize: 16, _createHelper: function(e4) {
      return function(t4, n4) {
        return new e4.init(n4).finalize(t4);
      };
    }, _createHmacHelper: function(e4) {
      return function(t4, n4) {
        return new d.HMAC.init(e4, n4).finalize(t4);
      };
    } });
    var d = s2.algo = {};
    return s2;
  }(Math), n2);
}), r = (n(function(e2, t2) {
  var n2;
  e2.exports = (n2 = s, function(e3) {
    var t3 = n2, s2 = t3.lib, r2 = s2.WordArray, o2 = s2.Hasher, i2 = t3.algo, a2 = [];
    !function() {
      for (var t4 = 0; t4 < 64; t4++)
        a2[t4] = 4294967296 * e3.abs(e3.sin(t4 + 1)) | 0;
    }();
    var c2 = i2.MD5 = o2.extend({ _doReset: function() {
      this._hash = new r2.init([1732584193, 4023233417, 2562383102, 271733878]);
    }, _doProcessBlock: function(e4, t4) {
      for (var n3 = 0; n3 < 16; n3++) {
        var s3 = t4 + n3, r3 = e4[s3];
        e4[s3] = 16711935 & (r3 << 8 | r3 >>> 24) | 4278255360 & (r3 << 24 | r3 >>> 8);
      }
      var o3 = this._hash.words, i3 = e4[t4 + 0], c3 = e4[t4 + 1], f2 = e4[t4 + 2], p2 = e4[t4 + 3], g2 = e4[t4 + 4], m2 = e4[t4 + 5], y2 = e4[t4 + 6], _2 = e4[t4 + 7], w2 = e4[t4 + 8], k2 = e4[t4 + 9], v2 = e4[t4 + 10], S2 = e4[t4 + 11], T2 = e4[t4 + 12], A2 = e4[t4 + 13], P2 = e4[t4 + 14], I2 = e4[t4 + 15], b2 = o3[0], E2 = o3[1], O2 = o3[2], C2 = o3[3];
      b2 = u2(b2, E2, O2, C2, i3, 7, a2[0]), C2 = u2(C2, b2, E2, O2, c3, 12, a2[1]), O2 = u2(O2, C2, b2, E2, f2, 17, a2[2]), E2 = u2(E2, O2, C2, b2, p2, 22, a2[3]), b2 = u2(b2, E2, O2, C2, g2, 7, a2[4]), C2 = u2(C2, b2, E2, O2, m2, 12, a2[5]), O2 = u2(O2, C2, b2, E2, y2, 17, a2[6]), E2 = u2(E2, O2, C2, b2, _2, 22, a2[7]), b2 = u2(b2, E2, O2, C2, w2, 7, a2[8]), C2 = u2(C2, b2, E2, O2, k2, 12, a2[9]), O2 = u2(O2, C2, b2, E2, v2, 17, a2[10]), E2 = u2(E2, O2, C2, b2, S2, 22, a2[11]), b2 = u2(b2, E2, O2, C2, T2, 7, a2[12]), C2 = u2(C2, b2, E2, O2, A2, 12, a2[13]), O2 = u2(O2, C2, b2, E2, P2, 17, a2[14]), b2 = h2(b2, E2 = u2(E2, O2, C2, b2, I2, 22, a2[15]), O2, C2, c3, 5, a2[16]), C2 = h2(C2, b2, E2, O2, y2, 9, a2[17]), O2 = h2(O2, C2, b2, E2, S2, 14, a2[18]), E2 = h2(E2, O2, C2, b2, i3, 20, a2[19]), b2 = h2(b2, E2, O2, C2, m2, 5, a2[20]), C2 = h2(C2, b2, E2, O2, v2, 9, a2[21]), O2 = h2(O2, C2, b2, E2, I2, 14, a2[22]), E2 = h2(E2, O2, C2, b2, g2, 20, a2[23]), b2 = h2(b2, E2, O2, C2, k2, 5, a2[24]), C2 = h2(C2, b2, E2, O2, P2, 9, a2[25]), O2 = h2(O2, C2, b2, E2, p2, 14, a2[26]), E2 = h2(E2, O2, C2, b2, w2, 20, a2[27]), b2 = h2(b2, E2, O2, C2, A2, 5, a2[28]), C2 = h2(C2, b2, E2, O2, f2, 9, a2[29]), O2 = h2(O2, C2, b2, E2, _2, 14, a2[30]), b2 = l2(b2, E2 = h2(E2, O2, C2, b2, T2, 20, a2[31]), O2, C2, m2, 4, a2[32]), C2 = l2(C2, b2, E2, O2, w2, 11, a2[33]), O2 = l2(O2, C2, b2, E2, S2, 16, a2[34]), E2 = l2(E2, O2, C2, b2, P2, 23, a2[35]), b2 = l2(b2, E2, O2, C2, c3, 4, a2[36]), C2 = l2(C2, b2, E2, O2, g2, 11, a2[37]), O2 = l2(O2, C2, b2, E2, _2, 16, a2[38]), E2 = l2(E2, O2, C2, b2, v2, 23, a2[39]), b2 = l2(b2, E2, O2, C2, A2, 4, a2[40]), C2 = l2(C2, b2, E2, O2, i3, 11, a2[41]), O2 = l2(O2, C2, b2, E2, p2, 16, a2[42]), E2 = l2(E2, O2, C2, b2, y2, 23, a2[43]), b2 = l2(b2, E2, O2, C2, k2, 4, a2[44]), C2 = l2(C2, b2, E2, O2, T2, 11, a2[45]), O2 = l2(O2, C2, b2, E2, I2, 16, a2[46]), b2 = d(b2, E2 = l2(E2, O2, C2, b2, f2, 23, a2[47]), O2, C2, i3, 6, a2[48]), C2 = d(C2, b2, E2, O2, _2, 10, a2[49]), O2 = d(O2, C2, b2, E2, P2, 15, a2[50]), E2 = d(E2, O2, C2, b2, m2, 21, a2[51]), b2 = d(b2, E2, O2, C2, T2, 6, a2[52]), C2 = d(C2, b2, E2, O2, p2, 10, a2[53]), O2 = d(O2, C2, b2, E2, v2, 15, a2[54]), E2 = d(E2, O2, C2, b2, c3, 21, a2[55]), b2 = d(b2, E2, O2, C2, w2, 6, a2[56]), C2 = d(C2, b2, E2, O2, I2, 10, a2[57]), O2 = d(O2, C2, b2, E2, y2, 15, a2[58]), E2 = d(E2, O2, C2, b2, A2, 21, a2[59]), b2 = d(b2, E2, O2, C2, g2, 6, a2[60]), C2 = d(C2, b2, E2, O2, S2, 10, a2[61]), O2 = d(O2, C2, b2, E2, f2, 15, a2[62]), E2 = d(E2, O2, C2, b2, k2, 21, a2[63]), o3[0] = o3[0] + b2 | 0, o3[1] = o3[1] + E2 | 0, o3[2] = o3[2] + O2 | 0, o3[3] = o3[3] + C2 | 0;
    }, _doFinalize: function() {
      var t4 = this._data, n3 = t4.words, s3 = 8 * this._nDataBytes, r3 = 8 * t4.sigBytes;
      n3[r3 >>> 5] |= 128 << 24 - r3 % 32;
      var o3 = e3.floor(s3 / 4294967296), i3 = s3;
      n3[15 + (r3 + 64 >>> 9 << 4)] = 16711935 & (o3 << 8 | o3 >>> 24) | 4278255360 & (o3 << 24 | o3 >>> 8), n3[14 + (r3 + 64 >>> 9 << 4)] = 16711935 & (i3 << 8 | i3 >>> 24) | 4278255360 & (i3 << 24 | i3 >>> 8), t4.sigBytes = 4 * (n3.length + 1), this._process();
      for (var a3 = this._hash, c3 = a3.words, u3 = 0; u3 < 4; u3++) {
        var h3 = c3[u3];
        c3[u3] = 16711935 & (h3 << 8 | h3 >>> 24) | 4278255360 & (h3 << 24 | h3 >>> 8);
      }
      return a3;
    }, clone: function() {
      var e4 = o2.clone.call(this);
      return e4._hash = this._hash.clone(), e4;
    } });
    function u2(e4, t4, n3, s3, r3, o3, i3) {
      var a3 = e4 + (t4 & n3 | ~t4 & s3) + r3 + i3;
      return (a3 << o3 | a3 >>> 32 - o3) + t4;
    }
    function h2(e4, t4, n3, s3, r3, o3, i3) {
      var a3 = e4 + (t4 & s3 | n3 & ~s3) + r3 + i3;
      return (a3 << o3 | a3 >>> 32 - o3) + t4;
    }
    function l2(e4, t4, n3, s3, r3, o3, i3) {
      var a3 = e4 + (t4 ^ n3 ^ s3) + r3 + i3;
      return (a3 << o3 | a3 >>> 32 - o3) + t4;
    }
    function d(e4, t4, n3, s3, r3, o3, i3) {
      var a3 = e4 + (n3 ^ (t4 | ~s3)) + r3 + i3;
      return (a3 << o3 | a3 >>> 32 - o3) + t4;
    }
    t3.MD5 = o2._createHelper(c2), t3.HmacMD5 = o2._createHmacHelper(c2);
  }(Math), n2.MD5);
}), n(function(e2, t2) {
  var n2, r2, o2;
  e2.exports = (r2 = (n2 = s).lib.Base, o2 = n2.enc.Utf8, void (n2.algo.HMAC = r2.extend({ init: function(e3, t3) {
    e3 = this._hasher = new e3.init(), typeof t3 == "string" && (t3 = o2.parse(t3));
    var n3 = e3.blockSize, s2 = 4 * n3;
    t3.sigBytes > s2 && (t3 = e3.finalize(t3)), t3.clamp();
    for (var r3 = this._oKey = t3.clone(), i2 = this._iKey = t3.clone(), a2 = r3.words, c2 = i2.words, u2 = 0; u2 < n3; u2++)
      a2[u2] ^= 1549556828, c2[u2] ^= 909522486;
    r3.sigBytes = i2.sigBytes = s2, this.reset();
  }, reset: function() {
    var e3 = this._hasher;
    e3.reset(), e3.update(this._iKey);
  }, update: function(e3) {
    return this._hasher.update(e3), this;
  }, finalize: function(e3) {
    var t3 = this._hasher, n3 = t3.finalize(e3);
    return t3.reset(), t3.finalize(this._oKey.clone().concat(n3));
  } })));
}), n(function(e2, t2) {
  e2.exports = s.HmacMD5;
}));
function o(e2) {
  return Object.prototype.toString.call(e2).slice(8, -1).toLowerCase();
}
function i(e2) {
  return o(e2) === "object";
}
function a(e2) {
  return e2 && typeof e2 == "string" ? JSON.parse(e2) : e2;
}
const c = true, u = "mp-weixin", h = a({}.UNICLOUD_DEBUG), l = a("[]");
let f = "";
try {
  f = "";
} catch (e2) {
}
let p = {};
function g(e2, t2 = {}) {
  var n2, s2;
  return n2 = p, s2 = e2, Object.prototype.hasOwnProperty.call(n2, s2) || (p[e2] = t2), p[e2];
}
const m = ["invoke", "success", "fail", "complete"], y = g("_globalUniCloudInterceptor");
function _(e2, t2) {
  y[e2] || (y[e2] = {}), i(t2) && Object.keys(t2).forEach((n2) => {
    m.indexOf(n2) > -1 && function(e3, t3, n3) {
      let s2 = y[e3][t3];
      s2 || (s2 = y[e3][t3] = []), s2.indexOf(n3) === -1 && typeof n3 == "function" && s2.push(n3);
    }(e2, n2, t2[n2]);
  });
}
function w(e2, t2) {
  y[e2] || (y[e2] = {}), i(t2) ? Object.keys(t2).forEach((n2) => {
    m.indexOf(n2) > -1 && function(e3, t3, n3) {
      const s2 = y[e3][t3];
      if (!s2)
        return;
      const r2 = s2.indexOf(n3);
      r2 > -1 && s2.splice(r2, 1);
    }(e2, n2, t2[n2]);
  }) : delete y[e2];
}
function k(e2, t2) {
  return e2 && e2.length !== 0 ? e2.reduce((e3, n2) => e3.then(() => n2(t2)), Promise.resolve()) : Promise.resolve();
}
function v(e2, t2) {
  return y[e2] && y[e2][t2] || [];
}
function S(e2, t2) {
  return t2 ? function(n2) {
    const s2 = t2 === "callFunction" && (n2 && n2.name) === "DCloud-clientDB";
    let r2;
    r2 = this.isReady ? Promise.resolve() : this.initUniCloud, n2 = n2 || {};
    const o2 = r2.then(() => s2 ? Promise.resolve() : k(v(t2, "invoke"), n2)).then(() => e2.call(this, n2)).then((e3) => s2 ? Promise.resolve(e3) : k(v(t2, "success"), e3).then(() => k(v(t2, "complete"), e3)).then(() => Promise.resolve(e3)), (e3) => s2 ? Promise.reject(e3) : k(v(t2, "fail"), e3).then(() => k(v(t2, "complete"), e3)).then(() => Promise.reject(e3)));
    if (!(n2.success || n2.fail || n2.complete))
      return o2;
    o2.then((e3) => {
      n2.success && n2.success(e3), n2.complete && n2.complete(e3);
    }, (e3) => {
      n2.fail && n2.fail(e3), n2.complete && n2.complete(e3);
    });
  } : function(t3) {
    if (!((t3 = t3 || {}).success || t3.fail || t3.complete))
      return e2.call(this, t3);
    e2.call(this, t3).then((e3) => {
      t3.success && t3.success(e3), t3.complete && t3.complete(e3);
    }, (e3) => {
      t3.fail && t3.fail(e3), t3.complete && t3.complete(e3);
    });
  };
}
class T extends Error {
  constructor(e2) {
    super(e2.message), this.errMsg = e2.message || "", Object.defineProperties(this, { code: { get: () => e2.code }, errCode: { get: () => e2.code }, requestId: { get: () => e2.requestId }, message: { get() {
      return this.errMsg;
    }, set(e3) {
      this.errMsg = e3;
    } } });
  }
}
let A;
function P() {
  const e2 = index.getLocale && index.getLocale() || "en";
  if (A)
    return __spreadProps(__spreadValues({}, A), { LOCALE: e2 });
  const { deviceId: t2, platform: n2 } = index.getSystemInfoSync();
  return A = { PLATFORM: u, OS: n2, APPID: f, DEVICEID: t2, CLIENT_SDK_VERSION: "1.0.23" }, __spreadProps(__spreadValues({}, A), { LOCALE: e2 });
}
var I = { sign: function(e2, t2) {
  let n2 = "";
  return Object.keys(e2).sort().forEach(function(t3) {
    e2[t3] && (n2 = n2 + "&" + t3 + "=" + e2[t3]);
  }), n2 = n2.slice(1), r(n2, t2).toString();
}, wrappedRequest: function(e2, t2) {
  return new Promise((n2, s2) => {
    t2(Object.assign(e2, { complete(e3) {
      e3 || (e3 = {});
      const t3 = e3.data && e3.data.header && e3.data.header["x-serverless-request-id"] || e3.header && e3.header["request-id"];
      if (!e3.statusCode || e3.statusCode >= 400)
        return s2(new T({ code: "SYS_ERR", message: e3.errMsg || "request:fail", requestId: t3 }));
      const r2 = e3.data;
      if (r2.error)
        return s2(new T({ code: r2.error.code, message: r2.error.message, requestId: t3 }));
      r2.result = r2.data, r2.requestId = t3, delete r2.data, n2(r2);
    } }));
  });
} };
var b = { request: (e2) => index.request(e2), uploadFile: (e2) => index.uploadFile(e2), setStorageSync: (e2, t2) => index.setStorageSync(e2, t2), getStorageSync: (e2) => index.getStorageSync(e2), removeStorageSync: (e2) => index.removeStorageSync(e2), clearStorageSync: () => index.clearStorageSync() }, E = { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" };
const { t: O } = initVueI18n({ "zh-Hans": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, "zh-Hant": { "uniCloud.init.paramRequired": "\u7F3A\u5C11\u53C2\u6570\uFF1A{param}", "uniCloud.uploadFile.fileError": "filePath\u5E94\u4E3AFile\u5BF9\u8C61" }, en: E, fr: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, es: { "uniCloud.init.paramRequired": "{param} required", "uniCloud.uploadFile.fileError": "filePath should be instance of File" }, ja: E }, "zh-Hans");
var C = class {
  constructor(e2) {
    ["spaceId", "clientSecret"].forEach((t2) => {
      if (!Object.prototype.hasOwnProperty.call(e2, t2))
        throw new Error(O("uniCloud.init.paramRequired", { param: t2 }));
    }), this.config = Object.assign({}, { endpoint: "https://api.bspapp.com" }, e2), this.config.provider = "aliyun", this.config.requestUrl = this.config.endpoint + "/client", this.config.envType = this.config.envType || "public", this.config.accessTokenKey = "access_token_" + this.config.spaceId, this.adapter = b, this._getAccessTokenPromise = null, this._getAccessTokenPromiseStatus = null;
  }
  get hasAccessToken() {
    return !!this.accessToken;
  }
  setAccessToken(e2) {
    this.accessToken = e2;
  }
  requestWrapped(e2) {
    return I.wrappedRequest(e2, this.adapter.request);
  }
  requestAuth(e2) {
    return this.requestWrapped(e2);
  }
  request(e2, t2) {
    return Promise.resolve().then(() => this.hasAccessToken ? t2 ? this.requestWrapped(e2) : this.requestWrapped(e2).catch((t3) => new Promise((e3, n2) => {
      !t3 || t3.code !== "GATEWAY_INVALID_TOKEN" && t3.code !== "InvalidParameter.InvalidToken" ? n2(t3) : e3();
    }).then(() => this.getAccessToken()).then(() => {
      const t4 = this.rebuildRequest(e2);
      return this.request(t4, true);
    })) : this.getAccessToken().then(() => {
      const t3 = this.rebuildRequest(e2);
      return this.request(t3, true);
    }));
  }
  rebuildRequest(e2) {
    const t2 = Object.assign({}, e2);
    return t2.data.token = this.accessToken, t2.header["x-basement-token"] = this.accessToken, t2.header["x-serverless-sign"] = I.sign(t2.data, this.config.clientSecret), t2;
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    return t2 !== "auth" && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = I.sign(n2, this.config.clientSecret), { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: s2 };
  }
  getAccessToken() {
    if (this._getAccessTokenPromiseStatus === "pending")
      return this._getAccessTokenPromise;
    this._getAccessTokenPromiseStatus = "pending";
    return this._getAccessTokenPromise = this.requestAuth(this.setupRequest({ method: "serverless.auth.user.anonymousAuthorize", params: "{}" }, "auth")).then((e2) => new Promise((t2, n2) => {
      e2.result && e2.result.accessToken ? (this.setAccessToken(e2.result.accessToken), this._getAccessTokenPromiseStatus = "fulfilled", t2(this.accessToken)) : (this._getAccessTokenPromiseStatus = "rejected", n2(new T({ code: "AUTH_FAILED", message: "\u83B7\u53D6accessToken\u5931\u8D25" })));
    }), (e2) => (this._getAccessTokenPromiseStatus = "rejected", Promise.reject(e2))), this._getAccessTokenPromise;
  }
  authorize() {
    this.getAccessToken();
  }
  callFunction(e2) {
    const t2 = { method: "serverless.function.runtime.invoke", params: JSON.stringify({ functionTarget: e2.name, functionArgs: e2.data || {} }) };
    return this.request(this.setupRequest(t2));
  }
  getOSSUploadOptionsFromPath(e2) {
    const t2 = { method: "serverless.file.resource.generateProximalSign", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: o2 }) {
    return new Promise((i2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, header: { "X-OSS-server-side-encrpytion": "AES256" }, success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : a2(new T({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }, fail(e3) {
        a2(new T({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      } });
      typeof o2 == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((e3) => {
        o2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  reportOSSUpload(e2) {
    const t2 = { method: "serverless.file.resource.report", params: JSON.stringify(e2) };
    return this.request(this.setupRequest(t2));
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2, config: r2 }) {
    if (o(t2) !== "string")
      throw new T({ code: "INVALID_PARAM", message: "cloudPath\u5FC5\u987B\u4E3A\u5B57\u7B26\u4E32\u7C7B\u578B" });
    if (!(t2 = t2.trim()))
      throw new T({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
    if (/:\/\//.test(t2))
      throw new T({ code: "INVALID_PARAM", message: "cloudPath\u4E0D\u5408\u6CD5" });
    const i2 = r2 && r2.envType || this.config.envType;
    let a2, c2;
    return this.getOSSUploadOptionsFromPath({ env: i2, filename: t2 }).then((t3) => {
      const r3 = t3.result;
      a2 = r3.id, c2 = "https://" + r3.cdnDomain + "/" + r3.ossPath;
      const o2 = { url: "https://" + r3.host, formData: { "Cache-Control": "max-age=2592000", "Content-Disposition": "attachment", OSSAccessKeyId: r3.accessKeyId, Signature: r3.signature, host: r3.host, id: a2, key: r3.ossPath, policy: r3.policy, success_action_status: 200 }, fileName: "file", name: "file", filePath: e2, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, o2, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ id: a2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: c2 }) : s3(new T({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ id: e2[0] }) };
    return this.request(this.setupRequest(t2));
  }
  getTempFileURL({ fileList: e2 } = {}) {
    return new Promise((t2, n2) => {
      Array.isArray(e2) && e2.length !== 0 || n2(new T({ code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" })), t2({ fileList: e2.map((e3) => ({ fileID: e3, tempFileURL: e3 })) });
    });
  }
};
var U = { init(e2) {
  const t2 = new C(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
const x = typeof location != "undefined" && location.protocol === "http:" ? "http:" : "https:";
var D;
!function(e2) {
  e2.local = "local", e2.none = "none", e2.session = "session";
}(D || (D = {}));
var q = function() {
};
const R = () => {
  let e2;
  if (!Promise) {
    e2 = () => {
    }, e2.promise = {};
    const t3 = () => {
      throw new Error('Your Node runtime does support ES6 Promises. Set "global.Promise" to your preferred implementation of promises.');
    };
    return Object.defineProperty(e2.promise, "then", { get: t3 }), Object.defineProperty(e2.promise, "catch", { get: t3 }), e2;
  }
  const t2 = new Promise((t3, n2) => {
    e2 = (e3, s2) => e3 ? n2(e3) : t3(s2);
  });
  return e2.promise = t2, e2;
};
function F(e2) {
  return e2 === void 0;
}
function L(e2) {
  return Object.prototype.toString.call(e2) === "[object Null]";
}
var N;
function $(e2) {
  const t2 = (n2 = e2, Object.prototype.toString.call(n2) === "[object Array]" ? e2 : [e2]);
  var n2;
  for (const e3 of t2) {
    const { isMatch: t3, genAdapter: n3, runtime: s2 } = e3;
    if (t3())
      return { adapter: n3(), runtime: s2 };
  }
}
!function(e2) {
  e2.WEB = "web", e2.WX_MP = "wx_mp";
}(N || (N = {}));
const M = { adapter: null, runtime: void 0 }, j = ["anonymousUuidKey"];
class B extends q {
  constructor() {
    super(), M.adapter.root.tcbObject || (M.adapter.root.tcbObject = {});
  }
  setItem(e2, t2) {
    M.adapter.root.tcbObject[e2] = t2;
  }
  getItem(e2) {
    return M.adapter.root.tcbObject[e2];
  }
  removeItem(e2) {
    delete M.adapter.root.tcbObject[e2];
  }
  clear() {
    delete M.adapter.root.tcbObject;
  }
}
function K(e2, t2) {
  switch (e2) {
    case "local":
      return t2.localStorage || new B();
    case "none":
      return new B();
    default:
      return t2.sessionStorage || new B();
  }
}
class H {
  constructor(e2) {
    if (!this._storage) {
      this._persistence = M.adapter.primaryStorage || e2.persistence, this._storage = K(this._persistence, M.adapter);
      const t2 = `access_token_${e2.env}`, n2 = `access_token_expire_${e2.env}`, s2 = `refresh_token_${e2.env}`, r2 = `anonymous_uuid_${e2.env}`, o2 = `login_type_${e2.env}`, i2 = `user_info_${e2.env}`;
      this.keys = { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2, anonymousUuidKey: r2, loginTypeKey: o2, userInfoKey: i2 };
    }
  }
  updatePersistence(e2) {
    if (e2 === this._persistence)
      return;
    const t2 = this._persistence === "local";
    this._persistence = e2;
    const n2 = K(e2, M.adapter);
    for (const e3 in this.keys) {
      const s2 = this.keys[e3];
      if (t2 && j.includes(e3))
        continue;
      const r2 = this._storage.getItem(s2);
      F(r2) || L(r2) || (n2.setItem(s2, r2), this._storage.removeItem(s2));
    }
    this._storage = n2;
  }
  setStore(e2, t2, n2) {
    if (!this._storage)
      return;
    const s2 = { version: n2 || "localCachev1", content: t2 }, r2 = JSON.stringify(s2);
    try {
      this._storage.setItem(e2, r2);
    } catch (e3) {
      throw e3;
    }
  }
  getStore(e2, t2) {
    try {
      if (!this._storage)
        return;
    } catch (e3) {
      return "";
    }
    t2 = t2 || "localCachev1";
    const n2 = this._storage.getItem(e2);
    if (!n2)
      return "";
    if (n2.indexOf(t2) >= 0) {
      return JSON.parse(n2).content;
    }
    return "";
  }
  removeStore(e2) {
    this._storage.removeItem(e2);
  }
}
const W = {}, z = {};
function J(e2) {
  return W[e2];
}
class V {
  constructor(e2, t2) {
    this.data = t2 || null, this.name = e2;
  }
}
class Y extends V {
  constructor(e2, t2) {
    super("error", { error: e2, data: t2 }), this.error = e2;
  }
}
const X = new class {
  constructor() {
    this._listeners = {};
  }
  on(e2, t2) {
    return function(e3, t3, n2) {
      n2[e3] = n2[e3] || [], n2[e3].push(t3);
    }(e2, t2, this._listeners), this;
  }
  off(e2, t2) {
    return function(e3, t3, n2) {
      if (n2 && n2[e3]) {
        const s2 = n2[e3].indexOf(t3);
        s2 !== -1 && n2[e3].splice(s2, 1);
      }
    }(e2, t2, this._listeners), this;
  }
  fire(e2, t2) {
    if (e2 instanceof Y)
      return console.error(e2.error), this;
    const n2 = typeof e2 == "string" ? new V(e2, t2 || {}) : e2;
    const s2 = n2.name;
    if (this._listens(s2)) {
      n2.target = this;
      const e3 = this._listeners[s2] ? [...this._listeners[s2]] : [];
      for (const t3 of e3)
        t3.call(this, n2);
    }
    return this;
  }
  _listens(e2) {
    return this._listeners[e2] && this._listeners[e2].length > 0;
  }
}();
function G(e2, t2) {
  X.on(e2, t2);
}
function Q(e2, t2 = {}) {
  X.fire(e2, t2);
}
function Z(e2, t2) {
  X.off(e2, t2);
}
const ee = "loginStateChanged", te = "loginStateExpire", ne = "loginTypeChanged", se = "anonymousConverted", re = "refreshAccessToken";
var oe;
!function(e2) {
  e2.ANONYMOUS = "ANONYMOUS", e2.WECHAT = "WECHAT", e2.WECHAT_PUBLIC = "WECHAT-PUBLIC", e2.WECHAT_OPEN = "WECHAT-OPEN", e2.CUSTOM = "CUSTOM", e2.EMAIL = "EMAIL", e2.USERNAME = "USERNAME", e2.NULL = "NULL";
}(oe || (oe = {}));
const ie = ["auth.getJwt", "auth.logout", "auth.signInWithTicket", "auth.signInAnonymously", "auth.signIn", "auth.fetchAccessTokenWithRefreshToken", "auth.signUpWithEmailAndPassword", "auth.activateEndUserMail", "auth.sendPasswordResetEmail", "auth.resetPasswordWithToken", "auth.isUsernameRegistered"], ae = { "X-SDK-Version": "1.3.5" };
function ce(e2, t2, n2) {
  const s2 = e2[t2];
  e2[t2] = function(t3) {
    const r2 = {}, o2 = {};
    n2.forEach((n3) => {
      const { data: s3, headers: i3 } = n3.call(e2, t3);
      Object.assign(r2, s3), Object.assign(o2, i3);
    });
    const i2 = t3.data;
    return i2 && (() => {
      var e3;
      if (e3 = i2, Object.prototype.toString.call(e3) !== "[object FormData]")
        t3.data = __spreadValues(__spreadValues({}, i2), r2);
      else
        for (const e4 in r2)
          i2.append(e4, r2[e4]);
    })(), t3.headers = __spreadValues(__spreadValues({}, t3.headers || {}), o2), s2.call(e2, t3);
  };
}
function ue() {
  const e2 = Math.random().toString(16).slice(2);
  return { data: { seqId: e2 }, headers: __spreadProps(__spreadValues({}, ae), { "x-seqid": e2 }) };
}
class he {
  constructor(e2 = {}) {
    var t2;
    this.config = e2, this._reqClass = new M.adapter.reqClass({ timeout: this.config.timeout, timeoutMsg: `\u8BF7\u6C42\u5728${this.config.timeout / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD`, restrictedMethods: ["post"] }), this._cache = J(this.config.env), this._localCache = (t2 = this.config.env, z[t2]), ce(this._reqClass, "post", [ue]), ce(this._reqClass, "upload", [ue]), ce(this._reqClass, "download", [ue]);
  }
  async post(e2) {
    return await this._reqClass.post(e2);
  }
  async upload(e2) {
    return await this._reqClass.upload(e2);
  }
  async download(e2) {
    return await this._reqClass.download(e2);
  }
  async refreshAccessToken() {
    let e2, t2;
    this._refreshAccessTokenPromise || (this._refreshAccessTokenPromise = this._refreshAccessToken());
    try {
      e2 = await this._refreshAccessTokenPromise;
    } catch (e3) {
      t2 = e3;
    }
    if (this._refreshAccessTokenPromise = null, this._shouldRefreshAccessTokenHook = null, t2)
      throw t2;
    return e2;
  }
  async _refreshAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2, loginTypeKey: s2, anonymousUuidKey: r2 } = this._cache.keys;
    this._cache.removeStore(e2), this._cache.removeStore(t2);
    let o2 = this._cache.getStore(n2);
    if (!o2)
      throw new Error("\u672A\u767B\u5F55CloudBase");
    const i2 = { refresh_token: o2 }, a2 = await this.request("auth.fetchAccessTokenWithRefreshToken", i2);
    if (a2.data.code) {
      const { code: e3 } = a2.data;
      if (e3 === "SIGN_PARAM_INVALID" || e3 === "REFRESH_TOKEN_EXPIRED" || e3 === "INVALID_REFRESH_TOKEN") {
        if (this._cache.getStore(s2) === oe.ANONYMOUS && e3 === "INVALID_REFRESH_TOKEN") {
          const e4 = this._cache.getStore(r2), t3 = this._cache.getStore(n2), s3 = await this.send("auth.signInAnonymously", { anonymous_uuid: e4, refresh_token: t3 });
          return this.setRefreshToken(s3.refresh_token), this._refreshAccessToken();
        }
        Q(te), this._cache.removeStore(n2);
      }
      throw new Error(`\u5237\u65B0access token\u5931\u8D25\uFF1A${a2.data.code}`);
    }
    if (a2.data.access_token)
      return Q(re), this._cache.setStore(e2, a2.data.access_token), this._cache.setStore(t2, a2.data.access_token_expire + Date.now()), { accessToken: a2.data.access_token, accessTokenExpire: a2.data.access_token_expire };
    a2.data.refresh_token && (this._cache.removeStore(n2), this._cache.setStore(n2, a2.data.refresh_token), this._refreshAccessToken());
  }
  async getAccessToken() {
    const { accessTokenKey: e2, accessTokenExpireKey: t2, refreshTokenKey: n2 } = this._cache.keys;
    if (!this._cache.getStore(n2))
      throw new Error("refresh token\u4E0D\u5B58\u5728\uFF0C\u767B\u5F55\u72B6\u6001\u5F02\u5E38");
    let s2 = this._cache.getStore(e2), r2 = this._cache.getStore(t2), o2 = true;
    return this._shouldRefreshAccessTokenHook && !await this._shouldRefreshAccessTokenHook(s2, r2) && (o2 = false), (!s2 || !r2 || r2 < Date.now()) && o2 ? this.refreshAccessToken() : { accessToken: s2, accessTokenExpire: r2 };
  }
  async request(e2, t2, n2) {
    const s2 = `x-tcb-trace_${this.config.env}`;
    let r2 = "application/x-www-form-urlencoded";
    const o2 = __spreadValues({ action: e2, env: this.config.env, dataVersion: "2019-08-16" }, t2);
    if (ie.indexOf(e2) === -1) {
      const { refreshTokenKey: e3 } = this._cache.keys;
      this._cache.getStore(e3) && (o2.access_token = (await this.getAccessToken()).accessToken);
    }
    let i2;
    if (e2 === "storage.uploadFile") {
      i2 = new FormData();
      for (let e3 in i2)
        i2.hasOwnProperty(e3) && i2[e3] !== void 0 && i2.append(e3, o2[e3]);
      r2 = "multipart/form-data";
    } else {
      r2 = "application/json", i2 = {};
      for (let e3 in o2)
        o2[e3] !== void 0 && (i2[e3] = o2[e3]);
    }
    let a2 = { headers: { "content-type": r2 } };
    n2 && n2.onUploadProgress && (a2.onUploadProgress = n2.onUploadProgress);
    const c2 = this._localCache.getStore(s2);
    c2 && (a2.headers["X-TCB-Trace"] = c2);
    const { parse: u2, inQuery: h2, search: l2 } = t2;
    let d = { env: this.config.env };
    u2 && (d.parse = true), h2 && (d = __spreadValues(__spreadValues({}, h2), d));
    let f2 = function(e3, t3, n3 = {}) {
      const s3 = /\?/.test(t3);
      let r3 = "";
      for (let e4 in n3)
        r3 === "" ? !s3 && (t3 += "?") : r3 += "&", r3 += `${e4}=${encodeURIComponent(n3[e4])}`;
      return /^http(s)?\:\/\//.test(t3 += r3) ? t3 : `${e3}${t3}`;
    }(x, "//tcb-api.tencentcloudapi.com/web", d);
    l2 && (f2 += l2);
    const p2 = await this.post(__spreadValues({ url: f2, data: i2 }, a2)), g2 = p2.header && p2.header["x-tcb-trace"];
    if (g2 && this._localCache.setStore(s2, g2), Number(p2.status) !== 200 && Number(p2.statusCode) !== 200 || !p2.data)
      throw new Error("network request error");
    return p2;
  }
  async send(e2, t2 = {}) {
    const n2 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
    if (n2.data.code === "ACCESS_TOKEN_EXPIRED" && ie.indexOf(e2) === -1) {
      await this.refreshAccessToken();
      const n3 = await this.request(e2, t2, { onUploadProgress: t2.onUploadProgress });
      if (n3.data.code)
        throw new Error(`[${n3.data.code}] ${n3.data.message}`);
      return n3.data;
    }
    if (n2.data.code)
      throw new Error(`[${n2.data.code}] ${n2.data.message}`);
    return n2.data;
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
}
const le = {};
function de(e2) {
  return le[e2];
}
class fe {
  constructor(e2) {
    this.config = e2, this._cache = J(e2.env), this._request = de(e2.env);
  }
  setRefreshToken(e2) {
    const { accessTokenKey: t2, accessTokenExpireKey: n2, refreshTokenKey: s2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.removeStore(n2), this._cache.setStore(s2, e2);
  }
  setAccessToken(e2, t2) {
    const { accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys;
    this._cache.setStore(n2, e2), this._cache.setStore(s2, t2);
  }
  async refreshUserInfo() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2);
  }
}
class pe {
  constructor(e2) {
    if (!e2)
      throw new Error("envId is not defined");
    this._envId = e2, this._cache = J(this._envId), this._request = de(this._envId), this.setUserInfo();
  }
  linkWithTicket(e2) {
    if (typeof e2 != "string")
      throw new Error("ticket must be string");
    return this._request.send("auth.linkWithTicket", { ticket: e2 });
  }
  linkWithRedirect(e2) {
    e2.signInWithRedirect();
  }
  updatePassword(e2, t2) {
    return this._request.send("auth.updatePassword", { oldPassword: t2, newPassword: e2 });
  }
  updateEmail(e2) {
    return this._request.send("auth.updateEmail", { newEmail: e2 });
  }
  updateUsername(e2) {
    if (typeof e2 != "string")
      throw new Error("username must be a string");
    return this._request.send("auth.updateUsername", { username: e2 });
  }
  async getLinkedUidList() {
    const { data: e2 } = await this._request.send("auth.getLinkedUidList", {});
    let t2 = false;
    const { users: n2 } = e2;
    return n2.forEach((e3) => {
      e3.wxOpenId && e3.wxPublicId && (t2 = true);
    }), { users: n2, hasPrimaryUid: t2 };
  }
  setPrimaryUid(e2) {
    return this._request.send("auth.setPrimaryUid", { uid: e2 });
  }
  unlink(e2) {
    return this._request.send("auth.unlink", { platform: e2 });
  }
  async update(e2) {
    const { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: o2, city: i2 } = e2, { data: a2 } = await this._request.send("auth.updateUserInfo", { nickName: t2, gender: n2, avatarUrl: s2, province: r2, country: o2, city: i2 });
    this.setLocalUserInfo(a2);
  }
  async refresh() {
    const { data: e2 } = await this._request.send("auth.getUserInfo", {});
    return this.setLocalUserInfo(e2), e2;
  }
  setUserInfo() {
    const { userInfoKey: e2 } = this._cache.keys, t2 = this._cache.getStore(e2);
    ["uid", "loginType", "openid", "wxOpenId", "wxPublicId", "unionId", "qqMiniOpenId", "email", "hasPassword", "customUserId", "nickName", "gender", "avatarUrl"].forEach((e3) => {
      this[e3] = t2[e3];
    }), this.location = { country: t2.country, province: t2.province, city: t2.city };
  }
  setLocalUserInfo(e2) {
    const { userInfoKey: t2 } = this._cache.keys;
    this._cache.setStore(t2, e2), this.setUserInfo();
  }
}
class ge {
  constructor(e2) {
    if (!e2)
      throw new Error("envId is not defined");
    this._cache = J(e2);
    const { refreshTokenKey: t2, accessTokenKey: n2, accessTokenExpireKey: s2 } = this._cache.keys, r2 = this._cache.getStore(t2), o2 = this._cache.getStore(n2), i2 = this._cache.getStore(s2);
    this.credential = { refreshToken: r2, accessToken: o2, accessTokenExpire: i2 }, this.user = new pe(e2);
  }
  get isAnonymousAuth() {
    return this.loginType === oe.ANONYMOUS;
  }
  get isCustomAuth() {
    return this.loginType === oe.CUSTOM;
  }
  get isWeixinAuth() {
    return this.loginType === oe.WECHAT || this.loginType === oe.WECHAT_OPEN || this.loginType === oe.WECHAT_PUBLIC;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
}
class me extends fe {
  async signIn() {
    this._cache.updatePersistence("local");
    const { anonymousUuidKey: e2, refreshTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2) || void 0, s2 = this._cache.getStore(t2) || void 0, r2 = await this._request.send("auth.signInAnonymously", { anonymous_uuid: n2, refresh_token: s2 });
    if (r2.uuid && r2.refresh_token) {
      this._setAnonymousUUID(r2.uuid), this.setRefreshToken(r2.refresh_token), await this._request.refreshAccessToken(), Q(ee), Q(ne, { env: this.config.env, loginType: oe.ANONYMOUS, persistence: "local" });
      const e3 = new ge(this.config.env);
      return await e3.user.refresh(), e3;
    }
    throw new Error("\u533F\u540D\u767B\u5F55\u5931\u8D25");
  }
  async linkAndRetrieveDataWithTicket(e2) {
    const { anonymousUuidKey: t2, refreshTokenKey: n2 } = this._cache.keys, s2 = this._cache.getStore(t2), r2 = this._cache.getStore(n2), o2 = await this._request.send("auth.linkAndRetrieveDataWithTicket", { anonymous_uuid: s2, refresh_token: r2, ticket: e2 });
    if (o2.refresh_token)
      return this._clearAnonymousUUID(), this.setRefreshToken(o2.refresh_token), await this._request.refreshAccessToken(), Q(se, { env: this.config.env }), Q(ne, { loginType: oe.CUSTOM, persistence: "local" }), { credential: { refreshToken: o2.refresh_token } };
    throw new Error("\u533F\u540D\u8F6C\u5316\u5931\u8D25");
  }
  _setAnonymousUUID(e2) {
    const { anonymousUuidKey: t2, loginTypeKey: n2 } = this._cache.keys;
    this._cache.removeStore(t2), this._cache.setStore(t2, e2), this._cache.setStore(n2, oe.ANONYMOUS);
  }
  _clearAnonymousUUID() {
    this._cache.removeStore(this._cache.keys.anonymousUuidKey);
  }
}
class ye extends fe {
  async signIn(e2) {
    if (typeof e2 != "string")
      throw new Error("ticket must be a string");
    const { refreshTokenKey: t2 } = this._cache.keys, n2 = await this._request.send("auth.signInWithTicket", { ticket: e2, refresh_token: this._cache.getStore(t2) || "" });
    if (n2.refresh_token)
      return this.setRefreshToken(n2.refresh_token), await this._request.refreshAccessToken(), Q(ee), Q(ne, { env: this.config.env, loginType: oe.CUSTOM, persistence: this.config.persistence }), await this.refreshUserInfo(), new ge(this.config.env);
    throw new Error("\u81EA\u5B9A\u4E49\u767B\u5F55\u5931\u8D25");
  }
}
class _e extends fe {
  async signIn(e2, t2) {
    if (typeof e2 != "string")
      throw new Error("email must be a string");
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: "EMAIL", email: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token: o2, access_token_expire: i2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), o2 && i2 ? this.setAccessToken(o2, i2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Q(ee), Q(ne, { env: this.config.env, loginType: oe.EMAIL, persistence: this.config.persistence }), new ge(this.config.env);
    throw s2.code ? new Error(`\u90AE\u7BB1\u767B\u5F55\u5931\u8D25: [${s2.code}] ${s2.message}`) : new Error("\u90AE\u7BB1\u767B\u5F55\u5931\u8D25");
  }
  async activate(e2) {
    return this._request.send("auth.activateEndUserMail", { token: e2 });
  }
  async resetPasswordWithToken(e2, t2) {
    return this._request.send("auth.resetPasswordWithToken", { token: e2, newPassword: t2 });
  }
}
class we extends fe {
  async signIn(e2, t2) {
    if (typeof e2 != "string")
      throw new Error("username must be a string");
    typeof t2 != "string" && (t2 = "", console.warn("password is empty"));
    const { refreshTokenKey: n2 } = this._cache.keys, s2 = await this._request.send("auth.signIn", { loginType: oe.USERNAME, username: e2, password: t2, refresh_token: this._cache.getStore(n2) || "" }), { refresh_token: r2, access_token_expire: o2, access_token: i2 } = s2;
    if (r2)
      return this.setRefreshToken(r2), i2 && o2 ? this.setAccessToken(i2, o2) : await this._request.refreshAccessToken(), await this.refreshUserInfo(), Q(ee), Q(ne, { env: this.config.env, loginType: oe.USERNAME, persistence: this.config.persistence }), new ge(this.config.env);
    throw s2.code ? new Error(`\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25: [${s2.code}] ${s2.message}`) : new Error("\u7528\u6237\u540D\u5BC6\u7801\u767B\u5F55\u5931\u8D25");
  }
}
class ke {
  constructor(e2) {
    this.config = e2, this._cache = J(e2.env), this._request = de(e2.env), this._onAnonymousConverted = this._onAnonymousConverted.bind(this), this._onLoginTypeChanged = this._onLoginTypeChanged.bind(this), G(ne, this._onLoginTypeChanged);
  }
  get currentUser() {
    const e2 = this.hasLoginState();
    return e2 && e2.user || null;
  }
  get loginType() {
    return this._cache.getStore(this._cache.keys.loginTypeKey);
  }
  anonymousAuthProvider() {
    return new me(this.config);
  }
  customAuthProvider() {
    return new ye(this.config);
  }
  emailAuthProvider() {
    return new _e(this.config);
  }
  usernameAuthProvider() {
    return new we(this.config);
  }
  async signInAnonymously() {
    return new me(this.config).signIn();
  }
  async signInWithEmailAndPassword(e2, t2) {
    return new _e(this.config).signIn(e2, t2);
  }
  signInWithUsernameAndPassword(e2, t2) {
    return new we(this.config).signIn(e2, t2);
  }
  async linkAndRetrieveDataWithTicket(e2) {
    this._anonymousAuthProvider || (this._anonymousAuthProvider = new me(this.config)), G(se, this._onAnonymousConverted);
    return await this._anonymousAuthProvider.linkAndRetrieveDataWithTicket(e2);
  }
  async signOut() {
    if (this.loginType === oe.ANONYMOUS)
      throw new Error("\u533F\u540D\u7528\u6237\u4E0D\u652F\u6301\u767B\u51FA\u64CD\u4F5C");
    const { refreshTokenKey: e2, accessTokenKey: t2, accessTokenExpireKey: n2 } = this._cache.keys, s2 = this._cache.getStore(e2);
    if (!s2)
      return;
    const r2 = await this._request.send("auth.logout", { refresh_token: s2 });
    return this._cache.removeStore(e2), this._cache.removeStore(t2), this._cache.removeStore(n2), Q(ee), Q(ne, { env: this.config.env, loginType: oe.NULL, persistence: this.config.persistence }), r2;
  }
  async signUpWithEmailAndPassword(e2, t2) {
    return this._request.send("auth.signUpWithEmailAndPassword", { email: e2, password: t2 });
  }
  async sendPasswordResetEmail(e2) {
    return this._request.send("auth.sendPasswordResetEmail", { email: e2 });
  }
  onLoginStateChanged(e2) {
    G(ee, () => {
      const t3 = this.hasLoginState();
      e2.call(this, t3);
    });
    const t2 = this.hasLoginState();
    e2.call(this, t2);
  }
  onLoginStateExpired(e2) {
    G(te, e2.bind(this));
  }
  onAccessTokenRefreshed(e2) {
    G(re, e2.bind(this));
  }
  onAnonymousConverted(e2) {
    G(se, e2.bind(this));
  }
  onLoginTypeChanged(e2) {
    G(ne, () => {
      const t2 = this.hasLoginState();
      e2.call(this, t2);
    });
  }
  async getAccessToken() {
    return { accessToken: (await this._request.getAccessToken()).accessToken, env: this.config.env };
  }
  hasLoginState() {
    const { refreshTokenKey: e2 } = this._cache.keys;
    return this._cache.getStore(e2) ? new ge(this.config.env) : null;
  }
  async isUsernameRegistered(e2) {
    if (typeof e2 != "string")
      throw new Error("username must be a string");
    const { data: t2 } = await this._request.send("auth.isUsernameRegistered", { username: e2 });
    return t2 && t2.isRegistered;
  }
  getLoginState() {
    return Promise.resolve(this.hasLoginState());
  }
  async signInWithTicket(e2) {
    return new ye(this.config).signIn(e2);
  }
  shouldRefreshAccessToken(e2) {
    this._request._shouldRefreshAccessTokenHook = e2.bind(this);
  }
  getUserInfo() {
    return this._request.send("auth.getUserInfo", {}).then((e2) => e2.code ? e2 : __spreadProps(__spreadValues({}, e2.data), { requestId: e2.seqId }));
  }
  getAuthHeader() {
    const { refreshTokenKey: e2, accessTokenKey: t2 } = this._cache.keys, n2 = this._cache.getStore(e2);
    return { "x-cloudbase-credentials": this._cache.getStore(t2) + "/@@/" + n2 };
  }
  _onAnonymousConverted(e2) {
    const { env: t2 } = e2.data;
    t2 === this.config.env && this._cache.updatePersistence(this.config.persistence);
  }
  _onLoginTypeChanged(e2) {
    const { loginType: t2, persistence: n2, env: s2 } = e2.data;
    s2 === this.config.env && (this._cache.updatePersistence(n2), this._cache.setStore(this._cache.keys.loginTypeKey, t2));
  }
}
const ve = function(e2, t2) {
  t2 = t2 || R();
  const n2 = de(this.config.env), { cloudPath: s2, filePath: r2, onUploadProgress: o2, fileType: i2 = "image" } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    const { data: { url: a2, authorization: c2, token: u2, fileId: h2, cosFileId: l2 }, requestId: d } = e3, f2 = { key: s2, signature: c2, "x-cos-meta-fileid": l2, success_action_status: "201", "x-cos-security-token": u2 };
    n2.upload({ url: a2, data: f2, file: r2, name: s2, fileType: i2, onUploadProgress: o2 }).then((e4) => {
      e4.statusCode === 201 ? t2(null, { fileID: h2, requestId: d }) : t2(new Error(`STORAGE_REQUEST_FAIL: ${e4.data}`));
    }).catch((e4) => {
      t2(e4);
    });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, Se = function(e2, t2) {
  t2 = t2 || R();
  const n2 = de(this.config.env), { cloudPath: s2 } = e2;
  return n2.send("storage.getUploadMetadata", { path: s2 }).then((e3) => {
    t2(null, e3);
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, Te = function({ fileList: e2 }, t2) {
  if (t2 = t2 || R(), !e2 || !Array.isArray(e2))
    return { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" };
  for (let t3 of e2)
    if (!t3 || typeof t3 != "string")
      return { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u5B57\u7B26\u4E32" };
  const n2 = { fileid_list: e2 };
  return de(this.config.env).send("storage.batchDeleteFile", n2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.delete_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, Ae = function({ fileList: e2 }, t2) {
  t2 = t2 || R(), e2 && Array.isArray(e2) || t2(null, { code: "INVALID_PARAM", message: "fileList\u5FC5\u987B\u662F\u975E\u7A7A\u7684\u6570\u7EC4" });
  let n2 = [];
  for (let s3 of e2)
    typeof s3 == "object" ? (s3.hasOwnProperty("fileID") && s3.hasOwnProperty("maxAge") || t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5305\u542BfileID\u548CmaxAge\u7684\u5BF9\u8C61" }), n2.push({ fileid: s3.fileID, max_age: s3.maxAge })) : typeof s3 == "string" ? n2.push({ fileid: s3 }) : t2(null, { code: "INVALID_PARAM", message: "fileList\u7684\u5143\u7D20\u5FC5\u987B\u662F\u5B57\u7B26\u4E32" });
  const s2 = { file_list: n2 };
  return de(this.config.env).send("storage.batchGetDownloadUrl", s2).then((e3) => {
    e3.code ? t2(null, e3) : t2(null, { fileList: e3.data.download_list, requestId: e3.requestId });
  }).catch((e3) => {
    t2(e3);
  }), t2.promise;
}, Pe = async function({ fileID: e2 }, t2) {
  const n2 = (await Ae.call(this, { fileList: [{ fileID: e2, maxAge: 600 }] })).fileList[0];
  if (n2.code !== "SUCCESS")
    return t2 ? t2(n2) : new Promise((e3) => {
      e3(n2);
    });
  const s2 = de(this.config.env);
  let r2 = n2.download_url;
  if (r2 = encodeURI(r2), !t2)
    return s2.download({ url: r2 });
  t2(await s2.download({ url: r2 }));
}, Ie = function({ name: e2, data: t2, query: n2, parse: s2, search: r2 }, o2) {
  const i2 = o2 || R();
  let a2;
  try {
    a2 = t2 ? JSON.stringify(t2) : "";
  } catch (e3) {
    return Promise.reject(e3);
  }
  if (!e2)
    return Promise.reject(new Error("\u51FD\u6570\u540D\u4E0D\u80FD\u4E3A\u7A7A"));
  const c2 = { inQuery: n2, parse: s2, search: r2, function_name: e2, request_data: a2 };
  return de(this.config.env).send("functions.invokeFunction", c2).then((e3) => {
    if (e3.code)
      i2(null, e3);
    else {
      let t3 = e3.data.response_data;
      if (s2)
        i2(null, { result: t3, requestId: e3.requestId });
      else
        try {
          t3 = JSON.parse(e3.data.response_data), i2(null, { result: t3, requestId: e3.requestId });
        } catch (e4) {
          i2(new Error("response data must be json"));
        }
    }
    return i2.promise;
  }).catch((e3) => {
    i2(e3);
  }), i2.promise;
}, be = { timeout: 15e3, persistence: "session" }, Ee = {};
class Oe {
  constructor(e2) {
    this.config = e2 || this.config, this.authObj = void 0;
  }
  init(e2) {
    switch (M.adapter || (this.requestClient = new M.adapter.reqClass({ timeout: e2.timeout || 5e3, timeoutMsg: `\u8BF7\u6C42\u5728${(e2.timeout || 5e3) / 1e3}s\u5185\u672A\u5B8C\u6210\uFF0C\u5DF2\u4E2D\u65AD` })), this.config = __spreadValues(__spreadValues({}, be), e2), true) {
      case this.config.timeout > 6e5:
        console.warn("timeout\u5927\u4E8E\u53EF\u914D\u7F6E\u4E0A\u9650[10\u5206\u949F]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0A\u9650\u6570\u503C"), this.config.timeout = 6e5;
        break;
      case this.config.timeout < 100:
        console.warn("timeout\u5C0F\u4E8E\u53EF\u914D\u7F6E\u4E0B\u9650[100ms]\uFF0C\u5DF2\u91CD\u7F6E\u4E3A\u4E0B\u9650\u6570\u503C"), this.config.timeout = 100;
    }
    return new Oe(this.config);
  }
  auth({ persistence: e2 } = {}) {
    if (this.authObj)
      return this.authObj;
    const t2 = e2 || M.adapter.primaryStorage || be.persistence;
    var n2;
    return t2 !== this.config.persistence && (this.config.persistence = t2), function(e3) {
      const { env: t3 } = e3;
      W[t3] = new H(e3), z[t3] = new H(__spreadProps(__spreadValues({}, e3), { persistence: "local" }));
    }(this.config), n2 = this.config, le[n2.env] = new he(n2), this.authObj = new ke(this.config), this.authObj;
  }
  on(e2, t2) {
    return G.apply(this, [e2, t2]);
  }
  off(e2, t2) {
    return Z.apply(this, [e2, t2]);
  }
  callFunction(e2, t2) {
    return Ie.apply(this, [e2, t2]);
  }
  deleteFile(e2, t2) {
    return Te.apply(this, [e2, t2]);
  }
  getTempFileURL(e2, t2) {
    return Ae.apply(this, [e2, t2]);
  }
  downloadFile(e2, t2) {
    return Pe.apply(this, [e2, t2]);
  }
  uploadFile(e2, t2) {
    return ve.apply(this, [e2, t2]);
  }
  getUploadMetadata(e2, t2) {
    return Se.apply(this, [e2, t2]);
  }
  registerExtension(e2) {
    Ee[e2.name] = e2;
  }
  async invokeExtension(e2, t2) {
    const n2 = Ee[e2];
    if (!n2)
      throw Error(`\u6269\u5C55${e2} \u5FC5\u987B\u5148\u6CE8\u518C`);
    return await n2.invoke(t2, this);
  }
  useAdapters(e2) {
    const { adapter: t2, runtime: n2 } = $(e2) || {};
    t2 && (M.adapter = t2), n2 && (M.runtime = n2);
  }
}
var Ce = new Oe();
function Ue(e2, t2, n2) {
  n2 === void 0 && (n2 = {});
  var s2 = /\?/.test(t2), r2 = "";
  for (var o2 in n2)
    r2 === "" ? !s2 && (t2 += "?") : r2 += "&", r2 += o2 + "=" + encodeURIComponent(n2[o2]);
  return /^http(s)?:\/\//.test(t2 += r2) ? t2 : "" + e2 + t2;
}
class xe {
  post(e2) {
    const { url: t2, data: n2, headers: s2 } = e2;
    return new Promise((e3, r2) => {
      b.request({ url: Ue("https:", t2), data: n2, method: "POST", header: s2, success(t3) {
        e3(t3);
      }, fail(e4) {
        r2(e4);
      } });
    });
  }
  upload(e2) {
    return new Promise((t2, n2) => {
      const { url: s2, file: r2, data: o2, headers: i2, fileType: a2 } = e2, h2 = b.uploadFile({ url: Ue("https:", s2), name: "file", formData: Object.assign({}, o2), filePath: r2, fileType: a2, header: i2, success(e3) {
        const n3 = { statusCode: e3.statusCode, data: e3.data || {} };
        e3.statusCode === 200 && o2.success_action_status && (n3.statusCode = parseInt(o2.success_action_status, 10)), t2(n3);
      }, fail(e3) {
        n2(new Error(e3.errMsg || "uploadFile:fail"));
      } });
      typeof e2.onUploadProgress == "function" && h2 && typeof h2.onProgressUpdate == "function" && h2.onProgressUpdate((t3) => {
        e2.onUploadProgress({ loaded: t3.totalBytesSent, total: t3.totalBytesExpectedToSend });
      });
    });
  }
}
const De = { setItem(e2, t2) {
  b.setStorageSync(e2, t2);
}, getItem: (e2) => b.getStorageSync(e2), removeItem(e2) {
  b.removeStorageSync(e2);
}, clear() {
  b.clearStorageSync();
} };
var qe = { genAdapter: function() {
  return { root: {}, reqClass: xe, localStorage: De, primaryStorage: "local" };
}, isMatch: function() {
  return true;
}, runtime: "uni_app" };
Ce.useAdapters(qe);
const Re = Ce, Fe = Re.init;
Re.init = function(e2) {
  e2.env = e2.spaceId;
  const t2 = Fe.call(this, e2);
  t2.config.provider = "tencent", t2.config.spaceId = e2.spaceId;
  const n2 = t2.auth;
  return t2.auth = function(e3) {
    const t3 = n2.call(this, e3);
    return ["linkAndRetrieveDataWithTicket", "signInAnonymously", "signOut", "getAccessToken", "getLoginState", "signInWithTicket", "getUserInfo"].forEach((e4) => {
      t3[e4] = S(t3[e4]).bind(t3);
    }), t3;
  }, t2.customAuth = t2.auth, t2;
};
var Le = Re;
function Ne(e2) {
  return e2 && Ne(e2.__v_raw) || e2;
}
function $e() {
  return { token: b.getStorageSync("uni_id_token") || b.getStorageSync("uniIdToken"), tokenExpired: b.getStorageSync("uni_id_token_expired") };
}
var je = class extends C {
  getAccessToken() {
    return new Promise((e2, t2) => {
      const n2 = "Anonymous_Access_token";
      this.setAccessToken(n2), e2(n2);
    });
  }
  setupRequest(e2, t2) {
    const n2 = Object.assign({}, e2, { spaceId: this.config.spaceId, timestamp: Date.now() }), s2 = { "Content-Type": "application/json" };
    t2 !== "auth" && (n2.token = this.accessToken, s2["x-basement-token"] = this.accessToken), s2["x-serverless-sign"] = I.sign(n2, this.config.clientSecret);
    const r2 = P();
    s2["x-client-info"] = JSON.stringify(r2);
    const { token: o2 } = $e();
    return s2["x-client-token"] = o2, { url: this.config.requestUrl, method: "POST", data: n2, dataType: "json", header: JSON.parse(JSON.stringify(s2)) };
  }
  uploadFileToOSS({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, onUploadProgress: o2 }) {
    return new Promise((i2, a2) => {
      const c2 = this.adapter.uploadFile({ url: e2, formData: t2, name: n2, filePath: s2, fileType: r2, success(e3) {
        e3 && e3.statusCode < 400 ? i2(e3) : a2(new T({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      }, fail(e3) {
        a2(new T({ code: e3.code || "UPLOAD_FAILED", message: e3.message || e3.errMsg || "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
      } });
      typeof o2 == "function" && c2 && typeof c2.onProgressUpdate == "function" && c2.onProgressUpdate((e3) => {
        o2({ loaded: e3.totalBytesSent, total: e3.totalBytesExpectedToSend });
      });
    });
  }
  uploadFile({ filePath: e2, cloudPath: t2, fileType: n2 = "image", onUploadProgress: s2 }) {
    if (!t2)
      throw new T({ code: "CLOUDPATH_REQUIRED", message: "cloudPath\u4E0D\u53EF\u4E3A\u7A7A" });
    let r2;
    return this.getOSSUploadOptionsFromPath({ cloudPath: t2 }).then((t3) => {
      const { url: o2, formData: i2, name: a2 } = t3.result;
      r2 = t3.result.fileUrl;
      const c2 = { url: o2, formData: i2, name: a2, filePath: e2, fileType: n2 };
      return this.uploadFileToOSS(Object.assign({}, c2, { onUploadProgress: s2 }));
    }).then(() => this.reportOSSUpload({ cloudPath: t2 })).then((t3) => new Promise((n3, s3) => {
      t3.success ? n3({ success: true, filePath: e2, fileID: r2 }) : s3(new T({ code: "UPLOAD_FAILED", message: "\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25" }));
    }));
  }
  deleteFile({ fileList: e2 }) {
    const t2 = { method: "serverless.file.resource.delete", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2));
  }
  getTempFileURL({ fileList: e2 } = {}) {
    const t2 = { method: "serverless.file.resource.getTempFileURL", params: JSON.stringify({ fileList: e2 }) };
    return this.request(this.setupRequest(t2));
  }
};
var Be = { init(e2) {
  const t2 = new je(e2), n2 = { signInAnonymously: function() {
    return t2.authorize();
  }, getLoginState: function() {
    return Promise.resolve(false);
  } };
  return t2.auth = function() {
    return n2;
  }, t2.customAuth = t2.auth, t2;
} };
function Ke({ data: e2 }) {
  let t2;
  t2 = P();
  const n2 = JSON.parse(JSON.stringify(e2 || {}));
  if (Object.assign(n2, { clientInfo: t2 }), !n2.uniIdToken) {
    const { token: e3 } = $e();
    e3 && (n2.uniIdToken = e3);
  }
  return n2;
}
function He({ name: e2, data: t2 }) {
  const { localAddress: n2, localPort: s2 } = this, r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider], o2 = this.config.spaceId, i2 = `http://${n2}:${s2}/system/check-function`, a2 = `http://${n2}:${s2}/cloudfunctions/${e2}`;
  return new Promise((t3, n3) => {
    b.request({ method: "POST", url: i2, data: { name: e2, platform: u, provider: r2, spaceId: o2 }, timeout: 3e3, success(e3) {
      t3(e3);
    }, fail() {
      t3({ data: { code: "NETWORK_ERROR", message: "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570\u3002" } });
    } });
  }).then(({ data: e3 } = {}) => {
    const { code: t3, message: n3 } = e3 || {};
    return { code: t3 === 0 ? 0 : t3 || "SYS_ERR", message: n3 || "SYS_ERR" };
  }).then(({ code: n3, message: s3 }) => {
    if (n3 !== 0) {
      switch (n3) {
        case "MODULE_ENCRYPTED":
          console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e2}\uFF09\u4F9D\u8D56\u52A0\u5BC6\u516C\u5171\u6A21\u5757\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
          break;
        case "FUNCTION_ENCRYPTED":
          console.error(`\u6B64\u4E91\u51FD\u6570\uFF08${e2}\uFF09\u5DF2\u52A0\u5BC6\u4E0D\u53EF\u672C\u5730\u8C03\u8BD5\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u5DF2\u90E8\u7F72\u7684\u4E91\u51FD\u6570`);
          break;
        case "ACTION_ENCRYPTED":
          console.error(s3 || "\u9700\u8981\u8BBF\u95EE\u52A0\u5BC6\u7684uni-clientDB-action\uFF0C\u81EA\u52A8\u5207\u6362\u4E3A\u4E91\u7AEF\u73AF\u5883");
          break;
        case "NETWORK_ERROR": {
          const e3 = "\u8FDE\u63A5\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u5931\u8D25\uFF0C\u8BF7\u68C0\u67E5\u5BA2\u6237\u7AEF\u662F\u5426\u548C\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B";
          throw console.error(e3), new Error(e3);
        }
        case "SWITCH_TO_CLOUD":
          break;
        default: {
          const e3 = `\u68C0\u6D4B\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u51FA\u73B0\u9519\u8BEF\uFF1A${s3}\uFF0C\u8BF7\u68C0\u67E5\u7F51\u7EDC\u73AF\u5883\u6216\u91CD\u542F\u5BA2\u6237\u7AEF\u518D\u8BD5`;
          throw console.error(e3), new Error(e3);
        }
      }
      return this._originCallFunction({ name: e2, data: t2 });
    }
    return new Promise((e3, n4) => {
      const s4 = Ke.call(this, { data: t2 });
      b.request({ method: "POST", url: a2, data: { provider: r2, platform: u, param: s4 }, success: ({ statusCode: t3, data: s5 } = {}) => !t3 || t3 >= 400 ? n4(new T({ code: s5.code || "SYS_ERR", message: s5.message || "request:fail" })) : e3({ result: s5 }), fail(e4) {
        n4(new T({ code: e4.code || e4.errCode || "SYS_ERR", message: e4.message || e4.errMsg || "request:fail" }));
      } });
    });
  });
}
const We = [{ rule: /fc_function_not_found|FUNCTION_NOT_FOUND/, content: "\uFF0C\u4E91\u51FD\u6570[{functionName}]\u5728\u4E91\u7AEF\u4E0D\u5B58\u5728\uFF0C\u8BF7\u68C0\u67E5\u6B64\u4E91\u51FD\u6570\u540D\u79F0\u662F\u5426\u6B63\u786E\u4EE5\u53CA\u8BE5\u4E91\u51FD\u6570\u662F\u5426\u5DF2\u4E0A\u4F20\u5230\u670D\u52A1\u7A7A\u95F4", mode: "append" }];
var ze = /[\\^$.*+?()[\]{}|]/g, Je = RegExp(ze.source);
function Ve(e2, t2, n2) {
  return e2.replace(new RegExp((s2 = t2) && Je.test(s2) ? s2.replace(ze, "\\$&") : s2, "g"), n2);
  var s2;
}
function Ye({ functionName: e2, result: t2, logPvd: n2 }) {
  if (this.config.useDebugFunction && t2 && t2.requestId) {
    const s2 = JSON.stringify({ spaceId: this.config.spaceId, functionName: e2, requestId: t2.requestId });
    console.log(`[${n2}-request]${s2}[/${n2}-request]`);
  }
}
function Xe(e2) {
  const t2 = e2.callFunction, n2 = function(n3) {
    const s2 = n3.name;
    n3.data = Ke.call(e2, { data: n3.data });
    const r2 = { aliyun: "aliyun", tencent: "tcb" }[this.config.provider];
    return t2.call(this, n3).then((e3) => (Ye.call(this, { functionName: s2, result: e3, logPvd: r2 }), Promise.resolve(e3)), (e3) => (Ye.call(this, { functionName: s2, result: e3, logPvd: r2 }), e3 && e3.message && (e3.message = function({ message: e4 = "", extraInfo: t3 = {}, formatter: n4 = [] } = {}) {
      for (let s3 = 0; s3 < n4.length; s3++) {
        const { rule: r3, content: o2, mode: i2 } = n4[s3], a2 = e4.match(r3);
        if (!a2)
          continue;
        let c2 = o2;
        for (let e5 = 1; e5 < a2.length; e5++)
          c2 = Ve(c2, `{$${e5}}`, a2[e5]);
        for (const e5 in t3)
          c2 = Ve(c2, `{${e5}}`, t3[e5]);
        return i2 === "replace" ? c2 : e4 + c2;
      }
      return e4;
    }({ message: `[${n3.name}]: ${e3.message}`, formatter: We, extraInfo: { functionName: s2 } })), Promise.reject(e3)));
  };
  e2.callFunction = function(t3) {
    let s2;
    return e2.debugInfo && !e2.debugInfo.forceRemote && l ? (e2._originCallFunction || (e2._originCallFunction = n2), s2 = He.call(this, t3)) : s2 = n2.call(this, t3), Object.defineProperty(s2, "result", { get: () => (console.warn("\u5F53\u524D\u8FD4\u56DE\u7ED3\u679C\u4E3APromise\u7C7B\u578B\uFF0C\u4E0D\u53EF\u76F4\u63A5\u8BBF\u95EE\u5176result\u5C5E\u6027\uFF0C\u8BE6\u60C5\u8BF7\u53C2\u8003\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/faq?id=promise"), {}) }), s2;
  };
}
const Ge = Symbol("CLIENT_DB_INTERNAL");
function Qe(e2, t2) {
  return e2.then = "DoNotReturnProxyWithAFunctionNamedThen", e2._internalType = Ge, e2.__v_raw = void 0, new Proxy(e2, { get(e3, n2, s2) {
    if (n2 === "_uniClient")
      return null;
    if (n2 in e3 || typeof n2 != "string") {
      const t3 = e3[n2];
      return typeof t3 == "function" ? t3.bind(e3) : t3;
    }
    return t2.get(e3, n2, s2);
  } });
}
function Ze(e2) {
  return { on: (t2, n2) => {
    e2[t2] = e2[t2] || [], e2[t2].indexOf(n2) > -1 || e2[t2].push(n2);
  }, off: (t2, n2) => {
    e2[t2] = e2[t2] || [];
    const s2 = e2[t2].indexOf(n2);
    s2 !== -1 && e2[t2].splice(s2, 1);
  } };
}
const et = ["db.Geo", "db.command", "command.aggregate"];
function tt(e2, t2) {
  return et.indexOf(`${e2}.${t2}`) > -1;
}
function nt(e2) {
  switch (o(e2 = Ne(e2))) {
    case "array":
      return e2.map((e3) => nt(e3));
    case "object":
      return e2._internalType === Ge || Object.keys(e2).forEach((t2) => {
        e2[t2] = nt(e2[t2]);
      }), e2;
    case "regexp":
      return { $regexp: { source: e2.source, flags: e2.flags } };
    case "date":
      return { $date: e2.toISOString() };
    default:
      return e2;
  }
}
class st {
  constructor(e2, t2, n2) {
    this.content = e2, this.prevStage = t2 || null, this.udb = null, this._database = n2;
  }
  toJSON() {
    let e2 = this;
    const t2 = [e2.content];
    for (; e2.prevStage; )
      e2 = e2.prevStage, t2.push(e2.content);
    return { $db: t2.reverse().map((e3) => ({ $method: e3.$method, $param: nt(e3.$param) })) };
  }
  getAction() {
    const e2 = this.toJSON().$db.find((e3) => e3.$method === "action");
    return e2 && e2.$param && e2.$param[0];
  }
  getCommand() {
    return { $db: this.toJSON().$db.filter((e2) => e2.$method !== "action") };
  }
  get useAggregate() {
    let e2 = this, t2 = false;
    for (; e2.prevStage; ) {
      e2 = e2.prevStage;
      const n2 = e2.content.$method;
      if (n2 === "aggregate" || n2 === "pipeline") {
        t2 = true;
        break;
      }
    }
    return t2;
  }
  get count() {
    if (!this.useAggregate)
      return function() {
        return this._send("count", Array.from(arguments));
      };
    const e2 = this;
    return function() {
      return rt({ $method: "count", $param: nt(Array.from(arguments)) }, e2, this._database);
    };
  }
  get() {
    return this._send("get", Array.from(arguments));
  }
  add() {
    return this._send("add", Array.from(arguments));
  }
  remove() {
    return this._send("remove", Array.from(arguments));
  }
  update() {
    return this._send("update", Array.from(arguments));
  }
  end() {
    return this._send("end", Array.from(arguments));
  }
  set() {
    throw new Error("clientDB\u7981\u6B62\u4F7F\u7528set\u65B9\u6CD5");
  }
  _send(e2, t2) {
    const n2 = this.getAction(), s2 = this.getCommand();
    if (s2.$db.push({ $method: e2, $param: nt(t2) }), c) {
      const e3 = s2.$db.find((e4) => e4.$method === "collection"), t3 = e3 && e3.$param;
      t3 && t3.length === 1 && typeof e3.$param[0] == "string" && e3.$param[0].indexOf(",") > -1 && console.warn("\u68C0\u6D4B\u5230\u4F7F\u7528JQL\u8BED\u6CD5\u8054\u8868\u67E5\u8BE2\u65F6\uFF0C\u672A\u4F7F\u7528getTemp\u5148\u8FC7\u6EE4\u4E3B\u8868\u6570\u636E\uFF0C\u5728\u4E3B\u8868\u6570\u636E\u91CF\u5927\u7684\u60C5\u51B5\u4E0B\u53EF\u80FD\u4F1A\u67E5\u8BE2\u7F13\u6162\u3002\n- \u5982\u4F55\u4F18\u5316\u8BF7\u53C2\u8003\u6B64\u6587\u6863\uFF1Ahttps://uniapp.dcloud.net.cn/uniCloud/jql?id=lookup-with-temp \n- \u5982\u679C\u4E3B\u8868\u6570\u636E\u91CF\u5F88\u5C0F\u8BF7\u5FFD\u7565\u6B64\u4FE1\u606F\uFF0C\u9879\u76EE\u53D1\u884C\u65F6\u4E0D\u4F1A\u51FA\u73B0\u6B64\u63D0\u793A\u3002");
    }
    return this._database._callCloudFunction({ action: n2, command: s2 });
  }
}
function rt(e2, t2, n2) {
  return Qe(new st(e2, t2, n2), { get(e3, t3) {
    let s2 = "db";
    return e3 && e3.content && (s2 = e3.content.$method), tt(s2, t3) ? rt({ $method: t3 }, e3, n2) : function() {
      return rt({ $method: t3, $param: nt(Array.from(arguments)) }, e3, n2);
    };
  } });
}
function ot({ path: e2, method: t2 }) {
  return class {
    constructor() {
      this.param = Array.from(arguments);
    }
    toJSON() {
      return { $newDb: [...e2.map((e3) => ({ $method: e3 })), { $method: t2, $param: this.param }] };
    }
  };
}
class it extends class {
  constructor({ uniClient: e2 = {} } = {}) {
    this._uniClient = e2, this._authCallBacks = {}, this._dbCallBacks = {}, e2.isDefault && (this._dbCallBacks = g("_globalUniCloudDatabaseCallback")), this.auth = Ze(this._authCallBacks), Object.assign(this, Ze(this._dbCallBacks)), this.env = Qe({}, { get: (e3, t2) => ({ $env: t2 }) }), this.Geo = Qe({}, { get: (e3, t2) => ot({ path: ["Geo"], method: t2 }) }), this.serverDate = ot({ path: [], method: "serverDate" }), this.RegExp = ot({ path: [], method: "RegExp" });
  }
  getCloudEnv(e2) {
    if (typeof e2 != "string" || !e2.trim())
      throw new Error("getCloudEnv\u53C2\u6570\u9519\u8BEF");
    return { $env: e2.replace("$cloudEnv_", "") };
  }
  _callback(e2, t2) {
    const n2 = this._dbCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  _callbackAuth(e2, t2) {
    const n2 = this._authCallBacks;
    n2[e2] && n2[e2].forEach((e3) => {
      e3(...t2);
    });
  }
  multiSend() {
    const e2 = Array.from(arguments), t2 = e2.map((e3) => {
      const t3 = e3.getAction(), n2 = e3.getCommand();
      if (n2.$db[n2.$db.length - 1].$method !== "getTemp")
        throw new Error("multiSend\u53EA\u652F\u6301\u5B50\u547D\u4EE4\u5185\u4F7F\u7528getTemp");
      return { action: t3, command: n2 };
    });
    return this._callCloudFunction({ multiCommand: t2, queryList: e2 });
  }
} {
  _callCloudFunction({ action: e2, command: t2, multiCommand: n2, queryList: s2 }) {
    function r2(e3, t3) {
      if (n2 && s2)
        for (let n3 = 0; n3 < s2.length; n3++) {
          const r3 = s2[n3];
          r3.udb && typeof r3.udb.setResult == "function" && (t3 ? r3.udb.setResult(t3) : r3.udb.setResult(e3.result.dataList[n3]));
        }
    }
    const o2 = k(v("database", "invoke")), i2 = this._uniClient;
    return o2.then(() => i2.callFunction({ name: "DCloud-clientDB", data: { action: e2, command: t2, multiCommand: n2 } })).then((e3) => {
      const { code: t3, message: n3, token: s3, tokenExpired: o3, systemInfo: i3 = [] } = e3.result;
      if (i3)
        for (let e4 = 0; e4 < i3.length; e4++) {
          const { level: t4, message: n4, detail: s4 } = i3[e4], r3 = console[t4] || console.log;
          let o4 = "[System Info]" + n4;
          s4 && (o4 = `${o4}
\u8BE6\u7EC6\u4FE1\u606F\uFF1A${s4}`), r3(o4);
        }
      if (t3) {
        const s4 = new T({ message: n3, code: t3, requestId: e3.requestId });
        return this._callback("error", [s4]), Promise.reject(s4);
      }
      s3 && o3 && (!function({ token: e4, tokenExpired: t4 } = {}) {
        e4 && b.setStorageSync("uni_id_token", e4), t4 && b.setStorageSync("uni_id_token_expired", t4);
      }({ token: s3, tokenExpired: o3 }), this._callbackAuth("refreshToken", [{ token: s3, tokenExpired: o3 }]), this._callback("refreshToken", [{ token: s3, tokenExpired: o3 }]));
      const a2 = e3.result.affectedDocs;
      return typeof a2 == "number" && Object.defineProperty(e3.result, "affectedDocs", { get: () => (console.warn("affectedDocs\u4E0D\u518D\u63A8\u8350\u4F7F\u7528\uFF0C\u8BF7\u4F7F\u7528inserted/deleted/updated/data.length\u66FF\u4EE3"), a2) }), k(v("database", "success"), e3).then(() => k(v("database", "complete"), e3)).then(() => (r2(e3, null), Promise.resolve(e3)));
    }, (e3) => {
      const t3 = new T({ code: e3.code || "SYSTEM_ERROR", message: e3.message, requestId: e3.requestId });
      return this._callback("error", [t3]), /fc_function_not_found|FUNCTION_NOT_FOUND/g.test(e3.message) && console.warn("clientDB\u672A\u521D\u59CB\u5316\uFF0C\u8BF7\u5728web\u63A7\u5236\u53F0\u4FDD\u5B58\u4E00\u6B21schema\u4EE5\u5F00\u542FclientDB"), k(v("database", "fail"), e3).then(() => k(v("database", "complete"), e3)).then(() => (r2(null, e3), Promise.reject(e3)));
    });
  }
}
function at(e2) {
  e2.database = function(t2) {
    if (t2 && Object.keys(t2).length > 0)
      return e2.init(t2).database();
    if (this._database)
      return this._database;
    const n2 = function(e3, t3 = {}) {
      return Qe(new e3(t3), { get: (e4, t4) => tt("db", t4) ? rt({ $method: t4 }, null, e4) : function() {
        return rt({ $method: t4, $param: nt(Array.from(arguments)) }, null, e4);
      } });
    }(it, { uniClient: e2 });
    return this._database = n2, n2;
  };
}
let ct;
const ut = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", ht = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;
function lt() {
  const e2 = $e().token || "", t2 = e2.split(".");
  if (!e2 || t2.length !== 3)
    return { uid: null, role: [], permission: [], tokenExpired: 0 };
  let n2;
  try {
    n2 = JSON.parse((s2 = t2[1], decodeURIComponent(ct(s2).split("").map(function(e3) {
      return "%" + ("00" + e3.charCodeAt(0).toString(16)).slice(-2);
    }).join(""))));
  } catch (e3) {
    throw new Error("\u83B7\u53D6\u5F53\u524D\u7528\u6237\u4FE1\u606F\u51FA\u9519\uFF0C\u8BE6\u7EC6\u9519\u8BEF\u4FE1\u606F\u4E3A\uFF1A" + e3.message);
  }
  var s2;
  return n2.tokenExpired = 1e3 * n2.exp, delete n2.exp, delete n2.iat, n2;
}
ct = typeof atob != "function" ? function(e2) {
  if (e2 = String(e2).replace(/[\t\n\f\r ]+/g, ""), !ht.test(e2))
    throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");
  var t2;
  e2 += "==".slice(2 - (3 & e2.length));
  for (var n2, s2, r2 = "", o2 = 0; o2 < e2.length; )
    t2 = ut.indexOf(e2.charAt(o2++)) << 18 | ut.indexOf(e2.charAt(o2++)) << 12 | (n2 = ut.indexOf(e2.charAt(o2++))) << 6 | (s2 = ut.indexOf(e2.charAt(o2++))), r2 += n2 === 64 ? String.fromCharCode(t2 >> 16 & 255) : s2 === 64 ? String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255) : String.fromCharCode(t2 >> 16 & 255, t2 >> 8 & 255, 255 & t2);
  return r2;
} : atob;
var dt = t(n(function(e2, t2) {
  Object.defineProperty(t2, "__esModule", { value: true });
  const n2 = "chooseAndUploadFile:ok", s2 = "chooseAndUploadFile:fail";
  function r2(e3, t3) {
    return e3.tempFiles.forEach((e4, n3) => {
      e4.name || (e4.name = e4.path.substring(e4.path.lastIndexOf("/") + 1)), t3 && (e4.fileType = t3), e4.cloudPath = Date.now() + "_" + n3 + e4.name.substring(e4.name.lastIndexOf("."));
    }), e3.tempFilePaths || (e3.tempFilePaths = e3.tempFiles.map((e4) => e4.path)), e3;
  }
  function o2(e3, t3, { onChooseFile: s3, onUploadProgress: r3 }) {
    return t3.then((e4) => {
      if (s3) {
        const t4 = s3(e4);
        if (t4 !== void 0)
          return Promise.resolve(t4).then((t5) => t5 === void 0 ? e4 : t5);
      }
      return e4;
    }).then((t4) => t4 === false ? { errMsg: n2, tempFilePaths: [], tempFiles: [] } : function(e4, t5, s4 = 5, r4) {
      (t5 = Object.assign({}, t5)).errMsg = n2;
      const o3 = t5.tempFiles, i2 = o3.length;
      let a2 = 0;
      return new Promise((n3) => {
        for (; a2 < s4; )
          c2();
        function c2() {
          const s5 = a2++;
          if (s5 >= i2)
            return void (!o3.find((e5) => !e5.url && !e5.errMsg) && n3(t5));
          const u2 = o3[s5];
          e4.uploadFile({ filePath: u2.path, cloudPath: u2.cloudPath, fileType: u2.fileType, onUploadProgress(e5) {
            e5.index = s5, e5.tempFile = u2, e5.tempFilePath = u2.path, r4 && r4(e5);
          } }).then((e5) => {
            u2.url = e5.fileID, s5 < i2 && c2();
          }).catch((e5) => {
            u2.errMsg = e5.errMsg || e5.message, s5 < i2 && c2();
          });
        }
      });
    }(e3, t4, 5, r3));
  }
  t2.initChooseAndUploadFile = function(e3) {
    return function(t3 = { type: "all" }) {
      return t3.type === "image" ? o2(e3, function(e4) {
        const { count: t4, sizeType: n3, sourceType: o3 = ["album", "camera"], extension: i2 } = e4;
        return new Promise((e5, a2) => {
          index.chooseImage({ count: t4, sizeType: n3, sourceType: o3, extension: i2, success(t5) {
            e5(r2(t5, "image"));
          }, fail(e6) {
            a2({ errMsg: e6.errMsg.replace("chooseImage:fail", s2) });
          } });
        });
      }(t3), t3) : t3.type === "video" ? o2(e3, function(e4) {
        const { camera: t4, compressed: n3, maxDuration: o3, sourceType: i2 = ["album", "camera"], extension: a2 } = e4;
        return new Promise((e5, c2) => {
          index.chooseVideo({ camera: t4, compressed: n3, maxDuration: o3, sourceType: i2, extension: a2, success(t5) {
            const { tempFilePath: n4, duration: s3, size: o4, height: i3, width: a3 } = t5;
            e5(r2({ errMsg: "chooseVideo:ok", tempFilePaths: [n4], tempFiles: [{ name: t5.tempFile && t5.tempFile.name || "", path: n4, size: o4, type: t5.tempFile && t5.tempFile.type || "", width: a3, height: i3, duration: s3, fileType: "video", cloudPath: "" }] }, "video"));
          }, fail(e6) {
            c2({ errMsg: e6.errMsg.replace("chooseVideo:fail", s2) });
          } });
        });
      }(t3), t3) : o2(e3, function(e4) {
        const { count: t4, extension: n3 } = e4;
        return new Promise((e5, o3) => {
          let i2 = index.chooseFile;
          if (typeof wx != "undefined" && typeof wx.chooseMessageFile == "function" && (i2 = wx.chooseMessageFile), typeof i2 != "function")
            return o3({ errMsg: s2 + " \u8BF7\u6307\u5B9A type \u7C7B\u578B\uFF0C\u8BE5\u5E73\u53F0\u4EC5\u652F\u6301\u9009\u62E9 image \u6216 video\u3002" });
          i2({ type: "all", count: t4, extension: n3, success(t5) {
            e5(r2(t5));
          }, fail(e6) {
            o3({ errMsg: e6.errMsg.replace("chooseFile:fail", s2) });
          } });
        });
      }(t3), t3);
    };
  };
}));
const ft = "manual";
function pt(e2) {
  return { props: { localdata: { type: Array, default: () => [] }, options: { type: [Object, Array], default: () => ({}) }, spaceInfo: { type: Object, default: () => ({}) }, collection: { type: [String, Array], default: "" }, action: { type: String, default: "" }, field: { type: String, default: "" }, orderby: { type: String, default: "" }, where: { type: [String, Object], default: "" }, pageData: { type: String, default: "add" }, pageCurrent: { type: Number, default: 1 }, pageSize: { type: Number, default: 20 }, getcount: { type: [Boolean, String], default: false }, gettree: { type: [Boolean, String], default: false }, gettreepath: { type: [Boolean, String], default: false }, startwith: { type: String, default: "" }, limitlevel: { type: Number, default: 10 }, groupby: { type: String, default: "" }, groupField: { type: String, default: "" }, distinct: { type: [Boolean, String], default: false }, foreignKey: { type: String, default: "" }, loadtime: { type: String, default: "auto" }, manual: { type: Boolean, default: false } }, data: () => ({ mixinDatacomLoading: false, mixinDatacomHasMore: false, mixinDatacomResData: [], mixinDatacomErrorMessage: "", mixinDatacomPage: {} }), created() {
    this.mixinDatacomPage = { current: this.pageCurrent, size: this.pageSize, count: 0 }, this.$watch(() => {
      var e3 = [];
      return ["pageCurrent", "pageSize", "localdata", "collection", "action", "field", "orderby", "where", "getont", "getcount", "gettree", "groupby", "groupField", "distinct"].forEach((t2) => {
        e3.push(this[t2]);
      }), e3;
    }, (e3, t2) => {
      if (this.loadtime === ft)
        return;
      let n2 = false;
      const s2 = [];
      for (let r2 = 2; r2 < e3.length; r2++)
        e3[r2] !== t2[r2] && (s2.push(e3[r2]), n2 = true);
      e3[0] !== t2[0] && (this.mixinDatacomPage.current = this.pageCurrent), this.mixinDatacomPage.size = this.pageSize, this.onMixinDatacomPropsChange(n2, s2);
    });
  }, methods: { onMixinDatacomPropsChange(e3, t2) {
  }, mixinDatacomEasyGet({ getone: e3 = false, success: t2, fail: n2 } = {}) {
    this.mixinDatacomLoading || (this.mixinDatacomLoading = true, this.mixinDatacomErrorMessage = "", this.mixinDatacomGet().then((n3) => {
      this.mixinDatacomLoading = false;
      const { data: s2, count: r2 } = n3.result;
      this.getcount && (this.mixinDatacomPage.count = r2), this.mixinDatacomHasMore = s2.length < this.pageSize;
      const o2 = e3 ? s2.length ? s2[0] : void 0 : s2;
      this.mixinDatacomResData = o2, t2 && t2(o2);
    }).catch((e4) => {
      this.mixinDatacomLoading = false, this.mixinDatacomErrorMessage = e4, n2 && n2(e4);
    }));
  }, mixinDatacomGet(t2 = {}) {
    let n2 = e2.database(this.spaceInfo);
    const s2 = t2.action || this.action;
    s2 && (n2 = n2.action(s2));
    const r2 = t2.collection || this.collection;
    n2 = Array.isArray(r2) ? n2.collection(...r2) : n2.collection(r2);
    const o2 = t2.where || this.where;
    o2 && Object.keys(o2).length && (n2 = n2.where(o2));
    const i2 = t2.field || this.field;
    i2 && (n2 = n2.field(i2));
    const a2 = t2.foreignKey || this.foreignKey;
    a2 && (n2 = n2.foreignKey(a2));
    const c2 = t2.groupby || this.groupby;
    c2 && (n2 = n2.groupBy(c2));
    const u2 = t2.groupField || this.groupField;
    u2 && (n2 = n2.groupField(u2));
    (t2.distinct !== void 0 ? t2.distinct : this.distinct) === true && (n2 = n2.distinct());
    const h2 = t2.orderby || this.orderby;
    h2 && (n2 = n2.orderBy(h2));
    const l2 = t2.pageCurrent !== void 0 ? t2.pageCurrent : this.mixinDatacomPage.current, d = t2.pageSize !== void 0 ? t2.pageSize : this.mixinDatacomPage.size, f2 = t2.getcount !== void 0 ? t2.getcount : this.getcount, p2 = t2.gettree !== void 0 ? t2.gettree : this.gettree, g2 = t2.gettreepath !== void 0 ? t2.gettreepath : this.gettreepath, m2 = { getCount: f2 }, y2 = { limitLevel: t2.limitlevel !== void 0 ? t2.limitlevel : this.limitlevel, startWith: t2.startwith !== void 0 ? t2.startwith : this.startwith };
    return p2 && (m2.getTree = y2), g2 && (m2.getTreePath = y2), n2 = n2.skip(d * (l2 - 1)).limit(d).get(m2), n2;
  } } };
}
function gt(e2) {
  e2.getCurrentUserInfo = lt, e2.chooseAndUploadFile = dt.initChooseAndUploadFile(e2), Object.assign(e2, { get mixinDatacom() {
    return pt(e2);
  } }), e2.importObject = function(e3) {
    return function(t2) {
      return new Proxy({}, { get: (n2, s2) => async function(...n3) {
        const r2 = await e3.callFunction({ name: t2, data: { method: s2, params: n3 } }), { errCode: o2, errMsg: i2 } = r2.result || {};
        if (o2) {
          const e4 = new T({ code: o2, message: i2, requestId: r2.requestId });
          throw e4.detail = r2.result, e4;
        }
        return r2.result;
      } });
    };
  }(e2);
}
async function mt(e2, t2) {
  const n2 = `http://${e2}:${t2}/system/ping`;
  try {
    const e3 = await (s2 = { url: n2, timeout: 500 }, new Promise((e4, t3) => {
      b.request(__spreadProps(__spreadValues({}, s2), { success(t4) {
        e4(t4);
      }, fail(e5) {
        t3(e5);
      } }));
    }));
    return !(!e3.data || e3.data.code !== 0);
  } catch (e3) {
    return false;
  }
  var s2;
}
function yt(e2) {
  if (e2.initUniCloudStatus && e2.initUniCloudStatus !== "rejected")
    return;
  let t2 = Promise.resolve();
  var n2;
  n2 = 1, t2 = new Promise((e3, t3) => {
    setTimeout(() => {
      e3();
    }, n2);
  }), e2.isReady = false, e2.isDefault = false;
  const s2 = e2.auth();
  e2.initUniCloudStatus = "pending", e2.initUniCloud = t2.then(() => s2.getLoginState()).then((e3) => e3 ? Promise.resolve() : s2.signInAnonymously()).then(() => {
    if (e2.debugInfo) {
      const { address: t3, servePort: n3 } = e2.debugInfo;
      return async function(e3, t4) {
        let n4;
        for (let s3 = 0; s3 < e3.length; s3++) {
          const r2 = e3[s3];
          if (await mt(r2, t4)) {
            n4 = r2;
            break;
          }
        }
        return { address: n4, port: t4 };
      }(t3, n3);
    }
  }).then(({ address: t3, port: n3 } = {}) => {
    if (t3)
      e2.localAddress = t3, e2.localPort = n3;
    else if (e2.debugInfo) {
      const t4 = console["warn"];
      let n4 = "";
      e2.debugInfo.initialLaunchType === "remote" ? (e2.debugInfo.forceRemote = true, n4 = "\u5F53\u524D\u5BA2\u6237\u7AEF\u548CHBuilderX\u4E0D\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\uFF08\u6216\u5176\u4ED6\u7F51\u7EDC\u539F\u56E0\u65E0\u6CD5\u8FDE\u63A5HBuilderX\uFF09\uFF0CuniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\u4E0D\u5BF9\u5F53\u524D\u5BA2\u6237\u7AEF\u751F\u6548\u3002\n- \u5982\u679C\u4E0D\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u76F4\u63A5\u5FFD\u7565\u6B64\u4FE1\u606F\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs") : n4 = "\u65E0\u6CD5\u8FDE\u63A5uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u68C0\u67E5\u5F53\u524D\u5BA2\u6237\u7AEF\u662F\u5426\u4E0E\u4E3B\u673A\u5728\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u3002\n- \u5982\u9700\u4F7F\u7528uniCloud\u672C\u5730\u8C03\u8BD5\u670D\u52A1\uFF0C\u8BF7\u5C06\u5BA2\u6237\u7AEF\u4E0E\u4E3B\u673A\u8FDE\u63A5\u5230\u540C\u4E00\u5C40\u57DF\u7F51\u4E0B\u5E76\u91CD\u65B0\u8FD0\u884C\u5230\u5BA2\u6237\u7AEF\u3002\n- \u5982\u679C\u5728HBuilderX\u5F00\u542F\u7684\u72B6\u6001\u4E0B\u5207\u6362\u8FC7\u7F51\u7EDC\u73AF\u5883\uFF0C\u8BF7\u91CD\u542FHBuilderX\u540E\u518D\u8BD5\n- \u68C0\u67E5\u7CFB\u7EDF\u9632\u706B\u5899\u662F\u5426\u62E6\u622A\u4E86HBuilderX\u81EA\u5E26\u7684nodejs", t4(n4);
    }
  }).then(() => {
    e2.isReady = true, e2.initUniCloudStatus = "fulfilled";
  }).catch((t3) => {
    console.error(t3), e2.initUniCloudStatus = "rejected";
  });
}
let _t = new class {
  init(e2) {
    let t2 = {};
    const n2 = e2.debugFunction !== false && c && u === "app-plus";
    switch (e2.provider) {
      case "tencent":
        t2 = Le.init(Object.assign(e2, { useDebugFunction: n2 }));
        break;
      case "aliyun":
        t2 = U.init(Object.assign(e2, { useDebugFunction: n2 }));
        break;
      case "private":
        t2 = Be.init(Object.assign(e2, { useDebugFunction: n2 }));
        break;
      default:
        throw new Error("\u672A\u63D0\u4F9B\u6B63\u786E\u7684provider\u53C2\u6570");
    }
    const s2 = h;
    s2 && !s2.code && (t2.debugInfo = s2), yt(t2), t2.reInit = function() {
      yt(this);
    }, Xe(t2), function(e3) {
      const t3 = e3.uploadFile;
      e3.uploadFile = function(e4) {
        return t3.call(this, e4);
      };
    }(t2), at(t2), gt(t2);
    return ["callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "chooseAndUploadFile"].forEach((e3) => {
      if (!t2[e3])
        return;
      const n3 = t2[e3];
      t2[e3] = function() {
        return t2.reInit(), n3.apply(t2, Array.from(arguments));
      }, t2[e3] = S(t2[e3], e3).bind(t2);
    }), t2.init = this.init, t2;
  }
}();
(() => {
  {
    const e2 = l;
    let t2 = {};
    if (e2.length === 1)
      t2 = e2[0], _t = _t.init(t2), _t.isDefault = true;
    else {
      const t3 = ["auth", "callFunction", "uploadFile", "deleteFile", "getTempFileURL", "downloadFile", "database", "getCurrentUSerInfo", "importObject"];
      let n2;
      n2 = e2 && e2.length > 0 ? "\u5E94\u7528\u6709\u591A\u4E2A\u670D\u52A1\u7A7A\u95F4\uFF0C\u8BF7\u901A\u8FC7uniCloud.init\u65B9\u6CD5\u6307\u5B9A\u8981\u4F7F\u7528\u7684\u670D\u52A1\u7A7A\u95F4" : "uni-app cli\u9879\u76EE\u5185\u4F7F\u7528uniCloud\u9700\u8981\u4F7F\u7528HBuilderX\u7684\u8FD0\u884C\u83DC\u5355\u8FD0\u884C\u9879\u76EE\uFF0C\u4E14\u9700\u8981\u5728uniCloud\u76EE\u5F55\u5173\u8054\u670D\u52A1\u7A7A\u95F4", t3.forEach((e3) => {
        _t[e3] = function() {
          return console.error(n2), Promise.reject(new T({ code: "SYS_ERR", message: n2 }));
        };
      });
    }
    Object.assign(_t, { get mixinDatacom() {
      return pt(_t);
    } }), _t.addInterceptor = _, _t.removeInterceptor = w;
  }
})();
var wt = _t;
function getAugmentedNamespace(n2) {
  if (n2.__esModule)
    return n2;
  var a2 = Object.defineProperty({}, "__esModule", { value: true });
  Object.keys(n2).forEach(function(k2) {
    var d = Object.getOwnPropertyDescriptor(n2, k2);
    Object.defineProperty(a2, k2, d.get ? d : {
      enumerable: true,
      get: function() {
        return n2[k2];
      }
    });
  });
  return a2;
}
var lib$1 = {};
var isReactComponent$1 = {};
var buildMatchMemberExpression$1 = {};
var matchesPattern$1 = {};
var generated$4 = {};
var shallowEqual$1 = {};
Object.defineProperty(shallowEqual$1, "__esModule", {
  value: true
});
shallowEqual$1.default = shallowEqual;
function shallowEqual(actual, expected) {
  const keys = Object.keys(expected);
  for (const key of keys) {
    if (actual[key] !== expected[key]) {
      return false;
    }
  }
  return true;
}
Object.defineProperty(generated$4, "__esModule", {
  value: true
});
generated$4.isAccessor = isAccessor;
generated$4.isAnyTypeAnnotation = isAnyTypeAnnotation;
generated$4.isArgumentPlaceholder = isArgumentPlaceholder;
generated$4.isArrayExpression = isArrayExpression;
generated$4.isArrayPattern = isArrayPattern;
generated$4.isArrayTypeAnnotation = isArrayTypeAnnotation;
generated$4.isArrowFunctionExpression = isArrowFunctionExpression;
generated$4.isAssignmentExpression = isAssignmentExpression;
generated$4.isAssignmentPattern = isAssignmentPattern;
generated$4.isAwaitExpression = isAwaitExpression;
generated$4.isBigIntLiteral = isBigIntLiteral;
generated$4.isBinary = isBinary;
generated$4.isBinaryExpression = isBinaryExpression;
generated$4.isBindExpression = isBindExpression;
generated$4.isBlock = isBlock;
generated$4.isBlockParent = isBlockParent;
generated$4.isBlockStatement = isBlockStatement;
generated$4.isBooleanLiteral = isBooleanLiteral;
generated$4.isBooleanLiteralTypeAnnotation = isBooleanLiteralTypeAnnotation;
generated$4.isBooleanTypeAnnotation = isBooleanTypeAnnotation;
generated$4.isBreakStatement = isBreakStatement;
generated$4.isCallExpression = isCallExpression;
generated$4.isCatchClause = isCatchClause;
generated$4.isClass = isClass;
generated$4.isClassAccessorProperty = isClassAccessorProperty;
generated$4.isClassBody = isClassBody;
generated$4.isClassDeclaration = isClassDeclaration;
generated$4.isClassExpression = isClassExpression;
generated$4.isClassImplements = isClassImplements;
generated$4.isClassMethod = isClassMethod;
generated$4.isClassPrivateMethod = isClassPrivateMethod;
generated$4.isClassPrivateProperty = isClassPrivateProperty;
generated$4.isClassProperty = isClassProperty;
generated$4.isCompletionStatement = isCompletionStatement;
generated$4.isConditional = isConditional;
generated$4.isConditionalExpression = isConditionalExpression;
generated$4.isContinueStatement = isContinueStatement;
generated$4.isDebuggerStatement = isDebuggerStatement;
generated$4.isDecimalLiteral = isDecimalLiteral;
generated$4.isDeclaration = isDeclaration;
generated$4.isDeclareClass = isDeclareClass;
generated$4.isDeclareExportAllDeclaration = isDeclareExportAllDeclaration;
generated$4.isDeclareExportDeclaration = isDeclareExportDeclaration;
generated$4.isDeclareFunction = isDeclareFunction;
generated$4.isDeclareInterface = isDeclareInterface;
generated$4.isDeclareModule = isDeclareModule;
generated$4.isDeclareModuleExports = isDeclareModuleExports;
generated$4.isDeclareOpaqueType = isDeclareOpaqueType;
generated$4.isDeclareTypeAlias = isDeclareTypeAlias;
generated$4.isDeclareVariable = isDeclareVariable;
generated$4.isDeclaredPredicate = isDeclaredPredicate;
generated$4.isDecorator = isDecorator;
generated$4.isDirective = isDirective;
generated$4.isDirectiveLiteral = isDirectiveLiteral;
generated$4.isDoExpression = isDoExpression;
generated$4.isDoWhileStatement = isDoWhileStatement;
generated$4.isEmptyStatement = isEmptyStatement;
generated$4.isEmptyTypeAnnotation = isEmptyTypeAnnotation;
generated$4.isEnumBody = isEnumBody;
generated$4.isEnumBooleanBody = isEnumBooleanBody;
generated$4.isEnumBooleanMember = isEnumBooleanMember;
generated$4.isEnumDeclaration = isEnumDeclaration;
generated$4.isEnumDefaultedMember = isEnumDefaultedMember;
generated$4.isEnumMember = isEnumMember;
generated$4.isEnumNumberBody = isEnumNumberBody;
generated$4.isEnumNumberMember = isEnumNumberMember;
generated$4.isEnumStringBody = isEnumStringBody;
generated$4.isEnumStringMember = isEnumStringMember;
generated$4.isEnumSymbolBody = isEnumSymbolBody;
generated$4.isExistsTypeAnnotation = isExistsTypeAnnotation;
generated$4.isExportAllDeclaration = isExportAllDeclaration;
generated$4.isExportDeclaration = isExportDeclaration;
generated$4.isExportDefaultDeclaration = isExportDefaultDeclaration;
generated$4.isExportDefaultSpecifier = isExportDefaultSpecifier;
generated$4.isExportNamedDeclaration = isExportNamedDeclaration;
generated$4.isExportNamespaceSpecifier = isExportNamespaceSpecifier;
generated$4.isExportSpecifier = isExportSpecifier;
generated$4.isExpression = isExpression;
generated$4.isExpressionStatement = isExpressionStatement;
generated$4.isExpressionWrapper = isExpressionWrapper;
generated$4.isFile = isFile;
generated$4.isFlow = isFlow;
generated$4.isFlowBaseAnnotation = isFlowBaseAnnotation;
generated$4.isFlowDeclaration = isFlowDeclaration;
generated$4.isFlowPredicate = isFlowPredicate;
generated$4.isFlowType = isFlowType;
generated$4.isFor = isFor;
generated$4.isForInStatement = isForInStatement;
generated$4.isForOfStatement = isForOfStatement;
generated$4.isForStatement = isForStatement;
generated$4.isForXStatement = isForXStatement;
generated$4.isFunction = isFunction;
generated$4.isFunctionDeclaration = isFunctionDeclaration;
generated$4.isFunctionExpression = isFunctionExpression;
generated$4.isFunctionParent = isFunctionParent;
generated$4.isFunctionTypeAnnotation = isFunctionTypeAnnotation;
generated$4.isFunctionTypeParam = isFunctionTypeParam;
generated$4.isGenericTypeAnnotation = isGenericTypeAnnotation;
generated$4.isIdentifier = isIdentifier;
generated$4.isIfStatement = isIfStatement;
generated$4.isImmutable = isImmutable$2;
generated$4.isImport = isImport;
generated$4.isImportAttribute = isImportAttribute;
generated$4.isImportDeclaration = isImportDeclaration;
generated$4.isImportDefaultSpecifier = isImportDefaultSpecifier;
generated$4.isImportNamespaceSpecifier = isImportNamespaceSpecifier;
generated$4.isImportSpecifier = isImportSpecifier;
generated$4.isIndexedAccessType = isIndexedAccessType;
generated$4.isInferredPredicate = isInferredPredicate;
generated$4.isInterfaceDeclaration = isInterfaceDeclaration;
generated$4.isInterfaceExtends = isInterfaceExtends;
generated$4.isInterfaceTypeAnnotation = isInterfaceTypeAnnotation;
generated$4.isInterpreterDirective = isInterpreterDirective;
generated$4.isIntersectionTypeAnnotation = isIntersectionTypeAnnotation;
generated$4.isJSX = isJSX;
generated$4.isJSXAttribute = isJSXAttribute;
generated$4.isJSXClosingElement = isJSXClosingElement;
generated$4.isJSXClosingFragment = isJSXClosingFragment;
generated$4.isJSXElement = isJSXElement;
generated$4.isJSXEmptyExpression = isJSXEmptyExpression;
generated$4.isJSXExpressionContainer = isJSXExpressionContainer;
generated$4.isJSXFragment = isJSXFragment;
generated$4.isJSXIdentifier = isJSXIdentifier;
generated$4.isJSXMemberExpression = isJSXMemberExpression;
generated$4.isJSXNamespacedName = isJSXNamespacedName;
generated$4.isJSXOpeningElement = isJSXOpeningElement;
generated$4.isJSXOpeningFragment = isJSXOpeningFragment;
generated$4.isJSXSpreadAttribute = isJSXSpreadAttribute;
generated$4.isJSXSpreadChild = isJSXSpreadChild;
generated$4.isJSXText = isJSXText;
generated$4.isLVal = isLVal;
generated$4.isLabeledStatement = isLabeledStatement;
generated$4.isLiteral = isLiteral;
generated$4.isLogicalExpression = isLogicalExpression;
generated$4.isLoop = isLoop;
generated$4.isMemberExpression = isMemberExpression;
generated$4.isMetaProperty = isMetaProperty;
generated$4.isMethod = isMethod;
generated$4.isMiscellaneous = isMiscellaneous;
generated$4.isMixedTypeAnnotation = isMixedTypeAnnotation;
generated$4.isModuleDeclaration = isModuleDeclaration;
generated$4.isModuleExpression = isModuleExpression;
generated$4.isModuleSpecifier = isModuleSpecifier;
generated$4.isNewExpression = isNewExpression;
generated$4.isNoop = isNoop;
generated$4.isNullLiteral = isNullLiteral;
generated$4.isNullLiteralTypeAnnotation = isNullLiteralTypeAnnotation;
generated$4.isNullableTypeAnnotation = isNullableTypeAnnotation;
generated$4.isNumberLiteral = isNumberLiteral;
generated$4.isNumberLiteralTypeAnnotation = isNumberLiteralTypeAnnotation;
generated$4.isNumberTypeAnnotation = isNumberTypeAnnotation;
generated$4.isNumericLiteral = isNumericLiteral;
generated$4.isObjectExpression = isObjectExpression;
generated$4.isObjectMember = isObjectMember;
generated$4.isObjectMethod = isObjectMethod;
generated$4.isObjectPattern = isObjectPattern;
generated$4.isObjectProperty = isObjectProperty;
generated$4.isObjectTypeAnnotation = isObjectTypeAnnotation;
generated$4.isObjectTypeCallProperty = isObjectTypeCallProperty;
generated$4.isObjectTypeIndexer = isObjectTypeIndexer;
generated$4.isObjectTypeInternalSlot = isObjectTypeInternalSlot;
generated$4.isObjectTypeProperty = isObjectTypeProperty;
generated$4.isObjectTypeSpreadProperty = isObjectTypeSpreadProperty;
generated$4.isOpaqueType = isOpaqueType;
generated$4.isOptionalCallExpression = isOptionalCallExpression;
generated$4.isOptionalIndexedAccessType = isOptionalIndexedAccessType;
generated$4.isOptionalMemberExpression = isOptionalMemberExpression;
generated$4.isParenthesizedExpression = isParenthesizedExpression;
generated$4.isPattern = isPattern;
generated$4.isPatternLike = isPatternLike;
generated$4.isPipelineBareFunction = isPipelineBareFunction;
generated$4.isPipelinePrimaryTopicReference = isPipelinePrimaryTopicReference;
generated$4.isPipelineTopicExpression = isPipelineTopicExpression;
generated$4.isPlaceholder = isPlaceholder;
generated$4.isPrivate = isPrivate;
generated$4.isPrivateName = isPrivateName;
generated$4.isProgram = isProgram;
generated$4.isProperty = isProperty;
generated$4.isPureish = isPureish;
generated$4.isQualifiedTypeIdentifier = isQualifiedTypeIdentifier;
generated$4.isRecordExpression = isRecordExpression;
generated$4.isRegExpLiteral = isRegExpLiteral;
generated$4.isRegexLiteral = isRegexLiteral;
generated$4.isRestElement = isRestElement;
generated$4.isRestProperty = isRestProperty;
generated$4.isReturnStatement = isReturnStatement;
generated$4.isScopable = isScopable;
generated$4.isSequenceExpression = isSequenceExpression;
generated$4.isSpreadElement = isSpreadElement;
generated$4.isSpreadProperty = isSpreadProperty;
generated$4.isStandardized = isStandardized;
generated$4.isStatement = isStatement;
generated$4.isStaticBlock = isStaticBlock;
generated$4.isStringLiteral = isStringLiteral;
generated$4.isStringLiteralTypeAnnotation = isStringLiteralTypeAnnotation;
generated$4.isStringTypeAnnotation = isStringTypeAnnotation;
generated$4.isSuper = isSuper;
generated$4.isSwitchCase = isSwitchCase;
generated$4.isSwitchStatement = isSwitchStatement;
generated$4.isSymbolTypeAnnotation = isSymbolTypeAnnotation;
generated$4.isTSAnyKeyword = isTSAnyKeyword;
generated$4.isTSArrayType = isTSArrayType;
generated$4.isTSAsExpression = isTSAsExpression;
generated$4.isTSBaseType = isTSBaseType;
generated$4.isTSBigIntKeyword = isTSBigIntKeyword;
generated$4.isTSBooleanKeyword = isTSBooleanKeyword;
generated$4.isTSCallSignatureDeclaration = isTSCallSignatureDeclaration;
generated$4.isTSConditionalType = isTSConditionalType;
generated$4.isTSConstructSignatureDeclaration = isTSConstructSignatureDeclaration;
generated$4.isTSConstructorType = isTSConstructorType;
generated$4.isTSDeclareFunction = isTSDeclareFunction;
generated$4.isTSDeclareMethod = isTSDeclareMethod;
generated$4.isTSEntityName = isTSEntityName;
generated$4.isTSEnumDeclaration = isTSEnumDeclaration;
generated$4.isTSEnumMember = isTSEnumMember;
generated$4.isTSExportAssignment = isTSExportAssignment;
generated$4.isTSExpressionWithTypeArguments = isTSExpressionWithTypeArguments;
generated$4.isTSExternalModuleReference = isTSExternalModuleReference;
generated$4.isTSFunctionType = isTSFunctionType;
generated$4.isTSImportEqualsDeclaration = isTSImportEqualsDeclaration;
generated$4.isTSImportType = isTSImportType;
generated$4.isTSIndexSignature = isTSIndexSignature;
generated$4.isTSIndexedAccessType = isTSIndexedAccessType;
generated$4.isTSInferType = isTSInferType;
generated$4.isTSInterfaceBody = isTSInterfaceBody;
generated$4.isTSInterfaceDeclaration = isTSInterfaceDeclaration;
generated$4.isTSIntersectionType = isTSIntersectionType;
generated$4.isTSIntrinsicKeyword = isTSIntrinsicKeyword;
generated$4.isTSLiteralType = isTSLiteralType;
generated$4.isTSMappedType = isTSMappedType;
generated$4.isTSMethodSignature = isTSMethodSignature;
generated$4.isTSModuleBlock = isTSModuleBlock;
generated$4.isTSModuleDeclaration = isTSModuleDeclaration;
generated$4.isTSNamedTupleMember = isTSNamedTupleMember;
generated$4.isTSNamespaceExportDeclaration = isTSNamespaceExportDeclaration;
generated$4.isTSNeverKeyword = isTSNeverKeyword;
generated$4.isTSNonNullExpression = isTSNonNullExpression;
generated$4.isTSNullKeyword = isTSNullKeyword;
generated$4.isTSNumberKeyword = isTSNumberKeyword;
generated$4.isTSObjectKeyword = isTSObjectKeyword;
generated$4.isTSOptionalType = isTSOptionalType;
generated$4.isTSParameterProperty = isTSParameterProperty;
generated$4.isTSParenthesizedType = isTSParenthesizedType;
generated$4.isTSPropertySignature = isTSPropertySignature;
generated$4.isTSQualifiedName = isTSQualifiedName;
generated$4.isTSRestType = isTSRestType;
generated$4.isTSStringKeyword = isTSStringKeyword;
generated$4.isTSSymbolKeyword = isTSSymbolKeyword;
generated$4.isTSThisType = isTSThisType;
generated$4.isTSTupleType = isTSTupleType;
generated$4.isTSType = isTSType;
generated$4.isTSTypeAliasDeclaration = isTSTypeAliasDeclaration;
generated$4.isTSTypeAnnotation = isTSTypeAnnotation;
generated$4.isTSTypeAssertion = isTSTypeAssertion;
generated$4.isTSTypeElement = isTSTypeElement;
generated$4.isTSTypeLiteral = isTSTypeLiteral;
generated$4.isTSTypeOperator = isTSTypeOperator;
generated$4.isTSTypeParameter = isTSTypeParameter;
generated$4.isTSTypeParameterDeclaration = isTSTypeParameterDeclaration;
generated$4.isTSTypeParameterInstantiation = isTSTypeParameterInstantiation;
generated$4.isTSTypePredicate = isTSTypePredicate;
generated$4.isTSTypeQuery = isTSTypeQuery;
generated$4.isTSTypeReference = isTSTypeReference;
generated$4.isTSUndefinedKeyword = isTSUndefinedKeyword;
generated$4.isTSUnionType = isTSUnionType;
generated$4.isTSUnknownKeyword = isTSUnknownKeyword;
generated$4.isTSVoidKeyword = isTSVoidKeyword;
generated$4.isTaggedTemplateExpression = isTaggedTemplateExpression;
generated$4.isTemplateElement = isTemplateElement;
generated$4.isTemplateLiteral = isTemplateLiteral;
generated$4.isTerminatorless = isTerminatorless;
generated$4.isThisExpression = isThisExpression;
generated$4.isThisTypeAnnotation = isThisTypeAnnotation;
generated$4.isThrowStatement = isThrowStatement;
generated$4.isTopicReference = isTopicReference;
generated$4.isTryStatement = isTryStatement;
generated$4.isTupleExpression = isTupleExpression;
generated$4.isTupleTypeAnnotation = isTupleTypeAnnotation;
generated$4.isTypeAlias = isTypeAlias;
generated$4.isTypeAnnotation = isTypeAnnotation;
generated$4.isTypeCastExpression = isTypeCastExpression;
generated$4.isTypeParameter = isTypeParameter;
generated$4.isTypeParameterDeclaration = isTypeParameterDeclaration;
generated$4.isTypeParameterInstantiation = isTypeParameterInstantiation;
generated$4.isTypeScript = isTypeScript;
generated$4.isTypeofTypeAnnotation = isTypeofTypeAnnotation;
generated$4.isUnaryExpression = isUnaryExpression;
generated$4.isUnaryLike = isUnaryLike;
generated$4.isUnionTypeAnnotation = isUnionTypeAnnotation;
generated$4.isUpdateExpression = isUpdateExpression;
generated$4.isUserWhitespacable = isUserWhitespacable;
generated$4.isV8IntrinsicIdentifier = isV8IntrinsicIdentifier;
generated$4.isVariableDeclaration = isVariableDeclaration;
generated$4.isVariableDeclarator = isVariableDeclarator;
generated$4.isVariance = isVariance;
generated$4.isVoidTypeAnnotation = isVoidTypeAnnotation;
generated$4.isWhile = isWhile;
generated$4.isWhileStatement = isWhileStatement;
generated$4.isWithStatement = isWithStatement;
generated$4.isYieldExpression = isYieldExpression;
var _shallowEqual$1 = shallowEqual$1;
function isArrayExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ArrayExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isAssignmentExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "AssignmentExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBinaryExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BinaryExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isInterpreterDirective(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "InterpreterDirective") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDirective(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Directive") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDirectiveLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DirectiveLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBlockStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BlockStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBreakStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BreakStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isCallExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "CallExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isCatchClause(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "CatchClause") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isConditionalExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ConditionalExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isContinueStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ContinueStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDebuggerStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DebuggerStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDoWhileStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DoWhileStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEmptyStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EmptyStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExpressionStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExpressionStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFile(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "File") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isForInStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ForInStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isForStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ForStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFunctionDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFunctionExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isIdentifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Identifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isIfStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "IfStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isLabeledStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "LabeledStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isStringLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "StringLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isNumericLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "NumericLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isNullLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "NullLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBooleanLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BooleanLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isRegExpLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "RegExpLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isLogicalExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "LogicalExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isMemberExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "MemberExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isNewExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "NewExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isProgram(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Program") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectMethod(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectMethod") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isRestElement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "RestElement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isReturnStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ReturnStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isSequenceExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "SequenceExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isParenthesizedExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ParenthesizedExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isSwitchCase(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "SwitchCase") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isSwitchStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "SwitchStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isThisExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ThisExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isThrowStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ThrowStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTryStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TryStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isUnaryExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "UnaryExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isUpdateExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "UpdateExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isVariableDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "VariableDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isVariableDeclarator(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "VariableDeclarator") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isWhileStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "WhileStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isWithStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "WithStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isAssignmentPattern(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "AssignmentPattern") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isArrayPattern(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ArrayPattern") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isArrowFunctionExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ArrowFunctionExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClassBody(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassBody") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClassExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClassDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExportAllDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportAllDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExportDefaultDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportDefaultDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExportNamedDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportNamedDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExportSpecifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportSpecifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isForOfStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ForOfStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isImportDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ImportDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isImportDefaultSpecifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ImportDefaultSpecifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isImportNamespaceSpecifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ImportNamespaceSpecifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isImportSpecifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ImportSpecifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isMetaProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "MetaProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClassMethod(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassMethod") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectPattern(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectPattern") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isSpreadElement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "SpreadElement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isSuper(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Super") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTaggedTemplateExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TaggedTemplateExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTemplateElement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TemplateElement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTemplateLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TemplateLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isYieldExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "YieldExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isAwaitExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "AwaitExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isImport(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Import") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBigIntLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BigIntLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExportNamespaceSpecifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportNamespaceSpecifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isOptionalMemberExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "OptionalMemberExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isOptionalCallExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "OptionalCallExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClassProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClassAccessorProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassAccessorProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClassPrivateProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassPrivateProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClassPrivateMethod(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassPrivateMethod") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isPrivateName(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "PrivateName") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isStaticBlock(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "StaticBlock") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isAnyTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "AnyTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isArrayTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ArrayTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBooleanTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BooleanTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBooleanLiteralTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BooleanLiteralTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isNullLiteralTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "NullLiteralTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClassImplements(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassImplements") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareClass(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareClass") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareFunction(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareFunction") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareInterface(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareInterface") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareModule(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareModule") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareModuleExports(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareModuleExports") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareTypeAlias(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareTypeAlias") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareOpaqueType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareOpaqueType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareVariable(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareVariable") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareExportDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareExportDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclareExportAllDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareExportAllDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclaredPredicate(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclaredPredicate") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExistsTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExistsTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFunctionTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFunctionTypeParam(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionTypeParam") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isGenericTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "GenericTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isInferredPredicate(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "InferredPredicate") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isInterfaceExtends(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "InterfaceExtends") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isInterfaceDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "InterfaceDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isInterfaceTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "InterfaceTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isIntersectionTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "IntersectionTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isMixedTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "MixedTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEmptyTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EmptyTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isNullableTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "NullableTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isNumberLiteralTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "NumberLiteralTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isNumberTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "NumberTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectTypeInternalSlot(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectTypeInternalSlot") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectTypeCallProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectTypeCallProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectTypeIndexer(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectTypeIndexer") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectTypeProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectTypeProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectTypeSpreadProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectTypeSpreadProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isOpaqueType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "OpaqueType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isQualifiedTypeIdentifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "QualifiedTypeIdentifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isStringLiteralTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "StringLiteralTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isStringTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "StringTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isSymbolTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "SymbolTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isThisTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ThisTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTupleTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TupleTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTypeofTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TypeofTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTypeAlias(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TypeAlias") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTypeCastExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TypeCastExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTypeParameter(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TypeParameter") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTypeParameterDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TypeParameterDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTypeParameterInstantiation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TypeParameterInstantiation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isUnionTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "UnionTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isVariance(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Variance") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isVoidTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "VoidTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumBooleanBody(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumBooleanBody") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumNumberBody(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumNumberBody") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumStringBody(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumStringBody") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumSymbolBody(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumSymbolBody") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumBooleanMember(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumBooleanMember") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumNumberMember(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumNumberMember") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumStringMember(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumStringMember") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumDefaultedMember(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumDefaultedMember") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isIndexedAccessType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "IndexedAccessType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isOptionalIndexedAccessType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "OptionalIndexedAccessType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXAttribute(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXAttribute") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXClosingElement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXClosingElement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXElement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXElement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXEmptyExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXEmptyExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXExpressionContainer(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXExpressionContainer") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXSpreadChild(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXSpreadChild") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXIdentifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXIdentifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXMemberExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXMemberExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXNamespacedName(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXNamespacedName") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXOpeningElement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXOpeningElement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXSpreadAttribute(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXSpreadAttribute") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXText(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXText") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXFragment(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXFragment") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXOpeningFragment(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXOpeningFragment") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSXClosingFragment(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXClosingFragment") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isNoop(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Noop") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isPlaceholder(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Placeholder") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isV8IntrinsicIdentifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "V8IntrinsicIdentifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isArgumentPlaceholder(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ArgumentPlaceholder") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBindExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BindExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isImportAttribute(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ImportAttribute") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDecorator(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Decorator") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDoExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DoExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExportDefaultSpecifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportDefaultSpecifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isRecordExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "RecordExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTupleExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TupleExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDecimalLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DecimalLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isModuleExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ModuleExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTopicReference(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TopicReference") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isPipelineTopicExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "PipelineTopicExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isPipelineBareFunction(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "PipelineBareFunction") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isPipelinePrimaryTopicReference(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "PipelinePrimaryTopicReference") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSParameterProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSParameterProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSDeclareFunction(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSDeclareFunction") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSDeclareMethod(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSDeclareMethod") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSQualifiedName(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSQualifiedName") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSCallSignatureDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSCallSignatureDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSConstructSignatureDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSConstructSignatureDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSPropertySignature(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSPropertySignature") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSMethodSignature(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSMethodSignature") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSIndexSignature(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSIndexSignature") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSAnyKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSAnyKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSBooleanKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSBooleanKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSBigIntKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSBigIntKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSIntrinsicKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSIntrinsicKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSNeverKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSNeverKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSNullKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSNullKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSNumberKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSNumberKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSObjectKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSObjectKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSStringKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSStringKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSSymbolKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSSymbolKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSUndefinedKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSUndefinedKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSUnknownKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSUnknownKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSVoidKeyword(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSVoidKeyword") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSThisType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSThisType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSFunctionType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSFunctionType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSConstructorType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSConstructorType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeReference(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeReference") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypePredicate(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypePredicate") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeQuery(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeQuery") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSArrayType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSArrayType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTupleType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTupleType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSOptionalType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSOptionalType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSRestType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSRestType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSNamedTupleMember(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSNamedTupleMember") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSUnionType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSUnionType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSIntersectionType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSIntersectionType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSConditionalType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSConditionalType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSInferType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSInferType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSParenthesizedType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSParenthesizedType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeOperator(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeOperator") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSIndexedAccessType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSIndexedAccessType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSMappedType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSMappedType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSLiteralType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSLiteralType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSExpressionWithTypeArguments(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSExpressionWithTypeArguments") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSInterfaceDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSInterfaceDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSInterfaceBody(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSInterfaceBody") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeAliasDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeAliasDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSAsExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSAsExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeAssertion(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeAssertion") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSEnumDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSEnumDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSEnumMember(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSEnumMember") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSModuleDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSModuleDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSModuleBlock(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSModuleBlock") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSImportType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSImportType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSImportEqualsDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSImportEqualsDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSExternalModuleReference(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSExternalModuleReference") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSNonNullExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSNonNullExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSExportAssignment(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSExportAssignment") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSNamespaceExportDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSNamespaceExportDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeParameterInstantiation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeParameterInstantiation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeParameterDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeParameterDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeParameter(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSTypeParameter") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isStandardized(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ArrayExpression" || nodeType === "AssignmentExpression" || nodeType === "BinaryExpression" || nodeType === "InterpreterDirective" || nodeType === "Directive" || nodeType === "DirectiveLiteral" || nodeType === "BlockStatement" || nodeType === "BreakStatement" || nodeType === "CallExpression" || nodeType === "CatchClause" || nodeType === "ConditionalExpression" || nodeType === "ContinueStatement" || nodeType === "DebuggerStatement" || nodeType === "DoWhileStatement" || nodeType === "EmptyStatement" || nodeType === "ExpressionStatement" || nodeType === "File" || nodeType === "ForInStatement" || nodeType === "ForStatement" || nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "Identifier" || nodeType === "IfStatement" || nodeType === "LabeledStatement" || nodeType === "StringLiteral" || nodeType === "NumericLiteral" || nodeType === "NullLiteral" || nodeType === "BooleanLiteral" || nodeType === "RegExpLiteral" || nodeType === "LogicalExpression" || nodeType === "MemberExpression" || nodeType === "NewExpression" || nodeType === "Program" || nodeType === "ObjectExpression" || nodeType === "ObjectMethod" || nodeType === "ObjectProperty" || nodeType === "RestElement" || nodeType === "ReturnStatement" || nodeType === "SequenceExpression" || nodeType === "ParenthesizedExpression" || nodeType === "SwitchCase" || nodeType === "SwitchStatement" || nodeType === "ThisExpression" || nodeType === "ThrowStatement" || nodeType === "TryStatement" || nodeType === "UnaryExpression" || nodeType === "UpdateExpression" || nodeType === "VariableDeclaration" || nodeType === "VariableDeclarator" || nodeType === "WhileStatement" || nodeType === "WithStatement" || nodeType === "AssignmentPattern" || nodeType === "ArrayPattern" || nodeType === "ArrowFunctionExpression" || nodeType === "ClassBody" || nodeType === "ClassExpression" || nodeType === "ClassDeclaration" || nodeType === "ExportAllDeclaration" || nodeType === "ExportDefaultDeclaration" || nodeType === "ExportNamedDeclaration" || nodeType === "ExportSpecifier" || nodeType === "ForOfStatement" || nodeType === "ImportDeclaration" || nodeType === "ImportDefaultSpecifier" || nodeType === "ImportNamespaceSpecifier" || nodeType === "ImportSpecifier" || nodeType === "MetaProperty" || nodeType === "ClassMethod" || nodeType === "ObjectPattern" || nodeType === "SpreadElement" || nodeType === "Super" || nodeType === "TaggedTemplateExpression" || nodeType === "TemplateElement" || nodeType === "TemplateLiteral" || nodeType === "YieldExpression" || nodeType === "AwaitExpression" || nodeType === "Import" || nodeType === "BigIntLiteral" || nodeType === "ExportNamespaceSpecifier" || nodeType === "OptionalMemberExpression" || nodeType === "OptionalCallExpression" || nodeType === "ClassProperty" || nodeType === "ClassAccessorProperty" || nodeType === "ClassPrivateProperty" || nodeType === "ClassPrivateMethod" || nodeType === "PrivateName" || nodeType === "StaticBlock" || nodeType === "Placeholder" && (node.expectedNode === "Identifier" || node.expectedNode === "StringLiteral" || node.expectedNode === "BlockStatement" || node.expectedNode === "ClassBody")) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExpression(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ArrayExpression" || nodeType === "AssignmentExpression" || nodeType === "BinaryExpression" || nodeType === "CallExpression" || nodeType === "ConditionalExpression" || nodeType === "FunctionExpression" || nodeType === "Identifier" || nodeType === "StringLiteral" || nodeType === "NumericLiteral" || nodeType === "NullLiteral" || nodeType === "BooleanLiteral" || nodeType === "RegExpLiteral" || nodeType === "LogicalExpression" || nodeType === "MemberExpression" || nodeType === "NewExpression" || nodeType === "ObjectExpression" || nodeType === "SequenceExpression" || nodeType === "ParenthesizedExpression" || nodeType === "ThisExpression" || nodeType === "UnaryExpression" || nodeType === "UpdateExpression" || nodeType === "ArrowFunctionExpression" || nodeType === "ClassExpression" || nodeType === "MetaProperty" || nodeType === "Super" || nodeType === "TaggedTemplateExpression" || nodeType === "TemplateLiteral" || nodeType === "YieldExpression" || nodeType === "AwaitExpression" || nodeType === "Import" || nodeType === "BigIntLiteral" || nodeType === "OptionalMemberExpression" || nodeType === "OptionalCallExpression" || nodeType === "TypeCastExpression" || nodeType === "JSXElement" || nodeType === "JSXFragment" || nodeType === "BindExpression" || nodeType === "DoExpression" || nodeType === "RecordExpression" || nodeType === "TupleExpression" || nodeType === "DecimalLiteral" || nodeType === "ModuleExpression" || nodeType === "TopicReference" || nodeType === "PipelineTopicExpression" || nodeType === "PipelineBareFunction" || nodeType === "PipelinePrimaryTopicReference" || nodeType === "TSAsExpression" || nodeType === "TSTypeAssertion" || nodeType === "TSNonNullExpression" || nodeType === "Placeholder" && (node.expectedNode === "Expression" || node.expectedNode === "Identifier" || node.expectedNode === "StringLiteral")) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBinary(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BinaryExpression" || nodeType === "LogicalExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isScopable(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BlockStatement" || nodeType === "CatchClause" || nodeType === "DoWhileStatement" || nodeType === "ForInStatement" || nodeType === "ForStatement" || nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "Program" || nodeType === "ObjectMethod" || nodeType === "SwitchStatement" || nodeType === "WhileStatement" || nodeType === "ArrowFunctionExpression" || nodeType === "ClassExpression" || nodeType === "ClassDeclaration" || nodeType === "ForOfStatement" || nodeType === "ClassMethod" || nodeType === "ClassPrivateMethod" || nodeType === "StaticBlock" || nodeType === "TSModuleBlock" || nodeType === "Placeholder" && node.expectedNode === "BlockStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBlockParent(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BlockStatement" || nodeType === "CatchClause" || nodeType === "DoWhileStatement" || nodeType === "ForInStatement" || nodeType === "ForStatement" || nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "Program" || nodeType === "ObjectMethod" || nodeType === "SwitchStatement" || nodeType === "WhileStatement" || nodeType === "ArrowFunctionExpression" || nodeType === "ForOfStatement" || nodeType === "ClassMethod" || nodeType === "ClassPrivateMethod" || nodeType === "StaticBlock" || nodeType === "TSModuleBlock" || nodeType === "Placeholder" && node.expectedNode === "BlockStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isBlock(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BlockStatement" || nodeType === "Program" || nodeType === "TSModuleBlock" || nodeType === "Placeholder" && node.expectedNode === "BlockStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BlockStatement" || nodeType === "BreakStatement" || nodeType === "ContinueStatement" || nodeType === "DebuggerStatement" || nodeType === "DoWhileStatement" || nodeType === "EmptyStatement" || nodeType === "ExpressionStatement" || nodeType === "ForInStatement" || nodeType === "ForStatement" || nodeType === "FunctionDeclaration" || nodeType === "IfStatement" || nodeType === "LabeledStatement" || nodeType === "ReturnStatement" || nodeType === "SwitchStatement" || nodeType === "ThrowStatement" || nodeType === "TryStatement" || nodeType === "VariableDeclaration" || nodeType === "WhileStatement" || nodeType === "WithStatement" || nodeType === "ClassDeclaration" || nodeType === "ExportAllDeclaration" || nodeType === "ExportDefaultDeclaration" || nodeType === "ExportNamedDeclaration" || nodeType === "ForOfStatement" || nodeType === "ImportDeclaration" || nodeType === "DeclareClass" || nodeType === "DeclareFunction" || nodeType === "DeclareInterface" || nodeType === "DeclareModule" || nodeType === "DeclareModuleExports" || nodeType === "DeclareTypeAlias" || nodeType === "DeclareOpaqueType" || nodeType === "DeclareVariable" || nodeType === "DeclareExportDeclaration" || nodeType === "DeclareExportAllDeclaration" || nodeType === "InterfaceDeclaration" || nodeType === "OpaqueType" || nodeType === "TypeAlias" || nodeType === "EnumDeclaration" || nodeType === "TSDeclareFunction" || nodeType === "TSInterfaceDeclaration" || nodeType === "TSTypeAliasDeclaration" || nodeType === "TSEnumDeclaration" || nodeType === "TSModuleDeclaration" || nodeType === "TSImportEqualsDeclaration" || nodeType === "TSExportAssignment" || nodeType === "TSNamespaceExportDeclaration" || nodeType === "Placeholder" && (node.expectedNode === "Statement" || node.expectedNode === "Declaration" || node.expectedNode === "BlockStatement")) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTerminatorless(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BreakStatement" || nodeType === "ContinueStatement" || nodeType === "ReturnStatement" || nodeType === "ThrowStatement" || nodeType === "YieldExpression" || nodeType === "AwaitExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isCompletionStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "BreakStatement" || nodeType === "ContinueStatement" || nodeType === "ReturnStatement" || nodeType === "ThrowStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isConditional(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ConditionalExpression" || nodeType === "IfStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isLoop(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DoWhileStatement" || nodeType === "ForInStatement" || nodeType === "ForStatement" || nodeType === "WhileStatement" || nodeType === "ForOfStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isWhile(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DoWhileStatement" || nodeType === "WhileStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExpressionWrapper(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExpressionStatement" || nodeType === "ParenthesizedExpression" || nodeType === "TypeCastExpression") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFor(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ForInStatement" || nodeType === "ForStatement" || nodeType === "ForOfStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isForXStatement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ForInStatement" || nodeType === "ForOfStatement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFunction(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "ObjectMethod" || nodeType === "ArrowFunctionExpression" || nodeType === "ClassMethod" || nodeType === "ClassPrivateMethod") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFunctionParent(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "ObjectMethod" || nodeType === "ArrowFunctionExpression" || nodeType === "ClassMethod" || nodeType === "ClassPrivateMethod" || nodeType === "StaticBlock") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isPureish(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionDeclaration" || nodeType === "FunctionExpression" || nodeType === "StringLiteral" || nodeType === "NumericLiteral" || nodeType === "NullLiteral" || nodeType === "BooleanLiteral" || nodeType === "RegExpLiteral" || nodeType === "ArrowFunctionExpression" || nodeType === "BigIntLiteral" || nodeType === "DecimalLiteral" || nodeType === "Placeholder" && node.expectedNode === "StringLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "FunctionDeclaration" || nodeType === "VariableDeclaration" || nodeType === "ClassDeclaration" || nodeType === "ExportAllDeclaration" || nodeType === "ExportDefaultDeclaration" || nodeType === "ExportNamedDeclaration" || nodeType === "ImportDeclaration" || nodeType === "DeclareClass" || nodeType === "DeclareFunction" || nodeType === "DeclareInterface" || nodeType === "DeclareModule" || nodeType === "DeclareModuleExports" || nodeType === "DeclareTypeAlias" || nodeType === "DeclareOpaqueType" || nodeType === "DeclareVariable" || nodeType === "DeclareExportDeclaration" || nodeType === "DeclareExportAllDeclaration" || nodeType === "InterfaceDeclaration" || nodeType === "OpaqueType" || nodeType === "TypeAlias" || nodeType === "EnumDeclaration" || nodeType === "TSDeclareFunction" || nodeType === "TSInterfaceDeclaration" || nodeType === "TSTypeAliasDeclaration" || nodeType === "TSEnumDeclaration" || nodeType === "TSModuleDeclaration" || nodeType === "Placeholder" && node.expectedNode === "Declaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isPatternLike(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Identifier" || nodeType === "RestElement" || nodeType === "AssignmentPattern" || nodeType === "ArrayPattern" || nodeType === "ObjectPattern" || nodeType === "Placeholder" && (node.expectedNode === "Pattern" || node.expectedNode === "Identifier")) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isLVal(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Identifier" || nodeType === "MemberExpression" || nodeType === "RestElement" || nodeType === "AssignmentPattern" || nodeType === "ArrayPattern" || nodeType === "ObjectPattern" || nodeType === "TSParameterProperty" || nodeType === "Placeholder" && (node.expectedNode === "Pattern" || node.expectedNode === "Identifier")) {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSEntityName(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Identifier" || nodeType === "TSQualifiedName" || nodeType === "Placeholder" && node.expectedNode === "Identifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isLiteral(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "StringLiteral" || nodeType === "NumericLiteral" || nodeType === "NullLiteral" || nodeType === "BooleanLiteral" || nodeType === "RegExpLiteral" || nodeType === "TemplateLiteral" || nodeType === "BigIntLiteral" || nodeType === "DecimalLiteral" || nodeType === "Placeholder" && node.expectedNode === "StringLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isImmutable$2(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "StringLiteral" || nodeType === "NumericLiteral" || nodeType === "NullLiteral" || nodeType === "BooleanLiteral" || nodeType === "BigIntLiteral" || nodeType === "JSXAttribute" || nodeType === "JSXClosingElement" || nodeType === "JSXElement" || nodeType === "JSXExpressionContainer" || nodeType === "JSXSpreadChild" || nodeType === "JSXOpeningElement" || nodeType === "JSXText" || nodeType === "JSXFragment" || nodeType === "JSXOpeningFragment" || nodeType === "JSXClosingFragment" || nodeType === "DecimalLiteral" || nodeType === "Placeholder" && node.expectedNode === "StringLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isUserWhitespacable(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectMethod" || nodeType === "ObjectProperty" || nodeType === "ObjectTypeInternalSlot" || nodeType === "ObjectTypeCallProperty" || nodeType === "ObjectTypeIndexer" || nodeType === "ObjectTypeProperty" || nodeType === "ObjectTypeSpreadProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isMethod(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectMethod" || nodeType === "ClassMethod" || nodeType === "ClassPrivateMethod") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isObjectMember(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectMethod" || nodeType === "ObjectProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isProperty(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ObjectProperty" || nodeType === "ClassProperty" || nodeType === "ClassAccessorProperty" || nodeType === "ClassPrivateProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isUnaryLike(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "UnaryExpression" || nodeType === "SpreadElement") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isPattern(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "AssignmentPattern" || nodeType === "ArrayPattern" || nodeType === "ObjectPattern" || nodeType === "Placeholder" && node.expectedNode === "Pattern") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isClass(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassExpression" || nodeType === "ClassDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isModuleDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportAllDeclaration" || nodeType === "ExportDefaultDeclaration" || nodeType === "ExportNamedDeclaration" || nodeType === "ImportDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isExportDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportAllDeclaration" || nodeType === "ExportDefaultDeclaration" || nodeType === "ExportNamedDeclaration") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isModuleSpecifier(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ExportSpecifier" || nodeType === "ImportDefaultSpecifier" || nodeType === "ImportNamespaceSpecifier" || nodeType === "ImportSpecifier" || nodeType === "ExportNamespaceSpecifier" || nodeType === "ExportDefaultSpecifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isAccessor(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassAccessorProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isPrivate(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "ClassPrivateProperty" || nodeType === "ClassPrivateMethod" || nodeType === "PrivateName") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFlow(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "AnyTypeAnnotation" || nodeType === "ArrayTypeAnnotation" || nodeType === "BooleanTypeAnnotation" || nodeType === "BooleanLiteralTypeAnnotation" || nodeType === "NullLiteralTypeAnnotation" || nodeType === "ClassImplements" || nodeType === "DeclareClass" || nodeType === "DeclareFunction" || nodeType === "DeclareInterface" || nodeType === "DeclareModule" || nodeType === "DeclareModuleExports" || nodeType === "DeclareTypeAlias" || nodeType === "DeclareOpaqueType" || nodeType === "DeclareVariable" || nodeType === "DeclareExportDeclaration" || nodeType === "DeclareExportAllDeclaration" || nodeType === "DeclaredPredicate" || nodeType === "ExistsTypeAnnotation" || nodeType === "FunctionTypeAnnotation" || nodeType === "FunctionTypeParam" || nodeType === "GenericTypeAnnotation" || nodeType === "InferredPredicate" || nodeType === "InterfaceExtends" || nodeType === "InterfaceDeclaration" || nodeType === "InterfaceTypeAnnotation" || nodeType === "IntersectionTypeAnnotation" || nodeType === "MixedTypeAnnotation" || nodeType === "EmptyTypeAnnotation" || nodeType === "NullableTypeAnnotation" || nodeType === "NumberLiteralTypeAnnotation" || nodeType === "NumberTypeAnnotation" || nodeType === "ObjectTypeAnnotation" || nodeType === "ObjectTypeInternalSlot" || nodeType === "ObjectTypeCallProperty" || nodeType === "ObjectTypeIndexer" || nodeType === "ObjectTypeProperty" || nodeType === "ObjectTypeSpreadProperty" || nodeType === "OpaqueType" || nodeType === "QualifiedTypeIdentifier" || nodeType === "StringLiteralTypeAnnotation" || nodeType === "StringTypeAnnotation" || nodeType === "SymbolTypeAnnotation" || nodeType === "ThisTypeAnnotation" || nodeType === "TupleTypeAnnotation" || nodeType === "TypeofTypeAnnotation" || nodeType === "TypeAlias" || nodeType === "TypeAnnotation" || nodeType === "TypeCastExpression" || nodeType === "TypeParameter" || nodeType === "TypeParameterDeclaration" || nodeType === "TypeParameterInstantiation" || nodeType === "UnionTypeAnnotation" || nodeType === "Variance" || nodeType === "VoidTypeAnnotation" || nodeType === "EnumDeclaration" || nodeType === "EnumBooleanBody" || nodeType === "EnumNumberBody" || nodeType === "EnumStringBody" || nodeType === "EnumSymbolBody" || nodeType === "EnumBooleanMember" || nodeType === "EnumNumberMember" || nodeType === "EnumStringMember" || nodeType === "EnumDefaultedMember" || nodeType === "IndexedAccessType" || nodeType === "OptionalIndexedAccessType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFlowType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "AnyTypeAnnotation" || nodeType === "ArrayTypeAnnotation" || nodeType === "BooleanTypeAnnotation" || nodeType === "BooleanLiteralTypeAnnotation" || nodeType === "NullLiteralTypeAnnotation" || nodeType === "ExistsTypeAnnotation" || nodeType === "FunctionTypeAnnotation" || nodeType === "GenericTypeAnnotation" || nodeType === "InterfaceTypeAnnotation" || nodeType === "IntersectionTypeAnnotation" || nodeType === "MixedTypeAnnotation" || nodeType === "EmptyTypeAnnotation" || nodeType === "NullableTypeAnnotation" || nodeType === "NumberLiteralTypeAnnotation" || nodeType === "NumberTypeAnnotation" || nodeType === "ObjectTypeAnnotation" || nodeType === "StringLiteralTypeAnnotation" || nodeType === "StringTypeAnnotation" || nodeType === "SymbolTypeAnnotation" || nodeType === "ThisTypeAnnotation" || nodeType === "TupleTypeAnnotation" || nodeType === "TypeofTypeAnnotation" || nodeType === "UnionTypeAnnotation" || nodeType === "VoidTypeAnnotation" || nodeType === "IndexedAccessType" || nodeType === "OptionalIndexedAccessType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFlowBaseAnnotation(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "AnyTypeAnnotation" || nodeType === "BooleanTypeAnnotation" || nodeType === "NullLiteralTypeAnnotation" || nodeType === "MixedTypeAnnotation" || nodeType === "EmptyTypeAnnotation" || nodeType === "NumberTypeAnnotation" || nodeType === "StringTypeAnnotation" || nodeType === "SymbolTypeAnnotation" || nodeType === "ThisTypeAnnotation" || nodeType === "VoidTypeAnnotation") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFlowDeclaration(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclareClass" || nodeType === "DeclareFunction" || nodeType === "DeclareInterface" || nodeType === "DeclareModule" || nodeType === "DeclareModuleExports" || nodeType === "DeclareTypeAlias" || nodeType === "DeclareOpaqueType" || nodeType === "DeclareVariable" || nodeType === "DeclareExportDeclaration" || nodeType === "DeclareExportAllDeclaration" || nodeType === "InterfaceDeclaration" || nodeType === "OpaqueType" || nodeType === "TypeAlias") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isFlowPredicate(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "DeclaredPredicate" || nodeType === "InferredPredicate") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumBody(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumBooleanBody" || nodeType === "EnumNumberBody" || nodeType === "EnumStringBody" || nodeType === "EnumSymbolBody") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isEnumMember(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "EnumBooleanMember" || nodeType === "EnumNumberMember" || nodeType === "EnumStringMember" || nodeType === "EnumDefaultedMember") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isJSX(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "JSXAttribute" || nodeType === "JSXClosingElement" || nodeType === "JSXElement" || nodeType === "JSXEmptyExpression" || nodeType === "JSXExpressionContainer" || nodeType === "JSXSpreadChild" || nodeType === "JSXIdentifier" || nodeType === "JSXMemberExpression" || nodeType === "JSXNamespacedName" || nodeType === "JSXOpeningElement" || nodeType === "JSXSpreadAttribute" || nodeType === "JSXText" || nodeType === "JSXFragment" || nodeType === "JSXOpeningFragment" || nodeType === "JSXClosingFragment") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isMiscellaneous(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "Noop" || nodeType === "Placeholder" || nodeType === "V8IntrinsicIdentifier") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTypeScript(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSParameterProperty" || nodeType === "TSDeclareFunction" || nodeType === "TSDeclareMethod" || nodeType === "TSQualifiedName" || nodeType === "TSCallSignatureDeclaration" || nodeType === "TSConstructSignatureDeclaration" || nodeType === "TSPropertySignature" || nodeType === "TSMethodSignature" || nodeType === "TSIndexSignature" || nodeType === "TSAnyKeyword" || nodeType === "TSBooleanKeyword" || nodeType === "TSBigIntKeyword" || nodeType === "TSIntrinsicKeyword" || nodeType === "TSNeverKeyword" || nodeType === "TSNullKeyword" || nodeType === "TSNumberKeyword" || nodeType === "TSObjectKeyword" || nodeType === "TSStringKeyword" || nodeType === "TSSymbolKeyword" || nodeType === "TSUndefinedKeyword" || nodeType === "TSUnknownKeyword" || nodeType === "TSVoidKeyword" || nodeType === "TSThisType" || nodeType === "TSFunctionType" || nodeType === "TSConstructorType" || nodeType === "TSTypeReference" || nodeType === "TSTypePredicate" || nodeType === "TSTypeQuery" || nodeType === "TSTypeLiteral" || nodeType === "TSArrayType" || nodeType === "TSTupleType" || nodeType === "TSOptionalType" || nodeType === "TSRestType" || nodeType === "TSNamedTupleMember" || nodeType === "TSUnionType" || nodeType === "TSIntersectionType" || nodeType === "TSConditionalType" || nodeType === "TSInferType" || nodeType === "TSParenthesizedType" || nodeType === "TSTypeOperator" || nodeType === "TSIndexedAccessType" || nodeType === "TSMappedType" || nodeType === "TSLiteralType" || nodeType === "TSExpressionWithTypeArguments" || nodeType === "TSInterfaceDeclaration" || nodeType === "TSInterfaceBody" || nodeType === "TSTypeAliasDeclaration" || nodeType === "TSAsExpression" || nodeType === "TSTypeAssertion" || nodeType === "TSEnumDeclaration" || nodeType === "TSEnumMember" || nodeType === "TSModuleDeclaration" || nodeType === "TSModuleBlock" || nodeType === "TSImportType" || nodeType === "TSImportEqualsDeclaration" || nodeType === "TSExternalModuleReference" || nodeType === "TSNonNullExpression" || nodeType === "TSExportAssignment" || nodeType === "TSNamespaceExportDeclaration" || nodeType === "TSTypeAnnotation" || nodeType === "TSTypeParameterInstantiation" || nodeType === "TSTypeParameterDeclaration" || nodeType === "TSTypeParameter") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSTypeElement(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSCallSignatureDeclaration" || nodeType === "TSConstructSignatureDeclaration" || nodeType === "TSPropertySignature" || nodeType === "TSMethodSignature" || nodeType === "TSIndexSignature") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSAnyKeyword" || nodeType === "TSBooleanKeyword" || nodeType === "TSBigIntKeyword" || nodeType === "TSIntrinsicKeyword" || nodeType === "TSNeverKeyword" || nodeType === "TSNullKeyword" || nodeType === "TSNumberKeyword" || nodeType === "TSObjectKeyword" || nodeType === "TSStringKeyword" || nodeType === "TSSymbolKeyword" || nodeType === "TSUndefinedKeyword" || nodeType === "TSUnknownKeyword" || nodeType === "TSVoidKeyword" || nodeType === "TSThisType" || nodeType === "TSFunctionType" || nodeType === "TSConstructorType" || nodeType === "TSTypeReference" || nodeType === "TSTypePredicate" || nodeType === "TSTypeQuery" || nodeType === "TSTypeLiteral" || nodeType === "TSArrayType" || nodeType === "TSTupleType" || nodeType === "TSOptionalType" || nodeType === "TSRestType" || nodeType === "TSUnionType" || nodeType === "TSIntersectionType" || nodeType === "TSConditionalType" || nodeType === "TSInferType" || nodeType === "TSParenthesizedType" || nodeType === "TSTypeOperator" || nodeType === "TSIndexedAccessType" || nodeType === "TSMappedType" || nodeType === "TSLiteralType" || nodeType === "TSExpressionWithTypeArguments" || nodeType === "TSImportType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isTSBaseType(node, opts) {
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "TSAnyKeyword" || nodeType === "TSBooleanKeyword" || nodeType === "TSBigIntKeyword" || nodeType === "TSIntrinsicKeyword" || nodeType === "TSNeverKeyword" || nodeType === "TSNullKeyword" || nodeType === "TSNumberKeyword" || nodeType === "TSObjectKeyword" || nodeType === "TSStringKeyword" || nodeType === "TSSymbolKeyword" || nodeType === "TSUndefinedKeyword" || nodeType === "TSUnknownKeyword" || nodeType === "TSVoidKeyword" || nodeType === "TSThisType" || nodeType === "TSLiteralType") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isNumberLiteral(node, opts) {
  console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "NumberLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isRegexLiteral(node, opts) {
  console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "RegexLiteral") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isRestProperty(node, opts) {
  console.trace("The node type RestProperty has been renamed to RestElement");
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "RestProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
function isSpreadProperty(node, opts) {
  console.trace("The node type SpreadProperty has been renamed to SpreadElement");
  if (!node)
    return false;
  const nodeType = node.type;
  if (nodeType === "SpreadProperty") {
    if (typeof opts === "undefined") {
      return true;
    } else {
      return (0, _shallowEqual$1.default)(node, opts);
    }
  }
  return false;
}
Object.defineProperty(matchesPattern$1, "__esModule", {
  value: true
});
matchesPattern$1.default = matchesPattern;
var _generated$o = generated$4;
function matchesPattern(member, match, allowPartial) {
  if (!(0, _generated$o.isMemberExpression)(member))
    return false;
  const parts = Array.isArray(match) ? match : match.split(".");
  const nodes = [];
  let node;
  for (node = member; (0, _generated$o.isMemberExpression)(node); node = node.object) {
    nodes.push(node.property);
  }
  nodes.push(node);
  if (nodes.length < parts.length)
    return false;
  if (!allowPartial && nodes.length > parts.length)
    return false;
  for (let i2 = 0, j2 = nodes.length - 1; i2 < parts.length; i2++, j2--) {
    const node2 = nodes[j2];
    let value;
    if ((0, _generated$o.isIdentifier)(node2)) {
      value = node2.name;
    } else if ((0, _generated$o.isStringLiteral)(node2)) {
      value = node2.value;
    } else if ((0, _generated$o.isThisExpression)(node2)) {
      value = "this";
    } else {
      return false;
    }
    if (parts[i2] !== value)
      return false;
  }
  return true;
}
Object.defineProperty(buildMatchMemberExpression$1, "__esModule", {
  value: true
});
buildMatchMemberExpression$1.default = buildMatchMemberExpression;
var _matchesPattern = matchesPattern$1;
function buildMatchMemberExpression(match, allowPartial) {
  const parts = match.split(".");
  return (member) => (0, _matchesPattern.default)(member, parts, allowPartial);
}
Object.defineProperty(isReactComponent$1, "__esModule", {
  value: true
});
isReactComponent$1.default = void 0;
var _buildMatchMemberExpression = buildMatchMemberExpression$1;
const isReactComponent = (0, _buildMatchMemberExpression.default)("React.Component");
var _default$5 = isReactComponent;
isReactComponent$1.default = _default$5;
var isCompatTag$1 = {};
Object.defineProperty(isCompatTag$1, "__esModule", {
  value: true
});
isCompatTag$1.default = isCompatTag;
function isCompatTag(tagName) {
  return !!tagName && /^[a-z]/.test(tagName);
}
var buildChildren$1 = {};
var cleanJSXElementLiteralChild$1 = {};
var generated$3 = {};
var builder$1 = {};
var definitions = {};
let fastProto = null;
function FastObject(o2) {
  if (fastProto !== null && typeof fastProto.property) {
    const result = fastProto;
    fastProto = FastObject.prototype = null;
    return result;
  }
  fastProto = FastObject.prototype = o2 == null ? /* @__PURE__ */ Object.create(null) : o2;
  return new FastObject();
}
FastObject();
var toFastProperties = function toFastproperties(o2) {
  return FastObject(o2);
};
var core = {};
var is$1 = {};
var isType$1 = {};
Object.defineProperty(isType$1, "__esModule", {
  value: true
});
isType$1.default = isType;
var _definitions$a = definitions;
function isType(nodeType, targetType) {
  if (nodeType === targetType)
    return true;
  if (_definitions$a.ALIAS_KEYS[targetType])
    return false;
  const aliases = _definitions$a.FLIPPED_ALIAS_KEYS[targetType];
  if (aliases) {
    if (aliases[0] === nodeType)
      return true;
    for (const alias of aliases) {
      if (nodeType === alias)
        return true;
    }
  }
  return false;
}
var isPlaceholderType$1 = {};
Object.defineProperty(isPlaceholderType$1, "__esModule", {
  value: true
});
isPlaceholderType$1.default = isPlaceholderType;
var _definitions$9 = definitions;
function isPlaceholderType(placeholderType, targetType) {
  if (placeholderType === targetType)
    return true;
  const aliases = _definitions$9.PLACEHOLDERS_ALIAS[placeholderType];
  if (aliases) {
    for (const alias of aliases) {
      if (targetType === alias)
        return true;
    }
  }
  return false;
}
Object.defineProperty(is$1, "__esModule", {
  value: true
});
is$1.default = is;
var _shallowEqual = shallowEqual$1;
var _isType$1 = isType$1;
var _isPlaceholderType = isPlaceholderType$1;
var _definitions$8 = definitions;
function is(type, node, opts) {
  if (!node)
    return false;
  const matches = (0, _isType$1.default)(node.type, type);
  if (!matches) {
    if (!opts && node.type === "Placeholder" && type in _definitions$8.FLIPPED_ALIAS_KEYS) {
      return (0, _isPlaceholderType.default)(node.expectedNode, type);
    }
    return false;
  }
  if (typeof opts === "undefined") {
    return true;
  } else {
    return (0, _shallowEqual.default)(node, opts);
  }
}
var isValidIdentifier$1 = {};
var lib = {};
var identifier$1 = {};
Object.defineProperty(identifier$1, "__esModule", {
  value: true
});
identifier$1.isIdentifierChar = isIdentifierChar;
identifier$1.isIdentifierName = isIdentifierName;
identifier$1.isIdentifierStart = isIdentifierStart;
let nonASCIIidentifierStartChars = "\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC";
let nonASCIIidentifierChars = "\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECD\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F";
const nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
const nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
nonASCIIidentifierStartChars = nonASCIIidentifierChars = null;
const astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938];
const astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
function isInAstralSet(code, set2) {
  let pos = 65536;
  for (let i2 = 0, length = set2.length; i2 < length; i2 += 2) {
    pos += set2[i2];
    if (pos > code)
      return false;
    pos += set2[i2 + 1];
    if (pos >= code)
      return true;
  }
  return false;
}
function isIdentifierStart(code) {
  if (code < 65)
    return code === 36;
  if (code <= 90)
    return true;
  if (code < 97)
    return code === 95;
  if (code <= 122)
    return true;
  if (code <= 65535) {
    return code >= 170 && nonASCIIidentifierStart.test(String.fromCharCode(code));
  }
  return isInAstralSet(code, astralIdentifierStartCodes);
}
function isIdentifierChar(code) {
  if (code < 48)
    return code === 36;
  if (code < 58)
    return true;
  if (code < 65)
    return false;
  if (code <= 90)
    return true;
  if (code < 97)
    return code === 95;
  if (code <= 122)
    return true;
  if (code <= 65535) {
    return code >= 170 && nonASCIIidentifier.test(String.fromCharCode(code));
  }
  return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
}
function isIdentifierName(name) {
  let isFirst = true;
  for (let i2 = 0; i2 < name.length; i2++) {
    let cp = name.charCodeAt(i2);
    if ((cp & 64512) === 55296 && i2 + 1 < name.length) {
      const trail = name.charCodeAt(++i2);
      if ((trail & 64512) === 56320) {
        cp = 65536 + ((cp & 1023) << 10) + (trail & 1023);
      }
    }
    if (isFirst) {
      isFirst = false;
      if (!isIdentifierStart(cp)) {
        return false;
      }
    } else if (!isIdentifierChar(cp)) {
      return false;
    }
  }
  return !isFirst;
}
var keyword = {};
Object.defineProperty(keyword, "__esModule", {
  value: true
});
keyword.isKeyword = isKeyword;
keyword.isReservedWord = isReservedWord;
keyword.isStrictBindOnlyReservedWord = isStrictBindOnlyReservedWord;
keyword.isStrictBindReservedWord = isStrictBindReservedWord;
keyword.isStrictReservedWord = isStrictReservedWord;
const reservedWords = {
  keyword: ["break", "case", "catch", "continue", "debugger", "default", "do", "else", "finally", "for", "function", "if", "return", "switch", "throw", "try", "var", "const", "while", "with", "new", "this", "super", "class", "extends", "export", "import", "null", "true", "false", "in", "instanceof", "typeof", "void", "delete"],
  strict: ["implements", "interface", "let", "package", "private", "protected", "public", "static", "yield"],
  strictBind: ["eval", "arguments"]
};
const keywords = new Set(reservedWords.keyword);
const reservedWordsStrictSet = new Set(reservedWords.strict);
const reservedWordsStrictBindSet = new Set(reservedWords.strictBind);
function isReservedWord(word, inModule) {
  return inModule && word === "await" || word === "enum";
}
function isStrictReservedWord(word, inModule) {
  return isReservedWord(word, inModule) || reservedWordsStrictSet.has(word);
}
function isStrictBindOnlyReservedWord(word) {
  return reservedWordsStrictBindSet.has(word);
}
function isStrictBindReservedWord(word, inModule) {
  return isStrictReservedWord(word, inModule) || isStrictBindOnlyReservedWord(word);
}
function isKeyword(word) {
  return keywords.has(word);
}
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  Object.defineProperty(exports2, "isIdentifierChar", {
    enumerable: true,
    get: function() {
      return _identifier.isIdentifierChar;
    }
  });
  Object.defineProperty(exports2, "isIdentifierName", {
    enumerable: true,
    get: function() {
      return _identifier.isIdentifierName;
    }
  });
  Object.defineProperty(exports2, "isIdentifierStart", {
    enumerable: true,
    get: function() {
      return _identifier.isIdentifierStart;
    }
  });
  Object.defineProperty(exports2, "isKeyword", {
    enumerable: true,
    get: function() {
      return _keyword.isKeyword;
    }
  });
  Object.defineProperty(exports2, "isReservedWord", {
    enumerable: true,
    get: function() {
      return _keyword.isReservedWord;
    }
  });
  Object.defineProperty(exports2, "isStrictBindOnlyReservedWord", {
    enumerable: true,
    get: function() {
      return _keyword.isStrictBindOnlyReservedWord;
    }
  });
  Object.defineProperty(exports2, "isStrictBindReservedWord", {
    enumerable: true,
    get: function() {
      return _keyword.isStrictBindReservedWord;
    }
  });
  Object.defineProperty(exports2, "isStrictReservedWord", {
    enumerable: true,
    get: function() {
      return _keyword.isStrictReservedWord;
    }
  });
  var _identifier = identifier$1;
  var _keyword = keyword;
})(lib);
Object.defineProperty(isValidIdentifier$1, "__esModule", {
  value: true
});
isValidIdentifier$1.default = isValidIdentifier;
var _helperValidatorIdentifier$2 = lib;
function isValidIdentifier(name, reserved = true) {
  if (typeof name !== "string")
    return false;
  if (reserved) {
    if ((0, _helperValidatorIdentifier$2.isKeyword)(name) || (0, _helperValidatorIdentifier$2.isStrictReservedWord)(name, true)) {
      return false;
    }
  }
  return (0, _helperValidatorIdentifier$2.isIdentifierName)(name);
}
var constants = {};
Object.defineProperty(constants, "__esModule", {
  value: true
});
constants.UPDATE_OPERATORS = constants.UNARY_OPERATORS = constants.STRING_UNARY_OPERATORS = constants.STATEMENT_OR_BLOCK_KEYS = constants.NUMBER_UNARY_OPERATORS = constants.NUMBER_BINARY_OPERATORS = constants.NOT_LOCAL_BINDING = constants.LOGICAL_OPERATORS = constants.INHERIT_KEYS = constants.FOR_INIT_KEYS = constants.FLATTENABLE_KEYS = constants.EQUALITY_BINARY_OPERATORS = constants.COMPARISON_BINARY_OPERATORS = constants.COMMENT_KEYS = constants.BOOLEAN_UNARY_OPERATORS = constants.BOOLEAN_NUMBER_BINARY_OPERATORS = constants.BOOLEAN_BINARY_OPERATORS = constants.BLOCK_SCOPED_SYMBOL = constants.BINARY_OPERATORS = constants.ASSIGNMENT_OPERATORS = void 0;
const STATEMENT_OR_BLOCK_KEYS = ["consequent", "body", "alternate"];
constants.STATEMENT_OR_BLOCK_KEYS = STATEMENT_OR_BLOCK_KEYS;
const FLATTENABLE_KEYS = ["body", "expressions"];
constants.FLATTENABLE_KEYS = FLATTENABLE_KEYS;
const FOR_INIT_KEYS = ["left", "init"];
constants.FOR_INIT_KEYS = FOR_INIT_KEYS;
const COMMENT_KEYS = ["leadingComments", "trailingComments", "innerComments"];
constants.COMMENT_KEYS = COMMENT_KEYS;
const LOGICAL_OPERATORS = ["||", "&&", "??"];
constants.LOGICAL_OPERATORS = LOGICAL_OPERATORS;
const UPDATE_OPERATORS = ["++", "--"];
constants.UPDATE_OPERATORS = UPDATE_OPERATORS;
const BOOLEAN_NUMBER_BINARY_OPERATORS = [">", "<", ">=", "<="];
constants.BOOLEAN_NUMBER_BINARY_OPERATORS = BOOLEAN_NUMBER_BINARY_OPERATORS;
const EQUALITY_BINARY_OPERATORS = ["==", "===", "!=", "!=="];
constants.EQUALITY_BINARY_OPERATORS = EQUALITY_BINARY_OPERATORS;
const COMPARISON_BINARY_OPERATORS = [...EQUALITY_BINARY_OPERATORS, "in", "instanceof"];
constants.COMPARISON_BINARY_OPERATORS = COMPARISON_BINARY_OPERATORS;
const BOOLEAN_BINARY_OPERATORS = [...COMPARISON_BINARY_OPERATORS, ...BOOLEAN_NUMBER_BINARY_OPERATORS];
constants.BOOLEAN_BINARY_OPERATORS = BOOLEAN_BINARY_OPERATORS;
const NUMBER_BINARY_OPERATORS = ["-", "/", "%", "*", "**", "&", "|", ">>", ">>>", "<<", "^"];
constants.NUMBER_BINARY_OPERATORS = NUMBER_BINARY_OPERATORS;
const BINARY_OPERATORS = ["+", ...NUMBER_BINARY_OPERATORS, ...BOOLEAN_BINARY_OPERATORS];
constants.BINARY_OPERATORS = BINARY_OPERATORS;
const ASSIGNMENT_OPERATORS = ["=", "+=", ...NUMBER_BINARY_OPERATORS.map((op) => op + "="), ...LOGICAL_OPERATORS.map((op) => op + "=")];
constants.ASSIGNMENT_OPERATORS = ASSIGNMENT_OPERATORS;
const BOOLEAN_UNARY_OPERATORS = ["delete", "!"];
constants.BOOLEAN_UNARY_OPERATORS = BOOLEAN_UNARY_OPERATORS;
const NUMBER_UNARY_OPERATORS = ["+", "-", "~"];
constants.NUMBER_UNARY_OPERATORS = NUMBER_UNARY_OPERATORS;
const STRING_UNARY_OPERATORS = ["typeof"];
constants.STRING_UNARY_OPERATORS = STRING_UNARY_OPERATORS;
const UNARY_OPERATORS = ["void", "throw", ...BOOLEAN_UNARY_OPERATORS, ...NUMBER_UNARY_OPERATORS, ...STRING_UNARY_OPERATORS];
constants.UNARY_OPERATORS = UNARY_OPERATORS;
const INHERIT_KEYS = {
  optional: ["typeAnnotation", "typeParameters", "returnType"],
  force: ["start", "loc", "end"]
};
constants.INHERIT_KEYS = INHERIT_KEYS;
const BLOCK_SCOPED_SYMBOL = Symbol.for("var used to be block scoped");
constants.BLOCK_SCOPED_SYMBOL = BLOCK_SCOPED_SYMBOL;
const NOT_LOCAL_BINDING = Symbol.for("should not be considered a local binding");
constants.NOT_LOCAL_BINDING = NOT_LOCAL_BINDING;
var utils = {};
var validate$2 = {};
Object.defineProperty(validate$2, "__esModule", {
  value: true
});
validate$2.default = validate$1;
validate$2.validateChild = validateChild;
validate$2.validateField = validateField;
var _definitions$7 = definitions;
function validate$1(node, key, val) {
  if (!node)
    return;
  const fields = _definitions$7.NODE_FIELDS[node.type];
  if (!fields)
    return;
  const field = fields[key];
  validateField(node, key, val, field);
  validateChild(node, key, val);
}
function validateField(node, key, val, field) {
  if (!(field != null && field.validate))
    return;
  if (field.optional && val == null)
    return;
  field.validate(node, key, val);
}
function validateChild(node, key, val) {
  if (val == null)
    return;
  const validate2 = _definitions$7.NODE_PARENT_VALIDATIONS[val.type];
  if (!validate2)
    return;
  validate2(node, key, val);
}
Object.defineProperty(utils, "__esModule", {
  value: true
});
utils.VISITOR_KEYS = utils.NODE_PARENT_VALIDATIONS = utils.NODE_FIELDS = utils.FLIPPED_ALIAS_KEYS = utils.DEPRECATED_KEYS = utils.BUILDER_KEYS = utils.ALIAS_KEYS = void 0;
utils.arrayOf = arrayOf;
utils.arrayOfType = arrayOfType;
utils.assertEach = assertEach;
utils.assertNodeOrValueType = assertNodeOrValueType;
utils.assertNodeType = assertNodeType;
utils.assertOneOf = assertOneOf;
utils.assertOptionalChainStart = assertOptionalChainStart;
utils.assertShape = assertShape;
utils.assertValueType = assertValueType;
utils.chain = chain;
utils.default = defineType$5;
utils.defineAliasedType = defineAliasedType;
utils.typeIs = typeIs;
utils.validate = validate;
utils.validateArrayOfType = validateArrayOfType;
utils.validateOptional = validateOptional;
utils.validateOptionalType = validateOptionalType;
utils.validateType = validateType;
var _is$3 = is$1;
var _validate$1 = validate$2;
const VISITOR_KEYS = {};
utils.VISITOR_KEYS = VISITOR_KEYS;
const ALIAS_KEYS = {};
utils.ALIAS_KEYS = ALIAS_KEYS;
const FLIPPED_ALIAS_KEYS = {};
utils.FLIPPED_ALIAS_KEYS = FLIPPED_ALIAS_KEYS;
const NODE_FIELDS = {};
utils.NODE_FIELDS = NODE_FIELDS;
const BUILDER_KEYS = {};
utils.BUILDER_KEYS = BUILDER_KEYS;
const DEPRECATED_KEYS = {};
utils.DEPRECATED_KEYS = DEPRECATED_KEYS;
const NODE_PARENT_VALIDATIONS = {};
utils.NODE_PARENT_VALIDATIONS = NODE_PARENT_VALIDATIONS;
function getType(val) {
  if (Array.isArray(val)) {
    return "array";
  } else if (val === null) {
    return "null";
  } else {
    return typeof val;
  }
}
function validate(validate2) {
  return {
    validate: validate2
  };
}
function typeIs(typeName) {
  return typeof typeName === "string" ? assertNodeType(typeName) : assertNodeType(...typeName);
}
function validateType(typeName) {
  return validate(typeIs(typeName));
}
function validateOptional(validate2) {
  return {
    validate: validate2,
    optional: true
  };
}
function validateOptionalType(typeName) {
  return {
    validate: typeIs(typeName),
    optional: true
  };
}
function arrayOf(elementType) {
  return chain(assertValueType("array"), assertEach(elementType));
}
function arrayOfType(typeName) {
  return arrayOf(typeIs(typeName));
}
function validateArrayOfType(typeName) {
  return validate(arrayOfType(typeName));
}
function assertEach(callback) {
  function validator(node, key, val) {
    if (!Array.isArray(val))
      return;
    for (let i2 = 0; i2 < val.length; i2++) {
      const subkey = `${key}[${i2}]`;
      const v2 = val[i2];
      callback(node, subkey, v2);
      if ({}.BABEL_TYPES_8_BREAKING)
        (0, _validate$1.validateChild)(node, subkey, v2);
    }
  }
  validator.each = callback;
  return validator;
}
function assertOneOf(...values) {
  function validate2(node, key, val) {
    if (values.indexOf(val) < 0) {
      throw new TypeError(`Property ${key} expected value to be one of ${JSON.stringify(values)} but got ${JSON.stringify(val)}`);
    }
  }
  validate2.oneOf = values;
  return validate2;
}
function assertNodeType(...types) {
  function validate2(node, key, val) {
    for (const type of types) {
      if ((0, _is$3.default)(type, val)) {
        (0, _validate$1.validateChild)(node, key, val);
        return;
      }
    }
    throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
  }
  validate2.oneOfNodeTypes = types;
  return validate2;
}
function assertNodeOrValueType(...types) {
  function validate2(node, key, val) {
    for (const type of types) {
      if (getType(val) === type || (0, _is$3.default)(type, val)) {
        (0, _validate$1.validateChild)(node, key, val);
        return;
      }
    }
    throw new TypeError(`Property ${key} of ${node.type} expected node to be of a type ${JSON.stringify(types)} but instead got ${JSON.stringify(val == null ? void 0 : val.type)}`);
  }
  validate2.oneOfNodeOrValueTypes = types;
  return validate2;
}
function assertValueType(type) {
  function validate2(node, key, val) {
    const valid = getType(val) === type;
    if (!valid) {
      throw new TypeError(`Property ${key} expected type of ${type} but got ${getType(val)}`);
    }
  }
  validate2.type = type;
  return validate2;
}
function assertShape(shape) {
  function validate2(node, key, val) {
    const errors = [];
    for (const property of Object.keys(shape)) {
      try {
        (0, _validate$1.validateField)(node, property, val[property], shape[property]);
      } catch (error) {
        if (error instanceof TypeError) {
          errors.push(error.message);
          continue;
        }
        throw error;
      }
    }
    if (errors.length) {
      throw new TypeError(`Property ${key} of ${node.type} expected to have the following:
${errors.join("\n")}`);
    }
  }
  validate2.shapeOf = shape;
  return validate2;
}
function assertOptionalChainStart() {
  function validate2(node) {
    var _current;
    let current = node;
    while (node) {
      const {
        type
      } = current;
      if (type === "OptionalCallExpression") {
        if (current.optional)
          return;
        current = current.callee;
        continue;
      }
      if (type === "OptionalMemberExpression") {
        if (current.optional)
          return;
        current = current.object;
        continue;
      }
      break;
    }
    throw new TypeError(`Non-optional ${node.type} must chain from an optional OptionalMemberExpression or OptionalCallExpression. Found chain from ${(_current = current) == null ? void 0 : _current.type}`);
  }
  return validate2;
}
function chain(...fns) {
  function validate2(...args) {
    for (const fn of fns) {
      fn(...args);
    }
  }
  validate2.chainOf = fns;
  if (fns.length >= 2 && "type" in fns[0] && fns[0].type === "array" && !("each" in fns[1])) {
    throw new Error(`An assertValueType("array") validator can only be followed by an assertEach(...) validator.`);
  }
  return validate2;
}
const validTypeOpts = ["aliases", "builder", "deprecatedAlias", "fields", "inherits", "visitor", "validate"];
const validFieldKeys = ["default", "optional", "validate"];
function defineAliasedType(...aliases) {
  return (type, opts = {}) => {
    let defined = opts.aliases;
    if (!defined) {
      var _store$opts$inherits$, _defined;
      if (opts.inherits)
        defined = (_store$opts$inherits$ = store[opts.inherits].aliases) == null ? void 0 : _store$opts$inherits$.slice();
      (_defined = defined) != null ? _defined : defined = [];
      opts.aliases = defined;
    }
    const additional = aliases.filter((a2) => !defined.includes(a2));
    defined.unshift(...additional);
    return defineType$5(type, opts);
  };
}
function defineType$5(type, opts = {}) {
  const inherits2 = opts.inherits && store[opts.inherits] || {};
  let fields = opts.fields;
  if (!fields) {
    fields = {};
    if (inherits2.fields) {
      const keys = Object.getOwnPropertyNames(inherits2.fields);
      for (const key of keys) {
        const field = inherits2.fields[key];
        const def2 = field.default;
        if (Array.isArray(def2) ? def2.length > 0 : def2 && typeof def2 === "object") {
          throw new Error("field defaults can only be primitives or empty arrays currently");
        }
        fields[key] = {
          default: Array.isArray(def2) ? [] : def2,
          optional: field.optional,
          validate: field.validate
        };
      }
    }
  }
  const visitor = opts.visitor || inherits2.visitor || [];
  const aliases = opts.aliases || inherits2.aliases || [];
  const builder2 = opts.builder || inherits2.builder || opts.visitor || [];
  for (const k2 of Object.keys(opts)) {
    if (validTypeOpts.indexOf(k2) === -1) {
      throw new Error(`Unknown type option "${k2}" on ${type}`);
    }
  }
  if (opts.deprecatedAlias) {
    DEPRECATED_KEYS[opts.deprecatedAlias] = type;
  }
  for (const key of visitor.concat(builder2)) {
    fields[key] = fields[key] || {};
  }
  for (const key of Object.keys(fields)) {
    const field = fields[key];
    if (field.default !== void 0 && builder2.indexOf(key) === -1) {
      field.optional = true;
    }
    if (field.default === void 0) {
      field.default = null;
    } else if (!field.validate && field.default != null) {
      field.validate = assertValueType(getType(field.default));
    }
    for (const k2 of Object.keys(field)) {
      if (validFieldKeys.indexOf(k2) === -1) {
        throw new Error(`Unknown field key "${k2}" on ${type}.${key}`);
      }
    }
  }
  VISITOR_KEYS[type] = opts.visitor = visitor;
  BUILDER_KEYS[type] = opts.builder = builder2;
  NODE_FIELDS[type] = opts.fields = fields;
  ALIAS_KEYS[type] = opts.aliases = aliases;
  aliases.forEach((alias) => {
    FLIPPED_ALIAS_KEYS[alias] = FLIPPED_ALIAS_KEYS[alias] || [];
    FLIPPED_ALIAS_KEYS[alias].push(type);
  });
  if (opts.validate) {
    NODE_PARENT_VALIDATIONS[type] = opts.validate;
  }
  store[type] = opts;
}
const store = {};
Object.defineProperty(core, "__esModule", {
  value: true
});
core.patternLikeCommon = core.functionTypeAnnotationCommon = core.functionDeclarationCommon = core.functionCommon = core.classMethodOrPropertyCommon = core.classMethodOrDeclareMethodCommon = void 0;
var _is$2 = is$1;
var _isValidIdentifier$3 = isValidIdentifier$1;
var _helperValidatorIdentifier$1 = lib;
var _constants$5 = constants;
var _utils$6 = utils;
const defineType$4 = (0, _utils$6.defineAliasedType)("Standardized");
defineType$4("ArrayExpression", {
  fields: {
    elements: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeOrValueType)("null", "Expression", "SpreadElement"))),
      default: !{}.BABEL_TYPES_8_BREAKING ? [] : void 0
    }
  },
  visitor: ["elements"],
  aliases: ["Expression"]
});
defineType$4("AssignmentExpression", {
  fields: {
    operator: {
      validate: function() {
        if (!{}.BABEL_TYPES_8_BREAKING) {
          return (0, _utils$6.assertValueType)("string");
        }
        const identifier2 = (0, _utils$6.assertOneOf)(..._constants$5.ASSIGNMENT_OPERATORS);
        const pattern = (0, _utils$6.assertOneOf)("=");
        return function(node, key, val) {
          const validator = (0, _is$2.default)("Pattern", node.left) ? pattern : identifier2;
          validator(node, key, val);
        };
      }()
    },
    left: {
      validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertNodeType)("LVal") : (0, _utils$6.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern")
    },
    right: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  },
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Expression"]
});
defineType$4("BinaryExpression", {
  builder: ["operator", "left", "right"],
  fields: {
    operator: {
      validate: (0, _utils$6.assertOneOf)(..._constants$5.BINARY_OPERATORS)
    },
    left: {
      validate: function() {
        const expression = (0, _utils$6.assertNodeType)("Expression");
        const inOp = (0, _utils$6.assertNodeType)("Expression", "PrivateName");
        const validator = function(node, key, val) {
          const validator2 = node.operator === "in" ? inOp : expression;
          validator2(node, key, val);
        };
        validator.oneOfNodeTypes = ["Expression", "PrivateName"];
        return validator;
      }()
    },
    right: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  },
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"]
});
defineType$4("InterpreterDirective", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils$6.assertValueType)("string")
    }
  }
});
defineType$4("Directive", {
  visitor: ["value"],
  fields: {
    value: {
      validate: (0, _utils$6.assertNodeType)("DirectiveLiteral")
    }
  }
});
defineType$4("DirectiveLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils$6.assertValueType)("string")
    }
  }
});
defineType$4("BlockStatement", {
  builder: ["body", "directives"],
  visitor: ["directives", "body"],
  fields: {
    directives: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Directive"))),
      default: []
    },
    body: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block", "Statement"]
});
defineType$4("BreakStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: (0, _utils$6.assertNodeType)("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});
defineType$4("CallExpression", {
  visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
  builder: ["callee", "arguments"],
  aliases: ["Expression"],
  fields: Object.assign({
    callee: {
      validate: (0, _utils$6.assertNodeType)("Expression", "V8IntrinsicIdentifier")
    },
    arguments: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName", "ArgumentPlaceholder")))
    }
  }, !{}.BABEL_TYPES_8_BREAKING ? {
    optional: {
      validate: (0, _utils$6.assertOneOf)(true, false),
      optional: true
    }
  } : {}, {
    typeArguments: {
      validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation"),
      optional: true
    },
    typeParameters: {
      validate: (0, _utils$6.assertNodeType)("TSTypeParameterInstantiation"),
      optional: true
    }
  })
});
defineType$4("CatchClause", {
  visitor: ["param", "body"],
  fields: {
    param: {
      validate: (0, _utils$6.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern"),
      optional: true
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("BlockStatement")
    }
  },
  aliases: ["Scopable", "BlockParent"]
});
defineType$4("ConditionalExpression", {
  visitor: ["test", "consequent", "alternate"],
  fields: {
    test: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    consequent: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    alternate: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  },
  aliases: ["Expression", "Conditional"]
});
defineType$4("ContinueStatement", {
  visitor: ["label"],
  fields: {
    label: {
      validate: (0, _utils$6.assertNodeType)("Identifier"),
      optional: true
    }
  },
  aliases: ["Statement", "Terminatorless", "CompletionStatement"]
});
defineType$4("DebuggerStatement", {
  aliases: ["Statement"]
});
defineType$4("DoWhileStatement", {
  visitor: ["test", "body"],
  fields: {
    test: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("Statement")
    }
  },
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"]
});
defineType$4("EmptyStatement", {
  aliases: ["Statement"]
});
defineType$4("ExpressionStatement", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  },
  aliases: ["Statement", "ExpressionWrapper"]
});
defineType$4("File", {
  builder: ["program", "comments", "tokens"],
  visitor: ["program"],
  fields: {
    program: {
      validate: (0, _utils$6.assertNodeType)("Program")
    },
    comments: {
      validate: !{}.BABEL_TYPES_8_BREAKING ? Object.assign(() => {
      }, {
        each: {
          oneOfNodeTypes: ["CommentBlock", "CommentLine"]
        }
      }) : (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("CommentBlock", "CommentLine")),
      optional: true
    },
    tokens: {
      validate: (0, _utils$6.assertEach)(Object.assign(() => {
      }, {
        type: "any"
      })),
      optional: true
    }
  }
});
defineType$4("ForInStatement", {
  visitor: ["left", "right", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertNodeType)("VariableDeclaration", "LVal") : (0, _utils$6.assertNodeType)("VariableDeclaration", "Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern")
    },
    right: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("Statement")
    }
  }
});
defineType$4("ForStatement", {
  visitor: ["init", "test", "update", "body"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop"],
  fields: {
    init: {
      validate: (0, _utils$6.assertNodeType)("VariableDeclaration", "Expression"),
      optional: true
    },
    test: {
      validate: (0, _utils$6.assertNodeType)("Expression"),
      optional: true
    },
    update: {
      validate: (0, _utils$6.assertNodeType)("Expression"),
      optional: true
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("Statement")
    }
  }
});
const functionCommon = {
  params: {
    validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Identifier", "Pattern", "RestElement")))
  },
  generator: {
    default: false
  },
  async: {
    default: false
  }
};
core.functionCommon = functionCommon;
const functionTypeAnnotationCommon = {
  returnType: {
    validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
    optional: true
  },
  typeParameters: {
    validate: (0, _utils$6.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
    optional: true
  }
};
core.functionTypeAnnotationCommon = functionTypeAnnotationCommon;
const functionDeclarationCommon = Object.assign({}, functionCommon, {
  declare: {
    validate: (0, _utils$6.assertValueType)("boolean"),
    optional: true
  },
  id: {
    validate: (0, _utils$6.assertNodeType)("Identifier"),
    optional: true
  }
});
core.functionDeclarationCommon = functionDeclarationCommon;
defineType$4("FunctionDeclaration", {
  builder: ["id", "params", "body", "generator", "async"],
  visitor: ["id", "params", "body", "returnType", "typeParameters"],
  fields: Object.assign({}, functionDeclarationCommon, functionTypeAnnotationCommon, {
    body: {
      validate: (0, _utils$6.assertNodeType)("BlockStatement")
    }
  }),
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Statement", "Pureish", "Declaration"],
  validate: function() {
    if (!{}.BABEL_TYPES_8_BREAKING)
      return () => {
      };
    const identifier2 = (0, _utils$6.assertNodeType)("Identifier");
    return function(parent, key, node) {
      if (!(0, _is$2.default)("ExportDefaultDeclaration", parent)) {
        identifier2(node, "id", node.id);
      }
    };
  }()
});
defineType$4("FunctionExpression", {
  inherits: "FunctionDeclaration",
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
  fields: Object.assign({}, functionCommon, functionTypeAnnotationCommon, {
    id: {
      validate: (0, _utils$6.assertNodeType)("Identifier"),
      optional: true
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("BlockStatement")
    }
  })
});
const patternLikeCommon = {
  typeAnnotation: {
    validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
    optional: true
  },
  decorators: {
    validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator")))
  }
};
core.patternLikeCommon = patternLikeCommon;
defineType$4("Identifier", {
  builder: ["name"],
  visitor: ["typeAnnotation", "decorators"],
  aliases: ["Expression", "PatternLike", "LVal", "TSEntityName"],
  fields: Object.assign({}, patternLikeCommon, {
    name: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("string"), Object.assign(function(node, key, val) {
        if (!{}.BABEL_TYPES_8_BREAKING)
          return;
        if (!(0, _isValidIdentifier$3.default)(val, false)) {
          throw new TypeError(`"${val}" is not a valid identifier name`);
        }
      }, {
        type: "string"
      }))
    },
    optional: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    }
  }),
  validate(parent, key, node) {
    if (!{}.BABEL_TYPES_8_BREAKING)
      return;
    const match = /\.(\w+)$/.exec(key);
    if (!match)
      return;
    const [, parentKey] = match;
    const nonComp = {
      computed: false
    };
    if (parentKey === "property") {
      if ((0, _is$2.default)("MemberExpression", parent, nonComp))
        return;
      if ((0, _is$2.default)("OptionalMemberExpression", parent, nonComp))
        return;
    } else if (parentKey === "key") {
      if ((0, _is$2.default)("Property", parent, nonComp))
        return;
      if ((0, _is$2.default)("Method", parent, nonComp))
        return;
    } else if (parentKey === "exported") {
      if ((0, _is$2.default)("ExportSpecifier", parent))
        return;
    } else if (parentKey === "imported") {
      if ((0, _is$2.default)("ImportSpecifier", parent, {
        imported: node
      }))
        return;
    } else if (parentKey === "meta") {
      if ((0, _is$2.default)("MetaProperty", parent, {
        meta: node
      }))
        return;
    }
    if (((0, _helperValidatorIdentifier$1.isKeyword)(node.name) || (0, _helperValidatorIdentifier$1.isReservedWord)(node.name, false)) && node.name !== "this") {
      throw new TypeError(`"${node.name}" is not a valid identifier`);
    }
  }
});
defineType$4("IfStatement", {
  visitor: ["test", "consequent", "alternate"],
  aliases: ["Statement", "Conditional"],
  fields: {
    test: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    consequent: {
      validate: (0, _utils$6.assertNodeType)("Statement")
    },
    alternate: {
      optional: true,
      validate: (0, _utils$6.assertNodeType)("Statement")
    }
  }
});
defineType$4("LabeledStatement", {
  visitor: ["label", "body"],
  aliases: ["Statement"],
  fields: {
    label: {
      validate: (0, _utils$6.assertNodeType)("Identifier")
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("Statement")
    }
  }
});
defineType$4("StringLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils$6.assertValueType)("string")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType$4("NumericLiteral", {
  builder: ["value"],
  deprecatedAlias: "NumberLiteral",
  fields: {
    value: {
      validate: (0, _utils$6.assertValueType)("number")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType$4("NullLiteral", {
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType$4("BooleanLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils$6.assertValueType)("boolean")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType$4("RegExpLiteral", {
  builder: ["pattern", "flags"],
  deprecatedAlias: "RegexLiteral",
  aliases: ["Expression", "Pureish", "Literal"],
  fields: {
    pattern: {
      validate: (0, _utils$6.assertValueType)("string")
    },
    flags: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("string"), Object.assign(function(node, key, val) {
        if (!{}.BABEL_TYPES_8_BREAKING)
          return;
        const invalid = /[^gimsuy]/.exec(val);
        if (invalid) {
          throw new TypeError(`"${invalid[0]}" is not a valid RegExp flag`);
        }
      }, {
        type: "string"
      })),
      default: ""
    }
  }
});
defineType$4("LogicalExpression", {
  builder: ["operator", "left", "right"],
  visitor: ["left", "right"],
  aliases: ["Binary", "Expression"],
  fields: {
    operator: {
      validate: (0, _utils$6.assertOneOf)(..._constants$5.LOGICAL_OPERATORS)
    },
    left: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    right: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  }
});
defineType$4("MemberExpression", {
  builder: ["object", "property", "computed", ...!{}.BABEL_TYPES_8_BREAKING ? ["optional"] : []],
  visitor: ["object", "property"],
  aliases: ["Expression", "LVal"],
  fields: Object.assign({
    object: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    property: {
      validate: function() {
        const normal = (0, _utils$6.assertNodeType)("Identifier", "PrivateName");
        const computed2 = (0, _utils$6.assertNodeType)("Expression");
        const validator = function(node, key, val) {
          const validator2 = node.computed ? computed2 : normal;
          validator2(node, key, val);
        };
        validator.oneOfNodeTypes = ["Expression", "Identifier", "PrivateName"];
        return validator;
      }()
    },
    computed: {
      default: false
    }
  }, !{}.BABEL_TYPES_8_BREAKING ? {
    optional: {
      validate: (0, _utils$6.assertOneOf)(true, false),
      optional: true
    }
  } : {})
});
defineType$4("NewExpression", {
  inherits: "CallExpression"
});
defineType$4("Program", {
  visitor: ["directives", "body"],
  builder: ["body", "directives", "sourceType", "interpreter"],
  fields: {
    sourceFile: {
      validate: (0, _utils$6.assertValueType)("string")
    },
    sourceType: {
      validate: (0, _utils$6.assertOneOf)("script", "module"),
      default: "script"
    },
    interpreter: {
      validate: (0, _utils$6.assertNodeType)("InterpreterDirective"),
      default: null,
      optional: true
    },
    directives: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Directive"))),
      default: []
    },
    body: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "Block"]
});
defineType$4("ObjectExpression", {
  visitor: ["properties"],
  aliases: ["Expression"],
  fields: {
    properties: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("ObjectMethod", "ObjectProperty", "SpreadElement")))
    }
  }
});
defineType$4("ObjectMethod", {
  builder: ["kind", "key", "params", "body", "computed", "generator", "async"],
  fields: Object.assign({}, functionCommon, functionTypeAnnotationCommon, {
    kind: Object.assign({
      validate: (0, _utils$6.assertOneOf)("method", "get", "set")
    }, !{}.BABEL_TYPES_8_BREAKING ? {
      default: "method"
    } : {}),
    computed: {
      default: false
    },
    key: {
      validate: function() {
        const normal = (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral");
        const computed2 = (0, _utils$6.assertNodeType)("Expression");
        const validator = function(node, key, val) {
          const validator2 = node.computed ? computed2 : normal;
          validator2(node, key, val);
        };
        validator.oneOfNodeTypes = ["Expression", "Identifier", "StringLiteral", "NumericLiteral"];
        return validator;
      }()
    },
    decorators: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
      optional: true
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("BlockStatement")
    }
  }),
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  aliases: ["UserWhitespacable", "Function", "Scopable", "BlockParent", "FunctionParent", "Method", "ObjectMember"]
});
defineType$4("ObjectProperty", {
  builder: ["key", "value", "computed", "shorthand", ...!{}.BABEL_TYPES_8_BREAKING ? ["decorators"] : []],
  fields: {
    computed: {
      default: false
    },
    key: {
      validate: function() {
        const normal = (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral");
        const computed2 = (0, _utils$6.assertNodeType)("Expression");
        const validator = function(node, key, val) {
          const validator2 = node.computed ? computed2 : normal;
          validator2(node, key, val);
        };
        validator.oneOfNodeTypes = ["Expression", "Identifier", "StringLiteral", "NumericLiteral"];
        return validator;
      }()
    },
    value: {
      validate: (0, _utils$6.assertNodeType)("Expression", "PatternLike")
    },
    shorthand: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("boolean"), Object.assign(function(node, key, val) {
        if (!{}.BABEL_TYPES_8_BREAKING)
          return;
        if (val && node.computed) {
          throw new TypeError("Property shorthand of ObjectProperty cannot be true if computed is true");
        }
      }, {
        type: "boolean"
      }), function(node, key, val) {
        if (!{}.BABEL_TYPES_8_BREAKING)
          return;
        if (val && !(0, _is$2.default)("Identifier", node.key)) {
          throw new TypeError("Property shorthand of ObjectProperty cannot be true if key is not an Identifier");
        }
      }),
      default: false
    },
    decorators: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
      optional: true
    }
  },
  visitor: ["key", "value", "decorators"],
  aliases: ["UserWhitespacable", "Property", "ObjectMember"],
  validate: function() {
    const pattern = (0, _utils$6.assertNodeType)("Identifier", "Pattern");
    const expression = (0, _utils$6.assertNodeType)("Expression");
    return function(parent, key, node) {
      if (!{}.BABEL_TYPES_8_BREAKING)
        return;
      const validator = (0, _is$2.default)("ObjectPattern", parent) ? pattern : expression;
      validator(node, "value", node.value);
    };
  }()
});
defineType$4("RestElement", {
  visitor: ["argument", "typeAnnotation"],
  builder: ["argument"],
  aliases: ["LVal", "PatternLike"],
  deprecatedAlias: "RestProperty",
  fields: Object.assign({}, patternLikeCommon, {
    argument: {
      validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertNodeType)("LVal") : (0, _utils$6.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern", "MemberExpression")
    },
    optional: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    }
  }),
  validate(parent, key) {
    if (!{}.BABEL_TYPES_8_BREAKING)
      return;
    const match = /(\w+)\[(\d+)\]/.exec(key);
    if (!match)
      throw new Error("Internal Babel error: malformed key.");
    const [, listKey, index2] = match;
    if (parent[listKey].length > index2 + 1) {
      throw new TypeError(`RestElement must be last element of ${listKey}`);
    }
  }
});
defineType$4("ReturnStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: (0, _utils$6.assertNodeType)("Expression"),
      optional: true
    }
  }
});
defineType$4("SequenceExpression", {
  visitor: ["expressions"],
  fields: {
    expressions: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Expression")))
    }
  },
  aliases: ["Expression"]
});
defineType$4("ParenthesizedExpression", {
  visitor: ["expression"],
  aliases: ["Expression", "ExpressionWrapper"],
  fields: {
    expression: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  }
});
defineType$4("SwitchCase", {
  visitor: ["test", "consequent"],
  fields: {
    test: {
      validate: (0, _utils$6.assertNodeType)("Expression"),
      optional: true
    },
    consequent: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Statement")))
    }
  }
});
defineType$4("SwitchStatement", {
  visitor: ["discriminant", "cases"],
  aliases: ["Statement", "BlockParent", "Scopable"],
  fields: {
    discriminant: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    cases: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("SwitchCase")))
    }
  }
});
defineType$4("ThisExpression", {
  aliases: ["Expression"]
});
defineType$4("ThrowStatement", {
  visitor: ["argument"],
  aliases: ["Statement", "Terminatorless", "CompletionStatement"],
  fields: {
    argument: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  }
});
defineType$4("TryStatement", {
  visitor: ["block", "handler", "finalizer"],
  aliases: ["Statement"],
  fields: {
    block: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertNodeType)("BlockStatement"), Object.assign(function(node) {
        if (!{}.BABEL_TYPES_8_BREAKING)
          return;
        if (!node.handler && !node.finalizer) {
          throw new TypeError("TryStatement expects either a handler or finalizer, or both");
        }
      }, {
        oneOfNodeTypes: ["BlockStatement"]
      }))
    },
    handler: {
      optional: true,
      validate: (0, _utils$6.assertNodeType)("CatchClause")
    },
    finalizer: {
      optional: true,
      validate: (0, _utils$6.assertNodeType)("BlockStatement")
    }
  }
});
defineType$4("UnaryExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: true
    },
    argument: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    operator: {
      validate: (0, _utils$6.assertOneOf)(..._constants$5.UNARY_OPERATORS)
    }
  },
  visitor: ["argument"],
  aliases: ["UnaryLike", "Expression"]
});
defineType$4("UpdateExpression", {
  builder: ["operator", "argument", "prefix"],
  fields: {
    prefix: {
      default: false
    },
    argument: {
      validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertNodeType)("Expression") : (0, _utils$6.assertNodeType)("Identifier", "MemberExpression")
    },
    operator: {
      validate: (0, _utils$6.assertOneOf)(..._constants$5.UPDATE_OPERATORS)
    }
  },
  visitor: ["argument"],
  aliases: ["Expression"]
});
defineType$4("VariableDeclaration", {
  builder: ["kind", "declarations"],
  visitor: ["declarations"],
  aliases: ["Statement", "Declaration"],
  fields: {
    declare: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    kind: {
      validate: (0, _utils$6.assertOneOf)("var", "let", "const")
    },
    declarations: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("VariableDeclarator")))
    }
  },
  validate(parent, key, node) {
    if (!{}.BABEL_TYPES_8_BREAKING)
      return;
    if (!(0, _is$2.default)("ForXStatement", parent, {
      left: node
    }))
      return;
    if (node.declarations.length !== 1) {
      throw new TypeError(`Exactly one VariableDeclarator is required in the VariableDeclaration of a ${parent.type}`);
    }
  }
});
defineType$4("VariableDeclarator", {
  visitor: ["id", "init"],
  fields: {
    id: {
      validate: function() {
        if (!{}.BABEL_TYPES_8_BREAKING) {
          return (0, _utils$6.assertNodeType)("LVal");
        }
        const normal = (0, _utils$6.assertNodeType)("Identifier", "ArrayPattern", "ObjectPattern");
        const without = (0, _utils$6.assertNodeType)("Identifier");
        return function(node, key, val) {
          const validator = node.init ? normal : without;
          validator(node, key, val);
        };
      }()
    },
    definite: {
      optional: true,
      validate: (0, _utils$6.assertValueType)("boolean")
    },
    init: {
      optional: true,
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  }
});
defineType$4("WhileStatement", {
  visitor: ["test", "body"],
  aliases: ["Statement", "BlockParent", "Loop", "While", "Scopable"],
  fields: {
    test: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("Statement")
    }
  }
});
defineType$4("WithStatement", {
  visitor: ["object", "body"],
  aliases: ["Statement"],
  fields: {
    object: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("Statement")
    }
  }
});
defineType$4("AssignmentPattern", {
  visitor: ["left", "right", "decorators"],
  builder: ["left", "right"],
  aliases: ["Pattern", "PatternLike", "LVal"],
  fields: Object.assign({}, patternLikeCommon, {
    left: {
      validate: (0, _utils$6.assertNodeType)("Identifier", "ObjectPattern", "ArrayPattern", "MemberExpression")
    },
    right: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    decorators: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
      optional: true
    }
  })
});
defineType$4("ArrayPattern", {
  visitor: ["elements", "typeAnnotation"],
  builder: ["elements"],
  aliases: ["Pattern", "PatternLike", "LVal"],
  fields: Object.assign({}, patternLikeCommon, {
    elements: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeOrValueType)("null", "PatternLike")))
    },
    decorators: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
      optional: true
    },
    optional: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    }
  })
});
defineType$4("ArrowFunctionExpression", {
  builder: ["params", "body", "async"],
  visitor: ["params", "body", "returnType", "typeParameters"],
  aliases: ["Scopable", "Function", "BlockParent", "FunctionParent", "Expression", "Pureish"],
  fields: Object.assign({}, functionCommon, functionTypeAnnotationCommon, {
    expression: {
      validate: (0, _utils$6.assertValueType)("boolean")
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("BlockStatement", "Expression")
    }
  })
});
defineType$4("ClassBody", {
  visitor: ["body"],
  fields: {
    body: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("ClassMethod", "ClassPrivateMethod", "ClassProperty", "ClassPrivateProperty", "ClassAccessorProperty", "TSDeclareMethod", "TSIndexSignature", "StaticBlock")))
    }
  }
});
defineType$4("ClassExpression", {
  builder: ["id", "superClass", "body", "decorators"],
  visitor: ["id", "body", "superClass", "mixins", "typeParameters", "superTypeParameters", "implements", "decorators"],
  aliases: ["Scopable", "Class", "Expression"],
  fields: {
    id: {
      validate: (0, _utils$6.assertNodeType)("Identifier"),
      optional: true
    },
    typeParameters: {
      validate: (0, _utils$6.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
      optional: true
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("ClassBody")
    },
    superClass: {
      optional: true,
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    superTypeParameters: {
      validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
      optional: true
    },
    implements: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
      optional: true
    },
    decorators: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
      optional: true
    },
    mixins: {
      validate: (0, _utils$6.assertNodeType)("InterfaceExtends"),
      optional: true
    }
  }
});
defineType$4("ClassDeclaration", {
  inherits: "ClassExpression",
  aliases: ["Scopable", "Class", "Statement", "Declaration"],
  fields: {
    id: {
      validate: (0, _utils$6.assertNodeType)("Identifier")
    },
    typeParameters: {
      validate: (0, _utils$6.assertNodeType)("TypeParameterDeclaration", "TSTypeParameterDeclaration", "Noop"),
      optional: true
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("ClassBody")
    },
    superClass: {
      optional: true,
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    superTypeParameters: {
      validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
      optional: true
    },
    implements: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("TSExpressionWithTypeArguments", "ClassImplements"))),
      optional: true
    },
    decorators: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
      optional: true
    },
    mixins: {
      validate: (0, _utils$6.assertNodeType)("InterfaceExtends"),
      optional: true
    },
    declare: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    abstract: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    }
  },
  validate: function() {
    const identifier2 = (0, _utils$6.assertNodeType)("Identifier");
    return function(parent, key, node) {
      if (!{}.BABEL_TYPES_8_BREAKING)
        return;
      if (!(0, _is$2.default)("ExportDefaultDeclaration", parent)) {
        identifier2(node, "id", node.id);
      }
    };
  }()
});
defineType$4("ExportAllDeclaration", {
  visitor: ["source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    source: {
      validate: (0, _utils$6.assertNodeType)("StringLiteral")
    },
    exportKind: (0, _utils$6.validateOptional)((0, _utils$6.assertOneOf)("type", "value")),
    assertions: {
      optional: true,
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("ImportAttribute")))
    }
  }
});
defineType$4("ExportDefaultDeclaration", {
  visitor: ["declaration"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    declaration: {
      validate: (0, _utils$6.assertNodeType)("FunctionDeclaration", "TSDeclareFunction", "ClassDeclaration", "Expression")
    },
    exportKind: (0, _utils$6.validateOptional)((0, _utils$6.assertOneOf)("value"))
  }
});
defineType$4("ExportNamedDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration", "ExportDeclaration"],
  fields: {
    declaration: {
      optional: true,
      validate: (0, _utils$6.chain)((0, _utils$6.assertNodeType)("Declaration"), Object.assign(function(node, key, val) {
        if (!{}.BABEL_TYPES_8_BREAKING)
          return;
        if (val && node.specifiers.length) {
          throw new TypeError("Only declaration or specifiers is allowed on ExportNamedDeclaration");
        }
      }, {
        oneOfNodeTypes: ["Declaration"]
      }), function(node, key, val) {
        if (!{}.BABEL_TYPES_8_BREAKING)
          return;
        if (val && node.source) {
          throw new TypeError("Cannot export a declaration from a source");
        }
      })
    },
    assertions: {
      optional: true,
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("ImportAttribute")))
    },
    specifiers: {
      default: [],
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)(function() {
        const sourced = (0, _utils$6.assertNodeType)("ExportSpecifier", "ExportDefaultSpecifier", "ExportNamespaceSpecifier");
        const sourceless = (0, _utils$6.assertNodeType)("ExportSpecifier");
        if (!{}.BABEL_TYPES_8_BREAKING)
          return sourced;
        return function(node, key, val) {
          const validator = node.source ? sourced : sourceless;
          validator(node, key, val);
        };
      }()))
    },
    source: {
      validate: (0, _utils$6.assertNodeType)("StringLiteral"),
      optional: true
    },
    exportKind: (0, _utils$6.validateOptional)((0, _utils$6.assertOneOf)("type", "value"))
  }
});
defineType$4("ExportSpecifier", {
  visitor: ["local", "exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _utils$6.assertNodeType)("Identifier")
    },
    exported: {
      validate: (0, _utils$6.assertNodeType)("Identifier", "StringLiteral")
    },
    exportKind: {
      validate: (0, _utils$6.assertOneOf)("type", "value"),
      optional: true
    }
  }
});
defineType$4("ForOfStatement", {
  visitor: ["left", "right", "body"],
  builder: ["left", "right", "body", "await"],
  aliases: ["Scopable", "Statement", "For", "BlockParent", "Loop", "ForXStatement"],
  fields: {
    left: {
      validate: function() {
        if (!{}.BABEL_TYPES_8_BREAKING) {
          return (0, _utils$6.assertNodeType)("VariableDeclaration", "LVal");
        }
        const declaration = (0, _utils$6.assertNodeType)("VariableDeclaration");
        const lval = (0, _utils$6.assertNodeType)("Identifier", "MemberExpression", "ArrayPattern", "ObjectPattern");
        return function(node, key, val) {
          if ((0, _is$2.default)("VariableDeclaration", val)) {
            declaration(node, key, val);
          } else {
            lval(node, key, val);
          }
        };
      }()
    },
    right: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("Statement")
    },
    await: {
      default: false
    }
  }
});
defineType$4("ImportDeclaration", {
  visitor: ["specifiers", "source"],
  aliases: ["Statement", "Declaration", "ModuleDeclaration"],
  fields: {
    assertions: {
      optional: true,
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("ImportAttribute")))
    },
    specifiers: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("ImportSpecifier", "ImportDefaultSpecifier", "ImportNamespaceSpecifier")))
    },
    source: {
      validate: (0, _utils$6.assertNodeType)("StringLiteral")
    },
    importKind: {
      validate: (0, _utils$6.assertOneOf)("type", "typeof", "value"),
      optional: true
    }
  }
});
defineType$4("ImportDefaultSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _utils$6.assertNodeType)("Identifier")
    }
  }
});
defineType$4("ImportNamespaceSpecifier", {
  visitor: ["local"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _utils$6.assertNodeType)("Identifier")
    }
  }
});
defineType$4("ImportSpecifier", {
  visitor: ["local", "imported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    local: {
      validate: (0, _utils$6.assertNodeType)("Identifier")
    },
    imported: {
      validate: (0, _utils$6.assertNodeType)("Identifier", "StringLiteral")
    },
    importKind: {
      validate: (0, _utils$6.assertOneOf)("type", "typeof", "value"),
      optional: true
    }
  }
});
defineType$4("MetaProperty", {
  visitor: ["meta", "property"],
  aliases: ["Expression"],
  fields: {
    meta: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertNodeType)("Identifier"), Object.assign(function(node, key, val) {
        if (!{}.BABEL_TYPES_8_BREAKING)
          return;
        let property;
        switch (val.name) {
          case "function":
            property = "sent";
            break;
          case "new":
            property = "target";
            break;
          case "import":
            property = "meta";
            break;
        }
        if (!(0, _is$2.default)("Identifier", node.property, {
          name: property
        })) {
          throw new TypeError("Unrecognised MetaProperty");
        }
      }, {
        oneOfNodeTypes: ["Identifier"]
      }))
    },
    property: {
      validate: (0, _utils$6.assertNodeType)("Identifier")
    }
  }
});
const classMethodOrPropertyCommon = {
  abstract: {
    validate: (0, _utils$6.assertValueType)("boolean"),
    optional: true
  },
  accessibility: {
    validate: (0, _utils$6.assertOneOf)("public", "private", "protected"),
    optional: true
  },
  static: {
    default: false
  },
  override: {
    default: false
  },
  computed: {
    default: false
  },
  optional: {
    validate: (0, _utils$6.assertValueType)("boolean"),
    optional: true
  },
  key: {
    validate: (0, _utils$6.chain)(function() {
      const normal = (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral");
      const computed2 = (0, _utils$6.assertNodeType)("Expression");
      return function(node, key, val) {
        const validator = node.computed ? computed2 : normal;
        validator(node, key, val);
      };
    }(), (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "Expression"))
  }
};
core.classMethodOrPropertyCommon = classMethodOrPropertyCommon;
const classMethodOrDeclareMethodCommon = Object.assign({}, functionCommon, classMethodOrPropertyCommon, {
  params: {
    validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Identifier", "Pattern", "RestElement", "TSParameterProperty")))
  },
  kind: {
    validate: (0, _utils$6.assertOneOf)("get", "set", "method", "constructor"),
    default: "method"
  },
  access: {
    validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("string"), (0, _utils$6.assertOneOf)("public", "private", "protected")),
    optional: true
  },
  decorators: {
    validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
    optional: true
  }
});
core.classMethodOrDeclareMethodCommon = classMethodOrDeclareMethodCommon;
defineType$4("ClassMethod", {
  aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method"],
  builder: ["kind", "key", "params", "body", "computed", "static", "generator", "async"],
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  fields: Object.assign({}, classMethodOrDeclareMethodCommon, functionTypeAnnotationCommon, {
    body: {
      validate: (0, _utils$6.assertNodeType)("BlockStatement")
    }
  })
});
defineType$4("ObjectPattern", {
  visitor: ["properties", "typeAnnotation", "decorators"],
  builder: ["properties"],
  aliases: ["Pattern", "PatternLike", "LVal"],
  fields: Object.assign({}, patternLikeCommon, {
    properties: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("RestElement", "ObjectProperty")))
    }
  })
});
defineType$4("SpreadElement", {
  visitor: ["argument"],
  aliases: ["UnaryLike"],
  deprecatedAlias: "SpreadProperty",
  fields: {
    argument: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  }
});
defineType$4("Super", {
  aliases: ["Expression"]
});
defineType$4("TaggedTemplateExpression", {
  visitor: ["tag", "quasi", "typeParameters"],
  builder: ["tag", "quasi"],
  aliases: ["Expression"],
  fields: {
    tag: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    quasi: {
      validate: (0, _utils$6.assertNodeType)("TemplateLiteral")
    },
    typeParameters: {
      validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
      optional: true
    }
  }
});
defineType$4("TemplateElement", {
  builder: ["value", "tail"],
  fields: {
    value: {
      validate: (0, _utils$6.assertShape)({
        raw: {
          validate: (0, _utils$6.assertValueType)("string")
        },
        cooked: {
          validate: (0, _utils$6.assertValueType)("string"),
          optional: true
        }
      })
    },
    tail: {
      default: false
    }
  }
});
defineType$4("TemplateLiteral", {
  visitor: ["quasis", "expressions"],
  aliases: ["Expression", "Literal"],
  fields: {
    quasis: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("TemplateElement")))
    },
    expressions: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Expression", "TSType")), function(node, key, val) {
        if (node.quasis.length !== val.length + 1) {
          throw new TypeError(`Number of ${node.type} quasis should be exactly one more than the number of expressions.
Expected ${val.length + 1} quasis but got ${node.quasis.length}`);
        }
      })
    }
  }
});
defineType$4("YieldExpression", {
  builder: ["argument", "delegate"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    delegate: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("boolean"), Object.assign(function(node, key, val) {
        if (!{}.BABEL_TYPES_8_BREAKING)
          return;
        if (val && !node.argument) {
          throw new TypeError("Property delegate of YieldExpression cannot be true if there is no argument");
        }
      }, {
        type: "boolean"
      })),
      default: false
    },
    argument: {
      optional: true,
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  }
});
defineType$4("AwaitExpression", {
  builder: ["argument"],
  visitor: ["argument"],
  aliases: ["Expression", "Terminatorless"],
  fields: {
    argument: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    }
  }
});
defineType$4("Import", {
  aliases: ["Expression"]
});
defineType$4("BigIntLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils$6.assertValueType)("string")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
defineType$4("ExportNamespaceSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: (0, _utils$6.assertNodeType)("Identifier")
    }
  }
});
defineType$4("OptionalMemberExpression", {
  builder: ["object", "property", "computed", "optional"],
  visitor: ["object", "property"],
  aliases: ["Expression"],
  fields: {
    object: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    property: {
      validate: function() {
        const normal = (0, _utils$6.assertNodeType)("Identifier");
        const computed2 = (0, _utils$6.assertNodeType)("Expression");
        const validator = function(node, key, val) {
          const validator2 = node.computed ? computed2 : normal;
          validator2(node, key, val);
        };
        validator.oneOfNodeTypes = ["Expression", "Identifier"];
        return validator;
      }()
    },
    computed: {
      default: false
    },
    optional: {
      validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertValueType)("boolean") : (0, _utils$6.chain)((0, _utils$6.assertValueType)("boolean"), (0, _utils$6.assertOptionalChainStart)())
    }
  }
});
defineType$4("OptionalCallExpression", {
  visitor: ["callee", "arguments", "typeParameters", "typeArguments"],
  builder: ["callee", "arguments", "optional"],
  aliases: ["Expression"],
  fields: {
    callee: {
      validate: (0, _utils$6.assertNodeType)("Expression")
    },
    arguments: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Expression", "SpreadElement", "JSXNamespacedName", "ArgumentPlaceholder")))
    },
    optional: {
      validate: !{}.BABEL_TYPES_8_BREAKING ? (0, _utils$6.assertValueType)("boolean") : (0, _utils$6.chain)((0, _utils$6.assertValueType)("boolean"), (0, _utils$6.assertOptionalChainStart)())
    },
    typeArguments: {
      validate: (0, _utils$6.assertNodeType)("TypeParameterInstantiation"),
      optional: true
    },
    typeParameters: {
      validate: (0, _utils$6.assertNodeType)("TSTypeParameterInstantiation"),
      optional: true
    }
  }
});
defineType$4("ClassProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
  aliases: ["Property"],
  fields: Object.assign({}, classMethodOrPropertyCommon, {
    value: {
      validate: (0, _utils$6.assertNodeType)("Expression"),
      optional: true
    },
    definite: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    typeAnnotation: {
      validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: true
    },
    decorators: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
      optional: true
    },
    readonly: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    declare: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    variance: {
      validate: (0, _utils$6.assertNodeType)("Variance"),
      optional: true
    }
  })
});
defineType$4("ClassAccessorProperty", {
  visitor: ["key", "value", "typeAnnotation", "decorators"],
  builder: ["key", "value", "typeAnnotation", "decorators", "computed", "static"],
  aliases: ["Property", "Accessor"],
  fields: Object.assign({}, classMethodOrPropertyCommon, {
    key: {
      validate: (0, _utils$6.chain)(function() {
        const normal = (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "PrivateName");
        const computed2 = (0, _utils$6.assertNodeType)("Expression");
        return function(node, key, val) {
          const validator = node.computed ? computed2 : normal;
          validator(node, key, val);
        };
      }(), (0, _utils$6.assertNodeType)("Identifier", "StringLiteral", "NumericLiteral", "Expression", "PrivateName"))
    },
    value: {
      validate: (0, _utils$6.assertNodeType)("Expression"),
      optional: true
    },
    definite: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    typeAnnotation: {
      validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: true
    },
    decorators: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
      optional: true
    },
    readonly: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    declare: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    variance: {
      validate: (0, _utils$6.assertNodeType)("Variance"),
      optional: true
    }
  })
});
defineType$4("ClassPrivateProperty", {
  visitor: ["key", "value", "decorators", "typeAnnotation"],
  builder: ["key", "value", "decorators", "static"],
  aliases: ["Property", "Private"],
  fields: {
    key: {
      validate: (0, _utils$6.assertNodeType)("PrivateName")
    },
    value: {
      validate: (0, _utils$6.assertNodeType)("Expression"),
      optional: true
    },
    typeAnnotation: {
      validate: (0, _utils$6.assertNodeType)("TypeAnnotation", "TSTypeAnnotation", "Noop"),
      optional: true
    },
    decorators: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Decorator"))),
      optional: true
    },
    readonly: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    definite: {
      validate: (0, _utils$6.assertValueType)("boolean"),
      optional: true
    },
    variance: {
      validate: (0, _utils$6.assertNodeType)("Variance"),
      optional: true
    }
  }
});
defineType$4("ClassPrivateMethod", {
  builder: ["kind", "key", "params", "body", "static"],
  visitor: ["key", "params", "body", "decorators", "returnType", "typeParameters"],
  aliases: ["Function", "Scopable", "BlockParent", "FunctionParent", "Method", "Private"],
  fields: Object.assign({}, classMethodOrDeclareMethodCommon, functionTypeAnnotationCommon, {
    key: {
      validate: (0, _utils$6.assertNodeType)("PrivateName")
    },
    body: {
      validate: (0, _utils$6.assertNodeType)("BlockStatement")
    }
  })
});
defineType$4("PrivateName", {
  visitor: ["id"],
  aliases: ["Private"],
  fields: {
    id: {
      validate: (0, _utils$6.assertNodeType)("Identifier")
    }
  }
});
defineType$4("StaticBlock", {
  visitor: ["body"],
  fields: {
    body: {
      validate: (0, _utils$6.chain)((0, _utils$6.assertValueType)("array"), (0, _utils$6.assertEach)((0, _utils$6.assertNodeType)("Statement")))
    }
  },
  aliases: ["Scopable", "BlockParent", "FunctionParent"]
});
var _utils$5 = utils;
const defineType$3 = (0, _utils$5.defineAliasedType)("Flow");
const defineInterfaceishType = (name, typeParameterType = "TypeParameterDeclaration") => {
  defineType$3(name, {
    builder: ["id", "typeParameters", "extends", "body"],
    visitor: ["id", "typeParameters", "extends", "mixins", "implements", "body"],
    aliases: ["FlowDeclaration", "Statement", "Declaration"],
    fields: {
      id: (0, _utils$5.validateType)("Identifier"),
      typeParameters: (0, _utils$5.validateOptionalType)(typeParameterType),
      extends: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("InterfaceExtends")),
      mixins: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("InterfaceExtends")),
      implements: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("ClassImplements")),
      body: (0, _utils$5.validateType)("ObjectTypeAnnotation")
    }
  });
};
defineType$3("AnyTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("ArrayTypeAnnotation", {
  visitor: ["elementType"],
  aliases: ["FlowType"],
  fields: {
    elementType: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("BooleanTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("BooleanLiteralTypeAnnotation", {
  builder: ["value"],
  aliases: ["FlowType"],
  fields: {
    value: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("NullLiteralTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("ClassImplements", {
  visitor: ["id", "typeParameters"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterInstantiation")
  }
});
defineInterfaceishType("DeclareClass");
defineType$3("DeclareFunction", {
  visitor: ["id"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    predicate: (0, _utils$5.validateOptionalType)("DeclaredPredicate")
  }
});
defineInterfaceishType("DeclareInterface");
defineType$3("DeclareModule", {
  builder: ["id", "body", "kind"],
  visitor: ["id", "body"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils$5.validateType)(["Identifier", "StringLiteral"]),
    body: (0, _utils$5.validateType)("BlockStatement"),
    kind: (0, _utils$5.validateOptional)((0, _utils$5.assertOneOf)("CommonJS", "ES"))
  }
});
defineType$3("DeclareModuleExports", {
  visitor: ["typeAnnotation"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    typeAnnotation: (0, _utils$5.validateType)("TypeAnnotation")
  }
});
defineType$3("DeclareTypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
    right: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("DeclareOpaqueType", {
  visitor: ["id", "typeParameters", "supertype"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
    supertype: (0, _utils$5.validateOptionalType)("FlowType"),
    impltype: (0, _utils$5.validateOptionalType)("FlowType")
  }
});
defineType$3("DeclareVariable", {
  visitor: ["id"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier")
  }
});
defineType$3("DeclareExportDeclaration", {
  visitor: ["declaration", "specifiers", "source"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    declaration: (0, _utils$5.validateOptionalType)("Flow"),
    specifiers: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)(["ExportSpecifier", "ExportNamespaceSpecifier"])),
    source: (0, _utils$5.validateOptionalType)("StringLiteral"),
    default: (0, _utils$5.validateOptional)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("DeclareExportAllDeclaration", {
  visitor: ["source"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    source: (0, _utils$5.validateType)("StringLiteral"),
    exportKind: (0, _utils$5.validateOptional)((0, _utils$5.assertOneOf)("type", "value"))
  }
});
defineType$3("DeclaredPredicate", {
  visitor: ["value"],
  aliases: ["FlowPredicate"],
  fields: {
    value: (0, _utils$5.validateType)("Flow")
  }
});
defineType$3("ExistsTypeAnnotation", {
  aliases: ["FlowType"]
});
defineType$3("FunctionTypeAnnotation", {
  visitor: ["typeParameters", "params", "rest", "returnType"],
  aliases: ["FlowType"],
  fields: {
    typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
    params: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("FunctionTypeParam")),
    rest: (0, _utils$5.validateOptionalType)("FunctionTypeParam"),
    this: (0, _utils$5.validateOptionalType)("FunctionTypeParam"),
    returnType: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("FunctionTypeParam", {
  visitor: ["name", "typeAnnotation"],
  fields: {
    name: (0, _utils$5.validateOptionalType)("Identifier"),
    typeAnnotation: (0, _utils$5.validateType)("FlowType"),
    optional: (0, _utils$5.validateOptional)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("GenericTypeAnnotation", {
  visitor: ["id", "typeParameters"],
  aliases: ["FlowType"],
  fields: {
    id: (0, _utils$5.validateType)(["Identifier", "QualifiedTypeIdentifier"]),
    typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterInstantiation")
  }
});
defineType$3("InferredPredicate", {
  aliases: ["FlowPredicate"]
});
defineType$3("InterfaceExtends", {
  visitor: ["id", "typeParameters"],
  fields: {
    id: (0, _utils$5.validateType)(["Identifier", "QualifiedTypeIdentifier"]),
    typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterInstantiation")
  }
});
defineInterfaceishType("InterfaceDeclaration");
defineType$3("InterfaceTypeAnnotation", {
  visitor: ["extends", "body"],
  aliases: ["FlowType"],
  fields: {
    extends: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("InterfaceExtends")),
    body: (0, _utils$5.validateType)("ObjectTypeAnnotation")
  }
});
defineType$3("IntersectionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["FlowType"],
  fields: {
    types: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("FlowType"))
  }
});
defineType$3("MixedTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("EmptyTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("NullableTypeAnnotation", {
  visitor: ["typeAnnotation"],
  aliases: ["FlowType"],
  fields: {
    typeAnnotation: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("NumberLiteralTypeAnnotation", {
  builder: ["value"],
  aliases: ["FlowType"],
  fields: {
    value: (0, _utils$5.validate)((0, _utils$5.assertValueType)("number"))
  }
});
defineType$3("NumberTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("ObjectTypeAnnotation", {
  visitor: ["properties", "indexers", "callProperties", "internalSlots"],
  aliases: ["FlowType"],
  builder: ["properties", "indexers", "callProperties", "internalSlots", "exact"],
  fields: {
    properties: (0, _utils$5.validate)((0, _utils$5.arrayOfType)(["ObjectTypeProperty", "ObjectTypeSpreadProperty"])),
    indexers: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("ObjectTypeIndexer")),
    callProperties: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("ObjectTypeCallProperty")),
    internalSlots: (0, _utils$5.validateOptional)((0, _utils$5.arrayOfType)("ObjectTypeInternalSlot")),
    exact: {
      validate: (0, _utils$5.assertValueType)("boolean"),
      default: false
    },
    inexact: (0, _utils$5.validateOptional)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("ObjectTypeInternalSlot", {
  visitor: ["id", "value", "optional", "static", "method"],
  aliases: ["UserWhitespacable"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    value: (0, _utils$5.validateType)("FlowType"),
    optional: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
    static: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
    method: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("ObjectTypeCallProperty", {
  visitor: ["value"],
  aliases: ["UserWhitespacable"],
  fields: {
    value: (0, _utils$5.validateType)("FlowType"),
    static: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("ObjectTypeIndexer", {
  visitor: ["id", "key", "value", "variance"],
  aliases: ["UserWhitespacable"],
  fields: {
    id: (0, _utils$5.validateOptionalType)("Identifier"),
    key: (0, _utils$5.validateType)("FlowType"),
    value: (0, _utils$5.validateType)("FlowType"),
    static: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
    variance: (0, _utils$5.validateOptionalType)("Variance")
  }
});
defineType$3("ObjectTypeProperty", {
  visitor: ["key", "value", "variance"],
  aliases: ["UserWhitespacable"],
  fields: {
    key: (0, _utils$5.validateType)(["Identifier", "StringLiteral"]),
    value: (0, _utils$5.validateType)("FlowType"),
    kind: (0, _utils$5.validate)((0, _utils$5.assertOneOf)("init", "get", "set")),
    static: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
    proto: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
    optional: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
    variance: (0, _utils$5.validateOptionalType)("Variance"),
    method: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("ObjectTypeSpreadProperty", {
  visitor: ["argument"],
  aliases: ["UserWhitespacable"],
  fields: {
    argument: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("OpaqueType", {
  visitor: ["id", "typeParameters", "supertype", "impltype"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
    supertype: (0, _utils$5.validateOptionalType)("FlowType"),
    impltype: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("QualifiedTypeIdentifier", {
  visitor: ["id", "qualification"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    qualification: (0, _utils$5.validateType)(["Identifier", "QualifiedTypeIdentifier"])
  }
});
defineType$3("StringLiteralTypeAnnotation", {
  builder: ["value"],
  aliases: ["FlowType"],
  fields: {
    value: (0, _utils$5.validate)((0, _utils$5.assertValueType)("string"))
  }
});
defineType$3("StringTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("SymbolTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("ThisTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("TupleTypeAnnotation", {
  visitor: ["types"],
  aliases: ["FlowType"],
  fields: {
    types: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("FlowType"))
  }
});
defineType$3("TypeofTypeAnnotation", {
  visitor: ["argument"],
  aliases: ["FlowType"],
  fields: {
    argument: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("TypeAlias", {
  visitor: ["id", "typeParameters", "right"],
  aliases: ["FlowDeclaration", "Statement", "Declaration"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    typeParameters: (0, _utils$5.validateOptionalType)("TypeParameterDeclaration"),
    right: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("TypeAnnotation", {
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("TypeCastExpression", {
  visitor: ["expression", "typeAnnotation"],
  aliases: ["ExpressionWrapper", "Expression"],
  fields: {
    expression: (0, _utils$5.validateType)("Expression"),
    typeAnnotation: (0, _utils$5.validateType)("TypeAnnotation")
  }
});
defineType$3("TypeParameter", {
  visitor: ["bound", "default", "variance"],
  fields: {
    name: (0, _utils$5.validate)((0, _utils$5.assertValueType)("string")),
    bound: (0, _utils$5.validateOptionalType)("TypeAnnotation"),
    default: (0, _utils$5.validateOptionalType)("FlowType"),
    variance: (0, _utils$5.validateOptionalType)("Variance")
  }
});
defineType$3("TypeParameterDeclaration", {
  visitor: ["params"],
  fields: {
    params: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("TypeParameter"))
  }
});
defineType$3("TypeParameterInstantiation", {
  visitor: ["params"],
  fields: {
    params: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("FlowType"))
  }
});
defineType$3("UnionTypeAnnotation", {
  visitor: ["types"],
  aliases: ["FlowType"],
  fields: {
    types: (0, _utils$5.validate)((0, _utils$5.arrayOfType)("FlowType"))
  }
});
defineType$3("Variance", {
  builder: ["kind"],
  fields: {
    kind: (0, _utils$5.validate)((0, _utils$5.assertOneOf)("minus", "plus"))
  }
});
defineType$3("VoidTypeAnnotation", {
  aliases: ["FlowType", "FlowBaseAnnotation"]
});
defineType$3("EnumDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "body"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    body: (0, _utils$5.validateType)(["EnumBooleanBody", "EnumNumberBody", "EnumStringBody", "EnumSymbolBody"])
  }
});
defineType$3("EnumBooleanBody", {
  aliases: ["EnumBody"],
  visitor: ["members"],
  fields: {
    explicitType: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
    members: (0, _utils$5.validateArrayOfType)("EnumBooleanMember"),
    hasUnknownMembers: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("EnumNumberBody", {
  aliases: ["EnumBody"],
  visitor: ["members"],
  fields: {
    explicitType: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
    members: (0, _utils$5.validateArrayOfType)("EnumNumberMember"),
    hasUnknownMembers: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("EnumStringBody", {
  aliases: ["EnumBody"],
  visitor: ["members"],
  fields: {
    explicitType: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean")),
    members: (0, _utils$5.validateArrayOfType)(["EnumStringMember", "EnumDefaultedMember"]),
    hasUnknownMembers: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("EnumSymbolBody", {
  aliases: ["EnumBody"],
  visitor: ["members"],
  fields: {
    members: (0, _utils$5.validateArrayOfType)("EnumDefaultedMember"),
    hasUnknownMembers: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
  }
});
defineType$3("EnumBooleanMember", {
  aliases: ["EnumMember"],
  visitor: ["id"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    init: (0, _utils$5.validateType)("BooleanLiteral")
  }
});
defineType$3("EnumNumberMember", {
  aliases: ["EnumMember"],
  visitor: ["id", "init"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    init: (0, _utils$5.validateType)("NumericLiteral")
  }
});
defineType$3("EnumStringMember", {
  aliases: ["EnumMember"],
  visitor: ["id", "init"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier"),
    init: (0, _utils$5.validateType)("StringLiteral")
  }
});
defineType$3("EnumDefaultedMember", {
  aliases: ["EnumMember"],
  visitor: ["id"],
  fields: {
    id: (0, _utils$5.validateType)("Identifier")
  }
});
defineType$3("IndexedAccessType", {
  visitor: ["objectType", "indexType"],
  aliases: ["FlowType"],
  fields: {
    objectType: (0, _utils$5.validateType)("FlowType"),
    indexType: (0, _utils$5.validateType)("FlowType")
  }
});
defineType$3("OptionalIndexedAccessType", {
  visitor: ["objectType", "indexType"],
  aliases: ["FlowType"],
  fields: {
    objectType: (0, _utils$5.validateType)("FlowType"),
    indexType: (0, _utils$5.validateType)("FlowType"),
    optional: (0, _utils$5.validate)((0, _utils$5.assertValueType)("boolean"))
  }
});
var _utils$4 = utils;
const defineType$2 = (0, _utils$4.defineAliasedType)("JSX");
defineType$2("JSXAttribute", {
  visitor: ["name", "value"],
  aliases: ["Immutable"],
  fields: {
    name: {
      validate: (0, _utils$4.assertNodeType)("JSXIdentifier", "JSXNamespacedName")
    },
    value: {
      optional: true,
      validate: (0, _utils$4.assertNodeType)("JSXElement", "JSXFragment", "StringLiteral", "JSXExpressionContainer")
    }
  }
});
defineType$2("JSXClosingElement", {
  visitor: ["name"],
  aliases: ["Immutable"],
  fields: {
    name: {
      validate: (0, _utils$4.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
    }
  }
});
defineType$2("JSXElement", {
  builder: ["openingElement", "closingElement", "children", "selfClosing"],
  visitor: ["openingElement", "children", "closingElement"],
  aliases: ["Immutable", "Expression"],
  fields: {
    openingElement: {
      validate: (0, _utils$4.assertNodeType)("JSXOpeningElement")
    },
    closingElement: {
      optional: true,
      validate: (0, _utils$4.assertNodeType)("JSXClosingElement")
    },
    children: {
      validate: (0, _utils$4.chain)((0, _utils$4.assertValueType)("array"), (0, _utils$4.assertEach)((0, _utils$4.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
    },
    selfClosing: {
      validate: (0, _utils$4.assertValueType)("boolean"),
      optional: true
    }
  }
});
defineType$2("JSXEmptyExpression", {});
defineType$2("JSXExpressionContainer", {
  visitor: ["expression"],
  aliases: ["Immutable"],
  fields: {
    expression: {
      validate: (0, _utils$4.assertNodeType)("Expression", "JSXEmptyExpression")
    }
  }
});
defineType$2("JSXSpreadChild", {
  visitor: ["expression"],
  aliases: ["Immutable"],
  fields: {
    expression: {
      validate: (0, _utils$4.assertNodeType)("Expression")
    }
  }
});
defineType$2("JSXIdentifier", {
  builder: ["name"],
  fields: {
    name: {
      validate: (0, _utils$4.assertValueType)("string")
    }
  }
});
defineType$2("JSXMemberExpression", {
  visitor: ["object", "property"],
  fields: {
    object: {
      validate: (0, _utils$4.assertNodeType)("JSXMemberExpression", "JSXIdentifier")
    },
    property: {
      validate: (0, _utils$4.assertNodeType)("JSXIdentifier")
    }
  }
});
defineType$2("JSXNamespacedName", {
  visitor: ["namespace", "name"],
  fields: {
    namespace: {
      validate: (0, _utils$4.assertNodeType)("JSXIdentifier")
    },
    name: {
      validate: (0, _utils$4.assertNodeType)("JSXIdentifier")
    }
  }
});
defineType$2("JSXOpeningElement", {
  builder: ["name", "attributes", "selfClosing"],
  visitor: ["name", "attributes"],
  aliases: ["Immutable"],
  fields: {
    name: {
      validate: (0, _utils$4.assertNodeType)("JSXIdentifier", "JSXMemberExpression", "JSXNamespacedName")
    },
    selfClosing: {
      default: false
    },
    attributes: {
      validate: (0, _utils$4.chain)((0, _utils$4.assertValueType)("array"), (0, _utils$4.assertEach)((0, _utils$4.assertNodeType)("JSXAttribute", "JSXSpreadAttribute")))
    },
    typeParameters: {
      validate: (0, _utils$4.assertNodeType)("TypeParameterInstantiation", "TSTypeParameterInstantiation"),
      optional: true
    }
  }
});
defineType$2("JSXSpreadAttribute", {
  visitor: ["argument"],
  fields: {
    argument: {
      validate: (0, _utils$4.assertNodeType)("Expression")
    }
  }
});
defineType$2("JSXText", {
  aliases: ["Immutable"],
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils$4.assertValueType)("string")
    }
  }
});
defineType$2("JSXFragment", {
  builder: ["openingFragment", "closingFragment", "children"],
  visitor: ["openingFragment", "children", "closingFragment"],
  aliases: ["Immutable", "Expression"],
  fields: {
    openingFragment: {
      validate: (0, _utils$4.assertNodeType)("JSXOpeningFragment")
    },
    closingFragment: {
      validate: (0, _utils$4.assertNodeType)("JSXClosingFragment")
    },
    children: {
      validate: (0, _utils$4.chain)((0, _utils$4.assertValueType)("array"), (0, _utils$4.assertEach)((0, _utils$4.assertNodeType)("JSXText", "JSXExpressionContainer", "JSXSpreadChild", "JSXElement", "JSXFragment")))
    }
  }
});
defineType$2("JSXOpeningFragment", {
  aliases: ["Immutable"]
});
defineType$2("JSXClosingFragment", {
  aliases: ["Immutable"]
});
var placeholders = {};
Object.defineProperty(placeholders, "__esModule", {
  value: true
});
placeholders.PLACEHOLDERS_FLIPPED_ALIAS = placeholders.PLACEHOLDERS_ALIAS = placeholders.PLACEHOLDERS = void 0;
var _utils$3 = utils;
const PLACEHOLDERS = ["Identifier", "StringLiteral", "Expression", "Statement", "Declaration", "BlockStatement", "ClassBody", "Pattern"];
placeholders.PLACEHOLDERS = PLACEHOLDERS;
const PLACEHOLDERS_ALIAS = {
  Declaration: ["Statement"],
  Pattern: ["PatternLike", "LVal"]
};
placeholders.PLACEHOLDERS_ALIAS = PLACEHOLDERS_ALIAS;
for (const type of PLACEHOLDERS) {
  const alias = _utils$3.ALIAS_KEYS[type];
  if (alias != null && alias.length)
    PLACEHOLDERS_ALIAS[type] = alias;
}
const PLACEHOLDERS_FLIPPED_ALIAS = {};
placeholders.PLACEHOLDERS_FLIPPED_ALIAS = PLACEHOLDERS_FLIPPED_ALIAS;
Object.keys(PLACEHOLDERS_ALIAS).forEach((type) => {
  PLACEHOLDERS_ALIAS[type].forEach((alias) => {
    if (!Object.hasOwnProperty.call(PLACEHOLDERS_FLIPPED_ALIAS, alias)) {
      PLACEHOLDERS_FLIPPED_ALIAS[alias] = [];
    }
    PLACEHOLDERS_FLIPPED_ALIAS[alias].push(type);
  });
});
var _utils$2 = utils;
var _placeholders = placeholders;
const defineType$1 = (0, _utils$2.defineAliasedType)("Miscellaneous");
{
  defineType$1("Noop", {
    visitor: []
  });
}
defineType$1("Placeholder", {
  visitor: [],
  builder: ["expectedNode", "name"],
  fields: {
    name: {
      validate: (0, _utils$2.assertNodeType)("Identifier")
    },
    expectedNode: {
      validate: (0, _utils$2.assertOneOf)(..._placeholders.PLACEHOLDERS)
    }
  }
});
defineType$1("V8IntrinsicIdentifier", {
  builder: ["name"],
  fields: {
    name: {
      validate: (0, _utils$2.assertValueType)("string")
    }
  }
});
var _utils$1 = utils;
(0, _utils$1.default)("ArgumentPlaceholder", {});
(0, _utils$1.default)("BindExpression", {
  visitor: ["object", "callee"],
  aliases: ["Expression"],
  fields: !{}.BABEL_TYPES_8_BREAKING ? {
    object: {
      validate: Object.assign(() => {
      }, {
        oneOfNodeTypes: ["Expression"]
      })
    },
    callee: {
      validate: Object.assign(() => {
      }, {
        oneOfNodeTypes: ["Expression"]
      })
    }
  } : {
    object: {
      validate: (0, _utils$1.assertNodeType)("Expression")
    },
    callee: {
      validate: (0, _utils$1.assertNodeType)("Expression")
    }
  }
});
(0, _utils$1.default)("ImportAttribute", {
  visitor: ["key", "value"],
  fields: {
    key: {
      validate: (0, _utils$1.assertNodeType)("Identifier", "StringLiteral")
    },
    value: {
      validate: (0, _utils$1.assertNodeType)("StringLiteral")
    }
  }
});
(0, _utils$1.default)("Decorator", {
  visitor: ["expression"],
  fields: {
    expression: {
      validate: (0, _utils$1.assertNodeType)("Expression")
    }
  }
});
(0, _utils$1.default)("DoExpression", {
  visitor: ["body"],
  builder: ["body", "async"],
  aliases: ["Expression"],
  fields: {
    body: {
      validate: (0, _utils$1.assertNodeType)("BlockStatement")
    },
    async: {
      validate: (0, _utils$1.assertValueType)("boolean"),
      default: false
    }
  }
});
(0, _utils$1.default)("ExportDefaultSpecifier", {
  visitor: ["exported"],
  aliases: ["ModuleSpecifier"],
  fields: {
    exported: {
      validate: (0, _utils$1.assertNodeType)("Identifier")
    }
  }
});
(0, _utils$1.default)("RecordExpression", {
  visitor: ["properties"],
  aliases: ["Expression"],
  fields: {
    properties: {
      validate: (0, _utils$1.chain)((0, _utils$1.assertValueType)("array"), (0, _utils$1.assertEach)((0, _utils$1.assertNodeType)("ObjectProperty", "SpreadElement")))
    }
  }
});
(0, _utils$1.default)("TupleExpression", {
  fields: {
    elements: {
      validate: (0, _utils$1.chain)((0, _utils$1.assertValueType)("array"), (0, _utils$1.assertEach)((0, _utils$1.assertNodeType)("Expression", "SpreadElement"))),
      default: []
    }
  },
  visitor: ["elements"],
  aliases: ["Expression"]
});
(0, _utils$1.default)("DecimalLiteral", {
  builder: ["value"],
  fields: {
    value: {
      validate: (0, _utils$1.assertValueType)("string")
    }
  },
  aliases: ["Expression", "Pureish", "Literal", "Immutable"]
});
(0, _utils$1.default)("ModuleExpression", {
  visitor: ["body"],
  fields: {
    body: {
      validate: (0, _utils$1.assertNodeType)("Program")
    }
  },
  aliases: ["Expression"]
});
(0, _utils$1.default)("TopicReference", {
  aliases: ["Expression"]
});
(0, _utils$1.default)("PipelineTopicExpression", {
  builder: ["expression"],
  visitor: ["expression"],
  fields: {
    expression: {
      validate: (0, _utils$1.assertNodeType)("Expression")
    }
  },
  aliases: ["Expression"]
});
(0, _utils$1.default)("PipelineBareFunction", {
  builder: ["callee"],
  visitor: ["callee"],
  fields: {
    callee: {
      validate: (0, _utils$1.assertNodeType)("Expression")
    }
  },
  aliases: ["Expression"]
});
(0, _utils$1.default)("PipelinePrimaryTopicReference", {
  aliases: ["Expression"]
});
var _utils = utils;
var _core = core;
var _is$1 = is$1;
const defineType = (0, _utils.defineAliasedType)("TypeScript");
const bool = (0, _utils.assertValueType)("boolean");
const tSFunctionTypeAnnotationCommon = {
  returnType: {
    validate: (0, _utils.assertNodeType)("TSTypeAnnotation", "Noop"),
    optional: true
  },
  typeParameters: {
    validate: (0, _utils.assertNodeType)("TSTypeParameterDeclaration", "Noop"),
    optional: true
  }
};
defineType("TSParameterProperty", {
  aliases: ["LVal"],
  visitor: ["parameter"],
  fields: {
    accessibility: {
      validate: (0, _utils.assertOneOf)("public", "private", "protected"),
      optional: true
    },
    readonly: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    parameter: {
      validate: (0, _utils.assertNodeType)("Identifier", "AssignmentPattern")
    },
    override: {
      validate: (0, _utils.assertValueType)("boolean"),
      optional: true
    },
    decorators: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("Decorator"))),
      optional: true
    }
  }
});
defineType("TSDeclareFunction", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "typeParameters", "params", "returnType"],
  fields: Object.assign({}, _core.functionDeclarationCommon, tSFunctionTypeAnnotationCommon)
});
defineType("TSDeclareMethod", {
  visitor: ["decorators", "key", "typeParameters", "params", "returnType"],
  fields: Object.assign({}, _core.classMethodOrDeclareMethodCommon, tSFunctionTypeAnnotationCommon)
});
defineType("TSQualifiedName", {
  aliases: ["TSEntityName"],
  visitor: ["left", "right"],
  fields: {
    left: (0, _utils.validateType)("TSEntityName"),
    right: (0, _utils.validateType)("Identifier")
  }
});
const signatureDeclarationCommon = {
  typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
  ["parameters"]: (0, _utils.validateArrayOfType)(["Identifier", "RestElement"]),
  ["typeAnnotation"]: (0, _utils.validateOptionalType)("TSTypeAnnotation")
};
const callConstructSignatureDeclaration = {
  aliases: ["TSTypeElement"],
  visitor: ["typeParameters", "parameters", "typeAnnotation"],
  fields: signatureDeclarationCommon
};
defineType("TSCallSignatureDeclaration", callConstructSignatureDeclaration);
defineType("TSConstructSignatureDeclaration", callConstructSignatureDeclaration);
const namedTypeElementCommon = {
  key: (0, _utils.validateType)("Expression"),
  computed: (0, _utils.validate)(bool),
  optional: (0, _utils.validateOptional)(bool)
};
defineType("TSPropertySignature", {
  aliases: ["TSTypeElement"],
  visitor: ["key", "typeAnnotation", "initializer"],
  fields: Object.assign({}, namedTypeElementCommon, {
    readonly: (0, _utils.validateOptional)(bool),
    typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
    initializer: (0, _utils.validateOptionalType)("Expression"),
    kind: {
      validate: (0, _utils.assertOneOf)("get", "set")
    }
  })
});
defineType("TSMethodSignature", {
  aliases: ["TSTypeElement"],
  visitor: ["key", "typeParameters", "parameters", "typeAnnotation"],
  fields: Object.assign({}, signatureDeclarationCommon, namedTypeElementCommon, {
    kind: {
      validate: (0, _utils.assertOneOf)("method", "get", "set")
    }
  })
});
defineType("TSIndexSignature", {
  aliases: ["TSTypeElement"],
  visitor: ["parameters", "typeAnnotation"],
  fields: {
    readonly: (0, _utils.validateOptional)(bool),
    static: (0, _utils.validateOptional)(bool),
    parameters: (0, _utils.validateArrayOfType)("Identifier"),
    typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation")
  }
});
const tsKeywordTypes = ["TSAnyKeyword", "TSBooleanKeyword", "TSBigIntKeyword", "TSIntrinsicKeyword", "TSNeverKeyword", "TSNullKeyword", "TSNumberKeyword", "TSObjectKeyword", "TSStringKeyword", "TSSymbolKeyword", "TSUndefinedKeyword", "TSUnknownKeyword", "TSVoidKeyword"];
for (const type of tsKeywordTypes) {
  defineType(type, {
    aliases: ["TSType", "TSBaseType"],
    visitor: [],
    fields: {}
  });
}
defineType("TSThisType", {
  aliases: ["TSType", "TSBaseType"],
  visitor: [],
  fields: {}
});
const fnOrCtrBase = {
  aliases: ["TSType"],
  visitor: ["typeParameters", "parameters", "typeAnnotation"]
};
defineType("TSFunctionType", Object.assign({}, fnOrCtrBase, {
  fields: signatureDeclarationCommon
}));
defineType("TSConstructorType", Object.assign({}, fnOrCtrBase, {
  fields: Object.assign({}, signatureDeclarationCommon, {
    abstract: (0, _utils.validateOptional)(bool)
  })
}));
defineType("TSTypeReference", {
  aliases: ["TSType"],
  visitor: ["typeName", "typeParameters"],
  fields: {
    typeName: (0, _utils.validateType)("TSEntityName"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
  }
});
defineType("TSTypePredicate", {
  aliases: ["TSType"],
  visitor: ["parameterName", "typeAnnotation"],
  builder: ["parameterName", "typeAnnotation", "asserts"],
  fields: {
    parameterName: (0, _utils.validateType)(["Identifier", "TSThisType"]),
    typeAnnotation: (0, _utils.validateOptionalType)("TSTypeAnnotation"),
    asserts: (0, _utils.validateOptional)(bool)
  }
});
defineType("TSTypeQuery", {
  aliases: ["TSType"],
  visitor: ["exprName"],
  fields: {
    exprName: (0, _utils.validateType)(["TSEntityName", "TSImportType"])
  }
});
defineType("TSTypeLiteral", {
  aliases: ["TSType"],
  visitor: ["members"],
  fields: {
    members: (0, _utils.validateArrayOfType)("TSTypeElement")
  }
});
defineType("TSArrayType", {
  aliases: ["TSType"],
  visitor: ["elementType"],
  fields: {
    elementType: (0, _utils.validateType)("TSType")
  }
});
defineType("TSTupleType", {
  aliases: ["TSType"],
  visitor: ["elementTypes"],
  fields: {
    elementTypes: (0, _utils.validateArrayOfType)(["TSType", "TSNamedTupleMember"])
  }
});
defineType("TSOptionalType", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSRestType", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSNamedTupleMember", {
  visitor: ["label", "elementType"],
  builder: ["label", "elementType", "optional"],
  fields: {
    label: (0, _utils.validateType)("Identifier"),
    optional: {
      validate: bool,
      default: false
    },
    elementType: (0, _utils.validateType)("TSType")
  }
});
const unionOrIntersection = {
  aliases: ["TSType"],
  visitor: ["types"],
  fields: {
    types: (0, _utils.validateArrayOfType)("TSType")
  }
};
defineType("TSUnionType", unionOrIntersection);
defineType("TSIntersectionType", unionOrIntersection);
defineType("TSConditionalType", {
  aliases: ["TSType"],
  visitor: ["checkType", "extendsType", "trueType", "falseType"],
  fields: {
    checkType: (0, _utils.validateType)("TSType"),
    extendsType: (0, _utils.validateType)("TSType"),
    trueType: (0, _utils.validateType)("TSType"),
    falseType: (0, _utils.validateType)("TSType")
  }
});
defineType("TSInferType", {
  aliases: ["TSType"],
  visitor: ["typeParameter"],
  fields: {
    typeParameter: (0, _utils.validateType)("TSTypeParameter")
  }
});
defineType("TSParenthesizedType", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSTypeOperator", {
  aliases: ["TSType"],
  visitor: ["typeAnnotation"],
  fields: {
    operator: (0, _utils.validate)((0, _utils.assertValueType)("string")),
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSIndexedAccessType", {
  aliases: ["TSType"],
  visitor: ["objectType", "indexType"],
  fields: {
    objectType: (0, _utils.validateType)("TSType"),
    indexType: (0, _utils.validateType)("TSType")
  }
});
defineType("TSMappedType", {
  aliases: ["TSType"],
  visitor: ["typeParameter", "typeAnnotation", "nameType"],
  fields: {
    readonly: (0, _utils.validateOptional)(bool),
    typeParameter: (0, _utils.validateType)("TSTypeParameter"),
    optional: (0, _utils.validateOptional)(bool),
    typeAnnotation: (0, _utils.validateOptionalType)("TSType"),
    nameType: (0, _utils.validateOptionalType)("TSType")
  }
});
defineType("TSLiteralType", {
  aliases: ["TSType", "TSBaseType"],
  visitor: ["literal"],
  fields: {
    literal: {
      validate: function() {
        const unaryExpression2 = (0, _utils.assertNodeType)("NumericLiteral", "BigIntLiteral");
        const unaryOperator = (0, _utils.assertOneOf)("-");
        const literal = (0, _utils.assertNodeType)("NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral");
        function validator(parent, key, node) {
          if ((0, _is$1.default)("UnaryExpression", node)) {
            unaryOperator(node, "operator", node.operator);
            unaryExpression2(node, "argument", node.argument);
          } else {
            literal(parent, key, node);
          }
        }
        validator.oneOfNodeTypes = ["NumericLiteral", "StringLiteral", "BooleanLiteral", "BigIntLiteral", "UnaryExpression"];
        return validator;
      }()
    }
  }
});
defineType("TSExpressionWithTypeArguments", {
  aliases: ["TSType"],
  visitor: ["expression", "typeParameters"],
  fields: {
    expression: (0, _utils.validateType)("TSEntityName"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
  }
});
defineType("TSInterfaceDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "typeParameters", "extends", "body"],
  fields: {
    declare: (0, _utils.validateOptional)(bool),
    id: (0, _utils.validateType)("Identifier"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
    extends: (0, _utils.validateOptional)((0, _utils.arrayOfType)("TSExpressionWithTypeArguments")),
    body: (0, _utils.validateType)("TSInterfaceBody")
  }
});
defineType("TSInterfaceBody", {
  visitor: ["body"],
  fields: {
    body: (0, _utils.validateArrayOfType)("TSTypeElement")
  }
});
defineType("TSTypeAliasDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "typeParameters", "typeAnnotation"],
  fields: {
    declare: (0, _utils.validateOptional)(bool),
    id: (0, _utils.validateType)("Identifier"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterDeclaration"),
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSAsExpression", {
  aliases: ["Expression"],
  visitor: ["expression", "typeAnnotation"],
  fields: {
    expression: (0, _utils.validateType)("Expression"),
    typeAnnotation: (0, _utils.validateType)("TSType")
  }
});
defineType("TSTypeAssertion", {
  aliases: ["Expression"],
  visitor: ["typeAnnotation", "expression"],
  fields: {
    typeAnnotation: (0, _utils.validateType)("TSType"),
    expression: (0, _utils.validateType)("Expression")
  }
});
defineType("TSEnumDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "members"],
  fields: {
    declare: (0, _utils.validateOptional)(bool),
    const: (0, _utils.validateOptional)(bool),
    id: (0, _utils.validateType)("Identifier"),
    members: (0, _utils.validateArrayOfType)("TSEnumMember"),
    initializer: (0, _utils.validateOptionalType)("Expression")
  }
});
defineType("TSEnumMember", {
  visitor: ["id", "initializer"],
  fields: {
    id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
    initializer: (0, _utils.validateOptionalType)("Expression")
  }
});
defineType("TSModuleDeclaration", {
  aliases: ["Statement", "Declaration"],
  visitor: ["id", "body"],
  fields: {
    declare: (0, _utils.validateOptional)(bool),
    global: (0, _utils.validateOptional)(bool),
    id: (0, _utils.validateType)(["Identifier", "StringLiteral"]),
    body: (0, _utils.validateType)(["TSModuleBlock", "TSModuleDeclaration"])
  }
});
defineType("TSModuleBlock", {
  aliases: ["Scopable", "Block", "BlockParent"],
  visitor: ["body"],
  fields: {
    body: (0, _utils.validateArrayOfType)("Statement")
  }
});
defineType("TSImportType", {
  aliases: ["TSType"],
  visitor: ["argument", "qualifier", "typeParameters"],
  fields: {
    argument: (0, _utils.validateType)("StringLiteral"),
    qualifier: (0, _utils.validateOptionalType)("TSEntityName"),
    typeParameters: (0, _utils.validateOptionalType)("TSTypeParameterInstantiation")
  }
});
defineType("TSImportEqualsDeclaration", {
  aliases: ["Statement"],
  visitor: ["id", "moduleReference"],
  fields: {
    isExport: (0, _utils.validate)(bool),
    id: (0, _utils.validateType)("Identifier"),
    moduleReference: (0, _utils.validateType)(["TSEntityName", "TSExternalModuleReference"]),
    importKind: {
      validate: (0, _utils.assertOneOf)("type", "value"),
      optional: true
    }
  }
});
defineType("TSExternalModuleReference", {
  visitor: ["expression"],
  fields: {
    expression: (0, _utils.validateType)("StringLiteral")
  }
});
defineType("TSNonNullExpression", {
  aliases: ["Expression"],
  visitor: ["expression"],
  fields: {
    expression: (0, _utils.validateType)("Expression")
  }
});
defineType("TSExportAssignment", {
  aliases: ["Statement"],
  visitor: ["expression"],
  fields: {
    expression: (0, _utils.validateType)("Expression")
  }
});
defineType("TSNamespaceExportDeclaration", {
  aliases: ["Statement"],
  visitor: ["id"],
  fields: {
    id: (0, _utils.validateType)("Identifier")
  }
});
defineType("TSTypeAnnotation", {
  visitor: ["typeAnnotation"],
  fields: {
    typeAnnotation: {
      validate: (0, _utils.assertNodeType)("TSType")
    }
  }
});
defineType("TSTypeParameterInstantiation", {
  visitor: ["params"],
  fields: {
    params: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSType")))
    }
  }
});
defineType("TSTypeParameterDeclaration", {
  visitor: ["params"],
  fields: {
    params: {
      validate: (0, _utils.chain)((0, _utils.assertValueType)("array"), (0, _utils.assertEach)((0, _utils.assertNodeType)("TSTypeParameter")))
    }
  }
});
defineType("TSTypeParameter", {
  builder: ["constraint", "default", "name"],
  visitor: ["constraint", "default"],
  fields: {
    name: {
      validate: (0, _utils.assertValueType)("string")
    },
    constraint: {
      validate: (0, _utils.assertNodeType)("TSType"),
      optional: true
    },
    default: {
      validate: (0, _utils.assertNodeType)("TSType"),
      optional: true
    }
  }
});
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  Object.defineProperty(exports2, "ALIAS_KEYS", {
    enumerable: true,
    get: function() {
      return _utils2.ALIAS_KEYS;
    }
  });
  Object.defineProperty(exports2, "BUILDER_KEYS", {
    enumerable: true,
    get: function() {
      return _utils2.BUILDER_KEYS;
    }
  });
  Object.defineProperty(exports2, "DEPRECATED_KEYS", {
    enumerable: true,
    get: function() {
      return _utils2.DEPRECATED_KEYS;
    }
  });
  Object.defineProperty(exports2, "FLIPPED_ALIAS_KEYS", {
    enumerable: true,
    get: function() {
      return _utils2.FLIPPED_ALIAS_KEYS;
    }
  });
  Object.defineProperty(exports2, "NODE_FIELDS", {
    enumerable: true,
    get: function() {
      return _utils2.NODE_FIELDS;
    }
  });
  Object.defineProperty(exports2, "NODE_PARENT_VALIDATIONS", {
    enumerable: true,
    get: function() {
      return _utils2.NODE_PARENT_VALIDATIONS;
    }
  });
  Object.defineProperty(exports2, "PLACEHOLDERS", {
    enumerable: true,
    get: function() {
      return _placeholders2.PLACEHOLDERS;
    }
  });
  Object.defineProperty(exports2, "PLACEHOLDERS_ALIAS", {
    enumerable: true,
    get: function() {
      return _placeholders2.PLACEHOLDERS_ALIAS;
    }
  });
  Object.defineProperty(exports2, "PLACEHOLDERS_FLIPPED_ALIAS", {
    enumerable: true,
    get: function() {
      return _placeholders2.PLACEHOLDERS_FLIPPED_ALIAS;
    }
  });
  exports2.TYPES = void 0;
  Object.defineProperty(exports2, "VISITOR_KEYS", {
    enumerable: true,
    get: function() {
      return _utils2.VISITOR_KEYS;
    }
  });
  var _toFastProperties = toFastProperties;
  var _utils2 = utils;
  var _placeholders2 = placeholders;
  _toFastProperties(_utils2.VISITOR_KEYS);
  _toFastProperties(_utils2.ALIAS_KEYS);
  _toFastProperties(_utils2.FLIPPED_ALIAS_KEYS);
  _toFastProperties(_utils2.NODE_FIELDS);
  _toFastProperties(_utils2.BUILDER_KEYS);
  _toFastProperties(_utils2.DEPRECATED_KEYS);
  _toFastProperties(_placeholders2.PLACEHOLDERS_ALIAS);
  _toFastProperties(_placeholders2.PLACEHOLDERS_FLIPPED_ALIAS);
  const TYPES = [].concat(Object.keys(_utils2.VISITOR_KEYS), Object.keys(_utils2.FLIPPED_ALIAS_KEYS), Object.keys(_utils2.DEPRECATED_KEYS));
  exports2.TYPES = TYPES;
})(definitions);
Object.defineProperty(builder$1, "__esModule", {
  value: true
});
builder$1.default = builder;
var _definitions$6 = definitions;
var _validate = validate$2;
function builder() {
  const type = this;
  const keys = _definitions$6.BUILDER_KEYS[type];
  const countArgs = arguments.length;
  if (countArgs > keys.length) {
    throw new Error(`${type}: Too many arguments passed. Received ${countArgs} but can receive no more than ${keys.length}`);
  }
  const node = {
    type
  };
  for (let i2 = 0; i2 < keys.length; ++i2) {
    const key = keys[i2];
    const field = _definitions$6.NODE_FIELDS[type][key];
    let arg;
    if (i2 < countArgs)
      arg = arguments[i2];
    if (arg === void 0) {
      arg = Array.isArray(field.default) ? [] : field.default;
    }
    node[key] = arg;
  }
  for (const key in node) {
    (0, _validate.default)(node, key, node[key]);
  }
  return node;
}
Object.defineProperty(generated$3, "__esModule", {
  value: true
});
generated$3.anyTypeAnnotation = anyTypeAnnotation;
generated$3.argumentPlaceholder = argumentPlaceholder;
generated$3.arrayExpression = arrayExpression;
generated$3.arrayPattern = arrayPattern;
generated$3.arrayTypeAnnotation = arrayTypeAnnotation;
generated$3.arrowFunctionExpression = arrowFunctionExpression;
generated$3.assignmentExpression = assignmentExpression;
generated$3.assignmentPattern = assignmentPattern;
generated$3.awaitExpression = awaitExpression;
generated$3.bigIntLiteral = bigIntLiteral;
generated$3.binaryExpression = binaryExpression;
generated$3.bindExpression = bindExpression;
generated$3.blockStatement = blockStatement;
generated$3.booleanLiteral = booleanLiteral;
generated$3.booleanLiteralTypeAnnotation = booleanLiteralTypeAnnotation;
generated$3.booleanTypeAnnotation = booleanTypeAnnotation;
generated$3.breakStatement = breakStatement;
generated$3.callExpression = callExpression;
generated$3.catchClause = catchClause;
generated$3.classAccessorProperty = classAccessorProperty;
generated$3.classBody = classBody;
generated$3.classDeclaration = classDeclaration;
generated$3.classExpression = classExpression;
generated$3.classImplements = classImplements;
generated$3.classMethod = classMethod;
generated$3.classPrivateMethod = classPrivateMethod;
generated$3.classPrivateProperty = classPrivateProperty;
generated$3.classProperty = classProperty;
generated$3.conditionalExpression = conditionalExpression;
generated$3.continueStatement = continueStatement;
generated$3.debuggerStatement = debuggerStatement;
generated$3.decimalLiteral = decimalLiteral;
generated$3.declareClass = declareClass;
generated$3.declareExportAllDeclaration = declareExportAllDeclaration;
generated$3.declareExportDeclaration = declareExportDeclaration;
generated$3.declareFunction = declareFunction;
generated$3.declareInterface = declareInterface;
generated$3.declareModule = declareModule;
generated$3.declareModuleExports = declareModuleExports;
generated$3.declareOpaqueType = declareOpaqueType;
generated$3.declareTypeAlias = declareTypeAlias;
generated$3.declareVariable = declareVariable;
generated$3.declaredPredicate = declaredPredicate;
generated$3.decorator = decorator;
generated$3.directive = directive;
generated$3.directiveLiteral = directiveLiteral;
generated$3.doExpression = doExpression;
generated$3.doWhileStatement = doWhileStatement;
generated$3.emptyStatement = emptyStatement;
generated$3.emptyTypeAnnotation = emptyTypeAnnotation;
generated$3.enumBooleanBody = enumBooleanBody;
generated$3.enumBooleanMember = enumBooleanMember;
generated$3.enumDeclaration = enumDeclaration;
generated$3.enumDefaultedMember = enumDefaultedMember;
generated$3.enumNumberBody = enumNumberBody;
generated$3.enumNumberMember = enumNumberMember;
generated$3.enumStringBody = enumStringBody;
generated$3.enumStringMember = enumStringMember;
generated$3.enumSymbolBody = enumSymbolBody;
generated$3.existsTypeAnnotation = existsTypeAnnotation;
generated$3.exportAllDeclaration = exportAllDeclaration;
generated$3.exportDefaultDeclaration = exportDefaultDeclaration;
generated$3.exportDefaultSpecifier = exportDefaultSpecifier;
generated$3.exportNamedDeclaration = exportNamedDeclaration;
generated$3.exportNamespaceSpecifier = exportNamespaceSpecifier;
generated$3.exportSpecifier = exportSpecifier;
generated$3.expressionStatement = expressionStatement;
generated$3.file = file;
generated$3.forInStatement = forInStatement;
generated$3.forOfStatement = forOfStatement;
generated$3.forStatement = forStatement;
generated$3.functionDeclaration = functionDeclaration;
generated$3.functionExpression = functionExpression;
generated$3.functionTypeAnnotation = functionTypeAnnotation;
generated$3.functionTypeParam = functionTypeParam;
generated$3.genericTypeAnnotation = genericTypeAnnotation;
generated$3.identifier = identifier;
generated$3.ifStatement = ifStatement;
generated$3.import = _import;
generated$3.importAttribute = importAttribute;
generated$3.importDeclaration = importDeclaration;
generated$3.importDefaultSpecifier = importDefaultSpecifier;
generated$3.importNamespaceSpecifier = importNamespaceSpecifier;
generated$3.importSpecifier = importSpecifier;
generated$3.indexedAccessType = indexedAccessType;
generated$3.inferredPredicate = inferredPredicate;
generated$3.interfaceDeclaration = interfaceDeclaration;
generated$3.interfaceExtends = interfaceExtends;
generated$3.interfaceTypeAnnotation = interfaceTypeAnnotation;
generated$3.interpreterDirective = interpreterDirective;
generated$3.intersectionTypeAnnotation = intersectionTypeAnnotation;
generated$3.jSXAttribute = generated$3.jsxAttribute = jsxAttribute;
generated$3.jSXClosingElement = generated$3.jsxClosingElement = jsxClosingElement;
generated$3.jSXClosingFragment = generated$3.jsxClosingFragment = jsxClosingFragment;
generated$3.jSXElement = generated$3.jsxElement = jsxElement;
generated$3.jSXEmptyExpression = generated$3.jsxEmptyExpression = jsxEmptyExpression;
generated$3.jSXExpressionContainer = generated$3.jsxExpressionContainer = jsxExpressionContainer;
generated$3.jSXFragment = generated$3.jsxFragment = jsxFragment;
generated$3.jSXIdentifier = generated$3.jsxIdentifier = jsxIdentifier;
generated$3.jSXMemberExpression = generated$3.jsxMemberExpression = jsxMemberExpression;
generated$3.jSXNamespacedName = generated$3.jsxNamespacedName = jsxNamespacedName;
generated$3.jSXOpeningElement = generated$3.jsxOpeningElement = jsxOpeningElement;
generated$3.jSXOpeningFragment = generated$3.jsxOpeningFragment = jsxOpeningFragment;
generated$3.jSXSpreadAttribute = generated$3.jsxSpreadAttribute = jsxSpreadAttribute;
generated$3.jSXSpreadChild = generated$3.jsxSpreadChild = jsxSpreadChild;
generated$3.jSXText = generated$3.jsxText = jsxText;
generated$3.labeledStatement = labeledStatement;
generated$3.logicalExpression = logicalExpression;
generated$3.memberExpression = memberExpression;
generated$3.metaProperty = metaProperty;
generated$3.mixedTypeAnnotation = mixedTypeAnnotation;
generated$3.moduleExpression = moduleExpression;
generated$3.newExpression = newExpression;
generated$3.noop = noop;
generated$3.nullLiteral = nullLiteral;
generated$3.nullLiteralTypeAnnotation = nullLiteralTypeAnnotation;
generated$3.nullableTypeAnnotation = nullableTypeAnnotation;
generated$3.numberLiteral = NumberLiteral;
generated$3.numberLiteralTypeAnnotation = numberLiteralTypeAnnotation;
generated$3.numberTypeAnnotation = numberTypeAnnotation;
generated$3.numericLiteral = numericLiteral;
generated$3.objectExpression = objectExpression;
generated$3.objectMethod = objectMethod;
generated$3.objectPattern = objectPattern;
generated$3.objectProperty = objectProperty;
generated$3.objectTypeAnnotation = objectTypeAnnotation;
generated$3.objectTypeCallProperty = objectTypeCallProperty;
generated$3.objectTypeIndexer = objectTypeIndexer;
generated$3.objectTypeInternalSlot = objectTypeInternalSlot;
generated$3.objectTypeProperty = objectTypeProperty;
generated$3.objectTypeSpreadProperty = objectTypeSpreadProperty;
generated$3.opaqueType = opaqueType;
generated$3.optionalCallExpression = optionalCallExpression;
generated$3.optionalIndexedAccessType = optionalIndexedAccessType;
generated$3.optionalMemberExpression = optionalMemberExpression;
generated$3.parenthesizedExpression = parenthesizedExpression;
generated$3.pipelineBareFunction = pipelineBareFunction;
generated$3.pipelinePrimaryTopicReference = pipelinePrimaryTopicReference;
generated$3.pipelineTopicExpression = pipelineTopicExpression;
generated$3.placeholder = placeholder;
generated$3.privateName = privateName;
generated$3.program = program;
generated$3.qualifiedTypeIdentifier = qualifiedTypeIdentifier;
generated$3.recordExpression = recordExpression;
generated$3.regExpLiteral = regExpLiteral;
generated$3.regexLiteral = RegexLiteral;
generated$3.restElement = restElement;
generated$3.restProperty = RestProperty;
generated$3.returnStatement = returnStatement;
generated$3.sequenceExpression = sequenceExpression;
generated$3.spreadElement = spreadElement;
generated$3.spreadProperty = SpreadProperty;
generated$3.staticBlock = staticBlock;
generated$3.stringLiteral = stringLiteral;
generated$3.stringLiteralTypeAnnotation = stringLiteralTypeAnnotation;
generated$3.stringTypeAnnotation = stringTypeAnnotation;
generated$3.super = _super;
generated$3.switchCase = switchCase;
generated$3.switchStatement = switchStatement;
generated$3.symbolTypeAnnotation = symbolTypeAnnotation;
generated$3.taggedTemplateExpression = taggedTemplateExpression;
generated$3.templateElement = templateElement;
generated$3.templateLiteral = templateLiteral;
generated$3.thisExpression = thisExpression;
generated$3.thisTypeAnnotation = thisTypeAnnotation;
generated$3.throwStatement = throwStatement;
generated$3.topicReference = topicReference;
generated$3.tryStatement = tryStatement;
generated$3.tSAnyKeyword = generated$3.tsAnyKeyword = tsAnyKeyword;
generated$3.tSArrayType = generated$3.tsArrayType = tsArrayType;
generated$3.tSAsExpression = generated$3.tsAsExpression = tsAsExpression;
generated$3.tSBigIntKeyword = generated$3.tsBigIntKeyword = tsBigIntKeyword;
generated$3.tSBooleanKeyword = generated$3.tsBooleanKeyword = tsBooleanKeyword;
generated$3.tSCallSignatureDeclaration = generated$3.tsCallSignatureDeclaration = tsCallSignatureDeclaration;
generated$3.tSConditionalType = generated$3.tsConditionalType = tsConditionalType;
generated$3.tSConstructSignatureDeclaration = generated$3.tsConstructSignatureDeclaration = tsConstructSignatureDeclaration;
generated$3.tSConstructorType = generated$3.tsConstructorType = tsConstructorType;
generated$3.tSDeclareFunction = generated$3.tsDeclareFunction = tsDeclareFunction;
generated$3.tSDeclareMethod = generated$3.tsDeclareMethod = tsDeclareMethod;
generated$3.tSEnumDeclaration = generated$3.tsEnumDeclaration = tsEnumDeclaration;
generated$3.tSEnumMember = generated$3.tsEnumMember = tsEnumMember;
generated$3.tSExportAssignment = generated$3.tsExportAssignment = tsExportAssignment;
generated$3.tSExpressionWithTypeArguments = generated$3.tsExpressionWithTypeArguments = tsExpressionWithTypeArguments;
generated$3.tSExternalModuleReference = generated$3.tsExternalModuleReference = tsExternalModuleReference;
generated$3.tSFunctionType = generated$3.tsFunctionType = tsFunctionType;
generated$3.tSImportEqualsDeclaration = generated$3.tsImportEqualsDeclaration = tsImportEqualsDeclaration;
generated$3.tSImportType = generated$3.tsImportType = tsImportType;
generated$3.tSIndexSignature = generated$3.tsIndexSignature = tsIndexSignature;
generated$3.tSIndexedAccessType = generated$3.tsIndexedAccessType = tsIndexedAccessType;
generated$3.tSInferType = generated$3.tsInferType = tsInferType;
generated$3.tSInterfaceBody = generated$3.tsInterfaceBody = tsInterfaceBody;
generated$3.tSInterfaceDeclaration = generated$3.tsInterfaceDeclaration = tsInterfaceDeclaration;
generated$3.tSIntersectionType = generated$3.tsIntersectionType = tsIntersectionType;
generated$3.tSIntrinsicKeyword = generated$3.tsIntrinsicKeyword = tsIntrinsicKeyword;
generated$3.tSLiteralType = generated$3.tsLiteralType = tsLiteralType;
generated$3.tSMappedType = generated$3.tsMappedType = tsMappedType;
generated$3.tSMethodSignature = generated$3.tsMethodSignature = tsMethodSignature;
generated$3.tSModuleBlock = generated$3.tsModuleBlock = tsModuleBlock;
generated$3.tSModuleDeclaration = generated$3.tsModuleDeclaration = tsModuleDeclaration;
generated$3.tSNamedTupleMember = generated$3.tsNamedTupleMember = tsNamedTupleMember;
generated$3.tSNamespaceExportDeclaration = generated$3.tsNamespaceExportDeclaration = tsNamespaceExportDeclaration;
generated$3.tSNeverKeyword = generated$3.tsNeverKeyword = tsNeverKeyword;
generated$3.tSNonNullExpression = generated$3.tsNonNullExpression = tsNonNullExpression;
generated$3.tSNullKeyword = generated$3.tsNullKeyword = tsNullKeyword;
generated$3.tSNumberKeyword = generated$3.tsNumberKeyword = tsNumberKeyword;
generated$3.tSObjectKeyword = generated$3.tsObjectKeyword = tsObjectKeyword;
generated$3.tSOptionalType = generated$3.tsOptionalType = tsOptionalType;
generated$3.tSParameterProperty = generated$3.tsParameterProperty = tsParameterProperty;
generated$3.tSParenthesizedType = generated$3.tsParenthesizedType = tsParenthesizedType;
generated$3.tSPropertySignature = generated$3.tsPropertySignature = tsPropertySignature;
generated$3.tSQualifiedName = generated$3.tsQualifiedName = tsQualifiedName;
generated$3.tSRestType = generated$3.tsRestType = tsRestType;
generated$3.tSStringKeyword = generated$3.tsStringKeyword = tsStringKeyword;
generated$3.tSSymbolKeyword = generated$3.tsSymbolKeyword = tsSymbolKeyword;
generated$3.tSThisType = generated$3.tsThisType = tsThisType;
generated$3.tSTupleType = generated$3.tsTupleType = tsTupleType;
generated$3.tSTypeAliasDeclaration = generated$3.tsTypeAliasDeclaration = tsTypeAliasDeclaration;
generated$3.tSTypeAnnotation = generated$3.tsTypeAnnotation = tsTypeAnnotation;
generated$3.tSTypeAssertion = generated$3.tsTypeAssertion = tsTypeAssertion;
generated$3.tSTypeLiteral = generated$3.tsTypeLiteral = tsTypeLiteral;
generated$3.tSTypeOperator = generated$3.tsTypeOperator = tsTypeOperator;
generated$3.tSTypeParameter = generated$3.tsTypeParameter = tsTypeParameter;
generated$3.tSTypeParameterDeclaration = generated$3.tsTypeParameterDeclaration = tsTypeParameterDeclaration;
generated$3.tSTypeParameterInstantiation = generated$3.tsTypeParameterInstantiation = tsTypeParameterInstantiation;
generated$3.tSTypePredicate = generated$3.tsTypePredicate = tsTypePredicate;
generated$3.tSTypeQuery = generated$3.tsTypeQuery = tsTypeQuery;
generated$3.tSTypeReference = generated$3.tsTypeReference = tsTypeReference;
generated$3.tSUndefinedKeyword = generated$3.tsUndefinedKeyword = tsUndefinedKeyword;
generated$3.tSUnionType = generated$3.tsUnionType = tsUnionType;
generated$3.tSUnknownKeyword = generated$3.tsUnknownKeyword = tsUnknownKeyword;
generated$3.tSVoidKeyword = generated$3.tsVoidKeyword = tsVoidKeyword;
generated$3.tupleExpression = tupleExpression;
generated$3.tupleTypeAnnotation = tupleTypeAnnotation;
generated$3.typeAlias = typeAlias;
generated$3.typeAnnotation = typeAnnotation;
generated$3.typeCastExpression = typeCastExpression;
generated$3.typeParameter = typeParameter;
generated$3.typeParameterDeclaration = typeParameterDeclaration;
generated$3.typeParameterInstantiation = typeParameterInstantiation;
generated$3.typeofTypeAnnotation = typeofTypeAnnotation;
generated$3.unaryExpression = unaryExpression;
generated$3.unionTypeAnnotation = unionTypeAnnotation;
generated$3.updateExpression = updateExpression;
generated$3.v8IntrinsicIdentifier = v8IntrinsicIdentifier;
generated$3.variableDeclaration = variableDeclaration;
generated$3.variableDeclarator = variableDeclarator;
generated$3.variance = variance;
generated$3.voidTypeAnnotation = voidTypeAnnotation;
generated$3.whileStatement = whileStatement;
generated$3.withStatement = withStatement;
generated$3.yieldExpression = yieldExpression;
var _builder = builder$1;
function arrayExpression(elements) {
  return _builder.default.apply("ArrayExpression", arguments);
}
function assignmentExpression(operator, left, right) {
  return _builder.default.apply("AssignmentExpression", arguments);
}
function binaryExpression(operator, left, right) {
  return _builder.default.apply("BinaryExpression", arguments);
}
function interpreterDirective(value) {
  return _builder.default.apply("InterpreterDirective", arguments);
}
function directive(value) {
  return _builder.default.apply("Directive", arguments);
}
function directiveLiteral(value) {
  return _builder.default.apply("DirectiveLiteral", arguments);
}
function blockStatement(body, directives) {
  return _builder.default.apply("BlockStatement", arguments);
}
function breakStatement(label) {
  return _builder.default.apply("BreakStatement", arguments);
}
function callExpression(callee, _arguments) {
  return _builder.default.apply("CallExpression", arguments);
}
function catchClause(param, body) {
  return _builder.default.apply("CatchClause", arguments);
}
function conditionalExpression(test, consequent, alternate) {
  return _builder.default.apply("ConditionalExpression", arguments);
}
function continueStatement(label) {
  return _builder.default.apply("ContinueStatement", arguments);
}
function debuggerStatement() {
  return _builder.default.apply("DebuggerStatement", arguments);
}
function doWhileStatement(test, body) {
  return _builder.default.apply("DoWhileStatement", arguments);
}
function emptyStatement() {
  return _builder.default.apply("EmptyStatement", arguments);
}
function expressionStatement(expression) {
  return _builder.default.apply("ExpressionStatement", arguments);
}
function file(program2, comments, tokens) {
  return _builder.default.apply("File", arguments);
}
function forInStatement(left, right, body) {
  return _builder.default.apply("ForInStatement", arguments);
}
function forStatement(init, test, update, body) {
  return _builder.default.apply("ForStatement", arguments);
}
function functionDeclaration(id, params, body, generator, async) {
  return _builder.default.apply("FunctionDeclaration", arguments);
}
function functionExpression(id, params, body, generator, async) {
  return _builder.default.apply("FunctionExpression", arguments);
}
function identifier(name) {
  return _builder.default.apply("Identifier", arguments);
}
function ifStatement(test, consequent, alternate) {
  return _builder.default.apply("IfStatement", arguments);
}
function labeledStatement(label, body) {
  return _builder.default.apply("LabeledStatement", arguments);
}
function stringLiteral(value) {
  return _builder.default.apply("StringLiteral", arguments);
}
function numericLiteral(value) {
  return _builder.default.apply("NumericLiteral", arguments);
}
function nullLiteral() {
  return _builder.default.apply("NullLiteral", arguments);
}
function booleanLiteral(value) {
  return _builder.default.apply("BooleanLiteral", arguments);
}
function regExpLiteral(pattern, flags) {
  return _builder.default.apply("RegExpLiteral", arguments);
}
function logicalExpression(operator, left, right) {
  return _builder.default.apply("LogicalExpression", arguments);
}
function memberExpression(object, property, computed2, optional) {
  return _builder.default.apply("MemberExpression", arguments);
}
function newExpression(callee, _arguments) {
  return _builder.default.apply("NewExpression", arguments);
}
function program(body, directives, sourceType, interpreter) {
  return _builder.default.apply("Program", arguments);
}
function objectExpression(properties) {
  return _builder.default.apply("ObjectExpression", arguments);
}
function objectMethod(kind, key, params, body, computed2, generator, async) {
  return _builder.default.apply("ObjectMethod", arguments);
}
function objectProperty(key, value, computed2, shorthand, decorators) {
  return _builder.default.apply("ObjectProperty", arguments);
}
function restElement(argument) {
  return _builder.default.apply("RestElement", arguments);
}
function returnStatement(argument) {
  return _builder.default.apply("ReturnStatement", arguments);
}
function sequenceExpression(expressions) {
  return _builder.default.apply("SequenceExpression", arguments);
}
function parenthesizedExpression(expression) {
  return _builder.default.apply("ParenthesizedExpression", arguments);
}
function switchCase(test, consequent) {
  return _builder.default.apply("SwitchCase", arguments);
}
function switchStatement(discriminant, cases) {
  return _builder.default.apply("SwitchStatement", arguments);
}
function thisExpression() {
  return _builder.default.apply("ThisExpression", arguments);
}
function throwStatement(argument) {
  return _builder.default.apply("ThrowStatement", arguments);
}
function tryStatement(block, handler, finalizer) {
  return _builder.default.apply("TryStatement", arguments);
}
function unaryExpression(operator, argument, prefix) {
  return _builder.default.apply("UnaryExpression", arguments);
}
function updateExpression(operator, argument, prefix) {
  return _builder.default.apply("UpdateExpression", arguments);
}
function variableDeclaration(kind, declarations) {
  return _builder.default.apply("VariableDeclaration", arguments);
}
function variableDeclarator(id, init) {
  return _builder.default.apply("VariableDeclarator", arguments);
}
function whileStatement(test, body) {
  return _builder.default.apply("WhileStatement", arguments);
}
function withStatement(object, body) {
  return _builder.default.apply("WithStatement", arguments);
}
function assignmentPattern(left, right) {
  return _builder.default.apply("AssignmentPattern", arguments);
}
function arrayPattern(elements) {
  return _builder.default.apply("ArrayPattern", arguments);
}
function arrowFunctionExpression(params, body, async) {
  return _builder.default.apply("ArrowFunctionExpression", arguments);
}
function classBody(body) {
  return _builder.default.apply("ClassBody", arguments);
}
function classExpression(id, superClass, body, decorators) {
  return _builder.default.apply("ClassExpression", arguments);
}
function classDeclaration(id, superClass, body, decorators) {
  return _builder.default.apply("ClassDeclaration", arguments);
}
function exportAllDeclaration(source) {
  return _builder.default.apply("ExportAllDeclaration", arguments);
}
function exportDefaultDeclaration(declaration) {
  return _builder.default.apply("ExportDefaultDeclaration", arguments);
}
function exportNamedDeclaration(declaration, specifiers, source) {
  return _builder.default.apply("ExportNamedDeclaration", arguments);
}
function exportSpecifier(local, exported) {
  return _builder.default.apply("ExportSpecifier", arguments);
}
function forOfStatement(left, right, body, _await) {
  return _builder.default.apply("ForOfStatement", arguments);
}
function importDeclaration(specifiers, source) {
  return _builder.default.apply("ImportDeclaration", arguments);
}
function importDefaultSpecifier(local) {
  return _builder.default.apply("ImportDefaultSpecifier", arguments);
}
function importNamespaceSpecifier(local) {
  return _builder.default.apply("ImportNamespaceSpecifier", arguments);
}
function importSpecifier(local, imported) {
  return _builder.default.apply("ImportSpecifier", arguments);
}
function metaProperty(meta, property) {
  return _builder.default.apply("MetaProperty", arguments);
}
function classMethod(kind, key, params, body, computed2, _static, generator, async) {
  return _builder.default.apply("ClassMethod", arguments);
}
function objectPattern(properties) {
  return _builder.default.apply("ObjectPattern", arguments);
}
function spreadElement(argument) {
  return _builder.default.apply("SpreadElement", arguments);
}
function _super() {
  return _builder.default.apply("Super", arguments);
}
function taggedTemplateExpression(tag, quasi) {
  return _builder.default.apply("TaggedTemplateExpression", arguments);
}
function templateElement(value, tail) {
  return _builder.default.apply("TemplateElement", arguments);
}
function templateLiteral(quasis, expressions) {
  return _builder.default.apply("TemplateLiteral", arguments);
}
function yieldExpression(argument, delegate) {
  return _builder.default.apply("YieldExpression", arguments);
}
function awaitExpression(argument) {
  return _builder.default.apply("AwaitExpression", arguments);
}
function _import() {
  return _builder.default.apply("Import", arguments);
}
function bigIntLiteral(value) {
  return _builder.default.apply("BigIntLiteral", arguments);
}
function exportNamespaceSpecifier(exported) {
  return _builder.default.apply("ExportNamespaceSpecifier", arguments);
}
function optionalMemberExpression(object, property, computed2, optional) {
  return _builder.default.apply("OptionalMemberExpression", arguments);
}
function optionalCallExpression(callee, _arguments, optional) {
  return _builder.default.apply("OptionalCallExpression", arguments);
}
function classProperty(key, value, typeAnnotation2, decorators, computed2, _static) {
  return _builder.default.apply("ClassProperty", arguments);
}
function classAccessorProperty(key, value, typeAnnotation2, decorators, computed2, _static) {
  return _builder.default.apply("ClassAccessorProperty", arguments);
}
function classPrivateProperty(key, value, decorators, _static) {
  return _builder.default.apply("ClassPrivateProperty", arguments);
}
function classPrivateMethod(kind, key, params, body, _static) {
  return _builder.default.apply("ClassPrivateMethod", arguments);
}
function privateName(id) {
  return _builder.default.apply("PrivateName", arguments);
}
function staticBlock(body) {
  return _builder.default.apply("StaticBlock", arguments);
}
function anyTypeAnnotation() {
  return _builder.default.apply("AnyTypeAnnotation", arguments);
}
function arrayTypeAnnotation(elementType) {
  return _builder.default.apply("ArrayTypeAnnotation", arguments);
}
function booleanTypeAnnotation() {
  return _builder.default.apply("BooleanTypeAnnotation", arguments);
}
function booleanLiteralTypeAnnotation(value) {
  return _builder.default.apply("BooleanLiteralTypeAnnotation", arguments);
}
function nullLiteralTypeAnnotation() {
  return _builder.default.apply("NullLiteralTypeAnnotation", arguments);
}
function classImplements(id, typeParameters) {
  return _builder.default.apply("ClassImplements", arguments);
}
function declareClass(id, typeParameters, _extends, body) {
  return _builder.default.apply("DeclareClass", arguments);
}
function declareFunction(id) {
  return _builder.default.apply("DeclareFunction", arguments);
}
function declareInterface(id, typeParameters, _extends, body) {
  return _builder.default.apply("DeclareInterface", arguments);
}
function declareModule(id, body, kind) {
  return _builder.default.apply("DeclareModule", arguments);
}
function declareModuleExports(typeAnnotation2) {
  return _builder.default.apply("DeclareModuleExports", arguments);
}
function declareTypeAlias(id, typeParameters, right) {
  return _builder.default.apply("DeclareTypeAlias", arguments);
}
function declareOpaqueType(id, typeParameters, supertype) {
  return _builder.default.apply("DeclareOpaqueType", arguments);
}
function declareVariable(id) {
  return _builder.default.apply("DeclareVariable", arguments);
}
function declareExportDeclaration(declaration, specifiers, source) {
  return _builder.default.apply("DeclareExportDeclaration", arguments);
}
function declareExportAllDeclaration(source) {
  return _builder.default.apply("DeclareExportAllDeclaration", arguments);
}
function declaredPredicate(value) {
  return _builder.default.apply("DeclaredPredicate", arguments);
}
function existsTypeAnnotation() {
  return _builder.default.apply("ExistsTypeAnnotation", arguments);
}
function functionTypeAnnotation(typeParameters, params, rest, returnType) {
  return _builder.default.apply("FunctionTypeAnnotation", arguments);
}
function functionTypeParam(name, typeAnnotation2) {
  return _builder.default.apply("FunctionTypeParam", arguments);
}
function genericTypeAnnotation(id, typeParameters) {
  return _builder.default.apply("GenericTypeAnnotation", arguments);
}
function inferredPredicate() {
  return _builder.default.apply("InferredPredicate", arguments);
}
function interfaceExtends(id, typeParameters) {
  return _builder.default.apply("InterfaceExtends", arguments);
}
function interfaceDeclaration(id, typeParameters, _extends, body) {
  return _builder.default.apply("InterfaceDeclaration", arguments);
}
function interfaceTypeAnnotation(_extends, body) {
  return _builder.default.apply("InterfaceTypeAnnotation", arguments);
}
function intersectionTypeAnnotation(types) {
  return _builder.default.apply("IntersectionTypeAnnotation", arguments);
}
function mixedTypeAnnotation() {
  return _builder.default.apply("MixedTypeAnnotation", arguments);
}
function emptyTypeAnnotation() {
  return _builder.default.apply("EmptyTypeAnnotation", arguments);
}
function nullableTypeAnnotation(typeAnnotation2) {
  return _builder.default.apply("NullableTypeAnnotation", arguments);
}
function numberLiteralTypeAnnotation(value) {
  return _builder.default.apply("NumberLiteralTypeAnnotation", arguments);
}
function numberTypeAnnotation() {
  return _builder.default.apply("NumberTypeAnnotation", arguments);
}
function objectTypeAnnotation(properties, indexers, callProperties, internalSlots, exact) {
  return _builder.default.apply("ObjectTypeAnnotation", arguments);
}
function objectTypeInternalSlot(id, value, optional, _static, method) {
  return _builder.default.apply("ObjectTypeInternalSlot", arguments);
}
function objectTypeCallProperty(value) {
  return _builder.default.apply("ObjectTypeCallProperty", arguments);
}
function objectTypeIndexer(id, key, value, variance2) {
  return _builder.default.apply("ObjectTypeIndexer", arguments);
}
function objectTypeProperty(key, value, variance2) {
  return _builder.default.apply("ObjectTypeProperty", arguments);
}
function objectTypeSpreadProperty(argument) {
  return _builder.default.apply("ObjectTypeSpreadProperty", arguments);
}
function opaqueType(id, typeParameters, supertype, impltype) {
  return _builder.default.apply("OpaqueType", arguments);
}
function qualifiedTypeIdentifier(id, qualification) {
  return _builder.default.apply("QualifiedTypeIdentifier", arguments);
}
function stringLiteralTypeAnnotation(value) {
  return _builder.default.apply("StringLiteralTypeAnnotation", arguments);
}
function stringTypeAnnotation() {
  return _builder.default.apply("StringTypeAnnotation", arguments);
}
function symbolTypeAnnotation() {
  return _builder.default.apply("SymbolTypeAnnotation", arguments);
}
function thisTypeAnnotation() {
  return _builder.default.apply("ThisTypeAnnotation", arguments);
}
function tupleTypeAnnotation(types) {
  return _builder.default.apply("TupleTypeAnnotation", arguments);
}
function typeofTypeAnnotation(argument) {
  return _builder.default.apply("TypeofTypeAnnotation", arguments);
}
function typeAlias(id, typeParameters, right) {
  return _builder.default.apply("TypeAlias", arguments);
}
function typeAnnotation(typeAnnotation2) {
  return _builder.default.apply("TypeAnnotation", arguments);
}
function typeCastExpression(expression, typeAnnotation2) {
  return _builder.default.apply("TypeCastExpression", arguments);
}
function typeParameter(bound, _default2, variance2) {
  return _builder.default.apply("TypeParameter", arguments);
}
function typeParameterDeclaration(params) {
  return _builder.default.apply("TypeParameterDeclaration", arguments);
}
function typeParameterInstantiation(params) {
  return _builder.default.apply("TypeParameterInstantiation", arguments);
}
function unionTypeAnnotation(types) {
  return _builder.default.apply("UnionTypeAnnotation", arguments);
}
function variance(kind) {
  return _builder.default.apply("Variance", arguments);
}
function voidTypeAnnotation() {
  return _builder.default.apply("VoidTypeAnnotation", arguments);
}
function enumDeclaration(id, body) {
  return _builder.default.apply("EnumDeclaration", arguments);
}
function enumBooleanBody(members) {
  return _builder.default.apply("EnumBooleanBody", arguments);
}
function enumNumberBody(members) {
  return _builder.default.apply("EnumNumberBody", arguments);
}
function enumStringBody(members) {
  return _builder.default.apply("EnumStringBody", arguments);
}
function enumSymbolBody(members) {
  return _builder.default.apply("EnumSymbolBody", arguments);
}
function enumBooleanMember(id) {
  return _builder.default.apply("EnumBooleanMember", arguments);
}
function enumNumberMember(id, init) {
  return _builder.default.apply("EnumNumberMember", arguments);
}
function enumStringMember(id, init) {
  return _builder.default.apply("EnumStringMember", arguments);
}
function enumDefaultedMember(id) {
  return _builder.default.apply("EnumDefaultedMember", arguments);
}
function indexedAccessType(objectType, indexType) {
  return _builder.default.apply("IndexedAccessType", arguments);
}
function optionalIndexedAccessType(objectType, indexType) {
  return _builder.default.apply("OptionalIndexedAccessType", arguments);
}
function jsxAttribute(name, value) {
  return _builder.default.apply("JSXAttribute", arguments);
}
function jsxClosingElement(name) {
  return _builder.default.apply("JSXClosingElement", arguments);
}
function jsxElement(openingElement, closingElement, children, selfClosing) {
  return _builder.default.apply("JSXElement", arguments);
}
function jsxEmptyExpression() {
  return _builder.default.apply("JSXEmptyExpression", arguments);
}
function jsxExpressionContainer(expression) {
  return _builder.default.apply("JSXExpressionContainer", arguments);
}
function jsxSpreadChild(expression) {
  return _builder.default.apply("JSXSpreadChild", arguments);
}
function jsxIdentifier(name) {
  return _builder.default.apply("JSXIdentifier", arguments);
}
function jsxMemberExpression(object, property) {
  return _builder.default.apply("JSXMemberExpression", arguments);
}
function jsxNamespacedName(namespace, name) {
  return _builder.default.apply("JSXNamespacedName", arguments);
}
function jsxOpeningElement(name, attributes, selfClosing) {
  return _builder.default.apply("JSXOpeningElement", arguments);
}
function jsxSpreadAttribute(argument) {
  return _builder.default.apply("JSXSpreadAttribute", arguments);
}
function jsxText(value) {
  return _builder.default.apply("JSXText", arguments);
}
function jsxFragment(openingFragment, closingFragment, children) {
  return _builder.default.apply("JSXFragment", arguments);
}
function jsxOpeningFragment() {
  return _builder.default.apply("JSXOpeningFragment", arguments);
}
function jsxClosingFragment() {
  return _builder.default.apply("JSXClosingFragment", arguments);
}
function noop() {
  return _builder.default.apply("Noop", arguments);
}
function placeholder(expectedNode, name) {
  return _builder.default.apply("Placeholder", arguments);
}
function v8IntrinsicIdentifier(name) {
  return _builder.default.apply("V8IntrinsicIdentifier", arguments);
}
function argumentPlaceholder() {
  return _builder.default.apply("ArgumentPlaceholder", arguments);
}
function bindExpression(object, callee) {
  return _builder.default.apply("BindExpression", arguments);
}
function importAttribute(key, value) {
  return _builder.default.apply("ImportAttribute", arguments);
}
function decorator(expression) {
  return _builder.default.apply("Decorator", arguments);
}
function doExpression(body, async) {
  return _builder.default.apply("DoExpression", arguments);
}
function exportDefaultSpecifier(exported) {
  return _builder.default.apply("ExportDefaultSpecifier", arguments);
}
function recordExpression(properties) {
  return _builder.default.apply("RecordExpression", arguments);
}
function tupleExpression(elements) {
  return _builder.default.apply("TupleExpression", arguments);
}
function decimalLiteral(value) {
  return _builder.default.apply("DecimalLiteral", arguments);
}
function moduleExpression(body) {
  return _builder.default.apply("ModuleExpression", arguments);
}
function topicReference() {
  return _builder.default.apply("TopicReference", arguments);
}
function pipelineTopicExpression(expression) {
  return _builder.default.apply("PipelineTopicExpression", arguments);
}
function pipelineBareFunction(callee) {
  return _builder.default.apply("PipelineBareFunction", arguments);
}
function pipelinePrimaryTopicReference() {
  return _builder.default.apply("PipelinePrimaryTopicReference", arguments);
}
function tsParameterProperty(parameter) {
  return _builder.default.apply("TSParameterProperty", arguments);
}
function tsDeclareFunction(id, typeParameters, params, returnType) {
  return _builder.default.apply("TSDeclareFunction", arguments);
}
function tsDeclareMethod(decorators, key, typeParameters, params, returnType) {
  return _builder.default.apply("TSDeclareMethod", arguments);
}
function tsQualifiedName(left, right) {
  return _builder.default.apply("TSQualifiedName", arguments);
}
function tsCallSignatureDeclaration(typeParameters, parameters, typeAnnotation2) {
  return _builder.default.apply("TSCallSignatureDeclaration", arguments);
}
function tsConstructSignatureDeclaration(typeParameters, parameters, typeAnnotation2) {
  return _builder.default.apply("TSConstructSignatureDeclaration", arguments);
}
function tsPropertySignature(key, typeAnnotation2, initializer) {
  return _builder.default.apply("TSPropertySignature", arguments);
}
function tsMethodSignature(key, typeParameters, parameters, typeAnnotation2) {
  return _builder.default.apply("TSMethodSignature", arguments);
}
function tsIndexSignature(parameters, typeAnnotation2) {
  return _builder.default.apply("TSIndexSignature", arguments);
}
function tsAnyKeyword() {
  return _builder.default.apply("TSAnyKeyword", arguments);
}
function tsBooleanKeyword() {
  return _builder.default.apply("TSBooleanKeyword", arguments);
}
function tsBigIntKeyword() {
  return _builder.default.apply("TSBigIntKeyword", arguments);
}
function tsIntrinsicKeyword() {
  return _builder.default.apply("TSIntrinsicKeyword", arguments);
}
function tsNeverKeyword() {
  return _builder.default.apply("TSNeverKeyword", arguments);
}
function tsNullKeyword() {
  return _builder.default.apply("TSNullKeyword", arguments);
}
function tsNumberKeyword() {
  return _builder.default.apply("TSNumberKeyword", arguments);
}
function tsObjectKeyword() {
  return _builder.default.apply("TSObjectKeyword", arguments);
}
function tsStringKeyword() {
  return _builder.default.apply("TSStringKeyword", arguments);
}
function tsSymbolKeyword() {
  return _builder.default.apply("TSSymbolKeyword", arguments);
}
function tsUndefinedKeyword() {
  return _builder.default.apply("TSUndefinedKeyword", arguments);
}
function tsUnknownKeyword() {
  return _builder.default.apply("TSUnknownKeyword", arguments);
}
function tsVoidKeyword() {
  return _builder.default.apply("TSVoidKeyword", arguments);
}
function tsThisType() {
  return _builder.default.apply("TSThisType", arguments);
}
function tsFunctionType(typeParameters, parameters, typeAnnotation2) {
  return _builder.default.apply("TSFunctionType", arguments);
}
function tsConstructorType(typeParameters, parameters, typeAnnotation2) {
  return _builder.default.apply("TSConstructorType", arguments);
}
function tsTypeReference(typeName, typeParameters) {
  return _builder.default.apply("TSTypeReference", arguments);
}
function tsTypePredicate(parameterName, typeAnnotation2, asserts) {
  return _builder.default.apply("TSTypePredicate", arguments);
}
function tsTypeQuery(exprName) {
  return _builder.default.apply("TSTypeQuery", arguments);
}
function tsTypeLiteral(members) {
  return _builder.default.apply("TSTypeLiteral", arguments);
}
function tsArrayType(elementType) {
  return _builder.default.apply("TSArrayType", arguments);
}
function tsTupleType(elementTypes) {
  return _builder.default.apply("TSTupleType", arguments);
}
function tsOptionalType(typeAnnotation2) {
  return _builder.default.apply("TSOptionalType", arguments);
}
function tsRestType(typeAnnotation2) {
  return _builder.default.apply("TSRestType", arguments);
}
function tsNamedTupleMember(label, elementType, optional) {
  return _builder.default.apply("TSNamedTupleMember", arguments);
}
function tsUnionType(types) {
  return _builder.default.apply("TSUnionType", arguments);
}
function tsIntersectionType(types) {
  return _builder.default.apply("TSIntersectionType", arguments);
}
function tsConditionalType(checkType, extendsType, trueType, falseType) {
  return _builder.default.apply("TSConditionalType", arguments);
}
function tsInferType(typeParameter2) {
  return _builder.default.apply("TSInferType", arguments);
}
function tsParenthesizedType(typeAnnotation2) {
  return _builder.default.apply("TSParenthesizedType", arguments);
}
function tsTypeOperator(typeAnnotation2) {
  return _builder.default.apply("TSTypeOperator", arguments);
}
function tsIndexedAccessType(objectType, indexType) {
  return _builder.default.apply("TSIndexedAccessType", arguments);
}
function tsMappedType(typeParameter2, typeAnnotation2, nameType) {
  return _builder.default.apply("TSMappedType", arguments);
}
function tsLiteralType(literal) {
  return _builder.default.apply("TSLiteralType", arguments);
}
function tsExpressionWithTypeArguments(expression, typeParameters) {
  return _builder.default.apply("TSExpressionWithTypeArguments", arguments);
}
function tsInterfaceDeclaration(id, typeParameters, _extends, body) {
  return _builder.default.apply("TSInterfaceDeclaration", arguments);
}
function tsInterfaceBody(body) {
  return _builder.default.apply("TSInterfaceBody", arguments);
}
function tsTypeAliasDeclaration(id, typeParameters, typeAnnotation2) {
  return _builder.default.apply("TSTypeAliasDeclaration", arguments);
}
function tsAsExpression(expression, typeAnnotation2) {
  return _builder.default.apply("TSAsExpression", arguments);
}
function tsTypeAssertion(typeAnnotation2, expression) {
  return _builder.default.apply("TSTypeAssertion", arguments);
}
function tsEnumDeclaration(id, members) {
  return _builder.default.apply("TSEnumDeclaration", arguments);
}
function tsEnumMember(id, initializer) {
  return _builder.default.apply("TSEnumMember", arguments);
}
function tsModuleDeclaration(id, body) {
  return _builder.default.apply("TSModuleDeclaration", arguments);
}
function tsModuleBlock(body) {
  return _builder.default.apply("TSModuleBlock", arguments);
}
function tsImportType(argument, qualifier, typeParameters) {
  return _builder.default.apply("TSImportType", arguments);
}
function tsImportEqualsDeclaration(id, moduleReference) {
  return _builder.default.apply("TSImportEqualsDeclaration", arguments);
}
function tsExternalModuleReference(expression) {
  return _builder.default.apply("TSExternalModuleReference", arguments);
}
function tsNonNullExpression(expression) {
  return _builder.default.apply("TSNonNullExpression", arguments);
}
function tsExportAssignment(expression) {
  return _builder.default.apply("TSExportAssignment", arguments);
}
function tsNamespaceExportDeclaration(id) {
  return _builder.default.apply("TSNamespaceExportDeclaration", arguments);
}
function tsTypeAnnotation(typeAnnotation2) {
  return _builder.default.apply("TSTypeAnnotation", arguments);
}
function tsTypeParameterInstantiation(params) {
  return _builder.default.apply("TSTypeParameterInstantiation", arguments);
}
function tsTypeParameterDeclaration(params) {
  return _builder.default.apply("TSTypeParameterDeclaration", arguments);
}
function tsTypeParameter(constraint, _default2, name) {
  return _builder.default.apply("TSTypeParameter", arguments);
}
function NumberLiteral(value) {
  console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
  return _builder.default.apply("NumberLiteral", arguments);
}
function RegexLiteral(pattern, flags) {
  console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
  return _builder.default.apply("RegexLiteral", arguments);
}
function RestProperty(argument) {
  console.trace("The node type RestProperty has been renamed to RestElement");
  return _builder.default.apply("RestProperty", arguments);
}
function SpreadProperty(argument) {
  console.trace("The node type SpreadProperty has been renamed to SpreadElement");
  return _builder.default.apply("SpreadProperty", arguments);
}
Object.defineProperty(cleanJSXElementLiteralChild$1, "__esModule", {
  value: true
});
cleanJSXElementLiteralChild$1.default = cleanJSXElementLiteralChild;
var _generated$n = generated$3;
function cleanJSXElementLiteralChild(child, args) {
  const lines = child.value.split(/\r\n|\n|\r/);
  let lastNonEmptyLine = 0;
  for (let i2 = 0; i2 < lines.length; i2++) {
    if (lines[i2].match(/[^ \t]/)) {
      lastNonEmptyLine = i2;
    }
  }
  let str = "";
  for (let i2 = 0; i2 < lines.length; i2++) {
    const line = lines[i2];
    const isFirstLine = i2 === 0;
    const isLastLine = i2 === lines.length - 1;
    const isLastNonEmptyLine = i2 === lastNonEmptyLine;
    let trimmedLine = line.replace(/\t/g, " ");
    if (!isFirstLine) {
      trimmedLine = trimmedLine.replace(/^[ ]+/, "");
    }
    if (!isLastLine) {
      trimmedLine = trimmedLine.replace(/[ ]+$/, "");
    }
    if (trimmedLine) {
      if (!isLastNonEmptyLine) {
        trimmedLine += " ";
      }
      str += trimmedLine;
    }
  }
  if (str)
    args.push((0, _generated$n.stringLiteral)(str));
}
Object.defineProperty(buildChildren$1, "__esModule", {
  value: true
});
buildChildren$1.default = buildChildren;
var _generated$m = generated$4;
var _cleanJSXElementLiteralChild = cleanJSXElementLiteralChild$1;
function buildChildren(node) {
  const elements = [];
  for (let i2 = 0; i2 < node.children.length; i2++) {
    let child = node.children[i2];
    if ((0, _generated$m.isJSXText)(child)) {
      (0, _cleanJSXElementLiteralChild.default)(child, elements);
      continue;
    }
    if ((0, _generated$m.isJSXExpressionContainer)(child))
      child = child.expression;
    if ((0, _generated$m.isJSXEmptyExpression)(child))
      continue;
    elements.push(child);
  }
  return elements;
}
var assertNode$1 = {};
var isNode$1 = {};
Object.defineProperty(isNode$1, "__esModule", {
  value: true
});
isNode$1.default = isNode;
var _definitions$5 = definitions;
function isNode(node) {
  return !!(node && _definitions$5.VISITOR_KEYS[node.type]);
}
Object.defineProperty(assertNode$1, "__esModule", {
  value: true
});
assertNode$1.default = assertNode;
var _isNode = isNode$1;
function assertNode(node) {
  if (!(0, _isNode.default)(node)) {
    var _node$type;
    const type = (_node$type = node == null ? void 0 : node.type) != null ? _node$type : JSON.stringify(node);
    throw new TypeError(`Not a valid node of type "${type}"`);
  }
}
var generated$2 = {};
Object.defineProperty(generated$2, "__esModule", {
  value: true
});
generated$2.assertAccessor = assertAccessor;
generated$2.assertAnyTypeAnnotation = assertAnyTypeAnnotation;
generated$2.assertArgumentPlaceholder = assertArgumentPlaceholder;
generated$2.assertArrayExpression = assertArrayExpression;
generated$2.assertArrayPattern = assertArrayPattern;
generated$2.assertArrayTypeAnnotation = assertArrayTypeAnnotation;
generated$2.assertArrowFunctionExpression = assertArrowFunctionExpression;
generated$2.assertAssignmentExpression = assertAssignmentExpression;
generated$2.assertAssignmentPattern = assertAssignmentPattern;
generated$2.assertAwaitExpression = assertAwaitExpression;
generated$2.assertBigIntLiteral = assertBigIntLiteral;
generated$2.assertBinary = assertBinary;
generated$2.assertBinaryExpression = assertBinaryExpression;
generated$2.assertBindExpression = assertBindExpression;
generated$2.assertBlock = assertBlock;
generated$2.assertBlockParent = assertBlockParent;
generated$2.assertBlockStatement = assertBlockStatement;
generated$2.assertBooleanLiteral = assertBooleanLiteral;
generated$2.assertBooleanLiteralTypeAnnotation = assertBooleanLiteralTypeAnnotation;
generated$2.assertBooleanTypeAnnotation = assertBooleanTypeAnnotation;
generated$2.assertBreakStatement = assertBreakStatement;
generated$2.assertCallExpression = assertCallExpression;
generated$2.assertCatchClause = assertCatchClause;
generated$2.assertClass = assertClass;
generated$2.assertClassAccessorProperty = assertClassAccessorProperty;
generated$2.assertClassBody = assertClassBody;
generated$2.assertClassDeclaration = assertClassDeclaration;
generated$2.assertClassExpression = assertClassExpression;
generated$2.assertClassImplements = assertClassImplements;
generated$2.assertClassMethod = assertClassMethod;
generated$2.assertClassPrivateMethod = assertClassPrivateMethod;
generated$2.assertClassPrivateProperty = assertClassPrivateProperty;
generated$2.assertClassProperty = assertClassProperty;
generated$2.assertCompletionStatement = assertCompletionStatement;
generated$2.assertConditional = assertConditional;
generated$2.assertConditionalExpression = assertConditionalExpression;
generated$2.assertContinueStatement = assertContinueStatement;
generated$2.assertDebuggerStatement = assertDebuggerStatement;
generated$2.assertDecimalLiteral = assertDecimalLiteral;
generated$2.assertDeclaration = assertDeclaration;
generated$2.assertDeclareClass = assertDeclareClass;
generated$2.assertDeclareExportAllDeclaration = assertDeclareExportAllDeclaration;
generated$2.assertDeclareExportDeclaration = assertDeclareExportDeclaration;
generated$2.assertDeclareFunction = assertDeclareFunction;
generated$2.assertDeclareInterface = assertDeclareInterface;
generated$2.assertDeclareModule = assertDeclareModule;
generated$2.assertDeclareModuleExports = assertDeclareModuleExports;
generated$2.assertDeclareOpaqueType = assertDeclareOpaqueType;
generated$2.assertDeclareTypeAlias = assertDeclareTypeAlias;
generated$2.assertDeclareVariable = assertDeclareVariable;
generated$2.assertDeclaredPredicate = assertDeclaredPredicate;
generated$2.assertDecorator = assertDecorator;
generated$2.assertDirective = assertDirective;
generated$2.assertDirectiveLiteral = assertDirectiveLiteral;
generated$2.assertDoExpression = assertDoExpression;
generated$2.assertDoWhileStatement = assertDoWhileStatement;
generated$2.assertEmptyStatement = assertEmptyStatement;
generated$2.assertEmptyTypeAnnotation = assertEmptyTypeAnnotation;
generated$2.assertEnumBody = assertEnumBody;
generated$2.assertEnumBooleanBody = assertEnumBooleanBody;
generated$2.assertEnumBooleanMember = assertEnumBooleanMember;
generated$2.assertEnumDeclaration = assertEnumDeclaration;
generated$2.assertEnumDefaultedMember = assertEnumDefaultedMember;
generated$2.assertEnumMember = assertEnumMember;
generated$2.assertEnumNumberBody = assertEnumNumberBody;
generated$2.assertEnumNumberMember = assertEnumNumberMember;
generated$2.assertEnumStringBody = assertEnumStringBody;
generated$2.assertEnumStringMember = assertEnumStringMember;
generated$2.assertEnumSymbolBody = assertEnumSymbolBody;
generated$2.assertExistsTypeAnnotation = assertExistsTypeAnnotation;
generated$2.assertExportAllDeclaration = assertExportAllDeclaration;
generated$2.assertExportDeclaration = assertExportDeclaration;
generated$2.assertExportDefaultDeclaration = assertExportDefaultDeclaration;
generated$2.assertExportDefaultSpecifier = assertExportDefaultSpecifier;
generated$2.assertExportNamedDeclaration = assertExportNamedDeclaration;
generated$2.assertExportNamespaceSpecifier = assertExportNamespaceSpecifier;
generated$2.assertExportSpecifier = assertExportSpecifier;
generated$2.assertExpression = assertExpression;
generated$2.assertExpressionStatement = assertExpressionStatement;
generated$2.assertExpressionWrapper = assertExpressionWrapper;
generated$2.assertFile = assertFile;
generated$2.assertFlow = assertFlow;
generated$2.assertFlowBaseAnnotation = assertFlowBaseAnnotation;
generated$2.assertFlowDeclaration = assertFlowDeclaration;
generated$2.assertFlowPredicate = assertFlowPredicate;
generated$2.assertFlowType = assertFlowType;
generated$2.assertFor = assertFor;
generated$2.assertForInStatement = assertForInStatement;
generated$2.assertForOfStatement = assertForOfStatement;
generated$2.assertForStatement = assertForStatement;
generated$2.assertForXStatement = assertForXStatement;
generated$2.assertFunction = assertFunction;
generated$2.assertFunctionDeclaration = assertFunctionDeclaration;
generated$2.assertFunctionExpression = assertFunctionExpression;
generated$2.assertFunctionParent = assertFunctionParent;
generated$2.assertFunctionTypeAnnotation = assertFunctionTypeAnnotation;
generated$2.assertFunctionTypeParam = assertFunctionTypeParam;
generated$2.assertGenericTypeAnnotation = assertGenericTypeAnnotation;
generated$2.assertIdentifier = assertIdentifier;
generated$2.assertIfStatement = assertIfStatement;
generated$2.assertImmutable = assertImmutable;
generated$2.assertImport = assertImport;
generated$2.assertImportAttribute = assertImportAttribute;
generated$2.assertImportDeclaration = assertImportDeclaration;
generated$2.assertImportDefaultSpecifier = assertImportDefaultSpecifier;
generated$2.assertImportNamespaceSpecifier = assertImportNamespaceSpecifier;
generated$2.assertImportSpecifier = assertImportSpecifier;
generated$2.assertIndexedAccessType = assertIndexedAccessType;
generated$2.assertInferredPredicate = assertInferredPredicate;
generated$2.assertInterfaceDeclaration = assertInterfaceDeclaration;
generated$2.assertInterfaceExtends = assertInterfaceExtends;
generated$2.assertInterfaceTypeAnnotation = assertInterfaceTypeAnnotation;
generated$2.assertInterpreterDirective = assertInterpreterDirective;
generated$2.assertIntersectionTypeAnnotation = assertIntersectionTypeAnnotation;
generated$2.assertJSX = assertJSX;
generated$2.assertJSXAttribute = assertJSXAttribute;
generated$2.assertJSXClosingElement = assertJSXClosingElement;
generated$2.assertJSXClosingFragment = assertJSXClosingFragment;
generated$2.assertJSXElement = assertJSXElement;
generated$2.assertJSXEmptyExpression = assertJSXEmptyExpression;
generated$2.assertJSXExpressionContainer = assertJSXExpressionContainer;
generated$2.assertJSXFragment = assertJSXFragment;
generated$2.assertJSXIdentifier = assertJSXIdentifier;
generated$2.assertJSXMemberExpression = assertJSXMemberExpression;
generated$2.assertJSXNamespacedName = assertJSXNamespacedName;
generated$2.assertJSXOpeningElement = assertJSXOpeningElement;
generated$2.assertJSXOpeningFragment = assertJSXOpeningFragment;
generated$2.assertJSXSpreadAttribute = assertJSXSpreadAttribute;
generated$2.assertJSXSpreadChild = assertJSXSpreadChild;
generated$2.assertJSXText = assertJSXText;
generated$2.assertLVal = assertLVal;
generated$2.assertLabeledStatement = assertLabeledStatement;
generated$2.assertLiteral = assertLiteral;
generated$2.assertLogicalExpression = assertLogicalExpression;
generated$2.assertLoop = assertLoop;
generated$2.assertMemberExpression = assertMemberExpression;
generated$2.assertMetaProperty = assertMetaProperty;
generated$2.assertMethod = assertMethod;
generated$2.assertMiscellaneous = assertMiscellaneous;
generated$2.assertMixedTypeAnnotation = assertMixedTypeAnnotation;
generated$2.assertModuleDeclaration = assertModuleDeclaration;
generated$2.assertModuleExpression = assertModuleExpression;
generated$2.assertModuleSpecifier = assertModuleSpecifier;
generated$2.assertNewExpression = assertNewExpression;
generated$2.assertNoop = assertNoop;
generated$2.assertNullLiteral = assertNullLiteral;
generated$2.assertNullLiteralTypeAnnotation = assertNullLiteralTypeAnnotation;
generated$2.assertNullableTypeAnnotation = assertNullableTypeAnnotation;
generated$2.assertNumberLiteral = assertNumberLiteral;
generated$2.assertNumberLiteralTypeAnnotation = assertNumberLiteralTypeAnnotation;
generated$2.assertNumberTypeAnnotation = assertNumberTypeAnnotation;
generated$2.assertNumericLiteral = assertNumericLiteral;
generated$2.assertObjectExpression = assertObjectExpression;
generated$2.assertObjectMember = assertObjectMember;
generated$2.assertObjectMethod = assertObjectMethod;
generated$2.assertObjectPattern = assertObjectPattern;
generated$2.assertObjectProperty = assertObjectProperty;
generated$2.assertObjectTypeAnnotation = assertObjectTypeAnnotation;
generated$2.assertObjectTypeCallProperty = assertObjectTypeCallProperty;
generated$2.assertObjectTypeIndexer = assertObjectTypeIndexer;
generated$2.assertObjectTypeInternalSlot = assertObjectTypeInternalSlot;
generated$2.assertObjectTypeProperty = assertObjectTypeProperty;
generated$2.assertObjectTypeSpreadProperty = assertObjectTypeSpreadProperty;
generated$2.assertOpaqueType = assertOpaqueType;
generated$2.assertOptionalCallExpression = assertOptionalCallExpression;
generated$2.assertOptionalIndexedAccessType = assertOptionalIndexedAccessType;
generated$2.assertOptionalMemberExpression = assertOptionalMemberExpression;
generated$2.assertParenthesizedExpression = assertParenthesizedExpression;
generated$2.assertPattern = assertPattern;
generated$2.assertPatternLike = assertPatternLike;
generated$2.assertPipelineBareFunction = assertPipelineBareFunction;
generated$2.assertPipelinePrimaryTopicReference = assertPipelinePrimaryTopicReference;
generated$2.assertPipelineTopicExpression = assertPipelineTopicExpression;
generated$2.assertPlaceholder = assertPlaceholder;
generated$2.assertPrivate = assertPrivate;
generated$2.assertPrivateName = assertPrivateName;
generated$2.assertProgram = assertProgram;
generated$2.assertProperty = assertProperty;
generated$2.assertPureish = assertPureish;
generated$2.assertQualifiedTypeIdentifier = assertQualifiedTypeIdentifier;
generated$2.assertRecordExpression = assertRecordExpression;
generated$2.assertRegExpLiteral = assertRegExpLiteral;
generated$2.assertRegexLiteral = assertRegexLiteral;
generated$2.assertRestElement = assertRestElement;
generated$2.assertRestProperty = assertRestProperty;
generated$2.assertReturnStatement = assertReturnStatement;
generated$2.assertScopable = assertScopable;
generated$2.assertSequenceExpression = assertSequenceExpression;
generated$2.assertSpreadElement = assertSpreadElement;
generated$2.assertSpreadProperty = assertSpreadProperty;
generated$2.assertStandardized = assertStandardized;
generated$2.assertStatement = assertStatement;
generated$2.assertStaticBlock = assertStaticBlock;
generated$2.assertStringLiteral = assertStringLiteral;
generated$2.assertStringLiteralTypeAnnotation = assertStringLiteralTypeAnnotation;
generated$2.assertStringTypeAnnotation = assertStringTypeAnnotation;
generated$2.assertSuper = assertSuper;
generated$2.assertSwitchCase = assertSwitchCase;
generated$2.assertSwitchStatement = assertSwitchStatement;
generated$2.assertSymbolTypeAnnotation = assertSymbolTypeAnnotation;
generated$2.assertTSAnyKeyword = assertTSAnyKeyword;
generated$2.assertTSArrayType = assertTSArrayType;
generated$2.assertTSAsExpression = assertTSAsExpression;
generated$2.assertTSBaseType = assertTSBaseType;
generated$2.assertTSBigIntKeyword = assertTSBigIntKeyword;
generated$2.assertTSBooleanKeyword = assertTSBooleanKeyword;
generated$2.assertTSCallSignatureDeclaration = assertTSCallSignatureDeclaration;
generated$2.assertTSConditionalType = assertTSConditionalType;
generated$2.assertTSConstructSignatureDeclaration = assertTSConstructSignatureDeclaration;
generated$2.assertTSConstructorType = assertTSConstructorType;
generated$2.assertTSDeclareFunction = assertTSDeclareFunction;
generated$2.assertTSDeclareMethod = assertTSDeclareMethod;
generated$2.assertTSEntityName = assertTSEntityName;
generated$2.assertTSEnumDeclaration = assertTSEnumDeclaration;
generated$2.assertTSEnumMember = assertTSEnumMember;
generated$2.assertTSExportAssignment = assertTSExportAssignment;
generated$2.assertTSExpressionWithTypeArguments = assertTSExpressionWithTypeArguments;
generated$2.assertTSExternalModuleReference = assertTSExternalModuleReference;
generated$2.assertTSFunctionType = assertTSFunctionType;
generated$2.assertTSImportEqualsDeclaration = assertTSImportEqualsDeclaration;
generated$2.assertTSImportType = assertTSImportType;
generated$2.assertTSIndexSignature = assertTSIndexSignature;
generated$2.assertTSIndexedAccessType = assertTSIndexedAccessType;
generated$2.assertTSInferType = assertTSInferType;
generated$2.assertTSInterfaceBody = assertTSInterfaceBody;
generated$2.assertTSInterfaceDeclaration = assertTSInterfaceDeclaration;
generated$2.assertTSIntersectionType = assertTSIntersectionType;
generated$2.assertTSIntrinsicKeyword = assertTSIntrinsicKeyword;
generated$2.assertTSLiteralType = assertTSLiteralType;
generated$2.assertTSMappedType = assertTSMappedType;
generated$2.assertTSMethodSignature = assertTSMethodSignature;
generated$2.assertTSModuleBlock = assertTSModuleBlock;
generated$2.assertTSModuleDeclaration = assertTSModuleDeclaration;
generated$2.assertTSNamedTupleMember = assertTSNamedTupleMember;
generated$2.assertTSNamespaceExportDeclaration = assertTSNamespaceExportDeclaration;
generated$2.assertTSNeverKeyword = assertTSNeverKeyword;
generated$2.assertTSNonNullExpression = assertTSNonNullExpression;
generated$2.assertTSNullKeyword = assertTSNullKeyword;
generated$2.assertTSNumberKeyword = assertTSNumberKeyword;
generated$2.assertTSObjectKeyword = assertTSObjectKeyword;
generated$2.assertTSOptionalType = assertTSOptionalType;
generated$2.assertTSParameterProperty = assertTSParameterProperty;
generated$2.assertTSParenthesizedType = assertTSParenthesizedType;
generated$2.assertTSPropertySignature = assertTSPropertySignature;
generated$2.assertTSQualifiedName = assertTSQualifiedName;
generated$2.assertTSRestType = assertTSRestType;
generated$2.assertTSStringKeyword = assertTSStringKeyword;
generated$2.assertTSSymbolKeyword = assertTSSymbolKeyword;
generated$2.assertTSThisType = assertTSThisType;
generated$2.assertTSTupleType = assertTSTupleType;
generated$2.assertTSType = assertTSType;
generated$2.assertTSTypeAliasDeclaration = assertTSTypeAliasDeclaration;
generated$2.assertTSTypeAnnotation = assertTSTypeAnnotation;
generated$2.assertTSTypeAssertion = assertTSTypeAssertion;
generated$2.assertTSTypeElement = assertTSTypeElement;
generated$2.assertTSTypeLiteral = assertTSTypeLiteral;
generated$2.assertTSTypeOperator = assertTSTypeOperator;
generated$2.assertTSTypeParameter = assertTSTypeParameter;
generated$2.assertTSTypeParameterDeclaration = assertTSTypeParameterDeclaration;
generated$2.assertTSTypeParameterInstantiation = assertTSTypeParameterInstantiation;
generated$2.assertTSTypePredicate = assertTSTypePredicate;
generated$2.assertTSTypeQuery = assertTSTypeQuery;
generated$2.assertTSTypeReference = assertTSTypeReference;
generated$2.assertTSUndefinedKeyword = assertTSUndefinedKeyword;
generated$2.assertTSUnionType = assertTSUnionType;
generated$2.assertTSUnknownKeyword = assertTSUnknownKeyword;
generated$2.assertTSVoidKeyword = assertTSVoidKeyword;
generated$2.assertTaggedTemplateExpression = assertTaggedTemplateExpression;
generated$2.assertTemplateElement = assertTemplateElement;
generated$2.assertTemplateLiteral = assertTemplateLiteral;
generated$2.assertTerminatorless = assertTerminatorless;
generated$2.assertThisExpression = assertThisExpression;
generated$2.assertThisTypeAnnotation = assertThisTypeAnnotation;
generated$2.assertThrowStatement = assertThrowStatement;
generated$2.assertTopicReference = assertTopicReference;
generated$2.assertTryStatement = assertTryStatement;
generated$2.assertTupleExpression = assertTupleExpression;
generated$2.assertTupleTypeAnnotation = assertTupleTypeAnnotation;
generated$2.assertTypeAlias = assertTypeAlias;
generated$2.assertTypeAnnotation = assertTypeAnnotation;
generated$2.assertTypeCastExpression = assertTypeCastExpression;
generated$2.assertTypeParameter = assertTypeParameter;
generated$2.assertTypeParameterDeclaration = assertTypeParameterDeclaration;
generated$2.assertTypeParameterInstantiation = assertTypeParameterInstantiation;
generated$2.assertTypeScript = assertTypeScript;
generated$2.assertTypeofTypeAnnotation = assertTypeofTypeAnnotation;
generated$2.assertUnaryExpression = assertUnaryExpression;
generated$2.assertUnaryLike = assertUnaryLike;
generated$2.assertUnionTypeAnnotation = assertUnionTypeAnnotation;
generated$2.assertUpdateExpression = assertUpdateExpression;
generated$2.assertUserWhitespacable = assertUserWhitespacable;
generated$2.assertV8IntrinsicIdentifier = assertV8IntrinsicIdentifier;
generated$2.assertVariableDeclaration = assertVariableDeclaration;
generated$2.assertVariableDeclarator = assertVariableDeclarator;
generated$2.assertVariance = assertVariance;
generated$2.assertVoidTypeAnnotation = assertVoidTypeAnnotation;
generated$2.assertWhile = assertWhile;
generated$2.assertWhileStatement = assertWhileStatement;
generated$2.assertWithStatement = assertWithStatement;
generated$2.assertYieldExpression = assertYieldExpression;
var _is = is$1;
function assert(type, node, opts) {
  if (!(0, _is.default)(type, node, opts)) {
    throw new Error(`Expected type "${type}" with option ${JSON.stringify(opts)}, but instead got "${node.type}".`);
  }
}
function assertArrayExpression(node, opts) {
  assert("ArrayExpression", node, opts);
}
function assertAssignmentExpression(node, opts) {
  assert("AssignmentExpression", node, opts);
}
function assertBinaryExpression(node, opts) {
  assert("BinaryExpression", node, opts);
}
function assertInterpreterDirective(node, opts) {
  assert("InterpreterDirective", node, opts);
}
function assertDirective(node, opts) {
  assert("Directive", node, opts);
}
function assertDirectiveLiteral(node, opts) {
  assert("DirectiveLiteral", node, opts);
}
function assertBlockStatement(node, opts) {
  assert("BlockStatement", node, opts);
}
function assertBreakStatement(node, opts) {
  assert("BreakStatement", node, opts);
}
function assertCallExpression(node, opts) {
  assert("CallExpression", node, opts);
}
function assertCatchClause(node, opts) {
  assert("CatchClause", node, opts);
}
function assertConditionalExpression(node, opts) {
  assert("ConditionalExpression", node, opts);
}
function assertContinueStatement(node, opts) {
  assert("ContinueStatement", node, opts);
}
function assertDebuggerStatement(node, opts) {
  assert("DebuggerStatement", node, opts);
}
function assertDoWhileStatement(node, opts) {
  assert("DoWhileStatement", node, opts);
}
function assertEmptyStatement(node, opts) {
  assert("EmptyStatement", node, opts);
}
function assertExpressionStatement(node, opts) {
  assert("ExpressionStatement", node, opts);
}
function assertFile(node, opts) {
  assert("File", node, opts);
}
function assertForInStatement(node, opts) {
  assert("ForInStatement", node, opts);
}
function assertForStatement(node, opts) {
  assert("ForStatement", node, opts);
}
function assertFunctionDeclaration(node, opts) {
  assert("FunctionDeclaration", node, opts);
}
function assertFunctionExpression(node, opts) {
  assert("FunctionExpression", node, opts);
}
function assertIdentifier(node, opts) {
  assert("Identifier", node, opts);
}
function assertIfStatement(node, opts) {
  assert("IfStatement", node, opts);
}
function assertLabeledStatement(node, opts) {
  assert("LabeledStatement", node, opts);
}
function assertStringLiteral(node, opts) {
  assert("StringLiteral", node, opts);
}
function assertNumericLiteral(node, opts) {
  assert("NumericLiteral", node, opts);
}
function assertNullLiteral(node, opts) {
  assert("NullLiteral", node, opts);
}
function assertBooleanLiteral(node, opts) {
  assert("BooleanLiteral", node, opts);
}
function assertRegExpLiteral(node, opts) {
  assert("RegExpLiteral", node, opts);
}
function assertLogicalExpression(node, opts) {
  assert("LogicalExpression", node, opts);
}
function assertMemberExpression(node, opts) {
  assert("MemberExpression", node, opts);
}
function assertNewExpression(node, opts) {
  assert("NewExpression", node, opts);
}
function assertProgram(node, opts) {
  assert("Program", node, opts);
}
function assertObjectExpression(node, opts) {
  assert("ObjectExpression", node, opts);
}
function assertObjectMethod(node, opts) {
  assert("ObjectMethod", node, opts);
}
function assertObjectProperty(node, opts) {
  assert("ObjectProperty", node, opts);
}
function assertRestElement(node, opts) {
  assert("RestElement", node, opts);
}
function assertReturnStatement(node, opts) {
  assert("ReturnStatement", node, opts);
}
function assertSequenceExpression(node, opts) {
  assert("SequenceExpression", node, opts);
}
function assertParenthesizedExpression(node, opts) {
  assert("ParenthesizedExpression", node, opts);
}
function assertSwitchCase(node, opts) {
  assert("SwitchCase", node, opts);
}
function assertSwitchStatement(node, opts) {
  assert("SwitchStatement", node, opts);
}
function assertThisExpression(node, opts) {
  assert("ThisExpression", node, opts);
}
function assertThrowStatement(node, opts) {
  assert("ThrowStatement", node, opts);
}
function assertTryStatement(node, opts) {
  assert("TryStatement", node, opts);
}
function assertUnaryExpression(node, opts) {
  assert("UnaryExpression", node, opts);
}
function assertUpdateExpression(node, opts) {
  assert("UpdateExpression", node, opts);
}
function assertVariableDeclaration(node, opts) {
  assert("VariableDeclaration", node, opts);
}
function assertVariableDeclarator(node, opts) {
  assert("VariableDeclarator", node, opts);
}
function assertWhileStatement(node, opts) {
  assert("WhileStatement", node, opts);
}
function assertWithStatement(node, opts) {
  assert("WithStatement", node, opts);
}
function assertAssignmentPattern(node, opts) {
  assert("AssignmentPattern", node, opts);
}
function assertArrayPattern(node, opts) {
  assert("ArrayPattern", node, opts);
}
function assertArrowFunctionExpression(node, opts) {
  assert("ArrowFunctionExpression", node, opts);
}
function assertClassBody(node, opts) {
  assert("ClassBody", node, opts);
}
function assertClassExpression(node, opts) {
  assert("ClassExpression", node, opts);
}
function assertClassDeclaration(node, opts) {
  assert("ClassDeclaration", node, opts);
}
function assertExportAllDeclaration(node, opts) {
  assert("ExportAllDeclaration", node, opts);
}
function assertExportDefaultDeclaration(node, opts) {
  assert("ExportDefaultDeclaration", node, opts);
}
function assertExportNamedDeclaration(node, opts) {
  assert("ExportNamedDeclaration", node, opts);
}
function assertExportSpecifier(node, opts) {
  assert("ExportSpecifier", node, opts);
}
function assertForOfStatement(node, opts) {
  assert("ForOfStatement", node, opts);
}
function assertImportDeclaration(node, opts) {
  assert("ImportDeclaration", node, opts);
}
function assertImportDefaultSpecifier(node, opts) {
  assert("ImportDefaultSpecifier", node, opts);
}
function assertImportNamespaceSpecifier(node, opts) {
  assert("ImportNamespaceSpecifier", node, opts);
}
function assertImportSpecifier(node, opts) {
  assert("ImportSpecifier", node, opts);
}
function assertMetaProperty(node, opts) {
  assert("MetaProperty", node, opts);
}
function assertClassMethod(node, opts) {
  assert("ClassMethod", node, opts);
}
function assertObjectPattern(node, opts) {
  assert("ObjectPattern", node, opts);
}
function assertSpreadElement(node, opts) {
  assert("SpreadElement", node, opts);
}
function assertSuper(node, opts) {
  assert("Super", node, opts);
}
function assertTaggedTemplateExpression(node, opts) {
  assert("TaggedTemplateExpression", node, opts);
}
function assertTemplateElement(node, opts) {
  assert("TemplateElement", node, opts);
}
function assertTemplateLiteral(node, opts) {
  assert("TemplateLiteral", node, opts);
}
function assertYieldExpression(node, opts) {
  assert("YieldExpression", node, opts);
}
function assertAwaitExpression(node, opts) {
  assert("AwaitExpression", node, opts);
}
function assertImport(node, opts) {
  assert("Import", node, opts);
}
function assertBigIntLiteral(node, opts) {
  assert("BigIntLiteral", node, opts);
}
function assertExportNamespaceSpecifier(node, opts) {
  assert("ExportNamespaceSpecifier", node, opts);
}
function assertOptionalMemberExpression(node, opts) {
  assert("OptionalMemberExpression", node, opts);
}
function assertOptionalCallExpression(node, opts) {
  assert("OptionalCallExpression", node, opts);
}
function assertClassProperty(node, opts) {
  assert("ClassProperty", node, opts);
}
function assertClassAccessorProperty(node, opts) {
  assert("ClassAccessorProperty", node, opts);
}
function assertClassPrivateProperty(node, opts) {
  assert("ClassPrivateProperty", node, opts);
}
function assertClassPrivateMethod(node, opts) {
  assert("ClassPrivateMethod", node, opts);
}
function assertPrivateName(node, opts) {
  assert("PrivateName", node, opts);
}
function assertStaticBlock(node, opts) {
  assert("StaticBlock", node, opts);
}
function assertAnyTypeAnnotation(node, opts) {
  assert("AnyTypeAnnotation", node, opts);
}
function assertArrayTypeAnnotation(node, opts) {
  assert("ArrayTypeAnnotation", node, opts);
}
function assertBooleanTypeAnnotation(node, opts) {
  assert("BooleanTypeAnnotation", node, opts);
}
function assertBooleanLiteralTypeAnnotation(node, opts) {
  assert("BooleanLiteralTypeAnnotation", node, opts);
}
function assertNullLiteralTypeAnnotation(node, opts) {
  assert("NullLiteralTypeAnnotation", node, opts);
}
function assertClassImplements(node, opts) {
  assert("ClassImplements", node, opts);
}
function assertDeclareClass(node, opts) {
  assert("DeclareClass", node, opts);
}
function assertDeclareFunction(node, opts) {
  assert("DeclareFunction", node, opts);
}
function assertDeclareInterface(node, opts) {
  assert("DeclareInterface", node, opts);
}
function assertDeclareModule(node, opts) {
  assert("DeclareModule", node, opts);
}
function assertDeclareModuleExports(node, opts) {
  assert("DeclareModuleExports", node, opts);
}
function assertDeclareTypeAlias(node, opts) {
  assert("DeclareTypeAlias", node, opts);
}
function assertDeclareOpaqueType(node, opts) {
  assert("DeclareOpaqueType", node, opts);
}
function assertDeclareVariable(node, opts) {
  assert("DeclareVariable", node, opts);
}
function assertDeclareExportDeclaration(node, opts) {
  assert("DeclareExportDeclaration", node, opts);
}
function assertDeclareExportAllDeclaration(node, opts) {
  assert("DeclareExportAllDeclaration", node, opts);
}
function assertDeclaredPredicate(node, opts) {
  assert("DeclaredPredicate", node, opts);
}
function assertExistsTypeAnnotation(node, opts) {
  assert("ExistsTypeAnnotation", node, opts);
}
function assertFunctionTypeAnnotation(node, opts) {
  assert("FunctionTypeAnnotation", node, opts);
}
function assertFunctionTypeParam(node, opts) {
  assert("FunctionTypeParam", node, opts);
}
function assertGenericTypeAnnotation(node, opts) {
  assert("GenericTypeAnnotation", node, opts);
}
function assertInferredPredicate(node, opts) {
  assert("InferredPredicate", node, opts);
}
function assertInterfaceExtends(node, opts) {
  assert("InterfaceExtends", node, opts);
}
function assertInterfaceDeclaration(node, opts) {
  assert("InterfaceDeclaration", node, opts);
}
function assertInterfaceTypeAnnotation(node, opts) {
  assert("InterfaceTypeAnnotation", node, opts);
}
function assertIntersectionTypeAnnotation(node, opts) {
  assert("IntersectionTypeAnnotation", node, opts);
}
function assertMixedTypeAnnotation(node, opts) {
  assert("MixedTypeAnnotation", node, opts);
}
function assertEmptyTypeAnnotation(node, opts) {
  assert("EmptyTypeAnnotation", node, opts);
}
function assertNullableTypeAnnotation(node, opts) {
  assert("NullableTypeAnnotation", node, opts);
}
function assertNumberLiteralTypeAnnotation(node, opts) {
  assert("NumberLiteralTypeAnnotation", node, opts);
}
function assertNumberTypeAnnotation(node, opts) {
  assert("NumberTypeAnnotation", node, opts);
}
function assertObjectTypeAnnotation(node, opts) {
  assert("ObjectTypeAnnotation", node, opts);
}
function assertObjectTypeInternalSlot(node, opts) {
  assert("ObjectTypeInternalSlot", node, opts);
}
function assertObjectTypeCallProperty(node, opts) {
  assert("ObjectTypeCallProperty", node, opts);
}
function assertObjectTypeIndexer(node, opts) {
  assert("ObjectTypeIndexer", node, opts);
}
function assertObjectTypeProperty(node, opts) {
  assert("ObjectTypeProperty", node, opts);
}
function assertObjectTypeSpreadProperty(node, opts) {
  assert("ObjectTypeSpreadProperty", node, opts);
}
function assertOpaqueType(node, opts) {
  assert("OpaqueType", node, opts);
}
function assertQualifiedTypeIdentifier(node, opts) {
  assert("QualifiedTypeIdentifier", node, opts);
}
function assertStringLiteralTypeAnnotation(node, opts) {
  assert("StringLiteralTypeAnnotation", node, opts);
}
function assertStringTypeAnnotation(node, opts) {
  assert("StringTypeAnnotation", node, opts);
}
function assertSymbolTypeAnnotation(node, opts) {
  assert("SymbolTypeAnnotation", node, opts);
}
function assertThisTypeAnnotation(node, opts) {
  assert("ThisTypeAnnotation", node, opts);
}
function assertTupleTypeAnnotation(node, opts) {
  assert("TupleTypeAnnotation", node, opts);
}
function assertTypeofTypeAnnotation(node, opts) {
  assert("TypeofTypeAnnotation", node, opts);
}
function assertTypeAlias(node, opts) {
  assert("TypeAlias", node, opts);
}
function assertTypeAnnotation(node, opts) {
  assert("TypeAnnotation", node, opts);
}
function assertTypeCastExpression(node, opts) {
  assert("TypeCastExpression", node, opts);
}
function assertTypeParameter(node, opts) {
  assert("TypeParameter", node, opts);
}
function assertTypeParameterDeclaration(node, opts) {
  assert("TypeParameterDeclaration", node, opts);
}
function assertTypeParameterInstantiation(node, opts) {
  assert("TypeParameterInstantiation", node, opts);
}
function assertUnionTypeAnnotation(node, opts) {
  assert("UnionTypeAnnotation", node, opts);
}
function assertVariance(node, opts) {
  assert("Variance", node, opts);
}
function assertVoidTypeAnnotation(node, opts) {
  assert("VoidTypeAnnotation", node, opts);
}
function assertEnumDeclaration(node, opts) {
  assert("EnumDeclaration", node, opts);
}
function assertEnumBooleanBody(node, opts) {
  assert("EnumBooleanBody", node, opts);
}
function assertEnumNumberBody(node, opts) {
  assert("EnumNumberBody", node, opts);
}
function assertEnumStringBody(node, opts) {
  assert("EnumStringBody", node, opts);
}
function assertEnumSymbolBody(node, opts) {
  assert("EnumSymbolBody", node, opts);
}
function assertEnumBooleanMember(node, opts) {
  assert("EnumBooleanMember", node, opts);
}
function assertEnumNumberMember(node, opts) {
  assert("EnumNumberMember", node, opts);
}
function assertEnumStringMember(node, opts) {
  assert("EnumStringMember", node, opts);
}
function assertEnumDefaultedMember(node, opts) {
  assert("EnumDefaultedMember", node, opts);
}
function assertIndexedAccessType(node, opts) {
  assert("IndexedAccessType", node, opts);
}
function assertOptionalIndexedAccessType(node, opts) {
  assert("OptionalIndexedAccessType", node, opts);
}
function assertJSXAttribute(node, opts) {
  assert("JSXAttribute", node, opts);
}
function assertJSXClosingElement(node, opts) {
  assert("JSXClosingElement", node, opts);
}
function assertJSXElement(node, opts) {
  assert("JSXElement", node, opts);
}
function assertJSXEmptyExpression(node, opts) {
  assert("JSXEmptyExpression", node, opts);
}
function assertJSXExpressionContainer(node, opts) {
  assert("JSXExpressionContainer", node, opts);
}
function assertJSXSpreadChild(node, opts) {
  assert("JSXSpreadChild", node, opts);
}
function assertJSXIdentifier(node, opts) {
  assert("JSXIdentifier", node, opts);
}
function assertJSXMemberExpression(node, opts) {
  assert("JSXMemberExpression", node, opts);
}
function assertJSXNamespacedName(node, opts) {
  assert("JSXNamespacedName", node, opts);
}
function assertJSXOpeningElement(node, opts) {
  assert("JSXOpeningElement", node, opts);
}
function assertJSXSpreadAttribute(node, opts) {
  assert("JSXSpreadAttribute", node, opts);
}
function assertJSXText(node, opts) {
  assert("JSXText", node, opts);
}
function assertJSXFragment(node, opts) {
  assert("JSXFragment", node, opts);
}
function assertJSXOpeningFragment(node, opts) {
  assert("JSXOpeningFragment", node, opts);
}
function assertJSXClosingFragment(node, opts) {
  assert("JSXClosingFragment", node, opts);
}
function assertNoop(node, opts) {
  assert("Noop", node, opts);
}
function assertPlaceholder(node, opts) {
  assert("Placeholder", node, opts);
}
function assertV8IntrinsicIdentifier(node, opts) {
  assert("V8IntrinsicIdentifier", node, opts);
}
function assertArgumentPlaceholder(node, opts) {
  assert("ArgumentPlaceholder", node, opts);
}
function assertBindExpression(node, opts) {
  assert("BindExpression", node, opts);
}
function assertImportAttribute(node, opts) {
  assert("ImportAttribute", node, opts);
}
function assertDecorator(node, opts) {
  assert("Decorator", node, opts);
}
function assertDoExpression(node, opts) {
  assert("DoExpression", node, opts);
}
function assertExportDefaultSpecifier(node, opts) {
  assert("ExportDefaultSpecifier", node, opts);
}
function assertRecordExpression(node, opts) {
  assert("RecordExpression", node, opts);
}
function assertTupleExpression(node, opts) {
  assert("TupleExpression", node, opts);
}
function assertDecimalLiteral(node, opts) {
  assert("DecimalLiteral", node, opts);
}
function assertModuleExpression(node, opts) {
  assert("ModuleExpression", node, opts);
}
function assertTopicReference(node, opts) {
  assert("TopicReference", node, opts);
}
function assertPipelineTopicExpression(node, opts) {
  assert("PipelineTopicExpression", node, opts);
}
function assertPipelineBareFunction(node, opts) {
  assert("PipelineBareFunction", node, opts);
}
function assertPipelinePrimaryTopicReference(node, opts) {
  assert("PipelinePrimaryTopicReference", node, opts);
}
function assertTSParameterProperty(node, opts) {
  assert("TSParameterProperty", node, opts);
}
function assertTSDeclareFunction(node, opts) {
  assert("TSDeclareFunction", node, opts);
}
function assertTSDeclareMethod(node, opts) {
  assert("TSDeclareMethod", node, opts);
}
function assertTSQualifiedName(node, opts) {
  assert("TSQualifiedName", node, opts);
}
function assertTSCallSignatureDeclaration(node, opts) {
  assert("TSCallSignatureDeclaration", node, opts);
}
function assertTSConstructSignatureDeclaration(node, opts) {
  assert("TSConstructSignatureDeclaration", node, opts);
}
function assertTSPropertySignature(node, opts) {
  assert("TSPropertySignature", node, opts);
}
function assertTSMethodSignature(node, opts) {
  assert("TSMethodSignature", node, opts);
}
function assertTSIndexSignature(node, opts) {
  assert("TSIndexSignature", node, opts);
}
function assertTSAnyKeyword(node, opts) {
  assert("TSAnyKeyword", node, opts);
}
function assertTSBooleanKeyword(node, opts) {
  assert("TSBooleanKeyword", node, opts);
}
function assertTSBigIntKeyword(node, opts) {
  assert("TSBigIntKeyword", node, opts);
}
function assertTSIntrinsicKeyword(node, opts) {
  assert("TSIntrinsicKeyword", node, opts);
}
function assertTSNeverKeyword(node, opts) {
  assert("TSNeverKeyword", node, opts);
}
function assertTSNullKeyword(node, opts) {
  assert("TSNullKeyword", node, opts);
}
function assertTSNumberKeyword(node, opts) {
  assert("TSNumberKeyword", node, opts);
}
function assertTSObjectKeyword(node, opts) {
  assert("TSObjectKeyword", node, opts);
}
function assertTSStringKeyword(node, opts) {
  assert("TSStringKeyword", node, opts);
}
function assertTSSymbolKeyword(node, opts) {
  assert("TSSymbolKeyword", node, opts);
}
function assertTSUndefinedKeyword(node, opts) {
  assert("TSUndefinedKeyword", node, opts);
}
function assertTSUnknownKeyword(node, opts) {
  assert("TSUnknownKeyword", node, opts);
}
function assertTSVoidKeyword(node, opts) {
  assert("TSVoidKeyword", node, opts);
}
function assertTSThisType(node, opts) {
  assert("TSThisType", node, opts);
}
function assertTSFunctionType(node, opts) {
  assert("TSFunctionType", node, opts);
}
function assertTSConstructorType(node, opts) {
  assert("TSConstructorType", node, opts);
}
function assertTSTypeReference(node, opts) {
  assert("TSTypeReference", node, opts);
}
function assertTSTypePredicate(node, opts) {
  assert("TSTypePredicate", node, opts);
}
function assertTSTypeQuery(node, opts) {
  assert("TSTypeQuery", node, opts);
}
function assertTSTypeLiteral(node, opts) {
  assert("TSTypeLiteral", node, opts);
}
function assertTSArrayType(node, opts) {
  assert("TSArrayType", node, opts);
}
function assertTSTupleType(node, opts) {
  assert("TSTupleType", node, opts);
}
function assertTSOptionalType(node, opts) {
  assert("TSOptionalType", node, opts);
}
function assertTSRestType(node, opts) {
  assert("TSRestType", node, opts);
}
function assertTSNamedTupleMember(node, opts) {
  assert("TSNamedTupleMember", node, opts);
}
function assertTSUnionType(node, opts) {
  assert("TSUnionType", node, opts);
}
function assertTSIntersectionType(node, opts) {
  assert("TSIntersectionType", node, opts);
}
function assertTSConditionalType(node, opts) {
  assert("TSConditionalType", node, opts);
}
function assertTSInferType(node, opts) {
  assert("TSInferType", node, opts);
}
function assertTSParenthesizedType(node, opts) {
  assert("TSParenthesizedType", node, opts);
}
function assertTSTypeOperator(node, opts) {
  assert("TSTypeOperator", node, opts);
}
function assertTSIndexedAccessType(node, opts) {
  assert("TSIndexedAccessType", node, opts);
}
function assertTSMappedType(node, opts) {
  assert("TSMappedType", node, opts);
}
function assertTSLiteralType(node, opts) {
  assert("TSLiteralType", node, opts);
}
function assertTSExpressionWithTypeArguments(node, opts) {
  assert("TSExpressionWithTypeArguments", node, opts);
}
function assertTSInterfaceDeclaration(node, opts) {
  assert("TSInterfaceDeclaration", node, opts);
}
function assertTSInterfaceBody(node, opts) {
  assert("TSInterfaceBody", node, opts);
}
function assertTSTypeAliasDeclaration(node, opts) {
  assert("TSTypeAliasDeclaration", node, opts);
}
function assertTSAsExpression(node, opts) {
  assert("TSAsExpression", node, opts);
}
function assertTSTypeAssertion(node, opts) {
  assert("TSTypeAssertion", node, opts);
}
function assertTSEnumDeclaration(node, opts) {
  assert("TSEnumDeclaration", node, opts);
}
function assertTSEnumMember(node, opts) {
  assert("TSEnumMember", node, opts);
}
function assertTSModuleDeclaration(node, opts) {
  assert("TSModuleDeclaration", node, opts);
}
function assertTSModuleBlock(node, opts) {
  assert("TSModuleBlock", node, opts);
}
function assertTSImportType(node, opts) {
  assert("TSImportType", node, opts);
}
function assertTSImportEqualsDeclaration(node, opts) {
  assert("TSImportEqualsDeclaration", node, opts);
}
function assertTSExternalModuleReference(node, opts) {
  assert("TSExternalModuleReference", node, opts);
}
function assertTSNonNullExpression(node, opts) {
  assert("TSNonNullExpression", node, opts);
}
function assertTSExportAssignment(node, opts) {
  assert("TSExportAssignment", node, opts);
}
function assertTSNamespaceExportDeclaration(node, opts) {
  assert("TSNamespaceExportDeclaration", node, opts);
}
function assertTSTypeAnnotation(node, opts) {
  assert("TSTypeAnnotation", node, opts);
}
function assertTSTypeParameterInstantiation(node, opts) {
  assert("TSTypeParameterInstantiation", node, opts);
}
function assertTSTypeParameterDeclaration(node, opts) {
  assert("TSTypeParameterDeclaration", node, opts);
}
function assertTSTypeParameter(node, opts) {
  assert("TSTypeParameter", node, opts);
}
function assertStandardized(node, opts) {
  assert("Standardized", node, opts);
}
function assertExpression(node, opts) {
  assert("Expression", node, opts);
}
function assertBinary(node, opts) {
  assert("Binary", node, opts);
}
function assertScopable(node, opts) {
  assert("Scopable", node, opts);
}
function assertBlockParent(node, opts) {
  assert("BlockParent", node, opts);
}
function assertBlock(node, opts) {
  assert("Block", node, opts);
}
function assertStatement(node, opts) {
  assert("Statement", node, opts);
}
function assertTerminatorless(node, opts) {
  assert("Terminatorless", node, opts);
}
function assertCompletionStatement(node, opts) {
  assert("CompletionStatement", node, opts);
}
function assertConditional(node, opts) {
  assert("Conditional", node, opts);
}
function assertLoop(node, opts) {
  assert("Loop", node, opts);
}
function assertWhile(node, opts) {
  assert("While", node, opts);
}
function assertExpressionWrapper(node, opts) {
  assert("ExpressionWrapper", node, opts);
}
function assertFor(node, opts) {
  assert("For", node, opts);
}
function assertForXStatement(node, opts) {
  assert("ForXStatement", node, opts);
}
function assertFunction(node, opts) {
  assert("Function", node, opts);
}
function assertFunctionParent(node, opts) {
  assert("FunctionParent", node, opts);
}
function assertPureish(node, opts) {
  assert("Pureish", node, opts);
}
function assertDeclaration(node, opts) {
  assert("Declaration", node, opts);
}
function assertPatternLike(node, opts) {
  assert("PatternLike", node, opts);
}
function assertLVal(node, opts) {
  assert("LVal", node, opts);
}
function assertTSEntityName(node, opts) {
  assert("TSEntityName", node, opts);
}
function assertLiteral(node, opts) {
  assert("Literal", node, opts);
}
function assertImmutable(node, opts) {
  assert("Immutable", node, opts);
}
function assertUserWhitespacable(node, opts) {
  assert("UserWhitespacable", node, opts);
}
function assertMethod(node, opts) {
  assert("Method", node, opts);
}
function assertObjectMember(node, opts) {
  assert("ObjectMember", node, opts);
}
function assertProperty(node, opts) {
  assert("Property", node, opts);
}
function assertUnaryLike(node, opts) {
  assert("UnaryLike", node, opts);
}
function assertPattern(node, opts) {
  assert("Pattern", node, opts);
}
function assertClass(node, opts) {
  assert("Class", node, opts);
}
function assertModuleDeclaration(node, opts) {
  assert("ModuleDeclaration", node, opts);
}
function assertExportDeclaration(node, opts) {
  assert("ExportDeclaration", node, opts);
}
function assertModuleSpecifier(node, opts) {
  assert("ModuleSpecifier", node, opts);
}
function assertAccessor(node, opts) {
  assert("Accessor", node, opts);
}
function assertPrivate(node, opts) {
  assert("Private", node, opts);
}
function assertFlow(node, opts) {
  assert("Flow", node, opts);
}
function assertFlowType(node, opts) {
  assert("FlowType", node, opts);
}
function assertFlowBaseAnnotation(node, opts) {
  assert("FlowBaseAnnotation", node, opts);
}
function assertFlowDeclaration(node, opts) {
  assert("FlowDeclaration", node, opts);
}
function assertFlowPredicate(node, opts) {
  assert("FlowPredicate", node, opts);
}
function assertEnumBody(node, opts) {
  assert("EnumBody", node, opts);
}
function assertEnumMember(node, opts) {
  assert("EnumMember", node, opts);
}
function assertJSX(node, opts) {
  assert("JSX", node, opts);
}
function assertMiscellaneous(node, opts) {
  assert("Miscellaneous", node, opts);
}
function assertTypeScript(node, opts) {
  assert("TypeScript", node, opts);
}
function assertTSTypeElement(node, opts) {
  assert("TSTypeElement", node, opts);
}
function assertTSType(node, opts) {
  assert("TSType", node, opts);
}
function assertTSBaseType(node, opts) {
  assert("TSBaseType", node, opts);
}
function assertNumberLiteral(node, opts) {
  console.trace("The node type NumberLiteral has been renamed to NumericLiteral");
  assert("NumberLiteral", node, opts);
}
function assertRegexLiteral(node, opts) {
  console.trace("The node type RegexLiteral has been renamed to RegExpLiteral");
  assert("RegexLiteral", node, opts);
}
function assertRestProperty(node, opts) {
  console.trace("The node type RestProperty has been renamed to RestElement");
  assert("RestProperty", node, opts);
}
function assertSpreadProperty(node, opts) {
  console.trace("The node type SpreadProperty has been renamed to SpreadElement");
  assert("SpreadProperty", node, opts);
}
var createTypeAnnotationBasedOnTypeof$1 = {};
Object.defineProperty(createTypeAnnotationBasedOnTypeof$1, "__esModule", {
  value: true
});
createTypeAnnotationBasedOnTypeof$1.default = void 0;
var _generated$l = generated$3;
var _default$4 = createTypeAnnotationBasedOnTypeof;
createTypeAnnotationBasedOnTypeof$1.default = _default$4;
function createTypeAnnotationBasedOnTypeof(type) {
  switch (type) {
    case "string":
      return (0, _generated$l.stringTypeAnnotation)();
    case "number":
      return (0, _generated$l.numberTypeAnnotation)();
    case "undefined":
      return (0, _generated$l.voidTypeAnnotation)();
    case "boolean":
      return (0, _generated$l.booleanTypeAnnotation)();
    case "function":
      return (0, _generated$l.genericTypeAnnotation)((0, _generated$l.identifier)("Function"));
    case "object":
      return (0, _generated$l.genericTypeAnnotation)((0, _generated$l.identifier)("Object"));
    case "symbol":
      return (0, _generated$l.genericTypeAnnotation)((0, _generated$l.identifier)("Symbol"));
    case "bigint":
      return (0, _generated$l.anyTypeAnnotation)();
  }
  throw new Error("Invalid typeof value: " + type);
}
var createFlowUnionType$1 = {};
var removeTypeDuplicates$3 = {};
Object.defineProperty(removeTypeDuplicates$3, "__esModule", {
  value: true
});
removeTypeDuplicates$3.default = removeTypeDuplicates$2;
var _generated$k = generated$4;
function getQualifiedName(node) {
  return (0, _generated$k.isIdentifier)(node) ? node.name : `${node.id.name}.${getQualifiedName(node.qualification)}`;
}
function removeTypeDuplicates$2(nodes) {
  const generics = {};
  const bases = {};
  const typeGroups = /* @__PURE__ */ new Set();
  const types = [];
  for (let i2 = 0; i2 < nodes.length; i2++) {
    const node = nodes[i2];
    if (!node)
      continue;
    if (types.indexOf(node) >= 0) {
      continue;
    }
    if ((0, _generated$k.isAnyTypeAnnotation)(node)) {
      return [node];
    }
    if ((0, _generated$k.isFlowBaseAnnotation)(node)) {
      bases[node.type] = node;
      continue;
    }
    if ((0, _generated$k.isUnionTypeAnnotation)(node)) {
      if (!typeGroups.has(node.types)) {
        nodes = nodes.concat(node.types);
        typeGroups.add(node.types);
      }
      continue;
    }
    if ((0, _generated$k.isGenericTypeAnnotation)(node)) {
      const name = getQualifiedName(node.id);
      if (generics[name]) {
        let existing = generics[name];
        if (existing.typeParameters) {
          if (node.typeParameters) {
            existing.typeParameters.params = removeTypeDuplicates$2(existing.typeParameters.params.concat(node.typeParameters.params));
          }
        } else {
          existing = node.typeParameters;
        }
      } else {
        generics[name] = node;
      }
      continue;
    }
    types.push(node);
  }
  for (const type of Object.keys(bases)) {
    types.push(bases[type]);
  }
  for (const name of Object.keys(generics)) {
    types.push(generics[name]);
  }
  return types;
}
Object.defineProperty(createFlowUnionType$1, "__esModule", {
  value: true
});
createFlowUnionType$1.default = createFlowUnionType;
var _generated$j = generated$3;
var _removeTypeDuplicates$1 = removeTypeDuplicates$3;
function createFlowUnionType(types) {
  const flattened = (0, _removeTypeDuplicates$1.default)(types);
  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return (0, _generated$j.unionTypeAnnotation)(flattened);
  }
}
var createTSUnionType$1 = {};
var removeTypeDuplicates$1 = {};
Object.defineProperty(removeTypeDuplicates$1, "__esModule", {
  value: true
});
removeTypeDuplicates$1.default = removeTypeDuplicates;
var _generated$i = generated$4;
function removeTypeDuplicates(nodes) {
  const generics = {};
  const bases = {};
  const typeGroups = /* @__PURE__ */ new Set();
  const types = [];
  for (let i2 = 0; i2 < nodes.length; i2++) {
    const node = nodes[i2];
    if (!node)
      continue;
    if (types.indexOf(node) >= 0) {
      continue;
    }
    if ((0, _generated$i.isTSAnyKeyword)(node)) {
      return [node];
    }
    if ((0, _generated$i.isTSBaseType)(node)) {
      bases[node.type] = node;
      continue;
    }
    if ((0, _generated$i.isTSUnionType)(node)) {
      if (!typeGroups.has(node.types)) {
        nodes.push(...node.types);
        typeGroups.add(node.types);
      }
      continue;
    }
    types.push(node);
  }
  for (const type of Object.keys(bases)) {
    types.push(bases[type]);
  }
  for (const name of Object.keys(generics)) {
    types.push(generics[name]);
  }
  return types;
}
Object.defineProperty(createTSUnionType$1, "__esModule", {
  value: true
});
createTSUnionType$1.default = createTSUnionType;
var _generated$h = generated$3;
var _removeTypeDuplicates = removeTypeDuplicates$1;
function createTSUnionType(typeAnnotations) {
  const types = typeAnnotations.map((type) => type.typeAnnotation);
  const flattened = (0, _removeTypeDuplicates.default)(types);
  if (flattened.length === 1) {
    return flattened[0];
  } else {
    return (0, _generated$h.tsUnionType)(flattened);
  }
}
var uppercase = {};
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  Object.defineProperty(exports2, "AnyTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.anyTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "ArgumentPlaceholder", {
    enumerable: true,
    get: function() {
      return _index.argumentPlaceholder;
    }
  });
  Object.defineProperty(exports2, "ArrayExpression", {
    enumerable: true,
    get: function() {
      return _index.arrayExpression;
    }
  });
  Object.defineProperty(exports2, "ArrayPattern", {
    enumerable: true,
    get: function() {
      return _index.arrayPattern;
    }
  });
  Object.defineProperty(exports2, "ArrayTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.arrayTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "ArrowFunctionExpression", {
    enumerable: true,
    get: function() {
      return _index.arrowFunctionExpression;
    }
  });
  Object.defineProperty(exports2, "AssignmentExpression", {
    enumerable: true,
    get: function() {
      return _index.assignmentExpression;
    }
  });
  Object.defineProperty(exports2, "AssignmentPattern", {
    enumerable: true,
    get: function() {
      return _index.assignmentPattern;
    }
  });
  Object.defineProperty(exports2, "AwaitExpression", {
    enumerable: true,
    get: function() {
      return _index.awaitExpression;
    }
  });
  Object.defineProperty(exports2, "BigIntLiteral", {
    enumerable: true,
    get: function() {
      return _index.bigIntLiteral;
    }
  });
  Object.defineProperty(exports2, "BinaryExpression", {
    enumerable: true,
    get: function() {
      return _index.binaryExpression;
    }
  });
  Object.defineProperty(exports2, "BindExpression", {
    enumerable: true,
    get: function() {
      return _index.bindExpression;
    }
  });
  Object.defineProperty(exports2, "BlockStatement", {
    enumerable: true,
    get: function() {
      return _index.blockStatement;
    }
  });
  Object.defineProperty(exports2, "BooleanLiteral", {
    enumerable: true,
    get: function() {
      return _index.booleanLiteral;
    }
  });
  Object.defineProperty(exports2, "BooleanLiteralTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.booleanLiteralTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "BooleanTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.booleanTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "BreakStatement", {
    enumerable: true,
    get: function() {
      return _index.breakStatement;
    }
  });
  Object.defineProperty(exports2, "CallExpression", {
    enumerable: true,
    get: function() {
      return _index.callExpression;
    }
  });
  Object.defineProperty(exports2, "CatchClause", {
    enumerable: true,
    get: function() {
      return _index.catchClause;
    }
  });
  Object.defineProperty(exports2, "ClassAccessorProperty", {
    enumerable: true,
    get: function() {
      return _index.classAccessorProperty;
    }
  });
  Object.defineProperty(exports2, "ClassBody", {
    enumerable: true,
    get: function() {
      return _index.classBody;
    }
  });
  Object.defineProperty(exports2, "ClassDeclaration", {
    enumerable: true,
    get: function() {
      return _index.classDeclaration;
    }
  });
  Object.defineProperty(exports2, "ClassExpression", {
    enumerable: true,
    get: function() {
      return _index.classExpression;
    }
  });
  Object.defineProperty(exports2, "ClassImplements", {
    enumerable: true,
    get: function() {
      return _index.classImplements;
    }
  });
  Object.defineProperty(exports2, "ClassMethod", {
    enumerable: true,
    get: function() {
      return _index.classMethod;
    }
  });
  Object.defineProperty(exports2, "ClassPrivateMethod", {
    enumerable: true,
    get: function() {
      return _index.classPrivateMethod;
    }
  });
  Object.defineProperty(exports2, "ClassPrivateProperty", {
    enumerable: true,
    get: function() {
      return _index.classPrivateProperty;
    }
  });
  Object.defineProperty(exports2, "ClassProperty", {
    enumerable: true,
    get: function() {
      return _index.classProperty;
    }
  });
  Object.defineProperty(exports2, "ConditionalExpression", {
    enumerable: true,
    get: function() {
      return _index.conditionalExpression;
    }
  });
  Object.defineProperty(exports2, "ContinueStatement", {
    enumerable: true,
    get: function() {
      return _index.continueStatement;
    }
  });
  Object.defineProperty(exports2, "DebuggerStatement", {
    enumerable: true,
    get: function() {
      return _index.debuggerStatement;
    }
  });
  Object.defineProperty(exports2, "DecimalLiteral", {
    enumerable: true,
    get: function() {
      return _index.decimalLiteral;
    }
  });
  Object.defineProperty(exports2, "DeclareClass", {
    enumerable: true,
    get: function() {
      return _index.declareClass;
    }
  });
  Object.defineProperty(exports2, "DeclareExportAllDeclaration", {
    enumerable: true,
    get: function() {
      return _index.declareExportAllDeclaration;
    }
  });
  Object.defineProperty(exports2, "DeclareExportDeclaration", {
    enumerable: true,
    get: function() {
      return _index.declareExportDeclaration;
    }
  });
  Object.defineProperty(exports2, "DeclareFunction", {
    enumerable: true,
    get: function() {
      return _index.declareFunction;
    }
  });
  Object.defineProperty(exports2, "DeclareInterface", {
    enumerable: true,
    get: function() {
      return _index.declareInterface;
    }
  });
  Object.defineProperty(exports2, "DeclareModule", {
    enumerable: true,
    get: function() {
      return _index.declareModule;
    }
  });
  Object.defineProperty(exports2, "DeclareModuleExports", {
    enumerable: true,
    get: function() {
      return _index.declareModuleExports;
    }
  });
  Object.defineProperty(exports2, "DeclareOpaqueType", {
    enumerable: true,
    get: function() {
      return _index.declareOpaqueType;
    }
  });
  Object.defineProperty(exports2, "DeclareTypeAlias", {
    enumerable: true,
    get: function() {
      return _index.declareTypeAlias;
    }
  });
  Object.defineProperty(exports2, "DeclareVariable", {
    enumerable: true,
    get: function() {
      return _index.declareVariable;
    }
  });
  Object.defineProperty(exports2, "DeclaredPredicate", {
    enumerable: true,
    get: function() {
      return _index.declaredPredicate;
    }
  });
  Object.defineProperty(exports2, "Decorator", {
    enumerable: true,
    get: function() {
      return _index.decorator;
    }
  });
  Object.defineProperty(exports2, "Directive", {
    enumerable: true,
    get: function() {
      return _index.directive;
    }
  });
  Object.defineProperty(exports2, "DirectiveLiteral", {
    enumerable: true,
    get: function() {
      return _index.directiveLiteral;
    }
  });
  Object.defineProperty(exports2, "DoExpression", {
    enumerable: true,
    get: function() {
      return _index.doExpression;
    }
  });
  Object.defineProperty(exports2, "DoWhileStatement", {
    enumerable: true,
    get: function() {
      return _index.doWhileStatement;
    }
  });
  Object.defineProperty(exports2, "EmptyStatement", {
    enumerable: true,
    get: function() {
      return _index.emptyStatement;
    }
  });
  Object.defineProperty(exports2, "EmptyTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.emptyTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "EnumBooleanBody", {
    enumerable: true,
    get: function() {
      return _index.enumBooleanBody;
    }
  });
  Object.defineProperty(exports2, "EnumBooleanMember", {
    enumerable: true,
    get: function() {
      return _index.enumBooleanMember;
    }
  });
  Object.defineProperty(exports2, "EnumDeclaration", {
    enumerable: true,
    get: function() {
      return _index.enumDeclaration;
    }
  });
  Object.defineProperty(exports2, "EnumDefaultedMember", {
    enumerable: true,
    get: function() {
      return _index.enumDefaultedMember;
    }
  });
  Object.defineProperty(exports2, "EnumNumberBody", {
    enumerable: true,
    get: function() {
      return _index.enumNumberBody;
    }
  });
  Object.defineProperty(exports2, "EnumNumberMember", {
    enumerable: true,
    get: function() {
      return _index.enumNumberMember;
    }
  });
  Object.defineProperty(exports2, "EnumStringBody", {
    enumerable: true,
    get: function() {
      return _index.enumStringBody;
    }
  });
  Object.defineProperty(exports2, "EnumStringMember", {
    enumerable: true,
    get: function() {
      return _index.enumStringMember;
    }
  });
  Object.defineProperty(exports2, "EnumSymbolBody", {
    enumerable: true,
    get: function() {
      return _index.enumSymbolBody;
    }
  });
  Object.defineProperty(exports2, "ExistsTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.existsTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "ExportAllDeclaration", {
    enumerable: true,
    get: function() {
      return _index.exportAllDeclaration;
    }
  });
  Object.defineProperty(exports2, "ExportDefaultDeclaration", {
    enumerable: true,
    get: function() {
      return _index.exportDefaultDeclaration;
    }
  });
  Object.defineProperty(exports2, "ExportDefaultSpecifier", {
    enumerable: true,
    get: function() {
      return _index.exportDefaultSpecifier;
    }
  });
  Object.defineProperty(exports2, "ExportNamedDeclaration", {
    enumerable: true,
    get: function() {
      return _index.exportNamedDeclaration;
    }
  });
  Object.defineProperty(exports2, "ExportNamespaceSpecifier", {
    enumerable: true,
    get: function() {
      return _index.exportNamespaceSpecifier;
    }
  });
  Object.defineProperty(exports2, "ExportSpecifier", {
    enumerable: true,
    get: function() {
      return _index.exportSpecifier;
    }
  });
  Object.defineProperty(exports2, "ExpressionStatement", {
    enumerable: true,
    get: function() {
      return _index.expressionStatement;
    }
  });
  Object.defineProperty(exports2, "File", {
    enumerable: true,
    get: function() {
      return _index.file;
    }
  });
  Object.defineProperty(exports2, "ForInStatement", {
    enumerable: true,
    get: function() {
      return _index.forInStatement;
    }
  });
  Object.defineProperty(exports2, "ForOfStatement", {
    enumerable: true,
    get: function() {
      return _index.forOfStatement;
    }
  });
  Object.defineProperty(exports2, "ForStatement", {
    enumerable: true,
    get: function() {
      return _index.forStatement;
    }
  });
  Object.defineProperty(exports2, "FunctionDeclaration", {
    enumerable: true,
    get: function() {
      return _index.functionDeclaration;
    }
  });
  Object.defineProperty(exports2, "FunctionExpression", {
    enumerable: true,
    get: function() {
      return _index.functionExpression;
    }
  });
  Object.defineProperty(exports2, "FunctionTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.functionTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "FunctionTypeParam", {
    enumerable: true,
    get: function() {
      return _index.functionTypeParam;
    }
  });
  Object.defineProperty(exports2, "GenericTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.genericTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "Identifier", {
    enumerable: true,
    get: function() {
      return _index.identifier;
    }
  });
  Object.defineProperty(exports2, "IfStatement", {
    enumerable: true,
    get: function() {
      return _index.ifStatement;
    }
  });
  Object.defineProperty(exports2, "Import", {
    enumerable: true,
    get: function() {
      return _index.import;
    }
  });
  Object.defineProperty(exports2, "ImportAttribute", {
    enumerable: true,
    get: function() {
      return _index.importAttribute;
    }
  });
  Object.defineProperty(exports2, "ImportDeclaration", {
    enumerable: true,
    get: function() {
      return _index.importDeclaration;
    }
  });
  Object.defineProperty(exports2, "ImportDefaultSpecifier", {
    enumerable: true,
    get: function() {
      return _index.importDefaultSpecifier;
    }
  });
  Object.defineProperty(exports2, "ImportNamespaceSpecifier", {
    enumerable: true,
    get: function() {
      return _index.importNamespaceSpecifier;
    }
  });
  Object.defineProperty(exports2, "ImportSpecifier", {
    enumerable: true,
    get: function() {
      return _index.importSpecifier;
    }
  });
  Object.defineProperty(exports2, "IndexedAccessType", {
    enumerable: true,
    get: function() {
      return _index.indexedAccessType;
    }
  });
  Object.defineProperty(exports2, "InferredPredicate", {
    enumerable: true,
    get: function() {
      return _index.inferredPredicate;
    }
  });
  Object.defineProperty(exports2, "InterfaceDeclaration", {
    enumerable: true,
    get: function() {
      return _index.interfaceDeclaration;
    }
  });
  Object.defineProperty(exports2, "InterfaceExtends", {
    enumerable: true,
    get: function() {
      return _index.interfaceExtends;
    }
  });
  Object.defineProperty(exports2, "InterfaceTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.interfaceTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "InterpreterDirective", {
    enumerable: true,
    get: function() {
      return _index.interpreterDirective;
    }
  });
  Object.defineProperty(exports2, "IntersectionTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.intersectionTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "JSXAttribute", {
    enumerable: true,
    get: function() {
      return _index.jsxAttribute;
    }
  });
  Object.defineProperty(exports2, "JSXClosingElement", {
    enumerable: true,
    get: function() {
      return _index.jsxClosingElement;
    }
  });
  Object.defineProperty(exports2, "JSXClosingFragment", {
    enumerable: true,
    get: function() {
      return _index.jsxClosingFragment;
    }
  });
  Object.defineProperty(exports2, "JSXElement", {
    enumerable: true,
    get: function() {
      return _index.jsxElement;
    }
  });
  Object.defineProperty(exports2, "JSXEmptyExpression", {
    enumerable: true,
    get: function() {
      return _index.jsxEmptyExpression;
    }
  });
  Object.defineProperty(exports2, "JSXExpressionContainer", {
    enumerable: true,
    get: function() {
      return _index.jsxExpressionContainer;
    }
  });
  Object.defineProperty(exports2, "JSXFragment", {
    enumerable: true,
    get: function() {
      return _index.jsxFragment;
    }
  });
  Object.defineProperty(exports2, "JSXIdentifier", {
    enumerable: true,
    get: function() {
      return _index.jsxIdentifier;
    }
  });
  Object.defineProperty(exports2, "JSXMemberExpression", {
    enumerable: true,
    get: function() {
      return _index.jsxMemberExpression;
    }
  });
  Object.defineProperty(exports2, "JSXNamespacedName", {
    enumerable: true,
    get: function() {
      return _index.jsxNamespacedName;
    }
  });
  Object.defineProperty(exports2, "JSXOpeningElement", {
    enumerable: true,
    get: function() {
      return _index.jsxOpeningElement;
    }
  });
  Object.defineProperty(exports2, "JSXOpeningFragment", {
    enumerable: true,
    get: function() {
      return _index.jsxOpeningFragment;
    }
  });
  Object.defineProperty(exports2, "JSXSpreadAttribute", {
    enumerable: true,
    get: function() {
      return _index.jsxSpreadAttribute;
    }
  });
  Object.defineProperty(exports2, "JSXSpreadChild", {
    enumerable: true,
    get: function() {
      return _index.jsxSpreadChild;
    }
  });
  Object.defineProperty(exports2, "JSXText", {
    enumerable: true,
    get: function() {
      return _index.jsxText;
    }
  });
  Object.defineProperty(exports2, "LabeledStatement", {
    enumerable: true,
    get: function() {
      return _index.labeledStatement;
    }
  });
  Object.defineProperty(exports2, "LogicalExpression", {
    enumerable: true,
    get: function() {
      return _index.logicalExpression;
    }
  });
  Object.defineProperty(exports2, "MemberExpression", {
    enumerable: true,
    get: function() {
      return _index.memberExpression;
    }
  });
  Object.defineProperty(exports2, "MetaProperty", {
    enumerable: true,
    get: function() {
      return _index.metaProperty;
    }
  });
  Object.defineProperty(exports2, "MixedTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.mixedTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "ModuleExpression", {
    enumerable: true,
    get: function() {
      return _index.moduleExpression;
    }
  });
  Object.defineProperty(exports2, "NewExpression", {
    enumerable: true,
    get: function() {
      return _index.newExpression;
    }
  });
  Object.defineProperty(exports2, "Noop", {
    enumerable: true,
    get: function() {
      return _index.noop;
    }
  });
  Object.defineProperty(exports2, "NullLiteral", {
    enumerable: true,
    get: function() {
      return _index.nullLiteral;
    }
  });
  Object.defineProperty(exports2, "NullLiteralTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.nullLiteralTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "NullableTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.nullableTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "NumberLiteral", {
    enumerable: true,
    get: function() {
      return _index.numberLiteral;
    }
  });
  Object.defineProperty(exports2, "NumberLiteralTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.numberLiteralTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "NumberTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.numberTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "NumericLiteral", {
    enumerable: true,
    get: function() {
      return _index.numericLiteral;
    }
  });
  Object.defineProperty(exports2, "ObjectExpression", {
    enumerable: true,
    get: function() {
      return _index.objectExpression;
    }
  });
  Object.defineProperty(exports2, "ObjectMethod", {
    enumerable: true,
    get: function() {
      return _index.objectMethod;
    }
  });
  Object.defineProperty(exports2, "ObjectPattern", {
    enumerable: true,
    get: function() {
      return _index.objectPattern;
    }
  });
  Object.defineProperty(exports2, "ObjectProperty", {
    enumerable: true,
    get: function() {
      return _index.objectProperty;
    }
  });
  Object.defineProperty(exports2, "ObjectTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.objectTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "ObjectTypeCallProperty", {
    enumerable: true,
    get: function() {
      return _index.objectTypeCallProperty;
    }
  });
  Object.defineProperty(exports2, "ObjectTypeIndexer", {
    enumerable: true,
    get: function() {
      return _index.objectTypeIndexer;
    }
  });
  Object.defineProperty(exports2, "ObjectTypeInternalSlot", {
    enumerable: true,
    get: function() {
      return _index.objectTypeInternalSlot;
    }
  });
  Object.defineProperty(exports2, "ObjectTypeProperty", {
    enumerable: true,
    get: function() {
      return _index.objectTypeProperty;
    }
  });
  Object.defineProperty(exports2, "ObjectTypeSpreadProperty", {
    enumerable: true,
    get: function() {
      return _index.objectTypeSpreadProperty;
    }
  });
  Object.defineProperty(exports2, "OpaqueType", {
    enumerable: true,
    get: function() {
      return _index.opaqueType;
    }
  });
  Object.defineProperty(exports2, "OptionalCallExpression", {
    enumerable: true,
    get: function() {
      return _index.optionalCallExpression;
    }
  });
  Object.defineProperty(exports2, "OptionalIndexedAccessType", {
    enumerable: true,
    get: function() {
      return _index.optionalIndexedAccessType;
    }
  });
  Object.defineProperty(exports2, "OptionalMemberExpression", {
    enumerable: true,
    get: function() {
      return _index.optionalMemberExpression;
    }
  });
  Object.defineProperty(exports2, "ParenthesizedExpression", {
    enumerable: true,
    get: function() {
      return _index.parenthesizedExpression;
    }
  });
  Object.defineProperty(exports2, "PipelineBareFunction", {
    enumerable: true,
    get: function() {
      return _index.pipelineBareFunction;
    }
  });
  Object.defineProperty(exports2, "PipelinePrimaryTopicReference", {
    enumerable: true,
    get: function() {
      return _index.pipelinePrimaryTopicReference;
    }
  });
  Object.defineProperty(exports2, "PipelineTopicExpression", {
    enumerable: true,
    get: function() {
      return _index.pipelineTopicExpression;
    }
  });
  Object.defineProperty(exports2, "Placeholder", {
    enumerable: true,
    get: function() {
      return _index.placeholder;
    }
  });
  Object.defineProperty(exports2, "PrivateName", {
    enumerable: true,
    get: function() {
      return _index.privateName;
    }
  });
  Object.defineProperty(exports2, "Program", {
    enumerable: true,
    get: function() {
      return _index.program;
    }
  });
  Object.defineProperty(exports2, "QualifiedTypeIdentifier", {
    enumerable: true,
    get: function() {
      return _index.qualifiedTypeIdentifier;
    }
  });
  Object.defineProperty(exports2, "RecordExpression", {
    enumerable: true,
    get: function() {
      return _index.recordExpression;
    }
  });
  Object.defineProperty(exports2, "RegExpLiteral", {
    enumerable: true,
    get: function() {
      return _index.regExpLiteral;
    }
  });
  Object.defineProperty(exports2, "RegexLiteral", {
    enumerable: true,
    get: function() {
      return _index.regexLiteral;
    }
  });
  Object.defineProperty(exports2, "RestElement", {
    enumerable: true,
    get: function() {
      return _index.restElement;
    }
  });
  Object.defineProperty(exports2, "RestProperty", {
    enumerable: true,
    get: function() {
      return _index.restProperty;
    }
  });
  Object.defineProperty(exports2, "ReturnStatement", {
    enumerable: true,
    get: function() {
      return _index.returnStatement;
    }
  });
  Object.defineProperty(exports2, "SequenceExpression", {
    enumerable: true,
    get: function() {
      return _index.sequenceExpression;
    }
  });
  Object.defineProperty(exports2, "SpreadElement", {
    enumerable: true,
    get: function() {
      return _index.spreadElement;
    }
  });
  Object.defineProperty(exports2, "SpreadProperty", {
    enumerable: true,
    get: function() {
      return _index.spreadProperty;
    }
  });
  Object.defineProperty(exports2, "StaticBlock", {
    enumerable: true,
    get: function() {
      return _index.staticBlock;
    }
  });
  Object.defineProperty(exports2, "StringLiteral", {
    enumerable: true,
    get: function() {
      return _index.stringLiteral;
    }
  });
  Object.defineProperty(exports2, "StringLiteralTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.stringLiteralTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "StringTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.stringTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "Super", {
    enumerable: true,
    get: function() {
      return _index.super;
    }
  });
  Object.defineProperty(exports2, "SwitchCase", {
    enumerable: true,
    get: function() {
      return _index.switchCase;
    }
  });
  Object.defineProperty(exports2, "SwitchStatement", {
    enumerable: true,
    get: function() {
      return _index.switchStatement;
    }
  });
  Object.defineProperty(exports2, "SymbolTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.symbolTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "TSAnyKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsAnyKeyword;
    }
  });
  Object.defineProperty(exports2, "TSArrayType", {
    enumerable: true,
    get: function() {
      return _index.tsArrayType;
    }
  });
  Object.defineProperty(exports2, "TSAsExpression", {
    enumerable: true,
    get: function() {
      return _index.tsAsExpression;
    }
  });
  Object.defineProperty(exports2, "TSBigIntKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsBigIntKeyword;
    }
  });
  Object.defineProperty(exports2, "TSBooleanKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsBooleanKeyword;
    }
  });
  Object.defineProperty(exports2, "TSCallSignatureDeclaration", {
    enumerable: true,
    get: function() {
      return _index.tsCallSignatureDeclaration;
    }
  });
  Object.defineProperty(exports2, "TSConditionalType", {
    enumerable: true,
    get: function() {
      return _index.tsConditionalType;
    }
  });
  Object.defineProperty(exports2, "TSConstructSignatureDeclaration", {
    enumerable: true,
    get: function() {
      return _index.tsConstructSignatureDeclaration;
    }
  });
  Object.defineProperty(exports2, "TSConstructorType", {
    enumerable: true,
    get: function() {
      return _index.tsConstructorType;
    }
  });
  Object.defineProperty(exports2, "TSDeclareFunction", {
    enumerable: true,
    get: function() {
      return _index.tsDeclareFunction;
    }
  });
  Object.defineProperty(exports2, "TSDeclareMethod", {
    enumerable: true,
    get: function() {
      return _index.tsDeclareMethod;
    }
  });
  Object.defineProperty(exports2, "TSEnumDeclaration", {
    enumerable: true,
    get: function() {
      return _index.tsEnumDeclaration;
    }
  });
  Object.defineProperty(exports2, "TSEnumMember", {
    enumerable: true,
    get: function() {
      return _index.tsEnumMember;
    }
  });
  Object.defineProperty(exports2, "TSExportAssignment", {
    enumerable: true,
    get: function() {
      return _index.tsExportAssignment;
    }
  });
  Object.defineProperty(exports2, "TSExpressionWithTypeArguments", {
    enumerable: true,
    get: function() {
      return _index.tsExpressionWithTypeArguments;
    }
  });
  Object.defineProperty(exports2, "TSExternalModuleReference", {
    enumerable: true,
    get: function() {
      return _index.tsExternalModuleReference;
    }
  });
  Object.defineProperty(exports2, "TSFunctionType", {
    enumerable: true,
    get: function() {
      return _index.tsFunctionType;
    }
  });
  Object.defineProperty(exports2, "TSImportEqualsDeclaration", {
    enumerable: true,
    get: function() {
      return _index.tsImportEqualsDeclaration;
    }
  });
  Object.defineProperty(exports2, "TSImportType", {
    enumerable: true,
    get: function() {
      return _index.tsImportType;
    }
  });
  Object.defineProperty(exports2, "TSIndexSignature", {
    enumerable: true,
    get: function() {
      return _index.tsIndexSignature;
    }
  });
  Object.defineProperty(exports2, "TSIndexedAccessType", {
    enumerable: true,
    get: function() {
      return _index.tsIndexedAccessType;
    }
  });
  Object.defineProperty(exports2, "TSInferType", {
    enumerable: true,
    get: function() {
      return _index.tsInferType;
    }
  });
  Object.defineProperty(exports2, "TSInterfaceBody", {
    enumerable: true,
    get: function() {
      return _index.tsInterfaceBody;
    }
  });
  Object.defineProperty(exports2, "TSInterfaceDeclaration", {
    enumerable: true,
    get: function() {
      return _index.tsInterfaceDeclaration;
    }
  });
  Object.defineProperty(exports2, "TSIntersectionType", {
    enumerable: true,
    get: function() {
      return _index.tsIntersectionType;
    }
  });
  Object.defineProperty(exports2, "TSIntrinsicKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsIntrinsicKeyword;
    }
  });
  Object.defineProperty(exports2, "TSLiteralType", {
    enumerable: true,
    get: function() {
      return _index.tsLiteralType;
    }
  });
  Object.defineProperty(exports2, "TSMappedType", {
    enumerable: true,
    get: function() {
      return _index.tsMappedType;
    }
  });
  Object.defineProperty(exports2, "TSMethodSignature", {
    enumerable: true,
    get: function() {
      return _index.tsMethodSignature;
    }
  });
  Object.defineProperty(exports2, "TSModuleBlock", {
    enumerable: true,
    get: function() {
      return _index.tsModuleBlock;
    }
  });
  Object.defineProperty(exports2, "TSModuleDeclaration", {
    enumerable: true,
    get: function() {
      return _index.tsModuleDeclaration;
    }
  });
  Object.defineProperty(exports2, "TSNamedTupleMember", {
    enumerable: true,
    get: function() {
      return _index.tsNamedTupleMember;
    }
  });
  Object.defineProperty(exports2, "TSNamespaceExportDeclaration", {
    enumerable: true,
    get: function() {
      return _index.tsNamespaceExportDeclaration;
    }
  });
  Object.defineProperty(exports2, "TSNeverKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsNeverKeyword;
    }
  });
  Object.defineProperty(exports2, "TSNonNullExpression", {
    enumerable: true,
    get: function() {
      return _index.tsNonNullExpression;
    }
  });
  Object.defineProperty(exports2, "TSNullKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsNullKeyword;
    }
  });
  Object.defineProperty(exports2, "TSNumberKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsNumberKeyword;
    }
  });
  Object.defineProperty(exports2, "TSObjectKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsObjectKeyword;
    }
  });
  Object.defineProperty(exports2, "TSOptionalType", {
    enumerable: true,
    get: function() {
      return _index.tsOptionalType;
    }
  });
  Object.defineProperty(exports2, "TSParameterProperty", {
    enumerable: true,
    get: function() {
      return _index.tsParameterProperty;
    }
  });
  Object.defineProperty(exports2, "TSParenthesizedType", {
    enumerable: true,
    get: function() {
      return _index.tsParenthesizedType;
    }
  });
  Object.defineProperty(exports2, "TSPropertySignature", {
    enumerable: true,
    get: function() {
      return _index.tsPropertySignature;
    }
  });
  Object.defineProperty(exports2, "TSQualifiedName", {
    enumerable: true,
    get: function() {
      return _index.tsQualifiedName;
    }
  });
  Object.defineProperty(exports2, "TSRestType", {
    enumerable: true,
    get: function() {
      return _index.tsRestType;
    }
  });
  Object.defineProperty(exports2, "TSStringKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsStringKeyword;
    }
  });
  Object.defineProperty(exports2, "TSSymbolKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsSymbolKeyword;
    }
  });
  Object.defineProperty(exports2, "TSThisType", {
    enumerable: true,
    get: function() {
      return _index.tsThisType;
    }
  });
  Object.defineProperty(exports2, "TSTupleType", {
    enumerable: true,
    get: function() {
      return _index.tsTupleType;
    }
  });
  Object.defineProperty(exports2, "TSTypeAliasDeclaration", {
    enumerable: true,
    get: function() {
      return _index.tsTypeAliasDeclaration;
    }
  });
  Object.defineProperty(exports2, "TSTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.tsTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "TSTypeAssertion", {
    enumerable: true,
    get: function() {
      return _index.tsTypeAssertion;
    }
  });
  Object.defineProperty(exports2, "TSTypeLiteral", {
    enumerable: true,
    get: function() {
      return _index.tsTypeLiteral;
    }
  });
  Object.defineProperty(exports2, "TSTypeOperator", {
    enumerable: true,
    get: function() {
      return _index.tsTypeOperator;
    }
  });
  Object.defineProperty(exports2, "TSTypeParameter", {
    enumerable: true,
    get: function() {
      return _index.tsTypeParameter;
    }
  });
  Object.defineProperty(exports2, "TSTypeParameterDeclaration", {
    enumerable: true,
    get: function() {
      return _index.tsTypeParameterDeclaration;
    }
  });
  Object.defineProperty(exports2, "TSTypeParameterInstantiation", {
    enumerable: true,
    get: function() {
      return _index.tsTypeParameterInstantiation;
    }
  });
  Object.defineProperty(exports2, "TSTypePredicate", {
    enumerable: true,
    get: function() {
      return _index.tsTypePredicate;
    }
  });
  Object.defineProperty(exports2, "TSTypeQuery", {
    enumerable: true,
    get: function() {
      return _index.tsTypeQuery;
    }
  });
  Object.defineProperty(exports2, "TSTypeReference", {
    enumerable: true,
    get: function() {
      return _index.tsTypeReference;
    }
  });
  Object.defineProperty(exports2, "TSUndefinedKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsUndefinedKeyword;
    }
  });
  Object.defineProperty(exports2, "TSUnionType", {
    enumerable: true,
    get: function() {
      return _index.tsUnionType;
    }
  });
  Object.defineProperty(exports2, "TSUnknownKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsUnknownKeyword;
    }
  });
  Object.defineProperty(exports2, "TSVoidKeyword", {
    enumerable: true,
    get: function() {
      return _index.tsVoidKeyword;
    }
  });
  Object.defineProperty(exports2, "TaggedTemplateExpression", {
    enumerable: true,
    get: function() {
      return _index.taggedTemplateExpression;
    }
  });
  Object.defineProperty(exports2, "TemplateElement", {
    enumerable: true,
    get: function() {
      return _index.templateElement;
    }
  });
  Object.defineProperty(exports2, "TemplateLiteral", {
    enumerable: true,
    get: function() {
      return _index.templateLiteral;
    }
  });
  Object.defineProperty(exports2, "ThisExpression", {
    enumerable: true,
    get: function() {
      return _index.thisExpression;
    }
  });
  Object.defineProperty(exports2, "ThisTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.thisTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "ThrowStatement", {
    enumerable: true,
    get: function() {
      return _index.throwStatement;
    }
  });
  Object.defineProperty(exports2, "TopicReference", {
    enumerable: true,
    get: function() {
      return _index.topicReference;
    }
  });
  Object.defineProperty(exports2, "TryStatement", {
    enumerable: true,
    get: function() {
      return _index.tryStatement;
    }
  });
  Object.defineProperty(exports2, "TupleExpression", {
    enumerable: true,
    get: function() {
      return _index.tupleExpression;
    }
  });
  Object.defineProperty(exports2, "TupleTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.tupleTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "TypeAlias", {
    enumerable: true,
    get: function() {
      return _index.typeAlias;
    }
  });
  Object.defineProperty(exports2, "TypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.typeAnnotation;
    }
  });
  Object.defineProperty(exports2, "TypeCastExpression", {
    enumerable: true,
    get: function() {
      return _index.typeCastExpression;
    }
  });
  Object.defineProperty(exports2, "TypeParameter", {
    enumerable: true,
    get: function() {
      return _index.typeParameter;
    }
  });
  Object.defineProperty(exports2, "TypeParameterDeclaration", {
    enumerable: true,
    get: function() {
      return _index.typeParameterDeclaration;
    }
  });
  Object.defineProperty(exports2, "TypeParameterInstantiation", {
    enumerable: true,
    get: function() {
      return _index.typeParameterInstantiation;
    }
  });
  Object.defineProperty(exports2, "TypeofTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.typeofTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "UnaryExpression", {
    enumerable: true,
    get: function() {
      return _index.unaryExpression;
    }
  });
  Object.defineProperty(exports2, "UnionTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.unionTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "UpdateExpression", {
    enumerable: true,
    get: function() {
      return _index.updateExpression;
    }
  });
  Object.defineProperty(exports2, "V8IntrinsicIdentifier", {
    enumerable: true,
    get: function() {
      return _index.v8IntrinsicIdentifier;
    }
  });
  Object.defineProperty(exports2, "VariableDeclaration", {
    enumerable: true,
    get: function() {
      return _index.variableDeclaration;
    }
  });
  Object.defineProperty(exports2, "VariableDeclarator", {
    enumerable: true,
    get: function() {
      return _index.variableDeclarator;
    }
  });
  Object.defineProperty(exports2, "Variance", {
    enumerable: true,
    get: function() {
      return _index.variance;
    }
  });
  Object.defineProperty(exports2, "VoidTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _index.voidTypeAnnotation;
    }
  });
  Object.defineProperty(exports2, "WhileStatement", {
    enumerable: true,
    get: function() {
      return _index.whileStatement;
    }
  });
  Object.defineProperty(exports2, "WithStatement", {
    enumerable: true,
    get: function() {
      return _index.withStatement;
    }
  });
  Object.defineProperty(exports2, "YieldExpression", {
    enumerable: true,
    get: function() {
      return _index.yieldExpression;
    }
  });
  var _index = generated$3;
})(uppercase);
var cloneNode$1 = {};
Object.defineProperty(cloneNode$1, "__esModule", {
  value: true
});
cloneNode$1.default = cloneNode;
var _definitions$4 = definitions;
var _generated$g = generated$4;
const has = Function.call.bind(Object.prototype.hasOwnProperty);
function cloneIfNode(obj, deep, withoutLoc) {
  if (obj && typeof obj.type === "string") {
    return cloneNode(obj, deep, withoutLoc);
  }
  return obj;
}
function cloneIfNodeOrArray(obj, deep, withoutLoc) {
  if (Array.isArray(obj)) {
    return obj.map((node) => cloneIfNode(node, deep, withoutLoc));
  }
  return cloneIfNode(obj, deep, withoutLoc);
}
function cloneNode(node, deep = true, withoutLoc = false) {
  if (!node)
    return node;
  const {
    type
  } = node;
  const newNode = {
    type: node.type
  };
  if ((0, _generated$g.isIdentifier)(node)) {
    newNode.name = node.name;
    if (has(node, "optional") && typeof node.optional === "boolean") {
      newNode.optional = node.optional;
    }
    if (has(node, "typeAnnotation")) {
      newNode.typeAnnotation = deep ? cloneIfNodeOrArray(node.typeAnnotation, true, withoutLoc) : node.typeAnnotation;
    }
  } else if (!has(_definitions$4.NODE_FIELDS, type)) {
    throw new Error(`Unknown node type: "${type}"`);
  } else {
    for (const field of Object.keys(_definitions$4.NODE_FIELDS[type])) {
      if (has(node, field)) {
        if (deep) {
          newNode[field] = (0, _generated$g.isFile)(node) && field === "comments" ? maybeCloneComments(node.comments, deep, withoutLoc) : cloneIfNodeOrArray(node[field], true, withoutLoc);
        } else {
          newNode[field] = node[field];
        }
      }
    }
  }
  if (has(node, "loc")) {
    if (withoutLoc) {
      newNode.loc = null;
    } else {
      newNode.loc = node.loc;
    }
  }
  if (has(node, "leadingComments")) {
    newNode.leadingComments = maybeCloneComments(node.leadingComments, deep, withoutLoc);
  }
  if (has(node, "innerComments")) {
    newNode.innerComments = maybeCloneComments(node.innerComments, deep, withoutLoc);
  }
  if (has(node, "trailingComments")) {
    newNode.trailingComments = maybeCloneComments(node.trailingComments, deep, withoutLoc);
  }
  if (has(node, "extra")) {
    newNode.extra = Object.assign({}, node.extra);
  }
  return newNode;
}
function maybeCloneComments(comments, deep, withoutLoc) {
  if (!comments || !deep) {
    return comments;
  }
  return comments.map(({
    type,
    value,
    loc
  }) => {
    if (withoutLoc) {
      return {
        type,
        value,
        loc: null
      };
    }
    return {
      type,
      value,
      loc
    };
  });
}
var clone$1 = {};
Object.defineProperty(clone$1, "__esModule", {
  value: true
});
clone$1.default = clone;
var _cloneNode$5 = cloneNode$1;
function clone(node) {
  return (0, _cloneNode$5.default)(node, false);
}
var cloneDeep$1 = {};
Object.defineProperty(cloneDeep$1, "__esModule", {
  value: true
});
cloneDeep$1.default = cloneDeep;
var _cloneNode$4 = cloneNode$1;
function cloneDeep(node) {
  return (0, _cloneNode$4.default)(node);
}
var cloneDeepWithoutLoc$1 = {};
Object.defineProperty(cloneDeepWithoutLoc$1, "__esModule", {
  value: true
});
cloneDeepWithoutLoc$1.default = cloneDeepWithoutLoc;
var _cloneNode$3 = cloneNode$1;
function cloneDeepWithoutLoc(node) {
  return (0, _cloneNode$3.default)(node, true, true);
}
var cloneWithoutLoc$1 = {};
Object.defineProperty(cloneWithoutLoc$1, "__esModule", {
  value: true
});
cloneWithoutLoc$1.default = cloneWithoutLoc;
var _cloneNode$2 = cloneNode$1;
function cloneWithoutLoc(node) {
  return (0, _cloneNode$2.default)(node, false, true);
}
var addComment$1 = {};
var addComments$1 = {};
Object.defineProperty(addComments$1, "__esModule", {
  value: true
});
addComments$1.default = addComments;
function addComments(node, type, comments) {
  if (!comments || !node)
    return node;
  const key = `${type}Comments`;
  if (node[key]) {
    if (type === "leading") {
      node[key] = comments.concat(node[key]);
    } else {
      node[key].push(...comments);
    }
  } else {
    node[key] = comments;
  }
  return node;
}
Object.defineProperty(addComment$1, "__esModule", {
  value: true
});
addComment$1.default = addComment;
var _addComments = addComments$1;
function addComment(node, type, content, line) {
  return (0, _addComments.default)(node, type, [{
    type: line ? "CommentLine" : "CommentBlock",
    value: content
  }]);
}
var inheritInnerComments$1 = {};
var inherit$1 = {};
Object.defineProperty(inherit$1, "__esModule", {
  value: true
});
inherit$1.default = inherit;
function inherit(key, child, parent) {
  if (child && parent) {
    child[key] = Array.from(new Set([].concat(child[key], parent[key]).filter(Boolean)));
  }
}
Object.defineProperty(inheritInnerComments$1, "__esModule", {
  value: true
});
inheritInnerComments$1.default = inheritInnerComments;
var _inherit$2 = inherit$1;
function inheritInnerComments(child, parent) {
  (0, _inherit$2.default)("innerComments", child, parent);
}
var inheritLeadingComments$1 = {};
Object.defineProperty(inheritLeadingComments$1, "__esModule", {
  value: true
});
inheritLeadingComments$1.default = inheritLeadingComments;
var _inherit$1 = inherit$1;
function inheritLeadingComments(child, parent) {
  (0, _inherit$1.default)("leadingComments", child, parent);
}
var inheritsComments$1 = {};
var inheritTrailingComments$1 = {};
Object.defineProperty(inheritTrailingComments$1, "__esModule", {
  value: true
});
inheritTrailingComments$1.default = inheritTrailingComments;
var _inherit = inherit$1;
function inheritTrailingComments(child, parent) {
  (0, _inherit.default)("trailingComments", child, parent);
}
Object.defineProperty(inheritsComments$1, "__esModule", {
  value: true
});
inheritsComments$1.default = inheritsComments;
var _inheritTrailingComments = inheritTrailingComments$1;
var _inheritLeadingComments = inheritLeadingComments$1;
var _inheritInnerComments = inheritInnerComments$1;
function inheritsComments(child, parent) {
  (0, _inheritTrailingComments.default)(child, parent);
  (0, _inheritLeadingComments.default)(child, parent);
  (0, _inheritInnerComments.default)(child, parent);
  return child;
}
var removeComments$1 = {};
Object.defineProperty(removeComments$1, "__esModule", {
  value: true
});
removeComments$1.default = removeComments;
var _constants$4 = constants;
function removeComments(node) {
  _constants$4.COMMENT_KEYS.forEach((key) => {
    node[key] = null;
  });
  return node;
}
var generated$1 = {};
Object.defineProperty(generated$1, "__esModule", {
  value: true
});
generated$1.WHILE_TYPES = generated$1.USERWHITESPACABLE_TYPES = generated$1.UNARYLIKE_TYPES = generated$1.TYPESCRIPT_TYPES = generated$1.TSTYPE_TYPES = generated$1.TSTYPEELEMENT_TYPES = generated$1.TSENTITYNAME_TYPES = generated$1.TSBASETYPE_TYPES = generated$1.TERMINATORLESS_TYPES = generated$1.STATEMENT_TYPES = generated$1.STANDARDIZED_TYPES = generated$1.SCOPABLE_TYPES = generated$1.PUREISH_TYPES = generated$1.PROPERTY_TYPES = generated$1.PRIVATE_TYPES = generated$1.PATTERN_TYPES = generated$1.PATTERNLIKE_TYPES = generated$1.OBJECTMEMBER_TYPES = generated$1.MODULESPECIFIER_TYPES = generated$1.MODULEDECLARATION_TYPES = generated$1.MISCELLANEOUS_TYPES = generated$1.METHOD_TYPES = generated$1.LVAL_TYPES = generated$1.LOOP_TYPES = generated$1.LITERAL_TYPES = generated$1.JSX_TYPES = generated$1.IMMUTABLE_TYPES = generated$1.FUNCTION_TYPES = generated$1.FUNCTIONPARENT_TYPES = generated$1.FOR_TYPES = generated$1.FORXSTATEMENT_TYPES = generated$1.FLOW_TYPES = generated$1.FLOWTYPE_TYPES = generated$1.FLOWPREDICATE_TYPES = generated$1.FLOWDECLARATION_TYPES = generated$1.FLOWBASEANNOTATION_TYPES = generated$1.EXPRESSION_TYPES = generated$1.EXPRESSIONWRAPPER_TYPES = generated$1.EXPORTDECLARATION_TYPES = generated$1.ENUMMEMBER_TYPES = generated$1.ENUMBODY_TYPES = generated$1.DECLARATION_TYPES = generated$1.CONDITIONAL_TYPES = generated$1.COMPLETIONSTATEMENT_TYPES = generated$1.CLASS_TYPES = generated$1.BLOCK_TYPES = generated$1.BLOCKPARENT_TYPES = generated$1.BINARY_TYPES = generated$1.ACCESSOR_TYPES = void 0;
var _definitions$3 = definitions;
const STANDARDIZED_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Standardized"];
generated$1.STANDARDIZED_TYPES = STANDARDIZED_TYPES;
const EXPRESSION_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Expression"];
generated$1.EXPRESSION_TYPES = EXPRESSION_TYPES;
const BINARY_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Binary"];
generated$1.BINARY_TYPES = BINARY_TYPES;
const SCOPABLE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Scopable"];
generated$1.SCOPABLE_TYPES = SCOPABLE_TYPES;
const BLOCKPARENT_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["BlockParent"];
generated$1.BLOCKPARENT_TYPES = BLOCKPARENT_TYPES;
const BLOCK_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Block"];
generated$1.BLOCK_TYPES = BLOCK_TYPES;
const STATEMENT_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Statement"];
generated$1.STATEMENT_TYPES = STATEMENT_TYPES;
const TERMINATORLESS_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Terminatorless"];
generated$1.TERMINATORLESS_TYPES = TERMINATORLESS_TYPES;
const COMPLETIONSTATEMENT_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["CompletionStatement"];
generated$1.COMPLETIONSTATEMENT_TYPES = COMPLETIONSTATEMENT_TYPES;
const CONDITIONAL_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Conditional"];
generated$1.CONDITIONAL_TYPES = CONDITIONAL_TYPES;
const LOOP_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Loop"];
generated$1.LOOP_TYPES = LOOP_TYPES;
const WHILE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["While"];
generated$1.WHILE_TYPES = WHILE_TYPES;
const EXPRESSIONWRAPPER_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["ExpressionWrapper"];
generated$1.EXPRESSIONWRAPPER_TYPES = EXPRESSIONWRAPPER_TYPES;
const FOR_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["For"];
generated$1.FOR_TYPES = FOR_TYPES;
const FORXSTATEMENT_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["ForXStatement"];
generated$1.FORXSTATEMENT_TYPES = FORXSTATEMENT_TYPES;
const FUNCTION_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Function"];
generated$1.FUNCTION_TYPES = FUNCTION_TYPES;
const FUNCTIONPARENT_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["FunctionParent"];
generated$1.FUNCTIONPARENT_TYPES = FUNCTIONPARENT_TYPES;
const PUREISH_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Pureish"];
generated$1.PUREISH_TYPES = PUREISH_TYPES;
const DECLARATION_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Declaration"];
generated$1.DECLARATION_TYPES = DECLARATION_TYPES;
const PATTERNLIKE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["PatternLike"];
generated$1.PATTERNLIKE_TYPES = PATTERNLIKE_TYPES;
const LVAL_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["LVal"];
generated$1.LVAL_TYPES = LVAL_TYPES;
const TSENTITYNAME_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["TSEntityName"];
generated$1.TSENTITYNAME_TYPES = TSENTITYNAME_TYPES;
const LITERAL_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Literal"];
generated$1.LITERAL_TYPES = LITERAL_TYPES;
const IMMUTABLE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Immutable"];
generated$1.IMMUTABLE_TYPES = IMMUTABLE_TYPES;
const USERWHITESPACABLE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["UserWhitespacable"];
generated$1.USERWHITESPACABLE_TYPES = USERWHITESPACABLE_TYPES;
const METHOD_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Method"];
generated$1.METHOD_TYPES = METHOD_TYPES;
const OBJECTMEMBER_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["ObjectMember"];
generated$1.OBJECTMEMBER_TYPES = OBJECTMEMBER_TYPES;
const PROPERTY_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Property"];
generated$1.PROPERTY_TYPES = PROPERTY_TYPES;
const UNARYLIKE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["UnaryLike"];
generated$1.UNARYLIKE_TYPES = UNARYLIKE_TYPES;
const PATTERN_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Pattern"];
generated$1.PATTERN_TYPES = PATTERN_TYPES;
const CLASS_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Class"];
generated$1.CLASS_TYPES = CLASS_TYPES;
const MODULEDECLARATION_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["ModuleDeclaration"];
generated$1.MODULEDECLARATION_TYPES = MODULEDECLARATION_TYPES;
const EXPORTDECLARATION_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["ExportDeclaration"];
generated$1.EXPORTDECLARATION_TYPES = EXPORTDECLARATION_TYPES;
const MODULESPECIFIER_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["ModuleSpecifier"];
generated$1.MODULESPECIFIER_TYPES = MODULESPECIFIER_TYPES;
const ACCESSOR_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Accessor"];
generated$1.ACCESSOR_TYPES = ACCESSOR_TYPES;
const PRIVATE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Private"];
generated$1.PRIVATE_TYPES = PRIVATE_TYPES;
const FLOW_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Flow"];
generated$1.FLOW_TYPES = FLOW_TYPES;
const FLOWTYPE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["FlowType"];
generated$1.FLOWTYPE_TYPES = FLOWTYPE_TYPES;
const FLOWBASEANNOTATION_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["FlowBaseAnnotation"];
generated$1.FLOWBASEANNOTATION_TYPES = FLOWBASEANNOTATION_TYPES;
const FLOWDECLARATION_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["FlowDeclaration"];
generated$1.FLOWDECLARATION_TYPES = FLOWDECLARATION_TYPES;
const FLOWPREDICATE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["FlowPredicate"];
generated$1.FLOWPREDICATE_TYPES = FLOWPREDICATE_TYPES;
const ENUMBODY_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["EnumBody"];
generated$1.ENUMBODY_TYPES = ENUMBODY_TYPES;
const ENUMMEMBER_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["EnumMember"];
generated$1.ENUMMEMBER_TYPES = ENUMMEMBER_TYPES;
const JSX_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["JSX"];
generated$1.JSX_TYPES = JSX_TYPES;
const MISCELLANEOUS_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["Miscellaneous"];
generated$1.MISCELLANEOUS_TYPES = MISCELLANEOUS_TYPES;
const TYPESCRIPT_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["TypeScript"];
generated$1.TYPESCRIPT_TYPES = TYPESCRIPT_TYPES;
const TSTYPEELEMENT_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["TSTypeElement"];
generated$1.TSTYPEELEMENT_TYPES = TSTYPEELEMENT_TYPES;
const TSTYPE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["TSType"];
generated$1.TSTYPE_TYPES = TSTYPE_TYPES;
const TSBASETYPE_TYPES = _definitions$3.FLIPPED_ALIAS_KEYS["TSBaseType"];
generated$1.TSBASETYPE_TYPES = TSBASETYPE_TYPES;
var ensureBlock$1 = {};
var toBlock$1 = {};
Object.defineProperty(toBlock$1, "__esModule", {
  value: true
});
toBlock$1.default = toBlock;
var _generated$f = generated$4;
var _generated2$3 = generated$3;
function toBlock(node, parent) {
  if ((0, _generated$f.isBlockStatement)(node)) {
    return node;
  }
  let blockNodes = [];
  if ((0, _generated$f.isEmptyStatement)(node)) {
    blockNodes = [];
  } else {
    if (!(0, _generated$f.isStatement)(node)) {
      if ((0, _generated$f.isFunction)(parent)) {
        node = (0, _generated2$3.returnStatement)(node);
      } else {
        node = (0, _generated2$3.expressionStatement)(node);
      }
    }
    blockNodes = [node];
  }
  return (0, _generated2$3.blockStatement)(blockNodes);
}
Object.defineProperty(ensureBlock$1, "__esModule", {
  value: true
});
ensureBlock$1.default = ensureBlock;
var _toBlock = toBlock$1;
function ensureBlock(node, key = "body") {
  return node[key] = (0, _toBlock.default)(node[key], node);
}
var toBindingIdentifierName$1 = {};
var toIdentifier$1 = {};
Object.defineProperty(toIdentifier$1, "__esModule", {
  value: true
});
toIdentifier$1.default = toIdentifier;
var _isValidIdentifier$2 = isValidIdentifier$1;
var _helperValidatorIdentifier = lib;
function toIdentifier(input) {
  input = input + "";
  let name = "";
  for (const c2 of input) {
    name += (0, _helperValidatorIdentifier.isIdentifierChar)(c2.codePointAt(0)) ? c2 : "-";
  }
  name = name.replace(/^[-0-9]+/, "");
  name = name.replace(/[-\s]+(.)?/g, function(match, c2) {
    return c2 ? c2.toUpperCase() : "";
  });
  if (!(0, _isValidIdentifier$2.default)(name)) {
    name = `_${name}`;
  }
  return name || "_";
}
Object.defineProperty(toBindingIdentifierName$1, "__esModule", {
  value: true
});
toBindingIdentifierName$1.default = toBindingIdentifierName;
var _toIdentifier = toIdentifier$1;
function toBindingIdentifierName(name) {
  name = (0, _toIdentifier.default)(name);
  if (name === "eval" || name === "arguments")
    name = "_" + name;
  return name;
}
var toComputedKey$1 = {};
Object.defineProperty(toComputedKey$1, "__esModule", {
  value: true
});
toComputedKey$1.default = toComputedKey;
var _generated$e = generated$4;
var _generated2$2 = generated$3;
function toComputedKey(node, key = node.key || node.property) {
  if (!node.computed && (0, _generated$e.isIdentifier)(key))
    key = (0, _generated2$2.stringLiteral)(key.name);
  return key;
}
var toExpression$1 = {};
Object.defineProperty(toExpression$1, "__esModule", {
  value: true
});
toExpression$1.default = void 0;
var _generated$d = generated$4;
var _default$3 = toExpression;
toExpression$1.default = _default$3;
function toExpression(node) {
  if ((0, _generated$d.isExpressionStatement)(node)) {
    node = node.expression;
  }
  if ((0, _generated$d.isExpression)(node)) {
    return node;
  }
  if ((0, _generated$d.isClass)(node)) {
    node.type = "ClassExpression";
  } else if ((0, _generated$d.isFunction)(node)) {
    node.type = "FunctionExpression";
  }
  if (!(0, _generated$d.isExpression)(node)) {
    throw new Error(`cannot turn ${node.type} to an expression`);
  }
  return node;
}
var toKeyAlias$1 = {};
var removePropertiesDeep$1 = {};
var traverseFast$1 = {};
Object.defineProperty(traverseFast$1, "__esModule", {
  value: true
});
traverseFast$1.default = traverseFast;
var _definitions$2 = definitions;
function traverseFast(node, enter, opts) {
  if (!node)
    return;
  const keys = _definitions$2.VISITOR_KEYS[node.type];
  if (!keys)
    return;
  opts = opts || {};
  enter(node, opts);
  for (const key of keys) {
    const subNode = node[key];
    if (Array.isArray(subNode)) {
      for (const node2 of subNode) {
        traverseFast(node2, enter, opts);
      }
    } else {
      traverseFast(subNode, enter, opts);
    }
  }
}
var removeProperties$1 = {};
Object.defineProperty(removeProperties$1, "__esModule", {
  value: true
});
removeProperties$1.default = removeProperties;
var _constants$3 = constants;
const CLEAR_KEYS = ["tokens", "start", "end", "loc", "raw", "rawValue"];
const CLEAR_KEYS_PLUS_COMMENTS = _constants$3.COMMENT_KEYS.concat(["comments"]).concat(CLEAR_KEYS);
function removeProperties(node, opts = {}) {
  const map = opts.preserveComments ? CLEAR_KEYS : CLEAR_KEYS_PLUS_COMMENTS;
  for (const key of map) {
    if (node[key] != null)
      node[key] = void 0;
  }
  for (const key of Object.keys(node)) {
    if (key[0] === "_" && node[key] != null)
      node[key] = void 0;
  }
  const symbols = Object.getOwnPropertySymbols(node);
  for (const sym of symbols) {
    node[sym] = null;
  }
}
Object.defineProperty(removePropertiesDeep$1, "__esModule", {
  value: true
});
removePropertiesDeep$1.default = removePropertiesDeep;
var _traverseFast = traverseFast$1;
var _removeProperties = removeProperties$1;
function removePropertiesDeep(tree, opts) {
  (0, _traverseFast.default)(tree, _removeProperties.default, opts);
  return tree;
}
Object.defineProperty(toKeyAlias$1, "__esModule", {
  value: true
});
toKeyAlias$1.default = toKeyAlias;
var _generated$c = generated$4;
var _cloneNode$1 = cloneNode$1;
var _removePropertiesDeep = removePropertiesDeep$1;
function toKeyAlias(node, key = node.key) {
  let alias;
  if (node.kind === "method") {
    return toKeyAlias.increment() + "";
  } else if ((0, _generated$c.isIdentifier)(key)) {
    alias = key.name;
  } else if ((0, _generated$c.isStringLiteral)(key)) {
    alias = JSON.stringify(key.value);
  } else {
    alias = JSON.stringify((0, _removePropertiesDeep.default)((0, _cloneNode$1.default)(key)));
  }
  if (node.computed) {
    alias = `[${alias}]`;
  }
  if (node.static) {
    alias = `static:${alias}`;
  }
  return alias;
}
toKeyAlias.uid = 0;
toKeyAlias.increment = function() {
  if (toKeyAlias.uid >= Number.MAX_SAFE_INTEGER) {
    return toKeyAlias.uid = 0;
  } else {
    return toKeyAlias.uid++;
  }
};
var toSequenceExpression$1 = {};
var gatherSequenceExpressions$1 = {};
var getBindingIdentifiers$1 = {};
Object.defineProperty(getBindingIdentifiers$1, "__esModule", {
  value: true
});
getBindingIdentifiers$1.default = getBindingIdentifiers;
var _generated$b = generated$4;
function getBindingIdentifiers(node, duplicates, outerOnly) {
  let search = [].concat(node);
  const ids = /* @__PURE__ */ Object.create(null);
  while (search.length) {
    const id = search.shift();
    if (!id)
      continue;
    const keys = getBindingIdentifiers.keys[id.type];
    if ((0, _generated$b.isIdentifier)(id)) {
      if (duplicates) {
        const _ids = ids[id.name] = ids[id.name] || [];
        _ids.push(id);
      } else {
        ids[id.name] = id;
      }
      continue;
    }
    if ((0, _generated$b.isExportDeclaration)(id) && !(0, _generated$b.isExportAllDeclaration)(id)) {
      if ((0, _generated$b.isDeclaration)(id.declaration)) {
        search.push(id.declaration);
      }
      continue;
    }
    if (outerOnly) {
      if ((0, _generated$b.isFunctionDeclaration)(id)) {
        search.push(id.id);
        continue;
      }
      if ((0, _generated$b.isFunctionExpression)(id)) {
        continue;
      }
    }
    if (keys) {
      for (let i2 = 0; i2 < keys.length; i2++) {
        const key = keys[i2];
        if (id[key]) {
          search = search.concat(id[key]);
        }
      }
    }
  }
  return ids;
}
getBindingIdentifiers.keys = {
  DeclareClass: ["id"],
  DeclareFunction: ["id"],
  DeclareModule: ["id"],
  DeclareVariable: ["id"],
  DeclareInterface: ["id"],
  DeclareTypeAlias: ["id"],
  DeclareOpaqueType: ["id"],
  InterfaceDeclaration: ["id"],
  TypeAlias: ["id"],
  OpaqueType: ["id"],
  CatchClause: ["param"],
  LabeledStatement: ["label"],
  UnaryExpression: ["argument"],
  AssignmentExpression: ["left"],
  ImportSpecifier: ["local"],
  ImportNamespaceSpecifier: ["local"],
  ImportDefaultSpecifier: ["local"],
  ImportDeclaration: ["specifiers"],
  ExportSpecifier: ["exported"],
  ExportNamespaceSpecifier: ["exported"],
  ExportDefaultSpecifier: ["exported"],
  FunctionDeclaration: ["id", "params"],
  FunctionExpression: ["id", "params"],
  ArrowFunctionExpression: ["params"],
  ObjectMethod: ["params"],
  ClassMethod: ["params"],
  ClassPrivateMethod: ["params"],
  ForInStatement: ["left"],
  ForOfStatement: ["left"],
  ClassDeclaration: ["id"],
  ClassExpression: ["id"],
  RestElement: ["argument"],
  UpdateExpression: ["argument"],
  ObjectProperty: ["value"],
  AssignmentPattern: ["left"],
  ArrayPattern: ["elements"],
  ObjectPattern: ["properties"],
  VariableDeclaration: ["declarations"],
  VariableDeclarator: ["id"]
};
Object.defineProperty(gatherSequenceExpressions$1, "__esModule", {
  value: true
});
gatherSequenceExpressions$1.default = gatherSequenceExpressions;
var _getBindingIdentifiers$2 = getBindingIdentifiers$1;
var _generated$a = generated$4;
var _generated2$1 = generated$3;
var _cloneNode = cloneNode$1;
function gatherSequenceExpressions(nodes, scope, declars) {
  const exprs = [];
  let ensureLastUndefined = true;
  for (const node of nodes) {
    if (!(0, _generated$a.isEmptyStatement)(node)) {
      ensureLastUndefined = false;
    }
    if ((0, _generated$a.isExpression)(node)) {
      exprs.push(node);
    } else if ((0, _generated$a.isExpressionStatement)(node)) {
      exprs.push(node.expression);
    } else if ((0, _generated$a.isVariableDeclaration)(node)) {
      if (node.kind !== "var")
        return;
      for (const declar of node.declarations) {
        const bindings = (0, _getBindingIdentifiers$2.default)(declar);
        for (const key of Object.keys(bindings)) {
          declars.push({
            kind: node.kind,
            id: (0, _cloneNode.default)(bindings[key])
          });
        }
        if (declar.init) {
          exprs.push((0, _generated2$1.assignmentExpression)("=", declar.id, declar.init));
        }
      }
      ensureLastUndefined = true;
    } else if ((0, _generated$a.isIfStatement)(node)) {
      const consequent = node.consequent ? gatherSequenceExpressions([node.consequent], scope, declars) : scope.buildUndefinedNode();
      const alternate = node.alternate ? gatherSequenceExpressions([node.alternate], scope, declars) : scope.buildUndefinedNode();
      if (!consequent || !alternate)
        return;
      exprs.push((0, _generated2$1.conditionalExpression)(node.test, consequent, alternate));
    } else if ((0, _generated$a.isBlockStatement)(node)) {
      const body = gatherSequenceExpressions(node.body, scope, declars);
      if (!body)
        return;
      exprs.push(body);
    } else if ((0, _generated$a.isEmptyStatement)(node)) {
      if (nodes.indexOf(node) === 0) {
        ensureLastUndefined = true;
      }
    } else {
      return;
    }
  }
  if (ensureLastUndefined) {
    exprs.push(scope.buildUndefinedNode());
  }
  if (exprs.length === 1) {
    return exprs[0];
  } else {
    return (0, _generated2$1.sequenceExpression)(exprs);
  }
}
Object.defineProperty(toSequenceExpression$1, "__esModule", {
  value: true
});
toSequenceExpression$1.default = toSequenceExpression;
var _gatherSequenceExpressions = gatherSequenceExpressions$1;
function toSequenceExpression(nodes, scope) {
  if (!(nodes != null && nodes.length))
    return;
  const declars = [];
  const result = (0, _gatherSequenceExpressions.default)(nodes, scope, declars);
  if (!result)
    return;
  for (const declar of declars) {
    scope.push(declar);
  }
  return result;
}
var toStatement$1 = {};
Object.defineProperty(toStatement$1, "__esModule", {
  value: true
});
toStatement$1.default = void 0;
var _generated$9 = generated$4;
var _generated2 = generated$3;
var _default$2 = toStatement;
toStatement$1.default = _default$2;
function toStatement(node, ignore) {
  if ((0, _generated$9.isStatement)(node)) {
    return node;
  }
  let mustHaveId = false;
  let newType;
  if ((0, _generated$9.isClass)(node)) {
    mustHaveId = true;
    newType = "ClassDeclaration";
  } else if ((0, _generated$9.isFunction)(node)) {
    mustHaveId = true;
    newType = "FunctionDeclaration";
  } else if ((0, _generated$9.isAssignmentExpression)(node)) {
    return (0, _generated2.expressionStatement)(node);
  }
  if (mustHaveId && !node.id) {
    newType = false;
  }
  if (!newType) {
    if (ignore) {
      return false;
    } else {
      throw new Error(`cannot turn ${node.type} to a statement`);
    }
  }
  node.type = newType;
  return node;
}
var valueToNode$1 = {};
Object.defineProperty(valueToNode$1, "__esModule", {
  value: true
});
valueToNode$1.default = void 0;
var _isValidIdentifier$1 = isValidIdentifier$1;
var _generated$8 = generated$3;
var _default$1 = valueToNode;
valueToNode$1.default = _default$1;
const objectToString = Function.call.bind(Object.prototype.toString);
function isRegExp(value) {
  return objectToString(value) === "[object RegExp]";
}
function isPlainObject(value) {
  if (typeof value !== "object" || value === null || Object.prototype.toString.call(value) !== "[object Object]") {
    return false;
  }
  const proto = Object.getPrototypeOf(value);
  return proto === null || Object.getPrototypeOf(proto) === null;
}
function valueToNode(value) {
  if (value === void 0) {
    return (0, _generated$8.identifier)("undefined");
  }
  if (value === true || value === false) {
    return (0, _generated$8.booleanLiteral)(value);
  }
  if (value === null) {
    return (0, _generated$8.nullLiteral)();
  }
  if (typeof value === "string") {
    return (0, _generated$8.stringLiteral)(value);
  }
  if (typeof value === "number") {
    let result;
    if (Number.isFinite(value)) {
      result = (0, _generated$8.numericLiteral)(Math.abs(value));
    } else {
      let numerator;
      if (Number.isNaN(value)) {
        numerator = (0, _generated$8.numericLiteral)(0);
      } else {
        numerator = (0, _generated$8.numericLiteral)(1);
      }
      result = (0, _generated$8.binaryExpression)("/", numerator, (0, _generated$8.numericLiteral)(0));
    }
    if (value < 0 || Object.is(value, -0)) {
      result = (0, _generated$8.unaryExpression)("-", result);
    }
    return result;
  }
  if (isRegExp(value)) {
    const pattern = value.source;
    const flags = value.toString().match(/\/([a-z]+|)$/)[1];
    return (0, _generated$8.regExpLiteral)(pattern, flags);
  }
  if (Array.isArray(value)) {
    return (0, _generated$8.arrayExpression)(value.map(valueToNode));
  }
  if (isPlainObject(value)) {
    const props = [];
    for (const key of Object.keys(value)) {
      let nodeKey;
      if ((0, _isValidIdentifier$1.default)(key)) {
        nodeKey = (0, _generated$8.identifier)(key);
      } else {
        nodeKey = (0, _generated$8.stringLiteral)(key);
      }
      props.push((0, _generated$8.objectProperty)(nodeKey, valueToNode(value[key])));
    }
    return (0, _generated$8.objectExpression)(props);
  }
  throw new Error("don't know how to turn this value into a node");
}
var appendToMemberExpression$1 = {};
Object.defineProperty(appendToMemberExpression$1, "__esModule", {
  value: true
});
appendToMemberExpression$1.default = appendToMemberExpression;
var _generated$7 = generated$3;
function appendToMemberExpression(member, append, computed2 = false) {
  member.object = (0, _generated$7.memberExpression)(member.object, member.property, member.computed);
  member.property = append;
  member.computed = !!computed2;
  return member;
}
var inherits$1 = {};
Object.defineProperty(inherits$1, "__esModule", {
  value: true
});
inherits$1.default = inherits;
var _constants$2 = constants;
var _inheritsComments = inheritsComments$1;
function inherits(child, parent) {
  if (!child || !parent)
    return child;
  for (const key of _constants$2.INHERIT_KEYS.optional) {
    if (child[key] == null) {
      child[key] = parent[key];
    }
  }
  for (const key of Object.keys(parent)) {
    if (key[0] === "_" && key !== "__clone")
      child[key] = parent[key];
  }
  for (const key of _constants$2.INHERIT_KEYS.force) {
    child[key] = parent[key];
  }
  (0, _inheritsComments.default)(child, parent);
  return child;
}
var prependToMemberExpression$1 = {};
Object.defineProperty(prependToMemberExpression$1, "__esModule", {
  value: true
});
prependToMemberExpression$1.default = prependToMemberExpression;
var _generated$6 = generated$3;
function prependToMemberExpression(member, prepend) {
  member.object = (0, _generated$6.memberExpression)(prepend, member.object);
  return member;
}
var getOuterBindingIdentifiers$1 = {};
Object.defineProperty(getOuterBindingIdentifiers$1, "__esModule", {
  value: true
});
getOuterBindingIdentifiers$1.default = void 0;
var _getBindingIdentifiers$1 = getBindingIdentifiers$1;
var _default = getOuterBindingIdentifiers;
getOuterBindingIdentifiers$1.default = _default;
function getOuterBindingIdentifiers(node, duplicates) {
  return (0, _getBindingIdentifiers$1.default)(node, duplicates, true);
}
var traverse$1 = {};
Object.defineProperty(traverse$1, "__esModule", {
  value: true
});
traverse$1.default = traverse;
var _definitions$1 = definitions;
function traverse(node, handlers, state) {
  if (typeof handlers === "function") {
    handlers = {
      enter: handlers
    };
  }
  const {
    enter,
    exit
  } = handlers;
  traverseSimpleImpl(node, enter, exit, state, []);
}
function traverseSimpleImpl(node, enter, exit, state, ancestors) {
  const keys = _definitions$1.VISITOR_KEYS[node.type];
  if (!keys)
    return;
  if (enter)
    enter(node, ancestors, state);
  for (const key of keys) {
    const subNode = node[key];
    if (Array.isArray(subNode)) {
      for (let i2 = 0; i2 < subNode.length; i2++) {
        const child = subNode[i2];
        if (!child)
          continue;
        ancestors.push({
          node,
          key,
          index: i2
        });
        traverseSimpleImpl(child, enter, exit, state, ancestors);
        ancestors.pop();
      }
    } else if (subNode) {
      ancestors.push({
        node,
        key
      });
      traverseSimpleImpl(subNode, enter, exit, state, ancestors);
      ancestors.pop();
    }
  }
  if (exit)
    exit(node, ancestors, state);
}
var isBinding$1 = {};
Object.defineProperty(isBinding$1, "__esModule", {
  value: true
});
isBinding$1.default = isBinding;
var _getBindingIdentifiers = getBindingIdentifiers$1;
function isBinding(node, parent, grandparent) {
  if (grandparent && node.type === "Identifier" && parent.type === "ObjectProperty" && grandparent.type === "ObjectExpression") {
    return false;
  }
  const keys = _getBindingIdentifiers.default.keys[parent.type];
  if (keys) {
    for (let i2 = 0; i2 < keys.length; i2++) {
      const key = keys[i2];
      const val = parent[key];
      if (Array.isArray(val)) {
        if (val.indexOf(node) >= 0)
          return true;
      } else {
        if (val === node)
          return true;
      }
    }
  }
  return false;
}
var isBlockScoped$1 = {};
var isLet$1 = {};
Object.defineProperty(isLet$1, "__esModule", {
  value: true
});
isLet$1.default = isLet;
var _generated$5 = generated$4;
var _constants$1 = constants;
function isLet(node) {
  return (0, _generated$5.isVariableDeclaration)(node) && (node.kind !== "var" || node[_constants$1.BLOCK_SCOPED_SYMBOL]);
}
Object.defineProperty(isBlockScoped$1, "__esModule", {
  value: true
});
isBlockScoped$1.default = isBlockScoped;
var _generated$4 = generated$4;
var _isLet = isLet$1;
function isBlockScoped(node) {
  return (0, _generated$4.isFunctionDeclaration)(node) || (0, _generated$4.isClassDeclaration)(node) || (0, _isLet.default)(node);
}
var isImmutable$1 = {};
Object.defineProperty(isImmutable$1, "__esModule", {
  value: true
});
isImmutable$1.default = isImmutable;
var _isType = isType$1;
var _generated$3 = generated$4;
function isImmutable(node) {
  if ((0, _isType.default)(node.type, "Immutable"))
    return true;
  if ((0, _generated$3.isIdentifier)(node)) {
    if (node.name === "undefined") {
      return true;
    } else {
      return false;
    }
  }
  return false;
}
var isNodesEquivalent$1 = {};
Object.defineProperty(isNodesEquivalent$1, "__esModule", {
  value: true
});
isNodesEquivalent$1.default = isNodesEquivalent;
var _definitions = definitions;
function isNodesEquivalent(a2, b2) {
  if (typeof a2 !== "object" || typeof b2 !== "object" || a2 == null || b2 == null) {
    return a2 === b2;
  }
  if (a2.type !== b2.type) {
    return false;
  }
  const fields = Object.keys(_definitions.NODE_FIELDS[a2.type] || a2.type);
  const visitorKeys = _definitions.VISITOR_KEYS[a2.type];
  for (const field of fields) {
    if (typeof a2[field] !== typeof b2[field]) {
      return false;
    }
    if (a2[field] == null && b2[field] == null) {
      continue;
    } else if (a2[field] == null || b2[field] == null) {
      return false;
    }
    if (Array.isArray(a2[field])) {
      if (!Array.isArray(b2[field])) {
        return false;
      }
      if (a2[field].length !== b2[field].length) {
        return false;
      }
      for (let i2 = 0; i2 < a2[field].length; i2++) {
        if (!isNodesEquivalent(a2[field][i2], b2[field][i2])) {
          return false;
        }
      }
      continue;
    }
    if (typeof a2[field] === "object" && !(visitorKeys != null && visitorKeys.includes(field))) {
      for (const key of Object.keys(a2[field])) {
        if (a2[field][key] !== b2[field][key]) {
          return false;
        }
      }
      continue;
    }
    if (!isNodesEquivalent(a2[field], b2[field])) {
      return false;
    }
  }
  return true;
}
var isReferenced$1 = {};
Object.defineProperty(isReferenced$1, "__esModule", {
  value: true
});
isReferenced$1.default = isReferenced;
function isReferenced(node, parent, grandparent) {
  switch (parent.type) {
    case "MemberExpression":
    case "OptionalMemberExpression":
      if (parent.property === node) {
        return !!parent.computed;
      }
      return parent.object === node;
    case "JSXMemberExpression":
      return parent.object === node;
    case "VariableDeclarator":
      return parent.init === node;
    case "ArrowFunctionExpression":
      return parent.body === node;
    case "PrivateName":
      return false;
    case "ClassMethod":
    case "ClassPrivateMethod":
    case "ObjectMethod":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return false;
    case "ObjectProperty":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return !grandparent || grandparent.type !== "ObjectPattern";
    case "ClassProperty":
    case "ClassAccessorProperty":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
    case "ClassPrivateProperty":
      return parent.key !== node;
    case "ClassDeclaration":
    case "ClassExpression":
      return parent.superClass === node;
    case "AssignmentExpression":
      return parent.right === node;
    case "AssignmentPattern":
      return parent.right === node;
    case "LabeledStatement":
      return false;
    case "CatchClause":
      return false;
    case "RestElement":
      return false;
    case "BreakStatement":
    case "ContinueStatement":
      return false;
    case "FunctionDeclaration":
    case "FunctionExpression":
      return false;
    case "ExportNamespaceSpecifier":
    case "ExportDefaultSpecifier":
      return false;
    case "ExportSpecifier":
      if (grandparent != null && grandparent.source) {
        return false;
      }
      return parent.local === node;
    case "ImportDefaultSpecifier":
    case "ImportNamespaceSpecifier":
    case "ImportSpecifier":
      return false;
    case "ImportAttribute":
      return false;
    case "JSXAttribute":
      return false;
    case "ObjectPattern":
    case "ArrayPattern":
      return false;
    case "MetaProperty":
      return false;
    case "ObjectTypeProperty":
      return parent.key !== node;
    case "TSEnumMember":
      return parent.id !== node;
    case "TSPropertySignature":
      if (parent.key === node) {
        return !!parent.computed;
      }
      return true;
  }
  return true;
}
var isScope$1 = {};
Object.defineProperty(isScope$1, "__esModule", {
  value: true
});
isScope$1.default = isScope;
var _generated$2 = generated$4;
function isScope(node, parent) {
  if ((0, _generated$2.isBlockStatement)(node) && ((0, _generated$2.isFunction)(parent) || (0, _generated$2.isCatchClause)(parent))) {
    return false;
  }
  if ((0, _generated$2.isPattern)(node) && ((0, _generated$2.isFunction)(parent) || (0, _generated$2.isCatchClause)(parent))) {
    return true;
  }
  return (0, _generated$2.isScopable)(node);
}
var isSpecifierDefault$1 = {};
Object.defineProperty(isSpecifierDefault$1, "__esModule", {
  value: true
});
isSpecifierDefault$1.default = isSpecifierDefault;
var _generated$1 = generated$4;
function isSpecifierDefault(specifier) {
  return (0, _generated$1.isImportDefaultSpecifier)(specifier) || (0, _generated$1.isIdentifier)(specifier.imported || specifier.exported, {
    name: "default"
  });
}
var isValidES3Identifier$1 = {};
Object.defineProperty(isValidES3Identifier$1, "__esModule", {
  value: true
});
isValidES3Identifier$1.default = isValidES3Identifier;
var _isValidIdentifier = isValidIdentifier$1;
const RESERVED_WORDS_ES3_ONLY = /* @__PURE__ */ new Set(["abstract", "boolean", "byte", "char", "double", "enum", "final", "float", "goto", "implements", "int", "interface", "long", "native", "package", "private", "protected", "public", "short", "static", "synchronized", "throws", "transient", "volatile"]);
function isValidES3Identifier(name) {
  return (0, _isValidIdentifier.default)(name) && !RESERVED_WORDS_ES3_ONLY.has(name);
}
var isVar$1 = {};
Object.defineProperty(isVar$1, "__esModule", {
  value: true
});
isVar$1.default = isVar;
var _generated = generated$4;
var _constants = constants;
function isVar(node) {
  return (0, _generated.isVariableDeclaration)(node, {
    kind: "var"
  }) && !node[_constants.BLOCK_SCOPED_SYMBOL];
}
var generated = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null
}, Symbol.toStringTag, { value: "Module" }));
var require$$65 = /* @__PURE__ */ getAugmentedNamespace(generated);
(function(exports2) {
  Object.defineProperty(exports2, "__esModule", {
    value: true
  });
  var _exportNames = {
    react: true,
    assertNode: true,
    createTypeAnnotationBasedOnTypeof: true,
    createUnionTypeAnnotation: true,
    createFlowUnionType: true,
    createTSUnionType: true,
    cloneNode: true,
    clone: true,
    cloneDeep: true,
    cloneDeepWithoutLoc: true,
    cloneWithoutLoc: true,
    addComment: true,
    addComments: true,
    inheritInnerComments: true,
    inheritLeadingComments: true,
    inheritsComments: true,
    inheritTrailingComments: true,
    removeComments: true,
    ensureBlock: true,
    toBindingIdentifierName: true,
    toBlock: true,
    toComputedKey: true,
    toExpression: true,
    toIdentifier: true,
    toKeyAlias: true,
    toSequenceExpression: true,
    toStatement: true,
    valueToNode: true,
    appendToMemberExpression: true,
    inherits: true,
    prependToMemberExpression: true,
    removeProperties: true,
    removePropertiesDeep: true,
    removeTypeDuplicates: true,
    getBindingIdentifiers: true,
    getOuterBindingIdentifiers: true,
    traverse: true,
    traverseFast: true,
    shallowEqual: true,
    is: true,
    isBinding: true,
    isBlockScoped: true,
    isImmutable: true,
    isLet: true,
    isNode: true,
    isNodesEquivalent: true,
    isPlaceholderType: true,
    isReferenced: true,
    isScope: true,
    isSpecifierDefault: true,
    isType: true,
    isValidES3Identifier: true,
    isValidIdentifier: true,
    isVar: true,
    matchesPattern: true,
    validate: true,
    buildMatchMemberExpression: true
  };
  Object.defineProperty(exports2, "addComment", {
    enumerable: true,
    get: function() {
      return _addComment.default;
    }
  });
  Object.defineProperty(exports2, "addComments", {
    enumerable: true,
    get: function() {
      return _addComments2.default;
    }
  });
  Object.defineProperty(exports2, "appendToMemberExpression", {
    enumerable: true,
    get: function() {
      return _appendToMemberExpression.default;
    }
  });
  Object.defineProperty(exports2, "assertNode", {
    enumerable: true,
    get: function() {
      return _assertNode.default;
    }
  });
  Object.defineProperty(exports2, "buildMatchMemberExpression", {
    enumerable: true,
    get: function() {
      return _buildMatchMemberExpression2.default;
    }
  });
  Object.defineProperty(exports2, "clone", {
    enumerable: true,
    get: function() {
      return _clone.default;
    }
  });
  Object.defineProperty(exports2, "cloneDeep", {
    enumerable: true,
    get: function() {
      return _cloneDeep.default;
    }
  });
  Object.defineProperty(exports2, "cloneDeepWithoutLoc", {
    enumerable: true,
    get: function() {
      return _cloneDeepWithoutLoc.default;
    }
  });
  Object.defineProperty(exports2, "cloneNode", {
    enumerable: true,
    get: function() {
      return _cloneNode2.default;
    }
  });
  Object.defineProperty(exports2, "cloneWithoutLoc", {
    enumerable: true,
    get: function() {
      return _cloneWithoutLoc.default;
    }
  });
  Object.defineProperty(exports2, "createFlowUnionType", {
    enumerable: true,
    get: function() {
      return _createFlowUnionType.default;
    }
  });
  Object.defineProperty(exports2, "createTSUnionType", {
    enumerable: true,
    get: function() {
      return _createTSUnionType.default;
    }
  });
  Object.defineProperty(exports2, "createTypeAnnotationBasedOnTypeof", {
    enumerable: true,
    get: function() {
      return _createTypeAnnotationBasedOnTypeof.default;
    }
  });
  Object.defineProperty(exports2, "createUnionTypeAnnotation", {
    enumerable: true,
    get: function() {
      return _createFlowUnionType.default;
    }
  });
  Object.defineProperty(exports2, "ensureBlock", {
    enumerable: true,
    get: function() {
      return _ensureBlock.default;
    }
  });
  Object.defineProperty(exports2, "getBindingIdentifiers", {
    enumerable: true,
    get: function() {
      return _getBindingIdentifiers2.default;
    }
  });
  Object.defineProperty(exports2, "getOuterBindingIdentifiers", {
    enumerable: true,
    get: function() {
      return _getOuterBindingIdentifiers.default;
    }
  });
  Object.defineProperty(exports2, "inheritInnerComments", {
    enumerable: true,
    get: function() {
      return _inheritInnerComments2.default;
    }
  });
  Object.defineProperty(exports2, "inheritLeadingComments", {
    enumerable: true,
    get: function() {
      return _inheritLeadingComments2.default;
    }
  });
  Object.defineProperty(exports2, "inheritTrailingComments", {
    enumerable: true,
    get: function() {
      return _inheritTrailingComments2.default;
    }
  });
  Object.defineProperty(exports2, "inherits", {
    enumerable: true,
    get: function() {
      return _inherits.default;
    }
  });
  Object.defineProperty(exports2, "inheritsComments", {
    enumerable: true,
    get: function() {
      return _inheritsComments2.default;
    }
  });
  Object.defineProperty(exports2, "is", {
    enumerable: true,
    get: function() {
      return _is2.default;
    }
  });
  Object.defineProperty(exports2, "isBinding", {
    enumerable: true,
    get: function() {
      return _isBinding.default;
    }
  });
  Object.defineProperty(exports2, "isBlockScoped", {
    enumerable: true,
    get: function() {
      return _isBlockScoped.default;
    }
  });
  Object.defineProperty(exports2, "isImmutable", {
    enumerable: true,
    get: function() {
      return _isImmutable.default;
    }
  });
  Object.defineProperty(exports2, "isLet", {
    enumerable: true,
    get: function() {
      return _isLet2.default;
    }
  });
  Object.defineProperty(exports2, "isNode", {
    enumerable: true,
    get: function() {
      return _isNode2.default;
    }
  });
  Object.defineProperty(exports2, "isNodesEquivalent", {
    enumerable: true,
    get: function() {
      return _isNodesEquivalent.default;
    }
  });
  Object.defineProperty(exports2, "isPlaceholderType", {
    enumerable: true,
    get: function() {
      return _isPlaceholderType2.default;
    }
  });
  Object.defineProperty(exports2, "isReferenced", {
    enumerable: true,
    get: function() {
      return _isReferenced.default;
    }
  });
  Object.defineProperty(exports2, "isScope", {
    enumerable: true,
    get: function() {
      return _isScope.default;
    }
  });
  Object.defineProperty(exports2, "isSpecifierDefault", {
    enumerable: true,
    get: function() {
      return _isSpecifierDefault.default;
    }
  });
  Object.defineProperty(exports2, "isType", {
    enumerable: true,
    get: function() {
      return _isType2.default;
    }
  });
  Object.defineProperty(exports2, "isValidES3Identifier", {
    enumerable: true,
    get: function() {
      return _isValidES3Identifier.default;
    }
  });
  Object.defineProperty(exports2, "isValidIdentifier", {
    enumerable: true,
    get: function() {
      return _isValidIdentifier2.default;
    }
  });
  Object.defineProperty(exports2, "isVar", {
    enumerable: true,
    get: function() {
      return _isVar.default;
    }
  });
  Object.defineProperty(exports2, "matchesPattern", {
    enumerable: true,
    get: function() {
      return _matchesPattern2.default;
    }
  });
  Object.defineProperty(exports2, "prependToMemberExpression", {
    enumerable: true,
    get: function() {
      return _prependToMemberExpression.default;
    }
  });
  exports2.react = void 0;
  Object.defineProperty(exports2, "removeComments", {
    enumerable: true,
    get: function() {
      return _removeComments.default;
    }
  });
  Object.defineProperty(exports2, "removeProperties", {
    enumerable: true,
    get: function() {
      return _removeProperties2.default;
    }
  });
  Object.defineProperty(exports2, "removePropertiesDeep", {
    enumerable: true,
    get: function() {
      return _removePropertiesDeep2.default;
    }
  });
  Object.defineProperty(exports2, "removeTypeDuplicates", {
    enumerable: true,
    get: function() {
      return _removeTypeDuplicates2.default;
    }
  });
  Object.defineProperty(exports2, "shallowEqual", {
    enumerable: true,
    get: function() {
      return _shallowEqual2.default;
    }
  });
  Object.defineProperty(exports2, "toBindingIdentifierName", {
    enumerable: true,
    get: function() {
      return _toBindingIdentifierName.default;
    }
  });
  Object.defineProperty(exports2, "toBlock", {
    enumerable: true,
    get: function() {
      return _toBlock2.default;
    }
  });
  Object.defineProperty(exports2, "toComputedKey", {
    enumerable: true,
    get: function() {
      return _toComputedKey.default;
    }
  });
  Object.defineProperty(exports2, "toExpression", {
    enumerable: true,
    get: function() {
      return _toExpression.default;
    }
  });
  Object.defineProperty(exports2, "toIdentifier", {
    enumerable: true,
    get: function() {
      return _toIdentifier2.default;
    }
  });
  Object.defineProperty(exports2, "toKeyAlias", {
    enumerable: true,
    get: function() {
      return _toKeyAlias.default;
    }
  });
  Object.defineProperty(exports2, "toSequenceExpression", {
    enumerable: true,
    get: function() {
      return _toSequenceExpression.default;
    }
  });
  Object.defineProperty(exports2, "toStatement", {
    enumerable: true,
    get: function() {
      return _toStatement.default;
    }
  });
  Object.defineProperty(exports2, "traverse", {
    enumerable: true,
    get: function() {
      return _traverse.default;
    }
  });
  Object.defineProperty(exports2, "traverseFast", {
    enumerable: true,
    get: function() {
      return _traverseFast2.default;
    }
  });
  Object.defineProperty(exports2, "validate", {
    enumerable: true,
    get: function() {
      return _validate2.default;
    }
  });
  Object.defineProperty(exports2, "valueToNode", {
    enumerable: true,
    get: function() {
      return _valueToNode.default;
    }
  });
  var _isReactComponent = isReactComponent$1;
  var _isCompatTag = isCompatTag$1;
  var _buildChildren = buildChildren$1;
  var _assertNode = assertNode$1;
  var _generated3 = generated$2;
  Object.keys(_generated3).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports2 && exports2[key] === _generated3[key])
      return;
    Object.defineProperty(exports2, key, {
      enumerable: true,
      get: function() {
        return _generated3[key];
      }
    });
  });
  var _createTypeAnnotationBasedOnTypeof = createTypeAnnotationBasedOnTypeof$1;
  var _createFlowUnionType = createFlowUnionType$1;
  var _createTSUnionType = createTSUnionType$1;
  var _generated22 = generated$3;
  Object.keys(_generated22).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports2 && exports2[key] === _generated22[key])
      return;
    Object.defineProperty(exports2, key, {
      enumerable: true,
      get: function() {
        return _generated22[key];
      }
    });
  });
  var _uppercase = uppercase;
  Object.keys(_uppercase).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports2 && exports2[key] === _uppercase[key])
      return;
    Object.defineProperty(exports2, key, {
      enumerable: true,
      get: function() {
        return _uppercase[key];
      }
    });
  });
  var _cloneNode2 = cloneNode$1;
  var _clone = clone$1;
  var _cloneDeep = cloneDeep$1;
  var _cloneDeepWithoutLoc = cloneDeepWithoutLoc$1;
  var _cloneWithoutLoc = cloneWithoutLoc$1;
  var _addComment = addComment$1;
  var _addComments2 = addComments$1;
  var _inheritInnerComments2 = inheritInnerComments$1;
  var _inheritLeadingComments2 = inheritLeadingComments$1;
  var _inheritsComments2 = inheritsComments$1;
  var _inheritTrailingComments2 = inheritTrailingComments$1;
  var _removeComments = removeComments$1;
  var _generated32 = generated$1;
  Object.keys(_generated32).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports2 && exports2[key] === _generated32[key])
      return;
    Object.defineProperty(exports2, key, {
      enumerable: true,
      get: function() {
        return _generated32[key];
      }
    });
  });
  var _constants2 = constants;
  Object.keys(_constants2).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports2 && exports2[key] === _constants2[key])
      return;
    Object.defineProperty(exports2, key, {
      enumerable: true,
      get: function() {
        return _constants2[key];
      }
    });
  });
  var _ensureBlock = ensureBlock$1;
  var _toBindingIdentifierName = toBindingIdentifierName$1;
  var _toBlock2 = toBlock$1;
  var _toComputedKey = toComputedKey$1;
  var _toExpression = toExpression$1;
  var _toIdentifier2 = toIdentifier$1;
  var _toKeyAlias = toKeyAlias$1;
  var _toSequenceExpression = toSequenceExpression$1;
  var _toStatement = toStatement$1;
  var _valueToNode = valueToNode$1;
  var _definitions2 = definitions;
  Object.keys(_definitions2).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports2 && exports2[key] === _definitions2[key])
      return;
    Object.defineProperty(exports2, key, {
      enumerable: true,
      get: function() {
        return _definitions2[key];
      }
    });
  });
  var _appendToMemberExpression = appendToMemberExpression$1;
  var _inherits = inherits$1;
  var _prependToMemberExpression = prependToMemberExpression$1;
  var _removeProperties2 = removeProperties$1;
  var _removePropertiesDeep2 = removePropertiesDeep$1;
  var _removeTypeDuplicates2 = removeTypeDuplicates$3;
  var _getBindingIdentifiers2 = getBindingIdentifiers$1;
  var _getOuterBindingIdentifiers = getOuterBindingIdentifiers$1;
  var _traverse = traverse$1;
  Object.keys(_traverse).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports2 && exports2[key] === _traverse[key])
      return;
    Object.defineProperty(exports2, key, {
      enumerable: true,
      get: function() {
        return _traverse[key];
      }
    });
  });
  var _traverseFast2 = traverseFast$1;
  var _shallowEqual2 = shallowEqual$1;
  var _is2 = is$1;
  var _isBinding = isBinding$1;
  var _isBlockScoped = isBlockScoped$1;
  var _isImmutable = isImmutable$1;
  var _isLet2 = isLet$1;
  var _isNode2 = isNode$1;
  var _isNodesEquivalent = isNodesEquivalent$1;
  var _isPlaceholderType2 = isPlaceholderType$1;
  var _isReferenced = isReferenced$1;
  var _isScope = isScope$1;
  var _isSpecifierDefault = isSpecifierDefault$1;
  var _isType2 = isType$1;
  var _isValidES3Identifier = isValidES3Identifier$1;
  var _isValidIdentifier2 = isValidIdentifier$1;
  var _isVar = isVar$1;
  var _matchesPattern2 = matchesPattern$1;
  var _validate2 = validate$2;
  var _buildMatchMemberExpression2 = buildMatchMemberExpression$1;
  var _generated4 = generated$4;
  Object.keys(_generated4).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports2 && exports2[key] === _generated4[key])
      return;
    Object.defineProperty(exports2, key, {
      enumerable: true,
      get: function() {
        return _generated4[key];
      }
    });
  });
  var _generated5 = require$$65;
  Object.keys(_generated5).forEach(function(key) {
    if (key === "default" || key === "__esModule")
      return;
    if (Object.prototype.hasOwnProperty.call(_exportNames, key))
      return;
    if (key in exports2 && exports2[key] === _generated5[key])
      return;
    Object.defineProperty(exports2, key, {
      enumerable: true,
      get: function() {
        return _generated5[key];
      }
    });
  });
  const react = {
    isReactComponent: _isReactComponent.default,
    isCompatTag: _isCompatTag.default,
    buildChildren: _buildChildren.default
  };
  exports2.react = react;
})(lib$1);
exports._export_sfc = _export_sfc;
exports.createSSRApp = createSSRApp;
exports.e = e;
exports.f = f$1;
exports.index = index;
exports.n = n$1;
exports.o = o$1;
exports.p = p$1;
exports.resolveComponent = resolveComponent;
exports.s = s$1;
exports.sr = sr;
exports.t = t$1;
exports.wt = wt;
