/* */ 
"format cjs";
import { ListWrapper } from 'angular2/src/facade/collection';
import { isBlank, isPresent, global } from 'angular2/src/facade/lang';
import { setRootDomAdapter } from './dom_adapter';
import { GenericBrowserDomAdapter } from './generic_browser_adapter';
var _attrToPropMap = { 'innerHtml': 'innerHTML', 'readonly': 'readOnly', 'tabindex': 'tabIndex' };
const DOM_KEY_LOCATION_NUMPAD = 3;
// Map to convert some key or keyIdentifier values to what will be returned by getEventKey
var _keyMap = {
    // The following values are here for cross-browser compatibility and to match the W3C standard
    // cf http://www.w3.org/TR/DOM-Level-3-Events-key/
    '\b': 'Backspace',
    '\t': 'Tab',
    '\x7F': 'Delete',
    '\x1B': 'Escape',
    'Del': 'Delete',
    'Esc': 'Escape',
    'Left': 'ArrowLeft',
    'Right': 'ArrowRight',
    'Up': 'ArrowUp',
    'Down': 'ArrowDown',
    'Menu': 'ContextMenu',
    'Scroll': 'ScrollLock',
    'Win': 'OS'
};
// There is a bug in Chrome for numeric keypad keys:
// https://code.google.com/p/chromium/issues/detail?id=155654
// 1, 2, 3 ... are reported as A, B, C ...
var _chromeNumKeyPadMap = {
    'A': '1',
    'B': '2',
    'C': '3',
    'D': '4',
    'E': '5',
    'F': '6',
    'G': '7',
    'H': '8',
    'I': '9',
    'J': '*',
    'K': '+',
    'M': '-',
    'N': '.',
    'O': '/',
    '\x60': '0',
    '\x90': 'NumLock'
};
export class BrowserDomAdapter extends GenericBrowserDomAdapter {
    static makeCurrent() { setRootDomAdapter(new BrowserDomAdapter()); }
    hasProperty(element, name) { return name in element; }
    setProperty(el, name, value) { el[name] = value; }
    getProperty(el, name) { return el[name]; }
    invoke(el, methodName, args) {
        el[methodName].apply(el, args);
    }
    // TODO(tbosch): move this into a separate environment class once we have it
    logError(error) { window.console.error(error); }
    get attrToPropMap() { return _attrToPropMap; }
    query(selector) { return document.querySelector(selector); }
    querySelector(el, selector) { return el.querySelector(selector); }
    querySelectorAll(el, selector) { return el.querySelectorAll(selector); }
    on(el, evt, listener) { el.addEventListener(evt, listener, false); }
    onAndCancel(el, evt, listener) {
        el.addEventListener(evt, listener, false);
        // Needed to follow Dart's subscription semantic, until fix of
        // https://code.google.com/p/dart/issues/detail?id=17406
        return () => { el.removeEventListener(evt, listener, false); };
    }
    dispatchEvent(el, evt) { el.dispatchEvent(evt); }
    createMouseEvent(eventType) {
        var evt = document.createEvent('MouseEvent');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    createEvent(eventType) {
        var evt = document.createEvent('Event');
        evt.initEvent(eventType, true, true);
        return evt;
    }
    preventDefault(evt) {
        evt.preventDefault();
        evt.returnValue = false;
    }
    getInnerHTML(el) { return el.innerHTML; }
    getOuterHTML(el) { return el.outerHTML; }
    nodeName(node) { return node.nodeName; }
    nodeValue(node) { return node.nodeValue; }
    type(node) { return node.type; }
    content(node) {
        if (this.hasProperty(node, "content")) {
            return node.content;
        }
        else {
            return node;
        }
    }
    firstChild(el) { return el.firstChild; }
    nextSibling(el) { return el.nextSibling; }
    parentElement(el) { return el.parentElement; }
    childNodes(el) { return el.childNodes; }
    childNodesAsList(el) {
        var childNodes = el.childNodes;
        var res = ListWrapper.createFixedSize(childNodes.length);
        for (var i = 0; i < childNodes.length; i++) {
            res[i] = childNodes[i];
        }
        return res;
    }
    clearNodes(el) {
        for (var i = 0; i < el.childNodes.length; i++) {
            this.remove(el.childNodes[i]);
        }
    }
    appendChild(el, node) { el.appendChild(node); }
    removeChild(el, node) { el.removeChild(node); }
    replaceChild(el, newChild, oldChild) { el.replaceChild(newChild, oldChild); }
    remove(el) {
        var parent = el.parentNode;
        parent.removeChild(el);
        return el;
    }
    insertBefore(el, node) { el.parentNode.insertBefore(node, el); }
    insertAllBefore(el, nodes) {
        ListWrapper.forEach(nodes, (n) => { el.parentNode.insertBefore(n, el); });
    }
    insertAfter(el, node) { el.parentNode.insertBefore(node, el.nextSibling); }
    setInnerHTML(el, value) { el.innerHTML = value; }
    getText(el) { return el.textContent; }
    // TODO(vicb): removed Element type because it does not support StyleElement
    setText(el, value) { el.textContent = value; }
    getValue(el) { return el.value; }
    setValue(el, value) { el.value = value; }
    getChecked(el) { return el.checked; }
    setChecked(el, value) { el.checked = value; }
    createTemplate(html) {
        var t = document.createElement('template');
        t.innerHTML = html;
        return t;
    }
    createElement(tagName, doc = document) { return doc.createElement(tagName); }
    createTextNode(text, doc = document) { return doc.createTextNode(text); }
    createScriptTag(attrName, attrValue, doc = document) {
        var el = doc.createElement('SCRIPT');
        el.setAttribute(attrName, attrValue);
        return el;
    }
    createStyleElement(css, doc = document) {
        var style = doc.createElement('style');
        this.appendChild(style, this.createTextNode(css));
        return style;
    }
    createShadowRoot(el) { return el.createShadowRoot(); }
    getShadowRoot(el) { return el.shadowRoot; }
    getHost(el) { return el.host; }
    clone(node) { return node.cloneNode(true); }
    getElementsByClassName(element, name) {
        return element.getElementsByClassName(name);
    }
    getElementsByTagName(element, name) {
        return element.getElementsByTagName(name);
    }
    classList(element) {
        return Array.prototype.slice.call(element.classList, 0);
    }
    addClass(element, classname) { element.classList.add(classname); }
    removeClass(element, classname) { element.classList.remove(classname); }
    hasClass(element, classname) { return element.classList.contains(classname); }
    setStyle(element, stylename, stylevalue) {
        element.style[stylename] = stylevalue;
    }
    removeStyle(element, stylename) { element.style[stylename] = null; }
    getStyle(element, stylename) { return element.style[stylename]; }
    tagName(element) { return element.tagName; }
    attributeMap(element) {
        var res = new Map();
        var elAttrs = element.attributes;
        for (var i = 0; i < elAttrs.length; i++) {
            var attrib = elAttrs[i];
            res.set(attrib.name, attrib.value);
        }
        return res;
    }
    hasAttribute(element, attribute) { return element.hasAttribute(attribute); }
    getAttribute(element, attribute) { return element.getAttribute(attribute); }
    setAttribute(element, name, value) { element.setAttribute(name, value); }
    removeAttribute(element, attribute) { element.removeAttribute(attribute); }
    templateAwareRoot(el) { return this.isTemplateElement(el) ? this.content(el) : el; }
    createHtmlDocument() {
        return document.implementation.createHTMLDocument('fakeTitle');
    }
    defaultDoc() { return document; }
    getBoundingClientRect(el) {
        try {
            return el.getBoundingClientRect();
        }
        catch (e) {
            return { top: 0, bottom: 0, left: 0, right: 0, width: 0, height: 0 };
        }
    }
    getTitle() { return document.title; }
    setTitle(newTitle) { document.title = newTitle || ''; }
    elementMatches(n, selector) {
        return n instanceof HTMLElement && n.matches ? n.matches(selector) :
            n.msMatchesSelector(selector);
    }
    isTemplateElement(el) {
        return el instanceof HTMLElement && el.nodeName == "TEMPLATE";
    }
    isTextNode(node) { return node.nodeType === Node.TEXT_NODE; }
    isCommentNode(node) { return node.nodeType === Node.COMMENT_NODE; }
    isElementNode(node) { return node.nodeType === Node.ELEMENT_NODE; }
    hasShadowRoot(node) { return node instanceof HTMLElement && isPresent(node.shadowRoot); }
    isShadowRoot(node) { return node instanceof DocumentFragment; }
    importIntoDoc(node) {
        var toImport = node;
        if (this.isTemplateElement(node)) {
            toImport = this.content(node);
        }
        return document.importNode(toImport, true);
    }
    isPageRule(rule) { return rule.type === CSSRule.PAGE_RULE; }
    isStyleRule(rule) { return rule.type === CSSRule.STYLE_RULE; }
    isMediaRule(rule) { return rule.type === CSSRule.MEDIA_RULE; }
    isKeyframesRule(rule) { return rule.type === CSSRule.KEYFRAMES_RULE; }
    getHref(el) { return el.href; }
    getEventKey(event) {
        var key = event.key;
        if (isBlank(key)) {
            key = event.keyIdentifier;
            // keyIdentifier is defined in the old draft of DOM Level 3 Events implemented by Chrome and
            // Safari
            // cf
            // http://www.w3.org/TR/2007/WD-DOM-Level-3-Events-20071221/events.html#Events-KeyboardEvents-Interfaces
            if (isBlank(key)) {
                return 'Unidentified';
            }
            if (key.startsWith('U+')) {
                key = String.fromCharCode(parseInt(key.substring(2), 16));
                if (event.location === DOM_KEY_LOCATION_NUMPAD && _chromeNumKeyPadMap.hasOwnProperty(key)) {
                    // There is a bug in Chrome for numeric keypad keys:
                    // https://code.google.com/p/chromium/issues/detail?id=155654
                    // 1, 2, 3 ... are reported as A, B, C ...
                    key = _chromeNumKeyPadMap[key];
                }
            }
        }
        if (_keyMap.hasOwnProperty(key)) {
            key = _keyMap[key];
        }
        return key;
    }
    getGlobalEventTarget(target) {
        if (target == "window") {
            return window;
        }
        else if (target == "document") {
            return document;
        }
        else if (target == "body") {
            return document.body;
        }
    }
    getHistory() { return window.history; }
    getLocation() { return window.location; }
    getBaseHref() { return relativePath(document.baseURI); }
    getUserAgent() { return window.navigator.userAgent; }
    setData(element, name, value) { element.dataset[name] = value; }
    getData(element, name) { return element.dataset[name]; }
    // TODO(tbosch): move this into a separate environment class once we have it
    setGlobalVar(name, value) { global[name] = value; }
}
// based on urlUtils.js in AngularJS 1
var urlParsingNode = null;
function relativePath(url) {
    if (isBlank(urlParsingNode)) {
        urlParsingNode = document.createElement("a");
    }
    urlParsingNode.setAttribute('href', url);
    return (urlParsingNode.pathname.charAt(0) === '/') ? urlParsingNode.pathname :
        '/' + urlParsingNode.pathname;
}
//# sourceMappingURL=browser_adapter.js.map