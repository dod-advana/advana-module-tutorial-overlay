"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactJoyride = _interopRequireDefault(require("react-joyride"));

var _matomoTrackerReact = require("@datapunt/matomo-tracker-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var tutorialStyle = {
  buttonNext: {
    backgroundColor: '#00838F',
    padding: '12px 15px',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    outline: 'none',
    height: 50
  },
  buttonBack: {
    color: '#8091A5',
    border: '1px solid #8091A5',
    padding: '12px 15px',
    borderRadius: '5px',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    margin: '0 10px 0 0',
    outline: 'none',
    height: 50
  },
  options: {
    zIndex: 99999999
  },
  buttonClose: {
    backgroundColor: 'transparent',
    outline: 'none',
    borderRadius: '4px',
    padding: '13px',
    right: '15px',
    top: '15px',
    border: '1px solid #b0b9be'
  },
  buttonSkip: {
    color: '#8091A5',
    border: '1px solid #8091A5',
    padding: '12px 15px',
    borderRadius: '5px',
    fontFamily: 'Montserrat',
    fontWeight: 600,
    fontSize: '16px',
    outline: 'none',
    height: 50,
    float: 'right',
    margin: '0 15px 0 0'
  },
  tooltipFooter: {
    marginTop: 0
  },
  tooltipTitle: {
    fontFamily: 'Montserrat',
    fontWeight: 700,
    textAlign: 'left',
    margin: '2% 45px 1% 2%'
  },
  tooltipContent: {
    textAlign: 'left'
  },
  tooltip: {
    width: 500
  }
};

var _default = function _default(_ref) {
  var tutorialJoyrideSteps = _ref.tutorialJoyrideSteps,
      showTutorial = _ref.showTutorial,
      setShowTutorial = _ref.setShowTutorial,
      buttonColor = _ref.buttonColor,
      resetPage = _ref.resetPage,
      stepIndex = _ref.stepIndex,
      setStepIndex = _ref.setStepIndex,
      _ref$showSkipButton = _ref.showSkipButton,
      showSkipButton = _ref$showSkipButton === void 0 ? true : _ref$showSkipButton;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      restartJoyride = _useState2[0],
      setRestartJoyride = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      disableScroll = _useState4[0],
      setDisableScroll = _useState4[1];

  var _useMatomo = (0, _matomoTrackerReact.useMatomo)(),
      trackEvent = _useMatomo.trackEvent;

  (0, _react.useEffect)(function () {}, [showTutorial]); // called every status change in Joyride

  var onStepCallback = function onStepCallback(tutorialState) {
    // we have stopped the tutorial but want to start it again
    if (restartJoyride) {
      setRestartJoyride(false);
      setShowTutorial(true);
    } else {
      // disable scrolling to this step if desired
      if (tutorialState.step) {
        setDisableScroll(tutorialState.step.disableScrolling ? true : false);
      } // skip steps that error/are missing


      if (tutorialState.type === "error:target_not_found") {
        setStepIndex(stepIndex + 1);
        trackEvent({
          category: 'Tutorial',
          name: 'targetNotFoundError',
          value: stepIndex
        });
      } // close tutorial if clicking outside
      // or if clicking skip
      // or if clicking Next on the last step
      else if (tutorialState.action === 'close' && tutorialState.type === 'step:after' || tutorialState.action === 'skip' || tutorialState.action === 'next' && tutorialState.status === 'finished') {
          trackEvent({
            category: 'Tutorial',
            action: 'onClick',
            name: 'Skip',
            value: stepIndex
          });
          setStepIndex(0);
          setShowTutorial(false);
          resetPage();
        } // this state comes before a step happens
        else if (tutorialState.action === "update" || tutorialState.action === "start") {
            // check for inputs you want to fill in
            if (tutorialState.step && tutorialState.step.input && tutorialState.step.inputID) {
              var tutorialInput = document.getElementById(tutorialState.step.inputID); // set the input text

              var nativeInputSetter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set;
              nativeInputSetter.call(tutorialInput, tutorialState.step.inputText); // fire the onChange event with the text

              var inputEvent = new Event("input", {
                bubbles: true
              });
              tutorialInput.dispatchEvent(inputEvent);
            }
          } // this state happens after you click next on a step
          else if (tutorialState.action === "next" && tutorialState.type === "step:after") {
              setStepIndex(stepIndex + 1);
              trackEvent({
                category: 'Tutorial',
                action: 'onClick',
                name: 'Next',
                value: stepIndex
              }); // check for buttons you want clicked

              if (tutorialState.step && tutorialState.step.clickButton && tutorialState.step.buttonID.length > 0) {
                var tutorialButton = document.getElementById(tutorialState.step.buttonID);
                tutorialButton.click(); // activate a tutorial restart

                setShowTutorial(false);
                setRestartJoyride(true);
              }
            } // after clicking back
            else if (tutorialState.action === "prev" && tutorialState.type === "step:after") {
                setStepIndex(stepIndex - 1);
                trackEvent({
                  category: 'Tutorial',
                  action: 'onClick',
                  name: 'Back',
                  value: stepIndex
                });

                if (tutorialState.step && tutorialState.step.clickBack && tutorialState.step.backButtonID) {
                  var _tutorialButton = document.getElementById(tutorialState.step.backButtonID);

                  _tutorialButton.click();
                }
              }
    }
  };

  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_reactJoyride.default, {
    steps: tutorialJoyrideSteps,
    spotlightClicks: true,
    scrollOffset: 150,
    continuous: true,
    showSkipButton: showSkipButton,
    styles: _objectSpread(_objectSpread({}, tutorialStyle), {}, {
      buttonNext: _objectSpread(_objectSpread({}, tutorialStyle.buttonNext), {}, {
        backgroundColor: buttonColor
      })
    }),
    callback: onStepCallback,
    run: showTutorial,
    stepIndex: stepIndex,
    disableScrolling: disableScroll,
    showProgress: true
  }));
};

exports.default = _default;