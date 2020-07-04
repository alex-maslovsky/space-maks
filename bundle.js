(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

var _ismobilejs = _interopRequireDefault(require("ismobilejs"));

var _app = _interopRequireDefault(require("./src/app"));

var _gyroService = _interopRequireWildcard(require("./src/services/gyro-service"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

document.addEventListener('DOMContentLoaded', () => {
  const {
    phone: isPhone
  } = (0, _ismobilejs.default)(window.navigator);

  if (!isPhone) {
    drawIsNotMobileBlock();
  } else {
    drawIsMobileBlock();
  }
});

function drawIsNotMobileBlock() {
  const container = document.getElementById('is-not-mobile');
  container.style.display = '';
  new QRCode(container.getElementsByClassName('qr')[0], {
    text: window.location.href,
    height: 200,
    width: 200
  });
}

function drawIsMobileBlock() {
  const result = _gyroService.default.use();

  if (result.error) {} else {
    const container = document.getElementById('is-mobile');
    container.style.display = '';
    new _app.default(container);
  }
}

},{"./src/app":6,"./src/services/gyro-service":14,"ismobilejs":2}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {};
Object.defineProperty(exports, "default", {
  enumerable: true,
  get: function () {
    return _isMobile.default;
  }
});

var _isMobile = _interopRequireWildcard(require("./isMobile"));

Object.keys(_isMobile).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _isMobile[key];
    }
  });
});

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

},{"./isMobile":3}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isMobile;
var appleIphone = /iPhone/i;
var appleIpod = /iPod/i;
var appleTablet = /iPad/i;
var appleUniversal = /\biOS-universal(?:.+)Mac\b/i;
var androidPhone = /\bAndroid(?:.+)Mobile\b/i;
var androidTablet = /Android/i;
var amazonPhone = /(?:SD4930UR|\bSilk(?:.+)Mobile\b)/i;
var amazonTablet = /Silk/i;
var windowsPhone = /Windows Phone/i;
var windowsTablet = /\bWindows(?:.+)ARM\b/i;
var otherBlackBerry = /BlackBerry/i;
var otherBlackBerry10 = /BB10/i;
var otherOpera = /Opera Mini/i;
var otherChrome = /\b(CriOS|Chrome)(?:.+)Mobile/i;
var otherFirefox = /Mobile(?:.+)Firefox\b/i;

var isAppleTabletOnIos13 = function (navigator) {
  return typeof navigator !== 'undefined' && navigator.platform === 'MacIntel' && typeof navigator.maxTouchPoints === 'number' && navigator.maxTouchPoints > 1 && typeof MSStream === 'undefined';
};

function createMatch(userAgent) {
  return function (regex) {
    return regex.test(userAgent);
  };
}

