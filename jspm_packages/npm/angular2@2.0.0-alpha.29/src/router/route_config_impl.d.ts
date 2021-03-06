/**
 * You use the RouteConfig annotation to add routes to a component.
 *
 * Supported keys:
 * - `path` (required)
 * - `component`,  `redirectTo` (requires exactly one of these)
 * - `as` (optional)
 */
export declare class RouteConfig {
    configs: List<Map<any, any>>;
    constructor(configs: List<Map<any, any>>);
}
export declare var __esModule: boolean;
