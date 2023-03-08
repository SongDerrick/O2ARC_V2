
// This file creates relational schema for db.


tasklist_sql = `CREATE TABLE IF NOT EXISTS tasklist (
    id INTEGER PRIMARY KEY,
    task_name TEXT,
    task_description TEXT,
    content TEXT,
    type TEXT
  )`

testsets_sql = `CREATE TABLE IF NOT EXISTS testsets (
    id INTEGER PRIMARY KEY,
    user_id TEXT,
    test_id TEXT,
    testjson TEXT,
    approve TEXT,
    ratings TEXT,
    Description TEXT
  )`

logs_sql = `CREATE TABLE IF NOT EXISTS logs (
    id INTEGER PRIMARY KEY,
    time_stamp TEXT,
    task_id TEXT,
    user_id TEXT,
    action_sequence TEXT
  )`


evaluation_sql = `CREATE TABLE IF NOT EXISTS evaluation (
    task_id TEXT,
    trace_id TEXT PRIMARY KEY,
    user_id TEXT PRIMARY KEY,
    points TEXT,
    object TEXT,
    description TEXT,
    general TEXT,
    better TEXT
  )`

user_sql = `CREATE TABLE IF NOT EXISTS user (
  id TEXT PRIMARY KEY,
  name TEXT
)`

tasklist_query = `INSERT INTO tasklist (id, task_name, task_description, content, type) VALUES (?, ?, ?, ?, ?)`

testsets_query = `INSERT INTO testsets (id, user_id, test_id, testjson, approve, ratings, Description) VALUES (?, ?, ?, ?, ?, ?, ?)`

logs_query = `INSERT INTO logs (id, time_stamp, task_id, user_id, action_sequence) VALUES (?, ?, ?, ?, ?)`

evaluation_query = `INSERT INTO evaluation (task_id, trace_id, user_id, points, object, description, general, better) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`


module.exports = {
  tasklist_sql, 
  testsets_sql, 
  logs_sql, 
  evaluation_sql, 
  user_sql, 
  tasklist_query,
  testsets_query,
  logs_query,
  evaluation_query }