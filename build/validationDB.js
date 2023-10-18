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
exports.createCollectionWithValidation = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const mongodb_1 = require("mongodb");
dotenv_1.default.config();
function createCollectionWithValidation(uri, databaseName, collectionName) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new mongodb_1.MongoClient(uri);
        yield client.connect();
        const db = client.db(databaseName);
        const colecao = db.collection(collectionName);
        const validationRules = {
            validator: {
                $jsonSchema: {
                    bsonType: 'object',
                    required: [
                        'name',
                        'lastName',
                        'password',
                        'postalCode',
                        'street',
                        'number',
                    ],
                    properties: {
                        name: {
                            bsonType: 'string',
                            description: 'Deve ser uma string e é obrigatório.',
                        },
                        lastName: {
                            bsonType: 'string',
                            description: 'Deve ser uma string e é obrigatório.',
                        },
                        password: {
                            bsonType: 'string',
                            description: 'Deve ser uma string e é obrigatório.',
                        },
                        postalCode: {
                            bsonType: 'string',
                            description: 'Deve ser uma string e é obrigatório.',
                        },
                        street: {
                            bsonType: 'string',
                            description: 'Deve ser uma string e é obrigatório.',
                        },
                        number: {
                            bsonType: 'string',
                            description: 'Deve ser uma string e é obrigatório.',
                        },
                    },
                },
            },
            validationLevel: 'strict',
            validationAction: 'error',
        };
        yield colecao.createIndex({ outroCampo: 1 });
        yield db.command({
            collMod: colecao.collectionName,
            validator: validationRules.validator,
            validationLevel: validationRules.validationLevel,
            validationAction: validationRules.validationAction,
        });
        console.log(`Coleção ${collectionName} com regras de validação criada com sucesso.`);
        yield client.close();
    });
}
exports.createCollectionWithValidation = createCollectionWithValidation;
