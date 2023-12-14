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
exports.CompanyController = void 0;
var prismaClient_1 = require("../database/prismaClient");
var file_1 = require("../config/file");
var CompanyController = /** @class */ (function () {
    function CompanyController() {
    }
    CompanyController.prototype.create = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, name, description, sector, address, city, state, zip, email, phone, website, equity, authorId, avatar, valida, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = request.body, name = _b.name, description = _b.description, sector = _b.sector, address = _b.address, city = _b.city, state = _b.state, zip = _b.zip, email = _b.email, phone = _b.phone, website = _b.website, equity = _b.equity, authorId = _b.authorId;
                        avatar = String((_a = request.file) === null || _a === void 0 ? void 0 : _a.filename);
                        if (!name) return [3 /*break*/, 2];
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    name: {
                                        equals: name
                                    }
                                }
                            })];
                    case 1:
                        valida = _c.sent();
                        if (valida.length != 0) {
                            (0, file_1.deleteFile)("./public/img/company/".concat(avatar));
                            throw Error("Já possui uma empresa cadastrada com este nome!");
                        }
                        _c.label = 2;
                    case 2: return [4 /*yield*/, prismaClient_1.prismaClient.companies.create({
                            data: {
                                avatar: avatar,
                                name: name,
                                description: description,
                                sector: sector,
                                address: address,
                                city: city,
                                state: state,
                                zip: zip,
                                email: email,
                                phone: phone,
                                website: website,
                                equity: equity,
                                status: "pending",
                                ownerId: authorId,
                                authorId: authorId
                            }
                        })];
                    case 3:
                        result = _c.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    CompanyController.prototype.searchOne = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, userId, companies;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, id = _a.id, userId = _a.userId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                include: {
                                    realeases: {
                                        orderBy: [
                                            {
                                                year: "desc",
                                            },
                                            {
                                                month: "desc",
                                            }
                                        ],
                                        take: 1 // Limita a consulta para trazer apenas o registro mais recente da TabelaB.
                                    },
                                    _count: {
                                        select: {
                                            partner: true,
                                            collaborator: true
                                        }
                                    }
                                },
                                where: {
                                    AND: [
                                        {
                                            id: id
                                        },
                                        {
                                            OR: [
                                                {
                                                    ownerId: {
                                                        equals: userId
                                                    }
                                                },
                                                {
                                                    group: {
                                                        some: {
                                                            AND: [
                                                                {
                                                                    memberId: {
                                                                        equals: userId
                                                                    },
                                                                    status: "APROVADO"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                            })];
                    case 1:
                        companies = _b.sent();
                        if (companies.length == 0) {
                            throw new Error("Empresa não encontrada, ou você não tem acesso!");
                        }
                        return [2 /*return*/, response.json(companies[0])];
                }
            });
        });
    };
    CompanyController.prototype.byId = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findUnique({
                                where: { id: id },
                                include: {
                                    realeases: {
                                        orderBy: [
                                            {
                                                year: "desc",
                                            },
                                            {
                                                month: "desc",
                                            }
                                        ],
                                        take: 1 // Limita a consulta para trazer apenas o registro mais recente da TabelaB.
                                    },
                                    _count: {
                                        select: {
                                            partner: true,
                                            collaborator: true
                                        }
                                    }
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        if (!result) {
                            throw new Error("Empresa não encontrada!");
                        }
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    CompanyController.prototype.total = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var userId, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userId = request.params.userId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.count({
                                where: {
                                    OR: [
                                        {
                                            ownerId: {
                                                equals: userId
                                            }
                                        },
                                        {
                                            group: {
                                                some: {
                                                    AND: [
                                                        {
                                                            memberId: {
                                                                equals: userId
                                                            },
                                                            status: "APROVADO"
                                                        }
                                                    ]
                                                }
                                            }
                                        }
                                    ]
                                },
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    CompanyController.prototype.searchAll = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pag, status, userId, result, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, pag = _a.pag, status = _a.status, userId = _a.userId;
                        if (!(status == "null")) return [3 /*break*/, 2];
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    AND: [
                                        {
                                            OR: [
                                                {
                                                    ownerId: {
                                                        equals: userId
                                                    }
                                                },
                                                {
                                                    group: {
                                                        some: {
                                                            AND: [
                                                                {
                                                                    memberId: {
                                                                        equals: userId
                                                                    },
                                                                    status: "APROVADO"
                                                                }
                                                            ]
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                include: {
                                    realeases: {
                                        orderBy: [
                                            {
                                                year: "desc",
                                            },
                                            {
                                                month: "desc",
                                            }
                                        ],
                                        take: 1 // Limita a consulta para trazer apenas o registro mais recente da TabelaB.
                                    },
                                    valuation: {
                                        orderBy: { date_create: "desc" },
                                        take: 1
                                    },
                                    _count: {
                                        select: {
                                            partner: true,
                                            collaborator: true
                                        }
                                    }
                                },
                                skip: Number(pag) * 9,
                                take: 9,
                                orderBy: {
                                    date_create: 'desc'
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                            where: {
                                AND: [
                                    {
                                        status: {
                                            equals: status
                                        }
                                    },
                                    {
                                        OR: [
                                            {
                                                ownerId: {
                                                    equals: userId
                                                }
                                            },
                                            {
                                                group: {
                                                    some: {
                                                        AND: [
                                                            {
                                                                memberId: {
                                                                    equals: userId
                                                                },
                                                                status: "APROVADO"
                                                            }
                                                        ]
                                                    }
                                                }
                                            }
                                        ]
                                    }
                                ]
                            },
                            include: {
                                realeases: {
                                    orderBy: [
                                        {
                                            year: "desc",
                                        },
                                        {
                                            month: "desc",
                                        }
                                    ],
                                    take: 1 // Limita a consulta para trazer apenas o registro mais recente da TabelaB.
                                },
                                valuation: {
                                    orderBy: { date_create: "desc" },
                                    take: 1
                                },
                                _count: {
                                    select: {
                                        partner: true,
                                        collaborator: true
                                    }
                                }
                            },
                            skip: Number(pag) * 9,
                            take: 9,
                            orderBy: {
                                date_create: 'desc'
                            }
                        })];
                    case 3:
                        result = _b.sent();
                        _b.label = 4;
                    case 4: return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    CompanyController.prototype.list = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var pag, result, total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pag = request.params.pag;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    status: {
                                        equals: "approved"
                                    }
                                },
                                skip: Number(pag) * 9,
                                take: 9,
                                orderBy: {
                                    date_create: 'desc'
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.count({
                                where: {
                                    status: {
                                        equals: "approved"
                                    }
                                },
                            })];
                    case 2:
                        total = _a.sent();
                        return [2 /*return*/, response.json({
                                companies: result,
                                total: total
                            })];
                }
            });
        });
    };
    CompanyController.prototype.listByStatus = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, pag, result, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, status = _a.status, pag = _a.pag;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    status: {
                                        equals: status
                                    }
                                },
                                skip: Number(pag) * 9,
                                take: 9,
                                orderBy: {
                                    date_create: 'desc'
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.count({
                                where: {
                                    status: {
                                        equals: status
                                    }
                                },
                            })];
                    case 2:
                        total = _b.sent();
                        return [2 /*return*/, response.json({
                                companies: result,
                                total: total
                            })];
                }
            });
        });
    };
    CompanyController.prototype.validCompany = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, id, authorId, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, status = _a.status, id = _a.id, authorId = _a.authorId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.update({
                                where: id,
                                data: {
                                    status: status,
                                    authorId: authorId
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    CompanyController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, userId, companies;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, id = _a.id, userId = _a.userId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    AND: [
                                        {
                                            id: id
                                        },
                                        {
                                            OR: [
                                                {
                                                    ownerId: {
                                                        equals: userId
                                                    }
                                                },
                                                {
                                                    group: {
                                                        some: {
                                                            memberId: {
                                                                equals: userId
                                                            }
                                                        }
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                            })];
                    case 1:
                        companies = _b.sent();
                        if (companies.length == 0) {
                            throw new Error("Empresa não encontrada, ou você não tem acesso!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.delete({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        _b.sent();
                        (0, file_1.deleteFile)("./public/img/company/".concat(companies[0].avatar));
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    CompanyController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, description, sector, address, city, state, zip, email, phone, website, equity, authorId, companies, result_1, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, id = _a.id, name = _a.name, description = _a.description, sector = _a.sector, address = _a.address, city = _a.city, state = _a.state, zip = _a.zip, email = _a.email, phone = _a.phone, website = _a.website, equity = _a.equity, authorId = _a.authorId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    id: id
                                },
                            })];
                    case 1:
                        companies = _b.sent();
                        if (companies.length == 0) {
                            throw new Error("Empresa não encontrada, ou você não tem permissão para esta ação!");
                        }
                        if (!(name != companies[0].name)) return [3 /*break*/, 3];
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    name: name
                                }
                            })];
                    case 2:
                        result_1 = _b.sent();
                        if (result_1.length > 0) {
                            throw new Error("Já existe uma empresa cadastrada com o nome informado!");
                        }
                        _b.label = 3;
                    case 3: return [4 /*yield*/, prismaClient_1.prismaClient.companies.update({
                            where: {
                                id: id
                            },
                            data: {
                                name: name,
                                description: description,
                                sector: sector,
                                address: address,
                                city: city,
                                state: state,
                                zip: zip,
                                email: email,
                                phone: phone,
                                website: website,
                                equity: equity,
                                authorId: authorId
                            }
                        })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    CompanyController.prototype.updateAvatar = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, id, userId, avatar, companies, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = request.body, id = _b.id, userId = _b.userId;
                        avatar = String((_a = request.file) === null || _a === void 0 ? void 0 : _a.filename);
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    AND: [
                                        {
                                            id: id
                                        },
                                        {
                                            ownerId: {
                                                equals: userId
                                            }
                                        },
                                    ]
                                },
                            })];
                    case 1:
                        companies = _c.sent();
                        if (companies.length == 0) {
                            (0, file_1.deleteFile)("./public/img/company/".concat(avatar));
                            throw new Error("Empresa não encontrada, ou você não tem acesso!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    avatar: avatar,
                                    authorId: userId
                                }
                            })];
                    case 2:
                        result = _c.sent();
                        if (result)
                            (0, file_1.deleteFile)("./public/img/company/".concat(companies[0].avatar));
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    return CompanyController;
}());
exports.CompanyController = CompanyController;
//# sourceMappingURL=CompanyController.js.map