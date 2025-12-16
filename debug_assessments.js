
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve('server/learnzora.sqlite');
const db = new sqlite3.Database(dbPath);


db.serialize(() => {
    console.log("--- Teacher Assessments (ID, TeacherID, Title) ---");
    db.all("SELECT id, teacherId, title FROM teacher_assessments", (err, rows) => {
        if (err) console.error(err);
        else console.log(JSON.stringify(rows, null, 2));
    });

    console.log("\n--- Assessment Submissions (ID, AssessmentID, StudentID, Grade) ---");
    db.all("SELECT id, assessmentId, studentId, aiGrade FROM assessment_submissions", (err, rows) => {
        if (err) console.error(err);
        else console.log(JSON.stringify(rows, null, 2));
    });

    console.log("\n--- Parent-Student Link ---");
    db.all("SELECT userId, studentId FROM parents", (err, rows) => {
        if (err) console.error(err);
        else console.log(JSON.stringify(rows, null, 2));
    });
});

