"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.decodeToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function decodeToken(token, secret) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, secret);
        return decoded;
    }
    catch (error) {
        return null;
    }
}
exports.decodeToken = decodeToken;
//# sourceMappingURL=decodeToken.js.map