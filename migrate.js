// migrate.js
const axios = require('axios');
const csv = require('csv-parser');
const { connectToDatabase, closeDatabaseConnection } = require('./db');

async function migrateData() {
    const db = await connectToDatabase();
    const collection = db.collection('employees'); // Change this to your desired collection name

    // Dummy URL to fetch CSV data
    const csvUrl = 'https://people.sc.fsu.edu/~jburkardt/data/csv/hw_200.csv'; // Replace with your dummy CSV URL

    try {
        const response = await axios.get(csvUrl);
        const csvData = response.data;

        // Parse the CSV data
        const results = [];
        csvData.split('\n').forEach((line, index) => {
            if (index === 0) return; // Skip header line
            const row = line.split(',');
            results.push({
                name: row[0],
                gender: row[1],
                height: row[2],
                weight: row[3],
                age: row[4]
            });
        });

        // Insert parsed data into MongoDB
        for (const row of results) {
            try {
                await collection.insertOne(row);
                console.log(`Inserted: ${JSON.stringify(row)}`);
            } catch (error) {
                console.error(`Error inserting ${JSON.stringify(row)}:`, error);
            }
        }

        console.log('CSV data successfully processed');
    } catch (error) {
        console.error('Error fetching the CSV data:', error);
    } finally {
        await closeDatabaseConnection(); // Close the connection after processing
    }
}

module.exports = { migrateData };
