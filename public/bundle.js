(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Greeter = function () {
    function Greeter(greeting) {
        _classCallCheck(this, Greeter);

        this.greeting = greeting;
    }

    _createClass(Greeter, [{
        key: "greet",
        value: function greet() {
            return "<h1>" + this.greeting + "</h1>";
        }
    }]);

    return Greeter;
}();

exports.default = Greeter;

;

},{}],2:[function(require,module,exports){
"use strict";

var _Greeter = require("./Greeter");

var _Greeter2 = _interopRequireDefault(_Greeter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sketch = function sketch(p) {
    p.preload = function () {};
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    };
    p.draw = function () {};
    p.windowResized = function () {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };
    p.keyPressed = function () {};
};
var sketchP = new p5(sketch);

var greeter = new _Greeter2.default("Hello, world!");
document.body.innerHTML = greeter.greet();

},{"./Greeter":1}]},{},[2]);
