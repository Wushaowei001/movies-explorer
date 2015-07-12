import { ControlContainer } from './control_container';
import { NgControl } from './ng_control';
import { NgValidator } from './validators';
import { Control } from '../model';
import { Renderer, ElementRef, QueryList } from 'angular2/angular2';
export declare function controlPath(name: string, parent: ControlContainer): string[];
export declare function setUpControl(c: Control, dir: NgControl): void;
export declare function composeNgValidator(ngValidators: QueryList<NgValidator>): Function;
export declare function setProperty(renderer: Renderer, elementRef: ElementRef, propName: string, propValue: any): void;
