const dbProvider = require('./dbProvider');
const db = dbProvider.getSQLiteConnection();
const bcrypt = require('bcryptjs');

class UserModel {
    static createTable() {
        db.run(`
            CREATE TABLE IF NOT EXISTS users (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                email TEXT NOT NULL UNIQUE,
                password TEXT NOT NULL,
                role TEXT DEFAULT 'user',
                registrationDate TEXT DEFAULT CURRENT_TIMESTAMP
            )
        `, (err) => {
            if (err) {
                console.error('Error creating users table:', err.message);
            } else {
                console.log('Users table ready.');
            }
        });
    }
	
	static async createUser({ name, email, password }) {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const query = `
        INSERT INTO users (name, email, password)
        VALUES (?, ?, ?)
      `;
      return new Promise((resolve, reject) => {
        db.run(query, [name, email, hashedPassword], function (err) {
          if (err) {
            return reject(err);
          }
          resolve({ id: this.lastID, name, email });
        });
      });
    } catch (error) {
      throw error;
    }
  }

    static getUserByEmail(email) {
        const query = `SELECT * FROM users WHERE email = ?`;
        return new Promise((resolve, reject) => {
            db.get(query, [email], (err, row) => {
                if (err) {
                    return reject(err);
                }
                resolve(row);
            });
        });
    }
	static async authenticate(email, password) {
		const query = `
		  SELECT * FROM users WHERE email = ?
		`;
		return new Promise((resolve, reject) => {
		  db.get(query, [email], async (err, user) => {
			if (err) {
			  return reject(err);
			}
			if (!user) {
			  return resolve(null);
			}
			try {
			  const isPasswordMatch = await bcrypt.compare(password, user.password);
			  if (isPasswordMatch) {
				return resolve(user);
			  } else {
				console.log('Невірний пароль для email:', email);
				return resolve(null);
			  }
			} catch (error) {
			  console.error('Помилка при порівнянні паролів:', error);
			  return reject(error);
			}
		  });
		});
	  }
  
  static async getUserById(userId) {
    const query = `
      SELECT * FROM users WHERE id = ?
    `;
    return new Promise((resolve, reject) => {
      db.get(query, [userId], (err, user) => {
        if (err) {
          return reject(err);
        }
        resolve(user);
      });
    });
  }  
  
	static async getAllUsers() {
	  const query = 'SELECT * FROM users';

	  return new Promise((resolve, reject) => {
		db.all(query, [], (err, rows) => {
		  if (err) {
			return reject(err);
		  }
		  resolve(rows);
		});
	  });
	}
}
	
module.exports = UserModel;