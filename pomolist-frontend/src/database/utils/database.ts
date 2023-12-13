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
        if (MongooseConnection._status === ConnectionStatus.connected) {
            console.log('Already connected');
            return;
        }

        if (mongoose.connections.length > 0) {
            MongooseConnection._status = <ConnectionStatus>mongoose.connections[0].readyState;
            if (MongooseConnection._status === ConnectionStatus.connected) {
                console.log('Another connection already exists');
                return;
            }
        }

        try {
            await mongoose.connect(MONGO_DB_URL ?? '');
            MongooseConnection._status = ConnectionStatus.connected;
            console.log('Succesfully connected to MongoDB');
        } catch (err) {
            await mongoose.disconnect();
        }
    }

    async disconnect() {
        if (MongooseConnection._status === ConnectionStatus.disconnected) {
            console.log('Already disconnected');
            return;
        }

        try {
            await mongoose.disconnect();
            MongooseConnection._status = ConnectionStatus.disconnected;
            console.log('Succesfully disconnected from MongoDB');
        } catch (err) {
            console.log('Error disconnecting from MongoDB');
        }
    }
}
