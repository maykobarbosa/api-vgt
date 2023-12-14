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
exports.CollaboratorController = void 0;
var prismaClient_1 = require("../database/prismaClient");
var CollaboratorController = /** @class */ (function () {
    function CollaboratorController() {
    }
    CollaboratorController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, companyId, peopleId, validaCompany, validaPeople, validaCollaborator, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, companyId = _a.companyId, peopleId = _a.peopleId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    id: {
                                        equals: companyId
                                    }
                                }
                            })];
                    case 1:
                        validaCompany = _b.sent();
                        if (validaCompany.length == 0) {
                            throw Error("Empresa não encontrada!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.people.findMany({
                                where: {
                                    id: {
                                        equals: peopleId
                                    }
                                }
                            })];
                    case 2:
                        validaPeople = _b.sent();
                        if (validaPeople.length == 0) {
                            throw Error("Pessoa não encontrada!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.collaborator.findMany({
                                where: {
                                    AND: [
                                        {
                                            peopleId: peopleId
                                        },
                                        {
                                            companyId: companyId
                                        }
                                    ]
                                }
                            })];
                    case 3:
                        validaCollaborator = _b.sent();
                        if (validaCollaborator.length != 0) {
                            throw Error("A pessoa foi adicionada anteriormente como colaborador!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.collaborator.create({
                                data: {
                                    companyId: companyId,
                                    peopleId: peopleId
                                }
                            })];
                    case 4:
                        result = _b.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    CollaboratorController.prototype.searchByCompany = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var companyId, validaCompany, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        companyId = request.params.companyId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.companies.findMany({
                                where: {
                                    id: {
                                        equals: companyId
                                    }
                                }
                            })];
                    case 1:
                        validaCompany = _a.sent();
                        if (validaCompany.length == 0) {
                            throw Error("Empresa não encontrada!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.collaborator.findMany({
                                where: {
                                    companyId: companyId
                                },
                                include: {
                                    people: true
                                }
                            })];
                    case 2:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    CollaboratorController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, releases;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        return [4 /*yield*/, prismaClient_1.prismaClient.collaborator.findMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        releases = _a.sent();
                        if (releases.length == 0) {
                            throw new Error("Colaborador não encontrado!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.collaborator.delete({
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
    return CollaboratorController;
}());
exports.CollaboratorController = CollaboratorController;
//# sourceMappingURL=CollaboratorController.js.map