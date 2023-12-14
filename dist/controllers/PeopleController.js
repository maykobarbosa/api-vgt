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
exports.PeopleController = void 0;
var file_1 = require("../config/file");
var prismaClient_1 = require("../database/prismaClient");
var PeopleController = /** @class */ (function () {
    function PeopleController() {
    }
    PeopleController.prototype.create = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var _b, name, office, description, email, contact, avatar, result_1, result;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = request.body, name = _b.name, office = _b.office, description = _b.description, email = _b.email, contact = _b.contact;
                        avatar = String((_a = request.file) === null || _a === void 0 ? void 0 : _a.filename);
                        if (!email) return [3 /*break*/, 2];
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.findMany({
                                where: {
                                    email: {
                                        equals: email
                                    }
                                }
                            })];
                    case 1:
                        result_1 = _c.sent();
                        if (result_1.length != 0) {
                            (0, file_1.deleteFile)("./public/img/people/".concat(avatar));
                            throw Error("Já possui uma pessoa cadastrada com este e-email!");
                        }
                        _c.label = 2;
                    case 2: return [4 /*yield*/, prismaClient_1.prismaClient.people.create({
                            data: {
                                avatar: avatar,
                                name: name,
                                office: office,
                                description: description,
                                email: email,
                                contact: contact
                            }
                        })];
                    case 3:
                        result = _c.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    PeopleController.prototype.searchOne = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, valida, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.findMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        valida = _a.sent();
                        if (valida.length == 0) {
                            throw new Error("Pessoa não encontrada!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.findUnique({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    PeopleController.prototype.total = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.people.count()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    PeopleController.prototype.searchAll = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, pag, name, result, total, result, total;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, pag = _a.pag, name = _a.name;
                        if (!(name == " ")) return [3 /*break*/, 3];
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.findMany({
                                skip: Number(pag),
                                take: 20,
                                orderBy: {
                                    date_create: 'desc'
                                },
                                include: {
                                    partner: {
                                        select: {
                                            company: {
                                                select: {
                                                    name: true
                                                }
                                            }
                                        }
                                    }
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.count()];
                    case 2:
                        total = _b.sent();
                        return [3 /*break*/, 6];
                    case 3: return [4 /*yield*/, prismaClient_1.prismaClient.people.findMany({
                            where: {
                                name: {
                                    contains: name
                                }
                            },
                            skip: Number(pag),
                            take: 20,
                            orderBy: {
                                date_create: 'desc'
                            },
                            include: {
                                partner: {
                                    select: {
                                        company: {
                                            select: {
                                                name: true
                                            }
                                        }
                                    }
                                }
                            }
                        })];
                    case 4:
                        result = _b.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.count({
                                where: {
                                    name: {
                                        contains: name
                                    }
                                }
                            })];
                    case 5:
                        total = _b.sent();
                        _b.label = 6;
                    case 6: return [2 /*return*/, response.json({
                            total: total,
                            pessoas: result.map(function (i) {
                                return ({
                                    id: i.id,
                                    name: i.name,
                                    avatar: "".concat(process.env.URL_PHOTOS_API, "/img/people/").concat(i.avatar),
                                    email: i.email,
                                    companies_partner: i.partner,
                                    office: i.office,
                                    description: i.description,
                                    contact: i.contact,
                                    date_update: i.date_update,
                                    date_create: i.date_create
                                });
                            })
                        })];
                }
            });
        });
    };
    PeopleController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, people, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.findMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        people = _a.sent();
                        if (people.length == 0) {
                            throw new Error("Pessoa não encontrada!");
                        }
                        _a.label = 2;
                    case 2:
                        _a.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.deleteMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 3:
                        result = _a.sent();
                        (0, file_1.deleteFile)("./public/img/people/".concat(people[0].avatar));
                        return [2 /*return*/, response.json(result)];
                    case 4:
                        error_1 = _a.sent();
                        throw new Error("O contato possui vínculo(s) com empresa(s)!");
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    PeopleController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, name, office, description, email, contact, people, people2, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, id = _a.id, name = _a.name, office = _a.office, description = _a.description, email = _a.email, contact = _a.contact;
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.findMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        people = _b.sent();
                        if (people.length == 0) {
                            throw new Error("Pessoa não encontrada!");
                        }
                        if (!(email != people[0].email)) return [3 /*break*/, 3];
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.findMany({
                                where: {
                                    email: email
                                }
                            })];
                    case 2:
                        people2 = _b.sent();
                        if (people2.length > 0) {
                            throw new Error("Já existe uma pessoa cadastrada com o e-email informado!");
                        }
                        _b.label = 3;
                    case 3: return [4 /*yield*/, prismaClient_1.prismaClient.people.update({
                            where: {
                                id: id
                            },
                            data: {
                                name: name,
                                office: office,
                                description: description,
                                email: email,
                                contact: contact
                            }
                        })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    PeopleController.prototype.updateAvatar = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, avatar, people, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.body.id;
                        avatar = String((_a = request.file) === null || _a === void 0 ? void 0 : _a.filename);
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.findMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        people = _b.sent();
                        if (people.length == 0) {
                            (0, file_1.deleteFile)("./public/img/people/".concat(avatar));
                            throw new Error("Pessoa não encontrada!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    avatar: avatar
                                }
                            })];
                    case 2:
                        result = _b.sent();
                        if (result)
                            (0, file_1.deleteFile)("./public/img/people/".concat(people[0].avatar));
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    return PeopleController;
}());
exports.PeopleController = PeopleController;
//# sourceMappingURL=PeopleController.js.map