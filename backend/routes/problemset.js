var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/:id', function(req, res, next) {
    const userName = req.params.id
    console.log(userName)
    res.render('problem_set', {
        userName: userName
    })
});

module.exports = router;
