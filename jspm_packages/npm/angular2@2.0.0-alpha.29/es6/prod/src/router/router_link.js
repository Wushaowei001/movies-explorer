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
import { Directive } from 'angular2/src/core/annotations/decorators';
import { Router } from './router';
import { Location } from './location';
/**
 * The RouterLink directive lets you link to specific parts of your app.
 *
 * Consider the following route configuration:

 * ```
 * @RouteConfig({
 *   path: '/user', component: UserCmp, as: 'user'
 * });
 * class MyComp {}
 * ```
 *
 * When linking to this `user` route, you can write:
 *
 * ```
 * <a [router-link]="['./user']">link to user component</a>
 * ```
 *
 * RouterLink expects the value to be an array of route names, followed by the params
 * for that level of routing. For instance `['/team', {teamId: 1}, 'user', {userId: 2}]`
 * means that we want to generate a link for the `team` route with params `{teamId: 1}`,
 * and with a child route `user` with params `{userId: 2}`.
 *
 * The first route name should be prepended with either `./` or `/`.
 * If the route begins with `/`, the router will look up the route from the root of the app.
 * If the route begins with `./`, the router will instead look in the current component's
 * children for the route.
 *
 * @exportedAs angular2/router
 */
export let RouterLink = class {
    constructor(_router, _location) {
        this._router = _router;
        this._location = _location;
    }
    set routeParams(changes) {
        this._routeParams = changes;
        this._navigationHref = this._router.generate(this._routeParams);
        this.visibleHref = this._location.normalizeAbsolutely(this._navigationHref);
    }
    onClick() {
        this._router.navigate(this._navigationHref);
        return false;
    }
};
RouterLink = __decorate([
    Directive({
        selector: '[router-link]',
        properties: ['routeParams: routerLink'],
        host: { '(^click)': 'onClick()', '[attr.href]': 'visibleHref' }
    }), 
    __metadata('design:paramtypes', [Router, Location])
], RouterLink);
//# sourceMappingURL=router_link.js.map