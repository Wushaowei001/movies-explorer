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
import { isPresent } from 'angular2/src/facade/lang';
import { Headers } from './headers';
import { RequestModesOpts, RequestMethods } from './enums';
import { Injectable } from 'angular2/di';
/**
 * Creates a request options object similar to the `RequestInit` description
 * in the [Fetch
 * Spec](https://fetch.spec.whatwg.org/#requestinit) to be optionally provided when instantiating a
 * {@link Request}.
 *
 * All values are null by default.
 */
export class RequestOptions {
    constructor({ method, headers, body, mode, credentials, cache, url } = {}) {
        this.method = isPresent(method) ? method : null;
        this.headers = isPresent(headers) ? headers : null;
        this.body = isPresent(body) ? body : null;
        this.mode = isPresent(mode) ? mode : null;
        this.credentials = isPresent(credentials) ? credentials : null;
        this.cache = isPresent(cache) ? cache : null;
        this.url = isPresent(url) ? url : null;
    }
    /**
     * Creates a copy of the `RequestOptions` instance, using the optional input as values to override
     * existing values.
     */
    merge(options) {
        return new RequestOptions({
            method: isPresent(options) && isPresent(options.method) ? options.method : this.method,
            headers: isPresent(options) && isPresent(options.headers) ? options.headers : this.headers,
            body: isPresent(options) && isPresent(options.body) ? options.body : this.body,
            mode: isPresent(options) && isPresent(options.mode) ? options.mode : this.mode,
            credentials: isPresent(options) && isPresent(options.credentials) ? options.credentials :
                this.credentials,
            cache: isPresent(options) && isPresent(options.cache) ? options.cache : this.cache,
            url: isPresent(options) && isPresent(options.url) ? options.url : this.url
        });
    }
}
/**
 * Injectable version of {@link RequestOptions}, with overridable default values.
 *
 * #Example
 *
 * ```
 * import {Http, BaseRequestOptions, Request} from 'angular2/http';
 * ...
 * class MyComponent {
 *   constructor(baseRequestOptions:BaseRequestOptions, http:Http) {
 *     var options = baseRequestOptions.merge({body: 'foobar', url: 'https://foo'});
 *     var request = new Request(options);
 *     http.request(request).subscribe(res => this.bars = res.json());
 *   }
 * }
 *
 * ```
 */
export let BaseRequestOptions = class extends RequestOptions {
    constructor() {
        super({ method: RequestMethods.GET, headers: new Headers(), mode: RequestModesOpts.Cors });
    }
};
BaseRequestOptions = __decorate([
    Injectable(), 
    __metadata('design:paramtypes', [])
], BaseRequestOptions);
//# sourceMappingURL=base_request_options.js.map