var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/O2ARC.db');

router.post('/save-data', (req, res) => {
    // Retrieve the data from the request body
    const numbersArray = req.body.numbersArray;
    const labelText = req.body.labelText;
  
    console.log(req)
    console.log(numbersArray, labelText)
    // Save the data to the database (replace this with your database logic)
    // ...
  
    // Send a response indicating success
    res.status(200).json({ message: 'Data saved successfully.' });
});

module.exports = router;
