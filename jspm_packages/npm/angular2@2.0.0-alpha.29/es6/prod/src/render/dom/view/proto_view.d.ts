import { ElementBinder } from './element_binder';
import { RenderProtoViewRef } from '../../api';
export declare function resolveInternalDomProtoView(protoViewRef: RenderProtoViewRef): DomProtoView;
export declare class DomProtoViewRef extends RenderProtoViewRef {
    _protoView: DomProtoView;
    constructor(_protoView: DomProtoView);
}
export declare class DomProtoView {
    element: any;
    elementBinders: List<ElementBinder>;
    isTemplateElement: boolean;
    rootBindingOffset: number;
    transitiveContentTagCount: number;
    boundTextNodeCount: number;
    rootNodeCount: number;
    constructor({elementBinders, element, transitiveContentTagCount, boundTextNodeCount}: {
        elementBinders: any;
        element: any;
        transitiveContentTagCount: any;
        boundTextNodeCount: any;
    });
}
