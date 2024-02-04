import { E as useSafeState, k as _slicedToArray, F as useLayoutUpdateEffect, h as _typeof, G as canUseDom, w as warningOnce, e as _objectSpread2, q as _toConsumableArray, n as _defineProperty, H as merge, I as get, J as set, j as _objectWithoutProperties, g as _extends$1, _ as _inherits, a as _createSuper, b as _classCallCheck, t as toArray$1, y as _assertThisInitialized, c as _createClass, L as useToken, m as classNames, B as genComponentStyleHook, r as merge$1, K as Keyframe, v as resetComponent, x as genFocusOutline, D as ConfigContext, d as composeRef, M as DisabledContext, N as useSize, z as pickAttrs } from "./pickAttrs-4HLBMSpu.js";
import { r as reactExports, R as React } from "./index-n8_yRRwO.js";
function useEvent(callback) {
  var fnRef = reactExports.useRef();
  fnRef.current = callback;
  var memoFn = reactExports.useCallback(function() {
    var _fnRef$current;
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    return (_fnRef$current = fnRef.current) === null || _fnRef$current === void 0 ? void 0 : _fnRef$current.call.apply(_fnRef$current, [fnRef].concat(args));
  }, []);
  return memoFn;
}
function hasValue(value) {
  return value !== void 0;
}
function useMergedState(defaultStateValue, option) {
  var _ref = option || {}, defaultValue = _ref.defaultValue, value = _ref.value, onChange = _ref.onChange, postState = _ref.postState;
  var _useState = useSafeState(function() {
    if (hasValue(value)) {
      return value;
    } else if (hasValue(defaultValue)) {
      return typeof defaultValue === "function" ? defaultValue() : defaultValue;
    } else {
      return typeof defaultStateValue === "function" ? defaultStateValue() : defaultStateValue;
    }
  }), _useState2 = _slicedToArray(_useState, 2), innerValue = _useState2[0], setInnerValue = _useState2[1];
  var mergedValue = value !== void 0 ? value : innerValue;
  var postMergedValue = postState ? postState(mergedValue) : mergedValue;
  var onChangeFn = useEvent(onChange);
  var _useState3 = useSafeState([mergedValue]), _useState4 = _slicedToArray(_useState3, 2), prevValue = _useState4[0], setPrevValue = _useState4[1];
  useLayoutUpdateEffect(function() {
    var prev = prevValue[0];
    if (innerValue !== prev) {
      onChangeFn(innerValue, prev);
    }
  }, [prevValue]);
  useLayoutUpdateEffect(function() {
    if (!hasValue(value)) {
      setInnerValue(value);
    }
  }, [value]);
  var triggerChange = useEvent(function(updater, ignoreDestroy) {
    setInnerValue(updater, ignoreDestroy);
    setPrevValue([mergedValue], ignoreDestroy);
  });
  return [postMergedValue, triggerChange];
}
function _regeneratorRuntime() {
  _regeneratorRuntime = function _regeneratorRuntime2() {
    return exports;
  };
  var exports = {}, Op = Object.prototype, hasOwn = Op.hasOwnProperty, defineProperty = Object.defineProperty || function(obj, key, desc) {
    obj[key] = desc.value;
  }, $Symbol = "function" == typeof Symbol ? Symbol : {}, iteratorSymbol = $Symbol.iterator || "@@iterator", asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator", toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value,
      enumerable: true,
      configurable: true,
      writable: true
    }), obj[key];
  }
  try {
    define({}, "");
  } catch (err) {
    define = function define2(obj, key, value) {
      return obj[key] = value;
    };
  }
  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator, generator = Object.create(protoGenerator.prototype), context = new Context2(tryLocsList || []);
    return defineProperty(generator, "_invoke", {
      value: makeInvokeMethod(innerFn, self, context)
    }), generator;
  }
  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }
  exports.wrap = wrap;
  var ContinueSentinel = {};
  function Generator() {
  }
  function GeneratorFunction() {
  }
  function GeneratorFunctionPrototype() {
  }
  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function() {
    return this;
  });
  var getProto = Object.getPrototypeOf, NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method4) {
      define(prototype, method4, function(arg) {
        return this._invoke(method4, arg);
      });
    });
  }
  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method4, arg, resolve, reject) {
      var record = tryCatch(generator[method4], generator, arg);
      if ("throw" !== record.type) {
        var result = record.arg, value = result.value;
        return value && "object" == _typeof(value) && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function(value2) {
          invoke("next", value2, resolve, reject);
        }, function(err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function(unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function(error) {
          return invoke("throw", error, resolve, reject);
        });
      }
      reject(record.arg);
    }
    var previousPromise;
    defineProperty(this, "_invoke", {
      value: function value(method4, arg) {
        function callInvokeWithMethodAndArg() {
          return new PromiseImpl(function(resolve, reject) {
            invoke(method4, arg, resolve, reject);
          });
        }
        return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
      }
    });
  }
  function makeInvokeMethod(innerFn, self, context) {
    var state = "suspendedStart";
    return function(method4, arg) {
      if ("executing" === state)
        throw new Error("Generator is already running");
      if ("completed" === state) {
        if ("throw" === method4)
          throw arg;
        return doneResult();
      }
      for (context.method = method4, context.arg = arg; ; ) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel)
              continue;
            return delegateResult;
          }
        }
        if ("next" === context.method)
          context.sent = context._sent = context.arg;
        else if ("throw" === context.method) {
          if ("suspendedStart" === state)
            throw state = "completed", context.arg;
          context.dispatchException(context.arg);
        } else
          "return" === context.method && context.abrupt("return", context.arg);
        state = "executing";
        var record = tryCatch(innerFn, self, context);
        if ("normal" === record.type) {
          if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel)
            continue;
          return {
            value: record.arg,
            done: context.done
          };
        }
        "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
      }
    };
  }
  function maybeInvokeDelegate(delegate, context) {
    var methodName = context.method, method4 = delegate.iterator[methodName];
    if (void 0 === method4)
      return context.delegate = null, "throw" === methodName && delegate.iterator["return"] && (context.method = "return", context.arg = void 0, maybeInvokeDelegate(delegate, context), "throw" === context.method) || "return" !== methodName && (context.method = "throw", context.arg = new TypeError("The iterator does not provide a '" + methodName + "' method")), ContinueSentinel;
    var record = tryCatch(method4, delegate.iterator, context.arg);
    if ("throw" === record.type)
      return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = void 0), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }
  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }
  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }
  function Context2(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(true);
  }
  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod)
        return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next)
        return iterable;
      if (!isNaN(iterable.length)) {
        var i = -1, next = function next2() {
          for (; ++i < iterable.length; )
            if (hasOwn.call(iterable, i))
              return next2.value = iterable[i], next2.done = false, next2;
          return next2.value = void 0, next2.done = true, next2;
        };
        return next.next = next;
      }
    }
    return {
      next: doneResult
    };
  }
  function doneResult() {
    return {
      value: void 0,
      done: true
    };
  }
  return GeneratorFunction.prototype = GeneratorFunctionPrototype, defineProperty(Gp, "constructor", {
    value: GeneratorFunctionPrototype,
    configurable: true
  }), defineProperty(GeneratorFunctionPrototype, "constructor", {
    value: GeneratorFunction,
    configurable: true
  }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function(genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function(genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function(arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function() {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function(result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function() {
    return this;
  }), define(Gp, "toString", function() {
    return "[object Generator]";
  }), exports.keys = function(val) {
    var object4 = Object(val), keys = [];
    for (var key in object4)
      keys.push(key);
    return keys.reverse(), function next() {
      for (; keys.length; ) {
        var key2 = keys.pop();
        if (key2 in object4)
          return next.value = key2, next.done = false, next;
      }
      return next.done = true, next;
    };
  }, exports.values = values, Context2.prototype = {
    constructor: Context2,
    reset: function reset(skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = void 0, this.done = false, this.delegate = null, this.method = "next", this.arg = void 0, this.tryEntries.forEach(resetTryEntry), !skipTempReset)
        for (var name in this)
          "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = void 0);
    },
    stop: function stop() {
      this.done = true;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type)
        throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function dispatchException(exception) {
      if (this.done)
        throw exception;
      var context = this;
      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = void 0), !!caught;
      }
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i], record = entry.completion;
        if ("root" === entry.tryLoc)
          return handle("end");
        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"), hasFinally = hasOwn.call(entry, "finallyLoc");
          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc)
              return handle(entry.catchLoc, true);
          } else {
            if (!hasFinally)
              throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc)
              return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function abrupt(type4, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }
      finallyEntry && ("break" === type4 || "continue" === type4) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type4, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function complete(record, afterLoc) {
      if ("throw" === record.type)
        throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc)
          return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }
      throw new Error("illegal catch attempt");
    },
    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName,
        nextLoc
      }, "next" === this.method && (this.arg = void 0), ContinueSentinel;
    }
  }, exports;
}
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }
  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}
