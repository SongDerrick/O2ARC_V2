var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/O2ARC.db');


/* 유저가 푼 미니 아크와 아크 문항을 가져오는 API입니다. */
router.get('/:id/miniarcs', function(req, res, next) {
  const userName = req.params.id
  //console.log(userName)

  const query = 'SELECT id, task_name FROM tasklist WHERE type = ?';
  const params = ['MiniARC'];

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error retrieving data');
      //db.close()
    } else {
      //console.log('data retrieved successfully')
      //console.log(rows)
      res.send(rows)
      //db.close()
    }
  });

})

/* GET users listing. */
router.get('/:id/arcs', function(req, res, next) {
  const userName = req.params.id
  //console.log(userName)

  const query = 'SELECT id, task_name FROM tasklist WHERE type = ?';
  const params = ['ARC'];

  db.all(query, params, (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send('Error retrieving data');
      //db.close()
    } else {
      //console.log('data retrieved successfully')
      //console.log(rows)
      res.send(rows)
      //db.close()
    }
  });

})

module.exports = router;
