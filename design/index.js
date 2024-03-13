"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDictionary_1 = __importDefault(require("../getDictionary"));
const t = __importStar(require("../storage"));
const border_1 = __importDefault(require("./components/border"));
const borderRadius_1 = __importDefault(require("./components/borderRadius"));
const container_1 = __importDefault(require("./components/container"));
const flexBasis_1 = __importDefault(require("./components/flexBasis"));
const fontSize_1 = __importDefault(require("./components/fontSize"));
const height_1 = __importDefault(require("./components/height"));
const lineHeight_1 = __importDefault(require("./components/lineHeight"));
const minHeight_1 = __importDefault(require("./components/minHeight"));
const opacity_1 = __importDefault(require("./components/opacity"));
const overflow_1 = __importDefault(require("./components/overflow"));
const spacing_1 = __importDefault(require("./components/spacing"));
const width_1 = __importDefault(require("./components/width"));
const forBreakpoints_1 = __importDefault(require("./forBreakpoints"));
const toString_1 = __importDefault(require("./toString"));
function toHelper(propertyName, type) {
    const $ = getDictionary_1.default.getKey(propertyName);
    return (0, forBreakpoints_1.default)(([breakpointName]) => type.reduce((_, property) => ({
        ..._,
        [`.${breakpointName}${$}${getDictionary_1.default.getKey(property)}`]: {
            [propertyName]: property,
        },
    }), {}));
}
const alignContent = toHelper('alignContent', t.AlignContent);
const alignItems = toHelper('alignItems', t.AlignItems);
const alignSelf = toHelper('alignSelf', t.AlignSelf);
const aspectRatio = toHelper('aspectRatio', t.AspectRatio);
const cursor = toHelper('cursor', t.Cursor);
const display = toHelper('display', t.Display);
const flex = toHelper('flex', t.Flex);
const flexDirection = toHelper('flexDirection', t.FlexDirection);
const flexGrow = toHelper('flexGrow', t.FlexGrow);
const flexShrink = toHelper('flexShrink', t.FlexShrink);
const flexWrap = toHelper('flexWrap', t.FlexWrap);
const fontWeight = toHelper('fontWeight', t.FontWeight);
const justifyContent = toHelper('justifyContent', t.JustifyContent);
const justifyItems = toHelper('justifyItems', t.JustifyItems);
const justifySelf = toHelper('justifySelf', t.JustifySelf);
const textAlign = toHelper('textAlign', t.TextAlign);
const whiteSpace = toHelper('whiteSpace', t.WhiteSpace);
const root = {
    '*,*::before,*::after': {
        boxSizing: 'border-box',
    },
    ':root': {
        // @ts-ignore
        '--border-width': '0.0625rem !important' /* 1px */,
    },
    a: {
        color: 'inherit',
        textDecoration: 'none',
    },
    'a:hover': {
    // textDecoration: 'underline',
    },
    body: {
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif",
        margin: '0',
    },
    'h1,h2,h3,h4,h5,h6': {
        fontSize: 'inherit',
        fontWeight: 'inherit',
    },
    'h1,h2,h3,h4,h5,h6,p': {
        margin: '0',
    },
    html: {
        WebkitTextSizeAdjust: '100%',
        fontSize: '16px',
        lineHeight: '1.5',
    },
};
const css = [
    alignContent,
    alignItems,
    alignSelf,
    aspectRatio,
    (0, border_1.default)(),
    (0, borderRadius_1.default)(),
    (0, container_1.default)(),
    cursor,
    display,
    flex,
    (0, flexBasis_1.default)(12),
    flexDirection,
    flexGrow,
    flexShrink,
    flexWrap,
    (0, fontSize_1.default)(),
    fontWeight,
    (0, height_1.default)(),
    justifyContent,
    justifyItems,
    justifySelf,
    (0, lineHeight_1.default)(),
    (0, minHeight_1.default)(),
    (0, opacity_1.default)(),
    (0, overflow_1.default)(),
    (0, spacing_1.default)(12),
    textAlign,
    whiteSpace,
    (0, width_1.default)(12),
];
console.log((0, toString_1.default)(root) + css.reduce((left, right) => left + (0, toString_1.default)(right, true), ''));
