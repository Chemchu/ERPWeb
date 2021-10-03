"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const react_1 = __importDefault(require("react"));
function SubmitLogin(e) {
    console.log("Hacer lógica de login");
    axios_1.default.get('https://localhost:8080/api/productos/').then(res => console.log(res));
}
function LoginBox() {
    return (react_1.default.createElement("div", { className: "inner-container" },
        react_1.default.createElement("div", { className: "header" }, "Iniciar sesi\u00F3n"),
        react_1.default.createElement("div", { className: "box" },
            react_1.default.createElement("div", { className: "input-group" },
                react_1.default.createElement("label", { htmlFor: "username" }, "Usuario"),
                react_1.default.createElement("input", { type: "text", name: "username", className: "login-input", placeholder: "Username" })),
            react_1.default.createElement("div", { className: "input-group" },
                react_1.default.createElement("label", { htmlFor: "password" }, "Contrase\u00F1a"),
                react_1.default.createElement("input", { type: "password", name: "password", className: "login-input", placeholder: "Password" })),
            react_1.default.createElement("button", { type: "button", className: "login-btn", onClick: SubmitLogin }, "Acceder"))));
}
exports.default = LoginBox;
