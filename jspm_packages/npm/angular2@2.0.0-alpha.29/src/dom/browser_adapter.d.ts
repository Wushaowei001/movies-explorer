import { GenericBrowserDomAdapter } from './generic_browser_adapter';
export declare class BrowserDomAdapter extends GenericBrowserDomAdapter {
    static makeCurrent(): void;
    hasProperty(element: any, name: string): boolean;
    setProperty(el: any, name: string, value: any): void;
    getProperty(el: any, name: string): any;
    invoke(el: any, methodName: string, args: List<any>): any;
    logError(error: any): void;
    attrToPropMap: any;
    query(selector: string): any;
    querySelector(el: any, selector: string): Node;
    querySelectorAll(el: any, selector: string): List<any>;
    on(el: any, evt: any, listener: any): void;
    onAndCancel(el: any, evt: any, listener: any): Function;
    dispatchEvent(el: any, evt: any): void;
    createMouseEvent(eventType: string): MouseEvent;
    createEvent(eventType: any): Event;
    preventDefault(evt: Event): void;
    getInnerHTML(el: any): string;
    getOuterHTML(el: any): string;
    nodeName(node: Node): string;
    nodeValue(node: Node): string;
    type(node: HTMLInputElement): string;
    content(node: Node): Node;
    firstChild(el: any): Node;
    nextSibling(el: any): Node;
    parentElement(el: any): Node;
    childNodes(el: any): List<Node>;
    childNodesAsList(el: any): List<any>;
    clearNodes(el: any): void;
    appendChild(el: any, node: any): void;
    removeChild(el: any, node: any): void;
    replaceChild(el: Node, newChild: any, oldChild: any): void;
    remove(el: any): Node;
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
    createElement(tagName: any, doc?: Document): HTMLElement;
    createTextNode(text: string, doc?: Document): Text;
    createScriptTag(attrName: string, attrValue: string, doc?: Document): HTMLScriptElement;
    createStyleElement(css: string, doc?: Document): HTMLStyleElement;
    createShadowRoot(el: HTMLElement): DocumentFragment;
    getShadowRoot(el: HTMLElement): DocumentFragment;
    getHost(el: HTMLElement): HTMLElement;
    clone(node: Node): Node;
    getElementsByClassName(element: any, name: string): List<HTMLElement>;
    getElementsByTagName(element: any, name: string): List<HTMLElement>;
    classList(element: any): List<any>;
    addClass(element: any, classname: string): void;
    removeClass(element: any, classname: string): void;
    hasClass(element: any, classname: string): boolean;
    setStyle(element: any, stylename: string, stylevalue: string): void;
    removeStyle(element: any, stylename: string): void;
    getStyle(element: any, stylename: string): string;
    tagName(element: any): string;
    attributeMap(element: any): Map<string, string>;
    hasAttribute(element: any, attribute: string): boolean;
    getAttribute(element: any, attribute: string): string;
    setAttribute(element: any, name: string, value: string): void;
    removeAttribute(element: any, attribute: string): void;
    templateAwareRoot(el: any): any;
    createHtmlDocument(): HTMLDocument;
    defaultDoc(): HTMLDocument;
    getBoundingClientRect(el: any): any;
    getTitle(): string;
    setTitle(newTitle: string): void;
    elementMatches(n: any, selector: string): boolean;
    isTemplateElement(el: any): boolean;
    isTextNode(node: Node): boolean;
    isCommentNode(node: Node): boolean;
    isElementNode(node: Node): boolean;
    hasShadowRoot(node: any): boolean;
    isShadowRoot(node: any): boolean;
    importIntoDoc(node: Node): any;
    isPageRule(rule: any): boolean;
    isStyleRule(rule: any): boolean;
    isMediaRule(rule: any): boolean;
    isKeyframesRule(rule: any): boolean;
    getHref(el: Element): string;
    getEventKey(event: any): string;
    getGlobalEventTarget(target: string): EventTarget;
    getHistory(): History;
    getLocation(): Location;
    getBaseHref(): string;
    getUserAgent(): string;
    setData(element: any, name: string, value: string): void;
    getData(element: any, name: string): string;
    setGlobalVar(name: string, value: any): void;
}
export declare var __esModule: boolean;
