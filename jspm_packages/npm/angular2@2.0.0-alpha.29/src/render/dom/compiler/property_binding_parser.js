/* */ 
'use strict';
var lang_1 = require("../../../facade/lang");
var collection_1 = require("../../../facade/collection");
var util_1 = require("../util");
var BIND_NAME_REGEXP = lang_1.RegExpWrapper.create('^(?:(?:(?:(bind-)|(var-|#)|(on-)|(bindon-))(.+))|\\[\\(([^\\)]+)\\)\\]|\\[([^\\]]+)\\]|\\(([^\\)]+)\\))$');
var PropertyBindingParser = (function() {
  function PropertyBindingParser(_parser) {
    this._parser = _parser;
  }
  PropertyBindingParser.prototype.process = function(parent, current, control) {
    var _this = this;
    var attrs = current.attrs();
    var newAttrs = new Map();
    collection_1.MapWrapper.forEach(attrs, function(attrValue, attrName) {
      var bindParts = lang_1.RegExpWrapper.firstMatch(BIND_NAME_REGEXP, attrName);
      if (lang_1.isPresent(bindParts)) {
        if (lang_1.isPresent(bindParts[1])) {
          _this._bindProperty(bindParts[5], attrValue, current, newAttrs);
        } else if (lang_1.isPresent(bindParts[2])) {
          var identifier = bindParts[5];
          var value = attrValue == '' ? '\$implicit' : attrValue;
          _this._bindVariable(identifier, value, current, newAttrs);
        } else if (lang_1.isPresent(bindParts[3])) {
          _this._bindEvent(bindParts[5], attrValue, current, newAttrs);
        } else if (lang_1.isPresent(bindParts[4])) {
          _this._bindProperty(bindParts[5], attrValue, current, newAttrs);
          _this._bindAssignmentEvent(bindParts[5], attrValue, current, newAttrs);
        } else if (lang_1.isPresent(bindParts[6])) {
          _this._bindProperty(bindParts[6], attrValue, current, newAttrs);
          _this._bindAssignmentEvent(bindParts[6], attrValue, current, newAttrs);
        } else if (lang_1.isPresent(bindParts[7])) {
          _this._bindProperty(bindParts[7], attrValue, current, newAttrs);
        } else if (lang_1.isPresent(bindParts[8])) {
          _this._bindEvent(bindParts[8], attrValue, current, newAttrs);
        }
      } else {
        var expr = _this._parser.parseInterpolation(attrValue, current.elementDescription);
        if (lang_1.isPresent(expr)) {
          _this._bindPropertyAst(attrName, expr, current, newAttrs);
        }
      }
    });
    collection_1.MapWrapper.forEach(newAttrs, function(attrValue, attrName) {
      attrs.set(attrName, attrValue);
    });
  };
  PropertyBindingParser.prototype._bindVariable = function(identifier, value, current, newAttrs) {
    current.bindElement().bindVariable(util_1.dashCaseToCamelCase(identifier), value);
    newAttrs.set(identifier, value);
  };
  PropertyBindingParser.prototype._bindProperty = function(name, expression, current, newAttrs) {
    this._bindPropertyAst(name, this._parser.parseBinding(expression, current.elementDescription), current, newAttrs);
  };
  PropertyBindingParser.prototype._bindPropertyAst = function(name, ast, current, newAttrs) {
    var binder = current.bindElement();
    binder.bindProperty(util_1.dashCaseToCamelCase(name), ast);
    newAttrs.set(name, ast.source);
  };
  PropertyBindingParser.prototype._bindAssignmentEvent = function(name, expression, current, newAttrs) {
    this._bindEvent(name, expression + "=$event", current, newAttrs);
  };
  PropertyBindingParser.prototype._bindEvent = function(name, expression, current, newAttrs) {
    current.bindElement().bindEvent(util_1.dashCaseToCamelCase(name), this._parser.parseAction(expression, current.elementDescription));
  };
  return PropertyBindingParser;
})();
exports.PropertyBindingParser = PropertyBindingParser;
exports.__esModule = true;
