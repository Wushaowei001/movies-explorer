import { CompileElement } from './compile_element';
import { CompileControl } from './compile_control';
import { CompileStep } from './compile_step';
import { ViewType } from '../../api';
/**
 * CompilePipeline for executing CompileSteps recursively for
 * all elements in a template.
 */
export declare class CompilePipeline {
    _control: CompileControl;
    constructor(steps: List<CompileStep>);
    process(rootElement: any, protoViewType?: ViewType, compilationCtxtDescription?: string): List<CompileElement>;
    _process(results: any, parent: CompileElement, current: CompileElement, compilationCtxtDescription?: string): void;
}
export declare var __esModule: boolean;
