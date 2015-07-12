import { ViewContainerRef, ProtoViewRef } from 'angular2/core';
export declare class SwitchView {
    _viewContainerRef: ViewContainerRef;
    _protoViewRef: ProtoViewRef;
    constructor(viewContainerRef: ViewContainerRef, protoViewRef: ProtoViewRef);
    create(): void;
    destroy(): void;
}
/**
 * The `NgSwitch` directive is used to conditionally swap DOM structure on your template based on a
 * scope expression.
 * Elements within `NgSwitch` but without `NgSwitchWhen` or `NgSwitchDefault` directives will be
 * preserved at the location as specified in the template.
 *
 * `NgSwitch` simply chooses nested elements and makes them visible based on which element matches
 * the value obtained from the evaluated expression. In other words, you define a container element
 * (where you place the directive), place an expression on the **`[ng-switch]="..."` attribute**),
 * define any inner elements inside of the directive and place a `[ng-switch-when]` attribute per
 * element.
 * The when attribute is used to inform NgSwitch which element to display when the expression is
 * evaluated. If a matching expression is not found via a when attribute then an element with the
 * default attribute is displayed.
 *
 * # Example:
 *
 * ```
 * <ANY [ng-switch]="expression">
 *   <template [ng-switch-when]="whenExpression1">...</template>
 *   <template [ng-switch-when]="whenExpression1">...</template>
 *   <template ng-switch-default>...</template>
 * </ANY>
 * ```
 *
 * @exportedAs angular2/directives
 */
export declare class NgSwitch {
    _switchValue: any;
    _useDefault: boolean;
    _valueViews: Map<any, List<SwitchView>>;
    _activeViews: List<SwitchView>;
    constructor();
    ngSwitch: any;
    _onWhenValueChanged(oldWhen: any, newWhen: any, view: SwitchView): void;
    _emptyAllActiveViews(): void;
    _activateViews(views: List<SwitchView>): void;
    _registerView(value: any, view: SwitchView): void;
    _deregisterView(value: any, view: SwitchView): void;
}
/**
 * Defines a case statement as an expression.
 *
 * If multiple `NgSwitchWhen` match the `NgSwitch` value, all of them are displayed.
 *
 * Example:
 *
 * ```
 * // match against a context variable
 * <template [ng-switch-when]="contextVariable">...</template>
 *
 * // match against a constant string
 * <template ng-switch-when="stringValue">...</template>
 * ```
 *
 * @exportedAs angular2/directives
 */
export declare class NgSwitchWhen {
    _value: any;
    _switch: NgSwitch;
    _view: SwitchView;
    constructor(viewContainer: ViewContainerRef, protoViewRef: ProtoViewRef, sswitch: NgSwitch);
    onDestroy(): void;
    ngSwitchWhen: any;
}
/**
 * Defines a default case statement.
 *
 * Default case statements are displayed when no `NgSwitchWhen` match the `ng-switch` value.
 *
 * Example:
 *
 * ```
 * <template ng-switch-default>...</template>
 * ```
 *
 * @exportedAs angular2/directives
 */
export declare class NgSwitchDefault {
    constructor(viewContainer: ViewContainerRef, protoViewRef: ProtoViewRef, sswitch: NgSwitch);
}