function isMobile(param) {
  var nav = {
    userAgent: '',
    platform: '',
    maxTouchPoints: 0
  };

  if (!param && typeof navigator !== 'undefined') {
    nav = {
      userAgent: navigator.userAgent,
      platform: navigator.platform,
      maxTouchPoints: navigator.maxTouchPoints || 0
    };
  } else if (typeof param === 'string') {
    nav.userAgent = param;
  } else if (param && param.userAgent) {
    nav = {
      userAgent: param.userAgent,
      platform: param.platform,
      maxTouchPoints: param.maxTouchPoints || 0
    };
  }

  var userAgent = nav.userAgent;
  var tmp = userAgent.split('[FBAN');

  if (typeof tmp[1] !== 'undefined') {
    userAgent = tmp[0];
  }

  tmp = userAgent.split('Twitter');

  if (typeof tmp[1] !== 'undefined') {
    userAgent = tmp[0];
  }

  var match = createMatch(userAgent);
  var result = {
    apple: {
      phone: match(appleIphone) && !match(windowsPhone),
      ipod: match(appleIpod),
      tablet: !match(appleIphone) && (match(appleTablet) || isAppleTabletOnIos13(nav)) && !match(windowsPhone),
      universal: match(appleUniversal),
      device: (match(appleIphone) || match(appleIpod) || match(appleTablet) || match(appleUniversal) || isAppleTabletOnIos13(nav)) && !match(windowsPhone)
    },
    amazon: {
      phone: match(amazonPhone),
      tablet: !match(amazonPhone) && match(amazonTablet),
      device: match(amazonPhone) || match(amazonTablet)
    },
    android: {
      phone: !match(windowsPhone) && match(amazonPhone) || !match(windowsPhone) && match(androidPhone),
      tablet: !match(windowsPhone) && !match(amazonPhone) && !match(androidPhone) && (match(amazonTablet) || match(androidTablet)),
      device: !match(windowsPhone) && (match(amazonPhone) || match(amazonTablet) || match(androidPhone) || match(androidTablet)) || match(/\bokhttp\b/i)
    },
    windows: {
      phone: match(windowsPhone),
      tablet: match(windowsTablet),
      device: match(windowsPhone) || match(windowsTablet)
    },
    other: {
      blackberry: match(otherBlackBerry),
      blackberry10: match(otherBlackBerry10),
      opera: match(otherOpera),
      firefox: match(otherFirefox),
      chrome: match(otherChrome),
      device: match(otherBlackBerry) || match(otherBlackBerry10) || match(otherOpera) || match(otherFirefox) || match(otherChrome)
    },
    any: false,
    phone: false,
    tablet: false
  };
  result.any = result.apple.device || result.android.device || result.windows.device || result.other.device;
  result.phone = result.apple.phone || result.android.phone || result.windows.phone;
  result.tablet = result.apple.tablet || result.android.tablet || result.windows.tablet;
  return result;
}

},{}],4:[function(require,module,exports){
module.exports = function (point, vs) {
    // ray-casting algorithm based on
    // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
    
    var x = point[0], y = point[1];
    
    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];
        
        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }
    
    return inside;
};

},{}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
const minSpeed = 2;
const minBulletSpeed = 2;
const maxReloadingCounter = 60;
const minStepSpeed = 1;
var _default = {
  salesforce: {
    speed: minSpeed,
    bulletCount: 15,
    bulletSpeed: minBulletSpeed,
    changeDirectionChance: 0.1,
    shootChance: 0.05,
    reloadingCounter: 500,
    minSpeed,
    minBulletSpeed,
    minReloadingCounter: 15,
    maxSpeed: 5,
    maxBulletSpeed: 7,
    maxReloadingCounter
  },
  movingUnit: {
    stepsAmount: 5,
    stepSize: 10,
    stepSpeed: minStepSpeed,
    deadStepOffset: 80,
    minStepSpeed,
    maxStepSpeed: 2.5
  }
};
exports.default = _default;

},{}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _starWrap = _interopRequireDefault(require("./components/star-wrap"));

var _spaceMax = _interopRequireDefault(require("./components/space-max"));

var _salesForce = _interopRequireDefault(require("./components/sales-force"));

var _gameOver = _interopRequireDefault(require("./components/game-over"));

var _score = _interopRequireDefault(require("./components/score"));

var _sprites = _interopRequireDefault(require("./sprites"));

var _store = require("./store");

var _appSetting = _interopRequireDefault(require("./app-setting"));

var _bgMusicSound = _interopRequireDefault(require("./sprites/bg-music-sound"));

var _boomSound = _interopRequireDefault(require("./sprites/boom-sound"));

