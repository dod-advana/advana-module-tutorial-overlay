"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = TutorialOverlayWrapper;

var _react = _interopRequireWildcard(require("react"));

var _underscore = _interopRequireDefault(require("underscore"));

var _TutorialOverlay = _interopRequireDefault(require("./TutorialOverlay"));

var _TutorialOverlayHelper = require("./TutorialOverlayHelper");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var noop = function noop() {};

function TutorialOverlayWrapper(_ref) {
  var name = _ref.name,
      _ref$onComponentStepN = _ref.onComponentStepNumberChange,
      onComponentStepNumberChange = _ref$onComponentStepN === void 0 ? noop : _ref$onComponentStepN,
      showTutorial = _ref.showTutorial,
      setShowTutorial = _ref.setShowTutorial;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      tutorialJoyrideSteps = _useState2[0],
      setTutorialJoyrideSteps = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      showTutorialUncontrolled = _useState4[0],
      setShowTutorialUncontrolled = _useState4[1];

  var _useState5 = (0, _react.useState)(0),
      _useState6 = _slicedToArray(_useState5, 2),
      stepIndex = _useState6[0],
      setStepIndex = _useState6[1];

  var showTutorialState, setShowTutorialFn;

  if (_underscore.default.isBoolean(showTutorial) && setShowTutorial) {
    showTutorialState = showTutorial;
    setShowTutorialFn = setShowTutorial;
  } else {
    showTutorialState = showTutorialUncontrolled;
    setShowTutorialFn = setShowTutorialUncontrolled;
  }

  (0, _react.useEffect)(function () {
    _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
      var tutorial, _ref3, componentStepNumbers, _tutorialJoyrideSteps, _showTutorial;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              _context.next = 3;
              return (0, _TutorialOverlayHelper.initializeTutorial)(name);

            case 3:
              tutorial = _context.sent;
              _ref3 = tutorial || {}, componentStepNumbers = _ref3.componentStepNumbers, _tutorialJoyrideSteps = _ref3.tutorialJoyrideSteps, _showTutorial = _ref3.showTutorial;
              onComponentStepNumberChange(componentStepNumbers);
              setTutorialJoyrideSteps(_tutorialJoyrideSteps);
              setShowTutorialFn(_showTutorial);
              _context.next = 13;
              break;

            case 10:
              _context.prev = 10;
              _context.t0 = _context["catch"](0);
              console.error(_context.t0);

            case 13:
            case "end":
              return _context.stop();
          }
        }
      }, _callee, null, [[0, 10]]);
    }))();
  }, [setShowTutorialFn, name, onComponentStepNumberChange]);
  return /*#__PURE__*/_react.default.createElement(_TutorialOverlay.default, {
    tutorialJoyrideSteps: tutorialJoyrideSteps,
    setShowTutorial: setShowTutorialFn,
    showTutorial: showTutorialState,
    buttonColor: '#43A047',
    resetPage: function resetPage() {},
    stepIndex: stepIndex,
    setStepIndex: setStepIndex
  });
}