/* */ 
"format cjs";
import { StringWrapper, RegExpWrapper } from 'angular2/src/facade/lang';
export const NG_BINDING_CLASS_SELECTOR = '.ng-binding';
export const NG_BINDING_CLASS = 'ng-binding';
export const EVENT_TARGET_SEPARATOR = ':';
var CAMEL_CASE_REGEXP = RegExpWrapper.create('([A-Z])');
var DASH_CASE_REGEXP = RegExpWrapper.create('-([a-z])');
export function camelCaseToDashCase(input) {
    return StringWrapper.replaceAllMapped(input, CAMEL_CASE_REGEXP, (m) => { return '-' + m[1].toLowerCase(); });
}
export function dashCaseToCamelCase(input) {
    return StringWrapper.replaceAllMapped(input, DASH_CASE_REGEXP, (m) => { return m[1].toUpperCase(); });
}
//# sourceMappingURL=util.js.map