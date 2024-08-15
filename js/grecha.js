"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
function tag(name) {
    var children = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        children[_i - 1] = arguments[_i];
    }
    var result = document.createElement(name);
    for (var _a = 0, children_1 = children; _a < children_1.length; _a++) {
        var child = children_1[_a];
        if (typeof child === 'string') {
            result.appendChild(document.createTextNode(child));
        }
        else {
            result.appendChild(child);
        }
    }
    result.att$ = function (name, value) {
        this.setAttribute(name, value);
        return this;
    };
    result.onclick$ = function (callback) {
        this.onclick = callback;
        return this;
    };
    return result;
}
var canvas = function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return tag.apply(void 0, __spreadArray(["canvas"], children, false));
};
var h1 = function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return tag.apply(void 0, __spreadArray(["h1"], children, false));
};
var h2 = function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return tag.apply(void 0, __spreadArray(["h2"], children, false));
};
var h3 = function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return tag.apply(void 0, __spreadArray(["h3"], children, false));
};
var p = function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return tag.apply(void 0, __spreadArray(["p"], children, false));
};
var a = function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return tag.apply(void 0, __spreadArray(["a"], children, false));
};
var div = function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return tag.apply(void 0, __spreadArray(["div"], children, false));
};
var span = function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return tag.apply(void 0, __spreadArray(["span"], children, false));
};
var select = function () {
    var children = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        children[_i] = arguments[_i];
    }
    return tag.apply(void 0, __spreadArray(["select"], children, false));
};
var img = function (src) { return tag("img").att$("src", src); };
var input = function (type) { return tag("input").att$("type", type); };
function router(routes) {
    var result = div();
    function syncHash() {
        var hashLocation = document.location.hash.split('#')[1];
        if (!hashLocation) {
            hashLocation = '/';
        }
        if (!(hashLocation in routes)) {
            var route404 = '/404';
            console.assert(route404 in routes);
            hashLocation = route404;
        }
        while (result.firstChild) {
            result.removeChild(result.lastChild);
        }
        result.appendChild(routes[hashLocation]);
        return result;
    }
    ;
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return result;
}
