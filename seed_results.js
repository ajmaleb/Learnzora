import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve('server/learnzora.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // 1. Fix Parent User ID in parents table
    console.log("Fixing parents table...");
    db.run(`UPDATE parents SET userId = 'parent01' WHERE userId = 'Alexdavid'`, function (err) {
        if (err) console.error("Error fixing parents:", err);
        else console.log(`Updated ${this.changes} rows in parents table.`);
    });

    // 2. Ensure Teacher Assessment Exists (Physics)
    console.log("Ensuring Physics Assessment...");
    db.run(`INSERT OR IGNORE INTO teacher_assessments (id, teacherId, title, topic, status, publishedAt) 
            VALUES (1, 'TCH-001', 'Physics Mid-Term', 'Physics', 'published', '2024-03-15')`);

    // 3. Ensure Submission Exists (Physics)
    console.log("Ensuring Physics Submission...");
    db.run(`INSERT OR IGNORE INTO assessment_submissions (assessmentId, studentId, answers, aiGrade, submittedAt) 
            VALUES (1, 'STU-2024-001', '[]', '{"score": 85, "feedback": "Great job on the concepts!"}', '2024-03-16 10:00:00')`);

    // 4. Ensure Alexdavid also has the result (just in case frontend uses that ID)
    db.run(`INSERT OR IGNORE INTO assessment_submissions (assessmentId, studentId, answers, aiGrade, submittedAt) 
            VALUES (1, 'Alexdavid', '[]', '{"score": 85, "feedback": "Great job on the concepts!"}', '2024-03-16 10:00:00')`);

});

db.close();
