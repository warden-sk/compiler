"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./index.css");
const react_1 = __importDefault(require("react"));
const client_1 = __importDefault(require("react-dom/client"));
function Client() {
    return react_1.default.createElement("div", null, "Client");
}
if (typeof window !== 'undefined') {
    const container = window.document.getElementById('client');
    client_1.default.createRoot(container).render(react_1.default.createElement(Client, null));
}
exports.default = [react_1.default.createElement("div", { id: "client" }), { title: 'Client' }];
