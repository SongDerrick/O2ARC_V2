var express = require('express');
var router = express.Router();
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./db/O2ARC.db');
const logic_function = require('../public/javascripts/logic_function.js')

/* GET home page. */ 
router.get('/', function(req, res, next) {
  res.render('index');
}); // 홈페이지 렌더링


router.post('/', function(req, res, next){
  const db = new sqlite3.Database('./db/O2ARC.db');
  //console.log(req.body.username)
  user_name = req.body.username // 유저의 이름을 인풋으로 받음
  
  // 이 함수는 알 수 없는 이유로 다른 곳으로 빼서 정리가 안됩니다... 버그인 듯
  async function checkInputExists(inputValue, callback) {
    await db.get("SELECT * FROM user WHERE name = ?", [inputValue], (err, row) => {
      if (err) {
        callback(err, null);
      } else if (row) {
        callback(null, true); // input exists in table
      } else {
        callback(null, false); // input does not exist in table
      }
    });
  } // 이 함수는 동명이인이 있는지 확인하는 함수 입니다. 

  // 동명 이인 확인을 위한 sql 구문
  const sql = 'INSERT INTO user (id, name) VALUES (?, ?)'
  
  // 동명 이인 확인 함수 호출
  checkInputExists(user_name, (err, exists) => {

    if (err) {

      console.error(err);

    } else if (exists) {

      console.log(`${user_name} exists in database.`);
      return res.redirect('/task/'+user_name)
      // 이미 등록된 사람인 경우 콘솔에 존재한다고 출력하고 /task/user_name으로 리다이렉트
    } else {

      id = logic_function.newID()
      const params = [id, user_name]
      console.log(`${user_name} does not exist in database.`);
      // Execute SQL statement with dynamic parameters
      db.run(sql, params, function(err) {
        if (err) {
          console.error(err.message);
          return res.status(500).send('Server Error');
        } else {
          console.log(`Rows inserted: ${this.changes}`);
          console.log('Data inserted successfully');
          return res.redirect('/task/'+user_name)
        }
      });
      // 등록되지 않은 사람인 경우 콘솔에 디비 존재하지 않는다고 출력하고 /task/user_name으로 리다이렉트
    }
  });


})

module.exports = router; 