var _flySound = _interopRequireDefault(require("./sprites/fly-sound"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  salesforce,
  movingUnit
} = _appSetting.default;

class App {
  constructor(container) {
    this.app = new PIXI.Application({
      width: window.innerWidth,
      height: window.innerHeight,
      antialias: true,
      preserveDrawingBuffer: true
    });
    window.addEventListener('resize', this._onResize.bind(this));
    container.appendChild(this.app.view);

    this._start();
  }

  _start() {
    _sprites.default.then(() => {
      this.sound = (0, _bgMusicSound.default)();
      this.flySound = (0, _flySound.default)();
      const add = this.app.ticker.add.bind(this.app.ticker);

      this.app.ticker.add = fn => {
        this.app.ticker.events = [...(this.app.ticker.events || []), fn];
        add(fn);
      };

      new _starWrap.default(this.app);
      new _spaceMax.default(this.app);
      new _score.default(this.app);
      const salesForce = new _salesForce.default(this.app);
      this.sound.play();
      this.flySound.play();

      salesForce.onLoose = () => {
        (0, _boomSound.default)().play();
        this.sound.stop();
        this.flySound.stop();
        this.app.stage.removeChildren();
        this.app.ticker.events.forEach(fn => this.app.ticker.remove(fn));
        new _gameOver.default(this.app);
      };

      this.app.ticker.add(() => {
        const hundreds = ~~((0, _store.getScore)() / 100);
        this.app.ticker.speed = 0.5 + hundreds * 0.2;
        salesforce.speed = Math.min(salesforce.maxSpeed, salesforce.minSpeed + hundreds * 0.2);
        salesforce.bulletSpeed = Math.min(salesforce.maxBulletSpeed, salesforce.minBulletSpeed + hundreds * 0.4);
        salesforce.reloadingCounter = Math.max(salesforce.minReloadingCounter, salesforce.maxReloadingCounter - hundreds * 2);
        movingUnit.stepSpeed = Math.min(movingUnit.maxStepSpeed, movingUnit.minStepSpeed + hundreds * 0.1);
      });
    });
  }

  _onResize() {
    this.app.renderer.resize(window.innerWidth, window.innerHeight);
  }

}

exports.default = App;

},{"./app-setting":5,"./components/game-over":8,"./components/sales-force":10,"./components/score":11,"./components/space-max":12,"./components/star-wrap":13,"./sprites":18,"./sprites/bg-music-sound":15,"./sprites/boom-sound":16,"./sprites/fly-sound":17,"./store":23}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

class Bullet {
  constructor(app, sprite, spriteWidth, spriteHeight) {
    this.app = app;
    this.sprite = sprite;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.unit = this._createUnit();
    this.isShoot = false;
    this.unit = this._createUnit();
    this.app.stage.addChild(this.unit);
    this.app.ticker.add(delta => this._onUpdate(delta));
  }

  _onUpdate() {
    if (this.isShoot) {
      this.unit.y += this.speed;
      this.onMove();
    }

    if (!this._canMove()) {
      this.isShoot = false;
    }
  }

  _canMove() {
    const {
      height
    } = this.app.renderer.screen;
    return this.unit.y + this.unit.height > 0 && this.unit.y < height;
  }

  _createUnit() {
    const sprite = this.sprite();
    sprite.width = this.spriteWidth;
    sprite.height = this.spriteHeight;
    sprite.x = -100;
    sprite.y = -100;
    return sprite;
  }

  _shoot(x, y, speed) {
    this.isShoot = true;
    this.unit.y = y;
    this.unit.x = x;
    this.speed = speed;
  }

}

exports.default = Bullet;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = require("../store");

const LOCAL_STORAGE_KEY = 'score';

class GameOver {
  constructor(app) {
    this.app = app;

    if (localStorage.getItem(LOCAL_STORAGE_KEY) && +localStorage.getItem(LOCAL_STORAGE_KEY) >= (0, _store.getScore)()) {
      this.maxScoreLabel = this._createLabel(`Max score ${localStorage.getItem(LOCAL_STORAGE_KEY)}`, this.app.renderer.screen.height / 2 + 50);
      this.app.stage.addChild(this.maxScoreLabel);
    }

    if (!localStorage.getItem(LOCAL_STORAGE_KEY) || +localStorage.getItem(LOCAL_STORAGE_KEY) < (0, _store.getScore)()) {
      localStorage.setItem(LOCAL_STORAGE_KEY, (0, _store.getScore)());
    }

    this.scoreLabel = this._createLabel((0, _store.getScore)(), this.app.renderer.screen.height / 2);
    this.app.stage.addChild(this.scoreLabel);
    this.tryAgain = this._createLabel('Try again', this.app.renderer.screen.height - 100, () => location.reload());
    this.app.stage.addChild(this.tryAgain);
  }

  _createLabel(text, y, onClick) {
    const label = new PIXI.Text(text, {
      fontFamily: 'Arial',
      fontSize: 30,
      fill: '#00FF22',
      align: 'center'
    });
    label.anchor.set(0.5, 0.5);
    label.y = y;
    label.x = this.app.renderer.screen.width / 2;

    if (onClick) {
      label.interactive = true;
      label.on('touchend', onClick);
    }

    return label;
  }

}

