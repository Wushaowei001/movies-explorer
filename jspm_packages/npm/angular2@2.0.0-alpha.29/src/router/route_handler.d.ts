import { Type } from 'angular2/src/facade/lang';
export interface RouteHandler {
    componentType: Type;
    resolveComponentType(): Promise<any>;
}
export declare var __esModule: boolean;
