import { createRequire } from 'module';
import path from 'path';
import { fileURLToPath } from 'url';

const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.resolve(__dirname, 'server/learnzora.sqlite');
const db = new sqlite3.Database(dbPath);

console.log("Checking database at:", dbPath);

db.all("SELECT * FROM parent_teacher_chats", [], (err, rows) => {
    if (err) {
        console.error("Error reading chats:", err);
    } else {
        console.log("Total Messages:", rows.length);
        console.table(rows);
    }
});

db.all("SELECT userId, role, name FROM users WHERE role IN ('parent', 'teacher')", [], (err, rows) => {
    if (err) {
        console.error("Error reading users:", err);
    } else {
        console.log("\nUsers:");
        console.table(rows);
    }
});