exports.default = GameOver;

},{"../store":23}],9:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _appSetting = _interopRequireDefault(require("../app-setting"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  movingUnit
} = _appSetting.default;
const STEP_FILTERS = [new PIXI.filters.BulgePinchFilter({
  radius: 20
}), new PIXI.filters.MotionBlurFilter([0, 20])];

class MovingUnit {
  constructor(app, sprite, spriteWidth, spriteHeight, spriteStartY, topDeltaX) {
    this.app = app;
    this.sprite = sprite;
    this.spriteWidth = spriteWidth;
    this.spriteHeight = spriteHeight;
    this.spriteStartY = spriteStartY;
    this.topDeltaX = topDeltaX;
    this.unit = this._createUnit();
    this.steps = this._createSteps();
    this.app.stage.addChild(this.unit.sprite, ...this.steps.map(({
      sprite
    }) => sprite));
  }

  _createSteps() {
    return new Array(movingUnit.stepsAmount).fill(null).map((_, index) => this._createUnit(this.spriteStartY + index * movingUnit.stepSize, STEP_FILTERS));
  }

  _onUpdate() {
    const rotationOffset = this._getRotationOffset(this.unit.x);

    this._moveSteps(rotationOffset);

    this._moveToTop();
  }

  _moveSteps(rotationOffset) {
    const {
      height
    } = this.app.renderer.screen;
    this.steps.forEach(step => {
      if (step.y > this.spriteStartY + movingUnit.deadStepOffset) {
        step.setPosition(this.unit.x, this.spriteStartY, rotationOffset);
        step.sprite.alpha = 1;
      } else {
        step.setPosition(step.x + this.unit.angleVector.x * movingUnit.stepSize * movingUnit.stepSpeed, step.y + this.unit.angleVector.y * movingUnit.stepSize * movingUnit.stepSpeed, rotationOffset);
        step.sprite.alpha -= 0.2;
      }
    });
  }

  _moveToTop() {
    const {
      parent
    } = this.unit.sprite;
    parent.removeChild(this.unit.sprite);
    parent.addChild(this.unit.sprite);
  }

  _getRotationOffset(nextStep) {
    const {
      width
    } = this.app.renderer.screen;
    const rotationDelta = 50;
    const rotationPercent = (width / 2 - nextStep) / (width / 2);
    return rotationDelta * rotationPercent;
  }

  _createUnit(startY, filters = []) {
    const self = this;
    const {
      width
    } = this.app.renderer.screen;

    const getAngleVector = this._getAngleVector.bind(this);

    const spaceMax = {
      sprite: this.sprite(),
      width: this.spriteWidth,
      height: this.spriteHeight,

      setPosition(x0, y0, projectTopX = 0) {
        this.x = x0;
        this.y = y0;
        const topDeltaX = this.width / self.topDeltaX;
        const topDeltaY = this.height / 1.5;
        const projection = [{
          x: this.x - this.width / 2 + topDeltaX + projectTopX,
          y: this.y - this.height / 2 + topDeltaY
        }, {
          x: this.x + this.width / 2 - topDeltaX + projectTopX,
          y: this.y - this.height / 2 + topDeltaY
        }, {
          x: this.x + this.width / 2,
          y: this.y + this.height / 2
        }, {
          x: this.x - this.width / 2,
          y: this.y + this.height / 2
        }];
        this.projection = projection;
        spaceMax.sprite.proj.mapSprite(spaceMax.sprite, projection);
        spaceMax.angleVector = getAngleVector(projection);
      }

    };
    spaceMax.setPosition(width / 2, startY || this.spriteStartY);
    spaceMax.sprite.filters = filters;
    return spaceMax;
  }

  _getAngleVector([topLeft, topRight, bottomRight, bottomLeft]) {
    const x0 = (topLeft.x + topRight.x) / 2;
    const x1 = (bottomLeft.x + bottomRight.x) / 2;
    const length = Math.sqrt((x0 - x1) ** 2 + (topLeft.y - bottomLeft.y) ** 2);
    return {
      x: (x1 - x0) / length,
      y: (bottomLeft.y - topLeft.y) / length
    };
  }

  _canMove(x) {
    const {
      width
    } = this.app.renderer.screen;
    return x > 0 && x < width;
  }

}

exports.default = MovingUnit;

},{"../app-setting":5}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _salesforceSprite = _interopRequireDefault(require("../sprites/salesforce-sprite"));

