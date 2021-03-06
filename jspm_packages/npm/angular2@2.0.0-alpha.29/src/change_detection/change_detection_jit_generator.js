/* */ 
'use strict';
var lang_1 = require("../facade/lang");
var collection_1 = require("../facade/collection");
var abstract_change_detector_1 = require("./abstract_change_detector");
var change_detection_util_1 = require("./change_detection_util");
var proto_record_1 = require("./proto_record");
var ABSTRACT_CHANGE_DETECTOR = "AbstractChangeDetector";
var UTIL = "ChangeDetectionUtil";
var DISPATCHER_ACCESSOR = "this.dispatcher";
var PIPE_REGISTRY_ACCESSOR = "this.pipeRegistry";
var PROTOS_ACCESSOR = "this.protos";
var DIRECTIVES_ACCESSOR = "this.directiveRecords";
var CONTEXT_ACCESSOR = "this.context";
var IS_CHANGED_LOCAL = "isChanged";
var CHANGES_LOCAL = "changes";
var LOCALS_ACCESSOR = "this.locals";
var MODE_ACCESSOR = "this.mode";
var CURRENT_PROTO = "currentProto";
var ALREADY_CHECKED_ACCESSOR = "this.alreadyChecked";
var ChangeDetectorJITGenerator = (function() {
  function ChangeDetectorJITGenerator(id, changeDetectionStrategy, records, directiveRecords) {
    this.id = id;
    this.changeDetectionStrategy = changeDetectionStrategy;
    this.records = records;
    this.directiveRecords = directiveRecords;
    this._localNames = this._getLocalNames(records);
    this._changeNames = this._getChangeNames(this._localNames);
    this._fieldNames = this._getFieldNames(this._localNames);
    this._pipeNames = this._getPipeNames(this._localNames);
  }
  ChangeDetectorJITGenerator.prototype._getLocalNames = function(records) {
    var index = 0;
    var names = records.map(function(r) {
      return _sanitizeName("" + r.name + index++);
    });
    return ["context"].concat(names);
  };
  ChangeDetectorJITGenerator.prototype._getChangeNames = function(_localNames) {
    return _localNames.map(function(n) {
      return ("change_" + n);
    });
  };
  ChangeDetectorJITGenerator.prototype._getFieldNames = function(_localNames) {
    return _localNames.map(function(n) {
      return ("this." + n);
    });
  };
  ChangeDetectorJITGenerator.prototype._getPipeNames = function(_localNames) {
    return _localNames.map(function(n) {
      return ("this." + n + "_pipe");
    });
  };
  ChangeDetectorJITGenerator.prototype.generate = function() {
    var _this = this;
    var typeName = _sanitizeName("ChangeDetector_" + this.id);
    var classDefinition = "\n      var " + typeName + " = function " + typeName + "(dispatcher, pipeRegistry, protos, directiveRecords) {\n        " + ABSTRACT_CHANGE_DETECTOR + ".call(this, " + JSON.stringify(this.id) + ");\n        " + DISPATCHER_ACCESSOR + " = dispatcher;\n        " + PIPE_REGISTRY_ACCESSOR + " = pipeRegistry;\n        " + PROTOS_ACCESSOR + " = protos;\n        " + DIRECTIVES_ACCESSOR + " = directiveRecords;\n        " + LOCALS_ACCESSOR + " = null;\n        " + ALREADY_CHECKED_ACCESSOR + " = false;\n        " + this._genFieldDefinitions() + "\n      }\n\n      " + typeName + ".prototype = Object.create(" + ABSTRACT_CHANGE_DETECTOR + ".prototype);\n\n      " + typeName + ".prototype.detectChangesInRecords = function(throwOnChange) {\n        if (!this.hydrated()) {\n          " + UTIL + ".throwDehydrated();\n        }\n        " + this._genLocalDefinitions() + "\n        " + this._genChangeDefinitions() + "\n        var " + IS_CHANGED_LOCAL + " = false;\n        var " + CURRENT_PROTO + ";\n        var " + CHANGES_LOCAL + " = null;\n\n        context = " + CONTEXT_ACCESSOR + ";\n\n        " + this.records.map(function(r) {
      return _this._genRecord(r);
    }).join("\n") + "\n\n        " + ALREADY_CHECKED_ACCESSOR + " = true;\n      }\n\n      " + typeName + ".prototype.callOnAllChangesDone = function() {\n        " + this._genCallOnAllChangesDoneBody() + "\n      }\n\n      " + typeName + ".prototype.hydrate = function(context, locals, directives) {\n        " + MODE_ACCESSOR + " = \"" + change_detection_util_1.ChangeDetectionUtil.changeDetectionMode(this.changeDetectionStrategy) + "\";\n        " + CONTEXT_ACCESSOR + " = context;\n        " + LOCALS_ACCESSOR + " = locals;\n        " + this._genHydrateDirectives() + "\n        " + this._genHydrateDetectors() + "\n        " + ALREADY_CHECKED_ACCESSOR + " = false;\n      }\n\n      " + typeName + ".prototype.dehydrate = function() {\n        " + this._genPipeOnDestroy() + "\n        " + this._genFieldDefinitions() + "\n        " + LOCALS_ACCESSOR + " = null;\n      }\n\n      " + typeName + ".prototype.hydrated = function() {\n        return " + CONTEXT_ACCESSOR + " !== null;\n      }\n\n      return function(dispatcher, pipeRegistry) {\n        return new " + typeName + "(dispatcher, pipeRegistry, protos, directiveRecords);\n      }\n    ";
    return new Function('AbstractChangeDetector', 'ChangeDetectionUtil', 'protos', 'directiveRecords', classDefinition)(abstract_change_detector_1.AbstractChangeDetector, change_detection_util_1.ChangeDetectionUtil, this.records, this.directiveRecords);
  };
  ChangeDetectorJITGenerator.prototype._genGetDirectiveFieldNames = function() {
    var _this = this;
    return this.directiveRecords.map(function(d) {
      return _this._genGetDirective(d.directiveIndex);
    });
  };
  ChangeDetectorJITGenerator.prototype._genGetDetectorFieldNames = function() {
    var _this = this;
    return this.directiveRecords.filter(function(r) {
      return r.isOnPushChangeDetection();
    }).map(function(d) {
      return _this._genGetDetector(d.directiveIndex);
    });
  };
  ChangeDetectorJITGenerator.prototype._genGetDirective = function(d) {
    return "this.directive_" + d.name;
  };
  ChangeDetectorJITGenerator.prototype._genGetDetector = function(d) {
    return "this.detector_" + d.name;
  };
  ChangeDetectorJITGenerator.prototype._getNonNullPipeNames = function() {
    var _this = this;
    var pipes = [];
    this.records.forEach(function(r) {
      if (r.isPipeRecord()) {
        pipes.push(_this._pipeNames[r.selfIndex]);
      }
    });
    return pipes;
  };
  ChangeDetectorJITGenerator.prototype._genFieldDefinitions = function() {
    var fields = [];
    fields = fields.concat(this._fieldNames);
    fields = fields.concat(this._getNonNullPipeNames());
    fields = fields.concat(this._genGetDirectiveFieldNames());
    fields = fields.concat(this._genGetDetectorFieldNames());
    return fields.map(function(n) {
      return n == CONTEXT_ACCESSOR ? n + " = null;" : n + " = " + UTIL + ".uninitialized();";
    }).join("\n");
  };
  ChangeDetectorJITGenerator.prototype._genHydrateDirectives = function() {
    var directiveFieldNames = this._genGetDirectiveFieldNames();
    var lines = collection_1.ListWrapper.createFixedSize(directiveFieldNames.length);
    for (var i = 0,
        iLen = directiveFieldNames.length; i < iLen; ++i) {
      lines[i] = directiveFieldNames[i] + " = directives.getDirectiveFor(" + DIRECTIVES_ACCESSOR + "[" + i + "].directiveIndex);";
    }
    return lines.join('\n');
  };
  ChangeDetectorJITGenerator.prototype._genHydrateDetectors = function() {
    var detectorFieldNames = this._genGetDetectorFieldNames();
    var lines = collection_1.ListWrapper.createFixedSize(detectorFieldNames.length);
    for (var i = 0,
        iLen = detectorFieldNames.length; i < iLen; ++i) {
      lines[i] = detectorFieldNames[i] + " =\n          directives.getDetectorFor(" + DIRECTIVES_ACCESSOR + "[" + i + "].directiveIndex);";
    }
    return lines.join('\n');
  };
  ChangeDetectorJITGenerator.prototype._genPipeOnDestroy = function() {
    return this._getNonNullPipeNames().map(function(p) {
      return (p + ".onDestroy();");
    }).join("\n");
  };
  ChangeDetectorJITGenerator.prototype._genCallOnAllChangesDoneBody = function() {
    var notifications = [];
    var dirs = this.directiveRecords;
    for (var i = dirs.length - 1; i >= 0; --i) {
      var dir = dirs[i];
      if (dir.callOnAllChangesDone) {
        notifications.push(this._genGetDirective(dir.directiveIndex) + ".onAllChangesDone();");
      }
    }
    var directiveNotifications = notifications.join("\n");
    return "\n      this.dispatcher.notifyOnAllChangesDone();\n      " + directiveNotifications + "\n    ";
  };
  ChangeDetectorJITGenerator.prototype._genLocalDefinitions = function() {
    return this._localNames.map(function(n) {
      return ("var " + n + ";");
    }).join("\n");
  };
  ChangeDetectorJITGenerator.prototype._genChangeDefinitions = function() {
    return this._changeNames.map(function(n) {
      return ("var " + n + " = false;");
    }).join("\n");
  };
  ChangeDetectorJITGenerator.prototype._genRecord = function(r) {
    var rec;
    if (r.isLifeCycleRecord()) {
      rec = this._genDirectiveLifecycle(r);
    } else if (r.isPipeRecord()) {
      rec = this._genPipeCheck(r);
    } else {
      rec = this._genReferenceCheck(r);
    }
    return "" + rec + this._maybeGenLastInDirective(r);
  };
  ChangeDetectorJITGenerator.prototype._genDirectiveLifecycle = function(r) {
    if (r.name === "onCheck") {
      return this._genOnCheck(r);
    } else if (r.name === "onInit") {
      return this._genOnInit(r);
    } else if (r.name === "onChange") {
      return this._genOnChange(r);
    } else {
      throw new lang_1.BaseException("Unknown lifecycle event '" + r.name + "'");
    }
  };
  ChangeDetectorJITGenerator.prototype._genPipeCheck = function(r) {
    var _this = this;
    var context = this._localNames[r.contextIndex];
    var argString = r.args.map(function(arg) {
      return _this._localNames[arg];
    }).join(", ");
    var oldValue = this._fieldNames[r.selfIndex];
    var newValue = this._localNames[r.selfIndex];
    var change = this._changeNames[r.selfIndex];
    var pipe = this._pipeNames[r.selfIndex];
    var cdRef = "this.ref";
    var protoIndex = r.selfIndex - 1;
    var pipeType = r.name;
    return "\n      " + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\n      if (" + pipe + " === " + UTIL + ".uninitialized()) {\n        " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + cdRef + ");\n      } else if (!" + pipe + ".supports(" + context + ")) {\n        " + pipe + ".onDestroy();\n        " + pipe + " = " + PIPE_REGISTRY_ACCESSOR + ".get('" + pipeType + "', " + context + ", " + cdRef + ");\n      }\n\n      " + newValue + " = " + pipe + ".transform(" + context + ", [" + argString + "]);\n      if (" + oldValue + " !== " + newValue + ") {\n        " + newValue + " = " + UTIL + ".unwrapValue(" + newValue + ");\n        " + change + " = true;\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ";
  };
  ChangeDetectorJITGenerator.prototype._genReferenceCheck = function(r) {
    var _this = this;
    var oldValue = this._fieldNames[r.selfIndex];
    var newValue = this._localNames[r.selfIndex];
    var protoIndex = r.selfIndex - 1;
    var check = "\n      " + CURRENT_PROTO + " = " + PROTOS_ACCESSOR + "[" + protoIndex + "];\n      " + this._genUpdateCurrentValue(r) + "\n      if (" + newValue + " !== " + oldValue + ") {\n        " + this._changeNames[r.selfIndex] + " = true;\n        " + this._genUpdateDirectiveOrElement(r) + "\n        " + this._genAddToChanges(r) + "\n        " + oldValue + " = " + newValue + ";\n      }\n    ";
    if (r.isPureFunction()) {
      var condition = r.args.map(function(a) {
        return _this._changeNames[a];
      }).join(" || ");
      return "if (" + condition + ") { " + check + " } else { " + newValue + " = " + oldValue + "; }";
    } else {
      return check;
    }
  };
  ChangeDetectorJITGenerator.prototype._genUpdateCurrentValue = function(r) {
    var _this = this;
    var context = (r.contextIndex == -1) ? this._genGetDirective(r.directiveIndex) : this._localNames[r.contextIndex];
    var newValue = this._localNames[r.selfIndex];
    var argString = r.args.map(function(arg) {
      return _this._localNames[arg];
    }).join(", ");
    var rhs;
    switch (r.mode) {
      case proto_record_1.RecordType.SELF:
        rhs = context;
        break;
      case proto_record_1.RecordType.CONST:
        rhs = JSON.stringify(r.funcOrValue);
        break;
      case proto_record_1.RecordType.PROPERTY:
        rhs = context + "." + r.name;
        break;
      case proto_record_1.RecordType.SAFE_PROPERTY:
        rhs = UTIL + ".isValueBlank(" + context + ") ? null : " + context + "." + r.name;
        break;
      case proto_record_1.RecordType.LOCAL:
        rhs = LOCALS_ACCESSOR + ".get('" + r.name + "')";
        break;
      case proto_record_1.RecordType.INVOKE_METHOD:
        rhs = context + "." + r.name + "(" + argString + ")";
        break;
      case proto_record_1.RecordType.SAFE_INVOKE_METHOD:
        rhs = UTIL + ".isValueBlank(" + context + ") ? null : " + context + "." + r.name + "(" + argString + ")";
        break;
      case proto_record_1.RecordType.INVOKE_CLOSURE:
        rhs = context + "(" + argString + ")";
        break;
      case proto_record_1.RecordType.PRIMITIVE_OP:
        rhs = UTIL + "." + r.name + "(" + argString + ")";
        break;
      case proto_record_1.RecordType.INTERPOLATE:
        rhs = this._genInterpolation(r);
        break;
      case proto_record_1.RecordType.KEYED_ACCESS:
        rhs = context + "[" + this._localNames[r.args[0]] + "]";
        break;
      default:
        throw new lang_1.BaseException("Unknown operation " + r.mode);
    }
    return newValue + " = " + rhs;
  };
  ChangeDetectorJITGenerator.prototype._genInterpolation = function(r) {
    var res = "";
    for (var i = 0; i < r.args.length; ++i) {
      res += JSON.stringify(r.fixedArgs[i]);
      res += " + ";
      res += this._localNames[r.args[i]];
      res += " + ";
    }
    res += JSON.stringify(r.fixedArgs[r.args.length]);
    return res;
  };
  ChangeDetectorJITGenerator.prototype._genUpdateDirectiveOrElement = function(r) {
    if (!r.lastInBinding)
      return "";
    var newValue = this._localNames[r.selfIndex];
    var oldValue = this._fieldNames[r.selfIndex];
    var br = r.bindingRecord;
    if (br.isDirective()) {
      var directiveProperty = this._genGetDirective(br.directiveRecord.directiveIndex) + "." + br.propertyName;
      return "\n        " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n        " + directiveProperty + " = " + newValue + ";\n        " + IS_CHANGED_LOCAL + " = true;\n      ";
    } else {
      return "\n        " + this._genThrowOnChangeCheck(oldValue, newValue) + "\n        " + DISPATCHER_ACCESSOR + ".notifyOnBinding(" + CURRENT_PROTO + ".bindingRecord, " + newValue + ");\n      ";
    }
  };
  ChangeDetectorJITGenerator.prototype._genThrowOnChangeCheck = function(oldValue, newValue) {
    return "\n      if(throwOnChange) {\n        " + UTIL + ".throwOnChange(" + CURRENT_PROTO + ", " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n      }\n      ";
  };
  ChangeDetectorJITGenerator.prototype._genAddToChanges = function(r) {
    var newValue = this._localNames[r.selfIndex];
    var oldValue = this._fieldNames[r.selfIndex];
    if (!r.bindingRecord.callOnChange())
      return "";
    return "\n      " + CHANGES_LOCAL + " = " + UTIL + ".addChange(\n          " + CHANGES_LOCAL + ", " + CURRENT_PROTO + ".bindingRecord.propertyName,\n          " + UTIL + ".simpleChange(" + oldValue + ", " + newValue + "));\n    ";
  };
  ChangeDetectorJITGenerator.prototype._maybeGenLastInDirective = function(r) {
    if (!r.lastInDirective)
      return "";
    return "\n      " + CHANGES_LOCAL + " = null;\n      " + this._genNotifyOnPushDetectors(r) + "\n      " + IS_CHANGED_LOCAL + " = false;\n    ";
  };
  ChangeDetectorJITGenerator.prototype._genOnCheck = function(r) {
    var br = r.bindingRecord;
    return "if (!throwOnChange) " + this._genGetDirective(br.directiveRecord.directiveIndex) + ".onCheck();";
  };
  ChangeDetectorJITGenerator.prototype._genOnInit = function(r) {
    var br = r.bindingRecord;
    return "if (!throwOnChange && !" + ALREADY_CHECKED_ACCESSOR + ") " + this._genGetDirective(br.directiveRecord.directiveIndex) + ".onInit();";
  };
  ChangeDetectorJITGenerator.prototype._genOnChange = function(r) {
    var br = r.bindingRecord;
    return "if (!throwOnChange && " + CHANGES_LOCAL + ") " + this._genGetDirective(br.directiveRecord.directiveIndex) + ".onChange(" + CHANGES_LOCAL + ");";
  };
  ChangeDetectorJITGenerator.prototype._genNotifyOnPushDetectors = function(r) {
    var br = r.bindingRecord;
    if (!r.lastInDirective || !br.isOnPushChangeDetection())
      return "";
    var retVal = "\n      if(" + IS_CHANGED_LOCAL + ") {\n        " + this._genGetDetector(br.directiveRecord.directiveIndex) + ".markAsCheckOnce();\n      }\n    ";
    return retVal;
  };
  return ChangeDetectorJITGenerator;
})();
exports.ChangeDetectorJITGenerator = ChangeDetectorJITGenerator;
function _sanitizeName(s) {
  return s.replace(new RegExp("\\W", "g"), '');
}
exports.__esModule = true;
