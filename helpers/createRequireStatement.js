"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
/**
 * createRequireStatement(ts.factory.createIdentifier('test'), './path/to/test.ts');
 *
 * const test = require('./path/to/test.ts').default;
 */
function createRequireStatement(name, path) {
    const f = typescript_1.default.factory;
    const variableDeclaration = f.createVariableDeclaration(name, undefined, undefined, f.createPropertyAccessExpression(f.createCallExpression(f.createIdentifier('require'), undefined, [f.createStringLiteral(path)]), f.createIdentifier('default')));
    return f.createVariableStatement(undefined, f.createVariableDeclarationList([variableDeclaration], typescript_1.default.NodeFlags.Const));
}
exports.default = createRequireStatement;