var _movingUnit = _interopRequireDefault(require("./moving-unit"));

var _store = require("../store");

var _bullet = _interopRequireDefault(require("./bullet"));

var _pointInPolygon = _interopRequireDefault(require("point-in-polygon"));

var _appSetting = _interopRequireDefault(require("../app-setting"));

var _shootSound = _interopRequireDefault(require("../sprites/shoot-sound"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  salesforce
} = _appSetting.default;

class SalesForce extends _movingUnit.default {
  constructor(app) {
    super(app, _salesforceSprite.default, 250, 250, 100, 2.5);
    this.reloading = 0;
    this.direction = 1;
    this.app.ticker.add(delta => this._onUpdate(delta));
    this.bullets = this._createBullets();
    this.shootSound = (0, _shootSound.default)();
  }

  _onUpdate() {
    this._move();

    this._shoot();

    super._onUpdate();
  }

  _shoot() {
    if (this.reloading) {
      this.reloading--;
      return;
    }

    if (Math.random() <= salesforce.shootChance) {
      const bullet = this.bullets.find(({
        isShoot
      }) => !isShoot);

      if (bullet) {
        bullet._shoot(this.unit.x, this.unit.y + this.unit.height / 2, salesforce.bulletSpeed);

        this.shootSound.play();
        this.reloading = salesforce.reloadingCounter;
      }
    }
  }

  _move() {
    this._changeDirection();

    const nextStep = this.unit.x + this.direction * salesforce.speed;

    if (this._canMove(nextStep)) {
      this.unit.setPosition(nextStep, this.unit.y, this._getRotationOffset(nextStep));
    }
  }

  _changeDirection() {
    const nextStep = this.unit.x + this.direction * salesforce.speed;
    const shouldChangeDirection = Math.sign((0, _store.getMaxX)() - this.unit.x) !== this.direction;

    if (Math.random() <= salesforce.changeDirectionChance && shouldChangeDirection) {
      this.direction = this.direction ? -this.direction : 1;
    }
  }

  _createBullets() {
    return new Array(salesforce.bulletCount).fill(null).map((_, index) => {
      const bullet = new _bullet.default(this.app, _salesforceSprite.default, 10, 10);

      bullet.onMove = () => {
        if ((0, _pointInPolygon.default)([bullet.unit.x, bullet.unit.y], (0, _store.getMaxPolygon)())) {
          this.onLoose();
        }
      };

      return bullet;
    });
  }

  delete() {
    this.unit.delete();
  }

}

exports.default = SalesForce;

},{"../app-setting":5,"../sprites/salesforce-sprite":19,"../sprites/shoot-sound":20,"../store":23,"./bullet":7,"./moving-unit":9,"point-in-polygon":4}],11:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _store = require("../store");

const SCORE_SPEED = 1;

class Score {
  constructor(app) {
    this.app = app;
    this.label = this._createLabel();
    this.app.stage.addChild(this.label);
    this.app.ticker.add(delta => this._onUpdate(delta));
  }

  _onUpdate() {
    (0, _store.setScore)((0, _store.getScore)() + SCORE_SPEED);
    this.label.text = (0, _store.getScore)();
  }

  _createLabel() {
    const label = new PIXI.Text((0, _store.getScore)(), {
      fontFamily: 'Arial',
      fontSize: 24,
      fill: '#00FF22',
      align: 'center'
    });
    label.anchor.set(1, 0.5);
    label.y = 10;
    label.x = this.app.renderer.screen.width;
    return label;
  }

}

exports.default = Score;

},{"../store":23}],12:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _spaceMaxSprite = _interopRequireDefault(require("../sprites/space-max-sprite"));

var _gyroService = _interopRequireDefault(require("../services/gyro-service"));

var _movingUnit = _interopRequireDefault(require("./moving-unit"));

