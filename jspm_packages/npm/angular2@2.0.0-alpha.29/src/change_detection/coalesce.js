/* */ 
'use strict';
var lang_1 = require("../facade/lang");
var collection_1 = require("../facade/collection");
var proto_record_1 = require("./proto_record");
function coalesce(records) {
  var res = [];
  var indexMap = new collection_1.Map();
  for (var i = 0; i < records.length; ++i) {
    var r = records[i];
    var record = _replaceIndices(r, res.length + 1, indexMap);
    var matchingRecord = _findMatching(record, res);
    if (lang_1.isPresent(matchingRecord) && record.lastInBinding) {
      res.push(_selfRecord(record, matchingRecord.selfIndex, res.length + 1));
      indexMap.set(r.selfIndex, matchingRecord.selfIndex);
    } else if (lang_1.isPresent(matchingRecord) && !record.lastInBinding) {
      indexMap.set(r.selfIndex, matchingRecord.selfIndex);
    } else {
      res.push(record);
      indexMap.set(r.selfIndex, record.selfIndex);
    }
  }
  return res;
}
exports.coalesce = coalesce;
function _selfRecord(r, contextIndex, selfIndex) {
  return new proto_record_1.ProtoRecord(proto_record_1.RecordType.SELF, "self", null, [], r.fixedArgs, contextIndex, r.directiveIndex, selfIndex, r.bindingRecord, r.expressionAsString, r.lastInBinding, r.lastInDirective);
}
function _findMatching(r, rs) {
  return collection_1.ListWrapper.find(rs, function(rr) {
    return rr.mode !== proto_record_1.RecordType.DIRECTIVE_LIFECYCLE && rr.mode === r.mode && rr.funcOrValue === r.funcOrValue && rr.contextIndex === r.contextIndex && rr.name === r.name && collection_1.ListWrapper.equals(rr.args, r.args);
  });
}
function _replaceIndices(r, selfIndex, indexMap) {
  var args = collection_1.ListWrapper.map(r.args, function(a) {
    return _map(indexMap, a);
  });
  var contextIndex = _map(indexMap, r.contextIndex);
  return new proto_record_1.ProtoRecord(r.mode, r.name, r.funcOrValue, args, r.fixedArgs, contextIndex, r.directiveIndex, selfIndex, r.bindingRecord, r.expressionAsString, r.lastInBinding, r.lastInDirective);
}
function _map(indexMap, value) {
  var r = indexMap.get(value);
  return lang_1.isPresent(r) ? r : value;
}
exports.__esModule = true;
