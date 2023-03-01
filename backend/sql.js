
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


module.exports = {tasklist_sql, testsets_sql, logs_sql, evaluation_sql}