var express = require('express');
var router = express.Router();
const axios = require('axios')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/O2ARC.db');

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/* GET users listing. */
router.get('/:id', async function(req, res, next) {

    const userName = req.params.id
    var data
    var data2
    var minirand = getRandomInt(5948,6096)
    var rand = getRandomInt(6098,6496)
    console.log(userName)

    try{
        const response1 = await axios.get('http://localhost:3000/users/' + userName + '/miniarcs')
        const response2 = await axios.get('http://localhost:3000/users/' + userName + '/arcs')
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
    const userName = req.params.id
    const problem = req.params.problem

    console.log(userName, problem)
    res.send("HI")
})

module.exports = router;
