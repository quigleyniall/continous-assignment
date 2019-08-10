"use strict";

var _react = _interopRequireDefault(require("react"));

var _reactDom = _interopRequireDefault(require("react-dom"));

require("./index.scss");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var App = function App() {
  return _react["default"].createElement("div", {
    className: "app"
  }, "Hello From React");
};

_reactDom["default"].render(_react["default"].createElement(App, null), document.getElementById('root'));