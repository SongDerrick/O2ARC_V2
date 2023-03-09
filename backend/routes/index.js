var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/O2ARC.db');



function checkInputExists(inputValue, callback) {
  db.get("SELECT * FROM user WHERE name = ?", [inputValue], (err, row) => {
    if (err) {
      callback(err, null);
    } else if (row) {
      callback(null, true); // input exists in table
    } else {
      callback(null, false); // input does not exist in table
    }
  });
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});

router.post('/', function(req, res, next){
  const db = new sqlite3.Database('./db/O2ARC.db');
  console.log(req.body.username)

  var newID = function () {
    return Math.random().toString(36).substr(2, 16);
  }
  

  user_name = req.body.username
  id = newID()


  const sql = 'INSERT INTO user (id, name) VALUES (?, ?)'
  const params = [id, user_name]

  checkInputExists(user_name, (err, exists) => {
    if (err) {
      console.error(err);
    } else if (exists) {
      console.log(`${user_name} exists in database.`);
      db.close()
      res.redirect('/task/'+user_name)
    } else {
      console.log(`${user_name} does not exist in database.`);
      // Execute SQL statement with dynamic parameters
      db.run(sql, params, function(err) {
        if (err) {
          console.error(err.message);
          res.status(500).send('Server Error');
        } else {
          console.log(`Rows inserted: ${this.changes}`);
          console.log('Data inserted successfully');
          db.close()
          res.redirect('/task/'+user_name)
        }
      });
    }
  });


})

module.exports = router;
