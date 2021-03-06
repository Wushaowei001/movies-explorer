/* */ 
"format cjs";
/**
 * @module
 * @public
 * @description
 * This module is used for handling user input, by defining and building a {@link ControlGroup} that
 * consists of
 * {@link Control} objects, and mapping them onto the DOM. {@link Control} objects can then be used
 * to read information
 * from the form DOM elements.
 *
 * This module is not included in the `angular2` module; you must import the forms module
 * explicitly.
 *
 */
export { AbstractControl, Control, ControlGroup, ControlArray } from './src/forms/model';
export { NgControlName } from './src/forms/directives/ng_control_name';
export { NgFormControl } from './src/forms/directives/ng_form_control';
export { NgModel } from './src/forms/directives/ng_model';
export { NgControl } from './src/forms/directives/ng_control';
export { NgControlGroup } from './src/forms/directives/ng_control_group';
export { NgFormModel } from './src/forms/directives/ng_form_model';
export { NgForm } from './src/forms/directives/ng_form';
export { DefaultValueAccessor } from './src/forms/directives/default_value_accessor';
export { CheckboxControlValueAccessor } from './src/forms/directives/checkbox_value_accessor';
export { SelectControlValueAccessor } from './src/forms/directives/select_control_value_accessor';
export { formDirectives } from './src/forms/directives';
export { Validators } from './src/forms/validators';
export { NgValidator, NgRequiredValidator } from './src/forms/directives/validators';
export { FormBuilder } from './src/forms/form_builder';
import { FormBuilder } from './src/forms/form_builder';
import { CONST_EXPR } from './src/facade/lang';
export const formInjectables = CONST_EXPR([FormBuilder]);
//# sourceMappingURL=forms.js.map