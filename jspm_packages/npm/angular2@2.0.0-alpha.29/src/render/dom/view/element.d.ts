import { ElementBinder } from './element_binder';
import { DomViewContainer } from './view_container';
import { LightDom } from '../shadow_dom/light_dom';
import { Content } from '../shadow_dom/content_tag';
export declare class DomElement {
    proto: ElementBinder;
    element: any;
    contentTag: Content;
    viewContainer: DomViewContainer;
    lightDom: LightDom;
    constructor(proto: ElementBinder, element: any, contentTag: Content);
}
export declare var __esModule: boolean;
