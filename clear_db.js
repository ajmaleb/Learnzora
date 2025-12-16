const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'server/learnzora.sqlite');
const db = new sqlite3.Database(dbPath);

console.log("Cleaning chats from:", dbPath);

db.run("DELETE FROM parent_teacher_chats", [], (err) => {
    if (err) {
        console.error("Error cleaning chats:", err);
    } else {
        console.log("All deleted.");
    }
});
