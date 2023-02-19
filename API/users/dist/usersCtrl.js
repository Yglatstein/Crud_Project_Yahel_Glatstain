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
        while (_) try {
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
exports.__esModule = true;
exports.getUserLogout = exports.postUserRegister = exports.postUserLogin = exports.getUserByCookie = exports.getAllUsers = void 0;
var userModel_1 = require("./userModel");
var jwt_simple_1 = require("jwt-simple");
var bcrypt_1 = require("bcrypt");
var saltRounds = 10;
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var usersDB, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, userModel_1["default"].find()];
                case 1:
                    usersDB = _a.sent();
                    if (!usersDB)
                        throw new Error("no errors found on FUNCTION getAllUsers IN FILE userCtrl");
                    res.send({ usersDB: usersDB });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _a.sent();
                    res.status(500).send({ error: error_1.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getAllUsers = getAllUsers;
function getUserByCookie(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var secret, userID, jwtUserId, userId, userDB, error_2;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    secret = process.env.SECRET;
                    userID = req.cookies.userID;
                    jwtUserId = jwt_simple_1["default"].decode(userID, secret);
                    userId = jwtUserId.userId;
                    return [4 /*yield*/, userModel_1["default"].findOne({ _id: userId })];
                case 1:
                    userDB = _a.sent();
                    if (!userDB)
                        throw new Error("No user found");
                    res.send(userDB);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _a.sent();
                    res.status(500).send({ error: error_2.message });
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.getUserByCookie = getUserByCookie;
function postUserLogin(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, userDB, isMatch, secret, cookie, JWTCookie, error_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password;
                    return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
                case 1:
                    userDB = _b.sent();
                    if (!userDB)
                        throw new Error("No user found");
                    return [4 /*yield*/, bcrypt_1["default"].compare(password, userDB.password)];
                case 2:
                    isMatch = _b.sent();
                    if (!isMatch)
                        throw new Error("wrong password, try again!");
                    secret = process.env.SECRET;
                    if (!secret)
                        throw new Error("Couldn't load secret from .env");
                    cookie = { userId: userDB._id };
                    JWTCookie = jwt_simple_1["default"].encode(cookie, secret);
                    console.log("Generated cookie ", JWTCookie);
                    res.cookie("userID", JWTCookie);
                    res.send({ success: true, user: { userDB: userDB } });
                    return [3 /*break*/, 4];
                case 3:
                    error_3 = _b.sent();
                    res.status(500).send({ error: error_3.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.postUserLogin = postUserLogin;
function postUserRegister(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var _a, email, password, imageLink, name, checkUserDB, salt, hash, userDB, secret, cookie, JWTCookie, error_4;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 3, , 4]);
                    _a = req.body, email = _a.email, password = _a.password, imageLink = _a.imageLink, name = _a.name;
                    if (!email || !password || !imageLink || !name)
                        throw new Error("some parameters are missing");
                    return [4 /*yield*/, userModel_1["default"].findOne({ email: email })];
                case 1:
                    checkUserDB = _b.sent();
                    if (checkUserDB)
                        throw new Error("email already in use");
                    salt = bcrypt_1["default"].genSaltSync(saltRounds);
                    hash = bcrypt_1["default"].hashSync(password, salt);
                    userDB = new userModel_1["default"]({ email: email, password: hash, image: imageLink, name: name });
                    return [4 /*yield*/, userDB.save()];
                case 2:
                    _b.sent();
                    secret = process.env.SECRET;
                    if (!secret)
                        throw new Error("secret value is missing");
                    cookie = { userId: userDB._id };
                    JWTCookie = jwt_simple_1["default"].encode(cookie, secret);
                    res.cookie("userID", JWTCookie);
                    res.send({ success: true, user: userDB });
                    console.log(req.body);
                    return [3 /*break*/, 4];
                case 3:
                    error_4 = _b.sent();
                    res.status(500).send({ error: error_4.message });
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.postUserRegister = postUserRegister;
function getUserLogout(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            try {
                res.clearCookie("userID");
                res.send({ success: true });
            }
            catch (error) {
                res.status(500).send({ error: error.message });
            }
            return [2 /*return*/];
        });
    });
}
exports.getUserLogout = getUserLogout;
