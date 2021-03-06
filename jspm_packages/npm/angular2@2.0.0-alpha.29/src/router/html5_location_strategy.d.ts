import { LocationStrategy } from './location_strategy';
export declare class HTML5LocationStrategy extends LocationStrategy {
    private _location;
    private _history;
    private _baseHref;
    constructor();
    onPopState(fn: EventListener): void;
    getBaseHref(): string;
    path(): string;
    pushState(state: any, title: string, url: string): void;
    forward(): void;
    back(): void;
}
export declare var __esModule: boolean;
