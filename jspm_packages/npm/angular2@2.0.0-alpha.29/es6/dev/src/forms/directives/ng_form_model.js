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
import { CONST_EXPR } from 'angular2/src/facade/lang';
import { ListWrapper } from 'angular2/src/facade/collection';
import { ObservableWrapper, EventEmitter } from 'angular2/src/facade/async';
import { Directive, onChange } from 'angular2/angular2';
import { forwardRef, Binding } from 'angular2/di';
import { ControlContainer } from './control_container';
import { setUpControl } from './shared';
const formDirectiveBinding = CONST_EXPR(new Binding(ControlContainer, { toAlias: forwardRef(() => NgFormModel) }));
/**
 * Binds an existing control group to a DOM element.
 *
 * # Example
 *
 * In this example, we bind the control group to the form element, and we bind the login and
 * password controls to the
 * login and password elements.
 *
 *  ```
 * @Component({selector: "login-comp"})
 * @View({
 *      directives: [formDirectives],
 *      template: "<form [ng-form-model]='loginForm'>" +
 *              "Login <input type='text' ng-control='login'>" +
 *              "Password <input type='password' ng-control='password'>" +
 *              "<button (click)="onLogin()">Login</button>" +
 *              "</form>"
 *      })
 * class LoginComp {
 *  loginForm:ControlGroup;
 *
 *  constructor() {
 *    this.loginForm = new ControlGroup({
 *      login: new Control(""),
 *      password: new Control("")
 *    });
 *  }
 *
 *  onLogin() {
 *    // this.loginForm.value
 *  }
 * }
 *
 *  ```
 *
 * We can also use ng-model to bind a domain model to the form.
 *
 *  ```
 * @Component({selector: "login-comp"})
 * @View({
 *      directives: [formDirectives],
 *      template: "<form [ng-form-model]='loginForm'>" +
 *              "Login <input type='text' ng-control='login' [(ng-model)]='login'>" +
 *              "Password <input type='password' ng-control='password' [(ng-model)]='password'>" +
 *              "<button (click)="onLogin()">Login</button>" +
 *              "</form>"
 *      })
 * class LoginComp {
 *  credentials:{login:string, password:string}
 *  loginForm:ControlGroup;
 *
 *  constructor() {
 *    this.loginForm = new ControlGroup({
 *      login: new Control(""),
 *      password: new Control("")
 *    });
 *  }
 *
 *  onLogin() {
 *    // this.credentials.login === 'some login'
 *    // this.credentials.password === 'some password'
 *  }
 * }
 *  ```
 *
 * @exportedAs angular2/forms
 */
export let NgFormModel = class extends ControlContainer {
    constructor(...args) {
        super(...args);
        this.form = null;
        this.directives = [];
        this.ngSubmit = new EventEmitter();
    }
    onChange(_) { this._updateDomValue(); }
    get formDirective() { return this; }
    get path() { return []; }
    addControl(dir) {
        var c = this.form.find(dir.path);
        setUpControl(c, dir);
        c.updateValidity();
        this.directives.push(dir);
    }
    getControl(dir) { return this.form.find(dir.path); }
    removeControl(dir) { ListWrapper.remove(this.directives, dir); }
    addControlGroup(dir) { }
    removeControlGroup(dir) { }
    updateModel(dir, value) {
        var c = this.form.find(dir.path);
        c.updateValue(value);
    }
    onSubmit() {
        ObservableWrapper.callNext(this.ngSubmit, null);
        return false;
    }
    _updateDomValue() {
        ListWrapper.forEach(this.directives, dir => {
            var c = this.form.find(dir.path);
            dir.valueAccessor.writeValue(c.value);
        });
    }
};
NgFormModel = __decorate([
    Directive({
        selector: '[ng-form-model]',
        hostInjector: [formDirectiveBinding],
        properties: ['form: ng-form-model'],
        lifecycle: [onChange],
        host: {
            '(submit)': 'onSubmit()',
        },
        events: ['ngSubmit'],
        exportAs: 'form'
    }), 
    __metadata('design:paramtypes', [])
], NgFormModel);
//# sourceMappingURL=ng_form_model.js.map