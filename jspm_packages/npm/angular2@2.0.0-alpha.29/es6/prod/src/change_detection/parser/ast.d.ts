import { Locals } from "./locals";
export declare class AST {
    eval(context: any, locals: Locals): void;
    isAssignable: boolean;
    assign(context: any, locals: Locals, value: any): void;
    visit(visitor: AstVisitor): any;
    toString(): string;
}
export declare class EmptyExpr extends AST {
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): void;
}
export declare class ImplicitReceiver extends AST {
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
/**
 * Multiple expressions separated by a semicolon.
 */
export declare class Chain extends AST {
    expressions: List<any>;
    constructor(expressions: List<any>);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class Conditional extends AST {
    condition: AST;
    trueExp: AST;
    falseExp: AST;
    constructor(condition: AST, trueExp: AST, falseExp: AST);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class If extends AST {
    condition: AST;
    trueExp: AST;
    falseExp: AST;
    constructor(condition: AST, trueExp: AST, falseExp?: AST);
    eval(context: any, locals: any): void;
    visit(visitor: AstVisitor): any;
}
export declare class AccessMember extends AST {
    receiver: AST;
    name: string;
    getter: Function;
    setter: Function;
    constructor(receiver: AST, name: string, getter: Function, setter: Function);
    eval(context: any, locals: Locals): any;
    isAssignable: boolean;
    assign(context: any, locals: Locals, value: any): any;
    visit(visitor: AstVisitor): any;
}
export declare class SafeAccessMember extends AST {
    receiver: AST;
    name: string;
    getter: Function;
    setter: Function;
    constructor(receiver: AST, name: string, getter: Function, setter: Function);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class KeyedAccess extends AST {
    obj: AST;
    key: AST;
    constructor(obj: AST, key: AST);
    eval(context: any, locals: Locals): any;
    isAssignable: boolean;
    assign(context: any, locals: Locals, value: any): any;
    visit(visitor: AstVisitor): any;
}
export declare class BindingPipe extends AST {
    exp: AST;
    name: string;
    args: List<any>;
    constructor(exp: AST, name: string, args: List<any>);
    visit(visitor: AstVisitor): any;
}
export declare class LiteralPrimitive extends AST {
    value: any;
    constructor(value: any);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class LiteralArray extends AST {
    expressions: List<any>;
    constructor(expressions: List<any>);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class LiteralMap extends AST {
    keys: List<any>;
    values: List<any>;
    constructor(keys: List<any>, values: List<any>);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class Interpolation extends AST {
    strings: List<any>;
    expressions: List<any>;
    constructor(strings: List<any>, expressions: List<any>);
    eval(context: any, locals: any): any;
    visit(visitor: AstVisitor): void;
}
export declare class Binary extends AST {
    operation: string;
    left: AST;
    right: AST;
    constructor(operation: string, left: AST, right: AST);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class PrefixNot extends AST {
    expression: AST;
    constructor(expression: AST);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class Assignment extends AST {
    target: AST;
    value: AST;
    constructor(target: AST, value: AST);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class MethodCall extends AST {
    receiver: AST;
    name: string;
    fn: Function;
    args: List<any>;
    constructor(receiver: AST, name: string, fn: Function, args: List<any>);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class SafeMethodCall extends AST {
    receiver: AST;
    name: string;
    fn: Function;
    args: List<any>;
    constructor(receiver: AST, name: string, fn: Function, args: List<any>);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class FunctionCall extends AST {
    target: AST;
    args: List<any>;
    constructor(target: AST, args: List<any>);
    eval(context: any, locals: Locals): any;
    visit(visitor: AstVisitor): any;
}
export declare class ASTWithSource extends AST {
    ast: AST;
    source: string;
    location: string;
    constructor(ast: AST, source: string, location: string);
    eval(context: any, locals: Locals): any;
    isAssignable: boolean;
    assign(context: any, locals: Locals, value: any): any;
    visit(visitor: AstVisitor): any;
    toString(): string;
}
export declare class TemplateBinding {
    key: string;
    keyIsVar: boolean;
    name: string;
    expression: ASTWithSource;
    constructor(key: string, keyIsVar: boolean, name: string, expression: ASTWithSource);
}
export interface AstVisitor {
    visitAccessMember(ast: AccessMember): any;
    visitAssignment(ast: Assignment): any;
    visitBinary(ast: Binary): any;
    visitChain(ast: Chain): any;
    visitConditional(ast: Conditional): any;
    visitIf(ast: If): any;
    visitPipe(ast: BindingPipe): any;
    visitFunctionCall(ast: FunctionCall): any;
    visitImplicitReceiver(ast: ImplicitReceiver): any;
    visitInterpolation(ast: Interpolation): any;
    visitKeyedAccess(ast: KeyedAccess): any;
    visitLiteralArray(ast: LiteralArray): any;
    visitLiteralMap(ast: LiteralMap): any;
    visitLiteralPrimitive(ast: LiteralPrimitive): any;
    visitMethodCall(ast: MethodCall): any;
    visitPrefixNot(ast: PrefixNot): any;
    visitSafeAccessMember(ast: SafeAccessMember): any;
    visitSafeMethodCall(ast: SafeMethodCall): any;
}
export declare class AstTransformer implements AstVisitor {
    visitImplicitReceiver(ast: ImplicitReceiver): ImplicitReceiver;
    visitInterpolation(ast: Interpolation): Interpolation;
    visitLiteralPrimitive(ast: LiteralPrimitive): LiteralPrimitive;
    visitAccessMember(ast: AccessMember): AccessMember;
    visitSafeAccessMember(ast: SafeAccessMember): SafeAccessMember;
    visitMethodCall(ast: MethodCall): MethodCall;
    visitSafeMethodCall(ast: SafeMethodCall): SafeMethodCall;
    visitFunctionCall(ast: FunctionCall): FunctionCall;
    visitLiteralArray(ast: LiteralArray): LiteralArray;
    visitLiteralMap(ast: LiteralMap): LiteralMap;
    visitBinary(ast: Binary): Binary;
    visitPrefixNot(ast: PrefixNot): PrefixNot;
    visitConditional(ast: Conditional): Conditional;
    visitPipe(ast: BindingPipe): BindingPipe;
    visitKeyedAccess(ast: KeyedAccess): KeyedAccess;
    visitAll(asts: List<any>): List<any>;
    visitChain(ast: Chain): Chain;
    visitAssignment(ast: Assignment): Assignment;
    visitIf(ast: If): If;
}
