"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typescript_1 = __importDefault(require("typescript"));
const allowedHtmlElements_1 = __importDefault(require("../allowedHtmlElements"));
const availableJsxAttributes_1 = __importDefault(require("../availableJsxAttributes"));
const getDictionary_1 = __importDefault(require("../getDictionary"));
const createRequireStatement_1 = __importDefault(require("../helpers/createRequireStatement"));
const jsTransformer = () => {
    return context => {
        const { factory: f } = context;
        return sourceFile => {
            const visitor = node => {
                // report(undefined, node.kind, `\t# ts.SyntaxKind.${ts.SyntaxKind[node.kind]}`);
                const decodeClassName = f.createIdentifier('decodeClassName');
                const decodeJsxSpreadAttributes = f.createIdentifier('decodeJsxSpreadAttributes');
                const decodeResponsiveClassName = f.createIdentifier('decodeResponsiveClassName');
                const filterJsxSpreadAttributes = f.createIdentifier('filterJsxSpreadAttributes');
                if (typescript_1.default.isSourceFile(node)) {
                    const $ = [
                        [decodeClassName, '@warden-sk/compiler/helpers/decodeClassName'],
                        [decodeJsxSpreadAttributes, '@warden-sk/compiler/helpers/decodeJsxSpreadAttributes'],
                        [decodeResponsiveClassName, '@warden-sk/compiler/helpers/decodeResponsiveClassName'],
                        [filterJsxSpreadAttributes, '@warden-sk/compiler/helpers/filterJsxSpreadAttributes'],
                    ].map(([name, path]) => (0, createRequireStatement_1.default)(name, path));
                    const updatedNode = f.updateSourceFile(node, [...$, ...node.statements]);
                    return typescript_1.default.visitEachChild(updatedNode, visitor, context);
                }
                if (typescript_1.default.isJsxOpeningElement(node) || typescript_1.default.isJsxSelfClosingElement(node)) {
                    if (typescript_1.default.isIdentifier(node.tagName) && node.tagName.text in allowedHtmlElements_1.default) {
                        const attributes = [];
                        const className = [];
                        node.attributes.properties.forEach(attribute => {
                            if (typescript_1.default.isJsxAttribute(attribute)) {
                                // <Component test /> – "$" would be "undefined" for the "test" attribute
                                const $ = attribute.initializer;
                                if ($) {
                                    /* (1) */
                                    if (typescript_1.default.isIdentifier(attribute.name) && attribute.name.text === 'className') {
                                        /* (1.1) */
                                        if (typescript_1.default.isJsxExpression($) || typescript_1.default.isStringLiteral($)) {
                                            return className.push(typescript_1.default.isJsxExpression($) ? $.expression : $);
                                        }
                                    }
                                    /* (2) */
                                    if (typescript_1.default.isIdentifier(attribute.name) && attribute.name.text in availableJsxAttributes_1.default) {
                                        /* (2.1) */
                                        if (typescript_1.default.isJsxExpression($) || typescript_1.default.isStringLiteral($)) {
                                            return className.push(f.createCallExpression(decodeResponsiveClassName, undefined, [
                                                f.createStringLiteral(getDictionary_1.default.getKey(attribute.name.text)),
                                                typescript_1.default.isJsxExpression($) ? $.expression : $,
                                            ]));
                                        }
                                    }
                                }
                            }
                            /* (2) */
                            if (typescript_1.default.isJsxSpreadAttribute(attribute)) {
                                attributes.push(f.createJsxSpreadAttribute(f.createCallExpression(filterJsxSpreadAttributes, undefined, [attribute.expression])));
                                return className.push(f.createCallExpression(decodeJsxSpreadAttributes, undefined, [attribute.expression]));
                            }
                            attributes.push(attribute);
                        });
                        /* (3) */
                        if (className.length) {
                            attributes.push(f.createJsxAttribute(f.createIdentifier('className'), f.createJsxExpression(undefined, f.createCallExpression(decodeClassName, undefined, className))));
                        }
                        const updatedNode = typescript_1.default.isJsxOpeningElement(node)
                            ? f.updateJsxOpeningElement(node, node.tagName, node.typeArguments, f.updateJsxAttributes(node.attributes, attributes))
                            : f.updateJsxSelfClosingElement(node, node.tagName, node.typeArguments, f.updateJsxAttributes(node.attributes, attributes));
                        return typescript_1.default.visitEachChild(updatedNode, visitor, context);
                    }
                }
                return typescript_1.default.visitEachChild(node, visitor, context);
            };
            return typescript_1.default.visitNode(sourceFile, visitor);
        };
    };
};
exports.default = jsTransformer;
