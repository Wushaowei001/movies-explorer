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
import { Injectable } from 'angular2/di';
import { ExceptionHandler } from 'angular2/src/core/exception_handler';
import { isPresent, BaseException } from 'angular2/src/facade/lang';
/**
 * Provides access to explicitly trigger change detection in an application.
 *
 * By default, `Zone` triggers change detection in Angular on each virtual machine (VM) turn. When
 * testing, or in some
 * limited application use cases, a developer can also trigger change detection with the
 * `lifecycle.tick()` method.
 *
 * Each Angular application has a single `LifeCycle` instance.
 *
 * # Example
 *
 * This is a contrived example, since the bootstrap automatically runs inside of the `Zone`, which
 * invokes
 * `lifecycle.tick()` on your behalf.
 *
 * ```javascript
 * bootstrap(MyApp).then((ref:ComponentRef) => {
 *   var lifeCycle = ref.injector.get(LifeCycle);
 *   var myApp = ref.instance;
 *
 *   ref.doSomething();
 *   lifecycle.tick();
 * });
 * ```
 * @exportedAs angular2/change_detection
 */
export let LifeCycle = class {
    constructor(exceptionHandler, changeDetector = null, enforceNoNewChanges = false) {
        this._runningTick = false;
        this._errorHandler = (exception, stackTrace) => {
            exceptionHandler.call(exception, stackTrace);
            throw exception;
        };
        this._changeDetector =
            changeDetector; // may be null when instantiated from application bootstrap
        this._enforceNoNewChanges = enforceNoNewChanges;
    }
    /**
     * @private
     */
    registerWith(zone, changeDetector = null) {
        if (isPresent(changeDetector)) {
            this._changeDetector = changeDetector;
        }
        zone.initCallbacks({ onErrorHandler: this._errorHandler, onTurnDone: () => this.tick() });
    }
    /**
     *  Invoke this method to explicitly process change detection and its side-effects.
     *
     *  In development mode, `tick()` also performs a second change detection cycle to ensure that no
     * further
     *  changes are detected. If additional changes are picked up during this second cycle, bindings
     * in
     * the app have
     *  side-effects that cannot be resolved in a single change detection pass. In this case, Angular
     * throws an error,
     *  since an Angular application can only have one change detection pass during which all change
     * detection must
     *  complete.
     *
     */
    tick() {
        if (this._runningTick) {
            throw new BaseException("LifeCycle.tick is called recursively");
        }
        try {
            this._runningTick = true;
            this._changeDetector.detectChanges();
            if (this._enforceNoNewChanges) {
                this._changeDetector.checkNoChanges();
            }
        }
        finally {
            this._runningTick = false;
        }
    }
};
LifeCycle = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [ExceptionHandler, Object, Boolean])
], LifeCycle);
//# sourceMappingURL=life_cycle.js.map