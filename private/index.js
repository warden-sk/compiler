"use strict";
/*
 * Copyright 2023 Marek Kobida
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
require("./index.css");
function Client() {
    return react_1.default.createElement("div", null, "Client");
}
if (typeof window !== 'undefined') {
    client_1.default.createRoot(window.document.querySelector('#client')).render(react_1.default.createElement(Client, null));
}
exports.default = react_1.default.createElement("div", { id: "client" });
