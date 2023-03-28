"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
function sizeToReadable(size) {
    const units = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }
    return `${size.toFixed(2)} ${units[unitIndex]}`;
}
exports.default = sizeToReadable;
