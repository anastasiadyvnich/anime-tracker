const fs = require('fs');
const path = require('path');
const db = require('./db');

const migrationsDir = path.join(__dirname, 'db/migrations');
const migrationFiles = fs.readdirSync(migrationsDir).sort();

db.serialize(() => {
  console.log('Начало выполнения миграций...');
  
  migrationFiles.forEach((file) => {
    const filePath = path.join(migrationsDir, file);
    const sql = fs.readFileSync(filePath, 'utf-8');

    db.exec(sql, (err) => {
      if (err) {
        console.error(`Ошибка выполнения миграции из файла ${file}:`, err.message);
      } else {
        console.log(`Миграция из файла ${file} выполнена успешно.`);
      }
    });
  });
});

db.close((err) => {
  if (err) {
    console.error('Ошибка при закрытии базы данных:', err.message);
  } else {
    console.log('Все миграции выполнены и база данных закрыта.');
  }
});