var _store = require("../store");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class SpaceMax extends _movingUnit.default {
  constructor(app) {
    super(app, _spaceMaxSprite.default, 150, 200, app.renderer.screen.height / 2, 3);
    this.gyro = {
      x: 1,
      y: 1,
      z: 1
    };
    this.app.ticker.add(delta => this._onUpdate(delta));

    _gyroService.default.on(this._onGyro.bind(this));
  }

  _onGyro(state) {
    this.gyro = state;
  }

  _onUpdate() {
    const speed = 5;
    const nextStep = this.unit.x - this.gyro.x * speed;

    const rotationOffset = this._getRotationOffset(nextStep);

    this._moveSpaceMax(nextStep, rotationOffset);

    super._onUpdate();

    (0, _store.setMaxX)(this.unit.x);
    (0, _store.setMaxPolygon)(this.unit.projection);
  }

  _moveSpaceMax(nextStep, rotationOffset) {
    const proximity = 0.4;

    if ((this.gyro.x > proximity || this.gyro.x < -proximity) && this._canMove(nextStep)) {
      this.unit.setPosition(nextStep, this.unit.y, rotationOffset);
    }
  }

}

exports.default = SpaceMax;

},{"../services/gyro-service":14,"../sprites/space-max-sprite":21,"../store":23,"./moving-unit":9}],13:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _starSprite = _interopRequireDefault(require("../sprites/star-sprite"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const STARS_AMOUNT = 1000;
const MAX_Z = 2000;
const STEP = 10;
const Z_STEP = 20;
const BASE_SPEED = 0.5;
const STAR_BASE_SIZE = 0.05;
const STAR_STRETCH = 1;

class StarWrap {
  constructor(app) {
    this.cameraZ = 0;
    this.app = app;
    this.stars = this._createStarts();
    this.app.stage.addChild(...this.stars.map(({
      sprite
    }) => sprite));
    this.app.ticker.add(delta => this._onUpdate(delta));
  }

  _onUpdate(delta) {
    const {
      width,
      height
    } = this.app.renderer.screen;
    this.cameraZ += delta * STEP * BASE_SPEED;
    this.stars.forEach(star => {
      if (star.z < this.cameraZ) {
        this._setRandomStarPosition(star);

        star.z = this.cameraZ + Math.random() * MAX_Z / 2 + MAX_Z;
      }

      const z = star.z - this.cameraZ;
      star.sprite.x = star.x * (Z_STEP / z) * width + width / 2;
      star.sprite.y = star.y * (Z_STEP / z) * width + height / 2;
      const dxCenter = star.sprite.x - width / 2;
      const dyCenter = star.sprite.y - height / 2;
      const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
      const distanceScale = Math.max(0, (MAX_Z - z) / MAX_Z);
      star.sprite.scale.x = distanceScale * STAR_BASE_SIZE;
      star.sprite.scale.y = distanceScale * STAR_BASE_SIZE + distanceScale * BASE_SPEED * STAR_STRETCH * distanceCenter / width;
      star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
    });
  }

  _createStarts() {
    return new Array(STARS_AMOUNT).fill(null).map(() => this._createStar());
  }

  _createStar() {
    const star = {
      sprite: (0, _starSprite.default)()
    };

    this._setRandomStarPosition(star);

    return star;
  }

  _setRandomStarPosition(star) {
    const deg = Math.random() * Math.PI * 2;
    const distance = Math.random() * 50 + 1;
    star.x = Math.cos(deg) * distance;
    star.y = Math.sin(deg) * distance;
    star.z = Math.random() * MAX_Z;
  }

}

exports.default = StarWrap;

},{"../sprites/star-sprite":22}],14:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.GYRO_ERRORS = void 0;
let callbacks = [];
const GYRO_ERRORS = {
  NOT_ALLOWED: 'NOT_ALLOWED',
  NOT_SUPPORTED: 'NOT_SUPPORTED'
};
exports.GYRO_ERRORS = GYRO_ERRORS;

class GyroService {
  static on(callback) {
    callbacks.push(callback);
  }

  static off(callback) {
    callbacks = callbacks.filter(x => x !== callback);
  }

  static use() {
    let accelerometer = null;

    try {
      accelerometer = new Accelerometer({
        referenceFrame: 'device',
        frequency: 60
      });
      accelerometer.addEventListener('reading', () => callbacks.forEach(x => x(accelerometer)));
      accelerometer.start();
      return {};
    } catch (error) {
      if (error.name === 'SecurityError') {
        return {
          error: GYRO_ERRORS.NOT_ALLOWED
        };
      } else {
        return {
          error: GYRO_ERRORS.NOT_SUPPORTED
        };
      }
    }
  }

}

