const sqlite3 = require('sqlite3').verbose();
const mysql = require('mysql2');
const { initializeApp } = require('firebase/app');

class DBProvider {
    static getSQLiteConnection() {
        return new sqlite3.Database('./database.sqlite', (err) => {
            if (err) {
                console.error('Error connecting to SQLite:', err.message);
            } else {
                console.log('Connected to SQLite database.');
            }
        });
    }

    static getMySQLConnection() {
        return mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'my_database',
        });
    }

    static getFirebaseConnection() {
        const firebaseConfig = {
            apiKey: 'yourApiKey',
            authDomain: 'yourAuthDomain',
            projectId: 'yourProjectId',
            storageBucket: 'yourStorageBucket',
            messagingSenderId: 'yourMessagingSenderId',
            appId: 'yourAppId',
        };
        return initializeApp(firebaseConfig);
    }
}

module.exports = DBProvider;
