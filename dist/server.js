"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("express-async-errors");
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var routes_1 = require("./routes/routes");
var app = (0, express_1.default)();
// app.use(limiter);
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "*");
    res.header("Origin, X-Requested-With, X-PINGOTHER, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE");
    res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
    app.use((0, cors_1.default)({
        origin: true
    }));
    next();
});
app.use(express_1.default.json());
app.use(routes_1.router);
app.use(function (err, request, response, next) {
    if (err instanceof Error) {
        return response.status(400).json({
            message: err.message,
        });
    }
    return response.status(500).json({
        status: "error",
        message: "Erro interno no servidor"
    });
});
//localhost:3333/
app.use(express_1.default.static('public'));
app.listen(36102, function () { return console.log("Servidor rodando na porta 36102!!"); });
//# sourceMappingURL=server.js.map