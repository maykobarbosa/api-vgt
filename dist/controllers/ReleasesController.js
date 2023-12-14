"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReleasesController = void 0;
var prismaClient_1 = require("../database/prismaClient");
var ReleasesController = /** @class */ (function () {
    function ReleasesController() {
    }
    ReleasesController.prototype.create = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, companyId, month, year, lucroLiquido, receitaLiquida, despesaBruta, authorId, docs, user, validaID, validaAuthor, validaReleases, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = request.body, companyId = _b.companyId, month = _b.month, year = _b.year, lucroLiquido = _b.lucroLiquido, receitaLiquida = _b.receitaLiquida, despesaBruta = _b.despesaBruta, authorId = _b.authorId;
                        docs = String((_a = request.file) === null || _a === void 0 ? void 0 : _a.filename);
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                                where: {
                                    id: authorId
                                }
                            })];
                    case 1:
                        user = _c.sent();
                        if (!!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                                where: {
                                    email: authorId
                                }
                            })];
                    case 2:
                        user = _c.sent();
                        _c.label = 3;
                    case 3:
                        if (!user) {
                            throw new Error("Usuário authenticado não foi cadastrado!");
                        }
                        if (month > 12 || month == 0) {
                            throw Error("Mês inválido!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    id: {
                                        equals: companyId
                                    }
                                }
                            })];
                    case 4:
                        validaID = _c.sent();
                        if (validaID.length == 0) {
                            throw Error("Empresa não encontrada!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                where: {
                                    id: {
                                        equals: user.id
                                    }
                                }
                            })];
                    case 5:
                        validaAuthor = _c.sent();
                        if (validaAuthor.length == 0) {
                            throw Error("Autor não encontrado!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.releases.findMany({
                                where: {
                                    AND: [
                                        {
                                            companyId: companyId
                                        },
                                        {
                                            month: Number(month)
                                        },
                                        {
                                            year: Number(year)
                                        }
                                    ]
                                }
                            })];
                    case 6:
                        validaReleases = _c.sent();
                        if (validaReleases.length != 0) {
                            throw Error("Voc\u00EA s\u00F3 pode fazer um lan\u00E7amento por m\u00EAs!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.releases.create({
                                data: {
                                    companyId: companyId,
                                    month: Number(month),
                                    year: Number(year),
                                    valuation: 0,
                                    lucroLiquido: Number(lucroLiquido),
                                    receitaLiquida: Number(receitaLiquida),
                                    despesaBruta: Number(despesaBruta),
                                    docs: docs,
                                    authorId: user.id
                                }
                            })];
                    case 7:
                        result = _c.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    ReleasesController.prototype.searchMonthYear = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, companyId, month, year, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, companyId = _a.companyId, month = _a.month, year = _a.year;
                        return [4 /*yield*/, prismaClient_1.prismaClient.releases.findMany({
                                where: {
                                    AND: [
                                        {
                                            companyId: companyId
                                        },
                                        {
                                            month: month
                                        },
                                        {
                                            year: year
                                        }
                                    ]
                                }
                            })
                            // if (result.length == 0) {
                            //     throw new Error("Não existe lançamento para o período informado!")
                            // }        
                        ];
                    case 1:
                        result = _b.sent();
                        // if (result.length == 0) {
                        //     throw new Error("Não existe lançamento para o período informado!")
                        // }        
                        return [2 /*return*/, response.json(result[0])];
                }
            });
        });
    };
    ReleasesController.prototype.searchYear = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, companyId, year, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, companyId = _a.companyId, year = _a.year;
                        return [4 /*yield*/, prismaClient_1.prismaClient.releases.findMany({
                                where: {
                                    AND: [
                                        {
                                            companyId: companyId
                                        },
                                        {
                                            year: Number(year)
                                        }
                                    ]
                                },
                                include: {
                                    author: true
                                },
                                orderBy: {
                                    month: "asc"
                                }
                            })
                            // if (result.length == 0) {
                            //     throw new Error("Não existe lançamento para o ano informado!")
                            // }        
                        ];
                    case 1:
                        result = _b.sent();
                        // if (result.length == 0) {
                        //     throw new Error("Não existe lançamento para o ano informado!")
                        // }        
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    ReleasesController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, releases;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, prismaClient_1.prismaClient.releases.findMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        releases = _a.sent();
                        if (releases.length == 0) {
                            throw new Error("Lançamento não encontrado!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.releases.delete({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    ReleasesController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, 
            // valuation,
            lucroLiquido, receitaLiquida, despesaBruta, authorId, user, releases, validaAuthor, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, id = _a.id, lucroLiquido = _a.lucroLiquido, receitaLiquida = _a.receitaLiquida, despesaBruta = _a.despesaBruta, authorId = _a.authorId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                                where: {
                                    id: authorId
                                }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!!user) return [3 /*break*/, 3];
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                                where: {
                                    email: authorId
                                }
                            })];
                    case 2:
                        user = _b.sent();
                        _b.label = 3;
                    case 3:
                        if (!user) {
                            throw new Error("Usuário authenticado não foi cadastrado!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.releases.findMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 4:
                        releases = _b.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                where: {
                                    id: {
                                        equals: user.id
                                    }
                                }
                            })];
                    case 5:
                        validaAuthor = _b.sent();
                        if (validaAuthor.length == 0) {
                            throw Error("Autor não encontrado!");
                        }
                        if (releases.length == 0) {
                            throw new Error("Lançamento não encontrado!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.releases.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    // valuation,
                                    lucroLiquido: lucroLiquido,
                                    receitaLiquida: receitaLiquida,
                                    despesaBruta: despesaBruta,
                                    authorId: user.id
                                }
                            })];
                    case 6:
                        result = _b.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    return ReleasesController;
}());
exports.ReleasesController = ReleasesController;
//# sourceMappingURL=ReleasesController.js.map