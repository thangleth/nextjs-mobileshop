const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');

const dbName = 'Lab_db';
dotenv.config();

async function connectDb() {
    const client = new MongoClient(process.env.MONGODB_URL);
    await client.connect();
    console.log('Kết nối thành công đến server');
    return client.db(dbName);
}
module.exports = connectDb;