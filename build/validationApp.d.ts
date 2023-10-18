import { Document, Model } from 'mongoose';
export interface IUsers extends Document {
    _id: string;
    name: string;
    lastName: string;
    email: string;
    password: string;
    actingField: string;
    phoneNumber: string;
    postalCode: string;
    useObjective: string;
    imagePath: string;
    cep: string;
    street: string;
    number: string;
    complement: string;
    [key: string]: any;
}
declare const UserModel: Model<IUsers>;
export { UserModel };