exports.default = GyroService;

},{}],15:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BgMusicSound;

var _ = require(".");

function BgMusicSound() {
  const {
    sound
  } = _.assetsLoader.resources[_.RESOURCE_NAMES.bgMusic];
  sound.loop = true;
  return sound;
}

},{".":18}],16:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = BoomSound;

var _ = require(".");

function BoomSound() {
  const {
    sound
  } = _.assetsLoader.resources[_.RESOURCE_NAMES.boom];
  return sound;
}

},{".":18}],17:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = FlySound;

var _ = require(".");

function FlySound() {
  const {
    sound
  } = _.assetsLoader.resources[_.RESOURCE_NAMES.fly];
  sound.volume = 0.2;
  sound.loop = true;
  return sound;
}

},{".":18}],18:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.assetsLoader = exports.RESOURCE_NAMES = void 0;
const RESOURCE_NAMES = {
  star: 'star',
  max: 'max',
  salesforce: 'salesforce',
  bgMusic: 'bgMusic',
  boom: 'boom',
  fly: 'fly',
  shoot: 'shoot'
};
exports.RESOURCE_NAMES = RESOURCE_NAMES;
const assetsLoader = new PIXI.Loader();
exports.assetsLoader = assetsLoader;
assetsLoader.add(RESOURCE_NAMES.star, '/assets/star.png').add(RESOURCE_NAMES.max, '/assets/max.png').add(RESOURCE_NAMES.salesforce, '/assets/salesforce-logo.png').add(RESOURCE_NAMES.bgMusic, '/assets/bg-music.mp3').add(RESOURCE_NAMES.boom, '/assets/boom.mp3').add(RESOURCE_NAMES.fly, '/assets/fly.wav').add(RESOURCE_NAMES.shoot, '/assets/shoot.wav');

var _default = new Promise((resolve, reject) => {
  assetsLoader.onComplete.once(() => resolve());
  assetsLoader.onError.once(() => reject());
  assetsLoader.load();
});

exports.default = _default;

},{}],19:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SalesforceSprite;

var _ = require(".");

function SalesforceSprite() {
  const sprite = new PIXI.projection.Sprite2d(_.assetsLoader.resources[_.RESOURCE_NAMES.salesforce].texture);
  sprite.anchor.set(0.5, 0.5);
  return sprite;
}

},{".":18}],20:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = ShootSound;

var _ = require(".");

function ShootSound() {
  const {
    sound
  } = _.assetsLoader.resources[_.RESOURCE_NAMES.shoot];
  sound.volume = 0.4;
  return sound;
}

},{".":18}],21:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = SpaceMaxSprite;

var _ = require(".");

function SpaceMaxSprite() {
  const sprite = new PIXI.projection.Sprite2d(_.assetsLoader.resources[_.RESOURCE_NAMES.max].texture);
  sprite.anchor.set(0.5, 0.5);
  return sprite;
}

},{".":18}],22:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = StarSprite;

var _ = require(".");

function StarSprite() {
  const sprite = new PIXI.Sprite(_.assetsLoader.resources[_.RESOURCE_NAMES.star].texture);
  sprite.anchor.set(0.5, 0.7);
  return sprite;
}

},{".":18}],23:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setScore = exports.getScore = exports.getMaxPolygon = exports.setMaxPolygon = exports.getMaxX = exports.setMaxX = void 0;
let maxX = null;
let maxPolygon = [];
let score = 0;

const setMaxX = x => maxX = x;

exports.setMaxX = setMaxX;

const getMaxX = () => maxX;

exports.getMaxX = getMaxX;

const setMaxPolygon = polygon => {
  maxPolygon = polygon.map(({
    x,
    y
  }) => [x, y]);
};

exports.setMaxPolygon = setMaxPolygon;

const getMaxPolygon = () => maxPolygon;

exports.getMaxPolygon = getMaxPolygon;

const getScore = () => score;

exports.getScore = getScore;

const setScore = value => score = value;

exports.setScore = setScore;

},{}]},{},[1]);
