"use strict";
/*
 * Copyright 2024 Marek Kobida
 * Last Updated: 24.10.2024
 */
Object.defineProperty(exports, "__esModule", { value: true });
function report(type, ...$) {
    const date = new Date();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const icon = type === 'IN' ? '\x1b[32m↓'
        : type === 'OUT' ? '\x1b[31m↑'
            : '→';
    console.log(icon, `[${hours}:${minutes}]\x1b[0m`, ...$.filter(Boolean));
}
exports.default = report;
