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
Object.defineProperty(exports, "__esModule", { value: true });
const t = __importStar(require("./storage"));
const availableJsxAttributes = {
    alignContent: t.AlignContent,
    alignItems: t.AlignItems,
    alignSelf: t.AlignSelf,
    aspectRatio: t.AspectRatio,
    border: t.Border,
    borderBottom: t.Border,
    borderBottomRadius: t.BorderRadius,
    borderLeft: t.Border,
    borderLeftRadius: t.BorderRadius,
    borderRadius: t.BorderRadius,
    borderRight: t.Border,
    borderRightRadius: t.BorderRadius,
    borderTop: t.Border,
    borderTopRadius: t.BorderRadius,
    borderX: t.Border,
    borderY: t.Border,
    cursor: t.Cursor,
    display: t.Display,
    flex: t.Flex,
    flexBasis: t.FlexBasis,
    flexDirection: t.FlexDirection,
    flexGrow: t.FlexGrow,
    flexShrink: t.FlexShrink,
    flexWrap: t.FlexWrap,
    fontSize: t.FontSize,
    fontWeight: t.FontWeight,
    gap: t.S,
    gapX: t.S,
    gapY: t.S,
    gridTemplateColumns: t.GridTemplateColumns,
    height: t.Height,
    justifyContent: t.JustifyContent,
    justifyItems: t.JustifyItems,
    justifySelf: t.JustifySelf,
    lineHeight: t.LineHeight,
    m: t.Margin,
    mB: t.Margin,
    mL: t.MarginLeft,
    mR: t.Margin,
    mT: t.Margin,
    mX: t.Margin,
    mY: t.Margin,
    maxWidth: t.MaxWidth,
    minHeight: t.MinHeight,
    opacity: t.Opacity,
    overflow: t.Overflow,
    p: t.S,
    pB: t.S,
    pL: t.S,
    pR: t.S,
    pT: t.S,
    pX: t.S,
    pY: t.S,
    spaceX: t.S,
    spaceY: t.S,
    textAlign: t.TextAlign,
    whiteSpace: t.WhiteSpace,
    width: t.Width,
};
exports.default = availableJsxAttributes;
