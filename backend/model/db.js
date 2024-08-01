const { MongoClient } = require('mongodb');

const url = "mongodb+srv://test:thangtx3@cluster0.gfguyrb.mongodb.net/";
const dbName = 'Lab_db';

async function connectDb() {
    const client = new MongoClient(url);
    await client.connect();
    console.log('Kết nối thành công đến server');
    return client.db(dbName);
}
module.exports = connectDb;