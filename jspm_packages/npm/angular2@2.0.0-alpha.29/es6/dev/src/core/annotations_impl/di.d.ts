import { Type } from 'angular2/src/facade/lang';
import { DependencyAnnotation } from 'angular2/src/di/annotations_impl';
/**
 * Specifies that a constant attribute value should be injected.
 *
 * The directive can inject constant string literals of host element attributes.
 *
 * ## Example
 *
 * Suppose we have an `<input>` element and want to know its `type`.
 *
 * ```html
 * <input type="text">
 * ```
 *
 * A decorator can inject string literal `text` like so:
 *
 * ```javascript
 * @Directive({
 *   selector: `input'
 * })
 * class InputDirective {
 *   constructor(@Attribute('type') type) {
 *     // type would be `text` in this example
 *   }
 * }
 * ```
 *
 * @exportedAs angular2/annotations
 */
export declare class Attribute extends DependencyAnnotation {
    attributeName: string;
    constructor(attributeName: string);
    token: Attribute;
    toString(): string;
}
/**
 * Specifies that a {@link QueryList} should be injected.
 *
 * See {@link QueryList} for usage and example.
 *
 * @exportedAs angular2/annotations
 */
export declare class Query extends DependencyAnnotation {
    private _selector;
    descendants: boolean;
    constructor(_selector: Type | string, {descendants}?: {
        descendants?: boolean;
    });
    selector: any;
    isVarBindingQuery: boolean;
    varBindings: List<string>;
    toString(): string;
}
