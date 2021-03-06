import { ChangeDetectorRef } from '../change_detector_ref';
import { BasePipe, Pipe, PipeFactory } from './pipe';
/**
 * @exportedAs angular2/pipes
 */
export declare class KeyValueChangesFactory implements PipeFactory {
    supports(obj: any): boolean;
    create(cdRef: ChangeDetectorRef): Pipe;
}
/**
 * @exportedAs angular2/pipes
 */
export declare class KeyValueChanges extends BasePipe {
    private _records;
    private _mapHead;
    private _previousMapHead;
    private _changesHead;
    private _changesTail;
    private _additionsHead;
    private _additionsTail;
    private _removalsHead;
    private _removalsTail;
    static supportsObj(obj: any): boolean;
    supports(obj: any): boolean;
    transform(map: any, args?: List<any>): any;
    isDirty: boolean;
    forEachItem(fn: Function): void;
    forEachPreviousItem(fn: Function): void;
    forEachChangedItem(fn: Function): void;
    forEachAddedItem(fn: Function): void;
    forEachRemovedItem(fn: Function): void;
    check(map: any): boolean;
    _reset(): void;
    _truncate(lastRecord: KVChangeRecord, record: KVChangeRecord): void;
    _isInRemovals(record: KVChangeRecord): boolean;
    _addToRemovals(record: KVChangeRecord): void;
    _removeFromSeq(prev: KVChangeRecord, record: KVChangeRecord): void;
    _removeFromRemovals(record: KVChangeRecord): void;
    _addToAdditions(record: KVChangeRecord): void;
    _addToChanges(record: KVChangeRecord): void;
    toString(): string;
    _forEach(obj: any, fn: Function): void;
}
/**
 * @exportedAs angular2/pipes
 */
export declare class KVChangeRecord {
    key: any;
    previousValue: any;
    currentValue: any;
    _nextPrevious: KVChangeRecord;
    _next: KVChangeRecord;
    _nextAdded: KVChangeRecord;
    _nextRemoved: KVChangeRecord;
    _prevRemoved: KVChangeRecord;
    _nextChanged: KVChangeRecord;
    constructor(key: any);
    toString(): string;
}
