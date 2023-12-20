"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const getDictionary_1 = __importDefault(require("../../getDictionary"));
const createArrayOf_1 = __importDefault(require("../createArrayOf"));
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const percentage_1 = __importDefault(require("../percentage"));
const sizes = [
    ['0', '0'],
    ['1', '0.25rem'],
    ['2', '0.5rem'],
    ['3', '0.75rem'],
    ['4', '1rem'],
    ['5', '1.25rem'],
    ['6', '1.5rem'],
    ['7', '1.75rem'],
    ['8', '2rem'],
    ['16', '4rem'],
    ['32', '8rem'], //   128px
];
function css(breakpointName, left, property, right) {
    const $ = getDictionary_1.default.getKey(property[0]);
    const b = getDictionary_1.default.getKey(`${property[0]}B`);
    const l = getDictionary_1.default.getKey(`${property[0]}L`);
    const r = getDictionary_1.default.getKey(`${property[0]}R`);
    const t = getDictionary_1.default.getKey(`${property[0]}T`);
    const x = getDictionary_1.default.getKey(`${property[0]}X`);
    const y = getDictionary_1.default.getKey(`${property[0]}Y`);
    return {
        [`.${breakpointName}${$}${getDictionary_1.default.getKey(left)}`]: {
            [property]: right,
        },
        // "b", "y"
        [`.${breakpointName}${b}${getDictionary_1.default.getKey(left)},.${breakpointName}${y}${getDictionary_1.default.getKey(left)}`]: {
            [`${property}Bottom`]: right,
        },
        // "l", "x"
        [`.${breakpointName}${l}${getDictionary_1.default.getKey(left)},.${breakpointName}${x}${getDictionary_1.default.getKey(left)}`]: {
            [`${property}Left`]: right,
        },
        // "r", "x"
        [`.${breakpointName}${r}${getDictionary_1.default.getKey(left)},.${breakpointName}${x}${getDictionary_1.default.getKey(left)}`]: {
            [`${property}Right`]: right,
        },
        // "t", "y"
        [`.${breakpointName}${t}${getDictionary_1.default.getKey(left)},.${breakpointName}${y}${getDictionary_1.default.getKey(left)}`]: {
            [`${property}Top`]: right,
        },
    };
}
function spacing(columns) {
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        return {
            ...['1', '2', '3', '4'].reduce((_, left) => ({
                ..._,
                [`.${breakpointName}${getDictionary_1.default.getKey('gridTemplateColumns')}${getDictionary_1.default.getKey(left)}`]: {
                    gridTemplateColumns: `repeat(${left}, minmax(0, 1fr))`,
                },
            }), {}),
            // .gap-0
            ...sizes.reduce((_, [left, right]) => ({
                ..._,
                [`.${breakpointName}${getDictionary_1.default.getKey('gap')}${getDictionary_1.default.getKey(left)}`]: {
                    gap: right,
                },
                [`.${breakpointName}${getDictionary_1.default.getKey('gapX')}${getDictionary_1.default.getKey(left)}`]: {
                    columnGap: right,
                },
                [`.${breakpointName}${getDictionary_1.default.getKey('gapY')}${getDictionary_1.default.getKey(left)}`]: {
                    rowGap: right,
                },
            }), {}),
            // .space-x-0
            ...sizes.reduce((_, [left, right]) => ({
                ..._,
                [`.${breakpointName}${getDictionary_1.default.getKey('spaceX')}${getDictionary_1.default.getKey(left)} > * + *`]: {
                    marginLeft: right,
                },
                [`.${breakpointName}${getDictionary_1.default.getKey('spaceY')}${getDictionary_1.default.getKey(left)} > * + *`]: {
                    marginTop: right,
                },
            }), {}),
            // .m-!1
            ...sizes.reduce((_, [left, right]) => right === '0'
                ? _
                : {
                    ..._,
                    ...css(breakpointName, `!${left}`, 'margin', `-${right}`),
                }, {}),
            // .m-0
            ...sizes.reduce((_, [left, right]) => ({
                ..._,
                ...css(breakpointName, left, 'margin', right),
            }), {}),
            // .m-auto
            ...css(breakpointName, 'auto', 'margin', 'auto'),
            // .m-l-1/12
            ...(0, createArrayOf_1.default)(columns).reduce((css, i) => ({
                ...css,
                [`.${breakpointName}${getDictionary_1.default.getKey('mL')}${getDictionary_1.default.getKey(`${i}/${columns}`)}`]: {
                    marginLeft: (0, percentage_1.default)(i, columns),
                },
            }), {}),
            // .p-0
            ...sizes.reduce((_, [left, right]) => ({
                ..._,
                ...css(breakpointName, left, 'padding', right),
            }), {}),
        };
    });
}
exports.default = spacing;
