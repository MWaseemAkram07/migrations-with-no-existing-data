// db.js
const { MongoClient } = require('mongodb');
require('dotenv').config();

// Replace with your MongoDB Atlas connection string
const uri = process.env.DATABASE_URL;

let client;

// Function to connect to the database
async function connectToDatabase() {
    if (!client) {
        client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
        await client.connect();
        console.log("Connected to MongoDB Atlas");
    }
    return client.db('<dbname>'); // Return the database
}

// Function to close the database connection
async function closeDatabaseConnection() {
    if (client) {
        await client.close();
        console.log("Connection to MongoDB Atlas closed");
    }
}

module.exports = { connectToDatabase, closeDatabaseConnection };
