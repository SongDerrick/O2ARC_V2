var express = require('express');
var router = express.Router();
const axios = require('axios')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/O2ARC.db');
const logic_function = require('../public/javascripts/logic_function.js')

const testing_function = require('../public/javascripts/testing_interface.js')

/* GET users listing. */
router.get('/:id', async function(req, res, next) {

    const userName = req.params.id
    var data
    var data2
    var minirand = logic_function.getRandomInt(5948,6096)
    var rand = logic_function.getRandomInt(6098,6496)
    console.log(userName)

    try{
        const response1 = await axios.get('https://o2arc-mvp.onrender.com/users/' + userName + '/miniarcs')
        const response2 = await axios.get('https://o2arc-mvp.onrender.com/users/' + userName + '/arcs')
        data = response1.data
        data2 = response2.data

    } catch (err) {
        console.log(err)
        res.status(500).send("Internal Server Error")
    }
    res.render('problem_set', {
        userName: userName,
        miniARC_idlist: data,
        ARC_idlist: data2,
        ran1: minirand,
        ran2: rand
    })


});

router.get('/:id/:problem', function(req, res, next) {
  const userName = req.params.id;
  const problem = req.params.problem;
  const db = new sqlite3.Database('./db/O2ARC.db');

  console.log(userName, problem);
  const query = 'SELECT content FROM tasklist WHERE id = ?';
  const params = [problem];

  function queryDB(query, params, callback) {
    db.get(query, [params], (err, row) => {
      if (err) {
        console.error(err.message);
        return callback('Error executing query', null);
      }
      if (row) {
        const content = JSON.parse(row.content);
        const trainData = content.train;
        const testData = content.test;

        const traingrid = testing_function.loadJSONTask(trainData);
        const testgrid = testing_function.loadJSONTask(testData);
        const outputgrid = testing_function.loadJSONTask(testData);

        const h = traingrid[0][0].height;
        const w = traingrid[0][0].width;

        const resettedgrid = testing_function.resetOutputGrid(outputgrid);
        const cellsize = 200 / Math.max(h, w);

        return callback(null, {
          userName: userName,
          train: trainData,
          grid: traingrid,
          Testgrid: testgrid,
          Outputgrid: outputgrid,
          p: cellsize,
          reset: resettedgrid
        });
      } else {
        return callback('Content not found', null);
      }
    });
  }

  queryDB(query, params, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    } else {
      return res.render('problem_solve', result);
    }
  });
});

router.post('/:id/:problem/save-data', (req, res) => {
  // Retrieve the data from the request body
  const numbersArray = req.body.numbersArray;
  // const labelText = req.body.labelText;
  const userName = req.params.id
 
  const problem = req.params.problem
  var ids = []
  var task_name = []

  // console.log(req)
  const sql1 = 'SELECT id, name FROM user WHERE name = ?';
  const sql2 = 'SELECT id, task_name FROM tasklist WHERE id = ?';

  function retrieveIds() {
    return new Promise((resolve, reject) => {
      db.all(sql1, [userName], (err, rows) => {
        if (err) {
          reject(err);
        }
  
        const ids = rows.map(row => row.id);
        resolve(ids);
      });
    });
  }

  function retrieveTaskIds() {
    return new Promise((resolve, reject) => {
      db.all(sql2, [problem], (err, rows) => {
        if (err) {
          reject(err);
        }
  
        const ids = rows.map(row => row.task_name);
        resolve(ids);
      });
    });
  }

  function insertSubmission(subid, userId, userName, taskId, taskName, numbersArray) {
    const timeStamp = new Date().toISOString();
    const actionSequence = JSON.stringify(numbersArray);
  
    const sql = 'INSERT INTO submission (id, user_id, user_name, task_id, task_name, time_stamp, action_sequence) VALUES (?, ?, ?, ?, ?, ?, ?)';
  
    db.run(sql, [subid, userId, userName, taskId, taskName, timeStamp, actionSequence], function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log('Submission inserted successfully.');
      }
    });
  }
  
  // Use async/await to retrieve the ids and perform other functions
  (async () => {
    try {
      ids = await retrieveIds();
      task_name = await retrieveTaskIds();
      //console.log('IDs:', ids);
      const subid = logic_function.generateRandomId();
      insertSubmission(subid, ids[0], userName, problem, task_name[0], numbersArray)
      // console.log(subid, ids[0], userName, problem, task_name[0], numbersArray)
      console.log(numbersArray)
  
      // Other functions that depend on the retrieved ids can be called here
      // ...
    } catch (err) {
      console.error(err);
    }

  })();

  
  // console.log(userName, problem)
  // Save the data to the database (replace this with your database logic)
  // ...

  // Send a response indicating success
  res.status(200).json({ message: 'Data saved successfully.' });
});

module.exports = router;
