const { MongoClient } = require('mongodb');

let client;
let db;

async function connectDB(uri, dbName) {
  if (db) return db;

  client = new MongoClient(uri);
  await client.connect();
  db = client.db(dbName);

  return db;
}

function getDB() {
  if (!db) throw new Error('DB is not connected. Call connectDB() first.');
  return db;
}

async function closeDB() {
  if (client) await client.close();
  client = null;
  db = null;
}

module.exports = { connectDB, getDB, closeDB };
