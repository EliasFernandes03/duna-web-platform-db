import dotenv from 'dotenv'
import { MongoClient, Db, Collection } from 'mongodb'

dotenv.config()

export async function createCollectionWithValidation(
    uri: string,
    databaseName: string,
    collectionName: string
): Promise<void> {
    const client = new MongoClient(uri)
    await client.connect()

    const db: Db = client.db(databaseName)
    const colecao: Collection = db.collection(collectionName)

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
    }

    await colecao.createIndex({ outroCampo: 1 })

    await db.command({
        collMod: colecao.collectionName,
        validator: validationRules.validator,
        validationLevel: validationRules.validationLevel,
        validationAction: validationRules.validationAction,
    })

    console.log(
        `Coleção ${collectionName} com regras de validação criada com sucesso.`
    )

    await client.close()
}
