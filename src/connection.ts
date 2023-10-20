import mongoose from 'mongoose';
import { ErrorMessages, IError } from 'duna-web-platform-error-defs';

export async function connectToDatabase(url: string) {
  await mongoose.connect(url, {});
}

export function checkConnectionStatus() {
  // 1 ->  Connected
  if (mongoose.connection.readyState != 1) {
    const err: IError = ErrorMessages.InternalServerError;
    err.Details = `MongoDB disconnected`;
    throw err;
  }
}

export function subscribeToDatabaseEvents() {
  mongoose.connection.on('connected', () => {
    console.log(`⚡️[database]: MongoDB connected`);
  });

  mongoose.connection.on('error', (error) => {
    console.log(`⚡️[database]: MongoDB Error - ${error}`);
  });

  mongoose.connection.on('disconnected', () => {
    console.log(`⚡️[database]: MongoDB Disconnected`);
  });
}