"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = void 0;
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function checkToken(req, res, next) {
    var authHeader = req.headers['authorization'];
    if (!authHeader) {
        return res.status(401).send({ auth: false, message: 'No token provided.' });
    }
    var token = authHeader && authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, "7d14e4b1831c8aa556f9720b5f74c4d7", function (err, decoded) {
        if (err) {
            return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
        }
        next();
    });
}
exports.checkToken = checkToken;
//# sourceMappingURL=validaToken.js.map