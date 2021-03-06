import { Instruction } from './instruction';
/**
 * Responsible for performing each step of navigation.
 * "Steps" are conceptually similar to "middleware"
 */
export declare class Pipeline {
    steps: List<Function>;
    constructor();
    process(instruction: Instruction): Promise<any>;
}
