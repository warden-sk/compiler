"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dictionary_1 = __importDefault(require("../../dictionary"));
const createArrayOf_1 = __importDefault(require("../createArrayOf"));
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const percentage_1 = __importDefault(require("../percentage"));
const sizes = [
    ['0', '0'], //       0
    ['1', '0.25rem'], // 4px
    ['2', '0.5rem'], //  8px
    ['3', '0.75rem'], // 12px
    ['4', '1rem'], //    16px
    ['5', '1.25rem'], // 20px
    ['6', '1.5rem'], //  24px
    ['7', '1.75rem'], // 28px
    ['8', '2rem'], //    32px
    ['16', '4rem'], //   64px
    ['32', '8rem'], //   128px
    ['64', '16rem'], //  256px
];
function css(breakpointName, left, property, right) {
    const $ = dictionary_1.default.getKey(property[0]);
    const b = dictionary_1.default.getKey(`${property[0]}B`);
    const l = dictionary_1.default.getKey(`${property[0]}L`);
    const r = dictionary_1.default.getKey(`${property[0]}R`);
    const t = dictionary_1.default.getKey(`${property[0]}T`);
    const x = dictionary_1.default.getKey(`${property[0]}X`);
    const y = dictionary_1.default.getKey(`${property[0]}Y`);
    return {
        [`.${breakpointName}${$}${dictionary_1.default.getKey(left)}`]: {
            [property]: right,
        },
        // "b", "y"
        [`.${breakpointName}${b}${dictionary_1.default.getKey(left)},.${breakpointName}${y}${dictionary_1.default.getKey(left)}`]: {
            [`${property}Bottom`]: right,
        },
        // "l", "x"
        [`.${breakpointName}${l}${dictionary_1.default.getKey(left)},.${breakpointName}${x}${dictionary_1.default.getKey(left)}`]: {
            [`${property}Left`]: right,
        },
        // "r", "x"
        [`.${breakpointName}${r}${dictionary_1.default.getKey(left)},.${breakpointName}${x}${dictionary_1.default.getKey(left)}`]: {
            [`${property}Right`]: right,
        },
        // "t", "y"
        [`.${breakpointName}${t}${dictionary_1.default.getKey(left)},.${breakpointName}${y}${dictionary_1.default.getKey(left)}`]: {
            [`${property}Top`]: right,
        },
    };
}
function spacing(columns) {
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        return {
            ...['1', '2', '3', '4'].reduce((_, left) => ({
                ..._,
                [`.${breakpointName}${dictionary_1.default.getKey('gridTemplateColumns')}${dictionary_1.default.getKey(left)}`]: {
                    gridTemplateColumns: `repeat(${left}, minmax(0, 1fr))`,
                },
            }), {}),
            // .gap-0
            ...sizes.reduce((_, [left, right]) => ({
                ..._,
                [`.${breakpointName}${dictionary_1.default.getKey('gap')}${dictionary_1.default.getKey(left)}`]: {
                    gap: right,
                },
                [`.${breakpointName}${dictionary_1.default.getKey('gapX')}${dictionary_1.default.getKey(left)}`]: {
                    columnGap: right,
                },
                [`.${breakpointName}${dictionary_1.default.getKey('gapY')}${dictionary_1.default.getKey(left)}`]: {
                    rowGap: right,
                },
            }), {}),
            // .space-x-0
            ...sizes.reduce((_, [left, right]) => ({
                ..._,
                [`.${breakpointName}${dictionary_1.default.getKey('spaceX')}${dictionary_1.default.getKey(left)} > * + *`]: {
                    marginLeft: right,
                },
                [`.${breakpointName}${dictionary_1.default.getKey('spaceY')}${dictionary_1.default.getKey(left)} > * + *`]: {
                    marginTop: right,
                },
            }), {}),
            // .m-!1
            ...sizes.reduce((_, [left, right]) => right === '0' ? _ : ({
                ..._,
                ...css(breakpointName, `!${left}`, 'margin', `-${right}`),
            }), {}),
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
                [`.${breakpointName}${dictionary_1.default.getKey('mL')}${dictionary_1.default.getKey(`${i}/${columns}`)}`]: {
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
