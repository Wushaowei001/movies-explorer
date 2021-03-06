/* */ 
'use strict';
var __extends = (this && this.__extends) || function(d, b) {
  for (var p in b)
    if (b.hasOwnProperty(p))
      d[p] = b[p];
  function __() {
    this.constructor = d;
  }
  __.prototype = b.prototype;
  d.prototype = new __();
};
var __decorate = (this && this.__decorate) || function(decorators, target, key, desc) {
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
    return Reflect.decorate(decorators, target, key, desc);
  switch (arguments.length) {
    case 2:
      return decorators.reduceRight(function(o, d) {
        return (d && d(o)) || o;
      }, target);
    case 3:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key)), void 0;
      }, void 0);
    case 4:
      return decorators.reduceRight(function(o, d) {
        return (d && d(target, key, o)) || o;
      }, desc);
  }
};
var __metadata = (this && this.__metadata) || function(k, v) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
    return Reflect.metadata(k, v);
};
var lang_1 = require("../../facade/lang");
var pipe_1 = require("./pipe");
var NullPipeFactory = (function() {
  function NullPipeFactory() {}
  NullPipeFactory.prototype.supports = function(obj) {
    return NullPipe.supportsObj(obj);
  };
  NullPipeFactory.prototype.create = function(cdRef) {
    return new NullPipe();
  };
  NullPipeFactory = __decorate([lang_1.CONST(), __metadata('design:paramtypes', [])], NullPipeFactory);
  return NullPipeFactory;
})();
exports.NullPipeFactory = NullPipeFactory;
var NullPipe = (function(_super) {
  __extends(NullPipe, _super);
  function NullPipe() {
    _super.apply(this, arguments);
    this.called = false;
  }
  NullPipe.supportsObj = function(obj) {
    return lang_1.isBlank(obj);
  };
  NullPipe.prototype.supports = function(obj) {
    return NullPipe.supportsObj(obj);
  };
  NullPipe.prototype.transform = function(value, args) {
    if (args === void 0) {
      args = null;
    }
    if (!this.called) {
      this.called = true;
      return pipe_1.WrappedValue.wrap(null);
    } else {
      return null;
    }
  };
  return NullPipe;
})(pipe_1.BasePipe);
exports.NullPipe = NullPipe;
exports.__esModule = true;
