import { DomAdapter } from './dom_adapter';
export declare class Parse5DomAdapter extends DomAdapter {
    static makeCurrent(): void;
    hasProperty(element: any, name: string): boolean;
    setProperty(el: any, name: string, value: any): void;
    getProperty(el: any, name: string): any;
    logError(error: any): void;
    attrToPropMap: {
        'innerHtml': string;
        'readonly': string;
        'tabindex': string;
    };
    query(selector: any): void;
    querySelector(el: any, selector: string): any;
    querySelectorAll(el: any, selector: string): List<any>;
    elementMatches(node: any, selector: string, matcher?: any): boolean;
    on(el: any, evt: any, listener: any): void;
    onAndCancel(el: any, evt: any, listener: any): Function;
    dispatchEvent(el: any, evt: any): void;
    createMouseEvent(eventType: any): Event;
    createEvent(eventType: string): Event;
    preventDefault(evt: any): void;
    getInnerHTML(el: any): string;
    getOuterHTML(el: any): string;
    nodeName(node: any): string;
    nodeValue(node: any): string;
    type(node: any): string;
    content(node: any): string;
    firstChild(el: any): Node;
    nextSibling(el: any): Node;
    parentElement(el: any): Node;
    childNodes(el: any): Node[];
    childNodesAsList(el: any): List<any>;
    clearNodes(el: any): void;
    appendChild(el: any, node: any): void;
    removeChild(el: any, node: any): void;
    remove(el: any): HTMLElement;
    insertBefore(el: any, node: any): void;
    insertAllBefore(el: any, nodes: any): void;
    insertAfter(el: any, node: any): void;
    setInnerHTML(el: any, value: any): void;
    getText(el: any): string;
    setText(el: any, value: string): void;
    getValue(el: any): string;
    setValue(el: any, value: string): void;
    getChecked(el: any): boolean;
    setChecked(el: any, value: boolean): void;
    createTemplate(html: any): HTMLElement;
    createElement(tagName: any): HTMLElement;
    createTextNode(text: string): Text;
    createScriptTag(attrName: string, attrValue: string): HTMLElement;
    createStyleElement(css: string): HTMLStyleElement;
    createShadowRoot(el: any): HTMLElement;
    getShadowRoot(el: any): Element;
    getHost(el: any): string;
    getDistributedNodes(el: any): List<Node>;
    clone(node: Node): Node;
    getElementsByClassName(element: any, name: string): List<HTMLElement>;
    getElementsByTagName(element: any, name: string): List<HTMLElement>;
    classList(element: any): List<string>;
    addClass(element: any, classname: string): void;
    removeClass(element: any, classname: string): void;
    hasClass(element: any, classname: string): boolean;
    _readStyleAttribute(element: any): {};
    _writeStyleAttribute(element: any, styleMap: any): void;
    setStyle(element: any, stylename: string, stylevalue: string): void;
    removeStyle(element: any, stylename: string): void;
    getStyle(element: any, stylename: string): string;
    tagName(element: any): string;
    attributeMap(element: any): Map<string, string>;
    hasAttribute(element: any, attribute: string): boolean;
    getAttribute(element: any, attribute: string): string;
    setAttribute(element: any, attribute: string, value: string): void;
    removeAttribute(element: any, attribute: string): void;
    templateAwareRoot(el: any): any;
    createHtmlDocument(): Document;
    defaultDoc(): Document;
    getBoundingClientRect(el: any): any;
    getTitle(): string;
    setTitle(newTitle: string): void;
    isTemplateElement(el: any): boolean;
    isTextNode(node: any): boolean;
    isCommentNode(node: any): boolean;
    isElementNode(node: any): boolean;
    hasShadowRoot(node: any): boolean;
    isShadowRoot(node: any): boolean;
    importIntoDoc(node: any): any;
    isPageRule(rule: any): boolean;
    isStyleRule(rule: any): boolean;
    isMediaRule(rule: any): boolean;
    isKeyframesRule(rule: any): boolean;
    getHref(el: any): string;
    resolveAndSetHref(el: any, baseUrl: string, href: string): void;
    _buildRules(parsedRules: any, css?: any): any[];
    cssToRules(css: string): List<any>;
    supportsDOMEvents(): boolean;
    supportsNativeShadowDOM(): boolean;
    getGlobalEventTarget(target: string): any;
    getHistory(): History;
    getLocation(): Location;
    getUserAgent(): string;
    getData(el: any, name: string): string;
    setData(el: any, name: string, value: string): void;
    setGlobalVar(name: string, value: any): void;
}
