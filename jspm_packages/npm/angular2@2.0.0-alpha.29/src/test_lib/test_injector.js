/* */ 
'use strict';
var di_1 = require("../../di");
var compiler_1 = require("../core/compiler/compiler");
var reflection_1 = require("../reflection/reflection");
var change_detection_1 = require("../../change_detection");
var exception_handler_1 = require("../core/exception_handler");
var view_loader_1 = require("../render/dom/compiler/view_loader");
var view_resolver_1 = require("../core/compiler/view_resolver");
var directive_resolver_1 = require("../core/compiler/directive_resolver");
var dynamic_component_loader_1 = require("../core/compiler/dynamic_component_loader");
var shadow_dom_strategy_1 = require("../render/dom/shadow_dom/shadow_dom_strategy");
var emulated_unscoped_shadow_dom_strategy_1 = require("../render/dom/shadow_dom/emulated_unscoped_shadow_dom_strategy");
var xhr_1 = require("../render/xhr");
var component_url_mapper_1 = require("../core/compiler/component_url_mapper");
var url_resolver_1 = require("../services/url_resolver");
var app_root_url_1 = require("../services/app_root_url");
var style_url_resolver_1 = require("../render/dom/compiler/style_url_resolver");
var style_inliner_1 = require("../render/dom/compiler/style_inliner");
var ng_zone_1 = require("../core/zone/ng_zone");
var dom_adapter_1 = require("../dom/dom_adapter");
var event_manager_1 = require("../render/dom/events/event_manager");
var view_resolver_mock_1 = require("../mock/view_resolver_mock");
var xhr_mock_1 = require("../render/xhr_mock");
var mock_location_strategy_1 = require("../mock/mock_location_strategy");
var location_strategy_1 = require("../router/location_strategy");
var ng_zone_mock_1 = require("../mock/ng_zone_mock");
var test_component_builder_1 = require("./test_component_builder");
var di_2 = require("../../di");
var collection_1 = require("../facade/collection");
var lang_1 = require("../facade/lang");
var view_pool_1 = require("../core/compiler/view_pool");
var view_manager_1 = require("../core/compiler/view_manager");
var view_manager_utils_1 = require("../core/compiler/view_manager_utils");
var debug_1 = require("../../debug");
var proto_view_factory_1 = require("../core/compiler/proto_view_factory");
var api_1 = require("../render/api");
var dom_renderer_1 = require("../render/dom/dom_renderer");
var compiler_2 = require("../render/dom/compiler/compiler");
function _getRootBindings() {
  return [di_1.bind(reflection_1.Reflector).toValue(reflection_1.reflector)];
}
function _getAppBindings() {
  var appDoc;
  try {
    appDoc = dom_adapter_1.DOM.defaultDoc();
  } catch (e) {
    appDoc = null;
  }
  return [di_1.bind(dom_renderer_1.DOCUMENT_TOKEN).toValue(appDoc), di_1.bind(shadow_dom_strategy_1.ShadowDomStrategy).toFactory(function(doc) {
    return new emulated_unscoped_shadow_dom_strategy_1.EmulatedUnscopedShadowDomStrategy(doc.head);
  }, [dom_renderer_1.DOCUMENT_TOKEN]), dom_renderer_1.DomRenderer, compiler_2.DefaultDomCompiler, di_1.bind(api_1.Renderer).toAlias(dom_renderer_1.DomRenderer), di_1.bind(api_1.RenderCompiler).toAlias(compiler_2.DefaultDomCompiler), proto_view_factory_1.ProtoViewFactory, view_pool_1.AppViewPool, view_manager_1.AppViewManager, view_manager_utils_1.AppViewManagerUtils, debug_1.ELEMENT_PROBE_CONFIG, di_1.bind(view_pool_1.APP_VIEW_POOL_CAPACITY).toValue(500), compiler_1.Compiler, compiler_1.CompilerCache, di_1.bind(view_resolver_1.ViewResolver).toClass(view_resolver_mock_1.MockViewResolver), di_1.bind(change_detection_1.PipeRegistry).toValue(change_detection_1.defaultPipeRegistry), di_1.bind(change_detection_1.ChangeDetection).toClass(change_detection_1.DynamicChangeDetection), view_loader_1.ViewLoader, dynamic_component_loader_1.DynamicComponentLoader, directive_resolver_1.DirectiveResolver, change_detection_1.Parser, change_detection_1.Lexer, exception_handler_1.ExceptionHandler, di_1.bind(location_strategy_1.LocationStrategy).toClass(mock_location_strategy_1.MockLocationStrategy), di_1.bind(xhr_1.XHR).toClass(xhr_mock_1.MockXHR), component_url_mapper_1.ComponentUrlMapper, url_resolver_1.UrlResolver, app_root_url_1.AppRootUrl, style_url_resolver_1.StyleUrlResolver, style_inliner_1.StyleInliner, test_component_builder_1.TestComponentBuilder, di_1.bind(ng_zone_1.NgZone).toClass(ng_zone_mock_1.MockNgZone), di_1.bind(event_manager_1.EventManager).toFactory(function(zone) {
    var plugins = [new event_manager_1.DomEventsPlugin()];
    return new event_manager_1.EventManager(plugins, zone);
  }, [ng_zone_1.NgZone])];
}
function createTestInjector(bindings) {
  var rootInjector = di_2.Injector.resolveAndCreate(_getRootBindings());
  return rootInjector.resolveAndCreateChild(collection_1.ListWrapper.concat(_getAppBindings(), bindings));
}
exports.createTestInjector = createTestInjector;
function inject(tokens, fn) {
  return new FunctionWithParamTokens(tokens, fn);
}
exports.inject = inject;
var FunctionWithParamTokens = (function() {
  function FunctionWithParamTokens(tokens, fn) {
    this._tokens = tokens;
    this._fn = fn;
  }
  FunctionWithParamTokens.prototype.execute = function(injector) {
    var params = collection_1.ListWrapper.map(this._tokens, function(t) {
      return injector.get(t);
    });
    lang_1.FunctionWrapper.apply(this._fn, params);
  };
  return FunctionWithParamTokens;
})();
exports.FunctionWithParamTokens = FunctionWithParamTokens;
exports.__esModule = true;
