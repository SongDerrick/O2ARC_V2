// This file initializes sqlite database 


const sqlite3 = require('sqlite3').verbose();
const testset_data = require('./testsets.json');
const tasklist_data = require('./tasklist.json');
const evaluation_data = require('./evaluation.json');
const logs_data = require('./logs.json');

var sql = require('./sql') // require schema from other file

// open database in memory
let db = new sqlite3.Database('O2ARC.db', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to O2ARC SQlite database.');
  });
  
  db.run(sql.tasklist_sql); // create table if it does not exist

  db.run(sql.testsets_sql);
  
  db.run(sql.logs_sql)

  db.run(sql.evaluation_sql)

  data1 = tasklist_data[0].rows
  data1.forEach((item) => {
    //console.log(item[0])
    db.run(`INSERT INTO tasklist (id, task_name, task_description, content, type) VALUES (?, ?, ?, ?, ?)`, [item[0], item[1], item[2], item[3], item[4]], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Inserted row with id ${this.lastID}`);
      }
    });
  });
  

  data2 = testset_data[0].rows
  console.log(data2[0])
  data2.forEach((item) => {
    console.log(item[0])
    db.run(`INSERT INTO testsets (id, user_id, test_id, testjson, approve, ratings, Description) VALUES (?, ?, ?, ?, ?, ?, ?)`, [item[0], item[1], item[2], item[3], item[4], item[5], item[6]], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Inserted row with id ${this.lastID}`);
      }
    });
  });

  data3 = logs_data[0].rows
  console.log(data3[0])
  data3.forEach((item) => {
    console.log(item[0])
    db.run(`INSERT INTO logs (id, time_stamp, task_id, user_id, action_sequence) VALUES (?, ?, ?, ?, ?)`, [item[0], item[1], item[2], item[3], item[4]], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Inserted row with id ${this.lastID}`);
      }
    });
  });

  data4 = evaluation_data[0].rows
  console.log(data4[0])
  data4.forEach((item) => {
    console.log(item[0])
    db.run(`INSERT INTO evaluation (task_id, trace_id, user_id, points, object, description, general, better) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [item[0], item[1], item[2], item[3], item[4], item[5], item[6], item[7]], (err) => {
      if (err) {
        console.error(err.message);
      } else {
        console.log(`Inserted row with id ${this.lastID}`);
      }
    });
  });

  db.run(sql.user_sql, (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log('User Table created successfully.');
    }
  });


  // close the database connection
  db.close((err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Close the database connection.');
  });
  