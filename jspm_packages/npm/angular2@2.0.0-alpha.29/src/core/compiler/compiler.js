/* */ 
'use strict';
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
var di_1 = require("../../../di");
var lang_1 = require("../../facade/lang");
var async_1 = require("../../facade/async");
var collection_1 = require("../../facade/collection");
var directive_resolver_1 = require("./directive_resolver");
var view_ref_1 = require("./view_ref");
var element_injector_1 = require("./element_injector");
var view_resolver_1 = require("./view_resolver");
var component_url_mapper_1 = require("./component_url_mapper");
var proto_view_factory_1 = require("./proto_view_factory");
var url_resolver_1 = require("../../services/url_resolver");
var app_root_url_1 = require("../../services/app_root_url");
var renderApi = require("../../render/api");
var CompilerCache = (function() {
  function CompilerCache() {
    this._cache = new collection_1.Map();
    this._hostCache = new collection_1.Map();
  }
  CompilerCache.prototype.set = function(component, protoView) {
    this._cache.set(component, protoView);
  };
  CompilerCache.prototype.get = function(component) {
    var result = this._cache.get(component);
    return lang_1.normalizeBlank(result);
  };
  CompilerCache.prototype.setHost = function(component, protoView) {
    this._hostCache.set(component, protoView);
  };
  CompilerCache.prototype.getHost = function(component) {
    var result = this._hostCache.get(component);
    return lang_1.normalizeBlank(result);
  };
  CompilerCache.prototype.clear = function() {
    this._cache.clear();
    this._hostCache.clear();
  };
  CompilerCache = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [])], CompilerCache);
  return CompilerCache;
})();
exports.CompilerCache = CompilerCache;
var Compiler = (function() {
  function Compiler(reader, cache, viewResolver, componentUrlMapper, urlResolver, render, protoViewFactory, appUrl) {
    this._reader = reader;
    this._compilerCache = cache;
    this._compiling = new collection_1.Map();
    this._viewResolver = viewResolver;
    this._componentUrlMapper = componentUrlMapper;
    this._urlResolver = urlResolver;
    this._appUrl = appUrl.value;
    this._render = render;
    this._protoViewFactory = protoViewFactory;
  }
  Compiler.prototype._bindDirective = function(directiveTypeOrBinding) {
    if (directiveTypeOrBinding instanceof element_injector_1.DirectiveBinding) {
      return directiveTypeOrBinding;
    } else if (directiveTypeOrBinding instanceof di_1.Binding) {
      var annotation = this._reader.resolve(directiveTypeOrBinding.token);
      return element_injector_1.DirectiveBinding.createFromBinding(directiveTypeOrBinding, annotation);
    } else {
      var annotation = this._reader.resolve(directiveTypeOrBinding);
      return element_injector_1.DirectiveBinding.createFromType(directiveTypeOrBinding, annotation);
    }
  };
  Compiler.prototype.compileInHost = function(componentTypeOrBinding) {
    var _this = this;
    var componentType = lang_1.isType(componentTypeOrBinding) ? componentTypeOrBinding : componentTypeOrBinding.token;
    var hostAppProtoView = this._compilerCache.getHost(componentType);
    var hostPvPromise;
    if (lang_1.isPresent(hostAppProtoView)) {
      hostPvPromise = async_1.PromiseWrapper.resolve(hostAppProtoView);
    } else {
      var componentBinding = this._bindDirective(componentTypeOrBinding);
      Compiler._assertTypeIsComponent(componentBinding);
      var directiveMetadata = componentBinding.metadata;
      hostPvPromise = this._render.compileHost(directiveMetadata).then(function(hostRenderPv) {
        return _this._compileNestedProtoViews(componentBinding, hostRenderPv, [componentBinding]);
      });
    }
    return hostPvPromise.then(function(hostAppProtoView) {
      return new view_ref_1.ProtoViewRef(hostAppProtoView);
    });
  };
  Compiler.prototype._compile = function(componentBinding) {
    var _this = this;
    var component = componentBinding.key.token;
    var protoView = this._compilerCache.get(component);
    if (lang_1.isPresent(protoView)) {
      return protoView;
    }
    var pvPromise = this._compiling.get(component);
    if (lang_1.isPresent(pvPromise)) {
      return pvPromise;
    }
    var view = this._viewResolver.resolve(component);
    var directives = this._flattenDirectives(view);
    for (var i = 0; i < directives.length; i++) {
      if (!Compiler._isValidDirective(directives[i])) {
        throw new lang_1.BaseException("Unexpected directive value '" + lang_1.stringify(directives[i]) + "' on the View of component '" + lang_1.stringify(component) + "'");
      }
    }
    var boundDirectives = this._removeDuplicatedDirectives(collection_1.ListWrapper.map(directives, function(directive) {
      return _this._bindDirective(directive);
    }));
    var renderTemplate = this._buildRenderTemplate(component, view, boundDirectives);
    pvPromise = this._render.compile(renderTemplate).then(function(renderPv) {
      return _this._compileNestedProtoViews(componentBinding, renderPv, boundDirectives);
    });
    this._compiling.set(component, pvPromise);
    return pvPromise;
  };
  Compiler.prototype._removeDuplicatedDirectives = function(directives) {
    var directivesMap = new collection_1.Map();
    directives.forEach(function(dirBinding) {
      directivesMap.set(dirBinding.key.id, dirBinding);
    });
    return collection_1.MapWrapper.values(directivesMap);
  };
  Compiler.prototype._compileNestedProtoViews = function(componentBinding, renderPv, directives) {
    var _this = this;
    var protoViews = this._protoViewFactory.createAppProtoViews(componentBinding, renderPv, directives);
    var protoView = protoViews[0];
    if (lang_1.isPresent(componentBinding)) {
      var component = componentBinding.key.token;
      if (renderPv.type === renderApi.ViewType.COMPONENT) {
        this._compilerCache.set(component, protoView);
        collection_1.MapWrapper.delete(this._compiling, component);
      } else {
        this._compilerCache.setHost(component, protoView);
      }
    }
    var nestedPVPromises = [];
    collection_1.ListWrapper.forEach(this._collectComponentElementBinders(protoViews), function(elementBinder) {
      var nestedComponent = elementBinder.componentDirective;
      var elementBinderDone = function(nestedPv) {
        elementBinder.nestedProtoView = nestedPv;
      };
      var nestedCall = _this._compile(nestedComponent);
      if (lang_1.isPromise(nestedCall)) {
        nestedPVPromises.push(nestedCall.then(elementBinderDone));
      } else {
        elementBinderDone(nestedCall);
      }
    });
    if (nestedPVPromises.length > 0) {
      return async_1.PromiseWrapper.all(nestedPVPromises).then(function(_) {
        return protoView;
      });
    } else {
      return protoView;
    }
  };
  Compiler.prototype._collectComponentElementBinders = function(protoViews) {
    var componentElementBinders = [];
    collection_1.ListWrapper.forEach(protoViews, function(protoView) {
      collection_1.ListWrapper.forEach(protoView.elementBinders, function(elementBinder) {
        if (lang_1.isPresent(elementBinder.componentDirective)) {
          componentElementBinders.push(elementBinder);
        }
      });
    });
    return componentElementBinders;
  };
  Compiler.prototype._buildRenderTemplate = function(component, view, directives) {
    var _this = this;
    var componentUrl = this._urlResolver.resolve(this._appUrl, this._componentUrlMapper.getUrl(component));
    var templateAbsUrl = null;
    var styleAbsUrls = null;
    if (lang_1.isPresent(view.templateUrl)) {
      templateAbsUrl = this._urlResolver.resolve(componentUrl, view.templateUrl);
    } else if (lang_1.isPresent(view.template)) {
      templateAbsUrl = componentUrl;
    }
    if (lang_1.isPresent(view.styleUrls)) {
      styleAbsUrls = collection_1.ListWrapper.map(view.styleUrls, function(url) {
        return _this._urlResolver.resolve(componentUrl, url);
      });
    }
    return new renderApi.ViewDefinition({
      componentId: lang_1.stringify(component),
      templateAbsUrl: templateAbsUrl,
      template: view.template,
      styleAbsUrls: styleAbsUrls,
      styles: view.styles,
      directives: collection_1.ListWrapper.map(directives, function(directiveBinding) {
        return directiveBinding.metadata;
      })
    });
  };
  Compiler.prototype._flattenDirectives = function(template) {
    if (lang_1.isBlank(template.directives))
      return [];
    var directives = [];
    this._flattenList(template.directives, directives);
    return directives;
  };
  Compiler.prototype._flattenList = function(tree, out) {
    for (var i = 0; i < tree.length; i++) {
      var item = di_1.resolveForwardRef(tree[i]);
      if (lang_1.isArray(item)) {
        this._flattenList(item, out);
      } else {
        out.push(item);
      }
    }
  };
  Compiler._isValidDirective = function(value) {
    return lang_1.isPresent(value) && (value instanceof lang_1.Type || value instanceof di_1.Binding);
  };
  Compiler._assertTypeIsComponent = function(directiveBinding) {
    if (directiveBinding.metadata.type !== renderApi.DirectiveMetadata.COMPONENT_TYPE) {
      throw new lang_1.BaseException("Could not load '" + lang_1.stringify(directiveBinding.key.token) + "' because it is not a component.");
    }
  };
  Compiler = __decorate([di_1.Injectable(), __metadata('design:paramtypes', [directive_resolver_1.DirectiveResolver, CompilerCache, view_resolver_1.ViewResolver, component_url_mapper_1.ComponentUrlMapper, url_resolver_1.UrlResolver, renderApi.RenderCompiler, proto_view_factory_1.ProtoViewFactory, app_root_url_1.AppRootUrl])], Compiler);
  return Compiler;
})();
exports.Compiler = Compiler;
exports.__esModule = true;
