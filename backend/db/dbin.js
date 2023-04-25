const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('O2ARC.db');

db.run(`CREATE TABLE IF NOT EXISTS submission (
    id INTEGER PRIMARY KEY,
    user_id TEXT,
    user_name TEXT,
    task_id INTEGER,
    task_name TEXT,
    time_stamp TEXT,
    action_sequence TEXT
  )`)


    // close the database connection
db.close((err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Close the database connection.');
});
      