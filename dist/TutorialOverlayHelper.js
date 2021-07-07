"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeTutorial = initializeTutorial;
exports.checkUserAppVersion = checkUserAppVersion;

var _TutorialOverlay = _interopRequireDefault(require("./api/TutorialOverlay"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var tutorialOverlayAPI = new _TutorialOverlay.default();

function initializeTutorial(_x) {
  return _initializeTutorial.apply(this, arguments);
}

function _initializeTutorial() {
  _initializeTutorial = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(appName) {
    var data, tutorialData, appTutorialData, versionData;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return tutorialOverlayAPI.tutorialOverlaysGET('/api/tutorialOverlay');

          case 2:
            data = _context.sent;
            tutorialData = tutorialOverlayAPI.setupTutorialOverlay(data.data);
            appTutorialData = tutorialData[appName];

            if (!(appTutorialData && !sessionStorage.getItem('userVersionChecked_' + appName))) {
              _context.next = 10;
              break;
            }

            _context.next = 8;
            return tutorialOverlayAPI.postUserAppVersion(appName);

          case 8:
            versionData = _context.sent;
            return _context.abrupt("return", checkUserAppVersion(appTutorialData, versionData));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _initializeTutorial.apply(this, arguments);
}

function checkUserAppVersion(tutorialData, data) {
  try {
    var tutorialType = data.data.newUser ? "newUserTutorial" : "currentTutorial";
    return {
      componentStepNumbers: tutorialData[tutorialType].componentStepNumbers,
      tutorialJoyrideSteps: tutorialData[tutorialType].tutorialJoyrideSteps,
      showTutorial: !data.data.currentVersion ? true : false
    };
  } catch (err) {
    console.log(err.message);
  }
}