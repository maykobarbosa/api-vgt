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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var prismaClient_1 = require("../database/prismaClient");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var nodemailer_1 = __importDefault(require("nodemailer"));
var recoverPassword_1 = require("../templateEmail/recoverPassword");
var crypto_1 = __importDefault(require("crypto"));
var file_1 = require("../config/file");
var sendMessage_1 = require("../utils/sendMessage");
var decodeToken_1 = require("../config/decodeToken");
var UserController = /** @class */ (function () {
    function UserController() {
    }
    UserController.prototype.create = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, full_name, fone, password, rep_password, profile, result, checkPassword, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, full_name = _a.full_name, fone = _a.fone, password = _a.password, rep_password = _a.rep_password, profile = _a.profile;
                        if (!email) return [3 /*break*/, 2];
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                where: {
                                    email: {
                                        equals: email
                                    }
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        if (result.length != 0) {
                            throw Error("Já possui uma conta cadastrada com este e-mail!");
                        }
                        _b.label = 2;
                    case 2:
                        if (password != rep_password) {
                            throw Error("As senhas não coincidem");
                        }
                        checkPassword = bcrypt_1.default.hashSync(password, 10);
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.create({
                                data: {
                                    email: email,
                                    full_name: full_name,
                                    fone: fone,
                                    password: checkPassword,
                                    profile: profile
                                }
                            })];
                    case 3:
                        user = _b.sent();
                        return [4 /*yield*/, (0, sendMessage_1.SendMessageToMe)(fone.toString(), "Ol\u00E1 *".concat(full_name, "*, muito obrigado por se cadastrar em nosso sistema, aqui te manterei informado de todas as atualiza\u00E7\u00F5es, seja muito bem vindo!"))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, response.json(user)];
                }
            });
        });
    };
    UserController.prototype.create2 = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, full_name, fone, password, he_knew, business, help, message, profile, result, checkPassword, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, full_name = _a.full_name, fone = _a.fone, password = _a.password, he_knew = _a.he_knew, business = _a.business, help = _a.help, message = _a.message, profile = _a.profile;
                        if (!email) return [3 /*break*/, 2];
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                where: {
                                    email: {
                                        equals: email
                                    }
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        if (result.length != 0) {
                            throw Error("Já possui uma conta cadastrada com este e-mail!");
                        }
                        _b.label = 2;
                    case 2:
                        checkPassword = bcrypt_1.default.hashSync(password, 10);
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.create({
                                data: {
                                    email: email,
                                    full_name: full_name,
                                    fone: fone,
                                    he_knew: he_knew,
                                    business: business,
                                    help: help,
                                    message: message,
                                    password: checkPassword,
                                    profile: profile
                                }
                            })];
                    case 3:
                        user = _b.sent();
                        return [4 /*yield*/, (0, sendMessage_1.SendMessageToMe)(fone.toString(), "Ol\u00E1 *".concat(full_name.toUpperCase(), "*, muito obrigado por se cadastrar em nosso sistema, aqui te manterei informado de todas as atualiza\u00E7\u00F5es, seja muito bem vindo!"))];
                    case 4:
                        _b.sent();
                        return [4 /*yield*/, (0, sendMessage_1.SendMessageToAdmin)("Um novo cadastro foi realizado na VGT\n\nNome: *".concat(full_name.toUpperCase(), "*\nTel: *").concat(fone, "*\nEmail: ").concat(email, "\n\nQual o seu neg\u00F3cio?\n*").concat(business, "*\n\nComo podemos te Ajudar?\n*").concat(help, "*\n\nOnde conheceu a VGT?\n*").concat(he_knew, "*"))];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, response.json(user)];
                }
            });
        });
    };
    UserController.prototype.create3 = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, full_name, fone, password, status, how_long_do_you_invest, main_investments, sources_of_income, annual_income_ornet_worth, goal, what_are_your_growth_expectations, link_or_social_networks, profile, result, checkPassword, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, full_name = _a.full_name, fone = _a.fone, password = _a.password, status = _a.status, how_long_do_you_invest = _a.how_long_do_you_invest, main_investments = _a.main_investments, sources_of_income = _a.sources_of_income, annual_income_ornet_worth = _a.annual_income_ornet_worth, goal = _a.goal, what_are_your_growth_expectations = _a.what_are_your_growth_expectations, link_or_social_networks = _a.link_or_social_networks, profile = _a.profile;
                        if (!email) return [3 /*break*/, 2];
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                where: {
                                    email: {
                                        equals: email
                                    }
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        if (result.length != 0) {
                            throw Error("Já possui uma conta cadastrada com este e-mail!");
                        }
                        _b.label = 2;
                    case 2:
                        checkPassword = bcrypt_1.default.hashSync(password, 10);
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.create({
                                data: {
                                    email: email,
                                    full_name: full_name,
                                    fone: fone,
                                    status: status,
                                    how_long_do_you_invest: how_long_do_you_invest,
                                    main_investments: main_investments,
                                    sources_of_income: sources_of_income,
                                    annual_income_ornet_worth: annual_income_ornet_worth,
                                    goal: goal,
                                    what_are_your_growth_expectations: what_are_your_growth_expectations,
                                    link_or_social_networks: link_or_social_networks,
                                    password: checkPassword,
                                    profile: profile
                                }
                            })
                            // await SendMessageToMe(
                            //     fone.toString(), 
                            //     `Olá *${full_name.toUpperCase()}*, muito obrigado por se cadastrar em nosso sistema, aqui te manterei informado de todas as atualizações, seja muito bem vindo!`
                            // )
                            // await SendMessageToAdmin(
                            //     `Um novo cadastro foi realizado na VGT\n\nNome: *${full_name.toUpperCase()}*\nTel: *${fone}*\nEmail: ${email}\n\nQual o seu negócio?\n*${business}*\n\nComo podemos te Ajudar?\n*${help}*\n\nOnde conheceu a VGT?\n*${he_knew}*`
                            // )
                        ];
                    case 3:
                        user = _b.sent();
                        // await SendMessageToMe(
                        //     fone.toString(), 
                        //     `Olá *${full_name.toUpperCase()}*, muito obrigado por se cadastrar em nosso sistema, aqui te manterei informado de todas as atualizações, seja muito bem vindo!`
                        // )
                        // await SendMessageToAdmin(
                        //     `Um novo cadastro foi realizado na VGT\n\nNome: *${full_name.toUpperCase()}*\nTel: *${fone}*\nEmail: ${email}\n\nQual o seu negócio?\n*${business}*\n\nComo podemos te Ajudar?\n*${help}*\n\nOnde conheceu a VGT?\n*${he_knew}*`
                        // )
                        return [2 /*return*/, response.json(user)];
                }
            });
        });
    };
    UserController.prototype.createWithGoogle = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, full_name, avatar, result, checkPassword, user;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, full_name = _a.full_name, avatar = _a.avatar;
                        if (!email) return [3 /*break*/, 2];
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                where: {
                                    email: {
                                        equals: email
                                    }
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        if (result.length != 0) {
                            throw Error("Já possui uma conta cadastrada com este e-mail!");
                        }
                        _b.label = 2;
                    case 2:
                        checkPassword = bcrypt_1.default.hashSync("123456", 10);
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.create({
                                data: {
                                    avatar: avatar,
                                    email: email,
                                    full_name: full_name,
                                    fone: " ",
                                    password: checkPassword,
                                    profile: "100"
                                }
                            })];
                    case 3:
                        user = _b.sent();
                        return [2 /*return*/, response.json(user)];
                }
            });
        });
    };
    UserController.prototype.existed = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.params.email;
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                                where: {
                                    email: email
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    UserController.prototype.consultaOne = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var id, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = request.params.id;
                        if (!id) return [3 /*break*/, 2];
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.totalUsers = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, prismaClient_1.prismaClient.users.count()];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    UserController.prototype.list = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var pag, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pag = request.params.pag;
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                // skip: Number(pag),
                                // take: 10,
                                orderBy: {
                                    date_create: 'desc'
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    UserController.prototype.findByStatus = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var pag, authHeader, token, secret, decoded, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        pag = request.params.pag;
                        authHeader = request.headers.authorization;
                        token = authHeader && authHeader.split(" ")[1];
                        secret = "7d14e4b1831c8aa556f9720b5f74c4d7";
                        if (!token) {
                            return [2 /*return*/, response.status(401).json({ message: "Invalid token" })];
                        }
                        decoded = (0, decodeToken_1.decodeToken)(token, String(secret));
                        if (!decoded) {
                            throw Error("Error decoding token!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                skip: Number(pag) * 20,
                                take: 20,
                                orderBy: { date_update: "desc" },
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result.map(function (i) {
                                return ({
                                    id: i.id,
                                    name: i.full_name,
                                    email: i.email,
                                    phone: i.fone,
                                    he_knew: i.he_knew,
                                    business: i.business,
                                    help: i.help,
                                    message: i.message,
                                    date_update: i.date_update,
                                    date_create: i.date_create,
                                });
                            }))];
                }
            });
        });
    };
    UserController.prototype.authenticate = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, user, checkPassword, token, isCompanyAproved, i;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, password = _a.password;
                        if (!email) {
                            throw new Error("O e-mail é obrigatório!");
                        }
                        if (!password) {
                            throw new Error("A senha é obrigatória!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                                where: {
                                    email: email
                                },
                                include: {
                                    companies: true
                                }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            throw new Error("Usuário não encontrado!");
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        checkPassword = _b.sent();
                        if (!checkPassword) {
                            throw new Error("E-mail e/ou senha incorretos!");
                        }
                        if (user.status === "pendente") {
                            throw new Error("Seu cadastro ainda não foi aprovado pelo setor de análise!");
                        }
                        token = jsonwebtoken_1.default.sign({
                            id: user.id,
                        }, "7d14e4b1831c8aa556f9720b5f74c4d7", {
                            subject: user.id,
                            expiresIn: '1h'
                        });
                        isCompanyAproved = false;
                        i = user.companies.filter(function (i) { return i.status === "aprovado"; });
                        if (i.length > 0) {
                            isCompanyAproved = true;
                        }
                        return [2 /*return*/, response.status(200).json({ msg: "Authentication success!", token: token, user: {
                                    id: user.id,
                                    email: user.email,
                                    full_name: user.full_name,
                                    fone: user.fone,
                                    profile: user.profile,
                                    isCompanyAproved: isCompanyAproved,
                                    avatar: "".concat(process.env.URL_PHOTOS_API, "/img/people/").concat(user.avatar)
                                } })];
                }
            });
        });
    };
    UserController.prototype.updatePhone = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var phone, authHeader, token, secret, decoded, result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        phone = request.body.phone;
                        authHeader = request.headers.authorization;
                        token = authHeader && authHeader.split(" ")[1];
                        secret = "7d14e4b1831c8aa556f9720b5f74c4d7";
                        if (!token) {
                            return [2 /*return*/, response.status(401).json({ message: "Invalid token" })];
                        }
                        decoded = (0, decodeToken_1.decodeToken)(token, String(secret));
                        if (!decoded) {
                            throw Error("Error decoding token!");
                        }
                        if (!decoded.isAdmin) {
                            throw Error("Access denied");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.update({
                                where: {
                                    id: decoded.id
                                },
                                data: {
                                    fone: phone
                                }
                            })];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    UserController.prototype.refreshToken = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var refreshToken, decoded, user, token, isCompanyAproved, i, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        refreshToken = request.body.refreshToken;
                        if (!refreshToken) {
                            return [2 /*return*/, response.status(400).send("Refresh token not found")];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        decoded = jsonwebtoken_1.default.verify(refreshToken, "7d14e4b1831c8aa556f9720b5f74c4d7");
                        if (!(decoded.exp < Date.now() / 1000)) return [3 /*break*/, 2];
                        return [2 /*return*/, response.status(401).send("Token expirado!")];
                    case 2: return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                            where: {
                                id: decoded.id
                            },
                            include: {
                                companies: true
                            }
                        })];
                    case 3:
                        user = _a.sent();
                        if (!user) {
                            return [2 /*return*/, response.status(401).send("Invalid refresh token")];
                        }
                        token = jsonwebtoken_1.default.sign({
                            id: user.id,
                        }, "7d14e4b1831c8aa556f9720b5f74c4d7", {
                            subject: user.id,
                            expiresIn: '1h'
                        });
                        isCompanyAproved = false;
                        i = user.companies.filter(function (i) { return i.status === "aprovado"; });
                        if (i.length > 0) {
                            isCompanyAproved = true;
                        }
                        return [2 /*return*/, response.status(200).json({ msg: "Authentication success!", token: token, user: {
                                    id: user.id,
                                    email: user.email,
                                    full_name: user.full_name,
                                    fone: user.fone,
                                    profile: user.profile,
                                    isCompanyAproved: isCompanyAproved,
                                    avatar: "".concat(process.env.URL_PHOTOS_API, "/img/people/").concat(user.avatar)
                                } })];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        err_1 = _a.sent();
                        console.error(err_1);
                        return [2 /*return*/, response.status(500).send("Internal server error")];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.delete = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.params.email;
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.delete({
                                where: {
                                    email: email
                                }
                            })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    UserController.prototype.update = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, id, email, full_name, fone, current_password, password, rep_password, profile, user, checkPassword, new_password;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, id = _a.id, email = _a.email, full_name = _a.full_name, fone = _a.fone, current_password = _a.current_password, password = _a.password, rep_password = _a.rep_password, profile = _a.profile;
                        if (!(rep_password != password)) return [3 /*break*/, 1];
                        throw Error("As senhas não coincidem");
                    case 1:
                        if (!(current_password && password)) return [3 /*break*/, 5];
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                                where: {
                                    id: id
                                }
                            })];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            throw new Error("Usuário não encontrado!");
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(current_password, user.password)];
                    case 3:
                        checkPassword = _b.sent();
                        new_password = bcrypt_1.default.hashSync(password, 10);
                        if (!checkPassword) {
                            throw new Error("Senha atual inválida!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.update({
                                where: {
                                    id: id
                                },
                                data: {
                                    email: email,
                                    full_name: full_name,
                                    fone: fone,
                                    password: new_password,
                                    profile: profile
                                }
                            })];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, prismaClient_1.prismaClient.users.update({
                            where: {
                                id: id
                            },
                            data: {
                                email: email,
                                full_name: full_name,
                                fone: fone,
                                profile: profile
                            }
                        })];
                    case 6:
                        _b.sent();
                        _b.label = 7;
                    case 7: return [2 /*return*/, response.json()];
                }
            });
        });
    };
    UserController.prototype.sendMailRecover = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, token, SMTP_CONFIG, transporter, templateEmail, mailOptions, result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.body.email;
                        if (!email) {
                            throw new Error("O e-mail é obrigatório!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                                where: {
                                    email: email
                                }
                            })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new Error("Usuário não encontrado!");
                        }
                        token = crypto_1.default.randomBytes(3).toString('hex').toUpperCase();
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.update({
                                where: {
                                    id: user.id
                                },
                                data: {
                                    token_recover_password: token
                                }
                            })];
                    case 2:
                        _a.sent();
                        SMTP_CONFIG = require('../config/smtp');
                        transporter = nodemailer_1.default.createTransport({
                            host: SMTP_CONFIG.host,
                            port: SMTP_CONFIG.port,
                            secure: false,
                            auth: {
                                user: SMTP_CONFIG.user,
                                pass: SMTP_CONFIG.pass
                            },
                            tls: {
                                rejectUnauthorized: false
                            }
                        });
                        templateEmail = (0, recoverPassword_1.RecoverPassword)(user.full_name.toUpperCase(), token);
                        mailOptions = {
                            from: SMTP_CONFIG.user,
                            to: email,
                            subject: "VGT - Redefinição de senha",
                            html: templateEmail,
                        };
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        return [4 /*yield*/, transporter.sendMail(mailOptions)];
                    case 4:
                        result = _a.sent();
                        return [2 /*return*/, response.json(result)];
                    case 5:
                        error_1 = _a.sent();
                        return [2 /*return*/, response.json(error_1)];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updatePassword = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, code, pass, confirmPass, password, user, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, code = _a.code, pass = _a.pass, confirmPass = _a.confirmPass;
                        if (pass != confirmPass) {
                            throw Error("As senhas não coincidem");
                        }
                        return [4 /*yield*/, bcrypt_1.default.hashSync(pass, 10)];
                    case 1:
                        password = _b.sent();
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findUnique({
                                where: {
                                    token_recover_password: code
                                }
                            })];
                    case 2:
                        user = _b.sent();
                        if (!user) {
                            throw new Error("Código inválido!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.update({
                                where: {
                                    email: user.email
                                },
                                data: {
                                    token_recover_password: null,
                                    password: password
                                }
                            })];
                    case 3:
                        result = _b.sent();
                        try {
                            return [2 /*return*/, response.json(result)];
                        }
                        catch (error) {
                            return [2 /*return*/, response.json(error)];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.updateAvatar = function (request, response) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var id, avatar, users, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        id = request.body.id;
                        avatar = String((_a = request.file) === null || _a === void 0 ? void 0 : _a.filename);
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                where: {
                                    id: id
                                }
                            })];
                    case 1:
                        users = _b.sent();
                        if (users.length == 0) {
                            (0, file_1.deleteFile)("./public/img/people/".concat(avatar));
                            throw new Error("Usuário não encontrado!");
                        }
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.update({
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
                            (0, file_1.deleteFile)("./public/img/people/".concat(users[0].avatar));
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    UserController.prototype.validUser = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, id, authorId;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, status = _a.status, id = _a.id, authorId = _a.authorId;
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.update({
                                where: id,
                                data: {
                                    status: status,
                                    authorId: authorId
                                }
                            })];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, response.json()];
                }
            });
        });
    };
    UserController.prototype.findByStatusInvestor = function (request, response) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, status, pag, result;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.params, status = _a.status, pag = _a.pag;
                        return [4 /*yield*/, prismaClient_1.prismaClient.users.findMany({
                                where: {
                                    status: status
                                },
                                skip: Number(pag) * 10,
                                take: 10,
                                orderBy: {
                                    date_create: 'desc'
                                }
                            })];
                    case 1:
                        result = _b.sent();
                        return [2 /*return*/, response.json(result)];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map