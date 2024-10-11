// index.js
const { migrateData } = require('./migrate');

(async () => {
    try {
        await migrateData(); // Start the migration process
    } catch (error) {
        console.error('Error during migration:', error);
    }
})();
