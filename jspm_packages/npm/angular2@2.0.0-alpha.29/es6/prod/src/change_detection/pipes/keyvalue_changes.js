/* */ 
"format cjs";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { MapWrapper, StringMapWrapper } from 'angular2/src/facade/collection';
import { stringify, looseIdentical, isJsObject, CONST } from 'angular2/src/facade/lang';
import { WrappedValue, BasePipe } from './pipe';
/**
 * @exportedAs angular2/pipes
 */
export let KeyValueChangesFactory = class {
    supports(obj) { return KeyValueChanges.supportsObj(obj); }
    create(cdRef) { return new KeyValueChanges(); }
};
KeyValueChangesFactory = __decorate([
    CONST(), 
    __metadata('design:paramtypes', [])
], KeyValueChangesFactory);
/**
 * @exportedAs angular2/pipes
 */
export class KeyValueChanges extends BasePipe {
    constructor(...args) {
        super(...args);
        this._records = new Map();
        this._mapHead = null;
        this._previousMapHead = null;
        this._changesHead = null;
        this._changesTail = null;
        this._additionsHead = null;
        this._additionsTail = null;
        this._removalsHead = null;
        this._removalsTail = null;
    }
    static supportsObj(obj) { return obj instanceof Map || isJsObject(obj); }
    supports(obj) { return KeyValueChanges.supportsObj(obj); }
    transform(map, args = null) {
        if (this.check(map)) {
            return WrappedValue.wrap(this);
        }
        else {
            return null;
        }
    }
    get isDirty() {
        return this._additionsHead !== null || this._changesHead !== null ||
            this._removalsHead !== null;
    }
    forEachItem(fn) {
        var record;
        for (record = this._mapHead; record !== null; record = record._next) {
            fn(record);
        }
    }
    forEachPreviousItem(fn) {
        var record;
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            fn(record);
        }
    }
    forEachChangedItem(fn) {
        var record;
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            fn(record);
        }
    }
    forEachAddedItem(fn) {
        var record;
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            fn(record);
        }
    }
    forEachRemovedItem(fn) {
        var record;
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            fn(record);
        }
    }
    check(map) {
        this._reset();
        var records = this._records;
        var oldSeqRecord = this._mapHead;
        var lastOldSeqRecord = null;
        var lastNewSeqRecord = null;
        var seqChanged = false;
        this._forEach(map, (value, key) => {
            var newSeqRecord;
            if (oldSeqRecord !== null && key === oldSeqRecord.key) {
                newSeqRecord = oldSeqRecord;
                if (!looseIdentical(value, oldSeqRecord.currentValue)) {
                    oldSeqRecord.previousValue = oldSeqRecord.currentValue;
                    oldSeqRecord.currentValue = value;
                    this._addToChanges(oldSeqRecord);
                }
            }
            else {
                seqChanged = true;
                if (oldSeqRecord !== null) {
                    oldSeqRecord._next = null;
                    this._removeFromSeq(lastOldSeqRecord, oldSeqRecord);
                    this._addToRemovals(oldSeqRecord);
                }
                if (records.has(key)) {
                    newSeqRecord = records.get(key);
                }
                else {
                    newSeqRecord = new KVChangeRecord(key);
                    records.set(key, newSeqRecord);
                    newSeqRecord.currentValue = value;
                    this._addToAdditions(newSeqRecord);
                }
            }
            if (seqChanged) {
                if (this._isInRemovals(newSeqRecord)) {
                    this._removeFromRemovals(newSeqRecord);
                }
                if (lastNewSeqRecord == null) {
                    this._mapHead = newSeqRecord;
                }
                else {
                    lastNewSeqRecord._next = newSeqRecord;
                }
            }
            lastOldSeqRecord = oldSeqRecord;
            lastNewSeqRecord = newSeqRecord;
            oldSeqRecord = oldSeqRecord === null ? null : oldSeqRecord._next;
        });
        this._truncate(lastOldSeqRecord, oldSeqRecord);
        return this.isDirty;
    }
    _reset() {
        if (this.isDirty) {
            var record;
            // Record the state of the mapping
            for (record = this._previousMapHead = this._mapHead; record !== null; record = record._next) {
                record._nextPrevious = record._next;
            }
            for (record = this._changesHead; record !== null; record = record._nextChanged) {
                record.previousValue = record.currentValue;
            }
            for (record = this._additionsHead; record != null; record = record._nextAdded) {
                record.previousValue = record.currentValue;
            }
            // todo(vicb) once assert is supported
            // assert(() {
            //  var r = _changesHead;
            //  while (r != null) {
            //    var nextRecord = r._nextChanged;
            //    r._nextChanged = null;
            //    r = nextRecord;
            //  }
            //
            //  r = _additionsHead;
            //  while (r != null) {
            //    var nextRecord = r._nextAdded;
            //    r._nextAdded = null;
            //    r = nextRecord;
            //  }
            //
            //  r = _removalsHead;
            //  while (r != null) {
            //    var nextRecord = r._nextRemoved;
            //    r._nextRemoved = null;
            //    r = nextRecord;
            //  }
            //
            //  return true;
            //});
            this._changesHead = this._changesTail = null;
            this._additionsHead = this._additionsTail = null;
            this._removalsHead = this._removalsTail = null;
        }
    }
    _truncate(lastRecord, record) {
        while (record !== null) {
            if (lastRecord === null) {
                this._mapHead = null;
            }
            else {
                lastRecord._next = null;
            }
            var nextRecord = record._next;
            // todo(vicb) assert
            // assert((() {
            //  record._next = null;
            //  return true;
            //}));
            this._addToRemovals(record);
            lastRecord = record;
            record = nextRecord;
        }
        for (var rec = this._removalsHead; rec !== null; rec = rec._nextRemoved) {
            rec.previousValue = rec.currentValue;
            rec.currentValue = null;
            MapWrapper.delete(this._records, rec.key);
        }
    }
    _isInRemovals(record) {
        return record === this._removalsHead || record._nextRemoved !== null ||
            record._prevRemoved !== null;
    }
    _addToRemovals(record) {
        // todo(vicb) assert
        // assert(record._next == null);
        // assert(record._nextAdded == null);
        // assert(record._nextChanged == null);
        // assert(record._nextRemoved == null);
        // assert(record._prevRemoved == null);
        if (this._removalsHead === null) {
            this._removalsHead = this._removalsTail = record;
        }
        else {
            this._removalsTail._nextRemoved = record;
            record._prevRemoved = this._removalsTail;
            this._removalsTail = record;
        }
    }
    _removeFromSeq(prev, record) {
        var next = record._next;
        if (prev === null) {
            this._mapHead = next;
        }
        else {
            prev._next = next;
        }
        // todo(vicb) assert
        // assert((() {
        //  record._next = null;
        //  return true;
        //})());
    }
    _removeFromRemovals(record) {
        // todo(vicb) assert
        // assert(record._next == null);
        // assert(record._nextAdded == null);
        // assert(record._nextChanged == null);
        var prev = record._prevRemoved;
        var next = record._nextRemoved;
        if (prev === null) {
            this._removalsHead = next;
        }
        else {
            prev._nextRemoved = next;
        }
        if (next === null) {
            this._removalsTail = prev;
        }
        else {
            next._prevRemoved = prev;
        }
        record._prevRemoved = record._nextRemoved = null;
    }
    _addToAdditions(record) {
        // todo(vicb): assert
        // assert(record._next == null);
        // assert(record._nextAdded == null);
        // assert(record._nextChanged == null);
        // assert(record._nextRemoved == null);
        // assert(record._prevRemoved == null);
        if (this._additionsHead === null) {
            this._additionsHead = this._additionsTail = record;
        }
        else {
            this._additionsTail._nextAdded = record;
            this._additionsTail = record;
        }
    }
    _addToChanges(record) {
        // todo(vicb) assert
        // assert(record._nextAdded == null);
        // assert(record._nextChanged == null);
        // assert(record._nextRemoved == null);
        // assert(record._prevRemoved == null);
        if (this._changesHead === null) {
            this._changesHead = this._changesTail = record;
        }
        else {
            this._changesTail._nextChanged = record;
            this._changesTail = record;
        }
    }
    toString() {
        var items = [];
        var previous = [];
        var changes = [];
        var additions = [];
        var removals = [];
        var record;
        for (record = this._mapHead; record !== null; record = record._next) {
            items.push(stringify(record));
        }
        for (record = this._previousMapHead; record !== null; record = record._nextPrevious) {
            previous.push(stringify(record));
        }
        for (record = this._changesHead; record !== null; record = record._nextChanged) {
            changes.push(stringify(record));
        }
        for (record = this._additionsHead; record !== null; record = record._nextAdded) {
            additions.push(stringify(record));
        }
        for (record = this._removalsHead; record !== null; record = record._nextRemoved) {
            removals.push(stringify(record));
        }
        return "map: " + items.join(', ') + "\n" + "previous: " + previous.join(', ') + "\n" +
            "additions: " + additions.join(', ') + "\n" + "changes: " + changes.join(', ') + "\n" +
            "removals: " + removals.join(', ') + "\n";
    }
    _forEach(obj, fn) {
        if (obj instanceof Map) {
            MapWrapper.forEach(obj, fn);
        }
        else {
            StringMapWrapper.forEach(obj, fn);
        }
    }
}
/**
 * @exportedAs angular2/pipes
 */
export class KVChangeRecord {
    constructor(key) {
        this.key = key;
        this.previousValue = null;
        this.currentValue = null;
        this._nextPrevious = null;
        this._next = null;
        this._nextAdded = null;
        this._nextRemoved = null;
        this._prevRemoved = null;
        this._nextChanged = null;
    }
    toString() {
        return looseIdentical(this.previousValue, this.currentValue) ?
            stringify(this.key) :
            (stringify(this.key) + '[' + stringify(this.previousValue) + '->' +
                stringify(this.currentValue) + ']');
    }
}
//# sourceMappingURL=keyvalue_changes.js.map