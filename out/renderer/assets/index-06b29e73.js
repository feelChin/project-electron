import { r as reactExports, R as React, f as React$1 } from "./index-861f41a7.js";
import { _ as _inherits, a as _createSuper, b as _classCallCheck, c as _createClass, s as supportRef, d as composeRef, e as _objectSpread2, f as findDOMNode, t as toArray, g as _extends, w as warningOnce, h as _typeof, i as generate$1, C as Context, u as updateCSS, j as _objectWithoutProperties, k as _slicedToArray, l as blue, m as classNames, n as _defineProperty, o as wrapperRaf, p as useLayoutEffect, q as _toConsumableArray, K as Keyframe, r as merge, v as resetComponent, x as genFocusOutline, y as _assertThisInitialized, z as pickAttrs, A as CSSMotion, B as genComponentStyleHook, D as ConfigContext } from "./pickAttrs-80e333b2.js";
function EditInput(props) {
  const {
    value,
    callback
  } = props;
  const inputRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
  return /* @__PURE__ */ React.createElement("input", {
    defaultValue: value,
    onBlur: (e) => {
      callback(e.target.value);
    },
    ref: inputRef
  });
}
class MyCustomTreeNode {
  static addNode(key, data) {
    data.forEach((item2) => {
      if (item2.key === key) {
        if (item2.children) {
          item2.children.push({
            value: "自定义标题",
            key: key + "-" + item2.children.length,
            parentId: item2.code,
            code: (/* @__PURE__ */ new Date()).getTime()
          });
        } else {
          item2.children = [];
          item2.children.push({
            value: "自定义标题",
            key: key + "-" + item2.children.length,
            parentId: item2.code,
            code: (/* @__PURE__ */ new Date()).getTime()
          });
        }
        return;
      }
      if (item2.children) {
        MyCustomTreeNode.addNode(key, item2.children);
      }
    });
  }
  static deleteNode(key, data) {
    data.forEach((item2, index2) => {
      if (item2.key === key) {
        data.splice(index2, 1);
        return;
      }
      if (item2.children) {
        MyCustomTreeNode.deleteNode(key, item2.children);
      }
    });
  }
  static editNode(key, data) {
    data.forEach((item2) => {
      if (item2.key === key) {
        item2.isEditable = true;
      } else {
        item2.isEditable = false;
      }
      if (item2.children) {
        MyCustomTreeNode.editNode(key, item2.children);
      }
    });
  }
  static saveNode(key, data, newValue) {
    data.forEach((item2) => {
      if (item2.key === key) {
        item2.value = newValue;
        item2.isEditable = false;
      }
      if (item2.children) {
        MyCustomTreeNode.saveNode(key, item2.children, newValue);
      }
    });
  }
  static findParent(key, data) {
    for (let i in data) {
      if (data[i].key === key) {
        return [data[i]];
      }
      if (data[i].children) {
        let result = MyCustomTreeNode.findParent(key, data[i].children);
        if (result) {
          return result.concat(data[i]);
        }
      }
    }
  }
  static insertNode(key, data) {
    const find = MyCustomTreeNode.findParent(key, data);
    const parent = find[1];
    if (parent) {
      const index2 = parent.children.findIndex((item2) => {
        return item2.key === find[0].key;
      });
      parent.children.splice(index2 + 1, 0, {
        value: "自定义标题",
        parentId: parent.code,
        code: (/* @__PURE__ */ new Date()).getTime()
      });
      parent.children.forEach((item2, index3) => {
        item2.key = parent.key + "-" + index3;
      });
    } else {
      const index2 = data.findIndex((item2) => {
        return item2.key === find[0].key;
      });
      data.splice(index2 + 1, 0, {
        value: "自定义标题",
        parentId: 0,
        code: (/* @__PURE__ */ new Date()).getTime()
      });
      data.forEach((item2, index3) => {
        item2.key = "0-" + index3;
      });
    }
  }
  onAdd(key, data, callback) {
    MyCustomTreeNode.addNode(key, data);
    callback(data);
  }
  onDelete(key, data, callback) {
    MyCustomTreeNode.deleteNode(key, data);
    callback(data);
  }
  onEdit(key, data, callback) {
    MyCustomTreeNode.editNode(key, data);
    callback(data);
  }
  onSave(key, data, newValue, callback) {
    MyCustomTreeNode.saveNode(key, data, newValue);
    callback(data);
  }
  onInsert(key, data, callback) {
    MyCustomTreeNode.insertNode(key, data);
    callback(data);
  }
}
const MyCustomTreeNode$1 = new MyCustomTreeNode();
const treeData = [{
  title: "成都市",
  value: "成都市",
  key: "0-0",
  code: 51001,
  parentId: 0,
  children: [{
    key: "0-0-0",
    title: "双流区",
    value: "双流区",
    parentId: 51001,
    code: 510011
  }, {
    key: "0-0-1",
    title: "武侯区",
    value: "武侯区",
    parentId: 51001,
    code: 510012
  }, {
    key: "0-0-2",
    title: "锦江区",
    value: "锦江区",
    parentId: 51001,
    code: 510013
  }, {
    key: "0-0-3",
    title: "青羊区",
    value: "青羊区",
    parentId: 51001,
    code: 510014
  }]
}, {
  key: "0-1",
  title: "眉山市",
  value: "眉山市",
  parentId: 0,
  code: 52001,
  children: [{
    key: "0-1-0",
    title: "东坡区",
    value: "东坡区",
    parentId: 52001,
    code: 520011,
    children: [{
      key: "0-1-0-0",
      title: "启明星花园",
      value: "启明星花园",
      parentId: 520011,
      code: 5200111
    }, {
      key: "0-1-0-1",
      title: "云溪上",
      value: "云溪上",
      parentId: 520011,
      code: 5200112
    }, {
      key: "0-1-0-2",
      title: "眉山市政府",
      value: "眉山市政府",
      parentId: 520011,
      code: 5200113
    }, {
      key: "0-1-0-3",
      title: "万达广场",
      value: "万达广场",
      parentId: 520011,
      code: 5200114
    }]
  }, {
    key: "0-1-1",
    title: "仁寿县",
    value: "仁寿县",
    parentId: 52001,
    code: 520012
  }, {
    key: "0-1-2",
    title: "丹棱县",
    value: "丹棱县",
    parentId: 52001,
    code: 520013
  }, {
    key: "0-1-3",
    title: "青神县",
    value: "青神县",
    parentId: 52001,
    code: 520014
  }]
}];
var MapShim = function() {
  if (typeof Map !== "undefined") {
    return Map;
  }
  function getIndex(arr, key) {
    var result = -1;
    arr.some(function(entry, index2) {
      if (entry[0] === key) {
        result = index2;
        return true;
      }
      return false;
    });
    return result;
  }
  return (
    /** @class */
    function() {
      function class_1() {
        this.__entries__ = [];
      }
      Object.defineProperty(class_1.prototype, "size", {
        /**
         * @returns {boolean}
         */
        get: function() {
          return this.__entries__.length;
        },
        enumerable: true,
        configurable: true
      });
      class_1.prototype.get = function(key) {
        var index2 = getIndex(this.__entries__, key);
        var entry = this.__entries__[index2];
        return entry && entry[1];
      };
      class_1.prototype.set = function(key, value) {
        var index2 = getIndex(this.__entries__, key);
        if (~index2) {
          this.__entries__[index2][1] = value;
        } else {
          this.__entries__.push([key, value]);
        }
      };
      class_1.prototype.delete = function(key) {
        var entries = this.__entries__;
        var index2 = getIndex(entries, key);
        if (~index2) {
          entries.splice(index2, 1);
        }
      };
      class_1.prototype.has = function(key) {
        return !!~getIndex(this.__entries__, key);
      };
      class_1.prototype.clear = function() {
        this.__entries__.splice(0);
      };
      class_1.prototype.forEach = function(callback, ctx) {
        if (ctx === void 0) {
          ctx = null;
        }
        for (var _i = 0, _a = this.__entries__; _i < _a.length; _i++) {
          var entry = _a[_i];
          callback.call(ctx, entry[1], entry[0]);
        }
      };
      return class_1;
    }()
  );
}();
var isBrowser = typeof window !== "undefined" && typeof document !== "undefined" && window.document === document;
var global$1 = function() {
  if (typeof global !== "undefined" && global.Math === Math) {
    return global;
  }
  if (typeof self !== "undefined" && self.Math === Math) {
    return self;
  }
  if (typeof window !== "undefined" && window.Math === Math) {
    return window;
  }
  return Function("return this")();
}();
var requestAnimationFrame$1 = function() {
  if (typeof requestAnimationFrame === "function") {
    return requestAnimationFrame.bind(global$1);
  }
  return function(callback) {
    return setTimeout(function() {
      return callback(Date.now());
    }, 1e3 / 60);
  };
}();
var trailingTimeout = 2;
function throttle(callback, delay) {
  var leadingCall = false, trailingCall = false, lastCallTime = 0;
  function resolvePending() {
    if (leadingCall) {
      leadingCall = false;
      callback();
    }
    if (trailingCall) {
      proxy();
    }
  }
  function timeoutCallback() {
    requestAnimationFrame$1(resolvePending);
  }
  function proxy() {
    var timeStamp = Date.now();
    if (leadingCall) {
      if (timeStamp - lastCallTime < trailingTimeout) {
        return;
      }
      trailingCall = true;
    } else {
      leadingCall = true;
      trailingCall = false;
      setTimeout(timeoutCallback, delay);
    }
    lastCallTime = timeStamp;
  }
  return proxy;
}
var REFRESH_DELAY = 20;
var transitionKeys = ["top", "right", "bottom", "left", "width", "height", "size", "weight"];
var mutationObserverSupported = typeof MutationObserver !== "undefined";
var ResizeObserverController = (
  /** @class */
  function() {
    function ResizeObserverController2() {
      this.connected_ = false;
      this.mutationEventsAdded_ = false;
      this.mutationsObserver_ = null;
      this.observers_ = [];
      this.onTransitionEnd_ = this.onTransitionEnd_.bind(this);
      this.refresh = throttle(this.refresh.bind(this), REFRESH_DELAY);
    }
    ResizeObserverController2.prototype.addObserver = function(observer) {
      if (!~this.observers_.indexOf(observer)) {
        this.observers_.push(observer);
      }
      if (!this.connected_) {
        this.connect_();
      }
    };
    ResizeObserverController2.prototype.removeObserver = function(observer) {
      var observers2 = this.observers_;
      var index2 = observers2.indexOf(observer);
      if (~index2) {
        observers2.splice(index2, 1);
      }
      if (!observers2.length && this.connected_) {
        this.disconnect_();
      }
    };
    ResizeObserverController2.prototype.refresh = function() {
      var changesDetected = this.updateObservers_();
      if (changesDetected) {
        this.refresh();
      }
    };
    ResizeObserverController2.prototype.updateObservers_ = function() {
      var activeObservers = this.observers_.filter(function(observer) {
        return observer.gatherActive(), observer.hasActive();
      });
      activeObservers.forEach(function(observer) {
        return observer.broadcastActive();
      });
      return activeObservers.length > 0;
    };
    ResizeObserverController2.prototype.connect_ = function() {
      if (!isBrowser || this.connected_) {
        return;
      }
      document.addEventListener("transitionend", this.onTransitionEnd_);
      window.addEventListener("resize", this.refresh);
      if (mutationObserverSupported) {
        this.mutationsObserver_ = new MutationObserver(this.refresh);
        this.mutationsObserver_.observe(document, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true
        });
      } else {
        document.addEventListener("DOMSubtreeModified", this.refresh);
        this.mutationEventsAdded_ = true;
      }
      this.connected_ = true;
    };
    ResizeObserverController2.prototype.disconnect_ = function() {
      if (!isBrowser || !this.connected_) {
        return;
      }
      document.removeEventListener("transitionend", this.onTransitionEnd_);
      window.removeEventListener("resize", this.refresh);
      if (this.mutationsObserver_) {
        this.mutationsObserver_.disconnect();
      }
      if (this.mutationEventsAdded_) {
        document.removeEventListener("DOMSubtreeModified", this.refresh);
      }
      this.mutationsObserver_ = null;
      this.mutationEventsAdded_ = false;
      this.connected_ = false;
    };
    ResizeObserverController2.prototype.onTransitionEnd_ = function(_a) {
      var _b = _a.propertyName, propertyName = _b === void 0 ? "" : _b;
      var isReflowProperty = transitionKeys.some(function(key) {
        return !!~propertyName.indexOf(key);
      });
      if (isReflowProperty) {
        this.refresh();
      }
    };
    ResizeObserverController2.getInstance = function() {
      if (!this.instance_) {
        this.instance_ = new ResizeObserverController2();
      }
      return this.instance_;
    };
    ResizeObserverController2.instance_ = null;
    return ResizeObserverController2;
  }()
);
var defineConfigurable = function(target, props) {
  for (var _i = 0, _a = Object.keys(props); _i < _a.length; _i++) {
    var key = _a[_i];
    Object.defineProperty(target, key, {
      value: props[key],
      enumerable: false,
      writable: false,
      configurable: true
    });
  }
  return target;
};
var getWindowOf = function(target) {
  var ownerGlobal = target && target.ownerDocument && target.ownerDocument.defaultView;
  return ownerGlobal || global$1;
};
var emptyRect = createRectInit(0, 0, 0, 0);
function toFloat(value) {
  return parseFloat(value) || 0;
}
function getBordersSize(styles) {
  var positions = [];
  for (var _i = 1; _i < arguments.length; _i++) {
    positions[_i - 1] = arguments[_i];
  }
  return positions.reduce(function(size, position) {
    var value = styles["border-" + position + "-width"];
    return size + toFloat(value);
  }, 0);
}
function getPaddings(styles) {
  var positions = ["top", "right", "bottom", "left"];
  var paddings = {};
  for (var _i = 0, positions_1 = positions; _i < positions_1.length; _i++) {
    var position = positions_1[_i];
    var value = styles["padding-" + position];
    paddings[position] = toFloat(value);
  }
  return paddings;
}
function getSVGContentRect(target) {
  var bbox = target.getBBox();
  return createRectInit(0, 0, bbox.width, bbox.height);
}
function getHTMLElementContentRect(target) {
  var clientWidth = target.clientWidth, clientHeight = target.clientHeight;
  if (!clientWidth && !clientHeight) {
    return emptyRect;
  }
  var styles = getWindowOf(target).getComputedStyle(target);
  var paddings = getPaddings(styles);
  var horizPad = paddings.left + paddings.right;
  var vertPad = paddings.top + paddings.bottom;
  var width = toFloat(styles.width), height = toFloat(styles.height);
  if (styles.boxSizing === "border-box") {
    if (Math.round(width + horizPad) !== clientWidth) {
      width -= getBordersSize(styles, "left", "right") + horizPad;
    }
    if (Math.round(height + vertPad) !== clientHeight) {
      height -= getBordersSize(styles, "top", "bottom") + vertPad;
    }
  }
  if (!isDocumentElement(target)) {
    var vertScrollbar = Math.round(width + horizPad) - clientWidth;
    var horizScrollbar = Math.round(height + vertPad) - clientHeight;
    if (Math.abs(vertScrollbar) !== 1) {
      width -= vertScrollbar;
    }
    if (Math.abs(horizScrollbar) !== 1) {
      height -= horizScrollbar;
    }
  }
  return createRectInit(paddings.left, paddings.top, width, height);
}
var isSVGGraphicsElement = function() {
  if (typeof SVGGraphicsElement !== "undefined") {
    return function(target) {
      return target instanceof getWindowOf(target).SVGGraphicsElement;
    };
  }
  return function(target) {
    return target instanceof getWindowOf(target).SVGElement && typeof target.getBBox === "function";
  };
}();
function isDocumentElement(target) {
  return target === getWindowOf(target).document.documentElement;
}
function getContentRect(target) {
  if (!isBrowser) {
    return emptyRect;
  }
  if (isSVGGraphicsElement(target)) {
    return getSVGContentRect(target);
  }
  return getHTMLElementContentRect(target);
}
function createReadOnlyRect(_a) {
  var x = _a.x, y = _a.y, width = _a.width, height = _a.height;
  var Constr = typeof DOMRectReadOnly !== "undefined" ? DOMRectReadOnly : Object;
  var rect = Object.create(Constr.prototype);
  defineConfigurable(rect, {
    x,
    y,
    width,
    height,
    top: y,
    right: x + width,
    bottom: height + y,
    left: x
  });
  return rect;
}
function createRectInit(x, y, width, height) {
  return { x, y, width, height };
}
var ResizeObservation = (
  /** @class */
  function() {
    function ResizeObservation2(target) {
      this.broadcastWidth = 0;
      this.broadcastHeight = 0;
      this.contentRect_ = createRectInit(0, 0, 0, 0);
      this.target = target;
    }
    ResizeObservation2.prototype.isActive = function() {
      var rect = getContentRect(this.target);
      this.contentRect_ = rect;
      return rect.width !== this.broadcastWidth || rect.height !== this.broadcastHeight;
    };
    ResizeObservation2.prototype.broadcastRect = function() {
      var rect = this.contentRect_;
      this.broadcastWidth = rect.width;
      this.broadcastHeight = rect.height;
      return rect;
    };
    return ResizeObservation2;
  }()
);
var ResizeObserverEntry = (
  /** @class */
  function() {
    function ResizeObserverEntry2(target, rectInit) {
      var contentRect = createReadOnlyRect(rectInit);
      defineConfigurable(this, { target, contentRect });
    }
    return ResizeObserverEntry2;
  }()
);
var ResizeObserverSPI = (
  /** @class */
  function() {
    function ResizeObserverSPI2(callback, controller, callbackCtx) {
      this.activeObservations_ = [];
      this.observations_ = new MapShim();
      if (typeof callback !== "function") {
        throw new TypeError("The callback provided as parameter 1 is not a function.");
      }
      this.callback_ = callback;
      this.controller_ = controller;
      this.callbackCtx_ = callbackCtx;
    }
    ResizeObserverSPI2.prototype.observe = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (observations.has(target)) {
        return;
      }
      observations.set(target, new ResizeObservation(target));
      this.controller_.addObserver(this);
      this.controller_.refresh();
    };
    ResizeObserverSPI2.prototype.unobserve = function(target) {
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      if (typeof Element === "undefined" || !(Element instanceof Object)) {
        return;
      }
      if (!(target instanceof getWindowOf(target).Element)) {
        throw new TypeError('parameter 1 is not of type "Element".');
      }
      var observations = this.observations_;
      if (!observations.has(target)) {
        return;
      }
      observations.delete(target);
      if (!observations.size) {
        this.controller_.removeObserver(this);
      }
    };
    ResizeObserverSPI2.prototype.disconnect = function() {
      this.clearActive();
      this.observations_.clear();
      this.controller_.removeObserver(this);
    };
    ResizeObserverSPI2.prototype.gatherActive = function() {
      var _this = this;
      this.clearActive();
      this.observations_.forEach(function(observation) {
        if (observation.isActive()) {
          _this.activeObservations_.push(observation);
        }
      });
    };
    ResizeObserverSPI2.prototype.broadcastActive = function() {
      if (!this.hasActive()) {
        return;
      }
      var ctx = this.callbackCtx_;
      var entries = this.activeObservations_.map(function(observation) {
        return new ResizeObserverEntry(observation.target, observation.broadcastRect());
      });
      this.callback_.call(ctx, entries, ctx);
      this.clearActive();
    };
    ResizeObserverSPI2.prototype.clearActive = function() {
      this.activeObservations_.splice(0);
    };
    ResizeObserverSPI2.prototype.hasActive = function() {
      return this.activeObservations_.length > 0;
    };
    return ResizeObserverSPI2;
  }()
);
var observers = typeof WeakMap !== "undefined" ? /* @__PURE__ */ new WeakMap() : new MapShim();
var ResizeObserver$1 = (
  /** @class */
  function() {
    function ResizeObserver2(callback) {
      if (!(this instanceof ResizeObserver2)) {
        throw new TypeError("Cannot call a class as a function.");
      }
      if (!arguments.length) {
        throw new TypeError("1 argument required, but only 0 present.");
      }
      var controller = ResizeObserverController.getInstance();
      var observer = new ResizeObserverSPI(callback, controller, this);
      observers.set(this, observer);
    }
    return ResizeObserver2;
  }()
);
[
  "observe",
  "unobserve",
  "disconnect"
].forEach(function(method) {
  ResizeObserver$1.prototype[method] = function() {
    var _a;
    return (_a = observers.get(this))[method].apply(_a, arguments);
  };
});
var index = function() {
  if (typeof global$1.ResizeObserver !== "undefined") {
    return global$1.ResizeObserver;
  }
  return ResizeObserver$1;
}();
var elementListeners = /* @__PURE__ */ new Map();
function onResize(entities) {
  entities.forEach(function(entity) {
    var _elementListeners$get;
    var target = entity.target;
    (_elementListeners$get = elementListeners.get(target)) === null || _elementListeners$get === void 0 ? void 0 : _elementListeners$get.forEach(function(listener) {
      return listener(target);
    });
  });
}
var resizeObserver = new index(onResize);
function observe(element, callback) {
  if (!elementListeners.has(element)) {
    elementListeners.set(element, /* @__PURE__ */ new Set());
    resizeObserver.observe(element);
  }
  elementListeners.get(element).add(callback);
}
function unobserve(element, callback) {
  if (elementListeners.has(element)) {
    elementListeners.get(element).delete(callback);
    if (!elementListeners.get(element).size) {
      resizeObserver.unobserve(element);
      elementListeners.delete(element);
    }
  }
}
var DomWrapper = /* @__PURE__ */ function(_React$Component) {
  _inherits(DomWrapper2, _React$Component);
  var _super = _createSuper(DomWrapper2);
  function DomWrapper2() {
    _classCallCheck(this, DomWrapper2);
    return _super.apply(this, arguments);
  }
  _createClass(DomWrapper2, [{
    key: "render",
    value: function render() {
      return this.props.children;
    }
  }]);
  return DomWrapper2;
}(reactExports.Component);
var CollectionContext = /* @__PURE__ */ reactExports.createContext(null);
function Collection(_ref) {
  var children = _ref.children, onBatchResize = _ref.onBatchResize;
  var resizeIdRef = reactExports.useRef(0);
  var resizeInfosRef = reactExports.useRef([]);
  var onCollectionResize = reactExports.useContext(CollectionContext);
  var onResize2 = reactExports.useCallback(function(size, element, data) {
    resizeIdRef.current += 1;
    var currentId = resizeIdRef.current;
    resizeInfosRef.current.push({
      size,
      element,
      data
    });
    Promise.resolve().then(function() {
      if (currentId === resizeIdRef.current) {
        onBatchResize === null || onBatchResize === void 0 ? void 0 : onBatchResize(resizeInfosRef.current);
        resizeInfosRef.current = [];
      }
    });
    onCollectionResize === null || onCollectionResize === void 0 ? void 0 : onCollectionResize(size, element, data);
  }, [onBatchResize, onCollectionResize]);
  return /* @__PURE__ */ reactExports.createElement(CollectionContext.Provider, {
    value: onResize2
  }, children);
}
function SingleObserver(props, ref) {
  var children = props.children, disabled = props.disabled;
  var elementRef = reactExports.useRef(null);
  var wrapperRef = reactExports.useRef(null);
  var onCollectionResize = reactExports.useContext(CollectionContext);
  var isRenderProps = typeof children === "function";
  var mergedChildren = isRenderProps ? children(elementRef) : children;
  var sizeRef = reactExports.useRef({
    width: -1,
    height: -1,
    offsetWidth: -1,
    offsetHeight: -1
  });
  var canRef = !isRenderProps && /* @__PURE__ */ reactExports.isValidElement(mergedChildren) && supportRef(mergedChildren);
  var originRef = canRef ? mergedChildren.ref : null;
  var mergedRef = reactExports.useMemo(function() {
    return composeRef(originRef, elementRef);
  }, [originRef, elementRef]);
  var getDom = function getDom2() {
    return findDOMNode(elementRef.current) || findDOMNode(wrapperRef.current);
  };
  reactExports.useImperativeHandle(ref, function() {
    return getDom();
  });
  var propsRef = reactExports.useRef(props);
  propsRef.current = props;
  var onInternalResize = reactExports.useCallback(function(target) {
    var _propsRef$current = propsRef.current, onResize2 = _propsRef$current.onResize, data = _propsRef$current.data;
    var _target$getBoundingCl = target.getBoundingClientRect(), width = _target$getBoundingCl.width, height = _target$getBoundingCl.height;
    var offsetWidth = target.offsetWidth, offsetHeight = target.offsetHeight;
    var fixedWidth = Math.floor(width);
    var fixedHeight = Math.floor(height);
    if (sizeRef.current.width !== fixedWidth || sizeRef.current.height !== fixedHeight || sizeRef.current.offsetWidth !== offsetWidth || sizeRef.current.offsetHeight !== offsetHeight) {
      var size = {
        width: fixedWidth,
        height: fixedHeight,
        offsetWidth,
        offsetHeight
      };
      sizeRef.current = size;
      var mergedOffsetWidth = offsetWidth === Math.round(width) ? width : offsetWidth;
      var mergedOffsetHeight = offsetHeight === Math.round(height) ? height : offsetHeight;
      var sizeInfo = _objectSpread2(_objectSpread2({}, size), {}, {
        offsetWidth: mergedOffsetWidth,
        offsetHeight: mergedOffsetHeight
      });
      onCollectionResize === null || onCollectionResize === void 0 ? void 0 : onCollectionResize(sizeInfo, target, data);
      if (onResize2) {
        Promise.resolve().then(function() {
          onResize2(sizeInfo, target);
        });
      }
    }
  }, []);
  reactExports.useEffect(function() {
    var currentElement = getDom();
    if (currentElement && !disabled) {
      observe(currentElement, onInternalResize);
    }
    return function() {
      return unobserve(currentElement, onInternalResize);
    };
  }, [elementRef.current, disabled]);
  return /* @__PURE__ */ reactExports.createElement(DomWrapper, {
    ref: wrapperRef
  }, canRef ? /* @__PURE__ */ reactExports.cloneElement(mergedChildren, {
    ref: mergedRef
  }) : mergedChildren);
}
var RefSingleObserver = /* @__PURE__ */ reactExports.forwardRef(SingleObserver);
var INTERNAL_PREFIX_KEY = "rc-observer-key";
function ResizeObserver(props, ref) {
  var children = props.children;
  var childNodes = typeof children === "function" ? [children] : toArray(children);
  return childNodes.map(function(child, index2) {
    var key = (child === null || child === void 0 ? void 0 : child.key) || "".concat(INTERNAL_PREFIX_KEY, "-").concat(index2);
    return /* @__PURE__ */ reactExports.createElement(RefSingleObserver, _extends({}, props, {
      key,
      ref: index2 === 0 ? ref : void 0
    }), child);
  });
}
var RefResizeObserver = /* @__PURE__ */ reactExports.forwardRef(ResizeObserver);
RefResizeObserver.Collection = Collection;
function omit(obj, fields) {
  var clone = _objectSpread2({}, obj);
  if (Array.isArray(fields)) {
    fields.forEach(function(key) {
      delete clone[key];
    });
  }
  return clone;
}
function getRoot(ele) {
  var _ele$getRootNode;
  return ele === null || ele === void 0 ? void 0 : (_ele$getRootNode = ele.getRootNode) === null || _ele$getRootNode === void 0 ? void 0 : _ele$getRootNode.call(ele);
}
function inShadow(ele) {
  return getRoot(ele) !== (ele === null || ele === void 0 ? void 0 : ele.ownerDocument);
}
function getShadowRoot(ele) {
  return inShadow(ele) ? getRoot(ele) : null;
}
function warning(valid, message) {
  warningOnce(valid, "[@ant-design/icons] ".concat(message));
}
function isIconDefinition(target) {
  return _typeof(target) === "object" && typeof target.name === "string" && typeof target.theme === "string" && (_typeof(target.icon) === "object" || typeof target.icon === "function");
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(attrs).reduce(function(acc, key) {
    var val = attrs[key];
    switch (key) {
      case "class":
        acc.className = val;
        delete acc.class;
        break;
      default:
        acc[key] = val;
    }
    return acc;
  }, {});
}
function generate(node, key, rootProps) {
  if (!rootProps) {
    return /* @__PURE__ */ React.createElement(node.tag, _objectSpread2({
      key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function(child, index2) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index2));
    }));
  }
  return /* @__PURE__ */ React.createElement(node.tag, _objectSpread2(_objectSpread2({
    key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function(child, index2) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index2));
  }));
}
function getSecondaryColor(primaryColor) {
  return generate$1(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
var iconStyles = "\n.anticon {\n  display: inline-block;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
var useInsertStyles = function useInsertStyles2(eleRef) {
  var _useContext = reactExports.useContext(Context), csp = _useContext.csp, prefixCls = _useContext.prefixCls;
  var mergedStyleStr = iconStyles;
  if (prefixCls) {
    mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
  }
  reactExports.useEffect(function() {
    var ele = eleRef.current;
    var shadowRoot = getShadowRoot(ele);
    updateCSS(mergedStyleStr, "@ant-design-icons", {
      prepend: true,
      csp,
      attachTo: shadowRoot
    });
  }, []);
};
var _excluded$6 = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];
var twoToneColorPalette = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: false
};
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || getSecondaryColor(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return _objectSpread2({}, twoToneColorPalette);
}
var IconBase = function IconBase2(props) {
  var icon = props.icon, className = props.className, onClick = props.onClick, style2 = props.style, primaryColor = props.primaryColor, secondaryColor = props.secondaryColor, restProps = _objectWithoutProperties(props, _excluded$6);
  var svgRef = reactExports.useRef();
  var colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor,
      secondaryColor: secondaryColor || getSecondaryColor(primaryColor)
    };
  }
  useInsertStyles(svgRef);
  warning(isIconDefinition(icon), "icon should be icon definiton, but got ".concat(icon));
  if (!isIconDefinition(icon)) {
    return null;
  }
  var target = icon;
  if (target && typeof target.icon === "function") {
    target = _objectSpread2(_objectSpread2({}, target), {}, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }
  return generate(target.icon, "svg-".concat(target.name), _objectSpread2(_objectSpread2({
    className,
    onClick,
    style: style2,
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, restProps), {}, {
    ref: svgRef
  }));
};
IconBase.displayName = "IconReact";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
const ReactIcon = IconBase;
function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return ReactIcon.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}
function getTwoToneColor() {
  var colors = ReactIcon.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
var _excluded$5 = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
setTwoToneColor(blue.primary);
var Icon = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var _classNames;
  var className = props.className, icon = props.icon, spin = props.spin, rotate = props.rotate, tabIndex = props.tabIndex, onClick = props.onClick, twoToneColor = props.twoToneColor, restProps = _objectWithoutProperties(props, _excluded$5);
  var _React$useContext = reactExports.useContext(Context), _React$useContext$pre = _React$useContext.prefixCls, prefixCls = _React$useContext$pre === void 0 ? "anticon" : _React$useContext$pre, rootClassName = _React$useContext.rootClassName;
  var classString = classNames(rootClassName, prefixCls, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), _defineProperty(_classNames, "".concat(prefixCls, "-spin"), !!spin || icon.name === "loading"), _classNames), className);
  var iconTabIndex = tabIndex;
  if (iconTabIndex === void 0 && onClick) {
    iconTabIndex = -1;
  }
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : void 0;
  var _normalizeTwoToneColo = normalizeTwoToneColors(twoToneColor), _normalizeTwoToneColo2 = _slicedToArray(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return /* @__PURE__ */ reactExports.createElement("span", _extends({
    role: "img",
    "aria-label": icon.name
  }, restProps, {
    ref,
    tabIndex: iconTabIndex,
    onClick,
    className: classString
  }), /* @__PURE__ */ reactExports.createElement(ReactIcon, {
    icon,
    primaryColor,
    secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = "AntdIcon";
Icon.getTwoToneColor = getTwoToneColor;
Icon.setTwoToneColor = setTwoToneColor;
const AntdIcon = Icon;
const {
  isValidElement
} = React$1;
function replaceElement(element, replacement, props) {
  if (!isValidElement(element)) {
    return replacement;
  }
  return /* @__PURE__ */ reactExports.cloneElement(element, typeof props === "function" ? props(element.props || {}) : props);
}
function cloneElement(element, props) {
  return replaceElement(element, element, props);
}
var KeyCode = {
  /**
   * MAC_ENTER
   */
  MAC_ENTER: 3,
  /**
   * BACKSPACE
   */
  BACKSPACE: 8,
  /**
   * TAB
   */
  TAB: 9,
  /**
   * NUMLOCK on FF/Safari Mac
   */
  NUM_CENTER: 12,
  // NUMLOCK on FF/Safari Mac
  /**
   * ENTER
   */
  ENTER: 13,
  /**
   * SHIFT
   */
  SHIFT: 16,
  /**
   * CTRL
   */
  CTRL: 17,
  /**
   * ALT
   */
  ALT: 18,
  /**
   * PAUSE
   */
  PAUSE: 19,
  /**
   * CAPS_LOCK
   */
  CAPS_LOCK: 20,
  /**
   * ESC
   */
  ESC: 27,
  /**
   * SPACE
   */
  SPACE: 32,
  /**
   * PAGE_UP
   */
  PAGE_UP: 33,
  // also NUM_NORTH_EAST
  /**
   * PAGE_DOWN
   */
  PAGE_DOWN: 34,
  // also NUM_SOUTH_EAST
  /**
   * END
   */
  END: 35,
  // also NUM_SOUTH_WEST
  /**
   * HOME
   */
  HOME: 36,
  // also NUM_NORTH_WEST
  /**
   * LEFT
   */
  LEFT: 37,
  // also NUM_WEST
  /**
   * UP
   */
  UP: 38,
  // also NUM_NORTH
  /**
   * RIGHT
   */
  RIGHT: 39,
  // also NUM_EAST
  /**
   * DOWN
   */
  DOWN: 40,
  // also NUM_SOUTH
  /**
   * PRINT_SCREEN
   */
  PRINT_SCREEN: 44,
  /**
   * INSERT
   */
  INSERT: 45,
  // also NUM_INSERT
  /**
   * DELETE
   */
  DELETE: 46,
  // also NUM_DELETE
  /**
   * ZERO
   */
  ZERO: 48,
  /**
   * ONE
   */
  ONE: 49,
  /**
   * TWO
   */
  TWO: 50,
  /**
   * THREE
   */
  THREE: 51,
  /**
   * FOUR
   */
  FOUR: 52,
  /**
   * FIVE
   */
  FIVE: 53,
  /**
   * SIX
   */
  SIX: 54,
  /**
   * SEVEN
   */
  SEVEN: 55,
  /**
   * EIGHT
   */
  EIGHT: 56,
  /**
   * NINE
   */
  NINE: 57,
  /**
   * QUESTION_MARK
   */
  QUESTION_MARK: 63,
  // needs localization
  /**
   * A
   */
  A: 65,
  /**
   * B
   */
  B: 66,
  /**
   * C
   */
  C: 67,
  /**
   * D
   */
  D: 68,
  /**
   * E
   */
  E: 69,
  /**
   * F
   */
  F: 70,
  /**
   * G
   */
  G: 71,
  /**
   * H
   */
  H: 72,
  /**
   * I
   */
  I: 73,
  /**
   * J
   */
  J: 74,
  /**
   * K
   */
  K: 75,
  /**
   * L
   */
  L: 76,
  /**
   * M
   */
  M: 77,
  /**
   * N
   */
  N: 78,
  /**
   * O
   */
  O: 79,
  /**
   * P
   */
  P: 80,
  /**
   * Q
   */
  Q: 81,
  /**
   * R
   */
  R: 82,
  /**
   * S
   */
  S: 83,
  /**
   * T
   */
  T: 84,
  /**
   * U
   */
  U: 85,
  /**
   * V
   */
  V: 86,
  /**
   * W
   */
  W: 87,
  /**
   * X
   */
  X: 88,
  /**
   * Y
   */
  Y: 89,
  /**
   * Z
   */
  Z: 90,
  /**
   * META
   */
  META: 91,
  // WIN_KEY_LEFT
  /**
   * WIN_KEY_RIGHT
   */
  WIN_KEY_RIGHT: 92,
  /**
   * CONTEXT_MENU
   */
  CONTEXT_MENU: 93,
  /**
   * NUM_ZERO
   */
  NUM_ZERO: 96,
  /**
   * NUM_ONE
   */
  NUM_ONE: 97,
  /**
   * NUM_TWO
   */
  NUM_TWO: 98,
  /**
   * NUM_THREE
   */
  NUM_THREE: 99,
  /**
   * NUM_FOUR
   */
  NUM_FOUR: 100,
  /**
   * NUM_FIVE
   */
  NUM_FIVE: 101,
  /**
   * NUM_SIX
   */
  NUM_SIX: 102,
  /**
   * NUM_SEVEN
   */
  NUM_SEVEN: 103,
  /**
   * NUM_EIGHT
   */
  NUM_EIGHT: 104,
  /**
   * NUM_NINE
   */
  NUM_NINE: 105,
  /**
   * NUM_MULTIPLY
   */
  NUM_MULTIPLY: 106,
  /**
   * NUM_PLUS
   */
  NUM_PLUS: 107,
  /**
   * NUM_MINUS
   */
  NUM_MINUS: 109,
  /**
   * NUM_PERIOD
   */
  NUM_PERIOD: 110,
  /**
   * NUM_DIVISION
   */
  NUM_DIVISION: 111,
  /**
   * F1
   */
  F1: 112,
  /**
   * F2
   */
  F2: 113,
  /**
   * F3
   */
  F3: 114,
  /**
   * F4
   */
  F4: 115,
  /**
   * F5
   */
  F5: 116,
  /**
   * F6
   */
  F6: 117,
  /**
   * F7
   */
  F7: 118,
  /**
   * F8
   */
  F8: 119,
  /**
   * F9
   */
  F9: 120,
  /**
   * F10
   */
  F10: 121,
  /**
   * F11
   */
  F11: 122,
  /**
   * F12
   */
  F12: 123,
  /**
   * NUMLOCK
   */
  NUMLOCK: 144,
  /**
   * SEMICOLON
   */
  SEMICOLON: 186,
  // needs localization
  /**
   * DASH
   */
  DASH: 189,
  // needs localization
  /**
   * EQUALS
   */
  EQUALS: 187,
  // needs localization
  /**
   * COMMA
   */
  COMMA: 188,
  // needs localization
  /**
   * PERIOD
   */
  PERIOD: 190,
  // needs localization
  /**
   * SLASH
   */
  SLASH: 191,
  // needs localization
  /**
   * APOSTROPHE
   */
  APOSTROPHE: 192,
  // needs localization
  /**
   * SINGLE_QUOTE
   */
  SINGLE_QUOTE: 222,
  // needs localization
  /**
   * OPEN_SQUARE_BRACKET
   */
  OPEN_SQUARE_BRACKET: 219,
  // needs localization
  /**
   * BACKSLASH
   */
  BACKSLASH: 220,
  // needs localization
  /**
   * CLOSE_SQUARE_BRACKET
   */
  CLOSE_SQUARE_BRACKET: 221,
  // needs localization
  /**
   * WIN_KEY
   */
  WIN_KEY: 224,
  /**
   * MAC_FF_META
   */
  MAC_FF_META: 224,
  // Firefox (Gecko) fires this for the meta key instead of 91
  /**
   * WIN_IME
   */
  WIN_IME: 229,
  // ======================== Function ========================
  /**
   * whether text and modified key is entered at the same time.
   */
  isTextModifyingKeyEvent: function isTextModifyingKeyEvent(e) {
    var keyCode = e.keyCode;
    if (e.altKey && !e.ctrlKey || e.metaKey || // Function keys don't generate text
    keyCode >= KeyCode.F1 && keyCode <= KeyCode.F12) {
      return false;
    }
    switch (keyCode) {
      case KeyCode.ALT:
      case KeyCode.CAPS_LOCK:
      case KeyCode.CONTEXT_MENU:
      case KeyCode.CTRL:
      case KeyCode.DOWN:
      case KeyCode.END:
      case KeyCode.ESC:
      case KeyCode.HOME:
      case KeyCode.INSERT:
      case KeyCode.LEFT:
      case KeyCode.MAC_FF_META:
      case KeyCode.META:
      case KeyCode.NUMLOCK:
      case KeyCode.NUM_CENTER:
      case KeyCode.PAGE_DOWN:
      case KeyCode.PAGE_UP:
      case KeyCode.PAUSE:
      case KeyCode.PRINT_SCREEN:
      case KeyCode.RIGHT:
      case KeyCode.SHIFT:
      case KeyCode.UP:
      case KeyCode.WIN_KEY:
      case KeyCode.WIN_KEY_RIGHT:
        return false;
      default:
        return true;
    }
  },
  /**
   * whether character is entered.
   */
  isCharacterKey: function isCharacterKey(keyCode) {
    if (keyCode >= KeyCode.ZERO && keyCode <= KeyCode.NINE) {
      return true;
    }
    if (keyCode >= KeyCode.NUM_ZERO && keyCode <= KeyCode.NUM_MULTIPLY) {
      return true;
    }
    if (keyCode >= KeyCode.A && keyCode <= KeyCode.Z) {
      return true;
    }
    if (window.navigator.userAgent.indexOf("WebKit") !== -1 && keyCode === 0) {
      return true;
    }
    switch (keyCode) {
      case KeyCode.SPACE:
      case KeyCode.QUESTION_MARK:
      case KeyCode.NUM_PLUS:
      case KeyCode.NUM_MINUS:
      case KeyCode.NUM_PERIOD:
      case KeyCode.NUM_DIVISION:
      case KeyCode.SEMICOLON:
      case KeyCode.DASH:
      case KeyCode.EQUALS:
      case KeyCode.COMMA:
      case KeyCode.PERIOD:
      case KeyCode.SLASH:
      case KeyCode.APOSTROPHE:
      case KeyCode.SINGLE_QUOTE:
      case KeyCode.OPEN_SQUARE_BRACKET:
      case KeyCode.BACKSLASH:
      case KeyCode.CLOSE_SQUARE_BRACKET:
        return true;
      default:
        return false;
    }
  }
};
var LoadingOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M988 548c-19.9 0-36-16.1-36-36 0-59.4-11.6-117-34.6-171.3a440.45 440.45 0 00-94.3-139.9 437.71 437.71 0 00-139.9-94.3C629 83.6 571.4 72 512 72c-19.9 0-36-16.1-36-36s16.1-36 36-36c69.1 0 136.2 13.5 199.3 40.3C772.3 66 827 103 874 150c47 47 83.9 101.8 109.7 162.7 26.7 63.1 40.2 130.2 40.2 199.3.1 19.9-16 36-35.9 36z" } }] }, "name": "loading", "theme": "outlined" };
const LoadingOutlinedSvg = LoadingOutlined$2;
var LoadingOutlined = function LoadingOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: LoadingOutlinedSvg
  }));
};
const LoadingOutlined$1 = /* @__PURE__ */ reactExports.forwardRef(LoadingOutlined);
const getCollapsedHeight = () => ({
  height: 0,
  opacity: 0
});
const getRealHeight = (node) => {
  const {
    scrollHeight
  } = node;
  return {
    height: scrollHeight,
    opacity: 1
  };
};
const getCurrentHeight = (node) => ({
  height: node ? node.offsetHeight : 0
});
const skipOpacityTransition = (_, event) => (event === null || event === void 0 ? void 0 : event.deadline) === true || event.propertyName === "height";
const initCollapseMotion = function() {
  let rootCls = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : "ant";
  return {
    motionName: `${rootCls}-motion-collapse`,
    onAppearStart: getCollapsedHeight,
    onEnterStart: getCollapsedHeight,
    onAppearActive: getRealHeight,
    onEnterActive: getRealHeight,
    onLeaveStart: getCurrentHeight,
    onLeaveActive: getCollapsedHeight,
    onAppearEnd: skipOpacityTransition,
    onEnterEnd: skipOpacityTransition,
    onLeaveEnd: skipOpacityTransition,
    motionDeadline: 500
  };
};
const initCollapseMotion$1 = initCollapseMotion;
const genCollapseMotion = (token) => ({
  [token.componentCls]: {
    // For common/openAnimation
    [`${token.antCls}-motion-collapse-legacy`]: {
      overflow: "hidden",
      "&-active": {
        transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important`
      }
    },
    [`${token.antCls}-motion-collapse`]: {
      overflow: "hidden",
      transition: `height ${token.motionDurationMid} ${token.motionEaseInOut},
        opacity ${token.motionDurationMid} ${token.motionEaseInOut} !important`
    }
  }
});
const genCollapseMotion$1 = genCollapseMotion;
var Filler = /* @__PURE__ */ reactExports.forwardRef(function(_ref, ref) {
  var height = _ref.height, offset2 = _ref.offset, children = _ref.children, prefixCls = _ref.prefixCls, onInnerResize = _ref.onInnerResize, innerProps = _ref.innerProps;
  var outerStyle = {};
  var innerStyle = {
    display: "flex",
    flexDirection: "column"
  };
  if (offset2 !== void 0) {
    outerStyle = {
      height,
      position: "relative",
      overflow: "hidden"
    };
    innerStyle = _objectSpread2(_objectSpread2({}, innerStyle), {}, {
      transform: "translateY(".concat(offset2, "px)"),
      position: "absolute",
      left: 0,
      right: 0,
      top: 0
    });
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    style: outerStyle
  }, /* @__PURE__ */ reactExports.createElement(RefResizeObserver, {
    onResize: function onResize2(_ref2) {
      var offsetHeight = _ref2.offsetHeight;
      if (offsetHeight && onInnerResize) {
        onInnerResize();
      }
    }
  }, /* @__PURE__ */ reactExports.createElement("div", _extends({
    style: innerStyle,
    className: classNames(_defineProperty({}, "".concat(prefixCls, "-holder-inner"), prefixCls)),
    ref
  }, innerProps), children)));
});
Filler.displayName = "Filler";
var MIN_SIZE = 20;
function getPageY(e) {
  return "touches" in e ? e.touches[0].pageY : e.pageY;
}
var ScrollBar = /* @__PURE__ */ function(_React$Component) {
  _inherits(ScrollBar2, _React$Component);
  var _super = _createSuper(ScrollBar2);
  function ScrollBar2() {
    var _this;
    _classCallCheck(this, ScrollBar2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.moveRaf = null;
    _this.scrollbarRef = /* @__PURE__ */ reactExports.createRef();
    _this.thumbRef = /* @__PURE__ */ reactExports.createRef();
    _this.visibleTimeout = null;
    _this.state = {
      dragging: false,
      pageY: null,
      startTop: null,
      visible: false
    };
    _this.delayHidden = function() {
      clearTimeout(_this.visibleTimeout);
      _this.setState({
        visible: true
      });
      _this.visibleTimeout = setTimeout(function() {
        _this.setState({
          visible: false
        });
      }, 2e3);
    };
    _this.onScrollbarTouchStart = function(e) {
      e.preventDefault();
    };
    _this.onContainerMouseDown = function(e) {
      e.stopPropagation();
      e.preventDefault();
    };
    _this.patchEvents = function() {
      window.addEventListener("mousemove", _this.onMouseMove);
      window.addEventListener("mouseup", _this.onMouseUp);
      _this.thumbRef.current.addEventListener("touchmove", _this.onMouseMove);
      _this.thumbRef.current.addEventListener("touchend", _this.onMouseUp);
    };
    _this.removeEvents = function() {
      var _this$scrollbarRef$cu;
      window.removeEventListener("mousemove", _this.onMouseMove);
      window.removeEventListener("mouseup", _this.onMouseUp);
      (_this$scrollbarRef$cu = _this.scrollbarRef.current) === null || _this$scrollbarRef$cu === void 0 ? void 0 : _this$scrollbarRef$cu.removeEventListener("touchstart", _this.onScrollbarTouchStart);
      if (_this.thumbRef.current) {
        _this.thumbRef.current.removeEventListener("touchstart", _this.onMouseDown);
        _this.thumbRef.current.removeEventListener("touchmove", _this.onMouseMove);
        _this.thumbRef.current.removeEventListener("touchend", _this.onMouseUp);
      }
      wrapperRaf.cancel(_this.moveRaf);
    };
    _this.onMouseDown = function(e) {
      var onStartMove = _this.props.onStartMove;
      _this.setState({
        dragging: true,
        pageY: getPageY(e),
        startTop: _this.getTop()
      });
      onStartMove();
      _this.patchEvents();
      e.stopPropagation();
      e.preventDefault();
    };
    _this.onMouseMove = function(e) {
      var _this$state = _this.state, dragging = _this$state.dragging, pageY = _this$state.pageY, startTop = _this$state.startTop;
      var onScroll = _this.props.onScroll;
      wrapperRaf.cancel(_this.moveRaf);
      if (dragging) {
        var offsetY = getPageY(e) - pageY;
        var newTop = startTop + offsetY;
        var enableScrollRange = _this.getEnableScrollRange();
        var enableHeightRange = _this.getEnableHeightRange();
        var ptg = enableHeightRange ? newTop / enableHeightRange : 0;
        var newScrollTop = Math.ceil(ptg * enableScrollRange);
        _this.moveRaf = wrapperRaf(function() {
          onScroll(newScrollTop);
        });
      }
    };
    _this.onMouseUp = function() {
      var onStopMove = _this.props.onStopMove;
      _this.setState({
        dragging: false
      });
      onStopMove();
      _this.removeEvents();
    };
    _this.getSpinHeight = function() {
      var _this$props = _this.props, height = _this$props.height, count = _this$props.count;
      var baseHeight = height / count * 10;
      baseHeight = Math.max(baseHeight, MIN_SIZE);
      baseHeight = Math.min(baseHeight, height / 2);
      return Math.floor(baseHeight);
    };
    _this.getEnableScrollRange = function() {
      var _this$props2 = _this.props, scrollHeight = _this$props2.scrollHeight, height = _this$props2.height;
      return scrollHeight - height || 0;
    };
    _this.getEnableHeightRange = function() {
      var height = _this.props.height;
      var spinHeight = _this.getSpinHeight();
      return height - spinHeight || 0;
    };
    _this.getTop = function() {
      var scrollTop = _this.props.scrollTop;
      var enableScrollRange = _this.getEnableScrollRange();
      var enableHeightRange = _this.getEnableHeightRange();
      if (scrollTop === 0 || enableScrollRange === 0) {
        return 0;
      }
      var ptg = scrollTop / enableScrollRange;
      return ptg * enableHeightRange;
    };
    _this.showScroll = function() {
      var _this$props3 = _this.props, height = _this$props3.height, scrollHeight = _this$props3.scrollHeight;
      return scrollHeight > height;
    };
    return _this;
  }
  _createClass(ScrollBar2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.scrollbarRef.current.addEventListener("touchstart", this.onScrollbarTouchStart);
      this.thumbRef.current.addEventListener("touchstart", this.onMouseDown);
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      if (prevProps.scrollTop !== this.props.scrollTop) {
        this.delayHidden();
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      this.removeEvents();
      clearTimeout(this.visibleTimeout);
    }
  }, {
    key: "render",
    value: (
      // ====================== Render =======================
      function render() {
        var _this$state2 = this.state, dragging = _this$state2.dragging, visible = _this$state2.visible;
        var _this$props4 = this.props, prefixCls = _this$props4.prefixCls, direction = _this$props4.direction;
        var spinHeight = this.getSpinHeight();
        var top = this.getTop();
        var canScroll = this.showScroll();
        var mergedVisible = canScroll && visible;
        var scrollBarDirection = direction === "rtl" ? {
          left: 0
        } : {
          right: 0
        };
        return /* @__PURE__ */ reactExports.createElement("div", {
          ref: this.scrollbarRef,
          className: classNames("".concat(prefixCls, "-scrollbar"), _defineProperty({}, "".concat(prefixCls, "-scrollbar-show"), canScroll)),
          style: _objectSpread2(_objectSpread2({
            width: 8,
            top: 0,
            bottom: 0
          }, scrollBarDirection), {}, {
            position: "absolute",
            display: mergedVisible ? null : "none"
          }),
          onMouseDown: this.onContainerMouseDown,
          onMouseMove: this.delayHidden
        }, /* @__PURE__ */ reactExports.createElement("div", {
          ref: this.thumbRef,
          className: classNames("".concat(prefixCls, "-scrollbar-thumb"), _defineProperty({}, "".concat(prefixCls, "-scrollbar-thumb-moving"), dragging)),
          style: {
            width: "100%",
            height: spinHeight,
            top,
            left: 0,
            position: "absolute",
            background: "rgba(0, 0, 0, 0.5)",
            borderRadius: 99,
            cursor: "pointer",
            userSelect: "none"
          },
          onMouseDown: this.onMouseDown
        }));
      }
    )
  }]);
  return ScrollBar2;
}(reactExports.Component);
function Item(_ref) {
  var children = _ref.children, setRef = _ref.setRef;
  var refFunc = reactExports.useCallback(function(node) {
    setRef(node);
  }, []);
  return /* @__PURE__ */ reactExports.cloneElement(children, {
    ref: refFunc
  });
}
function useChildren(list, startIndex, endIndex, setNodeRef, renderFunc, _ref) {
  var getKey2 = _ref.getKey;
  return list.slice(startIndex, endIndex + 1).map(function(item2, index2) {
    var eleIndex = startIndex + index2;
    var node = renderFunc(item2, eleIndex, {
      // style: status === 'MEASURE_START' ? { visibility: 'hidden' } : {},
    });
    var key = getKey2(item2);
    return /* @__PURE__ */ reactExports.createElement(Item, {
      key,
      setRef: function setRef(ele) {
        return setNodeRef(item2, ele);
      }
    }, node);
  });
}
var CacheMap = /* @__PURE__ */ function() {
  function CacheMap2() {
    _classCallCheck(this, CacheMap2);
    this.maps = void 0;
    this.maps = /* @__PURE__ */ Object.create(null);
  }
  _createClass(CacheMap2, [{
    key: "set",
    value: function set(key, value) {
      this.maps[key] = value;
    }
  }, {
    key: "get",
    value: function get(key) {
      return this.maps[key];
    }
  }]);
  return CacheMap2;
}();
function useHeights(getKey2, onItemAdd, onItemRemove) {
  var _React$useState = reactExports.useState(0), _React$useState2 = _slicedToArray(_React$useState, 2), updatedMark = _React$useState2[0], setUpdatedMark = _React$useState2[1];
  var instanceRef = reactExports.useRef(/* @__PURE__ */ new Map());
  var heightsRef = reactExports.useRef(new CacheMap());
  var collectRafRef = reactExports.useRef();
  function cancelRaf() {
    wrapperRaf.cancel(collectRafRef.current);
  }
  function collectHeight() {
    cancelRaf();
    collectRafRef.current = wrapperRaf(function() {
      instanceRef.current.forEach(function(element, key) {
        if (element && element.offsetParent) {
          var htmlElement = findDOMNode(element);
          var offsetHeight = htmlElement.offsetHeight;
          if (heightsRef.current.get(key) !== offsetHeight) {
            heightsRef.current.set(key, htmlElement.offsetHeight);
          }
        }
      });
      setUpdatedMark(function(c) {
        return c + 1;
      });
    });
  }
  function setInstanceRef(item2, instance) {
    var key = getKey2(item2);
    var origin = instanceRef.current.get(key);
    if (instance) {
      instanceRef.current.set(key, instance);
      collectHeight();
    } else {
      instanceRef.current.delete(key);
    }
    if (!origin !== !instance) {
      if (instance) {
        onItemAdd === null || onItemAdd === void 0 ? void 0 : onItemAdd(item2);
      } else {
        onItemRemove === null || onItemRemove === void 0 ? void 0 : onItemRemove(item2);
      }
    }
  }
  reactExports.useEffect(function() {
    return cancelRaf;
  }, []);
  return [setInstanceRef, collectHeight, heightsRef.current, updatedMark];
}
function useScrollTo(containerRef, data, heights, itemHeight, getKey2, collectHeight, syncScrollTop, triggerFlash) {
  var scrollRef = reactExports.useRef();
  return function(arg) {
    if (arg === null || arg === void 0) {
      triggerFlash();
      return;
    }
    wrapperRaf.cancel(scrollRef.current);
    if (typeof arg === "number") {
      syncScrollTop(arg);
    } else if (arg && _typeof(arg) === "object") {
      var index2;
      var align = arg.align;
      if ("index" in arg) {
        index2 = arg.index;
      } else {
        index2 = data.findIndex(function(item2) {
          return getKey2(item2) === arg.key;
        });
      }
      var _arg$offset = arg.offset, offset2 = _arg$offset === void 0 ? 0 : _arg$offset;
      var syncScroll = function syncScroll2(times, targetAlign) {
        if (times < 0 || !containerRef.current)
          return;
        var height = containerRef.current.clientHeight;
        var needCollectHeight = false;
        var newTargetAlign = targetAlign;
        if (height) {
          var mergedAlign = targetAlign || align;
          var stackTop = 0;
          var itemTop = 0;
          var itemBottom = 0;
          var maxLen = Math.min(data.length, index2);
          for (var i = 0; i <= maxLen; i += 1) {
            var key = getKey2(data[i]);
            itemTop = stackTop;
            var cacheHeight = heights.get(key);
            itemBottom = itemTop + (cacheHeight === void 0 ? itemHeight : cacheHeight);
            stackTop = itemBottom;
            if (i === index2 && cacheHeight === void 0) {
              needCollectHeight = true;
            }
          }
          var targetTop = null;
          switch (mergedAlign) {
            case "top":
              targetTop = itemTop - offset2;
              break;
            case "bottom":
              targetTop = itemBottom - height + offset2;
              break;
            default: {
              var scrollTop = containerRef.current.scrollTop;
              var scrollBottom = scrollTop + height;
              if (itemTop < scrollTop) {
                newTargetAlign = "top";
              } else if (itemBottom > scrollBottom) {
                newTargetAlign = "bottom";
              }
            }
          }
          if (targetTop !== null && targetTop !== containerRef.current.scrollTop) {
            syncScrollTop(targetTop);
          }
        }
        scrollRef.current = wrapperRaf(function() {
          if (needCollectHeight) {
            collectHeight();
          }
          syncScroll2(times - 1, newTargetAlign);
        }, 2);
      };
      syncScroll(3);
    }
  };
}
function findListDiffIndex(originList, targetList, getKey2) {
  var originLen = originList.length;
  var targetLen = targetList.length;
  var shortList;
  var longList;
  if (originLen === 0 && targetLen === 0) {
    return null;
  }
  if (originLen < targetLen) {
    shortList = originList;
    longList = targetList;
  } else {
    shortList = targetList;
    longList = originList;
  }
  var notExistKey = {
    __EMPTY_ITEM__: true
  };
  function getItemKey(item2) {
    if (item2 !== void 0) {
      return getKey2(item2);
    }
    return notExistKey;
  }
  var diffIndex = null;
  var multiple = Math.abs(originLen - targetLen) !== 1;
  for (var i = 0; i < longList.length; i += 1) {
    var shortKey = getItemKey(shortList[i]);
    var longKey = getItemKey(longList[i]);
    if (shortKey !== longKey) {
      diffIndex = i;
      multiple = multiple || shortKey !== getItemKey(longList[i + 1]);
      break;
    }
  }
  return diffIndex === null ? null : {
    index: diffIndex,
    multiple
  };
}
function useDiffItem(data, getKey2, onDiff) {
  var _React$useState = reactExports.useState(data), _React$useState2 = _slicedToArray(_React$useState, 2), prevData = _React$useState2[0], setPrevData = _React$useState2[1];
  var _React$useState3 = reactExports.useState(null), _React$useState4 = _slicedToArray(_React$useState3, 2), diffItem = _React$useState4[0], setDiffItem = _React$useState4[1];
  reactExports.useEffect(function() {
    var diff = findListDiffIndex(prevData || [], data || [], getKey2);
    if ((diff === null || diff === void 0 ? void 0 : diff.index) !== void 0) {
      onDiff === null || onDiff === void 0 ? void 0 : onDiff(diff.index);
      setDiffItem(data[diff.index]);
    }
    setPrevData(data);
  }, [data]);
  return [diffItem];
}
var isFF = (typeof navigator === "undefined" ? "undefined" : _typeof(navigator)) === "object" && /Firefox/i.test(navigator.userAgent);
const useOriginScroll = function(isScrollAtTop, isScrollAtBottom) {
  var lockRef = reactExports.useRef(false);
  var lockTimeoutRef = reactExports.useRef(null);
  function lockScroll() {
    clearTimeout(lockTimeoutRef.current);
    lockRef.current = true;
    lockTimeoutRef.current = setTimeout(function() {
      lockRef.current = false;
    }, 50);
  }
  var scrollPingRef = reactExports.useRef({
    top: isScrollAtTop,
    bottom: isScrollAtBottom
  });
  scrollPingRef.current.top = isScrollAtTop;
  scrollPingRef.current.bottom = isScrollAtBottom;
  return function(deltaY) {
    var smoothOffset = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    var originScroll = (
      // Pass origin wheel when on the top
      deltaY < 0 && scrollPingRef.current.top || // Pass origin wheel when on the bottom
      deltaY > 0 && scrollPingRef.current.bottom
    );
    if (smoothOffset && originScroll) {
      clearTimeout(lockTimeoutRef.current);
      lockRef.current = false;
    } else if (!originScroll || lockRef.current) {
      lockScroll();
    }
    return !lockRef.current && originScroll;
  };
};
function useFrameWheel(inVirtual, isScrollAtTop, isScrollAtBottom, onWheelDelta) {
  var offsetRef = reactExports.useRef(0);
  var nextFrameRef = reactExports.useRef(null);
  var wheelValueRef = reactExports.useRef(null);
  var isMouseScrollRef = reactExports.useRef(false);
  var originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom);
  function onWheel(event) {
    if (!inVirtual)
      return;
    wrapperRaf.cancel(nextFrameRef.current);
    var deltaY = event.deltaY;
    offsetRef.current += deltaY;
    wheelValueRef.current = deltaY;
    if (originScroll(deltaY))
      return;
    if (!isFF) {
      event.preventDefault();
    }
    nextFrameRef.current = wrapperRaf(function() {
      var patchMultiple = isMouseScrollRef.current ? 10 : 1;
      onWheelDelta(offsetRef.current * patchMultiple);
      offsetRef.current = 0;
    });
  }
  function onFireFoxScroll(event) {
    if (!inVirtual)
      return;
    isMouseScrollRef.current = event.detail === wheelValueRef.current;
  }
  return [onWheel, onFireFoxScroll];
}
var SMOOTH_PTG = 14 / 15;
function useMobileTouchMove(inVirtual, listRef, callback) {
  var touchedRef = reactExports.useRef(false);
  var touchYRef = reactExports.useRef(0);
  var elementRef = reactExports.useRef(null);
  var intervalRef = reactExports.useRef(null);
  var cleanUpEvents;
  var onTouchMove = function onTouchMove2(e) {
    if (touchedRef.current) {
      var currentY = Math.ceil(e.touches[0].pageY);
      var offsetY = touchYRef.current - currentY;
      touchYRef.current = currentY;
      if (callback(offsetY)) {
        e.preventDefault();
      }
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(function() {
        offsetY *= SMOOTH_PTG;
        if (!callback(offsetY, true) || Math.abs(offsetY) <= 0.1) {
          clearInterval(intervalRef.current);
        }
      }, 16);
    }
  };
  var onTouchEnd = function onTouchEnd2() {
    touchedRef.current = false;
    cleanUpEvents();
  };
  var onTouchStart = function onTouchStart2(e) {
    cleanUpEvents();
    if (e.touches.length === 1 && !touchedRef.current) {
      touchedRef.current = true;
      touchYRef.current = Math.ceil(e.touches[0].pageY);
      elementRef.current = e.target;
      elementRef.current.addEventListener("touchmove", onTouchMove);
      elementRef.current.addEventListener("touchend", onTouchEnd);
    }
  };
  cleanUpEvents = function cleanUpEvents2() {
    if (elementRef.current) {
      elementRef.current.removeEventListener("touchmove", onTouchMove);
      elementRef.current.removeEventListener("touchend", onTouchEnd);
    }
  };
  useLayoutEffect(function() {
    if (inVirtual) {
      listRef.current.addEventListener("touchstart", onTouchStart);
    }
    return function() {
      var _listRef$current;
      (_listRef$current = listRef.current) === null || _listRef$current === void 0 ? void 0 : _listRef$current.removeEventListener("touchstart", onTouchStart);
      cleanUpEvents();
      clearInterval(intervalRef.current);
    };
  }, [inVirtual]);
}
var _excluded$4 = ["prefixCls", "className", "height", "itemHeight", "fullHeight", "style", "data", "children", "itemKey", "virtual", "direction", "component", "onScroll", "onVisibleChange", "innerProps"];
var EMPTY_DATA = [];
var ScrollStyle = {
  overflowY: "auto",
  overflowAnchor: "none"
};
function RawList(props, ref) {
  var _props$prefixCls = props.prefixCls, prefixCls = _props$prefixCls === void 0 ? "rc-virtual-list" : _props$prefixCls, className = props.className, height = props.height, itemHeight = props.itemHeight, _props$fullHeight = props.fullHeight, fullHeight = _props$fullHeight === void 0 ? true : _props$fullHeight, style2 = props.style, data = props.data, children = props.children, itemKey2 = props.itemKey, virtual = props.virtual, direction = props.direction, _props$component = props.component, Component = _props$component === void 0 ? "div" : _props$component, onScroll = props.onScroll, onVisibleChange = props.onVisibleChange, innerProps = props.innerProps, restProps = _objectWithoutProperties(props, _excluded$4);
  var useVirtual = !!(virtual !== false && height && itemHeight);
  var inVirtual = useVirtual && data && itemHeight * data.length > height;
  var _useState = reactExports.useState(0), _useState2 = _slicedToArray(_useState, 2), scrollTop = _useState2[0], setScrollTop = _useState2[1];
  var _useState3 = reactExports.useState(false), _useState4 = _slicedToArray(_useState3, 2), scrollMoving = _useState4[0], setScrollMoving = _useState4[1];
  var mergedClassName = classNames(prefixCls, _defineProperty({}, "".concat(prefixCls, "-rtl"), direction === "rtl"), className);
  var mergedData = data || EMPTY_DATA;
  var componentRef = reactExports.useRef();
  var fillerInnerRef = reactExports.useRef();
  var scrollBarRef = reactExports.useRef();
  var getKey2 = reactExports.useCallback(function(item2) {
    if (typeof itemKey2 === "function") {
      return itemKey2(item2);
    }
    return item2 === null || item2 === void 0 ? void 0 : item2[itemKey2];
  }, [itemKey2]);
  var sharedConfig = {
    getKey: getKey2
  };
  function syncScrollTop(newTop) {
    setScrollTop(function(origin) {
      var value;
      if (typeof newTop === "function") {
        value = newTop(origin);
      } else {
        value = newTop;
      }
      var alignedTop = keepInRange(value);
      componentRef.current.scrollTop = alignedTop;
      return alignedTop;
    });
  }
  var rangeRef = reactExports.useRef({
    start: 0,
    end: mergedData.length
  });
  var diffItemRef = reactExports.useRef();
  var _useDiffItem = useDiffItem(mergedData, getKey2), _useDiffItem2 = _slicedToArray(_useDiffItem, 1), diffItem = _useDiffItem2[0];
  diffItemRef.current = diffItem;
  var _useHeights = useHeights(getKey2, null, null), _useHeights2 = _slicedToArray(_useHeights, 4), setInstanceRef = _useHeights2[0], collectHeight = _useHeights2[1], heights = _useHeights2[2], heightUpdatedMark = _useHeights2[3];
  var _React$useMemo = reactExports.useMemo(function() {
    if (!useVirtual) {
      return {
        scrollHeight: void 0,
        start: 0,
        end: mergedData.length - 1,
        offset: void 0
      };
    }
    if (!inVirtual) {
      var _fillerInnerRef$curre;
      return {
        scrollHeight: ((_fillerInnerRef$curre = fillerInnerRef.current) === null || _fillerInnerRef$curre === void 0 ? void 0 : _fillerInnerRef$curre.offsetHeight) || 0,
        start: 0,
        end: mergedData.length - 1,
        offset: void 0
      };
    }
    var itemTop = 0;
    var startIndex;
    var startOffset;
    var endIndex;
    var dataLen = mergedData.length;
    for (var i = 0; i < dataLen; i += 1) {
      var item2 = mergedData[i];
      var key = getKey2(item2);
      var cacheHeight = heights.get(key);
      var currentItemBottom = itemTop + (cacheHeight === void 0 ? itemHeight : cacheHeight);
      if (currentItemBottom >= scrollTop && startIndex === void 0) {
        startIndex = i;
        startOffset = itemTop;
      }
      if (currentItemBottom > scrollTop + height && endIndex === void 0) {
        endIndex = i;
      }
      itemTop = currentItemBottom;
    }
    if (startIndex === void 0) {
      startIndex = 0;
      startOffset = 0;
      endIndex = Math.ceil(height / itemHeight);
    }
    if (endIndex === void 0) {
      endIndex = mergedData.length - 1;
    }
    endIndex = Math.min(endIndex + 1, mergedData.length);
    return {
      scrollHeight: itemTop,
      start: startIndex,
      end: endIndex,
      offset: startOffset
    };
  }, [inVirtual, useVirtual, scrollTop, mergedData, heightUpdatedMark, height]), scrollHeight = _React$useMemo.scrollHeight, start = _React$useMemo.start, end = _React$useMemo.end, offset2 = _React$useMemo.offset;
  rangeRef.current.start = start;
  rangeRef.current.end = end;
  var maxScrollHeight = scrollHeight - height;
  var maxScrollHeightRef = reactExports.useRef(maxScrollHeight);
  maxScrollHeightRef.current = maxScrollHeight;
  function keepInRange(newScrollTop) {
    var newTop = newScrollTop;
    if (!Number.isNaN(maxScrollHeightRef.current)) {
      newTop = Math.min(newTop, maxScrollHeightRef.current);
    }
    newTop = Math.max(newTop, 0);
    return newTop;
  }
  var isScrollAtTop = scrollTop <= 0;
  var isScrollAtBottom = scrollTop >= maxScrollHeight;
  var originScroll = useOriginScroll(isScrollAtTop, isScrollAtBottom);
  function onScrollBar(newScrollTop) {
    var newTop = newScrollTop;
    syncScrollTop(newTop);
  }
  function onFallbackScroll(e) {
    var newScrollTop = e.currentTarget.scrollTop;
    if (newScrollTop !== scrollTop) {
      syncScrollTop(newScrollTop);
    }
    onScroll === null || onScroll === void 0 ? void 0 : onScroll(e);
  }
  var _useFrameWheel = useFrameWheel(useVirtual, isScrollAtTop, isScrollAtBottom, function(offsetY) {
    syncScrollTop(function(top) {
      var newTop = top + offsetY;
      return newTop;
    });
  }), _useFrameWheel2 = _slicedToArray(_useFrameWheel, 2), onRawWheel = _useFrameWheel2[0], onFireFoxScroll = _useFrameWheel2[1];
  useMobileTouchMove(useVirtual, componentRef, function(deltaY, smoothOffset) {
    if (originScroll(deltaY, smoothOffset)) {
      return false;
    }
    onRawWheel({
      preventDefault: function preventDefault() {
      },
      deltaY
    });
    return true;
  });
  useLayoutEffect(function() {
    function onMozMousePixelScroll(e) {
      if (useVirtual) {
        e.preventDefault();
      }
    }
    componentRef.current.addEventListener("wheel", onRawWheel);
    componentRef.current.addEventListener("DOMMouseScroll", onFireFoxScroll);
    componentRef.current.addEventListener("MozMousePixelScroll", onMozMousePixelScroll);
    return function() {
      if (componentRef.current) {
        componentRef.current.removeEventListener("wheel", onRawWheel);
        componentRef.current.removeEventListener("DOMMouseScroll", onFireFoxScroll);
        componentRef.current.removeEventListener("MozMousePixelScroll", onMozMousePixelScroll);
      }
    };
  }, [useVirtual]);
  var scrollTo = useScrollTo(componentRef, mergedData, heights, itemHeight, getKey2, collectHeight, syncScrollTop, function() {
    var _scrollBarRef$current;
    (_scrollBarRef$current = scrollBarRef.current) === null || _scrollBarRef$current === void 0 ? void 0 : _scrollBarRef$current.delayHidden();
  });
  reactExports.useImperativeHandle(ref, function() {
    return {
      scrollTo
    };
  });
  useLayoutEffect(function() {
    if (onVisibleChange) {
      var renderList = mergedData.slice(start, end + 1);
      onVisibleChange(renderList, mergedData);
    }
  }, [start, end, mergedData]);
  var listChildren = useChildren(mergedData, start, end, setInstanceRef, children, sharedConfig);
  var componentStyle = null;
  if (height) {
    componentStyle = _objectSpread2(_defineProperty({}, fullHeight ? "height" : "maxHeight", height), ScrollStyle);
    if (useVirtual) {
      componentStyle.overflowY = "hidden";
      if (scrollMoving) {
        componentStyle.pointerEvents = "none";
      }
    }
  }
  return /* @__PURE__ */ reactExports.createElement("div", _extends({
    style: _objectSpread2(_objectSpread2({}, style2), {}, {
      position: "relative"
    }),
    className: mergedClassName
  }, restProps), /* @__PURE__ */ reactExports.createElement(Component, {
    className: "".concat(prefixCls, "-holder"),
    style: componentStyle,
    ref: componentRef,
    onScroll: onFallbackScroll
  }, /* @__PURE__ */ reactExports.createElement(Filler, {
    prefixCls,
    height: scrollHeight,
    offset: offset2,
    onInnerResize: collectHeight,
    ref: fillerInnerRef,
    innerProps
  }, listChildren)), useVirtual && /* @__PURE__ */ reactExports.createElement(ScrollBar, {
    ref: scrollBarRef,
    prefixCls,
    scrollTop,
    height,
    scrollHeight,
    count: mergedData.length,
    direction,
    onScroll: onScrollBar,
    onStartMove: function onStartMove() {
      setScrollMoving(true);
    },
    onStopMove: function onStopMove() {
      setScrollMoving(false);
    }
  }));
}
var List = /* @__PURE__ */ reactExports.forwardRef(RawList);
List.displayName = "List";
function removeFromCheckedKeys(halfCheckedKeys, checkedKeys) {
  var filteredKeys = /* @__PURE__ */ new Set();
  halfCheckedKeys.forEach(function(key) {
    if (!checkedKeys.has(key)) {
      filteredKeys.add(key);
    }
  });
  return filteredKeys;
}
function isCheckDisabled(node) {
  var _ref = node || {}, disabled = _ref.disabled, disableCheckbox = _ref.disableCheckbox, checkable = _ref.checkable;
  return !!(disabled || disableCheckbox) || checkable === false;
}
function fillConductCheck(keys, levelEntities, maxLevel, syntheticGetCheckDisabled) {
  var checkedKeys = new Set(keys);
  var halfCheckedKeys = /* @__PURE__ */ new Set();
  for (var level = 0; level <= maxLevel; level += 1) {
    var entities = levelEntities.get(level) || /* @__PURE__ */ new Set();
    entities.forEach(function(entity) {
      var key = entity.key, node = entity.node, _entity$children = entity.children, children = _entity$children === void 0 ? [] : _entity$children;
      if (checkedKeys.has(key) && !syntheticGetCheckDisabled(node)) {
        children.filter(function(childEntity) {
          return !syntheticGetCheckDisabled(childEntity.node);
        }).forEach(function(childEntity) {
          checkedKeys.add(childEntity.key);
        });
      }
    });
  }
  var visitedKeys = /* @__PURE__ */ new Set();
  for (var _level = maxLevel; _level >= 0; _level -= 1) {
    var _entities = levelEntities.get(_level) || /* @__PURE__ */ new Set();
    _entities.forEach(function(entity) {
      var parent = entity.parent, node = entity.node;
      if (syntheticGetCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) {
        return;
      }
      if (syntheticGetCheckDisabled(entity.parent.node)) {
        visitedKeys.add(parent.key);
        return;
      }
      var allChecked = true;
      var partialChecked = false;
      (parent.children || []).filter(function(childEntity) {
        return !syntheticGetCheckDisabled(childEntity.node);
      }).forEach(function(_ref2) {
        var key = _ref2.key;
        var checked = checkedKeys.has(key);
        if (allChecked && !checked) {
          allChecked = false;
        }
        if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
          partialChecked = true;
        }
      });
      if (allChecked) {
        checkedKeys.add(parent.key);
      }
      if (partialChecked) {
        halfCheckedKeys.add(parent.key);
      }
      visitedKeys.add(parent.key);
    });
  }
  return {
    checkedKeys: Array.from(checkedKeys),
    halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys))
  };
}
function cleanConductCheck(keys, halfKeys, levelEntities, maxLevel, syntheticGetCheckDisabled) {
  var checkedKeys = new Set(keys);
  var halfCheckedKeys = new Set(halfKeys);
  for (var level = 0; level <= maxLevel; level += 1) {
    var entities = levelEntities.get(level) || /* @__PURE__ */ new Set();
    entities.forEach(function(entity) {
      var key = entity.key, node = entity.node, _entity$children2 = entity.children, children = _entity$children2 === void 0 ? [] : _entity$children2;
      if (!checkedKeys.has(key) && !halfCheckedKeys.has(key) && !syntheticGetCheckDisabled(node)) {
        children.filter(function(childEntity) {
          return !syntheticGetCheckDisabled(childEntity.node);
        }).forEach(function(childEntity) {
          checkedKeys.delete(childEntity.key);
        });
      }
    });
  }
  halfCheckedKeys = /* @__PURE__ */ new Set();
  var visitedKeys = /* @__PURE__ */ new Set();
  for (var _level2 = maxLevel; _level2 >= 0; _level2 -= 1) {
    var _entities2 = levelEntities.get(_level2) || /* @__PURE__ */ new Set();
    _entities2.forEach(function(entity) {
      var parent = entity.parent, node = entity.node;
      if (syntheticGetCheckDisabled(node) || !entity.parent || visitedKeys.has(entity.parent.key)) {
        return;
      }
      if (syntheticGetCheckDisabled(entity.parent.node)) {
        visitedKeys.add(parent.key);
        return;
      }
      var allChecked = true;
      var partialChecked = false;
      (parent.children || []).filter(function(childEntity) {
        return !syntheticGetCheckDisabled(childEntity.node);
      }).forEach(function(_ref3) {
        var key = _ref3.key;
        var checked = checkedKeys.has(key);
        if (allChecked && !checked) {
          allChecked = false;
        }
        if (!partialChecked && (checked || halfCheckedKeys.has(key))) {
          partialChecked = true;
        }
      });
      if (!allChecked) {
        checkedKeys.delete(parent.key);
      }
      if (partialChecked) {
        halfCheckedKeys.add(parent.key);
      }
      visitedKeys.add(parent.key);
    });
  }
  return {
    checkedKeys: Array.from(checkedKeys),
    halfCheckedKeys: Array.from(removeFromCheckedKeys(halfCheckedKeys, checkedKeys))
  };
}
function conductCheck(keyList, checked, keyEntities, getCheckDisabled) {
  var warningMissKeys = [];
  var syntheticGetCheckDisabled;
  if (getCheckDisabled) {
    syntheticGetCheckDisabled = getCheckDisabled;
  } else {
    syntheticGetCheckDisabled = isCheckDisabled;
  }
  var keys = new Set(keyList.filter(function(key) {
    var hasEntity = !!keyEntities[key];
    if (!hasEntity) {
      warningMissKeys.push(key);
    }
    return hasEntity;
  }));
  var levelEntities = /* @__PURE__ */ new Map();
  var maxLevel = 0;
  Object.keys(keyEntities).forEach(function(key) {
    var entity = keyEntities[key];
    var level = entity.level;
    var levelSet = levelEntities.get(level);
    if (!levelSet) {
      levelSet = /* @__PURE__ */ new Set();
      levelEntities.set(level, levelSet);
    }
    levelSet.add(entity);
    maxLevel = Math.max(maxLevel, level);
  });
  warningOnce(!warningMissKeys.length, "Tree missing follow keys: ".concat(warningMissKeys.slice(0, 100).map(function(key) {
    return "'".concat(key, "'");
  }).join(", ")));
  var result;
  if (checked === true) {
    result = fillConductCheck(keys, levelEntities, maxLevel, syntheticGetCheckDisabled);
  } else {
    result = cleanConductCheck(keys, checked.halfCheckedKeys, levelEntities, maxLevel, syntheticGetCheckDisabled);
  }
  return result;
}
var _excluded$3 = ["children"];
function getPosition(level, index2) {
  return "".concat(level, "-").concat(index2);
}
function isTreeNode(node) {
  return node && node.type && node.type.isTreeNode;
}
function getKey(key, pos) {
  if (key !== null && key !== void 0) {
    return key;
  }
  return pos;
}
function fillFieldNames(fieldNames) {
  var _ref = fieldNames || {}, title = _ref.title, _title = _ref._title, key = _ref.key, children = _ref.children;
  var mergedTitle = title || "title";
  return {
    title: mergedTitle,
    _title: _title || [mergedTitle],
    key: key || "key",
    children: children || "children"
  };
}
function convertTreeToData(rootNodes) {
  function dig(node) {
    var treeNodes = toArray(node);
    return treeNodes.map(function(treeNode) {
      if (!isTreeNode(treeNode)) {
        warningOnce(!treeNode, "Tree/TreeNode can only accept TreeNode as children.");
        return null;
      }
      var key = treeNode.key;
      var _treeNode$props = treeNode.props, children = _treeNode$props.children, rest = _objectWithoutProperties(_treeNode$props, _excluded$3);
      var dataNode = _objectSpread2({
        key
      }, rest);
      var parsedChildren = dig(children);
      if (parsedChildren.length) {
        dataNode.children = parsedChildren;
      }
      return dataNode;
    }).filter(function(dataNode) {
      return dataNode;
    });
  }
  return dig(rootNodes);
}
function flattenTreeData(treeNodeList, expandedKeys, fieldNames) {
  var _fillFieldNames = fillFieldNames(fieldNames), fieldTitles = _fillFieldNames._title, fieldKey = _fillFieldNames.key, fieldChildren = _fillFieldNames.children;
  var expandedKeySet = new Set(expandedKeys === true ? [] : expandedKeys);
  var flattenList = [];
  function dig(list) {
    var parent = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : null;
    return list.map(function(treeNode, index2) {
      var pos = getPosition(parent ? parent.pos : "0", index2);
      var mergedKey = getKey(treeNode[fieldKey], pos);
      var mergedTitle;
      for (var i = 0; i < fieldTitles.length; i += 1) {
        var fieldTitle = fieldTitles[i];
        if (treeNode[fieldTitle] !== void 0) {
          mergedTitle = treeNode[fieldTitle];
          break;
        }
      }
      var flattenNode = _objectSpread2(_objectSpread2({}, omit(treeNode, [].concat(_toConsumableArray(fieldTitles), [fieldKey, fieldChildren]))), {}, {
        title: mergedTitle,
        key: mergedKey,
        parent,
        pos,
        children: null,
        data: treeNode,
        isStart: [].concat(_toConsumableArray(parent ? parent.isStart : []), [index2 === 0]),
        isEnd: [].concat(_toConsumableArray(parent ? parent.isEnd : []), [index2 === list.length - 1])
      });
      flattenList.push(flattenNode);
      if (expandedKeys === true || expandedKeySet.has(mergedKey)) {
        flattenNode.children = dig(treeNode[fieldChildren] || [], flattenNode);
      } else {
        flattenNode.children = [];
      }
      return flattenNode;
    });
  }
  dig(treeNodeList);
  return flattenList;
}
function traverseDataNodes(dataNodes, callback, config) {
  var mergedConfig = {};
  if (_typeof(config) === "object") {
    mergedConfig = config;
  } else {
    mergedConfig = {
      externalGetKey: config
    };
  }
  mergedConfig = mergedConfig || {};
  var _mergedConfig = mergedConfig, childrenPropName = _mergedConfig.childrenPropName, externalGetKey = _mergedConfig.externalGetKey, fieldNames = _mergedConfig.fieldNames;
  var _fillFieldNames2 = fillFieldNames(fieldNames), fieldKey = _fillFieldNames2.key, fieldChildren = _fillFieldNames2.children;
  var mergeChildrenPropName = childrenPropName || fieldChildren;
  var syntheticGetKey;
  if (externalGetKey) {
    if (typeof externalGetKey === "string") {
      syntheticGetKey = function syntheticGetKey2(node) {
        return node[externalGetKey];
      };
    } else if (typeof externalGetKey === "function") {
      syntheticGetKey = function syntheticGetKey2(node) {
        return externalGetKey(node);
      };
    }
  } else {
    syntheticGetKey = function syntheticGetKey2(node, pos) {
      return getKey(node[fieldKey], pos);
    };
  }
  function processNode(node, index2, parent, pathNodes) {
    var children = node ? node[mergeChildrenPropName] : dataNodes;
    var pos = node ? getPosition(parent.pos, index2) : "0";
    var connectNodes = node ? [].concat(_toConsumableArray(pathNodes), [node]) : [];
    if (node) {
      var key = syntheticGetKey(node, pos);
      var data = {
        node,
        index: index2,
        pos,
        key,
        parentPos: parent.node ? parent.pos : null,
        level: parent.level + 1,
        nodes: connectNodes
      };
      callback(data);
    }
    if (children) {
      children.forEach(function(subNode, subIndex) {
        processNode(subNode, subIndex, {
          node,
          pos,
          level: parent ? parent.level + 1 : -1
        }, connectNodes);
      });
    }
  }
  processNode(null);
}
function convertDataToEntities(dataNodes) {
  var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {}, initWrapper = _ref2.initWrapper, processEntity = _ref2.processEntity, onProcessFinished = _ref2.onProcessFinished, externalGetKey = _ref2.externalGetKey, childrenPropName = _ref2.childrenPropName, fieldNames = _ref2.fieldNames;
  var legacyExternalGetKey = arguments.length > 2 ? arguments[2] : void 0;
  var mergedExternalGetKey = externalGetKey || legacyExternalGetKey;
  var posEntities = {};
  var keyEntities = {};
  var wrapper = {
    posEntities,
    keyEntities
  };
  if (initWrapper) {
    wrapper = initWrapper(wrapper) || wrapper;
  }
  traverseDataNodes(dataNodes, function(item2) {
    var node = item2.node, index2 = item2.index, pos = item2.pos, key = item2.key, parentPos = item2.parentPos, level = item2.level, nodes = item2.nodes;
    var entity = {
      node,
      nodes,
      index: index2,
      key,
      pos,
      level
    };
    var mergedKey = getKey(key, pos);
    posEntities[pos] = entity;
    keyEntities[mergedKey] = entity;
    entity.parent = posEntities[parentPos];
    if (entity.parent) {
      entity.parent.children = entity.parent.children || [];
      entity.parent.children.push(entity);
    }
    if (processEntity) {
      processEntity(entity, wrapper);
    }
  }, {
    externalGetKey: mergedExternalGetKey,
    childrenPropName,
    fieldNames
  });
  if (onProcessFinished) {
    onProcessFinished(wrapper);
  }
  return wrapper;
}
function getTreeNodeProps(key, _ref3) {
  var expandedKeys = _ref3.expandedKeys, selectedKeys = _ref3.selectedKeys, loadedKeys = _ref3.loadedKeys, loadingKeys = _ref3.loadingKeys, checkedKeys = _ref3.checkedKeys, halfCheckedKeys = _ref3.halfCheckedKeys, dragOverNodeKey = _ref3.dragOverNodeKey, dropPosition = _ref3.dropPosition, keyEntities = _ref3.keyEntities;
  var entity = keyEntities[key];
  var treeNodeProps = {
    eventKey: key,
    expanded: expandedKeys.indexOf(key) !== -1,
    selected: selectedKeys.indexOf(key) !== -1,
    loaded: loadedKeys.indexOf(key) !== -1,
    loading: loadingKeys.indexOf(key) !== -1,
    checked: checkedKeys.indexOf(key) !== -1,
    halfChecked: halfCheckedKeys.indexOf(key) !== -1,
    pos: String(entity ? entity.pos : ""),
    // [Legacy] Drag props
    // Since the interaction of drag is changed, the semantic of the props are
    // not accuracy, I think it should be finally removed
    dragOver: dragOverNodeKey === key && dropPosition === 0,
    dragOverGapTop: dragOverNodeKey === key && dropPosition === -1,
    dragOverGapBottom: dragOverNodeKey === key && dropPosition === 1
  };
  return treeNodeProps;
}
function convertNodePropsToEventData(props) {
  var data = props.data, expanded = props.expanded, selected = props.selected, checked = props.checked, loaded = props.loaded, loading = props.loading, halfChecked = props.halfChecked, dragOver = props.dragOver, dragOverGapTop = props.dragOverGapTop, dragOverGapBottom = props.dragOverGapBottom, pos = props.pos, active = props.active, eventKey = props.eventKey;
  var eventData = _objectSpread2(_objectSpread2({}, data), {}, {
    expanded,
    selected,
    checked,
    loaded,
    loading,
    halfChecked,
    dragOver,
    dragOverGapTop,
    dragOverGapBottom,
    pos,
    active,
    key: eventKey
  });
  if (!("props" in eventData)) {
    Object.defineProperty(eventData, "props", {
      get: function get() {
        warningOnce(false, "Second param return from event is node data instead of TreeNode instance. Please read value directly instead of reading from `props`.");
        return props;
      }
    });
  }
  return eventData;
}
const antCheckboxEffect = new Keyframe("antCheckboxEffect", {
  "0%": {
    transform: "scale(1)",
    opacity: 0.5
  },
  "100%": {
    transform: "scale(1.6)",
    opacity: 0
  }
});
const genCheckboxStyle = (token) => {
  const {
    checkboxCls
  } = token;
  const wrapperCls = `${checkboxCls}-wrapper`;
  return [
    // ===================== Basic =====================
    {
      // Group
      [`${checkboxCls}-group`]: Object.assign(Object.assign({}, resetComponent(token)), {
        display: "inline-flex",
        flexWrap: "wrap",
        columnGap: token.marginXS,
        // Group > Grid
        [`> ${token.antCls}-row`]: {
          flex: 1
        }
      }),
      // Wrapper
      [wrapperCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        display: "inline-flex",
        alignItems: "baseline",
        cursor: "pointer",
        // Fix checkbox & radio in flex align #30260
        "&:after": {
          display: "inline-block",
          width: 0,
          overflow: "hidden",
          content: "'\\a0'"
        },
        // Checkbox near checkbox
        [`& + ${wrapperCls}`]: {
          marginInlineStart: 0
        },
        [`&${wrapperCls}-in-form-item`]: {
          'input[type="checkbox"]': {
            width: 14,
            height: 14
            // FIXME: magic
          }
        }
      }),
      // Wrapper > Checkbox
      [checkboxCls]: Object.assign(Object.assign({}, resetComponent(token)), {
        position: "relative",
        whiteSpace: "nowrap",
        lineHeight: 1,
        cursor: "pointer",
        // To make alignment right when `controlHeight` is changed
        // Ref: https://github.com/ant-design/ant-design/issues/41564
        alignSelf: "center",
        // Wrapper > Checkbox > input
        [`${checkboxCls}-input`]: {
          position: "absolute",
          // Since baseline align will get additional space offset,
          // we need to move input to top to make it align with text.
          // Ref: https://github.com/ant-design/ant-design/issues/38926#issuecomment-1486137799
          inset: 0,
          zIndex: 1,
          cursor: "pointer",
          opacity: 0,
          margin: 0,
          [`&:focus-visible + ${checkboxCls}-inner`]: Object.assign({}, genFocusOutline(token))
        },
        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          boxSizing: "border-box",
          position: "relative",
          top: 0,
          insetInlineStart: 0,
          display: "block",
          width: token.checkboxSize,
          height: token.checkboxSize,
          direction: "ltr",
          backgroundColor: token.colorBgContainer,
          border: `${token.lineWidth}px ${token.lineType} ${token.colorBorder}`,
          borderRadius: token.borderRadiusSM,
          borderCollapse: "separate",
          transition: `all ${token.motionDurationSlow}`,
          "&:after": {
            boxSizing: "border-box",
            position: "absolute",
            top: "50%",
            insetInlineStart: "21.5%",
            display: "table",
            width: token.checkboxSize / 14 * 5,
            height: token.checkboxSize / 14 * 8,
            border: `${token.lineWidthBold}px solid ${token.colorWhite}`,
            borderTop: 0,
            borderInlineStart: 0,
            transform: "rotate(45deg) scale(0) translate(-50%,-50%)",
            opacity: 0,
            content: '""',
            transition: `all ${token.motionDurationFast} ${token.motionEaseInBack}, opacity ${token.motionDurationFast}`
          }
        },
        // Wrapper > Checkbox + Text
        "& + span": {
          paddingInlineStart: token.paddingXS,
          paddingInlineEnd: token.paddingXS
        }
      })
    },
    // ================= Indeterminate =================
    {
      [checkboxCls]: {
        "&-indeterminate": {
          // Wrapper > Checkbox > inner
          [`${checkboxCls}-inner`]: {
            "&:after": {
              top: "50%",
              insetInlineStart: "50%",
              width: token.fontSizeLG / 2,
              height: token.fontSizeLG / 2,
              backgroundColor: token.colorPrimary,
              border: 0,
              transform: "translate(-50%, -50%) scale(1)",
              opacity: 1,
              content: '""'
            }
          }
        }
      }
    },
    // ===================== Hover =====================
    {
      // Wrapper
      [`${wrapperCls}:hover ${checkboxCls}:after`]: {
        visibility: "visible"
      },
      // Wrapper & Wrapper > Checkbox
      [`
        ${wrapperCls}:not(${wrapperCls}-disabled),
        ${checkboxCls}:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          borderColor: token.colorPrimary
        }
      },
      [`${wrapperCls}:not(${wrapperCls}-disabled)`]: {
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled) ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: "transparent"
        },
        [`&:hover ${checkboxCls}-checked:not(${checkboxCls}-disabled):after`]: {
          borderColor: token.colorPrimaryHover
        }
      }
    },
    // ==================== Checked ====================
    {
      // Wrapper > Checkbox
      [`${checkboxCls}-checked`]: {
        [`${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimary,
          borderColor: token.colorPrimary,
          "&:after": {
            opacity: 1,
            transform: "rotate(45deg) scale(1) translate(-50%,-50%)",
            transition: `all ${token.motionDurationMid} ${token.motionEaseOutBack} ${token.motionDurationFast}`
          }
        },
        // Checked Effect
        "&:after": {
          position: "absolute",
          top: 0,
          insetInlineStart: 0,
          width: "100%",
          height: "100%",
          borderRadius: token.borderRadiusSM,
          visibility: "hidden",
          border: `${token.lineWidthBold}px solid ${token.colorPrimary}`,
          animationName: antCheckboxEffect,
          animationDuration: token.motionDurationSlow,
          animationTimingFunction: "ease-in-out",
          animationFillMode: "backwards",
          content: '""',
          transition: `all ${token.motionDurationSlow}`
        }
      },
      [`
        ${wrapperCls}-checked:not(${wrapperCls}-disabled),
        ${checkboxCls}-checked:not(${checkboxCls}-disabled)
      `]: {
        [`&:hover ${checkboxCls}-inner`]: {
          backgroundColor: token.colorPrimaryHover,
          borderColor: "transparent"
        },
        [`&:hover ${checkboxCls}:after`]: {
          borderColor: token.colorPrimaryHover
        }
      }
    },
    // ==================== Disable ====================
    {
      // Wrapper
      [`${wrapperCls}-disabled`]: {
        cursor: "not-allowed"
      },
      // Wrapper > Checkbox
      [`${checkboxCls}-disabled`]: {
        // Wrapper > Checkbox > input
        [`&, ${checkboxCls}-input`]: {
          cursor: "not-allowed",
          // Disabled for native input to enable Tooltip event handler
          // ref: https://github.com/ant-design/ant-design/issues/39822#issuecomment-1365075901
          pointerEvents: "none"
        },
        // Wrapper > Checkbox > inner
        [`${checkboxCls}-inner`]: {
          background: token.colorBgContainerDisabled,
          borderColor: token.colorBorder,
          "&:after": {
            borderColor: token.colorTextDisabled
          }
        },
        "&:after": {
          display: "none"
        },
        "& + span": {
          color: token.colorTextDisabled
        },
        [`&${checkboxCls}-indeterminate ${checkboxCls}-inner::after`]: {
          background: token.colorTextDisabled
        }
      }
    }
  ];
};
function getStyle(prefixCls, token) {
  const checkboxToken = merge(token, {
    checkboxCls: `.${prefixCls}`,
    checkboxSize: token.controlInteractiveSize
  });
  return [genCheckboxStyle(checkboxToken)];
}
var CaretDownFilled$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "0 0 1024 1024", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M840.4 300H183.6c-19.7 0-30.7 20.8-18.5 35l328.4 380.8c9.4 10.9 27.5 10.9 37 0L858.9 335c12.2-14.2 1.2-35-18.5-35z" } }] }, "name": "caret-down", "theme": "filled" };
const CaretDownFilledSvg = CaretDownFilled$2;
var CaretDownFilled = function CaretDownFilled2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: CaretDownFilledSvg
  }));
};
const CaretDownFilled$1 = /* @__PURE__ */ reactExports.forwardRef(CaretDownFilled);
var FileOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M854.6 288.6L639.4 73.4c-6-6-14.1-9.4-22.6-9.4H192c-17.7 0-32 14.3-32 32v832c0 17.7 14.3 32 32 32h640c17.7 0 32-14.3 32-32V311.3c0-8.5-3.4-16.7-9.4-22.7zM790.2 326H602V137.8L790.2 326zm1.8 562H232V136h302v216a42 42 0 0042 42h216v494z" } }] }, "name": "file", "theme": "outlined" };
const FileOutlinedSvg = FileOutlined$2;
var FileOutlined = function FileOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: FileOutlinedSvg
  }));
};
const FileOutlined$1 = /* @__PURE__ */ reactExports.forwardRef(FileOutlined);
var FolderOpenOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 00-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zM136 256h188.5l119.6 114.4H748V444H238c-13 0-24.8 7.9-29.7 20L136 643.2V256zm635.3 512H159l103.3-256h612.4L771.3 768z" } }] }, "name": "folder-open", "theme": "outlined" };
const FolderOpenOutlinedSvg = FolderOpenOutlined$2;
var FolderOpenOutlined = function FolderOpenOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: FolderOpenOutlinedSvg
  }));
};
const FolderOpenOutlined$1 = /* @__PURE__ */ reactExports.forwardRef(FolderOpenOutlined);
var FolderOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M880 298.4H521L403.7 186.2a8.15 8.15 0 00-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32zM840 768H184V256h188.5l119.6 114.4H840V768z" } }] }, "name": "folder", "theme": "outlined" };
const FolderOutlinedSvg = FolderOutlined$2;
var FolderOutlined = function FolderOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: FolderOutlinedSvg
  }));
};
const FolderOutlined$1 = /* @__PURE__ */ reactExports.forwardRef(FolderOutlined);
var HolderOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M300 276.5a56 56 0 1056-97 56 56 0 00-56 97zm0 284a56 56 0 1056-97 56 56 0 00-56 97zM640 228a56 56 0 10112 0 56 56 0 00-112 0zm0 284a56 56 0 10112 0 56 56 0 00-112 0zM300 844.5a56 56 0 1056-97 56 56 0 00-56 97zM640 796a56 56 0 10112 0 56 56 0 00-112 0z" } }] }, "name": "holder", "theme": "outlined" };
const HolderOutlinedSvg = HolderOutlined$2;
var HolderOutlined = function HolderOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: HolderOutlinedSvg
  }));
};
const HolderOutlined$1 = /* @__PURE__ */ reactExports.forwardRef(HolderOutlined);
var MinusSquareOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M328 544h368c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" } }, { "tag": "path", "attrs": { "d": "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" } }] }, "name": "minus-square", "theme": "outlined" };
const MinusSquareOutlinedSvg = MinusSquareOutlined$2;
var MinusSquareOutlined = function MinusSquareOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: MinusSquareOutlinedSvg
  }));
};
const MinusSquareOutlined$1 = /* @__PURE__ */ reactExports.forwardRef(MinusSquareOutlined);
var PlusSquareOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M328 544h152v152c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V544h152c4.4 0 8-3.6 8-8v-48c0-4.4-3.6-8-8-8H544V328c0-4.4-3.6-8-8-8h-48c-4.4 0-8 3.6-8 8v152H328c-4.4 0-8 3.6-8 8v48c0 4.4 3.6 8 8 8z" } }, { "tag": "path", "attrs": { "d": "M880 112H144c-17.7 0-32 14.3-32 32v736c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V144c0-17.7-14.3-32-32-32zm-40 728H184V184h656v656z" } }] }, "name": "plus-square", "theme": "outlined" };
const PlusSquareOutlinedSvg = PlusSquareOutlined$2;
var PlusSquareOutlined = function PlusSquareOutlined2(props, ref) {
  return /* @__PURE__ */ reactExports.createElement(AntdIcon, _extends({}, props, {
    ref,
    icon: PlusSquareOutlinedSvg
  }));
};
const PlusSquareOutlined$1 = /* @__PURE__ */ reactExports.forwardRef(PlusSquareOutlined);
var TreeContext = /* @__PURE__ */ reactExports.createContext(null);
var Indent = function Indent2(_ref) {
  var prefixCls = _ref.prefixCls, level = _ref.level, isStart = _ref.isStart, isEnd = _ref.isEnd;
  var baseClassName = "".concat(prefixCls, "-indent-unit");
  var list = [];
  for (var i = 0; i < level; i += 1) {
    var _classNames;
    list.push(/* @__PURE__ */ reactExports.createElement("span", {
      key: i,
      className: classNames(baseClassName, (_classNames = {}, _defineProperty(_classNames, "".concat(baseClassName, "-start"), isStart[i]), _defineProperty(_classNames, "".concat(baseClassName, "-end"), isEnd[i]), _classNames))
    }));
  }
  return /* @__PURE__ */ reactExports.createElement("span", {
    "aria-hidden": "true",
    className: "".concat(prefixCls, "-indent")
  }, list);
};
const Indent$1 = /* @__PURE__ */ reactExports.memo(Indent);
var _excluded$2 = ["eventKey", "className", "style", "dragOver", "dragOverGapTop", "dragOverGapBottom", "isLeaf", "isStart", "isEnd", "expanded", "selected", "checked", "halfChecked", "loading", "domRef", "active", "data", "onMouseMove", "selectable"];
var ICON_OPEN = "open";
var ICON_CLOSE = "close";
var defaultTitle = "---";
var InternalTreeNode = /* @__PURE__ */ function(_React$Component) {
  _inherits(InternalTreeNode2, _React$Component);
  var _super = _createSuper(InternalTreeNode2);
  function InternalTreeNode2() {
    var _this;
    _classCallCheck(this, InternalTreeNode2);
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(args));
    _this.state = {
      dragNodeHighlight: false
    };
    _this.selectHandle = void 0;
    _this.onSelectorClick = function(e) {
      var onNodeClick = _this.props.context.onNodeClick;
      onNodeClick(e, convertNodePropsToEventData(_this.props));
      if (_this.isSelectable()) {
        _this.onSelect(e);
      } else {
        _this.onCheck(e);
      }
    };
    _this.onSelectorDoubleClick = function(e) {
      var onNodeDoubleClick = _this.props.context.onNodeDoubleClick;
      onNodeDoubleClick(e, convertNodePropsToEventData(_this.props));
    };
    _this.onSelect = function(e) {
      if (_this.isDisabled())
        return;
      var onNodeSelect = _this.props.context.onNodeSelect;
      e.preventDefault();
      onNodeSelect(e, convertNodePropsToEventData(_this.props));
    };
    _this.onCheck = function(e) {
      if (_this.isDisabled())
        return;
      var _this$props = _this.props, disableCheckbox = _this$props.disableCheckbox, checked = _this$props.checked;
      var onNodeCheck = _this.props.context.onNodeCheck;
      if (!_this.isCheckable() || disableCheckbox)
        return;
      e.preventDefault();
      var targetChecked = !checked;
      onNodeCheck(e, convertNodePropsToEventData(_this.props), targetChecked);
    };
    _this.onMouseEnter = function(e) {
      var onNodeMouseEnter = _this.props.context.onNodeMouseEnter;
      onNodeMouseEnter(e, convertNodePropsToEventData(_this.props));
    };
    _this.onMouseLeave = function(e) {
      var onNodeMouseLeave = _this.props.context.onNodeMouseLeave;
      onNodeMouseLeave(e, convertNodePropsToEventData(_this.props));
    };
    _this.onContextMenu = function(e) {
      var onNodeContextMenu = _this.props.context.onNodeContextMenu;
      onNodeContextMenu(e, convertNodePropsToEventData(_this.props));
    };
    _this.onDragStart = function(e) {
      var onNodeDragStart = _this.props.context.onNodeDragStart;
      e.stopPropagation();
      _this.setState({
        dragNodeHighlight: true
      });
      onNodeDragStart(e, _assertThisInitialized(_this));
      try {
        e.dataTransfer.setData("text/plain", "");
      } catch (error) {
      }
    };
    _this.onDragEnter = function(e) {
      var onNodeDragEnter = _this.props.context.onNodeDragEnter;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragEnter(e, _assertThisInitialized(_this));
    };
    _this.onDragOver = function(e) {
      var onNodeDragOver = _this.props.context.onNodeDragOver;
      e.preventDefault();
      e.stopPropagation();
      onNodeDragOver(e, _assertThisInitialized(_this));
    };
    _this.onDragLeave = function(e) {
      var onNodeDragLeave = _this.props.context.onNodeDragLeave;
      e.stopPropagation();
      onNodeDragLeave(e, _assertThisInitialized(_this));
    };
    _this.onDragEnd = function(e) {
      var onNodeDragEnd = _this.props.context.onNodeDragEnd;
      e.stopPropagation();
      _this.setState({
        dragNodeHighlight: false
      });
      onNodeDragEnd(e, _assertThisInitialized(_this));
    };
    _this.onDrop = function(e) {
      var onNodeDrop = _this.props.context.onNodeDrop;
      e.preventDefault();
      e.stopPropagation();
      _this.setState({
        dragNodeHighlight: false
      });
      onNodeDrop(e, _assertThisInitialized(_this));
    };
    _this.onExpand = function(e) {
      var _this$props2 = _this.props, loading = _this$props2.loading, onNodeExpand = _this$props2.context.onNodeExpand;
      if (loading)
        return;
      onNodeExpand(e, convertNodePropsToEventData(_this.props));
    };
    _this.setSelectHandle = function(node) {
      _this.selectHandle = node;
    };
    _this.getNodeState = function() {
      var expanded = _this.props.expanded;
      if (_this.isLeaf()) {
        return null;
      }
      return expanded ? ICON_OPEN : ICON_CLOSE;
    };
    _this.hasChildren = function() {
      var eventKey = _this.props.eventKey;
      var keyEntities = _this.props.context.keyEntities;
      var _ref = keyEntities[eventKey] || {}, children = _ref.children;
      return !!(children || []).length;
    };
    _this.isLeaf = function() {
      var _this$props3 = _this.props, isLeaf = _this$props3.isLeaf, loaded = _this$props3.loaded;
      var loadData = _this.props.context.loadData;
      var hasChildren = _this.hasChildren();
      if (isLeaf === false) {
        return false;
      }
      return isLeaf || !loadData && !hasChildren || loadData && loaded && !hasChildren;
    };
    _this.isDisabled = function() {
      var disabled = _this.props.disabled;
      var treeDisabled = _this.props.context.disabled;
      return !!(treeDisabled || disabled);
    };
    _this.isCheckable = function() {
      var checkable = _this.props.checkable;
      var treeCheckable = _this.props.context.checkable;
      if (!treeCheckable || checkable === false)
        return false;
      return treeCheckable;
    };
    _this.syncLoadData = function(props) {
      var expanded = props.expanded, loading = props.loading, loaded = props.loaded;
      var _this$props$context = _this.props.context, loadData = _this$props$context.loadData, onNodeLoad = _this$props$context.onNodeLoad;
      if (loading) {
        return;
      }
      if (loadData && expanded && !_this.isLeaf()) {
        if (!_this.hasChildren() && !loaded) {
          onNodeLoad(convertNodePropsToEventData(_this.props));
        }
      }
    };
    _this.isDraggable = function() {
      var _this$props4 = _this.props, data = _this$props4.data, draggable = _this$props4.context.draggable;
      return !!(draggable && (!draggable.nodeDraggable || draggable.nodeDraggable(data)));
    };
    _this.renderDragHandler = function() {
      var _this$props$context2 = _this.props.context, draggable = _this$props$context2.draggable, prefixCls = _this$props$context2.prefixCls;
      return (draggable === null || draggable === void 0 ? void 0 : draggable.icon) ? /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-draggable-icon")
      }, draggable.icon) : null;
    };
    _this.renderSwitcherIconDom = function(isLeaf) {
      var switcherIconFromProps = _this.props.switcherIcon;
      var switcherIconFromCtx = _this.props.context.switcherIcon;
      var switcherIcon = switcherIconFromProps || switcherIconFromCtx;
      if (typeof switcherIcon === "function") {
        return switcherIcon(_objectSpread2(_objectSpread2({}, _this.props), {}, {
          isLeaf
        }));
      }
      return switcherIcon;
    };
    _this.renderSwitcher = function() {
      var expanded = _this.props.expanded;
      var prefixCls = _this.props.context.prefixCls;
      if (_this.isLeaf()) {
        var _switcherIconDom = _this.renderSwitcherIconDom(true);
        return _switcherIconDom !== false ? /* @__PURE__ */ reactExports.createElement("span", {
          className: classNames("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher-noop"))
        }, _switcherIconDom) : null;
      }
      var switcherCls = classNames("".concat(prefixCls, "-switcher"), "".concat(prefixCls, "-switcher_").concat(expanded ? ICON_OPEN : ICON_CLOSE));
      var switcherIconDom = _this.renderSwitcherIconDom(false);
      return switcherIconDom !== false ? /* @__PURE__ */ reactExports.createElement("span", {
        onClick: _this.onExpand,
        className: switcherCls
      }, switcherIconDom) : null;
    };
    _this.renderCheckbox = function() {
      var _this$props5 = _this.props, checked = _this$props5.checked, halfChecked = _this$props5.halfChecked, disableCheckbox = _this$props5.disableCheckbox;
      var prefixCls = _this.props.context.prefixCls;
      var disabled = _this.isDisabled();
      var checkable = _this.isCheckable();
      if (!checkable)
        return null;
      var $custom = typeof checkable !== "boolean" ? checkable : null;
      return /* @__PURE__ */ reactExports.createElement("span", {
        className: classNames("".concat(prefixCls, "-checkbox"), checked && "".concat(prefixCls, "-checkbox-checked"), !checked && halfChecked && "".concat(prefixCls, "-checkbox-indeterminate"), (disabled || disableCheckbox) && "".concat(prefixCls, "-checkbox-disabled")),
        onClick: _this.onCheck
      }, $custom);
    };
    _this.renderIcon = function() {
      var loading = _this.props.loading;
      var prefixCls = _this.props.context.prefixCls;
      return /* @__PURE__ */ reactExports.createElement("span", {
        className: classNames("".concat(prefixCls, "-iconEle"), "".concat(prefixCls, "-icon__").concat(_this.getNodeState() || "docu"), loading && "".concat(prefixCls, "-icon_loading"))
      });
    };
    _this.renderSelector = function() {
      var dragNodeHighlight = _this.state.dragNodeHighlight;
      var _this$props6 = _this.props, _this$props6$title = _this$props6.title, title = _this$props6$title === void 0 ? defaultTitle : _this$props6$title, selected = _this$props6.selected, icon = _this$props6.icon, loading = _this$props6.loading, data = _this$props6.data;
      var _this$props$context3 = _this.props.context, prefixCls = _this$props$context3.prefixCls, showIcon = _this$props$context3.showIcon, treeIcon = _this$props$context3.icon, loadData = _this$props$context3.loadData, titleRender = _this$props$context3.titleRender;
      var disabled = _this.isDisabled();
      var wrapClass = "".concat(prefixCls, "-node-content-wrapper");
      var $icon;
      if (showIcon) {
        var currentIcon = icon || treeIcon;
        $icon = currentIcon ? /* @__PURE__ */ reactExports.createElement("span", {
          className: classNames("".concat(prefixCls, "-iconEle"), "".concat(prefixCls, "-icon__customize"))
        }, typeof currentIcon === "function" ? currentIcon(_this.props) : currentIcon) : _this.renderIcon();
      } else if (loadData && loading) {
        $icon = _this.renderIcon();
      }
      var titleNode;
      if (typeof title === "function") {
        titleNode = title(data);
      } else if (titleRender) {
        titleNode = titleRender(data);
      } else {
        titleNode = title;
      }
      var $title = /* @__PURE__ */ reactExports.createElement("span", {
        className: "".concat(prefixCls, "-title")
      }, titleNode);
      return /* @__PURE__ */ reactExports.createElement("span", {
        ref: _this.setSelectHandle,
        title: typeof title === "string" ? title : "",
        className: classNames("".concat(wrapClass), "".concat(wrapClass, "-").concat(_this.getNodeState() || "normal"), !disabled && (selected || dragNodeHighlight) && "".concat(prefixCls, "-node-selected")),
        onMouseEnter: _this.onMouseEnter,
        onMouseLeave: _this.onMouseLeave,
        onContextMenu: _this.onContextMenu,
        onClick: _this.onSelectorClick,
        onDoubleClick: _this.onSelectorDoubleClick
      }, $icon, $title, _this.renderDropIndicator());
    };
    _this.renderDropIndicator = function() {
      var _this$props7 = _this.props, disabled = _this$props7.disabled, eventKey = _this$props7.eventKey;
      var _this$props$context4 = _this.props.context, draggable = _this$props$context4.draggable, dropLevelOffset = _this$props$context4.dropLevelOffset, dropPosition = _this$props$context4.dropPosition, prefixCls = _this$props$context4.prefixCls, indent = _this$props$context4.indent, dropIndicatorRender2 = _this$props$context4.dropIndicatorRender, dragOverNodeKey = _this$props$context4.dragOverNodeKey, direction = _this$props$context4.direction;
      var rootDraggable = !!draggable;
      var showIndicator = !disabled && rootDraggable && dragOverNodeKey === eventKey;
      return showIndicator ? dropIndicatorRender2({
        dropPosition,
        dropLevelOffset,
        indent,
        prefixCls,
        direction
      }) : null;
    };
    return _this;
  }
  _createClass(InternalTreeNode2, [{
    key: "componentDidMount",
    value: (
      // Isomorphic needn't load data in server side
      function componentDidMount() {
        this.syncLoadData(this.props);
      }
    )
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.syncLoadData(this.props);
    }
  }, {
    key: "isSelectable",
    value: function isSelectable() {
      var selectable = this.props.selectable;
      var treeSelectable = this.props.context.selectable;
      if (typeof selectable === "boolean") {
        return selectable;
      }
      return treeSelectable;
    }
  }, {
    key: "render",
    value: (
      // =========================== Render ===========================
      function render() {
        var _classNames;
        var _this$props8 = this.props, eventKey = _this$props8.eventKey, className = _this$props8.className, style2 = _this$props8.style, dragOver = _this$props8.dragOver, dragOverGapTop = _this$props8.dragOverGapTop, dragOverGapBottom = _this$props8.dragOverGapBottom, isLeaf = _this$props8.isLeaf, isStart = _this$props8.isStart, isEnd = _this$props8.isEnd, expanded = _this$props8.expanded, selected = _this$props8.selected, checked = _this$props8.checked, halfChecked = _this$props8.halfChecked, loading = _this$props8.loading, domRef = _this$props8.domRef, active = _this$props8.active;
        _this$props8.data;
        var onMouseMove = _this$props8.onMouseMove, selectable = _this$props8.selectable, otherProps = _objectWithoutProperties(_this$props8, _excluded$2);
        var _this$props$context5 = this.props.context, prefixCls = _this$props$context5.prefixCls, filterTreeNode = _this$props$context5.filterTreeNode, keyEntities = _this$props$context5.keyEntities, dropContainerKey = _this$props$context5.dropContainerKey, dropTargetKey = _this$props$context5.dropTargetKey, draggingNodeKey = _this$props$context5.draggingNodeKey;
        var disabled = this.isDisabled();
        var dataOrAriaAttributeProps = pickAttrs(otherProps, {
          aria: true,
          data: true
        });
        var _ref2 = keyEntities[eventKey] || {}, level = _ref2.level;
        var isEndNode = isEnd[isEnd.length - 1];
        var mergedDraggable = this.isDraggable();
        var draggableWithoutDisabled = !disabled && mergedDraggable;
        var dragging = draggingNodeKey === eventKey;
        var ariaSelected = selectable !== void 0 ? {
          "aria-selected": !!selectable
        } : void 0;
        return /* @__PURE__ */ reactExports.createElement("div", _extends({
          ref: domRef,
          className: classNames(className, "".concat(prefixCls, "-treenode"), (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-treenode-disabled"), disabled), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-switcher-").concat(expanded ? "open" : "close"), !isLeaf), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-checkbox-checked"), checked), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-checkbox-indeterminate"), halfChecked), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-selected"), selected), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-loading"), loading), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-active"), active), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-leaf-last"), isEndNode), _defineProperty(_classNames, "".concat(prefixCls, "-treenode-draggable"), mergedDraggable), _defineProperty(_classNames, "dragging", dragging), _defineProperty(_classNames, "drop-target", dropTargetKey === eventKey), _defineProperty(_classNames, "drop-container", dropContainerKey === eventKey), _defineProperty(_classNames, "drag-over", !disabled && dragOver), _defineProperty(_classNames, "drag-over-gap-top", !disabled && dragOverGapTop), _defineProperty(_classNames, "drag-over-gap-bottom", !disabled && dragOverGapBottom), _defineProperty(_classNames, "filter-node", filterTreeNode && filterTreeNode(convertNodePropsToEventData(this.props))), _classNames)),
          style: style2,
          draggable: draggableWithoutDisabled,
          "aria-grabbed": dragging,
          onDragStart: draggableWithoutDisabled ? this.onDragStart : void 0,
          onDragEnter: mergedDraggable ? this.onDragEnter : void 0,
          onDragOver: mergedDraggable ? this.onDragOver : void 0,
          onDragLeave: mergedDraggable ? this.onDragLeave : void 0,
          onDrop: mergedDraggable ? this.onDrop : void 0,
          onDragEnd: mergedDraggable ? this.onDragEnd : void 0,
          onMouseMove
        }, ariaSelected, dataOrAriaAttributeProps), /* @__PURE__ */ reactExports.createElement(Indent$1, {
          prefixCls,
          level,
          isStart,
          isEnd
        }), this.renderDragHandler(), this.renderSwitcher(), this.renderCheckbox(), this.renderSelector());
      }
    )
  }]);
  return InternalTreeNode2;
}(reactExports.Component);
var ContextTreeNode = function ContextTreeNode2(props) {
  return /* @__PURE__ */ reactExports.createElement(TreeContext.Consumer, null, function(context) {
    return /* @__PURE__ */ reactExports.createElement(InternalTreeNode, _extends({}, props, {
      context
    }));
  });
};
ContextTreeNode.displayName = "TreeNode";
ContextTreeNode.isTreeNode = 1;
function arrDel(list, value) {
  if (!list)
    return [];
  var clone = list.slice();
  var index2 = clone.indexOf(value);
  if (index2 >= 0) {
    clone.splice(index2, 1);
  }
  return clone;
}
function arrAdd(list, value) {
  var clone = (list || []).slice();
  if (clone.indexOf(value) === -1) {
    clone.push(value);
  }
  return clone;
}
function posToArr(pos) {
  return pos.split("-");
}
function getDragChildrenKeys(dragNodeKey, keyEntities) {
  var dragChildrenKeys = [];
  var entity = keyEntities[dragNodeKey];
  function dig() {
    var list = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
    list.forEach(function(_ref) {
      var key = _ref.key, children = _ref.children;
      dragChildrenKeys.push(key);
      dig(children);
    });
  }
  dig(entity.children);
  return dragChildrenKeys;
}
function isLastChild(treeNodeEntity) {
  if (treeNodeEntity.parent) {
    var posArr = posToArr(treeNodeEntity.pos);
    return Number(posArr[posArr.length - 1]) === treeNodeEntity.parent.children.length - 1;
  }
  return false;
}
function isFirstChild(treeNodeEntity) {
  var posArr = posToArr(treeNodeEntity.pos);
  return Number(posArr[posArr.length - 1]) === 0;
}
function calcDropPosition(event, dragNode, targetNode, indent, startMousePosition, allowDrop2, flattenedNodes, keyEntities, expandKeys, direction) {
  var _abstractDropNodeEnti;
  var clientX = event.clientX, clientY = event.clientY;
  var _event$target$getBoun = event.target.getBoundingClientRect(), top = _event$target$getBoun.top, height = _event$target$getBoun.height;
  var horizontalMouseOffset = (direction === "rtl" ? -1 : 1) * (((startMousePosition === null || startMousePosition === void 0 ? void 0 : startMousePosition.x) || 0) - clientX);
  var rawDropLevelOffset = (horizontalMouseOffset - 12) / indent;
  var abstractDropNodeEntity = keyEntities[targetNode.props.eventKey];
  if (clientY < top + height / 2) {
    var nodeIndex = flattenedNodes.findIndex(function(flattenedNode) {
      return flattenedNode.key === abstractDropNodeEntity.key;
    });
    var prevNodeIndex = nodeIndex <= 0 ? 0 : nodeIndex - 1;
    var prevNodeKey = flattenedNodes[prevNodeIndex].key;
    abstractDropNodeEntity = keyEntities[prevNodeKey];
  }
  var initialAbstractDropNodeKey = abstractDropNodeEntity.key;
  var abstractDragOverEntity = abstractDropNodeEntity;
  var dragOverNodeKey = abstractDropNodeEntity.key;
  var dropPosition = 0;
  var dropLevelOffset = 0;
  if (!expandKeys.includes(initialAbstractDropNodeKey)) {
    for (var i = 0; i < rawDropLevelOffset; i += 1) {
      if (isLastChild(abstractDropNodeEntity)) {
        abstractDropNodeEntity = abstractDropNodeEntity.parent;
        dropLevelOffset += 1;
      } else {
        break;
      }
    }
  }
  var abstractDragDataNode = dragNode.props.data;
  var abstractDropDataNode = abstractDropNodeEntity.node;
  var dropAllowed = true;
  if (isFirstChild(abstractDropNodeEntity) && abstractDropNodeEntity.level === 0 && clientY < top + height / 2 && allowDrop2({
    dragNode: abstractDragDataNode,
    dropNode: abstractDropDataNode,
    dropPosition: -1
  }) && abstractDropNodeEntity.key === targetNode.props.eventKey) {
    dropPosition = -1;
  } else if ((abstractDragOverEntity.children || []).length && expandKeys.includes(dragOverNodeKey)) {
    if (allowDrop2({
      dragNode: abstractDragDataNode,
      dropNode: abstractDropDataNode,
      dropPosition: 0
    })) {
      dropPosition = 0;
    } else {
      dropAllowed = false;
    }
  } else if (dropLevelOffset === 0) {
    if (rawDropLevelOffset > -1.5) {
      if (allowDrop2({
        dragNode: abstractDragDataNode,
        dropNode: abstractDropDataNode,
        dropPosition: 1
      })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    } else {
      if (allowDrop2({
        dragNode: abstractDragDataNode,
        dropNode: abstractDropDataNode,
        dropPosition: 0
      })) {
        dropPosition = 0;
      } else if (allowDrop2({
        dragNode: abstractDragDataNode,
        dropNode: abstractDropDataNode,
        dropPosition: 1
      })) {
        dropPosition = 1;
      } else {
        dropAllowed = false;
      }
    }
  } else {
    if (allowDrop2({
      dragNode: abstractDragDataNode,
      dropNode: abstractDropDataNode,
      dropPosition: 1
    })) {
      dropPosition = 1;
    } else {
      dropAllowed = false;
    }
  }
  return {
    dropPosition,
    dropLevelOffset,
    dropTargetKey: abstractDropNodeEntity.key,
    dropTargetPos: abstractDropNodeEntity.pos,
    dragOverNodeKey,
    dropContainerKey: dropPosition === 0 ? null : ((_abstractDropNodeEnti = abstractDropNodeEntity.parent) === null || _abstractDropNodeEnti === void 0 ? void 0 : _abstractDropNodeEnti.key) || null,
    dropAllowed
  };
}
function calcSelectedKeys(selectedKeys, props) {
  if (!selectedKeys)
    return void 0;
  var multiple = props.multiple;
  if (multiple) {
    return selectedKeys.slice();
  }
  if (selectedKeys.length) {
    return [selectedKeys[0]];
  }
  return selectedKeys;
}
function parseCheckedKeys(keys) {
  if (!keys) {
    return null;
  }
  var keyProps;
  if (Array.isArray(keys)) {
    keyProps = {
      checkedKeys: keys,
      halfCheckedKeys: void 0
    };
  } else if (_typeof(keys) === "object") {
    keyProps = {
      checkedKeys: keys.checked || void 0,
      halfCheckedKeys: keys.halfChecked || void 0
    };
  } else {
    warningOnce(false, "`checkedKeys` is not an array or an object");
    return null;
  }
  return keyProps;
}
function conductExpandParent(keyList, keyEntities) {
  var expandedKeys = /* @__PURE__ */ new Set();
  function conductUp(key) {
    if (expandedKeys.has(key))
      return;
    var entity = keyEntities[key];
    if (!entity)
      return;
    expandedKeys.add(key);
    var parent = entity.parent, node = entity.node;
    if (node.disabled)
      return;
    if (parent) {
      conductUp(parent.key);
    }
  }
  (keyList || []).forEach(function(key) {
    conductUp(key);
  });
  return _toConsumableArray(expandedKeys);
}
function _objectDestructuringEmpty(obj) {
  if (obj == null)
    throw new TypeError("Cannot destructure " + obj);
}
function useUnmount(triggerStart, triggerEnd) {
  var _React$useState = reactExports.useState(false), _React$useState2 = _slicedToArray(_React$useState, 2), firstMount = _React$useState2[0], setFirstMount = _React$useState2[1];
  reactExports.useLayoutEffect(function() {
    if (firstMount) {
      triggerStart();
      return function() {
        triggerEnd();
      };
    }
  }, [firstMount]);
  reactExports.useLayoutEffect(function() {
    setFirstMount(true);
    return function() {
      setFirstMount(false);
    };
  }, []);
}
var _excluded$1 = ["className", "style", "motion", "motionNodes", "motionType", "onMotionStart", "onMotionEnd", "active", "treeNodeRequiredProps"];
var MotionTreeNode = function MotionTreeNode2(_ref, ref) {
  var className = _ref.className, style2 = _ref.style, motion = _ref.motion, motionNodes = _ref.motionNodes, motionType = _ref.motionType, onOriginMotionStart = _ref.onMotionStart, onOriginMotionEnd = _ref.onMotionEnd, active = _ref.active, treeNodeRequiredProps = _ref.treeNodeRequiredProps, props = _objectWithoutProperties(_ref, _excluded$1);
  var _React$useState = reactExports.useState(true), _React$useState2 = _slicedToArray(_React$useState, 2), visible = _React$useState2[0], setVisible = _React$useState2[1];
  var _React$useContext = reactExports.useContext(TreeContext), prefixCls = _React$useContext.prefixCls;
  var targetVisible = motionNodes && motionType !== "hide";
  useLayoutEffect(function() {
    if (motionNodes) {
      if (targetVisible !== visible) {
        setVisible(targetVisible);
      }
    }
  }, [motionNodes]);
  var triggerMotionStart = function triggerMotionStart2() {
    if (motionNodes) {
      onOriginMotionStart();
    }
  };
  var triggerMotionEndRef = reactExports.useRef(false);
  var triggerMotionEnd = function triggerMotionEnd2() {
    if (motionNodes && !triggerMotionEndRef.current) {
      triggerMotionEndRef.current = true;
      onOriginMotionEnd();
    }
  };
  useUnmount(triggerMotionStart, triggerMotionEnd);
  var onVisibleChanged = function onVisibleChanged2(nextVisible) {
    if (targetVisible === nextVisible) {
      triggerMotionEnd();
    }
  };
  if (motionNodes) {
    return /* @__PURE__ */ reactExports.createElement(CSSMotion, _extends({
      ref,
      visible
    }, motion, {
      motionAppear: motionType === "show",
      onVisibleChanged
    }), function(_ref2, motionRef) {
      var motionClassName = _ref2.className, motionStyle = _ref2.style;
      return /* @__PURE__ */ reactExports.createElement("div", {
        ref: motionRef,
        className: classNames("".concat(prefixCls, "-treenode-motion"), motionClassName),
        style: motionStyle
      }, motionNodes.map(function(treeNode) {
        var restProps = _extends({}, (_objectDestructuringEmpty(treeNode.data), treeNode.data)), title = treeNode.title, key = treeNode.key, isStart = treeNode.isStart, isEnd = treeNode.isEnd;
        delete restProps.children;
        var treeNodeProps = getTreeNodeProps(key, treeNodeRequiredProps);
        return /* @__PURE__ */ reactExports.createElement(ContextTreeNode, _extends({}, restProps, treeNodeProps, {
          title,
          active,
          data: treeNode.data,
          key,
          isStart,
          isEnd
        }));
      }));
    });
  }
  return /* @__PURE__ */ reactExports.createElement(ContextTreeNode, _extends({
    domRef: ref,
    className,
    style: style2
  }, props, {
    active
  }));
};
MotionTreeNode.displayName = "MotionTreeNode";
var RefMotionTreeNode = /* @__PURE__ */ reactExports.forwardRef(MotionTreeNode);
function findExpandedKeys() {
  var prev = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  var next = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  var prevLen = prev.length;
  var nextLen = next.length;
  if (Math.abs(prevLen - nextLen) !== 1) {
    return {
      add: false,
      key: null
    };
  }
  function find(shorter, longer) {
    var cache = /* @__PURE__ */ new Map();
    shorter.forEach(function(key) {
      cache.set(key, true);
    });
    var keys = longer.filter(function(key) {
      return !cache.has(key);
    });
    return keys.length === 1 ? keys[0] : null;
  }
  if (prevLen < nextLen) {
    return {
      add: true,
      key: find(prev, next)
    };
  }
  return {
    add: false,
    key: find(next, prev)
  };
}
function getExpandRange(shorter, longer, key) {
  var shorterStartIndex = shorter.findIndex(function(data) {
    return data.key === key;
  });
  var shorterEndNode = shorter[shorterStartIndex + 1];
  var longerStartIndex = longer.findIndex(function(data) {
    return data.key === key;
  });
  if (shorterEndNode) {
    var longerEndIndex = longer.findIndex(function(data) {
      return data.key === shorterEndNode.key;
    });
    return longer.slice(longerStartIndex + 1, longerEndIndex);
  }
  return longer.slice(longerStartIndex + 1);
}
var _excluded = ["prefixCls", "data", "selectable", "checkable", "expandedKeys", "selectedKeys", "checkedKeys", "loadedKeys", "loadingKeys", "halfCheckedKeys", "keyEntities", "disabled", "dragging", "dragOverNodeKey", "dropPosition", "motion", "height", "itemHeight", "virtual", "focusable", "activeItem", "focused", "tabIndex", "onKeyDown", "onFocus", "onBlur", "onActiveChange", "onListChangeStart", "onListChangeEnd"];
var HIDDEN_STYLE = {
  width: 0,
  height: 0,
  display: "flex",
  overflow: "hidden",
  opacity: 0,
  border: 0,
  padding: 0,
  margin: 0
};
var noop = function noop2() {
};
var MOTION_KEY = "RC_TREE_MOTION_".concat(Math.random());
var MotionNode = {
  key: MOTION_KEY
};
var MotionEntity = {
  key: MOTION_KEY,
  level: 0,
  index: 0,
  pos: "0",
  node: MotionNode,
  nodes: [MotionNode]
};
var MotionFlattenData = {
  parent: null,
  children: [],
  pos: MotionEntity.pos,
  data: MotionNode,
  title: null,
  key: MOTION_KEY,
  /** Hold empty list here since we do not use it */
  isStart: [],
  isEnd: []
};
function getMinimumRangeTransitionRange(list, virtual, height, itemHeight) {
  if (virtual === false || !height) {
    return list;
  }
  return list.slice(0, Math.ceil(height / itemHeight) + 1);
}
function itemKey(item2) {
  var key = item2.key, pos = item2.pos;
  return getKey(key, pos);
}
function getAccessibilityPath(item2) {
  var path = String(item2.data.key);
  var current = item2;
  while (current.parent) {
    current = current.parent;
    path = "".concat(current.data.key, " > ").concat(path);
  }
  return path;
}
var NodeList = /* @__PURE__ */ reactExports.forwardRef(function(props, ref) {
  var prefixCls = props.prefixCls, data = props.data;
  props.selectable;
  props.checkable;
  var expandedKeys = props.expandedKeys, selectedKeys = props.selectedKeys, checkedKeys = props.checkedKeys, loadedKeys = props.loadedKeys, loadingKeys = props.loadingKeys, halfCheckedKeys = props.halfCheckedKeys, keyEntities = props.keyEntities, disabled = props.disabled, dragging = props.dragging, dragOverNodeKey = props.dragOverNodeKey, dropPosition = props.dropPosition, motion = props.motion, height = props.height, itemHeight = props.itemHeight, virtual = props.virtual, focusable = props.focusable, activeItem = props.activeItem, focused = props.focused, tabIndex = props.tabIndex, onKeyDown = props.onKeyDown, onFocus = props.onFocus, onBlur = props.onBlur, onActiveChange = props.onActiveChange, onListChangeStart = props.onListChangeStart, onListChangeEnd = props.onListChangeEnd, domProps = _objectWithoutProperties(props, _excluded);
  var listRef = reactExports.useRef(null);
  var indentMeasurerRef = reactExports.useRef(null);
  reactExports.useImperativeHandle(ref, function() {
    return {
      scrollTo: function scrollTo(scroll) {
        listRef.current.scrollTo(scroll);
      },
      getIndentWidth: function getIndentWidth() {
        return indentMeasurerRef.current.offsetWidth;
      }
    };
  });
  var _React$useState = reactExports.useState(expandedKeys), _React$useState2 = _slicedToArray(_React$useState, 2), prevExpandedKeys = _React$useState2[0], setPrevExpandedKeys = _React$useState2[1];
  var _React$useState3 = reactExports.useState(data), _React$useState4 = _slicedToArray(_React$useState3, 2), prevData = _React$useState4[0], setPrevData = _React$useState4[1];
  var _React$useState5 = reactExports.useState(data), _React$useState6 = _slicedToArray(_React$useState5, 2), transitionData = _React$useState6[0], setTransitionData = _React$useState6[1];
  var _React$useState7 = reactExports.useState([]), _React$useState8 = _slicedToArray(_React$useState7, 2), transitionRange = _React$useState8[0], setTransitionRange = _React$useState8[1];
  var _React$useState9 = reactExports.useState(null), _React$useState10 = _slicedToArray(_React$useState9, 2), motionType = _React$useState10[0], setMotionType = _React$useState10[1];
  var dataRef = reactExports.useRef(data);
  dataRef.current = data;
  function onMotionEnd() {
    var latestData = dataRef.current;
    setPrevData(latestData);
    setTransitionData(latestData);
    setTransitionRange([]);
    setMotionType(null);
    onListChangeEnd();
  }
  useLayoutEffect(function() {
    setPrevExpandedKeys(expandedKeys);
    var diffExpanded = findExpandedKeys(prevExpandedKeys, expandedKeys);
    if (diffExpanded.key !== null) {
      if (diffExpanded.add) {
        var keyIndex = prevData.findIndex(function(_ref) {
          var key = _ref.key;
          return key === diffExpanded.key;
        });
        var rangeNodes = getMinimumRangeTransitionRange(getExpandRange(prevData, data, diffExpanded.key), virtual, height, itemHeight);
        var newTransitionData = prevData.slice();
        newTransitionData.splice(keyIndex + 1, 0, MotionFlattenData);
        setTransitionData(newTransitionData);
        setTransitionRange(rangeNodes);
        setMotionType("show");
      } else {
        var _keyIndex = data.findIndex(function(_ref2) {
          var key = _ref2.key;
          return key === diffExpanded.key;
        });
        var _rangeNodes = getMinimumRangeTransitionRange(getExpandRange(data, prevData, diffExpanded.key), virtual, height, itemHeight);
        var _newTransitionData = data.slice();
        _newTransitionData.splice(_keyIndex + 1, 0, MotionFlattenData);
        setTransitionData(_newTransitionData);
        setTransitionRange(_rangeNodes);
        setMotionType("hide");
      }
    } else if (prevData !== data) {
      setPrevData(data);
      setTransitionData(data);
    }
  }, [expandedKeys, data]);
  reactExports.useEffect(function() {
    if (!dragging) {
      onMotionEnd();
    }
  }, [dragging]);
  var mergedData = motion ? transitionData : data;
  var treeNodeRequiredProps = {
    expandedKeys,
    selectedKeys,
    loadedKeys,
    loadingKeys,
    checkedKeys,
    halfCheckedKeys,
    dragOverNodeKey,
    dropPosition,
    keyEntities
  };
  return /* @__PURE__ */ reactExports.createElement(reactExports.Fragment, null, focused && activeItem && /* @__PURE__ */ reactExports.createElement("span", {
    style: HIDDEN_STYLE,
    "aria-live": "assertive"
  }, getAccessibilityPath(activeItem)), /* @__PURE__ */ reactExports.createElement("div", null, /* @__PURE__ */ reactExports.createElement("input", {
    style: HIDDEN_STYLE,
    disabled: focusable === false || disabled,
    tabIndex: focusable !== false ? tabIndex : null,
    onKeyDown,
    onFocus,
    onBlur,
    value: "",
    onChange: noop,
    "aria-label": "for screen reader"
  })), /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-treenode"),
    "aria-hidden": true,
    style: {
      position: "absolute",
      pointerEvents: "none",
      visibility: "hidden",
      height: 0,
      overflow: "hidden",
      border: 0,
      padding: 0
    }
  }, /* @__PURE__ */ reactExports.createElement("div", {
    className: "".concat(prefixCls, "-indent")
  }, /* @__PURE__ */ reactExports.createElement("div", {
    ref: indentMeasurerRef,
    className: "".concat(prefixCls, "-indent-unit")
  }))), /* @__PURE__ */ reactExports.createElement(List, _extends({}, domProps, {
    data: mergedData,
    itemKey,
    height,
    fullHeight: false,
    virtual,
    itemHeight,
    prefixCls: "".concat(prefixCls, "-list"),
    ref: listRef,
    onVisibleChange: function onVisibleChange(originList, fullList) {
      var originSet = new Set(originList);
      var restList = fullList.filter(function(item2) {
        return !originSet.has(item2);
      });
      if (restList.some(function(item2) {
        return itemKey(item2) === MOTION_KEY;
      })) {
        onMotionEnd();
      }
    }
  }), function(treeNode) {
    var pos = treeNode.pos, restProps = _extends({}, (_objectDestructuringEmpty(treeNode.data), treeNode.data)), title = treeNode.title, key = treeNode.key, isStart = treeNode.isStart, isEnd = treeNode.isEnd;
    var mergedKey = getKey(key, pos);
    delete restProps.key;
    delete restProps.children;
    var treeNodeProps = getTreeNodeProps(mergedKey, treeNodeRequiredProps);
    return /* @__PURE__ */ reactExports.createElement(RefMotionTreeNode, _extends({}, restProps, treeNodeProps, {
      title,
      active: !!activeItem && key === activeItem.key,
      pos,
      data: treeNode.data,
      isStart,
      isEnd,
      motion,
      motionNodes: key === MOTION_KEY ? transitionRange : null,
      motionType,
      onMotionStart: onListChangeStart,
      onMotionEnd,
      treeNodeRequiredProps,
      onMouseMove: function onMouseMove() {
        onActiveChange(null);
      }
    }));
  }));
});
NodeList.displayName = "NodeList";
function DropIndicator(_ref) {
  var dropPosition = _ref.dropPosition, dropLevelOffset = _ref.dropLevelOffset, indent = _ref.indent;
  var style2 = {
    pointerEvents: "none",
    position: "absolute",
    right: 0,
    backgroundColor: "red",
    height: 2
  };
  switch (dropPosition) {
    case -1:
      style2.top = 0;
      style2.left = -dropLevelOffset * indent;
      break;
    case 1:
      style2.bottom = 0;
      style2.left = -dropLevelOffset * indent;
      break;
    case 0:
      style2.bottom = 0;
      style2.left = indent;
      break;
  }
  return /* @__PURE__ */ reactExports.createElement("div", {
    style: style2
  });
}
var MAX_RETRY_TIMES = 10;
var Tree$3 = /* @__PURE__ */ function(_React$Component) {
  _inherits(Tree2, _React$Component);
  var _super = _createSuper(Tree2);
  function Tree2() {
    var _this;
    _classCallCheck(this, Tree2);
    for (var _len = arguments.length, _args = new Array(_len), _key = 0; _key < _len; _key++) {
      _args[_key] = arguments[_key];
    }
    _this = _super.call.apply(_super, [this].concat(_args));
    _this.destroyed = false;
    _this.delayedDragEnterLogic = void 0;
    _this.loadingRetryTimes = {};
    _this.state = {
      keyEntities: {},
      indent: null,
      selectedKeys: [],
      checkedKeys: [],
      halfCheckedKeys: [],
      loadedKeys: [],
      loadingKeys: [],
      expandedKeys: [],
      draggingNodeKey: null,
      dragChildrenKeys: [],
      // dropTargetKey is the key of abstract-drop-node
      // the abstract-drop-node is the real drop node when drag and drop
      // not the DOM drag over node
      dropTargetKey: null,
      dropPosition: null,
      dropContainerKey: null,
      dropLevelOffset: null,
      dropTargetPos: null,
      dropAllowed: true,
      // the abstract-drag-over-node
      // if mouse is on the bottom of top dom node or no the top of the bottom dom node
      // abstract-drag-over-node is the top node
      dragOverNodeKey: null,
      treeData: [],
      flattenNodes: [],
      focused: false,
      activeKey: null,
      listChanging: false,
      prevProps: null,
      fieldNames: fillFieldNames()
    };
    _this.dragStartMousePosition = null;
    _this.dragNode = void 0;
    _this.currentMouseOverDroppableNodeKey = null;
    _this.listRef = /* @__PURE__ */ reactExports.createRef();
    _this.onNodeDragStart = function(event, node) {
      var _this$state = _this.state, expandedKeys = _this$state.expandedKeys, keyEntities = _this$state.keyEntities;
      var onDragStart = _this.props.onDragStart;
      var eventKey = node.props.eventKey;
      _this.dragNode = node;
      _this.dragStartMousePosition = {
        x: event.clientX,
        y: event.clientY
      };
      var newExpandedKeys = arrDel(expandedKeys, eventKey);
      _this.setState({
        draggingNodeKey: eventKey,
        dragChildrenKeys: getDragChildrenKeys(eventKey, keyEntities),
        indent: _this.listRef.current.getIndentWidth()
      });
      _this.setExpandedKeys(newExpandedKeys);
      window.addEventListener("dragend", _this.onWindowDragEnd);
      onDragStart === null || onDragStart === void 0 ? void 0 : onDragStart({
        event,
        node: convertNodePropsToEventData(node.props)
      });
    };
    _this.onNodeDragEnter = function(event, node) {
      var _this$state2 = _this.state, expandedKeys = _this$state2.expandedKeys, keyEntities = _this$state2.keyEntities, dragChildrenKeys = _this$state2.dragChildrenKeys, flattenNodes = _this$state2.flattenNodes, indent = _this$state2.indent;
      var _this$props = _this.props, onDragEnter = _this$props.onDragEnter, onExpand = _this$props.onExpand, allowDrop2 = _this$props.allowDrop, direction = _this$props.direction;
      var _node$props = node.props, pos = _node$props.pos, eventKey = _node$props.eventKey;
      var _assertThisInitialize = _assertThisInitialized(_this), dragNode = _assertThisInitialize.dragNode;
      if (_this.currentMouseOverDroppableNodeKey !== eventKey) {
        _this.currentMouseOverDroppableNodeKey = eventKey;
      }
      if (!dragNode) {
        _this.resetDragState();
        return;
      }
      var _calcDropPosition = calcDropPosition(event, dragNode, node, indent, _this.dragStartMousePosition, allowDrop2, flattenNodes, keyEntities, expandedKeys, direction), dropPosition = _calcDropPosition.dropPosition, dropLevelOffset = _calcDropPosition.dropLevelOffset, dropTargetKey = _calcDropPosition.dropTargetKey, dropContainerKey = _calcDropPosition.dropContainerKey, dropTargetPos = _calcDropPosition.dropTargetPos, dropAllowed = _calcDropPosition.dropAllowed, dragOverNodeKey = _calcDropPosition.dragOverNodeKey;
      if (
        // don't allow drop inside its children
        dragChildrenKeys.indexOf(dropTargetKey) !== -1 || // don't allow drop when drop is not allowed caculated by calcDropPosition
        !dropAllowed
      ) {
        _this.resetDragState();
        return;
      }
      if (!_this.delayedDragEnterLogic) {
        _this.delayedDragEnterLogic = {};
      }
      Object.keys(_this.delayedDragEnterLogic).forEach(function(key) {
        clearTimeout(_this.delayedDragEnterLogic[key]);
      });
      if (dragNode.props.eventKey !== node.props.eventKey) {
        event.persist();
        _this.delayedDragEnterLogic[pos] = window.setTimeout(function() {
          if (_this.state.draggingNodeKey === null)
            return;
          var newExpandedKeys = _toConsumableArray(expandedKeys);
          var entity = keyEntities[node.props.eventKey];
          if (entity && (entity.children || []).length) {
            newExpandedKeys = arrAdd(expandedKeys, node.props.eventKey);
          }
          if (!("expandedKeys" in _this.props)) {
            _this.setExpandedKeys(newExpandedKeys);
          }
          onExpand === null || onExpand === void 0 ? void 0 : onExpand(newExpandedKeys, {
            node: convertNodePropsToEventData(node.props),
            expanded: true,
            nativeEvent: event.nativeEvent
          });
        }, 800);
      }
      if (dragNode.props.eventKey === dropTargetKey && dropLevelOffset === 0) {
        _this.resetDragState();
        return;
      }
      _this.setState({
        dragOverNodeKey,
        dropPosition,
        dropLevelOffset,
        dropTargetKey,
        dropContainerKey,
        dropTargetPos,
        dropAllowed
      });
      onDragEnter === null || onDragEnter === void 0 ? void 0 : onDragEnter({
        event,
        node: convertNodePropsToEventData(node.props),
        expandedKeys
      });
    };
    _this.onNodeDragOver = function(event, node) {
      var _this$state3 = _this.state, dragChildrenKeys = _this$state3.dragChildrenKeys, flattenNodes = _this$state3.flattenNodes, keyEntities = _this$state3.keyEntities, expandedKeys = _this$state3.expandedKeys, indent = _this$state3.indent;
      var _this$props2 = _this.props, onDragOver = _this$props2.onDragOver, allowDrop2 = _this$props2.allowDrop, direction = _this$props2.direction;
      var _assertThisInitialize2 = _assertThisInitialized(_this), dragNode = _assertThisInitialize2.dragNode;
      if (!dragNode) {
        return;
      }
      var _calcDropPosition2 = calcDropPosition(event, dragNode, node, indent, _this.dragStartMousePosition, allowDrop2, flattenNodes, keyEntities, expandedKeys, direction), dropPosition = _calcDropPosition2.dropPosition, dropLevelOffset = _calcDropPosition2.dropLevelOffset, dropTargetKey = _calcDropPosition2.dropTargetKey, dropContainerKey = _calcDropPosition2.dropContainerKey, dropAllowed = _calcDropPosition2.dropAllowed, dropTargetPos = _calcDropPosition2.dropTargetPos, dragOverNodeKey = _calcDropPosition2.dragOverNodeKey;
      if (dragChildrenKeys.indexOf(dropTargetKey) !== -1 || !dropAllowed) {
        return;
      }
      if (dragNode.props.eventKey === dropTargetKey && dropLevelOffset === 0) {
        if (!(_this.state.dropPosition === null && _this.state.dropLevelOffset === null && _this.state.dropTargetKey === null && _this.state.dropContainerKey === null && _this.state.dropTargetPos === null && _this.state.dropAllowed === false && _this.state.dragOverNodeKey === null)) {
          _this.resetDragState();
        }
      } else if (!(dropPosition === _this.state.dropPosition && dropLevelOffset === _this.state.dropLevelOffset && dropTargetKey === _this.state.dropTargetKey && dropContainerKey === _this.state.dropContainerKey && dropTargetPos === _this.state.dropTargetPos && dropAllowed === _this.state.dropAllowed && dragOverNodeKey === _this.state.dragOverNodeKey)) {
        _this.setState({
          dropPosition,
          dropLevelOffset,
          dropTargetKey,
          dropContainerKey,
          dropTargetPos,
          dropAllowed,
          dragOverNodeKey
        });
      }
      onDragOver === null || onDragOver === void 0 ? void 0 : onDragOver({
        event,
        node: convertNodePropsToEventData(node.props)
      });
    };
    _this.onNodeDragLeave = function(event, node) {
      if (_this.currentMouseOverDroppableNodeKey === node.props.eventKey && !event.currentTarget.contains(event.relatedTarget)) {
        _this.resetDragState();
        _this.currentMouseOverDroppableNodeKey = null;
      }
      var onDragLeave = _this.props.onDragLeave;
      onDragLeave === null || onDragLeave === void 0 ? void 0 : onDragLeave({
        event,
        node: convertNodePropsToEventData(node.props)
      });
    };
    _this.onWindowDragEnd = function(event) {
      _this.onNodeDragEnd(event, null, true);
      window.removeEventListener("dragend", _this.onWindowDragEnd);
    };
    _this.onNodeDragEnd = function(event, node) {
      var onDragEnd = _this.props.onDragEnd;
      _this.setState({
        dragOverNodeKey: null
      });
      _this.cleanDragState();
      onDragEnd === null || onDragEnd === void 0 ? void 0 : onDragEnd({
        event,
        node: convertNodePropsToEventData(node.props)
      });
      _this.dragNode = null;
      window.removeEventListener("dragend", _this.onWindowDragEnd);
    };
    _this.onNodeDrop = function(event, node) {
      var _this$getActiveItem;
      var outsideTree = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : false;
      var _this$state4 = _this.state, dragChildrenKeys = _this$state4.dragChildrenKeys, dropPosition = _this$state4.dropPosition, dropTargetKey = _this$state4.dropTargetKey, dropTargetPos = _this$state4.dropTargetPos, dropAllowed = _this$state4.dropAllowed;
      if (!dropAllowed)
        return;
      var onDrop = _this.props.onDrop;
      _this.setState({
        dragOverNodeKey: null
      });
      _this.cleanDragState();
      if (dropTargetKey === null)
        return;
      var abstractDropNodeProps = _objectSpread2(_objectSpread2({}, getTreeNodeProps(dropTargetKey, _this.getTreeNodeRequiredProps())), {}, {
        active: ((_this$getActiveItem = _this.getActiveItem()) === null || _this$getActiveItem === void 0 ? void 0 : _this$getActiveItem.key) === dropTargetKey,
        data: _this.state.keyEntities[dropTargetKey].node
      });
      var dropToChild = dragChildrenKeys.indexOf(dropTargetKey) !== -1;
      warningOnce(!dropToChild, "Can not drop to dragNode's children node. This is a bug of rc-tree. Please report an issue.");
      var posArr = posToArr(dropTargetPos);
      var dropResult = {
        event,
        node: convertNodePropsToEventData(abstractDropNodeProps),
        dragNode: _this.dragNode ? convertNodePropsToEventData(_this.dragNode.props) : null,
        dragNodesKeys: [_this.dragNode.props.eventKey].concat(dragChildrenKeys),
        dropToGap: dropPosition !== 0,
        dropPosition: dropPosition + Number(posArr[posArr.length - 1])
      };
      if (!outsideTree) {
        onDrop === null || onDrop === void 0 ? void 0 : onDrop(dropResult);
      }
      _this.dragNode = null;
    };
    _this.cleanDragState = function() {
      var draggingNodeKey = _this.state.draggingNodeKey;
      if (draggingNodeKey !== null) {
        _this.setState({
          draggingNodeKey: null,
          dropPosition: null,
          dropContainerKey: null,
          dropTargetKey: null,
          dropLevelOffset: null,
          dropAllowed: true,
          dragOverNodeKey: null
        });
      }
      _this.dragStartMousePosition = null;
      _this.currentMouseOverDroppableNodeKey = null;
    };
    _this.triggerExpandActionExpand = function(e, treeNode) {
      var _this$state5 = _this.state, expandedKeys = _this$state5.expandedKeys, flattenNodes = _this$state5.flattenNodes;
      var expanded = treeNode.expanded, key = treeNode.key, isLeaf = treeNode.isLeaf;
      if (isLeaf || e.shiftKey || e.metaKey || e.ctrlKey) {
        return;
      }
      var node = flattenNodes.filter(function(nodeItem) {
        return nodeItem.key === key;
      })[0];
      var eventNode = convertNodePropsToEventData(_objectSpread2(_objectSpread2({}, getTreeNodeProps(key, _this.getTreeNodeRequiredProps())), {}, {
        data: node.data
      }));
      _this.setExpandedKeys(expanded ? arrDel(expandedKeys, key) : arrAdd(expandedKeys, key));
      _this.onNodeExpand(e, eventNode);
    };
    _this.onNodeClick = function(e, treeNode) {
      var _this$props3 = _this.props, onClick = _this$props3.onClick, expandAction = _this$props3.expandAction;
      if (expandAction === "click") {
        _this.triggerExpandActionExpand(e, treeNode);
      }
      onClick === null || onClick === void 0 ? void 0 : onClick(e, treeNode);
    };
    _this.onNodeDoubleClick = function(e, treeNode) {
      var _this$props4 = _this.props, onDoubleClick = _this$props4.onDoubleClick, expandAction = _this$props4.expandAction;
      if (expandAction === "doubleClick") {
        _this.triggerExpandActionExpand(e, treeNode);
      }
      onDoubleClick === null || onDoubleClick === void 0 ? void 0 : onDoubleClick(e, treeNode);
    };
    _this.onNodeSelect = function(e, treeNode) {
      var selectedKeys = _this.state.selectedKeys;
      var _this$state6 = _this.state, keyEntities = _this$state6.keyEntities, fieldNames = _this$state6.fieldNames;
      var _this$props5 = _this.props, onSelect = _this$props5.onSelect, multiple = _this$props5.multiple;
      var selected = treeNode.selected;
      var key = treeNode[fieldNames.key];
      var targetSelected = !selected;
      if (!targetSelected) {
        selectedKeys = arrDel(selectedKeys, key);
      } else if (!multiple) {
        selectedKeys = [key];
      } else {
        selectedKeys = arrAdd(selectedKeys, key);
      }
      var selectedNodes = selectedKeys.map(function(selectedKey) {
        var entity = keyEntities[selectedKey];
        if (!entity)
          return null;
        return entity.node;
      }).filter(function(node) {
        return node;
      });
      _this.setUncontrolledState({
        selectedKeys
      });
      onSelect === null || onSelect === void 0 ? void 0 : onSelect(selectedKeys, {
        event: "select",
        selected: targetSelected,
        node: treeNode,
        selectedNodes,
        nativeEvent: e.nativeEvent
      });
    };
    _this.onNodeCheck = function(e, treeNode, checked) {
      var _this$state7 = _this.state, keyEntities = _this$state7.keyEntities, oriCheckedKeys = _this$state7.checkedKeys, oriHalfCheckedKeys = _this$state7.halfCheckedKeys;
      var _this$props6 = _this.props, checkStrictly = _this$props6.checkStrictly, onCheck = _this$props6.onCheck;
      var key = treeNode.key;
      var checkedObj;
      var eventObj = {
        event: "check",
        node: treeNode,
        checked,
        nativeEvent: e.nativeEvent
      };
      if (checkStrictly) {
        var checkedKeys = checked ? arrAdd(oriCheckedKeys, key) : arrDel(oriCheckedKeys, key);
        var halfCheckedKeys = arrDel(oriHalfCheckedKeys, key);
        checkedObj = {
          checked: checkedKeys,
          halfChecked: halfCheckedKeys
        };
        eventObj.checkedNodes = checkedKeys.map(function(checkedKey) {
          return keyEntities[checkedKey];
        }).filter(function(entity) {
          return entity;
        }).map(function(entity) {
          return entity.node;
        });
        _this.setUncontrolledState({
          checkedKeys
        });
      } else {
        var _conductCheck = conductCheck([].concat(_toConsumableArray(oriCheckedKeys), [key]), true, keyEntities), _checkedKeys = _conductCheck.checkedKeys, _halfCheckedKeys = _conductCheck.halfCheckedKeys;
        if (!checked) {
          var keySet = new Set(_checkedKeys);
          keySet.delete(key);
          var _conductCheck2 = conductCheck(Array.from(keySet), {
            checked: false,
            halfCheckedKeys: _halfCheckedKeys
          }, keyEntities);
          _checkedKeys = _conductCheck2.checkedKeys;
          _halfCheckedKeys = _conductCheck2.halfCheckedKeys;
        }
        checkedObj = _checkedKeys;
        eventObj.checkedNodes = [];
        eventObj.checkedNodesPositions = [];
        eventObj.halfCheckedKeys = _halfCheckedKeys;
        _checkedKeys.forEach(function(checkedKey) {
          var entity = keyEntities[checkedKey];
          if (!entity)
            return;
          var node = entity.node, pos = entity.pos;
          eventObj.checkedNodes.push(node);
          eventObj.checkedNodesPositions.push({
            node,
            pos
          });
        });
        _this.setUncontrolledState({
          checkedKeys: _checkedKeys
        }, false, {
          halfCheckedKeys: _halfCheckedKeys
        });
      }
      onCheck === null || onCheck === void 0 ? void 0 : onCheck(checkedObj, eventObj);
    };
    _this.onNodeLoad = function(treeNode) {
      var key = treeNode.key;
      var loadPromise = new Promise(function(resolve, reject) {
        _this.setState(function(_ref) {
          var _ref$loadedKeys = _ref.loadedKeys, loadedKeys = _ref$loadedKeys === void 0 ? [] : _ref$loadedKeys, _ref$loadingKeys = _ref.loadingKeys, loadingKeys = _ref$loadingKeys === void 0 ? [] : _ref$loadingKeys;
          var _this$props7 = _this.props, loadData = _this$props7.loadData, onLoad = _this$props7.onLoad;
          if (!loadData || loadedKeys.indexOf(key) !== -1 || loadingKeys.indexOf(key) !== -1) {
            return null;
          }
          var promise = loadData(treeNode);
          promise.then(function() {
            var currentLoadedKeys = _this.state.loadedKeys;
            var newLoadedKeys = arrAdd(currentLoadedKeys, key);
            onLoad === null || onLoad === void 0 ? void 0 : onLoad(newLoadedKeys, {
              event: "load",
              node: treeNode
            });
            _this.setUncontrolledState({
              loadedKeys: newLoadedKeys
            });
            _this.setState(function(prevState) {
              return {
                loadingKeys: arrDel(prevState.loadingKeys, key)
              };
            });
            resolve();
          }).catch(function(e) {
            _this.setState(function(prevState) {
              return {
                loadingKeys: arrDel(prevState.loadingKeys, key)
              };
            });
            _this.loadingRetryTimes[key] = (_this.loadingRetryTimes[key] || 0) + 1;
            if (_this.loadingRetryTimes[key] >= MAX_RETRY_TIMES) {
              var currentLoadedKeys = _this.state.loadedKeys;
              warningOnce(false, "Retry for `loadData` many times but still failed. No more retry.");
              _this.setUncontrolledState({
                loadedKeys: arrAdd(currentLoadedKeys, key)
              });
              resolve();
            }
            reject(e);
          });
          return {
            loadingKeys: arrAdd(loadingKeys, key)
          };
        });
      });
      loadPromise.catch(function() {
      });
      return loadPromise;
    };
    _this.onNodeMouseEnter = function(event, node) {
      var onMouseEnter = _this.props.onMouseEnter;
      onMouseEnter === null || onMouseEnter === void 0 ? void 0 : onMouseEnter({
        event,
        node
      });
    };
    _this.onNodeMouseLeave = function(event, node) {
      var onMouseLeave = _this.props.onMouseLeave;
      onMouseLeave === null || onMouseLeave === void 0 ? void 0 : onMouseLeave({
        event,
        node
      });
    };
    _this.onNodeContextMenu = function(event, node) {
      var onRightClick = _this.props.onRightClick;
      if (onRightClick) {
        event.preventDefault();
        onRightClick({
          event,
          node
        });
      }
    };
    _this.onFocus = function() {
      var onFocus = _this.props.onFocus;
      _this.setState({
        focused: true
      });
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      onFocus === null || onFocus === void 0 ? void 0 : onFocus.apply(void 0, args);
    };
    _this.onBlur = function() {
      var onBlur = _this.props.onBlur;
      _this.setState({
        focused: false
      });
      _this.onActiveChange(null);
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      onBlur === null || onBlur === void 0 ? void 0 : onBlur.apply(void 0, args);
    };
    _this.getTreeNodeRequiredProps = function() {
      var _this$state8 = _this.state, expandedKeys = _this$state8.expandedKeys, selectedKeys = _this$state8.selectedKeys, loadedKeys = _this$state8.loadedKeys, loadingKeys = _this$state8.loadingKeys, checkedKeys = _this$state8.checkedKeys, halfCheckedKeys = _this$state8.halfCheckedKeys, dragOverNodeKey = _this$state8.dragOverNodeKey, dropPosition = _this$state8.dropPosition, keyEntities = _this$state8.keyEntities;
      return {
        expandedKeys: expandedKeys || [],
        selectedKeys: selectedKeys || [],
        loadedKeys: loadedKeys || [],
        loadingKeys: loadingKeys || [],
        checkedKeys: checkedKeys || [],
        halfCheckedKeys: halfCheckedKeys || [],
        dragOverNodeKey,
        dropPosition,
        keyEntities
      };
    };
    _this.setExpandedKeys = function(expandedKeys) {
      var _this$state9 = _this.state, treeData2 = _this$state9.treeData, fieldNames = _this$state9.fieldNames;
      var flattenNodes = flattenTreeData(treeData2, expandedKeys, fieldNames);
      _this.setUncontrolledState({
        expandedKeys,
        flattenNodes
      }, true);
    };
    _this.onNodeExpand = function(e, treeNode) {
      var expandedKeys = _this.state.expandedKeys;
      var _this$state10 = _this.state, listChanging = _this$state10.listChanging, fieldNames = _this$state10.fieldNames;
      var _this$props8 = _this.props, onExpand = _this$props8.onExpand, loadData = _this$props8.loadData;
      var expanded = treeNode.expanded;
      var key = treeNode[fieldNames.key];
      if (listChanging) {
        return;
      }
      var index2 = expandedKeys.indexOf(key);
      var targetExpanded = !expanded;
      warningOnce(expanded && index2 !== -1 || !expanded && index2 === -1, "Expand state not sync with index check");
      if (targetExpanded) {
        expandedKeys = arrAdd(expandedKeys, key);
      } else {
        expandedKeys = arrDel(expandedKeys, key);
      }
      _this.setExpandedKeys(expandedKeys);
      onExpand === null || onExpand === void 0 ? void 0 : onExpand(expandedKeys, {
        node: treeNode,
        expanded: targetExpanded,
        nativeEvent: e.nativeEvent
      });
      if (targetExpanded && loadData) {
        var loadPromise = _this.onNodeLoad(treeNode);
        if (loadPromise) {
          loadPromise.then(function() {
            var newFlattenTreeData = flattenTreeData(_this.state.treeData, expandedKeys, fieldNames);
            _this.setUncontrolledState({
              flattenNodes: newFlattenTreeData
            });
          }).catch(function() {
            var currentExpandedKeys = _this.state.expandedKeys;
            var expandedKeysToRestore = arrDel(currentExpandedKeys, key);
            _this.setExpandedKeys(expandedKeysToRestore);
          });
        }
      }
    };
    _this.onListChangeStart = function() {
      _this.setUncontrolledState({
        listChanging: true
      });
    };
    _this.onListChangeEnd = function() {
      setTimeout(function() {
        _this.setUncontrolledState({
          listChanging: false
        });
      });
    };
    _this.onActiveChange = function(newActiveKey) {
      var activeKey = _this.state.activeKey;
      var onActiveChange = _this.props.onActiveChange;
      if (activeKey === newActiveKey) {
        return;
      }
      _this.setState({
        activeKey: newActiveKey
      });
      if (newActiveKey !== null) {
        _this.scrollTo({
          key: newActiveKey
        });
      }
      onActiveChange === null || onActiveChange === void 0 ? void 0 : onActiveChange(newActiveKey);
    };
    _this.getActiveItem = function() {
      var _this$state11 = _this.state, activeKey = _this$state11.activeKey, flattenNodes = _this$state11.flattenNodes;
      if (activeKey === null) {
        return null;
      }
      return flattenNodes.find(function(_ref2) {
        var key = _ref2.key;
        return key === activeKey;
      }) || null;
    };
    _this.offsetActiveKey = function(offset2) {
      var _this$state12 = _this.state, flattenNodes = _this$state12.flattenNodes, activeKey = _this$state12.activeKey;
      var index2 = flattenNodes.findIndex(function(_ref3) {
        var key2 = _ref3.key;
        return key2 === activeKey;
      });
      if (index2 === -1 && offset2 < 0) {
        index2 = flattenNodes.length;
      }
      index2 = (index2 + offset2 + flattenNodes.length) % flattenNodes.length;
      var item2 = flattenNodes[index2];
      if (item2) {
        var key = item2.key;
        _this.onActiveChange(key);
      } else {
        _this.onActiveChange(null);
      }
    };
    _this.onKeyDown = function(event) {
      var _this$state13 = _this.state, activeKey = _this$state13.activeKey, expandedKeys = _this$state13.expandedKeys, checkedKeys = _this$state13.checkedKeys, fieldNames = _this$state13.fieldNames;
      var _this$props9 = _this.props, onKeyDown = _this$props9.onKeyDown, checkable = _this$props9.checkable, selectable = _this$props9.selectable;
      switch (event.which) {
        case KeyCode.UP: {
          _this.offsetActiveKey(-1);
          event.preventDefault();
          break;
        }
        case KeyCode.DOWN: {
          _this.offsetActiveKey(1);
          event.preventDefault();
          break;
        }
      }
      var activeItem = _this.getActiveItem();
      if (activeItem && activeItem.data) {
        var treeNodeRequiredProps = _this.getTreeNodeRequiredProps();
        var expandable = activeItem.data.isLeaf === false || !!(activeItem.data[fieldNames.children] || []).length;
        var eventNode = convertNodePropsToEventData(_objectSpread2(_objectSpread2({}, getTreeNodeProps(activeKey, treeNodeRequiredProps)), {}, {
          data: activeItem.data,
          active: true
        }));
        switch (event.which) {
          case KeyCode.LEFT: {
            if (expandable && expandedKeys.includes(activeKey)) {
              _this.onNodeExpand({}, eventNode);
            } else if (activeItem.parent) {
              _this.onActiveChange(activeItem.parent.key);
            }
            event.preventDefault();
            break;
          }
          case KeyCode.RIGHT: {
            if (expandable && !expandedKeys.includes(activeKey)) {
              _this.onNodeExpand({}, eventNode);
            } else if (activeItem.children && activeItem.children.length) {
              _this.onActiveChange(activeItem.children[0].key);
            }
            event.preventDefault();
            break;
          }
          case KeyCode.ENTER:
          case KeyCode.SPACE: {
            if (checkable && !eventNode.disabled && eventNode.checkable !== false && !eventNode.disableCheckbox) {
              _this.onNodeCheck({}, eventNode, !checkedKeys.includes(activeKey));
            } else if (!checkable && selectable && !eventNode.disabled && eventNode.selectable !== false) {
              _this.onNodeSelect({}, eventNode);
            }
            break;
          }
        }
      }
      onKeyDown === null || onKeyDown === void 0 ? void 0 : onKeyDown(event);
    };
    _this.setUncontrolledState = function(state) {
      var atomic = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
      var forceState = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!_this.destroyed) {
        var needSync = false;
        var allPassed = true;
        var newState = {};
        Object.keys(state).forEach(function(name) {
          if (name in _this.props) {
            allPassed = false;
            return;
          }
          needSync = true;
          newState[name] = state[name];
        });
        if (needSync && (!atomic || allPassed)) {
          _this.setState(_objectSpread2(_objectSpread2({}, newState), forceState));
        }
      }
    };
    _this.scrollTo = function(scroll) {
      _this.listRef.current.scrollTo(scroll);
    };
    return _this;
  }
  _createClass(Tree2, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.destroyed = false;
      this.onUpdated();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.onUpdated();
    }
  }, {
    key: "onUpdated",
    value: function onUpdated() {
      var activeKey = this.props.activeKey;
      if (activeKey !== void 0 && activeKey !== this.state.activeKey) {
        this.setState({
          activeKey
        });
        if (activeKey !== null) {
          this.scrollTo({
            key: activeKey
          });
        }
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      window.removeEventListener("dragend", this.onWindowDragEnd);
      this.destroyed = true;
    }
  }, {
    key: "resetDragState",
    value: function resetDragState() {
      this.setState({
        dragOverNodeKey: null,
        dropPosition: null,
        dropLevelOffset: null,
        dropTargetKey: null,
        dropContainerKey: null,
        dropTargetPos: null,
        dropAllowed: false
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _classNames;
      var _this$state14 = this.state, focused = _this$state14.focused, flattenNodes = _this$state14.flattenNodes, keyEntities = _this$state14.keyEntities, draggingNodeKey = _this$state14.draggingNodeKey, activeKey = _this$state14.activeKey, dropLevelOffset = _this$state14.dropLevelOffset, dropContainerKey = _this$state14.dropContainerKey, dropTargetKey = _this$state14.dropTargetKey, dropPosition = _this$state14.dropPosition, dragOverNodeKey = _this$state14.dragOverNodeKey, indent = _this$state14.indent;
      var _this$props10 = this.props, prefixCls = _this$props10.prefixCls, className = _this$props10.className, style2 = _this$props10.style, showLine = _this$props10.showLine, focusable = _this$props10.focusable, _this$props10$tabInde = _this$props10.tabIndex, tabIndex = _this$props10$tabInde === void 0 ? 0 : _this$props10$tabInde, selectable = _this$props10.selectable, showIcon = _this$props10.showIcon, icon = _this$props10.icon, switcherIcon = _this$props10.switcherIcon, draggable = _this$props10.draggable, checkable = _this$props10.checkable, checkStrictly = _this$props10.checkStrictly, disabled = _this$props10.disabled, motion = _this$props10.motion, loadData = _this$props10.loadData, filterTreeNode = _this$props10.filterTreeNode, height = _this$props10.height, itemHeight = _this$props10.itemHeight, virtual = _this$props10.virtual, titleRender = _this$props10.titleRender, dropIndicatorRender2 = _this$props10.dropIndicatorRender, onContextMenu = _this$props10.onContextMenu, onScroll = _this$props10.onScroll, direction = _this$props10.direction, rootClassName = _this$props10.rootClassName, rootStyle = _this$props10.rootStyle;
      var domProps = pickAttrs(this.props, {
        aria: true,
        data: true
      });
      var draggableConfig;
      if (draggable) {
        if (_typeof(draggable) === "object") {
          draggableConfig = draggable;
        } else if (typeof draggable === "function") {
          draggableConfig = {
            nodeDraggable: draggable
          };
        } else {
          draggableConfig = {};
        }
      }
      return /* @__PURE__ */ reactExports.createElement(TreeContext.Provider, {
        value: {
          prefixCls,
          selectable,
          showIcon,
          icon,
          switcherIcon,
          draggable: draggableConfig,
          draggingNodeKey,
          checkable,
          checkStrictly,
          disabled,
          keyEntities,
          dropLevelOffset,
          dropContainerKey,
          dropTargetKey,
          dropPosition,
          dragOverNodeKey,
          indent,
          direction,
          dropIndicatorRender: dropIndicatorRender2,
          loadData,
          filterTreeNode,
          titleRender,
          onNodeClick: this.onNodeClick,
          onNodeDoubleClick: this.onNodeDoubleClick,
          onNodeExpand: this.onNodeExpand,
          onNodeSelect: this.onNodeSelect,
          onNodeCheck: this.onNodeCheck,
          onNodeLoad: this.onNodeLoad,
          onNodeMouseEnter: this.onNodeMouseEnter,
          onNodeMouseLeave: this.onNodeMouseLeave,
          onNodeContextMenu: this.onNodeContextMenu,
          onNodeDragStart: this.onNodeDragStart,
          onNodeDragEnter: this.onNodeDragEnter,
          onNodeDragOver: this.onNodeDragOver,
          onNodeDragLeave: this.onNodeDragLeave,
          onNodeDragEnd: this.onNodeDragEnd,
          onNodeDrop: this.onNodeDrop
        }
      }, /* @__PURE__ */ reactExports.createElement("div", {
        role: "tree",
        className: classNames(prefixCls, className, rootClassName, (_classNames = {}, _defineProperty(_classNames, "".concat(prefixCls, "-show-line"), showLine), _defineProperty(_classNames, "".concat(prefixCls, "-focused"), focused), _defineProperty(_classNames, "".concat(prefixCls, "-active-focused"), activeKey !== null), _classNames)),
        style: rootStyle
      }, /* @__PURE__ */ reactExports.createElement(NodeList, _extends({
        ref: this.listRef,
        prefixCls,
        style: style2,
        data: flattenNodes,
        disabled,
        selectable,
        checkable: !!checkable,
        motion,
        dragging: draggingNodeKey !== null,
        height,
        itemHeight,
        virtual,
        focusable,
        focused,
        tabIndex,
        activeItem: this.getActiveItem(),
        onFocus: this.onFocus,
        onBlur: this.onBlur,
        onKeyDown: this.onKeyDown,
        onActiveChange: this.onActiveChange,
        onListChangeStart: this.onListChangeStart,
        onListChangeEnd: this.onListChangeEnd,
        onContextMenu,
        onScroll
      }, this.getTreeNodeRequiredProps(), domProps))));
    }
  }], [{
    key: "getDerivedStateFromProps",
    value: function getDerivedStateFromProps(props, prevState) {
      var prevProps = prevState.prevProps;
      var newState = {
        prevProps: props
      };
      function needSync(name) {
        return !prevProps && name in props || prevProps && prevProps[name] !== props[name];
      }
      var treeData2;
      var fieldNames = prevState.fieldNames;
      if (needSync("fieldNames")) {
        fieldNames = fillFieldNames(props.fieldNames);
        newState.fieldNames = fieldNames;
      }
      if (needSync("treeData")) {
        treeData2 = props.treeData;
      } else if (needSync("children")) {
        warningOnce(false, "`children` of Tree is deprecated. Please use `treeData` instead.");
        treeData2 = convertTreeToData(props.children);
      }
      if (treeData2) {
        newState.treeData = treeData2;
        var entitiesMap = convertDataToEntities(treeData2, {
          fieldNames
        });
        newState.keyEntities = _objectSpread2(_defineProperty({}, MOTION_KEY, MotionEntity), entitiesMap.keyEntities);
      }
      var keyEntities = newState.keyEntities || prevState.keyEntities;
      if (needSync("expandedKeys") || prevProps && needSync("autoExpandParent")) {
        newState.expandedKeys = props.autoExpandParent || !prevProps && props.defaultExpandParent ? conductExpandParent(props.expandedKeys, keyEntities) : props.expandedKeys;
      } else if (!prevProps && props.defaultExpandAll) {
        var cloneKeyEntities = _objectSpread2({}, keyEntities);
        delete cloneKeyEntities[MOTION_KEY];
        newState.expandedKeys = Object.keys(cloneKeyEntities).map(function(key) {
          return cloneKeyEntities[key].key;
        });
      } else if (!prevProps && props.defaultExpandedKeys) {
        newState.expandedKeys = props.autoExpandParent || props.defaultExpandParent ? conductExpandParent(props.defaultExpandedKeys, keyEntities) : props.defaultExpandedKeys;
      }
      if (!newState.expandedKeys) {
        delete newState.expandedKeys;
      }
      if (treeData2 || newState.expandedKeys) {
        var flattenNodes = flattenTreeData(treeData2 || prevState.treeData, newState.expandedKeys || prevState.expandedKeys, fieldNames);
        newState.flattenNodes = flattenNodes;
      }
      if (props.selectable) {
        if (needSync("selectedKeys")) {
          newState.selectedKeys = calcSelectedKeys(props.selectedKeys, props);
        } else if (!prevProps && props.defaultSelectedKeys) {
          newState.selectedKeys = calcSelectedKeys(props.defaultSelectedKeys, props);
        }
      }
      if (props.checkable) {
        var checkedKeyEntity;
        if (needSync("checkedKeys")) {
          checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {};
        } else if (!prevProps && props.defaultCheckedKeys) {
          checkedKeyEntity = parseCheckedKeys(props.defaultCheckedKeys) || {};
        } else if (treeData2) {
          checkedKeyEntity = parseCheckedKeys(props.checkedKeys) || {
            checkedKeys: prevState.checkedKeys,
            halfCheckedKeys: prevState.halfCheckedKeys
          };
        }
        if (checkedKeyEntity) {
          var _checkedKeyEntity = checkedKeyEntity, _checkedKeyEntity$che = _checkedKeyEntity.checkedKeys, checkedKeys = _checkedKeyEntity$che === void 0 ? [] : _checkedKeyEntity$che, _checkedKeyEntity$hal = _checkedKeyEntity.halfCheckedKeys, halfCheckedKeys = _checkedKeyEntity$hal === void 0 ? [] : _checkedKeyEntity$hal;
          if (!props.checkStrictly) {
            var conductKeys = conductCheck(checkedKeys, true, keyEntities);
            checkedKeys = conductKeys.checkedKeys;
            halfCheckedKeys = conductKeys.halfCheckedKeys;
          }
          newState.checkedKeys = checkedKeys;
          newState.halfCheckedKeys = halfCheckedKeys;
        }
      }
      if (needSync("loadedKeys")) {
        newState.loadedKeys = props.loadedKeys;
      }
      return newState;
    }
  }]);
  return Tree2;
}(reactExports.Component);
Tree$3.defaultProps = {
  prefixCls: "rc-tree",
  showLine: false,
  showIcon: true,
  selectable: true,
  multiple: false,
  checkable: false,
  disabled: false,
  checkStrictly: false,
  draggable: false,
  defaultExpandParent: true,
  autoExpandParent: false,
  defaultExpandAll: false,
  defaultExpandedKeys: [],
  defaultCheckedKeys: [],
  defaultSelectedKeys: [],
  dropIndicatorRender: DropIndicator,
  allowDrop: function allowDrop() {
    return true;
  },
  expandAction: false
};
Tree$3.TreeNode = ContextTreeNode;
const treeNodeFX = new Keyframe("ant-tree-node-fx-do-not-use", {
  "0%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
});
const getSwitchStyle = (prefixCls, token) => ({
  [`.${prefixCls}-switcher-icon`]: {
    display: "inline-block",
    fontSize: 10,
    verticalAlign: "baseline",
    svg: {
      transition: `transform ${token.motionDurationSlow}`
    }
  }
});
const getDropIndicatorStyle = (prefixCls, token) => ({
  [`.${prefixCls}-drop-indicator`]: {
    position: "absolute",
    // it should displayed over the following node
    zIndex: 1,
    height: 2,
    backgroundColor: token.colorPrimary,
    borderRadius: 1,
    pointerEvents: "none",
    "&:after": {
      position: "absolute",
      top: -3,
      insetInlineStart: -6,
      width: 8,
      height: 8,
      backgroundColor: "transparent",
      border: `${token.lineWidthBold}px solid ${token.colorPrimary}`,
      borderRadius: "50%",
      content: '""'
    }
  }
});
const genBaseStyle = (prefixCls, token) => {
  const {
    treeCls,
    treeNodeCls,
    treeNodePadding,
    treeTitleHeight
  } = token;
  const treeCheckBoxMarginHorizontal = token.paddingXS;
  return {
    [treeCls]: Object.assign(Object.assign({}, resetComponent(token)), {
      background: token.colorBgContainer,
      borderRadius: token.borderRadius,
      transition: `background-color ${token.motionDurationSlow}`,
      [`&${treeCls}-rtl`]: {
        // >>> Switcher
        [`${treeCls}-switcher`]: {
          "&_close": {
            [`${treeCls}-switcher-icon`]: {
              svg: {
                transform: "rotate(90deg)"
              }
            }
          }
        }
      },
      [`&-focused:not(:hover):not(${treeCls}-active-focused)`]: Object.assign({}, genFocusOutline(token)),
      // =================== Virtual List ===================
      [`${treeCls}-list-holder-inner`]: {
        alignItems: "flex-start"
      },
      [`&${treeCls}-block-node`]: {
        [`${treeCls}-list-holder-inner`]: {
          alignItems: "stretch",
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            flex: "auto"
          },
          // >>> Drag
          [`${treeNodeCls}.dragging`]: {
            position: "relative",
            "&:after": {
              position: "absolute",
              top: 0,
              insetInlineEnd: 0,
              bottom: treeNodePadding,
              insetInlineStart: 0,
              border: `1px solid ${token.colorPrimary}`,
              opacity: 0,
              animationName: treeNodeFX,
              animationDuration: token.motionDurationSlow,
              animationPlayState: "running",
              animationFillMode: "forwards",
              content: '""',
              pointerEvents: "none"
            }
          }
        }
      },
      // ===================== TreeNode =====================
      [`${treeNodeCls}`]: {
        display: "flex",
        alignItems: "flex-start",
        padding: `0 0 ${treeNodePadding}px 0`,
        outline: "none",
        "&-rtl": {
          direction: "rtl"
        },
        // Disabled
        "&-disabled": {
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            color: token.colorTextDisabled,
            cursor: "not-allowed",
            "&:hover": {
              background: "transparent"
            }
          }
        },
        [`&-active ${treeCls}-node-content-wrapper`]: Object.assign({}, genFocusOutline(token)),
        [`&:not(${treeNodeCls}-disabled).filter-node ${treeCls}-title`]: {
          color: "inherit",
          fontWeight: 500
        },
        "&-draggable": {
          [`${treeCls}-draggable-icon`]: {
            // https://github.com/ant-design/ant-design/issues/41915
            flexShrink: 0,
            width: treeTitleHeight,
            lineHeight: `${treeTitleHeight}px`,
            textAlign: "center",
            visibility: "visible",
            opacity: 0.2,
            transition: `opacity ${token.motionDurationSlow}`,
            [`${treeNodeCls}:hover &`]: {
              opacity: 0.45
            }
          },
          [`&${treeNodeCls}-disabled`]: {
            [`${treeCls}-draggable-icon`]: {
              visibility: "hidden"
            }
          }
        }
      },
      // >>> Indent
      [`${treeCls}-indent`]: {
        alignSelf: "stretch",
        whiteSpace: "nowrap",
        userSelect: "none",
        "&-unit": {
          display: "inline-block",
          width: treeTitleHeight
        }
      },
      // >>> Drag Handler
      [`${treeCls}-draggable-icon`]: {
        visibility: "hidden"
      },
      // >>> Switcher
      [`${treeCls}-switcher`]: Object.assign(Object.assign({}, getSwitchStyle(prefixCls, token)), {
        position: "relative",
        flex: "none",
        alignSelf: "stretch",
        width: treeTitleHeight,
        margin: 0,
        lineHeight: `${treeTitleHeight}px`,
        textAlign: "center",
        cursor: "pointer",
        userSelect: "none",
        "&-noop": {
          cursor: "default"
        },
        "&_close": {
          [`${treeCls}-switcher-icon`]: {
            svg: {
              transform: "rotate(-90deg)"
            }
          }
        },
        "&-loading-icon": {
          color: token.colorPrimary
        },
        "&-leaf-line": {
          position: "relative",
          zIndex: 1,
          display: "inline-block",
          width: "100%",
          height: "100%",
          // https://github.com/ant-design/ant-design/issues/31884
          "&:before": {
            position: "absolute",
            top: 0,
            insetInlineEnd: treeTitleHeight / 2,
            bottom: -treeNodePadding,
            marginInlineStart: -1,
            borderInlineEnd: `1px solid ${token.colorBorder}`,
            content: '""'
          },
          "&:after": {
            position: "absolute",
            width: treeTitleHeight / 2 * 0.8,
            height: treeTitleHeight / 2,
            borderBottom: `1px solid ${token.colorBorder}`,
            content: '""'
          }
        }
      }),
      // >>> Checkbox
      [`${treeCls}-checkbox`]: {
        top: "initial",
        marginInlineEnd: treeCheckBoxMarginHorizontal
      },
      // >>> Title
      // add `${treeCls}-checkbox + span` to cover checkbox `${checkboxCls} + span`
      [`${treeCls}-node-content-wrapper, ${treeCls}-checkbox + span`]: {
        position: "relative",
        zIndex: "auto",
        minHeight: treeTitleHeight,
        margin: 0,
        padding: `0 ${token.paddingXS / 2}px`,
        color: "inherit",
        lineHeight: `${treeTitleHeight}px`,
        background: "transparent",
        borderRadius: token.borderRadius,
        cursor: "pointer",
        transition: `all ${token.motionDurationMid}, border 0s, line-height 0s, box-shadow 0s`,
        "&:hover": {
          backgroundColor: token.controlItemBgHover
        },
        [`&${treeCls}-node-selected`]: {
          backgroundColor: token.controlItemBgActive
        },
        // Icon
        [`${treeCls}-iconEle`]: {
          display: "inline-block",
          width: treeTitleHeight,
          height: treeTitleHeight,
          lineHeight: `${treeTitleHeight}px`,
          textAlign: "center",
          verticalAlign: "top",
          "&:empty": {
            display: "none"
          }
        }
      },
      // https://github.com/ant-design/ant-design/issues/28217
      [`${treeCls}-unselectable ${treeCls}-node-content-wrapper:hover`]: {
        backgroundColor: "transparent"
      },
      // ==================== Draggable =====================
      [`${treeCls}-node-content-wrapper`]: Object.assign({
        lineHeight: `${treeTitleHeight}px`,
        userSelect: "none"
      }, getDropIndicatorStyle(prefixCls, token)),
      [`${treeNodeCls}.drop-container`]: {
        "> [draggable]": {
          boxShadow: `0 0 0 2px ${token.colorPrimary}`
        }
      },
      // ==================== Show Line =====================
      "&-show-line": {
        // ================ Indent lines ================
        [`${treeCls}-indent`]: {
          "&-unit": {
            position: "relative",
            height: "100%",
            "&:before": {
              position: "absolute",
              top: 0,
              insetInlineEnd: treeTitleHeight / 2,
              bottom: -treeNodePadding,
              borderInlineEnd: `1px solid ${token.colorBorder}`,
              content: '""'
            },
            "&-end": {
              "&:before": {
                display: "none"
              }
            }
          }
        },
        // ============== Cover Background ==============
        [`${treeCls}-switcher`]: {
          background: "transparent",
          "&-line-icon": {
            // https://github.com/ant-design/ant-design/issues/32813
            verticalAlign: "-0.15em"
          }
        }
      },
      [`${treeNodeCls}-leaf-last`]: {
        [`${treeCls}-switcher`]: {
          "&-leaf-line": {
            "&:before": {
              top: "auto !important",
              bottom: "auto !important",
              height: `${treeTitleHeight / 2}px !important`
            }
          }
        }
      }
    })
  };
};
const genDirectoryStyle = (token) => {
  const {
    treeCls,
    treeNodeCls,
    treeNodePadding
  } = token;
  return {
    [`${treeCls}${treeCls}-directory`]: {
      // ================== TreeNode ==================
      [treeNodeCls]: {
        position: "relative",
        // Hover color
        "&:before": {
          position: "absolute",
          top: 0,
          insetInlineEnd: 0,
          bottom: treeNodePadding,
          insetInlineStart: 0,
          transition: `background-color ${token.motionDurationMid}`,
          content: '""',
          pointerEvents: "none"
        },
        "&:hover": {
          "&:before": {
            background: token.controlItemBgHover
          }
        },
        // Elements
        "> *": {
          zIndex: 1
        },
        // >>> Switcher
        [`${treeCls}-switcher`]: {
          transition: `color ${token.motionDurationMid}`
        },
        // >>> Title
        [`${treeCls}-node-content-wrapper`]: {
          borderRadius: 0,
          userSelect: "none",
          "&:hover": {
            background: "transparent"
          },
          [`&${treeCls}-node-selected`]: {
            color: token.colorTextLightSolid,
            background: "transparent"
          }
        },
        // ============= Selected =============
        "&-selected": {
          [`
            &:hover::before,
            &::before
          `]: {
            background: token.colorPrimary
          },
          // >>> Switcher
          [`${treeCls}-switcher`]: {
            color: token.colorTextLightSolid
          },
          // >>> Title
          [`${treeCls}-node-content-wrapper`]: {
            color: token.colorTextLightSolid,
            background: "transparent"
          }
        }
      }
    }
  };
};
const genTreeStyle = (prefixCls, token) => {
  const treeCls = `.${prefixCls}`;
  const treeNodeCls = `${treeCls}-treenode`;
  const treeNodePadding = token.paddingXS / 2;
  const treeTitleHeight = token.controlHeightSM;
  const treeToken = merge(token, {
    treeCls,
    treeNodeCls,
    treeNodePadding,
    treeTitleHeight
  });
  return [
    // Basic
    genBaseStyle(prefixCls, treeToken),
    // Directory
    genDirectoryStyle(treeToken)
  ];
};
const useStyle = genComponentStyleHook("Tree", (token, _ref) => {
  let {
    prefixCls
  } = _ref;
  return [{
    [token.componentCls]: getStyle(`${prefixCls}-checkbox`, token)
  }, genTreeStyle(prefixCls, token), genCollapseMotion$1(token)];
});
const offset = 4;
function dropIndicatorRender(props) {
  const {
    dropPosition,
    dropLevelOffset,
    prefixCls,
    indent,
    direction = "ltr"
  } = props;
  const startPosition = direction === "ltr" ? "left" : "right";
  const endPosition = direction === "ltr" ? "right" : "left";
  const style2 = {
    [startPosition]: -dropLevelOffset * indent + offset,
    [endPosition]: 0
  };
  switch (dropPosition) {
    case -1:
      style2.top = -3;
      break;
    case 1:
      style2.bottom = -3;
      break;
    default:
      style2.bottom = -3;
      style2[startPosition] = indent + offset;
      break;
  }
  return /* @__PURE__ */ React.createElement("div", {
    style: style2,
    className: `${prefixCls}-drop-indicator`
  });
}
const SwitcherIconCom = (props) => {
  const {
    prefixCls,
    switcherIcon,
    treeNodeProps,
    showLine
  } = props;
  const {
    isLeaf,
    expanded,
    loading
  } = treeNodeProps;
  if (loading) {
    return /* @__PURE__ */ reactExports.createElement(LoadingOutlined$1, {
      className: `${prefixCls}-switcher-loading-icon`
    });
  }
  let showLeafIcon;
  if (showLine && typeof showLine === "object") {
    showLeafIcon = showLine.showLeafIcon;
  }
  if (isLeaf) {
    if (!showLine) {
      return null;
    }
    if (typeof showLeafIcon !== "boolean" && !!showLeafIcon) {
      const leafIcon = typeof showLeafIcon === "function" ? showLeafIcon(treeNodeProps) : showLeafIcon;
      const leafCls = `${prefixCls}-switcher-line-custom-icon`;
      if (isValidElement(leafIcon)) {
        return cloneElement(leafIcon, {
          className: classNames(leafIcon.props.className || "", leafCls)
        });
      }
      return leafIcon;
    }
    return showLeafIcon ? /* @__PURE__ */ reactExports.createElement(FileOutlined$1, {
      className: `${prefixCls}-switcher-line-icon`
    }) : /* @__PURE__ */ reactExports.createElement("span", {
      className: `${prefixCls}-switcher-leaf-line`
    });
  }
  const switcherCls = `${prefixCls}-switcher-icon`;
  const switcher = typeof switcherIcon === "function" ? switcherIcon(treeNodeProps) : switcherIcon;
  if (isValidElement(switcher)) {
    return cloneElement(switcher, {
      className: classNames(switcher.props.className || "", switcherCls)
    });
  }
  if (switcher !== void 0) {
    return switcher;
  }
  if (showLine) {
    return expanded ? /* @__PURE__ */ reactExports.createElement(MinusSquareOutlined$1, {
      className: `${prefixCls}-switcher-line-icon`
    }) : /* @__PURE__ */ reactExports.createElement(PlusSquareOutlined$1, {
      className: `${prefixCls}-switcher-line-icon`
    });
  }
  return /* @__PURE__ */ reactExports.createElement(CaretDownFilled$1, {
    className: switcherCls
  });
};
const SwitcherIconCom$1 = SwitcherIconCom;
const Tree$2 = /* @__PURE__ */ React.forwardRef((props, ref) => {
  const {
    getPrefixCls,
    direction,
    virtual
  } = React.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon = false,
    showLine,
    switcherIcon,
    blockNode = false,
    children,
    checkable = false,
    selectable = true,
    draggable,
    motion: customMotion
  } = props;
  const prefixCls = getPrefixCls("tree", customizePrefixCls);
  const rootPrefixCls = getPrefixCls();
  const motion = customMotion !== null && customMotion !== void 0 ? customMotion : Object.assign(Object.assign({}, initCollapseMotion$1(rootPrefixCls)), {
    motionAppear: false
  });
  const newProps = Object.assign(Object.assign({}, props), {
    checkable,
    selectable,
    showIcon,
    motion,
    blockNode,
    showLine: Boolean(showLine),
    dropIndicatorRender
  });
  const [wrapSSR, hashId] = useStyle(prefixCls);
  const draggableConfig = React.useMemo(() => {
    if (!draggable) {
      return false;
    }
    let mergedDraggable = {};
    switch (typeof draggable) {
      case "function":
        mergedDraggable.nodeDraggable = draggable;
        break;
      case "object":
        mergedDraggable = Object.assign({}, draggable);
        break;
    }
    if (mergedDraggable.icon !== false) {
      mergedDraggable.icon = mergedDraggable.icon || /* @__PURE__ */ React.createElement(HolderOutlined$1, null);
    }
    return mergedDraggable;
  }, [draggable]);
  const renderSwitcherIcon = (nodeProps) => /* @__PURE__ */ React.createElement(SwitcherIconCom$1, {
    prefixCls,
    switcherIcon,
    treeNodeProps: nodeProps,
    showLine
  });
  return wrapSSR(/* @__PURE__ */ React.createElement(Tree$3, Object.assign({
    itemHeight: 20,
    ref,
    virtual
  }, newProps, {
    prefixCls,
    className: classNames({
      [`${prefixCls}-icon-hide`]: !showIcon,
      [`${prefixCls}-block-node`]: blockNode,
      [`${prefixCls}-unselectable`]: !selectable,
      [`${prefixCls}-rtl`]: direction === "rtl"
    }, className, hashId),
    direction,
    checkable: checkable ? /* @__PURE__ */ React.createElement("span", {
      className: `${prefixCls}-checkbox-inner`
    }) : checkable,
    selectable,
    switcherIcon: renderSwitcherIcon,
    draggable: draggableConfig
  }), children));
});
const TreePure = Tree$2;
var Record;
(function(Record2) {
  Record2[Record2["None"] = 0] = "None";
  Record2[Record2["Start"] = 1] = "Start";
  Record2[Record2["End"] = 2] = "End";
})(Record || (Record = {}));
function traverseNodesKey(treeData2, callback) {
  function processNode(dataNode) {
    const {
      key,
      children
    } = dataNode;
    if (callback(key, dataNode) !== false) {
      traverseNodesKey(children || [], callback);
    }
  }
  treeData2.forEach(processNode);
}
function calcRangeKeys(_ref) {
  let {
    treeData: treeData2,
    expandedKeys,
    startKey,
    endKey
  } = _ref;
  const keys = [];
  let record = Record.None;
  if (startKey && startKey === endKey) {
    return [startKey];
  }
  if (!startKey || !endKey) {
    return [];
  }
  function matchKey(key) {
    return key === startKey || key === endKey;
  }
  traverseNodesKey(treeData2, (key) => {
    if (record === Record.End) {
      return false;
    }
    if (matchKey(key)) {
      keys.push(key);
      if (record === Record.None) {
        record = Record.Start;
      } else if (record === Record.Start) {
        record = Record.End;
        return false;
      }
    } else if (record === Record.Start) {
      keys.push(key);
    }
    return expandedKeys.includes(key);
  });
  return keys;
}
function convertDirectoryKeysToNodes(treeData2, keys) {
  const restKeys = _toConsumableArray(keys);
  const nodes = [];
  traverseNodesKey(treeData2, (key, node) => {
    const index2 = restKeys.indexOf(key);
    if (index2 !== -1) {
      nodes.push(node);
      restKeys.splice(index2, 1);
    }
    return !!restKeys.length;
  });
  return nodes;
}
var __rest = globalThis && globalThis.__rest || function(s, e) {
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
function getIcon(props) {
  const {
    isLeaf,
    expanded
  } = props;
  if (isLeaf) {
    return /* @__PURE__ */ reactExports.createElement(FileOutlined$1, null);
  }
  return expanded ? /* @__PURE__ */ reactExports.createElement(FolderOpenOutlined$1, null) : /* @__PURE__ */ reactExports.createElement(FolderOutlined$1, null);
}
function getTreeData(_ref) {
  let {
    treeData: treeData2,
    children
  } = _ref;
  return treeData2 || convertTreeToData(children);
}
const DirectoryTree = (_a, ref) => {
  var {
    defaultExpandAll,
    defaultExpandParent,
    defaultExpandedKeys
  } = _a, props = __rest(_a, ["defaultExpandAll", "defaultExpandParent", "defaultExpandedKeys"]);
  const lastSelectedKey = reactExports.useRef();
  const cachedSelectedKeys = reactExports.useRef();
  const getInitExpandedKeys = () => {
    const {
      keyEntities
    } = convertDataToEntities(getTreeData(props));
    let initExpandedKeys;
    if (defaultExpandAll) {
      initExpandedKeys = Object.keys(keyEntities);
    } else if (defaultExpandParent) {
      initExpandedKeys = conductExpandParent(props.expandedKeys || defaultExpandedKeys || [], keyEntities);
    } else {
      initExpandedKeys = props.expandedKeys || defaultExpandedKeys;
    }
    return initExpandedKeys;
  };
  const [selectedKeys, setSelectedKeys] = reactExports.useState(props.selectedKeys || props.defaultSelectedKeys || []);
  const [expandedKeys, setExpandedKeys] = reactExports.useState(() => getInitExpandedKeys());
  reactExports.useEffect(() => {
    if ("selectedKeys" in props) {
      setSelectedKeys(props.selectedKeys);
    }
  }, [props.selectedKeys]);
  reactExports.useEffect(() => {
    if ("expandedKeys" in props) {
      setExpandedKeys(props.expandedKeys);
    }
  }, [props.expandedKeys]);
  const onExpand = (keys, info) => {
    var _a2;
    if (!("expandedKeys" in props)) {
      setExpandedKeys(keys);
    }
    return (_a2 = props.onExpand) === null || _a2 === void 0 ? void 0 : _a2.call(props, keys, info);
  };
  const onSelect = (keys, event) => {
    var _a2;
    const {
      multiple
    } = props;
    const {
      node,
      nativeEvent
    } = event;
    const {
      key = ""
    } = node;
    const treeData2 = getTreeData(props);
    const newEvent = Object.assign(Object.assign({}, event), {
      selected: true
    });
    const ctrlPick = (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.ctrlKey) || (nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.metaKey);
    const shiftPick = nativeEvent === null || nativeEvent === void 0 ? void 0 : nativeEvent.shiftKey;
    let newSelectedKeys;
    if (multiple && ctrlPick) {
      newSelectedKeys = keys;
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData2, newSelectedKeys);
    } else if (multiple && shiftPick) {
      newSelectedKeys = Array.from(new Set([].concat(_toConsumableArray(cachedSelectedKeys.current || []), _toConsumableArray(calcRangeKeys({
        treeData: treeData2,
        expandedKeys,
        startKey: key,
        endKey: lastSelectedKey.current
      })))));
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData2, newSelectedKeys);
    } else {
      newSelectedKeys = [key];
      lastSelectedKey.current = key;
      cachedSelectedKeys.current = newSelectedKeys;
      newEvent.selectedNodes = convertDirectoryKeysToNodes(treeData2, newSelectedKeys);
    }
    (_a2 = props.onSelect) === null || _a2 === void 0 ? void 0 : _a2.call(props, newSelectedKeys, newEvent);
    if (!("selectedKeys" in props)) {
      setSelectedKeys(newSelectedKeys);
    }
  };
  const {
    getPrefixCls,
    direction
  } = reactExports.useContext(ConfigContext);
  const {
    prefixCls: customizePrefixCls,
    className,
    showIcon = true,
    expandAction = "click"
  } = props, otherProps = __rest(props, ["prefixCls", "className", "showIcon", "expandAction"]);
  const prefixCls = getPrefixCls("tree", customizePrefixCls);
  const connectClassName = classNames(`${prefixCls}-directory`, {
    [`${prefixCls}-directory-rtl`]: direction === "rtl"
  }, className);
  return /* @__PURE__ */ reactExports.createElement(TreePure, Object.assign({
    icon: getIcon,
    ref,
    blockNode: true
  }, otherProps, {
    showIcon,
    expandAction,
    prefixCls,
    className: connectClassName,
    expandedKeys,
    selectedKeys,
    onSelect,
    onExpand
  }));
};
const ForwardDirectoryTree = /* @__PURE__ */ reactExports.forwardRef(DirectoryTree);
const DirectoryTree$1 = ForwardDirectoryTree;
const Tree = TreePure;
Tree.DirectoryTree = DirectoryTree$1;
Tree.TreeNode = ContextTreeNode;
const Tree$1 = Tree;
const tree = "_tree_91zaz_1";
const treeWrapper = "_treeWrapper_91zaz_17";
const item = "_item_91zaz_22";
const menu = "_menu_91zaz_26";
const style = {
  tree,
  treeWrapper,
  item,
  menu
};
const {
  TreeNode
} = Tree$1;
function Index() {
  const [treeList, setTreeList] = reactExports.useState([]);
  const [initData, setInitData] = reactExports.useState([]);
  const [changeTree, setChangeTree] = reactExports.useState(false);
  const [saveDta, setSaveDta] = reactExports.useState({
    add: [],
    remove: [],
    edit: []
  });
  reactExports.useEffect(() => {
    const parse1 = JSON.parse(JSON.stringify(treeData));
    const parse2 = JSON.parse(JSON.stringify(treeData));
    setTreeList(parse1);
    setInitData(parse2);
  }, []);
  reactExports.useEffect(() => {
    console.log(saveDta);
  }, [saveDta]);
  function flatData(data, result = []) {
    data.forEach((item2) => {
      result.push(item2);
      if (item2.children) {
        flatData(item2.children, result);
      }
    });
    return result;
  }
  function handleSaveButton() {
    const saveArray = flatData(treeList);
    const removeAddArray = flatData(treeList);
    const initArray = flatData(initData);
    const addResult = [];
    const editResult = [];
    function filterFnAdd() {
      saveArray.forEach((item2) => {
        let bool = false;
        initArray.forEach((initItem) => {
          if (item2.code === initItem.code)
            bool = true;
        });
        if (!bool) {
          const data = {
            value: item2.value,
            code: item2.code,
            key: item2.key,
            parentId: item2.parentId
          };
          addResult.push(data);
        }
      });
    }
    function filterFnEdit() {
      saveArray.forEach((item2) => {
        let bool = false;
        initArray.forEach((initItem) => {
          if (item2.code === initItem.code && item2.value !== initItem.value)
            bool = true;
        });
        if (bool) {
          const data = {
            value: item2.value,
            code: item2.code,
            key: item2.key,
            parentId: item2.parentId
          };
          editResult.push(data);
        }
      });
    }
    function filterFnRemoveAddResult() {
      addResult.forEach((item2) => {
        removeAddArray.forEach((initItem, index2) => {
          if (item2.code === initItem.code) {
            removeAddArray.splice(index2, 1);
          }
        });
      });
    }
    function filterFnRemoveResult() {
      removeAddArray.forEach((item2) => {
        initArray.forEach((initItem, index2) => {
          if (item2.code === initItem.code) {
            initArray.splice(index2, 1);
          }
        });
      });
    }
    filterFnAdd();
    filterFnEdit();
    filterFnRemoveAddResult();
    filterFnRemoveResult();
    setSaveDta({
      add: [...addResult],
      edit: [...editResult],
      remove: [...initArray]
    });
    alert(`新增了${addResult.length}项 
 删除了${initArray.length}项 
 修改了${editResult.length}项 
`);
  }
  function renderTreeNodes(data) {
    return data.map((item2) => {
      item2.title = /* @__PURE__ */ React.createElement("section", {
        className: style.item
      }, item2.isEditable ? /* @__PURE__ */ React.createElement("div", {
        className: style.title
      }, /* @__PURE__ */ React.createElement(EditInput, {
        value: item2.value,
        callback: (value) => {
          MyCustomTreeNode$1.onSave(item2.key, treeList, value, (data2) => {
            setTreeList([...data2]);
          });
        }
      })) : /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", {
        className: style.title
      }, item2.value), /* @__PURE__ */ React.createElement("div", {
        className: style.menu
      }, /* @__PURE__ */ React.createElement("div", {
        onClick: () => {
          MyCustomTreeNode$1.onEdit(item2.key, treeList, (data2) => {
            setTreeList([...data2]);
          });
          if (!changeTree)
            setChangeTree(true);
        }
      }, "修"), /* @__PURE__ */ React.createElement("div", {
        onClick: () => {
          MyCustomTreeNode$1.onAdd(item2.key, treeList, (data2) => {
            setTreeList([...data2]);
          });
          if (!changeTree)
            setChangeTree(true);
        }
      }, "增"), /* @__PURE__ */ React.createElement("div", {
        onClick: () => {
          MyCustomTreeNode$1.onDelete(item2.key, treeList, (data2) => {
            setTreeList([...data2]);
          });
          if (!changeTree)
            setChangeTree(true);
        }
      }, "删"), /* @__PURE__ */ React.createElement("div", {
        onClick: () => {
          MyCustomTreeNode$1.onInsert(item2.key, treeList, (data2) => {
            setTreeList([...data2]);
          });
          if (!changeTree)
            setChangeTree(true);
        }
      }, "插"))));
      if (item2.children) {
        return /* @__PURE__ */ React.createElement(TreeNode, {
          title: item2.title,
          key: item2.key,
          dataRef: item2
        }, renderTreeNodes(item2.children));
      }
      return /* @__PURE__ */ React.createElement(TreeNode, {
        title: item2.title,
        key: item2.key
      });
    });
  }
  return /* @__PURE__ */ React.createElement("section", {
    className: style.tree
  }, treeList.length && /* @__PURE__ */ React.createElement(Tree$1, {
    className: style.treeWrapper,
    style: {
      height: "80vh",
      overflow: "auto"
    },
    defaultExpandedKeys: ["0-1-0"]
  }, renderTreeNodes(treeList)), changeTree && /* @__PURE__ */ React.createElement("button", {
    onClick: () => {
      handleSaveButton();
    }
  }, "保存列表"));
}
export {
  Index as default
};
