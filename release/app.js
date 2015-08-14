/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	module.exports = __webpack_require__(7);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var App, Glue, Gui, UseCase;

	__webpack_require__(2);

	__webpack_require__(3);

	UseCase = __webpack_require__(4);

	Gui = __webpack_require__(5);

	Glue = __webpack_require__(6);

	App = (function() {
	  function App() {
	    var glue, gui, useCase;
	    useCase = new UseCase();
	    gui = new Gui();
	    glue = new Glue(useCase, gui);
	    useCase.start();
	    window.useCase = useCase;
	  }

	  return App;

	})();

	new App();


/***/ },
/* 2 */
/***/ function(module, exports) {

	var hasProp = {}.hasOwnProperty;

	_.defaults(window, {
	  Before: function(object, methodName, adviseMethod) {
	    return YouAreDaBomb(object, methodName).before(adviseMethod);
	  },
	  BeforeAnyCallback: function(object, methodName, adviseMethod) {
	    return YouAreDaBomb(object, methodName).beforeAnyCallback(adviseMethod);
	  },
	  After: function(object, methodName, adviseMethod) {
	    return YouAreDaBomb(object, methodName).after(adviseMethod);
	  },
	  Around: function(object, methodName, adviseMethod) {
	    return YouAreDaBomb(object, methodName).around(adviseMethod);
	  },
	  AfterAll: function(object, methodNames, adviseMethod) {
	    var i, len, methodName, results;
	    results = [];
	    for (i = 0, len = methodNames.length; i < len; i++) {
	      methodName = methodNames[i];
	      results.push(After(object, methodName, adviseMethod));
	    }
	    return results;
	  },
	  LogAll: function(object) {
	    var key, results, value;
	    results = [];
	    for (key in object) {
	      if (!hasProp.call(object, key)) continue;
	      value = object[key];
	      if (_.isFunction(value)) {
	        results.push((function(key) {
	          return Before(object, key, function() {
	            return console.log("calling: " + key);
	          });
	        })(key));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  },
	  AutoBind: function(gui, useCase) {
	    var key, results, value;
	    results = [];
	    for (key in gui) {
	      value = gui[key];
	      if (_.isFunction(value)) {
	        results.push((function(key) {
	          if (key.endsWith("Clicked") && useCase[key.remove("Clicked")]) {
	            return After(gui, key, function(args) {
	              return useCase[key.remove("Clicked")](args);
	            });
	          }
	        })(key));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  }
	});


/***/ },
/* 3 */
/***/ function(module, exports) {

	var LocalStorage,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	LocalStorage = (function() {
	  function LocalStorage(namespace) {
	    this.namespace = namespace;
	    this.flush = bind(this.flush, this);
	    this.remove = bind(this.remove, this);
	    this.get = bind(this.get, this);
	    this.set = bind(this.set, this);
	  }

	  LocalStorage.prototype.set = function(key, value) {
	    console.log(value);
	    return $.jStorage.set(this.namespace + "/" + key, value);
	  };

	  LocalStorage.prototype.get = function(key) {
	    return $.jStorage.get(this.namespace + "/" + key);
	  };

	  LocalStorage.prototype.remove = function(key) {
	    return $.jStorage.deleteKey(this.namespace + "/" + key);
	  };

	  LocalStorage.prototype.flush = function() {
	    var i, key, len, ref, results;
	    ref = $.jStorage.index();
	    results = [];
	    for (i = 0, len = ref.length; i < len; i++) {
	      key = ref[i];
	      if (key.match("^" + this.namespace)) {
	        results.push($.jStorage.deleteKey(key));
	      } else {
	        results.push(void 0);
	      }
	    }
	    return results;
	  };

	  return LocalStorage;

	})();


/***/ },
/* 4 */
/***/ function(module, exports) {

	var UseCase,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	UseCase = (function() {
	  function UseCase() {
	    this.restart = bind(this.restart, this);
	    this.greetUser = bind(this.greetUser, this);
	    this.nameProvided = bind(this.nameProvided, this);
	    this.askForName = bind(this.askForName, this);
	    this.start = bind(this.start, this);
	  }

	  UseCase.prototype.start = function() {
	    return this.askForName();
	  };

	  UseCase.prototype.askForName = function() {};

	  UseCase.prototype.nameProvided = function(name) {
	    return this.greetUser(name);
	  };

	  UseCase.prototype.greetUser = function(name) {};

	  UseCase.prototype.restart = function() {
	    return this.askForName();
	  };

	  return UseCase;

	})();

	module.exports = UseCase;


/***/ },
/* 5 */
/***/ function(module, exports) {

	var Gui,
	  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

	Gui = (function() {
	  function Gui() {
	    this.hideGreetMessage = bind(this.hideGreetMessage, this);
	    this.restartClicked = bind(this.restartClicked, this);
	    this.showGreetMessage = bind(this.showGreetMessage, this);
	    this.hideAskForName = bind(this.hideAskForName, this);
	    this.confirmNameButtonClicked = bind(this.confirmNameButtonClicked, this);
	    this.showAskForName = bind(this.showAskForName, this);
	    this.createElementFor = bind(this.createElementFor, this);
	  }

	  Gui.prototype.createElementFor = function(templateId, data) {
	    var element, html, source, template;
	    source = $(templateId).html();
	    template = Handlebars.compile(source);
	    html = template(data);
	    return element = $(html);
	  };

	  Gui.prototype.showAskForName = function() {
	    var confirmNameButton, element;
	    element = this.createElementFor("#ask-for-name-template");
	    $(".main").append(element);
	    confirmNameButton = $("#confirm-name-button");
	    confirmNameButton.click((function(_this) {
	      return function() {
	        return _this.confirmNameButtonClicked($("#name-input").val());
	      };
	    })(this));
	    return $("#name-input").focus();
	  };

	  Gui.prototype.confirmNameButtonClicked = function(name) {};

	  Gui.prototype.hideAskForName = function() {
	    return $(".ask-for-name").remove();
	  };

	  Gui.prototype.showGreetMessage = function(name) {
	    var element;
	    element = this.createElementFor("#greet-message-template", {
	      name: name
	    });
	    $(".main").append(element);
	    return $("#restart-link").click((function(_this) {
	      return function() {
	        return _this.restartClicked();
	      };
	    })(this));
	  };

	  Gui.prototype.restartClicked = function() {};

	  Gui.prototype.hideGreetMessage = function() {
	    return $(".greet-message").remove();
	  };

	  return Gui;

	})();

	module.exports = Gui;


/***/ },
/* 6 */
/***/ function(module, exports) {

	var Glue;

	Glue = (function() {
	  function Glue(useCase, gui) {
	    this.useCase = useCase;
	    this.gui = gui;
	    After(this.useCase, "askForName", (function(_this) {
	      return function() {
	        return _this.gui.showAskForName();
	      };
	    })(this));
	    After(this.useCase, "nameProvided", (function(_this) {
	      return function() {
	        return _this.gui.hideAskForName();
	      };
	    })(this));
	    After(this.useCase, "greetUser", (function(_this) {
	      return function(name) {
	        return _this.gui.showGreetMessage(name);
	      };
	    })(this));
	    After(this.useCase, "restart", (function(_this) {
	      return function() {
	        return _this.gui.hideGreetMessage();
	      };
	    })(this));
	    After(this.gui, "restartClicked", (function(_this) {
	      return function() {
	        return _this.useCase.restart();
	      };
	    })(this));
	    After(this.gui, "confirmNameButtonClicked", (function(_this) {
	      return function(name) {
	        return _this.useCase.nameProvided(name);
	      };
	    })(this));
	    LogAll(this.useCase);
	    LogAll(this.gui);
	  }

	  return Glue;

	})();

	module.exports = Glue;


/***/ },
/* 7 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__dirname) {'use strict';

	module.exports = {
	  entry: './src/app',
	  output: {
	    path: __dirname + '/release',
	    filename: 'app.js'
	  },
	  module: {
	    loaders: [{ test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader' }, { test: /\.coffee/, exclude: /node_modules/, loader: 'coffee-loader' }]
	  },
	  resolve: {
	    extensions: ['', '.js', '.jsx', '.coffee'],
	    moduleDirectories: ['node_modules', 'src']
	  }
	};
	/* WEBPACK VAR INJECTION */}.call(exports, "/"))

/***/ }
/******/ ]);