"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

var _https = _interopRequireDefault(require("https"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var endpoints = {
  postUserAppVersion: '/api/userAppVersion',
  tutorialOverlaysGET: '/api/tutorialOverlay',
  tutorialOverlaysPOST: '/api/tutorialOverlay/save'
};

var TutorialOverlayAPI = function TutorialOverlayAPI() {
  var _this = this,
      _window,
      _window$__env__;

  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  _classCallCheck(this, TutorialOverlayAPI);

  this.postUserAppVersion = /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(app) {
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              return _context.abrupt("return", _this.axios.post(endpoints.postUserAppVersion, {
                app: app
              }));

            case 1:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }();

  this.tutorialOverlaysGET = /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var url,
        _args2 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            url = _args2.length > 0 && _args2[0] !== undefined ? _args2[0] : endpoints.tutorialOverlaysGET;
            _context2.next = 3;
            return _this.axios.get(url);

          case 3:
            return _context2.abrupt("return", _context2.sent);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  this.tutorialOverlaysPOST = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(appName, componentsList) {
      var url,
          _args3 = arguments;
      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              url = _args3.length > 2 && _args3[2] !== undefined ? _args3[2] : endpoints.tutorialOverlaysPOST;
              _context3.next = 3;
              return _this.axios.post(url, {
                appName: appName,
                componentsList: componentsList
              });

            case 3:
              return _context3.abrupt("return", _context3.sent);

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3);
    }));

    return function (_x2, _x3) {
      return _ref3.apply(this, arguments);
    };
  }();

  this.setupTutorialOverlay = function (data) {
    var appTutorialData = {};
    data.forEach(function (app) {
      appTutorialData[app.app_name] = {
        currentTutorial: _this.constructTutorialObjects(app.current_tutorial_json),
        newUserTutorial: _this.constructTutorialObjects(app.new_user_tutorial_json),
        allComponents: app.current_tutorial_json.components
      };
    });
    return appTutorialData;
  };

  this.constructTutorialObjects = function (app) {
    var components = _this.getActiveComponents(app);

    var componentStepNumbers = {}; // 'Component Name' : [step number], for conditional class selectors

    var tutorialJoyrideSteps = []; // list of objects for Tutorial Overlay to pass to Joyride

    components.forEach(function (component) {
      componentStepNumbers[component.component_name] = component.step_number;
      tutorialJoyrideSteps.push({
        target: component.target ? component.target : ".tutorial-step-".concat(component.step_number),
        content: component.step_text,
        disableBeacon: true,
        inputID: component.input_ID,
        buttonID: component.button_ID,
        input: component.input,
        clickButton: component.click_button,
        inputText: component.input_text,
        placement: component.placement ? component.placement : "auto",
        title: component.title,
        disableScrolling: component.disableScrolling,
        clickBack: component.click_back,
        backButtonID: component.back_button_ID,
        testA: component.test_A,
        testB: component.test_B
      });
    });
    return {
      componentStepNumbers: componentStepNumbers,
      tutorialJoyrideSteps: tutorialJoyrideSteps,
      dbComponentList: components
    };
  };

  this.getActiveComponents = function (appData) {
    var sub_components = []; // grab sub component steps

    appData.components.forEach(function (component) {
      if (component.sub_components) {
        sub_components = sub_components.concat(component.sub_components);
      }
    }); // remove components with step 0

    var components = appData.components.filter(function (component) {
      return component.step_number !== 0;
    }); // keep subcomponents that are steps

    sub_components = sub_components.filter(function (component) {
      return component.step_number !== 0;
    });
    components = components.concat(sub_components);
    components.sort(function (a, b) {
      return a.step_number - b.step_number;
    });
    return components;
  };

  var _opts$axios = opts.axios,
      axios = _opts$axios === void 0 ? _axios.default : _opts$axios;
  this.axios = axios.create({
    baseURL: ((_window = window) === null || _window === void 0 ? void 0 : (_window$__env__ = _window.__env__) === null || _window$__env__ === void 0 ? void 0 : _window$__env__.REACT_APP_TUTORIAL_HREF) || process.env.REACT_APP_TUTORIAL_HREF,
    httpsAgent: new _https.default.Agent({
      keepAlive: true,
      rejectUnauthorized: false
    })
  });
};

exports.default = TutorialOverlayAPI;