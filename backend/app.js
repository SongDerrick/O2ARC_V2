var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const sqlite3 = require('sqlite3').verbose();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();


// open database in memory
let db = new sqlite3.Database('db/O2ARC.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to O2ARC SQlite database.');
});

db.run(`CREATE TABLE IF NOT EXISTS tasklist (
  id INTEGER PRIMARY KEY,
  task_name TEXT,
  task_description TEXT,
  content TEXT,
  type TEXT
)`);

const data = require('./db/tasklist.json');
data1 = data[0].rows
//console.log(data[0].rows)
data1.forEach((item) => {
  console.log(item[0])
  db.run(`INSERT INTO tasklist (id, task_name, task_description, content, type) VALUES (?, ?, ?, ?, ?)`, [item[0], item[1], item[2], item[3], item[4]], (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log(`Inserted row with id ${this.lastID}`);
    }
  });
});

// close the database connection
db.close((err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Close the database connection.');
});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.get('/data', (req, res) => {
  db.all(`SELECT * FROM sample`, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Internal server error');
    } else {
      res.json(rows);
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
