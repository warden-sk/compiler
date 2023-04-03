"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
Object.defineProperty(exports, "__esModule", { value: true });
const os_1 = require("os");
function getIPv4Addresses() {
    const $ = (0, os_1.networkInterfaces)();
    let addresses = [];
    for (const networkInterfaceName in $) {
        const networkInterface = $[networkInterfaceName];
        if (networkInterface) {
            for (const $$ of networkInterface) {
                if ($$.family === 'IPv4') {
                    addresses = [...addresses, $$.address];
                }
            }
        }
    }
    return addresses;
}
exports.default = getIPv4Addresses;
