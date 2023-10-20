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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.subscribeToDatabaseEvents = exports.checkConnectionStatus = exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const duna_web_platform_error_defs_1 = require("duna-web-platform-error-defs");
function connectToDatabase(url) {
    return __awaiter(this, void 0, void 0, function* () {
        yield mongoose_1.default.connect(url, {});
    });
}
exports.connectToDatabase = connectToDatabase;
function checkConnectionStatus() {
    // 1 ->  Connected
    if (mongoose_1.default.connection.readyState != 1) {
        const err = duna_web_platform_error_defs_1.ErrorMessages.InternalServerError;
        err.Details = `MongoDB disconnected`;
        throw err;
    }
}
exports.checkConnectionStatus = checkConnectionStatus;
function subscribeToDatabaseEvents() {
    mongoose_1.default.connection.on('connected', () => {
        console.log(`⚡️[database]: MongoDB connected`);
    });
    mongoose_1.default.connection.on('error', (error) => {
        console.log(`⚡️[database]: MongoDB Error - ${error}`);
    });
    mongoose_1.default.connection.on('disconnected', () => {
        console.log(`⚡️[database]: MongoDB Disconnected`);
    });
}
exports.subscribeToDatabaseEvents = subscribeToDatabaseEvents;
