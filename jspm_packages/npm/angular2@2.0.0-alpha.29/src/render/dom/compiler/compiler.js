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
var di_1 = require("../../../../di");
var async_1 = require("../../../facade/async");
var lang_1 = require("../../../facade/lang");
var dom_adapter_1 = require("../../../dom/dom_adapter");
var api_1 = require("../../api");
var compile_pipeline_1 = require("./compile_pipeline");
var view_loader_1 = require("./view_loader");
var compile_step_factory_1 = require("./compile_step_factory");
var change_detection_1 = require("../../../../change_detection");
var shadow_dom_strategy_1 = require("../shadow_dom/shadow_dom_strategy");
var DomCompiler = (function(_super) {
  __extends(DomCompiler, _super);
  function DomCompiler(_stepFactory, _viewLoader) {
    _super.call(this);
    this._stepFactory = _stepFactory;
    this._viewLoader = _viewLoader;
  }
  DomCompiler.prototype.compile = function(view) {
    var _this = this;
    var tplPromise = this._viewLoader.load(view);
    return async_1.PromiseWrapper.then(tplPromise, function(el) {
      return _this._compileTemplate(view, el, api_1.ViewType.COMPONENT);
    }, function(e) {
      throw new lang_1.BaseException("Failed to load the template for \"" + view.componentId + "\" : " + e);
    });
  };
  DomCompiler.prototype.compileHost = function(directiveMetadata) {
    var hostViewDef = new api_1.ViewDefinition({
      componentId: directiveMetadata.id,
      templateAbsUrl: null,
      template: null,
      styles: null,
      styleAbsUrls: null,
      directives: [directiveMetadata]
    });
    var element = dom_adapter_1.DOM.createElement(directiveMetadata.selector);
    return this._compileTemplate(hostViewDef, element, api_1.ViewType.HOST);
  };
  DomCompiler.prototype._compileTemplate = function(viewDef, tplElement, protoViewType) {
    var pipeline = new compile_pipeline_1.CompilePipeline(this._stepFactory.createSteps(viewDef));
    var compileElements = pipeline.process(tplElement, protoViewType, viewDef.componentId);
    return async_1.PromiseWrapper.resolve(compileElements[0].inheritedProtoView.build());
  };
  return DomCompiler;
})(api_1.RenderCompiler);
exports.DomCompiler = DomCompiler;
var DefaultDomCompiler = (function(_super) {
  __extends(DefaultDomCompiler, _super);
  function DefaultDomCompiler(parser, shadowDomStrategy, viewLoader) {
    _super.call(this, new compile_step_factory_1.DefaultStepFactory(parser, shadowDomStrategy), viewLoader);
  }
  DefaultDomCompiler = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [change_detection_1.Parser, shadow_dom_strategy_1.ShadowDomStrategy, view_loader_1.ViewLoader])], DefaultDomCompiler);
  return DefaultDomCompiler;
})(DomCompiler);
exports.DefaultDomCompiler = DefaultDomCompiler;
exports.__esModule = true;
