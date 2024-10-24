"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const forBreakpoints_1 = __importDefault(require("../forBreakpoints"));
const getName_1 = __importDefault(require("../getName"));
function position() {
    return (0, forBreakpoints_1.default)(([breakpointName]) => {
        // (1/2) BOTTOM, LEFT, RIGHT, TOP
        const $1 = ['bottom', 'left', 'right', 'top'] /**/
            .reduce((css, key) => {
            const $ = (0, getName_1.default)(breakpointName, key);
            return {
                ...css,
                [$('0')]: {
                    [key]: '0',
                },
                [$('50')]: {
                    [key]: '50%',
                },
                [$('100')]: {
                    [key]: '100%',
                },
            };
        }, {});
        // (2/2) POSITION / dokončiť / `t.Position`
        const $2 = ['absolute', 'fixed', 'relative', 'static', 'sticky'] /**/
            .reduce((css, key) => {
            const $ = (0, getName_1.default)(breakpointName, 'position');
            return {
                ...css,
                [$(key)]: {
                    position: key,
                },
            };
        }, {});
        return { ...$1, ...$2 };
    });
}
exports.default = position;
