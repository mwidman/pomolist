import mongoose from 'mongoose';
import { MONGO_DB_URL } from '$env/static/private';


/* 
  0 - disconnected
  1 - connected
  2 - connecting
  3 - disconnecting
  4 - uninitialized
*/
enum ConnectionStatus {
    disconnected = 0,
    connected,
    connecting,
    disconnecting,
    uninitialized,
}


export class MongooseConnection {
    private static instance: MongooseConnection;

    private static _status: ConnectionStatus = ConnectionStatus.disconnected;
    public static get status(): ConnectionStatus {
        return MongooseConnection._status;
    }

    private constructor() { }


    public static getInstance(): MongooseConnection {
        if (!MongooseConnection.instance) {
            MongooseConnection.instance = new MongooseConnection();
        }

        return MongooseConnection.instance;
    }


    async connect() {
        console.log(`MongoDB URL = ${MONGO_DB_URL}`);
        if (MongooseConnection._status != ConnectionStatus.disconnected) {
            console.log('Already connected');
            return;
        }

        try {
            console.log(`MongoDB URL = ${MONGO_DB_URL}`);
            const connection = await mongoose.connect(MONGO_DB_URL ?? '');
            MongooseConnection._status = ConnectionStatus.connected;
            console.log(`Connection = ${connection}`)
            console.dir(connection);

        } catch (err) {
            await mongoose.disconnect();
        }
    }

    async disconnect() {
        if (MongooseConnection._status != ConnectionStatus.connected) {
            console.log('Already disconnected');
        }

        try {
            await mongoose.disconnect();
            MongooseConnection._status = ConnectionStatus.disconnected;
        } catch (err) {
            console.log('Error disconnecting from MongoDB');
        }
    }
}