function _asyncToGenerator(fn) {
  return function() {
    var self = this, args = arguments;
    return new Promise(function(resolve, reject) {
      var gen = fn.apply(self, args);
      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }
      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }
      _next(void 0);
    });
  };
}
const canUseDocElement = () => canUseDom() && window.document.documentElement;
let flexGapSupported;
const detectFlexGapSupported = () => {
  if (!canUseDocElement()) {
    return false;
  }
  if (flexGapSupported !== void 0) {
    return flexGapSupported;
  }
  const flex = document.createElement("div");
  flex.style.display = "flex";
  flex.style.flexDirection = "column";
  flex.style.rowGap = "1px";
  flex.appendChild(document.createElement("div"));
  flex.appendChild(document.createElement("div"));
  document.body.appendChild(flex);
  flexGapSupported = flex.scrollHeight === 1;
  document.body.removeChild(flex);
  return flexGapSupported;
};
var HOOK_MARK = "RC_FORM_INTERNAL_HOOKS";
var warningFunc = function warningFunc2() {
  warningOnce(false, "Can not find FormContext. Please make sure you wrap Field under Form.");
};
var Context = /* @__PURE__ */ reactExports.createContext({
  getFieldValue: warningFunc,
  getFieldsValue: warningFunc,
  getFieldError: warningFunc,
  getFieldWarning: warningFunc,
  getFieldsError: warningFunc,
  isFieldsTouched: warningFunc,
  isFieldTouched: warningFunc,
  isFieldValidating: warningFunc,
  isFieldsValidating: warningFunc,
  resetFields: warningFunc,
  setFields: warningFunc,
  setFieldValue: warningFunc,
  setFieldsValue: warningFunc,
  validateFields: warningFunc,
  submit: warningFunc,
  getInternalHooks: function getInternalHooks() {
    warningFunc();
    return {
      dispatch: warningFunc,
      initEntityValue: warningFunc,
      registerField: warningFunc,
      useSubscribe: warningFunc,
      setInitialValues: warningFunc,
      destroyForm: warningFunc,
      setCallbacks: warningFunc,
      registerWatch: warningFunc,
      getFields: warningFunc,
      setValidateMessages: warningFunc,
      setPreserve: warningFunc,
      getInitialValue: warningFunc
    };
  }
});
var ListContext = /* @__PURE__ */ reactExports.createContext(null);
function toArray(value) {
  if (value === void 0 || value === null) {
    return [];
  }
  return Array.isArray(value) ? value : [value];
}
function isFormInstance(form) {
  return form && !!form._init;
}
var define_process_env_default = {};
function _extends() {
  _extends = Object.assign ? Object.assign.bind() : function(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf2(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct.bind();
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? /* @__PURE__ */ new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
var formatRegExp = /%[sdj%]/g;
var warning = function warning2() {
};
if (typeof process !== "undefined" && define_process_env_default && false) {
  warning = function warning3(type4, errors) {
    if (typeof console !== "undefined" && console.warn && typeof ASYNC_VALIDATOR_NO_WARNING === "undefined") {
      if (errors.every(function(e) {
        return typeof e === "string";
      })) {
        console.warn(type4, errors);
      }
    }
  };
}
function convertFieldsError(errors) {
  if (!errors || !errors.length)
    return null;
  var fields = {};
  errors.forEach(function(error) {
    var field = error.field;
    fields[field] = fields[field] || [];
    fields[field].push(error);
  });
  return fields;
}
function format(template) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }
  var i = 0;
  var len = args.length;
  if (typeof template === "function") {
    return template.apply(null, args);
  }
  if (typeof template === "string") {
    var str = template.replace(formatRegExp, function(x) {
      if (x === "%%") {
        return "%";
      }
      if (i >= len) {
        return x;
      }
      switch (x) {
        case "%s":
          return String(args[i++]);
        case "%d":
          return Number(args[i++]);
        case "%j":
          try {
            return JSON.stringify(args[i++]);
          } catch (_) {
            return "[Circular]";
          }
          break;
        default:
          return x;
      }
    });
    return str;
  }
  return template;
}
function isNativeStringType(type4) {
  return type4 === "string" || type4 === "url" || type4 === "hex" || type4 === "email" || type4 === "date" || type4 === "pattern";
}
function isEmptyValue(value, type4) {
  if (value === void 0 || value === null) {
    return true;
  }
  if (type4 === "array" && Array.isArray(value) && !value.length) {
    return true;
  }
  if (isNativeStringType(type4) && typeof value === "string" && !value) {
    return true;
  }
  return false;
}
function asyncParallelArray(arr, func, callback) {
  var results = [];
  var total = 0;
  var arrLength = arr.length;
  function count(errors) {
    results.push.apply(results, errors || []);
    total++;
    if (total === arrLength) {
      callback(results);
    }
  }
  arr.forEach(function(a) {
    func(a, count);
  });
}
function asyncSerialArray(arr, func, callback) {
  var index = 0;
  var arrLength = arr.length;
  function next(errors) {
    if (errors && errors.length) {
      callback(errors);
      return;
    }
    var original = index;
    index = index + 1;
    if (original < arrLength) {
      func(arr[original], next);
    } else {
      callback([]);
    }
  }
  next([]);
}
function flattenObjArr(objArr) {
  var ret = [];
  Object.keys(objArr).forEach(function(k) {
    ret.push.apply(ret, objArr[k] || []);
  });
  return ret;
}
var AsyncValidationError = /* @__PURE__ */ function(_Error) {
  _inheritsLoose(AsyncValidationError2, _Error);
  function AsyncValidationError2(errors, fields) {
    var _this;
    _this = _Error.call(this, "Async Validation Error") || this;
    _this.errors = errors;
    _this.fields = fields;
    return _this;
  }
  return AsyncValidationError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
function asyncMap(objArr, option, func, callback, source) {
  if (option.first) {
    var _pending = new Promise(function(resolve, reject) {
      var next = function next2(errors) {
        callback(errors);
        return errors.length ? reject(new AsyncValidationError(errors, convertFieldsError(errors))) : resolve(source);
      };
      var flattenArr = flattenObjArr(objArr);
      asyncSerialArray(flattenArr, func, next);
    });
    _pending["catch"](function(e) {
      return e;
    });
    return _pending;
  }
  var firstFields = option.firstFields === true ? Object.keys(objArr) : option.firstFields || [];
  var objArrKeys = Object.keys(objArr);
  var objArrLength = objArrKeys.length;
  var total = 0;
  var results = [];
  var pending = new Promise(function(resolve, reject) {
    var next = function next2(errors) {
      results.push.apply(results, errors);
      total++;
      if (total === objArrLength) {
        callback(results);
        return results.length ? reject(new AsyncValidationError(results, convertFieldsError(results))) : resolve(source);
      }
    };
    if (!objArrKeys.length) {
      callback(results);
      resolve(source);
    }
    objArrKeys.forEach(function(key) {
      var arr = objArr[key];
      if (firstFields.indexOf(key) !== -1) {
        asyncSerialArray(arr, func, next);
      } else {
        asyncParallelArray(arr, func, next);
      }
    });
  });
  pending["catch"](function(e) {
    return e;
  });
  return pending;
}
function isErrorObj(obj) {
  return !!(obj && obj.message !== void 0);
}
function getValue(value, path) {
  var v = value;
  for (var i = 0; i < path.length; i++) {
    if (v == void 0) {
      return v;
    }
    v = v[path[i]];
  }
  return v;
}
function complementError(rule, source) {
  return function(oe) {
    var fieldValue;
    if (rule.fullFields) {
      fieldValue = getValue(source, rule.fullFields);
    } else {
      fieldValue = source[oe.field || rule.fullField];
    }
    if (isErrorObj(oe)) {
      oe.field = oe.field || rule.fullField;
      oe.fieldValue = fieldValue;
      return oe;
    }
    return {
      message: typeof oe === "function" ? oe() : oe,
      fieldValue,
      field: oe.field || rule.fullField
    };
  };
}
function deepMerge(target, source) {
  if (source) {
    for (var s in source) {
      if (source.hasOwnProperty(s)) {
        var value = source[s];
        if (typeof value === "object" && typeof target[s] === "object") {
          target[s] = _extends({}, target[s], value);
        } else {
          target[s] = value;
        }
      }
    }
  }
  return target;
}
var required$1 = function required(rule, value, source, errors, options, type4) {
  if (rule.required && (!source.hasOwnProperty(rule.field) || isEmptyValue(value, type4 || rule.type))) {
    errors.push(format(options.messages.required, rule.fullField));
  }
};
var whitespace = function whitespace2(rule, value, source, errors, options) {
  if (/^\s+$/.test(value) || value === "") {
    errors.push(format(options.messages.whitespace, rule.fullField));
  }
};
var urlReg;
var getUrlRegex = function() {
  if (urlReg) {
    return urlReg;
  }
  var word = "[a-fA-F\\d:]";
  var b = function b2(options) {
    return options && options.includeBoundaries ? "(?:(?<=\\s|^)(?=" + word + ")|(?<=" + word + ")(?=\\s|$))" : "";
  };
  var v4 = "(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)(?:\\.(?:25[0-5]|2[0-4]\\d|1\\d\\d|[1-9]\\d|\\d)){3}";
  var v6seg = "[a-fA-F\\d]{1,4}";
  var v6 = ("\n(?:\n(?:" + v6seg + ":){7}(?:" + v6seg + "|:)|                                    // 1:2:3:4:5:6:7::  1:2:3:4:5:6:7:8\n(?:" + v6seg + ":){6}(?:" + v4 + "|:" + v6seg + "|:)|                             // 1:2:3:4:5:6::    1:2:3:4:5:6::8   1:2:3:4:5:6::8  1:2:3:4:5:6::1.2.3.4\n(?:" + v6seg + ":){5}(?::" + v4 + "|(?::" + v6seg + "){1,2}|:)|                   // 1:2:3:4:5::      1:2:3:4:5::7:8   1:2:3:4:5::8    1:2:3:4:5::7:1.2.3.4\n(?:" + v6seg + ":){4}(?:(?::" + v6seg + "){0,1}:" + v4 + "|(?::" + v6seg + "){1,3}|:)| // 1:2:3:4::        1:2:3:4::6:7:8   1:2:3:4::8      1:2:3:4::6:7:1.2.3.4\n(?:" + v6seg + ":){3}(?:(?::" + v6seg + "){0,2}:" + v4 + "|(?::" + v6seg + "){1,4}|:)| // 1:2:3::          1:2:3::5:6:7:8   1:2:3::8        1:2:3::5:6:7:1.2.3.4\n(?:" + v6seg + ":){2}(?:(?::" + v6seg + "){0,3}:" + v4 + "|(?::" + v6seg + "){1,5}|:)| // 1:2::            1:2::4:5:6:7:8   1:2::8          1:2::4:5:6:7:1.2.3.4\n(?:" + v6seg + ":){1}(?:(?::" + v6seg + "){0,4}:" + v4 + "|(?::" + v6seg + "){1,6}|:)| // 1::              1::3:4:5:6:7:8   1::8            1::3:4:5:6:7:1.2.3.4\n(?::(?:(?::" + v6seg + "){0,5}:" + v4 + "|(?::" + v6seg + "){1,7}|:))             // ::2:3:4:5:6:7:8  ::2:3:4:5:6:7:8  ::8             ::1.2.3.4\n)(?:%[0-9a-zA-Z]{1,})?                                             // %eth0            %1\n").replace(/\s*\/\/.*$/gm, "").replace(/\n/g, "").trim();
  var v46Exact = new RegExp("(?:^" + v4 + "$)|(?:^" + v6 + "$)");
  var v4exact = new RegExp("^" + v4 + "$");
  var v6exact = new RegExp("^" + v6 + "$");
  var ip = function ip2(options) {
    return options && options.exact ? v46Exact : new RegExp("(?:" + b(options) + v4 + b(options) + ")|(?:" + b(options) + v6 + b(options) + ")", "g");
  };
  ip.v4 = function(options) {
    return options && options.exact ? v4exact : new RegExp("" + b(options) + v4 + b(options), "g");
  };
  ip.v6 = function(options) {
    return options && options.exact ? v6exact : new RegExp("" + b(options) + v6 + b(options), "g");
  };
  var protocol = "(?:(?:[a-z]+:)?//)";
  var auth = "(?:\\S+(?::\\S*)?@)?";
  var ipv4 = ip.v4().source;
  var ipv6 = ip.v6().source;
  var host = "(?:(?:[a-z\\u00a1-\\uffff0-9][-_]*)*[a-z\\u00a1-\\uffff0-9]+)";
  var domain = "(?:\\.(?:[a-z\\u00a1-\\uffff0-9]-*)*[a-z\\u00a1-\\uffff0-9]+)*";
  var tld = "(?:\\.(?:[a-z\\u00a1-\\uffff]{2,}))";
  var port = "(?::\\d{2,5})?";
  var path = '(?:[/?#][^\\s"]*)?';
  var regex = "(?:" + protocol + "|www\\.)" + auth + "(?:localhost|" + ipv4 + "|" + ipv6 + "|" + host + domain + tld + ")" + port + path;
  urlReg = new RegExp("(?:^" + regex + "$)", "i");
  return urlReg;
};
var pattern$2 = {
  // http://emailregex.com/
  email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+\.)+[a-zA-Z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]{2,}))$/,
  // url: new RegExp(
  //   '^(?!mailto:)(?:(?:http|https|ftp)://|//)(?:\\S+(?::\\S*)?@)?(?:(?:(?:[1-9]\\d?|1\\d\\d|2[01]\\d|22[0-3])(?:\\.(?:1?\\d{1,2}|2[0-4]\\d|25[0-5])){2}(?:\\.(?:[0-9]\\d?|1\\d\\d|2[0-4]\\d|25[0-4]))|(?:(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)(?:\\.(?:[a-z\\u00a1-\\uffff0-9]+-*)*[a-z\\u00a1-\\uffff0-9]+)*(?:\\.(?:[a-z\\u00a1-\\uffff]{2,})))|localhost)(?::\\d{2,5})?(?:(/|\\?|#)[^\\s]*)?$',
  //   'i',
  // ),
  hex: /^#?([a-f0-9]{6}|[a-f0-9]{3})$/i
};
var types = {
  integer: function integer(value) {
    return types.number(value) && parseInt(value, 10) === value;
  },
  "float": function float(value) {
    return types.number(value) && !types.integer(value);
  },
  array: function array(value) {
    return Array.isArray(value);
  },
  regexp: function regexp(value) {
    if (value instanceof RegExp) {
      return true;
    }
    try {
      return !!new RegExp(value);
    } catch (e) {
      return false;
    }
  },
  date: function date(value) {
    return typeof value.getTime === "function" && typeof value.getMonth === "function" && typeof value.getYear === "function" && !isNaN(value.getTime());
  },
  number: function number(value) {
    if (isNaN(value)) {
      return false;
    }
    return typeof value === "number";
  },
  object: function object(value) {
    return typeof value === "object" && !types.array(value);
  },
  method: function method(value) {
    return typeof value === "function";
  },
  email: function email(value) {
    return typeof value === "string" && value.length <= 320 && !!value.match(pattern$2.email);
  },
  url: function url(value) {
    return typeof value === "string" && value.length <= 2048 && !!value.match(getUrlRegex());
  },
  hex: function hex(value) {
    return typeof value === "string" && !!value.match(pattern$2.hex);
  }
};
var type$1 = function type(rule, value, source, errors, options) {
  if (rule.required && value === void 0) {
    required$1(rule, value, source, errors, options);
    return;
  }
  var custom = ["integer", "float", "array", "regexp", "object", "method", "email", "number", "date", "url", "hex"];
  var ruleType = rule.type;
  if (custom.indexOf(ruleType) > -1) {
    if (!types[ruleType](value)) {
      errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
    }
  } else if (ruleType && typeof value !== rule.type) {
    errors.push(format(options.messages.types[ruleType], rule.fullField, rule.type));
  }
};
var range = function range2(rule, value, source, errors, options) {
  var len = typeof rule.len === "number";
  var min = typeof rule.min === "number";
  var max = typeof rule.max === "number";
  var spRegexp = /[\uD800-\uDBFF][\uDC00-\uDFFF]/g;
  var val = value;
  var key = null;
  var num = typeof value === "number";
  var str = typeof value === "string";
  var arr = Array.isArray(value);
  if (num) {
    key = "number";
  } else if (str) {
    key = "string";
  } else if (arr) {
    key = "array";
  }
  if (!key) {
    return false;
  }
  if (arr) {
    val = value.length;
  }
  if (str) {
    val = value.replace(spRegexp, "_").length;
  }
  if (len) {
    if (val !== rule.len) {
      errors.push(format(options.messages[key].len, rule.fullField, rule.len));
    }
  } else if (min && !max && val < rule.min) {
    errors.push(format(options.messages[key].min, rule.fullField, rule.min));
  } else if (max && !min && val > rule.max) {
    errors.push(format(options.messages[key].max, rule.fullField, rule.max));
  } else if (min && max && (val < rule.min || val > rule.max)) {
    errors.push(format(options.messages[key].range, rule.fullField, rule.min, rule.max));
  }
};
var ENUM$1 = "enum";
var enumerable$1 = function enumerable(rule, value, source, errors, options) {
  rule[ENUM$1] = Array.isArray(rule[ENUM$1]) ? rule[ENUM$1] : [];
  if (rule[ENUM$1].indexOf(value) === -1) {
    errors.push(format(options.messages[ENUM$1], rule.fullField, rule[ENUM$1].join(", ")));
  }
};
var pattern$1 = function pattern(rule, value, source, errors, options) {
  if (rule.pattern) {
    if (rule.pattern instanceof RegExp) {
      rule.pattern.lastIndex = 0;
      if (!rule.pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    } else if (typeof rule.pattern === "string") {
      var _pattern = new RegExp(rule.pattern);
      if (!_pattern.test(value)) {
        errors.push(format(options.messages.pattern.mismatch, rule.fullField, value, rule.pattern));
      }
    }
  }
};
var rules = {
  required: required$1,
  whitespace,
  type: type$1,
  range,
  "enum": enumerable$1,
  pattern: pattern$1
};
var string = function string2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "string");
    if (!isEmptyValue(value, "string")) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
      rules.pattern(rule, value, source, errors, options);
      if (rule.whitespace === true) {
        rules.whitespace(rule, value, source, errors, options);
      }
    }
  }
  callback(errors);
};
var method2 = function method3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var number2 = function number3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (value === "") {
      value = void 0;
    }
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var _boolean = function _boolean2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var regexp2 = function regexp3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var integer2 = function integer3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var floatFn = function floatFn2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var array2 = function array3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if ((value === void 0 || value === null) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, "array");
    if (value !== void 0 && value !== null) {
      rules.type(rule, value, source, errors, options);
      rules.range(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var object2 = function object3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var ENUM = "enum";
var enumerable2 = function enumerable3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (value !== void 0) {
      rules[ENUM](rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var pattern2 = function pattern3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "string") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "string")) {
      rules.pattern(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var date2 = function date3(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, "date") && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
    if (!isEmptyValue(value, "date")) {
      var dateObject;
      if (value instanceof Date) {
        dateObject = value;
      } else {
        dateObject = new Date(value);
      }
      rules.type(rule, dateObject, source, errors, options);
      if (dateObject) {
        rules.range(rule, dateObject.getTime(), source, errors, options);
      }
    }
  }
  callback(errors);
};
var required2 = function required3(rule, value, callback, source, options) {
  var errors = [];
  var type4 = Array.isArray(value) ? "array" : typeof value;
  rules.required(rule, value, source, errors, options, type4);
  callback(errors);
};
var type2 = function type3(rule, value, callback, source, options) {
  var ruleType = rule.type;
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value, ruleType) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options, ruleType);
    if (!isEmptyValue(value, ruleType)) {
      rules.type(rule, value, source, errors, options);
    }
  }
  callback(errors);
};
var any = function any2(rule, value, callback, source, options) {
  var errors = [];
  var validate = rule.required || !rule.required && source.hasOwnProperty(rule.field);
  if (validate) {
    if (isEmptyValue(value) && !rule.required) {
      return callback();
    }
    rules.required(rule, value, source, errors, options);
  }
  callback(errors);
};
var validators = {
  string,
  method: method2,
  number: number2,
  "boolean": _boolean,
  regexp: regexp2,
  integer: integer2,
  "float": floatFn,
  array: array2,
  object: object2,
  "enum": enumerable2,
  pattern: pattern2,
  date: date2,
  url: type2,
  hex: type2,
  email: type2,
  required: required2,
  any
};
function newMessages() {
  return {
    "default": "Validation error on field %s",
    required: "%s is required",
    "enum": "%s must be one of %s",
    whitespace: "%s cannot be empty",
    date: {
      format: "%s date %s is invalid for format %s",
      parse: "%s date could not be parsed, %s is invalid ",
      invalid: "%s date %s is invalid"
    },
    types: {
      string: "%s is not a %s",
      method: "%s is not a %s (function)",
      array: "%s is not an %s",
      object: "%s is not an %s",
      number: "%s is not a %s",
      date: "%s is not a %s",
      "boolean": "%s is not a %s",
      integer: "%s is not an %s",
      "float": "%s is not a %s",
      regexp: "%s is not a valid %s",
      email: "%s is not a valid %s",
      url: "%s is not a valid %s",
      hex: "%s is not a valid %s"
    },
    string: {
      len: "%s must be exactly %s characters",
      min: "%s must be at least %s characters",
      max: "%s cannot be longer than %s characters",
      range: "%s must be between %s and %s characters"
    },
    number: {
      len: "%s must equal %s",
      min: "%s cannot be less than %s",
      max: "%s cannot be greater than %s",
      range: "%s must be between %s and %s"
    },
    array: {
      len: "%s must be exactly %s in length",
      min: "%s cannot be less than %s in length",
      max: "%s cannot be greater than %s in length",
      range: "%s must be between %s and %s in length"
    },
    pattern: {
      mismatch: "%s value %s does not match pattern %s"
    },
    clone: function clone() {
      var cloned = JSON.parse(JSON.stringify(this));
      cloned.clone = this.clone;
      return cloned;
    }
  };
}
var messages = newMessages();
var Schema = /* @__PURE__ */ function() {
  function Schema2(descriptor) {
    this.rules = null;
    this._messages = messages;
    this.define(descriptor);
  }
  var _proto = Schema2.prototype;
  _proto.define = function define(rules2) {
    var _this = this;
    if (!rules2) {
      throw new Error("Cannot configure a schema with no rules");
    }
    if (typeof rules2 !== "object" || Array.isArray(rules2)) {
      throw new Error("Rules must be an object");
    }
    this.rules = {};
    Object.keys(rules2).forEach(function(name) {
      var item = rules2[name];
      _this.rules[name] = Array.isArray(item) ? item : [item];
    });
  };
  _proto.messages = function messages2(_messages) {
    if (_messages) {
      this._messages = deepMerge(newMessages(), _messages);
    }
    return this._messages;
  };
  _proto.validate = function validate(source_, o, oc) {
    var _this2 = this;
    if (o === void 0) {
      o = {};
    }
    if (oc === void 0) {
      oc = function oc2() {
      };
    }
    var source = source_;
    var options = o;
    var callback = oc;
    if (typeof options === "function") {
      callback = options;
      options = {};
    }
    if (!this.rules || Object.keys(this.rules).length === 0) {
      if (callback) {
        callback(null, source);
      }
      return Promise.resolve(source);
    }
    function complete(results) {
      var errors = [];
      var fields = {};
      function add(e) {
        if (Array.isArray(e)) {
          var _errors;
          errors = (_errors = errors).concat.apply(_errors, e);
        } else {
          errors.push(e);
        }
      }
      for (var i = 0; i < results.length; i++) {
        add(results[i]);
      }
      if (!errors.length) {
        callback(null, source);
      } else {
        fields = convertFieldsError(errors);
        callback(errors, fields);
      }
    }
    if (options.messages) {
      var messages$1 = this.messages();
      if (messages$1 === messages) {
        messages$1 = newMessages();
      }
      deepMerge(messages$1, options.messages);
      options.messages = messages$1;
    } else {
      options.messages = this.messages();
    }
    var series = {};
    var keys = options.keys || Object.keys(this.rules);
    keys.forEach(function(z) {
      var arr = _this2.rules[z];
      var value = source[z];
      arr.forEach(function(r) {
        var rule = r;
        if (typeof rule.transform === "function") {
          if (source === source_) {
            source = _extends({}, source);
          }
          value = source[z] = rule.transform(value);
        }
        if (typeof rule === "function") {
          rule = {
            validator: rule
          };
        } else {
          rule = _extends({}, rule);
        }
        rule.validator = _this2.getValidationMethod(rule);
        if (!rule.validator) {
          return;
        }
        rule.field = z;
        rule.fullField = rule.fullField || z;
        rule.type = _this2.getType(rule);
        series[z] = series[z] || [];
        series[z].push({
          rule,
          value,
          source,
          field: z
        });
      });
    });
    var errorFields = {};
    return asyncMap(series, options, function(data, doIt) {
      var rule = data.rule;
      var deep = (rule.type === "object" || rule.type === "array") && (typeof rule.fields === "object" || typeof rule.defaultField === "object");
      deep = deep && (rule.required || !rule.required && data.value);
      rule.field = data.field;
      function addFullField(key, schema) {
        return _extends({}, schema, {
          fullField: rule.fullField + "." + key,
          fullFields: rule.fullFields ? [].concat(rule.fullFields, [key]) : [key]
        });
      }
      function cb(e) {
        if (e === void 0) {
          e = [];
        }
        var errorList = Array.isArray(e) ? e : [e];
        if (!options.suppressWarning && errorList.length) {
          Schema2.warning("async-validator:", errorList);
        }
        if (errorList.length && rule.message !== void 0) {
          errorList = [].concat(rule.message);
        }
        var filledErrors = errorList.map(complementError(rule, source));
        if (options.first && filledErrors.length) {
          errorFields[rule.field] = 1;
          return doIt(filledErrors);
        }
        if (!deep) {
          doIt(filledErrors);
        } else {
          if (rule.required && !data.value) {
            if (rule.message !== void 0) {
              filledErrors = [].concat(rule.message).map(complementError(rule, source));
            } else if (options.error) {
              filledErrors = [options.error(rule, format(options.messages.required, rule.field))];
            }
            return doIt(filledErrors);
          }
          var fieldsSchema = {};
          if (rule.defaultField) {
            Object.keys(data.value).map(function(key) {
              fieldsSchema[key] = rule.defaultField;
            });
          }
          fieldsSchema = _extends({}, fieldsSchema, data.rule.fields);
          var paredFieldsSchema = {};
          Object.keys(fieldsSchema).forEach(function(field) {
            var fieldSchema = fieldsSchema[field];
            var fieldSchemaList = Array.isArray(fieldSchema) ? fieldSchema : [fieldSchema];
            paredFieldsSchema[field] = fieldSchemaList.map(addFullField.bind(null, field));
          });
          var schema = new Schema2(paredFieldsSchema);
          schema.messages(options.messages);
          if (data.rule.options) {
            data.rule.options.messages = options.messages;
            data.rule.options.error = options.error;
          }
          schema.validate(data.value, data.rule.options || options, function(errs) {
            var finalErrors = [];
            if (filledErrors && filledErrors.length) {
              finalErrors.push.apply(finalErrors, filledErrors);
            }
            if (errs && errs.length) {
              finalErrors.push.apply(finalErrors, errs);
            }
            doIt(finalErrors.length ? finalErrors : null);
          });
        }
      }
      var res;
      if (rule.asyncValidator) {
        res = rule.asyncValidator(rule, data.value, cb, data.source, options);
      } else if (rule.validator) {
        try {
          res = rule.validator(rule, data.value, cb, data.source, options);
        } catch (error) {
          console.error == null ? void 0 : console.error(error);
          if (!options.suppressValidatorError) {
            setTimeout(function() {
              throw error;
            }, 0);
          }
          cb(error.message);
        }
        if (res === true) {
          cb();
        } else if (res === false) {
          cb(typeof rule.message === "function" ? rule.message(rule.fullField || rule.field) : rule.message || (rule.fullField || rule.field) + " fails");
        } else if (res instanceof Array) {
          cb(res);
        } else if (res instanceof Error) {
          cb(res.message);
        }
      }
      if (res && res.then) {
        res.then(function() {
          return cb();
        }, function(e) {
          return cb(e);
        });
      }
    }, function(results) {
      complete(results);
    }, source);
  };
  _proto.getType = function getType(rule) {
    if (rule.type === void 0 && rule.pattern instanceof RegExp) {
      rule.type = "pattern";
    }
    if (typeof rule.validator !== "function" && rule.type && !validators.hasOwnProperty(rule.type)) {
      throw new Error(format("Unknown rule type %s", rule.type));
    }
    return rule.type || "string";
  };
  _proto.getValidationMethod = function getValidationMethod(rule) {
    if (typeof rule.validator === "function") {
      return rule.validator;
    }
    var keys = Object.keys(rule);
    var messageIndex = keys.indexOf("message");
    if (messageIndex !== -1) {
      keys.splice(messageIndex, 1);
    }
    if (keys.length === 1 && keys[0] === "required") {
      return validators.required;
    }
    return validators[this.getType(rule)] || void 0;
  };
  return Schema2;
}();
Schema.register = function register(type4, validator) {
  if (typeof validator !== "function") {
    throw new Error("Cannot register a validator by type, validator is not a function");
  }
  validators[type4] = validator;
};
Schema.warning = warning;
Schema.messages = messages;
Schema.validators = validators;
var typeTemplate = "'${name}' is not a valid ${type}";
var defaultValidateMessages = {
  default: "Validation error on field '${name}'",
  required: "'${name}' is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date"
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters"
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}"
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length"
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}"
  }
};
var AsyncValidator = Schema;
function replaceMessage(template, kv) {
  return template.replace(/\$\{\w+\}/g, function(str) {
    var key = str.slice(2, -1);
    return kv[key];
  });
}
var CODE_LOGIC_ERROR = "CODE_LOGIC_ERROR";
function validateRule(_x, _x2, _x3, _x4, _x5) {
  return _validateRule.apply(this, arguments);
}
function _validateRule() {
  _validateRule = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee2(name, value, rule, options, messageVariables) {
    var cloneRule, originValidator, subRuleField, validator, messages2, result, subResults, kv, fillVariableResult;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1)
        switch (_context2.prev = _context2.next) {
          case 0:
            cloneRule = _objectSpread2({}, rule);
            delete cloneRule.ruleIndex;
            AsyncValidator.warning = function() {
              return void 0;
            };
            if (cloneRule.validator) {
              originValidator = cloneRule.validator;
              cloneRule.validator = function() {
                try {
                  return originValidator.apply(void 0, arguments);
                } catch (error) {
                  console.error(error);
                  return Promise.reject(CODE_LOGIC_ERROR);
                }
              };
            }
            subRuleField = null;
            if (cloneRule && cloneRule.type === "array" && cloneRule.defaultField) {
              subRuleField = cloneRule.defaultField;
              delete cloneRule.defaultField;
            }
            validator = new AsyncValidator(_defineProperty({}, name, [cloneRule]));
            messages2 = merge(defaultValidateMessages, options.validateMessages);
            validator.messages(messages2);
            result = [];
            _context2.prev = 10;
            _context2.next = 13;
            return Promise.resolve(validator.validate(_defineProperty({}, name, value), _objectSpread2({}, options)));
          case 13:
            _context2.next = 18;
            break;
          case 15:
            _context2.prev = 15;
            _context2.t0 = _context2["catch"](10);
            if (_context2.t0.errors) {
              result = _context2.t0.errors.map(function(_ref4, index) {
                var message = _ref4.message;
                var mergedMessage = message === CODE_LOGIC_ERROR ? messages2.default : message;
                return /* @__PURE__ */ reactExports.isValidElement(mergedMessage) ? (
                  // Wrap ReactNode with `key`
                  reactExports.cloneElement(mergedMessage, {
                    key: "error_".concat(index)
                  })
                ) : mergedMessage;
              });
            }
          case 18:
            if (!(!result.length && subRuleField)) {
              _context2.next = 23;
              break;
            }
            _context2.next = 21;
            return Promise.all(value.map(function(subValue, i) {
              return validateRule("".concat(name, ".").concat(i), subValue, subRuleField, options, messageVariables);
            }));
          case 21:
            subResults = _context2.sent;
            return _context2.abrupt("return", subResults.reduce(function(prev, errors) {
              return [].concat(_toConsumableArray(prev), _toConsumableArray(errors));
            }, []));
          case 23:
            kv = _objectSpread2(_objectSpread2({}, rule), {}, {
              name,
              enum: (rule.enum || []).join(", ")
            }, messageVariables);
            fillVariableResult = result.map(function(error) {
              if (typeof error === "string") {
                return replaceMessage(error, kv);
              }
              return error;
            });
            return _context2.abrupt("return", fillVariableResult);
          case 26:
          case "end":
            return _context2.stop();
        }
    }, _callee2, null, [[10, 15]]);
  }));
  return _validateRule.apply(this, arguments);
}
function validateRules(namePath, value, rules2, options, validateFirst, messageVariables) {
  var name = namePath.join(".");
  var filledRules = rules2.map(function(currentRule, ruleIndex) {
    var originValidatorFunc = currentRule.validator;
    var cloneRule = _objectSpread2(_objectSpread2({}, currentRule), {}, {
      ruleIndex
    });
    if (originValidatorFunc) {
      cloneRule.validator = function(rule, val, callback) {
        var hasPromise = false;
        var wrappedCallback = function wrappedCallback2() {
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          Promise.resolve().then(function() {
            warningOnce(!hasPromise, "Your validator function has already return a promise. `callback` will be ignored.");
            if (!hasPromise) {
              callback.apply(void 0, args);
            }
          });
        };
        var promise = originValidatorFunc(rule, val, wrappedCallback);
        hasPromise = promise && typeof promise.then === "function" && typeof promise.catch === "function";
        warningOnce(hasPromise, "`callback` is deprecated. Please return a promise instead.");
        if (hasPromise) {
          promise.then(function() {
            callback();
          }).catch(function(err) {
            callback(err || " ");
          });
        }
      };
    }
    return cloneRule;
  }).sort(function(_ref, _ref2) {
    var w1 = _ref.warningOnly, i1 = _ref.ruleIndex;
    var w2 = _ref2.warningOnly, i2 = _ref2.ruleIndex;
    if (!!w1 === !!w2) {
      return i1 - i2;
    }
    if (w1) {
      return 1;
    }
    return -1;
  });
  var summaryPromise;
  if (validateFirst === true) {
    summaryPromise = new Promise(/* @__PURE__ */ function() {
      var _ref3 = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee(resolve, reject) {
        var i, rule, errors;
        return _regeneratorRuntime().wrap(function _callee$(_context) {
          while (1)
            switch (_context.prev = _context.next) {
              case 0:
                i = 0;
              case 1:
                if (!(i < filledRules.length)) {
                  _context.next = 12;
                  break;
                }
                rule = filledRules[i];
                _context.next = 5;
                return validateRule(name, value, rule, options, messageVariables);
              case 5:
                errors = _context.sent;
                if (!errors.length) {
                  _context.next = 9;
                  break;
                }
                reject([{
                  errors,
                  rule
                }]);
                return _context.abrupt("return");
              case 9:
                i += 1;
                _context.next = 1;
                break;
              case 12:
                resolve([]);
              case 13:
              case "end":
                return _context.stop();
            }
        }, _callee);
      }));
      return function(_x6, _x7) {
        return _ref3.apply(this, arguments);
      };
    }());
  } else {
    var rulePromises = filledRules.map(function(rule) {
      return validateRule(name, value, rule, options, messageVariables).then(function(errors) {
        return {
          errors,
          rule
        };
      });
    });
    summaryPromise = (validateFirst ? finishOnFirstFailed(rulePromises) : finishOnAllFailed(rulePromises)).then(function(errors) {
      return Promise.reject(errors);
    });
  }
  summaryPromise.catch(function(e) {
    return e;
  });
  return summaryPromise;
}
function finishOnAllFailed(_x8) {
  return _finishOnAllFailed.apply(this, arguments);
}
function _finishOnAllFailed() {
  _finishOnAllFailed = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee3(rulePromises) {
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1)
        switch (_context3.prev = _context3.next) {
          case 0:
            return _context3.abrupt("return", Promise.all(rulePromises).then(function(errorsList) {
              var _ref5;
              var errors = (_ref5 = []).concat.apply(_ref5, _toConsumableArray(errorsList));
              return errors;
            }));
          case 1:
          case "end":
            return _context3.stop();
        }
    }, _callee3);
  }));
  return _finishOnAllFailed.apply(this, arguments);
}
function finishOnFirstFailed(_x9) {
  return _finishOnFirstFailed.apply(this, arguments);
}
function _finishOnFirstFailed() {
  _finishOnFirstFailed = _asyncToGenerator(/* @__PURE__ */ _regeneratorRuntime().mark(function _callee4(rulePromises) {
    var count;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1)
        switch (_context4.prev = _context4.next) {
          case 0:
            count = 0;
            return _context4.abrupt("return", new Promise(function(resolve) {
              rulePromises.forEach(function(promise) {
                promise.then(function(ruleError) {
                  if (ruleError.errors.length) {
                    resolve([ruleError]);
                  }
                  count += 1;
                  if (count === rulePromises.length) {
                    resolve([]);
                  }
                });
              });
            }));
          case 2:
          case "end":
            return _context4.stop();
        }
    }, _callee4);
  }));
  return _finishOnFirstFailed.apply(this, arguments);
}
function getNamePath(path) {
  return toArray(path);
}
function cloneByNamePathList(store, namePathList) {
  var newStore = {};
  namePathList.forEach(function(namePath) {
    var value = get(store, namePath);
    newStore = set(newStore, namePath, value);
  });
  return newStore;
}
function containsNamePath(namePathList, namePath) {
  return namePathList && namePathList.some(function(path) {
    return matchNamePath(path, namePath);
  });
}
function matchNamePath(namePath, changedNamePath) {
  if (!namePath || !changedNamePath || namePath.length !== changedNamePath.length) {
    return false;
  }
  return namePath.every(function(nameUnit, i) {
    return changedNamePath[i] === nameUnit;
  });
}
function isSimilar(source, target) {
  if (source === target) {
    return true;
  }
  if (!source && target || source && !target) {
    return false;
  }
  if (!source || !target || _typeof(source) !== "object" || _typeof(target) !== "object") {
    return false;
  }
  var sourceKeys = Object.keys(source);
  var targetKeys = Object.keys(target);
  var keys = new Set([].concat(sourceKeys, targetKeys));
  return _toConsumableArray(keys).every(function(key) {
    var sourceValue = source[key];
    var targetValue = target[key];
    if (typeof sourceValue === "function" && typeof targetValue === "function") {
      return true;
    }
    return sourceValue === targetValue;
  });
}
function defaultGetValueFromEvent(valuePropName) {
  var event = arguments.length <= 1 ? void 0 : arguments[1];
  if (event && event.target && _typeof(event.target) === "object" && valuePropName in event.target) {
    return event.target[valuePropName];
  }
  return event;
}
function move(array4, moveIndex, toIndex) {
  var length = array4.length;
  if (moveIndex < 0 || moveIndex >= length || toIndex < 0 || toIndex >= length) {
    return array4;
  }
  var item = array4[moveIndex];
  var diff = moveIndex - toIndex;
  if (diff > 0) {
    return [].concat(_toConsumableArray(array4.slice(0, toIndex)), [item], _toConsumableArray(array4.slice(toIndex, moveIndex)), _toConsumableArray(array4.slice(moveIndex + 1, length)));
  }
  if (diff < 0) {
    return [].concat(_toConsumableArray(array4.slice(0, moveIndex)), _toConsumableArray(array4.slice(moveIndex + 1, toIndex + 1)), [item], _toConsumableArray(array4.slice(toIndex + 1, length)));
  }
  return array4;
}
var _excluded$3 = ["name"];
var EMPTY_ERRORS = [];
function requireUpdate(shouldUpdate, prev, next, prevValue, nextValue, info) {
  if (typeof shouldUpdate === "function") {
    return shouldUpdate(prev, next, "source" in info ? {
      source: info.source
    } : {});
  }
  return prevValue !== nextValue;
}
var Field = /* @__PURE__ */ function(_React$Component) {
  _inherits(Field2, _React$Component);
  var _super = _createSuper(Field2);
  function Field2(props) {
    var _this;
    _classCallCheck(this, Field2);
    _this = _super.call(this, props);
    _this.state = {
      resetCount: 0
    };
    _this.cancelRegisterFunc = null;
    _this.mounted = false;
    _this.touched = false;
    _this.dirty = false;
    _this.validatePromise = void 0;
    _this.prevValidating = void 0;
    _this.errors = EMPTY_ERRORS;
    _this.warnings = EMPTY_ERRORS;
    _this.cancelRegister = function() {
      var _this$props = _this.props, preserve = _this$props.preserve, isListField = _this$props.isListField, name = _this$props.name;
      if (_this.cancelRegisterFunc) {
        _this.cancelRegisterFunc(isListField, preserve, getNamePath(name));
      }
      _this.cancelRegisterFunc = null;
    };
    _this.getNamePath = function() {
      var _this$props2 = _this.props, name = _this$props2.name, fieldContext = _this$props2.fieldContext;
      var _fieldContext$prefixN = fieldContext.prefixName, prefixName = _fieldContext$prefixN === void 0 ? [] : _fieldContext$prefixN;
      return name !== void 0 ? [].concat(_toConsumableArray(prefixName), _toConsumableArray(name)) : [];
    };
    _this.getRules = function() {
      var _this$props3 = _this.props, _this$props3$rules = _this$props3.rules, rules2 = _this$props3$rules === void 0 ? [] : _this$props3$rules, fieldContext = _this$props3.fieldContext;
      return rules2.map(function(rule) {
        if (typeof rule === "function") {
          return rule(fieldContext);
        }
        return rule;
      });
    };
    _this.refresh = function() {
      if (!_this.mounted)
        return;
      _this.setState(function(_ref) {
        var resetCount = _ref.resetCount;
        return {
          resetCount: resetCount + 1
        };
      });
    };
    _this.triggerMetaEvent = function(destroy) {
      var onMetaChange = _this.props.onMetaChange;
      onMetaChange === null || onMetaChange === void 0 ? void 0 : onMetaChange(_objectSpread2(_objectSpread2({}, _this.getMeta()), {}, {
        destroy
      }));
    };
    _this.onStoreChange = function(prevStore, namePathList, info) {
      var _this$props4 = _this.props, shouldUpdate = _this$props4.shouldUpdate, _this$props4$dependen = _this$props4.dependencies, dependencies = _this$props4$dependen === void 0 ? [] : _this$props4$dependen, onReset = _this$props4.onReset;
      var store = info.store;
      var namePath = _this.getNamePath();
      var prevValue = _this.getValue(prevStore);
      var curValue = _this.getValue(store);
      var namePathMatch = namePathList && containsNamePath(namePathList, namePath);
      if (info.type === "valueUpdate" && info.source === "external" && prevValue !== curValue) {
        _this.touched = true;
        _this.dirty = true;
        _this.validatePromise = null;
        _this.errors = EMPTY_ERRORS;
        _this.warnings = EMPTY_ERRORS;
        _this.triggerMetaEvent();
      }
      switch (info.type) {
        case "reset":
          if (!namePathList || namePathMatch) {
            _this.touched = false;
            _this.dirty = false;
            _this.validatePromise = void 0;
            _this.errors = EMPTY_ERRORS;
            _this.warnings = EMPTY_ERRORS;
            _this.triggerMetaEvent();
            onReset === null || onReset === void 0 ? void 0 : onReset();
            _this.refresh();
            return;
          }
          break;
        case "remove": {
          if (shouldUpdate) {
            _this.reRender();
            return;
          }
          break;
        }
        case "setField": {
          if (namePathMatch) {
            var data = info.data;
            if ("touched" in data) {
              _this.touched = data.touched;
            }
            if ("validating" in data && !("originRCField" in data)) {
              _this.validatePromise = data.validating ? Promise.resolve([]) : null;
            }
            if ("errors" in data) {
              _this.errors = data.errors || EMPTY_ERRORS;
            }
            if ("warnings" in data) {
              _this.warnings = data.warnings || EMPTY_ERRORS;
            }
            _this.dirty = true;
            _this.triggerMetaEvent();
            _this.reRender();
            return;
          }
          if (shouldUpdate && !namePath.length && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
            _this.reRender();
            return;
          }
          break;
        }
        case "dependenciesUpdate": {
          var dependencyList = dependencies.map(getNamePath);
          if (dependencyList.some(function(dependency) {
            return containsNamePath(info.relatedFields, dependency);
          })) {
            _this.reRender();
            return;
          }
          break;
        }
        default:
          if (namePathMatch || (!dependencies.length || namePath.length || shouldUpdate) && requireUpdate(shouldUpdate, prevStore, store, prevValue, curValue, info)) {
            _this.reRender();
            return;
          }
          break;
      }
      if (shouldUpdate === true) {
        _this.reRender();
      }
    };
    _this.validateRules = function(options) {
      var namePath = _this.getNamePath();
      var currentValue = _this.getValue();
      var _ref2 = options || {}, triggerName = _ref2.triggerName, _ref2$validateOnly = _ref2.validateOnly, validateOnly = _ref2$validateOnly === void 0 ? false : _ref2$validateOnly;
      var rootPromise = Promise.resolve().then(function() {
        if (!_this.mounted) {
          return [];
        }
        var _this$props5 = _this.props, _this$props5$validate = _this$props5.validateFirst, validateFirst = _this$props5$validate === void 0 ? false : _this$props5$validate, messageVariables = _this$props5.messageVariables;
        var filteredRules = _this.getRules();
        if (triggerName) {
          filteredRules = filteredRules.filter(function(rule) {
            return rule;
          }).filter(function(rule) {
            var validateTrigger = rule.validateTrigger;
            if (!validateTrigger) {
              return true;
            }
            var triggerList = toArray(validateTrigger);
            return triggerList.includes(triggerName);
          });
        }
        var promise = validateRules(namePath, currentValue, filteredRules, options, validateFirst, messageVariables);
        promise.catch(function(e) {
          return e;
        }).then(function() {
          var ruleErrors = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : EMPTY_ERRORS;
          if (_this.validatePromise === rootPromise) {
            var _ruleErrors$forEach;
            _this.validatePromise = null;
            var nextErrors = [];
            var nextWarnings = [];
            (_ruleErrors$forEach = ruleErrors.forEach) === null || _ruleErrors$forEach === void 0 ? void 0 : _ruleErrors$forEach.call(ruleErrors, function(_ref3) {
              var warningOnly = _ref3.rule.warningOnly, _ref3$errors = _ref3.errors, errors = _ref3$errors === void 0 ? EMPTY_ERRORS : _ref3$errors;
              if (warningOnly) {
                nextWarnings.push.apply(nextWarnings, _toConsumableArray(errors));
              } else {
                nextErrors.push.apply(nextErrors, _toConsumableArray(errors));
              }
            });
            _this.errors = nextErrors;
            _this.warnings = nextWarnings;
            _this.triggerMetaEvent();
            _this.reRender();
          }
        });
        return promise;
      });
      if (validateOnly) {
        return rootPromise;
      }
      _this.validatePromise = rootPromise;
      _this.dirty = true;
      _this.errors = EMPTY_ERRORS;
      _this.warnings = EMPTY_ERRORS;
      _this.triggerMetaEvent();
      _this.reRender();
      return rootPromise;
    };
    _this.isFieldValidating = function() {
      return !!_this.validatePromise;
    };
    _this.isFieldTouched = function() {
      return _this.touched;
    };
    _this.isFieldDirty = function() {
      if (_this.dirty || _this.props.initialValue !== void 0) {
        return true;
      }
      var fieldContext = _this.props.fieldContext;
      var _fieldContext$getInte = fieldContext.getInternalHooks(HOOK_MARK), getInitialValue = _fieldContext$getInte.getInitialValue;
      if (getInitialValue(_this.getNamePath()) !== void 0) {
        return true;
      }
      return false;
    };
    _this.getErrors = function() {
      return _this.errors;
    };
    _this.getWarnings = function() {
      return _this.warnings;
    };
    _this.isListField = function() {
      return _this.props.isListField;
    };
    _this.isList = function() {
      return _this.props.isList;
    };
    _this.isPreserve = function() {
      return _this.props.preserve;
    };
    _this.getMeta = function() {
      _this.prevValidating = _this.isFieldValidating();
      var meta = {
        touched: _this.isFieldTouched(),
        validating: _this.prevValidating,
        errors: _this.errors,
        warnings: _this.warnings,
        name: _this.getNamePath(),
        validated: _this.validatePromise === null
      };
      return meta;
    };
    _this.getOnlyChild = function(children) {
      if (typeof children === "function") {
        var meta = _this.getMeta();
        return _objectSpread2(_objectSpread2({}, _this.getOnlyChild(children(_this.getControlled(), meta, _this.props.fieldContext))), {}, {
          isFunction: true
        });
      }
      var childList = toArray$1(children);
      if (childList.length !== 1 || !/* @__PURE__ */ reactExports.isValidElement(childList[0])) {
        return {
          child: childList,
          isFunction: false
        };
      }
      return {
        child: childList[0],
        isFunction: false
      };
    };
    _this.getValue = function(store) {
      var getFieldsValue = _this.props.fieldContext.getFieldsValue;
      var namePath = _this.getNamePath();
      return get(store || getFieldsValue(true), namePath);
    };
    _this.getControlled = function() {
      var childProps = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
      var _this$props6 = _this.props, trigger = _this$props6.trigger, validateTrigger = _this$props6.validateTrigger, getValueFromEvent = _this$props6.getValueFromEvent, normalize2 = _this$props6.normalize, valuePropName = _this$props6.valuePropName, getValueProps = _this$props6.getValueProps, fieldContext = _this$props6.fieldContext;
      var mergedValidateTrigger = validateTrigger !== void 0 ? validateTrigger : fieldContext.validateTrigger;
      var namePath = _this.getNamePath();
      var getInternalHooks22 = fieldContext.getInternalHooks, getFieldsValue = fieldContext.getFieldsValue;
      var _getInternalHooks = getInternalHooks22(HOOK_MARK), dispatch = _getInternalHooks.dispatch;
      var value = _this.getValue();
      var mergedGetValueProps = getValueProps || function(val) {
        return _defineProperty({}, valuePropName, val);
      };
      var originTriggerFunc = childProps[trigger];
      var control = _objectSpread2(_objectSpread2({}, childProps), mergedGetValueProps(value));
      control[trigger] = function() {
        _this.touched = true;
        _this.dirty = true;
        _this.triggerMetaEvent();
        var newValue;
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        if (getValueFromEvent) {
          newValue = getValueFromEvent.apply(void 0, args);
        } else {
          newValue = defaultGetValueFromEvent.apply(void 0, [valuePropName].concat(args));
        }
        if (normalize2) {
          newValue = normalize2(newValue, value, getFieldsValue(true));
        }
        dispatch({
          type: "updateValue",
          namePath,
          value: newValue
        });
        if (originTriggerFunc) {
          originTriggerFunc.apply(void 0, args);
        }
      };
      var validateTriggerList = toArray(mergedValidateTrigger || []);
      validateTriggerList.forEach(function(triggerName) {
        var originTrigger = control[triggerName];
        control[triggerName] = function() {
          if (originTrigger) {
            originTrigger.apply(void 0, arguments);
          }
          var rules2 = _this.props.rules;
          if (rules2 && rules2.length) {
            dispatch({
              type: "validateField",
              namePath,
              triggerName
            });
          }
        };
      });
      return control;
    };
    if (props.fieldContext) {
      var getInternalHooks2 = props.fieldContext.getInternalHooks;
      var _getInternalHooks2 = getInternalHooks2(HOOK_MARK), initEntityValue = _getInternalHooks2.initEntityValue;
      initEntityValue(_assertThisInitialized(_this));
    }
    return _this;
  }
  _createClass(Field2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props7 = this.props, shouldUpdate = _this$props7.shouldUpdate, fieldContext = _this$props7.fieldContext;
      this.mounted = true;
      if (fieldContext) {
        var getInternalHooks2 = fieldContext.getInternalHooks;
        var _getInternalHooks3 = getInternalHooks2(HOOK_MARK), registerField = _getInternalHooks3.registerField;
        this.cancelRegisterFunc = registerField(this);
      }
      if (shouldUpdate === true) {
        this.reRender();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.cancelRegister();
      this.triggerMetaEvent(true);
      this.mounted = false;
    }
  }, {
    key: "reRender",
    value: function reRender() {
      if (!this.mounted)
        return;
      this.forceUpdate();
    }
  }, {
    key: "render",
    value: function render() {
      var resetCount = this.state.resetCount;
      var children = this.props.children;
      var _this$getOnlyChild = this.getOnlyChild(children), child = _this$getOnlyChild.child, isFunction = _this$getOnlyChild.isFunction;
      var returnChildNode;
      if (isFunction) {
        returnChildNode = child;
      } else if (/* @__PURE__ */ reactExports.isValidElement(child)) {
        returnChildNode = /* @__PURE__ */ reactExports.cloneElement(child, this.getControlled(child.props));
      } else {
        warningOnce(!child, "`children` of Field is not validate ReactElement.");
        returnChildNode = child;
      }
      return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, {
        key: resetCount
      }, returnChildNode);
    }
  }]);
  return Field2;
}(reactExports.Component);
Field.contextType = Context;
Field.defaultProps = {
  trigger: "onChange",
  valuePropName: "value"
};
function WrapperField(_ref5) {
  var name = _ref5.name, restProps = _objectWithoutProperties(_ref5, _excluded$3);
  var fieldContext = reactExports.useContext(Context);
  var listContext = reactExports.useContext(ListContext);
  var namePath = name !== void 0 ? getNamePath(name) : void 0;
  var key = "keep";
  if (!restProps.isListField) {
    key = "_".concat((namePath || []).join("_"));
  }
  return /* @__PURE__ */ reactExports.createElement(Field, _extends$1({
    key,
    name: namePath,
    isListField: !!listContext
  }, restProps, {
    fieldContext
  }));
}
var List = function List2(_ref) {
  var name = _ref.name, initialValue = _ref.initialValue, children = _ref.children, rules2 = _ref.rules, validateTrigger = _ref.validateTrigger, isListField = _ref.isListField;
  var context = reactExports.useContext(Context);
  var wrapperListContext = reactExports.useContext(ListContext);
  var keyRef = reactExports.useRef({
    keys: [],
    id: 0
  });
  var keyManager = keyRef.current;
  var prefixName = reactExports.useMemo(function() {
    var parentPrefixName = getNamePath(context.prefixName) || [];
    return [].concat(_toConsumableArray(parentPrefixName), _toConsumableArray(getNamePath(name)));
  }, [context.prefixName, name]);
  var fieldContext = reactExports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, context), {}, {
      prefixName
    });
  }, [context, prefixName]);
  var listContext = reactExports.useMemo(function() {
    return {
      getKey: function getKey(namePath) {
        var len = prefixName.length;
        var pathName = namePath[len];
        return [keyManager.keys[pathName], namePath.slice(len + 1)];
      }
    };
  }, [prefixName]);
  if (typeof children !== "function") {
    warningOnce(false, "Form.List only accepts function as children.");
    return null;
  }
  var shouldUpdate = function shouldUpdate2(prevValue, nextValue, _ref2) {
    var source = _ref2.source;
    if (source === "internal") {
      return false;
    }
    return prevValue !== nextValue;
  };
  return /* @__PURE__ */ reactExports.createElement(ListContext.Provider, {
    value: listContext
  }, /* @__PURE__ */ reactExports.createElement(Context.Provider, {
    value: fieldContext
  }, /* @__PURE__ */ reactExports.createElement(WrapperField, {
    name: [],
    shouldUpdate,
    rules: rules2,
    validateTrigger,
    initialValue,
    isList: true,
    isListField: isListField !== null && isListField !== void 0 ? isListField : !!wrapperListContext
  }, function(_ref3, meta) {
    var _ref3$value = _ref3.value, value = _ref3$value === void 0 ? [] : _ref3$value, onChange = _ref3.onChange;
    var getFieldValue = context.getFieldValue;
    var getNewValue = function getNewValue2() {
      var values = getFieldValue(prefixName || []);
      return values || [];
    };
    var operations = {
      add: function add(defaultValue, index) {
        var newValue = getNewValue();
        if (index >= 0 && index <= newValue.length) {
          keyManager.keys = [].concat(_toConsumableArray(keyManager.keys.slice(0, index)), [keyManager.id], _toConsumableArray(keyManager.keys.slice(index)));
          onChange([].concat(_toConsumableArray(newValue.slice(0, index)), [defaultValue], _toConsumableArray(newValue.slice(index))));
        } else {
          keyManager.keys = [].concat(_toConsumableArray(keyManager.keys), [keyManager.id]);
          onChange([].concat(_toConsumableArray(newValue), [defaultValue]));
        }
        keyManager.id += 1;
      },
      remove: function remove(index) {
        var newValue = getNewValue();
        var indexSet = new Set(Array.isArray(index) ? index : [index]);
        if (indexSet.size <= 0) {
          return;
        }
        keyManager.keys = keyManager.keys.filter(function(_, keysIndex) {
          return !indexSet.has(keysIndex);
        });
        onChange(newValue.filter(function(_, valueIndex) {
          return !indexSet.has(valueIndex);
        }));
      },
      move: function move$1(from, to) {
        if (from === to) {
          return;
        }
        var newValue = getNewValue();
        if (from < 0 || from >= newValue.length || to < 0 || to >= newValue.length) {
          return;
        }
        keyManager.keys = move(keyManager.keys, from, to);
        onChange(move(newValue, from, to));
      }
    };
    var listValue = value || [];
    if (!Array.isArray(listValue)) {
      listValue = [];
    }
    return children(listValue.map(function(__, index) {
      var key = keyManager.keys[index];
      if (key === void 0) {
        keyManager.keys[index] = keyManager.id;
        key = keyManager.keys[index];
        keyManager.id += 1;
      }
      return {
        name: index,
        key,
        isListField: true
      };
    }), operations, meta);
  })));
};
function allPromiseFinish(promiseList) {
  var hasError = false;
  var count = promiseList.length;
  var results = [];
  if (!promiseList.length) {
    return Promise.resolve([]);
  }
  return new Promise(function(resolve, reject) {
    promiseList.forEach(function(promise, index) {
      promise.catch(function(e) {
        hasError = true;
        return e;
      }).then(function(result) {
        count -= 1;
        results[index] = result;
        if (count > 0) {
          return;
        }
        if (hasError) {
          reject(results);
        }
        resolve(results);
      });
    });
  });
}
var SPLIT = "__@field_split__";
function normalize(namePath) {
  return namePath.map(function(cell) {
    return "".concat(_typeof(cell), ":").concat(cell);
  }).join(SPLIT);
}
var NameMap = /* @__PURE__ */ function() {
  function NameMap2() {
    _classCallCheck(this, NameMap2);
    this.kvs = /* @__PURE__ */ new Map();
  }
  _createClass(NameMap2, [{
    key: "set",
    value: function set2(key, value) {
      this.kvs.set(normalize(key), value);
    }
  }, {
    key: "get",
    value: function get2(key) {
      return this.kvs.get(normalize(key));
    }
  }, {
    key: "update",
    value: function update(key, updater) {
      var origin = this.get(key);
      var next = updater(origin);
      if (!next) {
        this.delete(key);
      } else {
        this.set(key, next);
      }
    }
  }, {
    key: "delete",
    value: function _delete(key) {
      this.kvs.delete(normalize(key));
    }
    // Since we only use this in test, let simply realize this
  }, {
    key: "map",
    value: function map(callback) {
      return _toConsumableArray(this.kvs.entries()).map(function(_ref) {
        var _ref2 = _slicedToArray(_ref, 2), key = _ref2[0], value = _ref2[1];
        var cells = key.split(SPLIT);
        return callback({
          key: cells.map(function(cell) {
            var _cell$match = cell.match(/^([^:]*):(.*)$/), _cell$match2 = _slicedToArray(_cell$match, 3), type4 = _cell$match2[1], unit = _cell$match2[2];
            return type4 === "number" ? Number(unit) : unit;
          }),
          value
        });
      });
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      var json = {};
      this.map(function(_ref3) {
        var key = _ref3.key, value = _ref3.value;
        json[key.join(".")] = value;
        return null;
      });
      return json;
    }
  }]);
  return NameMap2;
}();
var _excluded$2 = ["name"];
var FormStore = /* @__PURE__ */ _createClass(function FormStore2(forceRootUpdate) {
  var _this = this;
  _classCallCheck(this, FormStore2);
  this.formHooked = false;
  this.forceRootUpdate = void 0;
  this.subscribable = true;
  this.store = {};
  this.fieldEntities = [];
  this.initialValues = {};
  this.callbacks = {};
  this.validateMessages = null;
  this.preserve = null;
  this.lastValidatePromise = null;
  this.getForm = function() {
    return {
      getFieldValue: _this.getFieldValue,
      getFieldsValue: _this.getFieldsValue,
      getFieldError: _this.getFieldError,
      getFieldWarning: _this.getFieldWarning,
      getFieldsError: _this.getFieldsError,
      isFieldsTouched: _this.isFieldsTouched,
      isFieldTouched: _this.isFieldTouched,
      isFieldValidating: _this.isFieldValidating,
      isFieldsValidating: _this.isFieldsValidating,
      resetFields: _this.resetFields,
      setFields: _this.setFields,
      setFieldValue: _this.setFieldValue,
      setFieldsValue: _this.setFieldsValue,
      validateFields: _this.validateFields,
      submit: _this.submit,
      _init: true,
      getInternalHooks: _this.getInternalHooks
    };
  };
  this.getInternalHooks = function(key) {
    if (key === HOOK_MARK) {
      _this.formHooked = true;
      return {
        dispatch: _this.dispatch,
        initEntityValue: _this.initEntityValue,
        registerField: _this.registerField,
        useSubscribe: _this.useSubscribe,
        setInitialValues: _this.setInitialValues,
        destroyForm: _this.destroyForm,
        setCallbacks: _this.setCallbacks,
        setValidateMessages: _this.setValidateMessages,
        getFields: _this.getFields,
        setPreserve: _this.setPreserve,
        getInitialValue: _this.getInitialValue,
        registerWatch: _this.registerWatch
      };
    }
    warningOnce(false, "`getInternalHooks` is internal usage. Should not call directly.");
    return null;
  };
  this.useSubscribe = function(subscribable) {
    _this.subscribable = subscribable;
  };
  this.prevWithoutPreserves = null;
  this.setInitialValues = function(initialValues, init) {
    _this.initialValues = initialValues || {};
    if (init) {
      var _this$prevWithoutPres;
      var nextStore = merge(initialValues, _this.store);
      (_this$prevWithoutPres = _this.prevWithoutPreserves) === null || _this$prevWithoutPres === void 0 ? void 0 : _this$prevWithoutPres.map(function(_ref) {
        var namePath = _ref.key;
        nextStore = set(nextStore, namePath, get(initialValues, namePath));
      });
      _this.prevWithoutPreserves = null;
      _this.updateStore(nextStore);
    }
  };
  this.destroyForm = function() {
    var prevWithoutPreserves = new NameMap();
    _this.getFieldEntities(true).forEach(function(entity) {
      if (!_this.isMergedPreserve(entity.isPreserve())) {
        prevWithoutPreserves.set(entity.getNamePath(), true);
      }
    });
    _this.prevWithoutPreserves = prevWithoutPreserves;
  };
  this.getInitialValue = function(namePath) {
    var initValue = get(_this.initialValues, namePath);
    return namePath.length ? merge(initValue) : initValue;
  };
  this.setCallbacks = function(callbacks) {
    _this.callbacks = callbacks;
  };
  this.setValidateMessages = function(validateMessages) {
    _this.validateMessages = validateMessages;
  };
  this.setPreserve = function(preserve) {
    _this.preserve = preserve;
  };
  this.watchList = [];
  this.registerWatch = function(callback) {
    _this.watchList.push(callback);
    return function() {
      _this.watchList = _this.watchList.filter(function(fn) {
        return fn !== callback;
      });
    };
  };
  this.notifyWatch = function() {
    var namePath = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    if (_this.watchList.length) {
      var values = _this.getFieldsValue();
      var allValues = _this.getFieldsValue(true);
      _this.watchList.forEach(function(callback) {
        callback(values, allValues, namePath);
      });
    }
  };
  this.timeoutId = null;
  this.warningUnhooked = function() {
  };
  this.updateStore = function(nextStore) {
    _this.store = nextStore;
  };
  this.getFieldEntities = function() {
    var pure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    if (!pure) {
      return _this.fieldEntities;
    }
    return _this.fieldEntities.filter(function(field) {
      return field.getNamePath().length;
    });
  };
  this.getFieldsMap = function() {
    var pure = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    var cache = new NameMap();
    _this.getFieldEntities(pure).forEach(function(field) {
      var namePath = field.getNamePath();
      cache.set(namePath, field);
    });
    return cache;
  };
  this.getFieldEntitiesForNamePathList = function(nameList) {
    if (!nameList) {
      return _this.getFieldEntities(true);
    }
    var cache = _this.getFieldsMap(true);
    return nameList.map(function(name) {
      var namePath = getNamePath(name);
      return cache.get(namePath) || {
        INVALIDATE_NAME_PATH: getNamePath(name)
      };
    });
  };
  this.getFieldsValue = function(nameList, filterFunc) {
    _this.warningUnhooked();
    if (nameList === true && !filterFunc) {
      return _this.store;
    }
    var fieldEntities = _this.getFieldEntitiesForNamePathList(Array.isArray(nameList) ? nameList : null);
    var filteredNameList = [];
    fieldEntities.forEach(function(entity) {
      var _entity$isListField;
      var namePath = "INVALIDATE_NAME_PATH" in entity ? entity.INVALIDATE_NAME_PATH : entity.getNamePath();
      if (!nameList && ((_entity$isListField = entity.isListField) === null || _entity$isListField === void 0 ? void 0 : _entity$isListField.call(entity))) {
        return;
      }
      if (!filterFunc) {
        filteredNameList.push(namePath);
      } else {
        var meta = "getMeta" in entity ? entity.getMeta() : null;
        if (filterFunc(meta)) {
          filteredNameList.push(namePath);
        }
      }
    });
    return cloneByNamePathList(_this.store, filteredNameList.map(getNamePath));
  };
  this.getFieldValue = function(name) {
    _this.warningUnhooked();
    var namePath = getNamePath(name);
    return get(_this.store, namePath);
  };
  this.getFieldsError = function(nameList) {
    _this.warningUnhooked();
    var fieldEntities = _this.getFieldEntitiesForNamePathList(nameList);
    return fieldEntities.map(function(entity, index) {
      if (entity && !("INVALIDATE_NAME_PATH" in entity)) {
        return {
          name: entity.getNamePath(),
          errors: entity.getErrors(),
          warnings: entity.getWarnings()
        };
      }
      return {
        name: getNamePath(nameList[index]),
        errors: [],
        warnings: []
      };
    });
  };
  this.getFieldError = function(name) {
    _this.warningUnhooked();
    var namePath = getNamePath(name);
    var fieldError = _this.getFieldsError([namePath])[0];
    return fieldError.errors;
  };
  this.getFieldWarning = function(name) {
    _this.warningUnhooked();
    var namePath = getNamePath(name);
    var fieldError = _this.getFieldsError([namePath])[0];
    return fieldError.warnings;
  };
  this.isFieldsTouched = function() {
    _this.warningUnhooked();
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    var arg0 = args[0], arg1 = args[1];
    var namePathList;
    var isAllFieldsTouched = false;
    if (args.length === 0) {
      namePathList = null;
    } else if (args.length === 1) {
      if (Array.isArray(arg0)) {
        namePathList = arg0.map(getNamePath);
        isAllFieldsTouched = false;
      } else {
        namePathList = null;
        isAllFieldsTouched = arg0;
      }
    } else {
      namePathList = arg0.map(getNamePath);
      isAllFieldsTouched = arg1;
    }
    var fieldEntities = _this.getFieldEntities(true);
    var isFieldTouched = function isFieldTouched2(field) {
      return field.isFieldTouched();
    };
    if (!namePathList) {
      return isAllFieldsTouched ? fieldEntities.every(isFieldTouched) : fieldEntities.some(isFieldTouched);
    }
    var map = new NameMap();
    namePathList.forEach(function(shortNamePath) {
      map.set(shortNamePath, []);
    });
    fieldEntities.forEach(function(field) {
      var fieldNamePath = field.getNamePath();
      namePathList.forEach(function(shortNamePath) {
        if (shortNamePath.every(function(nameUnit, i) {
          return fieldNamePath[i] === nameUnit;
        })) {
          map.update(shortNamePath, function(list) {
            return [].concat(_toConsumableArray(list), [field]);
          });
        }
      });
    });
    var isNamePathListTouched = function isNamePathListTouched2(entities) {
      return entities.some(isFieldTouched);
    };
    var namePathListEntities = map.map(function(_ref2) {
      var value = _ref2.value;
      return value;
    });
    return isAllFieldsTouched ? namePathListEntities.every(isNamePathListTouched) : namePathListEntities.some(isNamePathListTouched);
  };
  this.isFieldTouched = function(name) {
    _this.warningUnhooked();
    return _this.isFieldsTouched([name]);
  };
  this.isFieldsValidating = function(nameList) {
    _this.warningUnhooked();
    var fieldEntities = _this.getFieldEntities();
    if (!nameList) {
      return fieldEntities.some(function(testField) {
        return testField.isFieldValidating();
      });
    }
    var namePathList = nameList.map(getNamePath);
    return fieldEntities.some(function(testField) {
      var fieldNamePath = testField.getNamePath();
      return containsNamePath(namePathList, fieldNamePath) && testField.isFieldValidating();
    });
  };
  this.isFieldValidating = function(name) {
    _this.warningUnhooked();
    return _this.isFieldsValidating([name]);
  };
  this.resetWithFieldInitialValue = function() {
    var info = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
    var cache = new NameMap();
    var fieldEntities = _this.getFieldEntities(true);
    fieldEntities.forEach(function(field) {
      var initialValue = field.props.initialValue;
      var namePath = field.getNamePath();
      if (initialValue !== void 0) {
        var records = cache.get(namePath) || /* @__PURE__ */ new Set();
        records.add({
          entity: field,
          value: initialValue
        });
        cache.set(namePath, records);
      }
    });
    var resetWithFields = function resetWithFields2(entities) {
      entities.forEach(function(field) {
        var initialValue = field.props.initialValue;
        if (initialValue !== void 0) {
          var namePath = field.getNamePath();
          var formInitialValue = _this.getInitialValue(namePath);
          if (formInitialValue !== void 0) {
            warningOnce(false, "Form already set 'initialValues' with path '".concat(namePath.join("."), "'. Field can not overwrite it."));
          } else {
            var records = cache.get(namePath);
            if (records && records.size > 1) {
              warningOnce(false, "Multiple Field with path '".concat(namePath.join("."), "' set 'initialValue'. Can not decide which one to pick."));
            } else if (records) {
              var originValue = _this.getFieldValue(namePath);
              if (!info.skipExist || originValue === void 0) {
                _this.updateStore(set(_this.store, namePath, _toConsumableArray(records)[0].value));
              }
            }
          }
        }
      });
    };
    var requiredFieldEntities;
    if (info.entities) {
      requiredFieldEntities = info.entities;
    } else if (info.namePathList) {
      requiredFieldEntities = [];
      info.namePathList.forEach(function(namePath) {
        var records = cache.get(namePath);
        if (records) {
          var _requiredFieldEntitie;
          (_requiredFieldEntitie = requiredFieldEntities).push.apply(_requiredFieldEntitie, _toConsumableArray(_toConsumableArray(records).map(function(r) {
            return r.entity;
          })));
        }
      });
    } else {
      requiredFieldEntities = fieldEntities;
    }
    resetWithFields(requiredFieldEntities);
  };
  this.resetFields = function(nameList) {
    _this.warningUnhooked();
    var prevStore = _this.store;
    if (!nameList) {
      _this.updateStore(merge(_this.initialValues));
      _this.resetWithFieldInitialValue();
      _this.notifyObservers(prevStore, null, {
        type: "reset"
      });
      _this.notifyWatch();
      return;
    }
    var namePathList = nameList.map(getNamePath);
    namePathList.forEach(function(namePath) {
      var initialValue = _this.getInitialValue(namePath);
      _this.updateStore(set(_this.store, namePath, initialValue));
    });
    _this.resetWithFieldInitialValue({
      namePathList
    });
    _this.notifyObservers(prevStore, namePathList, {
      type: "reset"
    });
    _this.notifyWatch(namePathList);
  };
  this.setFields = function(fields) {
    _this.warningUnhooked();
    var prevStore = _this.store;
    var namePathList = [];
    fields.forEach(function(fieldData) {
      var name = fieldData.name, data = _objectWithoutProperties(fieldData, _excluded$2);
      var namePath = getNamePath(name);
      namePathList.push(namePath);
      if ("value" in data) {
        _this.updateStore(set(_this.store, namePath, data.value));
      }
      _this.notifyObservers(prevStore, [namePath], {
        type: "setField",
        data: fieldData
      });
    });
    _this.notifyWatch(namePathList);
  };
  this.getFields = function() {
    var entities = _this.getFieldEntities(true);
    var fields = entities.map(function(field) {
      var namePath = field.getNamePath();
      var meta = field.getMeta();
      var fieldData = _objectSpread2(_objectSpread2({}, meta), {}, {
        name: namePath,
        value: _this.getFieldValue(namePath)
      });
      Object.defineProperty(fieldData, "originRCField", {
        value: true
      });
      return fieldData;
    });
    return fields;
  };
  this.initEntityValue = function(entity) {
    var initialValue = entity.props.initialValue;
    if (initialValue !== void 0) {
      var namePath = entity.getNamePath();
      var prevValue = get(_this.store, namePath);
      if (prevValue === void 0) {
        _this.updateStore(set(_this.store, namePath, initialValue));
      }
    }
  };
  this.isMergedPreserve = function(fieldPreserve) {
    var mergedPreserve = fieldPreserve !== void 0 ? fieldPreserve : _this.preserve;
    return mergedPreserve !== null && mergedPreserve !== void 0 ? mergedPreserve : true;
  };
  this.registerField = function(entity) {
    _this.fieldEntities.push(entity);
    var namePath = entity.getNamePath();
    _this.notifyWatch([namePath]);
    if (entity.props.initialValue !== void 0) {
      var prevStore = _this.store;
      _this.resetWithFieldInitialValue({
        entities: [entity],
        skipExist: true
      });
      _this.notifyObservers(prevStore, [entity.getNamePath()], {
        type: "valueUpdate",
        source: "internal"
      });
    }
    return function(isListField, preserve) {
      var subNamePath = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : [];
      _this.fieldEntities = _this.fieldEntities.filter(function(item) {
        return item !== entity;
      });
      if (!_this.isMergedPreserve(preserve) && (!isListField || subNamePath.length > 1)) {
        var defaultValue = isListField ? void 0 : _this.getInitialValue(namePath);
        if (namePath.length && _this.getFieldValue(namePath) !== defaultValue && _this.fieldEntities.every(function(field) {
          return (
            // Only reset when no namePath exist
            !matchNamePath(field.getNamePath(), namePath)
          );
        })) {
          var _prevStore = _this.store;
          _this.updateStore(set(_prevStore, namePath, defaultValue, true));
          _this.notifyObservers(_prevStore, [namePath], {
            type: "remove"
          });
          _this.triggerDependenciesUpdate(_prevStore, namePath);
        }
      }
      _this.notifyWatch([namePath]);
    };
  };
  this.dispatch = function(action) {
    switch (action.type) {
      case "updateValue": {
        var namePath = action.namePath, value = action.value;
        _this.updateValue(namePath, value);
        break;
      }
      case "validateField": {
        var _namePath = action.namePath, triggerName = action.triggerName;
        _this.validateFields([_namePath], {
          triggerName
        });
        break;
      }
    }
  };
  this.notifyObservers = function(prevStore, namePathList, info) {
    if (_this.subscribable) {
      var mergedInfo = _objectSpread2(_objectSpread2({}, info), {}, {
        store: _this.getFieldsValue(true)
      });
      _this.getFieldEntities().forEach(function(_ref3) {
        var onStoreChange = _ref3.onStoreChange;
        onStoreChange(prevStore, namePathList, mergedInfo);
      });
    } else {
      _this.forceRootUpdate();
    }
  };
  this.triggerDependenciesUpdate = function(prevStore, namePath) {
    var childrenFields = _this.getDependencyChildrenFields(namePath);
    if (childrenFields.length) {
      _this.validateFields(childrenFields);
    }
    _this.notifyObservers(prevStore, childrenFields, {
      type: "dependenciesUpdate",
      relatedFields: [namePath].concat(_toConsumableArray(childrenFields))
    });
    return childrenFields;
  };
  this.updateValue = function(name, value) {
    var namePath = getNamePath(name);
    var prevStore = _this.store;
    _this.updateStore(set(_this.store, namePath, value));
    _this.notifyObservers(prevStore, [namePath], {
      type: "valueUpdate",
      source: "internal"
    });
    _this.notifyWatch([namePath]);
    var childrenFields = _this.triggerDependenciesUpdate(prevStore, namePath);
    var onValuesChange = _this.callbacks.onValuesChange;
    if (onValuesChange) {
      var changedValues = cloneByNamePathList(_this.store, [namePath]);
      onValuesChange(changedValues, _this.getFieldsValue());
    }
    _this.triggerOnFieldsChange([namePath].concat(_toConsumableArray(childrenFields)));
  };
  this.setFieldsValue = function(store) {
    _this.warningUnhooked();
    var prevStore = _this.store;
    if (store) {
      var nextStore = merge(_this.store, store);
      _this.updateStore(nextStore);
    }
    _this.notifyObservers(prevStore, null, {
      type: "valueUpdate",
      source: "external"
    });
    _this.notifyWatch();
  };
  this.setFieldValue = function(name, value) {
    _this.setFields([{
      name,
      value
    }]);
  };
  this.getDependencyChildrenFields = function(rootNamePath) {
    var children = /* @__PURE__ */ new Set();
    var childrenFields = [];
    var dependencies2fields = new NameMap();
    _this.getFieldEntities().forEach(function(field) {
      var dependencies = field.props.dependencies;
      (dependencies || []).forEach(function(dependency) {
        var dependencyNamePath = getNamePath(dependency);
        dependencies2fields.update(dependencyNamePath, function() {
          var fields = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : /* @__PURE__ */ new Set();
          fields.add(field);
          return fields;
        });
      });
    });
    var fillChildren = function fillChildren2(namePath) {
      var fields = dependencies2fields.get(namePath) || /* @__PURE__ */ new Set();
      fields.forEach(function(field) {
        if (!children.has(field)) {
          children.add(field);
          var fieldNamePath = field.getNamePath();
          if (field.isFieldDirty() && fieldNamePath.length) {
            childrenFields.push(fieldNamePath);
            fillChildren2(fieldNamePath);
          }
        }
      });
    };
    fillChildren(rootNamePath);
    return childrenFields;
  };
  this.triggerOnFieldsChange = function(namePathList, filedErrors) {
    var onFieldsChange = _this.callbacks.onFieldsChange;
    if (onFieldsChange) {
      var fields = _this.getFields();
      if (filedErrors) {
        var cache = new NameMap();
        filedErrors.forEach(function(_ref4) {
          var name = _ref4.name, errors = _ref4.errors;
          cache.set(name, errors);
        });
        fields.forEach(function(field) {
          field.errors = cache.get(field.name) || field.errors;
        });
      }
      var changedFields = fields.filter(function(_ref5) {
        var fieldName = _ref5.name;
        return containsNamePath(namePathList, fieldName);
      });
      if (changedFields.length) {
        onFieldsChange(changedFields, fields);
      }
    }
  };
  this.validateFields = function(arg1, arg2) {
    _this.warningUnhooked();
    var nameList;
    var options;
    if (Array.isArray(arg1) || typeof arg1 === "string" || typeof arg2 === "string") {
      nameList = arg1;
      options = arg2;
    } else {
      options = arg1;
    }
    var provideNameList = !!nameList;
    var namePathList = provideNameList ? nameList.map(getNamePath) : [];
    var promiseList = [];
    var TMP_SPLIT = String(Date.now());
    var validateNamePathList = /* @__PURE__ */ new Set();
    _this.getFieldEntities(true).forEach(function(field) {
      var _options;
      if (!provideNameList) {
        namePathList.push(field.getNamePath());
      }
      if (((_options = options) === null || _options === void 0 ? void 0 : _options.recursive) && provideNameList) {
        var namePath = field.getNamePath();
        if (
          // nameList[i] === undefined 说明是以 nameList 开头的
          // ['name'] -> ['name','list']
          namePath.every(function(nameUnit, i) {
            return nameList[i] === nameUnit || nameList[i] === void 0;
          })
        ) {
          namePathList.push(namePath);
        }
      }
      if (!field.props.rules || !field.props.rules.length) {
        return;
      }
      var fieldNamePath = field.getNamePath();
      validateNamePathList.add(fieldNamePath.join(TMP_SPLIT));
      if (!provideNameList || containsNamePath(namePathList, fieldNamePath)) {
        var promise = field.validateRules(_objectSpread2({
          validateMessages: _objectSpread2(_objectSpread2({}, defaultValidateMessages), _this.validateMessages)
        }, options));
        promiseList.push(promise.then(function() {
          return {
            name: fieldNamePath,
            errors: [],
            warnings: []
          };
        }).catch(function(ruleErrors) {
          var _ruleErrors$forEach;
          var mergedErrors = [];
          var mergedWarnings = [];
          (_ruleErrors$forEach = ruleErrors.forEach) === null || _ruleErrors$forEach === void 0 ? void 0 : _ruleErrors$forEach.call(ruleErrors, function(_ref6) {
            var warningOnly = _ref6.rule.warningOnly, errors = _ref6.errors;
            if (warningOnly) {
              mergedWarnings.push.apply(mergedWarnings, _toConsumableArray(errors));
            } else {
              mergedErrors.push.apply(mergedErrors, _toConsumableArray(errors));
            }
          });
          if (mergedErrors.length) {
            return Promise.reject({
              name: fieldNamePath,
              errors: mergedErrors,
              warnings: mergedWarnings
            });
          }
          return {
            name: fieldNamePath,
            errors: mergedErrors,
            warnings: mergedWarnings
          };
        }));
      }
    });
    var summaryPromise = allPromiseFinish(promiseList);
    _this.lastValidatePromise = summaryPromise;
    summaryPromise.catch(function(results) {
      return results;
    }).then(function(results) {
      var resultNamePathList = results.map(function(_ref7) {
        var name = _ref7.name;
        return name;
      });
      _this.notifyObservers(_this.store, resultNamePathList, {
        type: "validateFinish"
      });
      _this.triggerOnFieldsChange(resultNamePathList, results);
    });
    var returnPromise = summaryPromise.then(function() {
      if (_this.lastValidatePromise === summaryPromise) {
        return Promise.resolve(_this.getFieldsValue(namePathList));
      }
      return Promise.reject([]);
    }).catch(function(results) {
      var errorList = results.filter(function(result) {
        return result && result.errors.length;
      });
      return Promise.reject({
        values: _this.getFieldsValue(namePathList),
        errorFields: errorList,
        outOfDate: _this.lastValidatePromise !== summaryPromise
      });
    });
    returnPromise.catch(function(e) {
      return e;
    });
    var triggerNamePathList = namePathList.filter(function(namePath) {
      return validateNamePathList.has(namePath.join(TMP_SPLIT));
    });
    _this.triggerOnFieldsChange(triggerNamePathList);
    return returnPromise;
  };
  this.submit = function() {
    _this.warningUnhooked();
    _this.validateFields().then(function(values) {
      var onFinish = _this.callbacks.onFinish;
      if (onFinish) {
        try {
          onFinish(values);
        } catch (err) {
          console.error(err);
        }
      }
    }).catch(function(e) {
      var onFinishFailed = _this.callbacks.onFinishFailed;
      if (onFinishFailed) {
        onFinishFailed(e);
      }
    });
  };
  this.forceRootUpdate = forceRootUpdate;
});
function useForm(form) {
  var formRef = reactExports.useRef();
  var _React$useState = reactExports.useState({}), _React$useState2 = _slicedToArray(_React$useState, 2), forceUpdate = _React$useState2[1];
  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      var forceReRender = function forceReRender2() {
        forceUpdate({});
      };
      var formStore = new FormStore(forceReRender);
      formRef.current = formStore.getForm();
    }
  }
  return [formRef.current];
}
var FormContext = /* @__PURE__ */ reactExports.createContext({
  triggerFormChange: function triggerFormChange() {
  },
  triggerFormFinish: function triggerFormFinish() {
  },
  registerForm: function registerForm() {
  },
  unregisterForm: function unregisterForm() {
  }
});
var FormProvider = function FormProvider2(_ref) {
  var validateMessages = _ref.validateMessages, onFormChange = _ref.onFormChange, onFormFinish = _ref.onFormFinish, children = _ref.children;
  var formContext = reactExports.useContext(FormContext);
  var formsRef = reactExports.useRef({});
  return /* @__PURE__ */ reactExports.createElement(FormContext.Provider, {
    value: _objectSpread2(_objectSpread2({}, formContext), {}, {
      validateMessages: _objectSpread2(_objectSpread2({}, formContext.validateMessages), validateMessages),
      // =========================================================
      // =                  Global Form Control                  =
      // =========================================================
      triggerFormChange: function triggerFormChange2(name, changedFields) {
        if (onFormChange) {
          onFormChange(name, {
            changedFields,
            forms: formsRef.current
          });
        }
        formContext.triggerFormChange(name, changedFields);
      },
      triggerFormFinish: function triggerFormFinish2(name, values) {
        if (onFormFinish) {
          onFormFinish(name, {
            values,
            forms: formsRef.current
          });
        }
        formContext.triggerFormFinish(name, values);
      },
      registerForm: function registerForm2(name, form) {
        if (name) {
          formsRef.current = _objectSpread2(_objectSpread2({}, formsRef.current), {}, _defineProperty({}, name, form));
        }
        formContext.registerForm(name, form);
      },
      unregisterForm: function unregisterForm2(name) {
        var newForms = _objectSpread2({}, formsRef.current);
        delete newForms[name];
        formsRef.current = newForms;
        formContext.unregisterForm(name);
      }
    })
  }, children);
};
var _excluded$1 = ["name", "initialValues", "fields", "form", "preserve", "children", "component", "validateMessages", "validateTrigger", "onValuesChange", "onFieldsChange", "onFinish", "onFinishFailed"];
var Form = function Form2(_ref, ref) {
  var name = _ref.name, initialValues = _ref.initialValues, fields = _ref.fields, form = _ref.form, preserve = _ref.preserve, children = _ref.children, _ref$component = _ref.component, Component = _ref$component === void 0 ? "form" : _ref$component, validateMessages = _ref.validateMessages, _ref$validateTrigger = _ref.validateTrigger, validateTrigger = _ref$validateTrigger === void 0 ? "onChange" : _ref$validateTrigger, onValuesChange = _ref.onValuesChange, _onFieldsChange = _ref.onFieldsChange, _onFinish = _ref.onFinish, onFinishFailed = _ref.onFinishFailed, restProps = _objectWithoutProperties(_ref, _excluded$1);
  var formContext = reactExports.useContext(FormContext);
  var _useForm = useForm(form), _useForm2 = _slicedToArray(_useForm, 1), formInstance = _useForm2[0];
  var _formInstance$getInte = formInstance.getInternalHooks(HOOK_MARK), useSubscribe = _formInstance$getInte.useSubscribe, setInitialValues = _formInstance$getInte.setInitialValues, setCallbacks = _formInstance$getInte.setCallbacks, setValidateMessages = _formInstance$getInte.setValidateMessages, setPreserve = _formInstance$getInte.setPreserve, destroyForm = _formInstance$getInte.destroyForm;
  reactExports.useImperativeHandle(ref, function() {
    return formInstance;
  });
  reactExports.useEffect(function() {
    formContext.registerForm(name, formInstance);
    return function() {
      formContext.unregisterForm(name);
    };
  }, [formContext, formInstance, name]);
  setValidateMessages(_objectSpread2(_objectSpread2({}, formContext.validateMessages), validateMessages));
  setCallbacks({
    onValuesChange,
    onFieldsChange: function onFieldsChange(changedFields) {
      formContext.triggerFormChange(name, changedFields);
      if (_onFieldsChange) {
        for (var _len = arguments.length, rest = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
          rest[_key - 1] = arguments[_key];
        }
        _onFieldsChange.apply(void 0, [changedFields].concat(rest));
      }
    },
    onFinish: function onFinish(values2) {
      formContext.triggerFormFinish(name, values2);
      if (_onFinish) {
        _onFinish(values2);
      }
    },
    onFinishFailed
  });
  setPreserve(preserve);
  var mountRef = reactExports.useRef(null);
  setInitialValues(initialValues, !mountRef.current);
  if (!mountRef.current) {
    mountRef.current = true;
  }
  reactExports.useEffect(
    function() {
      return destroyForm;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );
  var childrenNode;
  var childrenRenderProps = typeof children === "function";
  if (childrenRenderProps) {
    var values = formInstance.getFieldsValue(true);
    childrenNode = children(values, formInstance);
  } else {
    childrenNode = children;
  }
  useSubscribe(!childrenRenderProps);
  var prevFieldsRef = reactExports.useRef();
  reactExports.useEffect(function() {
    if (!isSimilar(prevFieldsRef.current || [], fields || [])) {
      formInstance.setFields(fields || []);
    }
    prevFieldsRef.current = fields;
  }, [fields, formInstance]);
  var formContextValue = reactExports.useMemo(function() {
    return _objectSpread2(_objectSpread2({}, formInstance), {}, {
      validateTrigger
    });
  }, [formInstance, validateTrigger]);
  var wrapperNode = /* @__PURE__ */ reactExports.createElement(ListContext.Provider, {
    value: null
  }, /* @__PURE__ */ reactExports.createElement(Context.Provider, {
    value: formContextValue
  }, childrenNode));
  if (Component === false) {
    return wrapperNode;
  }
  return /* @__PURE__ */ reactExports.createElement(Component, _extends$1({}, restProps, {
    onSubmit: function onSubmit(event) {
      event.preventDefault();
      event.stopPropagation();
      formInstance.submit();
    },
    onReset: function onReset(event) {
      var _restProps$onReset;
      event.preventDefault();
      formInstance.resetFields();
      (_restProps$onReset = restProps.onReset) === null || _restProps$onReset === void 0 ? void 0 : _restProps$onReset.call(restProps, event);
    }
  }), wrapperNode);
};
function stringify(value) {
  try {
    return JSON.stringify(value);
  } catch (err) {
    return Math.random();
  }
}
function useWatch() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }
  var _args$ = args[0], dependencies = _args$ === void 0 ? [] : _args$, _args$2 = args[1], _form = _args$2 === void 0 ? {} : _args$2;
  var options = isFormInstance(_form) ? {
    form: _form
  } : _form;
  var form = options.form;
  var _useState = reactExports.useState(), _useState2 = _slicedToArray(_useState, 2), value = _useState2[0], setValue = _useState2[1];
  var valueStr = reactExports.useMemo(function() {
    return stringify(value);
  }, [value]);
  var valueStrRef = reactExports.useRef(valueStr);
  valueStrRef.current = valueStr;
  var fieldContext = reactExports.useContext(Context);
  var formInstance = form || fieldContext;
  var isValidForm = formInstance && formInstance._init;
  var namePath = getNamePath(dependencies);
  var namePathRef = reactExports.useRef(namePath);
  namePathRef.current = namePath;
  reactExports.useEffect(
    function() {
      if (!isValidForm) {
        return;
      }
      var getFieldsValue = formInstance.getFieldsValue, getInternalHooks2 = formInstance.getInternalHooks;
      var _getInternalHooks = getInternalHooks2(HOOK_MARK), registerWatch = _getInternalHooks.registerWatch;
      var cancelRegister = registerWatch(function(values, allValues) {
        var newValue = get(options.preserve ? allValues : values, namePathRef.current);
        var nextValueStr = stringify(newValue);
        if (valueStrRef.current !== nextValueStr) {
          valueStrRef.current = nextValueStr;
          setValue(newValue);
        }
      });
      var initialValue = get(options.preserve ? getFieldsValue(true) : getFieldsValue(), namePathRef.current);
      setValue(initialValue);
      return cancelRegister;
    },
    // We do not need re-register since namePath content is the same
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isValidForm]
  );
  return value;
}
var InternalForm = /* @__PURE__ */ reactExports.forwardRef(Form);
var RefForm = InternalForm;
RefForm.FormProvider = FormProvider;
RefForm.Field = WrapperField;
RefForm.List = List;
RefForm.useForm = useForm;
RefForm.useWatch = useWatch;
const FormItemInputContext = /* @__PURE__ */ reactExports.createContext({});
const responsiveArray = ["xxl", "xl", "lg", "md", "sm", "xs"];
const getResponsiveMap = (token) => ({
  xs: `(max-width: ${token.screenXSMax}px)`,
  sm: `(min-width: ${token.screenSM}px)`,
  md: `(min-width: ${token.screenMD}px)`,
  lg: `(min-width: ${token.screenLG}px)`,
  xl: `(min-width: ${token.screenXL}px)`,
  xxl: `(min-width: ${token.screenXXL}px)`
});
const validateBreakpoints = (token) => {
  const indexableToken = token;
  const revBreakpoints = [].concat(responsiveArray).reverse();
  revBreakpoints.forEach((breakpoint, i) => {
    const breakpointUpper = breakpoint.toUpperCase();
    const screenMin = `screen${breakpointUpper}Min`;
    const screen = `screen${breakpointUpper}`;
    if (!(indexableToken[screenMin] <= indexableToken[screen])) {
      throw new Error(`${screenMin}<=${screen} fails : !(${indexableToken[screenMin]}<=${indexableToken[screen]})`);
    }
    if (i < revBreakpoints.length - 1) {
      const screenMax = `screen${breakpointUpper}Max`;
      if (!(indexableToken[screen] <= indexableToken[screenMax])) {
        throw new Error(`${screen}<=${screenMax} fails : !(${indexableToken[screen]}<=${indexableToken[screenMax]})`);
      }
      const nextBreakpointUpperMin = revBreakpoints[i + 1].toUpperCase();
      const nextScreenMin = `screen${nextBreakpointUpperMin}Min`;
      if (!(indexableToken[screenMax] <= indexableToken[nextScreenMin])) {
        throw new Error(`${screenMax}<=${nextScreenMin} fails : !(${indexableToken[screenMax]}<=${indexableToken[nextScreenMin]})`);
      }
    }
  });
  return token;
};
function useResponsiveObserver() {
  const [, token] = useToken();
  const responsiveMap = getResponsiveMap(validateBreakpoints(token));
  return React.useMemo(() => {
    const subscribers = /* @__PURE__ */ new Map();
    let subUid = -1;
    let screens = {};
    return {
      matchHandlers: {},
      dispatch(pointMap) {
        screens = pointMap;
        subscribers.forEach((func) => func(screens));
        return subscribers.size >= 1;
      },
      subscribe(func) {
        if (!subscribers.size)
          this.register();
        subUid += 1;
        subscribers.set(subUid, func);
        func(screens);
        return subUid;
      },
      unsubscribe(paramToken) {
        subscribers.delete(paramToken);
        if (!subscribers.size)
          this.unregister();
      },
      unregister() {
        Object.keys(responsiveMap).forEach((screen) => {
          const matchMediaQuery = responsiveMap[screen];
          const handler = this.matchHandlers[matchMediaQuery];
          handler === null || handler === void 0 ? void 0 : handler.mql.removeListener(handler === null || handler === void 0 ? void 0 : handler.listener);
        });
        subscribers.clear();
      },
      register() {
        Object.keys(responsiveMap).forEach((screen) => {
          const matchMediaQuery = responsiveMap[screen];
          const listener = (_ref) => {
            let {
              matches
            } = _ref;
            this.dispatch(Object.assign(Object.assign({}, screens), {
              [screen]: matches
            }));
          };
          const mql = window.matchMedia(matchMediaQuery);
          mql.addListener(listener);
          this.matchHandlers[matchMediaQuery] = {
            mql,
            listener
          };
          listener(mql);
        });
      },
      responsiveMap
    };
  }, [token]);
}
const RadioGroupContext = /* @__PURE__ */ reactExports.createContext(null);
const RadioGroupContextProvider = RadioGroupContext.Provider;
const RadioOptionTypeContext = /* @__PURE__ */ reactExports.createContext(null);
const RadioOptionTypeContextProvider = RadioOptionTypeContext.Provider;
var _excluded = ["prefixCls", "className", "style", "checked", "disabled", "defaultChecked", "type", "title", "onChange"];
var Checkbox = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _classNames;
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-checkbox" : _props$prefixCls, className = props.className, style = props.style, checked = props.checked, disabled = props.disabled, _props$defaultChecked = props.defaultChecked, defaultChecked = _props$defaultChecked === void 0 ? false : _props$defaultChecked, _props$type = props.type, type4 = _props$type === void 0 ? "checkbox" : _props$type, title = props.title, onChange = props.onChange, inputProps = _objectWithoutProperties(props, _excluded);
  var inputRef = reactExports.useRef(null);
  var _useMergedState = useMergedState(defaultChecked, {
    value: checked
  }), _useMergedState2 = _slicedToArray(_useMergedState, 2), rawValue = _useMergedState2[0], setRawValue = _useMergedState2[1];
  reactExports.useImperativeHandle(ref, function() {
    return {
      focus: function focus() {
        var _inputRef$current;
        (_inputRef$current = inputRef.current) === null || _inputRef$current === void 0 ? void 0 : _inputRef$current.focus();
      },
      blur: function blur() {
        var _inputRef$current2;
        (_inputRef$current2 = inputRef.current) === null || _inputRef$current2 === void 0 ? void 0 : _inputRef$current2.blur();
      },
      input: inputRef.current
    };
  });
  var classString = classNames(prefixCls, className, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-checked"), rawValue), _defineProperty(_classNames, "".concat(prefixCls, "-disabled"), disabled), _classNames));
  var handleChange = function handleChange2(e) {
    if (disabled) {
      return;
    }
    if (!("checked" in props)) {
      setRawValue(e.target.checked);
    }
    onChange === null || onChange === void 0 ? void 0 : onChange({
      target: _objectSpread2(_objectSpread2({}, props), {}, {
        type: type4,
        checked: e.target.checked
      }),
      stopPropagation: function stopPropagation() {
        e.stopPropagation();
      },
      preventDefault: function preventDefault() {
        e.preventDefault();
      },
      nativeEvent: e.nativeEvent
    });
  };
  return /* @__PURE__ */ reactExports.createElement("span", {
    className: classString,
    title,
    style
  }, /* @__PURE__ */ reactExports.createElement("input", _extends$1({}, inputProps, {
    className: "".concat(prefixCls, "-input"),
    ref: inputRef,
    onChange: handleChange,
    disabled,
    checked: !!rawValue,
    type: type4
  })), /* @__PURE__ */ reactExports.createElement("span", {
    className: "".concat(prefixCls, "-inner")
  }));
});
const antRadioEffect = new Keyframe("antRadioEffect", {
  "0%": {
    transform: "scale(1)",
    opacity: 0.5
  },
  "100%": {
    transform: "scale(1.6)",
    opacity: 0
  }
});
const getGroupRadioStyle = (token) => {
  const {
    componentCls,
    antCls
  } = token;
  const groupPrefixCls = `${componentCls}-group`;
  return {
    [groupPrefixCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      display: "inline-block",
      fontSize: 0,
      // RTL
      [`&${groupPrefixCls}-rtl`]: {
        direction: "rtl"
      },
      [`${antCls}-badge ${antCls}-badge-count`]: {
        zIndex: 1
      },
      [`> ${antCls}-badge:not(:first-child) > ${antCls}-button-wrapper`]: {
        borderInlineStart: "none"
      }
    })
  };
};
const getRadioBasicStyle = (token) => {
  const {
    componentCls,
    wrapperMarginInlineEnd,
    colorPrimary,
    radioSize,
    motionDurationSlow,
    motionDurationMid,
    motionEaseInOut,
    motionEaseInOutCirc,
    colorBgContainer,
    colorBorder,
    lineWidth,
    dotSize,
    colorBgContainerDisabled,
    colorTextDisabled,
    paddingXS,
    dotColorDisabled,
    lineType,
    radioDotDisabledSize,
    wireframe,
    colorWhite
  } = token;
  const radioInnerPrefixCls = `${componentCls}-inner`;
  return {
    [`${componentCls}-wrapper`]: Object.assign(Object.assign({}, resetComponent(token)), {
      position: "relative",
      display: "inline-flex",
      alignItems: "baseline",
      marginInlineStart: 0,
      marginInlineEnd: wrapperMarginInlineEnd,
      cursor: "pointer",
      // RTL
      [`&${componentCls}-wrapper-rtl`]: {
        direction: "rtl"
      },
      "&-disabled": {
        cursor: "not-allowed",
        color: token.colorTextDisabled
      },
      "&::after": {
        display: "inline-block",
        width: 0,
        overflow: "hidden",
        content: '"\\a0"'
      },
      // hashId 在 wrapper 上，只能铺平
      [`${componentCls}-checked::after`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        width: "100%",
        height: "100%",
        border: `${lineWidth}px ${lineType} ${colorPrimary}`,
        borderRadius: "50%",
        visibility: "hidden",
        animationName: antRadioEffect,
        animationDuration: motionDurationSlow,
        animationTimingFunction: motionEaseInOut,
        animationFillMode: "both",
        content: '""'
      },
      [componentCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "relative",
        display: "inline-block",
        outline: "none",
        cursor: "pointer",
        alignSelf: "center"
      }),
      [`${componentCls}-wrapper:hover &,
        &:hover ${radioInnerPrefixCls}`]: {
        borderColor: colorPrimary
      },
      [`${componentCls}-input:focus-visible + ${radioInnerPrefixCls}`]: Object.assign({}, genFocusOutline(token)),
      [`${componentCls}:hover::after, ${componentCls}-wrapper:hover &::after`]: {
        visibility: "visible"
      },
      [`${componentCls}-inner`]: {
        "&::after": {
          boxSizing: "border-box",
          position: "absolute",
          insetBlockStart: "50%",
          insetInlineStart: "50%",
          display: "block",
          width: radioSize,
          height: radioSize,
          marginBlockStart: radioSize / -2,
          marginInlineStart: radioSize / -2,
          backgroundColor: wireframe ? colorPrimary : colorWhite,
          borderBlockStart: 0,
          borderInlineStart: 0,
          borderRadius: radioSize,
          transform: "scale(0)",
          opacity: 0,
          transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`,
          content: '""'
        },
        boxSizing: "border-box",
        position: "relative",
        insetBlockStart: 0,
        insetInlineStart: 0,
        display: "block",
        width: radioSize,
        height: radioSize,
        backgroundColor: colorBgContainer,
        borderColor: colorBorder,
        borderStyle: "solid",
        borderWidth: lineWidth,
        borderRadius: "50%",
        transition: `all ${motionDurationMid}`
      },
      [`${componentCls}-input`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineEnd: 0,
        insetBlockEnd: 0,
        insetInlineStart: 0,
        zIndex: 1,
        cursor: "pointer",
        opacity: 0
      },
      // 选中状态
      [`${componentCls}-checked`]: {
        [radioInnerPrefixCls]: {
          borderColor: colorPrimary,
          backgroundColor: wireframe ? colorBgContainer : colorPrimary,
          "&::after": {
            transform: `scale(${dotSize / radioSize})`,
            opacity: 1,
            transition: `all ${motionDurationSlow} ${motionEaseInOutCirc}`
          }
        }
      },
      [`${componentCls}-disabled`]: {
        cursor: "not-allowed",
        [radioInnerPrefixCls]: {
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder,
          cursor: "not-allowed",
          "&::after": {
            backgroundColor: dotColorDisabled
          }
        },
        [`${componentCls}-input`]: {
          cursor: "not-allowed"
        },
        [`${componentCls}-disabled + span`]: {
          color: colorTextDisabled,
          cursor: "not-allowed"
        },
        [`&${componentCls}-checked`]: {
          [radioInnerPrefixCls]: {
            "&::after": {
              transform: `scale(${radioDotDisabledSize / radioSize})`
            }
          }
        }
      },
      [`span${componentCls} + *`]: {
        paddingInlineStart: paddingXS,
        paddingInlineEnd: paddingXS
      }
    })
  };
};
const getRadioButtonStyle = (token) => {
  const {
    buttonColor,
    controlHeight,
    componentCls,
    lineWidth,
    lineType,
    colorBorder,
    motionDurationSlow,
    motionDurationMid,
    buttonPaddingInline,
    fontSize,
    buttonBg,
    fontSizeLG,
    controlHeightLG,
    controlHeightSM,
    paddingXS,
    borderRadius,
    borderRadiusSM,
    borderRadiusLG,
    buttonCheckedBg,
    buttonSolidCheckedColor,
    colorTextDisabled,
    colorBgContainerDisabled,
    buttonCheckedBgDisabled,
    buttonCheckedColorDisabled,
    colorPrimary,
    colorPrimaryHover,
    colorPrimaryActive
  } = token;
  return {
    [`${componentCls}-button-wrapper`]: {
      position: "relative",
      display: "inline-block",
      height: controlHeight,
      margin: 0,
      paddingInline: buttonPaddingInline,
      paddingBlock: 0,
      color: buttonColor,
      fontSize,
      lineHeight: `${controlHeight - lineWidth * 2}px`,
      background: buttonBg,
      border: `${lineWidth}px ${lineType} ${colorBorder}`,
      // strange align fix for chrome but works
      // https://gw.alipayobjects.com/zos/rmsportal/VFTfKXJuogBAXcvfAUWJ.gif
      borderBlockStartWidth: lineWidth + 0.02,
      borderInlineStartWidth: 0,
      borderInlineEndWidth: lineWidth,
      cursor: "pointer",
      transition: [`color ${motionDurationMid}`, `background ${motionDurationMid}`, `border-color ${motionDurationMid}`, `box-shadow ${motionDurationMid}`].join(","),
      a: {
        color: buttonColor
      },
      [`> ${componentCls}-button`]: {
        position: "absolute",
        insetBlockStart: 0,
        insetInlineStart: 0,
        zIndex: -1,
        width: "100%",
        height: "100%"
      },
      "&:not(:first-child)": {
        "&::before": {
          position: "absolute",
          insetBlockStart: -lineWidth,
          insetInlineStart: -lineWidth,
          display: "block",
          boxSizing: "content-box",
          width: 1,
          height: "100%",
          paddingBlock: lineWidth,
          paddingInline: 0,
          backgroundColor: colorBorder,
          transition: `background-color ${motionDurationSlow}`,
          content: '""'
        }
      },
      "&:first-child": {
        borderInlineStart: `${lineWidth}px ${lineType} ${colorBorder}`,
        borderStartStartRadius: borderRadius,
        borderEndStartRadius: borderRadius
      },
      "&:last-child": {
        borderStartEndRadius: borderRadius,
        borderEndEndRadius: borderRadius
      },
      "&:first-child:last-child": {
        borderRadius
      },
      [`${componentCls}-group-large &`]: {
        height: controlHeightLG,
        fontSize: fontSizeLG,
        lineHeight: `${controlHeightLG - lineWidth * 2}px`,
        "&:first-child": {
          borderStartStartRadius: borderRadiusLG,
          borderEndStartRadius: borderRadiusLG
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusLG,
          borderEndEndRadius: borderRadiusLG
        }
      },
      [`${componentCls}-group-small &`]: {
        height: controlHeightSM,
        paddingInline: paddingXS - lineWidth,
        paddingBlock: 0,
        lineHeight: `${controlHeightSM - lineWidth * 2}px`,
        "&:first-child": {
          borderStartStartRadius: borderRadiusSM,
          borderEndStartRadius: borderRadiusSM
        },
        "&:last-child": {
          borderStartEndRadius: borderRadiusSM,
          borderEndEndRadius: borderRadiusSM
        }
      },
      "&:hover": {
        position: "relative",
        color: colorPrimary
      },
      "&:has(:focus-visible)": Object.assign({}, genFocusOutline(token)),
      [`${componentCls}-inner, input[type='checkbox'], input[type='radio']`]: {
        width: 0,
        height: 0,
        opacity: 0,
        pointerEvents: "none"
      },
      [`&-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        zIndex: 1,
        color: colorPrimary,
        background: buttonCheckedBg,
        borderColor: colorPrimary,
        "&::before": {
          backgroundColor: colorPrimary
        },
        "&:first-child": {
          borderColor: colorPrimary
        },
        "&:hover": {
          color: colorPrimaryHover,
          borderColor: colorPrimaryHover,
          "&::before": {
            backgroundColor: colorPrimaryHover
          }
        },
        "&:active": {
          color: colorPrimaryActive,
          borderColor: colorPrimaryActive,
          "&::before": {
            backgroundColor: colorPrimaryActive
          }
        }
      },
      [`${componentCls}-group-solid &-checked:not(${componentCls}-button-wrapper-disabled)`]: {
        color: buttonSolidCheckedColor,
        background: colorPrimary,
        borderColor: colorPrimary,
        "&:hover": {
          color: buttonSolidCheckedColor,
          background: colorPrimaryHover,
          borderColor: colorPrimaryHover
        },
        "&:active": {
          color: buttonSolidCheckedColor,
          background: colorPrimaryActive,
          borderColor: colorPrimaryActive
        }
      },
      "&-disabled": {
        color: colorTextDisabled,
        backgroundColor: colorBgContainerDisabled,
        borderColor: colorBorder,
        cursor: "not-allowed",
        "&:first-child, &:hover": {
          color: colorTextDisabled,
          backgroundColor: colorBgContainerDisabled,
          borderColor: colorBorder
        }
      },
      [`&-disabled${componentCls}-button-wrapper-checked`]: {
        color: buttonCheckedColorDisabled,
        backgroundColor: buttonCheckedBgDisabled,
        borderColor: colorBorder,
        boxShadow: "none"
      }
    }
  };
};
const getDotSize = (radioSize) => {
  const dotPadding = 4;
  return radioSize - dotPadding * 2;
};
const useStyle = genComponentStyleHook("Radio", (token) => {
  const {
    controlOutline,
    controlOutlineWidth,
    radioSize
  } = token;
  const radioFocusShadow = `0 0 0 ${controlOutlineWidth}px ${controlOutline}`;
  const radioButtonFocusShadow = radioFocusShadow;
  const radioDotDisabledSize = getDotSize(radioSize);
  const radioToken = merge$1(token, {
    radioDotDisabledSize,
    radioFocusShadow,
    radioButtonFocusShadow
  });
  return [getGroupRadioStyle(radioToken), getRadioBasicStyle(radioToken), getRadioButtonStyle(radioToken)];
}, (token) => {
  const {
    wireframe,
    padding,
    marginXS,
    lineWidth,
    fontSizeLG,
    colorText,
    colorBgContainer,
    colorTextDisabled,
    controlItemBgActiveDisabled,
    colorTextLightSolid
  } = token;
  const dotPadding = 4;
  const radioSize = fontSizeLG;
  const radioDotSize = wireframe ? getDotSize(radioSize) : radioSize - (dotPadding + lineWidth) * 2;
  return {
    // Radio
    radioSize,
    dotSize: radioDotSize,
    dotColorDisabled: colorTextDisabled,
    // Radio buttons
    buttonSolidCheckedColor: colorTextLightSolid,
    buttonBg: colorBgContainer,
    buttonCheckedBg: colorBgContainer,
    buttonColor: colorText,
    buttonCheckedBgDisabled: controlItemBgActiveDisabled,
    buttonCheckedColorDisabled: colorTextDisabled,
    buttonPaddingInline: padding - lineWidth,
    wrapperMarginInlineEnd: marginXS
  };
});
var __rest$2 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const InternalRadio = (props, ref) => {
  var _a, _b;
  const groupContext = reactExports.useContext(RadioGroupContext);
  const radioOptionTypeContext = reactExports.useContext(RadioOptionTypeContext);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const innerRef = reactExports.useRef(null);
  const mergedRef = composeRef(ref, innerRef);
  const {
    isFormItemInput
  } = reactExports.useContext(FormItemInputContext);
  const onChange = (e) => {
    var _a2, _b2;
    (_a2 = props.onChange) === null || _a2 === void 0 ? void 0 : _a2.call(props, e);
    (_b2 = groupContext === null || groupContext === void 0 ? void 0 : groupContext.onChange) === null || _b2 === void 0 ? void 0 : _b2.call(groupContext, e);
  };
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    children,
    style
  } = props, restProps = __rest$2(props, ["prefixCls", "className", "rootClassName", "children", "style"]);
  const radioPrefixCls = getPrefixCls("radio", customizePrefixCls);
  const prefixCls = ((groupContext === null || groupContext === void 0 ? void 0 : groupContext.optionType) || radioOptionTypeContext) === "button" ? `${radioPrefixCls}-button` : radioPrefixCls;
  const [wrapSSR, hashId] = useStyle(radioPrefixCls);
  const radioProps = Object.assign({}, restProps);
  const disabled = reactExports.useContext(DisabledContext);
  if (groupContext) {
    radioProps.name = groupContext.name;
    radioProps.onChange = onChange;
    radioProps.checked = props.value === groupContext.value;
    radioProps.disabled = (_a = radioProps.disabled) !== null && _a !== void 0 ? _a : groupContext.disabled;
  }
  radioProps.disabled = (_b = radioProps.disabled) !== null && _b !== void 0 ? _b : disabled;
  const wrapperClassString = classNames(`${prefixCls}-wrapper`, {
    [`${prefixCls}-wrapper-checked`]: radioProps.checked,
    [`${prefixCls}-wrapper-disabled`]: radioProps.disabled,
    [`${prefixCls}-wrapper-rtl`]: direction === "rtl",
    [`${prefixCls}-wrapper-in-form-item`]: isFormItemInput
  }, className, rootClassName, hashId);
  return wrapSSR(
    // eslint-disable-next-line jsx-a11y/label-has-associated-control
    /* @__PURE__ */ reactExports.createElement("label", {
      className: wrapperClassString,
      style,
      onMouseEnter: props.onMouseEnter,
      onMouseLeave: props.onMouseLeave
    }, /* @__PURE__ */ reactExports.createElement(Checkbox, Object.assign({}, radioProps, {
      type: "radio",
      prefixCls,
      ref: mergedRef
    })), children !== void 0 ? /* @__PURE__ */ reactExports.createElement("span", null, children) : null)
  );
};
const Radio$2 = /* @__PURE__ */ reactExports.forwardRef(InternalRadio);
const InternalRadio$1 = Radio$2;
const RadioGroup = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const [value, setValue] = useMergedState(props.defaultValue, {
    value: props.value
  });
  const onRadioChange = (ev) => {
    const lastValue = value;
    const val = ev.target.value;
    if (!("value" in props)) {
      setValue(val);
    }
    const {
      onChange
    } = props;
    if (onChange && val !== lastValue) {
      onChange(ev);
    }
  };
  const {
    prefixCls: customizePrefixCls,
    className,
    rootClassName,
    options,
    buttonStyle = "outline",
    disabled,
    children,
    size: customizeSize,
    style,
    id,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur
  } = props;
  const prefixCls = getPrefixCls("radio", customizePrefixCls);
  const groupPrefixCls = `${prefixCls}-group`;
  const [wrapSSR, hashId] = useStyle(prefixCls);
  let childrenToRender = children;
  if (options && options.length > 0) {
    childrenToRender = options.map((option) => {
      if (typeof option === "string" || typeof option === "number") {
        return /* @__PURE__ */ reactExports.createElement(InternalRadio$1, {
          key: option.toString(),
          prefixCls,
          disabled,
          value: option,
          checked: value === option
        }, option);
      }
      return /* @__PURE__ */ reactExports.createElement(InternalRadio$1, {
        key: `radio-group-value-options-${option.value}`,
        prefixCls,
        disabled: option.disabled || disabled,
        value: option.value,
        checked: value === option.value,
        title: option.title,
        style: option.style
      }, option.label);
    });
  }
  const mergedSize = useSize(customizeSize);
  const classString = classNames(groupPrefixCls, `${groupPrefixCls}-${buttonStyle}`, {
    [`${groupPrefixCls}-${mergedSize}`]: mergedSize,
    [`${groupPrefixCls}-rtl`]: direction === "rtl"
  }, className, rootClassName, hashId);
  return wrapSSR(/* @__PURE__ */ reactExports.createElement("div", Object.assign({}, pickAttrs(props, {
    aria: true,
    data: true
  }), {
    className: classString,
    style,
    onMouseEnter,
    onMouseLeave,
    onFocus,
    onBlur,
    id,
    ref
  }), /* @__PURE__ */ reactExports.createElement(RadioGroupContextProvider, {
    value: {
      onChange: onRadioChange,
      value,
      disabled: props.disabled,
      name: props.name,
      optionType: props.optionType
    }
  }, childrenToRender)));
});
const Group = /* @__PURE__ */ reactExports.memo(RadioGroup);
var __rest$1 = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
const RadioButton = (props, ref) => {
  const {
    getPrefixCls
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls
  } = props, radioProps = __rest$1(props, ["prefixCls"]);
  const prefixCls = getPrefixCls("radio", customizePrefixCls);
  return /* @__PURE__ */ reactExports.createElement(RadioOptionTypeContextProvider, {
    value: "button"
  }, /* @__PURE__ */ reactExports.createElement(InternalRadio$1, Object.assign({
    prefixCls
  }, radioProps, {
    type: "radio",
    ref
  })));
};
const Button = /* @__PURE__ */ reactExports.forwardRef(RadioButton);
const Radio = InternalRadio$1;
Radio.Button = Button;
Radio.Group = Group;
Radio.__ANT_RADIO = true;
const Radio$1 = Radio;
const RowContext = /* @__PURE__ */ reactExports.createContext({});
const RowContext$1 = RowContext;
const genGridRowStyle = (token) => {
  const {
    componentCls
  } = token;
  return {
    // Grid system
    [componentCls]: {
      display: "flex",
      flexFlow: "row wrap",
      minWidth: 0,
      "&::before, &::after": {
        display: "flex"
      },
      "&-no-wrap": {
        flexWrap: "nowrap"
      },
      // The origin of the X-axis
      "&-start": {
        justifyContent: "flex-start"
      },
      // The center of the X-axis
      "&-center": {
        justifyContent: "center"
      },
      // The opposite of the X-axis
      "&-end": {
        justifyContent: "flex-end"
      },
      "&-space-between": {
        justifyContent: "space-between"
      },
      "&-space-around": {
        justifyContent: "space-around"
      },
      "&-space-evenly": {
        justifyContent: "space-evenly"
      },
      // Align at the top
      "&-top": {
        alignItems: "flex-start"
      },
      // Align at the center
      "&-middle": {
        alignItems: "center"
      },
      "&-bottom": {
        alignItems: "flex-end"
      }
    }
  };
};
const useRowStyle = genComponentStyleHook("Grid", (token) => [genGridRowStyle(token)]);
const useFlexGapSupport = () => {
  const [flexible, setFlexible] = reactExports.useState(false);
  reactExports.useEffect(() => {
    setFlexible(detectFlexGapSupported());
  }, []);
  return flexible;
};
var __rest = function(s, e) {
  var t = {};
  for (var p in s)
    if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
      t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
};
function useMergePropByScreen(oriProp, screen) {
  const [prop, setProp] = reactExports.useState(typeof oriProp === "string" ? oriProp : "");
  const calcMergeAlignOrJustify = () => {
    if (typeof oriProp === "string") {
      setProp(oriProp);
    }
    if (typeof oriProp !== "object") {
      return;
    }
    for (let i = 0; i < responsiveArray.length; i++) {
      const breakpoint = responsiveArray[i];
      if (!screen[breakpoint])
        continue;
      const curVal = oriProp[breakpoint];
      if (curVal !== void 0) {
        setProp(curVal);
        return;
      }
    }
  };
  reactExports.useEffect(() => {
    calcMergeAlignOrJustify();
  }, [JSON.stringify(oriProp), screen]);
  return prop;
}
const Row = /* @__PURE__ */ reactExports.forwardRef((props, ref) => {
  const {
    prefixCls: customizePrefixCls,
    justify,
    align,
    className,
    style,
    children,
    gutter = 0,
    wrap
  } = props, others = __rest(props, ["prefixCls", "justify", "align", "className", "style", "children", "gutter", "wrap"]);
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const [screens, setScreens] = reactExports.useState({
    xs: true,
    sm: true,
    md: true,
    lg: true,
    xl: true,
    xxl: true
  });
  const [curScreens, setCurScreens] = reactExports.useState({
    xs: false,
    sm: false,
    md: false,
    lg: false,
    xl: false,
    xxl: false
  });
  const mergeAlign = useMergePropByScreen(align, curScreens);
  const mergeJustify = useMergePropByScreen(justify, curScreens);
  const supportFlexGap = useFlexGapSupport();
  const gutterRef = reactExports.useRef(gutter);
  const responsiveObserver = useResponsiveObserver();
  reactExports.useEffect(() => {
    const token = responsiveObserver.subscribe((screen) => {
      setCurScreens(screen);
      const currentGutter = gutterRef.current || 0;
      if (!Array.isArray(currentGutter) && typeof currentGutter === "object" || Array.isArray(currentGutter) && (typeof currentGutter[0] === "object" || typeof currentGutter[1] === "object")) {
        setScreens(screen);
      }
    });
    return () => responsiveObserver.unsubscribe(token);
  }, []);
  const getGutter = () => {
    const results = [void 0, void 0];
    const normalizedGutter = Array.isArray(gutter) ? gutter : [gutter, void 0];
    normalizedGutter.forEach((g, index) => {
      if (typeof g === "object") {
        for (let i = 0; i < responsiveArray.length; i++) {
          const breakpoint = responsiveArray[i];
          if (screens[breakpoint] && g[breakpoint] !== void 0) {
            results[index] = g[breakpoint];
            break;
          }
        }
      } else {
        results[index] = g;
      }
    });
    return results;
  };
  const prefixCls = getPrefixCls("row", customizePrefixCls);
  const [wrapSSR, hashId] = useRowStyle(prefixCls);
  const gutters = getGutter();
  const classes = classNames(prefixCls, {
    [`${prefixCls}-no-wrap`]: wrap === false,
    [`${prefixCls}-${mergeJustify}`]: mergeJustify,
    [`${prefixCls}-${mergeAlign}`]: mergeAlign,
    [`${prefixCls}-rtl`]: direction === "rtl"
  }, className, hashId);
  const rowStyle = {};
  const horizontalGutter = gutters[0] != null && gutters[0] > 0 ? gutters[0] / -2 : void 0;
  const verticalGutter = gutters[1] != null && gutters[1] > 0 ? gutters[1] / -2 : void 0;
  if (horizontalGutter) {
    rowStyle.marginLeft = horizontalGutter;
    rowStyle.marginRight = horizontalGutter;
  }
  if (supportFlexGap) {
    [, rowStyle.rowGap] = gutters;
  } else if (verticalGutter) {
    rowStyle.marginTop = verticalGutter;
    rowStyle.marginBottom = verticalGutter;
  }
  const [gutterH, gutterV] = gutters;
  const rowContext = reactExports.useMemo(() => ({
    gutter: [gutterH, gutterV],
    wrap,
    supportFlexGap
  }), [gutterH, gutterV, wrap, supportFlexGap]);
  return wrapSSR(/* @__PURE__ */ reactExports.createElement(RowContext$1.Provider, {
    value: rowContext
  }, /* @__PURE__ */ reactExports.createElement("div", Object.assign({}, others, {
    className: classes,
    style: Object.assign(Object.assign({}, rowStyle), style),
    ref
  }), children)));
});
const Row$1 = Row;
export {
  Row$1 as R,
  Radio$1 as a
};
